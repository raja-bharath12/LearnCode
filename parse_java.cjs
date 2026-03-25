const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync('java_raw.txt', 'utf8');
const lessonsDir = path.join(__dirname, 'src', 'courses', '3-java-complete-course', 'lessons');

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

  // Write content.md
  const mdPath = path.join(lessonsDir, dir, 'content.md');
  fs.writeFileSync(mdPath, content, 'utf8');
  
  courseDataLessons.push({
    id: id,
    title: title,
    contentPath: `/courses/3-java-complete-course/lessons/${dir}/content.md`,
    starter: `// Lesson ${id}: ${title}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from ${title.replace(/"/g, '\\"')}");\n    }\n}`
  });
}

courseDataLessons.sort((a, b) => a.id - b.id);

const block = `  3: {
    title: "Java Complete Course",
    lang: "java",
    lessons: ${JSON.stringify(courseDataLessons, null, 6).replace(/"id": /g, 'id: ').replace(/"title": /g, 'title: ').replace(/"contentPath": /g, 'contentPath: ').replace(/"starter": /g, 'starter: ')}
  }`;

console.log(block);
