import { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const DescriptionEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [ StarterKit ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="form-group">
      <label className="form-label">Description</label>
      <div className="editor" style={{ border: '1px solid #ccc', minHeight: '200px', padding: '10px' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default DescriptionEditor