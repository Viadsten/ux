export class OpenDoorAnimation {
  constructor() {
    this.container = document.querySelector('[data-scroll-section="open-door"]');
    if (!this.container) {
      return;
    }

    this.svgNode = this.container.querySelector('#svg-door');
    this.doorNode = this.container.querySelector('#path-door');

    this.init();
  }

  init() {
    this.timeline = gsap.timeline({yoyo: true, repeat: -1, repeatDelay: 0.5});

    this.timeline.addLabel('start');
    this.timeline.to(this.doorNode, {rotationY: 360, transformOrigin: "50% 50%", duration: 0.7});
    // this.timeline.to(this.doorNode, {x: 140, duration: 0.7});

  }
}
