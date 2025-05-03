import React, { useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
function OutputSection() {
    const editorRef = useRef<Editor>(null); 
  return (
    <div className='bg-white shadow-lg border'>
        <div className='flex justify-between items-center p-4'>
            <h2 className='text-lg font-bold'>Output</h2>
            <Button variant="outline" size="sm"className='flex gap-2'>
                <Copy/>Copy
            </Button>   
        </div>
        
        <Editor
        ref={editorRef}
        initialValue="Your result will be displayed here"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        height="600px"
        onChange={() => {
            console.log(editorRef.current?.getInstance().getMarkdown());
        }}
        />
      
    </div>
  )
}

export default OutputSection
