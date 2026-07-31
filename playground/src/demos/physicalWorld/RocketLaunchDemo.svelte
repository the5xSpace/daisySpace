<script lang="ts">
import DemoPanel from "../../shell/DemoPanel.svelte";

/**
 * 火箭主动段弹道仿真 — Daisy.PW.Rocket Demo
 *
 * 展示：
 * 1. 从地面发射台准备 → 点火 → 一级爬升 → 偏转 → 级间分离 → 二级入轨 → 弹道远地点
 * 2. 参数面板暴露所有输入，支持单级/双级切换
 * 3. Saturn V 3D 模型沿轨迹飞行 + TrailPath 轨迹线
 * 4. TimeSchedule 事件追踪：liftoff / pitchover / staging / burnout / apogee
 * 5. 相机自动跟随火箭
 */
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props()

let C3 = $derived(Daisy.Cartesian3)
let Color = $derived(Daisy.Color)
let JD = $derived(Daisy.JulianDate)

let launched = $state(false)
let currentPhase = $state("准备发射")
let telemetry = $state({ alt: 0, v: 0, t: 0 })
let summaryData = $state({ apogee: 0, maxV: 0, totalDV: 0 })
let events = $state<any[]>([])
let missionPhases = $state<any[]>([])
let cameraFollow = $state(false)
let playbackEnded = $state(false)
let engineStatus = $state("待机")

let rocketObject: any = null
let mainEngine: any = null
let launchMarkerEntity: any = null
let controlWidget: any = null
let timelineWidget: any = null
let flightSchedule: any = null
let eventMarkers: any[] = []
let separationVisuals: any[] = []
let modelNodeJettisons: any[] = []
let cameraRemover: (() => void) | null = null
let trajectoryStopTime: any = null
let missionStartTime: any = null

const jettisonNodeKeywords: Record<string, string[]> = {
  fairing: ["fairing", "payloadfairing", "nosecone", "nose", "shroud", "cover"],
  "stage-one": ["stage1", "stageone", "firststage", "firststagebooster", "booster", "sic", "s1"],
  "stage-two": ["stage2", "stagetwo", "secondstage", "upperstage", "sii", "s2"],
}

const launchSite = {
  lat: 28.5,
  lon: -80.5,
  alt: 0,
  az: 90,
}

// ── 参数 ──────────────────────────────────────────────────
let params = $state({
  pitchStart: 12, pitchRate: 0.4, pitchEnd: 8,
  payload: 15.6,
  twoStage: true,
  s1Thrust: 7607, s1Isp: 311, s1Prop: 395, s1Dry: 25.6,
  s2Thrust: 934,  s2Isp: 348, s2Prop: 92.67, s2Dry: 4.5,
  drag: true,
})

function getLaunchPosition() {
  return C3.fromDegrees(launchSite.lon, launchSite.lat, launchSite.alt)
}

function getRocketModelOptions() {
  return {
    url: Daisy.BuildModuleUrl.getUrl("models/SaturnVl.glb"),
    scale: 0.06,
    minimumPixelSize: 170,
    maximumScale: 2000,
    silhouetteColor: Color.fromCssColorString("#71c7ff"),
    silhouetteSize: 1,
  }
}

function ensureMainEngine() {
  if (!rocketObject) return null
  const existing = rocketObject.getPropulsion?.("main-engine")
  if (existing) {
    mainEngine = existing
    return existing
  }
  mainEngine = rocketObject.addPropulsion(new Daisy.PW.JetEngine({
    name: "main-engine",
    position: new C3(0, 0, 0),
    rotation: { heading: 0, pitch: 0, roll: 0 },
    scale: new C3(1.25, 1.25, 1.25),
    enabled: false,
    power: 0,
    particle: {
      preset: "rocket-flame",
      renderer: "capsule-sprite",
      color: Color.ORANGE,
      length: 92,
      radius: 8.5,
      screenSpaceSizing: true,
      minLengthPx: 92,
      maxLengthPx: 280,
      minRadiusPx: 10,
      maxRadiusPx: 34,
      modelRelativeSizing: true,
      modelLengthRatio: 0.86,
      modelMaxLengthRatio: 1.45,
      modelRadiusRatio: 0.078,
      modelMaxRadiusRatio: 0.18,
      frameCount: 24,
      frameRate: 12,
      turbulence: 0.92,
      visualScaleMode: "none",
    },
  }))
  return mainEngine
}

function setMainEnginePower(power: number, label = "主发动机工作") {
  const engineComp = ensureMainEngine()
  if (!engineComp) return
  if (power <= 0) {
    engineComp.stop()
    engineStatus = label
    return
  }
  engineComp.start(power)
  engineStatus = label
}

function getBodyAxisOptions() {
  return {
    length: undefined,
    lengthPx: 200,
    axisWidth: 3,
    showSphere: false,
    showLabels: false,
    labelPrefix: "R-",
    showWireframe: false,
  }
}

function createRocketOnPad(launchPos: any) {
  if (rocketObject) {
    removeDemoEntity(rocketObject)
    rocketObject = null
  }
  rocketObject = new Daisy.PW.Rocket({
    name: "Rocket",
    model: getRocketModelOptions(),
    point: false,
    text: {
      text: "火箭",
      fillColor: Color.WHITE,
      pixelOffset: new Daisy.Cartesian2(0, -28),
    },
    bodyAxis: getBodyAxisOptions(),
    autoAlignVerticalModelToFlight: false,
  })
  rocketObject.position = launchPos
  rocketObject.bindEngine(engine)
  ensureMainEngine()?.stop()
  engineStatus = "待机"
}

function removeDemoEntity(target: any) {
  if (!target) return
  const hostEntity = target.entity ?? target
  try { engine.removeEntity?.(hostEntity) } catch {}
  try { engine.unregisterObject?.(target) } catch {}
  if (target !== hostEntity) {
    try { target.destroy?.() } catch {}
  }
}

function cleanupStaleDemoEntities() {
  const staleNames = new Set(["Rocket", "RocketOnPad", "LaunchSite"])
  const entities = Array.from(engine.entities ?? [])
  for (const entity of entities as any[]) {
    const name = typeof entity?.name === "string" ? entity.name : ""
    if (staleNames.has(name) || name.startsWith("Event-") || name.startsWith("Jettison-")) {
      removeDemoEntity(entity)
    }
  }
  eventMarkers = []
  separationVisuals = []
  modelNodeJettisons = []
}

// ── 发射前：初始化场景 ──────────────────────────────────────
function initScene() {
  engine.morphTo3D?.()
  engine.setCameraInputEnabled?.(true)
  cleanupStaleDemoEntities()
  if (launchMarkerEntity) {
    removeDemoEntity(launchMarkerEntity)
    launchMarkerEntity = null
  }

  engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0, maxLevel: 18,
  })
  if (!controlWidget) {
    controlWidget = engine.addWidget(new Daisy.ControlPanelWidget({
      mode: "lite", preset: "rightTop", layout: "row", draggable: true,
    }))
  }

  const launchPos = getLaunchPosition()
  createRocketOnPad(launchPos)
  engine.camera.flyToTarget(launchPos, {
    offset: new Daisy.HeadingPitchRange(
      Daisy.Math.toRadians(launchSite.az - 180),
      Daisy.Math.toRadians(-22),
      45000,
    ),
    duration: 1.1,
  })

  launchMarkerEntity = new Daisy.Entity("LaunchSite")
  launchMarkerEntity.addFeature(new Daisy.UI.TextFeature({
    text: `${launchSite.lat.toFixed(1)}°, ${launchSite.lon.toFixed(1)}°`,
    font: "12px monospace",
    fillColor: Color.YELLOW,
    horizontalOrigin: Daisy.HorizontalOrigin.LEFT,
    verticalOrigin: Daisy.VerticalOrigin.BOTTOM,
    pixelOffset: new Daisy.Cartesian2(8, -8),
  }))
  launchMarkerEntity.position = launchPos
  engine.addEntity(launchMarkerEntity)
}

function destroyFlightEntities() {
  if (cameraRemover) { cameraRemover(); cameraRemover = null }
  engine.camera.removeTrackedDaisyEntity?.()
  clearModelNodeJettisons()
  if (rocketObject) { removeDemoEntity(rocketObject); rocketObject = null }
  mainEngine = null
  cleanupMissionTimeline()
  cleanupStaleEventMarkers()
  cleanupSeparationVisuals()
  cameraFollow = false
  playbackEnded = false
  engineStatus = "待机"
}

function cleanupMissionTimeline() {
  if (timelineWidget) {
    try { engine.removeWidget?.(timelineWidget, true) } catch {}
    timelineWidget = null
  }
  if (flightSchedule) {
    try { engine.removeTimeSchedule?.(flightSchedule) } catch { try { flightSchedule.clear?.() } catch {} }
    flightSchedule = null
  }
  missionPhases = []
  missionStartTime = null
}

function focusRocket() {
  if (!rocketObject) return
  engine.camera.flyToTarget(rocketObject, {
    offset: new Daisy.HeadingPitchRange(
      Daisy.Math.toRadians(180),
      Daisy.Math.toRadians(-28),
      180000,
    ),
    duration: 1,
  })
}

function setCameraFollow(enabled: boolean) {
  if (!enabled) {
    cameraFollow = false
    engine.camera.removeTrackedDaisyEntity?.()
    return
  }
  if (!rocketObject || !engine.is3D?.()) {
    cameraFollow = false
    return
  }
  cameraFollow = true
  engine.camera.followTarget(rocketObject, {
    view: { distance: 180000, pitchDeg: -28, headingDeg: 180 },
    installInputListeners: true,
    arcRotate: {
      targetFrameMode: "enu",
      enableGroundCollisionSlide: false,
      disableGroundCollisionSlideBelowTargetHeight: 100000,
    },
  })
}

function buildAscentOptions() {
  const stages = [
    {
      thrust: Number(params.s1Thrust) * 1000,
      isp: Number(params.s1Isp),
      propellantMass: Number(params.s1Prop) * 1000,
      dryMass: Number(params.s1Dry) * 1000,
    },
  ]
  if (params.twoStage) {
    stages.push({
      thrust: Number(params.s2Thrust) * 1000,
      isp: Number(params.s2Isp),
      propellantMass: Number(params.s2Prop) * 1000,
      dryMass: Number(params.s2Dry) * 1000,
    })
  }
  return {
    launchSite: { latitude: launchSite.lat, longitude: launchSite.lon, altitude: launchSite.alt, azimuth: launchSite.az },
    stages,
    payloadMass: Number(params.payload) * 1000,
    pitchProgram: { startTime: Number(params.pitchStart), pitchRate: Number(params.pitchRate), endAngle: Number(params.pitchEnd) },
    drag: { enabled: params.drag, dragCoeff: 0.3, area: 10.75 },
    timestep: 0.25,
  }
}

// ── 发射 ──────────────────────────────────────────────────
function onLaunch() {
  if (launched) {
    replayFlight()
    return
  }
  const epoch = JD.fromDate(new Date("2026-07-01T00:00:00Z"))
  if (!rocketObject) {
    createRocketOnPad(getLaunchPosition())
  }
  rocketObject.setOptions?.({
    model: getRocketModelOptions(),
    point: false,
    text: {
      text: "火箭",
      fillColor: Color.WHITE,
      pixelOffset: new Daisy.Cartesian2(0, -24),
    },
    autoAlignVerticalModelToFlight: true,
  })
  rocketObject.setBodyAxis?.(getBodyAxisOptions())
  ensureMainEngine()
  rocketObject.applyAscentTrajectory(epoch, buildAscentOptions())

  events = rocketObject.events
  const summ = rocketObject.summary
  summaryData = {
    apogee: summ?.apogeeAltitude ?? 0,
    maxV: summ?.maxVelocity ?? 0,
    totalDV: summ?.totalDeltaV ?? 0,
  }
  const start = rocketObject.startTime ?? epoch
  trajectoryStopTime = rocketObject.stopTime ?? JD.addSeconds(start, 600, new JD())
  engine.setSceneTime(start, trajectoryStopTime, false)
  engine.setCurrentTime(start)

  placeEventMarkers(start)
  setupMissionTimeline(start, trajectoryStopTime)
  setMainEnginePower(1, "一级发动机点火")

  engine.play(5)
  launched = true
  playbackEnded = false

  currentPhase = "垂直上升"
  telemetry = { t: 0, alt: 0, v: 0.01 }

  setupPreRender(start)
  setCameraFollow(true)
  registerCleanup(() => {
    destroyFlightEntities()
    cleanupStaleDemoEntities()
    if (launchMarkerEntity) { removeDemoEntity(launchMarkerEntity); launchMarkerEntity = null }
    if (controlWidget) {
      engine.removeWidget?.(controlWidget, true)
      controlWidget = null
    }
  })
}

function replayFlight() {
  if (!rocketObject) return
  const start = rocketObject.startTime
  if (!start) return
  cleanupSeparationVisuals()
  clearModelNodeJettisons()
  if (trajectoryStopTime) {
    setupMissionTimeline(start, trajectoryStopTime)
  }
  engine.setCurrentTime(start)
  engine.play(5)
  playbackEnded = false
  currentPhase = "垂直上升"
  telemetry = { t: 0, alt: 0, v: 0.01 }
  setMainEnginePower(1, "一级发动机点火")
  setCameraFollow(true)
}

// ── 事件标记 ──────────────────────────────────────────────
function placeEventMarkers(epoch: any) {
  cleanupStaleEventMarkers()
  eventMarkers = []

  const launchPos = getLaunchPosition()
  for (const e of events) {
    if (e.type !== "staging" && e.type !== "burnout" && e.type !== "apogee") continue
    if (e.altitude <= 0) continue
    const marker = new Daisy.Entity(`Event-${e.type}`)
    marker.addFeature(new Daisy.PointFeature({
      color: e.type === "apogee" ? Color.CYAN : Color.HOTPINK, pixelSize: 10,
    }))
    marker.addFeature(new Daisy.UI.TextFeature({
      text: e.type === "staging" ? "级分离" : e.type === "burnout" ? "关机" : "远地点",
      font: "11px monospace",
      fillColor: e.type === "apogee" ? Color.CYAN : Color.HOTPINK,
      pixelOffset: new Daisy.Cartesian2(0, -14),
    }))
    const eventTime = JD.addSeconds(epoch, e.time, new JD())
    marker.position = rocketObject?.trajectory?.evaluate(eventTime)
      ?? C3.fromDegrees(launchSite.lon, launchSite.lat, launchSite.alt + e.altitude)
    engine.addEntity(marker)
    eventMarkers.push(marker)
    registerCleanup(() => marker.destroy())
  }
}

function getEventSecond(type: string): number | undefined {
  const event = events.find((e: any) => e.type === type)
  return typeof event?.time === "number" ? event.time : undefined
}

function findTimeAtAltitude(start: any, stop: any, altitudeMeters: number, fallbackSecond: number) {
  if (!rocketObject?.trajectory) return fallbackSecond
  const total = Math.max(1, JD.secondsDifference(stop, start))
  for (let second = 0; second <= total; second += 1) {
    const t = JD.addSeconds(start, second, new JD())
    const state = rocketObject.getFlightStateAtTime(t)
    if ((state.altitudeMeters ?? 0) >= altitudeMeters) return second
  }
  return fallbackSecond
}

function clampSecond(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

function missionTimeLabel(jd: any) {
  if (!missionStartTime) return Daisy.JulianDate.toIso8601(jd)
  const second = Math.max(0, Daisy.JulianDate.secondsDifference(jd, missionStartTime))
  return `T+${second.toFixed(0)}s`
}

function addMissionTask(schedule: any, start: any, item: any) {
  const startTime = JD.addSeconds(start, item.start, new JD())
  const endTime = JD.addSeconds(start, Math.max(item.start + 1, item.end), new JD())
  schedule.add(new Daisy.TimeTask({
    id: item.id,
    name: item.name,
    startJulianTime: startTime,
    endJulianTime: endTime,
    onEnter: item.onEnter,
    onLeave: item.onLeave,
  }))
}

function setupMissionTimeline(start: any, stop: any) {
  cleanupMissionTimeline()
  missionStartTime = start
  const stopSecond = Math.max(1, JD.secondsDifference(stop, start))
  const pitchoverSecond = getEventSecond("pitchover") ?? Number(params.pitchStart)
  const stagingSecond = getEventSecond("staging")
  const burnoutSecond = getEventSecond("burnout") ?? Math.max(pitchoverSecond + 20, stopSecond * 0.72)
  const apogeeSecond = getEventSecond("apogee") ?? stopSecond
  const fairingRaw = findTimeAtAltitude(start, stop, 80000, pitchoverSecond + 72)
  const fairingSecond = clampSecond(
    fairingRaw,
    pitchoverSecond + 8,
    Math.max(pitchoverSecond + 12, (stagingSecond ?? burnoutSecond) - 5),
  )
  const stageSepSecond = stagingSecond ?? fairingSecond + 18
  const stage2StartSecond = Math.min(stageSepSecond + 2, Math.max(stageSepSecond + 1, burnoutSecond - 2))
  const shutdownSecond = Math.max(stage2StartSecond + 1, burnoutSecond)

  flightSchedule = engine.createTimeSchedule()
  missionPhases = [
    {
      id: "ignition",
      name: "点火 / 垂直上升",
      start: 0,
      end: Math.max(1, pitchoverSecond),
      onEnter: () => setMainEnginePower(1, "一级发动机点火"),
    },
    {
      id: "gravity-turn",
      name: "偏转 / 重力转弯",
      start: pitchoverSecond,
      end: Math.max(pitchoverSecond + 1, stageSepSecond),
      onEnter: () => setMainEnginePower(0.96, "一级发动机持续工作"),
    },
    {
      id: "fairing-jettison",
      name: "第一次抛飞：整流罩",
      start: fairingSecond,
      end: fairingSecond + 5,
      onEnter: () => triggerJettisonEffect("fairing", "第一次抛飞：整流罩", fairingSecond, Color.fromCssColorString("#ffcc66")),
    },
    {
      id: "stage-one-separation",
      name: "一级关机 / 燃料箱抛飞",
      start: stageSepSecond,
      end: stageSepSecond + 6,
      onEnter: () => {
        setMainEnginePower(0, "一级发动机关机")
        triggerJettisonEffect("stage-one", "一级燃料箱抛飞", stageSepSecond, Color.HOTPINK)
      },
    },
    {
      id: "second-stage-ignition",
      name: "二级点火 / 入轨推进",
      start: stage2StartSecond,
      end: shutdownSecond,
      onEnter: () => setMainEnginePower(0.68, "二级发动机点火"),
    },
    {
      id: "second-stage-shutdown",
      name: "二级关机 / 第二次抛飞",
      start: shutdownSecond,
      end: shutdownSecond + 6,
      onEnter: () => {
        setMainEnginePower(0, "二级发动机关机")
        triggerJettisonEffect("stage-two", "第二次抛飞：二级燃料箱", shutdownSecond, Color.CYAN)
      },
    },
    {
      id: "coast",
      name: "无动力滑行 / 远地点",
      start: shutdownSecond + 6,
      end: Math.max(shutdownSecond + 7, apogeeSecond),
      onEnter: () => setMainEnginePower(0, "无动力滑行"),
    },
  ]

  for (const item of missionPhases) {
    addMissionTask(flightSchedule, start, item)
  }

  timelineWidget = engine.addWidget(new Daisy.TaskTimeLineWidget(flightSchedule, {
    title: "发射任务阶段",
    width: 360,
    height: 238,
    minHeight: 180,
    maxScrollHeight: 260,
    right: 16,
    bottom: 16,
    formatTime: missionTimeLabel,
    onStepClick: (task: any) => engine.setCurrentTime(task.startJulianTime),
  }))
}

function normalizeNodeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function getRocketModelFeature() {
  const entity = rocketObject?.entity
  return entity?.getFeatureByName?.("__model")
    ?? entity?.getFeatures?.().find((feature: any) => feature?.type === "ModelFeature")
}

function resolveJettisonNodeNames(id: string) {
  const model = getRocketModelFeature()
  const nodeNames: string[] = model?.getNodeNames?.() ?? []
  const keywords = jettisonNodeKeywords[id] ?? []
  if (nodeNames.length === 0 || keywords.length === 0) return []
  const normalizedKeywords = keywords.map(normalizeNodeName)
  return nodeNames.filter((name) => {
    const normalized = normalizeNodeName(name)
    return normalizedKeywords.some((keyword) => normalized.includes(keyword))
  })
}

function getJettisonLocalDirection(id: string, index: number) {
  const split = index % 2 === 0 ? 1 : -1
  if (id === "fairing") return new C3(3.4 * split, 2.2, 1.2)
  if (id === "stage-two") return new C3(-2.8 * split, -2.4, 1.4)
  return new C3(2.6 * split, -4.2, 2.2)
}

function beginModelNodeJettison(id: string, text: string, second: number) {
  const model = getRocketModelFeature()
  if (!model?.transformNode) return false
  const nodeNames = resolveJettisonNodeNames(id)
  if (nodeNames.length === 0) {
    __log?.(`${label}: 当前模型没有可安全抛飞的语义节点，使用事件标记兜底。`)
    return false
  }

  const effectId = `model-node-${id}`
  if (modelNodeJettisons.some((effect) => effect.id === effectId)) return true

  modelNodeJettisons.push({
    id: effectId,
    nodeNames,
    start: second,
    duration: 7,
  })
  for (const nodeName of nodeNames) {
    model.transformNode(nodeName)
      .setShow(true)
      .setOpacity(1)
      .setTranslation()
      .setScale(1)
  }
  __log?.(`${label}: 模型节点抛飞已接管 ${nodeNames.join(", ")}`)
  return true
}

function triggerJettisonEffect(id: string, text: string, second: number, color: any) {
  if (beginModelNodeJettison(id, label, second)) return
  createJettisonVisual(id, label, second, color)
}

function updateModelNodeJettisons(elapsedSecond: number) {
  const model = getRocketModelFeature()
  if (!model?.transformNode) return
  for (const effect of modelNodeJettisons) {
    const rawProgress = (elapsedSecond - effect.start) / effect.duration
    if (rawProgress < 0) continue
    const progress = Math.min(1, rawProgress)
    const ease = 1 - Math.pow(1 - progress, 3)
    for (let i = 0; i < effect.nodeNames.length; i++) {
      const nodeName = effect.nodeNames[i]
      const direction = getJettisonLocalDirection(effect.id.replace("model-node-", ""), i)
      const translation = new C3(direction.x * ease, direction.y * ease, direction.z * ease)
      const scale = Math.max(0.001, 1 - ease * 0.999)
      const opacity = Math.max(0, 1 - ease)
      model.transformNode(nodeName)
        .setTranslation(translation)
        .setScale(scale)
        .setOpacity(opacity)
        .setShow(progress < 1)
    }
  }
}

function clearModelNodeJettisons() {
  const model = getRocketModelFeature()
  if (model) {
    for (const effect of modelNodeJettisons) {
      for (const nodeName of effect.nodeNames ?? []) {
        if (model.clearNodeTransform) {
          model.clearNodeTransform(nodeName)
        } else {
          model.transformNode?.(nodeName)?.reset?.()
        }
      }
    }
  }
  modelNodeJettisons = []
}

function createJettisonVisual(id: string, text: string, second: number, color: any) {
  if (!missionStartTime || !rocketObject?.trajectory) return
  const name = `Jettison-${id}`
  if (separationVisuals.some((entity: any) => entity?.name === name)) return

  const eventTime = JD.addSeconds(missionStartTime, second, new JD())
  const base = rocketObject.trajectory.evaluate(eventTime)
  if (!base) return
  const offsetSign = id === "stage-two" ? -1 : 1
  const offset = new C3(650 * offsetSign, 420, 260)
  const position = C3.add(base, offset, new C3())
  const entity = new Daisy.Entity(name)
  entity.addFeature(new Daisy.PointFeature({
    color,
    outlineColor: Color.WHITE,
    outlineWidth: 2,
    pixelSize: 12,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  }))
  entity.addFeature(new Daisy.UI.TextFeature({
    text: label,
    font: "11px monospace",
    fillColor: color,
    outlineColor: Color.BLACK,
    outlineWidth: 2,
    pixelOffset: new Daisy.Cartesian2(0, -18),
  }))
  entity.position = position
  engine.addEntity(entity)
  separationVisuals.push(entity)
}

// ── 每帧遥测刷新 ──────────────────────────────────────────
function setupPreRender(epoch: any) {
  if (cameraRemover) cameraRemover()

  cameraRemover = engine.onPreRender((time: any) => {
    if (!rocketObject) {
      cameraFollow = false
      return
    }
    if (cameraFollow && !engine.is3D?.()) {
      setCameraFollow(false)
    }
    const renderTime = trajectoryStopTime && Daisy.JulianDate.greaterThan(time, trajectoryStopTime)
      ? trajectoryStopTime
      : time
    if (trajectoryStopTime && Daisy.JulianDate.greaterThanOrEquals(time, trajectoryStopTime)) {
      engine.clock.shouldAnimate = false
      engine.setCurrentTime(trajectoryStopTime)
      playbackEnded = true
    }
    const state = rocketObject.getFlightStateAtTime(renderTime)
    const pos = state.position
    if (!pos) return
    const alt = state.altitudeMeters ?? 0
    if (alt < -100 || alt > 1e8) return

    telemetry = {
      t: Math.max(0, state.elapsedSeconds),
      alt: Math.max(0, alt),
      v: state.speedMetersPerSecond ?? 0,
    }

    const t = telemetry.t
    updateModelNodeJettisons(t)
    const activePhase = missionPhases.find((phase: any) => t >= phase.start && t <= phase.end)
    if (activePhase) {
      currentPhase = activePhase.name
    } else {
      const burnout = events.find((e: any) => e.type === "burnout")
      currentPhase = burnout && t > burnout.time ? "无动力滑行 / 远地点" : "弹道飞行"
    }
  })
}

function onReset() {
  destroyFlightEntities()
  cleanupStaleDemoEntities()
  events = []
  trajectoryStopTime = null
  launched = false
  playbackEnded = false
  currentPhase = "准备发射"
  engineStatus = "待机"
  telemetry = { t: 0, alt: 0, v: 0 }
  summaryData = { apogee: 0, maxV: 0, totalDV: 0 }
  initScene()
}

function cleanupStaleEventMarkers() {
  const entities = Array.from(engine.entities ?? [])
  for (const entity of entities as any[]) {
    const name = typeof entity?.name === "string" ? entity.name : ""
    if (name.startsWith("Event-")) {
      removeDemoEntity(entity)
    }
  }
  for (const marker of eventMarkers) {
    removeDemoEntity(marker)
  }
  eventMarkers = []
}

function cleanupSeparationVisuals() {
  const entities = Array.from(engine.entities ?? [])
  for (const entity of entities as any[]) {
    const name = typeof entity?.name === "string" ? entity.name : ""
    if (name.startsWith("Jettison-")) {
      removeDemoEntity(entity)
    }
  }
  for (const visual of separationVisuals) {
    removeDemoEntity(visual)
  }
  separationVisuals = []
}

initScene()
</script>

<DemoPanel title="火箭主动段弹道仿真" width="326px" padding="12px">
  <div class="rocket-panel">
    <fieldset>
      <legend>发射点</legend>
      <div class="readonly-grid">
        <div><span class="sl">纬度</span><span class="sv">{launchSite.lat.toFixed(1)}°</span></div>
        <div><span class="sl">经度</span><span class="sv">{launchSite.lon.toFixed(1)}°</span></div>
        <div><span class="sl">高度</span><span class="sv">{launchSite.alt} m</span></div>
        <div><span class="sl">方位</span><span class="sv">{launchSite.az}°</span></div>
      </div>
    </fieldset>

    <fieldset>
      <legend>偏转程序</legend>
      <div class="row"><span class="lbl">开始</span><input type="range" min="0" max="60" step="0.5" bind:value={params.pitchStart} /><span class="val">T+{params.pitchStart}s</span></div>
      <div class="row"><span class="lbl">速率</span><input type="range" min="0.1" max="2.0" step="0.1" bind:value={params.pitchRate} /><span class="val">{params.pitchRate}°/s</span></div>
      <div class="row"><span class="lbl">偏角</span><input type="range" min="1" max="20" step="1" bind:value={params.pitchEnd} /><span class="val">{params.pitchEnd}°</span></div>
    </fieldset>

    <fieldset>
      <legend>一级</legend>
      <div class="row"><span class="lbl">推力</span><input type="range" min="100" max="15000" step="100" bind:value={params.s1Thrust} /><span class="val">{params.s1Thrust.toFixed(0)}kN</span></div>
      <div class="row"><span class="lbl">比冲</span><input type="range" min="200" max="400" step="1" bind:value={params.s1Isp} /><span class="val">{params.s1Isp}s</span></div>
      <div class="row"><span class="lbl">推进剂</span><input type="range" min="1" max="500" step="1" bind:value={params.s1Prop} /><span class="val">{params.s1Prop.toFixed(0)}t</span></div>
      <div class="row"><span class="lbl">干重</span><input type="range" min="0.5" max="50" step="0.5" bind:value={params.s1Dry} /><span class="val">{params.s1Dry.toFixed(1)}t</span></div>
      <div class="row"><span class="lbl">载荷</span><input type="range" min="0" max="30" step="0.5" bind:value={params.payload} /><span class="val">{params.payload.toFixed(1)}t</span></div>
      <div class="row"><label><input type="checkbox" bind:checked={params.twoStage} />双级</label></div>
    </fieldset>

    {#if params.twoStage}
      <fieldset>
        <legend>二级</legend>
        <div class="row"><span class="lbl">推力</span><input type="range" min="100" max="5000" step="100" bind:value={params.s2Thrust} /><span class="val">{params.s2Thrust.toFixed(0)}kN</span></div>
        <div class="row"><span class="lbl">比冲</span><input type="range" min="200" max="400" step="1" bind:value={params.s2Isp} /><span class="val">{params.s2Isp}s</span></div>
        <div class="row"><span class="lbl">推进剂</span><input type="range" min="1" max="200" step="1" bind:value={params.s2Prop} /><span class="val">{params.s2Prop.toFixed(1)}t</span></div>
        <div class="row"><span class="lbl">干重</span><input type="range" min="0.5" max="20" step="0.5" bind:value={params.s2Dry} /><span class="val">{params.s2Dry.toFixed(1)}t</span></div>
      </fieldset>
    {/if}

    <fieldset>
      <legend>环境</legend>
      <div class="row"><label><input type="checkbox" bind:checked={params.drag} />大气阻力</label></div>
    </fieldset>

    <div class="button-row">
      <button class="btn-launch" onclick={onLaunch}>{launched ? (playbackEnded ? '重播' : '重新播放') : '发射'}</button>
      {#if launched}
        <button class="btn-reset" onclick={onReset}>重置</button>
      {/if}
    </div>
  </div>
</DemoPanel>

{#if launched}
  <DemoPanel title="发射过程" top="auto" right="16px" bottom="272px" width="340px" padding="12px">
    <div class="rocket-panel flight-panel">
      <fieldset>
        <legend>实时状态</legend>
        <div class="phase-display">{currentPhase}</div>
        <div class="engine-status">{engineStatus}</div>
        <div class="telemetry">
          <span>T+{telemetry.t.toFixed(0)}s</span>
          <span>高 {(telemetry.alt / 1000).toFixed(1)}km</span>
          <span>速 {(telemetry.v / 1000).toFixed(2)}km/s</span>
        </div>
        <div class="camera-row">
          <button class="btn-ghost" onclick={focusRocket}>定位火箭</button>
          <button class:active={cameraFollow} class="btn-ghost" onclick={() => setCameraFollow(!cameraFollow)}>
            {cameraFollow ? "停止跟随" : "跟随"}
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend>弹道概要</legend>
        <div class="summary-grid">
          <div><span class="sl">远地点</span><span class="sv">{(summaryData.apogee / 1000).toFixed(1)} km</span></div>
          <div><span class="sl">最快</span><span class="sv">{(summaryData.maxV / 1000).toFixed(2)} km/s</span></div>
          <div><span class="sl">ΔV</span><span class="sv">{(summaryData.totalDV / 1000).toFixed(1)} km/s</span></div>
        </div>
      </fieldset>
    </div>
  </DemoPanel>
{/if}

<style>
.rocket-panel {
  color: var(--panel-text-bright, var(--panel-text, #d0d0d0));
  font-size: 12px;
  line-height: 1.45;
}
fieldset {
  border: 1px solid var(--panel-border, rgba(255,255,255,0.12)); border-radius: 8px;
  padding: 8px 10px; margin-bottom: 8px;
  background: var(--panel-bg-card, rgba(255,255,255,0.03));
}
legend {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.5px; color: var(--panel-text-label, var(--panel-text-muted, rgba(255,255,255,0.4))); padding: 0 4px;
}
.row {
  display: flex; align-items: center; gap: 6px; margin: 3px 0;
}
.lbl { min-width: 38px; color: var(--panel-text-label, rgba(255,255,255,0.5)); font-size: 11px; text-align: right; }
.val { min-width: 52px; color: var(--panel-accent, #ffaa33); font-size: 11px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }
input[type="range"] { flex: 1; height: 4px; accent-color: #ff8800; }
input[type="checkbox"] { accent-color: #ff8800; }
.button-row { display: flex; gap: 8px; margin: 8px 0; }
.btn-launch {
  flex: 1; padding: 10px; border: none; border-radius: 8px;
  background: linear-gradient(135deg, #cc4400, #ff6600);
  color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
}
.btn-launch:disabled { opacity: 0.4; cursor: not-allowed; background: #444; }
.btn-reset {
  padding: 10px 18px; border: 1px solid var(--panel-border, rgba(255,255,255,0.2));
  border-radius: 8px; background: var(--panel-btn-bg, transparent); color: var(--panel-btn-text, rgba(255,255,255,0.6));
  font-size: 12px; cursor: pointer;
}
.camera-row { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; }
.btn-ghost {
  min-height: 30px; border: 1px solid var(--panel-border, rgba(255,255,255,0.16)); border-radius: 6px;
  background: var(--panel-btn-bg, rgba(255,255,255,0.06)); color: var(--panel-btn-text, rgba(255,255,255,0.82));
  font-size: 11px; cursor: pointer; font-weight: 600;
}
.btn-ghost:hover, .btn-ghost.active {
  border-color: rgba(255,170,51,0.72); color: #ffaa33; background: rgba(255,136,0,0.12);
}
.phase-display {
  font-size: 17px; font-weight: 800; color: var(--panel-text-bright, #ffcc44); text-align: center;
  padding: 6px 0; text-shadow: 0 0 12px rgba(255,200,0,0.3);
}
.engine-status {
  margin: -2px 0 6px;
  color: var(--panel-accent, #ffaa33);
  text-align: center;
  font-size: 11px;
  font-weight: 700;
}
.telemetry {
  display: flex; justify-content: space-around; margin: 4px 0;
  font-size: 12px; color: var(--panel-text-bright, var(--panel-text, rgba(255,255,255,0.7))); font-variant-numeric: tabular-nums;
}
.summary-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;
}
.summary-grid > div, .readonly-grid > div { text-align: center; }
.readonly-grid {
  display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 6px;
}
.sl { display: block; font-size: 9px; color: var(--panel-text-muted, rgba(255,255,255,0.35)); }
.sv { display: block; font-size: 12px; font-weight: 700; color: var(--panel-accent, #ffaa33); }
</style>
