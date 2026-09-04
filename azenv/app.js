/* azenv 子页面客户端脚本：复制按钮（纯静态，无依赖） */
(function () {
  "use strict";

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); resolve(); }
      catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }

  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = btn.closest(".row");
      var val = row ? row.querySelector(".val") : null;
      var text = val ? val.textContent : "";
      if (btn.disabled || !text) return;
      copyText(text).then(function () {
        var old = btn.textContent;
        btn.textContent = "copied ✓";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = old;
          btn.classList.remove("copied");
        }, 1500);
      }).catch(function () {
        btn.textContent = "failed";
        setTimeout(function () { btn.textContent = "copy"; }, 1500);
      });
    });
  });
})();
