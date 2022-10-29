import { Cursor } from "./cursor";
import { StepsGrid } from "./steps-grid";
import {initMouseSvgParallax} from './mouse-parallax';
import { initWaveEffects } from "./wave-scroll-effects";
import { initSlideGrid } from "./slide-grid";


export const initAnimations = () => {
  new StepsGrid();
  new Cursor();

  initMouseSvgParallax();
  initWaveEffects();
  initSlideGrid();
};




