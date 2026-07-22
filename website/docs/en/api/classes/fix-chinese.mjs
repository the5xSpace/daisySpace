import { readFileSync, writeFileSync } from 'fs';

const FILES = [
  'CapsuleParticleFeature.md',
  'PW.NearEarthOrbiter.md',
  'PW.Satellite.md',
  'UI.PopoverFeature.md',
];

const CAPSULE_PATCHES = [
  [/[\u4e00-\u9fff].+胶囊粒子 Feature。/g, () => 'Capsule particle Feature.'],
];

function hasChinese(s) {
  return /[\u4e00-\u9fff]/.test(s);
}

for (const fname of FILES) {
  let c = readFileSync(fname, 'utf-8');
  const lines = c.split('\n');
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!hasChinese(l)) continue;
    // CapsuleParticleFeature specific
    if (l.includes('胶囊粒子 Feature')) {
      lines[i] = 'Capsule particle Feature.';
      changed = true;
    }
    // Fix curly-quoted Chinese
    if (l.includes('\u201c\u4e16\u754c\u7c92\u5b50\u201d') && l.includes('\u6bcf\u4e2a\u7c92\u5b50')) {
      lines[i] = '- ParticleFeature is a \u201cworld particle\u201d: each particle has independent position, velocity, and lifecycle, suitable for natural effects like rain, snow, fog, smoke, water flow, and dust that belong to the physical world after leaving the host.';
      changed = true;
    }
    // NearEarthOrbiter/Satellite: semantic config note
    if (l.includes('\u8fd9\u662f\u201c\u8bed\u4e49\u914d\u7f6e\u201d\u7684\u6765\u6e90')) {
      lines[i] = 'Note: This is the source of \u201csemantic configuration,\u201d not rendering output. Rendering is handled by _applyConfig + Feature/Component.';
      changed = true;
    }
    // sensor mount note
    if (l.includes('\u8f68\u9053\u76ee\u6807\u901a\u5e38\u5e0c\u671b\u4f20\u611f\u5668\u201c\u5b89\u88c5\u5728\u673a\u4f53\u5750\u6807\u7cfb\u539f\u70b9\u201d')) {
      lines[i] = '- Orbital targets typically want the sensor \u201cmounted at the body coordinate system origin\u201d - Injects a default position so the sensor is unaffected by object position write strategies';
      changed = true;
    }
    // offline sampling note
    if (l.includes('\u79bb\u7ebf\u91c7\u6837 + \u63d2\u503c')) {
      lines[i] = '- This method uses \u201coffline sampling + interpolation\u201d to drive the target - If real-time propagation is enabled, this method is optional';
      changed = true;
    }
    // PopoverFeature class description
    if (l.includes('DOM \u5f39\u51fa\u5c42\u7ec4\u4ef6')) {
      lines[i] = 'PopoverFeature: A DOM popup component for binding HTML elements to 3D entities, following entity movement. Supports custom positioning direction, styling, fixed dimensions, and automatic show/hide.';
      changed = true;
    }
    // renderedVisible note
    if (l.includes('\u6ce8\u610f\uff1a\u5b9e\u9645 DOM \u662f\u5426\u663e\u793a\u8bf7\u8bfb\u53d6')) {
      lines[i] = 'Note: To check whether the actual DOM is displayed, read \`renderedVisible\`.';
      changed = true;
    }
    // runtime conditions
    if (l.includes('\u53d7 entity show\u3001\u5750\u6807\u3001\u8ddd\u79bb\u3001\u906e\u6321\u3001\u79bb\u5c4f\u7b49\u8fd0\u884c\u65f6\u6761\u4ef6\u5f71\u54cd')) {
      lines[i] = 'This is affected by runtime conditions such as entity show, coordinates, distance, occlusion, and off-screen state.';
      changed = true;
    }
    // destroy component
    if (l.includes('\u9500\u6bc1\u7ec4\u4ef6 \u79fb\u9664 DOM \u5143\u7d20')) {
      lines[i] = 'Destroys the component: removes the DOM element (or hides it based on destroyDOM configuration)';
      changed = true;
    }
    // per-frame update
    if (l.includes('\u6bcf\u5e27\u66f4\u65b0\u56de\u8c03 \u7528\u4e8e\u66f4\u65b0 DOM \u5143\u7d20')) {
      lines[i] = 'Per-frame update callback: used to update the DOM element\u2019s position on screen';
      changed = true;
    }
  }
  if (changed) {
    writeFileSync(fname, lines.join('\n'), 'utf-8');
    console.log('Fixed:', fname);
  } else {
    console.log('No changes:', fname);
  }
}
