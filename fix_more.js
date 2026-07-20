var fs = require('fs');

// Read source files and apply translations
var pairs = [
  // BodyTrackedCameraState - first line
  ['api/interfaces/BodyTrackedCameraState.md', '机体跟踪相机的局部状态。', 'Local state of the body-tracked camera.'],
  // FeatureEventHandleHost - first line
  ['api/types/FeatureEventHandleHost.md', 'FeatureEventHandle 的宿主能力集合。', "FeatureEventHandle's host capability set."],
  // ModelNodeTransformState - list items
  ['api/types/ModelNodeTransformState.md', '模型节点变换状态（状态副作用）。', 'Model node transform state (state side effect).'],
  ['api/types/ModelNodeTransformState.md', '- 该状态不会立即修改节点渲染，而是在 ModelFeature.update() 每帧自动应用到对应节点', '- This state does not immediately modify node rendering; it is automatically applied to the corresponding node in each frame\'s ModelFeature.update()'],
  ['api/types/ModelNodeTransformState.md', '- matrix 优先级最高：', '- matrix has highest priority:'],
  ['api/types/ModelNodeTransformState.md', '- matrix === null：恢复为 undefined，把变换控制权交还给 glTF 原始 transform/动画', '- matrix === null: restores to undefined, returning transform control to the glTF original transform/animation'],
  ['api/types/ModelNodeTransformState.md', '- matrix 存在：直接覆盖节点 matrix', '- matrix present: directly overwrites the node matrix'],
  ['api/types/ModelNodeTransformState.md', '- 底层 ModelNode 本身不提供节点级 color/alpha', '- The underlying ModelNode does not provide node-level color/alpha'],
  ['api/types/ModelNodeTransformState.md', '- Daisy 在内部通过修改模型 DrawCommand 的 uniformMap，让节点复用 的 model_color/model_colorBlend 管线', '- Daisy internally modifies the model\'s DrawCommand uniformMap, allowing the node to reuse the model_color/model_colorBlend pipeline'],
  ['api/types/ModelNodeTransformState.md', '- 该方案会保留原有光照结果（在 lightingStage 之后叠加），避免\u201c纯色贴片\u201d式的突兀效果', '- This approach preserves the original lighting result (applied after lightingStage), avoiding abrupt "solid color patch" effects.'],
  // OrbitState - list items
  ['api/types/OrbitState.md', '- `eci.frame` 固定为 `TEME`（与 SGP4 输出一致）', '- `eci.frame` is always `TEME` (consistent with SGP4 output)'],
  ['api/types/OrbitState.md', '- `ecef.frame` 固定为 `ECEF`', '- `ecef.frame` is always `ECEF`'],
  ['api/types/OrbitState.md', '- `lla` 为角度制经纬高（基于 `Daisy.Ellipsoid`）', '- `lla` is latitude/longitude/height in degrees (based on `Daisy.Ellipsoid`)'],
  ['api/types/OrbitState.md', '- `enu` 仅在传入 `observer`（或 `includeENU`）时输出', '- `enu` is only output when `observer` (or `includeENU`) is provided'],
  // PropagationOptions - list items
  ['api/types/PropagationOptions.md', '- `centralBody`: 用于椭球/几何侧的中心天体选择（默认 earth）', '- `centralBody`: central body selection for ellipsoid/geometry (default earth)'],
  ['api/types/PropagationOptions.md', '- `ellipsoid`: 显式指定椭球（优先级高于 `centralBody`）', '- `ellipsoid`: explicitly specify the ellipsoid (higher priority than `centralBody`)'],
  ['api/types/PropagationOptions.md', '- `earthRotationRateRadPerSec`: 地球自转角速度（用于 ECEF 速度修正项 \\(\\omega \\times r\\)），默认 `7.2921150e-5`', '- `earthRotationRateRadPerSec`: Earth\'s rotation rate (used for ECEF velocity correction term \\(\\omega \\times r\\)), default `7.2921150e-5`'],
  ['api/types/PropagationOptions.md', '- `observer`: 指定观测点则可输出 `enu`', '- `observer`: specify an observation point to output `enu`'],
  ['api/types/PropagationOptions.md', '- `includeENU`: 是否强制输出 ENU（设置 `observer` 时无需显式传 true）', '- `includeENU`: whether to force ENU output (not needed when `observer` is set)'],
  // TimeValue - first line
  ['api/types/TimeValue.md', '兼容别名：历史上很多 options 字段使用 TimeValue 命名。', 'Compatibility alias: historically many options fields used the TimeValue name.'],
];

var ok = 0;
var fail = 0;
pairs.forEach(function(p) {
  var enPath = 'website/docs/en/' + p[0];
  var c = fs.readFileSync(enPath, 'utf8');
  if (c.indexOf(p[1]) >= 0) {
    c = c.replace(p[1], p[2]);
    fs.writeFileSync(enPath, c, 'utf8');
    ok++;
  } else {
    console.log('NOT FOUND: ' + p[0] + ' -> ' + p[1].substring(0, 40));
    fail++;
  }
});
console.log('translated: ' + ok + ' failed: ' + fail);