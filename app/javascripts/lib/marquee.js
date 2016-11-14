export default class Marquee {
  constructor({ messages, speed, intercept, transform, cursor }) {
    this.messages = messages;
    this.speed = parseFloat(speed || 1);
    this.pool = [];
    this.intercept = intercept || (x => x);
    this.transform = transform;
    this.cursor = cursor;

    if (this.cursor > 0) this.forward(this.cursor);
  }

  render(size, ratio = 2) {
    this.el = document.createElement('DIV');
    this.el.className = 'marquee';

    this.el.style.textTransform = this.transform;
    this.el.style.fontSize = `${size / ratio}px`;
    this.el.style.height = `${size}px`;
    this.el.style.lineHeight = `${size}px`;

    return this.el;
  }

  forward(cursor) {
    return this.messages = this.messages.slice(cursor).concat(this.messages.slice(0, cursor));
  }

  peek() {
    return this.messages[0];
  }

  segment(message) {
    const el = document.createElement('DIV');
    el.className = 'crawler';
    el.innerText = message + '\xa0\xa0';
    this.el.appendChild(el);
    return el;
  }

  queue() {
    return new Promise(resolve => {
      const queued = this.intercept(this.messages.shift());
      const el = this.segment(queued);
      this.messages.push(queued);

      const bounds = -(el.offsetWidth);
      const limit = -(el.offsetWidth + this.el.offsetWidth);

      let left = 0;

      const tick = () => {
        el.style.transform = `translateX(${left -= this.speed}px)`;

        // Next
        if (left < bounds) resolve();

        // Animate
        if (left > limit) window.requestAnimationFrame(tick);
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

