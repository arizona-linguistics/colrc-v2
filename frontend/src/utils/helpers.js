// import { receiveErrors } from '../actions/errors'

export function isLoggedIn () {
  const loggedIn = localStorage.getItem('TOKEN') ? true : false
  return loggedIn
}

export function isObject (item) {
  return Object.prototype.toString.call(item) === '[object Object]'
}

export function getPercentage (count, total) {
  return total === 0 ? 0 : parseInt(count / total * 100, 10)
}

// export function errorCallback (dispatch, getState, error) {
//   return (dispatch, getState) => {
//     console.error("ERROR =>", error.graphQLErrors.map(x => x.message))
//     const errors = {
//       errorsText: error.graphQLErrors.map(x => x.message)
//     }
//     dispatch(receiveErrors(errors))
//   }
// }

export function hashToArray(hash) {
  const arr = []
  Object.keys(hash).forEach(function (key) {
    const newHash = {}
    Object.keys(hash[key]).forEach(function (element) {
      newHash[element] = hash[key][element]
    })
    arr.push(
      newHash
    )
  })
  return arr
}

// function keysToList(list) {
//   const liElements = []
//   Object.keys(list).forEach(function (key) {
//     const {id, salish, nicodemus, english, active} = list[key]
//     liElements.push(
//       <li>
//         <span>{[id, salish, nicodemus, english, active].join(' | ')}</span>
//         <button onClick={() => alert('Remove')}>X</button>
//       </li>
//     )
//   })
//   return <ul>{liElements}</ul>
// }
export function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen === 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

export function findDecorations(str) {
  var decorations = [];
  var boldIndices = getIndicesOf("<b>", str);
  var boldEndIndices = getIndicesOf("</b>", str);
  var underlineIndices = getIndicesOf("<u>", str);
  var underlineEndIndices = getIndicesOf("</u>", str);
  var superscriptIndices = getIndicesOf("<sup>", str);
  var superscriptEndIndices = getIndicesOf("</sup>", str);
  var boldLen = boldIndices.length;
  var underlineLen = underlineIndices.length;
  var superscriptLen = superscriptIndices.length;

  for (var i = 0; i < boldLen; i++) {
    decorations.push({ start: boldIndices[i]+3, end: boldEndIndices[i], type: "bold" });
  }

  for (i = 0; i < underlineLen; i++) {
    decorations.push({ start: underlineIndices[i]+3, end: underlineEndIndices[i], type: "underline" });
  }

 for (i = 0; i < superscriptLen; i++) {
    decorations.push({ start: superscriptIndices[i]+5, end: superscriptEndIndices[i], type: "superscript" });
  }

  decorations.sort(function(a, b){
    return a.start-b.start
  });

  var s = 0;
  var e = 0;
  var decLen = decorations.length;
  for (i=0; i < decLen; i++) {
    e = decorations[i].start;
    if (decorations[i].type === "bold") {
      e -= 3;
    }
    else if (decorations[i].type === "underline") {
      e -= 3;
    }
    else if (decorations[i].type === "superscript") {
      e -= 5;
    }

    if (e > s) {
      decorations.push({ start: s, end: e, type: "normal" });
    }

    if (decorations[i].type === "bold") {
      s = decorations[i].end + 4;
    }
    else if (decorations[i].type === "underline") {
      s = decorations[i].end + 4;
    }
    else if (decorations[i].type === "superscript") {
      s = decorations[i].end + 6;
    }
  }
  if (s < str.length) {
    decorations.push({ start: s, end: str.length, type: "normal" });
  }

  decorations.sort(function(a, b){
    return a.start-b.start
  });

  return decorations;
}

export function formatCellValue(contents) {
  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}\+\d{2}:\d{2}/.test(contents)) {
    return new Date(contents).toLocaleString()
  }
  // Eventually add more formatters...
  return contents;
}
