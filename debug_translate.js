var fs = require('fs');
var pairs = [
  ['website/docs/en/api/interfaces/BodyTrackedCameraState.md', '机体', 'body'],
  ['website/docs/en/api/interfaces/UI.PopoverVisibilityChangeEvent.md', '当前帧', 'current'],
  ['website/docs/en/api/types/FeatureEventHandleHost.md', '映射', 'mapping'],
  ['website/docs/en/api/types/ModelNodeTransformState.md', '模型节点变换', 'model node transform'],
  ['website/docs/en/api/types/OrbitState.md', '轨道全状态', 'orbit full state'],
  ['website/docs/en/api/types/PropagationOptions.md', '传播输出', 'propagation output'],
  ['website/docs/en/api/types/TimeValue.md', 'SimTimeValue', 'SimTimeValue'],
];
// Debug: check if files contain Chinese
pairs.forEach(function(p) {
  var c = fs.readFileSync(p[0], 'utf8');
  var hasChinese = /[\u4e00-\u9fff]/.test(c);
  console.log(p[0] + ': hasChinese=' + hasChinese + ' length=' + c.length);
});