// export class Cursor {
//   constructor() {
//     this.container = document.querySelector('[data-scroll-container]');

import { scrollObserver } from "../../utils/observers";

//     if (!this.container) {
//       return;
//     }
//     this.cursor = null;
//     this.ease = 0.15;
//     this.pos = { x: 0, y: 0 };
//     this.mouse = { x: 0, y: 0 };

//     this.updatePosition = this.updatePosition.bind(this);
//     this.handlerMouseMove = this.handlerMouseMove.bind(this);

//     this.init();
//   }

//   init() {
//     // render
//     this.renderCursor();
//     this.cursor = this.container.querySelector('.cursor');
//     // setListeners
//     gsap.ticker.add(this.updatePosition);
//     window.addEventListener('mousemove', this.handlerMouseMove);
//   }

//   renderCursor() {
//     return this.container.insertAdjacentHTML('beforeend', this.cursorTemplate());
//   }

//   cursorTemplate() {
//     return ('<span class="cursor"></span>')
//   }

//   handlerMouseMove(evt) {
//     this.mouse.x = evt.clientX;
//     this.mouse.y = evt.clientY;
//   };

//   updatePosition() {
//     this.pos.x += (this.mouse.x - this.pos.x) * this.ease;
//     this.pos.y += (this.mouse.y - this.pos.y) * this.ease;

//     gsap.to(this.cursor, {
//       duration: 0.6,
//       ease: "Power2.inOut",
//       x: this.pos.x,
//       y: this.pos.y,
//     })
//   }
// }

export class Cursor {
  constructor() {
    this.container = document.querySelector('[data-scroll-container]');
    if (!this.container) {
      return;
    }

    this.mediaTouchDevice = matchMedia('(pointer: coarse)');
    this.cursor = null;
    this.ease = 0.15;
    this.pos = {x: 0, y: 0};
    this.mouse = {x: 0, y: 0};
    // this.arrowTimeline = gsap.to('.cursor-lazy svg', {rotateY: 180, paused: true, duration: 0.35, ease: 'Power1.out'});
    this.sliderInView = false;
    this.clickIsPlaying = false;
    this.circleBtnInView = false;

    this.breakpointChecker = this.breakpointChecker.bind(this);
    this.setListeners = this.setListeners.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.handlerMouseMove = this.handlerMouseMove.bind(this);
    this.updateDisplayOnMouseMove = this.updateDisplayOnMouseMove.bind(this);
    this.clickCursorAnimation = this.clickCursorAnimation.bind(this);
    this.checkCursorType = this.checkCursorType.bind(this);
    this.hideCursor = this.hideCursor.bind(this);
    this.showCursor = this.showCursor.bind(this);

    this.init();
  }

  renderCursor() {
    return this.container.insertAdjacentHTML('beforeend', this.cursorTemplate());
  }

  cursorTemplate() {
    return (
      `<div class="cursor">
        <span class="cursor__content">
        </span>
      </div>`
    );
  }

  handlerMouseMove(evt) {
    if (evt && evt.type === 'mousemove') {
      this.evt = evt;
    } else if (!this.evt && !evt) {
      return;
    }

    const btnCircle = this.evt.target.closest('[data-cursor-btn="circle"]');
    if (btnCircle) {
      const btnRect = btnCircle.getBoundingClientRect();
      const cursorRect = this.cursor.getBoundingClientRect();
      if (!this.circleBtnInView) {
        gsap.to(this.cursorContent, {scale: ((btnRect.width / cursorRect.width).toFixed(2)), duration: 0.4, ease: 'Power1.out'});
        this.circleBtnInView = true;
      }

      const pos = {
        x: (btnRect.left + btnRect.width / 2),
        y: (btnRect.top + btnRect.height / 2),
      };

      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
    } else {
      if (this.circleBtnInView) {
        gsap.to(this.cursorContent, {scale: 1, duration: 0.6, ease: 'Power3.out'});
        this.circleBtnInView = false;
      }

      this.mouse.x = this.evt.clientX;
      this.mouse.y = this.evt.clientY;
    }

    // this.updateDisplayOnMouseMove(this.evt);
  }

  checkCursorType(cursorBox) {
    if (cursorBox.dataset.cursorLazy === 'map' && cursorBox.classList.contains('is-open')) {
      this.cursor.classList.remove('is-shown');
      this.cursor.classList.remove('is-map');
      return 'hide';
    }
    if (cursorBox.dataset.cursorLazy === 'project') {
      this.cursor.classList.add('has-text');
    } else {
      this.cursor.classList.remove('has-text');
    }

    if (cursorBox.dataset.cursorLazy === 'map') {
      this.cursor.classList.add('is-map');
    } else {
      this.cursor.classList.remove('is-map');
    }
    return 'show';
  }

  updateDisplayOnMouseMove(evt) {
    const cursorBox = evt.target.closest('[data-cursor-lazy]');

    if (!cursorBox) {
      this.sliderInView = false;
      this.hideCursor();
      return;
    }

    if (this.checkCursorType(cursorBox) === 'hide') {
      return;
    }

    this.cursor.classList.add('is-shown');
    // TODO все что связанно со слайдером вынести в отдельный метод
    this.sliderInView = true;
    const boxRect = cursorBox.getBoundingClientRect();
    this.lastSliderRect = boxRect;

    const isLeft = {
      x: boxRect.width / 2 >= this.mouse.x - boxRect.left,
      // y: boxRect.height
    };

    this.isInView = {
      x: boxRect.left < this.mouse.x && boxRect.width > this.mouse.x - boxRect.left,
      y: boxRect.top < this.mouse.y && this.mouse.y < boxRect.top + boxRect.height,
    };

    console.log('circle btn');

    const sliderWrapper = cursorBox.closest('.swiper-wrapper') || cursorBox.querySelector('.swiper-wrapper');
    if (!sliderWrapper) {
      this.arrowTimeline.reverse();
      return;
    }

    if (isLeft.x) {
      sliderWrapper.dataset.leftClick = true;
      sliderWrapper.removeAttribute('data-right-click');
      this.arrowTimeline.play();
    } else {
      this.arrowTimeline.reverse();
      sliderWrapper.dataset.rightClick = true;
      sliderWrapper.removeAttribute('data-left-click');
    }
  }

  updatePosition() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.ease;
    this.pos.y += (this.mouse.y - this.pos.y) * this.ease;

    gsap.to(this.cursor, {
      duration: this.circleBtnInView ? 0.1 : 0.35,
      ease: 'Power2.inOut',
      x: this.pos.x,
      y: this.pos.y,
    });
  }

  hideCursor() {
    this.cursor.classList.remove('is-shown');
    this.cursor.classList.remove('has-text');
    this.cursor.classList.remove('is-map');
  }

  showCursor() {
    this.cursor.classList.add('is-shown');
  }

  clickCursorAnimation() {
    if (this.clickIsPlaying) {
      return;
    }
    this.handlerMouseMove();
    this.clickIsPlaying = true;
    gsap.to(this.cursor, {scale: 0.85, yoyo: true, repeat: 1, duration: 0.25})
        .then(() => {
          this.clickIsPlaying = false;
        });
  }

  removeListeners() {
    this.cursor.classList.remove('is-initialized');
    gsap.ticker.remove(this.updatePosition);
    document.removeEventListener('mousemove', this.handlerMouseMove);
    window.removeEventListener('click', this.clickCursorAnimation);
    scrollObserver.unsubscribe(() => this.handlerMouseMove());
  }

  setListeners() {
    this.cursor.classList.add('is-initialized');
    gsap.ticker.add(this.updatePosition);
    document.addEventListener('mousemove', this.handlerMouseMove);
    window.addEventListener('click', this.clickCursorAnimation);
    scrollObserver.subscribe(() => this.handlerMouseMove());
  }

  breakpointChecker() {
    if (this.mediaTouchDevice.matches) {
      if (this.cursor.classList.contains('is-initialized')) {
        this.removeListeners();
      }
    } else {
      if (!this.cursor.classList.contains('is-initialized')) {
        this.setListeners();
      }
    }
  }

  init() {
    this.renderCursor();

    this.cursor = this.container.querySelector('.cursor');
    this.cursorContent = this.cursor.querySelector('.cursor__content');
    this.cursorRings = this.cursor.querySelectorAll('.pulse-ring');

    this.breakpointChecker();
    this.mediaTouchDevice.addListener(this.breakpointChecker);
  }
}
