// Generated by BUCKLESCRIPT VERSION 4.0.7, PLEASE EDIT WITH CARE

import * as Block from "../../../../node_modules/bs-platform/lib/es6/block.js";
import * as ReActor from "../../src/ReActor.bs.js";

function loop(_env, state) {
  ReActor.$less$neg(state[/* target */0], state[/* message */1]);
  return /* OnAnimationFrame */Block.__(1, [state]);
}

function start(param) {
  return ReActor.spawn(loop, param);
}

export {
  loop ,
  start ,
  
}
/* ReActor Not a pure module */
