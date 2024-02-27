import React from "react";
import "../styles/OutputWindow.css";

const OutputWindow = ({ htmlCode, isMobileView }) => {
  const windowClass = isMobileView ? "iphone-frame" : "mac-window";

  const titleBarClass = isMobileView
    ? "hidden"
    : "mock-titlebar bg-gray-200 p-2 flex justify-between items-center relative";

  return (
    <div
      className={`${windowClass} h-[98%] m-4 shadow-md overflow-hidden rounded-lg`}
    >
      <div className={titleBarClass}>
        {!isMobileView && (
          <>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="absolute left-1/2 transform -translate-x-1/2 text-xs font-mono">
              https://tryit.krystianslowik.com
            </span>
          </>
        )}
      </div>
      <iframe
        title="Browser mockup"
        srcDoc={htmlCode}
        style={
          isMobileView
            ? {
                margin: "0 auto",
                backgroundColor: "white",
              }
            : { width: "100%", height: "100%", backgroundColor: "white" }
        }
        sandbox="allow-scripts allow-modals allow-same-origin allow-forms allow-popups allow-top-navigation"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default OutputWindow;
