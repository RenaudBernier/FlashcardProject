'use client'
import './styles.scss'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import { ReactNodeViewRenderer, EditorProvider, useCurrentEditor} from '@tiptap/react'

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from 'lowlight'
import React  from 'react'
import StarterKit from '@tiptap/starter-kit'

import "katex/dist/katex.min.css";
import { MathExtension } from "@aarkue/tiptap-math-extension";


// eslint-disable-next-line
import CodeBlockComponent from './CodeBlockComponent'
import {Box, Button} from "@mui/material";

// create a lowlight instance
const lowlight = createLowlight(common)


const MenuBar = () => {
    const {editor, editCard} = useCurrentEditor();
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

export default ({content, editCard, isFront}) => {



    return (
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
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
            immediatelyRender={false}
            content={content}
            editorProps={{
                attributes: {
                    class: 'tiptap',
                },
            }}
            slotBefore={<MenuBar />}
            onUpdate={({ editor }) => {
                const html = editor.getHTML();
                editCard(html, isFront);
            }}
        />
        </Box>
    )
}