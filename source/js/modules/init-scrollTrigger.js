import {ScrollTrigger} from './../vendor/ScrollTrigger';
import {scroll} from './init-locomotive';
let scrollTrigger;

const initScrollTriggerLs = () => {
  gsap.registerPlugin(ScrollTrigger);

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  scroll.on('scroll', ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the '.smooth-scroll' element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener('refresh', () => scroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();


  window.addEventListener('scrolltrigger.update', () => {
    ScrollTrigger.refresh();
  });

  scrollTrigger = ScrollTrigger;
  window.scrollTrigger = ScrollTrigger;
};

export {initScrollTriggerLs, scrollTrigger};
