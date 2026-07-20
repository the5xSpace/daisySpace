var fs = require('fs');
var pairs = [
  ['website/docs/en/api/types/PW.BaseObjectTransformTimeline.md', '物理对象的局部变换时间采样配置。', 'Local transform time-sampling configuration for physical objects.'],
  ['website/docs/en/api/types/PW.BaseObjectTransformTimeline.md', '说明：', 'Notes:'],
  ['website/docs/en/api/types/PW.BaseObjectTransformTimeline.md', '- 支持常量、回调、采样数组、采样序列四种 `TimeValue` 形式', '- Supports four `TimeValue` forms: constant, callback, sample array, sample sequence'],
  ['website/docs/en/api/types/PW.BaseObjectTransformTimeline.md', '- `translate` 为推荐字段名', '- `translate` is the recommended field name'],
  ['website/docs/en/api/types/PW.BaseObjectTransformTimeline.md', '- `tanslate` 为历史兼容拼写', '- `tanslate` is a legacy compatibility spelling'],
  ['website/docs/en/api/types/PW.GroundStationConfig.md', '天线节点控制配置。', 'Antenna node control configuration.'],
  ['website/docs/en/api/types/PW.GroundStationConfig.md', '预设站型模型。', 'Preset station model.'],
  ['website/docs/en/api/types/PW.GroundStationConfig.md', '- 不传：默认 dsn34', '- Not set: defaults to dsn34'],
  ['website/docs/en/api/types/PW.GroundStationConfig.md', '- false：不自动挂载模型', '- false: do not auto-mount model'],
  ['website/docs/en/api/types/PW.GroundStationConfig.md', '- ModelOptions：使用自定义模型', '- ModelOptions: use a custom model'],
  ['website/docs/en/api/types/PW.OrbitElementsViewComponentOptions.md', '启用轨道元素视图时自动设置的地球透明度（0~1），默认 0.35。', 'Earth transparency automatically set when orbit elements view is enabled (0~1), defaults to 0.35.'],
  ['website/docs/en/api/types/PW.OrbitElementsViewComponentOptions.md', '设为 1 则不透明（不修改地球透明度）。', 'Set to 1 for opaque (does not modify Earth transparency).'],
  ['website/docs/en/api/types/PW.OrbitElementsViewComponentOptions.md', '赤道面填充色，默认半透明黄色', 'Equatorial plane fill color, defaults to semi-transparent yellow'],
  ['website/docs/en/api/types/PW.OrbitElementsViewComponentOptions.md', '轨道面填充色，默认半透明青色', 'Orbit plane fill color, defaults to semi-transparent cyan'],
];
var ok = 0;
for (var i = 0; i < pairs.length; i++) {
  var f = pairs[i][0];
  var s = pairs[i][1];
  var t = pairs[i][2];
  var c = fs.readFileSync(f, 'utf8');
  if (c.indexOf(s) >= 0) {
    c = c.replace(s, t);
    fs.writeFileSync(f, c, 'utf8');
    ok++;
  } else {
    console.log('NOT FOUND:', s.substring(0, 30) + '... in ' + f);
  }
}
console.log('translated:', ok);