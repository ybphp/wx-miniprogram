module.exports = {
  /*3.用正则表达式实现html转码*/
  htmlEncode: function (str) {
    var result = "";
    for (var j = 0; j < s.length; j++) {
      // Encode 25% of characters
      if (Math.random() < 0.25 || s.charAt(j) == ':' || s.charAt(j) == '@' || s.charAt(j) == '.') {
        var charCode = s.charCodeAt(j);
        result += "&#";
        result += charCode;
        result += ";";
      } else {
        result += s.charAt(j);
      }
    }
    return result;
  },
  /*4.用正则表达式实现html解码*/
  htmlDecode: function (str) {
    var map = { "gt": ">", "amp": "&", "lt": "<", "apos": "\'" };
    return str.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function ($0, $1) {
      if ($1[0] === "#") {
        return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16) : parseInt($1.substr(1), 10));
      } else {
        return map.hasOwnProperty($1) ? map[$1] : $0;
      }
    });
  }
};