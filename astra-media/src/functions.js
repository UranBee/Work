import { PAGE_CREATE, PAGE_LIBRARY, PAGE_MAIN, PAGE_REDACT, COLORS } from './constants'

export function normalizePageHash() {
    const hash = window.location.hash.slice(1)
    if (Object.keys(PAGE_CREATE, PAGE_LIBRARY, PAGE_MAIN, PAGE_REDACT).includes(hash)) {
      return hash
    }
    window.location.hash = PAGE_MAIN
    return PAGE_MAIN
}

export default function defineCustomMode(CodeMirror) {
  CodeMirror.defineMode("customDoc", function() {
    return {
      token: function(stream, state) {
        if (stream.match(/^open\s+/)) {
          return "keyword-1"; // Присваиваем токену класс 'keyword-1'
        } else if (stream.match(/^close\s+/)) {
          return "keyword-2"; // Присваиваем токену класс 'keyword-2'
        } else if (stream.match(/^move\s+/)) {
          return "keyword-3"; // Присваиваем токену класс 'keyword-3'
        } else if (stream.match(/".*?"/)) {
          return "string"; // Присваиваем токену класс 'string'
        } else if (stream.match(/\b\d{2}\b/g)) {
          return "number"; // Присваиваем токену класс 'number'
        } else if (stream.match(/^\S+/)) {
          return "variable"; // Присваиваем токену класс 'variable'
        }
        stream.next(); // Пропускаем символы
        return null;
      }
    };
  });
}
