// Generated by BUCKLESCRIPT VERSION 4.0.7, PLEASE EDIT WITH CARE

import * as Block from "../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReActor from "../../src/ReActor.bs.js";
import * as Js_primitive from "../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ReActor_Utils from "../../src/ReActor_Utils.bs.js";
import * as Caml_exceptions from "../../../../node_modules/bs-platform/lib/es6/caml_exceptions.js";
import * as ReActor_Process from "../../src/ReActor_Process.bs.js";

var __name = "logger";

var Log = Caml_exceptions.create("E7_TracingMessages.DOMLogger.Log");

function logger_f(env, state) {
  var match = Curry._1(env[/* recv */1], /* () */0);
  if (match !== undefined) {
    var m = Js_primitive.valFromOption(match);
    if (m[0] === Log) {
      ReActor_Utils.DOM[/* withInnerText */1](state[/* node */0], m[1]);
      return /* Become */Block.__(0, [state]);
    } else {
      return /* Become */Block.__(0, [state]);
    }
  } else {
    return /* Become */Block.__(0, [state]);
  }
}

var dom_logger = ReActor.register(__name, ReActor.spawn(logger_f, /* record */[/* node */ReActor_Utils.DOM[/* getElementById */0]("sample")]));

function logInt(s) {
  return [
          Log,
          String(s) + ("ms - " + ReActor_Utils.Random[/* shortId */3](/* () */0))
        ];
}

var DOMLogger = /* module */[
  /* __name */__name,
  /* Log */Log,
  /* logger_f */logger_f,
  /* dom_logger */dom_logger,
  /* logInt */logInt
];

var Diff = Caml_exceptions.create("E7_TracingMessages.Differ.Diff");

function f(env, config) {
  var match = Curry._1(env[/* recv */1], /* () */0);
  if (match !== undefined) {
    var m = Js_primitive.valFromOption(match);
    if (m[0] === Diff) {
      var t = m[1];
      var delta = ReActor_Utils.Performance[/* now */0](/* () */0) - t[/* current_time */1] | 0;
      var pid = ReActor_Process.Pid[/* toString */1](t[/* pid */0]);
      var self = ReActor_Process.Pid[/* toString */1](Curry._1(env[/* self */0], /* () */0));
      console.log("Received message from: " + (String(pid) + (" while running on " + (String(self) + ""))));
      ReActor.send(config[/* send_to */0], Curry._1(config[/* wrap */1], delta));
      return /* Become */Block.__(0, [config]);
    } else {
      return /* Become */Block.__(0, [config]);
    }
  } else {
    return /* Become */Block.__(0, [config]);
  }
}

function start(param) {
  return ReActor.spawn(f, param);
}

var Differ = /* module */[
  /* Diff */Diff,
  /* f */f,
  /* start */start
];

function clock_f(env, config) {
  ReActor.send(config[/* send_to */1], Curry._2(config[/* wrap */2], Curry._1(env[/* self */0], /* () */0), ReActor_Utils.Performance[/* now */0](/* () */0)));
  return /* Suspend */Block.__(2, [
            config[/* delay */0],
            config
          ]);
}

function start$1(param) {
  return ReActor.spawn(clock_f, param);
}

var Clock = /* module */[
  /* clock_f */clock_f,
  /* start */start$1
];

ReActor.trace(/* record */[
      /* matcher */(function (_pid, message) {
          return message[0] === Diff;
        }),
      /* handler */(function (param) {
          if (param[0] === Diff) {
            console.log("Differ got message => " + (String(param[1]) + ""));
            return /* () */0;
          } else {
            return /* () */0;
          }
        }),
      /* timeout */50
    ]);

var match = ReActor.whereIs("logger");

if (match !== undefined) {
  var differ = ReActor.spawn(f, /* record */[
        /* send_to */match,
        /* wrap */logInt
      ]);
  ReActor.spawn(clock_f, /* record */[
        /* delay */0,
        /* send_to */differ,
        /* wrap */(function (pid, x) {
            return [
                    Diff,
                    /* record */[
                      /* pid */pid,
                      /* current_time */x,
                      /* random_id */ReActor_Utils.Random[/* shortId */3](/* () */0)
                    ]
                  ];
          })
      ]);
} else {
  console.log("Failed to start logger.");
}

export {
  DOMLogger ,
  Differ ,
  Clock ,
  
}
/* dom_logger Not a pure module */
