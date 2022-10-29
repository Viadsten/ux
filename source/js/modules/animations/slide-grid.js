export const initSlideGrid = () => {
  const slideTl = gsap.timeline({
    yoyo: true,
    paused: true,
    scrollTrigger: {
      trigger: '.slide-grid',
      scroller: '[data-scroll-container]',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });

  slideTl.addLabel('start');
  slideTl.to('.slide-grid__item-bg', {
    rotateX: 90,
    duration: 0.5,
    stagger: {
      each: 0.05,
      from: "end",
      grid: "auto",
    }
  }, 'start');
  slideTl.to('.slide-grid__item-bg', {
    opacity: 0,
    delay: 0.5,
    duration: 0,
    stagger: {
      each: 0.05,
      from: "end",
      grid: "auto",
    }
  }, 'start');

  slideTl.to('.slide-grid__text', {
    y: '70%',
    duration: 0.5,
    // opacity: 0,
    ease: 'Power4.out',
    stagger: {
      each: 0.05,
      from: "end",
      grid: "auto",
    }
  }, 'start');

  slideTl.set('.slide-grid', {
    backgroundColor: 'transparent',
    duration: 0,
  });
  slideTl.set('.slide-grid__text', {
    opacity: 0,
    duration: 0,
  });
};
