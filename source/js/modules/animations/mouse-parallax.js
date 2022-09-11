export const initMouseSvgParallax = () => {
  const svg = document.querySelector('[data-mouse-parallax]');

  if (!svg) {
    return;
  }

  const layers = svg.querySelectorAll('path');
  let rect = document.querySelector('body').getBoundingClientRect();
  let mouse = {x: 0, y: 0, moved: false};

  const handleMouseMove = (evt) => {
    mouse.moved = true;
    mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
  };

  function parallaxIt(target, movement, k) {
    let a = [...target].reverse();
    gsap.to(a, {
      x: (mouse.x - rect.width) / rect.width * movement,
      y:( mouse.y - rect.height) / rect.height * movement,
      duration: 0.6,
      ease: 'Power1.inOut',
      stagger: {
        each: 0.1
      }
    });
  }

  gsap.ticker.add(function(){
    if (mouse.moved){
      parallaxIt(layers, -100);
    }
    mouse.moved = false;
  });

  window.addEventListener('mousemove', handleMouseMove)
}
