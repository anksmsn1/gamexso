import { useEffect, useRef, useState } from 'react';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<any>(null);  // Reference to hold the editor instance
  const [isEditorReady, setIsEditorReady] = useState(false); // Track if the editor is initialized

  useEffect(() => {
    const loadEditor = async () => {
      const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
      if (editorRef.current && !editorInstance.current) {
        // Initialize the editor only once
        ClassicEditor.create(editorRef.current)
          .then((editor) => {
            editorInstance.current = editor;  // Save editor instance
            console.log('Editor initialized', editor);

            // Set the initial content once the editor is created
            editor.setData(value);

            // Handle content changes
            editor.model.document.on('change:data', () => {
              const content = editor.getData();
              onChange(content); // Pass the content to the parent
            });

            // Mark the editor as initialized
            setIsEditorReady(true);
          })
          .catch((error) => {
            console.error('Error initializing CKEditor', error);
          });
      }
    };

    loadEditor();

    return () => {
      // Clean up editor instance on unmount
      if (editorInstance.current) {
        editorInstance.current.destroy().catch((error: unknown) => {
          if (error instanceof Error) {
            console.error('Error destroying editor', error.message);
          } else {
            console.error('Unknown error destroying editor', error);
          }
        });
      }
    };
  }, [onChange]); // Don't depend on `value`, initialize only once

  useEffect(() => {
    if (isEditorReady && editorInstance.current) {
      // Update the content in the editor only if the value has changed
      const editorData = editorInstance.current.getData();
      if (editorData !== value) {
        editorInstance.current.setData(value); // Update content if necessary
      }
    }
  }, [value, isEditorReady]); // Update editor content only after it's ready and when `value` changes

  return <div ref={editorRef}></div>;
};

export default Editor;
