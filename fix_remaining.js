var fs = require('fs');

var files = [
  'api/interfaces/BodyTrackedCameraState.md',
  'api/interfaces/UI.PopoverVisibilityChangeEvent.md',
  'api/types/FeatureEventHandleHost.md',
  'api/types/ModelNodeTransformState.md',
  'api/types/OrbitState.md',
  'api/types/PropagationOptions.md',
  'api/types/TimeValue.md',
];

files.forEach(function(f) {
  var src = fs.readFileSync('website/docs/_source/' + f);
  var content = src.toString('utf8');
  
  content = content.replace(
    '将相机位置与姿态表示在\u201c机体坐标系\u201d（随天体自转的局部坐标系）中，便于在天体旋转时保持相对视角稳定。',
    'Represents camera position and orientation in the \u201cbody coordinate system\u201d (a local coordinate system that rotates with the celestial body), making it easy to maintain a stable relative view as the celestial body rotates.'
  );
  
  content = content.replace(
    '当前帧 DOM 是否真实显示；距离、遮挡、离屏可能让它为 false。',
    'Whether the DOM is actually visible in the current frame; distance, occlusion, and off-screen conditions may cause it to be false.'
  );
  
  content = content.replace(
    '由触发器/API 决定的\u201c请求显示\u201d状态。',
    'The \u201crequested display\u201d state determined by the trigger or API.'
  );
  
  content = content.replace(
    '由 Feature 基类实现，用于把 ViewerEventHandle 的 SPACE_ENTITY_* 事件',
    'Implemented by the Feature base class to map ViewerEventHandle\u2019s SPACE_ENTITY_* events'
  );
  
  content = content.replace(
    '映射为\u201cFeature 自身可监听 + 可选向上提交 Entity\u201d的统一交互事件系统。',
    'into a unified interaction event system where \u201cFeature can listen itself + optionally submit Entity upward\u201d.'
  );
  
  content = content.replace(
    '轨道全状态输出（满足\u201c同时包含 ECI/ECEF/LLA/时间戳\u201d的约束）。',
    'Full orbit state output (satisfying the constraint of \u201cincluding ECI/ECEF/LLA/timestamp simultaneously\u201d).'
  );
  
  content = content.replace(
    '传播输出选项。',
    'Propagation output options.'
  );
  
  content = content.replace(
    '建议新代码优先使用 `SimTimeValue<T>`，表达\u201c仿真时间驱动\u201d的语义更明确。',
    'New code should prefer `SimTimeValue<T>`, which more clearly expresses \u201csimulation time-driven\u201d semantics.'
  );
  
  fs.writeFileSync('website/docs/en/' + f, content);
  console.log('fixed: ' + f);
});

console.log('done');