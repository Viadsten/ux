export class Cursor {
  constructor() {
    this.container = document.querySelector('[data-scroll-container]');

    if (!this.container) {
      return;
    }
    this.cursor = null;
    this.ease = 0.15;
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };

    this.updatePosition = this.updatePosition.bind(this);
    this.handlerMouseMove = this.handlerMouseMove.bind(this);

    this.init();
  }

  init() {
    // render
    this.renderCursor();
    this.cursor = this.container.querySelector('.cursor');
    // setListeners
    gsap.ticker.add(this.updatePosition);
    window.addEventListener('mousemove', this.handlerMouseMove);
  }

  renderCursor() {
    return this.container.insertAdjacentHTML('beforeend', this.cursorTemplate());
  }

  cursorTemplate() {
    return ('<span class="cursor"></span>')
  }

  handlerMouseMove(evt) {
    this.mouse.x = evt.clientX;
    this.mouse.y = evt.clientY;
  };

  updatePosition() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.ease;
    this.pos.y += (this.mouse.y - this.pos.y) * this.ease;

    gsap.to(this.cursor, {
      duration: 0.6,
      ease: "Power2.inOut",
      x: this.pos.x,
      y: this.pos.y,
    })
  }
}
