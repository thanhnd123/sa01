(function () {
  'use strict';
  // console.log(chrome.runtime.getURL("assets/chunk-032ae0e5.js"))
  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/chunk-032ae0e5.js")
    );
  })().catch(error => console.error(error));
})();

