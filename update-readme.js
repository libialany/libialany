import fs from 'fs/promises';
import Parser from 'rss-parser';
const parser = new Parser();
 
try {
  const { items } = await parser.parseURL('https://libialany.github.io/feed.xml');
  let updates = `<!-- start latest posts -->\n`;
  for (let i = 0; i < 3; i++) {
    const { link, title } = items[i];
    const row = `- [${title}](${'https://libialany.github.io/'+link.slice(0,-5)})\n`;
    updates = updates.concat(row);
  }
  updates = updates.concat('<!-- end latest posts -->');
  const currentText = await fs.readFile('README.md', 'utf8');
  const postsSection = /<!-- start latest posts -->[\s\S]*<!-- end latest posts -->/g;
  const newText = currentText.replace(postsSection, updates)
  await fs.writeFile('README.md', newText);
} catch (error) {
  console.error('there was an error:', error.message);
}