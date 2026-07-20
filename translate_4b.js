var fs = require('fs');

// Read source file, apply translations, write back preserving original bytes
function translateFile(path, pairs) {
  var src = fs.readFileSync('website/docs/_source/' + path);
  var content = src.toString('utf8');
  var ok = 0;
  pairs.forEach(function(p) {
    if (content.indexOf(p[0]) >= 0) {
      content = content.replace(p[0], p[1]);
      ok++;
    } else {
      console.log('NOT FOUND in ' + path + ': ' + p[0].substring(0, 40));
    }
  });
  fs.writeFileSync('website/docs/en/' + path, content);
  return ok;
}

var count = 0;

// ModelAnimationLoop enum
count += translateFile('api/enums/ModelAnimationLoop.md', [
  ['模型动画循环模式。', 'Model animation loop mode.'],
  ['镜像循环（先正向播放再反向播放）。', 'Mirror loop (plays forward then reverse).'],
  ['不循环（播放一次后停止）。', 'No loop (stops after playing once).'],
  ['重复循环。', 'Repeat loop.'],
]);

// REF enum
count += translateFile('api/enums/REF.md', [
  ['特殊参考点（用于几何/路径 API 的坐标参考系）。', 'Special reference point (coordinate reference system for geometry/path APIs).'],
  ['全局原点。', 'Global origin.'],
  ['父实体位置。', 'Parent entity position.'],
  ['自身实体位置。', 'Self entity position.'],
]);

// VisibilityMode enum
count += translateFile('api/enums/VisibilityMode.md', [
  ['可见性控制模式。', 'Visibility control mode.'],
  ['点击模式（鼠标点击时显示）。', 'Click mode (shown on mouse click).'],
  ['悬停模式（鼠标悬停时显示）。', 'Hover mode (shown on mouse hover).'],
  ['正常模式（始终可见）。', 'Normal mode (always visible).'],
]);

// generateDistinctColors function
count += translateFile('api/functions/generateDistinctColors.md', [
  ['使用黄金角偏移生成 N 个视觉区分度高的 HSL 颜色。', 'Generates N visually distinct HSL colors using golden angle offset.'],
  ['黄金角（~137.508°）确保相邻颜色在色环上均匀分布，避免颜色聚集。', 'The golden angle (~137.508\u00b0) ensures adjacent colors are evenly distributed on the color wheel, avoiding color clustering.'],
  ['饱和度和亮度固定（70%/55%），仅旋转色相，适合在深色背景上使用。', 'Saturation and lightness are fixed (70%/55%), only hue rotates, suitable for use on dark backgrounds.'],
  ['生成颜色数量', 'Number of colors to generate'],
  ['HSL 颜色字符串数组，如 `["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", ...]`', 'HSL color string array, e.g. `["hsl(0, 70%, 55%)", "hsl(138, 70%, 55%)", ...]`'],
  ['// 用于为列表项分配唯一颜色', '// Used to assign unique colors to list items'],
]);

// getSunOcclusionState function
count += translateFile('api/functions/getSunOcclusionState.md', [
  ['使用天体对象判定任意世界坐标点的太阳遮挡状态。', 'Determines the sun occlusion state for any world coordinate point using celestial body objects.'],
  ['待判定点的世界坐标。', 'World coordinates of the point to evaluate.'],
  ['用于计算天体位置的仿真时刻。', 'Simulation time used to calculate celestial body positions.'],
  ['遮挡天体和光源天体；未设置时使用地球与太阳模型。', 'Occluding body and light source body; defaults to Earth and Sun models when not set.'],
]);

// BuildTrajectoryOptions interface
count += translateFile('api/interfaces/BuildTrajectoryOptions.md', [
  ['轨迹最大采样间隔（秒）。用于提高由速度推导姿态时的时间分辨率。', 'Maximum trajectory sampling interval (seconds). Used to improve time resolution when deriving attitude from velocity.'],
  ['轨迹最低采样频率（Hz）。例如 24 表示相邻采样点最多间隔 1/24 秒。', 'Minimum trajectory sampling frequency (Hz). For example, 24 means adjacent samples are at most 1/24 second apart.'],
  ['时间分配方式。', 'Time allocation method.'],
  ['- `uniform`：按采样点均匀分配时间', '- `uniform`: evenly distributes time across sample points'],
  ['- `number`：按段距离 / 该速度估算相对用时，再缩放到 start-stop 总时长', '- `number`: estimates relative time by segment distance / speed, then scales to the start-stop total duration'],
]);

// CoveragePolygon interface
count += translateFile('api/interfaces/CoveragePolygon.md', [
  ['单个覆盖区域的闭合多边形定义。', 'Closed polygon definition for a single coverage area.'],
  ['ring 为经纬度点数组，首尾无需重复（自动闭合）。', 'ring is an array of longitude/latitude points; the first and last points need not repeat (auto-closed).'],
  ['CSS 颜色字符串，如 "#ff0000" / "rgba(255,0,0,0.5)"', 'CSS color string, e.g., "#ff0000" / "rgba(255,0,0,0.5)"'],
  ['多边形标签文字（可选），设置后会在多边形重心位置显示', 'Polygon label text (optional); when set, displayed at the polygon centroid'],
  ['闭合经纬度环 [[lng, lat], [lng, lat], ...]，至少 3 个点', 'Closed longitude/latitude ring [[lng, lat], [lng, lat], ...], at least 3 points'],
]);

// GeoCelestialVisibilityOptions interface
count += translateFile('api/interfaces/GeoCelestialVisibilityOptions.md', [
  ['场景天体背景元素的显示配置。', 'Display configuration for scene celestial background elements.'],
  ['是否显示月亮。', 'Whether to show the moon.'],
  ['是否显示天空背景。', 'Whether to show the sky background.'],
  ['是否显示太阳。', 'Whether to show the sun.'],
]);

// GeoImageryProviderLayerOptions interface
count += translateFile('api/interfaces/GeoImageryProviderLayerOptions.md', [
  ['直接添加影像数据源时使用的图层显示参数。', 'Layer display parameters used when directly adding an imagery data source.'],
  ['图层透明度，`0` 为完全透明，`1` 为完全不透明；未设置时保留图层默认值。', 'Layer alpha, `0` for fully transparent, `1` for fully opaque; retains the layer default when not set.'],
  ['图层亮度，`1` 表示原始亮度；未设置时保留图层默认值。', 'Layer brightness, `1` for original brightness; retains the layer default when not set.'],
  ['图层对比度，`1` 表示原始对比度；未设置时保留图层默认值。', 'Layer contrast, `1` for original contrast; retains the layer default when not set.'],
]);

// CameraWeatherParticleOptions interface
count += translateFile('api/interfaces/PW.CameraWeatherParticleOptions.md', [
  ['相机前天气发射体积，x/y/z 分别对应相机右、上、前方向，单位：米。', 'Weather emission volume in front of the camera. x/y/z correspond to camera right/up/forward directions, in meters.'],
  ['天气体积中心距离相机的前向距离，单位：米。', 'Forward distance from the camera to the center of the weather volume, in meters.'],
  ['天气强度，范围 0~1。用于控制发射率和透明度。', 'Weather intensity, range 0~1. Controls emission rate and transparency.'],
  ['覆盖或追加底层世界粒子参数。', 'Overrides or appends underlying world particle parameters.'],
]);

// SimulationTimeDisplayWidgetOptions interface
count += translateFile('api/interfaces/SimulationTimeDisplayWidgetOptions.md', [
  ['仿真时间显示 Widget 配置。', 'Simulation time display widget configuration.'],
  ['已创建的 Daisy UI 管理器；未设置时使用引擎的 UI 管理器。', 'Created Daisy UI manager; uses the engine\'s UI manager when not set.'],
  ['挂载容器；未设置时使用 Daisy UI 覆盖层。', 'Mount container; uses the Daisy UI overlay when not set.'],
  ['时间显示控件的样式、位置和格式配置。', 'Style, position, and format configuration for the time display control.'],
]);

// SunConeDimensionInput interface
count += translateFile('api/interfaces/SunConeDimensionInput.md', [
  ['日锥物理尺寸计算参数。', 'Sun cone physical dimension calculation parameters.'],
  ['遮挡天体半径；单位必须与 `sunRadius` 和 `centerDistance` 一致。', 'Occluding body radius; units must be consistent with `sunRadius` and `centerDistance`.'],
  ['两天体中心距离，必须大于两者半径之和。', 'Center distance between the two bodies, must be greater than the sum of their radii.'],
  ['光源天体半径，必须大于 `bodyRadius`。', 'Light source body radius, must be greater than `bodyRadius`.'],
]);

// TimeAxisTick interface
count += translateFile('api/interfaces/TimeAxisTick.md', [
  ['时间轴刻度信息。', 'Timeline tick information.'],
  ['刻度标签文本（由 formatTime 格式化）', 'Tick label text (formatted by formatTime)'],
  ['刻度在时间轴内容区内的左侧位置（px），渲染阶段会补齐。', 'Left position of the tick within the timeline content area (px), populated during rendering.'],
  ['刻度位置百分比 (0-100)', 'Tick position percentage (0-100)'],
]);

// TrackingOptions interface
count += translateFile('api/interfaces/TrackingOptions.md', [
  ['跟踪目标配置选项。', 'Tracking target configuration options.'],
  ['用于让 Feature（如轨迹线、折线等）自动追踪某个动态目标。', 'Used to make a Feature (e.g., trajectory line, polyline) automatically track a dynamic target.'],
  ['是否启用跟踪（支持按仿真时间动态切换）。', 'Whether to enable tracking (supports dynamic switching by simulation time).'],
  ['跟踪目标（实体、坐标点或自由对象）。', 'Tracking target (entity, coordinate point, or free object).'],
]);

// CameraFlyToTargetOptions type
count += translateFile('api/types/CameraFlyToTargetOptions.md', [
  ['相机飞行到目标的额外参数。', 'Additional parameters for camera fly-to target.'],
  ['飞行耗时（秒）。', 'Flight duration (seconds).'],
  ['数值越大，飞行过程越慢；为 0 时通常代表瞬移。', 'Larger values make the flight slower; 0 usually represents instant teleportation.'],
  ['相机飞行目标偏移量', 'Camera fly-to target offset'],
]);

// CheckerboardMaterialOptions type
count += translateFile('api/types/CheckerboardMaterialOptions.md', [
  ['棋盘格材质配置。', 'Checkerboard material configuration.'],
  ['深色格颜色。默认黑色。', 'Dark square color. Defaults to black.'],
  ['浅色格颜色。默认白色。', 'Light square color. Defaults to white.'],
  ['横纵方向重复次数；数字表示两个方向使用相同值。默认 2。', 'Horizontal/vertical repeat count; a single number applies the same value to both directions. Default 2.'],
]);

// DotMaterialOptions type
count += translateFile('api/types/DotMaterialOptions.md', [
  ['点阵材质配置。', 'Dot matrix material configuration.'],
  ['背景颜色。默认黑色。', 'Background color. Defaults to black.'],
  ['点颜色。默认白色。', 'Dot color. Defaults to white.'],
  ['横纵方向重复次数；数字表示两个方向使用相同值。默认 10。', 'Horizontal/vertical repeat count; a single number applies the same value to both directions. Default 10.'],
]);

// FollowTargetView type
count += translateFile('api/types/FollowTargetView.md', [
  ['相机到目标的距离，单位为米；未设置时由目标范围和当前相机状态推导。', 'Distance from camera to target, in meters; derived from target range and current camera state when not set.'],
  ['环绕目标的航向角，单位为度。', 'Heading angle around the target, in degrees.'],
  ['环绕目标的俯仰角，单位为度。', 'Pitch angle around the target, in degrees.'],
  ['相机横滚角，单位为度。', 'Camera roll angle, in degrees.'],
]);

// ModelAnimationTimeCallback type
count += translateFile('api/types/ModelAnimationTimeCallback.md', [
  ['动画时间回调函数。', 'Animation time callback function.'],
  ['动画总时长（秒）', 'Total animation duration (seconds)'],
  ['当前播放时间（秒）', 'Current playback time (seconds)'],
  ['映射后的实际播放时间（秒）', 'Mapped actual playback time (seconds)'],
]);

// PW.MarsConfig type
count += translateFile('api/types/PW.MarsConfig.md', [
  ['火星对象配置（含大气层扩展）', 'Mars object configuration (with atmosphere extension)'],
  ['大气层开关或参数', 'Atmosphere toggle or parameters'],
  ['强度偏移，负值减弱、正值增强', 'Intensity offset, negative weakens, positive strengthens'],
  ['是否显示大气层', 'Whether to show the atmosphere'],
]);

// PW.VehicleConfig type
count += translateFile('api/types/PW.VehicleConfig.md', [
  ['初始姿态（可选）。会写入宿主 Entity.orientation。', 'Initial orientation (optional). Written to the host Entity.orientation.'],
  ['动力组件集合（可选）。', 'Propulsion component collection (optional).'],
  ['组件实例由业务侧显式创建，例如 `vehicle.addPropulsion(new JetEngine(...))`。', 'Component instances are explicitly created by the business side, e.g., `vehicle.addPropulsion(new JetEngine(...))`.'],
  ['传感器集合（可选）。', 'Sensor collection (optional).'],
]);

// TaskGanttRenderer type
count += translateFile('api/types/TaskGanttRenderer.md', [
  ['自定义渲染函数签名。', 'Custom render function signature.'],
  ['用户通过此函数完全控制时间线 UI 的渲染逻辑。', 'The user fully controls the timeline UI rendering logic through this function.'],
  ['挂载 DOM 容器（Widget 创建的面板元素）', 'Mount DOM container (panel element created by the Widget)'],
  ['当前调度状态快照（由 Widget 内部计算）', 'Current schedule state snapshot (computed internally by the Widget)'],
]);

// TranslatePivot type
count += translateFile('api/types/TranslatePivot.md', [
  ['平移枢轴配置。', 'Translation pivot configuration.'],
  ['X 方向偏移（单位：米）。', 'X-axis offset (in meters).'],
  ['Y 方向偏移（单位：米）。', 'Y-axis offset (in meters).'],
  ['Z 方向偏移回调（根据高度 h 计算 Z 偏移）。', 'Z-axis offset callback (computes Z offset based on height h).'],
]);

// ViewDistanceTemplate type
count += translateFile('api/types/ViewDistanceTemplate.md', [
  ['视距阈值模板。', 'View distance threshold template.'],
  ['每个 `ViewDistanceLevel` 对应一个 `Daisy.DistanceDisplayCondition(near, far)`，', 'Each `ViewDistanceLevel` corresponds to a `Daisy.DistanceDisplayCondition(near, far)`,'],
  ['用于描述某类要素在不同观察尺度下的可见距离范围。', 'used to describe the visible distance range of a feature type at different observation scales.'],
  ['轨迹/路径分辨率缩放系数。', 'Trajectory/path resolution scaling factor.'],
  ['数值越大，路径显示更平滑（插值/采样更密），但计算/渲染开销更高。', 'Larger values make the path display smoother (denser interpolation/sampling), but increase computation/rendering cost.'],
]);

// resolveTimeDerivative variable
count += translateFile('api/variables/resolveTimeDerivative.md', [
  ['兼容导出：历史 API 名称。', 'Compatibility export: legacy API name.'],
  ['计算仿真时间值在指定时刻的\u201c变化率\u201d（导数，单位：每秒）。', 'Computes the "rate of change" (derivative, in units per second) of a simulation time value at a given time.'],
  ['说明：', 'Notes:'],
  ['- 仅对\u201c离散采样\u201d输入（TimeSample/TimeSeries）有意义', '- Only meaningful for "discrete sample" inputs (TimeSample/TimeSeries)'],
  ['- 对 `"step"` 会返回 0（区间内保持常量）', '- Returns 0 for `"step"` (constant within the interval)'],
  ['- 采用数值微分近似：在 `time` 左右取一个小时间窗做对称差分', '- Uses numerical differentiation approximation: symmetric difference over a small time window around `time`'],
  ['// rate: number | undefined，表示 range 每秒变化量', '// rate: number | undefined, indicates the rate of change of range per second'],
]);

console.log('translated ' + count + ' patterns in 25 files');