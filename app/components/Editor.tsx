import { useEffect, useRef } from 'react';

const Editor = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadEditor = async () => {
      const { default: ClassicEditor } = await import('@ckeditor/ckeditor5-build-classic');
      if (editorRef.current) {
        ClassicEditor.create(editorRef.current)
          .then((editor) => {
            console.log('Editor initialized', editor);
          })
          .catch((error) => {
            console.error('Error initializing CKEditor', error);
          });
      }
    };

    loadEditor();
  }, []);

  return <div ref={editorRef}></div>;
};

export default Editor;
