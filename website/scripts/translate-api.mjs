import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join, resolve } from 'path';

const ROOT = resolve('D:/work/logic/space/daisySpace/website/docs');

// Chinese → English translation map for repeated phrases
const TRANSLATIONS = {
  // Feature class descriptions
  'ArrowPointerFeature：从当前实体指向目标的"箭头线"要素。': 'ArrowPointerFeature: An "arrow line" feature pointing from the current entity to a target.',
  'CapsuleParticleFeature：胶囊粒子 Feature。': 'CapsuleParticleFeature: Capsule particle Feature.',
  '世界粒子 Feature。': 'World particle Feature.',
  '自由几何 Feature —— 让用户创建任意 3D 几何图形而不暴露 底层。': 'Free geometry Feature — allows users to create arbitrary 3D geometry without exposing the underlying layer.',
  'Feature 基类。': 'Base Feature class.',
  'NearEarthOrbiter：近地轨道目标（卫星/空间站/碎片等）。': 'NearEarthOrbiter: Low-Earth orbit target (satellites, space stations, debris, etc.).',
  'Satellite：NearEarthOrbiter 的语义别名。': 'Satellite: Semantic alias for NearEarthOrbiter.',
  'PopoverFeature\nDOM 弹出层组件，用于将 HTML 元素绑定到三维实体上，并跟随实体移动。': 'PopoverFeature\nDOM popup component for binding HTML elements to 3D entities, following entity movement.',
  '支持自定义定位方向、样式、固定尺寸及自动显隐。': 'Supports custom positioning direction, styling, fixed dimensions, and automatic show/hide.',

  // Feature intro descriptions
  '提供：': 'Provides:',
  '- 生命周期（register/update/destroy）基础流程': '- Lifecycle (register/update/destroy) base flow',
  '- 与 Entity/Engine 的关联': '- Association with Entity/Engine',
  '- 变换器（Transformer）与机体坐标轴（BodyAxis）等通用能力': '- Common capabilities: Transformer and BodyAxis',
  '与 ParticleFeature 的分工：': 'Division of labor with ParticleFeature:',
  '- ParticleFeature 是"世界粒子"：每个粒子都有独立位置、速度、生命周期，适合雨、雪、': '- ParticleFeature is a "world particle": each particle has independent position, velocity,',
  ' 烟雾、水流、风尘等离开宿主后仍属于物理世界的自然效果。': '  lifecycle, suitable for natural effects like rain, snow, fog, smoke, water flow, and dust.',
  '- CapsuleParticleFeature 是"宿主胶囊粒子"：使用一个世界锚定贴图面片播放': '- CapsuleParticleFeature is a "host capsule particle": uses a world-anchored sprite sheet to play',
  ' 预生成 canvas 动画帧，适合火箭喷焰、飞机尾焰、姿控喷口等强绑定宿主、': '  pre-generated canvas animation frames, suitable for rocket exhaust, aircraft afterburners, attitude control nozzles — effects strongly bound to a host,',
  ' 强聚焦目标、需要连续视觉体的效果。': '  highly focused, requiring continuous visual bodies.',
  '设计原因： ParticleSystem 内部是"每粒子一个 billboard"。当宿主高速运动、': 'Design rationale: ParticleSystem uses "one billboard per particle." When the host moves at high speed',
  '模型又启用 minimumPixelSize 时，离散粒子会暴露甩尾、散点和比例尺不一致的问题。': 'and minimumPixelSize is enabled, discrete particles exhibit trailing, scattering, and scale inconsistency.',
  '胶囊粒子把主体火焰收束为单个连续贴图片面。片面根部由宿主局部喷口决定，': 'Capsule particles consolidate the main flame into a single continuous sprite. The sprite root is determined by the host\'s local nozzle,',
  '长轴由宿主本地方向决定；可选的 screenSpaceSizing 只按喷口处 meters-per-pixel': 'the long axis by the host\'s local direction; optional screenSpaceSizing adjusts length/radius by meters-per-pixel at the nozzle,',
  '调整长度/半径，不改变喷口锚点，因此近景不会因屏幕偏移而离开本地坐标轴。': 'without changing the nozzle anchor, so close-ups won\'t drift off the local axis.',

  // Particle descriptions
  'ParticleFeature 基于 ParticleSystem，每个粒子都会拥有独立的位置、速度、': 'ParticleFeature is based on ParticleSystem, where each particle has independent position, velocity,',
  '生命周期和 billboard。它适合雨、雪、雾、烟尘、水流、碎片扩散等"离开宿主后': 'lifecycle, and billboard. It is suitable for rain, snow, fog, smoke, water flow, debris diffusion, and other natural particle effects that',
  '仍属于物理世界"的自然粒子效果。': '"leave the host but remain in the physical world."',
  '如果效果强绑定宿主、目标高度聚焦，并且需要稳定连续的主体形态（例如火箭喷焰、': 'If the effect is strongly bound to the host, highly focused, and requires a stable continuous body (e.g., rocket exhaust,',
  '飞机尾焰、姿控喷口），优先使用 CapsuleParticleFeature。胶囊粒子用单个世界锚定': 'aircraft afterburner, attitude control nozzle), prefer CapsuleParticleFeature. Capsule particles use a single world-anchored',
  'sprite 面片播放预生成帧，并可做像素尺寸约束，避免高速目标出现离散粒子甩尾。': 'sprite sheet playing pre-generated frames, with optional pixel size constraints to avoid trailing on high-speed targets.',
  '用户传入 DaisyGeometryDescriptor（局部坐标的顶点/法线/索引），': 'Users pass a DaisyGeometryDescriptor (vertices/normals/indices in local coordinates),',
  'Daisy 自动构建底层 Daisy.Geometry + SafePrimitive + MaterialAppearance，': 'Daisy automatically builds the underlying Daisy.Geometry + SafePrimitive + MaterialAppearance,',
  '并加入 engine.collections.primitiveCollection。': 'and adds it to engine.collections.primitiveCollection.',
  '几何体跟随 Entity 移动/旋转（局部坐标系），与 CylinderFeature/BoxFeature 行为一致。': 'The geometry follows Entity movement/rotation (local coordinate system), consistent with CylinderFeature/BoxFeature.',

  // Common property descriptions
  '场景模式切换时的默认处理。': 'Default handling for scene mode switching.',
  '2D/非 3D 模式下，默认销毁机体坐标轴以避免异常显示。': 'In 2D/non-3D modes, destroys the body axis by default to avoid display anomalies.',
  'Feature 的唯一标识。': 'Unique identifier for the Feature.',
  '通常由基类在构造时自动生成：`${type}__${GenGuid()}`。': 'Usually auto-generated by the base class during construction: `${type}__${GenGuid()}`.',
  '子类也可以在注册前手动覆盖。': 'Subclasses can also override it manually before registration.',
  '当前 Feature 是否参与 Entity 的包围球聚合。': 'Whether this Feature participates in the Entity\'s bounding sphere aggregation.',
  '默认值为 `true`。辅助线、粒子等不希望影响相机取景的 Feature 可以关闭。': 'Default is `true`. Features like guidelines and particles that should not affect camera framing can disable this.',
  '设置当前 Feature 是否参与 Entity 的包围球聚合。': 'Sets whether this Feature participates in the Entity\'s bounding sphere aggregation.',
  '获取当前 Feature 的 LOD 模式。': 'Gets the current Feature\'s LOD mode.',
  '设置当前 Feature 的 LOD 模式。': 'Sets the current Feature\'s LOD mode.',
  'Feature 的显示名称（业务自定义）。': 'Display name for the Feature (business-custom).',
  '获取组件配置（EntityComOptions）。': 'Gets the component configuration (EntityComOptions).',
  '子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。': 'Subclasses typically read configurations like show / distanceDisplayCondition / height from this object.',
  '组件配置': 'Component configuration',
  '默认保守：大多数 Feature 需要 Entity 模型矩阵。': 'Conservative default: most Features require the Entity model matrix.',
  '当前 Feature 是否需要 Entity 在每帧预先计算模型矩阵。': 'Whether this Feature requires the Entity to precompute the model matrix each frame.',
  '点、标签、广告牌这类只依赖实体位置的 Feature 可以返回 false，': 'Features like points, labels, and billboards that only depend on entity position can return false,',
  '从而让海量目标场景跳过不必要的姿态/矩阵计算。': 'allowing massive target scenarios to skip unnecessary pose/matrix calculations.',
  '获取当前 Feature 是否允许被截流。': 'Gets whether this Feature allows throttling.',
  '设置当前 Feature 是否允许被截流。': 'Sets whether this Feature allows throttling.',
  '当值变化时，会尝试通知所属 Entity 重新聚合其 feature-level 调度状态。': 'When the value changes, attempts to notify the owning Entity to reaggregate its feature-level scheduling state.',
  '是否启用 LOD（由外部策略驱动决定是否显示）。': 'Whether LOD is enabled (display decision driven by external strategy).',
  '获取视距配置': 'Gets the view distance configuration',
  '注册前置逻辑（子类可覆盖）。': 'Pre-registration logic (subclass can override).',
  '默认行为：记录所属 Entity 引用。': 'Default: stores the owning Entity reference.',
  '销毁 Feature。': 'Destroys the Feature.',
  '会解除 morph 监听、销毁事件桥接与坐标轴，并清理内部 EventManager。': 'Removes morph listeners, destroys event bridge and axis, and cleans up the internal EventManager.',
  '关闭"追踪"能力（保留 trackingTarget 配置）。': 'Disables the "tracking" capability (preserves trackingTarget configuration).',
  '启用"追踪"能力。': 'Enables the "tracking" capability.',
  '追踪目标可为 Entity / Cartographic / Cartesian3；子类可在 update 中使用': 'The tracking target can be Entity / Cartographic / Cartesian3; subclasses can use',
  '`_getTrackTargetBPosition` 获取目标位置并做朝向、连线等行为。': '`_getTrackTargetBPosition` in update to get target position and perform orientation, linking, etc.',
  '强制刷新 Feature 的表现。': 'Force-refreshes the Feature\'s appearance.',
  '用于某些需要"重建节点"的 Feature（如底层 底层 Primitive 无法增量更新时）。': 'Used for Features that need to "rebuild nodes" (e.g., when the underlying Primitive cannot be incrementally updated).',
  '默认调用 `reCreate`，具体行为由子类实现。': 'Defaults to calling `reCreate`, with behavior implemented by subclasses.',
  '获取所属 Entity 的当前位置（与 Entity.getCurrentPosition 一致）。': 'Gets the current position of the owning Entity (same as Entity.getCurrentPosition).',
  '获取所属 Engine（如果已注册到 Entity）。': 'Gets the owning Engine (if registered to an Entity).',
  '获取当前 Feature 的变换矩阵。': 'Gets the current Feature\'s transformation matrix.',
  '若未设置 transformer 的应用矩阵，则返回单位矩阵。': 'Returns the identity matrix if no transformer application matrix is set.',
  '变换矩阵': 'Transformation matrix',
  '当前 Engine 是否处于 3D 模式。': 'Whether the current Engine is in 3D mode.',
  '将 Feature 注册到指定 Entity 上。': 'Registers the Feature to the specified Entity.',
  '会触发 BEFORE_REGISTER/AFTER_REGISTER/REGISTER，并安装交互事件桥接（若已启用）。': 'Triggers BEFORE_REGISTER/AFTER_REGISTER/REGISTER and installs interaction event bridge (if enabled).',
  '同时会补齐默认 distanceDisplayCondition（若用户未配置）。': 'Also fills in default distanceDisplayCondition if not configured by the user.',
  '重置与时间连续性相关的内部状态。': 'Resets internal state related to time continuity.',
  '默认实现为空，供需要处理 seek / rewind / 暂停拖拽 的 Feature 覆盖。': 'Default implementation is empty, for Features that need to handle seek/rewind/pause-drag.',
  '配置机体坐标轴（BodyAxis）。': 'Configures the body axis (BodyAxis).',
  '调用后会在 update 周期内按需创建/更新坐标轴（仅 3D 模式可用）。': 'Creates/updates the axis on-demand during the update cycle (3D mode only).',
  '设置当前 Feature 是否参与 Entity 的包围球聚合。': 'Sets whether this Feature participates in the Entity\'s bounding sphere aggregation.',
  '是否参与包围球聚合。': 'Whether to participate in bounding sphere aggregation.',
  '当前 Feature，便于链式调用。': 'Current Feature, for chaining.',
  '取消注册（等价于 destroy）。': 'Unregisters (equivalent to destroy).',
  '销毁要素：从 viewer 的集合中移除 polyline 与 label，并释放引用。': 'Destroys the feature: removes polyline and label from viewer collections and releases references.',
  '取消监听 Feature 的点击事件。': 'Removes the Feature click event listener.',
  '可选：指定要移除的回调；不传则移除该事件下的全部监听': 'Optional: specifies the callback to remove; if omitted, removes all listeners for this event.',
  '取消监听 Feature 的双击事件。': 'Removes the Feature double-click event listener.',
  '取消监听场景模式切换。': 'Removes the scene mode switch listener.',
  '取消监听 Feature 的鼠标移入事件。': 'Removes the Feature mouse enter event listener.',
  '取消监听 Feature 的鼠标移出事件。': 'Removes the Feature mouse leave event listener.',
  '监听注册后回调。': 'Listens for the post-registration callback.',
  '在此阶段会同步 LOD 的 show 初始值。': 'At this stage, synchronizes the initial show value of LOD.',
  '监听销毁前回调。': 'Listens for the pre-destruction callback.',
  '监听注册前回调。': 'Listens for the pre-registration callback.',
  '该回调不带参数；若需要 Entity 参数请使用 onRegister。': 'This callback has no parameters; use onRegister if Entity parameter is needed.',
  '监听更新前回调。': 'Listens for the pre-update callback.',
  '监听 Feature 的点击事件。': 'Listens for the Feature click event.',
  '事件回调': 'Event callback',
  '监听 Feature 的双击事件。': 'Listens for the Feature double-click event.',
  '监听销毁回调。': 'Listens for the destruction callback.',
  '监听场景模式切换。': 'Listens for the scene mode switch.',
  '监听 Feature 的鼠标移入事件。': 'Listens for the Feature mouse enter event.',
  '监听 Feature 的鼠标移出事件。': 'Listens for the Feature mouse leave event.',
  '监听注册完成事件。': 'Listens for the registration completion event.',
  '回调参数为所属 Entity': 'Callback parameter is the owning Entity',
  '监听更新回调。': 'Listens for the update callback.',

  // Orbit-related
  '提供能力：': 'Provides:',
  '- 按 NORAD Catalog Number 拉取 TLE（带缓存）': '- Fetch TLE by NORAD Catalog Number (with caching)',
  '- 接收通用轨道源输入（TLE / OMM XML / JSON GP）': '- Accept general orbit source input (TLE / OMM XML / JSON GP)',
  '- 使用通用轨道源进行实时传播（可选）': '- Real-time propagation using general orbit source (optional)',
  '- 构建一段时间范围内的星历采样轨迹（TrajectorySample）': '- Build ephemeris sampled trajectory (TrajectorySample) over a time range',
  '创建 CapsuleParticleFeature。': 'Creates a CapsuleParticleFeature.',
  '创建 ArrowPointerFeature。': 'Creates an ArrowPointerFeature.',
  '创建 NearEarthOrbiter。': 'Creates a NearEarthOrbiter.',
  '近地轨道目标（卫星/空间站/碎片等）。': 'Low-Earth orbit target (satellites, space stations, debris, etc.).',
  '获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。': 'Gets the host Entity (for mounting Features, interaction events, updates, etc.).',
  '对象创建/配置参数的原始快照（不同子类会扩展其结构）。': 'Raw snapshot of object creation/configuration parameters (subclasses extend the structure).',
  '注意：这是"语义配置"的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。': 'Note: This is the source of "semantic configuration," not rendering output. Rendering is handled by _applyConfig + Feature/Component.',
  '设置对象位置（支持静态坐标或采样轨迹）。': 'Sets the object position (supports static coordinates or sampled trajectories).',
  '- 赋值后会同步写入宿主 entity.position': '- Writes to host entity.position after assignment',
  '- 对 CelestialEntity（非地球天体）不允许使用支持惯性系的 TrajectorySample': '- CelestialEntity (non-Earth bodies) does not allow TrajectorySample in inertial frame',
  '便捷设置位置（支持静态坐标或采样轨迹）。': 'Convenient position setter (supports static coordinates or sampled trajectories).',
  '便捷设置姿态（写入宿主 Entity.orientation）。': 'Convenient orientation setter (writes to host Entity.orientation).',
  '挂载一个 PhysicalWorld 组件到当前对象。': 'Mounts a PhysicalWorld component to the current object.',
  '注意：Feature 仍应通过 Entity.addFeature() 的路径挂载；该方法仅面向 IComponent。': 'Note: Features should still be mounted via Entity.addFeature(); this method is for IComponent only.',
  '组件实例': 'Component instance',
  '添加真实星下点滚动轨迹组件。': 'Adds a real-time ground track component.',
  '添加轨道根数几何视图组件。': 'Adds an orbital elements view component.',
  '添加实时轨道圈组件。': 'Adds a real-time orbit component.',
  '添加传感器。': 'Adds a sensor.',
  '说明：': 'Notes:',
  '- 轨道目标通常希望传感器"安装在机体坐标系原点"': '- Orbital targets typically want the sensor "mounted at the body coordinate system origin"',
  '- 这里会注入一个默认 position，使传感器不受对象位置写入策略影响': '- Injects a default position so the sensor is unaffected by object position write strategies',
  '旧名兼容入口。': 'Legacy name compatibility entry.',
  '写入轨迹采样的简写入口。': 'Shortcut entry for writing trajectory samples.',
  '默认行为：': 'Default behavior:',
  '- 自动使用当前场景的开始/结束时间': '- Automatically uses the current scene\'s start/end time',
  '- `stepSeconds` 默认 600': '- `stepSeconds` defaults to 600',
  '绑定到 Engine 并完成注册。': 'Binds to Engine and completes registration.',
  '额外行为：': 'Additional behavior:',
  '- 若未显式关闭自动轨迹，且已经有轨道源，会在绑定后自动执行一次 `applyTrajectory()`': '- If auto-trajectory is not disabled and an orbit source exists, automatically executes `applyTrajectory()` after binding',
  '构建一段时间范围内的星历轨迹采样（TrajectorySample）。': 'Builds ephemeris trajectory samples (TrajectorySample) over a time range.',
  '说明：': 'Notes:',
  '- 该方法用于"离线采样 + 插值"的方式驱动目标': '- This method uses "offline sampling + interpolation" to drive the target',
  '- 若你启用了实时传播，也可以不使用该方法': '- If real-time propagation is enabled, this method is optional',
  '获取一段时间范围内的星历计算结果（不构建 TrajectorySample）。': 'Gets ephemeris calculation results over a time range (without building TrajectorySample).',
  '清空星历缓存。': 'Clears the ephemeris cache.',
  '销毁对象（清理交互监听、销毁组件、销毁宿主实体并释放事件管理器）。': 'Destroys the object (cleans up interaction listeners, destroys components, destroys host entity, releases event manager).',
  '根据 id 获取组件列表（理论上 id 全局唯一，但保留返回数组以兼容历史逻辑）。': 'Gets component list by id (theoretically globally unique, but returns an array for historical compatibility).',
  '组件 id': 'Component id',
  '根据 name 获取组件列表。': 'Gets component list by name.',
  '组件名称（component.name）': 'Component name (component.name)',
  '获取组件列表。': 'Gets the component list.',
  '组件类型（对应 component.type）；不传则返回全部': 'Component type (corresponds to component.type); if not passed, returns all.',
  '获取当前仿真时刻的轨道状态。': 'Gets the orbital state at the current simulation time.',
  '获取当前仿真时刻的局部姿态。': 'Gets the local orientation at the current simulation time.',
  '获取当前仿真时间的实时位置。': 'Gets the real-time position at the current simulation time.',
  '如果 position 是 TrajectorySample，会根据引擎当前时间求值；': 'If position is a TrajectorySample, evaluates at the engine\'s current time;',
  '如果是静态 Cartesian3，直接返回。': 'If it\'s a static Cartesian3, returns directly.',
  '当前时刻的世界坐标，或 undefined（无法求值时）': 'World coordinates at the current time, or undefined (if evaluation fails)',
  '获取当前已经计算并缓存的星历数据。': 'Gets the currently computed and cached ephemeris data.',
  '如果传入 params，则仅在与当前缓存参数一致时返回缓存结果，不会触发重算。': 'If params are provided, returns cached result only if consistent with current cache parameters; does not trigger recalculation.',
  '获取当前星历缓存元数据。': 'Gets the current ephemeris cache metadata.',
  '获取当前轨道定义。': 'Gets the current orbit definition.',
  '解析当前轨道定义的轨道根数。': 'Parses the orbital elements of the current orbit definition.',
  '解析当前轨道定义的元数据。': 'Parses the metadata of the current orbit definition.',
  '获取指定仿真时刻的轨道状态（位置/姿态/瞬时轨道根数）。': 'Gets the orbital state at a specified simulation time (position/orientation/instantaneous orbital elements).',
  '获取指定仿真时刻的局部姿态。': 'Gets the local orientation at a specified simulation time.',
  '获取指定时刻的位置（委托给宿主 entity.getPosition）。': 'Gets the position at a specified time (delegates to host entity.getPosition).',
  '仿真时间': 'Simulation time',
  '获取指定仿真时刻的世界位置。': 'Gets the world position at a specified simulation time.',
  '获取指定仿真时刻的局部变换矩阵。': 'Gets the local transformation matrix at a specified simulation time.',
  '计算卫星过境窗口（卫星自身能力，基于当前轨道源）。': 'Computes satellite transit windows (based on current orbit source).',
  '返回值中的 `start/end` 为毫秒时间戳，可直接转为 `Date` 或 `JulianDate` 使用。': 'The `start/end` in the return value are millisecond timestamps, usable directly as `Date` or `JulianDate`.',
  '计算可见窗口（仅返回 [startMs, endMs] 列表）。': 'Computes visibility windows (returns [startMs, endMs] list only).',
  '在分组列表中按名称模糊匹配并写入当前对象。': 'Fuzzy-matches by name in the group list and writes to the current object.',
  '根据 NORAD Catalog Number 拉取 TLE（带缓存）。': 'Fetches TLE by NORAD Catalog Number (with caching).',
  'NORAD Catalog Number': 'NORAD Catalog Number',
  '缓存时效（秒）': 'Cache lifetime (seconds)',
  '按分组拉取 TLE 列表（带缓存）。': 'Fetches a TLE list by group (with caching).',
  '计算指定仿真时刻的单点观测结果。': 'Computes single-point observation result at a specified simulation time.',
  '将宿主实体注册到 Daisy 管线中（触发 entity.reRegisterAll）。': 'Registers the host entity into the Daisy pipeline (triggers entity.reRegisterAll).',
  '根据 id 移除组件（会先 destroy）。': 'Removes component by id (calls destroy first).',
  '根据 name 移除组件（会先 destroy）。': 'Removes component by name (calls destroy first).',
  '组件名称': 'Component name',
  '重置跨帧/跨时间循环的运行态。': 'Resets cross-frame/cross-time-loop runtime state.',
  'Engine 在检测到仿真时间倒退时调用此方法。这里不销毁业务配置，只清理': 'Engine calls this method when detecting simulation time going backward. It does not destroy business configuration, only',
  'BaseObject 自身的时间值缓存，并把 reset 继续下发给挂载组件。': 'BaseObject\'s own time value cache, and propagates reset to mounted components.',
  '更新配置（会按策略重建对应的 Feature）。': 'Updates configuration (rebuilds corresponding Features per strategy).',
  '新配置': 'New configuration',
  '设置轨道定义（首选入口）。': 'Sets the orbit definition (preferred entry).',
  '设置通用轨道源。': 'Sets a general orbit source.',
  '启用/关闭实时传播。': 'Enables/disables real-time propagation.',
  '设置 TLE（legacy 兼容入口）。': 'Sets TLE (legacy compatibility entry).',
  '两行或三行 TLE（字符串或字符串数组）': 'Two-line or three-line TLE (string or string array)',
  '反注册：移除实体挂载的所有 Feature，并通知组件解除绑定。': 'Unregisters: removes all Features mounted on the entity and notifies components to unbind.',
  '每帧更新：': 'Per-frame update:',
  '- 可选实时传播：按仿真时间更新位置': '- Optional real-time propagation: updates position by simulation time',
  '- 可选速度朝向：当 position 是轨迹采样时自动更新姿态': '- Optional velocity orientation: auto-updates orientation when position is a trajectory sample',
  '取消监听对象点击事件。': 'Removes the object click event listener.',
  '取消监听对象双击事件。': 'Removes the object double-click event listener.',
  '取消监听对象鼠标移入事件。': 'Removes the object mouse enter event listener.',
  '取消监听对象鼠标移出事件。': 'Removes the object mouse leave event listener.',
  '监听销毁前事件。': 'Listens for the pre-destruction event.',
  '监听注册前事件。': 'Listens for the pre-registration event.',
  '监听卸载前事件。': 'Listens for the pre-unregistration event.',
  '监听更新前事件。': 'Listens for the pre-update event.',
  '监听对象点击事件。': 'Listens for the object click event.',
  '监听对象双击事件。': 'Listens for the object double-click event.',
  '监听销毁事件。': 'Listens for the destruction event.',
  '监听对象鼠标移入事件。': 'Listens for the object mouse enter event.',
  '监听对象鼠标移出事件。': 'Listens for the object mouse leave event.',
  '监听注册完成事件。': 'Listens for the registration completion event.',
  '监听卸载事件。': 'Listens for the unregistration event.',
  '监听更新事件。': 'Listens for the update event.',

  // Popover feature
  '构造函数': 'Constructor',
  '配置选项': 'Configuration options',
  '获取配置选项': 'Gets configuration options',
  '更新配置选项': 'Updates configuration options',
  '更新后会自动刷新样式': 'Automatically refreshes styles after update',
  '新的配置选项': 'New configuration options',
  '销毁组件\n 移除 DOM 元素（或根据 destroyDOM 配置进行隐藏处理）': 'Destroys the component\n  Removes the DOM element (or hides it based on destroyDOM configuration)',
  '强制刷新 Feature 的表现。': 'Force-refreshes the Feature\'s appearance.',
  '配置项': 'Configuration options',
  '重新创建组件': 'Recreates the component',
  '目标实体': 'Target entity',
  '注册组件到实体': 'Registers component to entity',
  '每帧更新回调\n 用于更新 DOM 元素在屏幕上的位置': 'Per-frame update callback\n  Used to update the DOM element\'s position on screen',
  '关联实体': 'Associated entity',
  '当前时间': 'Current time',

  // Missing ones
  '注册到 Daisy.Entity：创建/挂载底层 polyline 与（可选）label。': 'Registers to Daisy.Entity: creates/mounts underlying polyline and (optional) label.',
  '注意：即使不主动调用，`update()` 在需要时也会自动触发注册。': 'Note: Even without explicit invocation, `update()` will automatically trigger registration when needed.',
  '当前要素所属实体': 'The entity the current feature belongs to',
  '每帧更新：解析目标位置、根据像素长度换算世界长度，更新箭头线与 label。': 'Per-frame update: resolves target position, converts pixel length to world length, updates arrow line and label.',
  '当前帧时间（用于解析 Entity 位置/天体位置）': 'Current frame time (for resolving Entity positions/celestial body positions)',
  '// 一般由 Engine 的渲染循环自动调用，无需手动调用': '// Normally called automatically by Engine\'s render loop, no manual invocation needed',

  // CapsuleParticle specific
  '将 Feature 注册到指定 Entity 上。': 'Registers the Feature to the specified Entity.',
  '获取组件配置（EntityComOptions）。': 'Gets the component configuration (EntityComOptions).',

  // FreeGeometry specific
  '运行时替换几何。会触发重建 primitive。': 'Replaces geometry at runtime. Triggers primitive rebuild.',
  '运行时替换材质。会触发重建 primitive。': 'Replaces material at runtime. Triggers primitive rebuild.',

  // Tileset specific
  '注册 tileset 加载完成回调。': 'Registers a tileset load completion callback.',
  '若 tileset 已加载，回调会立即执行。': 'If the tileset is already loaded, the callback executes immediately.',

  // Type alias descriptions
  '扫描线材质配置。': 'Scanline material configuration.',
  '湍流材质配置。': 'Turbulence material configuration.',
  '极光带材质配置。': 'Aurora material configuration.',
  '电路板纹材质配置。': 'Circuit board material configuration.',
  '分层等值带材质配置。': 'Contour bands material configuration.',
  '发光网格材质配置。': 'Glowing grid material configuration.',
  '径向热力材质配置。': 'Radial heatmap material configuration.',
  '大理石纹材质配置。': 'Marble material configuration.',
  '噪声场材质配置。': 'Noise field material configuration.',
  '地形资源配置。': 'Terrain resource configuration.',
  'CorridorFeature 配置。': 'CorridorFeature configuration.',
  '用于在场景中沿路径绘制走廊几何体（如飞行走廊、道路等）。': 'Used to draw corridor geometry along a path in the scene (e.g., flight corridors, roads).',

  // Property descriptions - types
  '背景颜色。': 'Background color.',
  '扫描线密度。': 'Scanline density.',
  '整体透明度。': 'Overall opacity.',
  '扫描线颜色。': 'Scanline color.',
  '扫描速度。': 'Scan speed.',
  '扫描线宽度。': 'Scanline width.',
  '湍流低值颜色。': 'Turbulence low value color.',
  '湍流高值颜色。': 'Turbulence high value color.',
  '扰动强度。': 'Disturbance intensity.',
  '湍流空间尺度。': 'Turbulence spatial scale.',
  '动画速度。': 'Animation speed.',
  '光带高值颜色。': 'Aurora band high value color.',
  '发光强度。': 'Glow intensity.',
  '光带低值颜色。': 'Aurora band low value color.',
  '光带波动幅度。': 'Aurora band wave amplitude.',
  '光带宽度。': 'Aurora band width.',
  '电路板底色。': 'Circuit board base color.',
  '横纵单元数量。': 'Horizontal and vertical cell count.',
  '发光强度。': 'Glow intensity.',
  '节点半径。': 'Node radius.',
  '线路颜色。': 'Trace color.',
  '线路宽度。': 'Trace width.',
  '色带数量。': 'Band count.',
  '高值颜色。': 'High value color.',
  '分界线宽度。': 'Boundary line width.',
  '低值颜色。': 'Low value color.',
  '色带倾斜偏移。': 'Band slope offset.',
  '网格背景颜色。': 'Grid background color.',
  '横纵网格数量。': 'Horizontal and vertical grid count.',
  '网格线颜色。': 'Grid line color.',
  '网格线宽度。': 'Grid line width.',
  '发光脉冲速度。': 'Glow pulse speed.',
  '归一化纹理坐标中的热区中心。': 'Heatmap center in normalized texture coordinates.',
  '低值颜色。': 'Low value color.',
  '热区增益。': 'Heat zone gain.',
  '高值颜色。': 'High value color.',
  '中值颜色。': 'Mid value color.',
  '热区半径。': 'Heat zone radius.',
  '石材底色。': 'Stone base color.',
  '纹脉频率。': 'Vein frequency.',
  '纹理空间尺度。': 'Texture spatial scale.',
  '纹脉颜色。': 'Vein color.',
  '纹脉扭曲强度。': 'Vein warp intensity.',
  '噪声低值颜色。': 'Noise low value color.',
  '噪声高值颜色。': 'Noise high value color.',
  '明暗对比度，范围为 0 至 1。': 'Brightness contrast, range 0 to 1.',
  '整体透明度，范围为 0 至 1。': 'Overall opacity, range 0 to 1.',
  '噪声空间尺度。': 'Noise spatial scale.',

  // GeoEarthTransparency
  '统一透明度，0 为完全透明，1 为完全不透明。': 'Uniform opacity, 0 is fully transparent, 1 is fully opaque.',
  '背面透明度。': 'Back face opacity.',
  '背面透明度随相机距离变化。': 'Back face opacity varies with camera distance.',
  '是否启用地球半透明。': 'Whether to enable Earth transparency.',
  '正面透明度。': 'Front face opacity.',
  '正面透明度随相机距离变化。': 'Front face opacity varies with camera distance.',
  '是否显示大气层。': 'Whether to show the atmosphere.',

  // CorridorOptions properties
  '是否贴地。': 'Whether to clamp to ground.',
  '贴地分类目标。': 'Ground classification target.',
  '仅在 `clampToGround=true` 且底层使用 GroundPrimitive 时生效。': 'Only effective when `clampToGround=true` and using GroundPrimitive.',
  '拐角类型。': 'Corner type.',
  '显示距离条件。': 'Distance display condition.',
  '当相机距离超出该范围时会自动隐藏。': 'Auto-hides when camera distance exceeds this range.',
  '贴地计算与天体跟随所使用的天体椭球。': 'Celestial ellipsoid used for ground clamping and celestial body following.',
  '注意：一旦该组件通过 Entity.addFeature() 添加到实体上，会被实体的 celestialEllipsoid 覆盖，': 'Note: Once this component is added to an entity via Entity.addFeature(), it will be overridden by the entity\'s celestialEllipsoid,',
  '组件将始终遵循实体的天体椭球配置。': 'the component will always follow the entity\'s celestial ellipsoid configuration.',
  '挤出高度（单位：米）。': 'Extruded height (in meters).',
  '设置后走廊会从地面挤出到指定高度，形成立体效果。': 'When set, the corridor extrudes from ground to specified height, creating a 3D effect.',
  '是否填充面。': 'Whether to fill the surface.',
  '采样粒度（单位：弧度）。': 'Sampling granularity (in radians).',
  '走廊高度（单位：米）。': 'Corridor height (in meters).',
  '走廊材质。': 'Corridor material.',
  '支持 `Daisy.Material` 或颜色（`DColor` / CSS 色值字符串）。': 'Supports `Daisy.Material` or color (`DColor` / CSS color string).',
  '是否绘制轮廓线。': 'Whether to draw outline.',
  '轮廓颜色。': 'Outline color.',
  '轮廓宽度（单位：像素）。': 'Outline width (in pixels).',
  '走廊路径。': 'Corridor path.',
  '支持点位、实体引用与父实体占位符。': 'Supports points, entity references, and parent entity placeholders.',
  '是否显示。': 'Whether to show.',
  '更新节流时间（单位：毫秒）。': 'Update throttle time (in milliseconds).',
  '适用于高频更新时降低重算开销。': 'Reduces recalculation overhead for high-frequency updates.',
  '顶点格式。': 'Vertex format.',
  '走廊宽度（单位：米）。': 'Corridor width (in meters).',

  // GeoTerrain
  '地形类型：无高程的椭球体。': 'Terrain type: ellipsoid without elevation.',
  'Ion 资产 地形资产 ID。默认 `1`。': 'Ion terrain asset ID. Defaults to `1`.',
  '是否请求地形顶点法线。坡度、坡向等地形材质依赖该数据。默认 `true`。': 'Whether to request terrain vertex normals. Terrain materials like slope and aspect depend on this. Defaults to `true`.',
  '是否请求水陆遮罩。默认 `false`。': 'Whether to request water mask. Defaults to `false`.',
  '地形类型：Ion 资产。': 'Terrain type: Ion asset.',
  '地形类型：ArcGIS': 'Terrain type: ArcGIS',
  '自定义地形数据源实例，仅建议高级用户使用。': 'Custom terrain data source instance, only recommended for advanced users.',
  '地形类型：自定义': 'Terrain type: Custom',

  // PropulsionParticleOptions
  '透明度覆盖，范围 0~1。': 'Opacity override, range 0~1.',
  '统一火焰主色。传入后会派生 startColor/endColor。': 'Uniform flame primary color. Derives startColor/endColor when set.',
  '发射率倍率。': 'Emission rate scale.',
  '粒子速度/长度表现倍率。': 'Particle velocity/length scale.',
  '内置粒子预设。当前仅提供 rocket-flame，后续粒子库会继续扩展。': 'Built-in particle preset. Currently only provides rocket-flame; more presets will be added.',
  '喷焰渲染管线。': 'Exhaust rendering pipeline.',
  '- `capsule-sprite`：宿主胶囊粒子，一张世界锚定 sprite 面片，适合火箭/飞机喷焰。': '- `capsule-sprite`: host capsule particle, a world-anchored sprite sheet, suitable for rocket/aircraft exhaust.',
  '- `capsule-billboard`：旧配置兼容别名，内部同样走 `capsule-sprite`。': '- `capsule-billboard`: legacy compatibility alias, internally uses `capsule-sprite`.',
  '- `world-particle`：世界粒子，逐粒子积分，适合烟雾、雨雪、水流等离开宿主后的自然粒子。': '- `world-particle`: world particles, per-particle integration, suitable for smoke, rain, snow, water flow and other natural particles after leaving the host.',
  '粒子尺寸倍率。': 'Particle size scale.',

  // CapsuleParticleEmitter2DOptions
  '发射方向，单位：度。与 city41/particle.js 一致，90 表示向上喷射。': 'Emission direction in degrees. Consistent with city41/particle.js, 90 means upward.',
  '颜色随机强度，0~1。用于快速控制粒子间色彩差异。': 'Color randomization intensity, 0~1. Used to quickly control color variation between particles.',
  '发射频率语义，单位为"每个循环周期内的粒子密度"。预生成模式下主要影响出生相位分布。': 'Emission rate semantics, in "particle density per cycle." In pre-generation mode, primarily affects birth phase distribution.',
  '是否启用胶囊内部 2D 粒子发射器。关闭时仍保留贴片姿态和像素比例逻辑。': 'Whether to enable the internal 2D particle emitter. When disabled, sprite orientation and pixel scale logic are preserved.',
  '2D canvas 内的重力/持续加速度，单位为归一化 canvas 高度 / 秒²。': 'Gravity/continuous acceleration in 2D canvas, in normalized canvas height / sec².',
  '单颗粒子基础半径，归一化到 canvas 宽度。': 'Base radius of a single particle, normalized to canvas width.',
  '粒子出生点，归一化 canvas 坐标，x/y 范围通常为 0~1。': 'Particle spawn point in normalized canvas coordinates, x/y range typically 0~1.',
  '粒子出生点随机半宽，归一化 canvas 坐标。': 'Particle spawn point random half-width in normalized canvas coordinates.',
  '粒子速度，单位为归一化 canvas 高度 / 秒。': 'Particle speed in normalized canvas height / sec.',
  '粒子沿速度方向的拉伸倍数。': 'Particle stretch factor along velocity direction.',
  '预生成动画循环内参与绘制的粒子数量。': 'Number of particles rendered in the pre-generated animation cycle.',

  // Plane.EclipticReferencePlaneOptions
  '颜色。': 'Color.',
  '显示距离条件。': 'Distance display condition.',
  '网格样式。': 'Grid style.',
  '唯一标识。': 'Unique identifier.',
  '平面透明度。': 'Plane opacity.',
  '参考半径，用于控制矩形平面的半宽半高。': 'Reference radius for controlling rectangle plane half-width and half-height.',
  '分段数（越大越圆滑，但几何更重）。': 'Segment count (higher = smoother but heavier geometry).',
  '是否显示。': 'Whether to show.',
  '更新间隔（单位：秒）。': 'Update interval (in seconds).',

  // TimeFormatOptions
  '自定义 token 格式，优先级高于预设的默认格式。': 'Custom token format, takes precedence over default preset format.',
  '自定义格式化函数；设置后优先于 `preset` 和 `format`。': 'Custom formatting function; takes precedence over `preset` and `format`.',
  '使用内置预设。默认 `utc`。': 'Uses built-in preset. Defaults to `utc`.',
  '`t0` 模式的参考时刻；未设置时相对秒数按 `0` 输出。': 'Reference time for `t0` mode; relative seconds output as `0` when not set.',
  '`t0` 文本前缀。默认 `T`。': '`t0` text prefix. Defaults to `T`.',
  '`t0` 累计秒是否保留三位小数。默认 `false`。': 'Whether `t0` cumulative seconds retain three decimal places. Defaults to `false`.',
  '`TZ` token 的显示名，例如 `BJT`。': 'Display name for the `TZ` token, e.g., `BJT`.',
  '相对 UTC 的时区偏移小时数，例如北京时间为 `8`。': 'Timezone offset hours from UTC, e.g., Beijing time is `8`.',

  // TimeFormatParts
  '目标时区下拆分后的日期时间字段。': 'Date-time fields split under the target timezone.',
  '月内日期，范围为 1 至 31。': 'Day of month, range 1 to 31.',
  '小时，范围为 0 至 23。': 'Hour, range 0 to 23.',
  '毫秒，范围为 0 至 999。': 'Millisecond, range 0 to 999.',
  '分钟，范围为 0 至 59。': 'Minute, range 0 to 59.',
  '月份，范围为 1 至 12。': 'Month, range 1 to 12.',
  '秒，范围为 0 至 59。': 'Second, range 0 to 59.',
  '四位年份。': 'Four-digit year.',

  // Additional NearEarthOrbiter
  '配置（含轨道源与传播策略）': 'Configuration (includes orbit source and propagation strategy)',
  '所属天体（默认地球）': 'Parent celestial body (default Earth)',
  '创建 NearEarthOrbiter。': 'Creates a NearEarthOrbiter.',
  '获取当前仿真时刻的局部姿态。': 'Gets the local orientation at the current simulation time.',
  '获取指定仿真时刻的局部姿态。': 'Gets the local orientation at a specified simulation time.',
  '配置（含轨道源与传播策略）': 'Configuration (includes orbit source and propagation strategy)',

  // ArrowPointerFeature specific
  '获取当前配置（合并后的最终配置）。': 'Gets the current configuration (merged final config).',
  '设置配置（直接覆盖，不做深合并）。': 'Sets the configuration (direct override, no deep merge).',
  '新配置': 'New configuration',
  '- 回调返回值发生变化时，才会触发方向/终点重算': '- Direction/endpoint recalculation only triggers when callback return values change',
  '- `targetSun/targetMoon` 使用 `Utils.getSunPositionECEF/getMoonPositionECEF`': '- `targetSun/targetMoon` use `Utils.getSunPositionECEF/getMoonPositionECEF`',
  '- label（如配置）固定放在箭头终点': '- label (if configured) is fixed at the arrow endpoint',

  // "回调函数" pattern - these appear with MORPH_SWITCH after them
  '回调函数': 'Callback function',

  // Force flush other form
  '用于某些需要\u201c重建节点\u201d的 Feature（如底层 底层 Primitive 无法增量更新时）。': 'Used for Features that need to \u201crebuild nodes\u201d (e.g., when the underlying Primitive cannot be incrementally updated).',
  ' 默认调用 `reCreate`，具体行为由子类实现。': ' Defaults to calling `reCreate`, with behavior implemented by subclasses.',

  // ArrowPointerFeature with curly quotes
  'ArrowPointerFeature\uff1a\u4ece\u5f53\u524d\u5b9e\u4f53\u6307\u5411\u76ee\u6807\u7684\u201c\u7bad\u5934\u7ebf\u201d\u8981\u7d20\u3002': 'ArrowPointerFeature: An \u201carrow line\u201d feature pointing from the current entity to a target.',
  '\u5173\u95ed\u201c\u8ffd\u8e2a\u201d\u80fd\u529b\uff08\u4fdd\u7559 trackingTarget \u914d\u7f6e\uff09\u3002': 'Disables the \u201ctracking\u201d capability (preserves trackingTarget configuration).',
  '\u542f\u7528\u201c\u8ffd\u8e2a\u201d\u80fd\u529b\u3002': 'Enables the \u201ctracking\u201d capability.',

  // List items for ArrowPointerFeature (with curly quotes)
  '- 回调返回值发生变化时，才会触发方向/终点重算 - `targetSun/targetMoon` 使用 `Utils.getSunPositionECEF/getMoonPositionECEF` - label（如配置）固定放在箭头终点': '- Direction/endpoint recalculation only triggers when callback return values change; `targetSun/targetMoon` use `Utils.getSunPositionECEF/getMoonPositionECEF`; label (if configured) is fixed at the arrow endpoint',
};

// Helper to check if a string contains CJK characters
function hasChinese(text) {
  return /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text);
}

// Translate a line using the map
function translateLine(line) {
  if (!hasChinese(line)) return line;
  
  // Sort keys by length (longest first) to match more specific phrases first
  const keys = Object.keys(TRANSLATIONS).sort((a, b) => b.length - a.length);
  
  let result = line;
  for (const key of keys) {
    if (result.includes(key)) {
      result = result.replace(key, TRANSLATIONS[key]);
    }
  }
  
  // If still has Chinese, try fuzzy matching
  if (hasChinese(result)) {
    // Try to match common patterns
    result = result
      .replace(/配置（含轨道源与传播策略）/g, 'Configuration (includes orbit source and propagation strategy)')
      .replace(/所属天体（默认地球）/g, 'Parent celestial body (default Earth)')
      .replace(/配置（含轨道源与传播策略）/g, 'Configuration (includes orbit source and propagation strategy)')
      // Try to handle remaining Chinese by simple patterns
      .replace(/设置/g, 'Sets ')
      .replace(/获取/g, 'Gets ')
      .replace(/是否/g, 'Whether ')
      .replace(/配置/g, 'configuration')
      .replace(/参数/g, 'parameter')
      .replace(/更新/g, 'Update')
      .replace(/创建/g, 'Create')
      .replace(/销毁/g, 'Destroy')
      .replace(/注册/g, 'Register')
      .replace(/监听/g, 'Listen for ')
      .replace(/取消/g, 'Cancel ')
      .replace(/回调/g, 'callback')
      .replace(/事件/g, 'event')
      .replace(/对象/g, 'object')
      .replace(/当前/g, 'current')
      .replace(/所属/g, 'owning')
      .replace(/指定/g, 'specified')
      .replace(/实体/g, 'entity')
      .replace(/模式/g, 'mode')
      .replace(/默认/g, 'default')
      .replace(/场景/g, 'scene')
      .replace(/坐标轴/g, 'axis')
      .replace(/机体/g, 'body')
      .replace(/鼠标/g, 'mouse')
      .replace(/点击/g, 'click')
      .replace(/双击/g, 'double-click')
      .replace(/移入/g, 'enter')
      .replace(/移出/g, 'leave')
      .replace(/切换/g, 'switch');
      ;
  }
  
  return result;
}

// File mapping: source _source relative path → en relative path
const FILE_MAP = [
  // Classes
  ['_source/api/classes/ArrowPointerFeature.md', 'en/api/classes/ArrowPointerFeature.md'],
  ['_source/api/classes/CapsuleParticleFeature.md', 'en/api/classes/CapsuleParticleFeature.md'],
  ['_source/api/classes/CorridorFeature.md', 'en/api/classes/CorridorFeature.md'],
  ['_source/api/classes/FreeGeometryFeature.md', 'en/api/classes/FreeGeometryFeature.md'],
  ['_source/api/classes/PW.NearEarthOrbiter.md', 'en/api/classes/PW.NearEarthOrbiter.md'],
  ['_source/api/classes/PW.Satellite.md', 'en/api/classes/PW.Satellite.md'],
  ['_source/api/classes/ParticleFeature.md', 'en/api/classes/ParticleFeature.md'],
  ['_source/api/classes/TilesetFeature.md', 'en/api/classes/TilesetFeature.md'],
  ['_source/api/classes/UI.PopoverFeature.md', 'en/api/classes/UI.PopoverFeature.md'],
  // Interfaces (actual _source paths)
  ['_source/api/interfaces/CapsuleParticleEmitter2DOptions.md', 'en/api/interfaces/CapsuleParticleEmitter2DOptions.md'],
  ['_source/api/interfaces/Plane.EclipticReferencePlaneOptions.md', 'en/api/interfaces/Plane.EclipticReferencePlaneOptions.md'],
  ['_source/api/interfaces/TimeFormatOptions.md', 'en/api/interfaces/TimeFormatOptions.md'],
  ['_source/api/interfaces/TimeFormatParts.md', 'en/api/interfaces/TimeFormatParts.md'],
  // Types (mapped from user's interfaces/ → actual types/)
  ['_source/api/types/CorridorOptions.md', 'en/api/interfaces/CorridorOptions.md'],
  ['_source/api/types/DaisyScanlineOptions.md', 'en/api/interfaces/DaisyScanlineOptions.md'],
  ['_source/api/types/DaisyTurbulenceOptions.md', 'en/api/interfaces/DaisyTurbulenceOptions.md'],
  ['_source/api/types/GeoEarthTransparencyOptions.md', 'en/api/interfaces/GeoEarthTransparencyOptions.md'],
  ['_source/api/types/GeoTerrainOptions.md', 'en/api/interfaces/GeoTerrainOptions.md'],
  ['_source/api/types/PW.PropulsionParticleOptions.md', 'en/api/interfaces/PW.PropulsionParticleOptions.md'],
  // Types (actual types/ paths)
  ['_source/api/types/DaisyAuroraOptions.md', 'en/api/types/DaisyAuroraOptions.md'],
  ['_source/api/types/DaisyCircuitOptions.md', 'en/api/types/DaisyCircuitOptions.md'],
  ['_source/api/types/DaisyContourBandsOptions.md', 'en/api/types/DaisyContourBandsOptions.md'],
  ['_source/api/types/DaisyGridGlowOptions.md', 'en/api/types/DaisyGridGlowOptions.md'],
  ['_source/api/types/DaisyHeatmapOptions.md', 'en/api/types/DaisyHeatmapOptions.md'],
  ['_source/api/types/DaisyMarbleOptions.md', 'en/api/types/DaisyMarbleOptions.md'],
  ['_source/api/types/DaisyNoiseFieldOptions.md', 'en/api/types/DaisyNoiseFieldOptions.md'],
];

// Process each file
let total = 0;
let pending = 0;
const missing = [];

for (const [sourceRel, targetRel] of FILE_MAP) {
  const sourcePath = join(ROOT, sourceRel);
  const targetPath = join(ROOT, targetRel);
  
  if (!existsSync(sourcePath)) {
    missing.push(sourceRel);
    console.log(`MISSING: ${sourceRel}`);
    continue;
  }
  
  const content = readFileSync(sourcePath, 'utf-8');
  const lines = content.split('\n');
  const translatedLines = [];
  let inCodeBlock = false;
  let blocksTranslated = 0;
  
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      translatedLines.push(line);
      continue;
    }
    
    if (inCodeBlock) {
      translatedLines.push(line);
      continue;
    }
    
    const translated = translateLine(line);
    if (translated !== line) {
      blocksTranslated++;
    }
    translatedLines.push(translated);
  }
  
  const targetDir = dirname(targetPath);
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  
  writeFileSync(targetPath, translatedLines.join('\n'), 'utf-8');
  total++;
  pending += blocksTranslated;
  console.log(`OK: ${targetRel} (${blocksTranslated} blocks)`);
}

console.log(`\nDone: ${total} files, ~${pending} blocks translated`);
if (missing.length > 0) {
  console.log(`\nMissing _source files: ${missing.join(', ')}`);
}
console.log('\nSkipped (no _source): CoverageAreaInstanceOptions, CoverageShape, PW.CoverageVaryOptions, DaisyLiquidMetalOptions');
