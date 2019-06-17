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
  var boldLen = boldIndices.length;
  var underlineLen = underlineIndices.length;

  for (var i = 0; i < boldLen; i++) {
    decorations.push({ start: boldIndices[i]+3, end: boldEndIndices[i], type: "bold" });
  }

  for (i = 0; i < underlineLen; i++) {
    decorations.push({ start: underlineIndices[i]+3, end: underlineEndIndices[i], type: "underline" });
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

    if (e > s) {
      decorations.push({ start: s, end: e, type: "normal" });
    }

    if (decorations[i].type === "bold") {
      s = decorations[i].end + 4;
    }
    else if (decorations[i].type === "underline") {
      s = decorations[i].end + 4;
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
