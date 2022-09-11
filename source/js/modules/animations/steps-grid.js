import { scrollTrigger } from "../init-scrollTrigger";

export class StepsGrid {
  constructor() {
    this.container = document.querySelector('[data-scroll-section="lazy-grid"]');

    if (!this.container) {
      return;
    }

    this.tl = gsap.timeline({paused: true});

    this.initBoxRotate();
    this.initBoxDown();
  }

  initBoxRotate() {
    // create timeline
    this.tlBoxRotate = gsap.timeline({
      yoyo: true,
      paused: true,
      scrollTrigger: {
        trigger: '.steps__heading',
        scroller: '[data-scroll-container]',
        start: 'bottom 90%',
        end: 'bottom -40%',
        scrub: 1,
      }
    });

    const startBox = document.querySelector('[data-step-box="start"]');
    const rotateBox = document.querySelector('[data-step-box="rotating"]');
    const startBoxRect = startBox.getBoundingClientRect();
    const rotateBoxRect = rotateBox.getBoundingClientRect();

    this.tlBoxRotate.to(rotateBox, {
      rotate: 360,
      width: startBoxRect.width,
      height: startBoxRect.height,
      y: startBoxRect.bottom - rotateBoxRect.bottom - startBoxRect.height,
      x: startBoxRect.left,
      duration: 2,
      ease: "linear"
    });

    this.tlBoxRotate.to(rotateBox, {
      y: `+=${startBoxRect.height}`,
      duration: 0.5,
      ease: "linear"
    });
  }

  initBoxDown() {
    if (this.tlBoxDown) {
      console.error('BoxDown is in use');
      return;
    }
    const downBox = this.container.querySelectorAll('[data-step-box="down"]');
    this.tlBoxDown = [];

    // create timeline
    downBox.forEach((box, i) => {
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
        }
      });

      const nextBoxRect = i === downBox.length - 1
        ? document.querySelector('[data-step-box="down-last"]').getBoundingClientRect()
        : downBox[i + 1].getBoundingClientRect();
      const yOffset = nextBoxRect.bottom - boxRect.bottom;

      tl.to(box, {y: yOffset});

      this.tlBoxDown.push(tl);
    })
  }
}
