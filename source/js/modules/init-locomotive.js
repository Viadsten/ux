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
    getDirection: true,
  });

  const ro = new ResizeObserver(() => {
    scroll.update();
  });

  ro.observe(document.documentElement);
};

const updateLocomotiveScroll = () => {
  scroll.update();
};

export {initLocoScroll, updateLocomotiveScroll, scroll};
