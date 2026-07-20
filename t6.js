var fs = require('fs');

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

count += translateFile('api/classes/PW.Atmosphere.md', [
  ['行星大气参数容器', 'Planetary atmosphere parameter container'],
  ['- 封装 Rayleigh/Mie 散射、吸收与强度等物理参数', '- Encapsulates Rayleigh/Mie scattering, absorption, intensity, and other physical parameters'],
  ['- 提供 getUniforms 将参数转换为材质 uniforms，供渲染使用', '- Provides getUniforms to convert parameters into material uniforms for rendering'],
  ['- 与 CelestialAtmosphereFeature 搭配，在场景中显示大气层散射效果', '- Works with CelestialAtmosphereFeature to display atmospheric scattering effects in the scene'],
  ['构造函数', 'Constructor'],
  ['大气物理参数', 'Atmospheric physical parameters'],
  ['将大气物理参数转换为材质 uniforms', 'Converts atmospheric physical parameters into material uniforms'],
  ['可直接用于 Daisy.Material fabric.uniforms 的对象', 'An object that can be directly used in Daisy.Material fabric.uniforms'],
]);

count += translateFile('api/enums/DataSource.md', [
  ['轨道/位置数据的来源类型。', 'Source type for orbit/position data.'],
  ['该枚举通常用于区分 TLE、开普勒根数、星历采样等不同的数据输入方式。', 'This enum is typically used to distinguish between different data input methods such as TLE, Keplerian elements, ephemeris samples, etc.'],
  ['星历数据', 'Ephemeris data'],
  ['kepler元素', 'Keplerian elements'],
  ['实时更新位置', 'Real-time position update'],
  ['tle 必须包含3行元素', 'tle must include 3 lines of elements'],
]);

count += translateFile('api/enums/ViewScene.md', [
  ['内置视距场景模板名。', 'Built-in view distance scene template name.'],
  ['不同场景对应不同的默认显示距离阈值配置（例如航天/航空/海事/地面）。', 'Different scenes correspond to different default display distance threshold configurations (e.g., aerospace/aviation/maritime/ground).'],
  ['航空尺度', 'Aviation scale'],
  ['地面/近景尺度', 'Ground/close-range scale'],
  ['海事/海面尺度', 'Maritime/sea surface scale'],
  ['航天/空间尺度', 'Aerospace/space scale'],
]);

count += translateFile('api/interfaces/DaisyGeometryDescriptor.md', [
  ['Daisy 几何描述 —— FreeGeometryFeature 的核心输入。', 'Daisy geometry descriptor - the core input for FreeGeometryFeature.'],
  ['positions 为局部坐标（相对 Entity 原点）。', 'positions are local coordinates (relative to the Entity origin).'],
  ['包围球（可选，缺失时从 positions 自动计算）', 'Bounding sphere (optional, auto-computed from positions when missing)'],
  ['索引数据（必填）', 'Index data (required)'],
  ['顶点法线（可选，缺失时按 autoNormals 自动计算）', 'Vertex normals (optional, auto-computed according to autoNormals when missing)'],
  ['顶点位置（必填，局部坐标）', 'Vertex positions (required, local coordinates)'],
  ['纹理坐标（可选）', 'Texture coordinates (optional)'],
]);

count += translateFile('api/interfaces/DownEmitDiffuseMaterialOptions.md', [
  ['底部扩散环颜色。默认亮绿色。', 'Bottom diffuse ring color. Defaults to bright green.'],
  ['光束基础颜色。默认绿色。', 'Beam base color. Defaults to green.'],
  ['扩散环半径，范围为 0.05 至 1。默认 `0.45`。', 'Diffuse ring radius, range 0.05 to 1. Default `0.45`.'],
  ['扩散环宽度，范围为 0.01 至 0.5。默认 `0.06`。', 'Diffuse ring width, range 0.01 to 0.5. Default `0.06`.'],
  ['整体透明度，范围为 0 至 1。默认 `1`。', 'Overall alpha, range 0 to 1. Default `1`.'],
  ['下落动画速度，最小值为 `0.1`。默认 `1`。', 'Falling animation speed, minimum `0.1`. Default `1`.'],
]);

count += translateFile('api/interfaces/FeaturePickedEvent.md', [
  ['拾取到的组件/要素标识（可能包含 `__` 分隔信息）', 'Picked component/feature identifier (may contain `__` separated info)'],
  ['组件类型（如 `Entity` 或 Feature 的 type）', 'Component type (e.g., `Entity` or Feature type)'],
  ['Daisy 实体对象', 'Daisy entity object'],
  ['Daisy 实体 ID', 'Daisy entity ID'],
  ['可选：当拾取到模型节点时，提供 glTF 节点索引', 'Optional: glTF node index when a model node is picked'],
  ['可选：当拾取到模型节点时，提供节点名', 'Optional: node name when a model node is picked'],
]);

count += translateFile('api/interfaces/GeoFogOptions.md', [
  ['场景雾效配置；仅修改传入的字段。', 'Scene fog configuration; only modifies the provided fields.'],
  ['雾效亮度。', 'Fog brightness.'],
  ['雾密度；数值越大，远处地表越早融入背景。', 'Fog density; larger values make distant terrain blend into the background sooner.'],
  ['是否启用雾效。', 'Whether to enable fog.'],
  ['是否直接渲染雾色；关闭后仍可保留雾效对细节层级的影响。', 'Whether to render fog color directly; when disabled, fog still affects level-of-detail calculations.'],
  ['雾效参与细节层级计算时使用的屏幕空间误差系数。', 'Screen-space error coefficient used when fog participates in level-of-detail calculations.'],
]);

count += translateFile('api/interfaces/NeonScanMaterialOptions.md', [
  ['扫描带宽度，范围为 0.01 至 0.5。默认 `0.15`。', 'Scan band width, range 0.01 to 0.5. Default `0.15`.'],
  ['背景颜色。默认紫色。', 'Background color. Defaults to purple.'],
  ['柔光范围，范围为 0.05 至 0.95。默认 `0.35`。', 'Soft light range, range 0.05 to 0.95. Default `0.35`.'],
  ['霓虹扫描带颜色。默认青色。', 'Neon scan band color. Defaults to cyan.'],
  ['整体透明度，范围为 0 至 1。默认 `1`。', 'Overall alpha, range 0 to 1. Default `1`.'],
  ['扫描速度，最小值为 `0.1`。默认 `1.5`。', 'Scan speed, minimum `0.1`. Default `1.5`.'],
]);

count += translateFile('api/interfaces/ParticleScreenSpaceLimitOptions.md', [
  ['是否启用屏幕空间预算。传入 false 时即使配置对象存在也不介入。', 'Whether to enable screen-space budget. Pass false to disable even if the config object exists.'],
  ['发射率上限。与 targetParticleSpacingPx 同时存在时取更严格者。', 'Emission rate upper limit. When both this and targetParticleSpacingPx are set, the stricter one applies.'],
  ['单颗粒子最终 billboard 尺寸上限（像素）。仅影响 sizeInMeters=false 的屏幕像素粒子。', 'Maximum final billboard size per particle (pixels). Only affects screen-pixel particles with sizeInMeters=false.'],
  ['尾焰在屏幕上的最大长度（像素）。通过动态压缩粒子生命周期并裁剪超长存活粒子实现。', 'Maximum plume length on screen (pixels). Achieved by dynamically compressing particle lifetime and culling over-long particles.'],
  ['发射率下限。避免尾焰被压得过稀。', 'Emission rate lower limit. Prevents the plume from becoming too sparse.'],
  ['期望粒子沿尾焰方向的屏幕间距（像素）。用于动态限制发射率，避免近距离变成粒子云。', 'Desired screen-space spacing between particles along the plume direction (pixels). Used to dynamically limit emission rate and avoid particle clouds at close range.'],
]);

count += translateFile('api/interfaces/PW.RouteWaypoint.md', [
  ['单个航点定义', 'Single waypoint definition'],
  ['自定义图标 URL（不传则使用内置标记图标）', 'Custom icon URL (uses built-in marker icon when not set)'],
  ['主标题（显示在标签第一行）', 'Main title (displayed on the first line of the label)'],
  ['Popover 内容（HTML 字符串），不传则不创建 Popover', 'Popover content (HTML string); no Popover is created when not set'],
  ['航点世界坐标（WGS-84）', 'Waypoint world coordinates (WGS-84)'],
  ['副标题（显示在标签第二行，更小的字号）', 'Subtitle (displayed on the second line of the label, smaller font size)'],
]);

count += translateFile('api/interfaces/RadialPulseMaterialOptions.md', [
  ['归一化纹理坐标中的扩散中心。默认 `(0.5, 0.5)`。', 'Diffusion center in normalized texture coordinates. Default `(0.5, 0.5)`.'],
  ['背景颜色。默认青色。', 'Background color. Defaults to cyan.'],
  ['整体透明度，范围为 0 至 1。默认 `1`。', 'Overall alpha, range 0 to 1. Default `1`.'],
  ['脉冲环颜色。默认白色。', 'Pulse ring color. Defaults to white.'],
  ['脉冲环宽度，范围为 0.01 至 0.5。默认 `0.08`。', 'Pulse ring width, range 0.01 to 0.5. Default `0.08`.'],
  ['扩散速度，最小值为 `0.1`。默认 `1`。', 'Diffusion speed, minimum `0.1`. Default `1`.'],
]);

count += translateFile('api/interfaces/SunConeDimensions.md', [
  ['日锥物理尺寸。', 'Sun cone physical dimensions.'],
  ['输入的遮挡天体半径。', 'Input occluding body radius.'],
  ['输入的两天体中心距离。', 'Input center distance between the two bodies.'],
  ['在本影尖端轴向位置处的半影外半径。', 'Penumbra outer radius at the axial position of the umbra tip.'],
  ['输入的光源天体半径。', 'Input light source body radius.'],
  ['从遮挡天体中心沿背光方向到本影尖端的距离。', 'Distance from the occluding body center along the anti-light direction to the umbra tip.'],
]);

count += translateFile('api/interfaces/SunOcclusionInput.md', [
  ['太阳遮挡判定参数。', 'Sun occlusion determination parameters.'],
  ['遮挡天体中心的世界坐标。', 'World coordinates of the occluding body center.'],
  ['遮挡天体半径；单位须与世界坐标一致。', 'Occluding body radius; units must be consistent with world coordinates.'],
  ['待判定观察点的世界坐标。', 'World coordinates of the observation point to evaluate.'],
  ['光源天体中心的世界坐标。', 'World coordinates of the light source body center.'],
  ['光源天体半径；单位须与世界坐标一致。', 'Light source body radius; units must be consistent with world coordinates.'],
]);

count += translateFile('api/interfaces/TaskStepListState.md', [
  ['自定义任务步骤列表渲染器接收的完整状态。', 'Complete state received by the custom task step list renderer.'],
  ['当前仿真时刻。', 'Current simulation time.'],
  ['触发任务点击行为；未配置点击回调时不存在。', 'Triggers task click behavior; not present when no click callback is configured.'],
  ['当前场景的仿真结束时刻。', 'Current scene simulation end time.'],
  ['当前场景的仿真开始时刻。', 'Current scene simulation start time.'],
  ['按调度器顺序生成的任务步骤。', 'Task steps generated in scheduler order.'],
]);

count += translateFile('api/types/DaisyMaterialDescriptor.md', [
  ['Daisy 材质描述，可直接传给支持 `DMaterial` 的要素或组件。', 'Daisy material descriptor, can be directly passed to features or components that support `DMaterial`.'],
  ['材质描述的稳定识别标记。', 'Stable identification tag for the material description.'],
  ['自定义材质源码；未设置时按已注册材质类型解析。', 'Custom material source code; resolved by registered material type when not set.'],
  ['是否按半透明材质处理。默认 `true`。', 'Whether to treat as a translucent material. Default `true`.'],
  ['内置或已注册的材质类型标识。', 'Built-in or registered material type identifier.'],
  ['材质 uniform 参数。', 'Material uniform parameters.'],
]);

count += translateFile('api/types/GridMaterialOptions.md', [
  ['网格材质配置。', 'Grid material configuration.'],
  ['网格单元内部透明度。默认 `0.1`。', 'Grid cell interior alpha. Default `0.1`.'],
  ['网格线颜色。默认白色。', 'Grid line color. Defaults to white.'],
  ['横纵方向的网格数量；数字表示两个方向使用相同值。默认 8。', 'Horizontal/vertical grid count; a single number applies the same value to both directions. Default 8.'],
  ['横纵方向的网格线偏移；数字表示两个方向使用相同值。默认 0。', 'Horizontal/vertical grid line offset; a single number applies the same value to both directions. Default 0.'],
  ['横纵方向的网格线粗细；数字表示两个方向使用相同值。默认 1。', 'Horizontal/vertical grid line thickness; a single number applies the same value to both directions. Default 1.'],
]);

count += translateFile('api/types/Plane.PlaneGridStyle.md', [
  ['网格单元填充透明度（0~1）。', 'Grid cell fill alpha (0~1).'],
  ['目标网格单元的屏幕像素尺寸（仅 followCamera=true 生效）。', 'Target grid cell screen pixel size (only effective when followCamera=true).'],
  ['是否根据相机距离自动调整网格密度，使屏幕上网格视觉密度更稳定。', 'Whether to auto-adjust grid density based on camera distance for more stable visual grid density on screen.'],
  ['网格线宽（像素）。', 'Grid line width (pixels).'],
  ['网格单元最大尺寸（单位：米），用于限制过稀（仅 followCamera=true 生效）。', 'Maximum grid cell size (meters), used to limit sparsity (only effective when followCamera=true).'],
  ['网格单元最小尺寸（单位：米），用于限制过密导致闪烁（仅 followCamera=true 生效）。', 'Minimum grid cell size (meters), used to limit density that causes flickering (only effective when followCamera=true).'],
]);

count += translateFile('api/types/PW.GeoFencePoint.md', [
  ['地理围栏点（经纬高）。', 'Geo-fence point (longitude/latitude/height).'],
  ['单位：', 'Units:'],
  ['- `lon/lat`：度', '- `lon/lat`: degrees'],
  ['- `height`：米', '- `height`: meters'],
  ['高度，单位为米。', 'Height, in meters.'],
  ['纬度，单位为度。', 'Latitude, in degrees.'],
  ['经度，单位为度。', 'Longitude, in degrees.'],
]);

count += translateFile('api/types/PW.GroundStationAntennaPointingOptions.md', [
  ['方位旋转轴（模型节点局部坐标）。', 'Azimuth rotation axis (model node local coordinates).'],
  ['DSN 预设模型使用 Y 轴作为模型竖直轴。', 'DSN preset models use the Y axis as the model vertical axis.'],
  ['方位旋转节点。DSN 34m/70m 模型中通常为 `azimuth`。', 'Azimuth rotation node. Typically `azimuth` in DSN 34m/70m models.'],
  ['模型节点与业务角之间的固定偏置。', 'Fixed offset between the model node and the business angle.'],
  ['俯仰旋转轴（模型节点局部坐标）。', 'Elevation rotation axis (model node local coordinates).'],
  ['俯仰旋转节点。DSN 34m/70m 模型中通常为 `elevation`。', 'Elevation rotation node. Typically `elevation` in DSN 34m/70m models.'],
]);

count += translateFile('api/types/PW.RocketConfig.md', [
  ['主动段弹道输入。传入后 Rocket 会在构造或绑定后生成 trajectory。', 'Boost phase trajectory input. When provided, the Rocket generates a trajectory after construction or binding.'],
  ['是否自动把竖直发射模型的本体 +Z 轴安装到 Rocket 前向 +X 轴。', 'Whether to automatically mount the vertical launch model\'s body +Z axis to the Rocket\'s forward +X axis.'],
  ['许多火箭/导弹模型在 glTF 内以 +Z 作为鼻锥方向，而 Daisy Vehicle', 'Many rocket/missile models use +Z as the nose cone direction in glTF, while Daisy Vehicle'],
  ['约定本体前向为 +X。开启后会给模型附加绕本体 Y 轴 -90° 的安装俯仰。', 'convention uses +X as the forward direction. When enabled, a -90\u00b0 pitch around the body Y axis is applied to the model.'],
  ['是否根据轨迹速度自动写入姿态。', 'Whether to automatically write attitude based on trajectory velocity.'],
  ['机体坐标轴调试显示。传入 true 使用 Rocket 默认轴参数；传入对象则透传给 Entity.setBodyAxis。', 'Body axis debug display. Pass true for Rocket default axis parameters; pass an object to forward to Entity.setBodyAxis.'],
  ['轨迹起始时刻。省略时优先使用场景当前时间，未绑定 Engine 时使用当前系统时间。', 'Trajectory start time. When omitted, prefers the scene\'s current time; uses the current system time when not bound to an Engine.'],
]);

count += translateFile('api/types/PW.TimeRange.md', [
  ['覆盖采样使用的时间范围。', 'Time range used for coverage sampling.'],
  ['`start` 的兼容别名。', 'Compatibility alias for `start`.'],
  ['`start` 的兼容别名。', 'Compatibility alias for `start`.'],
  ['结束时刻。', 'End time.'],
  ['`end` 的兼容别名。', 'Compatibility alias for `end`.'],
  ['开始时刻。', 'Start time.'],
]);

count += translateFile('api/types/StripeMaterialOptions.md', [
  ['条纹材质配置。', 'Stripe material configuration.'],
  ['偶数条纹颜色。默认白色。', 'Even stripe color. Defaults to white.'],
  ['奇数条纹颜色。默认黑色。', 'Odd stripe color. Defaults to black.'],
  ['条纹相位偏移。默认 `0`。', 'Stripe phase offset. Default `0`.'],
  ['条纹方向。默认水平方向。', 'Stripe direction. Defaults to horizontal.'],
  ['条纹重复次数。默认 `5`。', 'Stripe repeat count. Default `5`.'],
]);

count += translateFile('api/types/TleData.md', [
  ['TLE 数据源配置。', 'TLE data source configuration.'],
  ['开始时间 为空时使用场景结束时间', 'Start time; uses scene end time when empty'],
  ['时间间隔 单位毫秒', 'Time interval in milliseconds'],
  ['norad编号', 'NORAD ID'],
  ['开始时间 为空时使用场景开始时间', 'Start time; uses scene start time when empty'],
  ['tle数据', 'TLE data'],
]);

console.log('translated ' + count + ' patterns in 23 files');