'use client'
import './styles.scss'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import {EditorContent, ReactNodeViewRenderer, useEditor, EditorProvider, useCurrentEditor} from '@tiptap/react'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'
import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import "katex/dist/katex.min.css";
import { MathExtension } from "@aarkue/tiptap-math-extension";


// eslint-disable-next-line
import CodeBlockComponent from './CodeBlockComponent'
import {Button} from "@mui/material";

// create a lowlight instance
const lowlight = createLowlight(all)

// you can also register individual languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const MenuBar = () => {
    const {editor} = useCurrentEditor();
    if (!editor) {
        return null
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <Button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>
                    Toggle code block
                </Button>
            </div>
        </div>
    )
}

export default () => {


    return (
        <>
            <MenuBar></MenuBar>
        <EditorProvider
            extensions={[
                StarterKit.configure({ codeBlock: false }), // disable default codeBlock
                CodeBlockLowlight.extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlockComponent)
                    },
                }).configure({ lowlight }),
                MathExtension.configure({
                    evaluation: true, katexOptions: { macros: { "\\B": "\\mathbb{B}"
                    } }, delimiters: "dollar" }),
            ]}
            content={`
      <p>That's a boring paragraph followed by a fenced code block:</p>
      <pre><code class="language-javascript">for (var i=1; i <= 20; i++) {
  if (i % 15 == 0) console.log("FizzBuzz");
  else if (i % 3 == 0) console.log("Fizz");
  else if (i % 5 == 0) console.log("Buzz");
  else console.log(i);
}</code></pre>
      <p>Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.</p>
    `}
            editorProps={{
                attributes: {
                    class: 'tiptap',
                },
            }}
            slotBefore={<MenuBar />}
        />
        </>
    )
}