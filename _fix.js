const fs = require('fs');
let t = fs.readFileSync('website/docs/en/api/types/PolylineGroundOptions.md', 'utf8');
const lines = t.split('\n');
let found = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].endsWith('  ],') && lines[i+1] === '});') {
    lines[i] = ' ],';
    found = i + 1;
    break;
  }
}
fs.writeFileSync('website/docs/en/api/types/PolylineGroundOptions.md', lines.join('\n'), 'utf8');
console.log('Fixed line', found);
