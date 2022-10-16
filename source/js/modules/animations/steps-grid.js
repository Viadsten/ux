import {resizeObserver} from '../../utils/observers';
import {scrollTrigger} from '../init-scrollTrigger';

export class StepsGrid {
  constructor() {
    this.container = document.querySelector('[data-scroll-section="lazy-grid"]');

    if (!this.container) {
      return;
    }

    this.startBox = this.container.querySelector('[data-step-box="start"]');
    this.rotateBox = this.container.querySelector('[data-step-box="rotating"]');
    this.downBox = this.container.querySelectorAll('[data-step-box="down"]');

    this.tl = gsap.timeline({paused: true});
    this.tlBoxDown = [];
    this.tlBoxRotate = null;

    resizeObserver.subscribe(() => this.init());
  }

  init() {
    this.initBoxRotate();
    this.initBoxDown();
  }

  initBoxRotate() {
    if (this.tlBoxRotate) {
      console.log('tlBoxRotate reinit');
      this.tlBoxRotate.seek(0).kill();
      gsap.set(this.rotateBox, {clearProps: 'transform'});
      gsap.set(this.rotateBox, {clearProps: 'width'});
      gsap.set(this.rotateBox, {clearProps: 'height'});
      this.tlBoxRotate = null;
    }
    // create timeline
    this.tlBoxRotate = gsap.timeline({
      yoyo: true,
      paused: true,
      scrollTrigger: {
        trigger: '.steps__heading',
        scroller: '[data-scroll-container]',
        start: 'bottom 90%',
        end: 'bottom -40%',
        scrub: true,
      },
    });

    this.startBox = document.querySelector('[data-step-box="start"]');
    this.rotateBox = document.querySelector('[data-step-box="rotating"]');
    const startBoxRect = this.startBox.getBoundingClientRect();
    const rotateBoxRect = this.rotateBox.getBoundingClientRect();

    this.tlBoxRotate.to(this.rotateBox, {
      rotate: 360,
      width: startBoxRect.width,
      height: startBoxRect.height,
      y: startBoxRect.bottom - rotateBoxRect.bottom - startBoxRect.height,
      x: startBoxRect.left,
      duration: 2,
      ease: 'linear',
    });

    this.tlBoxRotate.to(this.rotateBox, {
      y: `+=${startBoxRect.height}`,
      duration: 0.5,
      ease: 'linear',
    });
  }

  initBoxDown() {
    if (this.tlBoxDown.length) {
      console.log('BoxDown reinit');
      this.tlBoxDown.forEach((tl) => {
        tl.seek(0).kill();
        tl = null;
      });
      this.tlBoxDown = [];
      this.downBox.forEach((box) => gsap.set(box, {clearProps: 'transform'}));
    }
    this.tlBoxDown = [];

    // create timeline
    this.downBox.forEach((box, i) => {
      const boxRect = box.getBoundingClientRect();

      const tl = gsap.timeline({
        paused: true,
        yoyo: true,
        scrollTrigger: {
          trigger: box,
          scroller: '[data-scroll-container]',
          start: `bottom ${window.innerHeight / 2}`,
          end: 'bottom 0%',
          scrub: 0,
        },
      });

      const nextBoxRect = i === this.downBox.length - 1
        ? document.querySelector('[data-step-box="down-last"]').getBoundingClientRect()
        : this.downBox[i + 1].getBoundingClientRect();
      const yOffset = nextBoxRect.bottom - boxRect.bottom;

      tl.to(box, {y: yOffset});

      this.tlBoxDown.push(tl);
    });
  }
}
