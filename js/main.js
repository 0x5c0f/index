(function () {
  'use strict';

  /* ===== 主题切换（与 azenv 共用 key，整站联动） ===== */
  const THEME_KEY = '0x5c0f-theme';
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const cur = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(cur === 'light' ? 'dark' : 'light');
    });
  });
  // 其他标签页切换主题时实时同步
  window.addEventListener('storage', function (e) {
    if (e.key === THEME_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
      document.documentElement.setAttribute('data-theme', e.newValue);
    }
  });

  /* ===== 打字机效果 ===== */
  const bioEl = document.getElementById('bio');
  if (bioEl) {
    const fullText = bioEl.dataset.text || '';

    // 初始显示 "..."
    bioEl.textContent = ' ...';

    setTimeout(function () {
      bioEl.textContent = '';
      let idx = 0;

      function typeChar() {
        if (idx < fullText.length) {
          idx++;
          bioEl.textContent = fullText.slice(0, idx) + '...';
          const delay = 120 + Math.random() * 100;
          setTimeout(typeChar, delay);
        }
      }

      typeChar();
    }, 900);
  }

  /* ===== 时钟 ===== */
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    if (timeEl) {
      timeEl.textContent = h + ':' + m + ':' + s;
      if (s === '00') {
        timeEl.classList.add('flicker');
        setTimeout(function () { timeEl.classList.remove('flicker'); }, 200);
      }
    }

    if (dateEl) {
      const week = ['日', '一', '二', '三', '四', '五', '六'];
      dateEl.textContent =
        now.getFullYear() + ' 年 ' +
        (now.getMonth() + 1) + ' 月 ' +
        now.getDate() + ' 日　星期' + week[now.getDay()];
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  /* ===== 一言 ===== */
  const quoteEl = document.getElementById('quote');
  const fallbackQuotes = [
    '人生就是一次次幸福的奔赴。',
    '代码如诗，调试如禅。',
    '每一行注释，都是写给未来自己的信。',
    '世界是代码的，也是数据的，但归根结底是人的。',
  ];

  function fetchQuote() {
    fetch('https://v1.hitokoto.cn/?encode=text&max_length=48')
      .then(function (r) { return r.text(); })
      .then(function (text) {
        if (quoteEl && text && text.trim()) {
          quoteEl.classList.add('fade');
          setTimeout(function () {
            quoteEl.textContent = '「 ' + text.trim() + ' 」';
            quoteEl.classList.remove('fade');
          }, 400);
        }
      })
      .catch(function () {
        /* 降级：API 失败时才显示备用文案 */
        if (quoteEl) {
          const text = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
          quoteEl.classList.add('fade');
          setTimeout(function () {
            quoteEl.textContent = '「 ' + text + ' 」';
            quoteEl.classList.remove('fade');
          }, 400);
        }
      });
  }

  fetchQuote();

  /* ===== 光尘粒子 ===== */
  var dustContainer = document.getElementById('dust');
  if (dustContainer) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 15; i++) {
      var speck = document.createElement('span');
      speck.className = 'dust-speck';
      speck.style.left   = Math.random() * 100 + '%';
      speck.style.top    = Math.random() * 100 + '%';
      speck.style.animationDelay = Math.random() * 10 + 's';
      speck.style.animationDuration = (6 + Math.random() * 10) + 's';
      fragment.appendChild(speck);
    }
    dustContainer.appendChild(fragment);
  }

})();
