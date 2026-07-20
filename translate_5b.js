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

count += translateFile('api/classes/Resource.md', [
  ['资源注册中心。', 'Resource registry.'],
  ['用于统一管理第三方地理服务所需的 token / key，', 'Used to centrally manage tokens/keys required by third-party geographic services,'],
  ['避免在任何 Options 中直接暴露认证信息。', 'avoiding direct exposure of authentication information in any Options.'],
  ['获取资源凭据。', 'Get resource credentials.'],
  ['设置 ArcGIS Key。', 'Set ArcGIS Key.'],
  ['设置 Ion 资产 Token。', 'Set Ion asset Token.'],
]);

count += translateFile('api/classes/Shader.md', [
  ['Daisy 自定义材质 Shader 基类。', 'Daisy custom material Shader base class.'],
  ['提供默认注册逻辑，子类通常只需声明 `type`、`glsl` 和 `uniforms`。', 'Provides default registration logic; subclasses typically only need to declare `type`, `glsl`, and `uniforms`.'],
  ['Daisy GLSL 材质源码。', 'Daisy GLSL material source code.'],
  ['全局唯一的材质类型标识。', 'Globally unique material type identifier.'],
  ['默认 uniform 参数。', 'Default uniform parameters.'],
]);

count += translateFile('api/interfaces/EntityTimeState.md', [
  ['实体在某一时刻的时间状态快照。', 'Time state snapshot of an entity at a given moment.'],
  ['实体在该时刻的位置（世界坐标系）。', 'Entity position at that moment (world coordinates).'],
  ['实体在该时刻的位置（地固坐标系 / ECEF）。', 'Entity position at that moment (Earth-fixed / ECEF).'],
  ['实体在该时刻的位置（惯性坐标系）。', 'Entity position at that moment (inertial coordinates).'],
  ['仿真时间。', 'Simulation time.'],
]);

count += translateFile('api/interfaces/IFeature.md', [
  ['Daisy Feature 抽象能力接口。', 'Daisy Feature abstract capability interface.'],
  ['Feature 用于在 Daisy.Entity 上挂载可渲染或可交互的能力（如模型、点、线、面、UI 覆盖层等）。', 'Feature is used to mount renderable or interactive capabilities (such as models, points, lines, surfaces, UI overlays, etc.) on Daisy.Entity.'],
  ['当前 Feature 是否需要 Entity 在每帧预先计算模型矩阵。', 'Whether the current Feature requires the Entity to precompute the model matrix each frame.'],
  ['点、标签、广告牌这类只依赖实体位置的 Feature 可以返回 false，', 'Features that only depend on entity position, such as points, labels, and billboards, can return false,'], 
  ['从而让海量目标场景跳过不必要的姿态/矩阵计算。', 'allowing large-scale target scenes to skip unnecessary attitude/matrix calculations.'],
  ['强制更新', 'Force update'],
]);

count += translateFile('api/interfaces/IShader.md', [
  ['Daisy 自定义材质 Shader 接口。', 'Daisy custom material Shader interface.'],
  ['所有可由 Shader 管理器统一注册的自定义材质需实现该接口。', 'All custom materials that can be registered by the Shader manager must implement this interface.'],
  ['Daisy GLSL 材质源码；直接字符串会自动识别并转换 Daisy 标识符。', 'Daisy GLSL material source code; plain strings are automatically recognized and Daisy identifiers are converted.'],
  ['全局唯一的材质类型标识。', 'Globally unique material type identifier.'],
  ['Shader 默认 uniform 参数。动态参数会在绘制时解析。', 'Shader default uniform parameters. Dynamic parameters are resolved at render time.'],
]);

count += translateFile('api/interfaces/MarkerWidgetOptions.md', [
  ['MarkerWidget 配置选项。', 'MarkerWidget configuration options.'],
  ['标签字体。', 'Label font.'],
  ['标记点像素大小。', 'Marker point pixel size.'],
  ['最大显示距离（单位：米）。超过此距离自动隐藏。', 'Maximum display distance (in meters). Auto-hides beyond this distance.'],
  ['标记目标列表。', 'Marker target list.'],
]);

count += translateFile('api/interfaces/RingSweepMaterialOptions.md', [
  ['背景颜色。默认蓝色。', 'Background color. Defaults to blue.'],
  ['整体透明度，范围为 0 至 1。默认 `1`。', 'Overall alpha, range 0 to 1. Default `1`.'],
  ['扫描速度，最小值为 `0.1`。默认 `1`。', 'Scan speed, minimum `0.1`. Default `1`.'],
  ['扫描扇面颜色。默认橙色。', 'Scan sector color. Defaults to orange.'],
  ['扫描扇面宽度，范围为 0.01 至 0.5。默认 `0.12`。', 'Scan sector width, range 0.01 to 0.5. Default `0.12`.'],
]);

count += translateFile('api/interfaces/ShaderParamBinding.md', [
  ['动态 Shader 参数，在材质绘制时解析为具体 uniform 值。', 'Dynamic Shader parameter, resolved to a specific uniform value during material rendering.'],
  ['当前值无法解析时使用的回退值。', 'Fallback value used when the current value cannot be resolved.'],
  ['该参数对应的 GLSL uniform 类型。', 'The GLSL uniform type corresponding to this parameter.'],
  ['动态参数对象的稳定识别标记。', 'Stable identification tag for the dynamic parameter object.'],
  ['读取当前 uniform 值。', 'Reads the current uniform value.'],
]);

count += translateFile('api/interfaces/ViewDistanceStrategyOptions.md', [
  ['视距策略构造参数。', 'View distance strategy construction parameters.'],
  ['当前使用的场景模板名。', 'Currently used scene template name.'],
  ['- 可使用 `ViewScene.*` 的内置值', '- Can use built-in values of `ViewScene.*`'],
  ['- 或注册自定义模板名', '- Or register a custom template name'],
  ['自定义模板集合。', 'Custom template collection.'],
  ['会与内置模板合并；同名 key 会覆盖内置值。', 'Merged with built-in templates; keys with the same name override built-in values.'],
]);

count += translateFile('api/types/PassPrediction.md', [
  ['过境预报（三点报：进站/最高点/出站）。', 'Pass prediction (three-point report: AOS/TCA/LOS).'],
  ['解释：', 'Explanation:'],
  ['- `aos`: Acquisition of Signal，卫星从低于 `minElevationDeg` 上升到满足阈值的时刻（进站）', '- `aos`: Acquisition of Signal, the moment when the satellite rises from below `minElevationDeg` to meet the threshold (acquisition)'],
  ['- `tca`: Time of Closest Approach，这里用于\u201c最大仰角\u201d发生时刻（最高点）', '- `tca`: Time of Closest Approach, used here for the moment of maximum elevation (culmination)'],
  ['- `los`: Loss of Signal，卫星从满足阈值下降到低于阈值的时刻（出站）', '- `los`: Loss of Signal, the moment when the satellite falls from meeting the threshold to below it (loss)'],
  ['注意：', 'Note:'],
  ['- 当前实现使用等步长采样 + 二分/三分细化，适合快速分析与可视窗口推断', '- The current implementation uses uniform step sampling + bisection/trisection refinement, suitable for fast analysis and visibility window inference'],
]);

count += translateFile('api/types/PW.NearEarthOrbiterEphemerisRequest.md', [
  ['星历计算请求参数（基于通用轨道源 + SGP4）。', 'Ephemeris computation request parameters (based on generic orbit source + SGP4).'],
  ['采样结束时刻（仿真时间）', 'Sampling end time (simulation time)'],
  ['采样间隔（秒）；默认 60', 'Sampling interval (seconds); default 60'],
  ['观测者位置（经/纬/高），单位：deg/deg/m；默认 [0,0,0]', 'Observer position (lng/lat/height), units: deg/deg/m; default [0,0,0]'],
  ['采样开始时刻（仿真时间）', 'Sampling start time (simulation time)'],
]);

count += translateFile('api/types/PW.NearEarthOrbiterTransitRequest.md', [
  ['搜索结束时刻（仿真时间）', 'Search end time (simulation time)'],
  ['返回最大过境数量（可选）', 'Maximum number of passes to return (optional)'],
  ['最小仰角（度），默认 4', 'Minimum elevation angle (degrees), default 4'],
  ['观测者位置（纬度/经度/海拔），单位：deg/deg/m，内部会自动兼容 km 写法。', 'Observer position (lat/lng/altitude), units: deg/deg/m; internally auto-compatible with km notation.'],
  ['搜索开始时刻（仿真时间）', 'Search start time (simulation time)'],
]);

count += translateFile('api/types/PW.SensorBeamAttitudeDeg.md', [
  ['传感器波束姿态（角度制，单位：deg）。', 'Sensor beam attitude (angular, units: deg).'],
  ['- `azimuthDeg`：方位角（绕 +Z 旋转）', '- `azimuthDeg`: azimuth angle (rotation around +Z)'],
  ['- `elevationDeg`：俯仰角（抬升/下压）', '- `elevationDeg`: elevation angle (up/down)'],
  ['- `rollDeg`：横滚角（绕光轴旋转）', '- `rollDeg`: roll angle (rotation around the optical axis)'],
  ['绕局部 +Z 轴旋转的方位角，单位为度。', 'Azimuth angle rotating around the local +Z axis, in degrees.'],
  ['波束抬升或下压的俯仰角，单位为度。', 'Elevation angle for beam up/down tilt, in degrees.'],
  ['绕波束轴旋转的横滚角，单位为度。', 'Roll angle rotating around the beam axis, in degrees.'],
]);

count += translateFile('api/types/PW.SensorTrackInterval.md', [
  ['单个传感器跟踪目标时间区间。', 'Single sensor tracking target time interval.'],
  ['区间结束时刻。', 'Interval end time.'],
  ['区间开始时刻。', 'Interval start time.'],
  ['`end` 的兼容别名。', 'Compatibility alias for `end`.'],
  ['区间内跟踪的目标；为空时表示该区间不跟踪。', 'Target tracked within the interval; empty means no tracking in this interval.'],
]);

count += translateFile('api/variables/TimeFormatters.md', [
  ['常用时间格式配置构造器。', 'Common time format configuration constructor.'],
  ['北京时间（UTC+8）。短别名：bjt。', 'Beijing time (UTC+8). Short alias: bjt.'],
  ['协调世界时。短别名：utc。', 'Coordinated Universal Time. Short alias: utc.'],
  ['相对 T0 的累计秒。短别名：t0。', 'Cumulative seconds relative to T0. Short alias: t0.'],
  ['创建使用自定义回调的格式配置。', 'Creates a format configuration using a custom callback.'],
]);

console.log('translated ' + count + ' patterns in ' + 15 + ' files');