// Generated by BUCKLESCRIPT VERSION 4.0.7, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function $great$great$pipe(o, f) {
  if (o !== undefined) {
    return Js_primitive.some(Curry._1(f, Js_primitive.valFromOption(o)));
  }
  
}

function $less$pipe$great(a, b) {
  if (a !== undefined) {
    return Js_primitive.valFromOption(a);
  } else {
    return b;
  }
}

exports.$great$great$pipe = $great$great$pipe;
exports.$less$pipe$great = $less$pipe$great;
/* No side effect */
