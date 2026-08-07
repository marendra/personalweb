import { Marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import sql from 'highlight.js/lib/languages/sql';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('sql', sql);

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

const marked = new Marked();

marked.use({
	gfm: true,
	breaks: false,
	renderer: {
		code({ text, lang }) {
			const language = (lang ?? '').trim().split(/\s+/)[0] ?? '';
			let highlighted: string;
			if (language && hljs.getLanguage(language)) {
				highlighted = hljs.highlight(text, { language }).value;
			} else {
				highlighted = escapeHtml(text);
			}
			const className = language ? `hljs language-${escapeHtml(language)}` : 'hljs';
			return `<pre><code class="${className}">${highlighted}</code></pre>\n`;
		}
	}
});

/** Render markdown body to HTML with syntax highlighting. */
export function renderMarkdown(markdown: string): string {
	const result = marked.parse(markdown, { async: false });
	if (typeof result !== 'string') {
		throw new Error('Expected synchronous markdown render');
	}
	return result;
}
