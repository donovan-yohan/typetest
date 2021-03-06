import React, { useRef, useEffect } from "react";
import Letter from "../components/letter.js";

export default React.memo(function Word({
  active,
  word,
  typed,
  id,
  onLetterUpdate,
  onWordUpdate,
  finished,
}) {
  const wordRef = useRef(null);
  const overflowText =
    typed.value.length > word.length
      ? typed.value.substring(word.length, typed.value.length)
      : "";

  useEffect(() => {
    if (active) {
      onWordUpdate({ type: "setWordRef", payload: wordRef });
    }
  }, [active]);

  return (
    <span className={"wordWrapper"}>
      <span ref={wordRef} className={"word"}>
        <span>
          {word.map((letter, i) => {
            return (
              <Letter
                id={i}
                active={active}
                letter={letter}
                typed={typed}
                wordId={id}
                key={`${id}-CHAR-${i}`}
                onLetterUpdate={onLetterUpdate}
                finished={finished}
              />
            );
          })}
        </span>
        <span className={"overflow"}>
          {overflowText.split("").map((letter, i) => {
            return (
              <Letter
                id={i + word.length}
                active={active}
                letter={letter}
                typed={typed}
                wordId={id}
                key={`${id}-OVERFLOW-${i + word.length}`}
                onLetterUpdate={onLetterUpdate}
                finished={finished}
                overflow={true}
              />
            );
          })}
        </span>
      </span>

      <style jsx>{`
        .word,
        input {
          font-size: 2.5em;
          letter-spacing: 0.02em;
          line-height: 2.25;
        }

        .word {
          white-space: pre;
          user-select: none;
          position: relative;
          margin-right: 0.5em;
        }
      `}</style>
    </span>
  );
});
