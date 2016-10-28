export default class Marquee {
  constructor(text, speed) {
    this.text = text;
    this.speed = speed || 1;
    this.pool = [];
  }

  render(size) {
    this.el = document.createElement('DIV');
    this.el.className = 'marquee';

    this.el.style.fontSize = `${size / 2}px`;
    this.el.style.height = `${size}px`;
    this.el.style.lineHeight = `${size}px`;

    return this.el;
  }

  segment() {
    const el = document.createElement('DIV');
    el.className = 'crawler';
    el.innerText = this.text + '\xa0';
    this.el.appendChild(el);
    return el;
  }

  queue() {
    return new Promise(resolve => {
      const el = this.pool.pop() || this.segment();

      const bounds = -(el.offsetWidth);
      const limit = -(el.offsetWidth + this.el.offsetWidth);

      let left = 0;

      const tick = () => {
        el.style.transform = `translateX(${left -= this.speed}px)`;

        // Next
        if (left < bounds) resolve();

        // Animate
        if (left > limit) window.requestAnimationFrame(tick);

        // Pool
        if (left <= limit) this.pool.push(el);
      };

      tick();

      return el;
    });
  }

  run() {
    if (this.destroyed) return;
    this.queue()
      .then(() => this.run());
  }

  destroy(parent) {
    if (this.destroyed) return;
    parent.removeChild(this.el);
    this.destroyed = true;
  }
}

