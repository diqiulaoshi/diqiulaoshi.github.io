(function (global) {
  const CHARS =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
    'ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴァィゥェォャュョッ' +
    '0123456789' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '!@#$%^&*()_+-=[]{}|;:,.<>?/~`\\';

  function MatrixRain(target, opts) {
    const o = Object.assign({
      size: 10,        // 字号 = 列宽 = 行高
      interval: 50,    // 每帧间隔 ms
      trail: 0.06,     // 拖尾衰减，越小尾巴越长
      headRate: 0.975, // 触底后重置概率
      body: '#3df8f8e6', // 主体色
      head: '#3df8f8', // 头部高光
      font: 'LSf'
    }, opts);

    const cv = typeof target === 'string'
      ? document.querySelector(target)
      : target;
    if (!cv) throw new Error('MatrixRain: 找不到画布 ' + target);

    const ctx = cv.getContext('2d');
    let W, H, cols, drops;

    function resize() {
      W = cv.width = cv.clientWidth || innerWidth;
      H = cv.height = cv.clientHeight || innerHeight;
      ctx.font = o.size + 'px ' + o.font;
      ctx.textBaseline = 'top';
      cols = Math.ceil(W / o.size);
      drops = Array.from({ length: cols }, () => Math.random() * H / o.size | 0);
    }

    let timer = null;

    function tick() {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,' + o.trail + ')';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    for (let i = 0; i < cols; i++) {
        const x = i * o.size;
        const y = drops[i] * o.size;
        const ch = CHARS[Math.random() * CHARS.length | 0];

        ctx.fillStyle = o.body;
        ctx.fillText(ch, x, y);
        ctx.fillStyle = o.head;
        ctx.fillText(ch, x, y);

        if (y > H && Math.random() > o.headRate) drops[i] = 0;
        else drops[i]++;
        }
    }

    resize();
    addEventListener('resize', resize);

    return {
      start() {
        if (timer) return;
        timer = setInterval(tick, o.interval);
      },
      stop() {
        clearInterval(timer);
        timer = null;
      },
      destroy() {
        this.stop();
        removeEventListener('resize', resize);
        ctx.clearRect(0, 0, W, H);
      }
    };
  }

  // 挂到全局，也兼容 CommonJS / AMD
  if (typeof module !== 'undefined' && module.exports) module.exports = MatrixRain;
  else global.MatrixRain = MatrixRain;
})(typeof window !== 'undefined' ? window : this);