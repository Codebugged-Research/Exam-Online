(function () {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    "use strict";
    var t;
    function aa(a) {
        var b = 0;
        return function () {
            return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        };
    }
    var ba =
        "function" == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, b, c) {
                  if (a == Array.prototype || a == Object.prototype) return a;
                  a[b] = c.value;
                  return a;
              };
    function ca(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c;
        }
        throw Error("Cannot find global object");
    }
    var C = ca(this);
    function I(a, b) {
        if (b)
            a: {
                var c = C;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c)) break a;
                    c = c[e];
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ba(c, a, { configurable: !0, writable: !0, value: b });
            }
    }
    I("Symbol", function (a) {
        function b(g) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (g || "") + "_" + e++, g);
        }
        function c(g, f) {
            this.g = g;
            ba(this, "description", { configurable: !0, writable: !0, value: f });
        }
        if (a) return a;
        c.prototype.toString = function () {
            return this.g;
        };
        var d = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
            e = 0;
        return b;
    });
    I("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = C[b[c]];
            "function" === typeof d &&
                "function" != typeof d.prototype[a] &&
                ba(d.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return da(aa(this));
                    },
                });
        }
        return a;
    });
    function da(a) {
        a = { next: a };
        a[Symbol.iterator] = function () {
            return this;
        };
        return a;
    }
    function J(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : { next: aa(a) };
    }
    function L(a) {
        if (!(a instanceof Array)) {
            a = J(a);
            for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
            a = c;
        }
        return a;
    }
    var ea =
            "function" == typeof Object.create
                ? Object.create
                : function (a) {
                      function b() {}
                      b.prototype = a;
                      return new b();
                  },
        fa;
    if ("function" == typeof Object.setPrototypeOf) fa = Object.setPrototypeOf;
    else {
        var ha;
        a: {
            var ia = { a: !0 },
                ja = {};
            try {
                ja.__proto__ = ia;
                ha = ja.a;
                break a;
            } catch (a) {}
            ha = !1;
        }
        fa = ha
            ? function (a, b) {
                  a.__proto__ = b;
                  if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
                  return a;
              }
            : null;
    }
    var ka = fa;
    function M(a, b) {
        a.prototype = ea(b.prototype);
        a.prototype.constructor = a;
        if (ka) ka(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d);
                    } else a[c] = b[c];
        a.ca = b.prototype;
    }
    function ma() {
        this.l = !1;
        this.i = null;
        this.h = void 0;
        this.g = 1;
        this.s = this.m = 0;
        this.j = null;
    }
    function na(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0;
    }
    ma.prototype.o = function (a) {
        this.h = a;
    };
    function oa(a, b) {
        a.j = { S: b, T: !0 };
        a.g = a.m || a.s;
    }
    ma.prototype.return = function (a) {
        this.j = { return: a };
        this.g = this.s;
    };
    function N(a, b, c) {
        a.g = c;
        return { value: b };
    }
    function pa(a) {
        this.g = new ma();
        this.h = a;
    }
    function qa(a, b) {
        na(a.g);
        var c = a.g.i;
        if (c)
            return ra(
                a,
                "return" in c
                    ? c["return"]
                    : function (d) {
                          return { value: d, done: !0 };
                      },
                b,
                a.g.return
            );
        a.g.return(b);
        return sa(a);
    }
    function ra(a, b, c, d) {
        try {
            var e = b.call(a.g.i, c);
            if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");
            if (!e.done) return (a.g.l = !1), e;
            var g = e.value;
        } catch (f) {
            return (a.g.i = null), oa(a.g, f), sa(a);
        }
        a.g.i = null;
        d.call(a.g, g);
        return sa(a);
    }
    function sa(a) {
        for (; a.g.g; )
            try {
                var b = a.h(a.g);
                if (b) return (a.g.l = !1), { value: b.value, done: !1 };
            } catch (c) {
                (a.g.h = void 0), oa(a.g, c);
            }
        a.g.l = !1;
        if (a.g.j) {
            b = a.g.j;
            a.g.j = null;
            if (b.T) throw b.S;
            return { value: b.return, done: !0 };
        }
        return { value: void 0, done: !0 };
    }
    function ta(a) {
        this.next = function (b) {
            na(a.g);
            a.g.i ? (b = ra(a, a.g.i.next, b, a.g.o)) : (a.g.o(b), (b = sa(a)));
            return b;
        };
        this.throw = function (b) {
            na(a.g);
            a.g.i ? (b = ra(a, a.g.i["throw"], b, a.g.o)) : (oa(a.g, b), (b = sa(a)));
            return b;
        };
        this.return = function (b) {
            return qa(a, b);
        };
        this[Symbol.iterator] = function () {
            return this;
        };
    }
    function O(a, b) {
        b = new ta(new pa(b));
        ka && a.prototype && ka(b, a.prototype);
        return b;
    }
    function ua(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            e = {
                next: function () {
                    if (!d && c < a.length) {
                        var g = c++;
                        return { value: b(g, a[g]), done: !1 };
                    }
                    d = !0;
                    return { done: !0, value: void 0 };
                },
            };
        e[Symbol.iterator] = function () {
            return e;
        };
        return e;
    }
    var va =
        "function" == typeof Object.assign
            ? Object.assign
            : function (a, b) {
                  for (var c = 1; c < arguments.length; c++) {
                      var d = arguments[c];
                      if (d) for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
                  }
                  return a;
              };
    I("Object.assign", function (a) {
        return a || va;
    });
    I("Promise", function (a) {
        function b(f) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var h = this.j();
            try {
                f(h.resolve, h.reject);
            } catch (k) {
                h.reject(k);
            }
        }
        function c() {
            this.g = null;
        }
        function d(f) {
            return f instanceof b
                ? f
                : new b(function (h) {
                      h(f);
                  });
        }
        if (a) return a;
        c.prototype.h = function (f) {
            if (null == this.g) {
                this.g = [];
                var h = this;
                this.i(function () {
                    h.l();
                });
            }
            this.g.push(f);
        };
        var e = C.setTimeout;
        c.prototype.i = function (f) {
            e(f, 0);
        };
        c.prototype.l = function () {
            for (; this.g && this.g.length; ) {
                var f = this.g;
                this.g = [];
                for (var h = 0; h < f.length; ++h) {
                    var k = f[h];
                    f[h] = null;
                    try {
                        k();
                    } catch (l) {
                        this.j(l);
                    }
                }
            }
            this.g = null;
        };
        c.prototype.j = function (f) {
            this.i(function () {
                throw f;
            });
        };
        b.prototype.j = function () {
            function f(l) {
                return function (r) {
                    k || ((k = !0), l.call(h, r));
                };
            }
            var h = this,
                k = !1;
            return { resolve: f(this.B), reject: f(this.l) };
        };
        b.prototype.B = function (f) {
            if (f === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (f instanceof b) this.D(f);
            else {
                a: switch (typeof f) {
                    case "object":
                        var h = null != f;
                        break a;
                    case "function":
                        h = !0;
                        break a;
                    default:
                        h = !1;
                }
                h ? this.v(f) : this.m(f);
            }
        };
        b.prototype.v = function (f) {
            var h = void 0;
            try {
                h = f.then;
            } catch (k) {
                this.l(k);
                return;
            }
            "function" == typeof h ? this.F(h, f) : this.m(f);
        };
        b.prototype.l = function (f) {
            this.s(2, f);
        };
        b.prototype.m = function (f) {
            this.s(1, f);
        };
        b.prototype.s = function (f, h) {
            if (0 != this.h) throw Error("Cannot settle(" + f + ", " + h + "): Promise already settled in state" + this.h);
            this.h = f;
            this.i = h;
            2 === this.h && this.C();
            this.u();
        };
        b.prototype.C = function () {
            var f = this;
            e(function () {
                if (f.A()) {
                    var h = C.console;
                    "undefined" !== typeof h && h.error(f.i);
                }
            }, 1);
        };
        b.prototype.A = function () {
            if (this.o) return !1;
            var f = C.CustomEvent,
                h = C.Event,
                k = C.dispatchEvent;
            if ("undefined" === typeof k) return !0;
            "function" === typeof f
                ? (f = new f("unhandledrejection", { cancelable: !0 }))
                : "function" === typeof h
                ? (f = new h("unhandledrejection", { cancelable: !0 }))
                : ((f = C.document.createEvent("CustomEvent")), f.initCustomEvent("unhandledrejection", !1, !0, f));
            f.promise = this;
            f.reason = this.i;
            return k(f);
        };
        b.prototype.u = function () {
            if (null != this.g) {
                for (var f = 0; f < this.g.length; ++f) g.h(this.g[f]);
                this.g = null;
            }
        };
        var g = new c();
        b.prototype.D = function (f) {
            var h = this.j();
            f.I(h.resolve, h.reject);
        };
        b.prototype.F = function (f, h) {
            var k = this.j();
            try {
                f.call(h, k.resolve, k.reject);
            } catch (l) {
                k.reject(l);
            }
        };
        b.prototype.then = function (f, h) {
            function k(x, v) {
                return "function" == typeof x
                    ? function (A) {
                          try {
                              l(x(A));
                          } catch (n) {
                              r(n);
                          }
                      }
                    : v;
            }
            var l,
                r,
                w = new b(function (x, v) {
                    l = x;
                    r = v;
                });
            this.I(k(f, l), k(h, r));
            return w;
        };
        b.prototype.catch = function (f) {
            return this.then(void 0, f);
        };
        b.prototype.I = function (f, h) {
            function k() {
                switch (l.h) {
                    case 1:
                        f(l.i);
                        break;
                    case 2:
                        h(l.i);
                        break;
                    default:
                        throw Error("Unexpected state: " + l.h);
                }
            }
            var l = this;
            null == this.g ? g.h(k) : this.g.push(k);
            this.o = !0;
        };
        b.resolve = d;
        b.reject = function (f) {
            return new b(function (h, k) {
                k(f);
            });
        };
        b.race = function (f) {
            return new b(function (h, k) {
                for (var l = J(f), r = l.next(); !r.done; r = l.next()) d(r.value).I(h, k);
            });
        };
        b.all = function (f) {
            var h = J(f),
                k = h.next();
            return k.done
                ? d([])
                : new b(function (l, r) {
                      function w(A) {
                          return function (n) {
                              x[A] = n;
                              v--;
                              0 == v && l(x);
                          };
                      }
                      var x = [],
                          v = 0;
                      do x.push(void 0), v++, d(k.value).I(w(x.length - 1), r), (k = h.next());
                      while (!k.done);
                  });
        };
        return b;
    });
    I("Object.is", function (a) {
        return a
            ? a
            : function (b, c) {
                  return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
              };
    });
    I("Array.prototype.includes", function (a) {
        return a
            ? a
            : function (b, c) {
                  var d = this;
                  d instanceof String && (d = String(d));
                  var e = d.length;
                  c = c || 0;
                  for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                      var g = d[c];
                      if (g === b || Object.is(g, b)) return !0;
                  }
                  return !1;
              };
    });
    I("String.prototype.includes", function (a) {
        return a
            ? a
            : function (b, c) {
                  if (null == this) throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
                  if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
                  return -1 !== this.indexOf(b, c || 0);
              };
    });
    I("Array.prototype.keys", function (a) {
        return a
            ? a
            : function () {
                  return ua(this, function (b) {
                      return b;
                  });
              };
    });
    var wa = this || self;
    function P(a, b) {
        a = a.split(".");
        var c = wa;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); ) a.length || void 0 === b ? (c[d] && c[d] !== Object.prototype[d] ? (c = c[d]) : (c = c[d] = {})) : (c[d] = b);
    }
    function xa(a, b) {
        b = String.fromCharCode.apply(null, b);
        return null == a ? b : a + b;
    }
    var ya,
        za = "undefined" !== typeof TextDecoder,
        Aa,
        Ba = "undefined" !== typeof TextEncoder;
    function Ca(a) {
        if (Ba) a = (Aa || (Aa = new TextEncoder())).encode(a);
        else {
            var b = void 0;
            b = void 0 === b ? !1 : b;
            for (var c = 0, d = new Uint8Array(3 * a.length), e = 0; e < a.length; e++) {
                var g = a.charCodeAt(e);
                if (128 > g) d[c++] = g;
                else {
                    if (2048 > g) d[c++] = (g >> 6) | 192;
                    else {
                        if (55296 <= g && 57343 >= g) {
                            if (56319 >= g && e < a.length) {
                                var f = a.charCodeAt(++e);
                                if (56320 <= f && 57343 >= f) {
                                    g = 1024 * (g - 55296) + f - 56320 + 65536;
                                    d[c++] = (g >> 18) | 240;
                                    d[c++] = ((g >> 12) & 63) | 128;
                                    d[c++] = ((g >> 6) & 63) | 128;
                                    d[c++] = (g & 63) | 128;
                                    continue;
                                } else e--;
                            }
                            if (b) throw Error("Found an unpaired surrogate");
                            g = 65533;
                        }
                        d[c++] = (g >> 12) | 224;
                        d[c++] = ((g >> 6) & 63) | 128;
                    }
                    d[c++] = (g & 63) | 128;
                }
            }
            a = d.subarray(0, c);
        }
        return a;
    }
    var Da = "function" === typeof Uint8Array.prototype.slice,
        Q = 0,
        R = 0;
    function Ea(a) {
        this.h = null;
        this.g = this.j = this.l = 0;
        this.m = !1;
        a && Fa(this, a);
    }
    function Fa(a, b) {
        b =
            b.constructor === Uint8Array
                ? b
                : b.constructor === ArrayBuffer
                ? new Uint8Array(b)
                : b.constructor === Array
                ? new Uint8Array(b)
                : b.constructor === String
                ? Ga(b)
                : b instanceof Uint8Array
                ? new Uint8Array(b.buffer, b.byteOffset, b.byteLength)
                : new Uint8Array(0);
        a.h = b;
        a.l = 0;
        a.j = a.h.length;
        a.g = a.l;
    }
    Ea.prototype.reset = function () {
        this.g = this.l;
    };
    function Ha(a) {
        for (var b = 128, c = 0, d = 0, e = 0; 4 > e && 128 <= b; e++) (b = a.h[a.g++]), (c |= (b & 127) << (7 * e));
        128 <= b && ((b = a.h[a.g++]), (c |= (b & 127) << 28), (d |= (b & 127) >> 4));
        if (128 <= b) for (e = 0; 5 > e && 128 <= b; e++) (b = a.h[a.g++]), (d |= (b & 127) << (7 * e + 3));
        if (128 > b) {
            a = c >>> 0;
            b = d >>> 0;
            if ((d = b & 2147483648)) (a = (~a + 1) >>> 0), (b = ~b >>> 0), 0 == a && (b = (b + 1) >>> 0);
            a = 4294967296 * b + (a >>> 0);
            return d ? -a : a;
        }
        a.m = !0;
    }
    Ea.prototype.i = function () {
        var a = this.h,
            b = a[this.g],
            c = b & 127;
        if (128 > b) return (this.g += 1), c;
        b = a[this.g + 1];
        c |= (b & 127) << 7;
        if (128 > b) return (this.g += 2), c;
        b = a[this.g + 2];
        c |= (b & 127) << 14;
        if (128 > b) return (this.g += 3), c;
        b = a[this.g + 3];
        c |= (b & 127) << 21;
        if (128 > b) return (this.g += 4), c;
        b = a[this.g + 4];
        c |= (b & 15) << 28;
        if (128 > b) return (this.g += 5), c >>> 0;
        this.g += 5;
        128 <= a[this.g++] && 128 <= a[this.g++] && 128 <= a[this.g++] && 128 <= a[this.g++] && this.g++;
        return c;
    };
    Ea.prototype.o = function () {
        var a = this.h[this.g],
            b = this.h[this.g + 1];
        var c = this.h[this.g + 2];
        var d = this.h[this.g + 3];
        this.g += 4;
        c = ((a << 0) | (b << 8) | (c << 16) | (d << 24)) >>> 0;
        a = 2 * (c >> 31) + 1;
        b = (c >>> 23) & 255;
        c &= 8388607;
        return 255 == b ? (c ? NaN : Infinity * a) : 0 == b ? a * Math.pow(2, -149) * c : a * Math.pow(2, b - 150) * (c + Math.pow(2, 23));
    };
    var Ia = [];
    function Ja() {
        this.g = new Uint8Array(64);
        this.h = 0;
    }
    Ja.prototype.push = function (a) {
        if (!(this.h + 1 < this.g.length)) {
            var b = this.g;
            this.g = new Uint8Array(Math.ceil(1 + 2 * this.g.length));
            this.g.set(b);
        }
        this.g[this.h++] = a;
    };
    Ja.prototype.length = function () {
        return this.h;
    };
    Ja.prototype.end = function () {
        var a = this.g,
            b = this.h;
        this.h = 0;
        return Da ? a.slice(0, b) : new Uint8Array(a.subarray(0, b));
    };
    function Ka(a, b) {
        for (; 127 < b; ) a.push((b & 127) | 128), (b >>>= 7);
        a.push(b);
    }
    function La(a) {
        if (Ia.length) {
            var b = Ia.pop();
            a && Fa(b, a);
            a = b;
        } else a = new Ea(a);
        this.g = a;
        this.h = this.i = this.l = -1;
        this.j = !1;
    }
    La.prototype.reset = function () {
        this.g.reset();
        this.h = this.l = -1;
    };
    function S(a) {
        var b = a.g;
        (b = b.g == b.j) || (b = a.j) || ((b = a.g), (b = b.m || 0 > b.g || b.g > b.j));
        if (b) return !1;
        b = a.g.i();
        var c = b & 7;
        if (0 != c && 5 != c && 1 != c && 2 != c && 3 != c && 4 != c) return (a.j = !0), !1;
        a.i = b;
        a.l = b >>> 3;
        a.h = c;
        return !0;
    }
    function Ma(a) {
        switch (a.h) {
            case 0:
                if (0 != a.h) Ma(a);
                else {
                    for (a = a.g; a.h[a.g] & 128; ) a.g++;
                    a.g++;
                }
                break;
            case 1:
                1 != a.h ? Ma(a) : ((a = a.g), (a.g += 8));
                break;
            case 2:
                if (2 != a.h) Ma(a);
                else {
                    var b = a.g.i();
                    a = a.g;
                    a.g += b;
                }
                break;
            case 5:
                5 != a.h ? Ma(a) : ((a = a.g), (a.g += 4));
                break;
            case 3:
                b = a.l;
                do {
                    if (!S(a)) {
                        a.j = !0;
                        break;
                    }
                    if (4 == a.h) {
                        a.l != b && (a.j = !0);
                        break;
                    }
                    Ma(a);
                } while (1);
                break;
            default:
                a.j = !0;
        }
    }
    function Na(a, b, c) {
        var d = a.g.j,
            e = a.g.i();
        e = a.g.g + e;
        a.g.j = e;
        c(b, a);
        a.g.g = e;
        a.g.j = d;
    }
    function T(a) {
        return a.g.o();
    }
    function Oa(a) {
        var b = a.g.i();
        a = a.g;
        var c = a.g;
        a.g += b;
        a = a.h;
        var d;
        if (za) (d = ya) || (d = ya = new TextDecoder("utf-8", { fatal: !1 })), (d = d.decode(a.subarray(c, c + b)));
        else {
            b = c + b;
            for (var e = [], g = null, f, h, k; c < b; )
                (f = a[c++]),
                    128 > f
                        ? e.push(f)
                        : 224 > f
                        ? c >= b
                            ? e.push(65533)
                            : ((h = a[c++]), 194 > f || 128 !== (h & 192) ? (c--, e.push(65533)) : e.push(((f & 31) << 6) | (h & 63)))
                        : 240 > f
                        ? c >= b - 1
                            ? e.push(65533)
                            : ((h = a[c++]), 128 !== (h & 192) || (224 === f && 160 > h) || (237 === f && 160 <= h) || 128 !== ((d = a[c++]) & 192) ? (c--, e.push(65533)) : e.push(((f & 15) << 12) | ((h & 63) << 6) | (d & 63)))
                        : 244 >= f
                        ? c >= b - 2
                            ? e.push(65533)
                            : ((h = a[c++]),
                              128 !== (h & 192) || 0 !== ((f << 28) + (h - 144)) >> 30 || 128 !== ((d = a[c++]) & 192) || 128 !== ((k = a[c++]) & 192)
                                  ? (c--, e.push(65533))
                                  : ((f = ((f & 7) << 18) | ((h & 63) << 12) | ((d & 63) << 6) | (k & 63)), (f -= 65536), e.push(((f >> 10) & 1023) + 55296, (f & 1023) + 56320)))
                        : e.push(65533),
                    8192 <= e.length && ((g = xa(g, e)), (e.length = 0));
            d = xa(g, e);
        }
        return d;
    }
    function Pa(a, b) {
        var c = a.g.i();
        c = a.g.g + c;
        for (var d = []; a.g.g < c; ) d.push(b.call(a.g));
        return d;
    }
    function Qa(a) {
        return 2 == a.h ? Pa(a, Ea.prototype.o) : [T(a)];
    }
    var Ra = {},
        Sa = null;
    function Ga(a) {
        var b = a.length,
            c = (3 * b) / 4;
        c % 3 ? (c = Math.floor(c)) : -1 != "=.".indexOf(a[b - 1]) && (c = -1 != "=.".indexOf(a[b - 2]) ? c - 2 : c - 1);
        var d = new Uint8Array(c),
            e = 0;
        Ta(a, function (g) {
            d[e++] = g;
        });
        return d.subarray(0, e);
    }
    function Ta(a, b) {
        function c(k) {
            for (; d < a.length; ) {
                var l = a.charAt(d++),
                    r = Sa[l];
                if (null != r) return r;
                if (!/^[\s\xa0]*$/.test(l)) throw Error("Unknown base64 encoding at char: " + l);
            }
            return k;
        }
        Ua();
        for (var d = 0; ; ) {
            var e = c(-1),
                g = c(0),
                f = c(64),
                h = c(64);
            if (64 === h && -1 === e) break;
            b((e << 2) | (g >> 4));
            64 != f && (b(((g << 4) & 240) | (f >> 2)), 64 != h && b(((f << 6) & 192) | h));
        }
    }
    function Ua() {
        if (!Sa) {
            Sa = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                Ra[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var g = d[e];
                    void 0 === Sa[g] && (Sa[g] = e);
                }
            }
        }
    }
    function Va() {
        this.h = [];
        this.i = 0;
        this.g = new Ja();
    }
    function Wa(a) {
        var b = a.i + a.g.length();
        if (0 === b) return new Uint8Array(0);
        b = new Uint8Array(b);
        for (var c = a.h, d = c.length, e = 0, g = 0; g < d; g++) {
            var f = c[g];
            0 !== f.length && (b.set(f, e), (e += f.length));
        }
        c = a.g;
        d = c.h;
        0 !== d && (b.set(c.g.subarray(0, d), e), (c.h = 0));
        a.h = [b];
        return b;
    }
    function U(a, b, c) {
        if (null != c) {
            Ka(a.g, 8 * b + 5);
            a = a.g;
            var d = c;
            d = (c = 0 > d ? 1 : 0) ? -d : d;
            0 === d
                ? 0 < 1 / d
                    ? (Q = R = 0)
                    : ((R = 0), (Q = 2147483648))
                : isNaN(d)
                ? ((R = 0), (Q = 2147483647))
                : 3.4028234663852886e38 < d
                ? ((R = 0), (Q = ((c << 31) | 2139095040) >>> 0))
                : 1.1754943508222875e-38 > d
                ? ((d = Math.round(d / Math.pow(2, -149))), (R = 0), (Q = ((c << 31) | d) >>> 0))
                : ((b = Math.floor(Math.log(d) / Math.LN2)), (d *= Math.pow(2, -b)), (d = Math.round(8388608 * d) & 8388607), (R = 0), (Q = ((c << 31) | ((b + 127) << 23) | d) >>> 0));
            c = Q;
            a.push((c >>> 0) & 255);
            a.push((c >>> 8) & 255);
            a.push((c >>> 16) & 255);
            a.push((c >>> 24) & 255);
        }
    }
    function Xa(a, b, c) {
        Ka(a.g, 8 * b + 2);
        Ka(a.g, c.length);
        b = a.g.end();
        a.h.push(b);
        a.h.push(c);
        a.i += b.length + c.length;
    }
    var Ya = "function" === typeof Uint8Array;
    function Za(a, b, c) {
        return "object" === typeof a ? (Ya && !Array.isArray(a) && a instanceof Uint8Array ? c(a) : $a(a, b, c)) : b(a);
    }
    function $a(a, b, c) {
        if (Array.isArray(a)) {
            for (var d = Array(a.length), e = 0; e < a.length; e++) {
                var g = a[e];
                null != g && (d[e] = Za(g, b, c));
            }
            Array.isArray(a) && a.U && ab(d);
            return d;
        }
        d = {};
        for (e in a) (g = a[e]), null != g && (d[e] = Za(g, b, c));
        return d;
    }
    function bb(a) {
        return $a(
            a,
            function (b) {
                return "number" === typeof b ? (isFinite(b) ? b : String(b)) : b;
            },
            function (b) {
                var c;
                void 0 === c && (c = 0);
                Ua();
                c = Ra[c];
                for (var d = Array(Math.floor(b.length / 3)), e = c[64] || "", g = 0, f = 0; g < b.length - 2; g += 3) {
                    var h = b[g],
                        k = b[g + 1],
                        l = b[g + 2],
                        r = c[h >> 2];
                    h = c[((h & 3) << 4) | (k >> 4)];
                    k = c[((k & 15) << 2) | (l >> 6)];
                    l = c[l & 63];
                    d[f++] = r + h + k + l;
                }
                r = 0;
                l = e;
                switch (b.length - g) {
                    case 2:
                        (r = b[g + 1]), (l = c[(r & 15) << 2] || e);
                    case 1:
                        (b = b[g]), (d[f] = c[b >> 2] + c[((b & 3) << 4) | (r >> 4)] + l + e);
                }
                return d.join("");
            }
        );
    }
    var cb = { U: { value: !0, configurable: !0 } };
    function ab(a) {
        Array.isArray(a) && !Object.isFrozen(a) && Object.defineProperties(a, cb);
        return a;
    }
    var db;
    function V(a, b, c, d) {
        var e = db;
        db = null;
        a || (a = e);
        e = this.constructor.aa;
        a || (a = e ? [e] : []);
        this.j = e ? 0 : -1;
        this.m = this.g = null;
        this.h = a;
        a: {
            e = this.h.length;
            a = e - 1;
            if (e && ((e = this.h[a]), !(null === e || "object" != typeof e || Array.isArray(e) || (Ya && e instanceof Uint8Array)))) {
                this.l = a - this.j;
                this.i = e;
                break a;
            }
            void 0 !== b && -1 < b ? ((this.l = Math.max(b, a + 1 - this.j)), (this.i = null)) : (this.l = Number.MAX_VALUE);
        }
        if (c) for (b = 0; b < c.length; b++) (a = c[b]), a < this.l ? ((a += this.j), (e = this.h[a]) ? ab(e) : (this.h[a] = eb)) : (fb(this), (e = this.i[a]) ? ab(e) : (this.i[a] = eb));
        if (d && d.length)
            for (c = 0; c < d.length; c++) {
                a = b = void 0;
                e = d[c];
                for (var g = 0; g < e.length; g++) {
                    var f = e[g],
                        h = W(this, f);
                    null != h && ((a = f), (b = h), X(this, f, void 0));
                }
                a && X(this, a, b);
            }
    }
    var eb = Object.freeze(ab([]));
    function fb(a) {
        var b = a.l + a.j;
        a.h[b] || (a.i = a.h[b] = {});
    }
    function W(a, b) {
        if (b < a.l) {
            b += a.j;
            var c = a.h[b];
            return c !== eb ? c : (a.h[b] = ab([]));
        }
        if (a.i) return (c = a.i[b]), c !== eb ? c : (a.i[b] = ab([]));
    }
    function gb(a) {
        var b = W(a, 3);
        a.m || (a.m = {});
        if (!a.m[3]) {
            for (var c = 0; c < b.length; c++) b[c] = +b[c];
            a.m[3] = !0;
        }
        return b;
    }
    function hb(a, b, c) {
        a = W(a, b);
        return null == a ? c : a;
    }
    function Y(a, b, c) {
        c = void 0 === c ? 0 : c;
        a = W(a, b);
        a = null == a ? a : +a;
        return null == a ? c : a;
    }
    function X(a, b, c) {
        b < a.l ? (a.h[b + a.j] = c) : (fb(a), (a.i[b] = c));
    }
    function ib(a, b, c) {
        a.g || (a.g = {});
        if (!a.g[c]) {
            var d = W(a, c);
            d && (a.g[c] = new b(d));
        }
        return a.g[c];
    }
    function jb(a, b) {
        a.g || (a.g = {});
        if (!a.g[1]) {
            for (var c = W(a, 1), d = [], e = 0; e < c.length; e++) d[e] = new b(c[e]);
            a.g[1] = d;
        }
        return a.g[1];
    }
    function kb(a, b, c) {
        a.g || (a.g = {});
        var d = c ? lb(c, !1) : c;
        a.g[b] = c;
        X(a, b, d);
    }
    function mb(a, b, c, d) {
        var e = jb(a, c);
        b = b ? b : new c();
        a = W(a, 1);
        void 0 != d ? (e.splice(d, 0, b), a.splice(d, 0, lb(b, !1))) : (e.push(b), a.push(lb(b, !1)));
        return b;
    }
    V.prototype.toJSON = function () {
        var a = lb(this, !1);
        return bb(a);
    };
    function lb(a, b) {
        if (a.g)
            for (var c in a.g) {
                var d = a.g[c];
                if (Array.isArray(d)) for (var e = 0; e < d.length; e++) d[e] && lb(d[e], b);
                else d && lb(d, b);
            }
        return a.h;
    }
    V.prototype.toString = function () {
        return lb(this, !1).toString();
    };
    function nb(a) {
        if (4 == a.h) return !1;
        Ma(a);
        return !0;
    }
    function pb(a) {
        V.call(this, a, -1, qb);
    }
    M(pb, V);
    pb.prototype.getRows = function () {
        return W(this, 1);
    };
    pb.prototype.getCols = function () {
        return W(this, 2);
    };
    pb.prototype.getPackedDataList = function () {
        return gb(this);
    };
    pb.prototype.getLayout = function () {
        return hb(this, 4, 0);
    };
    function rb(a, b) {
        for (; S(b); )
            switch (b.i) {
                case 8:
                    var c = b.g.i();
                    X(a, 1, c);
                    break;
                case 16:
                    c = b.g.i();
                    X(a, 2, c);
                    break;
                case 29:
                case 26:
                    c = Qa(b);
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d];
                        W(a, 3).push(e);
                    }
                    break;
                case 32:
                    c = Ha(b.g);
                    X(a, 4, c);
                    break;
                default:
                    if (!nb(b)) return a;
            }
        return a;
    }
    var qb = [3];
    function Z(a, b) {
        var c = void 0;
        return new (c || (c = Promise))(function (d, e) {
            function g(k) {
                try {
                    h(b.next(k));
                } catch (l) {
                    e(l);
                }
            }
            function f(k) {
                try {
                    h(b["throw"](k));
                } catch (l) {
                    e(l);
                }
            }
            function h(k) {
                k.done
                    ? d(k.value)
                    : new c(function (l) {
                          l(k.value);
                      }).then(g, f);
            }
            h((b = b.apply(a, void 0)).next());
        });
    }
    function sb(a) {
        V.call(this, a);
    }
    M(sb, V);
    function tb(a, b) {
        for (; S(b); )
            switch (b.i) {
                case 8:
                    var c = b.g.i();
                    X(a, 1, c);
                    break;
                case 21:
                    c = T(b);
                    X(a, 2, c);
                    break;
                case 26:
                    c = Oa(b);
                    X(a, 3, c);
                    break;
                case 34:
                    c = Oa(b);
                    X(a, 4, c);
                    break;
                default:
                    if (!nb(b)) return a;
            }
        return a;
    }
    function ub(a) {
        V.call(this, a, -1, vb);
    }
    M(ub, V);
    ub.prototype.addClassification = function (a, b) {
        return mb(this, a, sb, b);
    };
    var vb = [1];
    function wb(a) {
        V.call(this, a);
    }
    M(wb, V);
    function xb(a, b) {
        for (; S(b); )
            switch (b.i) {
                case 13:
                    var c = T(b);
                    X(a, 1, c);
                    break;
                case 21:
                    c = T(b);
                    X(a, 2, c);
                    break;
                case 29:
                    c = T(b);
                    X(a, 3, c);
                    break;
                case 37:
                    c = T(b);
                    X(a, 4, c);
                    break;
                case 45:
                    c = T(b);
                    X(a, 5, c);
                    break;
                default:
                    if (!nb(b)) return a;
            }
        return a;
    }
    function yb(a) {
        V.call(this, a, -1, zb);
    }
    M(yb, V);
    function Ab(a) {
        a: {
            var b = new yb();
            for (a = new La(a); S(a); )
                switch (a.i) {
                    case 10:
                        var c = new wb();
                        Na(a, c, xb);
                        mb(b, c, wb, void 0);
                        break;
                    default:
                        if (!nb(a)) break a;
                }
        }
        return b;
    }
    var zb = [1];
    function Bb(a) {
        V.call(this, a);
    }
    M(Bb, V);
    function Cb(a) {
        V.call(this, a, -1, Db);
    }
    M(Cb, V);
    Cb.prototype.getVertexType = function () {
        return hb(this, 1, 0);
    };
    Cb.prototype.getPrimitiveType = function () {
        return hb(this, 2, 0);
    };
    Cb.prototype.getVertexBufferList = function () {
        return gb(this);
    };
    Cb.prototype.getIndexBufferList = function () {
        return W(this, 4);
    };
    function Eb(a, b) {
        for (; S(b); )
            switch (b.i) {
                case 8:
                    var c = Ha(b.g);
                    X(a, 1, c);
                    break;
                case 16:
                    c = Ha(b.g);
                    X(a, 2, c);
                    break;
                case 29:
                case 26:
                    c = Qa(b);
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d];
                        W(a, 3).push(e);
                    }
                    break;
                case 32:
                case 34:
                    c = b;
                    c = 2 == c.h ? Pa(c, Ea.prototype.i) : [c.g.i()];
                    for (d = 0; d < c.length; d++) (e = c[d]), W(a, 4).push(e);
                    break;
                default:
                    if (!nb(b)) return a;
            }
        return a;
    }
    var Db = [3, 4];
    function Fb(a) {
        V.call(this, a);
    }
    M(Fb, V);
    Fb.prototype.getMesh = function () {
        return ib(this, Cb, 1);
    };
    Fb.prototype.getPoseTransformMatrix = function () {
        return ib(this, pb, 2);
    };
    function Gb(a) {
        a: {
            var b = new Fb();
            for (a = new La(a); S(a); )
                switch (a.i) {
                    case 10:
                        var c = new Cb();
                        Na(a, c, Eb);
                        kb(b, 1, c);
                        break;
                    case 18:
                        c = new pb();
                        Na(a, c, rb);
                        kb(b, 2, c);
                        break;
                    default:
                        if (!nb(a)) break a;
                }
        }
        return b;
    }
    function Hb(a, b, c) {
        c = a.createShader(0 === c ? a.VERTEX_SHADER : a.FRAGMENT_SHADER);
        a.shaderSource(c, b);
        a.compileShader(c);
        if (!a.getShaderParameter(c, a.COMPILE_STATUS)) throw Error("Could not compile WebGL shader.\n\n" + a.getShaderInfoLog(c));
        return c;
    }
    function Ib(a) {
        return jb(a, sb).map(function (b) {
            return { index: hb(b, 1, 0), W: Y(b, 2), label: null != W(b, 3) ? hb(b, 3, "") : void 0, displayName: null != W(b, 4) ? hb(b, 4, "") : void 0 };
        });
    }
    function Jb(a) {
        return { x: Y(a, 1), y: Y(a, 2), z: Y(a, 3), visibility: null != W(a, 4) ? Y(a, 4) : void 0 };
    }
    function Kb(a, b, c) {
        this.h = a;
        this.g = b;
        this.u = c;
        this.l = 0;
    }
    function Lb(a) {
        if ("function" === typeof a.g.canvas.transferToImageBitmap) return Promise.resolve(a.g.canvas.transferToImageBitmap());
        if (a.u) return Promise.resolve(a.g.canvas);
        if ("function" === typeof createImageBitmap) return createImageBitmap(a.g.canvas);
        void 0 === a.j && (a.j = document.createElement("img"));
        return new Promise(function (b) {
            a.j.onload = function () {
                requestAnimationFrame(function () {
                    b(a.j);
                });
            };
            a.j.src = a.g.canvas.toDataURL();
        });
    }
    function Mb(a, b) {
        var c = a.g;
        if (void 0 === a.m) {
            var d = Hb(c, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", 0),
                e = Hb(c, "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }", 1),
                g = c.createProgram();
            c.attachShader(g, d);
            c.attachShader(g, e);
            c.linkProgram(g);
            if (!c.getProgramParameter(g, c.LINK_STATUS)) throw Error("Could not compile WebGL program.\n\n" + c.getProgramInfoLog(g));
            d = a.m = g;
            c.useProgram(d);
            e = c.getUniformLocation(d, "sampler0");
            a.i = { H: c.getAttribLocation(d, "aVertex"), G: c.getAttribLocation(d, "aTex"), ba: e };
            a.s = c.createBuffer();
            c.bindBuffer(c.ARRAY_BUFFER, a.s);
            c.enableVertexAttribArray(a.i.H);
            c.vertexAttribPointer(a.i.H, 2, c.FLOAT, !1, 0, 0);
            c.bufferData(c.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), c.STATIC_DRAW);
            c.bindBuffer(c.ARRAY_BUFFER, null);
            a.o = c.createBuffer();
            c.bindBuffer(c.ARRAY_BUFFER, a.o);
            c.enableVertexAttribArray(a.i.G);
            c.vertexAttribPointer(a.i.G, 2, c.FLOAT, !1, 0, 0);
            c.bufferData(c.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]), c.STATIC_DRAW);
            c.bindBuffer(c.ARRAY_BUFFER, null);
            c.uniform1i(e, 0);
        }
        d = a.i;
        c.useProgram(a.m);
        c.canvas.width = b.width;
        c.canvas.height = b.height;
        c.viewport(0, 0, b.width, b.height);
        c.activeTexture(c.TEXTURE0);
        a.h.bindTexture2d(b.glName);
        c.enableVertexAttribArray(d.H);
        c.bindBuffer(c.ARRAY_BUFFER, a.s);
        c.vertexAttribPointer(d.H, 2, c.FLOAT, !1, 0, 0);
        c.enableVertexAttribArray(d.G);
        c.bindBuffer(c.ARRAY_BUFFER, a.o);
        c.vertexAttribPointer(d.G, 2, c.FLOAT, !1, 0, 0);
        c.bindFramebuffer(c.DRAW_FRAMEBUFFER ? c.DRAW_FRAMEBUFFER : c.FRAMEBUFFER, null);
        c.clearColor(0, 0, 0, 0);
        c.clear(c.COLOR_BUFFER_BIT);
        c.colorMask(!0, !0, !0, !0);
        c.drawArrays(c.TRIANGLE_FAN, 0, 4);
        c.disableVertexAttribArray(d.H);
        c.disableVertexAttribArray(d.G);
        c.bindBuffer(c.ARRAY_BUFFER, null);
        a.h.bindTexture2d(0);
    }
    function Nb(a) {
        this.g = a;
    }
    var Ob = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]);
    function Pb(a, b) {
        return b + a;
    }
    function Qb(a, b) {
        window[a] = b;
    }
    function Rb(a) {
        var b = document.createElement("script");
        b.setAttribute("src", a);
        b.setAttribute("crossorigin", "anonymous");
        return new Promise(function (c) {
            b.addEventListener(
                "load",
                function () {
                    c();
                },
                !1
            );
            b.addEventListener(
                "error",
                function () {
                    c();
                },
                !1
            );
            document.body.appendChild(b);
        });
    }
    function Sb() {
        return Z(this, function b() {
            return O(b, function (c) {
                switch (c.g) {
                    case 1:
                        return (c.m = 2), N(c, WebAssembly.instantiate(Ob), 4);
                    case 4:
                        c.g = 3;
                        c.m = 0;
                        break;
                    case 2:
                        return (c.m = 0), (c.j = null), c.return(!1);
                    case 3:
                        return c.return(!0);
                }
            });
        });
    }
    function Tb(a) {
        this.g = a;
        this.listeners = {};
        this.j = {};
        this.F = {};
        this.m = {};
        this.s = {};
        this.C = this.o = this.O = !0;
        this.B = Promise.resolve();
        this.N = "";
        this.A = {};
        this.locateFile = (a && a.locateFile) || Pb;
        if ("object" === typeof window) var b = window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/";
        else if ("undefined" !== typeof location) b = location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/";
        else throw Error("solutions can only be loaded on a web page or in a web worker");
        this.P = b;
        if (a.options) {
            b = J(Object.keys(a.options));
            for (var c = b.next(); !c.done; c = b.next()) {
                c = c.value;
                var d = a.options[c].default;
                void 0 !== d && (this.j[c] = "function" === typeof d ? d() : d);
            }
        }
    }
    t = Tb.prototype;
    t.close = function () {
        this.i && this.i.delete();
        return Promise.resolve();
    };
    function Ub(a, b) {
        return void 0 === a.g.files ? [] : "function" === typeof a.g.files ? a.g.files(b) : a.g.files;
    }
    function Vb(a) {
        return Z(a, function c() {
            var d = this,
                e,
                g,
                f,
                h,
                k,
                l,
                r,
                w,
                x,
                v,
                A;
            return O(c, function (n) {
                switch (n.g) {
                    case 1:
                        e = d;
                        if (!d.O) return n.return();
                        g = Ub(d, d.j);
                        return N(n, Sb(), 2);
                    case 2:
                        f = n.h;
                        if ("object" === typeof window)
                            return (
                                Qb("createMediapipeSolutionsWasm", { locateFile: d.locateFile }),
                                Qb("createMediapipeSolutionsPackedAssets", { locateFile: d.locateFile }),
                                (l = g.filter(function (u) {
                                    return void 0 !== u.data;
                                })),
                                (r = g.filter(function (u) {
                                    return void 0 === u.data;
                                })),
                                (w = Promise.all(
                                    l.map(function (u) {
                                        var y = Wb(e, u.url);
                                        if (void 0 !== u.path) {
                                            var z = u.path;
                                            y = y.then(function (D) {
                                                e.overrideFile(z, D);
                                                return Promise.resolve(D);
                                            });
                                        }
                                        return y;
                                    })
                                )),
                                (x = Promise.all(
                                    r.map(function (u) {
                                        return void 0 === u.simd || (u.simd && f) || (!u.simd && !f) ? Rb(e.locateFile(u.url, e.P)) : Promise.resolve();
                                    })
                                ).then(function () {
                                    return Z(e, function y() {
                                        var z,
                                            D,
                                            F = this;
                                        return O(y, function (E) {
                                            if (1 == E.g) return (z = window.createMediapipeSolutionsWasm), (D = window.createMediapipeSolutionsPackedAssets), N(E, z(D), 2);
                                            F.h = E.h;
                                            E.g = 0;
                                        });
                                    });
                                })),
                                (v = (function () {
                                    return Z(e, function y() {
                                        var z = this;
                                        return O(y, function (D) {
                                            z.g.graph && z.g.graph.url ? (D = N(D, Wb(z, z.g.graph.url), 0)) : ((D.g = 0), (D = void 0));
                                            return D;
                                        });
                                    });
                                })()),
                                N(n, Promise.all([x, w, v]), 7)
                            );
                        if ("function" !== typeof importScripts) throw Error("solutions can only be loaded on a web page or in a web worker");
                        h = g
                            .filter(function (u) {
                                return void 0 === u.simd || (u.simd && f) || (!u.simd && !f);
                            })
                            .map(function (u) {
                                return e.locateFile(u.url, e.P);
                            });
                        importScripts.apply(null, L(h));
                        return N(n, createMediapipeSolutionsWasm(Module), 6);
                    case 6:
                        d.h = n.h;
                        d.l = new OffscreenCanvas(1, 1);
                        d.h.canvas = d.l;
                        k = d.h.GL.createContext(d.l, { antialias: !1, alpha: !1, $: "undefined" !== typeof WebGL2RenderingContext ? 2 : 1 });
                        d.h.GL.makeContextCurrent(k);
                        n.g = 4;
                        break;
                    case 7:
                        d.l = document.createElement("canvas");
                        A = d.l.getContext("webgl2", {});
                        if (!A && ((A = d.l.getContext("webgl", {})), !A)) return alert("Failed to create WebGL canvas context when passing video frame."), n.return();
                        d.D = A;
                        d.h.canvas = d.l;
                        d.h.createContext(d.l, !0, !0, {});
                    case 4:
                        (d.i = new d.h.SolutionWasm()), (d.O = !1), (n.g = 0);
                }
            });
        });
    }
    function Xb(a) {
        return Z(a, function c() {
            var d = this,
                e,
                g,
                f,
                h,
                k,
                l,
                r,
                w;
            return O(c, function (x) {
                if (1 == x.g) {
                    if (d.g.graph && d.g.graph.url && d.N === d.g.graph.url) return x.return();
                    d.o = !0;
                    if (!d.g.graph || !d.g.graph.url) {
                        x.g = 2;
                        return;
                    }
                    d.N = d.g.graph.url;
                    return N(x, Wb(d, d.g.graph.url), 3);
                }
                2 != x.g && ((e = x.h), d.i.loadGraph(e));
                g = J(Object.keys(d.A));
                for (f = g.next(); !f.done; f = g.next()) (h = f.value), d.i.overrideFile(h, d.A[h]);
                d.A = {};
                if (d.g.listeners) for (k = J(d.g.listeners), l = k.next(); !l.done; l = k.next()) (r = l.value), Yb(d, r);
                w = d.j;
                d.j = {};
                d.setOptions(w);
                x.g = 0;
            });
        });
    }
    t.reset = function () {
        return Z(this, function b() {
            var c = this;
            return O(b, function (d) {
                c.i && (c.i.reset(), (c.m = {}), (c.s = {}));
                d.g = 0;
            });
        });
    };
    t.setOptions = function (a, b) {
        var c = this;
        if ((b = b || this.g.options)) {
            for (var d = [], e = [], g = {}, f = J(Object.keys(a)), h = f.next(); !h.done; g = { J: g.J, K: g.K }, h = f.next()) {
                var k = h.value;
                (k in this.j && this.j[k] === a[k]) ||
                    ((this.j[k] = a[k]),
                    (h = b[k]),
                    void 0 !== h &&
                        (h.onChange &&
                            ((g.J = h.onChange),
                            (g.K = a[k]),
                            d.push(
                                (function (l) {
                                    return function () {
                                        return Z(c, function w() {
                                            var x,
                                                v = this;
                                            return O(w, function (A) {
                                                if (1 == A.g) return N(A, l.J(l.K), 2);
                                                x = A.h;
                                                !0 === x && (v.o = !0);
                                                A.g = 0;
                                            });
                                        });
                                    };
                                })(g)
                            )),
                        h.graphOptionXref &&
                            ((k = { valueNumber: 1 === h.type ? a[k] : 0, valueBoolean: 0 === h.type ? a[k] : !1, valueString: 2 === h.type ? a[k] : "" }),
                            (h = Object.assign(Object.assign(Object.assign({}, { calculatorName: "", calculatorIndex: 0 }), h.graphOptionXref), k)),
                            e.push(h))));
            }
            if (0 !== d.length || 0 !== e.length) (this.o = !0), (this.u = (void 0 === this.u ? [] : this.u).concat(e)), (this.v = (void 0 === this.v ? [] : this.v).concat(d));
        }
    };
    function Zb(a) {
        return Z(a, function c() {
            var d = this,
                e,
                g,
                f,
                h,
                k,
                l,
                r;
            return O(c, function (w) {
                switch (w.g) {
                    case 1:
                        if (!d.o) return w.return();
                        if (!d.v) {
                            w.g = 2;
                            break;
                        }
                        e = J(d.v);
                        g = e.next();
                    case 3:
                        if (g.done) {
                            w.g = 5;
                            break;
                        }
                        f = g.value;
                        return N(w, f(), 4);
                    case 4:
                        g = e.next();
                        w.g = 3;
                        break;
                    case 5:
                        d.v = void 0;
                    case 2:
                        if (d.u) {
                            h = new d.h.GraphOptionChangeRequestList();
                            k = J(d.u);
                            for (l = k.next(); !l.done; l = k.next()) (r = l.value), h.push_back(r);
                            d.i.changeOptions(h);
                            h.delete();
                            d.u = void 0;
                        }
                        d.o = !1;
                        w.g = 0;
                }
            });
        });
    }
    t.initialize = function () {
        return Z(this, function b() {
            var c = this;
            return O(b, function (d) {
                return 1 == d.g ? N(d, Vb(c), 2) : 3 != d.g ? N(d, Xb(c), 3) : N(d, Zb(c), 0);
            });
        });
    };
    function Wb(a, b) {
        return Z(a, function d() {
            var e = this,
                g,
                f;
            return O(d, function (h) {
                if (b in e.F) return h.return(e.F[b]);
                g = e.locateFile(b, "");
                f = fetch(g).then(function (k) {
                    return k.arrayBuffer();
                });
                e.F[b] = f;
                return h.return(f);
            });
        });
    }
    t.overrideFile = function (a, b) {
        this.i ? this.i.overrideFile(a, b) : (this.A[a] = b);
    };
    t.clearOverriddenFiles = function () {
        this.A = {};
        this.i && this.i.clearOverriddenFiles();
    };
    t.send = function (a, b) {
        return Z(this, function d() {
            var e = this,
                g,
                f,
                h,
                k,
                l,
                r,
                w,
                x,
                v;
            return O(d, function (A) {
                switch (A.g) {
                    case 1:
                        if (!e.g.inputs) return A.return();
                        g = 1e3 * (void 0 === b || null === b ? performance.now() : b);
                        return N(A, e.B, 2);
                    case 2:
                        return N(A, e.initialize(), 3);
                    case 3:
                        f = new e.h.PacketDataList();
                        h = J(Object.keys(a));
                        for (k = h.next(); !k.done; k = h.next())
                            if (((l = k.value), (r = e.g.inputs[l]))) {
                                a: {
                                    var n = e;
                                    var u = a[l];
                                    switch (r.type) {
                                        case "video":
                                            var y = n.m[r.stream];
                                            y || ((y = new Kb(n.h, n.D, n.C)), (n.m[r.stream] = y));
                                            n = y;
                                            0 === n.l && (n.l = n.h.createTexture());
                                            if ("undefined" !== typeof HTMLVideoElement && u instanceof HTMLVideoElement) {
                                                var z = u.videoWidth;
                                                y = u.videoHeight;
                                            } else "undefined" !== typeof HTMLImageElement && u instanceof HTMLImageElement ? ((z = u.naturalWidth), (y = u.naturalHeight)) : ((z = u.width), (y = u.height));
                                            y = { glName: n.l, width: z, height: y };
                                            z = n.g;
                                            z.canvas.width = y.width;
                                            z.canvas.height = y.height;
                                            z.activeTexture(z.TEXTURE0);
                                            n.h.bindTexture2d(n.l);
                                            z.texImage2D(z.TEXTURE_2D, 0, z.RGBA, z.RGBA, z.UNSIGNED_BYTE, u);
                                            n.h.bindTexture2d(0);
                                            n = y;
                                            break a;
                                        case "detections":
                                            y = n.m[r.stream];
                                            y || ((y = new Nb(n.h)), (n.m[r.stream] = y));
                                            n = y;
                                            n.data || (n.data = new n.g.DetectionListData());
                                            n.data.reset(u.length);
                                            for (y = 0; y < u.length; ++y) {
                                                z = u[y];
                                                var D = n.data,
                                                    F = D.setBoundingBox,
                                                    E = y;
                                                var G = z.R;
                                                var q = new Bb();
                                                X(q, 1, G.X);
                                                X(q, 2, G.Y);
                                                X(q, 3, G.height);
                                                X(q, 4, G.width);
                                                X(q, 5, G.rotation);
                                                X(q, 6, G.V);
                                                G = new Va();
                                                var B = q;
                                                q = G;
                                                var m = W(B, 1);
                                                null != m && U(q, 1, m);
                                                m = W(B, 2);
                                                null != m && U(q, 2, m);
                                                m = W(B, 3);
                                                null != m && U(q, 3, m);
                                                m = W(B, 4);
                                                null != m && U(q, 4, m);
                                                m = W(B, 5);
                                                null != m && U(q, 5, m);
                                                m = W(B, 6);
                                                if (null != m && null != m && null != m) {
                                                    Ka(q.g, 48);
                                                    q = q.g;
                                                    var p = m;
                                                    m = 0 > p;
                                                    p = Math.abs(p);
                                                    B = p >>> 0;
                                                    p = Math.floor((p - B) / 4294967296);
                                                    p >>>= 0;
                                                    m && ((p = ~p >>> 0), (B = (~B >>> 0) + 1), 4294967295 < B && ((B = 0), p++, 4294967295 < p && (p = 0)));
                                                    Q = B;
                                                    R = p;
                                                    m = Q;
                                                    for (B = R; 0 < B || 127 < m; ) q.push((m & 127) | 128), (m = ((m >>> 7) | (B << 25)) >>> 0), (B >>>= 7);
                                                    q.push(m);
                                                }
                                                G = Wa(G);
                                                F.call(D, E, G);
                                                if (z.M)
                                                    for (D = 0; D < z.M.length; ++D)
                                                        (q = z.M[D]),
                                                            (m = q.visibility ? !0 : !1),
                                                            (F = n.data),
                                                            (E = F.addNormalizedLandmark),
                                                            (G = y),
                                                            (q = Object.assign(Object.assign({}, q), { visibility: m ? q.visibility : 0 })),
                                                            (m = new wb()),
                                                            X(m, 1, q.x),
                                                            X(m, 2, q.y),
                                                            X(m, 3, q.z),
                                                            q.visibility && X(m, 4, q.visibility),
                                                            (q = new Va()),
                                                            (B = m),
                                                            (p = q),
                                                            (m = W(B, 1)),
                                                            null != m && U(p, 1, m),
                                                            (m = W(B, 2)),
                                                            null != m && U(p, 2, m),
                                                            (m = W(B, 3)),
                                                            null != m && U(p, 3, m),
                                                            (m = W(B, 4)),
                                                            null != m && U(p, 4, m),
                                                            (m = W(B, 5)),
                                                            null != m && U(p, 5, m),
                                                            (q = Wa(q)),
                                                            E.call(F, G, q);
                                                if (z.L)
                                                    for (D = 0; D < z.L.length; ++D) {
                                                        F = n.data;
                                                        E = F.addClassification;
                                                        G = y;
                                                        q = z.L[D];
                                                        m = new sb();
                                                        X(m, 2, q.W);
                                                        q.index && X(m, 1, q.index);
                                                        q.label && X(m, 3, q.label);
                                                        q.displayName && X(m, 4, q.displayName);
                                                        B = q = new Va();
                                                        p = W(m, 1);
                                                        if (null != p && null != p) {
                                                            var H = p;
                                                            if (null != H)
                                                                if ((Ka(B.g, 8), (p = B.g), 0 <= H)) Ka(p, H);
                                                                else {
                                                                    for (var K = 0; 9 > K; K++) p.push((H & 127) | 128), (H >>= 7);
                                                                    p.push(1);
                                                                }
                                                        }
                                                        p = W(m, 2);
                                                        null != p && U(B, 2, p);
                                                        p = W(m, 3);
                                                        null != p && null != p && Xa(B, 3, Ca(p));
                                                        p = W(m, 4);
                                                        null != p && null != p && Xa(B, 4, Ca(p));
                                                        q = Wa(q);
                                                        E.call(F, G, q);
                                                    }
                                            }
                                            n = n.data;
                                            break a;
                                        default:
                                            n = {};
                                    }
                                }
                                w = n;
                                x = r.stream;
                                switch (r.type) {
                                    case "video":
                                        f.pushTexture2d(Object.assign(Object.assign({}, w), { stream: x, timestamp: g }));
                                        break;
                                    case "detections":
                                        v = w;
                                        v.stream = x;
                                        v.timestamp = g;
                                        f.pushDetectionList(v);
                                        break;
                                    default:
                                        throw Error("Unknown input config type: '" + r.type + "'");
                                }
                            }
                        e.i.send(f);
                        return N(A, e.B, 4);
                    case 4:
                        f.delete(), (A.g = 0);
                }
            });
        });
    };
    function $b(a, b, c) {
        return Z(a, function e() {
            var g,
                f,
                h,
                k,
                l,
                r,
                w = this,
                x,
                v,
                A,
                n,
                u,
                y,
                z,
                D;
            return O(e, function (F) {
                switch (F.g) {
                    case 1:
                        if (!c) return F.return(b);
                        g = {};
                        f = 0;
                        h = J(Object.keys(c));
                        for (k = h.next(); !k.done; k = h.next()) (l = k.value), (r = c[l]), "string" !== typeof r && "texture" === r.type && ++f;
                        1 < f && (w.C = !1);
                        x = J(Object.keys(c));
                        k = x.next();
                    case 2:
                        if (k.done) {
                            F.g = 4;
                            break;
                        }
                        v = k.value;
                        A = c[v];
                        if ("string" === typeof A) return (z = g), (D = v), N(F, ac(w, v, b[A]), 13);
                        n = b[A.stream];
                        if ("detection_list" === A.type) {
                            if (n) {
                                var E = n.getRectList();
                                for (var G = n.getLandmarksList(), q = n.getClassificationsList(), B = [], m = 0; m < E.size(); ++m) {
                                    var p = E.get(m);
                                    a: {
                                        var H = new Bb();
                                        for (p = new La(p); S(p); )
                                            switch (p.i) {
                                                case 13:
                                                    var K = T(p);
                                                    X(H, 1, K);
                                                    break;
                                                case 21:
                                                    K = T(p);
                                                    X(H, 2, K);
                                                    break;
                                                case 29:
                                                    K = T(p);
                                                    X(H, 3, K);
                                                    break;
                                                case 37:
                                                    K = T(p);
                                                    X(H, 4, K);
                                                    break;
                                                case 45:
                                                    K = T(p);
                                                    X(H, 5, K);
                                                    break;
                                                case 48:
                                                    K = Ha(p.g);
                                                    X(H, 6, K);
                                                    break;
                                                default:
                                                    if (!nb(p)) break a;
                                            }
                                    }
                                    H = { X: Y(H, 1), Y: Y(H, 2), height: Y(H, 3), width: Y(H, 4), rotation: Y(H, 5, 0), V: hb(H, 6, 0) };
                                    p = jb(Ab(G.get(m)), wb).map(Jb);
                                    var la = q.get(m);
                                    a: for (K = new ub(), la = new La(la); S(la); )
                                        switch (la.i) {
                                            case 10:
                                                var ob = new sb();
                                                Na(la, ob, tb);
                                                K.addClassification(ob);
                                                break;
                                            default:
                                                if (!nb(la)) break a;
                                        }
                                    H = { R: H, M: p, L: Ib(K) };
                                    B.push(H);
                                }
                                E = B;
                            } else E = [];
                            g[v] = E;
                            F.g = 7;
                            break;
                        }
                        if ("proto_list" === A.type) {
                            if (n) {
                                E = Array(n.size());
                                for (G = 0; G < n.size(); G++) E[G] = n.get(G);
                                n.delete();
                            } else E = [];
                            g[v] = E;
                            F.g = 7;
                            break;
                        }
                        if (void 0 === n) {
                            F.g = 3;
                            break;
                        }
                        if ("proto" === A.type) {
                            g[v] = n;
                            F.g = 7;
                            break;
                        }
                        if ("texture" !== A.type) throw Error("Unknown output config type: '" + A.type + "'");
                        u = w.s[v];
                        u || ((u = new Kb(w.h, w.D, w.C)), (w.s[v] = u));
                        E = u;
                        Mb(E, n);
                        E = Lb(E);
                        return N(F, E, 12);
                    case 12:
                        (y = F.h), (g[v] = y);
                    case 7:
                        A.transform && g[v] && (g[v] = A.transform(g[v]));
                        F.g = 3;
                        break;
                    case 13:
                        z[D] = F.h;
                    case 3:
                        k = x.next();
                        F.g = 2;
                        break;
                    case 4:
                        return F.return(g);
                }
            });
        });
    }
    function ac(a, b, c) {
        return Z(a, function e() {
            var g = this,
                f;
            return O(e, function (h) {
                if ("number" === typeof c || c instanceof Uint8Array || c instanceof g.h.Uint8BlobList) return h.return(c);
                if (c instanceof g.h.Texture2dDataOut) {
                    f = g.s[b];
                    f || ((f = new Kb(g.h, g.D, g.C)), (g.s[b] = f));
                    var k = h.return;
                    var l = f;
                    Mb(l, c);
                    l = Lb(l);
                    return k.call(h, l);
                }
                return h.return(void 0);
            });
        });
    }
    function Yb(a, b) {
        for (var c = b.name || "$", d = [].concat(L(b.wants)), e = new a.h.StringList(), g = J(b.wants), f = g.next(); !f.done; f = g.next()) e.push_back(f.value);
        g = a.h.PacketListener.implement({
            onResults: function (h) {
                for (var k = {}, l = 0; l < b.wants.length; ++l) k[d[l]] = h.get(l);
                var r = a.listeners[c];
                r &&
                    (a.B = $b(a, k, b.outs).then(function (w) {
                        w = r(w);
                        for (var x = 0; x < b.wants.length; ++x) {
                            var v = k[d[x]];
                            "object" === typeof v && v.hasOwnProperty && v.hasOwnProperty("delete") && v.delete();
                        }
                        w && (a.B = w);
                    }));
            },
        });
        a.i.attachMultiListener(e, g);
        e.delete();
    }
    t.onResults = function (a, b) {
        this.listeners[b || "$"] = a;
    };
    P("Solution", Tb);
    P("OptionType", { BOOL: 0, NUMBER: 1, Z: 2, 0: "BOOL", 1: "NUMBER", 2: "STRING" });
    function bc(a) {
        a = Gb(a);
        var b = a.getMesh();
        if (!b) return a;
        var c = new Float32Array(b.getVertexBufferList());
        b.getVertexBufferList = function () {
            return c;
        };
        var d = new Uint32Array(b.getIndexBufferList());
        b.getIndexBufferList = function () {
            return d;
        };
        return a;
    }
    var cc = {
        files: [{ url: "face_mesh_solution_packed_assets_loader.js" }, { simd: !0, url: "face_mesh_solution_simd_wasm_bin.js" }, { simd: !1, url: "face_mesh_solution_wasm_bin.js" }],
        graph: { url: "face_mesh.binarypb" },
        listeners: [
            {
                wants: ["multi_face_geometry", "image_transformed", "multi_face_landmarks"],
                outs: {
                    image: "image_transformed",
                    multiFaceGeometry: {
                        type: "proto_list",
                        stream: "multi_face_geometry",
                        transform: function (a) {
                            return a.map(bc);
                        },
                    },
                    multiFaceLandmarks: {
                        type: "proto_list",
                        stream: "multi_face_landmarks",
                        transform: function (a) {
                            return a.map(function (b) {
                                return jb(Ab(b), wb).map(Jb);
                            });
                        },
                    },
                },
            },
        ],
        inputs: { image: { type: "video", stream: "input_frames_gpu" } },
        options: {
            useCpuInference: {
                type: 0,
                graphOptionXref: { calculatorType: "InferenceCalculator", fieldName: "use_cpu_inference" },
                default: "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document),
            },
            enableFaceGeometry: { type: 0, graphOptionXref: { calculatorName: "EnableFaceGeometryConstant", calculatorType: "ConstantSidePacketCalculator", fieldName: "bool_value" } },
            selfieMode: { type: 0, graphOptionXref: { calculatorType: "GlScalerCalculator", calculatorIndex: 1, fieldName: "flip_horizontal" } },
            maxNumFaces: { type: 1, graphOptionXref: { calculatorType: "ConstantSidePacketCalculator", calculatorName: "ConstantSidePacketCalculator", fieldName: "int_value" } },
            minDetectionConfidence: {
                type: 1,
                graphOptionXref: {
                    calculatorType: "TensorsToDetectionsCalculator",
                    calculatorName: "facelandmarkfrontgpu__facedetectionshortrangegpu__facedetectionshortrangecommon__TensorsToDetectionsCalculator",
                    fieldName: "min_score_thresh",
                },
            },
            minTrackingConfidence: { type: 1, graphOptionXref: { calculatorType: "ThresholdingCalculator", calculatorName: "facelandmarkfrontgpu__facelandmarkgpu__ThresholdingCalculator", fieldName: "threshold" } },
            cameraNear: { type: 1, graphOptionXref: { calculatorType: "FaceGeometryEnvGeneratorCalculator", fieldName: "near" } },
            cameraFar: { type: 1, graphOptionXref: { calculatorType: "FaceGeometryEnvGeneratorCalculator", fieldName: "far" } },
            cameraVerticalFovDegrees: { type: 1, graphOptionXref: { calculatorType: "FaceGeometryEnvGeneratorCalculator", fieldName: "vertical_fov_degrees" } },
        },
    };
    var dc = [
            // [61, 146],
            // [146, 91],
            // [91, 181],
            // [181, 84],
            // [84, 17],
            // [17, 314],
            // [314, 405],
            // [405, 321],
            // [321, 375],
            // [375, 291],
            // [61, 185],
            // [185, 40],
            // [40, 39],
            // [39, 37],
            // [37, 0],
            // [0, 267],
            // [267, 269],
            // [269, 270],
            // [270, 409],
            // [409, 291],
            // [78, 95],
            // [95, 88],
            // [88, 178],
            // [178, 87],
            // [87, 14],
            [14, 317],
            // [317, 402],
            // [402, 318],
            // [318, 324],
            // [324, 308],
            // [78, 191],
            // [191, 80],
            // [80, 81],
            // [81, 82],
            // [82, 13],
            [13, 312],
            // [312, 311],
            // [311, 310],
            // [310, 415],
            // [415, 308],
        ],
        ec = [
            [263, 249],
            [249, 390],
            [390, 373],
            [373, 374],
            [374, 380],
            [380, 381],
            [381, 382],
            [382, 362],
            [263, 466],
            [466, 388],
            [388, 387],
            [387, 386],
            [386, 385],
            [385, 384],
            [384, 398],
            [398, 362],
        ],
        fc = [
            [276, 283],
            [283, 282],
            [282, 295],
            [295, 285],
            [300, 293],
            [293, 334],
            [334, 296],
            [296, 336],
        ],
        gc = [
            [33, 7],
            [7, 163],
            [163, 144],
            [144, 145],
            [145, 153],
            [153, 154],
            [154, 155],
            [155, 133],
            [33, 246],
            [246, 161],
            [161, 160],
            [160, 159],
            [159, 158],
            [158, 157],
            [157, 173],
            [173, 133],
        ],
        hc = [
            [46, 53],
            [53, 52],
            [52, 65],
            [65, 55],
            [70, 63],
            [63, 105],
            [105, 66],
            [66, 107],
        ],
        ic = [
            [10, 338],
            [338, 297],
            [297, 332],
            [332, 284],
            [284, 251],
            [251, 389],
            [389, 356],
            [356, 454],
            [454, 323],
            [323, 361],
            [361, 288],
            [288, 397],
            [397, 365],
            [365, 379],
            [379, 378],
            [378, 400],
            [400, 377],
            [377, 152],
            [152, 148],
            [148, 176],
            [176, 149],
            [149, 150],
            [150, 136],
            [136, 172],
            [172, 58],
            [58, 132],
            [132, 93],
            [93, 234],
            [234, 127],
            [127, 162],
            [162, 21],
            [21, 54],
            [54, 103],
            [103, 67],
            [67, 109],
            [109, 10],
        ],
        jc = [].concat(L(dc), L(ec), L(fc), L(gc), L(hc), L(ic));
    function kc(a) {
        a = a || {};
        a = Object.assign(Object.assign({}, cc), a);
        this.g = new Tb(a);
    }
    t = kc.prototype;
    t.close = function () {
        this.g.close();
        return Promise.resolve();
    };
    t.onResults = function (a) {
        this.g.onResults(a);
    };
    t.initialize = function () {
        return Z(this, function b() {
            var c = this;
            return O(b, function (d) {
                return N(d, c.g.initialize(), 0);
            });
        });
    };
    t.reset = function () {
        this.g.reset();
    };
    t.send = function (a) {
        return Z(this, function c() {
            var d = this;
            return O(c, function (e) {
                return N(e, d.g.send(a), 0);
            });
        });
    };
    t.setOptions = function (a) {
        this.g.setOptions(a);
    };
    P("FACE_GEOMETRY", {
        Layout: { COLUMN_MAJOR: 0, ROW_MAJOR: 1, 0: "COLUMN_MAJOR", 1: "ROW_MAJOR" },
        PrimitiveType: { TRIANGLE: 0, 0: "TRIANGLE" },
        VertexType: { VERTEX_PT: 0, 0: "VERTEX_PT" },
        DEFAULT_CAMERA_PARAMS: { verticalFovDegrees: 63, near: 1, far: 1e4 },
    });
    P("FaceMesh", kc);
    P("FACEMESH_LIPS", dc);
    P("FACEMESH_LEFT_EYE", ec);
    P("FACEMESH_LEFT_EYEBROW", fc);
    P("FACEMESH_RIGHT_EYE", gc);
    P("FACEMESH_RIGHT_EYEBROW", hc);
    P("FACEMESH_FACE_OVAL", ic);
    P("FACEMESH_CONTOURS", jc);
    P("FACEMESH_TESSELATION", [
        [127, 34],
        [34, 139],
        [139, 127],
        [11, 0],
        [0, 37],
        [37, 11],
        [232, 231],
        [231, 120],
        [120, 232],
        [72, 37],
        [37, 39],
        [39, 72],
        [128, 121],
        [121, 47],
        [47, 128],
        [232, 121],
        [121, 128],
        [128, 232],
        [104, 69],
        [69, 67],
        [67, 104],
        [175, 171],
        [171, 148],
        [148, 175],
        [118, 50],
        [50, 101],
        [101, 118],
        [73, 39],
        [39, 40],
        [40, 73],
        [9, 151],
        [151, 108],
        [108, 9],
        [48, 115],
        [115, 131],
        [131, 48],
        [194, 204],
        [204, 211],
        [211, 194],
        [74, 40],
        [40, 185],
        [185, 74],
        [80, 42],
        [42, 183],
        [183, 80],
        [40, 92],
        [92, 186],
        [186, 40],
        [230, 229],
        [229, 118],
        [118, 230],
        [202, 212],
        [212, 214],
        [214, 202],
        [83, 18],
        [18, 17],
        [17, 83],
        [76, 61],
        [61, 146],
        [146, 76],
        [160, 29],
        [29, 30],
        [30, 160],
        [56, 157],
        [157, 173],
        [173, 56],
        [106, 204],
        [204, 194],
        [194, 106],
        [135, 214],
        [214, 192],
        [192, 135],
        [203, 165],
        [165, 98],
        [98, 203],
        [21, 71],
        [71, 68],
        [68, 21],
        [51, 45],
        [45, 4],
        [4, 51],
        [144, 24],
        [24, 23],
        [23, 144],
        [77, 146],
        [146, 91],
        [91, 77],
        [205, 50],
        [50, 187],
        [187, 205],
        [201, 200],
        [200, 18],
        [18, 201],
        [91, 106],
        [106, 182],
        [182, 91],
        [90, 91],
        [91, 181],
        [181, 90],
        [85, 84],
        [84, 17],
        [17, 85],
        [206, 203],
        [203, 36],
        [36, 206],
        [148, 171],
        [171, 140],
        [140, 148],
        [92, 40],
        [40, 39],
        [39, 92],
        [193, 189],
        [189, 244],
        [244, 193],
        [159, 158],
        [158, 28],
        [28, 159],
        [247, 246],
        [246, 161],
        [161, 247],
        [236, 3],
        [3, 196],
        [196, 236],
        [54, 68],
        [68, 104],
        [104, 54],
        [193, 168],
        [168, 8],
        [8, 193],
        [117, 228],
        [228, 31],
        [31, 117],
        [189, 193],
        [193, 55],
        [55, 189],
        [98, 97],
        [97, 99],
        [99, 98],
        [126, 47],
        [47, 100],
        [100, 126],
        [166, 79],
        [79, 218],
        [218, 166],
        [155, 154],
        [154, 26],
        [26, 155],
        [209, 49],
        [49, 131],
        [131, 209],
        [135, 136],
        [136, 150],
        [150, 135],
        [47, 126],
        [126, 217],
        [217, 47],
        [223, 52],
        [52, 53],
        [53, 223],
        [45, 51],
        [51, 134],
        [134, 45],
        [211, 170],
        [170, 140],
        [140, 211],
        [67, 69],
        [69, 108],
        [108, 67],
        [43, 106],
        [106, 91],
        [91, 43],
        [230, 119],
        [119, 120],
        [120, 230],
        [226, 130],
        [130, 247],
        [247, 226],
        [63, 53],
        [53, 52],
        [52, 63],
        [238, 20],
        [20, 242],
        [242, 238],
        [46, 70],
        [70, 156],
        [156, 46],
        [78, 62],
        [62, 96],
        [96, 78],
        [46, 53],
        [53, 63],
        [63, 46],
        [143, 34],
        [34, 227],
        [227, 143],
        [123, 117],
        [117, 111],
        [111, 123],
        [44, 125],
        [125, 19],
        [19, 44],
        [236, 134],
        [134, 51],
        [51, 236],
        [216, 206],
        [206, 205],
        [205, 216],
        [154, 153],
        [153, 22],
        [22, 154],
        [39, 37],
        [37, 167],
        [167, 39],
        [200, 201],
        [201, 208],
        [208, 200],
        [36, 142],
        [142, 100],
        [100, 36],
        [57, 212],
        [212, 202],
        [202, 57],
        [20, 60],
        [60, 99],
        [99, 20],
        [28, 158],
        [158, 157],
        [157, 28],
        [35, 226],
        [226, 113],
        [113, 35],
        [160, 159],
        [159, 27],
        [27, 160],
        [204, 202],
        [202, 210],
        [210, 204],
        [113, 225],
        [225, 46],
        [46, 113],
        [43, 202],
        [202, 204],
        [204, 43],
        [62, 76],
        [76, 77],
        [77, 62],
        [137, 123],
        [123, 116],
        [116, 137],
        [41, 38],
        [38, 72],
        [72, 41],
        [203, 129],
        [129, 142],
        [142, 203],
        [64, 98],
        [98, 240],
        [240, 64],
        [49, 102],
        [102, 64],
        [64, 49],
        [41, 73],
        [73, 74],
        [74, 41],
        [212, 216],
        [216, 207],
        [207, 212],
        [42, 74],
        [74, 184],
        [184, 42],
        [169, 170],
        [170, 211],
        [211, 169],
        [170, 149],
        [149, 176],
        [176, 170],
        [105, 66],
        [66, 69],
        [69, 105],
        [122, 6],
        [6, 168],
        [168, 122],
        [123, 147],
        [147, 187],
        [187, 123],
        [96, 77],
        [77, 90],
        [90, 96],
        [65, 55],
        [55, 107],
        [107, 65],
        [89, 90],
        [90, 180],
        [180, 89],
        [101, 100],
        [100, 120],
        [120, 101],
        [63, 105],
        [105, 104],
        [104, 63],
        [93, 137],
        [137, 227],
        [227, 93],
        [15, 86],
        [86, 85],
        [85, 15],
        [129, 102],
        [102, 49],
        [49, 129],
        [14, 87],
        [87, 86],
        [86, 14],
        [55, 8],
        [8, 9],
        [9, 55],
        [100, 47],
        [47, 121],
        [121, 100],
        [145, 23],
        [23, 22],
        [22, 145],
        [88, 89],
        [89, 179],
        [179, 88],
        [6, 122],
        [122, 196],
        [196, 6],
        [88, 95],
        [95, 96],
        [96, 88],
        [138, 172],
        [172, 136],
        [136, 138],
        [215, 58],
        [58, 172],
        [172, 215],
        [115, 48],
        [48, 219],
        [219, 115],
        [42, 80],
        [80, 81],
        [81, 42],
        [195, 3],
        [3, 51],
        [51, 195],
        [43, 146],
        [146, 61],
        [61, 43],
        [171, 175],
        [175, 199],
        [199, 171],
        [81, 82],
        [82, 38],
        [38, 81],
        [53, 46],
        [46, 225],
        [225, 53],
        [144, 163],
        [163, 110],
        [110, 144],
        [52, 65],
        [65, 66],
        [66, 52],
        [229, 228],
        [228, 117],
        [117, 229],
        [34, 127],
        [127, 234],
        [234, 34],
        [107, 108],
        [108, 69],
        [69, 107],
        [109, 108],
        [108, 151],
        [151, 109],
        [48, 64],
        [64, 235],
        [235, 48],
        [62, 78],
        [78, 191],
        [191, 62],
        [129, 209],
        [209, 126],
        [126, 129],
        [111, 35],
        [35, 143],
        [143, 111],
        [117, 123],
        [123, 50],
        [50, 117],
        [222, 65],
        [65, 52],
        [52, 222],
        [19, 125],
        [125, 141],
        [141, 19],
        [221, 55],
        [55, 65],
        [65, 221],
        [3, 195],
        [195, 197],
        [197, 3],
        [25, 7],
        [7, 33],
        [33, 25],
        [220, 237],
        [237, 44],
        [44, 220],
        [70, 71],
        [71, 139],
        [139, 70],
        [122, 193],
        [193, 245],
        [245, 122],
        [247, 130],
        [130, 33],
        [33, 247],
        [71, 21],
        [21, 162],
        [162, 71],
        [170, 169],
        [169, 150],
        [150, 170],
        [188, 174],
        [174, 196],
        [196, 188],
        [216, 186],
        [186, 92],
        [92, 216],
        [2, 97],
        [97, 167],
        [167, 2],
        [141, 125],
        [125, 241],
        [241, 141],
        [164, 167],
        [167, 37],
        [37, 164],
        [72, 38],
        [38, 12],
        [12, 72],
        [38, 82],
        [82, 13],
        [13, 38],
        [63, 68],
        [68, 71],
        [71, 63],
        [226, 35],
        [35, 111],
        [111, 226],
        [101, 50],
        [50, 205],
        [205, 101],
        [206, 92],
        [92, 165],
        [165, 206],
        [209, 198],
        [198, 217],
        [217, 209],
        [165, 167],
        [167, 97],
        [97, 165],
        [220, 115],
        [115, 218],
        [218, 220],
        [133, 112],
        [112, 243],
        [243, 133],
        [239, 238],
        [238, 241],
        [241, 239],
        [214, 135],
        [135, 169],
        [169, 214],
        [190, 173],
        [173, 133],
        [133, 190],
        [171, 208],
        [208, 32],
        [32, 171],
        [125, 44],
        [44, 237],
        [237, 125],
        [86, 87],
        [87, 178],
        [178, 86],
        [85, 86],
        [86, 179],
        [179, 85],
        [84, 85],
        [85, 180],
        [180, 84],
        [83, 84],
        [84, 181],
        [181, 83],
        [201, 83],
        [83, 182],
        [182, 201],
        [137, 93],
        [93, 132],
        [132, 137],
        [76, 62],
        [62, 183],
        [183, 76],
        [61, 76],
        [76, 184],
        [184, 61],
        [57, 61],
        [61, 185],
        [185, 57],
        [212, 57],
        [57, 186],
        [186, 212],
        [214, 207],
        [207, 187],
        [187, 214],
        [34, 143],
        [143, 156],
        [156, 34],
        [79, 239],
        [239, 237],
        [237, 79],
        [123, 137],
        [137, 177],
        [177, 123],
        [44, 1],
        [1, 4],
        [4, 44],
        [201, 194],
        [194, 32],
        [32, 201],
        [64, 102],
        [102, 129],
        [129, 64],
        [213, 215],
        [215, 138],
        [138, 213],
        [59, 166],
        [166, 219],
        [219, 59],
        [242, 99],
        [99, 97],
        [97, 242],
        [2, 94],
        [94, 141],
        [141, 2],
        [75, 59],
        [59, 235],
        [235, 75],
        [24, 110],
        [110, 228],
        [228, 24],
        [25, 130],
        [130, 226],
        [226, 25],
        [23, 24],
        [24, 229],
        [229, 23],
        [22, 23],
        [23, 230],
        [230, 22],
        [26, 22],
        [22, 231],
        [231, 26],
        [112, 26],
        [26, 232],
        [232, 112],
        [189, 190],
        [190, 243],
        [243, 189],
        [221, 56],
        [56, 190],
        [190, 221],
        [28, 56],
        [56, 221],
        [221, 28],
        [27, 28],
        [28, 222],
        [222, 27],
        [29, 27],
        [27, 223],
        [223, 29],
        [30, 29],
        [29, 224],
        [224, 30],
        [247, 30],
        [30, 225],
        [225, 247],
        [238, 79],
        [79, 20],
        [20, 238],
        [166, 59],
        [59, 75],
        [75, 166],
        [60, 75],
        [75, 240],
        [240, 60],
        [147, 177],
        [177, 215],
        [215, 147],
        [20, 79],
        [79, 166],
        [166, 20],
        [187, 147],
        [147, 213],
        [213, 187],
        [112, 233],
        [233, 244],
        [244, 112],
        [233, 128],
        [128, 245],
        [245, 233],
        [128, 114],
        [114, 188],
        [188, 128],
        [114, 217],
        [217, 174],
        [174, 114],
        [131, 115],
        [115, 220],
        [220, 131],
        [217, 198],
        [198, 236],
        [236, 217],
        [198, 131],
        [131, 134],
        [134, 198],
        [177, 132],
        [132, 58],
        [58, 177],
        [143, 35],
        [35, 124],
        [124, 143],
        [110, 163],
        [163, 7],
        [7, 110],
        [228, 110],
        [110, 25],
        [25, 228],
        [356, 389],
        [389, 368],
        [368, 356],
        [11, 302],
        [302, 267],
        [267, 11],
        [452, 350],
        [350, 349],
        [349, 452],
        [302, 303],
        [303, 269],
        [269, 302],
        [357, 343],
        [343, 277],
        [277, 357],
        [452, 453],
        [453, 357],
        [357, 452],
        [333, 332],
        [332, 297],
        [297, 333],
        [175, 152],
        [152, 377],
        [377, 175],
        [347, 348],
        [348, 330],
        [330, 347],
        [303, 304],
        [304, 270],
        [270, 303],
        [9, 336],
        [336, 337],
        [337, 9],
        [278, 279],
        [279, 360],
        [360, 278],
        [418, 262],
        [262, 431],
        [431, 418],
        [304, 408],
        [408, 409],
        [409, 304],
        [310, 415],
        [415, 407],
        [407, 310],
        [270, 409],
        [409, 410],
        [410, 270],
        [450, 348],
        [348, 347],
        [347, 450],
        [422, 430],
        [430, 434],
        [434, 422],
        [313, 314],
        [314, 17],
        [17, 313],
        [306, 307],
        [307, 375],
        [375, 306],
        [387, 388],
        [388, 260],
        [260, 387],
        [286, 414],
        [414, 398],
        [398, 286],
        [335, 406],
        [406, 418],
        [418, 335],
        [364, 367],
        [367, 416],
        [416, 364],
        [423, 358],
        [358, 327],
        [327, 423],
        [251, 284],
        [284, 298],
        [298, 251],
        [281, 5],
        [5, 4],
        [4, 281],
        [373, 374],
        [374, 253],
        [253, 373],
        [307, 320],
        [320, 321],
        [321, 307],
        [425, 427],
        [427, 411],
        [411, 425],
        [421, 313],
        [313, 18],
        [18, 421],
        [321, 405],
        [405, 406],
        [406, 321],
        [320, 404],
        [404, 405],
        [405, 320],
        [315, 16],
        [16, 17],
        [17, 315],
        [426, 425],
        [425, 266],
        [266, 426],
        [377, 400],
        [400, 369],
        [369, 377],
        [322, 391],
        [391, 269],
        [269, 322],
        [417, 465],
        [465, 464],
        [464, 417],
        [386, 257],
        [257, 258],
        [258, 386],
        [466, 260],
        [260, 388],
        [388, 466],
        [456, 399],
        [399, 419],
        [419, 456],
        [284, 332],
        [332, 333],
        [333, 284],
        [417, 285],
        [285, 8],
        [8, 417],
        [346, 340],
        [340, 261],
        [261, 346],
        [413, 441],
        [441, 285],
        [285, 413],
        [327, 460],
        [460, 328],
        [328, 327],
        [355, 371],
        [371, 329],
        [329, 355],
        [392, 439],
        [439, 438],
        [438, 392],
        [382, 341],
        [341, 256],
        [256, 382],
        [429, 420],
        [420, 360],
        [360, 429],
        [364, 394],
        [394, 379],
        [379, 364],
        [277, 343],
        [343, 437],
        [437, 277],
        [443, 444],
        [444, 283],
        [283, 443],
        [275, 440],
        [440, 363],
        [363, 275],
        [431, 262],
        [262, 369],
        [369, 431],
        [297, 338],
        [338, 337],
        [337, 297],
        [273, 375],
        [375, 321],
        [321, 273],
        [450, 451],
        [451, 349],
        [349, 450],
        [446, 342],
        [342, 467],
        [467, 446],
        [293, 334],
        [334, 282],
        [282, 293],
        [458, 461],
        [461, 462],
        [462, 458],
        [276, 353],
        [353, 383],
        [383, 276],
        [308, 324],
        [324, 325],
        [325, 308],
        [276, 300],
        [300, 293],
        [293, 276],
        [372, 345],
        [345, 447],
        [447, 372],
        [352, 345],
        [345, 340],
        [340, 352],
        [274, 1],
        [1, 19],
        [19, 274],
        [456, 248],
        [248, 281],
        [281, 456],
        [436, 427],
        [427, 425],
        [425, 436],
        [381, 256],
        [256, 252],
        [252, 381],
        [269, 391],
        [391, 393],
        [393, 269],
        [200, 199],
        [199, 428],
        [428, 200],
        [266, 330],
        [330, 329],
        [329, 266],
        [287, 273],
        [273, 422],
        [422, 287],
        [250, 462],
        [462, 328],
        [328, 250],
        [258, 286],
        [286, 384],
        [384, 258],
        [265, 353],
        [353, 342],
        [342, 265],
        [387, 259],
        [259, 257],
        [257, 387],
        [424, 431],
        [431, 430],
        [430, 424],
        [342, 353],
        [353, 276],
        [276, 342],
        [273, 335],
        [335, 424],
        [424, 273],
        [292, 325],
        [325, 307],
        [307, 292],
        [366, 447],
        [447, 345],
        [345, 366],
        [271, 303],
        [303, 302],
        [302, 271],
        [423, 266],
        [266, 371],
        [371, 423],
        [294, 455],
        [455, 460],
        [460, 294],
        [279, 278],
        [278, 294],
        [294, 279],
        [271, 272],
        [272, 304],
        [304, 271],
        [432, 434],
        [434, 427],
        [427, 432],
        [272, 407],
        [407, 408],
        [408, 272],
        [394, 430],
        [430, 431],
        [431, 394],
        [395, 369],
        [369, 400],
        [400, 395],
        [334, 333],
        [333, 299],
        [299, 334],
        [351, 417],
        [417, 168],
        [168, 351],
        [352, 280],
        [280, 411],
        [411, 352],
        [325, 319],
        [319, 320],
        [320, 325],
        [295, 296],
        [296, 336],
        [336, 295],
        [319, 403],
        [403, 404],
        [404, 319],
        [330, 348],
        [348, 349],
        [349, 330],
        [293, 298],
        [298, 333],
        [333, 293],
        [323, 454],
        [454, 447],
        [447, 323],
        [15, 16],
        [16, 315],
        [315, 15],
        [358, 429],
        [429, 279],
        [279, 358],
        [14, 15],
        [15, 316],
        [316, 14],
        [285, 336],
        [336, 9],
        [9, 285],
        [329, 349],
        [349, 350],
        [350, 329],
        [374, 380],
        [380, 252],
        [252, 374],
        [318, 402],
        [402, 403],
        [403, 318],
        [6, 197],
        [197, 419],
        [419, 6],
        [318, 319],
        [319, 325],
        [325, 318],
        [367, 364],
        [364, 365],
        [365, 367],
        [435, 367],
        [367, 397],
        [397, 435],
        [344, 438],
        [438, 439],
        [439, 344],
        [272, 271],
        [271, 311],
        [311, 272],
        [195, 5],
        [5, 281],
        [281, 195],
        [273, 287],
        [287, 291],
        [291, 273],
        [396, 428],
        [428, 199],
        [199, 396],
        [311, 271],
        [271, 268],
        [268, 311],
        [283, 444],
        [444, 445],
        [445, 283],
        [373, 254],
        [254, 339],
        [339, 373],
        [282, 334],
        [334, 296],
        [296, 282],
        [449, 347],
        [347, 346],
        [346, 449],
        [264, 447],
        [447, 454],
        [454, 264],
        [336, 296],
        [296, 299],
        [299, 336],
        [338, 10],
        [10, 151],
        [151, 338],
        [278, 439],
        [439, 455],
        [455, 278],
        [292, 407],
        [407, 415],
        [415, 292],
        [358, 371],
        [371, 355],
        [355, 358],
        [340, 345],
        [345, 372],
        [372, 340],
        [346, 347],
        [347, 280],
        [280, 346],
        [442, 443],
        [443, 282],
        [282, 442],
        [19, 94],
        [94, 370],
        [370, 19],
        [441, 442],
        [442, 295],
        [295, 441],
        [248, 419],
        [419, 197],
        [197, 248],
        [263, 255],
        [255, 359],
        [359, 263],
        [440, 275],
        [275, 274],
        [274, 440],
        [300, 383],
        [383, 368],
        [368, 300],
        [351, 412],
        [412, 465],
        [465, 351],
        [263, 467],
        [467, 466],
        [466, 263],
        [301, 368],
        [368, 389],
        [389, 301],
        [395, 378],
        [378, 379],
        [379, 395],
        [412, 351],
        [351, 419],
        [419, 412],
        [436, 426],
        [426, 322],
        [322, 436],
        [2, 164],
        [164, 393],
        [393, 2],
        [370, 462],
        [462, 461],
        [461, 370],
        [164, 0],
        [0, 267],
        [267, 164],
        [302, 11],
        [11, 12],
        [12, 302],
        [268, 12],
        [12, 13],
        [13, 268],
        [293, 300],
        [300, 301],
        [301, 293],
        [446, 261],
        [261, 340],
        [340, 446],
        [330, 266],
        [266, 425],
        [425, 330],
        [426, 423],
        [423, 391],
        [391, 426],
        [429, 355],
        [355, 437],
        [437, 429],
        [391, 327],
        [327, 326],
        [326, 391],
        [440, 457],
        [457, 438],
        [438, 440],
        [341, 382],
        [382, 362],
        [362, 341],
        [459, 457],
        [457, 461],
        [461, 459],
        [434, 430],
        [430, 394],
        [394, 434],
        [414, 463],
        [463, 362],
        [362, 414],
        [396, 369],
        [369, 262],
        [262, 396],
        [354, 461],
        [461, 457],
        [457, 354],
        [316, 403],
        [403, 402],
        [402, 316],
        [315, 404],
        [404, 403],
        [403, 315],
        [314, 405],
        [405, 404],
        [404, 314],
        [313, 406],
        [406, 405],
        [405, 313],
        [421, 418],
        [418, 406],
        [406, 421],
        [366, 401],
        [401, 361],
        [361, 366],
        [306, 408],
        [408, 407],
        [407, 306],
        [291, 409],
        [409, 408],
        [408, 291],
        [287, 410],
        [410, 409],
        [409, 287],
        [432, 436],
        [436, 410],
        [410, 432],
        [434, 416],
        [416, 411],
        [411, 434],
        [264, 368],
        [368, 383],
        [383, 264],
        [309, 438],
        [438, 457],
        [457, 309],
        [352, 376],
        [376, 401],
        [401, 352],
        [274, 275],
        [275, 4],
        [4, 274],
        [421, 428],
        [428, 262],
        [262, 421],
        [294, 327],
        [327, 358],
        [358, 294],
        [433, 416],
        [416, 367],
        [367, 433],
        [289, 455],
        [455, 439],
        [439, 289],
        [462, 370],
        [370, 326],
        [326, 462],
        [2, 326],
        [326, 370],
        [370, 2],
        [305, 460],
        [460, 455],
        [455, 305],
        [254, 449],
        [449, 448],
        [448, 254],
        [255, 261],
        [261, 446],
        [446, 255],
        [253, 450],
        [450, 449],
        [449, 253],
        [252, 451],
        [451, 450],
        [450, 252],
        [256, 452],
        [452, 451],
        [451, 256],
        [341, 453],
        [453, 452],
        [452, 341],
        [413, 464],
        [464, 463],
        [463, 413],
        [441, 413],
        [413, 414],
        [414, 441],
        [258, 442],
        [442, 441],
        [441, 258],
        [257, 443],
        [443, 442],
        [442, 257],
        [259, 444],
        [444, 443],
        [443, 259],
        [260, 445],
        [445, 444],
        [444, 260],
        [467, 342],
        [342, 445],
        [445, 467],
        [459, 458],
        [458, 250],
        [250, 459],
        [289, 392],
        [392, 290],
        [290, 289],
        [290, 328],
        [328, 460],
        [460, 290],
        [376, 433],
        [433, 435],
        [435, 376],
        [250, 290],
        [290, 392],
        [392, 250],
        [411, 416],
        [416, 433],
        [433, 411],
        [341, 463],
        [463, 464],
        [464, 341],
        [453, 464],
        [464, 465],
        [465, 453],
        [357, 465],
        [465, 412],
        [412, 357],
        [343, 412],
        [412, 399],
        [399, 343],
        [360, 363],
        [363, 440],
        [440, 360],
        [437, 399],
        [399, 456],
        [456, 437],
        [420, 456],
        [456, 363],
        [363, 420],
        [401, 435],
        [435, 288],
        [288, 401],
        [372, 383],
        [383, 353],
        [353, 372],
        [339, 255],
        [255, 249],
        [249, 339],
        [448, 261],
        [261, 255],
        [255, 448],
        [133, 243],
        [243, 190],
        [190, 133],
        [133, 155],
        [155, 112],
        [112, 133],
        [33, 246],
        [246, 247],
        [247, 33],
        [33, 130],
        [130, 25],
        [25, 33],
        [398, 384],
        [384, 286],
        [286, 398],
        [362, 398],
        [398, 414],
        [414, 362],
        [362, 463],
        [463, 341],
        [341, 362],
        [263, 359],
        [359, 467],
        [467, 263],
        [263, 249],
        [249, 255],
        [255, 263],
        [466, 467],
        [467, 260],
        [260, 466],
        [75, 60],
        [60, 166],
        [166, 75],
        [238, 239],
        [239, 79],
        [79, 238],
        [162, 127],
        [127, 139],
        [139, 162],
        [72, 11],
        [11, 37],
        [37, 72],
        [121, 232],
        [232, 120],
        [120, 121],
        [73, 72],
        [72, 39],
        [39, 73],
        [114, 128],
        [128, 47],
        [47, 114],
        [233, 232],
        [232, 128],
        [128, 233],
        [103, 104],
        [104, 67],
        [67, 103],
        [152, 175],
        [175, 148],
        [148, 152],
        [119, 118],
        [118, 101],
        [101, 119],
        [74, 73],
        [73, 40],
        [40, 74],
        [107, 9],
        [9, 108],
        [108, 107],
        [49, 48],
        [48, 131],
        [131, 49],
        [32, 194],
        [194, 211],
        [211, 32],
        [184, 74],
        [74, 185],
        [185, 184],
        [191, 80],
        [80, 183],
        [183, 191],
        [185, 40],
        [40, 186],
        [186, 185],
        [119, 230],
        [230, 118],
        [118, 119],
        [210, 202],
        [202, 214],
        [214, 210],
        [84, 83],
        [83, 17],
        [17, 84],
        [77, 76],
        [76, 146],
        [146, 77],
        [161, 160],
        [160, 30],
        [30, 161],
        [190, 56],
        [56, 173],
        [173, 190],
        [182, 106],
        [106, 194],
        [194, 182],
        [138, 135],
        [135, 192],
        [192, 138],
        [129, 203],
        [203, 98],
        [98, 129],
        [54, 21],
        [21, 68],
        [68, 54],
        [5, 51],
        [51, 4],
        [4, 5],
        [145, 144],
        [144, 23],
        [23, 145],
        [90, 77],
        [77, 91],
        [91, 90],
        [207, 205],
        [205, 187],
        [187, 207],
        [83, 201],
        [201, 18],
        [18, 83],
        [181, 91],
        [91, 182],
        [182, 181],
        [180, 90],
        [90, 181],
        [181, 180],
        [16, 85],
        [85, 17],
        [17, 16],
        [205, 206],
        [206, 36],
        [36, 205],
        [176, 148],
        [148, 140],
        [140, 176],
        [165, 92],
        [92, 39],
        [39, 165],
        [245, 193],
        [193, 244],
        [244, 245],
        [27, 159],
        [159, 28],
        [28, 27],
        [30, 247],
        [247, 161],
        [161, 30],
        [174, 236],
        [236, 196],
        [196, 174],
        [103, 54],
        [54, 104],
        [104, 103],
        [55, 193],
        [193, 8],
        [8, 55],
        [111, 117],
        [117, 31],
        [31, 111],
        [221, 189],
        [189, 55],
        [55, 221],
        [240, 98],
        [98, 99],
        [99, 240],
        [142, 126],
        [126, 100],
        [100, 142],
        [219, 166],
        [166, 218],
        [218, 219],
        [112, 155],
        [155, 26],
        [26, 112],
        [198, 209],
        [209, 131],
        [131, 198],
        [169, 135],
        [135, 150],
        [150, 169],
        [114, 47],
        [47, 217],
        [217, 114],
        [224, 223],
        [223, 53],
        [53, 224],
        [220, 45],
        [45, 134],
        [134, 220],
        [32, 211],
        [211, 140],
        [140, 32],
        [109, 67],
        [67, 108],
        [108, 109],
        [146, 43],
        [43, 91],
        [91, 146],
        [231, 230],
        [230, 120],
        [120, 231],
        [113, 226],
        [226, 247],
        [247, 113],
        [105, 63],
        [63, 52],
        [52, 105],
        [241, 238],
        [238, 242],
        [242, 241],
        [124, 46],
        [46, 156],
        [156, 124],
        [95, 78],
        [78, 96],
        [96, 95],
        [70, 46],
        [46, 63],
        [63, 70],
        [116, 143],
        [143, 227],
        [227, 116],
        [116, 123],
        [123, 111],
        [111, 116],
        [1, 44],
        [44, 19],
        [19, 1],
        [3, 236],
        [236, 51],
        [51, 3],
        [207, 216],
        [216, 205],
        [205, 207],
        [26, 154],
        [154, 22],
        [22, 26],
        [165, 39],
        [39, 167],
        [167, 165],
        [199, 200],
        [200, 208],
        [208, 199],
        [101, 36],
        [36, 100],
        [100, 101],
        [43, 57],
        [57, 202],
        [202, 43],
        [242, 20],
        [20, 99],
        [99, 242],
        [56, 28],
        [28, 157],
        [157, 56],
        [124, 35],
        [35, 113],
        [113, 124],
        [29, 160],
        [160, 27],
        [27, 29],
        [211, 204],
        [204, 210],
        [210, 211],
        [124, 113],
        [113, 46],
        [46, 124],
        [106, 43],
        [43, 204],
        [204, 106],
        [96, 62],
        [62, 77],
        [77, 96],
        [227, 137],
        [137, 116],
        [116, 227],
        [73, 41],
        [41, 72],
        [72, 73],
        [36, 203],
        [203, 142],
        [142, 36],
        [235, 64],
        [64, 240],
        [240, 235],
        [48, 49],
        [49, 64],
        [64, 48],
        [42, 41],
        [41, 74],
        [74, 42],
        [214, 212],
        [212, 207],
        [207, 214],
        [183, 42],
        [42, 184],
        [184, 183],
        [210, 169],
        [169, 211],
        [211, 210],
        [140, 170],
        [170, 176],
        [176, 140],
        [104, 105],
        [105, 69],
        [69, 104],
        [193, 122],
        [122, 168],
        [168, 193],
        [50, 123],
        [123, 187],
        [187, 50],
        [89, 96],
        [96, 90],
        [90, 89],
        [66, 65],
        [65, 107],
        [107, 66],
        [179, 89],
        [89, 180],
        [180, 179],
        [119, 101],
        [101, 120],
        [120, 119],
        [68, 63],
        [63, 104],
        [104, 68],
        [234, 93],
        [93, 227],
        [227, 234],
        [16, 15],
        [15, 85],
        [85, 16],
        [209, 129],
        [129, 49],
        [49, 209],
        [15, 14],
        [14, 86],
        [86, 15],
        [107, 55],
        [55, 9],
        [9, 107],
        [120, 100],
        [100, 121],
        [121, 120],
        [153, 145],
        [145, 22],
        [22, 153],
        [178, 88],
        [88, 179],
        [179, 178],
        [197, 6],
        [6, 196],
        [196, 197],
        [89, 88],
        [88, 96],
        [96, 89],
        [135, 138],
        [138, 136],
        [136, 135],
        [138, 215],
        [215, 172],
        [172, 138],
        [218, 115],
        [115, 219],
        [219, 218],
        [41, 42],
        [42, 81],
        [81, 41],
        [5, 195],
        [195, 51],
        [51, 5],
        [57, 43],
        [43, 61],
        [61, 57],
        [208, 171],
        [171, 199],
        [199, 208],
        [41, 81],
        [81, 38],
        [38, 41],
        [224, 53],
        [53, 225],
        [225, 224],
        [24, 144],
        [144, 110],
        [110, 24],
        [105, 52],
        [52, 66],
        [66, 105],
        [118, 229],
        [229, 117],
        [117, 118],
        [227, 34],
        [34, 234],
        [234, 227],
        [66, 107],
        [107, 69],
        [69, 66],
        [10, 109],
        [109, 151],
        [151, 10],
        [219, 48],
        [48, 235],
        [235, 219],
        [183, 62],
        [62, 191],
        [191, 183],
        [142, 129],
        [129, 126],
        [126, 142],
        [116, 111],
        [111, 143],
        [143, 116],
        [118, 117],
        [117, 50],
        [50, 118],
        [223, 222],
        [222, 52],
        [52, 223],
        [94, 19],
        [19, 141],
        [141, 94],
        [222, 221],
        [221, 65],
        [65, 222],
        [196, 3],
        [3, 197],
        [197, 196],
        [45, 220],
        [220, 44],
        [44, 45],
        [156, 70],
        [70, 139],
        [139, 156],
        [188, 122],
        [122, 245],
        [245, 188],
        [139, 71],
        [71, 162],
        [162, 139],
        [149, 170],
        [170, 150],
        [150, 149],
        [122, 188],
        [188, 196],
        [196, 122],
        [206, 216],
        [216, 92],
        [92, 206],
        [164, 2],
        [2, 167],
        [167, 164],
        [242, 141],
        [141, 241],
        [241, 242],
        [0, 164],
        [164, 37],
        [37, 0],
        [11, 72],
        [72, 12],
        [12, 11],
        [12, 38],
        [38, 13],
        [13, 12],
        [70, 63],
        [63, 71],
        [71, 70],
        [31, 226],
        [226, 111],
        [111, 31],
        [36, 101],
        [101, 205],
        [205, 36],
        [203, 206],
        [206, 165],
        [165, 203],
        [126, 209],
        [209, 217],
        [217, 126],
        [98, 165],
        [165, 97],
        [97, 98],
        [237, 220],
        [220, 218],
        [218, 237],
        [237, 239],
        [239, 241],
        [241, 237],
        [210, 214],
        [214, 169],
        [169, 210],
        [140, 171],
        [171, 32],
        [32, 140],
        [241, 125],
        [125, 237],
        [237, 241],
        [179, 86],
        [86, 178],
        [178, 179],
        [180, 85],
        [85, 179],
        [179, 180],
        [181, 84],
        [84, 180],
        [180, 181],
        [182, 83],
        [83, 181],
        [181, 182],
        [194, 201],
        [201, 182],
        [182, 194],
        [177, 137],
        [137, 132],
        [132, 177],
        [184, 76],
        [76, 183],
        [183, 184],
        [185, 61],
        [61, 184],
        [184, 185],
        [186, 57],
        [57, 185],
        [185, 186],
        [216, 212],
        [212, 186],
        [186, 216],
        [192, 214],
        [214, 187],
        [187, 192],
        [139, 34],
        [34, 156],
        [156, 139],
        [218, 79],
        [79, 237],
        [237, 218],
        [147, 123],
        [123, 177],
        [177, 147],
        [45, 44],
        [44, 4],
        [4, 45],
        [208, 201],
        [201, 32],
        [32, 208],
        [98, 64],
        [64, 129],
        [129, 98],
        [192, 213],
        [213, 138],
        [138, 192],
        [235, 59],
        [59, 219],
        [219, 235],
        [141, 242],
        [242, 97],
        [97, 141],
        [97, 2],
        [2, 141],
        [141, 97],
        [240, 75],
        [75, 235],
        [235, 240],
        [229, 24],
        [24, 228],
        [228, 229],
        [31, 25],
        [25, 226],
        [226, 31],
        [230, 23],
        [23, 229],
        [229, 230],
        [231, 22],
        [22, 230],
        [230, 231],
        [232, 26],
        [26, 231],
        [231, 232],
        [233, 112],
        [112, 232],
        [232, 233],
        [244, 189],
        [189, 243],
        [243, 244],
        [189, 221],
        [221, 190],
        [190, 189],
        [222, 28],
        [28, 221],
        [221, 222],
        [223, 27],
        [27, 222],
        [222, 223],
        [224, 29],
        [29, 223],
        [223, 224],
        [225, 30],
        [30, 224],
        [224, 225],
        [113, 247],
        [247, 225],
        [225, 113],
        [99, 60],
        [60, 240],
        [240, 99],
        [213, 147],
        [147, 215],
        [215, 213],
        [60, 20],
        [20, 166],
        [166, 60],
        [192, 187],
        [187, 213],
        [213, 192],
        [243, 112],
        [112, 244],
        [244, 243],
        [244, 233],
        [233, 245],
        [245, 244],
        [245, 128],
        [128, 188],
        [188, 245],
        [188, 114],
        [114, 174],
        [174, 188],
        [134, 131],
        [131, 220],
        [220, 134],
        [174, 217],
        [217, 236],
        [236, 174],
        [236, 198],
        [198, 134],
        [134, 236],
        [215, 177],
        [177, 58],
        [58, 215],
        [156, 143],
        [143, 124],
        [124, 156],
        [25, 110],
        [110, 7],
        [7, 25],
        [31, 228],
        [228, 25],
        [25, 31],
        [264, 356],
        [356, 368],
        [368, 264],
        [0, 11],
        [11, 267],
        [267, 0],
        [451, 452],
        [452, 349],
        [349, 451],
        [267, 302],
        [302, 269],
        [269, 267],
        [350, 357],
        [357, 277],
        [277, 350],
        [350, 452],
        [452, 357],
        [357, 350],
        [299, 333],
        [333, 297],
        [297, 299],
        [396, 175],
        [175, 377],
        [377, 396],
        [280, 347],
        [347, 330],
        [330, 280],
        [269, 303],
        [303, 270],
        [270, 269],
        [151, 9],
        [9, 337],
        [337, 151],
        [344, 278],
        [278, 360],
        [360, 344],
        [424, 418],
        [418, 431],
        [431, 424],
        [270, 304],
        [304, 409],
        [409, 270],
        [272, 310],
        [310, 407],
        [407, 272],
        [322, 270],
        [270, 410],
        [410, 322],
        [449, 450],
        [450, 347],
        [347, 449],
        [432, 422],
        [422, 434],
        [434, 432],
        [18, 313],
        [313, 17],
        [17, 18],
        [291, 306],
        [306, 375],
        [375, 291],
        [259, 387],
        [387, 260],
        [260, 259],
        [424, 335],
        [335, 418],
        [418, 424],
        [434, 364],
        [364, 416],
        [416, 434],
        [391, 423],
        [423, 327],
        [327, 391],
        [301, 251],
        [251, 298],
        [298, 301],
        [275, 281],
        [281, 4],
        [4, 275],
        [254, 373],
        [373, 253],
        [253, 254],
        [375, 307],
        [307, 321],
        [321, 375],
        [280, 425],
        [425, 411],
        [411, 280],
        [200, 421],
        [421, 18],
        [18, 200],
        [335, 321],
        [321, 406],
        [406, 335],
        [321, 320],
        [320, 405],
        [405, 321],
        [314, 315],
        [315, 17],
        [17, 314],
        [423, 426],
        [426, 266],
        [266, 423],
        [396, 377],
        [377, 369],
        [369, 396],
        [270, 322],
        [322, 269],
        [269, 270],
        [413, 417],
        [417, 464],
        [464, 413],
        [385, 386],
        [386, 258],
        [258, 385],
        [248, 456],
        [456, 419],
        [419, 248],
        [298, 284],
        [284, 333],
        [333, 298],
        [168, 417],
        [417, 8],
        [8, 168],
        [448, 346],
        [346, 261],
        [261, 448],
        [417, 413],
        [413, 285],
        [285, 417],
        [326, 327],
        [327, 328],
        [328, 326],
        [277, 355],
        [355, 329],
        [329, 277],
        [309, 392],
        [392, 438],
        [438, 309],
        [381, 382],
        [382, 256],
        [256, 381],
        [279, 429],
        [429, 360],
        [360, 279],
        [365, 364],
        [364, 379],
        [379, 365],
        [355, 277],
        [277, 437],
        [437, 355],
        [282, 443],
        [443, 283],
        [283, 282],
        [281, 275],
        [275, 363],
        [363, 281],
        [395, 431],
        [431, 369],
        [369, 395],
        [299, 297],
        [297, 337],
        [337, 299],
        [335, 273],
        [273, 321],
        [321, 335],
        [348, 450],
        [450, 349],
        [349, 348],
        [359, 446],
        [446, 467],
        [467, 359],
        [283, 293],
        [293, 282],
        [282, 283],
        [250, 458],
        [458, 462],
        [462, 250],
        [300, 276],
        [276, 383],
        [383, 300],
        [292, 308],
        [308, 325],
        [325, 292],
        [283, 276],
        [276, 293],
        [293, 283],
        [264, 372],
        [372, 447],
        [447, 264],
        [346, 352],
        [352, 340],
        [340, 346],
        [354, 274],
        [274, 19],
        [19, 354],
        [363, 456],
        [456, 281],
        [281, 363],
        [426, 436],
        [436, 425],
        [425, 426],
        [380, 381],
        [381, 252],
        [252, 380],
        [267, 269],
        [269, 393],
        [393, 267],
        [421, 200],
        [200, 428],
        [428, 421],
        [371, 266],
        [266, 329],
        [329, 371],
        [432, 287],
        [287, 422],
        [422, 432],
        [290, 250],
        [250, 328],
        [328, 290],
        [385, 258],
        [258, 384],
        [384, 385],
        [446, 265],
        [265, 342],
        [342, 446],
        [386, 387],
        [387, 257],
        [257, 386],
        [422, 424],
        [424, 430],
        [430, 422],
        [445, 342],
        [342, 276],
        [276, 445],
        [422, 273],
        [273, 424],
        [424, 422],
        [306, 292],
        [292, 307],
        [307, 306],
        [352, 366],
        [366, 345],
        [345, 352],
        [268, 271],
        [271, 302],
        [302, 268],
        [358, 423],
        [423, 371],
        [371, 358],
        [327, 294],
        [294, 460],
        [460, 327],
        [331, 279],
        [279, 294],
        [294, 331],
        [303, 271],
        [271, 304],
        [304, 303],
        [436, 432],
        [432, 427],
        [427, 436],
        [304, 272],
        [272, 408],
        [408, 304],
        [395, 394],
        [394, 431],
        [431, 395],
        [378, 395],
        [395, 400],
        [400, 378],
        [296, 334],
        [334, 299],
        [299, 296],
        [6, 351],
        [351, 168],
        [168, 6],
        [376, 352],
        [352, 411],
        [411, 376],
        [307, 325],
        [325, 320],
        [320, 307],
        [285, 295],
        [295, 336],
        [336, 285],
        [320, 319],
        [319, 404],
        [404, 320],
        [329, 330],
        [330, 349],
        [349, 329],
        [334, 293],
        [293, 333],
        [333, 334],
        [366, 323],
        [323, 447],
        [447, 366],
        [316, 15],
        [15, 315],
        [315, 316],
        [331, 358],
        [358, 279],
        [279, 331],
        [317, 14],
        [14, 316],
        [316, 317],
        [8, 285],
        [285, 9],
        [9, 8],
        [277, 329],
        [329, 350],
        [350, 277],
        [253, 374],
        [374, 252],
        [252, 253],
        [319, 318],
        [318, 403],
        [403, 319],
        [351, 6],
        [6, 419],
        [419, 351],
        [324, 318],
        [318, 325],
        [325, 324],
        [397, 367],
        [367, 365],
        [365, 397],
        [288, 435],
        [435, 397],
        [397, 288],
        [278, 344],
        [344, 439],
        [439, 278],
        [310, 272],
        [272, 311],
        [311, 310],
        [248, 195],
        [195, 281],
        [281, 248],
        [375, 273],
        [273, 291],
        [291, 375],
        [175, 396],
        [396, 199],
        [199, 175],
        [312, 311],
        [311, 268],
        [268, 312],
        [276, 283],
        [283, 445],
        [445, 276],
        [390, 373],
        [373, 339],
        [339, 390],
        [295, 282],
        [282, 296],
        [296, 295],
        [448, 449],
        [449, 346],
        [346, 448],
        [356, 264],
        [264, 454],
        [454, 356],
        [337, 336],
        [336, 299],
        [299, 337],
        [337, 338],
        [338, 151],
        [151, 337],
        [294, 278],
        [278, 455],
        [455, 294],
        [308, 292],
        [292, 415],
        [415, 308],
        [429, 358],
        [358, 355],
        [355, 429],
        [265, 340],
        [340, 372],
        [372, 265],
        [352, 346],
        [346, 280],
        [280, 352],
        [295, 442],
        [442, 282],
        [282, 295],
        [354, 19],
        [19, 370],
        [370, 354],
        [285, 441],
        [441, 295],
        [295, 285],
        [195, 248],
        [248, 197],
        [197, 195],
        [457, 440],
        [440, 274],
        [274, 457],
        [301, 300],
        [300, 368],
        [368, 301],
        [417, 351],
        [351, 465],
        [465, 417],
        [251, 301],
        [301, 389],
        [389, 251],
        [394, 395],
        [395, 379],
        [379, 394],
        [399, 412],
        [412, 419],
        [419, 399],
        [410, 436],
        [436, 322],
        [322, 410],
        [326, 2],
        [2, 393],
        [393, 326],
        [354, 370],
        [370, 461],
        [461, 354],
        [393, 164],
        [164, 267],
        [267, 393],
        [268, 302],
        [302, 12],
        [12, 268],
        [312, 268],
        [268, 13],
        [13, 312],
        [298, 293],
        [293, 301],
        [301, 298],
        [265, 446],
        [446, 340],
        [340, 265],
        [280, 330],
        [330, 425],
        [425, 280],
        [322, 426],
        [426, 391],
        [391, 322],
        [420, 429],
        [429, 437],
        [437, 420],
        [393, 391],
        [391, 326],
        [326, 393],
        [344, 440],
        [440, 438],
        [438, 344],
        [458, 459],
        [459, 461],
        [461, 458],
        [364, 434],
        [434, 394],
        [394, 364],
        [428, 396],
        [396, 262],
        [262, 428],
        [274, 354],
        [354, 457],
        [457, 274],
        [317, 316],
        [316, 402],
        [402, 317],
        [316, 315],
        [315, 403],
        [403, 316],
        [315, 314],
        [314, 404],
        [404, 315],
        [314, 313],
        [313, 405],
        [405, 314],
        [313, 421],
        [421, 406],
        [406, 313],
        [323, 366],
        [366, 361],
        [361, 323],
        [292, 306],
        [306, 407],
        [407, 292],
        [306, 291],
        [291, 408],
        [408, 306],
        [291, 287],
        [287, 409],
        [409, 291],
        [287, 432],
        [432, 410],
        [410, 287],
        [427, 434],
        [434, 411],
        [411, 427],
        [372, 264],
        [264, 383],
        [383, 372],
        [459, 309],
        [309, 457],
        [457, 459],
        [366, 352],
        [352, 401],
        [401, 366],
        [1, 274],
        [274, 4],
        [4, 1],
        [418, 421],
        [421, 262],
        [262, 418],
        [331, 294],
        [294, 358],
        [358, 331],
        [435, 433],
        [433, 367],
        [367, 435],
        [392, 289],
        [289, 439],
        [439, 392],
        [328, 462],
        [462, 326],
        [326, 328],
        [94, 2],
        [2, 370],
        [370, 94],
        [289, 305],
        [305, 455],
        [455, 289],
        [339, 254],
        [254, 448],
        [448, 339],
        [359, 255],
        [255, 446],
        [446, 359],
        [254, 253],
        [253, 449],
        [449, 254],
        [253, 252],
        [252, 450],
        [450, 253],
        [252, 256],
        [256, 451],
        [451, 252],
        [256, 341],
        [341, 452],
        [452, 256],
        [414, 413],
        [413, 463],
        [463, 414],
        [286, 441],
        [441, 414],
        [414, 286],
        [286, 258],
        [258, 441],
        [441, 286],
        [258, 257],
        [257, 442],
        [442, 258],
        [257, 259],
        [259, 443],
        [443, 257],
        [259, 260],
        [260, 444],
        [444, 259],
        [260, 467],
        [467, 445],
        [445, 260],
        [309, 459],
        [459, 250],
        [250, 309],
        [305, 289],
        [289, 290],
        [290, 305],
        [305, 290],
        [290, 460],
        [460, 305],
        [401, 376],
        [376, 435],
        [435, 401],
        [309, 250],
        [250, 392],
        [392, 309],
        [376, 411],
        [411, 433],
        [433, 376],
        [453, 341],
        [341, 464],
        [464, 453],
        [357, 453],
        [453, 465],
        [465, 357],
        [343, 357],
        [357, 412],
        [412, 343],
        [437, 343],
        [343, 399],
        [399, 437],
        [344, 360],
        [360, 440],
        [440, 344],
        [420, 437],
        [437, 456],
        [456, 420],
        [360, 420],
        [420, 363],
        [363, 360],
        [361, 401],
        [401, 288],
        [288, 361],
        [265, 372],
        [372, 353],
        [353, 265],
        [390, 339],
        [339, 249],
        [249, 390],
        [339, 448],
        [448, 255],
        [255, 339],
    ]);
    P("matrixDataToMatrix", function (a) {
        for (var b = a.getCols(), c = a.getRows(), d = a.getPackedDataList(), e = [], g = 0; g < c; g++) e.push(Array(b));
        for (g = 0; g < c; g++)
            for (var f = 0; f < b; f++) {
                var h = 1 === a.getLayout() ? g * b + f : f * c + g;
                e[g][f] = d[h];
            }
        return e;
    });
}.call(this));
