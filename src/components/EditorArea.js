import React, { useEffect, useState, useRef } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import MonacoEditor from "react-monaco-editor";
import "monaco-editor/esm/vs/basic-languages/html/html"; // Import HTML language support

import Navbar from "./Navbar";
import OutputWindow from "./OutputWindow";

const EditorArea = () => {
  const [code, setCode] = useState(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      


  </body>
  </html>`);
  const [outputHtml, setOutputHtml] = useState("");
  const editorRef = useRef(null);
  const monacoInstanceRef = useRef(null);

  const handleEditorChange = (newValue) => {
    setCode(newValue);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoInstanceRef.current = monaco;
  };

  const handleSnippetInsert = (snippet) => {
    if (!editorRef.current || !monacoInstanceRef.current) return;

    const position = editorRef.current.getPosition();
    const range = new monacoInstanceRef.current.Range(
      position.lineNumber,
      position.column,
      position.lineNumber,
      position.column
    );
    editorRef.current.executeEdits("", [{ range: range, text: snippet }]);
    editorRef.current.focus();
  };

  const handleUpdateOutput = () => {
    setOutputHtml(code);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-1/2 h-full">
        <Navbar onSnippetInsert={handleSnippetInsert} />
        <MonacoEditor
          width="calc(100%)"
          height="calc(100% - 64px)"
          language="HTML"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          editorDidMount={handleEditorDidMount}
          options={{
            minimap: { enabled: true },
            scrollbar: {
              verticalScrollbarSize: 0,
              horizontalScrollbarSize: 0,
            },
          }}
        />
      </div>
      <button
        onClick={handleUpdateOutput}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-full flex items-center justify-center"
        title="Update Output"
      >
        <ArrowRightCircleIcon className="h-8 w-8" />
      </button>
      <div className="w-1/2 h-full" style={{ backgroundColor: "#1e1e1e" }}>
        <OutputWindow htmlCode={outputHtml} />
      </div>
    </div>
  );
};

export default EditorArea;
