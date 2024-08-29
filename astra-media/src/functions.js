import { PAGE_CREATE, PAGE_LIBRARY, PAGE_MAIN, PAGE_REDACT} from './constants'

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
      startState: function() {
        return {
          openBrackets: [] // Хранилище открытых скобок
        };
      },
      token: function(stream, state) {
        if (stream.match(/"(?:[^\\"]|\\.)*?"/)) {
          return "string";
        }
        if (stream.match(/\/\/.*/)) {
          return "comment";
        }
        if (stream.match(/0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i)) {
          return "number";
        }
        if (stream.match(/(?:close|open|move)\b/)) {
          return "keyword";
        }
        if (stream.match(/[-+\/*=<>!]+/)) {
          return "operator";
        }
        
        // Обработка скобок
        if (stream.match(/[\{\[\(]/)) {
          state.openBrackets.push(stream.current());
          return "bracket";
        }
        if (stream.match(/[\}\]\)]/)) {
          let lastOpenBracket = state.openBrackets.pop();
          if (lastOpenBracket && (lastOpenBracket === "{" && stream.current() === "}" ||
                                   lastOpenBracket === "[" && stream.current() === "]" ||
                                   lastOpenBracket === "(" && stream.current() === ")")) {
            return "bracket";
          } else {
            return "error"; // Неверная закрывающая скобка
          }
        }
        
        // Если скобка не соответствует открытым, помечаем ее как ошибку
        stream.next();
        return null;
      },

    };
  });
}