import {
  CheckIcon,
  CopyIcon,
  FileZipIcon,
  QuestionIcon,
  TerminalIcon,
} from "@primer/octicons-react";
import React, { useEffect, useRef, useState } from "react";
import "../styles/RemoteURL.css";

const RemoteURL = ({ username, darkMode }) => {
  const inputRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);

  return (
    <div className="remoteurl-container">
      <div className="firstline">
        <TerminalIcon className="termurl" size={16} />
        Clone
        <QuestionIcon className="ques" size={16} />
      </div>
      <h6 className="https">HTTPS</h6>
      <div className="lastline">
        <input
          ref={inputRef}
          className="urlinput"
          type="text"
          value={`https://github.com/${username}/gitgoodrepo.git`}
          readOnly
        />
        <div
          className="copybtn"
          onClick={() => {
            navigator.clipboard.writeText(inputRef.current.value);
            setIsCopied(true);
          }}
        >
          {isCopied ? (
            <CheckIcon className="check" size={13} fill="green" />
          ) : (
            <CopyIcon className="copyicon" size={13} fill="white" />
          )}
        </div>
      </div>
      <div className="lastline">
        <FileZipIcon size={13} />
        <p>Download zip</p>
      </div>
    </div>
  );
};

export default RemoteURL;
