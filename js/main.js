/**
 * 0x5c0f 个人主页 - 主脚本
 */

// 配置
const CONFIG = {
  siteName: '0x5c0f',
  quotes: [
    '「又一天过去了，梦想是不是更远了？」',
    '「情绪不好的时候，问问自己，是不是又在强求不属于自己的东西了。」',
    '「生活的理想，就是为了理想的生活。」',
    '「人生的价值，并不是用时间，而是用深度去衡量的。」',
    '「世界上只有一种英雄主义，就是看清生活的真相之后依然热爱生活。」',
    '「你若要喜爱你自己的价值，你就得给世界创造价值。」',
    '「人生应该如蜡烛一样，从顶燃到底，一直都是光明的。」',
    '「一个人的价值，应该看他贡献什么，而不应当看他取得什么。」',
    '「人只有献身于社会，才能找出那短暂而有风险的生命的意义。」',
    '「芸芸众生，孰不爱生？爱生之极，进而爱群。」'
  ],
  particleCount: 30,
  quoteInterval: 30000 // 30秒
};

// 状态
let lastTime = '';
let currentQuoteIndex = 0;

/**
 * 初始化粒子背景
 */
function initParticles() {
  // 尊重用户的动画偏好
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < CONFIG.particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

/**
 * 初始化加载动画
 */
function initLoader() {
  setTimeout(() => {
    const loader = document.getElementById('loader-wrapper');
    const card = document.querySelector('.card');

    if (loader) {
      loader.classList.add('loaded');
    }

    setTimeout(() => {
      if (card) {
        card.classList.add('visible');
      }
    }, 800);
  }, 2000);
}

/**
 * 更新时间显示
 */
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const currentTime = hours + ':' + minutes + ':' + seconds;

  if (currentTime !== lastTime) {
    const timeEl = document.getElementById('time');
    if (timeEl) {
      timeEl.innerHTML = '';

      for (let i = 0; i < currentTime.length; i++) {
        const span = document.createElement('span');
        span.className = 'digit';
        span.textContent = currentTime[i];
        timeEl.appendChild(span);
      }
    }

    lastTime = currentTime;
  }

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekDay = weekDays[now.getDay()];

  const dateEl = document.getElementById('date');
  if (dateEl) {
    dateEl.textContent = year + '年' + month + '月' + day + '日 星期' + weekDay;
  }
}

/**
 * 更新一言（带淡入淡出）
 */
function updateQuote(quote) {
  const quoteEl = document.getElementById('quote');
  if (!quoteEl) return;

  quoteEl.classList.add('fade-out');

  setTimeout(() => {
    quoteEl.textContent = quote;
    quoteEl.classList.remove('fade-out');
  }, 500);
}

/**
 * 从本地数组获取随机一言
 */
function getRandomQuote() {
  const quote = CONFIG.quotes[currentQuoteIndex];
  currentQuoteIndex = (currentQuoteIndex + 1) % CONFIG.quotes.length;
  return quote;
}


/**
 * 初始化一言
 */
function initQuote() {
  // 显示本地一言
  updateQuote(getRandomQuote());

  // 定时更新本地一言
  setInterval(() => {
    updateQuote(getRandomQuote());
  }, CONFIG.quoteInterval);
}

/**
 * 处理备案信息显示
 */
function handleBeian() {
  const domain = window.location.hostname;
  const beianEl = document.getElementById('beian');

  if (beianEl && domain.indexOf('tools.0x5c0f.cc') === -1) {
    // 备案信息在本地环境也显示
    // beianEl.style.display = 'none';
  }
}

/**
 * 初始化
 */
function init() {
  initParticles();
  initLoader();

  // 更新时间
  updateTime();
  setInterval(updateTime, 1000);

  // 初始化一言
  initQuote();

  // 处理备案信息
  handleBeian();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
