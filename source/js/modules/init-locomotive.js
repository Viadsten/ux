import {locoScroll} from './../vendor/LocomotiveScroll';

let scroll;

const initLocoScroll = () => {
  const el = document.querySelector('.wrapper[data-scroll-container]');

  if (!el) {
    return;
  }

  // locoScroll();

  scroll = new window.LocomotiveScroll({
    el,
    smooth: true,
    lerp: 0.06,
    getDirection: true,
    tablet: {
      breakpoint: 1023,    // <---- Fixes The Issue 🎉
    }
  });
  console.log(scroll);

  const ro = new ResizeObserver(() => {
    scroll.update();
  });

  ro.observe(document.documentElement);
};

const updateLocomotiveScroll = () => {
  scroll.update();
};

export {initLocoScroll, updateLocomotiveScroll, scroll};
