import React, { useEffect, useState, useRef } from "react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import MonacoEditor from "react-monaco-editor";
import "monaco-editor/esm/vs/basic-languages/html/html"; // Import HTML language support

import Navbar from "./Navbar";
import OutputWindow from "./OutputWindow";

const EditorArea = () => {
  const defaultCode = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      
      

  </body>
  </html>`;
  const line = 10; //TODO: ADJUST THAT LINE TO SNIPPETTTTT (cursor insert line)

  const [code, setCode] = useState(defaultCode);
  const [outputHtml, setOutputHtml] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const editorRef = useRef(null);
  const monacoInstanceRef = useRef(null);

  const handleEditorChange = (newValue) => setCode(newValue);

  const handleEditorDidMount = (editor, monaco) => {
    const column = editor.getModel().getLineMaxColumn(10); // Get the maximum column number of the line, ensuring the cursor goes to the end
    console.log("column: ", column);
    editorRef.current = editor;
    monacoInstanceRef.current = monaco;
    editor.setPosition({ lineNumber: line, column: column });
    editor.focus();
  };

  const handleSnippetInsert = (snippet) => {
    if (!editorRef.current || !monacoInstanceRef.current) return;

    const { lineNumber, column } = editorRef.current.getPosition();
    const range = new monacoInstanceRef.current.Range(
      lineNumber,
      column,
      lineNumber,
      column
    );
    editorRef.current.executeEdits("", [{ range: range, text: snippet }]);
    editorRef.current.focus();
  };

  const handleChangeView = () => setIsMobile((prev) => !prev);

  const handleClearCodeEditor = () => {
    setCode((prev) => defaultCode);
    editorRef.current && editorRef.current.setValue(defaultCode);
    editorRef.current.setPosition({
      lineNumber: line,
      column: editorRef.current.getModel().getLineMaxColumn(10),
    });
    editorRef.current.focus();
  };

  const handleUpdateOutput = () => setOutputHtml(code);

  useEffect(() => {
    const handleWindowResize = () =>
      editorRef.current && editorRef.current.layout();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="flex w-full h-screen ">
      <div className="flex flex-col w-1/2 h-full">
        <Navbar
          onSnippetInsert={handleSnippetInsert}
          isMobile={isMobile}
          onChangeView={handleChangeView}
          onClear={handleClearCodeEditor}
        />
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
            wordWrap: "on",
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
      <div
        className="flex w-1/2 h-full items-center justify-center"
        style={{ backgroundColor: "#1e1e1e" }}
      >
        <OutputWindow htmlCode={outputHtml} isMobileView={isMobile} />
      </div>
    </div>
  );
};

export default EditorArea;
