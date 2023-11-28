import React from "react";
import { findDecorations } from "./helpers";

export default function DecoratedTextSpan(props) {
  function createSpans(str) {
    const decorations = findDecorations(str);

    let children = [];
    //Inner loop to create children
    for (let i = 0; i < decorations.length; i++) {
      let ss = str.substring(decorations[i].start, decorations[i].end);
      if (decorations[i].type === "bold") {
        children.push(
          <span key={i} style={{ fontWeight: "bold" }}>
            {ss}
          </span>
        );
      } else if (decorations[i].type === "underline") {
        children.push(
          <span key={i} style={{ textDecoration: "underline" }}>
            {ss}
          </span>
        );
      } else if (decorations[i].type === "superscript") {
        children.push(
          <span key={i} style={{ fontSize: "70%", verticalAlign: "super" }}>
            {ss}
          </span>
        );
      } else {
        children.push(<span key={i}>{ss}</span>);
      }
    }

    return children;
  }

  return <span>{createSpans(props.str)}</span>;
}
