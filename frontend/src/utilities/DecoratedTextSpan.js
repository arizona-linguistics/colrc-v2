import React, { Component } from 'react';
import { findDecorations } from './Helpers';

class DecoratedTextSpan extends Component {

  createSpans = (str) => {
     const decorations = findDecorations(str);

     let children = []
     //Inner loop to create children
     for (let i = 0; i < decorations.length; i++)
     {
       let ss = str.substring(decorations[i].start, decorations[i].end);
       if (decorations[i].type === "bold") {
         children.push(<span style={{ fontWeight: 'bold' }}>{ss}</span>);
       }
       else if (decorations[i].type === "underline") {
         children.push(<span style={{ textDecoration: 'underline' }}>{ss}</span>);
       }
       else {
         children.push(<span>{ss}</span>);
       }
     }

     return children;
   }

  render() {
    return (
      <span>
        {this.createSpans(this.props.str)}
      </span>
    )
  }
}

export default DecoratedTextSpan;
