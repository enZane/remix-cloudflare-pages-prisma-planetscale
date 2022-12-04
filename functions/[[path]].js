var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 == "object" || typeof from2 == "function")
    for (let key of __getOwnPropNames(from2))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse3;
    exports.serialize = serialize2;
    var decode = decodeURIComponent, encode = encodeURIComponent, fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options) {
      if (typeof str != "string")
        throw new TypeError("argument str must be a string");
      for (var obj = {}, opt = options || {}, pairs = str.split(";"), dec = opt.decode || decode, i = 0; i < pairs.length; i++) {
        var pair = pairs[i], index = pair.indexOf("=");
        if (!(index < 0)) {
          var key = pair.substring(0, index).trim();
          if (obj[key] == null) {
            var val = pair.substring(index + 1, pair.length).trim();
            val[0] === '"' && (val = val.slice(1, -1)), obj[key] = tryDecode(val, dec);
          }
        }
      }
      return obj;
    }
    function serialize2(name, val, options) {
      var opt = options || {}, enc = opt.encode || encode;
      if (typeof enc != "function")
        throw new TypeError("option encode is invalid");
      if (!fieldContentRegExp.test(name))
        throw new TypeError("argument name is invalid");
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value))
        throw new TypeError("argument val is invalid");
      var str = name + "=" + value;
      if (opt.maxAge != null) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge))
          throw new TypeError("option maxAge is invalid");
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain))
          throw new TypeError("option domain is invalid");
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path))
          throw new TypeError("option path is invalid");
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        if (typeof opt.expires.toUTCString != "function")
          throw new TypeError("option expires is invalid");
        str += "; Expires=" + opt.expires.toUTCString();
      }
      if (opt.httpOnly && (str += "; HttpOnly"), opt.secure && (str += "; Secure"), opt.sameSite) {
        var sameSite = typeof opt.sameSite == "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case !0:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch {
        return str;
      }
    }
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/warnings.js
function warnOnce(condition, message) {
  !condition && !alreadyWarned[message] && (alreadyWarned[message] = !0, console.warn(message));
}
var alreadyWarned, init_warnings = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/warnings.js"() {
    alreadyWarned = {};
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/cookies.js
async function encodeCookieValue(sign, value, secrets) {
  let encoded = encodeData(value);
  return secrets.length > 0 && (encoded = await sign(encoded, secrets[0])), encoded;
}
async function decodeCookieValue(unsign, value, secrets) {
  if (secrets.length > 0) {
    for (let secret of secrets) {
      let unsignedValue = await unsign(value, secret);
      if (unsignedValue !== !1)
        return decodeData(unsignedValue);
    }
    return null;
  }
  return decodeData(value);
}
function encodeData(value) {
  return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))));
}
function decodeData(value) {
  try {
    return JSON.parse(decodeURIComponent(myEscape(atob(value))));
  } catch {
    return {};
  }
}
function myEscape(value) {
  let str = value.toString(), result = "", index = 0, chr, code;
  for (; index < str.length; )
    chr = str.charAt(index++), /[\w*+\-./@]/.exec(chr) ? result += chr : (code = chr.charCodeAt(0), code < 256 ? result += "%" + hex(code, 2) : result += "%u" + hex(code, 4).toUpperCase());
  return result;
}
function hex(code, length) {
  let result = code.toString(16);
  for (; result.length < length; )
    result = "0" + result;
  return result;
}
function myUnescape(value) {
  let str = value.toString(), result = "", index = 0, chr, part;
  for (; index < str.length; ) {
    if (chr = str.charAt(index++), chr === "%") {
      if (str.charAt(index) === "u") {
        if (part = str.slice(index + 1, index + 5), /^[\da-f]{4}$/i.exec(part)) {
          result += String.fromCharCode(parseInt(part, 16)), index += 5;
          continue;
        }
      } else if (part = str.slice(index, index + 2), /^[\da-f]{2}$/i.exec(part)) {
        result += String.fromCharCode(parseInt(part, 16)), index += 2;
        continue;
      }
    }
    result += chr;
  }
  return result;
}
function warnOnceAboutExpiresCookie(name, expires) {
  warnOnce(!expires, `The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`);
}
var import_cookie, createCookieFactory, isCookie, init_cookies = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/cookies.js"() {
    import_cookie = __toESM(require_cookie());
    init_warnings();
    createCookieFactory = ({
      sign,
      unsign
    }) => (name, cookieOptions = {}) => {
      let {
        secrets,
        ...options
      } = {
        secrets: [],
        path: "/",
        sameSite: "lax",
        ...cookieOptions
      };
      return warnOnceAboutExpiresCookie(name, options.expires), {
        get name() {
          return name;
        },
        get isSigned() {
          return secrets.length > 0;
        },
        get expires() {
          return typeof options.maxAge < "u" ? new Date(Date.now() + options.maxAge * 1e3) : options.expires;
        },
        async parse(cookieHeader, parseOptions) {
          if (!cookieHeader)
            return null;
          let cookies = (0, import_cookie.parse)(cookieHeader, {
            ...options,
            ...parseOptions
          });
          return name in cookies ? cookies[name] === "" ? "" : await decodeCookieValue(unsign, cookies[name], secrets) : null;
        },
        async serialize(value, serializeOptions) {
          return (0, import_cookie.serialize)(name, value === "" ? "" : await encodeCookieValue(sign, value, secrets), {
            ...options,
            ...serializeOptions
          });
        }
      };
    }, isCookie = (object) => object != null && typeof object.name == "string" && typeof object.isSigned == "boolean" && typeof object.parse == "function" && typeof object.serialize == "function";
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/utils.js
function stringToArray(s) {
  let utf8 = unescape(encodeURIComponent(s));
  return Uint8Array.from(utf8, (_, i) => utf8.charCodeAt(i));
}
function arrayToString(a) {
  let utf8 = String.fromCharCode.apply(null, a);
  return decodeURIComponent(escape(utf8));
}
function mergeArrays(...arrays) {
  let out = new Uint8Array(arrays.reduce((total, arr) => total + arr.length, 0)), offset = 0;
  for (let arr of arrays)
    out.set(arr, offset), offset += arr.length;
  return out;
}
function arraysEqual(a, b) {
  if (a.length !== b.length)
    return !1;
  for (let i = 0; i < a.length; i++)
    if (a[i] !== b[i])
      return !1;
  return !0;
}
var init_utils = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/utils.js"() {
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/search.js
function coerce(a) {
  return a instanceof Uint8Array ? (index) => a[index] : a;
}
function jsmemcmp(buf1, pos1, buf2, pos2, len) {
  let fn1 = coerce(buf1), fn2 = coerce(buf2);
  for (let i = 0; i < len; ++i)
    if (fn1(pos1 + i) !== fn2(pos2 + i))
      return !1;
  return !0;
}
function createOccurenceTable(s) {
  let table = new Array(256).fill(s.length);
  if (s.length > 1)
    for (let i = 0; i < s.length - 1; i++)
      table[s[i]] = s.length - 1 - i;
  return table;
}
var MATCH, StreamSearch, ReadableStreamSearch, EOQ, QueueableStreamSearch, init_search = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/search.js"() {
    init_utils();
    MATCH = Symbol("Match"), StreamSearch = class {
      constructor(needle) {
        this._lookbehind = new Uint8Array(), typeof needle == "string" ? this._needle = needle = stringToArray(needle) : this._needle = needle, this._lastChar = needle[needle.length - 1], this._occ = createOccurenceTable(needle);
      }
      feed(chunk) {
        let pos = 0, tokens, allTokens = [];
        for (; pos !== chunk.length; )
          [pos, ...tokens] = this._feed(chunk, pos), allTokens.push(...tokens);
        return allTokens;
      }
      end() {
        let tail = this._lookbehind;
        return this._lookbehind = new Uint8Array(), tail;
      }
      _feed(data, bufPos) {
        let tokens = [], pos = -this._lookbehind.length;
        if (pos < 0) {
          for (; pos < 0 && pos <= data.length - this._needle.length; ) {
            let ch = this._charAt(data, pos + this._needle.length - 1);
            if (ch === this._lastChar && this._memcmp(data, pos, this._needle.length - 1))
              return pos > -this._lookbehind.length && tokens.push(this._lookbehind.slice(0, this._lookbehind.length + pos)), tokens.push(MATCH), this._lookbehind = new Uint8Array(), [
                pos + this._needle.length,
                ...tokens
              ];
            pos += this._occ[ch];
          }
          if (pos < 0)
            for (; pos < 0 && !this._memcmp(data, pos, data.length - pos); )
              pos++;
          if (pos >= 0)
            tokens.push(this._lookbehind), this._lookbehind = new Uint8Array();
          else {
            let bytesToCutOff = this._lookbehind.length + pos;
            return bytesToCutOff > 0 && (tokens.push(this._lookbehind.slice(0, bytesToCutOff)), this._lookbehind = this._lookbehind.slice(bytesToCutOff)), this._lookbehind = Uint8Array.from(new Array(this._lookbehind.length + data.length), (_, i) => this._charAt(data, i - this._lookbehind.length)), [
              data.length,
              ...tokens
            ];
          }
        }
        for (pos += bufPos; pos <= data.length - this._needle.length; ) {
          let ch = data[pos + this._needle.length - 1];
          if (ch === this._lastChar && data[pos] === this._needle[0] && jsmemcmp(this._needle, 0, data, pos, this._needle.length - 1))
            return pos > bufPos && tokens.push(data.slice(bufPos, pos)), tokens.push(MATCH), [
              pos + this._needle.length,
              ...tokens
            ];
          pos += this._occ[ch];
        }
        if (pos < data.length) {
          for (; pos < data.length && (data[pos] !== this._needle[0] || !jsmemcmp(data, pos, this._needle, 0, data.length - pos)); )
            ++pos;
          pos < data.length && (this._lookbehind = data.slice(pos));
        }
        return pos > 0 && tokens.push(data.slice(bufPos, pos < data.length ? pos : data.length)), [
          data.length,
          ...tokens
        ];
      }
      _charAt(data, pos) {
        return pos < 0 ? this._lookbehind[this._lookbehind.length + pos] : data[pos];
      }
      _memcmp(data, pos, len) {
        return jsmemcmp(this._charAt.bind(this, data), pos, this._needle, 0, len);
      }
    }, ReadableStreamSearch = class {
      constructor(needle, _readableStream) {
        this._readableStream = _readableStream, this._search = new StreamSearch(needle);
      }
      async *[Symbol.asyncIterator]() {
        let reader = this._readableStream.getReader();
        try {
          for (; ; ) {
            let result = await reader.read();
            if (result.done)
              break;
            yield* this._search.feed(result.value);
          }
          let tail = this._search.end();
          tail.length && (yield tail);
        } finally {
          reader.releaseLock();
        }
      }
    }, EOQ = Symbol("End of Queue"), QueueableStreamSearch = class {
      constructor(needle) {
        this._chunksQueue = [], this._closed = !1, this._search = new StreamSearch(needle);
      }
      push(...chunks) {
        if (this._closed)
          throw new Error("cannot call push after close");
        this._chunksQueue.push(...chunks), this._notify && this._notify();
      }
      close() {
        if (this._closed)
          throw new Error("close was already called");
        this._closed = !0, this._chunksQueue.push(EOQ), this._notify && this._notify();
      }
      async *[Symbol.asyncIterator]() {
        for (; ; ) {
          let chunk;
          for (; !(chunk = this._chunksQueue.shift()); )
            await new Promise((resolve) => this._notify = resolve), this._notify = void 0;
          if (chunk === EOQ)
            break;
          yield* this._search.feed(chunk);
        }
        let tail = this._search.end();
        tail.length && (yield tail);
      }
    };
  }
});

// node_modules/@web3-storage/multipart-parser/esm/src/index.js
function parseContentDisposition(header) {
  let parts = header.split(";").map((part) => part.trim());
  if (parts.shift() !== "form-data")
    throw new Error('malformed content-disposition header: missing "form-data" in `' + JSON.stringify(parts) + "`");
  let out = {};
  for (let part of parts) {
    let kv = part.split("=", 2);
    if (kv.length !== 2)
      throw new Error("malformed content-disposition header: key-value pair not found - " + part + " in `" + header + "`");
    let [name, value] = kv;
    if (value[0] === '"' && value[value.length - 1] === '"')
      out[name] = value.slice(1, -1).replace(/\\"/g, '"');
    else if (value[0] !== '"' && value[value.length - 1] !== '"')
      out[name] = value;
    else if (value[0] === '"' && value[value.length - 1] !== '"' || value[0] !== '"' && value[value.length - 1] === '"')
      throw new Error("malformed content-disposition header: mismatched quotations in `" + header + "`");
  }
  if (!out.name)
    throw new Error("malformed content-disposition header: missing field name in `" + header + "`");
  return out;
}
function parsePartHeaders(lines) {
  let entries = [], disposition = !1, line;
  for (; typeof (line = lines.shift()) < "u"; ) {
    let colon = line.indexOf(":");
    if (colon === -1)
      throw new Error("malformed multipart-form header: missing colon");
    let header = line.slice(0, colon).trim().toLowerCase(), value = line.slice(colon + 1).trim();
    switch (header) {
      case "content-disposition":
        disposition = !0, entries.push(...Object.entries(parseContentDisposition(value)));
        break;
      case "content-type":
        entries.push([
          "contentType",
          value
        ]);
    }
  }
  if (!disposition)
    throw new Error("malformed multipart-form header: missing content-disposition");
  return Object.fromEntries(entries);
}
async function readHeaderLines(it, needle) {
  let firstChunk = !0, lastTokenWasMatch = !1, headerLines = [[]], crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      throw new Error("malformed multipart-form data: unexpected end of stream");
    if (firstChunk && result.value !== MATCH && arraysEqual(result.value.slice(0, 2), dash))
      return [
        void 0,
        new Uint8Array()
      ];
    let chunk;
    if (result.value !== MATCH)
      chunk = result.value;
    else if (!lastTokenWasMatch)
      chunk = needle;
    else
      throw new Error("malformed multipart-form data: unexpected boundary");
    if (!chunk.length)
      continue;
    firstChunk && (firstChunk = !1);
    let tokens = crlfSearch.feed(chunk);
    for (let [i, token] of tokens.entries()) {
      let isMatch = token === MATCH;
      if (!(!isMatch && !token.length)) {
        if (lastTokenWasMatch && isMatch)
          return tokens.push(crlfSearch.end()), [
            headerLines.filter((chunks) => chunks.length).map(mergeArrays2).map(arrayToString),
            mergeArrays(...tokens.slice(i + 1).map((token2) => token2 === MATCH ? CRLF : token2))
          ];
        (lastTokenWasMatch = isMatch) ? headerLines.push([]) : headerLines[headerLines.length - 1].push(token);
      }
    }
  }
}
async function* streamMultipart(body, boundary) {
  let needle = mergeArrays(dash, stringToArray(boundary)), it = new ReadableStreamSearch(needle, body)[Symbol.asyncIterator]();
  for (; ; ) {
    let result = await it.next();
    if (result.done)
      return;
    if (result.value === MATCH)
      break;
  }
  let crlfSearch = new StreamSearch(CRLF);
  for (; ; ) {
    let feedChunk = function(chunk) {
      let chunks = [];
      for (let token of crlfSearch.feed(chunk))
        trailingCRLF && chunks.push(CRLF), (trailingCRLF = token === MATCH) || chunks.push(token);
      return mergeArrays(...chunks);
    }, [headerLines, tail] = await readHeaderLines(it, needle);
    if (!headerLines)
      return;
    async function nextToken() {
      let result = await it.next();
      if (result.done)
        throw new Error("malformed multipart-form data: unexpected end of stream");
      return result;
    }
    let trailingCRLF = !1, done2 = !1;
    async function nextChunk() {
      let result = await nextToken(), chunk;
      if (result.value !== MATCH)
        chunk = result.value;
      else if (!trailingCRLF)
        chunk = CRLF;
      else
        return done2 = !0, { value: crlfSearch.end() };
      return { value: feedChunk(chunk) };
    }
    let bufferedChunks = [{ value: feedChunk(tail) }];
    for (yield {
      ...parsePartHeaders(headerLines),
      data: {
        [Symbol.asyncIterator]() {
          return this;
        },
        async next() {
          for (; ; ) {
            let result = bufferedChunks.shift();
            if (!result)
              break;
            if (result.value.length > 0)
              return result;
          }
          for (; ; ) {
            if (done2)
              return {
                done: done2,
                value: void 0
              };
            let result = await nextChunk();
            if (result.value.length > 0)
              return result;
          }
        }
      }
    }; !done2; )
      bufferedChunks.push(await nextChunk());
  }
}
var mergeArrays2, dash, CRLF, init_src = __esm({
  "node_modules/@web3-storage/multipart-parser/esm/src/index.js"() {
    init_search();
    init_utils();
    mergeArrays2 = Function.prototype.apply.bind(mergeArrays, void 0), dash = stringToArray("--"), CRLF = stringToArray(`\r
`);
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/formData.js
function composeUploadHandlers(...handlers) {
  return async (part) => {
    for (let handler of handlers) {
      let value = await handler(part);
      if (typeof value < "u" && value !== null)
        return value;
    }
  };
}
async function parseMultipartFormData(request, uploadHandler) {
  let contentType = request.headers.get("Content-Type") || "", [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (!request.body || !boundary || type !== "multipart/form-data")
    throw new TypeError("Could not parse content as FormData.");
  let formData = new FormData(), parts = streamMultipart(request.body, boundary);
  for await (let part of parts) {
    if (part.done)
      break;
    typeof part.filename == "string" && (part.filename = part.filename.split(/[/\\]/).pop());
    let value = await uploadHandler(part);
    typeof value < "u" && value !== null && formData.append(part.name, value);
  }
  return formData;
}
var init_formData = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/formData.js"() {
    init_src();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
function isResponse(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectResponse(response) {
  return redirectStatusCodes.has(response.status);
}
var json, redirect, redirectStatusCodes, init_responses = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/responses.js"() {
    json = (data, init2 = {}) => {
      let responseInit = typeof init2 == "number" ? {
        status: init2
      } : init2, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(data), {
        ...responseInit,
        headers
      });
    }, redirect = (url, init2 = 302) => {
      let responseInit = init2;
      typeof responseInit == "number" ? responseInit = {
        status: responseInit
      } : typeof responseInit.status > "u" && (responseInit.status = 302);
      let headers = new Headers(responseInit.headers);
      return headers.set("Location", url), new Response(null, {
        ...responseInit,
        headers
      });
    };
    redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
  }
});

// node_modules/@remix-run/router/dist/router.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function createLocation(current, to, state, key) {
  return state === void 0 && (state = null), _extends({
    pathname: typeof current == "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to == "string" ? parsePath(to) : to, {
    state,
    key: to && to.key || key || createKey()
  });
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    hashIndex >= 0 && (parsedPath.hash = path.substr(hashIndex), path = path.substr(0, hashIndex));
    let searchIndex = path.indexOf("?");
    searchIndex >= 0 && (parsedPath.search = path.substr(searchIndex), path = path.substr(0, searchIndex)), path && (parsedPath.pathname = path);
  }
  return parsedPath;
}
function createURL(location) {
  let base = typeof window < "u" && typeof window.location < "u" && window.location.origin !== "null" ? window.location.origin : "unknown://unknown", href = typeof location == "string" ? location : createPath(location);
  return new URL(href, base);
}
function isIndexRoute(route) {
  return route.index === !0;
}
function convertRoutesToDataRoutes(routes2, parentPath, allIds) {
  return parentPath === void 0 && (parentPath = []), allIds === void 0 && (allIds = /* @__PURE__ */ new Set()), routes2.map((route, index) => {
    let treePath = [...parentPath, index], id = typeof route.id == "string" ? route.id : treePath.join("-");
    return invariant(route.index !== !0 || !route.children, "Cannot specify children on an index route"), invariant(!allIds.has(id), 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`), allIds.add(id), isIndexRoute(route) ? _extends({}, route, {
      id
    }) : _extends({}, route, {
      id,
      children: route.children ? convertRoutesToDataRoutes(route.children, treePath, allIds) : void 0
    });
  });
}
function matchRoutes(routes2, locationArg, basename) {
  basename === void 0 && (basename = "/");
  let location = typeof locationArg == "string" ? parsePath(locationArg) : locationArg, pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null)
    return null;
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i)
    matches = matchRouteBranch(
      branches[i],
      safelyDecodeURI(pathname)
    );
  return matches;
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  return branches === void 0 && (branches = []), parentsMeta === void 0 && (parentsMeta = []), parentPath === void 0 && (parentPath = ""), routes2.forEach((route, index) => {
    let meta2 = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === !0,
      childrenIndex: index,
      route
    };
    meta2.relativePath.startsWith("/") && (invariant(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), meta2.relativePath = meta2.relativePath.slice(parentPath.length));
    let path = joinPaths([parentPath, meta2.relativePath]), routesMeta = parentsMeta.concat(meta2);
    route.children && route.children.length > 0 && (invariant(
      route.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
    ), flattenRoutes(route.children, branches, routesMeta, path)), !(route.path == null && !route.index) && branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  }), branches;
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
function computeScore(path, index) {
  let segments = path.split("/"), initialScore = segments.length;
  return segments.some(isSplat) && (initialScore += splatPenalty), index && (initialScore += indexRouteValue), segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch, matchedParams = {}, matchedPathname = "/", matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i], end = i === routesMeta.length - 1, remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/", match = matchPath({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta2.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    }), match.pathnameBase !== "/" && (matchedPathname = joinPaths([matchedPathname, match.pathnameBase]));
  }
  return matches;
}
function matchPath(pattern, pathname) {
  typeof pattern == "string" && (pattern = {
    path: pattern,
    caseSensitive: !1,
    end: !0
  });
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end), match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0], pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1"), captureGroups = match.slice(1);
  return {
    params: paramNames.reduce((memo, paramName, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      return memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName), memo;
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  caseSensitive === void 0 && (caseSensitive = !1), end === void 0 && (end = !0), warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [], regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => (paramNames.push(paramName), "([^\\/]+)"));
  return path.endsWith("*") ? (paramNames.push("*"), regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : end ? regexpSource += "\\/*$" : path !== "" && path !== "/" && (regexpSource += "(?:(?=\\/|$))"), [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    return warning(!1, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ").")), value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return warning(!1, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")), value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase()))
    return null;
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length, nextChar = pathname.charAt(startIndex);
  return nextChar && nextChar !== "/" ? null : pathname.slice(startIndex) || "/";
}
function invariant(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}
function warning(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function resolvePath(to, fromPathname) {
  fromPathname === void 0 && (fromPathname = "/");
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to == "string" ? parsePath(to) : to;
  return {
    pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  return relativePath.split("/").forEach((segment) => {
    segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
  }), segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  isPathRelative === void 0 && (isPathRelative = !1);
  let to;
  typeof toArg == "string" ? to = parsePath(toArg) : (to = _extends({}, toArg), invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to)), invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to)), invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to)));
  let isEmptyPath = toArg === "" || to.pathname === "", toPathname = isEmptyPath ? "/" : to.pathname, from2;
  if (isPathRelative || toPathname == null)
    from2 = locationPathname;
  else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      for (; toSegments[0] === ".."; )
        toSegments.shift(), routePathnameIndex -= 1;
      to.pathname = toSegments.join("/");
    }
    from2 = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from2), hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"), hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  return !path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash) && (path.pathname += "/"), path;
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === !0;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value))
    return value;
  if (value._error)
    throw value._error;
  return value._data;
}
function isRouteErrorResponse(e) {
  return e instanceof ErrorResponse;
}
function unstable_createStaticHandler(routes2, opts) {
  invariant(routes2.length > 0, "You must provide a non-empty routes array to unstable_createStaticHandler");
  let dataRoutes = convertRoutesToDataRoutes(routes2), basename = (opts ? opts.basename : null) || "/";
  async function query(request) {
    let url = new URL(request.url), method = request.method.toLowerCase(), location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "head") {
      let error = getInternalRouterError(405, {
        method
      }), {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    let result = await queryImpl(request, location, matches);
    return result instanceof Response ? result : _extends({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, routeId) {
    let url = new URL(request.url), method = request.method.toLowerCase(), location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "head")
      throw getInternalRouterError(405, {
        method
      });
    if (!matches)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match)
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    if (!match)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let result = await queryImpl(request, location, matches, match);
    if (result instanceof Response)
      return result;
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0)
      throw error;
    let routeData = [result.actionData, result.loaderData].find((v) => v);
    return Object.values(routeData || {})[0];
  }
  async function queryImpl(request, location, matches, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isSubmissionMethod(request.method.toLowerCase()))
        return await submit(request, matches, routeMatch || getTargetMatch(matches, location), routeMatch != null);
      let result = await loadRouteData(request, matches, routeMatch);
      return result instanceof Response ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse2(e.response))
          throw e.response;
        return e.response;
      }
      if (isRedirectResponse2(e))
        return e;
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, isRouteRequest) {
    let result;
    if (actionMatch.route.action) {
      if (result = await callLoaderOrAction("action", request, actionMatch, matches, basename, !0, isRouteRequest), request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query";
        throw new Error(method + "() call aborted");
      }
    } else {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: createURL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRedirectResult(result))
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    if (isDeferredResult(result))
      throw new Error("defer() is not supported in actions");
    if (isRouteRequest) {
      if (isErrorResult(result))
        throw result.error;
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {}
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id), context2 = await loadRouteData(request, matches, void 0, {
        [boundaryMatch.route.id]: result.error
      });
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let context = await loadRouteData(request, matches);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader))
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: createURL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    let matchesToLoad = (routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0])).filter((m) => m.route.loader);
    if (matchesToLoad.length === 0)
      return {
        matches,
        loaderData: {},
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {}
      };
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, basename, !0, isRouteRequest))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    results.forEach((result) => {
      isDeferredResult(result) && result.deferredData.cancel();
    });
    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError);
    return _extends({}, context, {
      matches
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId);
    index >= 0 && (boundaryMatches = matches.slice(0, index));
  }
  return boundaryMatches;
}
async function callLoaderOrAction(type, request, match, matches, basename, isStaticRequest, isRouteRequest) {
  basename === void 0 && (basename = "/"), isStaticRequest === void 0 && (isStaticRequest = !1), isRouteRequest === void 0 && (isRouteRequest = !1);
  let resultType, result, reject, abortPromise = new Promise((_, r) => reject = r), onReject = () => reject();
  request.signal.addEventListener("abort", onReject);
  try {
    let handler = match.route[type];
    invariant(handler, "Could not find the " + type + ' to run on the "' + match.route.id + '" route'), result = await Promise.race([handler({
      request,
      params: match.params
    }), abortPromise]), invariant(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error, result = e;
  } finally {
    request.signal.removeEventListener("abort", onReject);
  }
  if (result instanceof Response) {
    let status = result.status;
    if (redirectStatusCodes2.has(status)) {
      let location = result.headers.get("Location");
      invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
      let external = createURL(location).origin !== createURL("/").origin;
      if (!external) {
        let activeMatches = matches.slice(0, matches.indexOf(match) + 1), routePathnames = getPathContributingMatches(activeMatches).map((match2) => match2.pathnameBase), requestPath = createURL(request.url).pathname, resolvedLocation = resolveTo(location, routePathnames, requestPath);
        if (invariant(createPath(resolvedLocation), "Unable to resolve redirect location: " + location), basename) {
          let path = resolvedLocation.pathname;
          resolvedLocation.pathname = path === "/" ? basename : joinPaths([basename, path]);
        }
        location = createPath(resolvedLocation);
      }
      if (isStaticRequest)
        throw result.headers.set("Location", location), result;
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null,
        external
      };
    }
    if (isRouteRequest)
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    let data, contentType = result.headers.get("Content-Type");
    return contentType && contentType.startsWith("application/json") ? data = await result.json() : data = await result.text(), resultType === ResultType.error ? {
      type: resultType,
      error: new ErrorResponse(status, result.statusText, data),
      headers: result.headers
    } : {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  return resultType === ResultType.error ? {
    type: resultType,
    error: result
  } : result instanceof DeferredData ? {
    type: ResultType.deferred,
    deferredData: result
  } : {
    type: ResultType.data,
    data: result
  };
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  let loaderData = {}, errors = null, statusCode, foundError = !1, loaderHeaders = {};
  return results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    if (invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData"), isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, id), error = result.error;
      pendingError && (error = Object.values(pendingError)[0], pendingError = void 0), errors = Object.assign(errors || {}, {
        [boundaryMatch.route.id]: error
      }), foundError || (foundError = !0, statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500), result.headers && (loaderHeaders[id] = result.headers);
    } else
      isDeferredResult(result) ? (activeDeferreds && activeDeferreds.set(id, result.deferredData), loaderData[id] = result.deferredData.data) : (loaderData[id] = result.data, result.statusCode != null && result.statusCode !== 200 && !foundError && (statusCode = result.statusCode), result.headers && (loaderHeaders[id] = result.headers));
  }), pendingError && (errors = pendingError), {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function findNearestBoundary(matches, routeId) {
  return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === !0) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp) {
  let {
    pathname,
    routeId,
    method,
    message
  } = _temp === void 0 ? {} : _temp, statusText = "Unknown Server Error", errorMessage = "Unknown @remix-run/router error";
  return status === 400 ? (statusText = "Bad Request", method && pathname && routeId ? errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request." : errorMessage = "Cannot submit binary form data using GET") : status === 403 ? (statusText = "Forbidden", errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"') : status === 404 ? (statusText = "Not Found", errorMessage = 'No route matches URL "' + pathname + '"') : status === 405 && (statusText = "Method Not Allowed", method && pathname && routeId ? errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request." : method && (errorMessage = 'Invalid request method "' + method.toUpperCase() + '"')), new ErrorResponse(status || 500, statusText, new Error(errorMessage), !0);
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isRedirectResponse2(result) {
  if (!(result instanceof Response))
    return !1;
  let status = result.status, location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && obj.response instanceof Response && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method);
}
function isSubmissionMethod(method) {
  return validActionMethods.has(method);
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function getTargetMatch(matches, location) {
  let search = typeof location == "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || ""))
    return matches[matches.length - 1];
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
var Action, ResultType, paramRe, dynamicSegmentValue, indexRouteValue, emptySegmentValue, staticSegmentValue, splatPenalty, isSplat, joinPaths, normalizePathname, normalizeSearch, normalizeHash, AbortedDeferredError, DeferredData, ErrorResponse, validActionMethodsArr, validActionMethods, validRequestMethodsArr, validRequestMethods, redirectStatusCodes2, isBrowser, init_router = __esm({
  "node_modules/@remix-run/router/dist/router.js"() {
    (function(Action3) {
      Action3.Pop = "POP", Action3.Push = "PUSH", Action3.Replace = "REPLACE";
    })(Action || (Action = {}));
    (function(ResultType2) {
      ResultType2.data = "data", ResultType2.deferred = "deferred", ResultType2.redirect = "redirect", ResultType2.error = "error";
    })(ResultType || (ResultType = {}));
    paramRe = /^:\w+$/, dynamicSegmentValue = 3, indexRouteValue = 2, emptySegmentValue = 1, staticSegmentValue = 10, splatPenalty = -2, isSplat = (s) => s === "*";
    joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/"), normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, AbortedDeferredError = class extends Error {
    }, DeferredData = class {
      constructor(data) {
        this.pendingKeys = /* @__PURE__ */ new Set(), this.subscriber = void 0, invariant(data && typeof data == "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r), this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort), this.controller.signal.addEventListener("abort", onAbort), this.data = Object.entries(data).reduce((acc, _ref) => {
          let [key, value] = _ref;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {});
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise))
          return value;
        this.pendingKeys.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, null, data), (error) => this.onSettle(promise, key, error));
        return promise.catch(() => {
        }), Object.defineProperty(promise, "_tracked", {
          get: () => !0
        }), promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError)
          return this.unlistenAbortSignal(), Object.defineProperty(promise, "_error", {
            get: () => error
          }), Promise.reject(error);
        this.pendingKeys.delete(key), this.done && this.unlistenAbortSignal();
        let subscriber = this.subscriber;
        return error ? (Object.defineProperty(promise, "_error", {
          get: () => error
        }), subscriber && subscriber(!1), Promise.reject(error)) : (Object.defineProperty(promise, "_data", {
          get: () => data
        }), subscriber && subscriber(!1), data);
      }
      subscribe(fn) {
        this.subscriber = fn;
      }
      cancel() {
        this.controller.abort(), this.pendingKeys.forEach((v, k) => this.pendingKeys.delete(k));
        let subscriber = this.subscriber;
        subscriber && subscriber(!0);
      }
      async resolveData(signal) {
        let aborted = !1;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort), aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort), (aborted2 || this.done) && resolve(aborted2);
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeys.size === 0;
      }
      get unwrappedData() {
        return invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
    };
    ErrorResponse = class {
      constructor(status, statusText, data, internal) {
        internal === void 0 && (internal = !1), this.status = status, this.statusText = statusText || "", this.internal = internal, data instanceof Error ? (this.data = data.toString(), this.error = data) : this.data = data;
      }
    };
    validActionMethodsArr = ["post", "put", "patch", "delete"], validActionMethods = new Set(validActionMethodsArr), validRequestMethodsArr = ["get", ...validActionMethodsArr], validRequestMethods = new Set(validRequestMethodsArr), redirectStatusCodes2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/entry.js
function createEntryMatches(matches, routes2) {
  return matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: routes2[match.route.id]
  }));
}
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => (memo[routeId] = manifest[routeId].module, memo), {});
}
var init_entry = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/entry.js"() {
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/errors.js
async function serializeError(error) {
  return {
    message: error.message,
    stack: error.stack
  };
}
var init_errors = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/errors.js"() {
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: !0,
      map: !1,
      silent: !1
    };
    function isNonEmptyString(str) {
      return typeof str == "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString), nameValuePairStr = parts.shift(), parsed = parseNameValuePair(nameValuePairStr), name = parsed.name, value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      return parts.forEach(function(part) {
        var sides = part.split("="), key = sides.shift().trimLeft().toLowerCase(), value2 = sides.join("=");
        key === "expires" ? cookie.expires = new Date(value2) : key === "max-age" ? cookie.maxAge = parseInt(value2, 10) : key === "secure" ? cookie.secure = !0 : key === "httponly" ? cookie.httpOnly = !0 : key === "samesite" ? cookie.sameSite = value2 : cookie[key] = value2;
      }), cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "", value = "", nameValueArr = nameValuePairStr.split("=");
      return nameValueArr.length > 1 ? (name = nameValueArr.shift(), value = nameValueArr.join("=")) : value = nameValuePairStr, { name, value };
    }
    function parse3(input, options) {
      if (options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, !input)
        return options.map ? {} : [];
      if (input.headers && input.headers["set-cookie"])
        input = input.headers["set-cookie"];
      else if (input.headers) {
        var sch = input.headers[Object.keys(input.headers).find(function(key) {
          return key.toLowerCase() === "set-cookie";
        })];
        !sch && input.headers.cookie && !options.silent && console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        ), input = sch;
      }
      if (Array.isArray(input) || (input = [input]), options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, options.map) {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          return cookies2[cookie.name] = cookie, cookies2;
        }, cookies);
      } else
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString))
        return cookiesString;
      if (typeof cookiesString != "string")
        return [];
      var cookiesStrings = [], pos = 0, start, ch, lastComma, nextStart, cookiesSeparatorFound;
      function skipWhitespace() {
        for (; pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)); )
          pos += 1;
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        return ch = cookiesString.charAt(pos), ch !== "=" && ch !== ";" && ch !== ",";
      }
      for (; pos < cookiesString.length; ) {
        for (start = pos, cookiesSeparatorFound = !1; skipWhitespace(); )
          if (ch = cookiesString.charAt(pos), ch === ",") {
            for (lastComma = pos, pos += 1, skipWhitespace(), nextStart = pos; pos < cookiesString.length && notSpecialChar(); )
              pos += 1;
            pos < cookiesString.length && cookiesString.charAt(pos) === "=" ? (cookiesSeparatorFound = !0, pos = nextStart, cookiesStrings.push(cookiesString.substring(start, lastComma)), start = pos) : pos = lastComma + 1;
          } else
            pos += 1;
        (!cookiesSeparatorFound || pos >= cookiesString.length) && cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
      }
      return cookiesStrings;
    }
    module.exports = parse3;
    module.exports.parse = parse3;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/headers.js
function getDocumentHeadersRR(build, context, matches) {
  return matches.reduce((parentHeaders, match, index) => {
    var _context$loaderHeader, _context$actionHeader;
    let {
      id
    } = match.route, routeModule = build.routes[id].module, loaderHeaders = ((_context$loaderHeader = context.loaderHeaders) === null || _context$loaderHeader === void 0 ? void 0 : _context$loaderHeader[id]) || new Headers(), actionHeaders = ((_context$actionHeader = context.actionHeaders) === null || _context$actionHeader === void 0 ? void 0 : _context$actionHeader[id]) || new Headers(), headers = new Headers(routeModule.headers ? typeof routeModule.headers == "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders
    }) : routeModule.headers : void 0);
    return prependCookies(actionHeaders, headers), prependCookies(loaderHeaders, headers), prependCookies(parentHeaders, headers), headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  parentSetCookieString && (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString).forEach((cookie) => {
    childHeaders.append("Set-Cookie", cookie);
  });
}
var import_set_cookie_parser, init_headers = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/headers.js"() {
    import_set_cookie_parser = __toESM(require_set_cookie());
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/invariant.js
function invariant2(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"), new Error(message);
}
var init_invariant = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/invariant.js"() {
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/mode.js
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}
var ServerMode, init_mode = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/mode.js"() {
    (function(ServerMode2) {
      ServerMode2.Development = "development", ServerMode2.Production = "production", ServerMode2.Test = "test";
    })(ServerMode || (ServerMode = {}));
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty2 = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val == null)
        throw new TypeError("Object.assign cannot be called with null or undefined");
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign)
          return !1;
        var test1 = new String("abc");
        if (test1[5] = "de", Object.getOwnPropertyNames(test1)[0] === "5")
          return !1;
        for (var test2 = {}, i = 0; i < 10; i++)
          test2["_" + String.fromCharCode(i)] = i;
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789")
          return !1;
        var test3 = {};
        return "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        }), Object.keys(Object.assign({}, test3)).join("") === "abcdefghijklmnopqrst";
      } catch {
        return !1;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      for (var from2, to = toObject(target), symbols, s = 1; s < arguments.length; s++) {
        from2 = Object(arguments[s]);
        for (var key in from2)
          hasOwnProperty2.call(from2, key) && (to[key] = from2[key]);
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from2);
          for (var i = 0; i < symbols.length; i++)
            propIsEnumerable.call(from2, symbols[i]) && (to[symbols[i]] = from2[symbols[i]]);
        }
      }
      return to;
    };
  }
});

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var _assign = require_object_assign(), ReactVersion = "17.0.2", REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106;
      exports.Fragment = 60107, exports.StrictMode = 60108, exports.Profiler = 60114;
      var REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112;
      exports.Suspense = 60113;
      var REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), exports.Fragment = symbolFor("react.fragment"), exports.StrictMode = symbolFor("react.strict_mode"), exports.Profiler = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), exports.Suspense = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactCurrentDispatcher = {
        current: null
      }, ReactCurrentBatchConfig = {
        transition: 0
      }, ReactCurrentOwner = {
        current: null
      }, ReactDebugCurrentFrame = {}, currentExtraStackFrame = null;
      function setExtraStackFrame(stack) {
        currentExtraStackFrame = stack;
      }
      ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
        currentExtraStackFrame = stack;
      }, ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFrame.getStackAddendum = function() {
        var stack = "";
        currentExtraStackFrame && (stack += currentExtraStackFrame);
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        return impl && (stack += impl() || ""), stack;
      };
      var IsSomeRendererActing = {
        current: !1
      }, ReactSharedInternals = {
        ReactCurrentDispatcher,
        ReactCurrentBatchConfig,
        ReactCurrentOwner,
        IsSomeRendererActing,
        assign: _assign
      };
      ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
      function warn(format2) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format2, args);
        }
      }
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var didWarnStateUpdateForUnmountedComponent = {};
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnStateUpdateForUnmountedComponent[warningKey])
            return;
          error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName), didWarnStateUpdateForUnmountedComponent[warningKey] = !0;
        }
      }
      var ReactNoopUpdateQueue = {
        isMounted: function(publicInstance) {
          return !1;
        },
        enqueueForceUpdate: function(publicInstance, callback, callerName) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance, partialState, callback, callerName) {
          warnNoop(publicInstance, "setState");
        }
      }, emptyObject = {};
      Object.freeze(emptyObject);
      function Component(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      Component.prototype.isReactComponent = {}, Component.prototype.setState = function(partialState, callback) {
        if (!(typeof partialState == "object" || typeof partialState == "function" || partialState == null))
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      }, Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      {
        var deprecatedAPIs = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, defineDeprecationWarning = function(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
            }
          });
        };
        for (var fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
      function ComponentDummy() {
      }
      ComponentDummy.prototype = Component.prototype;
      function PureComponent(props, context, updater) {
        this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
      }
      var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
      pureComponentPrototype.constructor = PureComponent, _assign(pureComponentPrototype, Component.prototype), pureComponentPrototype.isPureReactComponent = !0;
      function createRef() {
        var refObject = {
          current: null
        };
        return Object.seal(refObject), refObject;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case exports.Fragment:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case exports.Profiler:
            return "Profiler";
          case exports.StrictMode:
            return "StrictMode";
          case exports.Suspense:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var hasOwnProperty2 = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config2) {
        if (hasOwnProperty2.call(config2, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.ref !== void 0;
      }
      function hasValidKey(config2) {
        if (hasOwnProperty2.call(config2, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.key !== void 0;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        var warnAboutAccessingKey = function() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: !0
        });
      }
      function defineRefPropWarningGetter(props, displayName) {
        var warnAboutAccessingRef = function() {
          specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
        };
        warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
          get: warnAboutAccessingRef,
          configurable: !0
        });
      }
      function warnIfStringRefCannotBeAutoConverted(config2) {
        if (typeof config2.ref == "string" && ReactCurrentOwner.current && config2.__self && ReactCurrentOwner.current.stateNode !== config2.__self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config2.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function createElement7(type, config2, children) {
        var propName, props = {}, key = null, ref = null, self = null, source = null;
        if (config2 != null) {
          hasValidRef(config2) && (ref = config2.ref, warnIfStringRefCannotBeAutoConverted(config2)), hasValidKey(config2) && (key = "" + config2.key), self = config2.__self === void 0 ? null : config2.__self, source = config2.__source === void 0 ? null : config2.__source;
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config2[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          Object.freeze && Object.freeze(childArray), props.children = childArray;
        }
        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;
          for (propName in defaultProps)
            props[propName] === void 0 && (props[propName] = defaultProps[propName]);
        }
        if (key || ref) {
          var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
          key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
        }
        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
        return newElement;
      }
      function cloneElement(element, config2, children) {
        if (element == null)
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
        var propName, props = _assign({}, element.props), key = element.key, ref = element.ref, self = element._self, source = element._source, owner = element._owner;
        if (config2 != null) {
          hasValidRef(config2) && (ref = config2.ref, owner = ReactCurrentOwner.current), hasValidKey(config2) && (key = "" + config2.key);
          var defaultProps;
          element.type && element.type.defaultProps && (defaultProps = element.type.defaultProps);
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (config2[propName] === void 0 && defaultProps !== void 0 ? props[propName] = defaultProps[propName] : props[propName] = config2[propName]);
        }
        var childrenLength = arguments.length - 2;
        if (childrenLength === 1)
          props.children = children;
        else if (childrenLength > 1) {
          for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
            childArray[i] = arguments[i + 2];
          props.children = childArray;
        }
        return ReactElement(element.type, key, ref, self, source, owner, props);
      }
      function isValidElement2(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var SEPARATOR = ".", SUBSEPARATOR = ":";
      function escape2(key) {
        var escapeRegex = /[=:]/g, escaperLookup = {
          "=": "=0",
          ":": "=2"
        }, escapedString = key.replace(escapeRegex, function(match) {
          return escaperLookup[match];
        });
        return "$" + escapedString;
      }
      var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g;
      function escapeUserProvidedKey(text) {
        return text.replace(userProvidedKeyEscapeRegex, "$&/");
      }
      function getElementKey(element, index) {
        return typeof element == "object" && element !== null && element.key != null ? escape2("" + element.key) : index.toString(36);
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        (type === "undefined" || type === "boolean") && (children = null);
        var invokeCallback = !1;
        if (children === null)
          invokeCallback = !0;
        else
          switch (type) {
            case "string":
            case "number":
              invokeCallback = !0;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = !0;
              }
          }
        if (invokeCallback) {
          var _child = children, mappedChild = callback(_child), childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
          if (Array.isArray(mappedChild)) {
            var escapedChildKey = "";
            childKey != null && (escapedChildKey = escapeUserProvidedKey(childKey) + "/"), mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
              return c;
            });
          } else
            mappedChild != null && (isValidElement2(mappedChild) && (mappedChild = cloneAndReplaceKey(
              mappedChild,
              escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey
            )), array.push(mappedChild));
          return 1;
        }
        var child, nextName, subtreeCount = 0, nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
        if (Array.isArray(children))
          for (var i = 0; i < children.length; i++)
            child = children[i], nextName = nextNamePrefix + getElementKey(child, i), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
        else {
          var iteratorFn = getIteratorFn(children);
          if (typeof iteratorFn == "function") {
            var iterableChildren = children;
            iteratorFn === iterableChildren.entries && (didWarnAboutMaps || warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0);
            for (var iterator = iteratorFn.call(iterableChildren), step, ii = 0; !(step = iterator.next()).done; )
              child = step.value, nextName = nextNamePrefix + getElementKey(child, ii++), subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
          } else if (type === "object") {
            var childrenString = "" + children;
            throw Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return subtreeCount;
      }
      function mapChildren(children, func, context) {
        if (children == null)
          return children;
        var result = [], count = 0;
        return mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        }), result;
      }
      function countChildren(children) {
        var n = 0;
        return mapChildren(children, function() {
          n++;
        }), n;
      }
      function forEachChildren(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      }
      function toArray(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      }
      function onlyChild(children) {
        if (!isValidElement2(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
      function createContext3(defaultValue, calculateChangedBits) {
        calculateChangedBits === void 0 ? calculateChangedBits = null : calculateChangedBits !== null && typeof calculateChangedBits != "function" && error("createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
        var context = {
          $$typeof: REACT_CONTEXT_TYPE,
          _calculateChangedBits: calculateChangedBits,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        context.Provider = {
          $$typeof: REACT_PROVIDER_TYPE,
          _context: context
        };
        var hasWarnedAboutUsingNestedContextConsumers = !1, hasWarnedAboutUsingConsumerProvider = !1, hasWarnedAboutDisplayNameOnConsumer = !1;
        {
          var Consumer = {
            $$typeof: REACT_CONTEXT_TYPE,
            _context: context,
            _calculateChangedBits: context._calculateChangedBits
          };
          Object.defineProperties(Consumer, {
            Provider: {
              get: function() {
                return hasWarnedAboutUsingConsumerProvider || (hasWarnedAboutUsingConsumerProvider = !0, error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), context.Provider;
              },
              set: function(_Provider) {
                context.Provider = _Provider;
              }
            },
            _currentValue: {
              get: function() {
                return context._currentValue;
              },
              set: function(_currentValue) {
                context._currentValue = _currentValue;
              }
            },
            _currentValue2: {
              get: function() {
                return context._currentValue2;
              },
              set: function(_currentValue2) {
                context._currentValue2 = _currentValue2;
              }
            },
            _threadCount: {
              get: function() {
                return context._threadCount;
              },
              set: function(_threadCount) {
                context._threadCount = _threadCount;
              }
            },
            Consumer: {
              get: function() {
                return hasWarnedAboutUsingNestedContextConsumers || (hasWarnedAboutUsingNestedContextConsumers = !0, error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), context.Consumer;
              }
            },
            displayName: {
              get: function() {
                return context.displayName;
              },
              set: function(displayName) {
                hasWarnedAboutDisplayNameOnConsumer || (warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName), hasWarnedAboutDisplayNameOnConsumer = !0);
              }
            }
          }), context.Consumer = Consumer;
        }
        return context._currentRenderer = null, context._currentRenderer2 = null, context;
      }
      var Uninitialized = -1, Pending = 0, Resolved = 1, Rejected = 2;
      function lazyInitializer(payload) {
        if (payload._status === Uninitialized) {
          var ctor = payload._result, thenable = ctor(), pending = payload;
          pending._status = Pending, pending._result = thenable, thenable.then(function(moduleObject) {
            if (payload._status === Pending) {
              var defaultExport = moduleObject.default;
              defaultExport === void 0 && error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, moduleObject);
              var resolved = payload;
              resolved._status = Resolved, resolved._result = defaultExport;
            }
          }, function(error2) {
            if (payload._status === Pending) {
              var rejected = payload;
              rejected._status = Rejected, rejected._result = error2;
            }
          });
        }
        if (payload._status === Resolved)
          return payload._result;
        throw payload._result;
      }
      function lazy(ctor) {
        var payload = {
          _status: -1,
          _result: ctor
        }, lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: payload,
          _init: lazyInitializer
        };
        {
          var defaultProps, propTypes;
          Object.defineProperties(lazyType, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return defaultProps;
              },
              set: function(newDefaultProps) {
                error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), defaultProps = newDefaultProps, Object.defineProperty(lazyType, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return propTypes;
              },
              set: function(newPropTypes) {
                error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), propTypes = newPropTypes, Object.defineProperty(lazyType, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return lazyType;
      }
      function forwardRef3(render) {
        render != null && render.$$typeof === REACT_MEMO_TYPE ? error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render != "function" ? error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), render != null && (render.defaultProps != null || render.propTypes != null) && error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var elementType = {
          $$typeof: REACT_FORWARD_REF_TYPE,
          render
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, render.displayName == null && (render.displayName = name);
            }
          });
        }
        return elementType;
      }
      var enableScopeAPI = !1;
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === exports.Fragment || type === exports.Profiler || type === REACT_DEBUG_TRACING_MODE_TYPE || type === exports.StrictMode || type === exports.Suspense || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE));
      }
      function memo(type, compare3) {
        isValidElementType(type) || error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
        var elementType = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: compare3 === void 0 ? null : compare3
        };
        {
          var ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name, type.displayName == null && (type.displayName = name);
            }
          });
        }
        return elementType;
      }
      function resolveDispatcher() {
        var dispatcher = ReactCurrentDispatcher.current;
        if (dispatcher === null)
          throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return dispatcher;
      }
      function useContext4(Context, unstable_observedBits) {
        var dispatcher = resolveDispatcher();
        if (unstable_observedBits !== void 0 && error("useContext() second argument is reserved for future use in React. Passing it is not supported. You passed: %s.%s", unstable_observedBits, typeof unstable_observedBits == "number" && Array.isArray(arguments[2]) ? `

Did you call array.map(useContext)? Calling Hooks inside a loop is not supported. Learn more at https://reactjs.org/link/rules-of-hooks` : ""), Context._context !== void 0) {
          var realContext = Context._context;
          realContext.Consumer === Context ? error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : realContext.Provider === Context && error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return dispatcher.useContext(Context, unstable_observedBits);
      }
      function useState4(initialState) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useState(initialState);
      }
      function useReducer(reducer, initialArg, init2) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useReducer(reducer, initialArg, init2);
      }
      function useRef4(initialValue) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useRef(initialValue);
      }
      function useEffect4(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useEffect(create, deps);
      }
      function useLayoutEffect4(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useLayoutEffect(create, deps);
      }
      function useCallback5(callback, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useCallback(callback, deps);
      }
      function useMemo4(create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useMemo(create, deps);
      }
      function useImperativeHandle(ref, create, deps) {
        var dispatcher = resolveDispatcher();
        return dispatcher.useImperativeHandle(ref, create, deps);
      }
      function useDebugValue(value, formatterFn) {
        {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDebugValue(value, formatterFn);
        }
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher$1.current, ReactCurrentDispatcher$1.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher$1.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component2) {
        var prototype = Component2.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case exports.Suspense:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          setExtraStackFrame(stack);
        } else
          setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function getDeclarationErrorAddendum() {
        if (ReactCurrentOwner.current) {
          var name = getComponentName(ReactCurrentOwner.current.type);
          if (name)
            return `

Check the render method of \`` + name + "`.";
        }
        return "";
      }
      function getSourceInfoErrorAddendum(source) {
        if (source !== void 0) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
          return `

Check your code at ` + fileName + ":" + lineNumber + ".";
        }
        return "";
      }
      function getSourceInfoErrorAddendumForProps(elementProps) {
        return elementProps != null ? getSourceInfoErrorAddendum(elementProps.__source) : "";
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        var info = getDeclarationErrorAddendum();
        if (!info) {
          var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
          parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
        }
        return info;
      }
      function validateExplicitKey(element, parentType) {
        if (!(!element._store || element._store.validated || element.key != null)) {
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (!ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
            var childOwner = "";
            element && element._owner && element._owner !== ReactCurrentOwner.current && (childOwner = " It was passed a child from " + getComponentName(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function validateChildKeys(node, parentType) {
        if (typeof node == "object") {
          if (Array.isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement2(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement2(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement2(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentName(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentName(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys2 = Object.keys(fragment.props), i = 0; i < keys2.length; i++) {
            var key = keys2[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function createElementWithValidation(type, props, children) {
        var validType = isValidElementType(type);
        if (!validType) {
          var info = "";
          (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var sourceInfo = getSourceInfoErrorAddendumForProps(props);
          sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
          var typeString;
          type === null ? typeString = "null" : Array.isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentName(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
        }
        var element = createElement7.apply(this, arguments);
        if (element == null)
          return element;
        if (validType)
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i], type);
        return type === exports.Fragment ? validateFragmentProps(element) : validatePropTypes(element), element;
      }
      var didWarnAboutDeprecatedCreateFactory = !1;
      function createFactoryWithValidation(type) {
        var validatedFactory = createElementWithValidation.bind(null, type);
        return validatedFactory.type = type, didWarnAboutDeprecatedCreateFactory || (didWarnAboutDeprecatedCreateFactory = !0, warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(validatedFactory, "type", {
          enumerable: !1,
          get: function() {
            return warn("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: type
            }), type;
          }
        }), validatedFactory;
      }
      function cloneElementWithValidation(element, props, children) {
        for (var newElement = cloneElement.apply(this, arguments), i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i], newElement.type);
        return validatePropTypes(newElement), newElement;
      }
      try {
        var frozenObject = Object.freeze({});
      } catch {
      }
      var createElement$1 = createElementWithValidation, cloneElement$1 = cloneElementWithValidation, createFactory = createFactoryWithValidation, Children2 = {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray,
        only: onlyChild
      };
      exports.Children = Children2, exports.Component = Component, exports.PureComponent = PureComponent, exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals, exports.cloneElement = cloneElement$1, exports.createContext = createContext3, exports.createElement = createElement$1, exports.createFactory = createFactory, exports.createRef = createRef, exports.forwardRef = forwardRef3, exports.isValidElement = isValidElement2, exports.lazy = lazy, exports.memo = memo, exports.useCallback = useCallback5, exports.useContext = useContext4, exports.useDebugValue = useDebugValue, exports.useEffect = useEffect4, exports.useImperativeHandle = useImperativeHandle, exports.useLayoutEffect = useLayoutEffect4, exports.useMemo = useMemo4, exports.useReducer = useReducer, exports.useRef = useRef4, exports.useState = useState4, exports.version = ReactVersion;
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_development();
  }
});

// node_modules/@babel/runtime/helpers/esm/extends.js
var init_extends = __esm({
  "node_modules/@babel/runtime/helpers/esm/extends.js"() {
  }
});

// node_modules/history/index.js
function createPath2(_ref) {
  var _ref$pathname = _ref.pathname, pathname = _ref$pathname === void 0 ? "/" : _ref$pathname, _ref$search = _ref.search, search = _ref$search === void 0 ? "" : _ref$search, _ref$hash = _ref.hash, hash = _ref$hash === void 0 ? "" : _ref$hash;
  return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath2(path) {
  var parsedPath = {};
  if (path) {
    var hashIndex = path.indexOf("#");
    hashIndex >= 0 && (parsedPath.hash = path.substr(hashIndex), path = path.substr(0, hashIndex));
    var searchIndex = path.indexOf("?");
    searchIndex >= 0 && (parsedPath.search = path.substr(searchIndex), path = path.substr(0, searchIndex)), path && (parsedPath.pathname = path);
  }
  return parsedPath;
}
var Action2, init_history = __esm({
  "node_modules/history/index.js"() {
    init_extends();
    (function(Action3) {
      Action3.Pop = "POP", Action3.Push = "PUSH", Action3.Replace = "REPLACE";
    })(Action2 || (Action2 = {}));
  }
});

// node_modules/react-router/index.js
function invariant3(cond, message) {
  if (!cond)
    throw new Error(message);
}
function warning2(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function warningOnce(key, cond, message) {
  !cond && !alreadyWarned2[key] && (alreadyWarned2[key] = !0, warning2(!1, message));
}
function matchRoutes2(routes2, locationArg, basename) {
  basename === void 0 && (basename = "/");
  let location = typeof locationArg == "string" ? parsePath2(locationArg) : locationArg, pathname = stripBasename2(location.pathname || "/", basename);
  if (pathname == null)
    return null;
  let branches = flattenRoutes2(routes2);
  rankRouteBranches2(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i)
    matches = matchRouteBranch2(branches[i], pathname);
  return matches;
}
function flattenRoutes2(routes2, branches, parentsMeta, parentPath) {
  return branches === void 0 && (branches = []), parentsMeta === void 0 && (parentsMeta = []), parentPath === void 0 && (parentPath = ""), routes2.forEach((route, index) => {
    let meta2 = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === !0,
      childrenIndex: index,
      route
    };
    meta2.relativePath.startsWith("/") && (meta2.relativePath.startsWith(parentPath) || invariant3(!1, 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), meta2.relativePath = meta2.relativePath.slice(parentPath.length));
    let path = joinPaths2([parentPath, meta2.relativePath]), routesMeta = parentsMeta.concat(meta2);
    route.children && route.children.length > 0 && (route.index === !0 && invariant3(!1, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')), flattenRoutes2(route.children, branches, routesMeta, path)), !(route.path == null && !route.index) && branches.push({
      path,
      score: computeScore2(path, route.index),
      routesMeta
    });
  }), branches;
}
function rankRouteBranches2(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes2(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
function computeScore2(path, index) {
  let segments = path.split("/"), initialScore = segments.length;
  return segments.some(isSplat2) && (initialScore += splatPenalty2), index && (initialScore += indexRouteValue2), segments.filter((s) => !isSplat2(s)).reduce((score, segment) => score + (paramRe2.test(segment) ? dynamicSegmentValue2 : segment === "" ? emptySegmentValue2 : staticSegmentValue2), initialScore);
}
function compareIndexes2(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? a[a.length - 1] - b[b.length - 1] : 0;
}
function matchRouteBranch2(branch, pathname) {
  let {
    routesMeta
  } = branch, matchedParams = {}, matchedPathname = "/", matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i], end = i === routesMeta.length - 1, remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/", match = matchPath2({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta2.route;
    matches.push({
      params: matchedParams,
      pathname: joinPaths2([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname2(joinPaths2([matchedPathname, match.pathnameBase])),
      route
    }), match.pathnameBase !== "/" && (matchedPathname = joinPaths2([matchedPathname, match.pathnameBase]));
  }
  return matches;
}
function matchPath2(pattern, pathname) {
  typeof pattern == "string" && (pattern = {
    path: pattern,
    caseSensitive: !1,
    end: !0
  });
  let [matcher, paramNames] = compilePath2(pattern.path, pattern.caseSensitive, pattern.end), match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0], pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1"), captureGroups = match.slice(1);
  return {
    params: paramNames.reduce((memo, paramName, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      return memo[paramName] = safelyDecodeURIComponent2(captureGroups[index] || "", paramName), memo;
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath2(path, caseSensitive, end) {
  caseSensitive === void 0 && (caseSensitive = !1), end === void 0 && (end = !0), warning2(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [], regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/:(\w+)/g, (_, paramName) => (paramNames.push(paramName), "([^\\/]+)"));
  return path.endsWith("*") ? (paramNames.push("*"), regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : regexpSource += end ? "\\/*$" : "(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)", [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), paramNames];
}
function safelyDecodeURIComponent2(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return warning2(!1, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")), value;
  }
}
function resolvePath2(to, fromPathname) {
  fromPathname === void 0 && (fromPathname = "/");
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to == "string" ? parsePath2(to) : to;
  return {
    pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname2(toPathname, fromPathname) : fromPathname,
    search: normalizeSearch2(search),
    hash: normalizeHash2(hash)
  };
}
function resolvePathname2(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  return relativePath.split("/").forEach((segment) => {
    segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
  }), segments.length > 1 ? segments.join("/") : "/";
}
function resolveTo2(toArg, routePathnames, locationPathname) {
  let to = typeof toArg == "string" ? parsePath2(toArg) : toArg, toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname, from2;
  if (toPathname == null)
    from2 = locationPathname;
  else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      for (; toSegments[0] === ".."; )
        toSegments.shift(), routePathnameIndex -= 1;
      to.pathname = toSegments.join("/");
    }
    from2 = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath2(to, from2);
  return toPathname && toPathname !== "/" && toPathname.endsWith("/") && !path.pathname.endsWith("/") && (path.pathname += "/"), path;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to == "string" ? parsePath2(to).pathname : to.pathname;
}
function stripBasename2(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase()))
    return null;
  let nextChar = pathname.charAt(basename.length);
  return nextChar && nextChar !== "/" ? null : pathname.slice(basename.length) || "/";
}
function useHref(to) {
  useInRouterContext() || invariant3(
    !1,
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename,
    navigator: navigator2
  } = (0, import_react.useContext)(NavigationContext), {
    hash,
    pathname,
    search
  } = useResolvedPath(to), joinedPathname = pathname;
  if (basename !== "/") {
    let toPathname = getToPathname(to), endsWithSlash = toPathname != null && toPathname.endsWith("/");
    joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths2([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return (0, import_react.useContext)(LocationContext) != null;
}
function useLocation() {
  return useInRouterContext() || invariant3(
    !1,
    "useLocation() may be used only in the context of a <Router> component."
  ), (0, import_react.useContext)(LocationContext).location;
}
function useNavigate() {
  useInRouterContext() || invariant3(
    !1,
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let {
    basename,
    navigator: navigator2
  } = (0, import_react.useContext)(NavigationContext), {
    matches
  } = (0, import_react.useContext)(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase)), activeRef = (0, import_react.useRef)(!1);
  return (0, import_react.useEffect)(() => {
    activeRef.current = !0;
  }), (0, import_react.useCallback)(function(to, options) {
    if (options === void 0 && (options = {}), warning2(activeRef.current, "You should call navigate() in a React.useEffect(), not when your component is first rendered."), !activeRef.current)
      return;
    if (typeof to == "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo2(to, JSON.parse(routePathnamesJson), locationPathname);
    basename !== "/" && (path.pathname = joinPaths2([basename, path.pathname])), (options.replace ? navigator2.replace : navigator2.push)(path, options.state);
  }, [basename, navigator2, routePathnamesJson, locationPathname]);
}
function useOutlet(context) {
  let outlet = (0, import_react.useContext)(RouteContext).outlet;
  return outlet && /* @__PURE__ */ (0, import_react.createElement)(OutletContext.Provider, {
    value: context
  }, outlet);
}
function useResolvedPath(to) {
  let {
    matches
  } = (0, import_react.useContext)(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(matches.map((match) => match.pathnameBase));
  return (0, import_react.useMemo)(() => resolveTo2(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
}
function useRoutes(routes2, locationArg) {
  useInRouterContext() || invariant3(
    !1,
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    matches: parentMatches
  } = (0, import_react.useContext)(RouteContext), routeMatch = parentMatches[parentMatches.length - 1], parentParams = routeMatch ? routeMatch.params : {}, parentPathname = routeMatch ? routeMatch.pathname : "/", parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/", parentRoute = routeMatch && routeMatch.route;
  {
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + parentPathname + '" (under <Route path="' + parentPath + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + parentPath + '"> to <Route ') + ('path="' + (parentPath === "/" ? "*" : parentPath + "/*") + '">.'));
  }
  let locationFromContext = useLocation(), location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg == "string" ? parsePath2(locationArg) : locationArg;
    parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase)) || invariant3(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + parentPathnameBase + '" ') + ('but pathname "' + parsedLocationArg.pathname + '" was given in the `location` prop.')), location = parsedLocationArg;
  } else
    location = locationFromContext;
  let pathname = location.pathname || "/", remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/", matches = matchRoutes2(routes2, {
    pathname: remainingPathname
  });
  return warning2(parentRoute || matches != null, 'No routes matched location "' + location.pathname + location.search + location.hash + '" '), warning2(matches == null || matches[matches.length - 1].route.element !== void 0, 'Matched leaf route at location "' + location.pathname + location.search + location.hash + '" does not have an element. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'), _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths2([parentPathnameBase, match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths2([parentPathnameBase, match.pathnameBase])
  })), parentMatches);
}
function _renderMatches(matches, parentMatches) {
  return parentMatches === void 0 && (parentMatches = []), matches == null ? null : matches.reduceRight((outlet, match, index) => /* @__PURE__ */ (0, import_react.createElement)(RouteContext.Provider, {
    children: match.route.element !== void 0 ? match.route.element : outlet,
    value: {
      outlet,
      matches: parentMatches.concat(matches.slice(0, index + 1))
    }
  }), null);
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Router(_ref3) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action2.Pop,
    navigator: navigator2,
    static: staticProp = !1
  } = _ref3;
  useInRouterContext() && invariant3(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let basename = normalizePathname2(basenameProp), navigationContext = (0, import_react.useMemo)(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  typeof locationProp == "string" && (locationProp = parsePath2(locationProp));
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp, location = (0, import_react.useMemo)(() => {
    let trailingPathname = stripBasename2(pathname, basename);
    return trailingPathname == null ? null : {
      pathname: trailingPathname,
      search,
      hash,
      state,
      key
    };
  }, [basename, pathname, search, hash, state, key]);
  return warning2(location != null, '<Router basename="' + basename + '"> is not able to match the URL ' + ('"' + pathname + search + hash + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), location == null ? null : /* @__PURE__ */ (0, import_react.createElement)(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ (0, import_react.createElement)(LocationContext.Provider, {
    children,
    value: {
      location,
      navigationType
    }
  }));
}
var import_react, NavigationContext, LocationContext, RouteContext, alreadyWarned2, paramRe2, dynamicSegmentValue2, indexRouteValue2, emptySegmentValue2, staticSegmentValue2, splatPenalty2, isSplat2, joinPaths2, normalizePathname2, normalizeSearch2, normalizeHash2, OutletContext, init_react_router = __esm({
  "node_modules/react-router/index.js"() {
    init_history();
    init_history();
    import_react = __toESM(require_react());
    NavigationContext = /* @__PURE__ */ (0, import_react.createContext)(null);
    NavigationContext.displayName = "Navigation";
    LocationContext = /* @__PURE__ */ (0, import_react.createContext)(null);
    LocationContext.displayName = "Location";
    RouteContext = /* @__PURE__ */ (0, import_react.createContext)({
      outlet: null,
      matches: []
    });
    RouteContext.displayName = "Route";
    alreadyWarned2 = {};
    paramRe2 = /^:\w+$/, dynamicSegmentValue2 = 3, indexRouteValue2 = 2, emptySegmentValue2 = 1, staticSegmentValue2 = 10, splatPenalty2 = -2, isSplat2 = (s) => s === "*";
    joinPaths2 = (paths) => paths.join("/").replace(/\/\/+/g, "/"), normalizePathname2 = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch2 = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, normalizeHash2 = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
    OutletContext = /* @__PURE__ */ (0, import_react.createContext)(null);
  }
});

// node_modules/react-router-dom/index.js
function _extends3() {
  return _extends3 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3, [state, setState] = (0, import_react2.useState)({
    action: history.action,
    location: history.location
  });
  return (0, import_react2.useLayoutEffect)(() => history.listen(setState), [history]), /* @__PURE__ */ (0, import_react2.createElement)(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state
  } = _temp === void 0 ? {} : _temp, navigate = useNavigate(), location = useLocation(), path = useResolvedPath(to);
  return (0, import_react2.useCallback)((event) => {
    if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
      event.preventDefault();
      let replace = !!replaceProp || createPath2(location) === createPath2(path);
      navigate(to, {
        replace,
        state
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to]);
}
var import_react2, _excluded, _excluded2, Link, NavLink, init_react_router_dom = __esm({
  "node_modules/react-router-dom/index.js"() {
    import_react2 = __toESM(require_react());
    init_react_router();
    init_react_router();
    _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
    HistoryRouter.displayName = "unstable_HistoryRouter";
    Link = /* @__PURE__ */ (0, import_react2.forwardRef)(function(_ref4, ref) {
      let {
        onClick,
        reloadDocument,
        replace = !1,
        state,
        target,
        to
      } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded), href = useHref(to), internalOnClick = useLinkClickHandler(to, {
        replace,
        state,
        target
      });
      function handleClick(event) {
        onClick && onClick(event), !event.defaultPrevented && !reloadDocument && internalOnClick(event);
      }
      return /* @__PURE__ */ (0, import_react2.createElement)("a", _extends3({}, rest, {
        href,
        onClick: handleClick,
        ref,
        target
      }));
    });
    Link.displayName = "Link";
    NavLink = /* @__PURE__ */ (0, import_react2.forwardRef)(function(_ref5, ref) {
      let {
        "aria-current": ariaCurrentProp = "page",
        caseSensitive = !1,
        className: classNameProp = "",
        end = !1,
        style: styleProp,
        to,
        children
      } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2), location = useLocation(), path = useResolvedPath(to), locationPathname = location.pathname, toPathname = path.pathname;
      caseSensitive || (locationPathname = locationPathname.toLowerCase(), toPathname = toPathname.toLowerCase());
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/", ariaCurrent = isActive ? ariaCurrentProp : void 0, className;
      typeof classNameProp == "function" ? className = classNameProp({
        isActive
      }) : className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
      let style = typeof styleProp == "function" ? styleProp({
        isActive
      }) : styleProp;
      return /* @__PURE__ */ (0, import_react2.createElement)(Link, _extends3({}, rest, {
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to
      }), typeof children == "function" ? children({
        isActive
      }) : children);
    });
    NavLink.displayName = "NavLink";
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js
function matchServerRoutes(routes2, pathname) {
  let matches = matchRoutes2(routes2, pathname);
  return matches ? matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  })) : null;
}
var init_routeMatching = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js"() {
    init_react_router_dom();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/data.js
async function callRouteActionRR({
  loadContext,
  action,
  params,
  request,
  routeId
}) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
  return isResponse(result) ? result : json(result);
}
async function callRouteLoaderRR({
  loadContext,
  loader: loader4,
  params,
  request,
  routeId
}) {
  let result = await loader4({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
  return isResponse(result) ? result : json(result);
}
function stripIndexParam(request) {
  let url = new URL(request.url), indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues)
    indexValue && indexValuesToKeep.push(indexValue);
  for (let toKeep of indexValuesToKeep)
    url.searchParams.append("index", toKeep);
  return new Request(url.href, request);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  return url.searchParams.delete("_data"), new Request(url.href, request);
}
var init_data = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/data.js"() {
    init_responses();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/routes.js
function createRoutes(manifest, parentId) {
  return Object.entries(manifest).filter(([, route]) => route.parentId === parentId).map(([id, route]) => ({
    ...route,
    children: createRoutes(manifest, id)
  }));
}
function createStaticHandlerDataRoutes(manifest, loadContext, parentId) {
  return Object.values(manifest).filter((route) => route.parentId === parentId).map((route) => {
    let commonRoute = {
      hasErrorBoundary: route.id === "root" || route.module.CatchBoundary != null || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      loader: route.module.loader ? (args) => callRouteLoaderRR({
        ...args,
        loadContext,
        loader: route.module.loader,
        routeId: route.id
      }) : void 0,
      action: route.module.action ? (args) => callRouteActionRR({
        ...args,
        loadContext,
        action: route.module.action,
        routeId: route.id
      }) : void 0,
      handle: route.module.handle,
      shouldRevalidate: () => !0
    };
    return route.index ? {
      index: !0,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(manifest, loadContext, route.id),
      ...commonRoute
    };
  });
}
var init_routes = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/routes.js"() {
    init_data();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/markup.js
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
var ESCAPE_LOOKUP, ESCAPE_REGEX, init_markup = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/markup.js"() {
    ESCAPE_LOOKUP = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX = /[&><\u2028\u2029]/g;
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}
var init_serverHandoff = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js"() {
    init_markup();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/server.js
async function handleDataRequestRR(serverMode, staticHandler, routeId, request) {
  try {
    let response = await staticHandler.queryRoute(request, routeId);
    if (isRedirectResponse(response)) {
      let headers = new Headers(response.headers);
      return headers.set("X-Remix-Redirect", headers.get("Location")), headers.delete("Location"), response.headers.get("Set-Cookie") !== null && headers.set("X-Remix-Revalidate", "yes"), new Response(null, {
        status: 204,
        headers
      });
    }
    return response;
  } catch (error) {
    if (error instanceof Response)
      return error.headers.set("X-Remix-Catch", "yes"), error;
    let status = 500, errorInstance = error;
    return isRouteErrorResponse(error) && (status = error.status, errorInstance = error.error || errorInstance), serverMode !== ServerMode.Test && !request.signal.aborted && console.error(errorInstance), serverMode === ServerMode.Development && errorInstance instanceof Error ? errorBoundaryError(errorInstance, status) : errorBoundaryError(new Error("Unexpected Server Error"), status);
  }
}
function findParentBoundary(routes2, routeId, error) {
  let route = routes2[routeId] || routes2.root, isCatch = isRouteErrorResponse(error) && (!error.error || error.status === 404);
  return isCatch && route.module.CatchBoundary || !isCatch && route.module.ErrorBoundary || !route.parentId ? route.id : findParentBoundary(routes2, route.parentId, error);
}
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors)
    return;
  let errors = {};
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId], handlingRouteId = findParentBoundary(build.routes, routeId, error);
    errors[handlingRouteId] = error;
  }
  context.errors = errors;
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request) {
  let context;
  try {
    context = await staticHandler.query(request);
  } catch (error) {
    return !request.signal.aborted && serverMode !== ServerMode.Test && console.error(error), new Response(null, {
      status: 500
    });
  }
  if (context instanceof Response)
    return context;
  differentiateCatchVersusErrorBoundaries(build, context);
  let appState = {
    trackBoundaries: !0,
    trackCatchBoundaries: !0,
    catchBoundaryRouteId: null,
    renderBoundaryRouteId: null,
    loaderBoundaryRouteId: null
  };
  for (let match of context.matches) {
    var _context$errors, _build$routes$id, _build$routes$id2;
    let id = match.route.id, error = (_context$errors = context.errors) === null || _context$errors === void 0 ? void 0 : _context$errors[id], hasCatchBoundary = ((_build$routes$id = build.routes[id]) === null || _build$routes$id === void 0 ? void 0 : _build$routes$id.module.CatchBoundary) != null, hasErrorBoundary = ((_build$routes$id2 = build.routes[id]) === null || _build$routes$id2 === void 0 ? void 0 : _build$routes$id2.module.ErrorBoundary) != null;
    if (error)
      if (isRouteErrorResponse(error)) {
        if (error.internal && error.error && error.status !== 404) {
          hasErrorBoundary && (appState.loaderBoundaryRouteId = id), appState.trackBoundaries = !1, appState.error = await serializeError(error.error), error.status === 405 && error.error.message.includes("Invalid request method") && (context.matches = []);
          break;
        }
        hasCatchBoundary && (appState.catchBoundaryRouteId = id), appState.trackCatchBoundaries = !1, appState.catch = {
          data: error.error && error.status === 404 ? error.error.message : error.data,
          status: error.status,
          statusText: error.statusText
        };
        break;
      } else {
        hasErrorBoundary && (appState.loaderBoundaryRouteId = id), appState.trackBoundaries = !1, appState.error = await serializeError(error);
        break;
      }
    else
      continue;
  }
  let renderableMatches = getRenderableMatches(context.matches, appState);
  if (!renderableMatches) {
    var _root$module;
    renderableMatches = [];
    let root = staticHandler.dataRoutes[0];
    root != null && (_root$module = root.module) !== null && _root$module !== void 0 && _root$module.CatchBoundary && (appState.catchBoundaryRouteId = "root", renderableMatches.push({
      params: {},
      pathname: "",
      route: staticHandler.dataRoutes[0]
    }));
  }
  let headers = getDocumentHeadersRR(build, context, renderableMatches), serverHandoff = {
    actionData: context.actionData || void 0,
    appState,
    matches: createEntryMatches(renderableMatches, build.assets.routes),
    routeData: context.loaderData || {},
    future: build.future
  }, entryContext = {
    ...serverHandoff,
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    serverHandoffString: createServerHandoffString(serverHandoff)
  }, handleDocumentRequestParameters = [request, context.statusCode, headers, entryContext], handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(...handleDocumentRequestParameters);
  } catch (error) {
    handleDocumentRequestParameters[1] = 500, appState.trackBoundaries = !1, appState.error = await serializeError(error), entryContext.serverHandoffString = createServerHandoffString(serverHandoff);
    try {
      return await handleDocumentRequestFunction(...handleDocumentRequestParameters);
    } catch (error2) {
      return returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request) {
  try {
    let response = await staticHandler.queryRoute(request, routeId);
    return invariant2(response instanceof Response, "Expected a Response to be returned from queryRoute"), response;
  } catch (error) {
    return error instanceof Response ? (error.headers.set("X-Remix-Catch", "yes"), error) : returnLastResortErrorResponse(error, serverMode);
  }
}
async function errorBoundaryError(error, status) {
  return json(await serializeError(error), {
    status,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function getRenderableMatches(matches, appState) {
  if (!matches)
    return null;
  if (!appState.catch && !appState.error)
    return matches;
  let lastRenderableIndex = -1;
  return matches.forEach((match, index) => {
    let id = match.route.id;
    (appState.renderBoundaryRouteId === id || appState.loaderBoundaryRouteId === id || appState.catchBoundaryRouteId === id) && (lastRenderableIndex = index);
  }), matches.slice(0, lastRenderableIndex + 1);
}
function returnLastResortErrorResponse(error, serverMode) {
  serverMode !== ServerMode.Test && console.error(error);
  let message = "Unexpected Server Error";
  return serverMode !== ServerMode.Production && (message += `

${String(error)}`), new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
var createRequestHandler, init_server = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/server.js"() {
    init_router();
    init_entry();
    init_errors();
    init_headers();
    init_invariant();
    init_mode();
    init_routeMatching();
    init_routes();
    init_responses();
    init_serverHandoff();
    createRequestHandler = (build, mode) => {
      let routes2 = createRoutes(build.routes), serverMode = isServerMode(mode) ? mode : ServerMode.Production;
      return async function(request, loadContext = {}) {
        let url = new URL(request.url), matches = matchServerRoutes(routes2, url.pathname), staticHandler = unstable_createStaticHandler(createStaticHandlerDataRoutes(build.routes, loadContext)), response;
        if (url.searchParams.has("_data")) {
          let routeId = url.searchParams.get("_data");
          if (response = await handleDataRequestRR(serverMode, staticHandler, routeId, request), build.entry.module.handleDataRequest) {
            let match = matches.find((match2) => match2.route.id == routeId);
            response = await build.entry.module.handleDataRequest(response, {
              context: loadContext,
              params: match.params,
              request
            });
          }
        } else
          matches && matches[matches.length - 1].route.module.default == null ? response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request) : response = await handleDocumentRequestRR(serverMode, build, staticHandler, request);
        return request.method === "HEAD" ? new Response(null, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText
        }) : response;
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions.js
function flash(name) {
  return `__flash_${name}__`;
}
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/api/remix#signing-cookies for more information.`);
}
var createSession, isSession, createSessionStorageFactory, init_sessions = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions.js"() {
    init_cookies();
    init_warnings();
    createSession = (initialData = {}, id = "") => {
      let map = new Map(Object.entries(initialData));
      return {
        get id() {
          return id;
        },
        get data() {
          return Object.fromEntries(map);
        },
        has(name) {
          return map.has(name) || map.has(flash(name));
        },
        get(name) {
          if (map.has(name))
            return map.get(name);
          let flashName = flash(name);
          if (map.has(flashName)) {
            let value = map.get(flashName);
            return map.delete(flashName), value;
          }
        },
        set(name, value) {
          map.set(name, value);
        },
        flash(name, value) {
          map.set(flash(name), value);
        },
        unset(name) {
          map.delete(name);
        }
      };
    }, isSession = (object) => object != null && typeof object.id == "string" && typeof object.data < "u" && typeof object.has == "function" && typeof object.get == "function" && typeof object.set == "function" && typeof object.flash == "function" && typeof object.unset == "function", createSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg,
      createData,
      readData,
      updateData,
      deleteData
    }) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          let id = cookieHeader && await cookie.parse(cookieHeader, options), data = id && await readData(id);
          return createSession(data || {}, id || "");
        },
        async commitSession(session, options) {
          let {
            id,
            data
          } = session;
          return id ? await updateData(id, data, cookie.expires) : id = await createData(data, cookie.expires), cookie.serialize(id, options);
        },
        async destroySession(session, options) {
          return await deleteData(session.id), cookie.serialize("", {
            ...options,
            expires: new Date(0)
          });
        }
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js
var createCookieSessionStorageFactory, init_cookieStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/cookieStorage.js"() {
    init_cookies();
    init_sessions();
    createCookieSessionStorageFactory = (createCookie) => ({
      cookie: cookieArg
    } = {}) => {
      let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg);
      return warnOnceAboutSigningSessionCookie(cookie), {
        async getSession(cookieHeader, options) {
          return createSession(cookieHeader && await cookie.parse(cookieHeader, options) || {});
        },
        async commitSession(session, options) {
          let serializedCookie = await cookie.serialize(session.data, options);
          if (serializedCookie.length > 4096)
            throw new Error("Cookie length will exceed browser maximum. Length: " + serializedCookie.length);
          return serializedCookie;
        },
        async destroySession(_session, options) {
          return cookie.serialize("", {
            ...options,
            expires: new Date(0)
          });
        }
      };
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js
var createMemorySessionStorageFactory, init_memoryStorage = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/sessions/memoryStorage.js"() {
    createMemorySessionStorageFactory = (createSessionStorage) => ({
      cookie
    } = {}) => {
      let uniqueId = 0, map = /* @__PURE__ */ new Map();
      return createSessionStorage({
        cookie,
        async createData(data, expires) {
          let id = (++uniqueId).toString();
          return map.set(id, {
            data,
            expires
          }), id;
        },
        async readData(id) {
          if (map.has(id)) {
            let {
              data,
              expires
            } = map.get(id);
            if (!expires || expires > new Date())
              return data;
            expires && map.delete(id);
          }
          return null;
        },
        async updateData(id, data, expires) {
          map.set(id, {
            data,
            expires
          });
        },
        async deleteData(id) {
          map.delete(id);
        }
      });
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js
var MaxPartSizeExceededError, init_errors2 = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/errors.js"() {
    MaxPartSizeExceededError = class extends Error {
      constructor(field, maxBytes) {
        super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`), this.field = field, this.maxBytes = maxBytes;
      }
    };
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js
function createMemoryUploadHandler({
  filter,
  maxPartSize = 3e6
} = {}) {
  return async ({
    filename,
    contentType,
    name,
    data
  }) => {
    if (filter && !await filter({
      filename,
      contentType,
      name
    }))
      return;
    let size = 0, chunks = [];
    for await (let chunk of data) {
      if (size += chunk.byteLength, size > maxPartSize)
        throw new MaxPartSizeExceededError(name, maxPartSize);
      chunks.push(chunk);
    }
    return typeof filename == "string" ? new File(chunks, filename, {
      type: contentType
    }) : await new Blob(chunks, {
      type: contentType
    }).text();
  };
}
var init_memoryUploadHandler = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/upload/memoryUploadHandler.js"() {
    init_errors2();
  }
});

// node_modules/@remix-run/server-runtime/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  MaxPartSizeExceededError: () => MaxPartSizeExceededError,
  createCookieFactory: () => createCookieFactory,
  createCookieSessionStorageFactory: () => createCookieSessionStorageFactory,
  createMemorySessionStorageFactory: () => createMemorySessionStorageFactory,
  createRequestHandler: () => createRequestHandler,
  createSession: () => createSession,
  createSessionStorageFactory: () => createSessionStorageFactory,
  isCookie: () => isCookie,
  isSession: () => isSession,
  json: () => json,
  redirect: () => redirect,
  unstable_composeUploadHandlers: () => composeUploadHandlers,
  unstable_createMemoryUploadHandler: () => createMemoryUploadHandler,
  unstable_parseMultipartFormData: () => parseMultipartFormData
});
var init_esm = __esm({
  "node_modules/@remix-run/server-runtime/dist/esm/index.js"() {
    init_cookies();
    init_formData();
    init_responses();
    init_server();
    init_sessions();
    init_cookieStorage();
    init_memoryStorage();
    init_memoryUploadHandler();
    init_errors2();
  }
});

// node_modules/@remix-run/cloudflare/dist/crypto.js
var require_crypto = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var encoder = new TextEncoder(), sign = async (value, secret) => {
      let key = await createKey2(secret, ["sign"]), data = encoder.encode(value), signature = await crypto.subtle.sign("HMAC", key, data), hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "");
      return value + "." + hash;
    }, unsign = async (signed, secret) => {
      let index = signed.lastIndexOf("."), value = signed.slice(0, index), hash = signed.slice(index + 1), key = await createKey2(secret, ["verify"]), data = encoder.encode(value), signature = byteStringToUint8Array(atob(hash));
      return await crypto.subtle.verify("HMAC", key, signature, data) ? value : !1;
    };
    async function createKey2(secret, usages) {
      return await crypto.subtle.importKey("raw", encoder.encode(secret), {
        name: "HMAC",
        hash: "SHA-256"
      }, !1, usages);
    }
    function byteStringToUint8Array(byteString) {
      let array = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        array[i] = byteString.charCodeAt(i);
      return array;
    }
    exports.sign = sign;
    exports.unsign = unsign;
  }
});

// node_modules/@remix-run/cloudflare/dist/implementations.js
var require_implementations = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/implementations.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var serverRuntime = (init_esm(), __toCommonJS(esm_exports)), crypto2 = require_crypto(), createCookie = serverRuntime.createCookieFactory({
      sign: crypto2.sign,
      unsign: crypto2.unsign
    }), createCookieSessionStorage2 = serverRuntime.createCookieSessionStorageFactory(createCookie), createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie), createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);
    exports.createCookie = createCookie;
    exports.createCookieSessionStorage = createCookieSessionStorage2;
    exports.createMemorySessionStorage = createMemorySessionStorage;
    exports.createSessionStorage = createSessionStorage;
  }
});

// node_modules/@remix-run/cloudflare/dist/sessions/cloudflareKVSessionStorage.js
var require_cloudflareKVSessionStorage = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/sessions/cloudflareKVSessionStorage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var implementations = require_implementations();
    function createCloudflareKVSessionStorage({
      cookie,
      kv
    }) {
      return implementations.createSessionStorage({
        cookie,
        async createData(data, expires) {
          for (; ; ) {
            let randomBytes = new Uint8Array(8);
            crypto.getRandomValues(randomBytes);
            let id = [...randomBytes].map((x) => x.toString(16).padStart(2, "0")).join("");
            if (!await kv.get(id, "json"))
              return await kv.put(id, JSON.stringify(data), {
                expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
              }), id;
          }
        },
        async readData(id) {
          let session = await kv.get(id);
          return session ? JSON.parse(session) : null;
        },
        async updateData(id, data, expires) {
          await kv.put(id, JSON.stringify(data), {
            expiration: expires ? Math.round(expires.getTime() / 1e3) : void 0
          });
        },
        async deleteData(id) {
          await kv.delete(id);
        }
      });
    }
    exports.createCloudflareKVSessionStorage = createCloudflareKVSessionStorage;
  }
});

// node_modules/@remix-run/cloudflare/dist/index.js
var require_dist = __commonJS({
  "node_modules/@remix-run/cloudflare/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var cloudflareKVSessionStorage = require_cloudflareKVSessionStorage(), implementations = require_implementations(), serverRuntime = (init_esm(), __toCommonJS(esm_exports));
    exports.createCloudflareKVSessionStorage = cloudflareKVSessionStorage.createCloudflareKVSessionStorage;
    exports.createCookie = implementations.createCookie;
    exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
    exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
    exports.createSessionStorage = implementations.createSessionStorage;
    Object.defineProperty(exports, "MaxPartSizeExceededError", {
      enumerable: !0,
      get: function() {
        return serverRuntime.MaxPartSizeExceededError;
      }
    });
    Object.defineProperty(exports, "createRequestHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createRequestHandler;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: !0,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: !0,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: !0,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "unstable_composeUploadHandlers", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_composeUploadHandlers;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: !0,
      get: function() {
        return serverRuntime.unstable_parseMultipartFormData;
      }
    });
  }
});

// node-modules-polyfills:events
function EventHandlers() {
}
function EventEmitter() {
  EventEmitter.init.call(this);
}
function $getMaxListeners(that) {
  return that._maxListeners === void 0 ? EventEmitter.defaultMaxListeners : that._maxListeners;
}
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self);
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self, arg1);
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self, arg1, arg2);
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].call(self, arg1, arg2, arg3);
}
function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else
    for (var len = handler.length, listeners2 = arrayClone(handler, len), i = 0; i < len; ++i)
      listeners2[i].apply(self, args);
}
function _addListener(target, type, listener, prepend) {
  var m, events, existing;
  if (typeof listener != "function")
    throw new TypeError('"listener" argument must be a function');
  if (events = target._events, events ? (events.newListener && (target.emit(
    "newListener",
    type,
    listener.listener ? listener.listener : listener
  ), events = target._events), existing = events[type]) : (events = target._events = new EventHandlers(), target._eventsCount = 0), !existing)
    existing = events[type] = listener, ++target._eventsCount;
  else if (typeof existing == "function" ? existing = events[type] = prepend ? [listener, existing] : [existing, listener] : prepend ? existing.unshift(listener) : existing.push(listener), !existing.warned && (m = $getMaxListeners(target), m && m > 0 && existing.length > m)) {
    existing.warned = !0;
    var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + type + " listeners added. Use emitter.setMaxListeners() to increase limit");
    w.name = "MaxListenersExceededWarning", w.emitter = target, w.type = type, w.count = existing.length, emitWarning(w);
  }
  return target;
}
function emitWarning(e) {
  typeof console.warn == "function" ? console.warn(e) : console.log(e);
}
function _onceWrap(target, type, listener) {
  var fired = !1;
  function g() {
    target.removeListener(type, g), fired || (fired = !0, listener.apply(target, arguments));
  }
  return g.listener = listener, g;
}
function listenerCount(type) {
  var events = this._events;
  if (events) {
    var evlistener = events[type];
    if (typeof evlistener == "function")
      return 1;
    if (evlistener)
      return evlistener.length;
  }
  return 0;
}
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}
function arrayClone(arr, i) {
  for (var copy2 = new Array(i); i--; )
    copy2[i] = arr[i];
  return copy2;
}
function unwrapListeners(arr) {
  for (var ret = new Array(arr.length), i = 0; i < ret.length; ++i)
    ret[i] = arr[i].listener || arr[i];
  return ret;
}
var domain, events_default, init_events = __esm({
  "node-modules-polyfills:events"() {
    "use strict";
    EventHandlers.prototype = /* @__PURE__ */ Object.create(null);
    events_default = EventEmitter;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.usingDomains = !1;
    EventEmitter.prototype.domain = void 0;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._maxListeners = void 0;
    EventEmitter.defaultMaxListeners = 10;
    EventEmitter.init = function() {
      this.domain = null, EventEmitter.usingDomains && domain.active && !(this instanceof domain.Domain) && (this.domain = domain.active), (!this._events || this._events === Object.getPrototypeOf(this)._events) && (this._events = new EventHandlers(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function(n) {
      if (typeof n != "number" || n < 0 || isNaN(n))
        throw new TypeError('"n" argument must be a positive number');
      return this._maxListeners = n, this;
    };
    EventEmitter.prototype.getMaxListeners = function() {
      return $getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function(type) {
      var er, handler, len, args, i, events, domain2, needDomainExit = !1, doError = type === "error";
      if (events = this._events, events)
        doError = doError && events.error == null;
      else if (!doError)
        return !1;
      if (domain2 = this.domain, doError) {
        if (er = arguments[1], domain2)
          er || (er = new Error('Uncaught, unspecified "error" event')), er.domainEmitter = this, er.domain = domain2, er.domainThrown = !1, domain2.emit("error", er);
        else {
          if (er instanceof Error)
            throw er;
          var err = new Error('Uncaught, unspecified "error" event. (' + er + ")");
          throw err.context = er, err;
        }
        return !1;
      }
      if (handler = events[type], !handler)
        return !1;
      var isFn = typeof handler == "function";
      switch (len = arguments.length, len) {
        case 1:
          emitNone(handler, isFn, this);
          break;
        case 2:
          emitOne(handler, isFn, this, arguments[1]);
          break;
        case 3:
          emitTwo(handler, isFn, this, arguments[1], arguments[2]);
          break;
        case 4:
          emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          for (args = new Array(len - 1), i = 1; i < len; i++)
            args[i - 1] = arguments[i];
          emitMany(handler, isFn, this, args);
      }
      return needDomainExit && domain2.exit(), !0;
    };
    EventEmitter.prototype.addListener = function(type, listener) {
      return _addListener(this, type, listener, !1);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function(type, listener) {
      return _addListener(this, type, listener, !0);
    };
    EventEmitter.prototype.once = function(type, listener) {
      if (typeof listener != "function")
        throw new TypeError('"listener" argument must be a function');
      return this.on(type, _onceWrap(this, type, listener)), this;
    };
    EventEmitter.prototype.prependOnceListener = function(type, listener) {
      if (typeof listener != "function")
        throw new TypeError('"listener" argument must be a function');
      return this.prependListener(type, _onceWrap(this, type, listener)), this;
    };
    EventEmitter.prototype.removeListener = function(type, listener) {
      var list, events, position, i, originalListener;
      if (typeof listener != "function")
        throw new TypeError('"listener" argument must be a function');
      if (events = this._events, !events)
        return this;
      if (list = events[type], !list)
        return this;
      if (list === listener || list.listener && list.listener === listener)
        --this._eventsCount === 0 ? this._events = new EventHandlers() : (delete events[type], events.removeListener && this.emit("removeListener", type, list.listener || listener));
      else if (typeof list != "function") {
        for (position = -1, i = list.length; i-- > 0; )
          if (list[i] === listener || list[i].listener && list[i].listener === listener) {
            originalListener = list[i].listener, position = i;
            break;
          }
        if (position < 0)
          return this;
        if (list.length === 1) {
          if (list[0] = void 0, --this._eventsCount === 0)
            return this._events = new EventHandlers(), this;
          delete events[type];
        } else
          spliceOne(list, position);
        events.removeListener && this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function(type) {
      var listeners2, events;
      if (events = this._events, !events)
        return this;
      if (!events.removeListener)
        return arguments.length === 0 ? (this._events = new EventHandlers(), this._eventsCount = 0) : events[type] && (--this._eventsCount === 0 ? this._events = new EventHandlers() : delete events[type]), this;
      if (arguments.length === 0) {
        for (var keys2 = Object.keys(events), i = 0, key; i < keys2.length; ++i)
          key = keys2[i], key !== "removeListener" && this.removeAllListeners(key);
        return this.removeAllListeners("removeListener"), this._events = new EventHandlers(), this._eventsCount = 0, this;
      }
      if (listeners2 = events[type], typeof listeners2 == "function")
        this.removeListener(type, listeners2);
      else if (listeners2)
        do
          this.removeListener(type, listeners2[listeners2.length - 1]);
        while (listeners2[0]);
      return this;
    };
    EventEmitter.prototype.listeners = function(type) {
      var evlistener, ret, events = this._events;
      return events ? (evlistener = events[type], evlistener ? typeof evlistener == "function" ? ret = [evlistener.listener || evlistener] : ret = unwrapListeners(evlistener) : ret = []) : ret = [], ret;
    };
    EventEmitter.listenerCount = function(emitter, type) {
      return typeof emitter.listenerCount == "function" ? emitter.listenerCount(type) : listenerCount.call(emitter, type);
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    EventEmitter.prototype.eventNames = function() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
  }
});

// node-modules-polyfills:process
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout(fun, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(fun, 0);
  try {
    return cachedSetTimeout(fun, 0);
  } catch {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout(marker);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(marker);
  try {
    return cachedClearTimeout(marker);
  } catch {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var timeout = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var len = queue.length; len; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < len; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, len = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(timeout);
  }
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
  queue.push(new Item(fun, args)), queue.length === 1 && !draining && runTimeout(drainQueue);
}
function Item(fun, array) {
  this.fun = fun, this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3, seconds = Math.floor(clocktime), nanoseconds = Math.floor(clocktime % 1 * 1e9);
  return previousTimestamp && (seconds = seconds - previousTimestamp[0], nanoseconds = nanoseconds - previousTimestamp[1], nanoseconds < 0 && (seconds--, nanoseconds += 1e9)), [seconds, nanoseconds];
}
function uptime() {
  var currentTime = new Date(), dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener2, once2, off, removeListener2, removeAllListeners2, emit2, performance, performanceNow, startTime, browser$1, process_default, init_process = __esm({
  "node-modules-polyfills:process"() {
    cachedSetTimeout = defaultSetTimout, cachedClearTimeout = defaultClearTimeout;
    typeof globalThis.setTimeout == "function" && (cachedSetTimeout = setTimeout);
    typeof globalThis.clearTimeout == "function" && (cachedClearTimeout = clearTimeout);
    queue = [], draining = !1, queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser", platform = "browser", browser = !0, env = {}, argv = [], version = "", versions = {}, release = {}, config = {};
    on = noop, addListener2 = noop, once2 = noop, off = noop, removeListener2 = noop, removeAllListeners2 = noop, emit2 = noop;
    performance = globalThis.performance || {}, performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return new Date().getTime();
    };
    startTime = new Date();
    browser$1 = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener: addListener2,
      once: once2,
      off,
      removeListener: removeListener2,
      removeAllListeners: removeAllListeners2,
      emit: emit2,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform,
      release,
      config,
      uptime
    }, process_default = browser$1;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js
var inherits, inherits_default, init_inherits = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js"() {
    typeof Object.create == "function" ? inherits = function(ctor, superCtor) {
      ctor.super_ = superCtor, ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
    } : inherits = function(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype, ctor.prototype = new TempCtor(), ctor.prototype.constructor = ctor;
    };
    inherits_default = inherits;
  }
});

// node-modules-polyfills:util
function format(f2) {
  if (!isString(f2)) {
    for (var objects = [], i = 0; i < arguments.length; i++)
      objects.push(inspect(arguments[i]));
    return objects.join(" ");
  }
  for (var i = 1, args = arguments, len = args.length, str = String(f2).replace(formatRegExp, function(x2) {
    if (x2 === "%%")
      return "%";
    if (i >= len)
      return x2;
    switch (x2) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch {
          return "[Circular]";
        }
      default:
        return x2;
    }
  }), x = args[i]; i < len; x = args[++i])
    isNull(x) || !isObject(x) ? str += " " + x : str += " " + inspect(x);
  return str;
}
function deprecate(fn, msg) {
  if (isUndefined(globalThis.process))
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  if (process_default.noDeprecation === !0)
    return fn;
  var warned = !1;
  function deprecated() {
    if (!warned) {
      if (process_default.throwDeprecation)
        throw new Error(msg);
      process_default.traceDeprecation ? console.trace(msg) : console.error(msg), warned = !0;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function debuglog(set) {
  if (isUndefined(debugEnviron) && (debugEnviron = process_default.env.NODE_DEBUG || ""), set = set.toUpperCase(), !debugs[set])
    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else
      debugs[set] = function() {
      };
  return debugs[set];
}
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  return arguments.length >= 3 && (ctx.depth = arguments[2]), arguments.length >= 4 && (ctx.colors = arguments[3]), isBoolean(opts) ? ctx.showHidden = opts : opts && _extend(ctx, opts), isUndefined(ctx.showHidden) && (ctx.showHidden = !1), isUndefined(ctx.depth) && (ctx.depth = 2), isUndefined(ctx.colors) && (ctx.colors = !1), isUndefined(ctx.customInspect) && (ctx.customInspect = !0), ctx.colors && (ctx.stylize = stylizeWithColor), formatValue(ctx, obj, ctx.depth);
}
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  return style ? "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m" : str;
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  return array.forEach(function(val, idx) {
    hash[val] = !0;
  }), hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== inspect && !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    return isString(ret) || (ret = formatValue(ctx, ret, recurseTimes)), ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive)
    return primitive;
  var keys2 = Object.keys(value), visibleKeys = arrayToHash(keys2);
  if (ctx.showHidden && (keys2 = Object.getOwnPropertyNames(value)), isError(value) && (keys2.indexOf("message") >= 0 || keys2.indexOf("description") >= 0))
    return formatError(value);
  if (keys2.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name + "]", "special");
    }
    if (isRegExp(value))
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    if (isDate(value))
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    if (isError(value))
      return formatError(value);
  }
  var base = "", array = !1, braces = ["{", "}"];
  if (isArray(value) && (array = !0, braces = ["[", "]"]), isFunction(value)) {
    var n = value.name ? ": " + value.name : "";
    base = " [Function" + n + "]";
  }
  if (isRegExp(value) && (base = " " + RegExp.prototype.toString.call(value)), isDate(value) && (base = " " + Date.prototype.toUTCString.call(value)), isError(value) && (base = " " + formatError(value)), keys2.length === 0 && (!array || value.length == 0))
    return braces[0] + base + braces[1];
  if (recurseTimes < 0)
    return isRegExp(value) ? ctx.stylize(RegExp.prototype.toString.call(value), "regexp") : ctx.stylize("[Object]", "special");
  ctx.seen.push(value);
  var output;
  return array ? output = formatArray(ctx, value, recurseTimes, visibleKeys, keys2) : output = keys2.map(function(key) {
    return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
  }), ctx.seen.pop(), reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys2) {
  for (var output = [], i = 0, l = value.length; i < l; ++i)
    hasOwnProperty(value, String(i)) ? output.push(formatProperty(
      ctx,
      value,
      recurseTimes,
      visibleKeys,
      String(i),
      !0
    )) : output.push("");
  return keys2.forEach(function(key) {
    key.match(/^\d+$/) || output.push(formatProperty(
      ctx,
      value,
      recurseTimes,
      visibleKeys,
      key,
      !0
    ));
  }), output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  if (desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] }, desc.get ? desc.set ? str = ctx.stylize("[Getter/Setter]", "special") : str = ctx.stylize("[Getter]", "special") : desc.set && (str = ctx.stylize("[Setter]", "special")), hasOwnProperty(visibleKeys, key) || (name = "[" + key + "]"), str || (ctx.seen.indexOf(desc.value) < 0 ? (isNull(recurseTimes) ? str = formatValue(ctx, desc.value, null) : str = formatValue(ctx, desc.value, recurseTimes - 1), str.indexOf(`
`) > -1 && (array ? str = str.split(`
`).map(function(line) {
    return "  " + line;
  }).join(`
`).substr(2) : str = `
` + str.split(`
`).map(function(line) {
    return "   " + line;
  }).join(`
`))) : str = ctx.stylize("[Circular]", "special")), isUndefined(name)) {
    if (array && key.match(/^\d+$/))
      return str;
    name = JSON.stringify("" + key), name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (name = name.substr(1, name.length - 2), name = ctx.stylize(name, "name")) : (name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), name = ctx.stylize(name, "string"));
  }
  return name + ": " + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0, length = output.reduce(function(prev, cur) {
    return numLinesEst++, cur.indexOf(`
`) >= 0 && numLinesEst++, prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  return length > 60 ? braces[0] + (base === "" ? "" : base + `
 `) + " " + output.join(`,
  `) + " " + braces[1] : braces[0] + base + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg == "boolean";
}
function isNull(arg) {
  return arg === null;
}
function isNumber(arg) {
  return typeof arg == "number";
}
function isString(arg) {
  return typeof arg == "string";
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === "[object RegExp]";
}
function isObject(arg) {
  return typeof arg == "object" && arg !== null;
}
function isDate(d) {
  return isObject(d) && objectToString(d) === "[object Date]";
}
function isError(e) {
  return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
function isFunction(arg) {
  return typeof arg == "function";
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function _extend(origin, add) {
  if (!add || !isObject(add))
    return origin;
  for (var keys2 = Object.keys(add), i = keys2.length; i--; )
    origin[keys2[i]] = add[keys2[i]];
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var formatRegExp, debugs, debugEnviron, init_util = __esm({
  "node-modules-polyfills:util"() {
    init_process();
    init_inherits();
    formatRegExp = /%[sdj%]/g;
    debugs = {};
    inspect.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    };
    inspect.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red"
    };
  }
});

// node-modules-polyfills:buffer
function init() {
  inited = !0;
  for (var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, len = code.length; i < len; ++i)
    lookup[i] = code[i], revLookup[code.charCodeAt(i)] = i;
  revLookup["-".charCodeAt(0)] = 62, revLookup["_".charCodeAt(0)] = 63;
}
function toByteArray(b64) {
  inited || init();
  var i, j, l, tmp, placeHolders, arr, len = b64.length;
  if (len % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0, arr = new Arr(len * 3 / 4 - placeHolders), l = placeHolders > 0 ? len - 4 : len;
  var L = 0;
  for (i = 0, j = 0; i < l; i += 4, j += 3)
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)], arr[L++] = tmp >> 16 & 255, arr[L++] = tmp >> 8 & 255, arr[L++] = tmp & 255;
  return placeHolders === 2 ? (tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4, arr[L++] = tmp & 255) : placeHolders === 1 && (tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2, arr[L++] = tmp >> 8 & 255, arr[L++] = tmp & 255), arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  for (var tmp, output = [], i = start; i < end; i += 3)
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2], output.push(tripletToBase64(tmp));
  return output.join("");
}
function fromByteArray(uint8) {
  inited || init();
  for (var tmp, len = uint8.length, extraBytes = len % 3, output = "", parts = [], maxChunkLength = 16383, i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  return extraBytes === 1 ? (tmp = uint8[len - 1], output += lookup[tmp >> 2], output += lookup[tmp << 4 & 63], output += "==") : extraBytes === 2 && (tmp = (uint8[len - 2] << 8) + uint8[len - 1], output += lookup[tmp >> 10], output += lookup[tmp >> 4 & 63], output += lookup[tmp << 2 & 63], output += "="), parts.push(output), parts.join("");
}
function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, nBits = -7, i = isLE ? nBytes - 1 : 0, d = isLE ? -1 : 1, s = buffer[offset + i];
  for (i += d, e = s & (1 << -nBits) - 1, s >>= -nBits, nBits += eLen; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8)
    ;
  for (m = e & (1 << -nBits) - 1, e >>= -nBits, nBits += mLen; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8)
    ;
  if (e === 0)
    e = 1 - eBias;
  else {
    if (e === eMax)
      return m ? NaN : (s ? -1 : 1) * (1 / 0);
    m = m + Math.pow(2, mLen), e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c, eLen = nBytes * 8 - mLen - 1, eMax = (1 << eLen) - 1, eBias = eMax >> 1, rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, i = isLE ? 0 : nBytes - 1, d = isLE ? 1 : -1, s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  for (value = Math.abs(value), isNaN(value) || value === 1 / 0 ? (m = isNaN(value) ? 1 : 0, e = eMax) : (e = Math.floor(Math.log(value) / Math.LN2), value * (c = Math.pow(2, -e)) < 1 && (e--, c *= 2), e + eBias >= 1 ? value += rt / c : value += rt * Math.pow(2, 1 - eBias), value * c >= 2 && (e++, c /= 2), e + eBias >= eMax ? (m = 0, e = eMax) : e + eBias >= 1 ? (m = (value * c - 1) * Math.pow(2, mLen), e = e + eBias) : (m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen), e = 0)); mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8)
    ;
  for (e = e << mLen | m, eLen += mLen; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8)
    ;
  buffer[offset + i - d] |= s * 128;
}
function kMaxLength() {
  return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
}
function createBuffer(that, length) {
  if (kMaxLength() < length)
    throw new RangeError("Invalid typed array length");
  return Buffer2.TYPED_ARRAY_SUPPORT ? (that = new Uint8Array(length), that.__proto__ = Buffer2.prototype) : (that === null && (that = new Buffer2(length)), that.length = length), that;
}
function Buffer2(arg, encodingOrOffset, length) {
  if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2))
    return new Buffer2(arg, encodingOrOffset, length);
  if (typeof arg == "number") {
    if (typeof encodingOrOffset == "string")
      throw new Error(
        "If encoding is specified then the first argument must be a string"
      );
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}
function from(that, value, encodingOrOffset, length) {
  if (typeof value == "number")
    throw new TypeError('"value" argument must not be a number');
  return typeof ArrayBuffer < "u" && value instanceof ArrayBuffer ? fromArrayBuffer(that, value, encodingOrOffset, length) : typeof value == "string" ? fromString(that, value, encodingOrOffset) : fromObject(that, value);
}
function assertSize(size) {
  if (typeof size != "number")
    throw new TypeError('"size" argument must be a number');
  if (size < 0)
    throw new RangeError('"size" argument must not be negative');
}
function alloc(that, size, fill2, encoding) {
  return assertSize(size), size <= 0 ? createBuffer(that, size) : fill2 !== void 0 ? typeof encoding == "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2) : createBuffer(that, size);
}
function allocUnsafe(that, size) {
  if (assertSize(size), that = createBuffer(that, size < 0 ? 0 : checked(size) | 0), !Buffer2.TYPED_ARRAY_SUPPORT)
    for (var i = 0; i < size; ++i)
      that[i] = 0;
  return that;
}
function fromString(that, string, encoding) {
  if ((typeof encoding != "string" || encoding === "") && (encoding = "utf8"), !Buffer2.isEncoding(encoding))
    throw new TypeError('"encoding" must be a valid string encoding');
  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);
  return actual !== length && (that = that.slice(0, actual)), that;
}
function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1)
    that[i] = array[i] & 255;
  return that;
}
function fromArrayBuffer(that, array, byteOffset, length) {
  if (array.byteLength, byteOffset < 0 || array.byteLength < byteOffset)
    throw new RangeError("'offset' is out of bounds");
  if (array.byteLength < byteOffset + (length || 0))
    throw new RangeError("'length' is out of bounds");
  return byteOffset === void 0 && length === void 0 ? array = new Uint8Array(array) : length === void 0 ? array = new Uint8Array(array, byteOffset) : array = new Uint8Array(array, byteOffset, length), Buffer2.TYPED_ARRAY_SUPPORT ? (that = array, that.__proto__ = Buffer2.prototype) : that = fromArrayLike(that, array), that;
}
function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    return that = createBuffer(that, len), that.length === 0 || obj.copy(that, 0, 0, len), that;
  }
  if (obj) {
    if (typeof ArrayBuffer < "u" && obj.buffer instanceof ArrayBuffer || "length" in obj)
      return typeof obj.length != "number" || isnan(obj.length) ? createBuffer(that, 0) : fromArrayLike(that, obj);
    if (obj.type === "Buffer" && isArray2(obj.data))
      return fromArrayLike(that, obj.data);
  }
  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
}
function checked(length) {
  if (length >= kMaxLength())
    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
  return length | 0;
}
function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}
function byteLength(string, encoding) {
  if (internalIsBuffer(string))
    return string.length;
  if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer))
    return string.byteLength;
  typeof string != "string" && (string = "" + string);
  var len = string.length;
  if (len === 0)
    return 0;
  for (var loweredCase = !1; ; )
    switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
      case void 0:
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase)
          return utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
    }
}
function slowToString(encoding, start, end) {
  var loweredCase = !1;
  if ((start === void 0 || start < 0) && (start = 0), start > this.length || ((end === void 0 || end > this.length) && (end = this.length), end <= 0) || (end >>>= 0, start >>>= 0, end <= start))
    return "";
  for (encoding || (encoding = "utf8"); ; )
    switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase)
          throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase(), loweredCase = !0;
    }
}
function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m], b[m] = i;
}
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  if (buffer.length === 0)
    return -1;
  if (typeof byteOffset == "string" ? (encoding = byteOffset, byteOffset = 0) : byteOffset > 2147483647 ? byteOffset = 2147483647 : byteOffset < -2147483648 && (byteOffset = -2147483648), byteOffset = +byteOffset, isNaN(byteOffset) && (byteOffset = dir ? 0 : buffer.length - 1), byteOffset < 0 && (byteOffset = buffer.length + byteOffset), byteOffset >= buffer.length) {
    if (dir)
      return -1;
    byteOffset = buffer.length - 1;
  } else if (byteOffset < 0)
    if (dir)
      byteOffset = 0;
    else
      return -1;
  if (typeof val == "string" && (val = Buffer2.from(val, encoding)), internalIsBuffer(val))
    return val.length === 0 ? -1 : arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  if (typeof val == "number")
    return val = val & 255, Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf == "function" ? dir ? Uint8Array.prototype.indexOf.call(buffer, val, byteOffset) : Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset) : arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1, arrLength = arr.length, valLength = val.length;
  if (encoding !== void 0 && (encoding = String(encoding).toLowerCase(), encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le")) {
    if (arr.length < 2 || val.length < 2)
      return -1;
    indexSize = 2, arrLength /= 2, valLength /= 2, byteOffset /= 2;
  }
  function read2(buf, i2) {
    return indexSize === 1 ? buf[i2] : buf.readUInt16BE(i2 * indexSize);
  }
  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++)
      if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1 && (foundIndex = i), i - foundIndex + 1 === valLength)
          return foundIndex * indexSize;
      } else
        foundIndex !== -1 && (i -= i - foundIndex), foundIndex = -1;
  } else
    for (byteOffset + valLength > arrLength && (byteOffset = arrLength - valLength), i = byteOffset; i >= 0; i--) {
      for (var found = !0, j = 0; j < valLength; j++)
        if (read2(arr, i + j) !== read2(val, j)) {
          found = !1;
          break;
        }
      if (found)
        return i;
    }
  return -1;
}
function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  length ? (length = Number(length), length > remaining && (length = remaining)) : length = remaining;
  var strLen = string.length;
  if (strLen % 2 !== 0)
    throw new TypeError("Invalid hex string");
  length > strLen / 2 && (length = strLen / 2);
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed))
      return i;
    buf[offset + i] = parsed;
  }
  return i;
}
function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}
function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
function base64Slice(buf, start, end) {
  return start === 0 && end === buf.length ? fromByteArray(buf) : fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  for (var res = [], i = start; i < end; ) {
    var firstByte = buf[i], codePoint = null, bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          firstByte < 128 && (codePoint = firstByte);
          break;
        case 2:
          secondByte = buf[i + 1], (secondByte & 192) === 128 && (tempCodePoint = (firstByte & 31) << 6 | secondByte & 63, tempCodePoint > 127 && (codePoint = tempCodePoint));
          break;
        case 3:
          secondByte = buf[i + 1], thirdByte = buf[i + 2], (secondByte & 192) === 128 && (thirdByte & 192) === 128 && (tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63, tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343) && (codePoint = tempCodePoint));
          break;
        case 4:
          secondByte = buf[i + 1], thirdByte = buf[i + 2], fourthByte = buf[i + 3], (secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128 && (tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63, tempCodePoint > 65535 && tempCodePoint < 1114112 && (codePoint = tempCodePoint));
      }
    }
    codePoint === null ? (codePoint = 65533, bytesPerSequence = 1) : codePoint > 65535 && (codePoint -= 65536, res.push(codePoint >>> 10 & 1023 | 55296), codePoint = 56320 | codePoint & 1023), res.push(codePoint), i += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH)
    return String.fromCharCode.apply(String, codePoints);
  for (var res = "", i = 0; i < len; )
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  return res;
}
function asciiSlice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i)
    ret += String.fromCharCode(buf[i] & 127);
  return ret;
}
function latin1Slice(buf, start, end) {
  var ret = "";
  end = Math.min(buf.length, end);
  for (var i = start; i < end; ++i)
    ret += String.fromCharCode(buf[i]);
  return ret;
}
function hexSlice(buf, start, end) {
  var len = buf.length;
  (!start || start < 0) && (start = 0), (!end || end < 0 || end > len) && (end = len);
  for (var out = "", i = start; i < end; ++i)
    out += toHex(buf[i]);
  return out;
}
function utf16leSlice(buf, start, end) {
  for (var bytes = buf.slice(start, end), res = "", i = 0; i < bytes.length; i += 2)
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  return res;
}
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0)
    throw new RangeError("offset is not uint");
  if (offset + ext > length)
    throw new RangeError("Trying to access beyond buffer length");
}
function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf))
    throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min)
    throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
}
function objectWriteUInt16(buf, value, offset, littleEndian) {
  value < 0 && (value = 65535 + value + 1);
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i)
    buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
}
function objectWriteUInt32(buf, value, offset, littleEndian) {
  value < 0 && (value = 4294967295 + value + 1);
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i)
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
}
function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length)
    throw new RangeError("Index out of range");
  if (offset < 0)
    throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
  return noAssert || checkIEEE754(buf, value, offset, 4), write(buf, value, offset, littleEndian, 23, 4), offset + 4;
}
function writeDouble(buf, value, offset, littleEndian, noAssert) {
  return noAssert || checkIEEE754(buf, value, offset, 8), write(buf, value, offset, littleEndian, 52, 8), offset + 8;
}
function base64clean(str) {
  if (str = stringtrim(str).replace(INVALID_BASE64_RE, ""), str.length < 2)
    return "";
  for (; str.length % 4 !== 0; )
    str = str + "=";
  return str;
}
function stringtrim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}
function toHex(n) {
  return n < 16 ? "0" + n.toString(16) : n.toString(16);
}
function utf8ToBytes(string, units) {
  units = units || 1 / 0;
  for (var codePoint, length = string.length, leadSurrogate = null, bytes = [], i = 0; i < length; ++i) {
    if (codePoint = string.charCodeAt(i), codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          (units -= 3) > -1 && bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length) {
          (units -= 3) > -1 && bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        (units -= 3) > -1 && bytes.push(239, 191, 189), leadSurrogate = codePoint;
        continue;
      }
      codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
    } else
      leadSurrogate && (units -= 3) > -1 && bytes.push(239, 191, 189);
    if (leadSurrogate = null, codePoint < 128) {
      if ((units -= 1) < 0)
        break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0)
        break;
      bytes.push(
        codePoint >> 6 | 192,
        codePoint & 63 | 128
      );
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0)
        break;
      bytes.push(
        codePoint >> 12 | 224,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0)
        break;
      bytes.push(
        codePoint >> 18 | 240,
        codePoint >> 12 & 63 | 128,
        codePoint >> 6 & 63 | 128,
        codePoint & 63 | 128
      );
    } else
      throw new Error("Invalid code point");
  }
  return bytes;
}
function asciiToBytes(str) {
  for (var byteArray = [], i = 0; i < str.length; ++i)
    byteArray.push(str.charCodeAt(i) & 255);
  return byteArray;
}
function utf16leToBytes(str, units) {
  for (var c, hi, lo, byteArray = [], i = 0; i < str.length && !((units -= 2) < 0); ++i)
    c = str.charCodeAt(i), hi = c >> 8, lo = c % 256, byteArray.push(lo), byteArray.push(hi);
  return byteArray;
}
function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length && !(i + offset >= dst.length || i >= src.length); ++i)
    dst[i + offset] = src[i];
  return i;
}
function isnan(val) {
  return val !== val;
}
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}
function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer == "function" && obj.constructor.isBuffer(obj);
}
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE == "function" && typeof obj.slice == "function" && isFastBuffer(obj.slice(0, 0));
}
var lookup, revLookup, Arr, inited, toString, isArray2, INSPECT_MAX_BYTES, _kMaxLength, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE, init_buffer = __esm({
  "node-modules-polyfills:buffer"() {
    lookup = [], revLookup = [], Arr = typeof Uint8Array < "u" ? Uint8Array : Array, inited = !1;
    toString = {}.toString, isArray2 = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
    INSPECT_MAX_BYTES = 50;
    Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : !0;
    _kMaxLength = kMaxLength();
    Buffer2.poolSize = 8192;
    Buffer2._augment = function(arr) {
      return arr.__proto__ = Buffer2.prototype, arr;
    };
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    Buffer2.TYPED_ARRAY_SUPPORT && (Buffer2.prototype.__proto__ = Uint8Array.prototype, Buffer2.__proto__ = Uint8Array);
    Buffer2.alloc = function(size, fill2, encoding) {
      return alloc(null, size, fill2, encoding);
    };
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer2.isBuffer = isBuffer;
    Buffer2.compare = function(a, b) {
      if (!internalIsBuffer(a) || !internalIsBuffer(b))
        throw new TypeError("Arguments must be Buffers");
      if (a === b)
        return 0;
      for (var x = a.length, y = b.length, i = 0, len = Math.min(x, y); i < len; ++i)
        if (a[i] !== b[i]) {
          x = a[i], y = b[i];
          break;
        }
      return x < y ? -1 : y < x ? 1 : 0;
    };
    Buffer2.isEncoding = function(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    };
    Buffer2.concat = function(list, length) {
      if (!isArray2(list))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (list.length === 0)
        return Buffer2.alloc(0);
      var i;
      if (length === void 0)
        for (length = 0, i = 0; i < list.length; ++i)
          length += list[i].length;
      var buffer = Buffer2.allocUnsafe(length), pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!internalIsBuffer(buf))
          throw new TypeError('"list" argument must be an Array of Buffers');
        buf.copy(buffer, pos), pos += buf.length;
      }
      return buffer;
    };
    Buffer2.byteLength = byteLength;
    Buffer2.prototype._isBuffer = !0;
    Buffer2.prototype.swap16 = function() {
      var len = this.length;
      if (len % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var i = 0; i < len; i += 2)
        swap(this, i, i + 1);
      return this;
    };
    Buffer2.prototype.swap32 = function() {
      var len = this.length;
      if (len % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var i = 0; i < len; i += 4)
        swap(this, i, i + 3), swap(this, i + 1, i + 2);
      return this;
    };
    Buffer2.prototype.swap64 = function() {
      var len = this.length;
      if (len % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var i = 0; i < len; i += 8)
        swap(this, i, i + 7), swap(this, i + 1, i + 6), swap(this, i + 2, i + 5), swap(this, i + 3, i + 4);
      return this;
    };
    Buffer2.prototype.toString = function() {
      var length = this.length | 0;
      return length === 0 ? "" : arguments.length === 0 ? utf8Slice(this, 0, length) : slowToString.apply(this, arguments);
    };
    Buffer2.prototype.equals = function(b) {
      if (!internalIsBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      return this === b ? !0 : Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function() {
      var str = "", max = INSPECT_MAX_BYTES;
      return this.length > 0 && (str = this.toString("hex", 0, max).match(/.{2}/g).join(" "), this.length > max && (str += " ... ")), "<Buffer " + str + ">";
    };
    Buffer2.prototype.compare = function(target, start, end, thisStart, thisEnd) {
      if (!internalIsBuffer(target))
        throw new TypeError("Argument must be a Buffer");
      if (start === void 0 && (start = 0), end === void 0 && (end = target ? target.length : 0), thisStart === void 0 && (thisStart = 0), thisEnd === void 0 && (thisEnd = this.length), start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length)
        throw new RangeError("out of range index");
      if (thisStart >= thisEnd && start >= end)
        return 0;
      if (thisStart >= thisEnd)
        return -1;
      if (start >= end)
        return 1;
      if (start >>>= 0, end >>>= 0, thisStart >>>= 0, thisEnd >>>= 0, this === target)
        return 0;
      for (var x = thisEnd - thisStart, y = end - start, len = Math.min(x, y), thisCopy = this.slice(thisStart, thisEnd), targetCopy = target.slice(start, end), i = 0; i < len; ++i)
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i], y = targetCopy[i];
          break;
        }
      return x < y ? -1 : y < x ? 1 : 0;
    };
    Buffer2.prototype.includes = function(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, !0);
    };
    Buffer2.prototype.lastIndexOf = function(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, !1);
    };
    Buffer2.prototype.write = function(string, offset, length, encoding) {
      if (offset === void 0)
        encoding = "utf8", length = this.length, offset = 0;
      else if (length === void 0 && typeof offset == "string")
        encoding = offset, length = this.length, offset = 0;
      else if (isFinite(offset))
        offset = offset | 0, isFinite(length) ? (length = length | 0, encoding === void 0 && (encoding = "utf8")) : (encoding = length, length = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var remaining = this.length - offset;
      if ((length === void 0 || length > remaining) && (length = remaining), string.length > 0 && (length < 0 || offset < 0) || offset > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      encoding || (encoding = "utf8");
      for (var loweredCase = !1; ; )
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase(), loweredCase = !0;
        }
    };
    Buffer2.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    MAX_ARGUMENTS_LENGTH = 4096;
    Buffer2.prototype.slice = function(start, end) {
      var len = this.length;
      start = ~~start, end = end === void 0 ? len : ~~end, start < 0 ? (start += len, start < 0 && (start = 0)) : start > len && (start = len), end < 0 ? (end += len, end < 0 && (end = 0)) : end > len && (end = len), end < start && (end = start);
      var newBuf;
      if (Buffer2.TYPED_ARRAY_SUPPORT)
        newBuf = this.subarray(start, end), newBuf.__proto__ = Buffer2.prototype;
      else {
        var sliceLen = end - start;
        newBuf = new Buffer2(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i)
          newBuf[i] = this[i + start];
      }
      return newBuf;
    };
    Buffer2.prototype.readUIntLE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var val = this[offset], mul = 1, i = 0; ++i < byteLength2 && (mul *= 256); )
        val += this[offset + i] * mul;
      return val;
    };
    Buffer2.prototype.readUIntBE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var val = this[offset + --byteLength2], mul = 1; byteLength2 > 0 && (mul *= 256); )
        val += this[offset + --byteLength2] * mul;
      return val;
    };
    Buffer2.prototype.readUInt8 = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 1, this.length), this[offset];
    };
    Buffer2.prototype.readUInt16LE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 2, this.length), this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUInt16BE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 2, this.length), this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUInt32LE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUInt32BE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var val = this[offset], mul = 1, i = 0; ++i < byteLength2 && (mul *= 256); )
        val += this[offset + i] * mul;
      return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength2)), val;
    };
    Buffer2.prototype.readIntBE = function(offset, byteLength2, noAssert) {
      offset = offset | 0, byteLength2 = byteLength2 | 0, noAssert || checkOffset(offset, byteLength2, this.length);
      for (var i = byteLength2, mul = 1, val = this[offset + --i]; i > 0 && (mul *= 256); )
        val += this[offset + --i] * mul;
      return mul *= 128, val >= mul && (val -= Math.pow(2, 8 * byteLength2)), val;
    };
    Buffer2.prototype.readInt8 = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 1, this.length), this[offset] & 128 ? (255 - this[offset] + 1) * -1 : this[offset];
    };
    Buffer2.prototype.readInt16LE = function(offset, noAssert) {
      noAssert || checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function(offset, noAssert) {
      noAssert || checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), read(this, offset, !0, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 4, this.length), read(this, offset, !1, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 8, this.length), read(this, offset, !0, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function(offset, noAssert) {
      return noAssert || checkOffset(offset, 8, this.length), read(this, offset, !1, 52, 8);
    };
    Buffer2.prototype.writeUIntLE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, byteLength2 = byteLength2 | 0, !noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1, i = 0;
      for (this[offset] = value & 255; ++i < byteLength2 && (mul *= 256); )
        this[offset + i] = value / mul & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUIntBE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, byteLength2 = byteLength2 | 0, !noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1, mul = 1;
      for (this[offset + i] = value & 255; --i >= 0 && (mul *= 256); )
        this[offset + i] = value / mul & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUInt8 = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 1, 255, 0), Buffer2.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), this[offset] = value & 255, offset + 1;
    };
    Buffer2.prototype.writeUInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value & 255, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), offset + 2;
    };
    Buffer2.prototype.writeUInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 65535, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value & 255) : objectWriteUInt16(this, value, offset, !1), offset + 2;
    };
    Buffer2.prototype.writeUInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset + 3] = value >>> 24, this[offset + 2] = value >>> 16, this[offset + 1] = value >>> 8, this[offset] = value & 255) : objectWriteUInt32(this, value, offset, !0), offset + 4;
    };
    Buffer2.prototype.writeUInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 4294967295, 0), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value & 255) : objectWriteUInt32(this, value, offset, !1), offset + 4;
    };
    Buffer2.prototype.writeIntLE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, !noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0, mul = 1, sub = 0;
      for (this[offset] = value & 255; ++i < byteLength2 && (mul *= 256); )
        value < 0 && sub === 0 && this[offset + i - 1] !== 0 && (sub = 1), this[offset + i] = (value / mul >> 0) - sub & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function(value, offset, byteLength2, noAssert) {
      if (value = +value, offset = offset | 0, !noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1, mul = 1, sub = 0;
      for (this[offset + i] = value & 255; --i >= 0 && (mul *= 256); )
        value < 0 && sub === 0 && this[offset + i + 1] !== 0 && (sub = 1), this[offset + i] = (value / mul >> 0) - sub & 255;
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 1, 127, -128), Buffer2.TYPED_ARRAY_SUPPORT || (value = Math.floor(value)), value < 0 && (value = 255 + value + 1), this[offset] = value & 255, offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value & 255, this[offset + 1] = value >>> 8) : objectWriteUInt16(this, value, offset, !0), offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 2, 32767, -32768), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 8, this[offset + 1] = value & 255) : objectWriteUInt16(this, value, offset, !1), offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value & 255, this[offset + 1] = value >>> 8, this[offset + 2] = value >>> 16, this[offset + 3] = value >>> 24) : objectWriteUInt32(this, value, offset, !0), offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function(value, offset, noAssert) {
      return value = +value, offset = offset | 0, noAssert || checkInt(this, value, offset, 4, 2147483647, -2147483648), value < 0 && (value = 4294967295 + value + 1), Buffer2.TYPED_ARRAY_SUPPORT ? (this[offset] = value >>> 24, this[offset + 1] = value >>> 16, this[offset + 2] = value >>> 8, this[offset + 3] = value & 255) : objectWriteUInt32(this, value, offset, !1), offset + 4;
    };
    Buffer2.prototype.writeFloatLE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, !0, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function(value, offset, noAssert) {
      return writeFloat(this, value, offset, !1, noAssert);
    };
    Buffer2.prototype.writeDoubleLE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, !0, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function(value, offset, noAssert) {
      return writeDouble(this, value, offset, !1, noAssert);
    };
    Buffer2.prototype.copy = function(target, targetStart, start, end) {
      if (start || (start = 0), !end && end !== 0 && (end = this.length), targetStart >= target.length && (targetStart = target.length), targetStart || (targetStart = 0), end > 0 && end < start && (end = start), end === start || target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0)
        throw new RangeError("targetStart out of bounds");
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      end > this.length && (end = this.length), target.length - targetStart < end - start && (end = target.length - targetStart + start);
      var len = end - start, i;
      if (this === target && start < targetStart && targetStart < end)
        for (i = len - 1; i >= 0; --i)
          target[i + targetStart] = this[i + start];
      else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT)
        for (i = 0; i < len; ++i)
          target[i + targetStart] = this[i + start];
      else
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, start + len),
          targetStart
        );
      return len;
    };
    Buffer2.prototype.fill = function(val, start, end, encoding) {
      if (typeof val == "string") {
        if (typeof start == "string" ? (encoding = start, start = 0, end = this.length) : typeof end == "string" && (encoding = end, end = this.length), val.length === 1) {
          var code = val.charCodeAt(0);
          code < 256 && (val = code);
        }
        if (encoding !== void 0 && typeof encoding != "string")
          throw new TypeError("encoding must be a string");
        if (typeof encoding == "string" && !Buffer2.isEncoding(encoding))
          throw new TypeError("Unknown encoding: " + encoding);
      } else
        typeof val == "number" && (val = val & 255);
      if (start < 0 || this.length < start || this.length < end)
        throw new RangeError("Out of range index");
      if (end <= start)
        return this;
      start = start >>> 0, end = end === void 0 ? this.length : end >>> 0, val || (val = 0);
      var i;
      if (typeof val == "number")
        for (i = start; i < end; ++i)
          this[i] = val;
      else {
        var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString()), len = bytes.length;
        for (i = 0; i < end - start; ++i)
          this[i + start] = bytes[i % len];
      }
      return this;
    };
    INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js
function BufferList() {
  this.head = null, this.tail = null, this.length = 0;
}
var buffer_list_default, init_buffer_list = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/buffer-list.js"() {
    init_buffer();
    buffer_list_default = BufferList;
    BufferList.prototype.push = function(v) {
      var entry2 = { data: v, next: null };
      this.length > 0 ? this.tail.next = entry2 : this.head = entry2, this.tail = entry2, ++this.length;
    };
    BufferList.prototype.unshift = function(v) {
      var entry2 = { data: v, next: this.head };
      this.length === 0 && (this.tail = entry2), this.head = entry2, ++this.length;
    };
    BufferList.prototype.shift = function() {
      if (this.length !== 0) {
        var ret = this.head.data;
        return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, ret;
      }
    };
    BufferList.prototype.clear = function() {
      this.head = this.tail = null, this.length = 0;
    };
    BufferList.prototype.join = function(s) {
      if (this.length === 0)
        return "";
      for (var p = this.head, ret = "" + p.data; p = p.next; )
        ret += s + p.data;
      return ret;
    };
    BufferList.prototype.concat = function(n) {
      if (this.length === 0)
        return Buffer2.alloc(0);
      if (this.length === 1)
        return this.head.data;
      for (var ret = Buffer2.allocUnsafe(n >>> 0), p = this.head, i = 0; p; )
        p.data.copy(ret, i), i += p.data.length, p = p.next;
      return ret;
    };
  }
});

// node-modules-polyfills:string_decoder
function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding))
    throw new Error("Unknown encoding: " + encoding);
}
function StringDecoder(encoding) {
  switch (this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, ""), assertEncoding(encoding), this.encoding) {
    case "utf8":
      this.surrogateSize = 3;
      break;
    case "ucs2":
    case "utf16le":
      this.surrogateSize = 2, this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case "base64":
      this.surrogateSize = 3, this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }
  this.charBuffer = new Buffer2(6), this.charReceived = 0, this.charLength = 0;
}
function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}
function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2, this.charLength = this.charReceived ? 2 : 0;
}
function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3, this.charLength = this.charReceived ? 3 : 0;
}
var isBufferEncoding, init_string_decoder = __esm({
  "node-modules-polyfills:string_decoder"() {
    init_buffer();
    isBufferEncoding = Buffer2.isEncoding || function(encoding) {
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return !0;
        default:
          return !1;
      }
    };
    StringDecoder.prototype.write = function(buffer) {
      for (var charStr = ""; this.charLength; ) {
        var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
        if (buffer.copy(this.charBuffer, this.charReceived, 0, available), this.charReceived += available, this.charReceived < this.charLength)
          return "";
        buffer = buffer.slice(available, buffer.length), charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
        var charCode = charStr.charCodeAt(charStr.length - 1);
        if (charCode >= 55296 && charCode <= 56319) {
          this.charLength += this.surrogateSize, charStr = "";
          continue;
        }
        if (this.charReceived = this.charLength = 0, buffer.length === 0)
          return charStr;
        break;
      }
      this.detectIncompleteChar(buffer);
      var end = buffer.length;
      this.charLength && (buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end), end -= this.charReceived), charStr += buffer.toString(this.encoding, 0, end);
      var end = charStr.length - 1, charCode = charStr.charCodeAt(end);
      if (charCode >= 55296 && charCode <= 56319) {
        var size = this.surrogateSize;
        return this.charLength += size, this.charReceived += size, this.charBuffer.copy(this.charBuffer, size, 0, size), buffer.copy(this.charBuffer, 0, 0, size), charStr.substring(0, end);
      }
      return charStr;
    };
    StringDecoder.prototype.detectIncompleteChar = function(buffer) {
      for (var i = buffer.length >= 3 ? 3 : buffer.length; i > 0; i--) {
        var c = buffer[buffer.length - i];
        if (i == 1 && c >> 5 == 6) {
          this.charLength = 2;
          break;
        }
        if (i <= 2 && c >> 4 == 14) {
          this.charLength = 3;
          break;
        }
        if (i <= 3 && c >> 3 == 30) {
          this.charLength = 4;
          break;
        }
      }
      this.charReceived = i;
    };
    StringDecoder.prototype.end = function(buffer) {
      var res = "";
      if (buffer && buffer.length && (res = this.write(buffer)), this.charReceived) {
        var cr = this.charReceived, buf = this.charBuffer, enc = this.encoding;
        res += buf.slice(0, cr).toString(enc);
      }
      return res;
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js
function prependListener2(emitter, event, fn) {
  if (typeof emitter.prependListener == "function")
    return emitter.prependListener(event, fn);
  !emitter._events || !emitter._events[event] ? emitter.on(event, fn) : Array.isArray(emitter._events[event]) ? emitter._events[event].unshift(fn) : emitter._events[event] = [fn, emitter._events[event]];
}
function listenerCount2(emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {
  options = options || {}, this.objectMode = !!options.objectMode, stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.readableObjectMode);
  var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm, this.highWaterMark = ~~this.highWaterMark, this.buffer = new buffer_list_default(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.defaultEncoding = options.defaultEncoding || "utf8", this.ranOut = !1, this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, options.encoding && (this.decoder = new StringDecoder(options.encoding), this.encoding = options.encoding);
}
function Readable(options) {
  if (!(this instanceof Readable))
    return new Readable(options);
  this._readableState = new ReadableState(options, this), this.readable = !0, options && typeof options.read == "function" && (this._read = options.read), events_default.call(this);
}
function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er)
    stream.emit("error", er);
  else if (chunk === null)
    state.reading = !1, onEofChunk(stream, state);
  else if (state.objectMode || chunk && chunk.length > 0)
    if (state.ended && !addToFront) {
      var e = new Error("stream.push() after EOF");
      stream.emit("error", e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error("stream.unshift() after end event");
      stream.emit("error", _e);
    } else {
      var skipAdd;
      state.decoder && !addToFront && !encoding && (chunk = state.decoder.write(chunk), skipAdd = !state.objectMode && chunk.length === 0), addToFront || (state.reading = !1), skipAdd || (state.flowing && state.length === 0 && !state.sync ? (stream.emit("data", chunk), stream.read(0)) : (state.length += state.objectMode ? 1 : chunk.length, addToFront ? state.buffer.unshift(chunk) : state.buffer.push(chunk), state.needReadable && emitReadable(stream))), maybeReadMore(stream, state);
    }
  else
    addToFront || (state.reading = !1);
  return needMoreData(state);
}
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}
function computeNewHighWaterMark(n) {
  return n >= MAX_HWM ? n = MAX_HWM : (n--, n |= n >>> 1, n |= n >>> 2, n |= n >>> 4, n |= n >>> 8, n |= n >>> 16, n++), n;
}
function howMuchToRead(n, state) {
  return n <= 0 || state.length === 0 && state.ended ? 0 : state.objectMode ? 1 : n !== n ? state.flowing && state.length ? state.buffer.head.data.length : state.length : (n > state.highWaterMark && (state.highWaterMark = computeNewHighWaterMark(n)), n <= state.length ? n : state.ended ? state.length : (state.needReadable = !0, 0));
}
function chunkInvalid(state, chunk) {
  var er = null;
  return !Buffer.isBuffer(chunk) && typeof chunk != "string" && chunk !== null && chunk !== void 0 && !state.objectMode && (er = new TypeError("Invalid non-string/buffer chunk")), er;
}
function onEofChunk(stream, state) {
  if (!state.ended) {
    if (state.decoder) {
      var chunk = state.decoder.end();
      chunk && chunk.length && (state.buffer.push(chunk), state.length += state.objectMode ? 1 : chunk.length);
    }
    state.ended = !0, emitReadable(stream);
  }
}
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = !1, state.emittedReadable || (debug("emitReadable", state.flowing), state.emittedReadable = !0, state.sync ? nextTick(emitReadable_, stream) : emitReadable_(stream));
}
function emitReadable_(stream) {
  debug("emit readable"), stream.emit("readable"), flow(stream);
}
function maybeReadMore(stream, state) {
  state.readingMore || (state.readingMore = !0, nextTick(maybeReadMore_, stream, state));
}
function maybeReadMore_(stream, state) {
  for (var len = state.length; !state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark && (debug("maybeReadMore read 0"), stream.read(0), len !== state.length); )
    len = state.length;
  state.readingMore = !1;
}
function pipeOnDrain(src) {
  return function() {
    var state = src._readableState;
    debug("pipeOnDrain", state.awaitDrain), state.awaitDrain && state.awaitDrain--, state.awaitDrain === 0 && src.listeners("data").length && (state.flowing = !0, flow(src));
  };
}
function nReadingNextTick(self) {
  debug("readable nexttick read 0"), self.read(0);
}
function resume(stream, state) {
  state.resumeScheduled || (state.resumeScheduled = !0, nextTick(resume_, stream, state));
}
function resume_(stream, state) {
  state.reading || (debug("resume read 0"), stream.read(0)), state.resumeScheduled = !1, state.awaitDrain = 0, stream.emit("resume"), flow(stream), state.flowing && !state.reading && stream.read(0);
}
function flow(stream) {
  var state = stream._readableState;
  for (debug("flow", state.flowing); state.flowing && stream.read() !== null; )
    ;
}
function fromList(n, state) {
  if (state.length === 0)
    return null;
  var ret;
  return state.objectMode ? ret = state.buffer.shift() : !n || n >= state.length ? (state.decoder ? ret = state.buffer.join("") : state.buffer.length === 1 ? ret = state.buffer.head.data : ret = state.buffer.concat(state.length), state.buffer.clear()) : ret = fromListPartial(n, state.buffer, state.decoder), ret;
}
function fromListPartial(n, list, hasStrings) {
  var ret;
  return n < list.head.data.length ? (ret = list.head.data.slice(0, n), list.head.data = list.head.data.slice(n)) : n === list.head.data.length ? ret = list.shift() : ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list), ret;
}
function copyFromBufferString(n, list) {
  var p = list.head, c = 1, ret = p.data;
  for (n -= ret.length; p = p.next; ) {
    var str = p.data, nb = n > str.length ? str.length : n;
    if (nb === str.length ? ret += str : ret += str.slice(0, n), n -= nb, n === 0) {
      nb === str.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, p.data = str.slice(nb));
      break;
    }
    ++c;
  }
  return list.length -= c, ret;
}
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n), p = list.head, c = 1;
  for (p.data.copy(ret), n -= p.data.length; p = p.next; ) {
    var buf = p.data, nb = n > buf.length ? buf.length : n;
    if (buf.copy(ret, ret.length - n, 0, nb), n -= nb, n === 0) {
      nb === buf.length ? (++c, p.next ? list.head = p.next : list.head = list.tail = null) : (list.head = p, p.data = buf.slice(nb));
      break;
    }
    ++c;
  }
  return list.length -= c, ret;
}
function endReadable(stream) {
  var state = stream._readableState;
  if (state.length > 0)
    throw new Error('"endReadable()" called on non-empty stream');
  state.endEmitted || (state.ended = !0, nextTick(endReadableNT, state, stream));
}
function endReadableNT(state, stream) {
  !state.endEmitted && state.length === 0 && (state.endEmitted = !0, stream.readable = !1, stream.emit("end"));
}
function forEach(xs, f2) {
  for (var i = 0, l = xs.length; i < l; i++)
    f2(xs[i], i);
}
function indexOf2(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++)
    if (xs[i] === x)
      return i;
  return -1;
}
var debug, MAX_HWM, init_readable = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js"() {
    "use strict";
    init_events();
    init_util();
    init_buffer_list();
    init_string_decoder();
    init_duplex();
    init_process();
    Readable.ReadableState = ReadableState;
    debug = debuglog("stream");
    inherits_default(Readable, events_default);
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      return !state.objectMode && typeof chunk == "string" && (encoding = encoding || state.defaultEncoding, encoding !== state.encoding && (chunk = Buffer.from(chunk, encoding), encoding = "")), readableAddChunk(this, state, chunk, encoding, !1);
    };
    Readable.prototype.unshift = function(chunk) {
      var state = this._readableState;
      return readableAddChunk(this, state, chunk, "", !0);
    };
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === !1;
    };
    Readable.prototype.setEncoding = function(enc) {
      return this._readableState.decoder = new StringDecoder(enc), this._readableState.encoding = enc, this;
    };
    MAX_HWM = 8388608;
    Readable.prototype.read = function(n) {
      debug("read", n), n = parseInt(n, 10);
      var state = this._readableState, nOrig = n;
      if (n !== 0 && (state.emittedReadable = !1), n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended))
        return debug("read: emitReadable", state.length, state.ended), state.length === 0 && state.ended ? endReadable(this) : emitReadable(this), null;
      if (n = howMuchToRead(n, state), n === 0 && state.ended)
        return state.length === 0 && endReadable(this), null;
      var doRead = state.needReadable;
      debug("need readable", doRead), (state.length === 0 || state.length - n < state.highWaterMark) && (doRead = !0, debug("length less than watermark", doRead)), state.ended || state.reading ? (doRead = !1, debug("reading or ended", doRead)) : doRead && (debug("do read"), state.reading = !0, state.sync = !0, state.length === 0 && (state.needReadable = !0), this._read(state.highWaterMark), state.sync = !1, state.reading || (n = howMuchToRead(nOrig, state)));
      var ret;
      return n > 0 ? ret = fromList(n, state) : ret = null, ret === null ? (state.needReadable = !0, n = 0) : state.length -= n, state.length === 0 && (state.ended || (state.needReadable = !0), nOrig !== n && state.ended && endReadable(this)), ret !== null && this.emit("data", ret), ret;
    };
    Readable.prototype._read = function(n) {
      this.emit("error", new Error("not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this, state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1, debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = !pipeOpts || pipeOpts.end !== !1, endFn = doEnd ? onend2 : cleanup;
      state.endEmitted ? nextTick(endFn) : src.once("end", endFn), dest.on("unpipe", onunpipe);
      function onunpipe(readable) {
        debug("onunpipe"), readable === src && cleanup();
      }
      function onend2() {
        debug("onend"), dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = !1;
      function cleanup() {
        debug("cleanup"), dest.removeListener("close", onclose), dest.removeListener("finish", onfinish), dest.removeListener("drain", ondrain), dest.removeListener("error", onerror), dest.removeListener("unpipe", onunpipe), src.removeListener("end", onend2), src.removeListener("end", cleanup), src.removeListener("data", ondata), cleanedUp = !0, state.awaitDrain && (!dest._writableState || dest._writableState.needDrain) && ondrain();
      }
      var increasedAwaitDrain = !1;
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata"), increasedAwaitDrain = !1;
        var ret = dest.write(chunk);
        ret === !1 && !increasedAwaitDrain && ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf2(state.pipes, dest) !== -1) && !cleanedUp && (debug("false write response, pause", src._readableState.awaitDrain), src._readableState.awaitDrain++, increasedAwaitDrain = !0), src.pause());
      }
      function onerror(er) {
        debug("onerror", er), unpipe(), dest.removeListener("error", onerror), listenerCount2(dest, "error") === 0 && dest.emit("error", er);
      }
      prependListener2(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish), unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish"), dest.removeListener("close", onclose), unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe"), src.unpipe(dest);
      }
      return dest.emit("pipe", src), state.flowing || (debug("pipe resume"), src.resume()), dest;
    };
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1)
        return dest && dest !== state.pipes ? this : (dest || (dest = state.pipes), state.pipes = null, state.pipesCount = 0, state.flowing = !1, dest && dest.emit("unpipe", this), this);
      if (!dest) {
        var dests = state.pipes, len = state.pipesCount;
        state.pipes = null, state.pipesCount = 0, state.flowing = !1;
        for (var _i = 0; _i < len; _i++)
          dests[_i].emit("unpipe", this);
        return this;
      }
      var i = indexOf2(state.pipes, dest);
      return i === -1 ? this : (state.pipes.splice(i, 1), state.pipesCount -= 1, state.pipesCount === 1 && (state.pipes = state.pipes[0]), dest.emit("unpipe", this), this);
    };
    Readable.prototype.on = function(ev, fn) {
      var res = events_default.prototype.on.call(this, ev, fn);
      if (ev === "data")
        this._readableState.flowing !== !1 && this.resume();
      else if (ev === "readable") {
        var state = this._readableState;
        !state.endEmitted && !state.readableListening && (state.readableListening = state.needReadable = !0, state.emittedReadable = !1, state.reading ? state.length && emitReadable(this, state) : nextTick(nReadingNextTick, this));
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.resume = function() {
      var state = this._readableState;
      return state.flowing || (debug("resume"), state.flowing = !0, resume(this, state)), this;
    };
    Readable.prototype.pause = function() {
      return debug("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (debug("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
    };
    Readable.prototype.wrap = function(stream) {
      var state = this._readableState, paused = !1, self = this;
      stream.on("end", function() {
        if (debug("wrapped end"), state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          chunk && chunk.length && self.push(chunk);
        }
        self.push(null);
      }), stream.on("data", function(chunk) {
        if (debug("wrapped data"), state.decoder && (chunk = state.decoder.write(chunk)), !(state.objectMode && chunk == null) && !(!state.objectMode && (!chunk || !chunk.length))) {
          var ret = self.push(chunk);
          ret || (paused = !0, stream.pause());
        }
      });
      for (var i in stream)
        this[i] === void 0 && typeof stream[i] == "function" && (this[i] = function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        }(i));
      var events = ["error", "close", "destroy", "pause", "resume"];
      return forEach(events, function(ev) {
        stream.on(ev, self.emit.bind(self, ev));
      }), self._read = function(n) {
        debug("wrapped _read", n), paused && (paused = !1, stream.resume());
      }, self;
    };
    Readable._fromList = fromList;
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js
function nop() {
}
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk, this.encoding = encoding, this.callback = cb, this.next = null;
}
function WritableState(options, stream) {
  Object.defineProperty(this, "buffer", {
    get: deprecate(function() {
      return this.getBuffer();
    }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.")
  }), options = options || {}, this.objectMode = !!options.objectMode, stream instanceof Duplex && (this.objectMode = this.objectMode || !!options.writableObjectMode);
  var hwm = options.highWaterMark, defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm, this.highWaterMark = ~~this.highWaterMark, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1;
  var noDecode = options.decodeStrings === !1;
  this.decodeStrings = !noDecode, this.defaultEncoding = options.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(er) {
    onwrite(stream, er);
  }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new CorkedRequest(this);
}
function Writable(options) {
  if (!(this instanceof Writable) && !(this instanceof Duplex))
    return new Writable(options);
  this._writableState = new WritableState(options, this), this.writable = !0, options && (typeof options.write == "function" && (this._write = options.write), typeof options.writev == "function" && (this._writev = options.writev)), EventEmitter.call(this);
}
function writeAfterEnd(stream, cb) {
  var er = new Error("write after end");
  stream.emit("error", er), nextTick(cb, er);
}
function validChunk(stream, state, chunk, cb) {
  var valid = !0, er = !1;
  return chunk === null ? er = new TypeError("May not write null values to stream") : !Buffer2.isBuffer(chunk) && typeof chunk != "string" && chunk !== void 0 && !state.objectMode && (er = new TypeError("Invalid non-string/buffer chunk")), er && (stream.emit("error", er), nextTick(cb, er), valid = !1), valid;
}
function decodeChunk(state, chunk, encoding) {
  return !state.objectMode && state.decodeStrings !== !1 && typeof chunk == "string" && (chunk = Buffer2.from(chunk, encoding)), chunk;
}
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding), Buffer2.isBuffer(chunk) && (encoding = "buffer");
  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark;
  if (ret || (state.needDrain = !0), state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb), last ? last.next = state.lastBufferedRequest : state.bufferedRequest = state.lastBufferedRequest, state.bufferedRequestCount += 1;
  } else
    doWrite(stream, state, !1, len, chunk, encoding, cb);
  return ret;
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len, state.writecb = cb, state.writing = !0, state.sync = !0, writev ? stream._writev(chunk, state.onwrite) : stream._write(chunk, encoding, state.onwrite), state.sync = !1;
}
function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb, sync ? nextTick(cb, er) : cb(er), stream._writableState.errorEmitted = !0, stream.emit("error", er);
}
function onwriteStateUpdate(state) {
  state.writing = !1, state.writecb = null, state.length -= state.writelen, state.writelen = 0;
}
function onwrite(stream, er) {
  var state = stream._writableState, sync = state.sync, cb = state.writecb;
  if (onwriteStateUpdate(state), er)
    onwriteError(stream, state, sync, er, cb);
  else {
    var finished = needFinish(state);
    !finished && !state.corked && !state.bufferProcessing && state.bufferedRequest && clearBuffer(stream, state), sync ? nextTick(afterWrite, stream, state, finished, cb) : afterWrite(stream, state, finished, cb);
  }
}
function afterWrite(stream, state, finished, cb) {
  finished || onwriteDrain(stream, state), state.pendingcb--, cb(), finishMaybe(stream, state);
}
function onwriteDrain(stream, state) {
  state.length === 0 && state.needDrain && (state.needDrain = !1, stream.emit("drain"));
}
function clearBuffer(stream, state) {
  state.bufferProcessing = !0;
  var entry2 = state.bufferedRequest;
  if (stream._writev && entry2 && entry2.next) {
    var l = state.bufferedRequestCount, buffer = new Array(l), holder = state.corkedRequestsFree;
    holder.entry = entry2;
    for (var count = 0; entry2; )
      buffer[count] = entry2, entry2 = entry2.next, count += 1;
    doWrite(stream, state, !0, state.length, buffer, "", holder.finish), state.pendingcb++, state.lastBufferedRequest = null, holder.next ? (state.corkedRequestsFree = holder.next, holder.next = null) : state.corkedRequestsFree = new CorkedRequest(state);
  } else {
    for (; entry2; ) {
      var chunk = entry2.chunk, encoding = entry2.encoding, cb = entry2.callback, len = state.objectMode ? 1 : chunk.length;
      if (doWrite(stream, state, !1, len, chunk, encoding, cb), entry2 = entry2.next, state.writing)
        break;
    }
    entry2 === null && (state.lastBufferedRequest = null);
  }
  state.bufferedRequestCount = 0, state.bufferedRequest = entry2, state.bufferProcessing = !1;
}
function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function prefinish(stream, state) {
  state.prefinished || (state.prefinished = !0, stream.emit("prefinish"));
}
function finishMaybe(stream, state) {
  var need = needFinish(state);
  return need && (state.pendingcb === 0 ? (prefinish(stream, state), state.finished = !0, stream.emit("finish")) : prefinish(stream, state)), need;
}
function endWritable(stream, state, cb) {
  state.ending = !0, finishMaybe(stream, state), cb && (state.finished ? nextTick(cb) : stream.once("finish", cb)), state.ended = !0, stream.writable = !1;
}
function CorkedRequest(state) {
  var _this = this;
  this.next = null, this.entry = null, this.finish = function(err) {
    var entry2 = _this.entry;
    for (_this.entry = null; entry2; ) {
      var cb = entry2.callback;
      state.pendingcb--, cb(err), entry2 = entry2.next;
    }
    state.corkedRequestsFree ? state.corkedRequestsFree.next = _this : state.corkedRequestsFree = _this;
  };
}
var init_writable = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/writable.js"() {
    init_util();
    init_buffer();
    init_events();
    init_duplex();
    init_process();
    Writable.WritableState = WritableState;
    inherits_default(Writable, EventEmitter);
    WritableState.prototype.getBuffer = function() {
      for (var current = this.bufferedRequest, out = []; current; )
        out.push(current), current = current.next;
      return out;
    };
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe, not readable"));
    };
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState, ret = !1;
      return typeof encoding == "function" && (cb = encoding, encoding = null), Buffer2.isBuffer(chunk) ? encoding = "buffer" : encoding || (encoding = state.defaultEncoding), typeof cb != "function" && (cb = nop), state.ended ? writeAfterEnd(this, cb) : validChunk(this, state, chunk, cb) && (state.pendingcb++, ret = writeOrBuffer(this, state, chunk, encoding, cb)), ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      state.corked && (state.corked--, !state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest && clearBuffer(this, state));
    };
    Writable.prototype.setDefaultEncoding = function(encoding) {
      if (typeof encoding == "string" && (encoding = encoding.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new TypeError("Unknown encoding: " + encoding);
      return this._writableState.defaultEncoding = encoding, this;
    };
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      typeof chunk == "function" ? (cb = chunk, chunk = null, encoding = null) : typeof encoding == "function" && (cb = encoding, encoding = null), chunk != null && this.write(chunk, encoding), state.corked && (state.corked = 1, this.uncork()), !state.ending && !state.finished && endWritable(this, state, cb);
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js
function Duplex(options) {
  if (!(this instanceof Duplex))
    return new Duplex(options);
  Readable.call(this, options), Writable.call(this, options), options && options.readable === !1 && (this.readable = !1), options && options.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, options && options.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", onend);
}
function onend() {
  this.allowHalfOpen || this._writableState.ended || nextTick(onEndNT, this);
}
function onEndNT(self) {
  self.end();
}
var keys, method, v, init_duplex = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/duplex.js"() {
    init_util();
    init_process();
    init_readable();
    init_writable();
    inherits_default(Duplex, Readable);
    keys = Object.keys(Writable.prototype);
    for (v = 0; v < keys.length; v++)
      method = keys[v], Duplex.prototype[method] || (Duplex.prototype[method] = Writable.prototype[method]);
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js
function TransformState(stream) {
  this.afterTransform = function(er, data) {
    return afterTransform(stream, er, data);
  }, this.needTransform = !1, this.transforming = !1, this.writecb = null, this.writechunk = null, this.writeencoding = null;
}
function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = !1;
  var cb = ts.writecb;
  if (!cb)
    return stream.emit("error", new Error("no writecb in Transform class"));
  ts.writechunk = null, ts.writecb = null, data != null && stream.push(data), cb(er);
  var rs = stream._readableState;
  rs.reading = !1, (rs.needReadable || rs.length < rs.highWaterMark) && stream._read(rs.highWaterMark);
}
function Transform(options) {
  if (!(this instanceof Transform))
    return new Transform(options);
  Duplex.call(this, options), this._transformState = new TransformState(this);
  var stream = this;
  this._readableState.needReadable = !0, this._readableState.sync = !1, options && (typeof options.transform == "function" && (this._transform = options.transform), typeof options.flush == "function" && (this._flush = options.flush)), this.once("prefinish", function() {
    typeof this._flush == "function" ? this._flush(function(er) {
      done(stream, er);
    }) : done(stream);
  });
}
function done(stream, er) {
  if (er)
    return stream.emit("error", er);
  var ws = stream._writableState, ts = stream._transformState;
  if (ws.length)
    throw new Error("Calling transform done when ws.length != 0");
  if (ts.transforming)
    throw new Error("Calling transform done when still transforming");
  return stream.push(null);
}
var init_transform = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/transform.js"() {
    init_duplex();
    init_util();
    inherits_default(Transform, Duplex);
    Transform.prototype.push = function(chunk, encoding) {
      return this._transformState.needTransform = !1, Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("Not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      if (ts.writecb = cb, ts.writechunk = chunk, ts.writeencoding = encoding, !ts.transforming) {
        var rs = this._readableState;
        (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) && this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      ts.writechunk !== null && ts.writecb && !ts.transforming ? (ts.transforming = !0, this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform)) : ts.needTransform = !0;
    };
  }
});

// node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js
function PassThrough(options) {
  if (!(this instanceof PassThrough))
    return new PassThrough(options);
  Transform.call(this, options);
}
var init_passthrough = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough.js"() {
    init_transform();
    init_util();
    inherits_default(PassThrough, Transform);
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node-modules-polyfills:stream
var stream_exports = {};
__export(stream_exports, {
  Duplex: () => Duplex,
  PassThrough: () => PassThrough,
  Readable: () => Readable,
  Stream: () => Stream,
  Transform: () => Transform,
  Writable: () => Writable,
  default: () => stream_default
});
function Stream() {
  events_default.call(this);
}
var stream_default, init_stream = __esm({
  "node-modules-polyfills:stream"() {
    init_events();
    init_util();
    init_duplex();
    init_readable();
    init_writable();
    init_transform();
    init_passthrough();
    inherits_default(Stream, events_default);
    Stream.Readable = Readable;
    Stream.Writable = Writable;
    Stream.Duplex = Duplex;
    Stream.Transform = Transform;
    Stream.PassThrough = PassThrough;
    Stream.Stream = Stream;
    stream_default = Stream;
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        dest.writable && dest.write(chunk) === !1 && source.pause && source.pause();
      }
      source.on("data", ondata);
      function ondrain() {
        source.readable && source.resume && source.resume();
      }
      dest.on("drain", ondrain), !dest._isStdio && (!options || options.end !== !1) && (source.on("end", onend2), source.on("close", onclose));
      var didOnEnd = !1;
      function onend2() {
        didOnEnd || (didOnEnd = !0, dest.end());
      }
      function onclose() {
        didOnEnd || (didOnEnd = !0, typeof dest.destroy == "function" && dest.destroy());
      }
      function onerror(er) {
        if (cleanup(), events_default.listenerCount(this, "error") === 0)
          throw er;
      }
      source.on("error", onerror), dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata), dest.removeListener("drain", ondrain), source.removeListener("end", onend2), source.removeListener("close", onclose), source.removeListener("error", onerror), dest.removeListener("error", onerror), source.removeListener("end", cleanup), source.removeListener("close", cleanup), dest.removeListener("close", cleanup);
      }
      return source.on("end", cleanup), source.on("close", cleanup), dest.on("close", cleanup), dest.emit("pipe", source), dest;
    };
  }
});

// node-modules-polyfills-commonjs:stream
var require_stream = __commonJS({
  "node-modules-polyfills-commonjs:stream"(exports, module) {
    var polyfill = (init_stream(), __toCommonJS(stream_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill)
        module.exports[k] = polyfill[k];
    } else
      polyfill && (module.exports = polyfill);
  }
});

// node_modules/react-dom/cjs/react-dom-server.node.development.js
var require_react_dom_server_node_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React5 = require_react(), _assign = require_object_assign(), stream = require_stream(), ReactVersion = "17.0.2";
      function formatProdErrorMessage(code) {
        for (var url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code, i2 = 1; i2 < arguments.length; i2++)
          url += "&args[]=" + encodeURIComponent(arguments[i2]);
        return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var ReactSharedInternals = React5.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function warn(format2) {
        {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)
            args[_key - 1] = arguments[_key];
          printWarning("warn", format2, args);
        }
      }
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106, REACT_FRAGMENT_TYPE = 60107, REACT_STRICT_MODE_TYPE = 60108, REACT_PROFILER_TYPE = 60114, REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112, REACT_SUSPENSE_TYPE = 60113, REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), REACT_FRAGMENT_TYPE = symbolFor("react.fragment"), REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode"), REACT_PROFILER_TYPE = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), REACT_SUSPENSE_TYPE = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var enableSuspenseServerRenderer = !1, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var didWarnAboutInvalidateContextType;
      didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
      var emptyObject = {};
      Object.freeze(emptyObject);
      function maskContext(type, context) {
        var contextTypes = type.contextTypes;
        if (!contextTypes)
          return emptyObject;
        var maskedContext = {};
        for (var contextName in contextTypes)
          maskedContext[contextName] = context[contextName];
        return maskedContext;
      }
      function checkContextTypes(typeSpecs, values, location) {
        checkPropTypes(typeSpecs, values, location, "Component");
      }
      function validateContextBounds(context, threadID) {
        for (var i2 = context._threadCount | 0; i2 <= threadID; i2++)
          context[i2] = context._currentValue2, context._threadCount = i2 + 1;
      }
      function processContext(type, context, threadID, isClass) {
        if (isClass) {
          var contextType = type.contextType;
          if ("contextType" in type) {
            var isValid = contextType === null || contextType !== void 0 && contextType.$$typeof === REACT_CONTEXT_TYPE && contextType._context === void 0;
            if (!isValid && !didWarnAboutInvalidateContextType.has(type)) {
              didWarnAboutInvalidateContextType.add(type);
              var addendum = "";
              contextType === void 0 ? addendum = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof contextType != "object" ? addendum = " However, it is set to a " + typeof contextType + "." : contextType.$$typeof === REACT_PROVIDER_TYPE ? addendum = " Did you accidentally pass the Context.Provider instead?" : contextType._context !== void 0 ? addendum = " Did you accidentally pass the Context.Consumer instead?" : addendum = " However, it is set to an object with keys {" + Object.keys(contextType).join(", ") + "}.", error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", getComponentName(type) || "Component", addendum);
            }
          }
          if (typeof contextType == "object" && contextType !== null)
            return validateContextBounds(contextType, threadID), contextType[threadID];
          {
            var maskedContext = maskContext(type, context);
            return type.contextTypes && checkContextTypes(type.contextTypes, maskedContext, "context"), maskedContext;
          }
        } else {
          var _maskedContext = maskContext(type, context);
          return type.contextTypes && checkContextTypes(type.contextTypes, _maskedContext, "context"), _maskedContext;
        }
      }
      for (var nextAvailableThreadIDs = new Uint16Array(16), i = 0; i < 15; i++)
        nextAvailableThreadIDs[i] = i + 1;
      nextAvailableThreadIDs[15] = 0;
      function growThreadCountAndReturnNextAvailable() {
        var oldArray = nextAvailableThreadIDs, oldSize = oldArray.length, newSize = oldSize * 2;
        if (!(newSize <= 65536))
          throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
        var newArray = new Uint16Array(newSize);
        newArray.set(oldArray), nextAvailableThreadIDs = newArray, nextAvailableThreadIDs[0] = oldSize + 1;
        for (var _i = oldSize; _i < newSize - 1; _i++)
          nextAvailableThreadIDs[_i] = _i + 1;
        return nextAvailableThreadIDs[newSize - 1] = 0, oldSize;
      }
      function allocThreadID() {
        var nextID = nextAvailableThreadIDs[0];
        return nextID === 0 ? growThreadCountAndReturnNextAvailable() : (nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID], nextID);
      }
      function freeThreadID(id) {
        nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0], nextAvailableThreadIDs[0] = id;
      }
      var RESERVED = 0, STRING = 1, BOOLEANISH_STRING = 2, BOOLEAN = 3, OVERLOADED_BOOLEAN = 4, NUMERIC = 5, POSITIVE_NUMERIC = 6, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", ROOT_ATTRIBUTE_NAME = "data-reactroot", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), hasOwnProperty2 = Object.prototype.hasOwnProperty, illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
      function isAttributeNameSafe(attributeName) {
        return hasOwnProperty2.call(validatedAttributeNameCache, attributeName) ? !0 : hasOwnProperty2.call(illegalAttributeNameCache, attributeName) ? !1 : VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = !0, !0) : (illegalAttributeNameCache[attributeName] = !0, error("Invalid attribute name: `%s`", attributeName), !1);
      }
      function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
        return propertyInfo !== null ? propertyInfo.type === RESERVED : isCustomComponentTag ? !1 : name.length > 2 && (name[0] === "o" || name[0] === "O") && (name[1] === "n" || name[1] === "N");
      }
      function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
        if (propertyInfo !== null && propertyInfo.type === RESERVED)
          return !1;
        switch (typeof value) {
          case "function":
          case "symbol":
            return !0;
          case "boolean": {
            if (isCustomComponentTag)
              return !1;
            if (propertyInfo !== null)
              return !propertyInfo.acceptsBooleans;
            var prefix2 = name.toLowerCase().slice(0, 5);
            return prefix2 !== "data-" && prefix2 !== "aria-";
          }
          default:
            return !1;
        }
      }
      function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
        if (value === null || typeof value > "u" || shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag))
          return !0;
        if (isCustomComponentTag)
          return !1;
        if (propertyInfo !== null)
          switch (propertyInfo.type) {
            case BOOLEAN:
              return !value;
            case OVERLOADED_BOOLEAN:
              return value === !1;
            case NUMERIC:
              return isNaN(value);
            case POSITIVE_NUMERIC:
              return isNaN(value) || value < 1;
          }
        return !1;
      }
      function getPropertyInfo(name) {
        return properties.hasOwnProperty(name) ? properties[name] : null;
      }
      function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL2, removeEmptyString) {
        this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN, this.attributeName = attributeName, this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, this.propertyName = name, this.type = type, this.sanitizeURL = sanitizeURL2, this.removeEmptyString = removeEmptyString;
      }
      var properties = {}, reservedProps = [
        "children",
        "dangerouslySetInnerHTML",
        "defaultValue",
        "defaultChecked",
        "innerHTML",
        "suppressContentEditableWarning",
        "suppressHydrationWarning",
        "style"
      ];
      reservedProps.forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          RESERVED,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(_ref) {
        var name = _ref[0], attributeName = _ref[1];
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          null,
          !1,
          !1
        );
      }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          name.toLowerCase(),
          null,
          !1,
          !1
        );
      }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEANISH_STRING,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), [
        "allowFullScreen",
        "async",
        "autoFocus",
        "autoPlay",
        "controls",
        "default",
        "defer",
        "disabled",
        "disablePictureInPicture",
        "disableRemotePlayback",
        "formNoValidate",
        "hidden",
        "loop",
        "noModule",
        "noValidate",
        "open",
        "playsInline",
        "readOnly",
        "required",
        "reversed",
        "scoped",
        "seamless",
        "itemScope"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !1,
          name.toLowerCase(),
          null,
          !1,
          !1
        );
      }), [
        "checked",
        "multiple",
        "muted",
        "selected"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          BOOLEAN,
          !0,
          name,
          null,
          !1,
          !1
        );
      }), [
        "capture",
        "download"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          OVERLOADED_BOOLEAN,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), [
        "cols",
        "rows",
        "size",
        "span"
      ].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          POSITIVE_NUMERIC,
          !1,
          name,
          null,
          !1,
          !1
        );
      }), ["rowSpan", "start"].forEach(function(name) {
        properties[name] = new PropertyInfoRecord(
          name,
          NUMERIC,
          !1,
          name.toLowerCase(),
          null,
          !1,
          !1
        );
      });
      var CAMELIZE = /[\-\:]([a-z])/g, capitalize = function(token) {
        return token[1].toUpperCase();
      };
      [
        "accent-height",
        "alignment-baseline",
        "arabic-form",
        "baseline-shift",
        "cap-height",
        "clip-path",
        "clip-rule",
        "color-interpolation",
        "color-interpolation-filters",
        "color-profile",
        "color-rendering",
        "dominant-baseline",
        "enable-background",
        "fill-opacity",
        "fill-rule",
        "flood-color",
        "flood-opacity",
        "font-family",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-variant",
        "font-weight",
        "glyph-name",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "horiz-adv-x",
        "horiz-origin-x",
        "image-rendering",
        "letter-spacing",
        "lighting-color",
        "marker-end",
        "marker-mid",
        "marker-start",
        "overline-position",
        "overline-thickness",
        "paint-order",
        "panose-1",
        "pointer-events",
        "rendering-intent",
        "shape-rendering",
        "stop-color",
        "stop-opacity",
        "strikethrough-position",
        "strikethrough-thickness",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-anchor",
        "text-decoration",
        "text-rendering",
        "underline-position",
        "underline-thickness",
        "unicode-bidi",
        "unicode-range",
        "units-per-em",
        "v-alphabetic",
        "v-hanging",
        "v-ideographic",
        "v-mathematical",
        "vector-effect",
        "vert-adv-y",
        "vert-origin-x",
        "vert-origin-y",
        "word-spacing",
        "writing-mode",
        "xmlns:xlink",
        "x-height"
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          null,
          !1,
          !1
        );
      }), [
        "xlink:actuate",
        "xlink:arcrole",
        "xlink:role",
        "xlink:show",
        "xlink:title",
        "xlink:type"
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          "http://www.w3.org/1999/xlink",
          !1,
          !1
        );
      }), [
        "xml:base",
        "xml:lang",
        "xml:space"
      ].forEach(function(attributeName) {
        var name = attributeName.replace(CAMELIZE, capitalize);
        properties[name] = new PropertyInfoRecord(
          name,
          STRING,
          !1,
          attributeName,
          "http://www.w3.org/XML/1998/namespace",
          !1,
          !1
        );
      }), ["tabIndex", "crossOrigin"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          attributeName.toLowerCase(),
          null,
          !1,
          !1
        );
      });
      var xlinkHref = "xlinkHref";
      properties[xlinkHref] = new PropertyInfoRecord(
        "xlinkHref",
        STRING,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0,
        !1
      ), ["src", "href", "action", "formAction"].forEach(function(attributeName) {
        properties[attributeName] = new PropertyInfoRecord(
          attributeName,
          STRING,
          !1,
          attributeName.toLowerCase(),
          null,
          !0,
          !0
        );
      });
      var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, didWarn = !1;
      function sanitizeURL(url) {
        !didWarn && isJavaScriptProtocol.test(url) && (didWarn = !0, error("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(url)));
      }
      var matchHtmlRegExp = /["'&<>]/;
      function escapeHtml2(string) {
        var str = "" + string, match = matchHtmlRegExp.exec(str);
        if (!match)
          return str;
        var escape2, html = "", index, lastIndex = 0;
        for (index = match.index; index < str.length; index++) {
          switch (str.charCodeAt(index)) {
            case 34:
              escape2 = "&quot;";
              break;
            case 38:
              escape2 = "&amp;";
              break;
            case 39:
              escape2 = "&#x27;";
              break;
            case 60:
              escape2 = "&lt;";
              break;
            case 62:
              escape2 = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += str.substring(lastIndex, index)), lastIndex = index + 1, html += escape2;
        }
        return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
      }
      function escapeTextForBrowser(text) {
        return typeof text == "boolean" || typeof text == "number" ? "" + text : escapeHtml2(text);
      }
      function quoteAttributeValueForBrowser(value) {
        return '"' + escapeTextForBrowser(value) + '"';
      }
      function createMarkupForRoot() {
        return ROOT_ATTRIBUTE_NAME + '=""';
      }
      function createMarkupForProperty(name, value) {
        var propertyInfo = getPropertyInfo(name);
        if (name !== "style" && shouldIgnoreAttribute(name, propertyInfo, !1) || shouldRemoveAttribute(name, value, propertyInfo, !1))
          return "";
        if (propertyInfo !== null) {
          var attributeName = propertyInfo.attributeName, type = propertyInfo.type;
          return type === BOOLEAN || type === OVERLOADED_BOOLEAN && value === !0 ? attributeName + '=""' : (propertyInfo.sanitizeURL && (value = "" + value, sanitizeURL(value)), attributeName + "=" + quoteAttributeValueForBrowser(value));
        } else if (isAttributeNameSafe(name))
          return name + "=" + quoteAttributeValueForBrowser(value);
        return "";
      }
      function createMarkupForCustomAttribute(name, value) {
        return !isAttributeNameSafe(name) || value == null ? "" : name + "=" + quoteAttributeValueForBrowser(value);
      }
      function is(x, y) {
        return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
      }
      var objectIs = typeof Object.is == "function" ? Object.is : is, currentlyRenderingComponent = null, firstWorkInProgressHook = null, workInProgressHook = null, isReRender = !1, didScheduleRenderPhaseUpdate = !1, renderPhaseUpdates = null, numberOfReRenders = 0, RE_RENDER_LIMIT = 25, isInHookUserCodeInDev = !1, currentHookNameInDev;
      function resolveCurrentlyRenderingComponent() {
        if (currentlyRenderingComponent === null)
          throw Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
        return isInHookUserCodeInDev && error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks"), currentlyRenderingComponent;
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (prevDeps === null)
          return error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", currentHookNameInDev), !1;
        nextDeps.length !== prevDeps.length && error(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, currentHookNameInDev, "[" + nextDeps.join(", ") + "]", "[" + prevDeps.join(", ") + "]");
        for (var i2 = 0; i2 < prevDeps.length && i2 < nextDeps.length; i2++)
          if (!objectIs(nextDeps[i2], prevDeps[i2]))
            return !1;
        return !0;
      }
      function createHook() {
        if (numberOfReRenders > 0)
          throw Error("Rendered more hooks than during the previous render");
        return {
          memoizedState: null,
          queue: null,
          next: null
        };
      }
      function createWorkInProgressHook() {
        return workInProgressHook === null ? firstWorkInProgressHook === null ? (isReRender = !1, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = !0, workInProgressHook = firstWorkInProgressHook) : workInProgressHook.next === null ? (isReRender = !1, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = !0, workInProgressHook = workInProgressHook.next), workInProgressHook;
      }
      function prepareToUseHooks(componentIdentity) {
        currentlyRenderingComponent = componentIdentity, isInHookUserCodeInDev = !1;
      }
      function finishHooks(Component, props, children, refOrContext) {
        for (; didScheduleRenderPhaseUpdate; )
          didScheduleRenderPhaseUpdate = !1, numberOfReRenders += 1, workInProgressHook = null, children = Component(props, refOrContext);
        return resetHooksState(), children;
      }
      function resetHooksState() {
        isInHookUserCodeInDev = !1, currentlyRenderingComponent = null, didScheduleRenderPhaseUpdate = !1, firstWorkInProgressHook = null, numberOfReRenders = 0, renderPhaseUpdates = null, workInProgressHook = null;
      }
      function readContext(context, observedBits) {
        var threadID = currentPartialRenderer.threadID;
        return validateContextBounds(context, threadID), isInHookUserCodeInDev && error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), context[threadID];
      }
      function useContext4(context, observedBits) {
        currentHookNameInDev = "useContext", resolveCurrentlyRenderingComponent();
        var threadID = currentPartialRenderer.threadID;
        return validateContextBounds(context, threadID), context[threadID];
      }
      function basicStateReducer(state, action) {
        return typeof action == "function" ? action(state) : action;
      }
      function useState4(initialState) {
        return currentHookNameInDev = "useState", useReducer(
          basicStateReducer,
          initialState
        );
      }
      function useReducer(reducer, initialArg, init2) {
        if (reducer !== basicStateReducer && (currentHookNameInDev = "useReducer"), currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook(), isReRender) {
          var queue2 = workInProgressHook.queue, dispatch = queue2.dispatch;
          if (renderPhaseUpdates !== null) {
            var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue2);
            if (firstRenderPhaseUpdate !== void 0) {
              renderPhaseUpdates.delete(queue2);
              var newState = workInProgressHook.memoizedState, update = firstRenderPhaseUpdate;
              do {
                var action = update.action;
                isInHookUserCodeInDev = !0, newState = reducer(newState, action), isInHookUserCodeInDev = !1, update = update.next;
              } while (update !== null);
              return workInProgressHook.memoizedState = newState, [newState, dispatch];
            }
          }
          return [workInProgressHook.memoizedState, dispatch];
        } else {
          isInHookUserCodeInDev = !0;
          var initialState;
          reducer === basicStateReducer ? initialState = typeof initialArg == "function" ? initialArg() : initialArg : initialState = init2 !== void 0 ? init2(initialArg) : initialArg, isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = initialState;
          var _queue = workInProgressHook.queue = {
            last: null,
            dispatch: null
          }, _dispatch = _queue.dispatch = dispatchAction.bind(null, currentlyRenderingComponent, _queue);
          return [workInProgressHook.memoizedState, _dispatch];
        }
      }
      function useMemo4(nextCreate, deps) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var nextDeps = deps === void 0 ? null : deps;
        if (workInProgressHook !== null) {
          var prevState = workInProgressHook.memoizedState;
          if (prevState !== null && nextDeps !== null) {
            var prevDeps = prevState[1];
            if (areHookInputsEqual(nextDeps, prevDeps))
              return prevState[0];
          }
        }
        isInHookUserCodeInDev = !0;
        var nextValue = nextCreate();
        return isInHookUserCodeInDev = !1, workInProgressHook.memoizedState = [nextValue, nextDeps], nextValue;
      }
      function useRef4(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent(), workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        if (previousRef === null) {
          var ref = {
            current: initialValue
          };
          return Object.seal(ref), workInProgressHook.memoizedState = ref, ref;
        } else
          return previousRef;
      }
      function useLayoutEffect4(create, inputs) {
        currentHookNameInDev = "useLayoutEffect", error("useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.");
      }
      function dispatchAction(componentIdentity, queue2, action) {
        if (!(numberOfReRenders < RE_RENDER_LIMIT))
          throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        if (componentIdentity === currentlyRenderingComponent) {
          didScheduleRenderPhaseUpdate = !0;
          var update = {
            action,
            next: null
          };
          renderPhaseUpdates === null && (renderPhaseUpdates = /* @__PURE__ */ new Map());
          var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue2);
          if (firstRenderPhaseUpdate === void 0)
            renderPhaseUpdates.set(queue2, update);
          else {
            for (var lastRenderPhaseUpdate = firstRenderPhaseUpdate; lastRenderPhaseUpdate.next !== null; )
              lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            lastRenderPhaseUpdate.next = update;
          }
        }
      }
      function useCallback5(callback, deps) {
        return useMemo4(function() {
          return callback;
        }, deps);
      }
      function useMutableSource(source, getSnapshot, subscribe) {
        return resolveCurrentlyRenderingComponent(), getSnapshot(source._source);
      }
      function useDeferredValue(value) {
        return resolveCurrentlyRenderingComponent(), value;
      }
      function useTransition2() {
        resolveCurrentlyRenderingComponent();
        var startTransition = function(callback) {
          callback();
        };
        return [startTransition, !1];
      }
      function useOpaqueIdentifier() {
        return (currentPartialRenderer.identifierPrefix || "") + "R:" + (currentPartialRenderer.uniqueID++).toString(36);
      }
      function noop2() {
      }
      var currentPartialRenderer = null;
      function setCurrentPartialRenderer(renderer) {
        currentPartialRenderer = renderer;
      }
      var Dispatcher = {
        readContext,
        useContext: useContext4,
        useMemo: useMemo4,
        useReducer,
        useRef: useRef4,
        useState: useState4,
        useLayoutEffect: useLayoutEffect4,
        useCallback: useCallback5,
        useImperativeHandle: noop2,
        useEffect: noop2,
        useDebugValue: noop2,
        useDeferredValue,
        useTransition: useTransition2,
        useOpaqueIdentifier,
        useMutableSource
      }, HTML_NAMESPACE = "http://www.w3.org/1999/xhtml", MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML", SVG_NAMESPACE = "http://www.w3.org/2000/svg", Namespaces = {
        html: HTML_NAMESPACE,
        mathml: MATH_NAMESPACE,
        svg: SVG_NAMESPACE
      };
      function getIntrinsicNamespace(type) {
        switch (type) {
          case "svg":
            return SVG_NAMESPACE;
          case "math":
            return MATH_NAMESPACE;
          default:
            return HTML_NAMESPACE;
        }
      }
      function getChildNamespace(parentNamespace, type) {
        return parentNamespace == null || parentNamespace === HTML_NAMESPACE ? getIntrinsicNamespace(type) : parentNamespace === SVG_NAMESPACE && type === "foreignObject" ? HTML_NAMESPACE : parentNamespace;
      }
      var hasReadOnlyValue = {
        button: !0,
        checkbox: !0,
        image: !0,
        hidden: !0,
        radio: !0,
        reset: !0,
        submit: !0
      };
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || props.value == null || error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), props.onChange || props.readOnly || props.disabled || props.checked == null || error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
      }
      var omittedCloseTags = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
      }, voidElementTags = _assign({
        menuitem: !0
      }, omittedCloseTags), HTML = "__html";
      function assertValidProps(tag, props) {
        if (!!props) {
          if (voidElementTags[tag] && !(props.children == null && props.dangerouslySetInnerHTML == null))
            throw Error(tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          if (props.dangerouslySetInnerHTML != null) {
            if (props.children != null)
              throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
            if (!(typeof props.dangerouslySetInnerHTML == "object" && HTML in props.dangerouslySetInnerHTML))
              throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
          }
          if (!props.suppressContentEditableWarning && props.contentEditable && props.children != null && error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), !(props.style == null || typeof props.style == "object"))
            throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
        }
      }
      var isUnitlessNumber = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
      };
      function prefixKey(prefix2, key) {
        return prefix2 + key.charAt(0).toUpperCase() + key.substring(1);
      }
      var prefixes = ["Webkit", "ms", "Moz", "O"];
      Object.keys(isUnitlessNumber).forEach(function(prop) {
        prefixes.forEach(function(prefix2) {
          isUnitlessNumber[prefixKey(prefix2, prop)] = isUnitlessNumber[prop];
        });
      });
      function dangerousStyleValue(name, value, isCustomProperty) {
        var isEmpty = value == null || typeof value == "boolean" || value === "";
        return isEmpty ? "" : !isCustomProperty && typeof value == "number" && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) ? value + "px" : ("" + value).trim();
      }
      var uppercasePattern = /([A-Z])/g, msPattern = /^ms-/;
      function hyphenateStyleName(name) {
        return name.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-");
      }
      function isCustomComponent(tagName, props) {
        if (tagName.indexOf("-") === -1)
          return typeof props.is == "string";
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return !1;
          default:
            return !0;
        }
      }
      var warnValidStyle = function() {
      };
      {
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern$1 = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = !1, warnedForInfinityValue = !1, camelize = function(string) {
          return string.replace(hyphenPattern, function(_, character) {
            return character.toUpperCase();
          });
        }, warnHyphenatedStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error(
            "Unsupported style property %s. Did you mean %s?",
            name,
            camelize(name.replace(msPattern$1, "ms-"))
          ));
        }, warnBadVendoredStyleName = function(name) {
          warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, error("Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)));
        }, warnStyleValueWithSemicolon = function(name, value) {
          warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = !0, error(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, name, value.replace(badStyleValueWithSemicolonPattern, "")));
        }, warnStyleValueIsNaN = function(name, value) {
          warnedForNaNValue || (warnedForNaNValue = !0, error("`NaN` is an invalid value for the `%s` css style property.", name));
        }, warnStyleValueIsInfinity = function(name, value) {
          warnedForInfinityValue || (warnedForInfinityValue = !0, error("`Infinity` is an invalid value for the `%s` css style property.", name));
        };
        warnValidStyle = function(name, value) {
          name.indexOf("-") > -1 ? warnHyphenatedStyleName(name) : badVendoredStyleNamePattern.test(name) ? warnBadVendoredStyleName(name) : badStyleValueWithSemicolonPattern.test(value) && warnStyleValueWithSemicolon(name, value), typeof value == "number" && (isNaN(value) ? warnStyleValueIsNaN(name, value) : isFinite(value) || warnStyleValueIsInfinity(name, value));
        };
      }
      var warnValidStyle$1 = warnValidStyle, ariaProperties = {
        "aria-current": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$"), hasOwnProperty$1 = Object.prototype.hasOwnProperty;
      function validateProperty(tagName, name) {
        {
          if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name])
            return !0;
          if (rARIACamel.test(name)) {
            var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
            if (correctName == null)
              return error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", name), warnedProperties[name] = !0, !0;
            if (name !== correctName)
              return error("Invalid ARIA attribute `%s`. Did you mean `%s`?", name, correctName), warnedProperties[name] = !0, !0;
          }
          if (rARIA.test(name)) {
            var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
            if (standardName == null)
              return warnedProperties[name] = !0, !1;
            if (name !== standardName)
              return error("Unknown ARIA attribute `%s`. Did you mean `%s`?", name, standardName), warnedProperties[name] = !0, !0;
          }
        }
        return !0;
      }
      function warnInvalidARIAProps(type, props) {
        {
          var invalidProps = [];
          for (var key in props) {
            var isValid = validateProperty(type, key);
            isValid || invalidProps.push(key);
          }
          var unknownPropString = invalidProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          invalidProps.length === 1 ? error("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type) : invalidProps.length > 1 && error("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", unknownPropString, type);
        }
      }
      function validateProperties(type, props) {
        isCustomComponent(type, props) || warnInvalidARIAProps(type, props);
      }
      var didWarnValueNull = !1;
      function validateProperties$1(type, props) {
        {
          if (type !== "input" && type !== "textarea" && type !== "select")
            return;
          props != null && props.value === null && !didWarnValueNull && (didWarnValueNull = !0, type === "select" && props.multiple ? error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", type) : error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", type));
        }
      }
      var possibleStandardNames = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, validateProperty$1 = function() {
      };
      {
        var warnedProperties$1 = {}, _hasOwnProperty = Object.prototype.hasOwnProperty, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, eventRegistry) {
          if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
            return !0;
          var lowerCasedName = name.toLowerCase();
          if (lowerCasedName === "onfocusin" || lowerCasedName === "onfocusout")
            return error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), warnedProperties$1[name] = !0, !0;
          if (eventRegistry != null) {
            var registrationNameDependencies = eventRegistry.registrationNameDependencies, possibleRegistrationNames = eventRegistry.possibleRegistrationNames;
            if (registrationNameDependencies.hasOwnProperty(name))
              return !0;
            var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
            if (registrationName != null)
              return error("Invalid event handler property `%s`. Did you mean `%s`?", name, registrationName), warnedProperties$1[name] = !0, !0;
            if (EVENT_NAME_REGEX.test(name))
              return error("Unknown event handler property `%s`. It will be ignored.", name), warnedProperties$1[name] = !0, !0;
          } else if (EVENT_NAME_REGEX.test(name))
            return INVALID_EVENT_NAME_REGEX.test(name) && error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", name), warnedProperties$1[name] = !0, !0;
          if (rARIA$1.test(name) || rARIACamel$1.test(name))
            return !0;
          if (lowerCasedName === "innerhtml")
            return error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "aria")
            return error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), warnedProperties$1[name] = !0, !0;
          if (lowerCasedName === "is" && value !== null && value !== void 0 && typeof value != "string")
            return error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof value), warnedProperties$1[name] = !0, !0;
          if (typeof value == "number" && isNaN(value))
            return error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", name), warnedProperties$1[name] = !0, !0;
          var propertyInfo = getPropertyInfo(name), isReserved = propertyInfo !== null && propertyInfo.type === RESERVED;
          if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
            var standardName = possibleStandardNames[lowerCasedName];
            if (standardName !== name)
              return error("Invalid DOM property `%s`. Did you mean `%s`?", name, standardName), warnedProperties$1[name] = !0, !0;
          } else if (!isReserved && name !== lowerCasedName)
            return error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", name, lowerCasedName), warnedProperties$1[name] = !0, !0;
          return typeof value == "boolean" && shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (value ? error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', value, name, name, value, name) : error('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', value, name, name, value, name, name, name), warnedProperties$1[name] = !0, !0) : isReserved ? !0 : shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (warnedProperties$1[name] = !0, !1) : ((value === "false" || value === "true") && propertyInfo !== null && propertyInfo.type === BOOLEAN && (error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", value, name, value === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', name, value), warnedProperties$1[name] = !0), !0);
        };
      }
      var warnUnknownProperties = function(type, props, eventRegistry) {
        {
          var unknownProps = [];
          for (var key in props) {
            var isValid = validateProperty$1(type, key, props[key], eventRegistry);
            isValid || unknownProps.push(key);
          }
          var unknownPropString = unknownProps.map(function(prop) {
            return "`" + prop + "`";
          }).join(", ");
          unknownProps.length === 1 ? error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type) : unknownProps.length > 1 && error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", unknownPropString, type);
        }
      };
      function validateProperties$2(type, props, eventRegistry) {
        isCustomComponent(type, props) || warnUnknownProperties(type, props, eventRegistry);
      }
      var toArray = React5.Children.toArray, currentDebugStacks = [], ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher, ReactDebugCurrentFrame$1, prevGetCurrentStackImpl = null, getCurrentServerStackImpl = function() {
        return "";
      }, describeStackFrame = function(element) {
        return "";
      }, validatePropertiesInDevelopment = function(type, props) {
      }, pushCurrentDebugStack = function(stack) {
      }, pushElementToDebugStack = function(element) {
      }, popCurrentDebugStack = function() {
      }, hasWarnedAboutUsingContextAsConsumer = !1;
      ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame, validatePropertiesInDevelopment = function(type, props) {
        validateProperties(type, props), validateProperties$1(type, props), validateProperties$2(type, props, null);
      }, describeStackFrame = function(element) {
        return describeUnknownElementTypeFrameInDEV(element.type, element._source, null);
      }, pushCurrentDebugStack = function(stack) {
        currentDebugStacks.push(stack), currentDebugStacks.length === 1 && (prevGetCurrentStackImpl = ReactDebugCurrentFrame$1.getCurrentStack, ReactDebugCurrentFrame$1.getCurrentStack = getCurrentServerStackImpl);
      }, pushElementToDebugStack = function(element) {
        var stack = currentDebugStacks[currentDebugStacks.length - 1], frame = stack[stack.length - 1];
        frame.debugElementStack.push(element);
      }, popCurrentDebugStack = function() {
        currentDebugStacks.pop(), currentDebugStacks.length === 0 && (ReactDebugCurrentFrame$1.getCurrentStack = prevGetCurrentStackImpl, prevGetCurrentStackImpl = null);
      }, getCurrentServerStackImpl = function() {
        if (currentDebugStacks.length === 0)
          return "";
        for (var frames = currentDebugStacks[currentDebugStacks.length - 1], stack = "", i2 = frames.length - 1; i2 >= 0; i2--)
          for (var frame = frames[i2], debugElementStack = frame.debugElementStack, ii = debugElementStack.length - 1; ii >= 0; ii--)
            stack += describeStackFrame(debugElementStack[ii]);
        return stack;
      };
      var didWarnDefaultInputValue = !1, didWarnDefaultChecked = !1, didWarnDefaultSelectValue = !1, didWarnDefaultTextareaValue = !1, didWarnInvalidOptionChildren = !1, didWarnAboutNoopUpdateForComponent = {}, didWarnAboutBadClass = {}, didWarnAboutModulePatternComponent = {}, didWarnAboutDeprecatedWillMount = {}, didWarnAboutUndefinedDerivedState = {}, didWarnAboutUninitializedState = {}, valuePropNames = ["value", "defaultValue"], newlineEatingTags = {
        listing: !0,
        pre: !0,
        textarea: !0
      }, VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, validatedTagCache = {};
      function validateDangerousTag(tag) {
        if (!validatedTagCache.hasOwnProperty(tag)) {
          if (!VALID_TAG_REGEX.test(tag))
            throw Error("Invalid tag: " + tag);
          validatedTagCache[tag] = !0;
        }
      }
      var styleNameCache = {}, processStyleName = function(styleName) {
        if (styleNameCache.hasOwnProperty(styleName))
          return styleNameCache[styleName];
        var result = hyphenateStyleName(styleName);
        return styleNameCache[styleName] = result, result;
      };
      function createMarkupForStyles(styles) {
        var serialized = "", delimiter = "";
        for (var styleName in styles)
          if (!!styles.hasOwnProperty(styleName)) {
            var isCustomProperty = styleName.indexOf("--") === 0, styleValue = styles[styleName];
            isCustomProperty || warnValidStyle$1(styleName, styleValue), styleValue != null && (serialized += delimiter + (isCustomProperty ? styleName : processStyleName(styleName)) + ":", serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty), delimiter = ";");
          }
        return serialized || null;
      }
      function warnNoop(publicInstance, callerName) {
        {
          var _constructor = publicInstance.constructor, componentName = _constructor && getComponentName(_constructor) || "ReactClass", warningKey = componentName + "." + callerName;
          if (didWarnAboutNoopUpdateForComponent[warningKey])
            return;
          error(`%s(...): Can only update a mounting component. This usually means you called %s() outside componentWillMount() on the server. This is a no-op.

Please check the code for the %s component.`, callerName, callerName, componentName), didWarnAboutNoopUpdateForComponent[warningKey] = !0;
        }
      }
      function shouldConstruct$1(Component) {
        return Component.prototype && Component.prototype.isReactComponent;
      }
      function getNonChildrenInnerMarkup(props) {
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null)
            return innerHTML.__html;
        } else {
          var content = props.children;
          if (typeof content == "string" || typeof content == "number")
            return escapeTextForBrowser(content);
        }
        return null;
      }
      function flattenTopLevelChildren(children) {
        if (!React5.isValidElement(children))
          return toArray(children);
        var element = children;
        if (element.type !== REACT_FRAGMENT_TYPE)
          return [element];
        var fragmentChildren = element.props.children;
        if (!React5.isValidElement(fragmentChildren))
          return toArray(fragmentChildren);
        var fragmentChildElement = fragmentChildren;
        return [fragmentChildElement];
      }
      function flattenOptionChildren(children) {
        if (children == null)
          return children;
        var content = "";
        return React5.Children.forEach(children, function(child) {
          child != null && (content += child, !didWarnInvalidOptionChildren && typeof child != "string" && typeof child != "number" && (didWarnInvalidOptionChildren = !0, error("Only strings and numbers are supported as <option> children.")));
        }), content;
      }
      var hasOwnProperty$2 = Object.prototype.hasOwnProperty, STYLE = "style", RESERVED_PROPS = {
        children: null,
        dangerouslySetInnerHTML: null,
        suppressContentEditableWarning: null,
        suppressHydrationWarning: null
      };
      function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement) {
        var ret = "<" + tagVerbatim, isCustomComponent$1 = isCustomComponent(tagLowercase, props);
        for (var propKey in props)
          if (!!hasOwnProperty$2.call(props, propKey)) {
            var propValue = props[propKey];
            if (propValue != null) {
              propKey === STYLE && (propValue = createMarkupForStyles(propValue));
              var markup = null;
              isCustomComponent$1 ? RESERVED_PROPS.hasOwnProperty(propKey) || (markup = createMarkupForCustomAttribute(propKey, propValue)) : markup = createMarkupForProperty(propKey, propValue), markup && (ret += " " + markup);
            }
          }
        return makeStaticMarkup || isRootElement && (ret += " " + createMarkupForRoot()), ret;
      }
      function validateRenderResult(child, type) {
        if (child === void 0)
          throw Error((getComponentName(type) || "Component") + "(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.");
      }
      function resolve(child, context, threadID) {
        for (; React5.isValidElement(child); ) {
          var element = child, Component = element.type;
          if (pushElementToDebugStack(element), typeof Component != "function")
            break;
          processChild(element, Component);
        }
        function processChild(element2, Component2) {
          var isClass = shouldConstruct$1(Component2), publicContext = processContext(Component2, context, threadID, isClass), queue2 = [], replace = !1, updater = {
            isMounted: function(publicInstance) {
              return !1;
            },
            enqueueForceUpdate: function(publicInstance) {
              if (queue2 === null)
                return warnNoop(publicInstance, "forceUpdate"), null;
            },
            enqueueReplaceState: function(publicInstance, completeState) {
              replace = !0, queue2 = [completeState];
            },
            enqueueSetState: function(publicInstance, currentPartialState) {
              if (queue2 === null)
                return warnNoop(publicInstance, "setState"), null;
              queue2.push(currentPartialState);
            }
          }, inst;
          if (isClass) {
            if (inst = new Component2(element2.props, publicContext, updater), typeof Component2.getDerivedStateFromProps == "function") {
              if (inst.state === null || inst.state === void 0) {
                var componentName = getComponentName(Component2) || "Unknown";
                didWarnAboutUninitializedState[componentName] || (error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", componentName, inst.state === null ? "null" : "undefined", componentName), didWarnAboutUninitializedState[componentName] = !0);
              }
              var partialState = Component2.getDerivedStateFromProps.call(null, element2.props, inst.state);
              if (partialState === void 0) {
                var _componentName = getComponentName(Component2) || "Unknown";
                didWarnAboutUndefinedDerivedState[_componentName] || (error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", _componentName), didWarnAboutUndefinedDerivedState[_componentName] = !0);
              }
              partialState != null && (inst.state = _assign({}, inst.state, partialState));
            }
          } else {
            if (Component2.prototype && typeof Component2.prototype.render == "function") {
              var _componentName2 = getComponentName(Component2) || "Unknown";
              didWarnAboutBadClass[_componentName2] || (error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", _componentName2, _componentName2), didWarnAboutBadClass[_componentName2] = !0);
            }
            var componentIdentity = {};
            if (prepareToUseHooks(componentIdentity), inst = Component2(element2.props, publicContext, updater), inst = finishHooks(Component2, element2.props, inst, publicContext), inst != null && inst.render != null) {
              var _componentName3 = getComponentName(Component2) || "Unknown";
              didWarnAboutModulePatternComponent[_componentName3] || (error("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _componentName3, _componentName3, _componentName3), didWarnAboutModulePatternComponent[_componentName3] = !0);
            }
            if (inst == null || inst.render == null) {
              child = inst, validateRenderResult(child, Component2);
              return;
            }
          }
          inst.props = element2.props, inst.context = publicContext, inst.updater = updater;
          var initialState = inst.state;
          if (initialState === void 0 && (inst.state = initialState = null), typeof inst.UNSAFE_componentWillMount == "function" || typeof inst.componentWillMount == "function") {
            if (typeof inst.componentWillMount == "function") {
              if (inst.componentWillMount.__suppressDeprecationWarning !== !0) {
                var _componentName4 = getComponentName(Component2) || "Unknown";
                didWarnAboutDeprecatedWillMount[_componentName4] || (warn(
                  `componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code from componentWillMount to componentDidMount (preferred in most cases) or the constructor.

Please update the following components: %s`,
                  _componentName4
                ), didWarnAboutDeprecatedWillMount[_componentName4] = !0);
              }
              typeof Component2.getDerivedStateFromProps != "function" && inst.componentWillMount();
            }
            if (typeof inst.UNSAFE_componentWillMount == "function" && typeof Component2.getDerivedStateFromProps != "function" && inst.UNSAFE_componentWillMount(), queue2.length) {
              var oldQueue = queue2, oldReplace = replace;
              if (queue2 = null, replace = !1, oldReplace && oldQueue.length === 1)
                inst.state = oldQueue[0];
              else {
                for (var nextState = oldReplace ? oldQueue[0] : inst.state, dontMutate = !0, i2 = oldReplace ? 1 : 0; i2 < oldQueue.length; i2++) {
                  var partial = oldQueue[i2], _partialState = typeof partial == "function" ? partial.call(inst, nextState, element2.props, publicContext) : partial;
                  _partialState != null && (dontMutate ? (dontMutate = !1, nextState = _assign({}, nextState, _partialState)) : _assign(nextState, _partialState));
                }
                inst.state = nextState;
              }
            } else
              queue2 = null;
          }
          child = inst.render(), child === void 0 && inst.render._isMockFunction && (child = null), validateRenderResult(child, Component2);
          var childContext;
          {
            if (typeof inst.getChildContext == "function") {
              var _childContextTypes = Component2.childContextTypes;
              if (typeof _childContextTypes == "object") {
                childContext = inst.getChildContext();
                for (var contextKey in childContext)
                  if (!(contextKey in _childContextTypes))
                    throw Error((getComponentName(Component2) || "Unknown") + '.getChildContext(): key "' + contextKey + '" is not defined in childContextTypes.');
              } else
                error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", getComponentName(Component2) || "Unknown");
            }
            childContext && (context = _assign({}, context, childContext));
          }
        }
        return {
          child,
          context
        };
      }
      var ReactDOMServerRenderer = /* @__PURE__ */ function() {
        function ReactDOMServerRenderer2(children, makeStaticMarkup, options) {
          var flatChildren = flattenTopLevelChildren(children), topFrame = {
            type: null,
            domNamespace: Namespaces.html,
            children: flatChildren,
            childIndex: 0,
            context: emptyObject,
            footer: ""
          };
          topFrame.debugElementStack = [], this.threadID = allocThreadID(), this.stack = [topFrame], this.exhausted = !1, this.currentSelectValue = null, this.previousWasTextNode = !1, this.makeStaticMarkup = makeStaticMarkup, this.suspenseDepth = 0, this.contextIndex = -1, this.contextStack = [], this.contextValueStack = [], this.uniqueID = 0, this.identifierPrefix = options && options.identifierPrefix || "", this.contextProviderStack = [];
        }
        var _proto = ReactDOMServerRenderer2.prototype;
        return _proto.destroy = function() {
          this.exhausted || (this.exhausted = !0, this.clearProviders(), freeThreadID(this.threadID));
        }, _proto.pushProvider = function(provider) {
          var index = ++this.contextIndex, context = provider.type._context, threadID = this.threadID;
          validateContextBounds(context, threadID);
          var previousValue = context[threadID];
          this.contextStack[index] = context, this.contextValueStack[index] = previousValue, this.contextProviderStack[index] = provider, context[threadID] = provider.props.value;
        }, _proto.popProvider = function(provider) {
          var index = this.contextIndex;
          (index < 0 || provider !== this.contextProviderStack[index]) && error("Unexpected pop.");
          var context = this.contextStack[index], previousValue = this.contextValueStack[index];
          this.contextStack[index] = null, this.contextValueStack[index] = null, this.contextProviderStack[index] = null, this.contextIndex--, context[this.threadID] = previousValue;
        }, _proto.clearProviders = function() {
          for (var index = this.contextIndex; index >= 0; index--) {
            var context = this.contextStack[index], previousValue = this.contextValueStack[index];
            context[this.threadID] = previousValue;
          }
        }, _proto.read = function(bytes) {
          if (this.exhausted)
            return null;
          var prevPartialRenderer = currentPartialRenderer;
          setCurrentPartialRenderer(this);
          var prevDispatcher = ReactCurrentDispatcher$1.current;
          ReactCurrentDispatcher$1.current = Dispatcher;
          try {
            for (var out = [""], suspended = !1; out[0].length < bytes; ) {
              if (this.stack.length === 0) {
                this.exhausted = !0, freeThreadID(this.threadID);
                break;
              }
              var frame = this.stack[this.stack.length - 1];
              if (suspended || frame.childIndex >= frame.children.length) {
                var footer = frame.footer;
                if (footer !== "" && (this.previousWasTextNode = !1), this.stack.pop(), frame.type === "select")
                  this.currentSelectValue = null;
                else if (frame.type != null && frame.type.type != null && frame.type.type.$$typeof === REACT_PROVIDER_TYPE) {
                  var provider = frame.type;
                  this.popProvider(provider);
                } else if (frame.type === REACT_SUSPENSE_TYPE) {
                  this.suspenseDepth--;
                  var buffered = out.pop();
                  if (suspended) {
                    suspended = !1;
                    var fallbackFrame = frame.fallbackFrame;
                    if (!fallbackFrame)
                      throw Error("ReactDOMServer did not find an internal fallback frame for Suspense. This is a bug in React. Please file an issue.");
                    this.stack.push(fallbackFrame), out[this.suspenseDepth] += "<!--$!-->";
                    continue;
                  } else
                    out[this.suspenseDepth] += buffered;
                }
                out[this.suspenseDepth] += footer;
                continue;
              }
              var child = frame.children[frame.childIndex++], outBuffer = "";
              pushCurrentDebugStack(this.stack), frame.debugElementStack.length = 0;
              try {
                outBuffer += this.render(child, frame.context, frame.domNamespace);
              } catch (err) {
                if (err != null && typeof err.then == "function")
                  if (enableSuspenseServerRenderer) {
                    if (!(this.suspenseDepth > 0))
                      throw Error(`A React component suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
                    suspended = !0;
                  } else
                    throw Error("ReactDOMServer does not yet support Suspense.");
                else
                  throw err;
              } finally {
                popCurrentDebugStack();
              }
              out.length <= this.suspenseDepth && out.push(""), out[this.suspenseDepth] += outBuffer;
            }
            return out[0];
          } finally {
            ReactCurrentDispatcher$1.current = prevDispatcher, setCurrentPartialRenderer(prevPartialRenderer), resetHooksState();
          }
        }, _proto.render = function(child, context, parentNamespace) {
          if (typeof child == "string" || typeof child == "number") {
            var text = "" + child;
            return text === "" ? "" : this.makeStaticMarkup ? escapeTextForBrowser(text) : this.previousWasTextNode ? "<!-- -->" + escapeTextForBrowser(text) : (this.previousWasTextNode = !0, escapeTextForBrowser(text));
          } else {
            var nextChild, _resolve = resolve(child, context, this.threadID);
            if (nextChild = _resolve.child, context = _resolve.context, nextChild === null || nextChild === !1)
              return "";
            if (!React5.isValidElement(nextChild)) {
              if (nextChild != null && nextChild.$$typeof != null) {
                var $$typeof = nextChild.$$typeof;
                throw Error($$typeof === REACT_PORTAL_TYPE ? "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render." : "Unknown element-like object type: " + $$typeof.toString() + ". This is likely a bug in React. Please file an issue.");
              }
              var nextChildren = toArray(nextChild), frame = {
                type: null,
                domNamespace: parentNamespace,
                children: nextChildren,
                childIndex: 0,
                context,
                footer: ""
              };
              return frame.debugElementStack = [], this.stack.push(frame), "";
            }
            var nextElement = nextChild, elementType = nextElement.type;
            if (typeof elementType == "string")
              return this.renderDOM(nextElement, context, parentNamespace);
            switch (elementType) {
              case REACT_LEGACY_HIDDEN_TYPE:
              case REACT_DEBUG_TRACING_MODE_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
              case REACT_FRAGMENT_TYPE: {
                var _nextChildren = toArray(nextChild.props.children), _frame = {
                  type: null,
                  domNamespace: parentNamespace,
                  children: _nextChildren,
                  childIndex: 0,
                  context,
                  footer: ""
                };
                return _frame.debugElementStack = [], this.stack.push(_frame), "";
              }
              case REACT_SUSPENSE_TYPE:
                throw Error("ReactDOMServer does not yet support Suspense.");
              case REACT_SCOPE_TYPE:
                throw Error("ReactDOMServer does not yet support scope components.");
            }
            if (typeof elementType == "object" && elementType !== null)
              switch (elementType.$$typeof) {
                case REACT_FORWARD_REF_TYPE: {
                  var element = nextChild, _nextChildren5, componentIdentity = {};
                  prepareToUseHooks(componentIdentity), _nextChildren5 = elementType.render(element.props, element.ref), _nextChildren5 = finishHooks(elementType.render, element.props, _nextChildren5, element.ref), _nextChildren5 = toArray(_nextChildren5);
                  var _frame5 = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren5,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame5.debugElementStack = [], this.stack.push(_frame5), "";
                }
                case REACT_MEMO_TYPE: {
                  var _element = nextChild, _nextChildren6 = [React5.createElement(elementType.type, _assign({
                    ref: _element.ref
                  }, _element.props))], _frame6 = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren6,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame6.debugElementStack = [], this.stack.push(_frame6), "";
                }
                case REACT_PROVIDER_TYPE: {
                  var provider = nextChild, nextProps = provider.props, _nextChildren7 = toArray(nextProps.children), _frame7 = {
                    type: provider,
                    domNamespace: parentNamespace,
                    children: _nextChildren7,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame7.debugElementStack = [], this.pushProvider(provider), this.stack.push(_frame7), "";
                }
                case REACT_CONTEXT_TYPE: {
                  var reactContext = nextChild.type;
                  reactContext._context === void 0 ? reactContext !== reactContext.Consumer && (hasWarnedAboutUsingContextAsConsumer || (hasWarnedAboutUsingContextAsConsumer = !0, error("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : reactContext = reactContext._context;
                  var _nextProps = nextChild.props, threadID = this.threadID;
                  validateContextBounds(reactContext, threadID);
                  var nextValue = reactContext[threadID], _nextChildren8 = toArray(_nextProps.children(nextValue)), _frame8 = {
                    type: nextChild,
                    domNamespace: parentNamespace,
                    children: _nextChildren8,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame8.debugElementStack = [], this.stack.push(_frame8), "";
                }
                case REACT_FUNDAMENTAL_TYPE:
                  throw Error("ReactDOMServer does not yet support the fundamental API.");
                case REACT_LAZY_TYPE: {
                  var _element2 = nextChild, lazyComponent = nextChild.type, payload = lazyComponent._payload, init2 = lazyComponent._init, result = init2(payload), _nextChildren10 = [React5.createElement(result, _assign({
                    ref: _element2.ref
                  }, _element2.props))], _frame10 = {
                    type: null,
                    domNamespace: parentNamespace,
                    children: _nextChildren10,
                    childIndex: 0,
                    context,
                    footer: ""
                  };
                  return _frame10.debugElementStack = [], this.stack.push(_frame10), "";
                }
              }
            var info = "";
            {
              var owner = nextElement._owner;
              (elementType === void 0 || typeof elementType == "object" && elementType !== null && Object.keys(elementType).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var ownerName = owner ? getComponentName(owner) : null;
              ownerName && (info += `

Check the render method of \`` + ownerName + "`.");
            }
            throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (elementType == null ? elementType : typeof elementType) + "." + info);
          }
        }, _proto.renderDOM = function(element, context, parentNamespace) {
          var tag = element.type.toLowerCase(), namespace = parentNamespace;
          parentNamespace === Namespaces.html && (namespace = getIntrinsicNamespace(tag)), namespace === Namespaces.html && tag !== element.type && error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", element.type), validateDangerousTag(tag);
          var props = element.props;
          if (tag === "input")
            checkControlledValueProps("input", props), props.checked !== void 0 && props.defaultChecked !== void 0 && !didWarnDefaultChecked && (error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultChecked = !0), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultInputValue && (error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", "A component", props.type), didWarnDefaultInputValue = !0), props = _assign({
              type: void 0
            }, props, {
              defaultChecked: void 0,
              defaultValue: void 0,
              value: props.value != null ? props.value : props.defaultValue,
              checked: props.checked != null ? props.checked : props.defaultChecked
            });
          else if (tag === "textarea") {
            checkControlledValueProps("textarea", props), props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultTextareaValue && (error("Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultTextareaValue = !0);
            var initialValue = props.value;
            if (initialValue == null) {
              var defaultValue = props.defaultValue, textareaChildren = props.children;
              if (textareaChildren != null) {
                if (error("Use the `defaultValue` or `value` props instead of setting children on <textarea>."), defaultValue != null)
                  throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
                if (Array.isArray(textareaChildren)) {
                  if (!(textareaChildren.length <= 1))
                    throw Error("<textarea> can only have at most one child.");
                  textareaChildren = textareaChildren[0];
                }
                defaultValue = "" + textareaChildren;
              }
              defaultValue == null && (defaultValue = ""), initialValue = defaultValue;
            }
            props = _assign({}, props, {
              value: void 0,
              children: "" + initialValue
            });
          } else if (tag === "select") {
            {
              checkControlledValueProps("select", props);
              for (var i2 = 0; i2 < valuePropNames.length; i2++) {
                var propName = valuePropNames[i2];
                if (props[propName] != null) {
                  var isArray3 = Array.isArray(props[propName]);
                  props.multiple && !isArray3 ? error("The `%s` prop supplied to <select> must be an array if `multiple` is true.", propName) : !props.multiple && isArray3 && error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.", propName);
                }
              }
              props.value !== void 0 && props.defaultValue !== void 0 && !didWarnDefaultSelectValue && (error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), didWarnDefaultSelectValue = !0);
            }
            this.currentSelectValue = props.value != null ? props.value : props.defaultValue, props = _assign({}, props, {
              value: void 0
            });
          } else if (tag === "option") {
            var selected = null, selectValue = this.currentSelectValue, optionChildren = flattenOptionChildren(props.children);
            if (selectValue != null) {
              var value;
              if (props.value != null ? value = props.value + "" : value = optionChildren, selected = !1, Array.isArray(selectValue)) {
                for (var j = 0; j < selectValue.length; j++)
                  if ("" + selectValue[j] === value) {
                    selected = !0;
                    break;
                  }
              } else
                selected = "" + selectValue === value;
              props = _assign({
                selected: void 0,
                children: void 0
              }, props, {
                selected,
                children: optionChildren
              });
            }
          }
          validatePropertiesInDevelopment(tag, props), assertValidProps(tag, props);
          var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1), footer = "";
          omittedCloseTags.hasOwnProperty(tag) ? out += "/>" : (out += ">", footer = "</" + element.type + ">");
          var children, innerMarkup = getNonChildrenInnerMarkup(props);
          innerMarkup != null ? (children = [], newlineEatingTags.hasOwnProperty(tag) && innerMarkup.charAt(0) === `
` && (out += `
`), out += innerMarkup) : children = toArray(props.children);
          var frame = {
            domNamespace: getChildNamespace(parentNamespace, element.type),
            type: tag,
            children,
            childIndex: 0,
            context,
            footer
          };
          return frame.debugElementStack = [], this.stack.push(frame), this.previousWasTextNode = !1, out;
        }, ReactDOMServerRenderer2;
      }();
      function renderToString2(element, options) {
        var renderer = new ReactDOMServerRenderer(element, !1, options);
        try {
          var markup = renderer.read(1 / 0);
          return markup;
        } finally {
          renderer.destroy();
        }
      }
      function renderToStaticMarkup(element, options) {
        var renderer = new ReactDOMServerRenderer(element, !0, options);
        try {
          var markup = renderer.read(1 / 0);
          return markup;
        } finally {
          renderer.destroy();
        }
      }
      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, subClass.__proto__ = superClass;
      }
      var ReactMarkupReadableStream = /* @__PURE__ */ function(_Readable) {
        _inheritsLoose(ReactMarkupReadableStream2, _Readable);
        function ReactMarkupReadableStream2(element, makeStaticMarkup, options) {
          var _this;
          return _this = _Readable.call(this, {}) || this, _this.partialRenderer = new ReactDOMServerRenderer(element, makeStaticMarkup, options), _this;
        }
        var _proto = ReactMarkupReadableStream2.prototype;
        return _proto._destroy = function(err, callback) {
          this.partialRenderer.destroy(), callback(err);
        }, _proto._read = function(size) {
          try {
            this.push(this.partialRenderer.read(size));
          } catch (err) {
            this.destroy(err);
          }
        }, ReactMarkupReadableStream2;
      }(stream.Readable);
      function renderToNodeStream(element, options) {
        return new ReactMarkupReadableStream(element, !1, options);
      }
      function renderToStaticNodeStream(element, options) {
        return new ReactMarkupReadableStream(element, !0, options);
      }
      exports.renderToNodeStream = renderToNodeStream, exports.renderToStaticMarkup = renderToStaticMarkup, exports.renderToStaticNodeStream = renderToStaticNodeStream, exports.renderToString = renderToString2, exports.version = ReactVersion;
    })();
  }
});

// node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "node_modules/react-dom/server.node.js"(exports, module) {
    "use strict";
    module.exports = require_react_dom_server_node_development();
  }
});

// node_modules/react-dom/server.js
var require_server = __commonJS({
  "node_modules/react-dom/server.js"(exports, module) {
    "use strict";
    module.exports = require_server_node();
  }
});

// node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-dev-runtime.development.js"(exports) {
    "use strict";
    (function() {
      "use strict";
      var React5 = require_react(), _assign = require_object_assign(), REACT_ELEMENT_TYPE = 60103, REACT_PORTAL_TYPE = 60106;
      exports.Fragment = 60107;
      var REACT_STRICT_MODE_TYPE = 60108, REACT_PROFILER_TYPE = 60114, REACT_PROVIDER_TYPE = 60109, REACT_CONTEXT_TYPE = 60110, REACT_FORWARD_REF_TYPE = 60112, REACT_SUSPENSE_TYPE = 60113, REACT_SUSPENSE_LIST_TYPE = 60120, REACT_MEMO_TYPE = 60115, REACT_LAZY_TYPE = 60116, REACT_BLOCK_TYPE = 60121, REACT_SERVER_BLOCK_TYPE = 60122, REACT_FUNDAMENTAL_TYPE = 60117, REACT_SCOPE_TYPE = 60119, REACT_OPAQUE_ID_TYPE = 60128, REACT_DEBUG_TRACING_MODE_TYPE = 60129, REACT_OFFSCREEN_TYPE = 60130, REACT_LEGACY_HIDDEN_TYPE = 60131;
      if (typeof Symbol == "function" && Symbol.for) {
        var symbolFor = Symbol.for;
        REACT_ELEMENT_TYPE = symbolFor("react.element"), REACT_PORTAL_TYPE = symbolFor("react.portal"), exports.Fragment = symbolFor("react.fragment"), REACT_STRICT_MODE_TYPE = symbolFor("react.strict_mode"), REACT_PROFILER_TYPE = symbolFor("react.profiler"), REACT_PROVIDER_TYPE = symbolFor("react.provider"), REACT_CONTEXT_TYPE = symbolFor("react.context"), REACT_FORWARD_REF_TYPE = symbolFor("react.forward_ref"), REACT_SUSPENSE_TYPE = symbolFor("react.suspense"), REACT_SUSPENSE_LIST_TYPE = symbolFor("react.suspense_list"), REACT_MEMO_TYPE = symbolFor("react.memo"), REACT_LAZY_TYPE = symbolFor("react.lazy"), REACT_BLOCK_TYPE = symbolFor("react.block"), REACT_SERVER_BLOCK_TYPE = symbolFor("react.server.block"), REACT_FUNDAMENTAL_TYPE = symbolFor("react.fundamental"), REACT_SCOPE_TYPE = symbolFor("react.scope"), REACT_OPAQUE_ID_TYPE = symbolFor("react.opaque.id"), REACT_DEBUG_TRACING_MODE_TYPE = symbolFor("react.debug_trace_mode"), REACT_OFFSCREEN_TYPE = symbolFor("react.offscreen"), REACT_LEGACY_HIDDEN_TYPE = symbolFor("react.legacy_hidden");
      }
      var MAYBE_ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable != "object")
          return null;
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        return typeof maybeIterator == "function" ? maybeIterator : null;
      }
      var ReactSharedInternals = React5.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format2) {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++)
            args[_key2 - 1] = arguments[_key2];
          printWarning("error", format2, args);
        }
      }
      function printWarning(level, format2, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame, stack = ReactDebugCurrentFrame2.getStackAddendum();
          stack !== "" && (format2 += "%s", args = args.concat([stack]));
          var argsWithFormat = args.map(function(item) {
            return "" + item;
          });
          argsWithFormat.unshift("Warning: " + format2), Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = !1;
      function isValidElementType(type) {
        return !!(typeof type == "string" || typeof type == "function" || type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE));
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var functionName = innerType.displayName || innerType.name || "";
        return outerType.displayName || (functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName);
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentName(type) {
        if (type == null)
          return null;
        if (typeof type.tag == "number" && error("Received an unexpected object in getComponentName(). This is likely a bug in React. Please file an issue."), typeof type == "function")
          return type.displayName || type.name || null;
        if (typeof type == "string")
          return type;
        switch (type) {
          case exports.Fragment:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              return getComponentName(type.type);
            case REACT_BLOCK_TYPE:
              return getComponentName(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return getComponentName(init2(payload));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = !0;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log, prevInfo = console.info, prevWarn = console.warn, prevError = console.error, prevGroup = console.group, prevGroupCollapsed = console.groupCollapsed, prevGroupEnd = console.groupEnd;
            var props = {
              configurable: !0,
              enumerable: !0,
              value: disabledLog,
              writable: !0
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          if (disabledDepth--, disabledDepth === 0) {
            var props = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: _assign({}, props, {
                value: prevLog
              }),
              info: _assign({}, props, {
                value: prevInfo
              }),
              warn: _assign({}, props, {
                value: prevWarn
              }),
              error: _assign({}, props, {
                value: prevError
              }),
              group: _assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: _assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: _assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          disabledDepth < 0 && error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher, prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          return `
` + prefix + name;
        }
      }
      var reentry = !1, componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap == "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0)
            return frame;
        }
        var control;
        reentry = !0;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        previousDispatcher = ReactCurrentDispatcher.current, ReactCurrentDispatcher.current = null, disableLogs();
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            if (Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack == "string") {
            for (var sampleLines = sample.stack.split(`
`), controlLines = control.stack.split(`
`), s = sampleLines.length - 1, c = controlLines.length - 1; s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]; )
              c--;
            for (; s >= 1 && c >= 0; s--, c--)
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1)
                  do
                    if (s--, c--, c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = `
` + sampleLines[s].replace(" at new ", " at ");
                      return typeof fn == "function" && componentFrameCache.set(fn, _frame), _frame;
                    }
                  while (s >= 1 && c >= 0);
                break;
              }
          }
        } finally {
          reentry = !1, ReactCurrentDispatcher.current = previousDispatcher, reenableLogs(), Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "", syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        return typeof fn == "function" && componentFrameCache.set(fn, syntheticFrame), syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        return describeNativeComponentFrame(fn, !1);
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null)
          return "";
        if (typeof type == "function")
          return describeNativeComponentFrame(type, shouldConstruct(type));
        if (typeof type == "string")
          return describeBuiltInComponentFrame(type);
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type == "object")
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_BLOCK_TYPE:
              return describeFunctionComponentFrame(type._render);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type, payload = lazyComponent._payload, init2 = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
              } catch {
              }
            }
          }
        return "";
      }
      var loggedTypeFailures = {}, ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(Object.prototype.hasOwnProperty);
          for (var typeSpecName in typeSpecs)
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] != "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw err.name = "Invariant Violation", err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              error$1 && !(error$1 instanceof Error) && (setCurrentlyValidatingElement(element), error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1), setCurrentlyValidatingElement(null)), error$1 instanceof Error && !(error$1.message in loggedTypeFailures) && (loggedTypeFailures[error$1.message] = !0, setCurrentlyValidatingElement(element), error("Failed %s type: %s", location, error$1.message), setCurrentlyValidatingElement(null));
            }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner, hasOwnProperty2 = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
      didWarnAboutStringRefs = {};
      function hasValidRef(config2) {
        if (hasOwnProperty2.call(config2, "ref")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "ref").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.ref !== void 0;
      }
      function hasValidKey(config2) {
        if (hasOwnProperty2.call(config2, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config2, "key").get;
          if (getter && getter.isReactWarning)
            return !1;
        }
        return config2.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config2, self) {
        if (typeof config2.ref == "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
          var componentName = getComponentName(ReactCurrentOwner.current.type);
          didWarnAboutStringRefs[componentName] || (error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config2.ref), didWarnAboutStringRefs[componentName] = !0);
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            specialPropRefWarningShown || (specialPropRefWarningShown = !0, error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName));
          };
          warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: !0
          });
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          ref,
          props,
          _owner: owner
        };
        return element._store = {}, Object.defineProperty(element._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(element, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: self
        }), Object.defineProperty(element, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: source
        }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
      };
      function jsxDEV5(type, config2, maybeKey, source, self) {
        {
          var propName, props = {}, key = null, ref = null;
          maybeKey !== void 0 && (key = "" + maybeKey), hasValidKey(config2) && (key = "" + config2.key), hasValidRef(config2) && (ref = config2.ref, warnIfStringRefCannotBeAutoConverted(config2, self));
          for (propName in config2)
            hasOwnProperty2.call(config2, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config2[propName]);
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps)
              props[propName] === void 0 && (props[propName] = defaultProps[propName]);
          }
          if (key || ref) {
            var displayName = typeof type == "function" ? type.displayName || type.name || "Unknown" : type;
            key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner, ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        if (element) {
          var owner = element._owner, stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
      var propTypesMisspellWarningShown;
      propTypesMisspellWarningShown = !1;
      function isValidElement2(object) {
        return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentName(ReactCurrentOwner$1.current.type);
            if (name)
              return `

Check the render method of \`` + name + "`.";
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, ""), lineNumber = source.lineNumber;
            return `

Check your code at ` + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType == "string" ? parentType : parentType.displayName || parentType.name;
            parentName && (info = `

Check the top-level render call using <` + parentName + ">.");
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null)
            return;
          element._store.validated = !0;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo])
            return;
          ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
          var childOwner = "";
          element && element._owner && element._owner !== ReactCurrentOwner$1.current && (childOwner = " It was passed a child from " + getComponentName(element._owner.type) + "."), setCurrentlyValidatingElement$1(element), error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner), setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node != "object")
            return;
          if (Array.isArray(node))
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              isValidElement2(child) && validateExplicitKey(child, parentType);
            }
          else if (isValidElement2(node))
            node._store && (node._store.validated = !0);
          else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn == "function" && iteratorFn !== node.entries)
              for (var iterator = iteratorFn.call(node), step; !(step = iterator.next()).done; )
                isValidElement2(step.value) && validateExplicitKey(step.value, parentType);
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type == null || typeof type == "string")
            return;
          var propTypes;
          if (typeof type == "function")
            propTypes = type.propTypes;
          else if (typeof type == "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE))
            propTypes = type.propTypes;
          else
            return;
          if (propTypes) {
            var name = getComponentName(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = !0;
            var _name = getComponentName(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          typeof type.getDefaultProps == "function" && !type.getDefaultProps.isReactClassApproved && error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function validateFragmentProps(fragment) {
        {
          for (var keys2 = Object.keys(fragment.props), i = 0; i < keys2.length; i++) {
            var key = keys2[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment), error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key), setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          fragment.ref !== null && (setCurrentlyValidatingElement$1(fragment), error("Invalid attribute `ref` supplied to `React.Fragment`."), setCurrentlyValidatingElement$1(null));
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            (type === void 0 || typeof type == "object" && type !== null && Object.keys(type).length === 0) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var sourceInfo = getSourceInfoErrorAddendum(source);
            sourceInfo ? info += sourceInfo : info += getDeclarationErrorAddendum();
            var typeString;
            type === null ? typeString = "null" : Array.isArray(type) ? typeString = "array" : type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentName(type.type) || "Unknown") + " />", info = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type, error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV5(type, props, key, source, self);
          if (element == null)
            return element;
          if (validType) {
            var children = props.children;
            if (children !== void 0)
              if (isStaticChildren)
                if (Array.isArray(children)) {
                  for (var i = 0; i < children.length; i++)
                    validateChildKeys(children[i], type);
                  Object.freeze && Object.freeze(children);
                } else
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
              else
                validateChildKeys(children, type);
          }
          return type === exports.Fragment ? validateFragmentProps(element) : validatePropTypes(element), element;
        }
      }
      var jsxDEV$1 = jsxWithValidation;
      exports.jsxDEV = jsxDEV$1;
    })();
  }
});

// node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS({
  "node_modules/react/jsx-dev-runtime.js"(exports, module) {
    "use strict";
    module.exports = require_react_jsx_dev_runtime_development();
  }
});

// node_modules/remix-auth/build/authenticator.js
var require_authenticator = __commonJS({
  "node_modules/remix-auth/build/authenticator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.Authenticator = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports)), Authenticator2 = class {
      constructor(sessionStorage3, options = {}) {
        var _a;
        this.sessionStorage = sessionStorage3, this.strategies = /* @__PURE__ */ new Map(), this.sessionKey = options.sessionKey || "user", this.sessionErrorKey = options.sessionErrorKey || "auth:error", this.sessionStrategyKey = options.sessionStrategyKey || "strategy", this.throwOnError = (_a = options.throwOnError) !== null && _a !== void 0 ? _a : !1;
      }
      use(strategy, name) {
        return this.strategies.set(name ?? strategy.name, strategy), this;
      }
      unuse(name) {
        return this.strategies.delete(name), this;
      }
      authenticate(strategy, request, options = {}) {
        let strategyObj = this.strategies.get(strategy);
        if (!strategyObj)
          throw new Error(`Strategy ${strategy} not found.`);
        return strategyObj.authenticate(new Request(request.url, request), this.sessionStorage, {
          throwOnError: this.throwOnError,
          ...options,
          name: strategy,
          sessionKey: this.sessionKey,
          sessionErrorKey: this.sessionErrorKey,
          sessionStrategyKey: this.sessionStrategyKey
        });
      }
      async isAuthenticated(request, options = {}) {
        var _a;
        let user = (_a = (server_runtime_1.isSession(request) ? request : await this.sessionStorage.getSession(request.headers.get("Cookie"))).get(this.sessionKey)) !== null && _a !== void 0 ? _a : null;
        if (user) {
          if (options.successRedirect)
            throw server_runtime_1.redirect(options.successRedirect);
          return user;
        }
        if (options.failureRedirect)
          throw server_runtime_1.redirect(options.failureRedirect);
        return null;
      }
      async logout(request, options) {
        let session = server_runtime_1.isSession(request) ? request : await this.sessionStorage.getSession(request.headers.get("Cookie"));
        throw server_runtime_1.redirect(options.redirectTo, {
          headers: {
            "Set-Cookie": await this.sessionStorage.destroySession(session)
          }
        });
      }
    };
    exports.Authenticator = Authenticator2;
  }
});

// node_modules/remix-auth/build/authorizer.js
var require_authorizer = __commonJS({
  "node_modules/remix-auth/build/authorizer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.Authorizer = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports)), Authorizer = class {
      constructor(authenticator3, rules = []) {
        this.authenticator = authenticator3, this.rules = rules;
      }
      async authorize(args, { failureRedirect, raise = "response", rules = [] } = {}) {
        let user = await this.authenticator.isAuthenticated(args.request);
        if (!user)
          throw raise === "response" ? server_runtime_1.json({ message: "Not authenticated." }, { status: 401 }) : raise === "redirect" ? server_runtime_1.redirect(failureRedirect) : new Error("Not authenticated.");
        for (let rule of [...this.rules, ...rules])
          if (!await rule({ user, ...args }))
            throw raise === "redirect" ? server_runtime_1.redirect(failureRedirect) : raise === "response" ? rule.name ? server_runtime_1.json({ message: `Forbidden by policy ${rule.name}` }, { status: 403 }) : server_runtime_1.json({ message: "Forbidden" }, { status: 403 }) : rule.name ? new Error(`Forbidden by policy ${rule.name}`) : new Error("Forbidden.");
        return user;
      }
    };
    exports.Authorizer = Authorizer;
  }
});

// node_modules/remix-auth/build/error.js
var require_error = __commonJS({
  "node_modules/remix-auth/build/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.AuthorizationError = void 0;
    var AuthorizationError = class extends Error {
      constructor(message, cause) {
        super(message), this.cause = cause;
      }
    };
    exports.AuthorizationError = AuthorizationError;
  }
});

// node_modules/remix-auth/build/strategy.js
var require_strategy = __commonJS({
  "node_modules/remix-auth/build/strategy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.Strategy = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports)), error_1 = require_error(), Strategy = class {
      constructor(verify) {
        this.verify = verify;
      }
      async failure(message, request, sessionStorage3, options, cause) {
        if (!options.failureRedirect)
          throw options.throwOnError ? new error_1.AuthorizationError(message, cause) : server_runtime_1.json({ message }, 401);
        let session = await sessionStorage3.getSession(request.headers.get("Cookie"));
        throw session.flash(options.sessionErrorKey, { message }), server_runtime_1.redirect(options.failureRedirect, {
          headers: { "Set-Cookie": await sessionStorage3.commitSession(session) }
        });
      }
      async success(user, request, sessionStorage3, options) {
        var _a;
        if (!options.successRedirect)
          return user;
        let session = await sessionStorage3.getSession(request.headers.get("Cookie"));
        throw session.set(options.sessionKey, user), session.set(options.sessionStrategyKey, (_a = options.name) !== null && _a !== void 0 ? _a : this.name), server_runtime_1.redirect(options.successRedirect, {
          headers: { "Set-Cookie": await sessionStorage3.commitSession(session) }
        });
      }
    };
    exports.Strategy = Strategy;
  }
});

// node_modules/remix-auth/build/index.js
var require_build = __commonJS({
  "node_modules/remix-auth/build/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      k2 === void 0 && (k2 = k), Object.defineProperty(o, k2, { enumerable: !0, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      k2 === void 0 && (k2 = k), o[k2] = m[k];
    }), __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p) && __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    __exportStar(require_authenticator(), exports);
    __exportStar(require_authorizer(), exports);
    __exportStar(require_error(), exports);
    __exportStar(require_strategy(), exports);
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3, m = s * 60, h = m * 60, d = h * 24, w = d * 7, y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0)
        return parse3(val);
      if (type === "number" && isFinite(val))
        return options.long ? fmtLong(val) : fmtShort(val);
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse3(str) {
      if (str = String(str), !(str.length > 100)) {
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
        if (!!match) {
          var n = parseFloat(match[1]), type = (match[2] || "ms").toLowerCase();
          switch (type) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return n * y;
            case "weeks":
            case "week":
            case "w":
              return n * w;
            case "days":
            case "day":
            case "d":
              return n * d;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return n * h;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return n * m;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return n * s;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return n;
            default:
              return;
          }
        }
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      return msAbs >= d ? Math.round(ms / d) + "d" : msAbs >= h ? Math.round(ms / h) + "h" : msAbs >= m ? Math.round(ms / m) + "m" : msAbs >= s ? Math.round(ms / s) + "s" : ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      return msAbs >= d ? plural(ms, msAbs, d, "day") : msAbs >= h ? plural(ms, msAbs, h, "hour") : msAbs >= m ? plural(ms, msAbs, m, "minute") : msAbs >= s ? plural(ms, msAbs, s, "second") : ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env2) {
      createDebug.debug = createDebug, createDebug.default = createDebug, createDebug.coerce = coerce2, createDebug.disable = disable, createDebug.enable = enable, createDebug.enabled = enabled, createDebug.humanize = require_ms(), createDebug.destroy = destroy, Object.keys(env2).forEach((key) => {
        createDebug[key] = env2[key];
      }), createDebug.names = [], createDebug.skips = [], createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++)
          hash = (hash << 5) - hash + namespace.charCodeAt(i), hash |= 0;
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime, enableOverride = null, namespacesCache, enabledCache;
        function debug2(...args) {
          if (!debug2.enabled)
            return;
          let self = debug2, curr = Number(new Date()), ms = curr - (prevTime || curr);
          self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, args[0] = createDebug.coerce(args[0]), typeof args[0] != "string" && args.unshift("%O");
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format2) => {
            if (match === "%%")
              return "%";
            index++;
            let formatter = createDebug.formatters[format2];
            if (typeof formatter == "function") {
              let val = args[index];
              match = formatter.call(self, val), args.splice(index, 1), index--;
            }
            return match;
          }), createDebug.formatArgs.call(self, args), (self.log || createDebug.log).apply(self, args);
        }
        return debug2.namespace = namespace, debug2.useColors = createDebug.useColors(), debug2.color = createDebug.selectColor(namespace), debug2.extend = extend, debug2.destroy = createDebug.destroy, Object.defineProperty(debug2, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () => enableOverride !== null ? enableOverride : (namespacesCache !== createDebug.namespaces && (namespacesCache = createDebug.namespaces, enabledCache = createDebug.enabled(namespace)), enabledCache),
          set: (v) => {
            enableOverride = v;
          }
        }), typeof createDebug.init == "function" && createDebug.init(debug2), debug2;
      }
      function extend(namespace, delimiter) {
        let newDebug = createDebug(this.namespace + (typeof delimiter > "u" ? ":" : delimiter) + namespace);
        return newDebug.log = this.log, newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces), createDebug.namespaces = namespaces, createDebug.names = [], createDebug.skips = [];
        let i, split = (typeof namespaces == "string" ? namespaces : "").split(/[\s,]+/), len = split.length;
        for (i = 0; i < len; i++)
          !split[i] || (namespaces = split[i].replace(/\*/g, ".*?"), namespaces[0] === "-" ? createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$")) : createDebug.names.push(new RegExp("^" + namespaces + "$")));
      }
      function disable() {
        let namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        return createDebug.enable(""), namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*")
          return !0;
        let i, len;
        for (i = 0, len = createDebug.skips.length; i < len; i++)
          if (createDebug.skips[i].test(name))
            return !1;
        for (i = 0, len = createDebug.names.length; i < len; i++)
          if (createDebug.names[i].test(name))
            return !0;
        return !1;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce2(val) {
        return val instanceof Error ? val.stack || val.message : val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      return createDebug.enable(createDebug.load()), createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = !1;
      return () => {
        warned || (warned = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      if (args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff), !this.useColors)
        return;
      let c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0, lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        match !== "%%" && (index++, match === "%c" && (lastC = index));
      }), args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        namespaces ? exports.storage.setItem("debug", namespaces) : exports.storage.removeItem("debug");
      } catch {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/uuid/dist/esm-browser/rng.js
function rng() {
  if (!getRandomValues && (getRandomValues = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !getRandomValues))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return getRandomValues(rnds8);
}
var getRandomValues, rnds8, init_rng = __esm({
  "node_modules/uuid/dist/esm-browser/rng.js"() {
    rnds8 = new Uint8Array(16);
  }
});

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default, init_regex = __esm({
  "node_modules/uuid/dist/esm-browser/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid == "string" && regex_default.test(uuid);
}
var validate_default, init_validate = __esm({
  "node_modules/uuid/dist/esm-browser/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-browser/stringify.js
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid))
    throw TypeError("Stringified UUID is invalid");
  return uuid;
}
var byteToHex, i, stringify_default, init_stringify = __esm({
  "node_modules/uuid/dist/esm-browser/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (i = 0; i < 256; ++i)
      byteToHex.push((i + 256).toString(16).substr(1));
    stringify_default = stringify;
  }
});

// node_modules/uuid/dist/esm-browser/v1.js
function v1(options, buf, offset) {
  var i = buf && offset || 0, b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId, clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();
    node == null && (node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]]), clockseq == null && (clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383);
  }
  var msecs = options.msecs !== void 0 ? options.msecs : Date.now(), nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1, dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0 && (clockseq = clockseq + 1 & 16383), (dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0 && (nsecs = 0), nsecs >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  _lastMSecs = msecs, _lastNSecs = nsecs, _clockseq = clockseq, msecs += 122192928e5;
  var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255, b[i++] = tl >>> 16 & 255, b[i++] = tl >>> 8 & 255, b[i++] = tl & 255;
  var tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255, b[i++] = tmh & 255, b[i++] = tmh >>> 24 & 15 | 16, b[i++] = tmh >>> 16 & 255, b[i++] = clockseq >>> 8 | 128, b[i++] = clockseq & 255;
  for (var n = 0; n < 6; ++n)
    b[i + n] = node[n];
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default, init_v1 = __esm({
  "node_modules/uuid/dist/esm-browser/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0, _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/uuid/dist/esm-browser/parse.js
function parse2(uuid) {
  if (!validate_default(uuid))
    throw TypeError("Invalid UUID");
  var v, arr = new Uint8Array(16);
  return arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24, arr[1] = v >>> 16 & 255, arr[2] = v >>> 8 & 255, arr[3] = v & 255, arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, arr[5] = v & 255, arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, arr[7] = v & 255, arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, arr[9] = v & 255, arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255, arr[11] = v / 4294967296 & 255, arr[12] = v >>> 24 & 255, arr[13] = v >>> 16 & 255, arr[14] = v >>> 8 & 255, arr[15] = v & 255, arr;
}
var parse_default, init_parse = __esm({
  "node_modules/uuid/dist/esm-browser/parse.js"() {
    init_validate();
    parse_default = parse2;
  }
});

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  for (var bytes = [], i = 0; i < str.length; ++i)
    bytes.push(str.charCodeAt(i));
  return bytes;
}
function v35_default(name, version3, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value == "string" && (value = stringToBytes(value)), typeof namespace == "string" && (namespace = parse_default(namespace)), namespace.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var bytes = new Uint8Array(16 + value.length);
    if (bytes.set(namespace), bytes.set(value, namespace.length), bytes = hashfunc(bytes), bytes[6] = bytes[6] & 15 | version3, bytes[8] = bytes[8] & 63 | 128, buf) {
      offset = offset || 0;
      for (var i = 0; i < 16; ++i)
        buf[offset + i] = bytes[i];
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch {
  }
  return generateUUID.DNS = DNS, generateUUID.URL = URL2, generateUUID;
}
var DNS, URL2, init_v35 = __esm({
  "node_modules/uuid/dist/esm-browser/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes == "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (var i = 0; i < msg.length; ++i)
      bytes[i] = msg.charCodeAt(i);
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  for (var output = [], length32 = input.length * 32, hexTab = "0123456789abcdef", i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 255, hex2 = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex2);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32, x[getOutputLength(len) - 1] = len;
  for (var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, i = 0; i < x.length; i += 16) {
    var olda = a, oldb = b, oldc = c, oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936), d = md5ff(d, a, b, c, x[i + 1], 12, -389564586), c = md5ff(c, d, a, b, x[i + 2], 17, 606105819), b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330), a = md5ff(a, b, c, d, x[i + 4], 7, -176418897), d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426), c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341), b = md5ff(b, c, d, a, x[i + 7], 22, -45705983), a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416), d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417), c = md5ff(c, d, a, b, x[i + 10], 17, -42063), b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162), a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682), d = md5ff(d, a, b, c, x[i + 13], 12, -40341101), c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290), b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329), a = md5gg(a, b, c, d, x[i + 1], 5, -165796510), d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632), c = md5gg(c, d, a, b, x[i + 11], 14, 643717713), b = md5gg(b, c, d, a, x[i], 20, -373897302), a = md5gg(a, b, c, d, x[i + 5], 5, -701558691), d = md5gg(d, a, b, c, x[i + 10], 9, 38016083), c = md5gg(c, d, a, b, x[i + 15], 14, -660478335), b = md5gg(b, c, d, a, x[i + 4], 20, -405537848), a = md5gg(a, b, c, d, x[i + 9], 5, 568446438), d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690), c = md5gg(c, d, a, b, x[i + 3], 14, -187363961), b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501), a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467), d = md5gg(d, a, b, c, x[i + 2], 9, -51403784), c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473), b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734), a = md5hh(a, b, c, d, x[i + 5], 4, -378558), d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463), c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562), b = md5hh(b, c, d, a, x[i + 14], 23, -35309556), a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060), d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353), c = md5hh(c, d, a, b, x[i + 7], 16, -155497632), b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640), a = md5hh(a, b, c, d, x[i + 13], 4, 681279174), d = md5hh(d, a, b, c, x[i], 11, -358537222), c = md5hh(c, d, a, b, x[i + 3], 16, -722521979), b = md5hh(b, c, d, a, x[i + 6], 23, 76029189), a = md5hh(a, b, c, d, x[i + 9], 4, -640364487), d = md5hh(d, a, b, c, x[i + 12], 11, -421815835), c = md5hh(c, d, a, b, x[i + 15], 16, 530742520), b = md5hh(b, c, d, a, x[i + 2], 23, -995338651), a = md5ii(a, b, c, d, x[i], 6, -198630844), d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415), c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905), b = md5ii(b, c, d, a, x[i + 5], 21, -57434055), a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571), d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606), c = md5ii(c, d, a, b, x[i + 10], 15, -1051523), b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799), a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359), d = md5ii(d, a, b, c, x[i + 15], 10, -30611744), c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380), b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649), a = md5ii(a, b, c, d, x[i + 4], 6, -145523070), d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379), c = md5ii(c, d, a, b, x[i + 2], 15, 718787259), b = md5ii(b, c, d, a, x[i + 9], 21, -343485551), a = safeAdd(a, olda), b = safeAdd(b, oldb), c = safeAdd(c, oldc), d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0)
    return [];
  for (var length8 = input.length * 8, output = new Uint32Array(getOutputLength(length8)), i = 0; i < length8; i += 8)
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  return output;
}
function safeAdd(x, y) {
  var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var md5_default, init_md5 = __esm({
  "node_modules/uuid/dist/esm-browser/md5.js"() {
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-browser/v3.js
var v3, v3_default, init_v3 = __esm({
  "node_modules/uuid/dist/esm-browser/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default), v3_default = v3;
  }
});

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  if (rnds[6] = rnds[6] & 15 | 64, rnds[8] = rnds[8] & 63 | 128, buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i)
      buf[offset + i] = rnds[i];
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default, init_v4 = __esm({
  "node_modules/uuid/dist/esm-browser/v4.js"() {
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  var K = [1518500249, 1859775393, 2400959708, 3395469782], H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes == "string") {
    var msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (var i = 0; i < msg.length; ++i)
      bytes.push(msg.charCodeAt(i));
  } else
    Array.isArray(bytes) || (bytes = Array.prototype.slice.call(bytes));
  bytes.push(128);
  for (var l = bytes.length / 4 + 2, N = Math.ceil(l / 16), M = new Array(N), _i = 0; _i < N; ++_i) {
    for (var arr = new Uint32Array(16), j = 0; j < 16; ++j)
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    M[_i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32), M[N - 1][14] = Math.floor(M[N - 1][14]), M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (var _i2 = 0; _i2 < N; ++_i2) {
    for (var W = new Uint32Array(80), t = 0; t < 16; ++t)
      W[t] = M[_i2][t];
    for (var _t = 16; _t < 80; ++_t)
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    for (var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20), T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d, d = c, c = ROTL(b, 30) >>> 0, b = a, a = T;
    }
    H[0] = H[0] + a >>> 0, H[1] = H[1] + b >>> 0, H[2] = H[2] + c >>> 0, H[3] = H[3] + d >>> 0, H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default, init_sha1 = __esm({
  "node_modules/uuid/dist/esm-browser/sha1.js"() {
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-browser/v5.js
var v5, v5_default, init_v5 = __esm({
  "node_modules/uuid/dist/esm-browser/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default), v5_default = v5;
  }
});

// node_modules/uuid/dist/esm-browser/nil.js
var nil_default, init_nil = __esm({
  "node_modules/uuid/dist/esm-browser/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/uuid/dist/esm-browser/version.js
function version2(uuid) {
  if (!validate_default(uuid))
    throw TypeError("Invalid UUID");
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default, init_version = __esm({
  "node_modules/uuid/dist/esm-browser/version.js"() {
    init_validate();
    version_default = version2;
  }
});

// node_modules/uuid/dist/esm-browser/index.js
var esm_browser_exports = {};
__export(esm_browser_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_browser = __esm({
  "node_modules/uuid/dist/esm-browser/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/remix-auth-oauth2/build/index.js
var require_build2 = __commonJS({
  "node_modules/remix-auth-oauth2/build/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { default: mod };
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.OAuth2Strategy = void 0;
    var server_runtime_1 = (init_esm(), __toCommonJS(esm_exports)), debug_1 = __importDefault(require_browser()), remix_auth_1 = require_build(), uuid_1 = (init_esm_browser(), __toCommonJS(esm_browser_exports)), debug2 = (0, debug_1.default)("OAuth2Strategy"), OAuth2Strategy = class extends remix_auth_1.Strategy {
      constructor(options, verify) {
        var _a;
        super(verify), this.name = "oauth2", this.sessionStateKey = "oauth2:state", this.authorizationURL = options.authorizationURL, this.tokenURL = options.tokenURL, this.clientID = options.clientID, this.clientSecret = options.clientSecret, this.callbackURL = options.callbackURL, this.responseType = (_a = options.responseType) !== null && _a !== void 0 ? _a : "code";
      }
      async authenticate(request, sessionStorage3, options) {
        var _a;
        debug2("Request URL", request.url);
        let url = new URL(request.url), session = await sessionStorage3.getSession(request.headers.get("Cookie")), user = (_a = session.get(options.sessionKey)) !== null && _a !== void 0 ? _a : null;
        if (user)
          return debug2("User is authenticated"), this.success(user, request, sessionStorage3, options);
        let callbackURL = this.getCallbackURL(url);
        if (debug2("Callback URL", callbackURL), url.pathname !== callbackURL.pathname) {
          debug2("Redirecting to callback URL");
          let state = this.generateState();
          throw debug2("State", state), session.set(this.sessionStateKey, state), (0, server_runtime_1.redirect)(this.getAuthorizationURL(request, state).toString(), {
            headers: { "Set-Cookie": await sessionStorage3.commitSession(session) }
          });
        }
        let stateUrl = url.searchParams.get("state");
        if (debug2("State from URL", stateUrl), !stateUrl)
          return await this.failure("Missing state on URL.", request, sessionStorage3, options, new Error("Missing state on URL."));
        let stateSession = session.get(this.sessionStateKey);
        if (debug2("State from session", stateSession), !stateSession)
          return await this.failure("Missing state on session.", request, sessionStorage3, options, new Error("Missing state on session."));
        if (stateSession === stateUrl)
          debug2("State is valid"), session.unset(this.sessionStateKey);
        else
          return await this.failure("State doesn't match.", request, sessionStorage3, options, new Error("State doesn't match."));
        let code = url.searchParams.get("code");
        if (!code)
          return await this.failure("Missing code.", request, sessionStorage3, options, new Error("Missing code."));
        try {
          let params = new URLSearchParams(this.tokenParams());
          params.set("grant_type", "authorization_code"), params.set("redirect_uri", callbackURL.toString());
          let { accessToken, refreshToken, extraParams } = await this.fetchAccessToken(code, params), profile = await this.userProfile(accessToken, extraParams);
          user = await this.verify({
            accessToken,
            refreshToken,
            extraParams,
            profile,
            context: options.context
          });
        } catch (error) {
          return debug2("Failed to verify user", error), error instanceof Error ? await this.failure(error.message, request, sessionStorage3, options, error) : typeof error == "string" ? await this.failure(error, request, sessionStorage3, options, new Error(error)) : await this.failure("Unknown error", request, sessionStorage3, options, new Error(JSON.stringify(error, null, 2)));
        }
        return debug2("User authenticated"), await this.success(user, request, sessionStorage3, options);
      }
      async userProfile(accessToken, params) {
        return { provider: "oauth2" };
      }
      authorizationParams(params) {
        return new URLSearchParams(params);
      }
      tokenParams() {
        return new URLSearchParams();
      }
      async getAccessToken(response) {
        let { access_token, refresh_token, ...extraParams } = await response.json();
        return {
          accessToken: access_token,
          refreshToken: refresh_token,
          extraParams
        };
      }
      getCallbackURL(url) {
        return this.callbackURL.startsWith("http:") || this.callbackURL.startsWith("https:") ? new URL(this.callbackURL) : this.callbackURL.startsWith("/") ? new URL(this.callbackURL, url) : new URL(`${url.protocol}//${this.callbackURL}`);
      }
      getAuthorizationURL(request, state) {
        let params = new URLSearchParams(this.authorizationParams(new URL(request.url).searchParams));
        params.set("response_type", this.responseType), params.set("client_id", this.clientID), params.set("redirect_uri", this.getCallbackURL(new URL(request.url)).toString()), params.set("state", state);
        let url = new URL(this.authorizationURL);
        return url.search = params.toString(), url;
      }
      generateState() {
        return (0, uuid_1.v4)();
      }
      async fetchAccessToken(code, params) {
        params.set("client_id", this.clientID), params.set("client_secret", this.clientSecret), params.get("grant_type") === "refresh_token" ? params.set("refresh_token", code) : params.set("code", code);
        let response = await fetch(this.tokenURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params
        });
        if (!response.ok)
          throw await response.text();
        return await this.getAccessToken(response.clone());
      }
    };
    exports.OAuth2Strategy = OAuth2Strategy;
  }
});

// node_modules/remix-auth-auth0/build/index.js
var require_build3 = __commonJS({
  "node_modules/remix-auth-auth0/build/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.Auth0Strategy = void 0;
    var remix_auth_oauth2_1 = require_build2(), Auth0Strategy2 = class extends remix_auth_oauth2_1.OAuth2Strategy {
      constructor(options, verify) {
        super({
          authorizationURL: `https://${options.domain}/authorize`,
          tokenURL: `https://${options.domain}/oauth/token`,
          clientID: options.clientID,
          clientSecret: options.clientSecret,
          callbackURL: options.callbackURL
        }, verify), this.name = "auth0", this.userInfoURL = `https://${options.domain}/userinfo`, this.scope = options.scope || "openid profile email", this.audience = options.audience, this.organization = options.organization;
      }
      authorizationParams(params) {
        return params.set("scope", this.scope), this.audience && params.set("audience", this.audience), this.organization && params.set("organization", this.organization), params;
      }
      async userProfile(accessToken) {
        let data = await (await fetch(this.userInfoURL, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })).json();
        return {
          provider: "auth0",
          displayName: data.name,
          id: data.sub,
          name: {
            familyName: data.family_name,
            givenName: data.given_name,
            middleName: data.middle_name
          },
          emails: [{ value: data.email }],
          photos: [{ value: data.picture }],
          _json: data
        };
      }
    };
    exports.Auth0Strategy = Auth0Strategy2;
  }
});

// node_modules/@prisma/client/runtime/index-browser.js
var require_index_browser = __commonJS({
  "node_modules/@prisma/client/runtime/index-browser.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty, __getOwnPropDesc2 = Object.getOwnPropertyDescriptor, __getOwnPropNames2 = Object.getOwnPropertyNames, __hasOwnProp2 = Object.prototype.hasOwnProperty, __name = (target, value) => __defProp2(target, "name", { value, configurable: !0 }), __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: !0 });
    }, __copyProps2 = (to, from2, except, desc) => {
      if (from2 && typeof from2 == "object" || typeof from2 == "function")
        for (let key of __getOwnPropNames2(from2))
          !__hasOwnProp2.call(to, key) && key !== except && __defProp2(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc2(from2, key)) || desc.enumerable });
      return to;
    }, __toCommonJS2 = (mod2) => __copyProps2(__defProp2({}, "__esModule", { value: !0 }), mod2), index_browser_exports = {};
    __export2(index_browser_exports, {
      Decimal: () => decimal_default,
      makeStrictEnum: () => makeStrictEnum,
      objectEnumValues: () => objectEnumValues
    });
    module.exports = __toCommonJS2(index_browser_exports);
    var secret = Symbol(), representations = /* @__PURE__ */ new WeakMap(), ObjectEnumValue = class {
      constructor(arg) {
        arg === secret ? representations.set(this, `Prisma.${this._getName()}`) : representations.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return representations.get(this);
      }
    };
    __name(ObjectEnumValue, "ObjectEnumValue");
    var NullTypesEnumValue = class extends ObjectEnumValue {
      _getNamespace() {
        return "NullTypes";
      }
    };
    __name(NullTypesEnumValue, "NullTypesEnumValue");
    var DbNull = class extends NullTypesEnumValue {
    };
    __name(DbNull, "DbNull");
    var JsonNull = class extends NullTypesEnumValue {
    };
    __name(JsonNull, "JsonNull");
    var AnyNull = class extends NullTypesEnumValue {
    };
    __name(AnyNull, "AnyNull");
    var objectEnumValues = {
      classes: {
        DbNull,
        JsonNull,
        AnyNull
      },
      instances: {
        DbNull: new DbNull(secret),
        JsonNull: new JsonNull(secret),
        AnyNull: new AnyNull(secret)
      }
    }, allowList = /* @__PURE__ */ new Set([
      "toJSON",
      "asymmetricMatch",
      Symbol.iterator,
      Symbol.toStringTag,
      Symbol.isConcatSpreadable,
      Symbol.toPrimitive
    ]);
    function makeStrictEnum(definition) {
      return new Proxy(definition, {
        get(target, property) {
          if (property in target)
            return target[property];
          if (!allowList.has(property))
            throw new TypeError(`Invalid enum value: ${String(property)}`);
        }
      });
    }
    __name(makeStrictEnum, "makeStrictEnum");
    var EXP_LIMIT = 9e15, MAX_DIGITS = 1e9, NUMERALS = "0123456789abcdef", LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", DEFAULTS = {
      precision: 20,
      rounding: 4,
      modulo: 1,
      toExpNeg: -7,
      toExpPos: 21,
      minE: -EXP_LIMIT,
      maxE: EXP_LIMIT,
      crypto: !1
    }, inexact, quadrant, external = !0, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", precisionLimitExceeded = decimalError + "Precision limit exceeded", cryptoUnavailable = decimalError + "crypto unavailable", tag = "[object Decimal]", mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10.length - 1, PI_PRECISION = PI.length - 1, P = { toStringTag: tag };
    P.absoluteValue = P.abs = function() {
      var x = new this.constructor(this);
      return x.s < 0 && (x.s = 1), finalise(x);
    };
    P.ceil = function() {
      return finalise(new this.constructor(this), this.e + 1, 2);
    };
    P.clampedTo = P.clamp = function(min2, max2) {
      var k, x = this, Ctor = x.constructor;
      if (min2 = new Ctor(min2), max2 = new Ctor(max2), !min2.s || !max2.s)
        return new Ctor(NaN);
      if (min2.gt(max2))
        throw Error(invalidArgument + max2);
      return k = x.cmp(min2), k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
    };
    P.comparedTo = P.cmp = function(y) {
      var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
      if (!xd || !yd)
        return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
      if (!xd[0] || !yd[0])
        return xd[0] ? xs : yd[0] ? -ys : 0;
      if (xs !== ys)
        return xs;
      if (x.e !== y.e)
        return x.e > y.e ^ xs < 0 ? 1 : -1;
      for (xdL = xd.length, ydL = yd.length, i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i)
        if (xd[i] !== yd[i])
          return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
      return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
    };
    P.cosine = P.cos = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      return x.d ? x.d[0] ? (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE, Ctor.rounding = 1, x = cosine(Ctor, toLessThanHalfPi(Ctor, x)), Ctor.precision = pr, Ctor.rounding = rm, finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, !0)) : new Ctor(1) : new Ctor(NaN);
    };
    P.cubeRoot = P.cbrt = function() {
      var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero())
        return new Ctor(x);
      for (external = !1, s = x.s * mathpow(x.s * x, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (n = digitsToString(x.d), e = x.e, (s = (e - n.length + 1) % 3) && (n += s == 1 || s == -2 ? "0" : "00"), s = mathpow(n, 1 / 3), e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? n = "5e" + e : (n = s.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + e), r = new Ctor(n), r.s = x.s) : r = new Ctor(s.toString()), sd = (e = Ctor.precision) + 3; ; )
        if (t = r, t3 = t.times(t).times(t), t3plusx = t3.plus(x), r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1), digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd))
          if (n = n.slice(sd - 3, sd + 1), n == "9999" || !rep && n == "4999") {
            if (!rep && (finalise(t, e + 1, 0), t.times(t).times(t).eq(x))) {
              r = t;
              break;
            }
            sd += 4, rep = 1;
          } else {
            (!+n || !+n.slice(1) && n.charAt(0) == "5") && (finalise(r, e + 1, 1), m = !r.times(r).times(r).eq(x));
            break;
          }
      return external = !0, finalise(r, e, Ctor.rounding, m);
    };
    P.decimalPlaces = P.dp = function() {
      var w, d = this.d, n = NaN;
      if (d) {
        if (w = d.length - 1, n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE, w = d[w], w)
          for (; w % 10 == 0; w /= 10)
            n--;
        n < 0 && (n = 0);
      }
      return n;
    };
    P.dividedBy = P.div = function(y) {
      return divide(this, new this.constructor(y));
    };
    P.dividedToIntegerBy = P.divToInt = function(y) {
      var x = this, Ctor = x.constructor;
      return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
    };
    P.equals = P.eq = function(y) {
      return this.cmp(y) === 0;
    };
    P.floor = function() {
      return finalise(new this.constructor(this), this.e + 1, 3);
    };
    P.greaterThan = P.gt = function(y) {
      return this.cmp(y) > 0;
    };
    P.greaterThanOrEqualTo = P.gte = function(y) {
      var k = this.cmp(y);
      return k == 1 || k === 0;
    };
    P.hyperbolicCosine = P.cosh = function() {
      var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
      if (!x.isFinite())
        return new Ctor(x.s ? 1 / 0 : NaN);
      if (x.isZero())
        return one;
      pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + Math.max(x.e, x.sd()) + 4, Ctor.rounding = 1, len = x.d.length, len < 32 ? (k = Math.ceil(len / 3), n = (1 / tinyPow(4, k)).toString()) : (k = 16, n = "2.3283064365386962890625e-10"), x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), !0);
      for (var cosh2_x, i = k, d8 = new Ctor(8); i--; )
        cosh2_x = x.times(x), x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
      return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, !0);
    };
    P.hyperbolicSine = P.sinh = function() {
      var k, pr, rm, len, x = this, Ctor = x.constructor;
      if (!x.isFinite() || x.isZero())
        return new Ctor(x);
      if (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + Math.max(x.e, x.sd()) + 4, Ctor.rounding = 1, len = x.d.length, len < 3)
        x = taylorSeries(Ctor, 2, x, x, !0);
      else {
        k = 1.4 * Math.sqrt(len), k = k > 16 ? 16 : k | 0, x = x.times(1 / tinyPow(5, k)), x = taylorSeries(Ctor, 2, x, x, !0);
        for (var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20); k--; )
          sinh2_x = x.times(x), x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
      }
      return Ctor.precision = pr, Ctor.rounding = rm, finalise(x, pr, rm, !0);
    };
    P.hyperbolicTangent = P.tanh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      return x.isFinite() ? x.isZero() ? new Ctor(x) : (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + 7, Ctor.rounding = 1, divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm)) : new Ctor(x.s);
    };
    P.inverseCosine = P.acos = function() {
      var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
      return k !== -1 ? k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN) : x.isZero() ? getPi(Ctor, pr + 4, rm).times(0.5) : (Ctor.precision = pr + 6, Ctor.rounding = 1, x = x.asin(), halfPi = getPi(Ctor, pr + 4, rm).times(0.5), Ctor.precision = pr, Ctor.rounding = rm, halfPi.minus(x));
    };
    P.inverseHyperbolicCosine = P.acosh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      return x.lte(1) ? new Ctor(x.eq(1) ? 0 : NaN) : x.isFinite() ? (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4, Ctor.rounding = 1, external = !1, x = x.times(x).minus(1).sqrt().plus(x), external = !0, Ctor.precision = pr, Ctor.rounding = rm, x.ln()) : new Ctor(x);
    };
    P.inverseHyperbolicSine = P.asinh = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      return !x.isFinite() || x.isZero() ? new Ctor(x) : (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6, Ctor.rounding = 1, external = !1, x = x.times(x).plus(1).sqrt().plus(x), external = !0, Ctor.precision = pr, Ctor.rounding = rm, x.ln());
    };
    P.inverseHyperbolicTangent = P.atanh = function() {
      var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
      return x.isFinite() ? x.e >= 0 ? new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN) : (pr = Ctor.precision, rm = Ctor.rounding, xsd = x.sd(), Math.max(xsd, pr) < 2 * -x.e - 1 ? finalise(new Ctor(x), pr, rm, !0) : (Ctor.precision = wpr = xsd - x.e, x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1), Ctor.precision = pr + 4, Ctor.rounding = 1, x = x.ln(), Ctor.precision = pr, Ctor.rounding = rm, x.times(0.5))) : new Ctor(NaN);
    };
    P.inverseSine = P.asin = function() {
      var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
      return x.isZero() ? new Ctor(x) : (k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding, k !== -1 ? k === 0 ? (halfPi = getPi(Ctor, pr + 4, rm).times(0.5), halfPi.s = x.s, halfPi) : new Ctor(NaN) : (Ctor.precision = pr + 6, Ctor.rounding = 1, x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan(), Ctor.precision = pr, Ctor.rounding = rm, x.times(2)));
    };
    P.inverseTangent = P.atan = function() {
      var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
      if (x.isFinite()) {
        if (x.isZero())
          return new Ctor(x);
        if (x.abs().eq(1) && pr + 4 <= PI_PRECISION)
          return r = getPi(Ctor, pr + 4, rm).times(0.25), r.s = x.s, r;
      } else {
        if (!x.s)
          return new Ctor(NaN);
        if (pr + 4 <= PI_PRECISION)
          return r = getPi(Ctor, pr + 4, rm).times(0.5), r.s = x.s, r;
      }
      for (Ctor.precision = wpr = pr + 10, Ctor.rounding = 1, k = Math.min(28, wpr / LOG_BASE + 2 | 0), i = k; i; --i)
        x = x.div(x.times(x).plus(1).sqrt().plus(1));
      for (external = !1, j = Math.ceil(wpr / LOG_BASE), n = 1, x2 = x.times(x), r = new Ctor(x), px = x; i !== -1; )
        if (px = px.times(x2), t = r.minus(px.div(n += 2)), px = px.times(x2), r = t.plus(px.div(n += 2)), r.d[j] !== void 0)
          for (i = j; r.d[i] === t.d[i] && i--; )
            ;
      return k && (r = r.times(2 << k - 1)), external = !0, finalise(r, Ctor.precision = pr, Ctor.rounding = rm, !0);
    };
    P.isFinite = function() {
      return !!this.d;
    };
    P.isInteger = P.isInt = function() {
      return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
    };
    P.isNaN = function() {
      return !this.s;
    };
    P.isNegative = P.isNeg = function() {
      return this.s < 0;
    };
    P.isPositive = P.isPos = function() {
      return this.s > 0;
    };
    P.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    P.lessThan = P.lt = function(y) {
      return this.cmp(y) < 0;
    };
    P.lessThanOrEqualTo = P.lte = function(y) {
      return this.cmp(y) < 1;
    };
    P.logarithm = P.log = function(base) {
      var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
      if (base == null)
        base = new Ctor(10), isBase10 = !0;
      else {
        if (base = new Ctor(base), d = base.d, base.s < 0 || !d || !d[0] || base.eq(1))
          return new Ctor(NaN);
        isBase10 = base.eq(10);
      }
      if (d = arg.d, arg.s < 0 || !d || !d[0] || arg.eq(1))
        return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
      if (isBase10)
        if (d.length > 1)
          inf = !0;
        else {
          for (k = d[0]; k % 10 === 0; )
            k /= 10;
          inf = k !== 1;
        }
      if (external = !1, sd = pr + guard, num = naturalLogarithm(arg, sd), denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd), r = divide(num, denominator, sd, 1), checkRoundingDigits(r.d, k = pr, rm))
        do
          if (sd += 10, num = naturalLogarithm(arg, sd), denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd), r = divide(num, denominator, sd, 1), !inf) {
            +digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14 && (r = finalise(r, pr + 1, 0));
            break;
          }
        while (checkRoundingDigits(r.d, k += 10, rm));
      return external = !0, finalise(r, pr, rm);
    };
    P.minus = P.sub = function(y) {
      var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
      if (y = new Ctor(y), !x.d || !y.d)
        return !x.s || !y.s ? y = new Ctor(NaN) : x.d ? y.s = -y.s : y = new Ctor(y.d || x.s !== y.s ? x : NaN), y;
      if (x.s != y.s)
        return y.s = -y.s, x.plus(y);
      if (xd = x.d, yd = y.d, pr = Ctor.precision, rm = Ctor.rounding, !xd[0] || !yd[0]) {
        if (yd[0])
          y.s = -y.s;
        else if (xd[0])
          y = new Ctor(x);
        else
          return new Ctor(rm === 3 ? -0 : 0);
        return external ? finalise(y, pr, rm) : y;
      }
      if (e = mathfloor(y.e / LOG_BASE), xe = mathfloor(x.e / LOG_BASE), xd = xd.slice(), k = xe - e, k) {
        for (xLTy = k < 0, xLTy ? (d = xd, k = -k, len = yd.length) : (d = yd, e = xe, len = xd.length), i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2, k > i && (k = i, d.length = 1), d.reverse(), i = k; i--; )
          d.push(0);
        d.reverse();
      } else {
        for (i = xd.length, len = yd.length, xLTy = i < len, xLTy && (len = i), i = 0; i < len; i++)
          if (xd[i] != yd[i]) {
            xLTy = xd[i] < yd[i];
            break;
          }
        k = 0;
      }
      for (xLTy && (d = xd, xd = yd, yd = d, y.s = -y.s), len = xd.length, i = yd.length - len; i > 0; --i)
        xd[len++] = 0;
      for (i = yd.length; i > k; ) {
        if (xd[--i] < yd[i]) {
          for (j = i; j && xd[--j] === 0; )
            xd[j] = BASE - 1;
          --xd[j], xd[i] += BASE;
        }
        xd[i] -= yd[i];
      }
      for (; xd[--len] === 0; )
        xd.pop();
      for (; xd[0] === 0; xd.shift())
        --e;
      return xd[0] ? (y.d = xd, y.e = getBase10Exponent(xd, e), external ? finalise(y, pr, rm) : y) : new Ctor(rm === 3 ? -0 : 0);
    };
    P.modulo = P.mod = function(y) {
      var q, x = this, Ctor = x.constructor;
      return y = new Ctor(y), !x.d || !y.s || y.d && !y.d[0] ? new Ctor(NaN) : !y.d || x.d && !x.d[0] ? finalise(new Ctor(x), Ctor.precision, Ctor.rounding) : (external = !1, Ctor.modulo == 9 ? (q = divide(x, y.abs(), 0, 3, 1), q.s *= y.s) : q = divide(x, y, 0, Ctor.modulo, 1), q = q.times(y), external = !0, x.minus(q));
    };
    P.naturalExponential = P.exp = function() {
      return naturalExponential(this);
    };
    P.naturalLogarithm = P.ln = function() {
      return naturalLogarithm(this);
    };
    P.negated = P.neg = function() {
      var x = new this.constructor(this);
      return x.s = -x.s, finalise(x);
    };
    P.plus = P.add = function(y) {
      var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
      if (y = new Ctor(y), !x.d || !y.d)
        return !x.s || !y.s ? y = new Ctor(NaN) : x.d || (y = new Ctor(y.d || x.s === y.s ? x : NaN)), y;
      if (x.s != y.s)
        return y.s = -y.s, x.minus(y);
      if (xd = x.d, yd = y.d, pr = Ctor.precision, rm = Ctor.rounding, !xd[0] || !yd[0])
        return yd[0] || (y = new Ctor(x)), external ? finalise(y, pr, rm) : y;
      if (k = mathfloor(x.e / LOG_BASE), e = mathfloor(y.e / LOG_BASE), xd = xd.slice(), i = k - e, i) {
        for (i < 0 ? (d = xd, i = -i, len = yd.length) : (d = yd, e = k, len = xd.length), k = Math.ceil(pr / LOG_BASE), len = k > len ? k + 1 : len + 1, i > len && (i = len, d.length = 1), d.reverse(); i--; )
          d.push(0);
        d.reverse();
      }
      for (len = xd.length, i = yd.length, len - i < 0 && (i = len, d = yd, yd = xd, xd = d), carry = 0; i; )
        carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0, xd[i] %= BASE;
      for (carry && (xd.unshift(carry), ++e), len = xd.length; xd[--len] == 0; )
        xd.pop();
      return y.d = xd, y.e = getBase10Exponent(xd, e), external ? finalise(y, pr, rm) : y;
    };
    P.precision = P.sd = function(z) {
      var k, x = this;
      if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
        throw Error(invalidArgument + z);
      return x.d ? (k = getPrecision(x.d), z && x.e + 1 > k && (k = x.e + 1)) : k = NaN, k;
    };
    P.round = function() {
      var x = this, Ctor = x.constructor;
      return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
    };
    P.sine = P.sin = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      return x.isFinite() ? x.isZero() ? new Ctor(x) : (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE, Ctor.rounding = 1, x = sine(Ctor, toLessThanHalfPi(Ctor, x)), Ctor.precision = pr, Ctor.rounding = rm, finalise(quadrant > 2 ? x.neg() : x, pr, rm, !0)) : new Ctor(NaN);
    };
    P.squareRoot = P.sqrt = function() {
      var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
      if (s !== 1 || !d || !d[0])
        return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
      for (external = !1, s = Math.sqrt(+x), s == 0 || s == 1 / 0 ? (n = digitsToString(d), (n.length + e) % 2 == 0 && (n += "0"), s = Math.sqrt(n), e = mathfloor((e + 1) / 2) - (e < 0 || e % 2), s == 1 / 0 ? n = "5e" + e : (n = s.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + e), r = new Ctor(n)) : r = new Ctor(s.toString()), sd = (e = Ctor.precision) + 3; ; )
        if (t = r, r = t.plus(divide(x, t, sd + 2, 1)).times(0.5), digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd))
          if (n = n.slice(sd - 3, sd + 1), n == "9999" || !rep && n == "4999") {
            if (!rep && (finalise(t, e + 1, 0), t.times(t).eq(x))) {
              r = t;
              break;
            }
            sd += 4, rep = 1;
          } else {
            (!+n || !+n.slice(1) && n.charAt(0) == "5") && (finalise(r, e + 1, 1), m = !r.times(r).eq(x));
            break;
          }
      return external = !0, finalise(r, e, Ctor.rounding, m);
    };
    P.tangent = P.tan = function() {
      var pr, rm, x = this, Ctor = x.constructor;
      return x.isFinite() ? x.isZero() ? new Ctor(x) : (pr = Ctor.precision, rm = Ctor.rounding, Ctor.precision = pr + 10, Ctor.rounding = 1, x = x.sin(), x.s = 1, x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0), Ctor.precision = pr, Ctor.rounding = rm, finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, !0)) : new Ctor(NaN);
    };
    P.times = P.mul = function(y) {
      var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
      if (y.s *= x.s, !xd || !xd[0] || !yd || !yd[0])
        return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
      for (e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE), xdL = xd.length, ydL = yd.length, xdL < ydL && (r = xd, xd = yd, yd = r, rL = xdL, xdL = ydL, ydL = rL), r = [], rL = xdL + ydL, i = rL; i--; )
        r.push(0);
      for (i = ydL; --i >= 0; ) {
        for (carry = 0, k = xdL + i; k > i; )
          t = r[k] + yd[i] * xd[k - i - 1] + carry, r[k--] = t % BASE | 0, carry = t / BASE | 0;
        r[k] = (r[k] + carry) % BASE | 0;
      }
      for (; !r[--rL]; )
        r.pop();
      return carry ? ++e : r.shift(), y.d = r, y.e = getBase10Exponent(r, e), external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
    };
    P.toBinary = function(sd, rm) {
      return toStringBinary(this, 2, sd, rm);
    };
    P.toDecimalPlaces = P.toDP = function(dp, rm) {
      var x = this, Ctor = x.constructor;
      return x = new Ctor(x), dp === void 0 ? x : (checkInt32(dp, 0, MAX_DIGITS), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8), finalise(x, dp + x.e + 1, rm));
    };
    P.toExponential = function(dp, rm) {
      var str, x = this, Ctor = x.constructor;
      return dp === void 0 ? str = finiteToString(x, !0) : (checkInt32(dp, 0, MAX_DIGITS), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8), x = finalise(new Ctor(x), dp + 1, rm), str = finiteToString(x, !0, dp + 1)), x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.toFixed = function(dp, rm) {
      var str, y, x = this, Ctor = x.constructor;
      return dp === void 0 ? str = finiteToString(x) : (checkInt32(dp, 0, MAX_DIGITS), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8), y = finalise(new Ctor(x), dp + x.e + 1, rm), str = finiteToString(y, !1, dp + y.e + 1)), x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.toFraction = function(maxD) {
      var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
      if (!xd)
        return new Ctor(x);
      if (n1 = d0 = new Ctor(1), d1 = n0 = new Ctor(0), d = new Ctor(d1), e = d.e = getPrecision(xd) - x.e - 1, k = e % LOG_BASE, d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k), maxD == null)
        maxD = e > 0 ? d : n1;
      else {
        if (n = new Ctor(maxD), !n.isInt() || n.lt(n1))
          throw Error(invalidArgument + n);
        maxD = n.gt(d) ? e > 0 ? d : n1 : n;
      }
      for (external = !1, n = new Ctor(digitsToString(xd)), pr = Ctor.precision, Ctor.precision = e = xd.length * LOG_BASE * 2; q = divide(n, d, 0, 1, 1), d2 = d0.plus(q.times(d1)), d2.cmp(maxD) != 1; )
        d0 = d1, d1 = d2, d2 = n1, n1 = n0.plus(q.times(d2)), n0 = d2, d2 = d, d = n.minus(q.times(d2)), n = d2;
      return d2 = divide(maxD.minus(d0), d1, 0, 1, 1), n0 = n0.plus(d2.times(n1)), d0 = d0.plus(d2.times(d1)), n0.s = n1.s = x.s, r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0], Ctor.precision = pr, external = !0, r;
    };
    P.toHexadecimal = P.toHex = function(sd, rm) {
      return toStringBinary(this, 16, sd, rm);
    };
    P.toNearest = function(y, rm) {
      var x = this, Ctor = x.constructor;
      if (x = new Ctor(x), y == null) {
        if (!x.d)
          return x;
        y = new Ctor(1), rm = Ctor.rounding;
      } else {
        if (y = new Ctor(y), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8), !x.d)
          return y.s ? x : y;
        if (!y.d)
          return y.s && (y.s = x.s), y;
      }
      return y.d[0] ? (external = !1, x = divide(x, y, 0, rm, 1).times(y), external = !0, finalise(x)) : (y.s = x.s, x = y), x;
    };
    P.toNumber = function() {
      return +this;
    };
    P.toOctal = function(sd, rm) {
      return toStringBinary(this, 8, sd, rm);
    };
    P.toPower = P.pow = function(y) {
      var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
      if (!x.d || !y.d || !x.d[0] || !y.d[0])
        return new Ctor(mathpow(+x, yn));
      if (x = new Ctor(x), x.eq(1))
        return x;
      if (pr = Ctor.precision, rm = Ctor.rounding, y.eq(1))
        return finalise(x, pr, rm);
      if (e = mathfloor(y.e / LOG_BASE), e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER)
        return r = intPow(Ctor, x, k, pr), y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
      if (s = x.s, s < 0) {
        if (e < y.d.length - 1)
          return new Ctor(NaN);
        if ((y.d[e] & 1) == 0 && (s = 1), x.e == 0 && x.d[0] == 1 && x.d.length == 1)
          return x.s = s, x;
      }
      return k = mathpow(+x, yn), e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e, e > Ctor.maxE + 1 || e < Ctor.minE - 1 ? new Ctor(e > 0 ? s / 0 : 0) : (external = !1, Ctor.rounding = x.s = 1, k = Math.min(12, (e + "").length), r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr), r.d && (r = finalise(r, pr + 5, 1), checkRoundingDigits(r.d, pr, rm) && (e = pr + 10, r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1), +digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14 && (r = finalise(r, pr + 1, 0)))), r.s = s, external = !0, Ctor.rounding = rm, finalise(r, pr, rm));
    };
    P.toPrecision = function(sd, rm) {
      var str, x = this, Ctor = x.constructor;
      return sd === void 0 ? str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos) : (checkInt32(sd, 1, MAX_DIGITS), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8), x = finalise(new Ctor(x), sd, rm), str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd)), x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.toSignificantDigits = P.toSD = function(sd, rm) {
      var x = this, Ctor = x.constructor;
      return sd === void 0 ? (sd = Ctor.precision, rm = Ctor.rounding) : (checkInt32(sd, 1, MAX_DIGITS), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8)), finalise(new Ctor(x), sd, rm);
    };
    P.toString = function() {
      var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      return x.isNeg() && !x.isZero() ? "-" + str : str;
    };
    P.truncated = P.trunc = function() {
      return finalise(new this.constructor(this), this.e + 1, 1);
    };
    P.valueOf = P.toJSON = function() {
      var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
      return x.isNeg() ? "-" + str : str;
    };
    function digitsToString(d) {
      var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
      if (indexOfLastWord > 0) {
        for (str += w, i = 1; i < indexOfLastWord; i++)
          ws = d[i] + "", k = LOG_BASE - ws.length, k && (str += getZeroString(k)), str += ws;
        w = d[i], ws = w + "", k = LOG_BASE - ws.length, k && (str += getZeroString(k));
      } else if (w === 0)
        return "0";
      for (; w % 10 === 0; )
        w /= 10;
      return str + w;
    }
    __name(digitsToString, "digitsToString");
    function checkInt32(i, min2, max2) {
      if (i !== ~~i || i < min2 || i > max2)
        throw Error(invalidArgument + i);
    }
    __name(checkInt32, "checkInt32");
    function checkRoundingDigits(d, i, rm, repeating) {
      var di, k, r, rd;
      for (k = d[0]; k >= 10; k /= 10)
        --i;
      return --i < 0 ? (i += LOG_BASE, di = 0) : (di = Math.ceil((i + 1) / LOG_BASE), i %= LOG_BASE), k = mathpow(10, LOG_BASE - i), rd = d[di] % k | 0, repeating == null ? i < 3 ? (i == 0 ? rd = rd / 100 | 0 : i == 1 && (rd = rd / 10 | 0), r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0) : r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0 : i < 4 ? (i == 0 ? rd = rd / 1e3 | 0 : i == 1 ? rd = rd / 100 | 0 : i == 2 && (rd = rd / 10 | 0), r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999) : r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1, r;
    }
    __name(checkRoundingDigits, "checkRoundingDigits");
    function convertBase(str, baseIn, baseOut) {
      for (var j, arr = [0], arrL, i = 0, strL = str.length; i < strL; ) {
        for (arrL = arr.length; arrL--; )
          arr[arrL] *= baseIn;
        for (arr[0] += NUMERALS.indexOf(str.charAt(i++)), j = 0; j < arr.length; j++)
          arr[j] > baseOut - 1 && (arr[j + 1] === void 0 && (arr[j + 1] = 0), arr[j + 1] += arr[j] / baseOut | 0, arr[j] %= baseOut);
      }
      return arr.reverse();
    }
    __name(convertBase, "convertBase");
    function cosine(Ctor, x) {
      var k, len, y;
      if (x.isZero())
        return x;
      len = x.d.length, len < 32 ? (k = Math.ceil(len / 3), y = (1 / tinyPow(4, k)).toString()) : (k = 16, y = "2.3283064365386962890625e-10"), Ctor.precision += k, x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
      for (var i = k; i--; ) {
        var cos2x = x.times(x);
        x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
      }
      return Ctor.precision -= k, x;
    }
    __name(cosine, "cosine");
    var divide = function() {
      function multiplyInteger(x, k, base) {
        var temp, carry = 0, i = x.length;
        for (x = x.slice(); i--; )
          temp = x[i] * k + carry, x[i] = temp % base | 0, carry = temp / base | 0;
        return carry && x.unshift(carry), x;
      }
      __name(multiplyInteger, "multiplyInteger");
      function compare3(a, b, aL, bL) {
        var i, r;
        if (aL != bL)
          r = aL > bL ? 1 : -1;
        else
          for (i = r = 0; i < aL; i++)
            if (a[i] != b[i]) {
              r = a[i] > b[i] ? 1 : -1;
              break;
            }
        return r;
      }
      __name(compare3, "compare");
      function subtract(a, b, aL, base) {
        for (var i = 0; aL--; )
          a[aL] -= i, i = a[aL] < b[aL] ? 1 : 0, a[aL] = i * base + a[aL] - b[aL];
        for (; !a[0] && a.length > 1; )
          a.shift();
      }
      return __name(subtract, "subtract"), function(x, y, pr, rm, dp, base) {
        var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
        if (!xd || !xd[0] || !yd || !yd[0])
          return new Ctor(
            !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
          );
        for (base ? (logBase = 1, e = x.e - y.e) : (base = BASE, logBase = LOG_BASE, e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase)), yL = yd.length, xL = xd.length, q = new Ctor(sign2), qd = q.d = [], i = 0; yd[i] == (xd[i] || 0); i++)
          ;
        if (yd[i] > (xd[i] || 0) && e--, pr == null ? (sd = pr = Ctor.precision, rm = Ctor.rounding) : dp ? sd = pr + (x.e - y.e) + 1 : sd = pr, sd < 0)
          qd.push(1), more = !0;
        else {
          if (sd = sd / logBase + 2 | 0, i = 0, yL == 1) {
            for (k = 0, yd = yd[0], sd++; (i < xL || k) && sd--; i++)
              t = k * base + (xd[i] || 0), qd[i] = t / yd | 0, k = t % yd | 0;
            more = k || i < xL;
          } else {
            for (k = base / (yd[0] + 1) | 0, k > 1 && (yd = multiplyInteger(yd, k, base), xd = multiplyInteger(xd, k, base), yL = yd.length, xL = xd.length), xi = yL, rem = xd.slice(0, yL), remL = rem.length; remL < yL; )
              rem[remL++] = 0;
            yz = yd.slice(), yz.unshift(0), yd0 = yd[0], yd[1] >= base / 2 && ++yd0;
            do
              k = 0, cmp = compare3(yd, rem, yL, remL), cmp < 0 ? (rem0 = rem[0], yL != remL && (rem0 = rem0 * base + (rem[1] || 0)), k = rem0 / yd0 | 0, k > 1 ? (k >= base && (k = base - 1), prod = multiplyInteger(yd, k, base), prodL = prod.length, remL = rem.length, cmp = compare3(prod, rem, prodL, remL), cmp == 1 && (k--, subtract(prod, yL < prodL ? yz : yd, prodL, base))) : (k == 0 && (cmp = k = 1), prod = yd.slice()), prodL = prod.length, prodL < remL && prod.unshift(0), subtract(rem, prod, remL, base), cmp == -1 && (remL = rem.length, cmp = compare3(yd, rem, yL, remL), cmp < 1 && (k++, subtract(rem, yL < remL ? yz : yd, remL, base))), remL = rem.length) : cmp === 0 && (k++, rem = [0]), qd[i++] = k, cmp && rem[0] ? rem[remL++] = xd[xi] || 0 : (rem = [xd[xi]], remL = 1);
            while ((xi++ < xL || rem[0] !== void 0) && sd--);
            more = rem[0] !== void 0;
          }
          qd[0] || qd.shift();
        }
        if (logBase == 1)
          q.e = e, inexact = more;
        else {
          for (i = 1, k = qd[0]; k >= 10; k /= 10)
            i++;
          q.e = i + e * logBase - 1, finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
        }
        return q;
      };
    }();
    function finalise(x, sd, rm, isTruncated) {
      var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
      out:
        if (sd != null) {
          if (xd = x.d, !xd)
            return x;
          for (digits = 1, k = xd[0]; k >= 10; k /= 10)
            digits++;
          if (i = sd - digits, i < 0)
            i += LOG_BASE, j = sd, w = xd[xdi = 0], rd = w / mathpow(10, digits - j - 1) % 10 | 0;
          else if (xdi = Math.ceil((i + 1) / LOG_BASE), k = xd.length, xdi >= k)
            if (isTruncated) {
              for (; k++ <= xdi; )
                xd.push(0);
              w = rd = 0, digits = 1, i %= LOG_BASE, j = i - LOG_BASE + 1;
            } else
              break out;
          else {
            for (w = k = xd[xdi], digits = 1; k >= 10; k /= 10)
              digits++;
            i %= LOG_BASE, j = i - LOG_BASE + digits, rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
          }
          if (isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1)), roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7)), sd < 1 || !xd[0])
            return xd.length = 0, roundUp ? (sd -= x.e + 1, xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE), x.e = -sd || 0) : xd[0] = x.e = 0, x;
          if (i == 0 ? (xd.length = xdi, k = 1, xdi--) : (xd.length = xdi + 1, k = mathpow(10, LOG_BASE - i), xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0), roundUp)
            for (; ; )
              if (xdi == 0) {
                for (i = 1, j = xd[0]; j >= 10; j /= 10)
                  i++;
                for (j = xd[0] += k, k = 1; j >= 10; j /= 10)
                  k++;
                i != k && (x.e++, xd[0] == BASE && (xd[0] = 1));
                break;
              } else {
                if (xd[xdi] += k, xd[xdi] != BASE)
                  break;
                xd[xdi--] = 0, k = 1;
              }
          for (i = xd.length; xd[--i] === 0; )
            xd.pop();
        }
      return external && (x.e > Ctor.maxE ? (x.d = null, x.e = NaN) : x.e < Ctor.minE && (x.e = 0, x.d = [0])), x;
    }
    __name(finalise, "finalise");
    function finiteToString(x, isExp, sd) {
      if (!x.isFinite())
        return nonFiniteToString(x);
      var k, e = x.e, str = digitsToString(x.d), len = str.length;
      return isExp ? (sd && (k = sd - len) > 0 ? str = str.charAt(0) + "." + str.slice(1) + getZeroString(k) : len > 1 && (str = str.charAt(0) + "." + str.slice(1)), str = str + (x.e < 0 ? "e" : "e+") + x.e) : e < 0 ? (str = "0." + getZeroString(-e - 1) + str, sd && (k = sd - len) > 0 && (str += getZeroString(k))) : e >= len ? (str += getZeroString(e + 1 - len), sd && (k = sd - e - 1) > 0 && (str = str + "." + getZeroString(k))) : ((k = e + 1) < len && (str = str.slice(0, k) + "." + str.slice(k)), sd && (k = sd - len) > 0 && (e + 1 === len && (str += "."), str += getZeroString(k))), str;
    }
    __name(finiteToString, "finiteToString");
    function getBase10Exponent(digits, e) {
      var w = digits[0];
      for (e *= LOG_BASE; w >= 10; w /= 10)
        e++;
      return e;
    }
    __name(getBase10Exponent, "getBase10Exponent");
    function getLn10(Ctor, sd, pr) {
      if (sd > LN10_PRECISION)
        throw external = !0, pr && (Ctor.precision = pr), Error(precisionLimitExceeded);
      return finalise(new Ctor(LN10), sd, 1, !0);
    }
    __name(getLn10, "getLn10");
    function getPi(Ctor, sd, rm) {
      if (sd > PI_PRECISION)
        throw Error(precisionLimitExceeded);
      return finalise(new Ctor(PI), sd, rm, !0);
    }
    __name(getPi, "getPi");
    function getPrecision(digits) {
      var w = digits.length - 1, len = w * LOG_BASE + 1;
      if (w = digits[w], w) {
        for (; w % 10 == 0; w /= 10)
          len--;
        for (w = digits[0]; w >= 10; w /= 10)
          len++;
      }
      return len;
    }
    __name(getPrecision, "getPrecision");
    function getZeroString(k) {
      for (var zs = ""; k--; )
        zs += "0";
      return zs;
    }
    __name(getZeroString, "getZeroString");
    function intPow(Ctor, x, n, pr) {
      var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
      for (external = !1; ; ) {
        if (n % 2 && (r = r.times(x), truncate(r.d, k) && (isTruncated = !0)), n = mathfloor(n / 2), n === 0) {
          n = r.d.length - 1, isTruncated && r.d[n] === 0 && ++r.d[n];
          break;
        }
        x = x.times(x), truncate(x.d, k);
      }
      return external = !0, r;
    }
    __name(intPow, "intPow");
    function isOdd(n) {
      return n.d[n.d.length - 1] & 1;
    }
    __name(isOdd, "isOdd");
    function maxOrMin(Ctor, args, ltgt) {
      for (var y, x = new Ctor(args[0]), i = 0; ++i < args.length; )
        if (y = new Ctor(args[i]), y.s)
          x[ltgt](y) && (x = y);
        else {
          x = y;
          break;
        }
      return x;
    }
    __name(maxOrMin, "maxOrMin");
    function naturalExponential(x, sd) {
      var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
      if (!x.d || !x.d[0] || x.e > 17)
        return new Ctor(x.d ? x.d[0] ? x.s < 0 ? 0 : 1 / 0 : 1 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
      for (sd == null ? (external = !1, wpr = pr) : wpr = sd, t = new Ctor(0.03125); x.e > -2; )
        x = x.times(t), k += 5;
      for (guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0, wpr += guard, denominator = pow2 = sum2 = new Ctor(1), Ctor.precision = wpr; ; ) {
        if (pow2 = finalise(pow2.times(x), wpr, 1), denominator = denominator.times(++i), t = sum2.plus(divide(pow2, denominator, wpr, 1)), digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
          for (j = k; j--; )
            sum2 = finalise(sum2.times(sum2), wpr, 1);
          if (sd == null)
            if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep))
              Ctor.precision = wpr += 10, denominator = pow2 = t = new Ctor(1), i = 0, rep++;
            else
              return finalise(sum2, Ctor.precision = pr, rm, external = !0);
          else
            return Ctor.precision = pr, sum2;
        }
        sum2 = t;
      }
    }
    __name(naturalExponential, "naturalExponential");
    function naturalLogarithm(y, sd) {
      var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
      if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1)
        return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
      if (sd == null ? (external = !1, wpr = pr) : wpr = sd, Ctor.precision = wpr += guard, c = digitsToString(xd), c0 = c.charAt(0), Math.abs(e = x.e) < 15e14) {
        for (; c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3; )
          x = x.times(y), c = digitsToString(x.d), c0 = c.charAt(0), n++;
        e = x.e, c0 > 1 ? (x = new Ctor("0." + c), e++) : x = new Ctor(c0 + "." + c.slice(1));
      } else
        return t = getLn10(Ctor, wpr + 2, pr).times(e + ""), x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t), Ctor.precision = pr, sd == null ? finalise(x, pr, rm, external = !0) : x;
      for (x1 = x, sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1), x2 = finalise(x.times(x), wpr, 1), denominator = 3; ; ) {
        if (numerator = finalise(numerator.times(x2), wpr, 1), t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1)), digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr))
          if (sum2 = sum2.times(2), e !== 0 && (sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""))), sum2 = divide(sum2, new Ctor(n), wpr, 1), sd == null)
            if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep))
              Ctor.precision = wpr += guard, t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1), x2 = finalise(x.times(x), wpr, 1), denominator = rep = 1;
            else
              return finalise(sum2, Ctor.precision = pr, rm, external = !0);
          else
            return Ctor.precision = pr, sum2;
        sum2 = t, denominator += 2;
      }
    }
    __name(naturalLogarithm, "naturalLogarithm");
    function nonFiniteToString(x) {
      return String(x.s * x.s / 0);
    }
    __name(nonFiniteToString, "nonFiniteToString");
    function parseDecimal(x, str) {
      var e, i, len;
      for ((e = str.indexOf(".")) > -1 && (str = str.replace(".", "")), (i = str.search(/e/i)) > 0 ? (e < 0 && (e = i), e += +str.slice(i + 1), str = str.substring(0, i)) : e < 0 && (e = str.length), i = 0; str.charCodeAt(i) === 48; i++)
        ;
      for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
        ;
      if (str = str.slice(i, len), str) {
        if (len -= i, x.e = e = e - i - 1, x.d = [], i = (e + 1) % LOG_BASE, e < 0 && (i += LOG_BASE), i < len) {
          for (i && x.d.push(+str.slice(0, i)), len -= LOG_BASE; i < len; )
            x.d.push(+str.slice(i, i += LOG_BASE));
          str = str.slice(i), i = LOG_BASE - str.length;
        } else
          i -= len;
        for (; i--; )
          str += "0";
        x.d.push(+str), external && (x.e > x.constructor.maxE ? (x.d = null, x.e = NaN) : x.e < x.constructor.minE && (x.e = 0, x.d = [0]));
      } else
        x.e = 0, x.d = [0];
      return x;
    }
    __name(parseDecimal, "parseDecimal");
    function parseOther(x, str) {
      var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
      if (str.indexOf("_") > -1) {
        if (str = str.replace(/(\d)_(?=\d)/g, "$1"), isDecimal.test(str))
          return parseDecimal(x, str);
      } else if (str === "Infinity" || str === "NaN")
        return +str || (x.s = NaN), x.e = NaN, x.d = null, x;
      if (isHex.test(str))
        base = 16, str = str.toLowerCase();
      else if (isBinary.test(str))
        base = 2;
      else if (isOctal.test(str))
        base = 8;
      else
        throw Error(invalidArgument + str);
      for (i = str.search(/p/i), i > 0 ? (p = +str.slice(i + 1), str = str.substring(2, i)) : str = str.slice(2), i = str.indexOf("."), isFloat = i >= 0, Ctor = x.constructor, isFloat && (str = str.replace(".", ""), len = str.length, i = len - i, divisor = intPow(Ctor, new Ctor(base), i, i * 2)), xd = convertBase(str, base, BASE), xe = xd.length - 1, i = xe; xd[i] === 0; --i)
        xd.pop();
      return i < 0 ? new Ctor(x.s * 0) : (x.e = getBase10Exponent(xd, xe), x.d = xd, external = !1, isFloat && (x = divide(x, divisor, len * 4)), p && (x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p))), external = !0, x);
    }
    __name(parseOther, "parseOther");
    function sine(Ctor, x) {
      var k, len = x.d.length;
      if (len < 3)
        return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
      k = 1.4 * Math.sqrt(len), k = k > 16 ? 16 : k | 0, x = x.times(1 / tinyPow(5, k)), x = taylorSeries(Ctor, 2, x, x);
      for (var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20); k--; )
        sin2_x = x.times(x), x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
      return x;
    }
    __name(sine, "sine");
    function taylorSeries(Ctor, n, x, y, isHyperbolic) {
      var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
      for (external = !1, x2 = x.times(x), u = new Ctor(y); ; ) {
        if (t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1), u = isHyperbolic ? y.plus(t) : y.minus(t), y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1), t = u.plus(y), t.d[k] !== void 0) {
          for (j = k; t.d[j] === u.d[j] && j--; )
            ;
          if (j == -1)
            break;
        }
        j = u, u = y, y = t, t = j, i++;
      }
      return external = !0, t.d.length = k + 1, t;
    }
    __name(taylorSeries, "taylorSeries");
    function tinyPow(b, e) {
      for (var n = b; --e; )
        n *= b;
      return n;
    }
    __name(tinyPow, "tinyPow");
    function toLessThanHalfPi(Ctor, x) {
      var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
      if (x = x.abs(), x.lte(halfPi))
        return quadrant = isNeg ? 4 : 1, x;
      if (t = x.divToInt(pi), t.isZero())
        quadrant = isNeg ? 3 : 2;
      else {
        if (x = x.minus(t.times(pi)), x.lte(halfPi))
          return quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1, x;
        quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
      }
      return x.minus(pi).abs();
    }
    __name(toLessThanHalfPi, "toLessThanHalfPi");
    function toStringBinary(x, baseOut, sd, rm) {
      var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
      if (isExp ? (checkInt32(sd, 1, MAX_DIGITS), rm === void 0 ? rm = Ctor.rounding : checkInt32(rm, 0, 8)) : (sd = Ctor.precision, rm = Ctor.rounding), !x.isFinite())
        str = nonFiniteToString(x);
      else {
        for (str = finiteToString(x), i = str.indexOf("."), isExp ? (base = 2, baseOut == 16 ? sd = sd * 4 - 3 : baseOut == 8 && (sd = sd * 3 - 2)) : base = baseOut, i >= 0 && (str = str.replace(".", ""), y = new Ctor(1), y.e = str.length - i, y.d = convertBase(finiteToString(y), 10, base), y.e = y.d.length), xd = convertBase(str, 10, base), e = len = xd.length; xd[--len] == 0; )
          xd.pop();
        if (!xd[0])
          str = isExp ? "0p+0" : "0";
        else {
          if (i < 0 ? e-- : (x = new Ctor(x), x.d = xd, x.e = e, x = divide(x, y, sd, rm, 0, base), xd = x.d, e = x.e, roundUp = inexact), i = xd[sd], k = base / 2, roundUp = roundUp || xd[sd + 1] !== void 0, roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7)), xd.length = sd, roundUp)
            for (; ++xd[--sd] > base - 1; )
              xd[sd] = 0, sd || (++e, xd.unshift(1));
          for (len = xd.length; !xd[len - 1]; --len)
            ;
          for (i = 0, str = ""; i < len; i++)
            str += NUMERALS.charAt(xd[i]);
          if (isExp) {
            if (len > 1)
              if (baseOut == 16 || baseOut == 8) {
                for (i = baseOut == 16 ? 4 : 3, --len; len % i; len++)
                  str += "0";
                for (xd = convertBase(str, base, baseOut), len = xd.length; !xd[len - 1]; --len)
                  ;
                for (i = 1, str = "1."; i < len; i++)
                  str += NUMERALS.charAt(xd[i]);
              } else
                str = str.charAt(0) + "." + str.slice(1);
            str = str + (e < 0 ? "p" : "p+") + e;
          } else if (e < 0) {
            for (; ++e; )
              str = "0" + str;
            str = "0." + str;
          } else if (++e > len)
            for (e -= len; e--; )
              str += "0";
          else
            e < len && (str = str.slice(0, e) + "." + str.slice(e));
        }
        str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
      }
      return x.s < 0 ? "-" + str : str;
    }
    __name(toStringBinary, "toStringBinary");
    function truncate(arr, len) {
      if (arr.length > len)
        return arr.length = len, !0;
    }
    __name(truncate, "truncate");
    function abs(x) {
      return new this(x).abs();
    }
    __name(abs, "abs");
    function acos(x) {
      return new this(x).acos();
    }
    __name(acos, "acos");
    function acosh(x) {
      return new this(x).acosh();
    }
    __name(acosh, "acosh");
    function add(x, y) {
      return new this(x).plus(y);
    }
    __name(add, "add");
    function asin(x) {
      return new this(x).asin();
    }
    __name(asin, "asin");
    function asinh(x) {
      return new this(x).asinh();
    }
    __name(asinh, "asinh");
    function atan(x) {
      return new this(x).atan();
    }
    __name(atan, "atan");
    function atanh(x) {
      return new this(x).atanh();
    }
    __name(atanh, "atanh");
    function atan2(y, x) {
      y = new this(y), x = new this(x);
      var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
      return !y.s || !x.s ? r = new this(NaN) : !y.d && !x.d ? (r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75), r.s = y.s) : !x.d || y.isZero() ? (r = x.s < 0 ? getPi(this, pr, rm) : new this(0), r.s = y.s) : !y.d || x.isZero() ? (r = getPi(this, wpr, 1).times(0.5), r.s = y.s) : x.s < 0 ? (this.precision = wpr, this.rounding = 1, r = this.atan(divide(y, x, wpr, 1)), x = getPi(this, wpr, 1), this.precision = pr, this.rounding = rm, r = y.s < 0 ? r.minus(x) : r.plus(x)) : r = this.atan(divide(y, x, wpr, 1)), r;
    }
    __name(atan2, "atan2");
    function cbrt(x) {
      return new this(x).cbrt();
    }
    __name(cbrt, "cbrt");
    function ceil(x) {
      return finalise(x = new this(x), x.e + 1, 2);
    }
    __name(ceil, "ceil");
    function clamp(x, min2, max2) {
      return new this(x).clamp(min2, max2);
    }
    __name(clamp, "clamp");
    function config2(obj) {
      if (!obj || typeof obj != "object")
        throw Error(decimalError + "Object expected");
      var i, p, v, useDefaults = obj.defaults === !0, ps = [
        "precision",
        1,
        MAX_DIGITS,
        "rounding",
        0,
        8,
        "toExpNeg",
        -EXP_LIMIT,
        0,
        "toExpPos",
        0,
        EXP_LIMIT,
        "maxE",
        0,
        EXP_LIMIT,
        "minE",
        -EXP_LIMIT,
        0,
        "modulo",
        0,
        9
      ];
      for (i = 0; i < ps.length; i += 3)
        if (p = ps[i], useDefaults && (this[p] = DEFAULTS[p]), (v = obj[p]) !== void 0)
          if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
            this[p] = v;
          else
            throw Error(invalidArgument + p + ": " + v);
      if (p = "crypto", useDefaults && (this[p] = DEFAULTS[p]), (v = obj[p]) !== void 0)
        if (v === !0 || v === !1 || v === 0 || v === 1)
          if (v)
            if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
              this[p] = !0;
            else
              throw Error(cryptoUnavailable);
          else
            this[p] = !1;
        else
          throw Error(invalidArgument + p + ": " + v);
      return this;
    }
    __name(config2, "config");
    function cos(x) {
      return new this(x).cos();
    }
    __name(cos, "cos");
    function cosh(x) {
      return new this(x).cosh();
    }
    __name(cosh, "cosh");
    function clone(obj) {
      var i, p, ps;
      function Decimal2(v) {
        var e, i2, t, x = this;
        if (!(x instanceof Decimal2))
          return new Decimal2(v);
        if (x.constructor = Decimal2, isDecimalInstance(v)) {
          x.s = v.s, external ? !v.d || v.e > Decimal2.maxE ? (x.e = NaN, x.d = null) : v.e < Decimal2.minE ? (x.e = 0, x.d = [0]) : (x.e = v.e, x.d = v.d.slice()) : (x.e = v.e, x.d = v.d ? v.d.slice() : v.d);
          return;
        }
        if (t = typeof v, t === "number") {
          if (v === 0) {
            x.s = 1 / v < 0 ? -1 : 1, x.e = 0, x.d = [0];
            return;
          }
          if (v < 0 ? (v = -v, x.s = -1) : x.s = 1, v === ~~v && v < 1e7) {
            for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
              e++;
            external ? e > Decimal2.maxE ? (x.e = NaN, x.d = null) : e < Decimal2.minE ? (x.e = 0, x.d = [0]) : (x.e = e, x.d = [v]) : (x.e = e, x.d = [v]);
            return;
          } else if (v * 0 !== 0) {
            v || (x.s = NaN), x.e = NaN, x.d = null;
            return;
          }
          return parseDecimal(x, v.toString());
        } else if (t !== "string")
          throw Error(invalidArgument + v);
        return (i2 = v.charCodeAt(0)) === 45 ? (v = v.slice(1), x.s = -1) : (i2 === 43 && (v = v.slice(1)), x.s = 1), isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
      }
      if (__name(Decimal2, "Decimal"), Decimal2.prototype = P, Decimal2.ROUND_UP = 0, Decimal2.ROUND_DOWN = 1, Decimal2.ROUND_CEIL = 2, Decimal2.ROUND_FLOOR = 3, Decimal2.ROUND_HALF_UP = 4, Decimal2.ROUND_HALF_DOWN = 5, Decimal2.ROUND_HALF_EVEN = 6, Decimal2.ROUND_HALF_CEIL = 7, Decimal2.ROUND_HALF_FLOOR = 8, Decimal2.EUCLID = 9, Decimal2.config = Decimal2.set = config2, Decimal2.clone = clone, Decimal2.isDecimal = isDecimalInstance, Decimal2.abs = abs, Decimal2.acos = acos, Decimal2.acosh = acosh, Decimal2.add = add, Decimal2.asin = asin, Decimal2.asinh = asinh, Decimal2.atan = atan, Decimal2.atanh = atanh, Decimal2.atan2 = atan2, Decimal2.cbrt = cbrt, Decimal2.ceil = ceil, Decimal2.clamp = clamp, Decimal2.cos = cos, Decimal2.cosh = cosh, Decimal2.div = div, Decimal2.exp = exp, Decimal2.floor = floor, Decimal2.hypot = hypot, Decimal2.ln = ln, Decimal2.log = log, Decimal2.log10 = log10, Decimal2.log2 = log2, Decimal2.max = max, Decimal2.min = min, Decimal2.mod = mod, Decimal2.mul = mul, Decimal2.pow = pow, Decimal2.random = random, Decimal2.round = round, Decimal2.sign = sign, Decimal2.sin = sin, Decimal2.sinh = sinh, Decimal2.sqrt = sqrt, Decimal2.sub = sub, Decimal2.sum = sum, Decimal2.tan = tan, Decimal2.tanh = tanh, Decimal2.trunc = trunc, obj === void 0 && (obj = {}), obj && obj.defaults !== !0)
        for (ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], i = 0; i < ps.length; )
          obj.hasOwnProperty(p = ps[i++]) || (obj[p] = this[p]);
      return Decimal2.config(obj), Decimal2;
    }
    __name(clone, "clone");
    function div(x, y) {
      return new this(x).div(y);
    }
    __name(div, "div");
    function exp(x) {
      return new this(x).exp();
    }
    __name(exp, "exp");
    function floor(x) {
      return finalise(x = new this(x), x.e + 1, 3);
    }
    __name(floor, "floor");
    function hypot() {
      var i, n, t = new this(0);
      for (external = !1, i = 0; i < arguments.length; )
        if (n = new this(arguments[i++]), n.d)
          t.d && (t = t.plus(n.times(n)));
        else {
          if (n.s)
            return external = !0, new this(1 / 0);
          t = n;
        }
      return external = !0, t.sqrt();
    }
    __name(hypot, "hypot");
    function isDecimalInstance(obj) {
      return obj instanceof Decimal || obj && obj.toStringTag === tag || !1;
    }
    __name(isDecimalInstance, "isDecimalInstance");
    function ln(x) {
      return new this(x).ln();
    }
    __name(ln, "ln");
    function log(x, y) {
      return new this(x).log(y);
    }
    __name(log, "log");
    function log2(x) {
      return new this(x).log(2);
    }
    __name(log2, "log2");
    function log10(x) {
      return new this(x).log(10);
    }
    __name(log10, "log10");
    function max() {
      return maxOrMin(this, arguments, "lt");
    }
    __name(max, "max");
    function min() {
      return maxOrMin(this, arguments, "gt");
    }
    __name(min, "min");
    function mod(x, y) {
      return new this(x).mod(y);
    }
    __name(mod, "mod");
    function mul(x, y) {
      return new this(x).mul(y);
    }
    __name(mul, "mul");
    function pow(x, y) {
      return new this(x).pow(y);
    }
    __name(pow, "pow");
    function random(sd) {
      var d, e, k, n, i = 0, r = new this(1), rd = [];
      if (sd === void 0 ? sd = this.precision : checkInt32(sd, 1, MAX_DIGITS), k = Math.ceil(sd / LOG_BASE), this.crypto)
        if (crypto.getRandomValues)
          for (d = crypto.getRandomValues(new Uint32Array(k)); i < k; )
            n = d[i], n >= 429e7 ? d[i] = crypto.getRandomValues(new Uint32Array(1))[0] : rd[i++] = n % 1e7;
        else if (crypto.randomBytes) {
          for (d = crypto.randomBytes(k *= 4); i < k; )
            n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24), n >= 214e7 ? crypto.randomBytes(4).copy(d, i) : (rd.push(n % 1e7), i += 4);
          i = k / 4;
        } else
          throw Error(cryptoUnavailable);
      else
        for (; i < k; )
          rd[i++] = Math.random() * 1e7 | 0;
      for (k = rd[--i], sd %= LOG_BASE, k && sd && (n = mathpow(10, LOG_BASE - sd), rd[i] = (k / n | 0) * n); rd[i] === 0; i--)
        rd.pop();
      if (i < 0)
        e = 0, rd = [0];
      else {
        for (e = -1; rd[0] === 0; e -= LOG_BASE)
          rd.shift();
        for (k = 1, n = rd[0]; n >= 10; n /= 10)
          k++;
        k < LOG_BASE && (e -= LOG_BASE - k);
      }
      return r.e = e, r.d = rd, r;
    }
    __name(random, "random");
    function round(x) {
      return finalise(x = new this(x), x.e + 1, this.rounding);
    }
    __name(round, "round");
    function sign(x) {
      return x = new this(x), x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
    }
    __name(sign, "sign");
    function sin(x) {
      return new this(x).sin();
    }
    __name(sin, "sin");
    function sinh(x) {
      return new this(x).sinh();
    }
    __name(sinh, "sinh");
    function sqrt(x) {
      return new this(x).sqrt();
    }
    __name(sqrt, "sqrt");
    function sub(x, y) {
      return new this(x).sub(y);
    }
    __name(sub, "sub");
    function sum() {
      var i = 0, args = arguments, x = new this(args[i]);
      for (external = !1; x.s && ++i < args.length; )
        x = x.plus(args[i]);
      return external = !0, finalise(x, this.precision, this.rounding);
    }
    __name(sum, "sum");
    function tan(x) {
      return new this(x).tan();
    }
    __name(tan, "tan");
    function tanh(x) {
      return new this(x).tanh();
    }
    __name(tanh, "tanh");
    function trunc(x) {
      return finalise(x = new this(x), x.e + 1, 1);
    }
    __name(trunc, "trunc");
    P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
    P[Symbol.toStringTag] = "Decimal";
    var Decimal = P.constructor = clone(DEFAULTS);
    LN10 = new Decimal(LN10);
    PI = new Decimal(PI);
    var decimal_default = Decimal;
  }
});

// node_modules/.prisma/client/index-browser.js
var require_index_browser2 = __commonJS({
  "node_modules/.prisma/client/index-browser.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var {
      Decimal,
      objectEnumValues,
      makeStrictEnum
    } = require_index_browser(), Prisma = {};
    exports.Prisma = Prisma;
    Prisma.prismaVersion = {
      client: "4.7.1",
      engine: "272861e07ab64f234d3ffc4094e32bd61775599c"
    };
    Prisma.PrismaClientKnownRequestError = () => {
      throw new Error(
        `PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.PrismaClientUnknownRequestError = () => {
      throw new Error(
        `PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.PrismaClientRustPanicError = () => {
      throw new Error(
        `PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.PrismaClientInitializationError = () => {
      throw new Error(
        `PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.PrismaClientValidationError = () => {
      throw new Error(
        `PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.NotFoundError = () => {
      throw new Error(
        `NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.Decimal = Decimal;
    Prisma.sql = () => {
      throw new Error(
        `sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.empty = () => {
      throw new Error(
        `empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.join = () => {
      throw new Error(
        `join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.raw = () => {
      throw new Error(
        `raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
      );
    };
    Prisma.validator = () => (val) => val;
    Prisma.DbNull = objectEnumValues.instances.DbNull;
    Prisma.JsonNull = objectEnumValues.instances.JsonNull;
    Prisma.AnyNull = objectEnumValues.instances.AnyNull;
    Prisma.NullTypes = {
      DbNull: objectEnumValues.classes.DbNull,
      JsonNull: objectEnumValues.classes.JsonNull,
      AnyNull: objectEnumValues.classes.AnyNull
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      email: "email",
      name: "name",
      password: "password",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.ModelName = {
      User: "User"
    };
    var PrismaClient2 = class {
      constructor() {
        throw new Error(
          `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`
        );
      }
    };
    exports.PrismaClient = PrismaClient2;
    Object.assign(exports, Prisma);
  }
});

// node_modules/@prisma/client/index-browser.js
var require_index_browser3 = __commonJS({
  "node_modules/@prisma/client/index-browser.js"(exports, module) {
    var prisma = require_index_browser2();
    module.exports = prisma;
  }
});

// node_modules/@remix-run/cloudflare-pages/dist/esm/worker.js
var import_cloudflare = __toESM(require_dist());
function createRequestHandler2({
  build,
  getLoadContext,
  mode
}) {
  let handleRequest3 = (0, import_cloudflare.createRequestHandler)(build, mode);
  return (context) => {
    let loadContext = getLoadContext == null ? void 0 : getLoadContext(context);
    return handleRequest3(context.request, loadContext);
  };
}
function createPagesFunctionHandler({
  build,
  getLoadContext,
  mode
}) {
  let handleRequest3 = createRequestHandler2({
    build,
    getLoadContext,
    mode
  }), handleFetch = async (context) => {
    let response;
    context.request.headers.delete("if-none-match");
    try {
      response = await context.env.ASSETS.fetch(context.request.url, context.request.clone()), response = response && response.status >= 200 && response.status < 400 ? new Response(response.body, response) : void 0;
    } catch {
    }
    return response || (response = await handleRequest3(context)), response;
  };
  return async (context) => {
    try {
      return await handleFetch(context);
    } catch (e) {
      return e instanceof Error ? (console.error(e), new Response(e.message || e.toString(), {
        status: 500
      })) : new Response("Internal Error", {
        status: 500
      });
    }
  };
}

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends4() {
  return _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends4.apply(this, arguments);
}

// node_modules/@remix-run/react/dist/esm/components.js
var React2 = __toESM(require_react());
init_react_router_dom();
init_history();

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
var import_react3 = __toESM(require_react());
var RemixErrorBoundary = class extends import_react3.default.Component {
  constructor(props) {
    super(props), this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    return state.location !== props.location ? {
      error: props.error || null,
      location: props.location
    } : {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ import_react3.default.createElement(this.props.component, {
      error: this.state.error
    }) : this.props.children;
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  return console.error(error), /* @__PURE__ */ import_react3.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react3.default.createElement("head", null, /* @__PURE__ */ import_react3.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react3.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ import_react3.default.createElement("title", null, "Application Error!")), /* @__PURE__ */ import_react3.default.createElement("body", null, /* @__PURE__ */ import_react3.default.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /* @__PURE__ */ import_react3.default.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ import_react3.default.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, error.stack)), /* @__PURE__ */ import_react3.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}
var RemixCatchContext = /* @__PURE__ */ import_react3.default.createContext(void 0);
function useCatch() {
  return (0, import_react3.useContext)(RemixCatchContext);
}
function RemixCatchBoundary({
  catch: catchVal,
  component: Component,
  children
}) {
  return catchVal ? /* @__PURE__ */ import_react3.default.createElement(RemixCatchContext.Provider, {
    value: catchVal
  }, /* @__PURE__ */ import_react3.default.createElement(Component, null)) : /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, children);
}
function RemixRootDefaultCatchBoundary() {
  let caught = useCatch();
  return /* @__PURE__ */ import_react3.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react3.default.createElement("head", null, /* @__PURE__ */ import_react3.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react3.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ import_react3.default.createElement("title", null, "Unhandled Thrown Response!")), /* @__PURE__ */ import_react3.default.createElement("body", null, /* @__PURE__ */ import_react3.default.createElement("h1", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, caught.status, " ", caught.statusText), /* @__PURE__ */ import_react3.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `
    }
  })));
}

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant4(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}

// node_modules/@remix-run/react/dist/esm/links.js
init_history();

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache)
    return routeModulesCache[route.id];
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    return routeModulesCache[route.id] = routeModule, routeModule;
  } catch {
    return window.location.reload(), new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id];
    return ((_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || [];
  }).flat(1), preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupe(descriptors, preloads);
}
async function prefetchStyleLinks(routeModule) {
  if (!routeModule.links)
    return;
  let descriptors = routeModule.links();
  if (!descriptors)
    return;
  let styleLinks = [];
  for (let descriptor of descriptors)
    !isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet" && styleLinks.push({
      ...descriptor,
      rel: "preload",
      as: "style"
    });
  let matchingLinks = styleLinks.filter((link) => !link.media || window.matchMedia(link.media).matches);
  await Promise.all(matchingLinks.map(prefetchStyleLink));
}
async function prefetchStyleLink(descriptor) {
  return new Promise((resolve) => {
    let link = document.createElement("link");
    Object.assign(link, descriptor);
    function removeLink() {
      document.head.contains(link) && document.head.removeChild(link);
    }
    link.onload = () => {
      removeLink(), resolve();
    }, link.onerror = () => {
      removeLink(), resolve();
    }, document.head.appendChild(link);
  });
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page == "string";
}
function isHtmlLinkDescriptor(object) {
  return object == null ? !1 : object.href == null ? object.rel === "preload" && (typeof object.imageSrcSet == "string" || typeof object.imagesrcset == "string") && (typeof object.imageSizes == "string" || typeof object.imagesizes == "string") : typeof object.rel == "string" && typeof object.href == "string";
}
async function getStylesheetPrefetchLinks(matches, routeModules) {
  return (await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(match.route, routeModules);
    return mod.links ? mod.links() : [];
  }))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "preload" ? {
    ...link,
    rel: "prefetch"
  } : {
    ...link,
    rel: "prefetch",
    as: "style"
  });
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, location, mode) {
  let path = parsePathPatch(page), isNew = (match, index) => currentMatches[index] ? match.route.id !== currentMatches[index].route.id : !0, matchPathChanged = (match, index) => {
    var _currentMatches$index;
    return currentMatches[index].pathname !== match.pathname || ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"];
  };
  return mode === "data" && location.search !== path.search ? nextMatches.filter((match, index) => match.route.hasLoader ? isNew(match, index) || matchPathChanged(match, index) ? !0 : match.route.shouldReload ? match.route.shouldReload({
    params: match.params,
    prevUrl: new URL(location.pathname + location.search + location.hash, window.origin),
    url: new URL(page, window.origin)
  }) : !0 : !1) : nextMatches.filter((match, index) => (mode === "assets" || match.route.hasLoader) && (isNew(match, index) || matchPathChanged(match, index)));
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
    let {
      pathname,
      search
    } = path, searchParams = new URLSearchParams(search);
    return searchParams.set("_data", match.route.id), `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function dedupe(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set(), preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    if (!isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href))
      return deduped;
    let str = JSON.stringify(descriptor);
    return set.has(str) || (set.add(str), deduped.push(descriptor)), deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = parsePath2(href);
  return path.search === void 0 && (path.search = ""), path;
}

// node_modules/@remix-run/react/dist/esm/markup.js
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/dist/esm/routes.js
var React = __toESM(require_react());

// node_modules/@remix-run/react/dist/esm/data.js
function isCatchResponse(response) {
  return response instanceof Response && response.headers.get("X-Remix-Catch") != null;
}
function isErrorResponse(response) {
  return response instanceof Response && response.headers.get("X-Remix-Error") != null;
}
function isRedirectResponse3(response) {
  return response instanceof Response && response.headers.get("X-Remix-Redirect") != null;
}
async function fetchData(url, routeId, signal, submission) {
  url.searchParams.set("_data", routeId);
  let init2 = submission ? getActionInit(submission, signal) : {
    credentials: "same-origin",
    signal
  }, response = await fetch(url.href, init2);
  if (isErrorResponse(response)) {
    let data = await response.json(), error = new Error(data.message);
    return error.stack = data.stack, error;
  }
  return response;
}
async function extractData(response) {
  let contentType = response.headers.get("Content-Type");
  return contentType && /\bapplication\/json\b/.test(contentType) ? response.json() : response.text();
}
function getActionInit(submission, signal) {
  let {
    encType,
    method,
    formData
  } = submission, headers, body = formData;
  if (encType === "application/x-www-form-urlencoded") {
    body = new URLSearchParams();
    for (let [key, value] of formData)
      invariant4(typeof value == "string", 'File inputs are not supported with encType "application/x-www-form-urlencoded", please use "multipart/form-data" instead.'), body.append(key, value);
    headers = {
      "Content-Type": encType
    };
  }
  return {
    method,
    body,
    signal,
    credentials: "same-origin",
    headers
  };
}

// node_modules/@remix-run/react/dist/esm/transition.js
init_history();

// node_modules/@remix-run/react/dist/esm/routeMatching.js
init_react_router_dom();
function matchClientRoutes(routes2, location) {
  let matches = matchRoutes2(routes2, location);
  return matches ? matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  })) : null;
}

// node_modules/@remix-run/react/dist/esm/transition.js
var CatchValue = class {
  constructor(status, statusText, data) {
    this.status = status, this.statusText = statusText, this.data = data;
  }
};
function isActionSubmission(submission) {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(submission.method);
}
function isLoaderSubmission(submission) {
  return submission.method === "GET";
}
function isRedirectLocation(location) {
  return Boolean(location.state) && location.state.isRedirect;
}
function isLoaderRedirectLocation(location) {
  return isRedirectLocation(location) && location.state.type === "loader";
}
function isActionRedirectLocation(location) {
  return isRedirectLocation(location) && location.state.type === "action";
}
function isFetchActionRedirect(location) {
  return isRedirectLocation(location) && location.state.type === "fetchAction";
}
function isLoaderSubmissionRedirectLocation(location) {
  return isRedirectLocation(location) && location.state.type === "loaderSubmission";
}
var TransitionRedirect = class {
  constructor(location, setCookie) {
    this.setCookie = setCookie, this.location = typeof location == "string" ? location : location.pathname + location.search;
  }
}, IDLE_TRANSITION = {
  state: "idle",
  submission: void 0,
  location: void 0,
  type: "idle"
}, IDLE_FETCHER = {
  state: "idle",
  type: "init",
  data: void 0,
  submission: void 0
}, isBrowser2 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", isServer = !isBrowser2;
function createTransitionManager(init2) {
  let {
    routes: routes2
  } = init2, pendingNavigationController, fetchControllers = /* @__PURE__ */ new Map(), incrementingLoadId = 0, navigationLoadId = -1, fetchReloadIds = /* @__PURE__ */ new Map(), fetchRedirectIds = /* @__PURE__ */ new Set(), subscribers = /* @__PURE__ */ new Set(), matches = matchClientRoutes(routes2, init2.location);
  matches || (matches = [{
    params: {},
    pathname: "",
    route: routes2[0]
  }]);
  let state = {
    location: init2.location,
    loaderData: init2.loaderData || {},
    actionData: init2.actionData,
    catch: init2.catch,
    error: init2.error,
    catchBoundaryId: init2.catchBoundaryId || null,
    errorBoundaryId: init2.errorBoundaryId || null,
    matches,
    nextMatches: void 0,
    transition: IDLE_TRANSITION,
    fetchers: /* @__PURE__ */ new Map()
  };
  function update(updates) {
    updates.transition && updates.transition === IDLE_TRANSITION && (pendingNavigationController = void 0), state = Object.assign({}, state, updates);
    for (let subscriber of subscribers.values())
      subscriber(state);
  }
  function getState() {
    return state;
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function setFetcher(key, fetcher) {
    state.fetchers.set(key, fetcher);
  }
  function deleteFetcher(key) {
    fetchControllers.has(key) && abortFetcher(key), fetchReloadIds.delete(key), fetchRedirectIds.delete(key), state.fetchers.delete(key);
  }
  async function send(event) {
    switch (event.type) {
      case "navigation": {
        let {
          action,
          location,
          submission
        } = event, matches2 = matchClientRoutes(routes2, location);
        matches2 ? !submission && isHashChangeOnly(location) ? await handleHashChange(location, matches2) : action === Action2.Pop ? await handleLoad(location, matches2) : submission && isActionSubmission(submission) ? await handleActionSubmissionNavigation(location, submission, matches2) : submission && isLoaderSubmission(submission) ? await handleLoaderSubmissionNavigation(location, submission, matches2) : isActionRedirectLocation(location) ? await handleActionRedirect(location, matches2) : isLoaderSubmissionRedirectLocation(location) ? await handleLoaderSubmissionRedirect(location, matches2) : isLoaderRedirectLocation(location) ? await handleLoaderRedirect(location, matches2) : isFetchActionRedirect(location) ? await handleFetchActionRedirect(location, matches2) : await handleLoad(location, matches2) : (matches2 = [{
          params: {},
          pathname: "",
          route: routes2[0]
        }], await handleNotFoundNavigation(location, matches2)), navigationLoadId = -1;
        break;
      }
      case "fetcher": {
        if (isServer)
          throw new Error("a fetcher was called during the server render, but it shouldn't be. You are likely calling useFetcher.load() or useFetcher.submit() in the body of your component. Try moving it to a useEffect or a callback.");
        let {
          key,
          submission,
          href
        } = event, matches2 = matchClientRoutes(routes2, href);
        invariant4(matches2, "No matches found"), fetchControllers.has(key) && abortFetcher(key);
        let match = getRequestMatch(new URL(href, window.location.href), matches2);
        submission && isActionSubmission(submission) ? await handleActionFetchSubmission(key, submission, match) : submission && isLoaderSubmission(submission) ? await handleLoaderFetchSubmission(href, key, submission, match) : await handleLoaderFetch(href, key, match);
        break;
      }
      default:
        throw new Error(`Unknown data event type: ${event.type}`);
    }
  }
  function dispose() {
    abortNormalNavigation();
    for (let [, controller] of fetchControllers)
      controller.abort();
  }
  function isIndexRequestUrl(url) {
    for (let param of url.searchParams.getAll("index"))
      if (param === "")
        return !0;
    return !1;
  }
  function getRequestMatch(url, matches2) {
    let match = matches2.slice(-1)[0];
    return isIndexRequestUrl(url) && match.route.index ? match : getPathContributingMatches2(matches2).slice(-1)[0];
  }
  function getPathContributingMatches2(matches2) {
    return matches2.filter((match, index) => index === 0 || !match.route.index && match.route.path && match.route.path.length > 0);
  }
  async function handleActionFetchSubmission(key, submission, match) {
    let currentFetcher = state.fetchers.get(key), fetcher = {
      state: "submitting",
      type: "actionSubmission",
      submission,
      data: (currentFetcher == null ? void 0 : currentFetcher.data) || void 0
    };
    setFetcher(key, fetcher), update({
      fetchers: new Map(state.fetchers)
    });
    let controller = new AbortController();
    fetchControllers.set(key, controller);
    let result = await callAction(submission, match, controller.signal);
    if (controller.signal.aborted)
      return;
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: !0,
        type: "fetchAction",
        setCookie: result.value.setCookie
      };
      fetchRedirectIds.add(key), init2.onRedirect(result.value.location, locationState), setFetcher(key, {
        state: "loading",
        type: "actionRedirect",
        submission,
        data: void 0
      }), update({
        fetchers: new Map(state.fetchers)
      });
      return;
    }
    if (maybeBailOnError(match, key, result) || await maybeBailOnCatch(match, key, result))
      return;
    let loadFetcher = {
      state: "loading",
      type: "actionReload",
      data: result.value,
      submission
    };
    setFetcher(key, loadFetcher), update({
      fetchers: new Map(state.fetchers)
    });
    let maybeActionErrorResult = isErrorResult2(result) ? result : void 0, maybeActionCatchResult = isCatchResult(result) ? result : void 0, loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let matchesToLoad = state.nextMatches || state.matches, results = await callLoaders(state, state.transition.location || state.location, matchesToLoad, controller.signal, maybeActionErrorResult, maybeActionCatchResult, submission, match.route.id, loadFetcher);
    if (controller.signal.aborted)
      return;
    fetchReloadIds.delete(key), fetchControllers.delete(key);
    let redirect3 = findRedirect(results);
    if (redirect3) {
      let locationState = {
        isRedirect: !0,
        type: "loader",
        setCookie: redirect3.setCookie
      };
      init2.onRedirect(redirect3.location, locationState);
      return;
    }
    let [error, errorBoundaryId] = findErrorAndBoundaryId(results, state.matches, maybeActionErrorResult), [catchVal, catchBoundaryId] = await findCatchAndBoundaryId(results, state.matches, maybeActionCatchResult) || [], doneFetcher = {
      state: "idle",
      type: "done",
      data: result.value,
      submission: void 0
    };
    setFetcher(key, doneFetcher);
    let abortedKeys = abortStaleFetchLoads(loadId);
    if (abortedKeys && markFetchersDone(abortedKeys), yeetStaleNavigationLoad(loadId)) {
      let {
        transition
      } = state;
      invariant4(transition.state === "loading", "Expected loading transition"), update({
        location: transition.location,
        matches: state.nextMatches,
        error,
        errorBoundaryId,
        catch: catchVal,
        catchBoundaryId,
        loaderData: makeLoaderData(state, results, matchesToLoad),
        actionData: transition.type === "actionReload" ? state.actionData : void 0,
        transition: IDLE_TRANSITION,
        fetchers: new Map(state.fetchers)
      });
    } else
      update({
        fetchers: new Map(state.fetchers),
        error,
        errorBoundaryId,
        loaderData: makeLoaderData(state, results, matchesToLoad)
      });
  }
  function yeetStaleNavigationLoad(landedId) {
    return state.transition.state === "loading" && navigationLoadId < landedId ? (abortNormalNavigation(), !0) : !1;
  }
  function markFetchersDone(keys2) {
    for (let key of keys2) {
      let doneFetcher = {
        state: "idle",
        type: "done",
        data: getFetcher(key).data,
        submission: void 0
      };
      setFetcher(key, doneFetcher);
    }
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds)
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant4(fetcher, `Expected fetcher: ${key}`), fetcher.state === "loading" && (abortFetcher(key), fetchReloadIds.delete(key), yeetedKeys.push(key));
      }
    return yeetedKeys.length ? yeetedKeys : !1;
  }
  async function handleLoaderFetchSubmission(href, key, submission, match) {
    let currentFetcher = state.fetchers.get(key), fetcher = {
      state: "submitting",
      type: "loaderSubmission",
      submission,
      data: (currentFetcher == null ? void 0 : currentFetcher.data) || void 0
    };
    setFetcher(key, fetcher), update({
      fetchers: new Map(state.fetchers)
    });
    let controller = new AbortController();
    fetchControllers.set(key, controller);
    let result = await callLoader(match, createUrl(href), controller.signal);
    if (fetchControllers.delete(key), controller.signal.aborted)
      return;
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: !0,
        type: "loader",
        setCookie: result.value.setCookie
      };
      init2.onRedirect(result.value.location, locationState);
      return;
    }
    if (maybeBailOnError(match, key, result) || await maybeBailOnCatch(match, key, result))
      return;
    let doneFetcher = {
      state: "idle",
      type: "done",
      data: result.value,
      submission: void 0
    };
    setFetcher(key, doneFetcher), update({
      fetchers: new Map(state.fetchers)
    });
  }
  async function handleLoaderFetch(href, key, match) {
    let currentFetcher = state.fetchers.get(key), fetcher = {
      state: "loading",
      type: "normalLoad",
      submission: void 0,
      data: (currentFetcher == null ? void 0 : currentFetcher.data) || void 0
    };
    setFetcher(key, fetcher), update({
      fetchers: new Map(state.fetchers)
    });
    let controller = new AbortController();
    fetchControllers.set(key, controller);
    let result = await callLoader(match, createUrl(href), controller.signal);
    if (controller.signal.aborted)
      return;
    if (fetchControllers.delete(key), isRedirectResult2(result)) {
      let locationState = {
        isRedirect: !0,
        type: "loader",
        setCookie: result.value.setCookie
      };
      init2.onRedirect(result.value.location, locationState);
      return;
    }
    if (maybeBailOnError(match, key, result) || await maybeBailOnCatch(match, key, result))
      return;
    let doneFetcher = {
      state: "idle",
      type: "done",
      data: result.value,
      submission: void 0
    };
    setFetcher(key, doneFetcher), update({
      fetchers: new Map(state.fetchers)
    });
  }
  async function maybeBailOnCatch(match, key, result) {
    if (isCatchResult(result)) {
      let catchBoundaryId = findNearestCatchBoundary(match, state.matches);
      return state.fetchers.delete(key), update({
        transition: IDLE_TRANSITION,
        fetchers: new Map(state.fetchers),
        catch: {
          data: result.value.data,
          status: result.value.status,
          statusText: result.value.statusText
        },
        catchBoundaryId
      }), !0;
    }
    return !1;
  }
  function maybeBailOnError(match, key, result) {
    if (isErrorResult2(result)) {
      let errorBoundaryId = findNearestBoundary2(match, state.matches);
      return state.fetchers.delete(key), update({
        fetchers: new Map(state.fetchers),
        error: result.value,
        errorBoundaryId
      }), !0;
    }
    return !1;
  }
  async function handleNotFoundNavigation(location, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        location
      },
      nextMatches: matches2
    }), await Promise.resolve();
    let catchBoundaryId = findNearestCatchBoundary(matches2[0], matches2);
    update({
      location,
      matches: matches2,
      catch: {
        data: null,
        status: 404,
        statusText: "Not Found"
      },
      catchBoundaryId,
      transition: IDLE_TRANSITION
    });
  }
  async function handleActionSubmissionNavigation(location, submission, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "submitting",
        type: "actionSubmission",
        submission,
        location
      },
      nextMatches: matches2
    });
    let controller = new AbortController();
    pendingNavigationController = controller;
    let actionMatches = matches2, leafMatch = getRequestMatch(createUrl(submission.action), actionMatches), result = await callAction(submission, leafMatch, controller.signal);
    if (controller.signal.aborted)
      return;
    if (isRedirectResult2(result)) {
      let locationState = {
        isRedirect: !0,
        type: "action",
        setCookie: result.value.setCookie
      };
      init2.onRedirect(result.value.location, locationState);
      return;
    }
    let catchVal, catchBoundaryId;
    isCatchResult(result) && ([catchVal, catchBoundaryId] = await findCatchAndBoundaryId([result], actionMatches, result) || []), update({
      transition: {
        state: "loading",
        type: "actionReload",
        submission,
        location
      },
      actionData: {
        [leafMatch.route.id]: result.value
      }
    }), await loadPageData(location, matches2, submission, leafMatch.route.id, result, catchVal, catchBoundaryId);
  }
  async function handleLoaderSubmissionNavigation(location, submission, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "submitting",
        type: "loaderSubmission",
        submission,
        location
      },
      nextMatches: matches2
    }), await loadPageData(location, matches2, submission);
  }
  async function handleHashChange(location, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        location
      },
      nextMatches: matches2
    }), await Promise.resolve(), update({
      location,
      matches: matches2,
      transition: IDLE_TRANSITION
    });
  }
  async function handleLoad(location, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "loading",
        type: "normalLoad",
        submission: void 0,
        location
      },
      nextMatches: matches2
    }), await loadPageData(location, matches2);
  }
  async function handleLoaderRedirect(location, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "loading",
        type: "normalRedirect",
        submission: void 0,
        location
      },
      nextMatches: matches2
    }), await loadPageData(location, matches2);
  }
  async function handleLoaderSubmissionRedirect(location, matches2) {
    abortNormalNavigation(), invariant4(state.transition.type === "loaderSubmission", `Unexpected transition: ${JSON.stringify(state.transition)}`);
    let {
      submission
    } = state.transition;
    update({
      transition: {
        state: "loading",
        type: "loaderSubmissionRedirect",
        submission,
        location
      },
      nextMatches: matches2
    }), await loadPageData(location, matches2, submission);
  }
  async function handleFetchActionRedirect(location, matches2) {
    abortNormalNavigation(), update({
      transition: {
        state: "loading",
        type: "fetchActionRedirect",
        submission: void 0,
        location
      },
      nextMatches: matches2
    }), await loadPageData(location, matches2);
  }
  async function handleActionRedirect(location, matches2) {
    abortNormalNavigation(), invariant4(state.transition.type === "actionSubmission" || state.transition.type === "actionReload" || state.transition.type === "actionRedirect", `Unexpected transition: ${JSON.stringify(state.transition)}`);
    let {
      submission
    } = state.transition;
    update({
      transition: {
        state: "loading",
        type: "actionRedirect",
        submission,
        location
      },
      nextMatches: matches2
    }), await loadPageData(location, matches2, submission);
  }
  function isHashChangeOnly(location) {
    return createHref(state.location) === createHref(location) && state.location.hash !== location.hash;
  }
  async function loadPageData(location, matches2, submission, submissionRouteId, actionResult, catchVal, catchBoundaryId) {
    let maybeActionErrorResult = actionResult && isErrorResult2(actionResult) ? actionResult : void 0, maybeActionCatchResult = actionResult && isCatchResult(actionResult) ? actionResult : void 0, controller = new AbortController();
    pendingNavigationController = controller, navigationLoadId = ++incrementingLoadId;
    let results = await callLoaders(state, location, matches2, controller.signal, maybeActionErrorResult, maybeActionCatchResult, submission, submissionRouteId, void 0, catchBoundaryId);
    if (controller.signal.aborted)
      return;
    let redirect3 = findRedirect(results);
    if (redirect3) {
      if (state.transition.type === "actionReload" || isActionRedirectLocation(location)) {
        let locationState = {
          isRedirect: !0,
          type: "action",
          setCookie: redirect3.setCookie
        };
        init2.onRedirect(redirect3.location, locationState);
      } else if (state.transition.type === "loaderSubmission") {
        let locationState = {
          isRedirect: !0,
          type: "loaderSubmission",
          setCookie: redirect3.setCookie
        };
        init2.onRedirect(redirect3.location, locationState);
      } else {
        var _location$state;
        let locationState = {
          isRedirect: !0,
          type: "loader",
          setCookie: redirect3.setCookie || ((_location$state = location.state) === null || _location$state === void 0 ? void 0 : _location$state.setCookie) === !0
        };
        init2.onRedirect(redirect3.location, locationState);
      }
      return;
    }
    let [error, errorBoundaryId] = findErrorAndBoundaryId(results, matches2, maybeActionErrorResult);
    [catchVal, catchBoundaryId] = await findCatchAndBoundaryId(results, matches2, maybeActionErrorResult) || [catchVal, catchBoundaryId], markFetchRedirectsDone();
    let abortedIds = abortStaleFetchLoads(navigationLoadId);
    abortedIds && markFetchersDone(abortedIds), update({
      location,
      matches: matches2,
      error,
      errorBoundaryId,
      catch: catchVal,
      catchBoundaryId,
      loaderData: makeLoaderData(state, results, matches2),
      actionData: state.transition.type === "actionReload" ? state.actionData : void 0,
      transition: IDLE_TRANSITION,
      fetchers: abortedIds ? new Map(state.fetchers) : state.fetchers
    });
  }
  function abortNormalNavigation() {
    pendingNavigationController && pendingNavigationController.abort();
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant4(controller, `Expected fetch controller: ${key}`), controller.abort(), fetchControllers.delete(key);
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant4(fetcher, `Expected fetcher: ${key}`), fetcher.type === "actionRedirect" && (fetchRedirectIds.delete(key), doneKeys.push(key));
    }
    markFetchersDone(doneKeys);
  }
  function subscribe(subscriber) {
    return subscribers.add(subscriber), () => {
      subscribers.delete(subscriber);
    };
  }
  return {
    subscribe,
    send,
    getState,
    getFetcher,
    deleteFetcher,
    dispose,
    get _internalFetchControllers() {
      return fetchControllers;
    }
  };
}
async function callLoaders(state, location, matches, signal, actionErrorResult, actionCatchResult, submission, submissionRouteId, fetcher, catchBoundaryId) {
  let url = createUrl(createHref(location)), matchesToLoad = filterMatchesToLoad(state, location, matches, actionErrorResult, actionCatchResult, submission, submissionRouteId, fetcher, catchBoundaryId);
  return Promise.all(matchesToLoad.map((match) => callLoader(match, url, signal)));
}
async function callLoader(match, url, signal) {
  invariant4(match.route.loader, `Expected loader for ${match.route.id}`);
  try {
    let {
      params
    } = match, value = await match.route.loader({
      params,
      url,
      signal
    });
    return {
      match,
      value
    };
  } catch (error) {
    return {
      match,
      value: error
    };
  }
}
async function callAction(submission, match, signal) {
  try {
    let value = await match.route.action({
      url: createUrl(submission.action),
      params: match.params,
      submission,
      signal
    });
    return {
      match,
      value
    };
  } catch (error) {
    return {
      match,
      value: error
    };
  }
}
function filterMatchesToLoad(state, location, matches, actionErrorResult, actionCatchResult, submission, submissionRouteId, fetcher, catchBoundaryId) {
  var _location$state2;
  if (catchBoundaryId || submissionRouteId && (actionCatchResult || actionErrorResult)) {
    let foundProblematicRoute = !1;
    matches = matches.filter((match) => foundProblematicRoute ? !1 : match.route.id === submissionRouteId || match.route.id === catchBoundaryId ? (foundProblematicRoute = !0, !1) : !0);
  }
  let isNew = (match, index) => state.matches[index] ? match.route.id !== state.matches[index].route.id : !0, matchPathChanged = (match, index) => {
    var _state$matches$index$;
    return state.matches[index].pathname !== match.pathname || ((_state$matches$index$ = state.matches[index].route.path) === null || _state$matches$index$ === void 0 ? void 0 : _state$matches$index$.endsWith("*")) && state.matches[index].params["*"] !== match.params["*"];
  }, url = createUrl(createHref(location)), filterByRouteProps = (match, index) => {
    if (!match.route.loader)
      return !1;
    if (isNew(match, index) || matchPathChanged(match, index))
      return !0;
    if (match.route.shouldReload) {
      let prevUrl = createUrl(createHref(state.location));
      return match.route.shouldReload({
        prevUrl,
        url,
        submission,
        params: match.params
      });
    }
    return !0;
  };
  return state.matches.length === 1 ? matches.filter((match) => !!match.route.loader) : (fetcher == null ? void 0 : fetcher.type) === "actionReload" || state.transition.type === "actionReload" || state.transition.type === "actionRedirect" || state.transition.type === "fetchActionRedirect" || createHref(url) === createHref(state.location) || url.searchParams.toString() !== state.location.search.substring(1) || (_location$state2 = location.state) !== null && _location$state2 !== void 0 && _location$state2.setCookie ? matches.filter(filterByRouteProps) : matches.filter((match, index, arr) => {
    var _location$state3;
    return (actionErrorResult || actionCatchResult) && arr.length - 1 === index ? !1 : match.route.loader && (isNew(match, index) || matchPathChanged(match, index) || ((_location$state3 = location.state) === null || _location$state3 === void 0 ? void 0 : _location$state3.setCookie));
  });
}
function isRedirectResult2(result) {
  return result.value instanceof TransitionRedirect;
}
function createHref(location) {
  return location.pathname + location.search;
}
function findRedirect(results) {
  for (let result of results)
    if (isRedirectResult2(result))
      return result.value;
  return null;
}
async function findCatchAndBoundaryId(results, matches, actionCatchResult) {
  let loaderCatchResult;
  for (let result of results)
    if (isCatchResult(result)) {
      loaderCatchResult = result;
      break;
    }
  let extractCatchData = async (res) => ({
    status: res.status,
    statusText: res.statusText,
    data: res.data
  });
  if (actionCatchResult && loaderCatchResult) {
    let boundaryId = findNearestCatchBoundary(loaderCatchResult.match, matches);
    return [await extractCatchData(actionCatchResult.value), boundaryId];
  }
  if (loaderCatchResult) {
    let boundaryId = findNearestCatchBoundary(loaderCatchResult.match, matches);
    return [await extractCatchData(loaderCatchResult.value), boundaryId];
  }
  return null;
}
function findErrorAndBoundaryId(results, matches, actionErrorResult) {
  let loaderErrorResult;
  for (let result of results)
    if (isErrorResult2(result)) {
      loaderErrorResult = result;
      break;
    }
  if (actionErrorResult && loaderErrorResult) {
    let boundaryId = findNearestBoundary2(loaderErrorResult.match, matches);
    return [actionErrorResult.value, boundaryId];
  }
  if (actionErrorResult) {
    let boundaryId = findNearestBoundary2(actionErrorResult.match, matches);
    return [actionErrorResult.value, boundaryId];
  }
  if (loaderErrorResult) {
    let boundaryId = findNearestBoundary2(loaderErrorResult.match, matches);
    return [loaderErrorResult.value, boundaryId];
  }
  return [void 0, void 0];
}
function findNearestCatchBoundary(matchWithError, matches) {
  let nearestBoundaryId = null;
  for (let match of matches)
    if (match.route.CatchBoundary && (nearestBoundaryId = match.route.id), match === matchWithError)
      break;
  return nearestBoundaryId;
}
function findNearestBoundary2(matchWithError, matches) {
  let nearestBoundaryId = null;
  for (let match of matches)
    if (match.route.ErrorBoundary && (nearestBoundaryId = match.route.id), match === matchWithError)
      break;
  return nearestBoundaryId;
}
function makeLoaderData(state, results, matches) {
  let newData = {};
  for (let {
    match,
    value
  } of results)
    newData[match.route.id] = value;
  let loaderData = {};
  for (let {
    route
  } of matches) {
    let value = newData[route.id] !== void 0 ? newData[route.id] : state.loaderData[route.id];
    value !== void 0 && (loaderData[route.id] = value);
  }
  return loaderData;
}
function isCatchResult(result) {
  return result.value instanceof CatchValue;
}
function isErrorResult2(result) {
  return result.value instanceof Error;
}
function createUrl(href) {
  return new URL(href, window.location.origin);
}

// node_modules/@remix-run/react/dist/esm/routes.js
function createClientRoute(entryRoute, routeModulesCache, Component) {
  return {
    caseSensitive: !!entryRoute.caseSensitive,
    element: /* @__PURE__ */ React.createElement(Component, {
      id: entryRoute.id
    }),
    id: entryRoute.id,
    path: entryRoute.path,
    index: entryRoute.index,
    module: entryRoute.module,
    loader: createLoader(entryRoute, routeModulesCache),
    action: createAction(entryRoute, routeModulesCache),
    shouldReload: createShouldReload(entryRoute, routeModulesCache),
    ErrorBoundary: entryRoute.hasErrorBoundary,
    CatchBoundary: entryRoute.hasCatchBoundary,
    hasLoader: entryRoute.hasLoader
  };
}
function createClientRoutes(routeManifest, routeModulesCache, Component, parentId) {
  return Object.keys(routeManifest).filter((key) => routeManifest[key].parentId === parentId).map((key) => {
    let route = createClientRoute(routeManifest[key], routeModulesCache, Component), children = createClientRoutes(routeManifest, routeModulesCache, Component, route.id);
    return children.length > 0 && (route.children = children), route;
  });
}
function createShouldReload(route, routeModules) {
  return (arg) => {
    let module = routeModules[route.id];
    return invariant4(module, `Expected route module to be loaded for ${route.id}`), module.unstable_shouldReload ? module.unstable_shouldReload(arg) : !0;
  };
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
  let routeModule = await loadRouteModule(route, routeModules);
  return await prefetchStyleLinks(routeModule), routeModule;
}
function createLoader(route, routeModules) {
  return async ({
    url,
    signal,
    submission
  }) => {
    if (route.hasLoader) {
      let routeModulePromise = loadRouteModuleWithBlockingLinks(route, routeModules);
      try {
        let result = await fetchData(url, route.id, signal, submission);
        if (result instanceof Error)
          throw result;
        let redirect3 = await checkRedirect(result);
        if (redirect3)
          return redirect3;
        if (isCatchResponse(result))
          throw new CatchValue(result.status, result.statusText, await extractData(result));
        return extractData(result);
      } finally {
        await routeModulePromise;
      }
    } else
      await loadRouteModuleWithBlockingLinks(route, routeModules);
  };
}
function createAction(route, routeModules) {
  return async ({
    url,
    signal,
    submission
  }) => {
    let routeModulePromise = await loadRouteModuleWithBlockingLinks(route, routeModules);
    try {
      route.hasAction || console.error(`Route "${route.id}" does not have an action, but you are trying to submit to it. To fix this, please add an \`action\` function to the route`);
      let result = await fetchData(url, route.id, signal, submission);
      if (result instanceof Error)
        throw result;
      let redirect3 = await checkRedirect(result);
      if (redirect3)
        return redirect3;
      if (isCatchResponse(result))
        throw new CatchValue(result.status, result.statusText, await extractData(result));
      return extractData(result);
    } finally {
      await routeModulePromise;
    }
  };
}
async function checkRedirect(response) {
  if (isRedirectResponse3(response)) {
    let url = new URL(response.headers.get("X-Remix-Redirect"), window.location.origin);
    if (url.origin !== window.location.origin)
      await new Promise(() => {
        window.location.replace(url.href);
      });
    else
      return new TransitionRedirect(url.pathname + url.search + url.hash, response.headers.get("X-Remix-Revalidate") !== null);
  }
  return null;
}

// node_modules/@remix-run/react/dist/esm/components.js
var RemixEntryContext = /* @__PURE__ */ React2.createContext(void 0);
function useRemixEntryContext() {
  let context = React2.useContext(RemixEntryContext);
  return invariant4(context, "You must render this element inside a <Remix> element"), context;
}
function RemixEntry({
  context: entryContext,
  action,
  location: historyLocation,
  navigator: _navigator,
  static: staticProp = !1
}) {
  let {
    manifest,
    routeData: documentLoaderData,
    actionData: documentActionData,
    routeModules,
    serverHandoffString,
    appState: entryComponentDidCatchEmulator
  } = entryContext, clientRoutes = React2.useMemo(() => createClientRoutes(manifest.routes, routeModules, RemixRoute), [manifest, routeModules]), [clientState, setClientState] = React2.useState(entryComponentDidCatchEmulator), [transitionManager] = React2.useState(() => createTransitionManager({
    routes: clientRoutes,
    actionData: documentActionData,
    loaderData: documentLoaderData,
    location: historyLocation,
    catch: entryComponentDidCatchEmulator.catch,
    catchBoundaryId: entryComponentDidCatchEmulator.catchBoundaryRouteId,
    onRedirect: _navigator.replace
  }));
  React2.useEffect(() => {
    let subscriber = (state) => {
      setClientState({
        catch: state.catch,
        error: state.error,
        catchBoundaryRouteId: state.catchBoundaryId,
        loaderBoundaryRouteId: state.errorBoundaryId,
        renderBoundaryRouteId: null,
        trackBoundaries: !1,
        trackCatchBoundaries: !1
      });
    };
    return transitionManager.subscribe(subscriber);
  }, [transitionManager]);
  let navigator2 = React2.useMemo(() => ({
    ..._navigator,
    push: (to, state) => transitionManager.getState().transition.state !== "idle" ? _navigator.replace(to, state) : _navigator.push(to, state)
  }), [_navigator, transitionManager]), {
    location,
    matches,
    loaderData,
    actionData
  } = transitionManager.getState();
  React2.useEffect(() => {
    let {
      location: location2
    } = transitionManager.getState();
    historyLocation !== location2 && transitionManager.send({
      type: "navigation",
      location: historyLocation,
      submission: consumeNextNavigationSubmission(),
      action
    });
  }, [transitionManager, historyLocation, action]);
  let ssrErrorBeforeRoutesRendered = clientState.error && clientState.renderBoundaryRouteId === null && clientState.loaderBoundaryRouteId === null ? deserializeError(clientState.error) : void 0, ssrCatchBeforeRoutesRendered = clientState.catch && clientState.catchBoundaryRouteId === null ? clientState.catch : void 0;
  return /* @__PURE__ */ React2.createElement(RemixEntryContext.Provider, {
    value: {
      matches,
      manifest,
      appState: clientState,
      routeModules,
      serverHandoffString,
      clientRoutes,
      routeData: loaderData,
      actionData,
      transitionManager,
      future: entryContext.future
    }
  }, /* @__PURE__ */ React2.createElement(RemixErrorBoundary, {
    location,
    component: RemixRootDefaultErrorBoundary,
    error: ssrErrorBeforeRoutesRendered
  }, /* @__PURE__ */ React2.createElement(RemixCatchBoundary, {
    location,
    component: RemixRootDefaultCatchBoundary,
    catch: ssrCatchBeforeRoutesRendered
  }, /* @__PURE__ */ React2.createElement(Router, {
    navigationType: action,
    location,
    navigator: navigator2,
    static: staticProp
  }, /* @__PURE__ */ React2.createElement(Routes2, null)))));
}
function deserializeError(data) {
  let error = new Error(data.message);
  return error.stack = data.stack, error;
}
function Routes2() {
  let {
    clientRoutes
  } = useRemixEntryContext();
  return useRoutes(clientRoutes) || clientRoutes[0].element;
}
var RemixRouteContext = /* @__PURE__ */ React2.createContext(void 0);
function useRemixRouteContext() {
  let context = React2.useContext(RemixRouteContext);
  return invariant4(context, "You must render this element in a remix route element"), context;
}
function DefaultRouteComponent({
  id
}) {
  throw new Error(`Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`);
}
function RemixRoute({
  id
}) {
  let location = useLocation(), {
    routeData,
    routeModules,
    appState
  } = useRemixEntryContext();
  invariant4(routeData, `Cannot initialize 'routeData'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`), invariant4(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let data = routeData[id], {
    default: Component,
    CatchBoundary,
    ErrorBoundary
  } = routeModules[id], element = Component ? /* @__PURE__ */ React2.createElement(Component, null) : /* @__PURE__ */ React2.createElement(DefaultRouteComponent, {
    id
  }), context = {
    data,
    id
  };
  if (CatchBoundary) {
    let maybeServerCaught = appState.catch && appState.catchBoundaryRouteId === id ? appState.catch : void 0;
    appState.trackCatchBoundaries && (appState.catchBoundaryRouteId = id), context = maybeServerCaught ? {
      id,
      get data() {
        console.error("You cannot `useLoaderData` in a catch boundary.");
      }
    } : {
      id,
      data
    }, element = /* @__PURE__ */ React2.createElement(RemixCatchBoundary, {
      location,
      component: CatchBoundary,
      catch: maybeServerCaught
    }, element);
  }
  if (ErrorBoundary) {
    let maybeServerRenderError = appState.error && (appState.renderBoundaryRouteId === id || appState.loaderBoundaryRouteId === id) ? deserializeError(appState.error) : void 0;
    appState.trackBoundaries && (appState.renderBoundaryRouteId = id), context = maybeServerRenderError ? {
      id,
      get data() {
        console.error("You cannot `useLoaderData` in an error boundary.");
      }
    } : {
      id,
      data
    }, element = /* @__PURE__ */ React2.createElement(RemixErrorBoundary, {
      location,
      component: ErrorBoundary,
      error: maybeServerRenderError
    }, element);
  }
  return /* @__PURE__ */ React2.createElement(RemixRouteContext.Provider, {
    value: context
  }, element);
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React2.useState(!1), [shouldPrefetch, setShouldPrefetch] = React2.useState(!1), {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps;
  React2.useEffect(() => {
    prefetch === "render" && setShouldPrefetch(!0);
  }, [prefetch]);
  let setIntent = () => {
    prefetch === "intent" && setMaybePrefetch(!0);
  }, cancelIntent = () => {
    prefetch === "intent" && (setMaybePrefetch(!1), setShouldPrefetch(!1));
  };
  return React2.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(!0);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]), [shouldPrefetch, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var NavLink2 = /* @__PURE__ */ React2.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let href = useHref(to), [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(NavLink, _extends4({
    ref: forwardedRef,
    to
  }, props, prefetchHandlers)), shouldPrefetch ? /* @__PURE__ */ React2.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink2.displayName = "NavLink";
var Link2 = /* @__PURE__ */ React2.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let href = useHref(to), [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Link, _extends4({
    ref: forwardedRef,
    to
  }, props, prefetchHandlers)), shouldPrefetch ? /* @__PURE__ */ React2.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link2.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event), event.defaultPrevented || ourHandler(event);
  };
}
function Links() {
  let {
    matches,
    routeModules,
    manifest
  } = useRemixEntryContext(), links2 = React2.useMemo(() => getLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, links2.map((link) => {
    if (isPageLinkDescriptor(link))
      return /* @__PURE__ */ React2.createElement(PrefetchPageLinks, _extends4({
        key: link.page
      }, link));
    let imageSrcSet = null;
    return "useId" in React2 ? (link.imagesrcset && (link.imageSrcSet = imageSrcSet = link.imagesrcset, delete link.imagesrcset), link.imagesizes && (link.imageSizes = link.imagesizes, delete link.imagesizes)) : (link.imageSrcSet && (link.imagesrcset = imageSrcSet = link.imageSrcSet, delete link.imageSrcSet), link.imageSizes && (link.imagesizes = link.imageSizes, delete link.imageSizes)), /* @__PURE__ */ React2.createElement("link", _extends4({
      key: link.rel + (link.href || "") + (imageSrcSet || "")
    }, link));
  }));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    clientRoutes
  } = useRemixEntryContext(), matches = React2.useMemo(() => matchClientRoutes(clientRoutes, page), [clientRoutes, page]);
  return matches ? /* @__PURE__ */ React2.createElement(PrefetchPageLinksImpl, _extends4({
    page,
    matches
  }, dataLinkProps)) : (console.warn(`Tried to prefetch ${page} but no routes matched.`), null);
}
function usePrefetchedStylesheets(matches) {
  let {
    routeModules
  } = useRemixEntryContext(), [styleLinks, setStyleLinks] = React2.useState([]);
  return React2.useEffect(() => {
    let interrupted = !1;
    return getStylesheetPrefetchLinks(matches, routeModules).then((links2) => {
      interrupted || setStyleLinks(links2);
    }), () => {
      interrupted = !0;
    };
  }, [matches, routeModules]), styleLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation(), {
    matches,
    manifest
  } = useRemixEntryContext(), newMatchesForData = React2.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, location, "data"), [page, nextMatches, matches, location]), newMatchesForAssets = React2.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, location, "assets"), [page, nextMatches, matches, location]), dataHrefs = React2.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]), moduleHrefs = React2.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]), styleLinks = usePrefetchedStylesheets(newMatchesForAssets);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React2.createElement("link", _extends4({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React2.createElement("link", _extends4({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), styleLinks.map((link) => /* @__PURE__ */ React2.createElement("link", _extends4({
    key: link.href
  }, link))));
}
function V1Meta() {
  let {
    matches,
    routeData,
    routeModules
  } = useRemixEntryContext(), location = useLocation(), meta2 = {}, parentsData = {};
  for (let match of matches) {
    let routeId = match.route.id, data = routeData[routeId], params = match.params, routeModule = routeModules[routeId];
    if (routeModule.meta) {
      let routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
        data,
        parentsData,
        params,
        location,
        matches: void 0
      }) : routeModule.meta;
      if (routeMeta && Array.isArray(routeMeta))
        throw new Error(
          "The route at " + match.route.path + " returns an array. This is only supported with the `v2_meta` future flag in the Remix config. Either set the flag to `true` or update the route's meta function to return an object.\n\nTo reference the v1 meta function API, see https://remix.run/api/conventions#meta"
        );
      Object.assign(meta2, routeMeta);
    }
    parentsData[routeId] = data;
  }
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, Object.entries(meta2).map(([name, value]) => {
    if (!value)
      return null;
    if (["charset", "charSet"].includes(name))
      return /* @__PURE__ */ React2.createElement("meta", {
        key: "charset",
        charSet: value
      });
    if (name === "title")
      return /* @__PURE__ */ React2.createElement("title", {
        key: "title"
      }, String(value));
    let isOpenGraphTag = /^(og|music|video|article|book|profile|fb):.+$/.test(name);
    return [value].flat().map((content) => isOpenGraphTag ? /* @__PURE__ */ React2.createElement("meta", {
      property: name,
      content,
      key: name + content
    }) : typeof content == "string" ? /* @__PURE__ */ React2.createElement("meta", {
      name,
      content,
      key: name + content
    }) : /* @__PURE__ */ React2.createElement("meta", _extends4({
      key: name + JSON.stringify(content)
    }, content)));
  }));
}
function V2Meta() {
  let {
    matches,
    routeData,
    routeModules
  } = useRemixEntryContext(), location = useLocation(), meta2 = [], parentsData = {}, matchesWithMeta = matches.map((match) => ({
    ...match,
    meta: []
  })), index = -1;
  for (let match of matches) {
    index++;
    let routeId = match.route.id, data = routeData[routeId], params = match.params, routeModule = routeModules[routeId], routeMeta = [];
    if (routeModule != null && routeModule.meta && (routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
      data,
      parentsData,
      params,
      location,
      matches: matchesWithMeta
    }) : routeModule.meta), routeMeta = routeMeta || [], !Array.isArray(routeMeta))
      throw new Error("The `v2_meta` API is enabled in the Remix config, but the route at " + match.route.path + ` returns an invalid value. In v2, all route meta functions must return an array of meta objects.

To reference the v1 meta function API, see https://remix.run/api/conventions#meta`);
    matchesWithMeta[index].meta = routeMeta, meta2 = routeMeta, parentsData[routeId] = data;
  }
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, meta2.flat().map((metaProps) => metaProps ? "title" in metaProps ? /* @__PURE__ */ React2.createElement("title", {
    key: "title"
  }, String(metaProps.title)) : "charSet" in metaProps || "charset" in metaProps ? /* @__PURE__ */ React2.createElement("meta", {
    key: "charset",
    charSet: metaProps.charSet || metaProps.charset
  }) : /* @__PURE__ */ React2.createElement("meta", _extends4({
    key: JSON.stringify(metaProps)
  }, metaProps)) : null));
}
function Meta() {
  let {
    future: future2
  } = useRemixEntryContext();
  return future2.v2_meta ? /* @__PURE__ */ React2.createElement(V2Meta, null) : /* @__PURE__ */ React2.createElement(V1Meta, null);
}
var isHydrated = !1;
function Scripts(props) {
  let {
    manifest,
    matches,
    pendingLocation,
    clientRoutes,
    serverHandoffString
  } = useRemixEntryContext();
  React2.useEffect(() => {
    isHydrated = !0;
  }, []);
  let initialScripts = React2.useMemo(() => {
    let contextScript = serverHandoffString ? `window.__remixContext = ${serverHandoffString};` : "", routeModulesScript = `${matches.map((match, index) => `import ${JSON.stringify(manifest.url)};
import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React2.createElement("script", _extends4({}, props, {
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: !0
    })));
  }, []), nextMatches = React2.useMemo(() => {
    if (pendingLocation) {
      let matches2 = matchClientRoutes(clientRoutes, pendingLocation);
      return invariant4(matches2, `No routes match path "${pendingLocation.pathname}"`), matches2;
    }
    return [];
  }, [pendingLocation, clientRoutes]), routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1), preloads = manifest.entry.imports.concat(routePreloads);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("link", {
    rel: "modulepreload",
    href: manifest.url,
    crossOrigin: props.crossOrigin
  }), /* @__PURE__ */ React2.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe2(preloads).map((path) => /* @__PURE__ */ React2.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), isHydrated ? null : initialScripts);
}
function dedupe2(array) {
  return [...new Set(array)];
}
var Form = /* @__PURE__ */ React2.forwardRef((props, ref) => /* @__PURE__ */ React2.createElement(FormImpl, _extends4({}, props, {
  ref
})));
Form.displayName = "Form";
var FormImpl = /* @__PURE__ */ React2.forwardRef(({
  reloadDocument = !1,
  replace = !1,
  method = "get",
  action,
  encType = "application/x-www-form-urlencoded",
  fetchKey,
  onSubmit,
  ...props
}, forwardedRef) => {
  let submit = useSubmitImpl(fetchKey), formMethod = method.toLowerCase() === "get" ? "get" : "post", formAction = useFormAction(action);
  return /* @__PURE__ */ React2.createElement("form", _extends4({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    encType,
    onSubmit: reloadDocument ? void 0 : (event) => {
      if (onSubmit && onSubmit(event), event.defaultPrevented)
        return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter, submitMethod = (submitter == null ? void 0 : submitter.formMethod) || method;
      submit(submitter || event.currentTarget, {
        method: submitMethod,
        replace
      });
    }
  }, props));
});
FormImpl.displayName = "FormImpl";
function useFormAction(action, method = "get") {
  let {
    id
  } = useRemixRouteContext(), resolvedPath = useResolvedPath(action || "."), location = useLocation(), {
    search,
    hash
  } = resolvedPath, isIndexRoute2 = id.endsWith("/index");
  if (action == null && (search = location.search, hash = location.hash, isIndexRoute2)) {
    let params = new URLSearchParams(search);
    params.delete("index"), search = params.toString() ? `?${params.toString()}` : "";
  }
  return (action == null || action === ".") && isIndexRoute2 && (search = search ? search.replace(/^\?/, "?index&") : "?index"), createPath2({
    pathname: resolvedPath.pathname,
    search,
    hash
  });
}
var defaultMethod = "get", defaultEncType = "application/x-www-form-urlencoded";
function useSubmitImpl(key) {
  let navigate = useNavigate(), defaultAction = useFormAction(), {
    transitionManager
  } = useRemixEntryContext();
  return React2.useCallback((target, options = {}) => {
    let method, action, encType, formData;
    if (isFormElement(target)) {
      let submissionTrigger = options.submissionTrigger;
      method = options.method || target.getAttribute("method") || defaultMethod, action = options.action || target.getAttribute("action") || defaultAction, encType = options.encType || target.getAttribute("enctype") || defaultEncType, formData = new FormData(target), submissionTrigger && submissionTrigger.name && formData.append(submissionTrigger.name, submissionTrigger.value);
    } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
      let form = target.form;
      if (form == null)
        throw new Error("Cannot submit a <button> without a <form>");
      method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod, action = options.action || target.getAttribute("formaction") || form.getAttribute("action") || defaultAction, encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType, formData = new FormData(form), target.name && formData.append(target.name, target.value);
    } else {
      if (isHtmlElement(target))
        throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
      if (method = options.method || "get", action = options.action || defaultAction, encType = options.encType || "application/x-www-form-urlencoded", target instanceof FormData)
        formData = target;
      else if (formData = new FormData(), target instanceof URLSearchParams)
        for (let [name, value] of target)
          formData.append(name, value);
      else if (target != null)
        for (let name of Object.keys(target))
          formData.append(name, target[name]);
    }
    if (typeof document > "u")
      throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
    let {
      protocol,
      host
    } = window.location, url = new URL(action, `${protocol}//${host}`);
    if (method.toLowerCase() === "get") {
      let params = new URLSearchParams(), hasParams = !1;
      for (let [name, value] of formData)
        if (typeof value == "string")
          hasParams = !0, params.append(name, value);
        else
          throw new Error("Cannot submit binary form data using GET");
      let isIndexAction = new URLSearchParams(url.search).getAll("index").some((v) => v === "");
      key != null && isIndexAction && (hasParams = !0, params.append("index", "")), url.search = hasParams ? `?${params.toString()}` : "";
    }
    let submission = {
      formData,
      action: url.pathname + url.search,
      method: method.toUpperCase(),
      encType,
      key: Math.random().toString(36).substr(2, 8)
    };
    key ? transitionManager.send({
      type: "fetcher",
      href: submission.action,
      submission,
      key
    }) : (setNextNavigationSubmission(submission), navigate(url.pathname + url.search, {
      replace: options.replace
    }));
  }, [defaultAction, key, navigate, transitionManager]);
}
var nextNavigationSubmission;
function setNextNavigationSubmission(submission) {
  nextNavigationSubmission = submission;
}
function consumeNextNavigationSubmission() {
  let submission = nextNavigationSubmission;
  return nextNavigationSubmission = void 0, submission;
}
function isHtmlElement(object) {
  return object != null && typeof object.tagName == "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function useBeforeUnload(callback) {
  React2.useEffect(() => (window.addEventListener("beforeunload", callback), () => {
    window.removeEventListener("beforeunload", callback);
  }), [callback]);
}
function useLoaderData() {
  return useRemixRouteContext().data;
}
function useTransition() {
  let {
    transitionManager
  } = useRemixEntryContext();
  return transitionManager.getState().transition;
}
var LiveReload = function({
  port = Number(8002),
  nonce = void 0
}) {
  let js = String.raw;
  return /* @__PURE__ */ React2.createElement("script", {
    nonce,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: js`
                function remixLiveReloadConnect(config) {
                  let protocol = location.protocol === "https:" ? "wss:" : "ws:";
                  let host = location.hostname;
                  let socketPath = protocol + "//" + host + ":" + ${String(port)} + "/socket";

                  let ws = new WebSocket(socketPath);
                  ws.onmessage = (message) => {
                    let event = JSON.parse(message.data);
                    if (event.type === "LOG") {
                      console.log(event.message);
                    }
                    if (event.type === "RELOAD") {
                      console.log("💿 Reloading window ...");
                      window.location.reload();
                    }
                  };
                  ws.onopen = () => {
                    if (config && typeof config.onOpen === "function") {
                      config.onOpen();
                    }
                  };
                  ws.onclose = (error) => {
                    console.log("Remix dev asset server web socket closed. Reconnecting...");
                    setTimeout(
                      () =>
                        remixLiveReloadConnect({
                          onOpen: () => window.location.reload(),
                        }),
                      1000
                    );
                  };
                  ws.onerror = (error) => {
                    console.log("Remix dev asset server web socket error:");
                    console.error(error);
                  };
                }
                remixLiveReloadConnect();
              `
    }
  });
};

// node_modules/@remix-run/react/dist/esm/index.js
init_react_router_dom();

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
var React3 = __toESM(require_react());
init_react_router_dom();
var STORAGE_KEY = "positions", positions = {};
if (typeof document < "u") {
  let sessionPositions = sessionStorage.getItem(STORAGE_KEY);
  sessionPositions && (positions = JSON.parse(sessionPositions));
}
function ScrollRestoration({
  nonce = void 0
}) {
  useScrollRestoration(), React3.useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []), useBeforeUnload(React3.useCallback(() => {
    window.history.scrollRestoration = "auto";
  }, []));
  let restoreScroll = ((STORAGE_KEY2) => {
    if (!window.history.state || !window.history.state.key) {
      let key = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key
      }, "");
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")[window.history.state.key];
      typeof storedY == "number" && window.scrollTo(0, storedY);
    } catch (error) {
      console.error(error), sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React3.createElement("script", {
    nonce,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)})`
    }
  });
}
var hydrated = !1;
function useScrollRestoration() {
  let location = useLocation(), transition = useTransition(), wasSubmissionRef = React3.useRef(!1);
  React3.useEffect(() => {
    transition.submission && (wasSubmissionRef.current = !0);
  }, [transition]), React3.useEffect(() => {
    transition.location && (positions[location.key] = window.scrollY);
  }, [transition, location]), useBeforeUnload(React3.useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [])), typeof document < "u" && React3.useLayoutEffect(() => {
    if (!hydrated) {
      hydrated = !0;
      return;
    }
    let y = positions[location.key];
    if (y != null) {
      window.scrollTo(0, y);
      return;
    }
    if (location.hash) {
      let el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    if (wasSubmissionRef.current === !0) {
      wasSubmissionRef.current = !1;
      return;
    }
    window.scrollTo(0, 0);
  }, [location]), React3.useEffect(() => {
    transition.submission && (wasSubmissionRef.current = !0);
  }, [transition]);
}

// node_modules/@remix-run/react/dist/esm/server.js
init_history();
var React4 = __toESM(require_react());
function RemixServer({
  context,
  url
}) {
  typeof url == "string" && (url = new URL(url));
  let location = {
    pathname: url.pathname,
    search: url.search,
    hash: "",
    state: null,
    key: "default"
  }, staticNavigator = {
    createHref(to) {
      return typeof to == "string" ? to : createPath2(to);
    },
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
    },
    forward() {
      throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
    },
    block() {
      throw new Error("You cannot use navigator.block() on the server because it is a stateless environment.");
    }
  };
  return /* @__PURE__ */ React4.createElement(RemixEntry, {
    context,
    action: Action2.Pop,
    location,
    navigator: staticNavigator,
    static: !0
  });
}

// app/entry.server.tsx
var import_server3 = __toESM(require_server()), import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server3.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixServer, {
      context: remixContext,
      url: request.url
    }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-LE7FMEUR.css";

// app/root.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime()), links = () => [{ rel: "stylesheet", href: tailwind_default }], meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Meta, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 25,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Links, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 26,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 24,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Outlet, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 29,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ScrollRestoration, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 30,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Scripts, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 31,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LiveReload, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 32,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}

// app/routes/callback.tsx
var callback_exports = {};
__export(callback_exports, {
  loader: () => loader
});

// app/services/auth0.server.ts
var import_cloudflare2 = __toESM(require_dist()), import_remix_auth = __toESM(require_build()), import_remix_auth_auth0 = __toESM(require_build3());

// app/services/prisma.server.ts
var import_client = __toESM(require_index_browser3()), prismaClient = new import_client.PrismaClient(), prisma_server_default = prismaClient;

// app/repository/User.server.ts
var findOrCreateUser = async ({
  email,
  name,
  password
}) => {
  let existingUser = await prisma_server_default.user.findUnique({
    where: { email }
  });
  return existingUser || await prisma_server_default.user.create({
    data: {
      email,
      name,
      password
    }
  });
};

// app/controllers/UserController.server.ts
var FindOrCreateUser = async ({
  email,
  name,
  password
}) => {
  let hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return findOrCreateUser({ email, name, password: hash.toString() });
};

// app/services/auth0.server.ts
var sessionStorage2 = (0, import_cloudflare2.createCookieSessionStorage)({
  cookie: {
    name: "_session_remix",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: [
      "DblYkEpnCnyO30mDJYZZC86sc-FcL5Oh6xj_Anx-2grLmjwHlC-FCCsjsSXBUIlj"
    ],
    secure: !1
  }
}), authenticator = new import_remix_auth.Authenticator(sessionStorage2), isAuthenticated = async (request) => authenticator.isAuthenticated(request, {
  failureRedirect: "/home"
}), getAuthenticatedUser = async (request) => await isAuthenticated(request), auth0Strategy = new import_remix_auth_auth0.Auth0Strategy(
  {
    domain: "dev-w3blvdn3ap5zantq.us.auth0.com",
    clientID: "xNmmXqKytbauTXKerddcwNPdLy9o9iuF",
    clientSecret: "DblYkEpnCnyO30mDJYZZC86sc-FcL5Oh6xj_Anx-2grLmjwHlC-FCCsjsSXBUIlj",
    callbackURL: "localhost:8788/callback"
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => await FindOrCreateUser({
    email: profile.emails[0].value,
    name: profile.name.givenName,
    password: profile.provider
  })
);
authenticator.use(auth0Strategy);

// app/routes/callback.tsx
var loader = ({ request }) => authenticator.authenticate("auth0", request, {
  successRedirect: "/",
  failureRedirect: "/"
});

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader2
});
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime()), loader2 = async ({ request }) => ({
  authenticated: await getAuthenticatedUser(request)
});
function Index() {
  let { authenticated } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", {
    style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.4" },
    children: authenticated ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", {
          className: "",
          children: "Welcome to Remix"
        }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 20,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", {
          children: JSON.stringify(authenticated, null, 2)
        }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_jsx_dev_runtime3.Fragment, {
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Link2, {
        to: "/login",
        children: "Login"
      }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  loader: () => loader3
});
var import_cloudflare3 = __toESM(require_dist());
var loader3 = async ({ request }) => await authenticator.isAuthenticated(request) ? (0, import_cloudflare3.redirect)("/dashboard") : authenticator.authenticate("auth0", request);

// app/routes/home.tsx
var home_exports = {};
__export(home_exports, {
  default: () => Home
});
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
function Home() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
    className: "flex flex-col items-center justify-center min-h-screen py-2",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("header", {
        className: "flex items-center justify-between w-full px-4 py-8",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", {
            className: "text-2xl font-bold",
            children: "Remix Auth0"
          }, void 0, !1, {
            fileName: "app/routes/home.tsx",
            lineNumber: 8,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("nav", {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ul", {
              className: "flex space-x-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link2, {
                    to: "/",
                    children: "Home"
                  }, void 0, !1, {
                    fileName: "app/routes/home.tsx",
                    lineNumber: 12,
                    columnNumber: 15
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/home.tsx",
                  lineNumber: 11,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link2, {
                    to: "/login",
                    children: "Login"
                  }, void 0, !1, {
                    fileName: "app/routes/home.tsx",
                    lineNumber: 15,
                    columnNumber: 15
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/home.tsx",
                  lineNumber: 14,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("li", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Link2, {
                    to: "/dashboard",
                    children: "Dashboard"
                  }, void 0, !1, {
                    fileName: "app/routes/home.tsx",
                    lineNumber: 18,
                    columnNumber: 15
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/home.tsx",
                  lineNumber: 17,
                  columnNumber: 13
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/home.tsx",
              lineNumber: 10,
              columnNumber: 11
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/home.tsx",
            lineNumber: 9,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/home.tsx",
        lineNumber: 7,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("main", {
        className: "flex flex-col items-center justify-center flex-1 px-20 text-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", {
            className: "text-6xl font-bold",
            children: [
              "Welcome to ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("a", {
                href: "https://remix.run",
                children: "Remix"
              }, void 0, !1, {
                fileName: "app/routes/home.tsx",
                lineNumber: 25,
                columnNumber: 22
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/home.tsx",
            lineNumber: 24,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", {
            className: "mt-3 text-2xl",
            children: [
              "Get started by editing ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("code", {
                children: "app/routes/index.tsx"
              }, void 0, !1, {
                fileName: "app/routes/home.tsx",
                lineNumber: 28,
                columnNumber: 34
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/home.tsx",
            lineNumber: 27,
            columnNumber: 9
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/home.tsx",
        lineNumber: 23,
        columnNumber: 7
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/home.tsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "57724f99", entry: { module: "/build/entry.client-4LDHXOA2.js", imports: ["/build/_shared/chunk-EBCON3N4.js", "/build/_shared/chunk-42Z7WWMI.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-W7KAEA54.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/callback": { id: "routes/callback", parentId: "root", path: "callback", index: void 0, caseSensitive: void 0, module: "/build/routes/callback-Q2U5PZ22.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/home": { id: "routes/home", parentId: "root", path: "home", index: void 0, caseSensitive: void 0, module: "/build/routes/home-MXHO6KMN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-ZRKYNZIG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-GAVTAGMI.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-57724F99.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_meta: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/callback": {
    id: "routes/callback",
    parentId: "root",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: callback_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: "home",
    index: void 0,
    caseSensitive: void 0,
    module: home_exports
  }
};

// server.js
var handleRequest2 = createPagesFunctionHandler({
  build: server_build_exports,
  mode: "development",
  getLoadContext: (context) => context.env
});
function onRequest(context) {
  return handleRequest2(context);
}
export {
  onRequest
};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 *  decimal.js v10.4.2
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * @remix-run/cloudflare v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/cloudflare-pages v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/router v1.0.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router DOM v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * React Router v6.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/** @license React v17.0.2
 * react-dom-server.node.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @license React v17.0.2
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=/build/[[path]].js.map
