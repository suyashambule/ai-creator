"use client";

import React, { useRef, useEffect, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import dynamic from 'next/dynamic';

// Add custom styles for the editor
const editorStyles = `
  .toastui-editor-contents {
    font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }
  
  .toastui-editor-contents h1,
  .toastui-editor-contents h2,
  .toastui-editor-contents h3,
  .toastui-editor-contents h4,
  .toastui-editor-contents h5,
  .toastui-editor-contents h6 {
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    color: #1a1a1a;
  }
  
  .toastui-editor-contents p {
    margin-bottom: 1em;
  }
  
  .toastui-editor-contents code {
    font-family: var(--font-geist-mono), monospace;
    background-color: #f5f5f5;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  .toastui-editor-contents pre {
    background-color: #f5f5f5;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
  }
  
  .toastui-editor-contents blockquote {
    border-left: 4px solid #7C3AED;
    padding-left: 1em;
    margin-left: 0;
    color: #666;
  }
  
  .toastui-editor-contents ul,
  .toastui-editor-contents ol {
    padding-left: 2em;
    margin-bottom: 1em;
  }
  
  .toastui-editor-contents li {
    margin-bottom: 0.5em;
  }
`;

// Create a wrapper component for the editor
const EditorWrapper = dynamic(
  () => import('@toast-ui/react-editor').then((mod) => {
    const Editor = mod.Editor;
    return function EditorWrapper({ editorRef, ...props }: any) {
      return (
        <>
          <style>{editorStyles}</style>
          <Editor ref={editorRef} {...props} />
        </>
      );
    };
  }),
  { ssr: false }
);

interface OutputSectionProps {
  aiResponse: string;
}

function OutputSection({ aiResponse }: OutputSectionProps) {
    const editorRef = useRef<any>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && editorRef.current) {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setMarkdown(aiResponse);
        }
    }, [aiResponse, isMounted]);

    if (!isMounted) {
        return <div>Loading editor...</div>;
    }

    return (
        <div className='bg-white shadow-lg border'>
            <div className='flex justify-between items-center p-4'>
                <h2 className='text-lg font-bold'>Output</h2>
                <Button variant="outline" size="sm" className='flex gap-2'>
                    <Copy/>Copy
                </Button>   
            </div>
            
            <EditorWrapper
                ref={editorRef}
                initialValue={aiResponse || "Your result will be displayed here"}
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                height="600px"
                onChange={() => {
                    console.log(editorRef.current?.getInstance().getMarkdown());
                }}
            />
        </div>
    );
}

export default OutputSection;
