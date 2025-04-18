'use client';

import { useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './display.module.css'

export default function Display(props) {
    const { content } = props;
    const test_mk = `
# A demo of \`react-markdown\`

\`react-markdown\` is a markdown component for React.

👉 Changes are re-rendered as you type.

👈 Try writing some markdown on the left.

## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using \`dangerouslySetInnerHTML\`
* Lets you define your own components (to render \`MyHeading\` instead of \`'h1'\`)
* Has a lot of plugins

## Contents

Here is an example of a plugin in action
([\`remark-toc\`](https://github.com/remarkjs/remark-toc)).
**This section is replaced by an actual table of contents**.
It adds support for GitHub-specific extensions to the language:
tables, strikethrough, tasklists, and literal URLs.

These features **do not work by default**.
👆 Use the toggle above to add the plugin.

| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item
    `;
    return(
        <div className={styles.display}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                { content }
            </ReactMarkdown>
        </div>
    );
}
