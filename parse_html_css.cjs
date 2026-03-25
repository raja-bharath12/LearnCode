const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync('html_css_raw.txt', 'utf8');
const lessonsDir = path.join(__dirname, 'public', 'courses', '4-web-dev-html-css', 'lessons');

const dirs = fs.readdirSync(lessonsDir).filter(f => f !== '.gitkeep' && fs.statSync(path.join(lessonsDir, f)).isDirectory());

const rawLessons = raw.split('📘 Lesson ').slice(1);
const parsed = {};
for (const rl of rawLessons) {
  const match = rl.match(/^(\d+):\s*(.*)\n([\s\S]*)/);
  if (match) {
    parsed[match[1]] = {
      title: match[2].trim(),
      content: match[3].trim()
    };
  }
}

const courseDataLessons = [];

for (const dir of dirs) {
  const match = dir.match(/^(\d+)-/);
  if (!match) continue;
  const id = parseInt(match[1]);
  
  let p = parsed[id];
  let title = p ? p.title : dir.replace(/^\d+-/, '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  let content = p ? `# ${title}\n\n${p.content}` : `# ${title}\n\nContent coming soon.`;
  
  // Format content neatly
  content = content.replace(/🔹 (\d+\. .*)/g, '## $1')
                   .replace(/🧠 Practice Problems/g, '## Practice Problems')
                   .replace(/🟢 EASY LEVEL/g, '### Easy')
                   .replace(/🟡 MEDIUM LEVEL/g, '### Medium')
                   .replace(/🔴 HARD LEVEL/g, '### Hard')
                   .replace(/❓ Problem:/g, '**Problem:**')
                   .replace(/✅ Solution:/g, '**Solution:**\n');

  // Write content.md directly to public/
  const mdPath = path.join(lessonsDir, dir, 'content.md');
  fs.writeFileSync(mdPath, content, 'utf8');
  
  // also sync to src just in case
  const srcPath = path.join(__dirname, 'src', 'courses', '4-web-dev-html-css', 'lessons', dir);
  if (fs.existsSync(srcPath)) {
      fs.writeFileSync(path.join(srcPath, 'content.md'), content, 'utf8');
  }

  courseDataLessons.push({
    id: id,
    title: title,
    contentPath: `/courses/4-web-dev-html-css/lessons/${dir}/content.md`,
    starter: `<!-- Lesson ${id}: ${title} -->\n<h1>Hello from ${title.replace(/"/g, '\\"')}</h1>\n<style>\n  h1 { color: #3498db; }\n</style>`
  });
}

courseDataLessons.sort((a, b) => a.id - b.id);

const block = `  4: {
    title: "Web Dev with HTML & CSS",
    lang: "html",
    lessons: ${JSON.stringify(courseDataLessons, null, 6).replace(/"id": /g, 'id: ').replace(/"title": /g, 'title: ').replace(/"contentPath": /g, 'contentPath: ').replace(/"starter": /g, 'starter: ')}
  }`;

console.log(block);
