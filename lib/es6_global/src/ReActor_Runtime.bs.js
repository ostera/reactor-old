// Generated by BUCKLESCRIPT VERSION 4.0.7, PLEASE EDIT WITH CARE


function nextTick(prim) {
  setImmediate(prim);
  return /* () */0;
}

function defer(prim, prim$1) {
  setTimeout(prim, prim$1);
  return /* () */0;
}

function onIdle(prim) {
  requestIdleCallback(prim);
  return /* () */0;
}

function onAnimationFrame(prim) {
  requestAnimationFrame(prim);
  return /* () */0;
}

var hardwareConcurrency = self.navigator.hardwareConcurrency;

export {
  nextTick ,
  defer ,
  onIdle ,
  onAnimationFrame ,
  hardwareConcurrency ,
  
}
/* hardwareConcurrency Not a pure module */
