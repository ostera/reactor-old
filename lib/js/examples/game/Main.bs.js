// Generated by BUCKLESCRIPT VERSION 4.0.7, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Option = require("./Option.bs.js");
var ReActor = require("../../src/ReActor.bs.js");
var Game_FFI = require("./Game_FFI.bs.js");
var EventHandler = require("./EventHandler.bs.js");
var Game_Renderer = require("./Game_Renderer.bs.js");
var ReActor_Utils = require("../../src/ReActor_Utils.bs.js");
var Game_DebugInfo = require("./Game_DebugInfo.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var Move = Caml_exceptions.create("Main.Cursor.Move");

var Click = Caml_exceptions.create("Main.Cursor.Click");

function handleMessage(state, message) {
  if (message[0] === Move) {
    return /* record */[
            /* shouldDraw */false,
            /* x */message[1],
            /* y */message[2],
            /* status : Normal */1
          ];
  } else if (message[0] === Click) {
    return /* record */[
            /* shouldDraw */true,
            /* x */message[1],
            /* y */message[2],
            /* status : Click */0
          ];
  } else {
    return state;
  }
}

function drawCmd(x, y) {
  return [
          Game_Renderer.Pipeline,
          /* :: */[
            /* DrawCircle */Block.__(1, [
                /* Point2D */[
                  x,
                  y
                ],
                10,
                /* RGBA */Block.__(2, [
                    255,
                    255,
                    255,
                    0.7
                  ])
              ]),
            /* [] */0
          ]
        ];
}

function render(param) {
  var y = param[/* y */2];
  var x = param[/* x */1];
  Option.$great$great$pipe(ReActor.whereIs(Game_Renderer.name), (function (p) {
          return ReActor.$less$neg(p, drawCmd(x, y));
        }));
  return /* () */0;
}

function loop(env, state) {
  var state$prime = Option.$less$pipe$great(Option.$great$great$pipe(Curry._1(env[/* recv */1], /* () */0), (function (param) {
              return handleMessage(state, param);
            })), state);
  var match = state$prime[/* status */3];
  var match$1 = state$prime[/* shouldDraw */0];
  if (!match) {
    if (match$1) {
      render(state$prime);
    }
    
  }
  return /* Become */Block.__(0, [/* record */[
              /* shouldDraw */false,
              /* x */state$prime[/* x */1],
              /* y */state$prime[/* y */2],
              /* status */state$prime[/* status */3]
            ]]);
}

function start(param) {
  return ReActor.spawn(loop, /* record */[
              /* shouldDraw */false,
              /* x */0,
              /* y */0,
              /* status : Normal */1
            ]);
}

var Cursor = /* module */[
  /* Move */Move,
  /* Click */Click,
  /* handleMessage */handleMessage,
  /* drawCmd */drawCmd,
  /* render */render,
  /* loop */loop,
  /* start */start
];

function repaint(surface, color) {
  Option.$great$great$pipe(ReActor.whereIs(Game_Renderer.name), (function (pid) {
          return ReActor.send(pid, [
                      Game_Renderer.Pipeline,
                      /* :: */[
                        /* DrawRect */Block.__(3, [
                            surface,
                            color
                          ]),
                        /* [] */0
                      ]
                    ]);
        }));
  return /* () */0;
}

var events = /* :: */[
  /* Click */3,
  /* :: */[
    /* MouseMove */4,
    /* :: */[
      /* KeyDown */1,
      /* :: */[
        /* Resize */2,
        /* [] */0
      ]
    ]
  ]
];

function registerEvents(self) {
  Option.$great$great$pipe(ReActor.whereIs(EventHandler.name), (function (pid) {
          return List.iter((function (param) {
                        return ReActor.send(pid, param);
                      }), List.map((function (e) {
                            return [
                                    EventHandler.Subscribe,
                                    e,
                                    self
                                  ];
                          }), events));
        }));
  return /* () */0;
}

function setup(env, state) {
  repaint(state[/* surface */3], state[/* color */2]);
  registerEvents(Curry._1(env[/* self */0], /* () */0));
  return /* Become */Block.__(0, [/* record */[
              /* status : Started */1,
              /* cursor */state[/* cursor */1],
              /* color */state[/* color */2],
              /* surface */state[/* surface */3]
            ]]);
}

function handleEvent(state, $$event) {
  Game_DebugInfo.report($$event);
  if (typeof $$event === "number") {
    return /* Become */Block.__(0, [state]);
  } else {
    switch ($$event.tag | 0) {
      case 0 : 
          return /* Become */Block.__(0, [state]);
      case 1 : 
          ReActor.send(state[/* cursor */1], [
                Click,
                $$event[0],
                $$event[1]
              ]);
          return /* Become */Block.__(0, [state]);
      case 2 : 
          ReActor.send(state[/* cursor */1], [
                Move,
                $$event[0],
                $$event[1]
              ]);
          return /* Become */Block.__(0, [state]);
      case 3 : 
          var state$prime_000 = /* status */state[/* status */0];
          var state$prime_001 = /* cursor */state[/* cursor */1];
          var state$prime_002 = /* color */state[/* color */2];
          var state$prime_003 = /* surface : Rect */[
            0,
            0,
            $$event[0],
            $$event[1]
          ];
          var state$prime = /* record */[
            state$prime_000,
            state$prime_001,
            state$prime_002,
            state$prime_003
          ];
          repaint(state$prime_003, state$prime_002);
          return /* Become */Block.__(0, [state$prime]);
      
    }
  }
}

function handleMessage$1(state, param) {
  if (param[0] === EventHandler.Event) {
    return handleEvent(state, param[1]);
  } else {
    return /* Become */Block.__(0, [state]);
  }
}

function loop$1(env, state) {
  var match = state[/* status */0];
  if (match) {
    return Option.$less$pipe$great(Option.$great$great$pipe(Curry._1(env[/* recv */1], /* () */0), (function (param) {
                      return handleMessage$1(state, param);
                    })), /* Become */Block.__(0, [state]));
  } else {
    return setup(env, state);
  }
}

function start$1(param) {
  return ReActor.spawn(loop$1, /* record */[
              /* status : ShouldSetup */0,
              /* cursor */start(/* () */0),
              /* color : Hex */Block.__(0, [3556687]),
              /* surface : Rect */[
                0,
                0,
                Game_FFI.Viewport[/* width */0](/* () */0),
                Game_FFI.Viewport[/* height */1](/* () */0)
              ]
            ]);
}

var Scene = /* module */[
  /* repaint */repaint,
  /* events */events,
  /* registerEvents */registerEvents,
  /* setup */setup,
  /* handleEvent */handleEvent,
  /* handleMessage */handleMessage$1,
  /* loop */loop$1,
  /* start */start$1
];

function start$2(param) {
  Game_DebugInfo.start(/* () */0);
  EventHandler.start(/* () */0);
  Game_Renderer.start("game");
  start$1(/* () */0);
  return /* () */0;
}

var Game = /* module */[/* start */start$2];

ReActor.trace(/* record */[
      /* matcher */(function (_pid, _message) {
          return true;
        }),
      /* handler */(function (e) {
          console.log(ReActor_Utils.$$Date[/* now */0](/* () */0), e);
          return /* () */0;
        }),
      /* timeout */705032704
    ]);

start$2(/* () */0);

exports.Cursor = Cursor;
exports.Scene = Scene;
exports.Game = Game;
/*  Not a pure module */
