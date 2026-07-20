var fs = require('fs');
var pairs = [
  ['website/docs/en/api/types/ArcRotateCameraViewForm.md', '环绕视角参数（球坐标 + roll）。', 'Orbit view parameters (spherical coordinates + roll).'],
  ['website/docs/en/api/types/ArcRotateCameraViewForm.md', '约定：', 'Conventions:'],
  ['website/docs/en/api/types/ArcRotateCameraViewForm.md', '- theta：水平角（绕局部 Z 轴）', '- theta: horizontal angle (around local Z axis)'],
  ['website/docs/en/api/types/ArcRotateCameraViewForm.md', '- phi：俯仰角（限制在接近 ±90° 以内，避免奇异）', '- phi: pitch angle (limited to near ±90° to avoid singularity)'],
  ['website/docs/en/api/types/ArcRotateCameraViewForm.md', '- radius：距离（大于 0）', '- radius: distance (greater than 0)'],
  ['website/docs/en/api/types/ArcRotateCameraViewForm.md', '- roll：绕视线方向滚转', '- roll: roll around the view direction'],
  ['website/docs/en/api/types/ArcRotateDaisyEntityLike.md', '可作为环绕目标的 DaisyEntity 兼容结构。', 'DaisyEntity-compatible structure that can be used as an orbit target.'],
  ['website/docs/en/api/types/ArcRotateDaisyEntityLike.md', '说明：', 'Description:'],
  ['website/docs/en/api/types/ArcRotateDaisyEntityLike.md', '- worldMatrix/getWorldMatrix/getCurrentMatrix/getMatrix/matrix 任意提供一种即可', '- Any one of worldMatrix/getWorldMatrix/getCurrentMatrix/getMatrix/matrix is sufficient'],
  ['website/docs/en/api/types/ArcRotateDaisyEntityLike.md', '- 当 worldMatrix 不可用时，可通过 getState(time) 的 position 字段回退生成平移矩阵', '- When worldMatrix is unavailable, a translation matrix can be generated from the position field of getState(time)'],
  ['website/docs/en/api/types/ArcRotateEntityLike.md', '可作为环绕目标的\u201c兼容对象\u201d（偏底层风格）。', 'A "compatible object" that can be used as an orbit target (lower-level style).'],
  ['website/docs/en/api/types/ArcRotateEntityLike.md', '最少需要：', 'Minimum requirements:'],
  ['website/docs/en/api/types/ArcRotateEntityLike.md', '- worldMatrix：目标在世界坐标系下的变换', '- worldMatrix: the target\'s transformation in world coordinates'],
  ['website/docs/en/api/types/CameraViewTarget.md', '相机视图/飞行的目标描述。', 'Camera view/fly-to target description.'],
  ['website/docs/en/api/types/CameraViewTarget.md', '支持多种输入形式，内部会尽可能转换为三维坐标：', 'Supports multiple input forms, internally converted to 3D coordinates when possible:'],
  ['website/docs/en/api/types/CameraViewTarget.md', '- `Entity` 或 `Entity[]`：取实体当前位置', '- `Entity` or `Entity[]`: uses the entity\'s current position'],
  ['website/docs/en/api/types/CameraViewTarget.md', '- `Cartesian3`/`Cartographic` 或其数组：直接使用', '- `Cartesian3`/`Cartographic` or their arrays: used directly'],
  ['website/docs/en/api/types/CameraViewTarget.md', '- `{x,y,z}`：按世界坐标（米）', '- `{x,y,z}`: in world coordinates (meters)'],
  ['website/docs/en/api/types/CameraViewTarget.md', '- `{lon,lat,height}` / `{lng,lat,alt}` / `{longitude,latitude,height}`：按经纬度（度）与高度（米）', '- `{lon,lat,height}` / `{lng,lat,alt}` / `{longitude,latitude,height}`: in longitude/latitude (degrees) and height (meters)'],
  ['website/docs/en/api/types/CameraViewTarget.md', '- `[lon,lat]` / `[lon,lat,height]`：按经纬度（度）与高度（米）', '- `[lon,lat]` / `[lon,lat,height]`: in longitude/latitude (degrees) and height (meters)'],
  ['website/docs/en/api/types/CameraViewTarget.md', '- `Promise`：异步解析后再执行', '- `Promise`: resolves asynchronously before execution'],
  ['website/docs/en/api/types/PW.LinkTimeRange.md', '链路显示时间区间，包含开始时刻、不包含结束时刻。', 'Link display time range, inclusive of start time, exclusive of end time.'],
  ['website/docs/en/api/types/PW.LinkTimeRange.md', '区间结束时刻。', 'Interval end time.'],
  ['website/docs/en/api/types/PW.LinkTimeRange.md', '区间开始时刻。', 'Interval start time.'],
  ['website/docs/en/api/types/PW.SensorApertureDeg.md', '传感器单轴孔径角或横纵两个方向的动态孔径角，单位为度。', 'Single-axis aperture angle or dual-axis dynamic aperture angle of the sensor, in degrees.'],
  ['website/docs/en/api/types/PW.SensorApertureDeg.md', '横向孔径角。', 'Horizontal aperture angle.'],
  ['website/docs/en/api/types/PW.SensorApertureDeg.md', '纵向孔径角。', 'Vertical aperture angle.'],
  ['website/docs/en/api/types/SolidMaterialOptions.md', '纯色材质配置。', 'Solid color material configuration.'],
  ['website/docs/en/api/types/SolidMaterialOptions.md', '覆盖颜色自身透明度的 alpha 值，范围为 0 至 1。', 'Alpha value overriding the color\'s own transparency, range 0 to 1.'],
  ['website/docs/en/api/types/SolidMaterialOptions.md', '基础颜色。默认白色。', 'Base color. Defaults to white.'],
  ['website/docs/en/api/types/TimePosition.md', '单个带时间戳的位置点。', 'Single position point with timestamp.'],
  ['website/docs/en/api/types/TimePosition.md', 'xyz 坐标 单位米', 'XYZ coordinates in meters'],
  ['website/docs/en/api/types/TimePosition.md', '时间戳精确到毫秒', 'Timestamp accurate to milliseconds'],
  ['website/docs/en/api/variables/Spg4.md', 'SGP4 工具单例。', 'SGP4 utility singleton.'],
  ['website/docs/en/api/variables/Spg4.md', '提供：', 'Provides:'],
  ['website/docs/en/api/variables/Spg4.md', '- TLE 获取（CelesTrak）与本地缓存', '- TLE retrieval (CelesTrak) and local cache'],
  ['website/docs/en/api/variables/Spg4.md', '- 轨道源归一化（TLE / OMM XML / JSON GP）', '- Orbit source normalization (TLE / OMM XML / JSON GP)'],
  ['website/docs/en/api/variables/Spg4.md', '- 基于 `jspredict-dc` 的 SGP4 传播（位置/星历/过境）', '- SGP4 propagation (position/ephemeris/pass) based on `jspredict-dc`'],
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
  }
}
console.log('translated', ok, 'patterns');