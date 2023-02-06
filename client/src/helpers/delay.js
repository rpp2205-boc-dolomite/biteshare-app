export default function(fn, ms) {
  const func = fn;
  const wait = ms;
  let waiting, timerId;

  return (...params) => {
    if (waiting) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(null, params);
      waiting = false;
    }, wait);
    waiting = true;
  };
};