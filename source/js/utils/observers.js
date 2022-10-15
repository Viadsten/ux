class EventObserver {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  fire(data) {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}

const resizeObserver = new EventObserver();
const resizeObserverProto = new ResizeObserver(() => setTimeout(() => resizeObserver.fire('resize'), 10));
resizeObserverProto.observe(document.documentElement);

export {resizeObserver};

const clickObserver = new EventObserver();
document.addEventListener('click', (e) => clickObserver.fire(e));
// пример использования
// clickObserver.subscribe((data) => {
//   console.log('sub 1:', data);
// });

export {clickObserver};


