import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [textArea, setTextArea] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const [newWord, setNewWord] = useState("");
  const [oldWord, setOldWord] = useState("");

  useEffect(() => {
    if (textArea.length > 1) {
      const words = textArea.match(/\b\w+\b/g);
      const lowerCaseWords = words.map((word) => word.toLowerCase());

      const uniqueWords = new Set(lowerCaseWords);

      const uniqueWordCount = uniqueWords.size;
      setWordCount(uniqueWordCount);
    } else {
      setWordCount(0);
    }
    const chars = textArea.replace(/[^a-zA-Z0-9]/g, "").length;
    setCharCount(chars);
  }, [textArea]);

  const onChangeInTextArea = (e) => {
    setTextArea(e.target.value);
  };

  const userNewWord = (e) => {
    setNewWord(e.target.value);
  };

  const userOldWord = (e) => {
    setOldWord(e.target.value);
  };

  const onClickReplace = () => {
    const newText = textArea.replaceAll(
      oldWord,
      newWord
    );
    setTextArea(newText);
    setOldWord("");
    setNewWord("");
  };

  return (
    <div className="main-container">
      <div className="editor-container">
        <textarea
          onChange={onChangeInTextArea}
          value={textArea}
          placeholder="Enter your text"
          rows={20}
          cols={10}
          className="text-area"
        ></textarea>
        <div className="analysis-container">
          <div className="count-container">
            <h1 className="count-type">Words Count</h1>
            <p className="count">{wordCount}</p>
          </div>
          <div className="vl"></div>
          <div className="count-container">
            <h1 className="count-type">Characters Count</h1>
            <p className="count">{charCount}</p>
          </div>
        </div>
        <div className="replace-container">
          <input
            onChange={userOldWord}
            value={oldWord}
            className="replace-input"
            type="text"
            placeholder="Old Word"
          />
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.6"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
          <input
            onChange={userNewWord}
            value={newWord}
            className="replace-input"
            type="text"
            placeholder="New Word"
          />
          <button onClick={onClickReplace} className="replace-btn">
            Replace
          </button>
        </div>
      </div>
    </div>
  );
}
