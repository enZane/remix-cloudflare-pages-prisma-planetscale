import {
  Link,
  require_jsx_dev_runtime,
  useLoaderData
} from "/build/_shared/chunk-EBCON3N4.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-42Z7WWMI.js";

// empty-module:~/services/auth0.server
var require_auth0 = __commonJS({
  "empty-module:~/services/auth0.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/index.tsx
var import_auth0 = __toESM(require_auth0());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Index() {
  const { authenticated } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
    style: { fontFamily: "system-ui, sans-serif", lineHeight: "1.4" },
    children: authenticated ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, {
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
          className: "",
          children: "Welcome to Remix"
        }, void 0, false, {
          fileName: "app/routes/index.tsx",
          lineNumber: 20,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
          children: JSON.stringify(authenticated, null, 2)
        }, void 0, false, {
          fileName: "app/routes/index.tsx",
          lineNumber: 21,
          columnNumber: 11
        }, this)
      ]
    }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 19,
      columnNumber: 9
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, {
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
        to: "/login",
        children: "Login"
      }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 25,
        columnNumber: 11
      }, this)
    }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this)
  }, void 0, false, {
    fileName: "app/routes/index.tsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-ZRKYNZIG.js.map
