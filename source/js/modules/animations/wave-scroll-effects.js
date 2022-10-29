import ScrollTrigger from "../../vendor/ScrollTrigger";

const textWaveEffect = () => {
  const chars = [...document.querySelectorAll(".section__center-title .char")];

  ScrollTrigger.create({
    scroller: '[data-scroll-container]',
    trigger: "[data-splitting='wave']",
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      const velocity = self.getVelocity();
      // добавить тамаут, по которому буквы вернутся в исходное положение
      chars.forEach((char, i) => {
        const charCoefficient = (i + 1) - (chars.length / 2);
        gsap.to(char, {
          y: ((velocity / 200) * (charCoefficient)),
          duration: 0.6,
          ease: 'Power2.out'
        });
      });
    }
  });
}

const bgWaveEffect = () => {
  ScrollTrigger.create({
    scroller: '[data-scroll-container]',
    trigger: "[data-section-bg]",
    start: "top bottom",
    end: "bottom top",
    onUpdate: self => {
      const velocity = self.getVelocity();
      gsap.to('.section__bg', {
        rotate: (velocity / 600),
        duration: 0.2,
        ease: 'Power2.out'
      });
    }
  });
};

export const initWaveEffects = () => {
  bgWaveEffect();
  textWaveEffect();
};
