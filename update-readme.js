import fs from 'fs/promises';
import Parser from 'rss-parser';
const parser = new Parser();
 
try {
  // Get three latest posts from my blog's RSS feed
  const { items } = await parser.parseURL('https://libialany.github.io/feed.xml');
  let updates = `<!-- start latest posts -->\n`;
  for (let i = 0; i < 3; i++) {
    const { link, title } = items[i];
    const row = `- [${title}](${link})\n`;

    console.log(`Post #${i + 1} found. Title: ${title} Link: ${link}\n`);
    updates = updates.concat(row);
  }
  /// 
  updates = updates.concat('\nMy friend Latest Blog Post\n');
  const { items_1 } = await parser.parseURL('https://taller.luismita.com/b.rss');
  for (let i = 0; i < 3; i++) {
    const { link, title } = items_1[i];
    const row = `- [${title}](${link})\n`;

    console.log(`Post #${i + 1} found. Title: ${title} Link: ${link}\n`);
    updates = updates.concat(row);
  }

  updates = updates.concat('<!-- end latest posts -->');

  // Rewrite README with new post content
  const currentText = await fs.readFile('README.md', 'utf8');
  const postsSection = /<!-- start latest posts -->[\s\S]*<!-- end latest posts -->/g;
  const newText = currentText.replace(postsSection, updates)

  await fs.writeFile('README.md', newText);
} catch (error) {
  console.error('there was an error:', error.message);
}
