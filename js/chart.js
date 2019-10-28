 
(function(N, I) {
    "object" === typeof module && module.exports ? (I["default"] = I, module.exports = N.document ? I(N) : I) : "function" === typeof define && define.amd ? define(function() {
        return I(N)
    }) : N.Highcharts = I(N)
})("undefined" !== typeof window ? window : this, function(N) {
    var I = function() {
        var a = "undefined" === typeof N ? "undefined" !== typeof window ? window : {} : N,
            y = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            G = y && y.createElementNS && !!y.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            k = /(edge|msie|trident)/i.test(F) &&
            !a.opera,
            c = -1 !== F.indexOf("Firefox"),
            p = -1 !== F.indexOf("Chrome"),
            t = c && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "7.0.3",
            deg2rad: 2 * Math.PI / 360,
            doc: y,
            hasBidiBug: t,
            hasTouch: y && void 0 !== y.documentElement.ontouchstart,
            isMS: k,
            isWebKit: -1 !== F.indexOf("AppleWebKit"),
            isFirefox: c,
            isChrome: p,
            isSafari: !p && -1 !== F.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: G,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        a.timers = [];
        var y = a.charts,
            F = a.doc,
            G = a.win;
        a.error = function(k, c, p) {
            var t = a.isNumber(k) ? "Highcharts error #" + k + ": www.highcharts.com/errors/" + k : k;
            p && a.fireEvent(p, "displayError", {
                code: k
            });
            if (c) throw Error(t);
            G.console && console.log(t)
        };
        a.Fx = function(a, c, p) {
            this.options = c;
            this.elem = a;
            this.prop = p
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    c = this.paths[1],
                    p = [],
                    t = this.now,
                    v = a.length,
                    w;
                if (1 === t) p = this.toD;
                else if (v === c.length && 1 > t)
                    for (; v--;) w = parseFloat(a[v]), p[v] = isNaN(w) ? c[v] : t * parseFloat(c[v] - w) + w;
                else p = c;
                this.elem.attr("d", p, null, !0)
            },
            update: function() {
                var a = this.elem,
                    c = this.prop,
                    p = this.now,
                    t = this.options.step;
                if (this[c + "Setter"]) this[c + "Setter"]();
                else a.attr ? a.element && a.attr(c, p, null, !0) : a.style[c] = p + this.unit;
                t && t.call(a, p, this)
            },
            run: function(k, c, p) {
                var t = this,
                    v = t.options,
                    w = function(a) {
                        return w.stopped ? !1 : t.step(a)
                    },
                    r = G.requestAnimationFrame ||
                    function(a) {
                        setTimeout(a, 13)
                    },
                    h = function() {
                        for (var e = 0; e < a.timers.length; e++) a.timers[e]() || a.timers.splice(e--, 1);
                        a.timers.length && r(h)
                    };
                k !== c || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = k, this.end = c, this.unit = p, this.now = this.start, this.pos = 0, w.elem = this.elem, w.prop = this.prop, w() && 1 === a.timers.push(w) && r(h)) : (delete v.curAnim[this.prop], v.complete && 0 === Object.keys(v.curAnim).length && v.complete.call(this.elem))
            },
            step: function(k) {
                var c = +new Date,
                    p, t = this.options,
                    v = this.elem,
                    w = t.complete,
                    r = t.duration,
                    h = t.curAnim;
                v.attr && !v.element ? k = !1 : k || c >= r + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), p = h[this.prop] = !0, a.objectEach(h, function(a) {
                    !0 !== a && (p = !1)
                }), p && w && w.call(v), k = !1) : (this.pos = t.easing((c - this.startTime) / r), this.now = this.start + (this.end - this.start) * this.pos, this.update(), k = !0);
                return k
            },
            initPath: function(k, c, p) {
                function t(a) {
                    var d, g;
                    for (b = a.length; b--;) d = "M" === a[b] || "L" === a[b], g = /[a-zA-Z]/.test(a[b + 3]), d && g && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2])
                }

                function v(a, g) {
                    for (; a.length < d;) {
                        a[0] = g[d - a.length];
                        var e = a.slice(0, n);
                        [].splice.apply(a, [0, 0].concat(e));
                        x && (e = a.slice(a.length - n), [].splice.apply(a, [a.length, 0].concat(e)), b--)
                    }
                    a[0] = "M"
                }

                function w(a, b) {
                    for (var e = (d - a.length) / n; 0 < e && e--;) g = a.slice().splice(a.length / u - n, n * u), g[0] = b[d - n - e * n], l && (g[n - 6] = g[n - 2], g[n - 5] = g[n - 1]), [].splice.apply(a, [a.length / u, 0].concat(g)), x && e--
                }
                c = c || "";
                var r, h = k.startX,
                    e = k.endX,
                    l = -1 < c.indexOf("C"),
                    n = l ? 7 : 3,
                    d, g, b;
                c = c.split(" ");
                p = p.slice();
                var x = k.isArea,
                    u = x ? 2 : 1,
                    H;
                l && (t(c),
                    t(p));
                if (h && e) {
                    for (b = 0; b < h.length; b++)
                        if (h[b] === e[0]) {
                            r = b;
                            break
                        } else if (h[0] === e[e.length - h.length + b]) {
                        r = b;
                        H = !0;
                        break
                    }
                    void 0 === r && (c = [])
                }
                c.length && a.isNumber(r) && (d = p.length + r * u * n, H ? (v(c, p), w(p, c)) : (v(p, c), w(c, p)));
                return [c, p]
            },
            fillSetter: function() {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            },
            strokeSetter: function() {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function() {
            var k, c = arguments,
                p, t = {},
                v = function(c, r) {
                    "object" !== typeof c && (c = {});
                    a.objectEach(r, function(h, e) {
                        !a.isObject(h, !0) || a.isClass(h) || a.isDOMElement(h) ? c[e] = r[e] : c[e] = v(c[e] || {}, h)
                    });
                    return c
                };
            !0 === c[0] && (t = c[1], c = Array.prototype.slice.call(c, 2));
            p = c.length;
            for (k = 0; k < p; k++) t = v(t, c[k]);
            return t
        };
        a.pInt = function(a, c) {
            return parseInt(a, c || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(k, c) {
            return !!k && "object" === typeof k && (!c ||
                !a.isArray(k))
        };
        a.isDOMElement = function(k) {
            return a.isObject(k) && "number" === typeof k.nodeType
        };
        a.isClass = function(k) {
            var c = k && k.constructor;
            return !(!a.isObject(k, !0) || a.isDOMElement(k) || !c || !c.name || "Object" === c.name)
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function(a, c) {
            for (var k = a.length; k--;)
                if (a[k] === c) {
                    a.splice(k, 1);
                    break
                }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(k, c, p) {
            var t;
            a.isString(c) ? a.defined(p) ? k.setAttribute(c,
                p) : k && k.getAttribute && ((t = k.getAttribute(c)) || "class" !== c || (t = k.getAttribute(c + "Name"))) : a.defined(c) && a.isObject(c) && a.objectEach(c, function(a, c) {
                k.setAttribute(c, a)
            });
            return t
        };
        a.splat = function(k) {
            return a.isArray(k) ? k : [k]
        };
        a.syncTimeout = function(a, c, p) {
            if (c) return setTimeout(a, c, p);
            a.call(0, p)
        };
        a.clearTimeout = function(k) {
            a.defined(k) && clearTimeout(k)
        };
        a.extend = function(a, c) {
            var k;
            a || (a = {});
            for (k in c) a[k] = c[k];
            return a
        };
        a.pick = function() {
            var a = arguments,
                c, p, t = a.length;
            for (c = 0; c < t; c++)
                if (p = a[c],
                    void 0 !== p && null !== p) return p
        };
        a.css = function(k, c) {
            a.isMS && !a.svg && c && void 0 !== c.opacity && (c.filter = "alpha(opacity\x3d" + 100 * c.opacity + ")");
            a.extend(k.style, c)
        };
        a.createElement = function(k, c, p, t, v) {
            k = F.createElement(k);
            var w = a.css;
            c && a.extend(k, c);
            v && w(k, {
                padding: 0,
                border: "none",
                margin: 0
            });
            p && w(k, p);
            t && t.appendChild(k);
            return k
        };
        a.extendClass = function(k, c) {
            var p = function() {};
            p.prototype = new k;
            a.extend(p.prototype, c);
            return p
        };
        a.pad = function(a, c, p) {
            return Array((c || 2) + 1 - String(a).replace("-", "").length).join(p ||
                0) + a
        };
        a.relativeLength = function(a, c, p) {
            return /%$/.test(a) ? c * parseFloat(a) / 100 + (p || 0) : parseFloat(a)
        };
        a.wrap = function(a, c, p) {
            var k = a[c];
            a[c] = function() {
                var a = Array.prototype.slice.call(arguments),
                    c = arguments,
                    r = this;
                r.proceed = function() {
                    k.apply(r, arguments.length ? arguments : c)
                };
                a.unshift(k);
                a = p.apply(this, a);
                r.proceed = null;
                return a
            }
        };
        a.datePropsToTimestamps = function(k) {
            a.objectEach(k, function(c, p) {
                a.isObject(c) && "function" === typeof c.getTime ? k[p] = c.getTime() : (a.isObject(c) || a.isArray(c)) && a.datePropsToTimestamps(c)
            })
        };
        a.formatSingle = function(k, c, p) {
            var t = /\.([0-9])/,
                v = a.defaultOptions.lang;
            /f$/.test(k) ? (p = (p = k.match(t)) ? p[1] : -1, null !== c && (c = a.numberFormat(c, p, v.decimalPoint, -1 < k.indexOf(",") ? v.thousandsSep : ""))) : c = (p || a.time).dateFormat(k, c);
            return c
        };
        a.format = function(k, c, p) {
            for (var t = "{", v = !1, w, r, h, e, l = [], n; k;) {
                t = k.indexOf(t);
                if (-1 === t) break;
                w = k.slice(0, t);
                if (v) {
                    w = w.split(":");
                    r = w.shift().split(".");
                    e = r.length;
                    n = c;
                    for (h = 0; h < e; h++) n && (n = n[r[h]]);
                    w.length && (n = a.formatSingle(w.join(":"), n, p));
                    l.push(n)
                } else l.push(w);
                k = k.slice(t + 1);
                t = (v = !v) ? "}" : "{"
            }
            l.push(k);
            return l.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(k, c, p, t, v) {
            var w, r = k;
            p = a.pick(p, 1);
            w = k / p;
            c || (c = v ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === p ? c = c.filter(function(a) {
                return 0 === a % 1
            }) : .1 >= p && (c = [1 / p])));
            for (t = 0; t < c.length && !(r = c[t], v && r * p >= k || !v && w <= (c[t] + (c[t + 1] || c[t])) / 2); t++);
            return r = a.correctFloat(r * p, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort =
            function(a, c) {
                var k = a.length,
                    t, v;
                for (v = 0; v < k; v++) a[v].safeI = v;
                a.sort(function(a, r) {
                    t = c(a, r);
                    return 0 === t ? a.safeI - r.safeI : t
                });
                for (v = 0; v < k; v++) delete a[v].safeI
            };
        a.arrayMin = function(a) {
            for (var c = a.length, k = a[0]; c--;) a[c] < k && (k = a[c]);
            return k
        };
        a.arrayMax = function(a) {
            for (var c = a.length, k = a[0]; c--;) a[c] > k && (k = a[c]);
            return k
        };
        a.destroyObjectProperties = function(k, c) {
            a.objectEach(k, function(a, t) {
                a && a !== c && a.destroy && a.destroy();
                delete k[t]
            })
        };
        a.discardElement = function(k) {
            var c = a.garbageBin;
            c || (c = a.createElement("div"));
            k && c.appendChild(k);
            c.innerHTML = ""
        };
        a.correctFloat = function(a, c) {
            return parseFloat(a.toPrecision(c || 14))
        };
        a.setAnimation = function(k, c) {
            c.renderer.globalAnimation = a.pick(k, c.options.chart.animation, !0)
        };
        a.animObject = function(k) {
            return a.isObject(k) ? a.merge(k) : {
                duration: k ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(k, c, p, t) {
            k = +k || 0;
            c = +c;
            var v = a.defaultOptions.lang,
                w = (k.toString().split(".")[1] || "").split("e")[0].length,
                r, h, e = k.toString().split("e"); - 1 === c ? c = Math.min(w, 20) : a.isNumber(c) ? c && e[1] && 0 > e[1] && (r = c + +e[1], 0 <= r ? (e[0] = (+e[0]).toExponential(r).split("e")[0], c = r) : (e[0] = e[0].split(".")[0] || 0, k = 20 > c ? (e[0] * Math.pow(10, e[1])).toFixed(c) : 0, e[1] = 0)) : c = 2;
            h = (Math.abs(e[1] ? e[0] : k) + Math.pow(10, -Math.max(c, w) - 1)).toFixed(c);
            w = String(a.pInt(h));
            r = 3 < w.length ? w.length % 3 : 0;
            p = a.pick(p, v.decimalPoint);
            t = a.pick(t, v.thousandsSep);
            k = (0 > k ? "-" : "") + (r ? w.substr(0, r) + t : "");
            k += w.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + t);
            c && (k += p + h.slice(-c));
            e[1] && 0 !== +k && (k += "e" + e[1]);
            return k
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(k, c, p) {
            if ("width" === c) return Math.max(0, Math.min(k.offsetWidth, k.scrollWidth, k.getBoundingClientRect && "none" === a.getStyle(k, "transform", !1) ? Math.floor(k.getBoundingClientRect().width) : Infinity) - a.getStyle(k, "padding-left") - a.getStyle(k, "padding-right"));
            if ("height" === c) return Math.max(0, Math.min(k.offsetHeight, k.scrollHeight) - a.getStyle(k, "padding-top") - a.getStyle(k, "padding-bottom"));
            G.getComputedStyle || a.error(27, !0);
            if (k = G.getComputedStyle(k, void 0)) k = k.getPropertyValue(c), a.pick(p, "opacity" !== c) && (k = a.pInt(k));
            return k
        };
        a.inArray = function(a, c, p) {
            return c.indexOf(a, p)
        };
        a.find = Array.prototype.find ? function(a, c) {
            return a.find(c)
        } : function(a, c) {
            var k, t = a.length;
            for (k = 0; k < t; k++)
                if (c(a[k], k)) return a[k]
        };
        a.keys = Object.keys;
        a.offset = function(a) {
            var c = F.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (G.pageYOffset || c.scrollTop) -
                    (c.clientTop || 0),
                left: a.left + (G.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
            }
        };
        a.stop = function(k, c) {
            for (var p = a.timers.length; p--;) a.timers[p].elem !== k || c && c !== a.timers[p].prop || (a.timers[p].stopped = !0)
        };
        a.objectEach = function(a, c, p) {
            for (var k in a) a.hasOwnProperty(k) && c.call(p || a[k], a[k], k, a)
        };
        a.objectEach({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(k, c) {
            a[c] = function(a) {
                return Array.prototype[k].apply(a, [].slice.call(arguments, 1))
            }
        });
        a.addEvent = function(k, c, p, t) {
            var v,
                w = k.addEventListener || a.addEventListenerPolyfill;
            v = "function" === typeof k && k.prototype ? k.prototype.protoEvents = k.prototype.protoEvents || {} : k.hcEvents = k.hcEvents || {};
            a.Point && k instanceof a.Point && k.series && k.series.chart && (k.series.chart.runTrackerClick = !0);
            w && w.call(k, c, p, !1);
            v[c] || (v[c] = []);
            v[c].push(p);
            t && a.isNumber(t.order) && (p.order = t.order, v[c].sort(function(a, h) {
                return a.order - h.order
            }));
            return function() {
                a.removeEvent(k, c, p)
            }
        };
        a.removeEvent = function(k, c, p) {
            function t(h, e) {
                var l = k.removeEventListener ||
                    a.removeEventListenerPolyfill;
                l && l.call(k, h, e, !1)
            }

            function v(h) {
                var e, l;
                k.nodeName && (c ? (e = {}, e[c] = !0) : e = h, a.objectEach(e, function(a, d) {
                    if (h[d])
                        for (l = h[d].length; l--;) t(d, h[d][l])
                }))
            }
            var w, r;
            ["protoEvents", "hcEvents"].forEach(function(a) {
                var e = k[a];
                e && (c ? (w = e[c] || [], p ? (r = w.indexOf(p), -1 < r && (w.splice(r, 1), e[c] = w), t(c, p)) : (v(e), e[c] = [])) : (v(e), k[a] = {}))
            })
        };
        a.fireEvent = function(k, c, p, t) {
            var v, w, r, h, e;
            p = p || {};
            F.createEvent && (k.dispatchEvent || k.fireEvent) ? (v = F.createEvent("Events"), v.initEvent(c, !0, !0),
                a.extend(v, p), k.dispatchEvent ? k.dispatchEvent(v) : k.fireEvent(c, v)) : ["protoEvents", "hcEvents"].forEach(function(l) {
                if (k[l])
                    for (w = k[l][c] || [], r = w.length, p.target || a.extend(p, {
                            preventDefault: function() {
                                p.defaultPrevented = !0
                            },
                            target: k,
                            type: c
                        }), h = 0; h < r; h++)(e = w[h]) && !1 === e.call(k, p) && p.preventDefault()
            });
            t && !p.defaultPrevented && t.call(k, p)
        };
        a.animate = function(k, c, p) {
            var t, v = "",
                w, r, h;
            a.isObject(p) || (h = arguments, p = {
                duration: h[2],
                easing: h[3],
                complete: h[4]
            });
            a.isNumber(p.duration) || (p.duration = 400);
            p.easing =
                "function" === typeof p.easing ? p.easing : Math[p.easing] || Math.easeInOutSine;
            p.curAnim = a.merge(c);
            a.objectEach(c, function(e, h) {
                a.stop(k, h);
                r = new a.Fx(k, p, h);
                w = null;
                "d" === h ? (r.paths = r.initPath(k, k.d, c.d), r.toD = c.d, t = 0, w = 1) : k.attr ? t = k.attr(h) : (t = parseFloat(a.getStyle(k, h)) || 0, "opacity" !== h && (v = "px"));
                w || (w = e);
                w && w.match && w.match("px") && (w = w.replace(/px/g, ""));
                r.run(t, w, v)
            })
        };
        a.seriesType = function(k, c, p, t, v) {
            var w = a.getOptions(),
                r = a.seriesTypes;
            w.plotOptions[k] = a.merge(w.plotOptions[c], p);
            r[k] = a.extendClass(r[c] ||
                function() {}, t);
            r[k].prototype.type = k;
            v && (r[k].prototype.pointClass = a.extendClass(a.Point, v));
            return r[k]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                c = 0;
            return function() {
                return "highcharts-" + a + "-" + c++
            }
        }();
        a.isFunction = function(a) {
            return "function" === typeof a
        };
        G.jQuery && (G.jQuery.fn.highcharts = function() {
            var k = [].slice.call(arguments);
            if (this[0]) return k[0] ? (new(a[a.isString(k[0]) ? k.shift() : "Chart"])(this[0], k[0], k[1]), this) : y[a.attr(this[0], "data-highcharts-chart")]
        })
    })(I);
    (function(a) {
        var y = a.isNumber,
            F = a.merge,
            G = a.pInt;
        a.Color = function(k) {
            if (!(this instanceof a.Color)) return new a.Color(k);
            this.init(k)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [G(a[1]), G(a[2]), G(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [G(a[1]), G(a[2]), G(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(k) {
                var c, p, t, v;
                if ((this.input = k = this.names[k && k.toLowerCase ? k.toLowerCase() : ""] || k) && k.stops) this.stops = k.stops.map(function(c) {
                    return new a.Color(c[1])
                });
                else if (k && k.charAt && "#" === k.charAt() && (c = k.length, k = parseInt(k.substr(1), 16), 7 === c ? p = [(k & 16711680) >> 16, (k & 65280) >> 8, k & 255, 1] : 4 === c && (p = [(k & 3840) >> 4 | (k & 3840) >> 8, (k & 240) >> 4 | k & 240, (k & 15) << 4 | k & 15, 1])), !p)
                    for (t = this.parsers.length; t-- && !p;) v = this.parsers[t], (c = v.regex.exec(k)) && (p = v.parse(c));
                this.rgba = p || []
            },
            get: function(a) {
                var c = this.input,
                    k = this.rgba,
                    t;
                this.stops ? (t = F(c), t.stops = [].concat(t.stops), this.stops.forEach(function(c, k) {
                    t.stops[k] = [t.stops[k][0], c.get(a)]
                })) : t = k && y(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : c;
                return t
            },
            brighten: function(a) {
                var c, k = this.rgba;
                if (this.stops) this.stops.forEach(function(c) {
                    c.brighten(a)
                });
                else if (y(a) && 0 !== a)
                    for (c = 0; 3 > c; c++) k[c] += G(255 * a), 0 > k[c] && (k[c] = 0), 255 < k[c] && (k[c] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function(a, c) {
                var k = this.rgba,
                    t = a.rgba;
                t.length && k && k.length ? (a = 1 !== t[3] || 1 !== k[3], c = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (k[0] - t[0]) * (1 - c)) + "," + Math.round(t[1] + (k[1] - t[1]) * (1 - c)) + "," + Math.round(t[2] + (k[2] - t[2]) * (1 - c)) + (a ? "," + (t[3] + (k[3] - t[3]) * (1 - c)) : "") + ")") : c = a.input || "none";
                return c
            }
        };
        a.color = function(k) {
            return new a.Color(k)
        }
    })(I);
    (function(a) {
        var y, F, G = a.addEvent,
            k = a.animate,
            c = a.attr,
            p = a.charts,
            t = a.color,
            v = a.css,
            w = a.createElement,
            r = a.defined,
            h = a.deg2rad,
            e = a.destroyObjectProperties,
            l = a.doc,
            n = a.extend,
            d = a.erase,
            g = a.hasTouch,
            b = a.isArray,
            x = a.isFirefox,
            u = a.isMS,
            H = a.isObject,
            E = a.isString,
            B = a.isWebKit,
            m = a.merge,
            z = a.noop,
            D = a.objectEach,
            A = a.pick,
            f = a.pInt,
            q = a.removeEvent,
            L = a.splat,
            K = a.stop,
            T = a.svg,
            J = a.SVG_NS,
            M = a.symbolSizes,
            R = a.win;
        y = a.SVGElement = function() {
            return this
        };
        n(y.prototype, {
            opacity: 1,
            SVG_NS: J,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function(f, q) {
                this.element = "span" ===
                    q ? w(q) : l.createElementNS(this.SVG_NS, q);
                this.renderer = f;
                a.fireEvent(this, "afterInit")
            },
            animate: function(f, q, d) {
                var C = a.animObject(A(q, this.renderer.globalAnimation, !0));
                A(l.hidden, l.msHidden, l.webkitHidden, !1) && (C.duration = 0);
                0 !== C.duration ? (d && (C.complete = d), k(this, f, C)) : (this.attr(f, null, d), a.objectEach(f, function(a, f) {
                    C.step && C.step.call(this, a, {
                        prop: f,
                        pos: 1
                    })
                }, this));
                return this
            },
            complexColor: function(f, q, d) {
                var C = this.renderer,
                    g, e, n, h, J, z, l, P, x, c, u, K = [],
                    L;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    f.radialGradient ? e = "radialGradient" : f.linearGradient && (e = "linearGradient");
                    e && (n = f[e], J = C.gradients, l = f.stops, c = d.radialReference, b(n) && (f[e] = n = {
                        x1: n[0],
                        y1: n[1],
                        x2: n[2],
                        y2: n[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === e && c && !r(n.gradientUnits) && (h = n, n = m(n, C.getRadialAttr(c, h), {
                        gradientUnits: "userSpaceOnUse"
                    })), D(n, function(a, f) {
                        "id" !== f && K.push(f, a)
                    }), D(l, function(a) {
                        K.push(a)
                    }), K = K.join(","), J[K] ? u = J[K].attr("id") : (n.id = u = a.uniqueKey(), J[K] = z = C.createElement(e).attr(n).add(C.defs),
                        z.radAttr = h, z.stops = [], l.forEach(function(f) {
                            0 === f[1].indexOf("rgba") ? (g = a.color(f[1]), P = g.get("rgb"), x = g.get("a")) : (P = f[1], x = 1);
                            f = C.createElement("stop").attr({
                                offset: f[0],
                                "stop-color": P,
                                "stop-opacity": x
                            }).add(z);
                            z.stops.push(f)
                        })), L = "url(" + C.url + "#" + u + ")", d.setAttribute(q, L), d.gradient = K, f.toString = function() {
                        return L
                    })
                })
            },
            applyTextOutline: function(f) {
                var C = this.element,
                    q, b, g, e, m; - 1 !== f.indexOf("contrast") && (f = f.replace(/contrast/g, this.renderer.getContrast(C.style.fill)));
                f = f.split(" ");
                b = f[f.length -
                    1];
                if ((g = f[0]) && "none" !== g && a.svg) {
                    this.fakeTS = !0;
                    f = [].slice.call(C.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    g = g.replace(/(^[\d\.]+)(.*?)$/g, function(a, f, C) {
                        return 2 * f + C
                    });
                    for (m = f.length; m--;) q = f[m], "highcharts-text-outline" === q.getAttribute("class") && d(f, C.removeChild(q));
                    e = C.firstChild;
                    f.forEach(function(a, f) {
                        0 === f && (a.setAttribute("x", C.getAttribute("x")), f = C.getAttribute("y"), a.setAttribute("y", f || 0), null === f && C.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        c(a, {
                            "class": "highcharts-text-outline",
                            fill: b,
                            stroke: b,
                            "stroke-width": g,
                            "stroke-linejoin": "round"
                        });
                        C.insertBefore(a, e)
                    })
                }
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function(f, q, d, b) {
                var C, g = this.element,
                    e, m = this,
                    n, h, J = this.symbolCustomAttribs;
                "string" === typeof f && void 0 !== q && (C = f, f = {}, f[C] = q);
                "string" === typeof f ? m = (this[f + "Getter"] || this._defaultGetter).call(this, f, g) : (D(f, function(C, q) {
                    n = !1;
                    b || K(this, q);
                    this.symbolName && -1 !== a.inArray(q, J) && (e || (this.symbolAttr(f), e = !0), n = !0);
                    !this.rotation || "x" !== q && "y" !== q || (this.doTransform = !0);
                    n || (h = this[q + "Setter"] || this._defaultSetter, h.call(this, C, q, g), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(q) && this.updateShadows(q, C, h))
                }, this), this.afterSetters());
                d && d.call(this);
                return m
            },
            afterSetters: function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function(a, f, q) {
                for (var C = this.shadows, d = C.length; d--;) q.call(C[d], "height" === a ? Math.max(f - (C[d].cutHeight ||
                    0), 0) : "d" === a ? this.d : f, a, C[d])
            },
            addClass: function(a, f) {
                var C = this.attr("class") || ""; - 1 === C.indexOf(a) && (f || (a = (C + (C ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
            },
            removeClass: function(a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function(a) {
                var f = this;
                "x y r start end width height innerR anchorX anchorY".split(" ").forEach(function(C) {
                    f[C] = A(a[C], f[C])
                });
                f.attr({
                    d: f.renderer.symbols[f.symbolName](f.x,
                        f.y, f.width, f.height, f)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, f) {
                var C;
                f = f || a.strokeWidth || 0;
                C = Math.round(f) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + C;
                a.y = Math.floor(a.y || this.y || 0) + C;
                a.width = Math.floor((a.width || this.width || 0) - 2 * C);
                a.height = Math.floor((a.height || this.height || 0) - 2 * C);
                r(a.strokeWidth) && (a.strokeWidth = f);
                return a
            },
            css: function(a) {
                var C = this.styles,
                    q = {},
                    d = this.element,
                    b, g = "",
                    e, m = !C,
                    h = ["textOutline", "textOverflow",
                        "width"
                    ];
                a && a.color && (a.fill = a.color);
                C && D(a, function(a, f) {
                    a !== C[f] && (q[f] = a, m = !0)
                });
                m && (C && (a = n(C, q)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === d.nodeName.toLowerCase() && a.width && (b = this.textWidth = f(a.width))), this.styles = a, b && !T && this.renderer.forExport && delete a.width, d.namespaceURI === this.SVG_NS ? (e = function(a, f) {
                    return "-" + f.toLowerCase()
                }, D(a, function(a, f) {
                    -1 === h.indexOf(f) && (g += f.replace(/([A-Z])/g, e) + ":" + a + ";")
                }), g && c(d, "style", g)) : v(d, a), this.added && ("text" === this.element.nodeName &&
                    this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function(a) {
                return R.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function() {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"),
                    q;
                a.indexOf("px") === a.length - 2 ? a = f(a) : (q = l.createElementNS(J, "rect"), c(q, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(q), a = q.getBBox().width, q.parentNode.removeChild(q));
                return a
            },
            on: function(a, f) {
                var C = this,
                    q = C.element;
                g && "click" === a ? (q.ontouchstart = function(a) {
                    C.touchEventFired = Date.now();
                    a.preventDefault();
                    f.call(q, a)
                }, q.onclick = function(a) {
                    (-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (C.touchEventFired || 0)) && f.call(q, a)
                }) : q["on" + a] = f;
                return this
            },
            setRadialReference: function(a) {
                var f = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                f && f.radAttr && f.animate(this.renderer.getRadialAttr(a, f.radAttr));
                return this
            },
            translate: function(a,
                f) {
                return this.attr({
                    translateX: a,
                    translateY: f
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a = this.translateX || 0,
                    f = this.translateY || 0,
                    q = this.scaleX,
                    d = this.scaleY,
                    b = this.inverted,
                    g = this.rotation,
                    e = this.matrix,
                    m = this.element;
                b && (a += this.width, f += this.height);
                a = ["translate(" + a + "," + f + ")"];
                r(e) && a.push("matrix(" + e.join(",") + ")");
                b ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + A(this.rotationOriginX, m.getAttribute("x"), 0) + " " + A(this.rotationOriginY,
                    m.getAttribute("y") || 0) + ")");
                (r(q) || r(d)) && a.push("scale(" + A(q, 1) + " " + A(d, 1) + ")");
                a.length && m.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, f, q) {
                var C, b, g, e, m = {};
                b = this.renderer;
                g = b.alignedObjects;
                var n, h;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = f, !q || E(q)) this.alignTo = C = q || "renderer", d(g, this), g.push(this), q = null
                } else a = this.alignOptions, f = this.alignByTranslate, C = this.alignTo;
                q = A(q, b[C], b);
                C = a.align;
                b = a.verticalAlign;
                g = (q.x || 0) + (a.x || 0);
                e = (q.y || 0) + (a.y || 0);
                "right" === C ? n = 1 : "center" === C && (n = 2);
                n && (g += (q.width - (a.width || 0)) / n);
                m[f ? "translateX" : "x"] = Math.round(g);
                "bottom" === b ? h = 1 : "middle" === b && (h = 2);
                h && (e += (q.height - (a.height || 0)) / h);
                m[f ? "translateY" : "y"] = Math.round(e);
                this[this.placed ? "animate" : "attr"](m);
                this.placed = !0;
                this.alignAttr = m;
                return this
            },
            getBBox: function(a, f) {
                var q, C = this.renderer,
                    d, b = this.element,
                    g = this.styles,
                    e, m = this.textStr,
                    J, z = C.cache,
                    l = C.cacheKeys,
                    x = b.namespaceURI === this.SVG_NS,
                    c;
                f = A(f, this.rotation);
                d = f * h;
                e = C.styledMode ? b && y.prototype.getStyle.call(b, "font-size") : g && g.fontSize;
                r(m) && (c = m.toString(), -1 === c.indexOf("\x3c") && (c = c.replace(/[0-9]/g, "0")), c += ["", f || 0, e, this.textWidth, g && g.textOverflow].join());
                c && !a && (q = z[c]);
                if (!q) {
                    if (x || C.forExport) {
                        try {
                            (J = this.fakeTS && function(a) {
                                [].forEach.call(b.querySelectorAll(".highcharts-text-outline"), function(f) {
                                    f.style.display = a
                                })
                            }) && J("none"), q = b.getBBox ? n({}, b.getBBox()) : {
                                width: b.offsetWidth,
                                height: b.offsetHeight
                            }, J && J("")
                        } catch (Y) {}
                        if (!q ||
                            0 > q.width) q = {
                            width: 0,
                            height: 0
                        }
                    } else q = this.htmlGetBBox();
                    C.isSVG && (a = q.width, C = q.height, x && (q.height = C = {
                        "11px,17": 14,
                        "13px,20": 16
                    } [g && g.fontSize + "," + Math.round(C)] || C), f && (q.width = Math.abs(C * Math.sin(d)) + Math.abs(a * Math.cos(d)), q.height = Math.abs(C * Math.cos(d)) + Math.abs(a * Math.sin(d))));
                    if (c && 0 < q.height) {
                        for (; 250 < l.length;) delete z[l.shift()];
                        z[c] || l.push(c);
                        z[c] = q
                    }
                }
                return q
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var f = this;
                f.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        f.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var f = this.renderer,
                    q = this.element,
                    C;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && f.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) C = this.zIndexSetter();
                C || (a ? a.element : f.box).appendChild(q);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var f = a.parentNode;
                f && f.removeChild(a)
            },
            destroy: function() {
                var a =
                    this,
                    f = a.element || {},
                    q = a.renderer,
                    b = q.isSVG && "SPAN" === f.nodeName && a.parentGroup,
                    g = f.ownerSVGElement,
                    e = a.clipPath;
                f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;
                K(a);
                e && g && ([].forEach.call(g.querySelectorAll("[clip-path],[CLIP-PATH]"), function(a) {
                    var f = a.getAttribute("clip-path"),
                        q = e.element.id;
                    (-1 < f.indexOf("(#" + q + ")") || -1 < f.indexOf('("#' + q + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = e.destroy());
                if (a.stops) {
                    for (g = 0; g < a.stops.length; g++) a.stops[g] = a.stops[g].destroy();
                    a.stops =
                        null
                }
                a.safeRemoveChild(f);
                for (q.styledMode || a.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) f = b.parentGroup, a.safeRemoveChild(b.div), delete b.div, b = f;
                a.alignTo && d(q.alignedObjects, a);
                D(a, function(f, q) {
                    delete a[q]
                });
                return null
            },
            shadow: function(a, f, q) {
                var d = [],
                    C, b, g = this.element,
                    e, m, n, h;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    m = A(a.width, 3);
                    n = (a.opacity || .15) / m;
                    h = this.parentInverted ? "(-1,-1)" : "(" + A(a.offsetX, 1) + ", " + A(a.offsetY, 1) + ")";
                    for (C = 1; C <= m; C++) b = g.cloneNode(0), e = 2 * m + 1 -
                        2 * C, c(b, {
                            stroke: a.color || "#000000",
                            "stroke-opacity": n * C,
                            "stroke-width": e,
                            transform: "translate" + h,
                            fill: "none"
                        }), b.setAttribute("class", (b.getAttribute("class") || "") + " highcharts-shadow"), q && (c(b, "height", Math.max(c(b, "height") - e, 0)), b.cutHeight = e), f ? f.element.appendChild(b) : g.parentNode && g.parentNode.insertBefore(b, g), d.push(b);
                    this.shadows = d
                }
                return this
            },
            destroyShadows: function() {
                (this.shadows || []).forEach(function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" ===
                this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = A(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, f, q) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[f] !== a && (q.setAttribute(f, a), this[f] = a)
            },
            dashstyleSetter: function(a) {
                var q, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot",
                        "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (q = a.length; q--;) a[q] = f(a[q]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                var f = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                f[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", f[a]))
            },
            opacitySetter: function(a, f,
                q) {
                this[f] = a;
                q.setAttribute(f, a)
            },
            titleSetter: function(a) {
                var f = this.element.getElementsByTagName("title")[0];
                f || (f = l.createElementNS(this.SVG_NS, "title"), this.element.appendChild(f));
                f.firstChild && f.removeChild(f.firstChild);
                f.appendChild(l.createTextNode(String(A(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, f, q) {
                "string" ===
                typeof a ? q.setAttribute(f, a) : a && this.complexColor(a, f, q)
            },
            visibilitySetter: function(a, f, q) {
                "inherit" === a ? q.removeAttribute(f) : this[f] !== a && q.setAttribute(f, a);
                this[f] = a
            },
            zIndexSetter: function(a, q) {
                var b = this.renderer,
                    d = this.parentGroup,
                    g = (d || b).element || b.box,
                    e, m = this.element,
                    C, n, b = g === b.box;
                e = this.added;
                var h;
                r(a) ? (m.setAttribute("data-z-index", a), a = +a, this[q] === a && (e = !1)) : r(this[q]) && m.removeAttribute("data-z-index");
                this[q] = a;
                if (e) {
                    (a = this.zIndex) && d && (d.handleZ = !0);
                    q = g.childNodes;
                    for (h = q.length -
                        1; 0 <= h && !C; h--)
                        if (d = q[h], e = d.getAttribute("data-z-index"), n = !r(e), d !== m)
                            if (0 > a && n && !b && !h) g.insertBefore(m, q[h]), C = !0;
                            else if (f(e) <= a || n && (!r(a) || 0 <= a)) g.insertBefore(m, q[h + 1] || null), C = !0;
                    C || (g.insertBefore(m, q[b ? 3 : 0] || null), C = !0)
                }
                return C
            },
            _defaultSetter: function(a, f, q) {
                q.setAttribute(f, a)
            }
        });
        y.prototype.yGetter = y.prototype.xGetter;
        y.prototype.translateXSetter = y.prototype.translateYSetter = y.prototype.rotationSetter = y.prototype.verticalAlignSetter = y.prototype.rotationOriginXSetter = y.prototype.rotationOriginYSetter =
            y.prototype.scaleXSetter = y.prototype.scaleYSetter = y.prototype.matrixSetter = function(a, f) {
                this[f] = a;
                this.doTransform = !0
            };
        y.prototype["stroke-widthSetter"] = y.prototype.strokeSetter = function(a, f, q) {
            this[f] = a;
            this.stroke && this["stroke-width"] ? (y.prototype.fillSetter.call(this, this.stroke, "stroke", q), q.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === f && 0 === a && this.hasStroke && (q.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function() {
            this.init.apply(this,
                arguments)
        };
        n(F.prototype, {
            Element: y,
            SVG_NS: J,
            init: function(a, f, q, b, d, g, e) {
                var m;
                m = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                });
                e || m.css(this.getStyle(b));
                b = m.element;
                a.appendChild(b);
                c(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && c(b, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = b;
                this.boxWrapper = m;
                this.alignedObjects = [];
                this.url = (x || B) && l.getElementsByTagName("base").length ? R.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g,
                    "%20") : "";
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highcharts 7.0.3"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = g;
                this.forExport = d;
                this.styledMode = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, q, !1);
                var n;
                x && a.getBoundingClientRect && (f = function() {
                    v(a, {
                        left: 0,
                        top: 0
                    });
                    n = a.getBoundingClientRect();
                    v(a, {
                        left: Math.ceil(n.left) - n.left + "px",
                        top: Math.ceil(n.top) - n.top + "px"
                    })
                }, f(), this.unSubPixelFix = G(R, "resize",
                    f))
            },
            definition: function(a) {
                function f(a, b) {
                    var d;
                    L(a).forEach(function(a) {
                        var g = q.createElement(a.tagName),
                            e = {};
                        D(a, function(a, f) {
                            "tagName" !== f && "children" !== f && "textContent" !== f && (e[f] = a)
                        });
                        g.attr(e);
                        g.add(b || q.defs);
                        a.textContent && g.element.appendChild(l.createTextNode(a.textContent));
                        f(a.children || [], g);
                        d = g
                    });
                    return d
                }
                var q = this;
                return f(a)
            },
            getStyle: function(a) {
                return this.style = n({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                e(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var f = new this.Element;
                f.init(this, a);
                return f
            },
            draw: z,
            getRadialAttr: function(a, f) {
                return {
                    cx: a[0] - a[2] / 2 + f.cx * a[2],
                    cy: a[1] - a[2] / 2 + f.cy * a[2],
                    r: f.r * a[2]
                }
            },
            truncate: function(a, f, q, b, d,
                g, e) {
                var m = this,
                    n = a.rotation,
                    h, C = b ? 1 : 0,
                    J = (q || b).length,
                    z = J,
                    c = [],
                    r = function(a) {
                        f.firstChild && f.removeChild(f.firstChild);
                        a && f.appendChild(l.createTextNode(a))
                    },
                    x = function(g, n) {
                        n = n || g;
                        if (void 0 === c[n])
                            if (f.getSubStringLength) try {
                                c[n] = d + f.getSubStringLength(0, b ? n + 1 : n)
                            } catch (Z) {} else m.getSpanWidth && (r(e(q || b, g)), c[n] = d + m.getSpanWidth(a, f));
                        return c[n]
                    },
                    u, D;
                a.rotation = 0;
                u = x(f.textContent.length);
                if (D = d + u > g) {
                    for (; C <= J;) z = Math.ceil((C + J) / 2), b && (h = e(b, z)), u = x(z, h && h.length - 1), C === J ? C = J + 1 : u > g ? J = z - 1 : C = z;
                    0 ===
                        J ? r("") : q && J === q.length - 1 || r(h || e(q || b, z))
                }
                b && b.splice(0, z);
                a.actualWidth = u;
                a.rotation = n;
                return D
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function(a) {
                var q = a.element,
                    b = this,
                    d = b.forExport,
                    g = A(a.textStr, "").toString(),
                    e = -1 !== g.indexOf("\x3c"),
                    m = q.childNodes,
                    n, h = c(q, "x"),
                    C = a.styles,
                    z = a.textWidth,
                    r = C && C.lineHeight,
                    x = C && C.textOutline,
                    u = C && "ellipsis" === C.textOverflow,
                    K = C && "nowrap" === C.whiteSpace,
                    L = C && C.fontSize,
                    B, M, k = m.length,
                    C = z && !a.added &&
                    this.box,
                    H = function(a) {
                        var g;
                        b.styledMode || (g = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : L || b.style.fontSize || 12);
                        return r ? f(r) : b.fontMetrics(g, a.getAttribute("style") ? a : q).h
                    },
                    E = function(a, f) {
                        D(b.escapes, function(q, b) {
                            f && -1 !== f.indexOf(q) || (a = a.toString().replace(new RegExp(q, "g"), b))
                        });
                        return a
                    },
                    w = function(a, f) {
                        var q;
                        q = a.indexOf("\x3c");
                        a = a.substring(q, a.indexOf("\x3e") - q);
                        q = a.indexOf(f + "\x3d");
                        if (-1 !== q && (q = q + f.length + 1, f = a.charAt(q), '"' === f || "'" === f)) return a = a.substring(q + 1), a.substring(0,
                            a.indexOf(f))
                    };
                B = [g, u, K, r, x, L, z].join();
                if (B !== a.textCache) {
                    for (a.textCache = B; k--;) q.removeChild(m[k]);
                    e || x || u || z || -1 !== g.indexOf(" ") ? (C && C.appendChild(q), e ? (g = b.styledMode ? g.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : g.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'), g = g.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
                        "\x3c/span\x3e").split(/<br.*?>/g)) : g = [g], g = g.filter(function(a) {
                        return "" !== a
                    }), g.forEach(function(f, g) {
                        var e, m = 0,
                            C = 0;
                        f = f.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        e = f.split("|||");
                        e.forEach(function(f) {
                            if ("" !== f || 1 === e.length) {
                                var r = {},
                                    x = l.createElementNS(b.SVG_NS, "tspan"),
                                    D, A;
                                (D = w(f, "class")) && c(x, "class", D);
                                if (D = w(f, "style")) D = D.replace(/(;| |^)color([ :])/, "$1fill$2"), c(x, "style", D);
                                (A = w(f, "href")) && !d && (c(x, "onclick", 'location.href\x3d"' +
                                    A + '"'), c(x, "class", "highcharts-anchor"), b.styledMode || v(x, {
                                    cursor: "pointer"
                                }));
                                f = E(f.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== f) {
                                    x.appendChild(l.createTextNode(f));
                                    m ? r.dx = 0 : g && null !== h && (r.x = h);
                                    c(x, r);
                                    q.appendChild(x);
                                    !m && M && (!T && d && v(x, {
                                        display: "block"
                                    }), c(x, "dy", H(x)));
                                    if (z) {
                                        var B = f.replace(/([^\^])-/g, "$1- ").split(" "),
                                            r = !K && (1 < e.length || g || 1 < B.length);
                                        A = 0;
                                        var k = H(x);
                                        if (u) n = b.truncate(a, x, f, void 0, 0, Math.max(0, z - parseInt(L || 12, 10)), function(a, f) {
                                            return a.substring(0, f) + "\u2026"
                                        });
                                        else if (r)
                                            for (; B.length;) B.length &&
                                                !K && 0 < A && (x = l.createElementNS(J, "tspan"), c(x, {
                                                    dy: k,
                                                    x: h
                                                }), D && c(x, "style", D), x.appendChild(l.createTextNode(B.join(" ").replace(/- /g, "-"))), q.appendChild(x)), b.truncate(a, x, null, B, 0 === A ? C : 0, z, function(a, f) {
                                                    return B.slice(0, f).join(" ").replace(/- /g, "-")
                                                }), C = a.actualWidth, A++
                                    }
                                    m++
                                }
                            }
                        });
                        M = M || q.childNodes.length
                    }), u && n && a.attr("title", E(a.textStr, ["\x26lt;", "\x26gt;"])), C && C.removeChild(q), x && a.applyTextOutline && a.applyTextOutline(x)) : q.appendChild(l.createTextNode(E(g)))
                }
            },
            getContrast: function(a) {
                a = t(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, f, q, b, g, d, e, h, z) {
                var C = this.label(a, f, q, z, null, null, null, null, "button"),
                    J = 0,
                    x = this.styledMode;
                C.attr(m({
                    padding: 8,
                    r: 2
                }, g));
                if (!x) {
                    var l, r, c, D;
                    g = m({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {
                            color: "#333333",
                            cursor: "pointer",
                            fontWeight: "normal"
                        }
                    }, g);
                    l = g.style;
                    delete g.style;
                    d = m(g, {
                        fill: "#e6e6e6"
                    }, d);
                    r = d.style;
                    delete d.style;
                    e = m(g, {
                        fill: "#e6ebf5",
                        style: {
                            color: "#000000",
                            fontWeight: "bold"
                        }
                    }, e);
                    c = e.style;
                    delete e.style;
                    h = m(g, {
                        style: {
                            color: "#cccccc"
                        }
                    }, h);
                    D = h.style;
                    delete h.style
                }
                G(C.element, u ? "mouseover" : "mouseenter", function() {
                    3 !== J && C.setState(1)
                });
                G(C.element, u ? "mouseout" : "mouseleave", function() {
                    3 !== J && C.setState(J)
                });
                C.setState = function(a) {
                    1 !== a && (C.state = J = a);
                    C.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    x || C.attr([g, d, e, h][a || 0]).css([l, r, c, D][a || 0])
                };
                x || C.attr(g).css(n({
                    cursor: "default"
                }, l));
                return C.on("click",
                    function(a) {
                        3 !== J && b.call(C, a)
                    })
            },
            crispLine: function(a, f) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - f % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + f % 2 / 2);
                return a
            },
            path: function(a) {
                var f = this.styledMode ? {} : {
                    fill: "none"
                };
                b(a) ? f.d = a : H(a) && n(f, a);
                return this.createElement("path").attr(f)
            },
            circle: function(a, f, q) {
                a = H(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: f,
                    r: q
                };
                f = this.createElement("circle");
                f.xSetter = f.ySetter = function(a, f, q) {
                    q.setAttribute("c" + f, a)
                };
                return f.attr(a)
            },
            arc: function(a, f, q, b, g, d) {
                H(a) ? (b = a, f = b.y, q =
                    b.r, a = b.x) : b = {
                    innerR: b,
                    start: g,
                    end: d
                };
                a = this.symbol("arc", a, f, q, q, b);
                a.r = q;
                return a
            },
            rect: function(a, f, q, b, g, d) {
                g = H(a) ? a.r : g;
                var e = this.createElement("rect");
                a = H(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: f,
                    width: Math.max(q, 0),
                    height: Math.max(b, 0)
                };
                this.styledMode || (void 0 !== d && (a.strokeWidth = d, a = e.crisp(a)), a.fill = "none");
                g && (a.r = g);
                e.rSetter = function(a, f, q) {
                    c(q, {
                        rx: a,
                        ry: a
                    })
                };
                return e.attr(a)
            },
            setSize: function(a, f, q) {
                var b = this.alignedObjects,
                    g = b.length;
                this.width = a;
                this.height = f;
                for (this.boxWrapper.animate({
                        width: a,
                        height: f
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: A(q, !0) ? void 0 : 0
                    }); g--;) b[g].align()
            },
            g: function(a) {
                var f = this.createElement("g");
                return a ? f.attr({
                    "class": "highcharts-" + a
                }) : f
            },
            image: function(a, f, q, b, g, d) {
                var e = {
                        preserveAspectRatio: "none"
                    },
                    m, h = function(a, f) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", f) : a.setAttribute("hc-svg-href", f)
                    },
                    J = function(f) {
                        h(m.element, a);
                        d.call(m, f)
                    };
                1 < arguments.length && n(e, {
                    x: f,
                    y: q,
                    width: b,
                    height: g
                });
                m = this.createElement("image").attr(e);
                d ? (h(m.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), e = new R.Image, G(e, "load", J), e.src = a, e.complete && J({})) : h(m.element, a);
                return m
            },
            symbol: function(a, f, q, b, g, d) {
                var e = this,
                    m, h = /^url\((.*?)\)$/,
                    J = h.test(a),
                    z = !J && (this.symbols[a] ? a : "circle"),
                    x = z && this.symbols[z],
                    c = r(f) && x && x.call(this.symbols, Math.round(f), Math.round(q), b, g, d),
                    C, u;
                x ? (m = this.path(c), e.styledMode || m.attr("fill", "none"), n(m, {
                    symbolName: z,
                    x: f,
                    y: q,
                    width: b,
                    height: g
                }), d && n(m, d)) : J && (C = a.match(h)[1], m = this.image(C), m.imgwidth = A(M[C] && M[C].width, d && d.width), m.imgheight = A(M[C] && M[C].height, d && d.height), u = function() {
                    m.attr({
                        width: m.width,
                        height: m.height
                    })
                }, ["width", "height"].forEach(function(a) {
                    m[a + "Setter"] = function(a, f) {
                        var q = {},
                            b = this["img" + f],
                            g = "width" === f ? "translateX" : "translateY";
                        this[f] = a;
                        r(b) && (this.element && this.element.setAttribute(f, b), this.alignByTranslate || (q[g] = ((this[f] || 0) - b) / 2, this.attr(q)))
                    }
                }), r(f) && m.attr({
                    x: f,
                    y: q
                }), m.isImg = !0, r(m.imgwidth) && r(m.imgheight) ? u() : (m.attr({
                    width: 0,
                    height: 0
                }), w("img", {
                    onload: function() {
                        var a = p[e.chartIndex];
                        0 === this.width && (v(this, {
                            position: "absolute",
                            top: "-999em"
                        }), l.body.appendChild(this));
                        M[C] = {
                            width: this.width,
                            height: this.height
                        };
                        m.imgwidth = this.width;
                        m.imgheight = this.height;
                        m.element && u();
                        this.parentNode && this.parentNode.removeChild(this);
                        e.imgCount--;
                        if (!e.imgCount && a && a.onload) a.onload()
                    },
                    src: C
                }), this.imgCount++));
                return m
            },
            symbols: {
                circle: function(a, f, q, b) {
                    return this.arc(a + q / 2, f +
                        b / 2, q / 2, b / 2, {
                            start: 0,
                            end: 2 * Math.PI,
                            open: !1
                        })
                },
                square: function(a, f, q, b) {
                    return ["M", a, f, "L", a + q, f, a + q, f + b, a, f + b, "Z"]
                },
                triangle: function(a, f, q, b) {
                    return ["M", a + q / 2, f, "L", a + q, f + b, a, f + b, "Z"]
                },
                "triangle-down": function(a, f, q, b) {
                    return ["M", a, f, "L", a + q, f, a + q / 2, f + b, "Z"]
                },
                diamond: function(a, f, q, b) {
                    return ["M", a + q / 2, f, "L", a + q, f + b / 2, a + q / 2, f + b, a, f + b / 2, "Z"]
                },
                arc: function(a, f, q, b, g) {
                    var d = g.start,
                        e = g.r || q,
                        m = g.r || b || q,
                        n = g.end - .001;
                    q = g.innerR;
                    b = A(g.open, .001 > Math.abs(g.end - g.start - 2 * Math.PI));
                    var h = Math.cos(d),
                        J = Math.sin(d),
                        z = Math.cos(n),
                        n = Math.sin(n);
                    g = .001 > g.end - d - Math.PI ? 0 : 1;
                    e = ["M", a + e * h, f + m * J, "A", e, m, 0, g, 1, a + e * z, f + m * n];
                    r(q) && e.push(b ? "M" : "L", a + q * z, f + q * n, "A", q, q, 0, g, 0, a + q * h, f + q * J);
                    e.push(b ? "" : "Z");
                    return e
                },
                callout: function(a, f, q, b, g) {
                    var d = Math.min(g && g.r || 0, q, b),
                        e = d + 6,
                        m = g && g.anchorX;
                    g = g && g.anchorY;
                    var n;
                    n = ["M", a + d, f, "L", a + q - d, f, "C", a + q, f, a + q, f, a + q, f + d, "L", a + q, f + b - d, "C", a + q, f + b, a + q, f + b, a + q - d, f + b, "L", a + d, f + b, "C", a, f + b, a, f + b, a, f + b - d, "L", a, f + d, "C", a, f, a, f, a + d, f];
                    m && m > q ? g > f + e && g < f + b - e ? n.splice(13, 3, "L", a + q, g - 6, a + q + 6,
                        g, a + q, g + 6, a + q, f + b - d) : n.splice(13, 3, "L", a + q, b / 2, m, g, a + q, b / 2, a + q, f + b - d) : m && 0 > m ? g > f + e && g < f + b - e ? n.splice(33, 3, "L", a, g + 6, a - 6, g, a, g - 6, a, f + d) : n.splice(33, 3, "L", a, b / 2, m, g, a, b / 2, a, f + d) : g && g > b && m > a + e && m < a + q - e ? n.splice(23, 3, "L", m + 6, f + b, m, f + b + 6, m - 6, f + b, a + d, f + b) : g && 0 > g && m > a + e && m < a + q - e && n.splice(3, 3, "L", m - 6, f, m, f - 6, m + 6, f, q - d, f);
                    return n
                }
            },
            clipRect: function(f, q, b, g) {
                var d = a.uniqueKey(),
                    e = this.createElement("clipPath").attr({
                        id: d
                    }).add(this.defs);
                f = this.rect(f, q, b, g, 0).add(e);
                f.id = d;
                f.clipPath = e;
                f.count = 0;
                return f
            },
            text: function(a, f, q, b) {
                var g = {};
                if (b && (this.allowHTML || !this.forExport)) return this.html(a, f, q);
                g.x = Math.round(f || 0);
                q && (g.y = Math.round(q));
                r(a) && (g.text = a);
                a = this.createElement("text").attr(g);
                b || (a.xSetter = function(a, f, q) {
                    var b = q.getElementsByTagName("tspan"),
                        g, d = q.getAttribute(f),
                        e;
                    for (e = 0; e < b.length; e++) g = b[e], g.getAttribute(f) === d && g.setAttribute(f, a);
                    q.setAttribute(f, a)
                });
                return a
            },
            fontMetrics: function(a, q) {
                a = !this.styledMode && /px/.test(a) || !R.getComputedStyle ? a || q && q.style && q.style.fontSize ||
                    this.style && this.style.fontSize : q && y.prototype.getStyle.call(q, "font-size");
                a = /px/.test(a) ? f(a) : 12;
                q = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: q,
                    b: Math.round(.8 * q),
                    f: a
                }
            },
            rotCorr: function(a, f, q) {
                var b = a;
                f && q && (b = Math.max(b * Math.cos(f * h), 4));
                return {
                    x: -a / 3 * Math.sin(f * h),
                    y: b
                }
            },
            label: function(f, b, g, d, e, h, J, z, x) {
                var l = this,
                    c = l.styledMode,
                    u = l.g("button" !== x && "label"),
                    D = u.text = l.text("", 0, 0, J).attr({
                        zIndex: 1
                    }),
                    K, L, C = 0,
                    A = 3,
                    B = 0,
                    M, k, E, H, T, w = {},
                    p, t, R = /^url\((.*?)\)$/.test(d),
                    v = c || R,
                    P = function() {
                        return c ? K.strokeWidth() %
                            2 / 2 : (p ? parseInt(p, 10) : 0) % 2 / 2
                    },
                    U, O, S;
                x && u.addClass("highcharts-" + x);
                U = function() {
                    var a = D.element.style,
                        f = {};
                    L = (void 0 === M || void 0 === k || T) && r(D.textStr) && D.getBBox();
                    u.width = (M || L.width || 0) + 2 * A + B;
                    u.height = (k || L.height || 0) + 2 * A;
                    t = A + Math.min(l.fontMetrics(a && a.fontSize, D).b, L ? L.height : Infinity);
                    v && (K || (u.box = K = l.symbols[d] || R ? l.symbol(d) : l.rect(), K.addClass(("button" === x ? "" : "highcharts-label-box") + (x ? " highcharts-" + x + "-box" : "")), K.add(u), a = P(), f.x = a, f.y = (z ? -t : 0) + a), f.width = Math.round(u.width), f.height =
                        Math.round(u.height), K.attr(n(f, w)), w = {})
                };
                O = function() {
                    var a = B + A,
                        f;
                    f = z ? 0 : t;
                    r(M) && L && ("center" === T || "right" === T) && (a += {
                        center: .5,
                        right: 1
                    } [T] * (M - L.width));
                    if (a !== D.x || f !== D.y) D.attr("x", a), D.hasBoxWidthChanged && (L = D.getBBox(!0), U()), void 0 !== f && D.attr("y", f);
                    D.x = a;
                    D.y = f
                };
                S = function(a, f) {
                    K ? K.attr(a, f) : w[a] = f
                };
                u.onAdd = function() {
                    D.add(u);
                    u.attr({
                        text: f || 0 === f ? f : "",
                        x: b,
                        y: g
                    });
                    K && r(e) && u.attr({
                        anchorX: e,
                        anchorY: h
                    })
                };
                u.widthSetter = function(f) {
                    M = a.isNumber(f) ? f : null
                };
                u.heightSetter = function(a) {
                    k = a
                };
                u["text-alignSetter"] =
                    function(a) {
                        T = a
                    };
                u.paddingSetter = function(a) {
                    r(a) && a !== A && (A = u.padding = a, O())
                };
                u.paddingLeftSetter = function(a) {
                    r(a) && a !== B && (B = a, O())
                };
                u.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [a];
                    a !== C && (C = a, L && u.attr({
                        x: E
                    }))
                };
                u.textSetter = function(a) {
                    void 0 !== a && D.textSetter(a);
                    U();
                    O()
                };
                u["stroke-widthSetter"] = function(a, f) {
                    a && (v = !0);
                    p = this["stroke-width"] = a;
                    S(f, a)
                };
                c ? u.rSetter = function(a, f) {
                    S(f, a)
                } : u.strokeSetter = u.fillSetter = u.rSetter = function(a, f) {
                    "r" !== f && ("fill" === f && a && (v = !0), u[f] = a);
                    S(f, a)
                };
                u.anchorXSetter = function(a, f) {
                    e = u.anchorX = a;
                    S(f, Math.round(a) - P() - E)
                };
                u.anchorYSetter = function(a, f) {
                    h = u.anchorY = a;
                    S(f, a - H)
                };
                u.xSetter = function(a) {
                    u.x = a;
                    C && (a -= C * ((M || L.width) + 2 * A), u["forceAnimate:x"] = !0);
                    E = Math.round(a);
                    u.attr("translateX", E)
                };
                u.ySetter = function(a) {
                    H = u.y = Math.round(a);
                    u.attr("translateY", H)
                };
                var G = u.css;
                J = {
                    css: function(a) {
                        if (a) {
                            var f = {};
                            a = m(a);
                            u.textProps.forEach(function(q) {
                                void 0 !== a[q] && (f[q] = a[q], delete a[q])
                            });
                            D.css(f);
                            "width" in f && U();
                            "fontSize" in f && (U(), O())
                        }
                        return G.call(u,
                            a)
                    },
                    getBBox: function() {
                        return {
                            width: L.width + 2 * A,
                            height: L.height + 2 * A,
                            x: L.x - A,
                            y: L.y - A
                        }
                    },
                    destroy: function() {
                        q(u.element, "mouseenter");
                        q(u.element, "mouseleave");
                        D && (D = D.destroy());
                        K && (K = K.destroy());
                        y.prototype.destroy.call(u);
                        u = l = U = O = S = null
                    }
                };
                c || (J.shadow = function(a) {
                    a && (U(), K && K.shadow(a));
                    return u
                });
                return n(u, J)
            }
        });
        a.Renderer = F
    })(I);
    (function(a) {
        var y = a.attr,
            F = a.createElement,
            G = a.css,
            k = a.defined,
            c = a.extend,
            p = a.isFirefox,
            t = a.isMS,
            v = a.isWebKit,
            w = a.pick,
            r = a.pInt,
            h = a.SVGElement,
            e = a.SVGRenderer,
            l = a.win;
        c(h.prototype, {
            htmlCss: function(a) {
                var d = "SPAN" === this.element.tagName && a && "width" in a,
                    g = w(d && a.width, void 0),
                    b;
                d && (delete a.width, this.textWidth = g, b = !0);
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = c(this.styles, a);
                G(this.element, a);
                b && this.htmlUpdateTransform();
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        d = this.element,
                        g = this.translateX || 0,
                        b = this.translateY || 0,
                        e = this.x || 0,
                        h = this.y || 0,
                        l = this.textAlign || "left",
                        c = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [l],
                        B = this.styles,
                        m = B && B.whiteSpace;
                    G(d, {
                        marginLeft: g,
                        marginTop: b
                    });
                    !a.styledMode && this.shadows && this.shadows.forEach(function(a) {
                        G(a, {
                            marginLeft: g + 1,
                            marginTop: b + 1
                        })
                    });
                    this.inverted && [].forEach.call(d.childNodes, function(f) {
                        a.invertChild(f, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var B = this.rotation,
                            z = this.textWidth && r(this.textWidth),
                            D = [B, l, d.innerHTML, this.textWidth, this.textAlign].join(),
                            A;
                        (A = z !== this.oldTextWidth) && !(A = z > this.oldTextWidth) && ((A = this.textPxLength) || (G(d, {
                            width: "",
                            whiteSpace: m || "nowrap"
                        }), A = d.offsetWidth), A = A > z);
                        A && (/[ \-]/.test(d.textContent || d.innerText) || "ellipsis" === d.style.textOverflow) ? (G(d, {
                            width: z + "px",
                            display: "block",
                            whiteSpace: m || "normal"
                        }), this.oldTextWidth = z, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        D !== this.cTT && (m = a.fontMetrics(d.style.fontSize, d).b, !k(B) || B === (this.oldRotation || 0) && l === this.oldAlign || this.setSpanRotation(B, c, m), this.getSpanCorrection(!k(B) &&
                            this.textPxLength || d.offsetWidth, m, c, B, l));
                        G(d, {
                            left: e + (this.xCorr || 0) + "px",
                            top: h + (this.yCorr || 0) + "px"
                        });
                        this.cTT = D;
                        this.oldRotation = B;
                        this.oldAlign = l
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, d, g) {
                var b = {},
                    e = this.renderer.getTransformKey();
                b[e] = b.transform = "rotate(" + a + "deg)";
                b[e + (p ? "Origin" : "-origin")] = b.transformOrigin = 100 * d + "% " + g + "px";
                G(this.element, b)
            },
            getSpanCorrection: function(a, d, g) {
                this.xCorr = -a * g;
                this.yCorr = -d
            }
        });
        c(e.prototype, {
            getTransformKey: function() {
                return t && !/Edge/.test(l.navigator.userAgent) ?
                    "-ms-transform" : v ? "-webkit-transform" : p ? "MozTransform" : l.opera ? "-o-transform" : ""
            },
            html: function(e, d, g) {
                var b = this.createElement("span"),
                    n = b.element,
                    u = b.renderer,
                    l = u.isSVG,
                    r = function(a, b) {
                        ["opacity", "visibility"].forEach(function(g) {
                            a[g + "Setter"] = function(a, f, q) {
                                h.prototype[g + "Setter"].call(this, a, f, q);
                                b[f] = a
                            }
                        });
                        a.addedSetters = !0
                    },
                    B = a.charts[u.chartIndex],
                    B = B && B.styledMode;
                b.textSetter = function(a) {
                    a !== n.innerHTML && delete this.bBox;
                    this.textStr = a;
                    n.innerHTML = w(a, "");
                    b.doTransform = !0
                };
                l && r(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function(a, g) {
                    "align" === g && (g = "textAlign");
                    b[g] = a;
                    b.doTransform = !0
                };
                b.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                b.attr({
                    text: e,
                    x: Math.round(d),
                    y: Math.round(g)
                }).css({
                    position: "absolute"
                });
                B || b.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                n.style.whiteSpace = "nowrap";
                b.css = b.htmlCss;
                l && (b.add = function(a) {
                    var g, d = u.box.parentNode,
                        e = [];
                    if (this.parentGroup = a) {
                        if (g = a.div, !g) {
                            for (; a;) e.push(a),
                                a = a.parentGroup;
                            e.reverse().forEach(function(a) {
                                function f(f, q) {
                                    a[q] = f;
                                    "translateX" === q ? m.left = f + "px" : m.top = f + "px";
                                    a.doTransform = !0
                                }
                                var m, h = y(a.element, "class");
                                h && (h = {
                                    className: h
                                });
                                g = a.div = a.div || F("div", h, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, g || d);
                                m = g.style;
                                c(a, {
                                    classSetter: function(a) {
                                        return function(f) {
                                            this.element.setAttribute("class", f);
                                            a.className = f
                                        }
                                    }(g),
                                    on: function() {
                                        e[0].div &&
                                            b.on.apply({
                                                element: e[0].div
                                            }, arguments);
                                        return a
                                    },
                                    translateXSetter: f,
                                    translateYSetter: f
                                });
                                a.addedSetters || r(a, m)
                            })
                        }
                    } else g = d;
                    g.appendChild(n);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    })(I);
    (function(a) {
        var y = a.defined,
            F = a.extend,
            G = a.merge,
            k = a.pick,
            c = a.timeUnits,
            p = a.win;
        a.Time = function(a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function(a) {
                var c = k(a && a.useUTC, !0),
                    w = this;
                this.options = a = G(!0, this.options || {}, a);
                this.Date = a.Date || p.Date || Date;
                this.timezoneOffset =
                    (this.useUTC = c) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(c && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function(a, h) {
                    var e = h.getTime(),
                        l = e - w.getTimezoneOffset(h);
                    h.setTime(l);
                    a = h["getUTC" + a]();
                    h.setTime(e);
                    return a
                }, this.set = function(a, h, e) {
                    var l;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === h.getTimezoneOffset() % 60) h["set" + a](e);
                    else l = w.getTimezoneOffset(h), l = h.getTime() - l, h.setTime(l), h["setUTC" + a](e), a = w.getTimezoneOffset(h),
                        l = h.getTime() + a, h.setTime(l)
                }) : c ? (this.get = function(a, h) {
                    return h["getUTC" + a]()
                }, this.set = function(a, h, e) {
                    return h["setUTC" + a](e)
                }) : (this.get = function(a, h) {
                    return h["get" + a]()
                }, this.set = function(a, h, e) {
                    return h["set" + a](e)
                })
            },
            makeTime: function(c, p, w, r, h, e) {
                var l, n, d;
                this.useUTC ? (l = this.Date.UTC.apply(0, arguments), n = this.getTimezoneOffset(l), l += n, d = this.getTimezoneOffset(l), n !== d ? l += d - n : n - 36E5 !== this.getTimezoneOffset(l - 36E5) || a.isSafari || (l -= 36E5)) : l = (new this.Date(c, p, k(w, 1), k(r, 0), k(h, 0), k(e, 0))).getTime();
                return l
            },
            timezoneOffsetFunction: function() {
                var c = this,
                    k = this.options,
                    w = p.moment;
                if (!this.useUTC) return function(a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (k.timezone) {
                    if (w) return function(a) {
                        return 6E4 * -w.tz(a, k.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && k.getTimezoneOffset ? function(a) {
                    return 6E4 * k.getTimezoneOffset(a)
                } : function() {
                    return 6E4 * (c.timezoneOffset || 0)
                }
            },
            dateFormat: function(c, k, w) {
                if (!a.defined(k) || isNaN(k)) return a.defaultOptions.lang.invalidDate || "";
                c = a.pick(c, "%Y-%m-%d %H:%M:%S");
                var r = this,
                    h = new this.Date(k),
                    e = this.get("Hours", h),
                    l = this.get("Day", h),
                    n = this.get("Date", h),
                    d = this.get("Month", h),
                    g = this.get("FullYear", h),
                    b = a.defaultOptions.lang,
                    x = b.weekdays,
                    u = b.shortWeekdays,
                    H = a.pad,
                    h = a.extend({
                        a: u ? u[l] : x[l].substr(0, 3),
                        A: x[l],
                        d: H(n),
                        e: H(n, 2, " "),
                        w: l,
                        b: b.shortMonths[d],
                        B: b.months[d],
                        m: H(d + 1),
                        o: d + 1,
                        y: g.toString().substr(2, 2),
                        Y: g,
                        H: H(e),
                        k: e,
                        I: H(e % 12 || 12),
                        l: e % 12 || 12,
                        M: H(r.get("Minutes", h)),
                        p: 12 > e ? "AM" : "PM",
                        P: 12 > e ? "am" : "pm",
                        S: H(h.getSeconds()),
                        L: H(Math.floor(k % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(h, function(a, b) {
                    for (; - 1 !== c.indexOf("%" + b);) c = c.replace("%" + b, "function" === typeof a ? a.call(r, k) : a)
                });
                return w ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
            },
            resolveDTLFormat: function(c) {
                return a.isObject(c, !0) ? c : (c = a.splat(c), {
                    main: c[0],
                    from: c[1],
                    to: c[2]
                })
            },
            getTimeTicks: function(a, p, w, r) {
                var h = this,
                    e = [],
                    l, n = {},
                    d;
                l = new h.Date(p);
                var g = a.unitRange,
                    b = a.count || 1,
                    x;
                r = k(r, 1);
                if (y(p)) {
                    h.set("Milliseconds", l, g >= c.second ? 0 : b * Math.floor(h.get("Milliseconds", l) / b));
                    g >= c.second && h.set("Seconds", l, g >=
                        c.minute ? 0 : b * Math.floor(h.get("Seconds", l) / b));
                    g >= c.minute && h.set("Minutes", l, g >= c.hour ? 0 : b * Math.floor(h.get("Minutes", l) / b));
                    g >= c.hour && h.set("Hours", l, g >= c.day ? 0 : b * Math.floor(h.get("Hours", l) / b));
                    g >= c.day && h.set("Date", l, g >= c.month ? 1 : Math.max(1, b * Math.floor(h.get("Date", l) / b)));
                    g >= c.month && (h.set("Month", l, g >= c.year ? 0 : b * Math.floor(h.get("Month", l) / b)), d = h.get("FullYear", l));
                    g >= c.year && h.set("FullYear", l, d - d % b);
                    g === c.week && (d = h.get("Day", l), h.set("Date", l, h.get("Date", l) - d + r + (d < r ? -7 : 0)));
                    d = h.get("FullYear",
                        l);
                    r = h.get("Month", l);
                    var u = h.get("Date", l),
                        H = h.get("Hours", l);
                    p = l.getTime();
                    h.variableTimezone && (x = w - p > 4 * c.month || h.getTimezoneOffset(p) !== h.getTimezoneOffset(w));
                    p = l.getTime();
                    for (l = 1; p < w;) e.push(p), p = g === c.year ? h.makeTime(d + l * b, 0) : g === c.month ? h.makeTime(d, r + l * b) : !x || g !== c.day && g !== c.week ? x && g === c.hour && 1 < b ? h.makeTime(d, r, u, H + l * b) : p + g * b : h.makeTime(d, r, u + l * b * (g === c.day ? 1 : 7)), l++;
                    e.push(p);
                    g <= c.hour && 1E4 > e.length && e.forEach(function(a) {
                        0 === a % 18E5 && "000000000" === h.dateFormat("%H%M%S%L", a) && (n[a] = "day")
                    })
                }
                e.info =
                    F(a, {
                        higherRanks: n,
                        totalRange: g * b
                    });
                return e
            }
        }
    })(I);
    (function(a) {
        var y = a.color,
            F = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                backgroundColor: y("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function(y) {
            a.defaultOptions = F(!0, a.defaultOptions, y);
            a.time.update(F(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(F(a.defaultOptions.global,
            a.defaultOptions.time));
        a.dateFormat = function(y, k, c) {
            return a.time.dateFormat(y, k, c)
        }
    })(I);
    (function(a) {
        var y = a.correctFloat,
            F = a.defined,
            G = a.destroyObjectProperties,
            k = a.fireEvent,
            c = a.isNumber,
            p = a.merge,
            t = a.pick,
            v = a.deg2rad;
        a.Tick = function(a, c, h, e, l) {
            this.axis = a;
            this.pos = c;
            this.type = h || "";
            this.isNewLabel = this.isNew = !0;
            this.parameters = l || {};
            this.tickmarkOffset = this.parameters.tickmarkOffset;
            this.options = this.parameters.options;
            h || e || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var c = this,
                    r = c.axis,
                    h = r.options,
                    e = r.chart,
                    l = r.categories,
                    n = r.names,
                    d = c.pos,
                    g = t(c.options && c.options.labels, h.labels),
                    b = r.tickPositions,
                    x = d === b[0],
                    u = d === b[b.length - 1],
                    l = this.parameters.category || (l ? t(l[d], n[d], d) : d),
                    k = c.label,
                    b = b.info,
                    E, B, m, z;
                r.isDatetimeAxis && b && (B = e.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid && b.higherRanks[d] || b.unitName]), E = B.main);
                c.isFirst = x;
                c.isLast = u;
                c.formatCtx = {
                    axis: r,
                    chart: e,
                    isFirst: x,
                    isLast: u,
                    dateTimeLabelFormat: E,
                    tickPositionInfo: b,
                    value: r.isLog ? y(r.lin2log(l)) : l,
                    pos: d
                };
                h = r.labelFormatter.call(c.formatCtx, this.formatCtx);
                if (z = B && B.list) c.shortenLabel = function() {
                    for (m = 0; m < z.length; m++)
                        if (k.attr({
                                text: r.labelFormatter.call(a.extend(c.formatCtx, {
                                    dateTimeLabelFormat: z[m]
                                }))
                            }), k.getBBox().width < r.getSlotWidth(c) - 2 * t(g.padding, 5)) return;
                    k.attr({
                        text: ""
                    })
                };
                if (F(k)) k && k.textStr !== h && (!k.textWidth || g.style && g.style.width || k.styles.width || k.css({
                    width: null
                }), k.attr({
                    text: h
                }));
                else {
                    if (c.label = k = F(h) && g.enabled ? e.renderer.text(h, 0, 0, g.useHTML).add(r.labelGroup) : null) e.styledMode ||
                        k.css(p(g.style)), k.textPxLength = k.getBBox().width;
                    c.rotation = 0
                }
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var c = this.axis,
                    h = c.options.labels,
                    e = a.x,
                    l = c.chart.chartWidth,
                    n = c.chart.spacing,
                    d = t(c.labelLeft, Math.min(c.pos, n[3])),
                    n = t(c.labelRight, Math.max(c.isRadial ? 0 : c.pos + c.len, l - n[1])),
                    g = this.label,
                    b = this.rotation,
                    x = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [c.labelAlign || g.attr("align")],
                    u = g.getBBox().width,
                    k = c.getSlotWidth(this),
                    E = k,
                    B = 1,
                    m, z = {};
                if (b || "justify" !== t(h.overflow, "justify")) 0 > b && e - x * u < d ? m = Math.round(e / Math.cos(b * v) - d) : 0 < b && e + x * u > n && (m = Math.round((l - e) / Math.cos(b * v)));
                else if (l = e + (1 - x) * u, e - x * u < d ? E = a.x + E * (1 - x) - d : l > n && (E = n - a.x + E * x, B = -1), E = Math.min(k, E), E < k && "center" === c.labelAlign && (a.x += B * (k - E - x * (k - Math.min(u, E)))), u > E || c.autoRotation && (g.styles || {}).width) m = E;
                m && (this.shortenLabel ? this.shortenLabel() : (z.width = Math.floor(m), (h.style || {}).textOverflow || (z.textOverflow = "ellipsis"), g.css(z)))
            },
            getPosition: function(c,
                r, h, e) {
                var l = this.axis,
                    n = l.chart,
                    d = e && n.oldChartHeight || n.chartHeight;
                c = {
                    x: c ? a.correctFloat(l.translate(r + h, null, null, e) + l.transB) : l.left + l.offset + (l.opposite ? (e && n.oldChartWidth || n.chartWidth) - l.right - l.left : 0),
                    y: c ? d - l.bottom + l.offset - (l.opposite ? l.height : 0) : a.correctFloat(d - l.translate(r + h, null, null, e) - l.transB)
                };
                k(this, "afterGetPosition", {
                    pos: c
                });
                return c
            },
            getLabelPosition: function(a, c, h, e, l, n, d, g) {
                var b = this.axis,
                    x = b.transA,
                    u = b.reversed,
                    r = b.staggerLines,
                    E = b.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    B = l.y,
                    m = e || b.reserveSpaceDefault ?
                    0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                    z = {};
                F(B) || (B = 0 === b.side ? h.rotation ? -8 : -h.getBBox().height : 2 === b.side ? E.y + 8 : Math.cos(h.rotation * v) * (E.y - h.getBBox(!1, 0).height / 2));
                a = a + l.x + m + E.x - (n && e ? n * x * (u ? -1 : 1) : 0);
                c = c + B - (n && !e ? n * x * (u ? 1 : -1) : 0);
                r && (h = d / (g || 1) % r, b.opposite && (h = r - h - 1), c += b.labelOffset / r * h);
                z.x = a;
                z.y = Math.round(c);
                k(this, "afterGetLabelPosition", {
                    pos: z,
                    tickmarkOffset: n,
                    index: d
                });
                return z
            },
            getMarkPath: function(a, c, h, e, l, n) {
                return n.crispLine(["M", a, c, "L", a + (l ? 0 : -h), c + (l ? h : 0)], e)
            },
            renderGridLine: function(a,
                c, h) {
                var e = this.axis,
                    l = e.options,
                    n = this.gridLine,
                    d = {},
                    g = this.pos,
                    b = this.type,
                    x = t(this.tickmarkOffset, e.tickmarkOffset),
                    u = e.chart.renderer,
                    r = b ? b + "Grid" : "grid",
                    k = l[r + "LineWidth"],
                    B = l[r + "LineColor"],
                    l = l[r + "LineDashStyle"];
                n || (e.chart.styledMode || (d.stroke = B, d["stroke-width"] = k, l && (d.dashstyle = l)), b || (d.zIndex = 1), a && (c = 0), this.gridLine = n = u.path().attr(d).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(e.gridGroup));
                if (n && (h = e.getPlotLinePath(g + x, n.strokeWidth() * h, a, "pass"))) n[a || this.isNew ? "attr" :
                    "animate"]({
                    d: h,
                    opacity: c
                })
            },
            renderMark: function(a, c, h) {
                var e = this.axis,
                    l = e.options,
                    n = e.chart.renderer,
                    d = this.type,
                    g = d ? d + "Tick" : "tick",
                    b = e.tickSize(g),
                    x = this.mark,
                    u = !x,
                    r = a.x;
                a = a.y;
                var k = t(l[g + "Width"], !d && e.isXAxis ? 1 : 0),
                    l = l[g + "Color"];
                b && (e.opposite && (b[0] = -b[0]), u && (this.mark = x = n.path().addClass("highcharts-" + (d ? d + "-" : "") + "tick").add(e.axisGroup), e.chart.styledMode || x.attr({
                    stroke: l,
                    "stroke-width": k
                })), x[u ? "attr" : "animate"]({
                    d: this.getMarkPath(r, a, b[0], x.strokeWidth() * h, e.horiz, n),
                    opacity: c
                }))
            },
            renderLabel: function(a, r, h, e) {
                var l = this.axis,
                    n = l.horiz,
                    d = l.options,
                    g = this.label,
                    b = d.labels,
                    x = b.step,
                    l = t(this.tickmarkOffset, l.tickmarkOffset),
                    u = !0,
                    k = a.x;
                a = a.y;
                g && c(k) && (g.xy = a = this.getLabelPosition(k, a, g, n, b, l, e, x), this.isFirst && !this.isLast && !t(d.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(d.showLastLabel, 1) ? u = !1 : !n || b.step || b.rotation || r || 0 === h || this.handleOverflow(a), x && e % x && (u = !1), u && c(a.y) ? (a.opacity = h, g[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (g.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function(c, r, h) {
                var e = this.axis,
                    l = e.horiz,
                    n = this.pos,
                    d = t(this.tickmarkOffset, e.tickmarkOffset),
                    n = this.getPosition(l, n, d, r),
                    d = n.x,
                    g = n.y,
                    e = l && d === e.pos + e.len || !l && g === e.pos ? -1 : 1;
                h = t(h, 1);
                this.isActive = !0;
                this.renderGridLine(r, h, e);
                this.renderMark(n, h, e);
                this.renderLabel(n, r, h, c);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function() {
                G(this, this.axis)
            }
        }
    })(I);
    var X = function(a) {
        var y = a.addEvent,
            F = a.animObject,
            G = a.arrayMax,
            k = a.arrayMin,
            c = a.color,
            p = a.correctFloat,
            t = a.defaultOptions,
            v = a.defined,
            w = a.deg2rad,
            r = a.destroyObjectProperties,
            h = a.extend,
            e = a.fireEvent,
            l = a.format,
            n = a.getMagnitude,
            d = a.isArray,
            g = a.isNumber,
            b = a.isString,
            x = a.merge,
            u = a.normalizeTickInterval,
            H = a.objectEach,
            E = a.pick,
            B = a.removeEvent,
            m = a.splat,
            z = a.syncTimeout,
            D = a.Tick,
            A = function() {
                this.init.apply(this, arguments)
            };
        a.extend(A.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            },
            init: function(a, q) {
                var f = q.isX,
                    b = this;
                b.chart = a;
                b.horiz = a.inverted && !b.isZAxis ? !f : f;
                b.isXAxis = f;
                b.coll = b.coll || (f ? "xAxis" : "yAxis");
                e(this, "init", {
                    userOptions: q
                });
                b.opposite = q.opposite;
                b.side = q.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                b.setOptions(q);
                var g = this.options,
                    d = g.type;
                b.labelFormatter = g.labels.formatter ||
                    b.defaultLabelFormatter;
                b.userOptions = q;
                b.minPixelPadding = 0;
                b.reversed = g.reversed;
                b.visible = !1 !== g.visible;
                b.zoomEnabled = !1 !== g.zoomEnabled;
                b.hasNames = "category" === d || !0 === g.categories;
                b.categories = g.categories || b.hasNames;
                b.names || (b.names = [], b.names.keys = {});
                b.plotLinesAndBandsGroups = {};
                b.isLog = "logarithmic" === d;
                b.isDatetimeAxis = "datetime" === d;
                b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
                b.isLinked = v(g.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands = {};
                b.len = 0;
                b.minRange = b.userMinRange = g.minRange || g.maxZoom;
                b.range = g.range;
                b.offset = g.offset || 0;
                b.stacks = {};
                b.oldStacks = {};
                b.stacksTouched = 0;
                b.max = null;
                b.min = null;
                b.crosshair = E(g.crosshair, m(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);
                q = b.options.events; - 1 === a.axes.indexOf(b) && (f ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
                b.series = b.series || [];
                a.inverted && !b.isZAxis && f && void 0 === b.reversed && (b.reversed = !0);
                H(q, function(a, f) {
                    y(b, f, a)
                });
                b.lin2log = g.linearToLogConverter || b.lin2log;
                b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log);
                e(this, "afterInit")
            },
            setOptions: function(a) {
                this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], x(t[this.coll], a));
                e(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function() {
                var f = this.axis,
                    q = this.value,
                    b = f.chart.time,
                    g = f.categories,
                    d = this.dateTimeLabelFormat,
                    e = t.lang,
                    m = e.numericSymbols,
                    e = e.numericSymbolMagnitude || 1E3,
                    h = m && m.length,
                    n, c = f.options.labels.format,
                    f = f.isLog ? Math.abs(q) : f.tickInterval;
                if (c) n = l(c, this, b);
                else if (g) n = q;
                else if (d) n = b.dateFormat(d, q);
                else if (h && 1E3 <= f)
                    for (; h-- && void 0 === n;) b = Math.pow(e, h + 1), f >= b && 0 === 10 * q % b && null !== m[h] && 0 !== q && (n = a.numberFormat(q / b, -1) + m[h]);
                void 0 === n && (n = 1E4 <= Math.abs(q) ? a.numberFormat(q, -1) : a.numberFormat(q, -1, void 0, ""));
                return n
            },
            getSeriesExtremes: function() {
                var a = this,
                    q = a.chart;
                e(this, "getSeriesExtremes", null, function() {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function(f) {
                        if (f.visible || !q.options.chart.ignoreHiddenSeries) {
                            var b = f.options,
                                d = b.threshold,
                                e;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= d && (d = null);
                            if (a.isXAxis) b = f.xData, b.length && (f = k(b), e = G(b), g(f) || f instanceof Date || (b = b.filter(g), f = k(b), e = G(b)), b.length && (a.dataMin = Math.min(E(a.dataMin, b[0], f), f), a.dataMax = Math.max(E(a.dataMax, b[0], e), e)));
                            else if (f.getExtremes(), e = f.dataMax,
                                f = f.dataMin, v(f) && v(e) && (a.dataMin = Math.min(E(a.dataMin, f), f), a.dataMax = Math.max(E(a.dataMax, e), e)), v(d) && (a.threshold = d), !b.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                e(this, "afterGetSeriesExtremes")
            },
            translate: function(a, q, b, d, e, m) {
                var f = this.linkedParent || this,
                    h = 1,
                    n = 0,
                    c = d ? f.oldTransA : f.transA;
                d = d ? f.oldMin : f.min;
                var u = f.minPixelPadding;
                e = (f.isOrdinal || f.isBroken || f.isLog && e) && f.lin2val;
                c || (c = f.transA);
                b && (h *= -1, n = f.len);
                f.reversed && (h *= -1, n -= h * (f.sector || f.len));
                q ? (a = (a * h + n - u) /
                    c + d, e && (a = f.lin2val(a))) : (e && (a = f.val2lin(a)), a = g(d) ? h * (a - d) * c + n + h * u + (g(m) ? c * m : 0) : void 0);
                return a
            },
            toPixels: function(a, q) {
                return this.translate(a, !1, !this.horiz, null, !0) + (q ? 0 : this.pos)
            },
            toValue: function(a, q) {
                return this.translate(a - (q ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(a, q, b, d, m) {
                var f = this,
                    h = f.chart,
                    n = f.left,
                    c = f.top,
                    u, l, z, x, D = b && h.oldChartHeight || h.chartHeight,
                    r = b && h.oldChartWidth || h.chartWidth,
                    k, L = f.transB,
                    A, B = function(a, f, q) {
                        if ("pass" !== d && a < f || a > q) d ? a = Math.min(Math.max(f,
                            a), q) : k = !0;
                        return a
                    };
                A = {
                    value: a,
                    lineWidth: q,
                    old: b,
                    force: d,
                    translatedValue: m
                };
                e(this, "getPlotLinePath", A, function(e) {
                    m = E(m, f.translate(a, null, null, b));
                    m = Math.min(Math.max(-1E5, m), 1E5);
                    u = z = Math.round(m + L);
                    l = x = Math.round(D - m - L);
                    g(m) ? f.horiz ? (l = c, x = D - f.bottom, u = z = B(u, n, n + f.width)) : (u = n, z = r - f.right, l = x = B(l, c, c + f.height)) : (k = !0, d = !1);
                    e.path = k && !d ? null : h.renderer.crispLine(["M", u, l, "L", z, x], q || 1)
                });
                return A.path
            },
            getLinearTickPositions: function(a, q, b) {
                var f, g = p(Math.floor(q / a) * a);
                b = p(Math.ceil(b / a) * a);
                var d = [],
                    e;
                p(g + a) === g && (e = 20);
                if (this.single) return [q];
                for (q = g; q <= b;) {
                    d.push(q);
                    q = p(q + a, e);
                    if (q === f) break;
                    f = q
                }
                return d
            },
            getMinorTickInterval: function() {
                var a = this.options;
                return !0 === a.minorTicks ? E(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function() {
                var a = this,
                    q = a.options,
                    b = a.tickPositions,
                    g = a.minorTickInterval,
                    d = [],
                    e = a.pointRangePadding || 0,
                    m = a.min - e,
                    e = a.max + e,
                    h = e - m;
                if (h && h / g < a.len / 3)
                    if (a.isLog) this.paddedTicks.forEach(function(f, q, b) {
                        q && d.push.apply(d,
                            a.getLogTickPositions(g, b[q - 1], b[q], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) d = d.concat(a.getTimeTicks(a.normalizeTimeTickInterval(g), m, e, q.startOfWeek));
                else
                    for (q = m + (b[0] - m) % g; q <= e && q !== d[0]; q += g) d.push(q);
                0 !== d.length && a.trimTicks(d);
                return d
            },
            adjustForMinRange: function() {
                var a = this.options,
                    q = this.min,
                    b = this.max,
                    g, d, e, m, h, n, c, u;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (v(a.min) || v(a.max) ? this.minRange = null : (this.series.forEach(function(a) {
                    n = a.xData;
                    for (m =
                        c = a.xIncrement ? 1 : n.length - 1; 0 < m; m--)
                        if (h = n[m] - n[m - 1], void 0 === e || h < e) e = h
                }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                b - q < this.minRange && (d = this.dataMax - this.dataMin >= this.minRange, u = this.minRange, g = (u - b + q) / 2, g = [q - g, E(a.min, q - g)], d && (g[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), q = G(g), b = [q + u, E(a.max, q + u)], d && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = k(b), b - q < u && (g[0] = b - u, g[1] = E(a.min, b - u), q = G(g)));
                this.min = q;
                this.max = b
            },
            getClosest: function() {
                var a;
                this.categories ?
                    a = 1 : this.series.forEach(function(f) {
                        var q = f.closestPointRange,
                            b = f.visible || !f.chart.options.chart.ignoreHiddenSeries;
                        !f.noSharedTooltip && v(q) && b && (a = v(a) ? Math.min(a, q) : q)
                    });
                return a
            },
            nameToX: function(a) {
                var f = d(this.categories),
                    b = f ? this.categories : this.names,
                    g = a.options.x,
                    e;
                a.series.requireSorting = !1;
                v(g) || (g = !1 === this.options.uniqueNames ? a.series.autoIncrement() : f ? b.indexOf(a.name) : E(b.keys[a.name], -1)); - 1 === g ? f || (e = b.length) : e = g;
                void 0 !== e && (this.names[e] = a.name, this.names.keys[a.name] = e);
                return e
            },
            updateNames: function() {
                var a = this,
                    q = this.names;
                0 < q.length && (Object.keys(q.keys).forEach(function(a) {
                    delete q.keys[a]
                }), q.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(f) {
                    f.xIncrement = null;
                    if (!f.points || f.isDirtyData) a.max = Math.max(a.max, f.xData.length - 1), f.processData(), f.generatePoints();
                    f.data.forEach(function(q, b) {
                        var g;
                        q && q.options && void 0 !== q.name && (g = a.nameToX(q), void 0 !== g && g !== q.x && (q.x = g, f.xData[b] = g))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var f = this,
                    g = f.max -
                    f.min,
                    d = f.axisPointRange || 0,
                    m, h = 0,
                    n = 0,
                    c = f.linkedParent,
                    u = !!f.categories,
                    l = f.transA,
                    z = f.isXAxis;
                if (z || u || d) m = f.getClosest(), c ? (h = c.minPointOffset, n = c.pointRangePadding) : f.series.forEach(function(a) {
                    var q = u ? 1 : z ? E(a.options.pointRange, m, 0) : f.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    d = Math.max(d, q);
                    f.single || (h = Math.max(h, z && b(a) ? 0 : q / 2), n = Math.max(n, z && "on" === a ? 0 : q))
                }), c = f.ordinalSlope && m ? f.ordinalSlope / m : 1, f.minPointOffset = h *= c, f.pointRangePadding = n *= c, f.pointRange = Math.min(d, g), z && (f.closestPointRange =
                    m);
                a && (f.oldTransA = l);
                f.translationSlope = f.transA = l = f.staticScale || f.len / (g + n || 1);
                f.transB = f.horiz ? f.left : f.bottom;
                f.minPixelPadding = l * h;
                e(this, "afterSetAxisTranslation")
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(f) {
                var b = this,
                    d = b.chart,
                    m = b.options,
                    h = b.isLog,
                    c = b.isDatetimeAxis,
                    l = b.isXAxis,
                    z = b.isLinked,
                    x = m.maxPadding,
                    D = m.minPadding,
                    r, k = m.tickInterval,
                    A = m.tickPixelInterval,
                    B = b.categories,
                    H = g(b.threshold) ? b.threshold : null,
                    w = b.softThreshold,
                    t, y, G;
                c || B || z || this.getTickAmount();
                y = E(b.userMin, m.min);
                G = E(b.userMax, m.max);
                z ? (b.linkedParent = d[b.coll][m.linkedTo], r = b.linkedParent.getExtremes(), b.min = E(r.min, r.dataMin), b.max = E(r.max, r.dataMax), m.type !== b.linkedParent.options.type && a.error(11, 1, d)) : (!w && v(H) && (b.dataMin >= H ? (r = H, D = 0) : b.dataMax <= H && (t = H, x = 0)), b.min = E(y, r, b.dataMin), b.max = E(G, t, b.dataMax));
                h && (b.positiveValuesOnly && !f && 0 >= Math.min(b.min, E(b.dataMin, b.min)) && a.error(10, 1, d), b.min = p(b.log2lin(b.min), 15), b.max = p(b.log2lin(b.max), 15));
                b.range && v(b.max) && (b.userMin = b.min =
                    y = Math.max(b.dataMin, b.minFromRange()), b.userMax = G = b.max, b.range = null);
                e(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(B || b.axisPointRange || b.usePercentage || z) && v(b.min) && v(b.max) && (d = b.max - b.min) && (!v(y) && D && (b.min -= d * D), !v(G) && x && (b.max += d * x));
                g(m.softMin) && !g(b.userMin) && (b.min = Math.min(b.min, m.softMin));
                g(m.softMax) && !g(b.userMax) && (b.max = Math.max(b.max, m.softMax));
                g(m.floor) && (b.min = Math.min(Math.max(b.min, m.floor), Number.MAX_VALUE));
                g(m.ceiling) && (b.max = Math.max(Math.min(b.max,
                    m.ceiling), E(b.userMax, -Number.MAX_VALUE)));
                w && v(b.dataMin) && (H = H || 0, !v(y) && b.min < H && b.dataMin >= H ? b.min = H : !v(G) && b.max > H && b.dataMax <= H && (b.max = H));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : z && !k && A === b.linkedParent.options.tickPixelInterval ? k = b.linkedParent.tickInterval : E(k, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, B ? 1 : (b.max - b.min) * A / Math.max(b.len, A));
                l && !f && b.series.forEach(function(a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !k && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                f = E(m.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !k && b.tickInterval < f && (b.tickInterval = f);
                c || h || k || (b.tickInterval = u(b.tickInterval, null, n(b.tickInterval), E(m.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval =
                    b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var f = this.options,
                    b, g = f.tickPositions;
                b = this.getMinorTickInterval();
                var d = f.tickPositioner,
                    m = f.startOnTick,
                    h = f.endOnTick;
                this.tickmarkOffset = this.categories && "between" === f.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && v(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== f.allowDecimals);
                this.tickPositions =
                    b = g && g.slice();
                !b && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (b = [this.min, this.max], a.error(19, !1, this.chart)) : b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, f.units), this.min, this.max, f.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0],
                    b.pop()
                ], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, m, h);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), g || d || this.adjustTickAmount());
                e(this, "afterSetTickPositions")
            },
            trimTicks: function(a, b, g) {
                var f = a[0],
                    d = a[a.length - 1],
                    q = this.minPointOffset || 0;
                e(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== f) this.min = f;
                    else
                        for (; this.min - q > a[0];) a.shift();
                    if (g) this.max =
                        d;
                    else
                        for (; this.max + q < a[a.length - 1];) a.pop();
                    0 === a.length && v(f) && !this.options.tickPositions && a.push((d + f) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    b, g = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === g.alignTicks || !1 === g.startOnTick || !1 === g.endOnTick || this.isLog || this.chart[this.coll].forEach(function(f) {
                    var g = f.options,
                        g = [f.horiz ? g.left : g.top, g.width, g.height, g.pane].join();
                    f.series.length && (a[g] ? b = !0 : a[g] = 1)
                });
                return b
            },
            getTickAmount: function() {
                var a = this.options,
                    b = a.tickAmount,
                    g = a.tickPixelInterval;
                !v(a.tickInterval) && this.len < g && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / g) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function() {
                var a = this.options,
                    b = this.tickInterval,
                    g = this.tickPositions,
                    d = this.tickAmount,
                    e = this.finalTickAmt,
                    m = g && g.length,
                    h = E(this.threshold, this.softThreshold ? 0 : null),
                    n;
                if (this.hasData()) {
                    if (m < d) {
                        for (n = this.min; g.length < d;) g.length % 2 || n === h ? g.push(p(g[g.length - 1] + b)) : g.unshift(p(g[0] -
                            b));
                        this.transA *= (m - 1) / (d - 1);
                        this.min = a.startOnTick ? g[0] : Math.min(this.min, g[0]);
                        this.max = a.endOnTick ? g[g.length - 1] : Math.max(this.max, g[g.length - 1])
                    } else m > d && (this.tickInterval *= 2, this.setTickPositions());
                    if (v(e)) {
                        for (b = a = g.length; b--;)(3 === e && 1 === b % 2 || 2 >= e && 0 < b && b < a - 1) && g.splice(b, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function() {
                var a = this.series.some(function(a) {
                        return a.isDirtyData || a.isDirty || a.xAxis.isDirty
                    }),
                    b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                e(this, "afterSetScale")
            },
            setExtremes: function(a, b, g, d, m) {
                var f = this,
                    q = f.chart;
                g = E(g, !0);
                f.series.forEach(function(a) {
                    delete a.kdTree
                });
                m = h(m, {
                    min: a,
                    max: b
                });
                e(f, "setExtremes", m, function() {
                    f.userMin = a;
                    f.userMax = b;
                    f.eventArgs = m;
                    g && q.redraw(d)
                })
            },
            zoom: function(a, b) {
                var f = this.dataMin,
                    g = this.dataMax,
                    d = this.options,
                    q = Math.min(f, E(d.min, f)),
                    m = Math.max(g, E(d.max, g));
                a = {
                    newMin: a,
                    newMax: b
                };
                e(this, "zoom", a, function(a) {
                    var b = a.newMin,
                        d = a.newMax;
                    if (b !== this.min || d !== this.max) this.allowZoomOutside || (v(f) && (b < q && (b = q), b > m && (b = m)), v(g) && (d < q && (d = q), d > m && (d = m))), this.displayBtn = void 0 !==
                        b || void 0 !== d, this.setExtremes(b, d, !1, void 0, {
                            trigger: "zoom"
                        });
                    a.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function() {
                var f = this.chart,
                    b = this.options,
                    g = b.offsets || [0, 0, 0, 0],
                    d = this.horiz,
                    e = this.width = Math.round(a.relativeLength(E(b.width, f.plotWidth - g[3] + g[1]), f.plotWidth)),
                    m = this.height = Math.round(a.relativeLength(E(b.height, f.plotHeight - g[0] + g[2]), f.plotHeight)),
                    h = this.top = Math.round(a.relativeLength(E(b.top, f.plotTop + g[0]), f.plotHeight, f.plotTop)),
                    b = this.left = Math.round(a.relativeLength(E(b.left,
                        f.plotLeft + g[3]), f.plotWidth, f.plotLeft));
                this.bottom = f.chartHeight - m - h;
                this.right = f.chartWidth - e - b;
                this.len = Math.max(d ? e : m, 0);
                this.pos = d ? b : h
            },
            getExtremes: function() {
                var a = this.isLog;
                return {
                    min: a ? p(this.lin2log(this.min)) : this.min,
                    max: a ? p(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var f = this.isLog,
                    b = f ? this.lin2log(this.min) : this.min,
                    f = f ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = b : Infinity ===
                    a ? a = f : b > a ? a = b : f < a && (a = f);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                var f = (E(a, 0) - 90 * this.side + 720) % 360;
                a = {
                    align: "center"
                };
                e(this, "autoLabelAlign", a, function(a) {
                    15 < f && 165 > f ? a.align = "right" : 195 < f && 345 > f && (a.align = "left")
                });
                return a.align
            },
            tickSize: function(a) {
                var f = this.options,
                    b = f[a + "Length"],
                    g = E(f[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0),
                    d;
                g && b && ("inside" === f[a + "Position"] && (b = -b), d = [b, g]);
                a = {
                    tickSize: d
                };
                e(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function() {
                var a =
                    this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    b = this.horiz,
                    g = this.tickInterval,
                    d = g,
                    e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / g),
                    m, h = a.rotation,
                    n = this.labelMetrics(),
                    c, u = Number.MAX_VALUE,
                    z, l = this.max - this.min,
                    x = function(a) {
                        var f = a / (e || 1),
                            f = 1 < f ? Math.ceil(f) : 1;
                        f * g > l && Infinity !== a && Infinity !== e && (f = Math.ceil(l /
                            g));
                        return p(f * g)
                    };
                b ? (z = !a.staggerLines && !a.step && (v(h) ? [h] : e < E(a.autoRotationLimit, 80) && a.autoRotation)) && z.forEach(function(a) {
                    var f;
                    if (a === h || a && -90 <= a && 90 >= a) c = x(Math.abs(n.h / Math.sin(w * a))), f = c + Math.abs(a / 360), f < u && (u = f, m = a, d = c)
                }) : a.step || (d = x(n.h));
                this.autoRotation = z;
                this.labelRotation = E(m, h);
                return d
            },
            getSlotWidth: function(a) {
                var f = this.chart,
                    b = this.horiz,
                    g = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    e = f.margin[3];
                return a && a.slotWidth || b && 2 > (g.step ||
                    0) && !g.rotation && (this.staggerLines || 1) * this.len / d || !b && (g.style && parseInt(g.style.width, 10) || e && e - f.spacing[3] || .33 * f.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    g = a.renderer,
                    d = this.tickPositions,
                    e = this.ticks,
                    m = this.options.labels,
                    h = m && m.style || {},
                    n = this.horiz,
                    c = this.getSlotWidth(),
                    u = Math.max(1, Math.round(c - 2 * (m.padding || 5))),
                    z = {},
                    l = this.labelMetrics(),
                    x = m.style && m.style.textOverflow,
                    D, r, k = 0,
                    A;
                b(m.rotation) || (z.rotation = m.rotation || 0);
                d.forEach(function(a) {
                    (a = e[a]) && a.label && a.label.textPxLength >
                        k && (k = a.label.textPxLength)
                });
                this.maxLabelLength = k;
                if (this.autoRotation) k > u && k > l.h ? z.rotation = this.labelRotation : this.labelRotation = 0;
                else if (c && (D = u, !x))
                    for (r = "clip", u = d.length; !n && u--;)
                        if (A = d[u], A = e[A].label) A.styles && "ellipsis" === A.styles.textOverflow ? A.css({
                            textOverflow: "clip"
                        }) : A.textPxLength > c && A.css({
                            width: c + "px"
                        }), A.getBBox().height > this.len / d.length - (l.h - l.f) && (A.specificTextOverflow = "ellipsis");
                z.rotation && (D = k > .5 * a.chartHeight ? .33 * a.chartHeight : k, x || (r = "ellipsis"));
                if (this.labelAlign =
                    m.align || this.autoLabelAlign(this.labelRotation)) z.align = this.labelAlign;
                d.forEach(function(a) {
                    var f = (a = e[a]) && a.label,
                        b = h.width,
                        g = {};
                    f && (f.attr(z), a.shortenLabel ? a.shortenLabel() : D && !b && "nowrap" !== h.whiteSpace && (D < f.textPxLength || "SPAN" === f.element.tagName) ? (g.width = D, x || (g.textOverflow = f.specificTextOverflow || r), f.css(g)) : f.styles && f.styles.width && !g.width && !b && f.css({
                        width: null
                    }), delete f.specificTextOverflow, a.rotation = z.rotation)
                }, this);
                this.tickRotCorr = g.rotCorr(l.b, this.labelRotation || 0, 0 !==
                    this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || v(this.min) && v(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function(a) {
                var f = this.chart.renderer,
                    b = this.horiz,
                    g = this.opposite,
                    d = this.options.title,
                    e, m = this.chart.styledMode;
                this.axisTitle || ((e = d.textAlign) || (e = (b ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: g ? "right" : "left",
                        middle: "center",
                        high: g ? "left" : "right"
                    })[d.align]), this.axisTitle = f.text(d.text, 0, 0, d.useHTML).attr({
                        zIndex: 7,
                        rotation: d.rotation || 0,
                        align: e
                    }).addClass("highcharts-axis-title"),
                    m || this.axisTitle.css(x(d.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                m || d.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var f = this.ticks;
                f[a] ? f[a].addLabel() : f[a] = new D(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    g = b.renderer,
                    d = a.options,
                    m = a.tickPositions,
                    h = a.ticks,
                    n = a.horiz,
                    c = a.side,
                    u = b.inverted && !a.isZAxis ? [1, 0, 3, 2][c] : c,
                    z, l, x = 0,
                    D, r = 0,
                    k = d.title,
                    A = d.labels,
                    B = 0,
                    p = b.axisOffset,
                    b = b.clipOffset,
                    w = [-1, 1, 1, -1][c],
                    t = d.className,
                    y = a.axisParent;
                z = a.hasData();
                a.showAxis = l = z || E(d.showEmpty, !0);
                a.staggerLines = a.horiz && A.staggerLines;
                a.axisGroup || (a.gridGroup = g.g("grid").attr({
                    zIndex: d.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(y), a.axisGroup = g.g("axis").attr({
                    zIndex: d.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(y), a.labelGroup = g.g("axis-labels").attr({
                    zIndex: A.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " +
                    (t || "")).add(y));
                z || a.isLinked ? (m.forEach(function(b, f) {
                    a.generateTick(b, f)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === c || 2 === c || {
                    1: "left",
                    3: "right"
                } [c] === a.labelAlign, E(A.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && m.forEach(function(a) {
                    B = Math.max(h[a].getLabelSize(), B)
                }), a.staggerLines && (B *= a.staggerLines), a.labelOffset = B * (a.opposite ? -1 : 1)) : H(h, function(a, b) {
                    a.destroy();
                    delete h[b]
                });
                k && k.text && !1 !== k.enabled && (a.addTitle(l), l && !1 !== k.reserveSpace && (a.titleOffset = x =
                    a.axisTitle.getBBox()[n ? "height" : "width"], D = k.offset, r = v(D) ? 0 : E(k.margin, n ? 5 : 10)));
                a.renderLine();
                a.offset = w * E(d.offset, p[c] ? p[c] + (d.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                g = 0 === c ? -a.labelMetrics().h : 2 === c ? a.tickRotCorr.y : 0;
                r = Math.abs(B) + r;
                B && (r = r - g + w * (n ? E(A.y, a.tickRotCorr.y + 8 * w) : A.x));
                a.axisTitleMargin = E(D, r);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(h, m));
                n = this.tickSize("tick");
                p[c] = Math.max(p[c], a.axisTitleMargin + x + w * a.offset, r, z && m.length && n ? n[0] + w *
                    a.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[u] = Math.max(b[u], d);
                e(this, "afterGetOffset")
            },
            getLinePath: function(a) {
                var b = this.chart,
                    f = this.opposite,
                    g = this.offset,
                    d = this.horiz,
                    e = this.left + (f ? this.width : 0) + g,
                    g = b.chartHeight - this.bottom - (f ? this.height : 0) + g;
                f && (a *= -1);
                return b.renderer.crispLine(["M", d ? this.left : e, d ? g : this.top, "L", d ? b.chartWidth - this.right : e, d ? g : b.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.chart.styledMode || this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            },
            getTitlePosition: function() {
                var a = this.horiz,
                    b = this.left,
                    g = this.top,
                    d = this.len,
                    m = this.options.title,
                    h = a ? b : g,
                    n = this.opposite,
                    c = this.offset,
                    u = m.x || 0,
                    z = m.y || 0,
                    l = this.axisTitle,
                    x = this.chart.renderer.fontMetrics(m.style && m.style.fontSize, l),
                    l = Math.max(l.getBBox(null, 0).height - x.h - 1, 0),
                    d = {
                        low: h + (a ? 0 : d),
                        middle: h + d / 2,
                        high: h + (a ? d : 0)
                    } [m.align],
                    b = (a ? g + this.height : b) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + [-l, l, x.f, -l][this.side],
                    a = {
                        x: a ? d + u : b + (n ? this.width : 0) + c + u,
                        y: a ? b + z - (n ? this.height : 0) + c : d + z
                    };
                e(this, "afterGetTitlePosition", {
                    titlePosition: a
                });
                return a
            },
            renderMinorTick: function(a) {
                var b = this.chart.hasRendered && g(this.oldMin),
                    f = this.minorTicks;
                f[a] || (f[a] = new D(this, a, "minor"));
                b && f[a].isNew && f[a].render(null, !0);
                f[a].render(null, !1, 1)
            },
            renderTick: function(a, b) {
                var f = this.isLinked,
                    d = this.ticks,
                    e = this.chart.hasRendered && g(this.oldMin);
                if (!f || a >= this.min && a <= this.max) d[a] || (d[a] = new D(this, a)), e && d[a].isNew &&
                    d[a].render(b, !0, -1), d[a].render(b)
            },
            render: function() {
                var b = this,
                    d = b.chart,
                    m = b.options,
                    h = b.isLog,
                    n = b.isLinked,
                    c = b.tickPositions,
                    u = b.axisTitle,
                    l = b.ticks,
                    x = b.minorTicks,
                    r = b.alternateBands,
                    k = m.stackLabels,
                    A = m.alternateGridColor,
                    B = b.tickmarkOffset,
                    E = b.axisLine,
                    p = b.showAxis,
                    w = F(d.renderer.globalAnimation),
                    t, v;
                b.labelEdge.length = 0;
                b.overlap = !1;
                [l, x, r].forEach(function(a) {
                    H(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || n) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function(a) {
                        b.renderMinorTick(a)
                    }),
                    c.length && (c.forEach(function(a, f) {
                        b.renderTick(a, f)
                    }), B && (0 === b.min || b.single) && (l[-1] || (l[-1] = new D(b, -1, null, !0)), l[-1].render(-1))), A && c.forEach(function(f, g) {
                        v = void 0 !== c[g + 1] ? c[g + 1] + B : b.max - B;
                        0 === g % 2 && f < b.max && v <= b.max + (d.polar ? -B : B) && (r[f] || (r[f] = new a.PlotLineOrBand(b)), t = f + B, r[f].options = {
                            from: h ? b.lin2log(t) : t,
                            to: h ? b.lin2log(v) : v,
                            color: A
                        }, r[f].render(), r[f].isActive = !0)
                    }), b._addedPlotLB || ((m.plotLines || []).concat(m.plotBands || []).forEach(function(a) {
                        b.addPlotBandOrLine(a)
                    }), b._addedPlotLB = !0);
                [l, x, r].forEach(function(a) {
                    var b, f = [],
                        g = w.duration;
                    H(a, function(a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, f.push(b))
                    });
                    z(function() {
                        for (b = f.length; b--;) a[f[b]] && !a[f[b]].isActive && (a[f[b]].destroy(), delete a[f[b]])
                    }, a !== r && d.hasRendered && g ? g : 0)
                });
                E && (E[E.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(E.strokeWidth())
                }), E.isPlaced = !0, E[p ? "show" : "hide"](!0));
                u && p && (m = b.getTitlePosition(), g(m.y) ? (u[u.isNew ? "attr" : "animate"](m), u.isNew = !1) : (u.attr("y", -9999), u.isNew = !0));
                k && k.enabled && b.renderStackTotals();
                b.isDirty = !1;
                e(this, "afterRender")
            },
            redraw: function() {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function(a) {
                    a.render()
                }));
                this.series.forEach(function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    f = b.stacks,
                    g = b.plotLinesAndBands,
                    d;
                e(this, "destroy", {
                    keepEvents: a
                });
                a || B(b);
                H(f, function(a, b) {
                    r(a);
                    f[b] = null
                });
                [b.ticks, b.minorTicks, b.alternateBands].forEach(function(a) {
                    r(a)
                });
                if (g)
                    for (a = g.length; a--;) g[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (d in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[d] = b.plotLinesAndBandsGroups[d].destroy();
                H(b, function(a, f) {
                    -1 === b.keepProps.indexOf(f) && delete b[f]
                })
            },
            drawCrosshair: function(a, b) {
                var f, g = this.crosshair,
                    d = E(g.snap, !0),
                    m, h = this.cross;
                e(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (v(b) || !d)) {
                    d ? v(b) &&
                        (m = E(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : m = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    v(m) && (f = this.getPlotLinePath(b && (this.isXAxis ? b.x : E(b.stackY, b.y)), null, null, null, m) || null);
                    if (!v(f)) {
                        this.hideCrosshair();
                        return
                    }
                    d = this.categories && !this.isRadial;
                    h || (this.cross = h = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + g.className).attr({
                        zIndex: E(g.zIndex, 2)
                    }).add(), this.chart.styledMode || (h.attr({
                        stroke: g.color ||
                            (d ? c("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": E(g.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), g.dashStyle && h.attr({
                        dashstyle: g.dashStyle
                    })));
                    h.show().attr({
                        d: f
                    });
                    d && !g.width && h.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                e(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide();
                e(this, "afterHideCrosshair")
            }
        });
        return a.Axis = A
    }(I);
    (function(a) {
        var y = a.Axis,
            F = a.getMagnitude,
            G = a.normalizeTickInterval,
            k = a.timeUnits;
        y.prototype.getTimeTicks = function() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        y.prototype.normalizeTimeTickInterval = function(a, p) {
            var c = p || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            p = c[c.length - 1];
            var v = k[p[0]],
                w = p[1],
                r;
            for (r = 0; r < c.length && !(p = c[r], v = k[p[0]], w = p[1], c[r + 1] && a <= (v * w[w.length - 1] + k[c[r + 1][0]]) / 2); r++);
            v ===
                k.year && a < 5 * v && (w = [1, 2, 5]);
            a = G(a / v, w, "year" === p[0] ? Math.max(F(a / v), 1) : 1);
            return {
                unitRange: v,
                count: a,
                unitName: p[0]
            }
        }
    })(I);
    (function(a) {
        var y = a.Axis,
            F = a.getMagnitude,
            G = a.normalizeTickInterval,
            k = a.pick;
        y.prototype.getLogTickPositions = function(a, p, t, v) {
            var c = this.options,
                r = this.len,
                h = [];
            v || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), h = this.getLinearTickPositions(a, p, t);
            else if (.08 <= a)
                for (var r = Math.floor(p), e, l, n, d, g, c = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; r < t + 1 && !g; r++)
                    for (l =
                        c.length, e = 0; e < l && !g; e++) n = this.log2lin(this.lin2log(r) * c[e]), n > p && (!v || d <= t) && void 0 !== d && h.push(d), d > t && (g = !0), d = n;
            else p = this.lin2log(p), t = this.lin2log(t), a = v ? this.getMinorTickInterval() : c.tickInterval, a = k("auto" === a ? null : a, this._minorAutoInterval, c.tickPixelInterval / (v ? 5 : 1) * (t - p) / ((v ? r / this.tickPositions.length : r) || 1)), a = G(a, null, F(a)), h = this.getLinearTickPositions(a, p, t).map(this.log2lin), v || (this._minorAutoInterval = a / 5);
            v || (this.tickInterval = a);
            return h
        };
        y.prototype.log2lin = function(a) {
            return Math.log(a) /
                Math.LN10
        };
        y.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(I);
    (function(a, y) {
        var F = a.arrayMax,
            G = a.arrayMin,
            k = a.defined,
            c = a.destroyObjectProperties,
            p = a.erase,
            t = a.merge,
            v = a.pick;
        a.PlotLineOrBand = function(a, c) {
            this.axis = a;
            c && (this.options = c, this.id = c.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                a.fireEvent(this, "render");
                var c = this,
                    r = c.axis,
                    h = r.horiz,
                    e = c.options,
                    l = e.label,
                    n = c.label,
                    d = e.to,
                    g = e.from,
                    b = e.value,
                    x = k(g) && k(d),
                    u = k(b),
                    p = c.svgElem,
                    E = !p,
                    B = [],
                    m = e.color,
                    z = v(e.zIndex, 0),
                    D = e.events,
                    B = {
                        "class": "highcharts-plot-" + (x ? "band " : "line ") + (e.className || "")
                    },
                    A = {},
                    f = r.chart.renderer,
                    q = x ? "bands" : "lines";
                r.isLog && (g = r.log2lin(g), d = r.log2lin(d), b = r.log2lin(b));
                r.chart.styledMode || (u ? (B.stroke = m, B["stroke-width"] = e.width, e.dashStyle && (B.dashstyle = e.dashStyle)) : x && (m && (B.fill = m), e.borderWidth && (B.stroke = e.borderColor, B["stroke-width"] = e.borderWidth)));
                A.zIndex = z;
                q += "-" + z;
                (m = r.plotLinesAndBandsGroups[q]) || (r.plotLinesAndBandsGroups[q] = m = f.g("plot-" + q).attr(A).add());
                E && (c.svgElem = p = f.path().attr(B).add(m));
                if (u) B = r.getPlotLinePath(b, p.strokeWidth());
                else if (x) B = r.getPlotBandPath(g, d, e);
                else return;
                E && B && B.length ? (p.attr({
                    d: B
                }), D && a.objectEach(D, function(a, b) {
                    p.on(b, function(a) {
                        D[b].apply(c, [a])
                    })
                })) : p && (B ? (p.show(), p.animate({
                    d: B
                })) : (p.hide(), n && (c.label = n = n.destroy())));
                l && k(l.text) && B && B.length && 0 < r.width && 0 < r.height && !B.isFlat ? (l = t({
                    align: h && x && "center",
                    x: h ? !x && 4 : 10,
                    verticalAlign: !h && x && "middle",
                    y: h ? x ? 16 : 10 : x ? 6 : -4,
                    rotation: h && !x && 90
                }, l), this.renderLabel(l, B, x, z)) : n && n.hide();
                return c
            },
            renderLabel: function(a,
                c, h, e) {
                var l = this.label,
                    n = this.axis.chart.renderer;
                l || (l = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (h ? "band" : "line") + "-label " + (a.className || "")
                }, l.zIndex = e, this.label = l = n.text(a.text, 0, 0, a.useHTML).attr(l).add(), this.axis.chart.styledMode || l.css(a.style));
                e = c.xBounds || [c[1], c[4], h ? c[6] : c[1]];
                c = c.yBounds || [c[2], c[5], h ? c[7] : c[2]];
                h = G(e);
                n = G(c);
                l.align(a, !1, {
                    x: h,
                    y: n,
                    width: F(e) - h,
                    height: F(c) - n
                });
                l.show()
            },
            destroy: function() {
                p(this.axis.plotLinesAndBands, this);
                delete this.axis;
                c(this)
            }
        };
        a.extend(y.prototype, {
            getPlotBandPath: function(a, c) {
                var h = this.getPlotLinePath(c, null, null, !0),
                    e = this.getPlotLinePath(a, null, null, !0),
                    l = [],
                    n = this.horiz,
                    d = 1,
                    g;
                a = a < this.min && c < this.min || a > this.max && c > this.max;
                if (e && h)
                    for (a && (g = e.toString() === h.toString(), d = 0), a = 0; a < e.length; a += 6) n && h[a + 1] === e[a + 1] ? (h[a + 1] += d, h[a + 4] += d) : n || h[a + 2] !== e[a + 2] || (h[a + 2] += d, h[a + 5] += d), l.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], h[a + 4], h[a + 5], h[a + 1], h[a + 2], "z"), l.isFlat = g;
                return l
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(c, r) {
                var h = (new a.PlotLineOrBand(this, c)).render(),
                    e = this.userOptions;
                h && (r && (e[r] = e[r] || [], e[r].push(c)), this.plotLinesAndBands.push(h));
                return h
            },
            removePlotBandOrLine: function(a) {
                for (var c = this.plotLinesAndBands, h = this.options, e = this.userOptions, l = c.length; l--;) c[l].id === a && c[l].destroy();
                [h.plotLines || [], e.plotLines || [], h.plotBands || [], e.plotBands || []].forEach(function(e) {
                    for (l = e.length; l--;) e[l].id ===
                        a && p(e, e[l])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(I, X);
    (function(a) {
        var y = a.doc,
            F = a.extend,
            G = a.format,
            k = a.isNumber,
            c = a.merge,
            p = a.pick,
            t = a.splat,
            v = a.syncTimeout,
            w = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, h) {
                this.chart = a;
                this.options = h;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = h.split && !a.inverted;
                this.shared = h.shared || this.split;
                this.outside =
                    h.outside && !this.split
            },
            cleanSplit: function(a) {
                this.chart.series.forEach(function(h) {
                    var e = h && h.tt;
                    e && (!e.isActive || a ? h.tt = e.destroy() : e.isActive = !1)
                })
            },
            applyFilter: function() {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        "in": "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                                tagName: "feMergeNode"
                            },
                            {
                                tagName: "feMergeNode",
                                "in": "SourceGraphic"
                            }
                        ]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            },
            getLabel: function() {
                var c = this,
                    h = this.chart.renderer,
                    e = this.chart.styledMode,
                    l = this.options,
                    n, d;
                this.label || (this.outside && (this.container = n = a.doc.createElement("div"), n.className = "highcharts-tooltip-container", a.css(n, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: l.style && l.style.pointerEvents
                    }), a.doc.body.appendChild(n), this.renderer =
                    h = new a.Renderer(n, 0, 0)), this.split ? this.label = h.g("tooltip") : (this.label = h.label("", 0, 0, l.shape || "callout", null, null, l.useHTML, null, "tooltip").attr({
                    padding: l.padding,
                    r: l.borderRadius
                }), e || this.label.attr({
                    fill: l.backgroundColor,
                    "stroke-width": l.borderWidth
                }).css(l.style).shadow(l.shadow)), e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (d = {
                    x: this.label.xSetter,
                    y: this.label.ySetter
                }, this.label.xSetter = function(a, b) {
                    d[b].call(this.label, c.distance);
                    n.style.left = a + "px"
                }, this.label.ySetter = function(a, b) {
                    d[b].call(this.label, c.distance);
                    n.style.top = a + "px"
                }), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                c(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, c(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function(c, h, e, l) {
                var n = this,
                    d = n.now,
                    g = !1 !== n.options.animation && !n.isHidden && (1 < Math.abs(c - d.x) || 1 < Math.abs(h - d.y)),
                    b = n.followPointer || 1 < n.len;
                F(d, {
                    x: g ? (2 * d.x + c) / 3 : c,
                    y: g ? (d.y + h) / 2 : h,
                    anchorX: b ? void 0 : g ? (2 * d.anchorX + e) / 3 : e,
                    anchorY: b ? void 0 : g ? (d.anchorY + l) / 2 : l
                });
                n.getLabel().attr(d);
                g && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    n && n.move(c, h, e, l)
                }, 32))
            },
            hide: function(c) {
                var h = this;
                a.clearTimeout(this.hideTimer);
                c = p(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = v(function() {
                    h.getLabel()[c ? "fadeOut" : "hide"]();
                    h.isHidden = !0
                }, c))
            },
            getAnchor: function(a, c) {
                var e = this.chart,
                    h = e.pointer,
                    n = e.inverted,
                    d = e.plotTop,
                    g = e.plotLeft,
                    b = 0,
                    x = 0,
                    u, k;
                a = t(a);
                this.followPointer && c ? (void 0 === c.chartX && (c = h.normalize(c)), a = [c.chartX - e.plotLeft, c.chartY - d]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function(a) {
                    u = a.series.yAxis;
                    k = a.series.xAxis;
                    b += a.plotX + (!n && k ? k.left - g : 0);
                    x += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) +
                        (!n && u ? u.top - d : 0)
                }), b /= a.length, x /= a.length, a = [n ? e.plotWidth - x : b, this.shared && !n && 1 < a.length && c ? c.chartY - d : n ? e.plotHeight - b : x]);
                return a.map(Math.round)
            },
            getPosition: function(a, c, e) {
                var h = this.chart,
                    n = this.distance,
                    d = {},
                    g = h.inverted && e.h || 0,
                    b, x = this.outside,
                    u = x ? y.documentElement.clientWidth - 2 * n : h.chartWidth,
                    k = x ? Math.max(y.body.scrollHeight, y.documentElement.scrollHeight, y.body.offsetHeight, y.documentElement.offsetHeight, y.documentElement.clientHeight) : h.chartHeight,
                    r = h.pointer.chartPosition,
                    B = ["y",
                        k, c, (x ? r.top - n : 0) + e.plotY + h.plotTop, x ? 0 : h.plotTop, x ? k : h.plotTop + h.plotHeight
                    ],
                    m = ["x", u, a, (x ? r.left - n : 0) + e.plotX + h.plotLeft, x ? 0 : h.plotLeft, x ? u : h.plotLeft + h.plotWidth],
                    z = !this.followPointer && p(e.ttBelow, !h.inverted === !!e.negative),
                    D = function(a, b, f, e, m, c) {
                        var h = f < e - n,
                            q = e + n + f < b,
                            u = e - n - f;
                        e += n;
                        if (z && q) d[a] = e;
                        else if (!z && h) d[a] = u;
                        else if (h) d[a] = Math.min(c - f, 0 > u - g ? u : u - g);
                        else if (q) d[a] = Math.max(m, e + g + f > b ? e : e + g);
                        else return !1
                    },
                    A = function(a, b, f, g) {
                        var e;
                        g < n || g > b - n ? e = !1 : d[a] = g < f / 2 ? 1 : g > b - f / 2 ? b - f - 2 : g - f / 2;
                        return e
                    },
                    f = function(a) {
                        var f = B;
                        B = m;
                        m = f;
                        b = a
                    },
                    q = function() {
                        !1 !== D.apply(0, B) ? !1 !== A.apply(0, m) || b || (f(!0), q()) : b ? d.x = d.y = 0 : (f(!0), q())
                    };
                (h.inverted || 1 < this.len) && f();
                q();
                return d
            },
            defaultFormatter: function(a) {
                var c = this.points || t(this),
                    e;
                e = [a.tooltipFooterHeaderFormatter(c[0])];
                e = e.concat(a.bodyFormatter(c));
                e.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return e
            },
            refresh: function(c, h) {
                var e, l = this.options,
                    n, d = c,
                    g, b = {},
                    x = [];
                e = l.formatter || this.defaultFormatter;
                var b = this.shared,
                    u, k = this.chart.styledMode;
                l.enabled &&
                    (a.clearTimeout(this.hideTimer), this.followPointer = t(d)[0].series.tooltipOptions.followPointer, g = this.getAnchor(d, h), h = g[0], n = g[1], !b || d.series && d.series.noSharedTooltip ? b = d.getLabelConfig() : (d.forEach(function(a) {
                        a.setState("hover");
                        x.push(a.getLabelConfig())
                    }), b = {
                        x: d[0].category,
                        y: d[0].y
                    }, b.points = x, d = d[0]), this.len = x.length, b = e.call(b, this), u = d.series, this.distance = p(u.tooltipOptions.distance, 16), !1 === b ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({
                        opacity: 1
                    }).show(), this.split ? this.renderSplit(b,
                        t(c)) : (l.style.width && !k || e.css({
                        width: this.chart.spacingBox.width
                    }), e.attr({
                        text: b && b.join ? b.join("") : b
                    }), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + p(d.colorIndex, u.colorIndex)), k || e.attr({
                        stroke: l.borderColor || d.color || u.color || "#666666"
                    }), this.updatePosition({
                        plotX: h,
                        plotY: n,
                        negative: d.negative,
                        ttBelow: d.ttBelow,
                        h: g[2] || 0
                    })), this.isHidden = !1))
            },
            renderSplit: function(c, h) {
                var e = this,
                    l = [],
                    n = this.chart,
                    d = n.renderer,
                    g = !0,
                    b = this.options,
                    x = 0,
                    u, k = this.getLabel(),
                    r = n.plotTop;
                a.isString(c) && (c = [!1, c]);
                c.slice(0, h.length + 1).forEach(function(a, m) {
                    if (!1 !== a && "" !== a) {
                        m = h[m - 1] || {
                            isHeader: !0,
                            plotX: h[0].plotX,
                            plotY: n.plotHeight
                        };
                        var c = m.series || e,
                            D = c.tt,
                            A = m.series || {},
                            f = "highcharts-color-" + p(m.colorIndex, A.colorIndex, "none");
                        D || (D = {
                            padding: b.padding,
                            r: b.borderRadius
                        }, n.styledMode || (D.fill = b.backgroundColor, D.stroke = b.borderColor || m.color || A.color || "#333333", D["stroke-width"] = b.borderWidth), c.tt = D = d.label(null, null, null, (m.isHeader ? b.headerShape : b.shape) || "callout", null, null,
                            b.useHTML).addClass("highcharts-tooltip-box " + f).attr(D).add(k));
                        D.isActive = !0;
                        D.attr({
                            text: a
                        });
                        n.styledMode || D.css(b.style).shadow(b.shadow);
                        a = D.getBBox();
                        A = a.width + D.strokeWidth();
                        m.isHeader ? (x = a.height, n.xAxis[0].opposite && (u = !0, r -= x), A = Math.max(0, Math.min(m.plotX + n.plotLeft - A / 2, n.chartWidth + (n.scrollablePixels ? n.scrollablePixels - n.marginRight : 0) - A))) : A = m.plotX + n.plotLeft - p(b.distance, 16) - A;
                        0 > A && (g = !1);
                        a = (m.series && m.series.yAxis && m.series.yAxis.pos) + (m.plotY || 0);
                        a -= r;
                        m.isHeader && (a = u ? -x : n.plotHeight +
                            x);
                        l.push({
                            target: a,
                            rank: m.isHeader ? 1 : 0,
                            size: c.tt.getBBox().height + 1,
                            point: m,
                            x: A,
                            tt: D
                        })
                    }
                });
                this.cleanSplit();
                b.positioner && l.forEach(function(a) {
                    var g = b.positioner.call(e, a.tt.getBBox().width, a.size, a.point);
                    a.x = g.x;
                    a.align = 0;
                    a.target = g.y;
                    a.rank = p(g.rank, a.rank)
                });
                a.distribute(l, n.plotHeight + x);
                l.forEach(function(a) {
                    var d = a.point,
                        c = d.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: g || d.isHeader || b.positioner ? a.x : d.plotX + n.plotLeft + e.distance,
                        y: a.pos + r,
                        anchorX: d.isHeader ? d.plotX + n.plotLeft : d.plotX + c.xAxis.pos,
                        anchorY: d.isHeader ? n.plotTop + n.plotHeight / 2 : d.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var c = this.chart,
                    e = this.getLabel(),
                    l = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a),
                    n = a.plotX + c.plotLeft;
                a = a.plotY + c.plotTop;
                var d;
                this.outside && (d = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(e.width + d, e.height + d, !1), n += c.pointer.chartPosition.left - l.x, a += c.pointer.chartPosition.top - l.y);
                this.move(Math.round(l.x), Math.round(l.y || 0),
                    n, a)
            },
            getDateFormat: function(a, c, e, l) {
                var h = this.chart.time,
                    d = h.dateFormat("%m-%d %H:%M:%S.%L", c),
                    g, b, x = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    u = "millisecond";
                for (b in w) {
                    if (a === w.week && +h.dateFormat("%w", c) === e && "00:00:00.000" === d.substr(6)) {
                        b = "week";
                        break
                    }
                    if (w[b] > a) {
                        b = u;
                        break
                    }
                    if (x[b] && d.substr(x[b]) !== "01-01 00:00:00.000".substr(x[b])) break;
                    "week" !== b && (u = b)
                }
                b && (g = h.resolveDTLFormat(l[b]).main);
                return g
            },
            getXDateFormat: function(a, c, e) {
                c = c.dateTimeLabelFormats;
                var h = e && e.closestPointRange;
                return (h ? this.getDateFormat(h, a.x, e.options.startOfWeek, c) : c.day) || c.year
            },
            tooltipFooterHeaderFormatter: function(c, h) {
                var e = h ? "footer" : "header",
                    l = c.series,
                    n = l.tooltipOptions,
                    d = n.xDateFormat,
                    g = l.xAxis,
                    b = g && "datetime" === g.options.type && k(c.key),
                    x = n[e + "Format"];
                h = {
                    isFooter: h,
                    labelConfig: c
                };
                a.fireEvent(this, "headerFormatter", h, function(a) {
                    b && !d && (d = this.getXDateFormat(c, n, g));
                    b && d && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(function(a) {
                        x = x.replace("{point." + a + "}", "{point." + a + ":" + d + "}")
                    });
                    l.chart.styledMode &&
                        (x = this.styledModeFormat(x));
                    a.text = G(x, {
                        point: c,
                        series: l
                    }, this.chart.time)
                });
                return h.text
            },
            bodyFormatter: function(a) {
                return a.map(function(a) {
                    var e = a.series.tooltipOptions;
                    return (e[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, e[(a.point.formatPrefix || "point") + "Format"] || "")
                })
            },
            styledModeFormat: function(a) {
                return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"')
            }
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.attr,
            G = a.charts,
            k = a.color,
            c = a.css,
            p = a.defined,
            t = a.extend,
            v = a.find,
            w = a.fireEvent,
            r = a.isNumber,
            h = a.isObject,
            e = a.offset,
            l = a.pick,
            n = a.splat,
            d = a.Tooltip;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                d && (a.tooltip = new d(a, b.tooltip), this.followTouchMove = l(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b =
                    this.chart,
                    g = b.options.chart,
                    d = g.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (d = l(g.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a && !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            },
            normalize: function(a, b) {
                var g;
                g = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = e(this.chart.container));
                return t(a, {
                    chartX: Math.round(g.pageX - b.left),
                    chartY: Math.round(g.pageY - b.top)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function(g) {
                    b[g.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: g,
                        value: g.toValue(a[g.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function(a, b, d) {
                var g;
                a.forEach(function(a) {
                    var e = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(d, e);
                    if ((e = h(a, !0)) && !(e = !h(g, !0))) var e = g.distX - a.distX,
                        c = g.dist - a.dist,
                        m = (a.series.group && a.series.group.zIndex) - (g.series.group && g.series.group.zIndex),
                        e = 0 < (0 !== e && b ? e : 0 !== c ? c : 0 !== m ? m : g.series.index > a.series.index ?
                            -1 : 1);
                    e && (g = a)
                });
                return g
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function(a, b) {
                var g = a.series,
                    d = g.xAxis,
                    g = g.yAxis,
                    e = l(a.clientX, a.plotX),
                    c = a.shapeArgs;
                if (d && g) return b ? {
                    chartX: d.len + d.pos - e,
                    chartY: g.len + g.pos - a.plotY
                } : {
                    chartX: e + d.pos,
                    chartY: a.plotY + g.pos
                };
                if (c && c.x && c.y) return {
                    chartX: c.x,
                    chartY: c.y
                }
            },
            getHoverData: function(a, b, d, e, c, n) {
                var g, m = [];
                e = !(!e || !a);
                var z = b && !b.stickyTracking ? [b] : d.filter(function(a) {
                    return a.visible &&
                        !(!c && a.directTouch) && l(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                b = (g = e ? a : this.findNearestKDPoint(z, c, n)) && g.series;
                g && (c && !b.noSharedTooltip ? (z = d.filter(function(a) {
                    return a.visible && !(!c && a.directTouch) && l(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), z.forEach(function(a) {
                    var b = v(a.points, function(a) {
                        return a.x === g.x && !a.isNull
                    });
                    h(b) && (a.chart.isBoosting && (b = a.getPoint(b)), m.push(b))
                })) : m.push(g));
                return {
                    hoverPoint: g,
                    hoverSeries: b,
                    hoverPoints: m
                }
            },
            runPointActions: function(g,
                b) {
                var d = this.chart,
                    e = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    c = e ? e.shared : !1,
                    h = b || d.hoverPoint,
                    n = h && h.series || d.hoverSeries,
                    n = this.getHoverData(h, n, d.series, "touchmove" !== g.type && (!!b || n && n.directTouch && this.isDirectTouch), c, g),
                    m, h = n.hoverPoint;
                m = n.hoverPoints;
                b = (n = n.hoverSeries) && n.tooltipOptions.followPointer;
                c = c && n && !n.noSharedTooltip;
                if (h && (h !== d.hoverPoint || e && e.isHidden)) {
                    (d.hoverPoints || []).forEach(function(a) {
                        -1 === m.indexOf(a) && a.setState()
                    });
                    (m || []).forEach(function(a) {
                        a.setState("hover")
                    });
                    if (d.hoverSeries !== n) n.onMouseOver();
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!h.series) return;
                    h.firePointEvent("mouseOver");
                    d.hoverPoints = m;
                    d.hoverPoint = h;
                    e && e.refresh(c ? m : h, g)
                } else b && e && !e.isHidden && (h = e.getAnchor([{}], g), e.updatePosition({
                    plotX: h[0],
                    plotY: h[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = y(d.container.ownerDocument, "mousemove", function(b) {
                    var g = G[a.hoverChartIndex];
                    if (g) g.pointer.onDocumentMouseMove(b)
                }));
                d.axes.forEach(function(b) {
                    var d = l(b.crosshair.snap, !0),
                        e = d ? a.find(m, function(a) {
                            return a.series[b.coll] === b
                        }) : void 0;
                    e || !d ? b.drawCrosshair(g, e) : b.hideCrosshair()
                })
            },
            reset: function(a, b) {
                var g = this.chart,
                    d = g.hoverSeries,
                    e = g.hoverPoint,
                    c = g.hoverPoints,
                    h = g.tooltip,
                    m = h && h.shared ? c : e;
                a && m && n(m).forEach(function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) h && m && n(m).length && (h.refresh(m), h.shared && c ? c.forEach(function(a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair &&
                        a.series.yAxis.drawCrosshair(null, a))
                }) : e && (e.setState(e.state, !0), g.axes.forEach(function(a) {
                    a.crosshair && a.drawCrosshair(null, e)
                })));
                else {
                    if (e) e.onMouseOut();
                    c && c.forEach(function(a) {
                        a.setState()
                    });
                    if (d) d.onMouseOut();
                    h && h.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    g.axes.forEach(function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = g.hoverPoints = g.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var g = this.chart,
                    d;
                g.series.forEach(function(e) {
                    d = a || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled &&
                        e.group && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? g.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
                });
                g.clipRect.attr(b || g.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    g = b.options.chart,
                    d = a.chartX,
                    e = a.chartY,
                    c = this.zoomHor,
                    h = this.zoomVert,
                    m = b.plotLeft,
                    n = b.plotTop,
                    l = b.plotWidth,
                    A = b.plotHeight,
                    f, q = this.selectionMarker,
                    r = this.mouseDownX,
                    p = this.mouseDownY,
                    t = g.panKey && a[g.panKey + "Key"];
                q && q.touch || (d < m ? d = m : d > m + l && (d = m + l), e < n ? e = n : e > n + A && (e = n + A), this.hasDragged = Math.sqrt(Math.pow(r - d, 2) + Math.pow(p - e, 2)), 10 < this.hasDragged && (f = b.isInsidePlot(r - m, p - n), b.hasCartesianSeries && (this.zoomX || this.zoomY) && f && !t && !q && (this.selectionMarker = q = b.renderer.rect(m, n, c ? 1 : l, h ? 1 : A, 0).attr({
                        "class": "highcharts-selection-marker",
                        zIndex: 7
                    }).add(), b.styledMode || q.attr({
                        fill: g.selectionMarkerFill || k("#335cad").setOpacity(.25).get()
                    })), q &&
                    c && (d -= r, q.attr({
                        width: Math.abs(d),
                        x: (0 < d ? 0 : d) + r
                    })), q && h && (d = e - p, q.attr({
                        height: Math.abs(d),
                        y: (0 < d ? 0 : d) + p
                    })), f && !q && g.panning && b.pan(a, g.panning)))
            },
            drop: function(a) {
                var b = this,
                    d = this.chart,
                    g = this.hasPinched;
                if (this.selectionMarker) {
                    var e = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        h = this.selectionMarker,
                        n = h.attr ? h.attr("x") : h.x,
                        m = h.attr ? h.attr("y") : h.y,
                        l = h.attr ? h.attr("width") : h.width,
                        D = h.attr ? h.attr("height") : h.height,
                        k;
                    if (this.hasDragged || g) d.axes.forEach(function(f) {
                        if (f.zoomEnabled && p(f.min) && (g || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [f.coll]])) {
                            var d = f.horiz,
                                c = "touchend" === a.type ? f.minPixelPadding : 0,
                                h = f.toValue((d ? n : m) + c),
                                d = f.toValue((d ? n + l : m + D) - c);
                            e[f.coll].push({
                                axis: f,
                                min: Math.min(h, d),
                                max: Math.max(h, d)
                            });
                            k = !0
                        }
                    }), k && w(d, "selection", e, function(a) {
                        d.zoom(t(a, g ? {
                            animation: !1
                        } : null))
                    });
                    r(d.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    g && this.scaleGroups()
                }
                d && r(d.index) && (c(d.container, {
                    cursor: d._cursor
                }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function(d) {
                G[a.hoverChartIndex] && G[a.hoverChartIndex].pointer.drop(d)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(d) {
                var b = G[a.hoverChartIndex];
                b && (d.relatedTarget || d.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(d) {
                var b = this.chart;
                p(a.hoverChartIndex) && G[a.hoverChartIndex] && G[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                d = this.normalize(d);
                d.preventDefault || (d.returnValue = !1);
                "mousedown" === b.mouseIsDown && this.drag(d);
                !this.inClass(d.target, "highcharts-tracker") && !b.isInsidePlot(d.chartX - b.plotLeft, d.chartY - b.plotTop) || b.openMenu || this.runPointActions(d)
            },
            inClass: function(a, b) {
                for (var d; a;) {
                    if (d =
                        F(a, "class")) {
                        if (-1 !== d.indexOf(b)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    d = b.hoverPoint,
                    g = b.plotLeft,
                    e = b.plotTop;
                a = this.normalize(a);
                b.cancelClick ||
                    (d && this.inClass(a.target, "highcharts-tracker") ? (w(d.series, "click", t(a, {
                        point: d
                    })), b.hoverPoint && d.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - g, a.chartY - e) && w(b, "click", a)))
            },
            setDOMEvents: function() {
                var d = this,
                    b = d.chart.container,
                    e = b.ownerDocument;
                b.onmousedown = function(a) {
                    d.onContainerMouseDown(a)
                };
                b.onmousemove = function(a) {
                    d.onContainerMouseMove(a)
                };
                b.onclick = function(a) {
                    d.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = y(b, "mouseleave", d.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = y(e, "mouseup", d.onDocumentMouseUp));
                a.hasTouch && (b.ontouchstart = function(a) {
                    d.onContainerTouchStart(a)
                }, b.ontouchmove = function(a) {
                    d.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = y(e, "touchend", d.onDocumentTouchEnd)))
            },
            destroy: function() {
                var d = this;
                d.unDocMouseMove && d.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd &&
                    (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(d.tooltipTimeout);
                a.objectEach(d, function(a, g) {
                    d[g] = null
                })
            }
        }
    })(I);
    (function(a) {
        var y = a.charts,
            F = a.extend,
            G = a.noop,
            k = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function(a, k, t, v, w, r) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, k, t, v, w, r);
                this.zoomVert && this.pinchTranslateDirection(!1, a, k, t, v, w, r)
            },
            pinchTranslateDirection: function(a, k, t, v, w, r, h, e) {
                var c = this.chart,
                    n = a ? "x" : "y",
                    d = a ? "X" : "Y",
                    g = "chart" + d,
                    b = a ? "width" : "height",
                    x = c["plot" +
                        (a ? "Left" : "Top")],
                    u, p, E = e || 1,
                    B = c.inverted,
                    m = c.bounds[a ? "h" : "v"],
                    z = 1 === k.length,
                    D = k[0][g],
                    A = t[0][g],
                    f = !z && k[1][g],
                    q = !z && t[1][g],
                    L;
                t = function() {
                    !z && 20 < Math.abs(D - f) && (E = e || Math.abs(A - q) / Math.abs(D - f));
                    p = (x - A) / E + D;
                    u = c["plot" + (a ? "Width" : "Height")] / E
                };
                t();
                k = p;
                k < m.min ? (k = m.min, L = !0) : k + u > m.max && (k = m.max - u, L = !0);
                L ? (A -= .8 * (A - h[n][0]), z || (q -= .8 * (q - h[n][1])), t()) : h[n] = [A, q];
                B || (r[n] = p - x, r[b] = u);
                r = B ? 1 / E : E;
                w[b] = u;
                w[n] = k;
                v[B ? a ? "scaleY" : "scaleX" : "scale" + d] = E;
                v["translate" + d] = r * x + (A - r * D)
            },
            pinch: function(a) {
                var c =
                    this,
                    t = c.chart,
                    v = c.pinchDown,
                    w = a.touches,
                    r = w.length,
                    h = c.lastValidTouch,
                    e = c.hasZoom,
                    l = c.selectionMarker,
                    n = {},
                    d = 1 === r && (c.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || c.runChartClick),
                    g = {};
                1 < r && (c.initiated = !0);
                e && c.initiated && !d && a.preventDefault();
                [].map.call(w, function(a) {
                    return c.normalize(a)
                });
                "touchstart" === a.type ? ([].forEach.call(w, function(a, d) {
                    v[d] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), h.x = [v[0].chartX, v[1] && v[1].chartX], h.y = [v[0].chartY, v[1] && v[1].chartY], t.axes.forEach(function(a) {
                    if (a.zoomEnabled) {
                        var b =
                            t.bounds[a.horiz ? "h" : "v"],
                            d = a.minPixelPadding,
                            g = a.toPixels(k(a.options.min, a.dataMin)),
                            e = a.toPixels(k(a.options.max, a.dataMax)),
                            c = Math.max(g, e);
                        b.min = Math.min(a.pos, Math.min(g, e) - d);
                        b.max = Math.max(a.pos + a.len, c + d)
                    }
                }), c.res = !0) : c.followTouchMove && 1 === r ? this.runPointActions(c.normalize(a)) : v.length && (l || (c.selectionMarker = l = F({
                    destroy: G,
                    touch: !0
                }, t.plotBox)), c.pinchTranslate(v, w, n, l, g, h), c.hasPinched = e, c.scaleGroups(n, g), c.res && (c.res = !1, this.reset(!1, 0)))
            },
            touch: function(c, p) {
                var t = this.chart,
                    v, w;
                if (t.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = t.index;
                1 === c.touches.length ? (c = this.normalize(c), (w = t.isInsidePlot(c.chartX - t.plotLeft, c.chartY - t.plotTop)) && !t.openMenu ? (p && this.runPointActions(c), "touchmove" === c.type && (p = this.pinchDown, v = p[0] ? 4 <= Math.sqrt(Math.pow(p[0].chartX - c.chartX, 2) + Math.pow(p[0].chartY - c.chartY, 2)) : !1), k(v, !0) && this.pinch(c)) : p && this.reset()) : 2 === c.touches.length && this.pinch(c)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(c) {
                y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(c)
            }
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.charts,
            G = a.css,
            k = a.doc,
            c = a.extend,
            p = a.noop,
            t = a.Pointer,
            v = a.removeEvent,
            w = a.win,
            r = a.wrap;
        if (!a.hasTouch && (w.PointerEvent || w.MSPointerEvent)) {
            var h = {},
                e = !!w.PointerEvent,
                l = function() {
                    var d = [];
                    d.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(h, function(a) {
                        d.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return d
                },
                n = function(d, g, b, e) {
                    "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (e(d), e = F[a.hoverChartIndex].pointer, e[g]({
                        type: b,
                        target: d.currentTarget,
                        preventDefault: p,
                        touches: l()
                    }))
                };
            c(t.prototype, {
                onContainerPointerDown: function(a) {
                    n(a, "onContainerTouchStart", "touchstart", function(a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    n(a, "onContainerTouchMove", "touchmove", function(a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        h[a.pointerId].target || (h[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    n(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete h[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(k, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            r(t.prototype, "init", function(a, g, b) {
                a.call(this, g, b);
                this.hasZoom &&
                    G(g.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none"
                    })
            });
            r(t.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(y)
            });
            r(t.prototype, "destroy", function(a) {
                this.batchMSEvents(v);
                a.call(this)
            })
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.css,
            G = a.discardElement,
            k = a.defined,
            c = a.fireEvent,
            p = a.isFirefox,
            t = a.marginNames,
            v = a.merge,
            w = a.pick,
            r = a.setAnimation,
            h = a.stableSort,
            e = a.win,
            l = a.wrap;
        a.Legend = function(a, d) {
            this.init(a, d)
        };
        a.Legend.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.setOptions(d);
                d.enabled && (this.render(), y(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = y(this.chart, "render", function() {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            },
            setOptions: function(a) {
                var d = w(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = v(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop =
                    a.itemMarginTop || 0;
                this.padding = d;
                this.initialItemY = d - 5;
                this.symbolWidth = w(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function(a, d) {
                var g = this.chart;
                this.setOptions(v(!0, this.options, a));
                this.destroy();
                g.isDirtyLegend = g.isDirtyBox = !0;
                w(d, !0) && g.redraw();
                c(this, "afterUpdate")
            },
            colorizeItem: function(a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var g = this.options,
                        b = a.legendItem,
                        e = a.legendLine,
                        h = a.legendSymbol,
                        n = this.itemHiddenStyle.color,
                        g = d ? g.itemStyle.color : n,
                        l = d ? a.color || n : n,
                        k = a.options && a.options.marker,
                        m = {
                            fill: l
                        };
                    b && b.css({
                        fill: g,
                        color: g
                    });
                    e && e.attr({
                        stroke: l
                    });
                    h && (k && h.isMarker && (m = a.pointAttribs(), d || (m.stroke = m.fill = n)), h.attr(m))
                }
                c(this, "afterColorizeItem", {
                    item: a,
                    visible: d
                })
            },
            positionItems: function() {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function(a) {
                var d = this.options,
                    e = d.symbolPadding,
                    d = !d.rtl,
                    b = a._legendItemPos,
                    c = b[0],
                    b = b[1],
                    h = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[k(a.translateY) ? "animate" : "attr"]({
                    translateX: d ? c : this.legendWidth - c - 2 * e - 4,
                    translateY: b
                });
                h && (h.x = c, h.y = b)
            },
            destroyItem: function(a) {
                var d = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(d) {
                    a[d] && (a[d] = a[d].destroy())
                });
                d && G(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                this.getAllItems().forEach(function(d) {
                    ["legendItem", "legendGroup"].forEach(a, d)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a,
                    this);
                this.display = null
            },
            positionCheckboxes: function() {
                var a = this.group && this.group.alignAttr,
                    d, e = this.clipHeight || this.legendHeight,
                    b = this.titleHeight;
                a && (d = a.translateY, this.allItems.forEach(function(g) {
                    var c = g.checkbox,
                        h;
                    c && (h = d + b + c.y + (this.scrollOffset || 0) + 3, F(c, {
                        left: a.translateX + g.checkboxOffset + c.x - 20 + "px",
                        top: h + "px",
                        display: this.proximate || h > d - 6 && h < d + e - 6 ? "" : "none"
                    }))
                }, this))
            },
            renderTitle: function() {
                var a = this.options,
                    d = this.padding,
                    e = a.title,
                    b = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text,
                    d - 3, d - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }), this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)), e.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: b
                }));
                this.titleHeight = b
            },
            setText: function(e) {
                var d = this.options;
                e.legendItem.attr({
                    text: d.labelFormat ? a.format(d.labelFormat, e, this.chart.time) : d.labelFormatter.call(e)
                })
            },
            renderItem: function(a) {
                var d = this.chart,
                    e = d.renderer,
                    b = this.options,
                    c = this.symbolWidth,
                    h = b.symbolPadding,
                    n = this.itemStyle,
                    l = this.itemHiddenStyle,
                    k = "horizontal" === b.layout ? w(b.itemDistance, 20) : 0,
                    m = !b.rtl,
                    z = a.legendItem,
                    D = !a.series,
                    A = !D && a.series.drawLegendSymbol ? a.series : a,
                    f = A.options,
                    f = this.createCheckboxForItem && f && f.showCheckbox,
                    k = c + h + k + (f ? 20 : 0),
                    q = b.useHTML,
                    r = a.options.className;
                z || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (r ? " " + r : "") + (D ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup),
                    a.legendItem = z = e.text("", m ? c + h : -h, this.baseline || 0, q), d.styledMode || z.css(v(a.visible ? n : l)), z.attr({
                        align: m ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(d.styledMode ? 12 : n.fontSize, z), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, z.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, z, q), f && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                !d.styledMode && n.width || z.css({
                    width: (b.itemWidth || this.widthOption || d.spacingBox.width) - k
                });
                this.setText(a);
                d = z.getBBox();
                a.itemWidth = a.checkboxOffset = b.itemWidth || a.legendItemWidth || d.width + k;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || d.height || this.symbolHeight)
            },
            layoutItem: function(a) {
                var d = this.options,
                    e = this.padding,
                    b = "horizontal" === d.layout,
                    c = a.itemHeight,
                    h = d.itemMarginBottom || 0,
                    n = this.itemMarginTop,
                    l = b ? w(d.itemDistance, 20) : 0,
                    k = this.maxLegendWidth,
                    d = d.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : a.itemWidth;
                b && this.itemX - e + d > k && (this.itemX = e, this.itemY += n + this.lastLineHeight + h, this.lastLineHeight = 0);
                this.lastItemY = n + this.itemY + h;
                this.lastLineHeight = Math.max(c, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                b ? this.itemX += d : (this.itemY += n + c + h, this.lastLineHeight = c);
                this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - e - (a.checkbox ? 0 : l) : d) + e, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                this.chart.series.forEach(function(d) {
                    var e = d && d.options;
                    d && w(e.showInLegend, k(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(d.legendItems || ("point" === e.legendType ? d.data : d)))
                });
                c(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function() {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function(a, d) {
                var e = this.chart,
                    b = this.options,
                    c = this.getAlignment(),
                    h = void 0 !== e.options.title.margin ?
                    e.titleOffset + e.options.title.margin : 0;
                c && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(g, n) {
                    g.test(c) && !k(a[n]) && (e[t[n]] = Math.max(e[t[n]], e.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * b[n % 2 ? "x" : "y"] + w(b.margin, 12) + d[n] + (0 === n && (0 === e.titleOffset ? 0 : h))))
                })
            },
            proximatePositions: function() {
                var e = this.chart,
                    d = [],
                    g = "left" === this.options.align;
                this.allItems.forEach(function(b) {
                    var c, h;
                    c = g;
                    b.xAxis && b.points && (b.xAxis.options.reversed && (c = !c), c = a.find(c ? b.points :
                        b.points.slice(0).reverse(),
                        function(b) {
                            return a.isNumber(b.plotY)
                        }), h = b.legendGroup.getBBox().height, d.push({
                        target: b.visible ? (c ? c.plotY : b.xAxis.height) - .3 * h : e.plotHeight,
                        size: h,
                        item: b
                    }))
                }, this);
                a.distribute(d, e.plotHeight);
                d.forEach(function(a) {
                    a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos
                })
            },
            render: function() {
                var e = this.chart,
                    d = e.renderer,
                    g = this.group,
                    b, l, k, r = this.box,
                    p = this.options,
                    B = this.padding;
                this.itemX = B;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption =
                    a.relativeLength(p.width, e.spacingBox.width - B);
                b = e.spacingBox.width - 2 * B - p.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (b /= 2);
                this.maxLegendWidth = this.widthOption || b;
                g || (this.group = g = d.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = d.g().attr({
                    zIndex: 1
                }).add(g), this.scrollGroup = d.g().add(this.contentGroup));
                this.renderTitle();
                b = this.getAllItems();
                h(b, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                p.reversed && b.reverse();
                this.allItems =
                    b;
                this.display = l = !!b.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                b.forEach(this.renderItem, this);
                b.forEach(this.layoutItem, this);
                b = (this.widthOption || this.offsetWidth) + B;
                k = this.lastItemY + this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += B;
                r || (this.box = r = d.rect().addClass("highcharts-legend-box").attr({
                    r: p.borderRadius
                }).add(g), r.isNew = !0);
                e.styledMode || r.attr({
                    stroke: p.borderColor,
                    "stroke-width": p.borderWidth || 0,
                    fill: p.backgroundColor || "none"
                }).shadow(p.shadow);
                0 < b && 0 < k && (r[r.isNew ? "attr" : "animate"](r.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: b,
                    height: k
                }, r.strokeWidth())), r.isNew = !1);
                r[l ? "show" : "hide"]();
                e.styledMode && "none" === g.getStyle("display") && (b = k = 0);
                this.legendWidth = b;
                this.legendHeight = k;
                l && (d = e.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (r = d.y + e.titleOffset, d = v(d, {
                    y: 0 < e.titleOffset ? r += e.options.title.margin : r
                })), g.align(v(p, {
                    width: b,
                    height: k,
                    verticalAlign: this.proximate ? "top" : p.verticalAlign
                }), !0, d));
                this.proximate || this.positionItems();
                c(this, "afterRender")
            },
            handleOverflow: function(a) {
                var d = this,
                    e = this.chart,
                    b = e.renderer,
                    c = this.options,
                    h = c.y,
                    n = this.padding,
                    h = e.spacingBox.height + ("top" === c.verticalAlign ? -h : h) - n,
                    l = c.maxHeight,
                    k, m = this.clipRect,
                    z = c.navigation,
                    D = w(z.animation, !0),
                    r = z.arrowSize || 12,
                    f = this.nav,
                    q = this.pages,
                    p, t = this.allItems,
                    v = function(a) {
                        "number" === typeof a ? m.attr({
                            height: a
                        }) : m && (d.clipRect = m.destroy(), d.contentGroup.clip());
                        d.contentGroup.div && (d.contentGroup.div.style.clip = a ? "rect(" + n + "px,9999px," + (n + a) + "px,0)" : "auto")
                    };
                "horizontal" !== c.layout ||
                    "middle" === c.verticalAlign || c.floating || (h /= 2);
                l && (h = Math.min(h, l));
                q.length = 0;
                a > h && !1 !== z.enabled ? (this.clipHeight = k = Math.max(h - 20 - this.titleHeight - n, 0), this.currentPage = w(this.currentPage, 1), this.fullHeight = a, t.forEach(function(a, b) {
                    var f = a._legendItemPos[1],
                        d = Math.round(a.legendItem.getBBox().height),
                        e = q.length;
                    if (!e || f - q[e - 1] > k && (p || f) !== q[e - 1]) q.push(p || f), e++;
                    a.pageIx = e - 1;
                    p && (t[b - 1].pageIx = e - 1);
                    b === t.length - 1 && f + d - q[e - 1] > k && f !== p && (q.push(f), a.pageIx = e);
                    f !== p && (p = f)
                }), m || (m = d.clipRect = b.clipRect(0,
                    n, 9999, 0), d.contentGroup.clip(m)), v(k), f || (this.nav = f = b.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = b.symbol("triangle", 0, 0, r, r).on("click", function() {
                    d.scroll(-1, D)
                }).add(f), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(z.style), this.pager.add(f), this.down = b.symbol("triangle-down", 0, 0, r, r).on("click", function() {
                    d.scroll(1, D)
                }).add(f)), d.scroll(0), a = h) : f && (v(), this.nav = f.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, d) {
                var e = this.pages,
                    b = e.length;
                a = this.currentPage + a;
                var c = this.clipHeight,
                    h = this.options.navigation,
                    l = this.pager,
                    n = this.padding;
                a > b && (a = b);
                0 < a && (void 0 !== d && r(d, this.chart), this.nav.attr({
                        translateX: n,
                        translateY: c + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), l.attr({
                        text: a + "/" + b
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    this.chart.styledMode || (this.up.attr({
                        fill: 1 === a ? h.inactiveColor : h.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === b ? h.inactiveColor : h.activeColor
                    }).css({
                        cursor: a === b ? "default" : "pointer"
                    })), this.scrollOffset = -e[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, d) {
                var e = a.symbolHeight,
                    b = a.options.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(b ?
                    (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e : a.symbolWidth, e, w(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(d.legendGroup)
            },
            drawLineMarker: function(a) {
                var d = this.options,
                    e = d.marker,
                    b = a.symbolWidth,
                    c = a.symbolHeight,
                    h = c / 2,
                    l = this.chart.renderer,
                    n = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var k = {};
                this.chart.styledMode || (k = {
                    "stroke-width": d.lineWidth || 0
                }, d.dashStyle && (k.dashstyle = d.dashStyle));
                this.legendLine = l.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(k).add(n);
                e && !1 !== e.enabled && b && (d = Math.min(w(e.radius, h), h), 0 === this.symbol.indexOf("url") && (e = v(e, {
                    width: c,
                    height: c
                }), d = 0), this.legendSymbol = e = l.symbol(this.symbol, b / 2 - d, a - d, 2 * d, 2 * d, e).addClass("highcharts-point").add(n), e.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(e.navigator && e.navigator.userAgent) || p) && l(a.Legend.prototype, "positionItem", function(a, d) {
            var e = this,
                b = function() {
                    d._legendItemPos && a.call(e, d)
                };
            b();
            e.bubbleLegend || setTimeout(b)
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.animate,
            G = a.animObject,
            k = a.attr,
            c = a.doc,
            p = a.Axis,
            t = a.createElement,
            v = a.defaultOptions,
            w = a.discardElement,
            r = a.charts,
            h = a.css,
            e = a.defined,
            l = a.extend,
            n = a.find,
            d = a.fireEvent,
            g = a.isNumber,
            b = a.isObject,
            x = a.isString,
            u = a.Legend,
            H = a.marginNames,
            E = a.merge,
            B = a.objectEach,
            m = a.Pointer,
            z = a.pick,
            D = a.pInt,
            A = a.removeEvent,
            f = a.seriesTypes,
            q = a.splat,
            L = a.syncTimeout,
            K = a.win,
            T = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, f) {
            return new T(a, b, f)
        };
        l(T.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (x(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, f) {
                var e, g, c = b.series,
                    m = b.plotOptions || {};
                d(this, "init", {
                    args: arguments
                }, function() {
                    b.series = null;
                    e = E(v, b);
                    for (g in e.plotOptions) e.plotOptions[g].tooltip = m[g] && E(m[g].tooltip) || void 0;
                    e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    e.series = b.series = c;
                    this.userOptions = b;
                    var h = e.chart,
                        q = h.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback =
                        f;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.styledMode = h.styledMode;
                    this.hasCartesianSeries = h.showAxes;
                    var l = this;
                    l.index = r.length;
                    r.push(l);
                    a.chartCount++;
                    q && B(q, function(a, b) {
                        y(l, b, a)
                    });
                    l.xAxis = [];
                    l.yAxis = [];
                    l.pointCount = l.colorCounter = l.symbolCounter = 0;
                    d(l, "afterInit");
                    l.firstRender()
                })
            },
            initSeries: function(b) {
                var d = this.options.chart;
                (d = f[b.type || d.type || d.defaultSeriesType]) || a.error(17, !0, this);
                d =
                    new d;
                d.init(this, b);
                return d
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function(a, b, f) {
                var d = f ? b : a;
                a = f ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                d(this, "beforeRedraw");
                var f = this.axes,
                    e = this.series,
                    g = this.pointer,
                    c = this.legend,
                    m = this.userOptions.legend,
                    h = this.isDirtyLegend,
                    q, n, z = this.hasCartesianSeries,
                    k = this.isDirtyBox,
                    D, u = this.renderer,
                    r = u.isHidden(),
                    A = [];
                this.setResponsive &&
                    this.setResponsive(!1);
                a.setAnimation(b, this);
                r && this.temporaryDisplay();
                this.layOutTitles();
                for (b = e.length; b--;)
                    if (D = e[b], D.options.stacking && (q = !0, D.isDirty)) {
                        n = !0;
                        break
                    } if (n)
                    for (b = e.length; b--;) D = e[b], D.options.stacking && (D.isDirty = !0);
                e.forEach(function(a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), h = !0) : m && (m.labelFormatter || m.labelFormat) && (h = !0));
                    a.isDirtyData && d(a, "updatedData")
                });
                h && c && c.options.enabled && (c.render(), this.isDirtyLegend = !1);
                q && this.getStacks();
                z && f.forEach(function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                z && (f.forEach(function(a) {
                    a.isDirty && (k = !0)
                }), f.forEach(function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, A.push(function() {
                        d(a, "afterSetExtremes", l(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (k || q) && a.redraw()
                }));
                k && this.drawChartBox();
                d(this, "predraw");
                e.forEach(function(a) {
                    (k || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                u.draw();
                d(this, "redraw");
                d(this, "render");
                r && this.temporaryDisplay(!0);
                A.forEach(function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }
                var f, d = this.series,
                    e;
                f = n(this.axes, b) || n(this.series, b);
                for (e = 0; !f && e < d.length; e++) f = n(d[e].points || [], b);
                return f
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    f = b.xAxis = q(b.xAxis || {}),
                    b = b.yAxis = q(b.yAxis || {});
                d(this, "getAxes");
                f.forEach(function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function(a, b) {
                    a.index = b
                });
                f.concat(b).forEach(function(b) {
                    new p(a, b)
                });
                d(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var a = [];
                this.series.forEach(function(b) {
                    a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return this.series.filter(function(a) {
                    return a.selected
                })
            },
            setTitle: function(a, b, f) {
                var d = this,
                    e = d.options,
                    g = d.styledMode,
                    c;
                c = e.title = E(!g && {
                    style: {
                        color: "#333333",
                        fontSize: e.isStock ? "16px" : "18px"
                    }
                }, e.title, a);
                e = e.subtitle = E(!g && {
                    style: {
                        color: "#666666"
                    }
                }, e.subtitle, b);
                [
                    ["title", a, c],
                    ["subtitle", b, e]
                ].forEach(function(a, b) {
                    var f = a[0],
                        e = d[f],
                        c = a[1];
                    a = a[2];
                    e && c && (d[f] = e = e.destroy());
                    a && !e && (d[f] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + f,
                        zIndex: a.zIndex || 4
                    }).add(), d[f].update = function(a) {
                        d.setTitle(!b && a, b && a)
                    }, g || d[f].css(a.style))
                });
                d.layOutTitles(f)
            },
            layOutTitles: function(a) {
                var b = 0,
                    f, d = this.renderer,
                    e = this.spacingBox;
                ["title", "subtitle"].forEach(function(a) {
                    var f = this[a],
                        g = this.options[a];
                    a = "title" === a ? -3 : g.verticalAlign ? 0 : b + 2;
                    var c;
                    f && (this.styledMode || (c = g.style.fontSize), c = d.fontMetrics(c,
                        f).b, f.css({
                        width: (g.width || e.width + g.widthAdjust) + "px"
                    }).align(l({
                        y: a + c
                    }, g), !1, "spacingBox"), g.floating || g.verticalAlign || (b = Math.ceil(b + f.getBBox(g.useHTML).height)))
                }, this);
                f = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && f && (this.isDirtyBox = this.isDirtyLegend = f, this.hasRendered && z(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    f = b.width,
                    b = b.height,
                    d = this.renderTo;
                e(f) || (this.containerWidth = a.getStyle(d, "width"));
                e(b) || (this.containerHeight =
                    a.getStyle(d, "height"));
                this.chartWidth = Math.max(0, f || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function(b) {
                var f = this.renderTo;
                if (b)
                    for (; f && f.style;) f.hcOrigStyle && (a.css(f, f.hcOrigStyle), delete f.hcOrigStyle), f.hcOrigDetached && (c.body.removeChild(f), f.hcOrigDetached = !1), f = f.parentNode;
                else
                    for (; f && f.style;) {
                        c.body.contains(f) || f.parentNode || (f.hcOrigDetached = !0, c.body.appendChild(f));
                        if ("none" === a.getStyle(f, "display", !1) || f.hcOricDetached) f.hcOrigStyle = {
                            display: f.style.display,
                            height: f.style.height,
                            overflow: f.style.overflow
                        }, b = {
                            display: "block",
                            overflow: "hidden"
                        }, f !== this.renderTo && (b.height = 0), a.css(f, b), f.offsetWidth || f.style.setProperty("display", "block", "important");
                        f = f.parentNode;
                        if (f === c.body) break
                    }
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b, f = this.options,
                    e = f.chart,
                    m, q;
                b = this.renderTo;
                var n = a.uniqueKey(),
                    z, u;
                b || (this.renderTo = b = e.renderTo);
                x(b) && (this.renderTo = b = c.getElementById(b));
                b || a.error(13, !0, this);
                m = D(k(b, "data-highcharts-chart"));
                g(m) && r[m] && r[m].hasRendered && r[m].destroy();
                k(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                m = this.chartWidth;
                q = this.chartHeight;
                h(b, {
                    overflow: "hidden"
                });
                this.styledMode || (z = l({
                    position: "relative",
                    overflow: "hidden",
                    width: m + "px",
                    height: q + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style));
                this.container = b = t("div", {
                    id: n
                }, z, b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[e.renderer] || a.Renderer)(b, m, q, null, e.forExport, f.exporting && f.exporting.allowHTML, this.styledMode);
                this.setClassName(e.className);
                if (this.styledMode)
                    for (u in f.defs) this.renderer.definition(f.defs[u]);
                else this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index;
                d(this, "afterGetContainer")
            },
            getMargins: function(a) {
                var b = this.spacing,
                    f = this.margin,
                    g = this.titleOffset;
                this.resetMargins();
                g && !e(f[0]) && (this.plotTop = Math.max(this.plotTop, g + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(f, b);
                d(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    f = a.margin;
                a.hasCartesianSeries && a.axes.forEach(function(a) {
                    a.visible && a.getOffset()
                });
                H.forEach(function(d, g) {
                    e(f[g]) || (a[d] += b[g])
                });
                a.setChartSize()
            },
            reflow: function(b) {
                var f = this,
                    d = f.options.chart,
                    g = f.renderTo,
                    m = e(d.width) && e(d.height),
                    h = d.width || a.getStyle(g, "width"),
                    d = d.height || a.getStyle(g, "height"),
                    g = b ? b.target : K;
                if (!m && !f.isPrinting && h && d && (g === K || g === c)) {
                    if (h !== f.containerWidth || d !== f.containerHeight) a.clearTimeout(f.reflowTimeout), f.reflowTimeout = L(function() {
                        f.container && f.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    f.containerWidth = h;
                    f.containerHeight = d
                }
            },
            setReflow: function(a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = y(K,
                    "resize",
                    function(a) {
                        b.reflow(a)
                    }), y(this, "destroy", this.unbindReflow))
            },
            setSize: function(b, f, e) {
                var g = this,
                    c = g.renderer,
                    m;
                g.isResizing += 1;
                a.setAnimation(e, g);
                g.oldChartHeight = g.chartHeight;
                g.oldChartWidth = g.chartWidth;
                void 0 !== b && (g.options.chart.width = b);
                void 0 !== f && (g.options.chart.height = f);
                g.getChartSize();
                g.styledMode || (m = c.globalAnimation, (m ? F : h)(g.container, {
                    width: g.chartWidth + "px",
                    height: g.chartHeight + "px"
                }, m));
                g.setChartSize(!0);
                c.setSize(g.chartWidth, g.chartHeight, e);
                g.axes.forEach(function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                g.isDirtyLegend = !0;
                g.isDirtyBox = !0;
                g.layOutTitles();
                g.getMargins();
                g.redraw(e);
                g.oldChartHeight = null;
                d(g, "resize");
                L(function() {
                    g && d(g, "endResize", null, function() {
                        --g.isResizing
                    })
                }, G(m).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    f = this.renderer,
                    e = this.chartWidth,
                    g = this.chartHeight,
                    c = this.options.chart,
                    m = this.spacing,
                    h = this.clipOffset,
                    q, l, n, z;
                this.plotLeft = q = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = n = Math.max(0, Math.round(e - q - this.marginRight));
                this.plotHeight = z = Math.max(0, Math.round(g - l - this.marginBottom));
                this.plotSizeX = b ? z : n;
                this.plotSizeY = b ? n : z;
                this.plotBorderWidth = c.plotBorderWidth || 0;
                this.spacingBox = f.spacingBox = {
                    x: m[3],
                    y: m[0],
                    width: e - m[3] - m[1],
                    height: g - m[0] - m[2]
                };
                this.plotBox = f.plotBox = {
                    x: q,
                    y: l,
                    width: n,
                    height: z
                };
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e, h[3]) / 2);
                f = Math.ceil(Math.max(e, h[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: f,
                    width: Math.floor(this.plotSizeX - Math.max(e, h[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY -
                        Math.max(e, h[2]) / 2 - f))
                };
                a || this.axes.forEach(function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                d(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function() {
                d(this, "resetMargins");
                var a = this,
                    f = a.options.chart;
                ["margin", "spacing"].forEach(function(d) {
                    var e = f[d],
                        g = b(e) ? e : [e, e, e, e];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(b, e) {
                        a[d][e] = z(f[d + b], g[e])
                    })
                });
                H.forEach(function(b, f) {
                    a[b] = z(a.margin[f], a.spacing[f])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a =
                    this.options.chart,
                    b = this.renderer,
                    f = this.chartWidth,
                    e = this.chartHeight,
                    g = this.chartBackground,
                    c = this.plotBackground,
                    m = this.plotBorder,
                    h, q = this.styledMode,
                    l = this.plotBGImage,
                    n = a.backgroundColor,
                    z = a.plotBackgroundColor,
                    k = a.plotBackgroundImage,
                    D, u = this.plotLeft,
                    r = this.plotTop,
                    A = this.plotWidth,
                    x = this.plotHeight,
                    p = this.plotBox,
                    B = this.clipRect,
                    t = this.clipBox,
                    v = "animate";
                g || (this.chartBackground = g = b.rect().addClass("highcharts-background").add(), v = "attr");
                if (q) h = D = g.strokeWidth();
                else {
                    h = a.borderWidth ||
                        0;
                    D = h + (a.shadow ? 8 : 0);
                    n = {
                        fill: n || "none"
                    };
                    if (h || g["stroke-width"]) n.stroke = a.borderColor, n["stroke-width"] = h;
                    g.attr(n).shadow(a.shadow)
                }
                g[v]({
                    x: D / 2,
                    y: D / 2,
                    width: f - D - h % 2,
                    height: e - D - h % 2,
                    r: a.borderRadius
                });
                v = "animate";
                c || (v = "attr", this.plotBackground = c = b.rect().addClass("highcharts-plot-background").add());
                c[v](p);
                q || (c.attr({
                    fill: z || "none"
                }).shadow(a.plotShadow), k && (l ? l.animate(p) : this.plotBGImage = b.image(k, u, r, A, x).add()));
                B ? B.animate({
                    width: t.width,
                    height: t.height
                }) : this.clipRect = b.clipRect(t);
                v = "animate";
                m || (v = "attr", this.plotBorder = m = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                q || m.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                m[v](m.crisp({
                    x: u,
                    y: r,
                    width: A,
                    height: x
                }, -m.strokeWidth()));
                this.isDirtyBox = !1;
                d(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    d, e = a.options.series,
                    g, c;
                ["inverted", "angular", "polar"].forEach(function(m) {
                    d = f[b.type || b.defaultSeriesType];
                    c = b[m] || d && d.prototype[m];
                    for (g = e && e.length; !c &&
                        g--;)(d = f[e[g].type]) && d.prototype[m] && (c = !0);
                    a[m] = c
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                b.forEach(function(a) {
                    a.linkedSeries.length = 0
                });
                b.forEach(function(b) {
                    var f = b.options.linkedTo;
                    x(f) && (f = ":previous" === f ? a.series[b.index - 1] : a.get(f)) && f.linkedParent !== b && (f.linkedSeries.push(b), b.linkedParent = f, b.visible = z(b.options.visible, f.options.visible, b.visible))
                });
                d(this, "afterLinkSeries")
            },
            renderSeries: function() {
                this.series.forEach(function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a =
                    this,
                    b = a.options.labels;
                b.items && b.items.forEach(function(f) {
                    var d = l(b.style, f.style),
                        e = D(d.left) + a.plotLeft,
                        g = D(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(f.html, e, g).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    f = this.options,
                    d = 0,
                    e, g, c;
                this.setTitle();
                this.legend = new u(this, f.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                f = this.plotWidth;
                a.some(function(a) {
                    if (a.horiz && a.visible && a.options.labels.enabled &&
                        a.series.length) return d = 21, !0
                });
                e = this.plotHeight = Math.max(this.plotHeight - d, 0);
                a.forEach(function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                g = 1.1 < f / this.plotWidth;
                c = 1.05 < e / this.plotHeight;
                if (g || c) a.forEach(function(a) {
                    (a.horiz && g || !a.horiz && c) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && a.forEach(function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = E(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (K.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    f = b.axes,
                    e = b.series,
                    g = b.container,
                    c, m = g && g.parentNode;
                d(b, "destroy");
                b.renderer.forExport ? a.erase(r, b) : r[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                A(b);
                for (c = f.length; c--;) f[c] = f[c].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (c = e.length; c--;) e[c] = e[c].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a) {
                    var f =
                        b[a];
                    f && f.destroy && (b[a] = f.destroy())
                });
                g && (g.innerHTML = "", A(g), m && w(g));
                B(b, function(a, f) {
                    delete b[f]
                })
            },
            firstRender: function() {
                var b = this,
                    f = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (a.isArray(f.series) ? f.series : []).forEach(function(a) {
                        b.initSeries(a)
                    });
                    b.linkSeries();
                    d(b, "beforeRender");
                    m && (b.pointer = new m(b, f));
                    b.render();
                    if (!b.renderer.imgCount && b.onload) b.onload();
                    b.temporaryDisplay(!0)
                }
            },
            onload: function() {
                [this.callback].concat(this.callbacks).forEach(function(a) {
                    a &&
                        void 0 !== this.index && a.apply(this, [this])
                }, this);
                d(this, "load");
                d(this, "render");
                e(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.Chart;
        y(F, "afterSetChartSize", function(y) {
            var k = this.options.chart.scrollablePlotArea;
            (k = k && k.minWidth) && !this.renderer.forExport && (this.scrollablePixels = k = Math.max(0, k - this.chartWidth)) && (this.plotWidth += k, this.clipBox.width += k, y.skipAxes || this.axes.forEach(function(c) {
                1 === c.side ? c.getPlotLinePath = function() {
                    var k =
                        this.right,
                        t;
                    this.right = k - c.chart.scrollablePixels;
                    t = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                    this.right = k;
                    return t
                } : (c.setAxisSize(), c.setAxisTranslation())
            }))
        });
        y(F, "render", function() {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        F.prototype.setUpScrolling = function() {
            this.scrollingContainer = a.createElement("div", {
                className: "highcharts-scrolling"
            }, {
                overflowX: "auto",
                WebkitOverflowScrolling: "touch"
            }, this.renderTo);
            this.innerContainer = a.createElement("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        F.prototype.applyFixed = function() {
            var y = this.container,
                k, c, p = !this.fixedDiv;
            p && (this.fixedDiv = a.createElement("div", {
                    className: "highcharts-fixed"
                }, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow =
                "visible", this.fixedRenderer = k = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = k.path().attr({
                    fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                    zIndex: -1
                }).addClass("highcharts-scrollable-mask").add(), [this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"].forEach(function(a) {
                    [].forEach.call(y.querySelectorAll(a),
                        function(a) {
                            (a.namespaceURI === k.SVG_NS ? k.box : k.box.parentNode).appendChild(a);
                            a.style.pointerEvents = "auto"
                        })
                }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            c = this.chartWidth + this.scrollablePixels;
            a.stop(this.container);
            this.container.style.width = c + "px";
            this.renderer.boxWrapper.attr({
                width: c,
                height: this.chartHeight,
                viewBox: [0, 0, c, this.chartHeight].join(" ")
            });
            this.chartBackground.attr({
                width: c
            });
            p && (c = this.options.chart.scrollablePlotArea, c.scrollPositionX && (this.scrollingContainer.scrollLeft =
                this.scrollablePixels * c.scrollPositionX));
            p = this.axisOffset;
            c = this.plotTop - p[0] - 1;
            var p = this.plotTop + this.plotHeight + p[2],
                t = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({
                d: this.scrollablePixels ? ["M", 0, c, "L", this.plotLeft - 1, c, "L", this.plotLeft - 1, p, "L", 0, p, "Z", "M", t, c, "L", this.chartWidth, c, "L", this.chartWidth, p, "L", t, p, "Z"] : ["M", 0, 0]
            })
        }
    })(I);
    (function(a) {
        var y, F = a.extend,
            G = a.erase,
            k = a.fireEvent,
            c = a.format,
            p = a.isArray,
            t = a.isNumber,
            v = a.pick,
            w = a.uniqueKey,
            r = a.defined,
            h = a.removeEvent;
        a.Point = y = function() {};
        a.Point.prototype = {
            init: function(a, c, h) {
                var d;
                d = a.chart.options.chart.colorCount;
                var e = a.chart.styledMode;
                this.series = a;
                e || (this.color = a.color);
                this.applyOptions(c, h);
                this.id = r(this.id) ? this.id : w();
                a.options.colorByPoint ? (e || (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length), c = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : c = a.colorIndex;
                this.colorIndex = v(this.colorIndex, c);
                a.chart.pointCount++;
                k(this, "afterInit");
                return this
            },
            applyOptions: function(a, c) {
                var e = this.series,
                    d = e.options.pointValKey || e.pointValKey;
                a = y.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                d && (this.y = this[d]);
                this.isNull = v(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
                void 0 === this.x && e && (this.x =
                    void 0 === c ? e.autoIncrement(this) : c);
                return this
            },
            setNestedProperty: function(e, c, h) {
                h.split(".").reduce(function(d, e, b, h) {
                    d[e] = h.length - 1 === b ? c : a.isObject(d[e], !0) ? d[e] : {};
                    return d[e]
                }, e);
                return e
            },
            optionsToObject: function(e) {
                var c = {},
                    h = this.series,
                    d = h.options.keys,
                    g = d || h.pointArrayMap || ["y"],
                    b = g.length,
                    k = 0,
                    u = 0;
                if (t(e) || null === e) c[g[0]] = e;
                else if (p(e))
                    for (!d && e.length > b && (h = typeof e[0], "string" === h ? c.name = e[0] : "number" === h && (c.x = e[0]), k++); u < b;) d && void 0 === e[k] || (0 < g[u].indexOf(".") ? a.Point.prototype.setNestedProperty(c,
                        e[k], g[u]) : c[g[u]] = e[k]), k++, u++;
                else "object" === typeof e && (c = e, e.dataLabels && (h._hasPointLabels = !0), e.marker && (h._hasPointMarkers = !0));
                return c
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative",
                    "") : "")
            },
            getZone: function() {
                var a = this.series,
                    c = a.zones,
                    a = a.zoneAxis || "y",
                    h = 0,
                    d;
                for (d = c[h]; this[a] >= d.value;) d = c[++h];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = d && d.color && !this.options.color ? d.color : this.nonZonedColor;
                return d
            },
            destroy: function() {
                var a = this.series.chart,
                    c = a.hoverPoints,
                    n;
                a.pointCount--;
                c && (this.setState(), G(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel || this.dataLabels) h(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (n in this) this[n] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c, h = 6; h--;) c = a[h], this[c] && (this[c] = this[c].destroy());
                this.dataLabels && (this.dataLabels.forEach(function(a) {
                    a.element && a.destroy()
                }), delete this.dataLabels);
                this.connectors && (this.connectors.forEach(function(a) {
                    a.element && a.destroy()
                }), delete this.connectors)
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var e = this.series,
                    h = e.tooltipOptions,
                    d = v(h.valueDecimals, ""),
                    g = h.valuePrefix || "",
                    b = h.valueSuffix || "";
                e.chart.styledMode && (a = e.chart.tooltip.styledModeFormat(a));
                (e.pointArrayMap || ["y"]).forEach(function(e) {
                    e = "{point." + e;
                    if (g || b) a = a.replace(RegExp(e + "}", "g"), g + e + "}" + b);
                    a = a.replace(RegExp(e + "}", "g"), e + ":,." + d + "f}")
                });
                return c(a, {
                    point: this,
                    series: this.series
                }, e.chart.time)
            },
            firePointEvent: function(a, c, h) {
                var d = this,
                    e = this.series.options;
                (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (h = function(a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                k(this, a, c, h)
            },
            visible: !0
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.animObject,
            G = a.arrayMax,
            k = a.arrayMin,
            c = a.correctFloat,
            p = a.defaultOptions,
            t = a.defaultPlotOptions,
            v = a.defined,
            w = a.erase,
            r = a.extend,
            h = a.fireEvent,
            e = a.isArray,
            l = a.isNumber,
            n = a.isString,
            d = a.merge,
            g = a.objectEach,
            b = a.pick,
            x = a.removeEvent,
            u = a.splat,
            H = a.SVGElement,
            E = a.syncTimeout,
            B = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            cropShoulder: 1,
            init: function(a, d) {
                h(this, "init", {
                    options: d
                });
                var e = this,
                    c, f = a.series,
                    m;
                e.chart = a;
                e.options = d = e.setOptions(d);
                e.linkedSeries = [];
                e.bindAxes();
                r(e, {
                    name: d.name,
                    state: "",
                    visible: !1 !== d.visible,
                    selected: !0 === d.selected
                });
                c = d.events;
                g(c, function(a, b) {
                    e.hcEvents && e.hcEvents[b] && -1 !== e.hcEvents[b].indexOf(a) || y(e, b, a)
                });
                if (c && c.click ||
                    d.point && d.point.events && d.point.events.click || d.allowPointSelect) a.runTrackerClick = !0;
                e.getColor();
                e.getSymbol();
                e.parallelArrays.forEach(function(a) {
                    e[a + "Data"] = []
                });
                e.setData(d.data, !1);
                e.isCartesian && (a.hasCartesianSeries = !0);
                f.length && (m = f[f.length - 1]);
                e._i = b(m && m._i, -1) + 1;
                a.orderSeries(this.insert(f));
                h(this, "afterInit")
            },
            insert: function(a) {
                var d = this.options.index,
                    e;
                if (l(d)) {
                    for (e = a.length; e--;)
                        if (d >= b(a[e].options.index, a[e]._i)) {
                            a.splice(e + 1, 0, this);
                            break
                        } - 1 === e && a.unshift(this);
                    e += 1
                } else a.push(this);
                return b(e, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    d = b.options,
                    e = b.chart,
                    g;
                h(this, "bindAxes", null, function() {
                    (b.axisTypes || []).forEach(function(f) {
                        e[f].forEach(function(a) {
                            g = a.options;
                            if (d[f] === g.index || void 0 !== d[f] && d[f] === g.id || void 0 === d[f] && 0 === g.index) b.insert(a.series), b[f] = a, a.isDirty = !0
                        });
                        b[f] || b.optionalAxis === f || a.error(18, !0, e)
                    })
                })
            },
            updateParallelArrays: function(a, b) {
                var d = a.series,
                    e = arguments,
                    f = l(b) ? function(f) {
                        var e = "y" === f && d.toYData ? d.toYData(a) : a[f];
                        d[f + "Data"][b] = e
                    } : function(a) {
                        Array.prototype[b].apply(d[a +
                            "Data"], Array.prototype.slice.call(e, 2))
                    };
                d.parallelArrays.forEach(f)
            },
            autoIncrement: function() {
                var a = this.options,
                    d = this.xIncrement,
                    e, g = a.pointIntervalUnit,
                    f = this.chart.time,
                    d = b(d, a.pointStart, 0);
                this.pointInterval = e = b(this.pointInterval, a.pointInterval, 1);
                g && (a = new f.Date(d), "day" === g ? f.set("Date", a, f.get("Date", a) + e) : "month" === g ? f.set("Month", a, f.get("Month", a) + e) : "year" === g && f.set("FullYear", a, f.get("FullYear", a) + e), e = a.getTime() - d);
                this.xIncrement = d + e;
                return d
            },
            setOptions: function(a) {
                var e = this.chart,
                    g = e.options,
                    c = g.plotOptions,
                    f = (e.userOptions || {}).plotOptions || {},
                    m = c[this.type],
                    l = d(a);
                a = e.styledMode;
                h(this, "setOptions", {
                    userOptions: l
                });
                this.userOptions = l;
                e = d(m, c.series, l);
                this.tooltipOptions = d(p.tooltip, p.plotOptions.series && p.plotOptions.series.tooltip, p.plotOptions[this.type].tooltip, g.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, l.tooltip);
                this.stickyTracking = b(l.stickyTracking, f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared &&
                    !this.noSharedTooltip ? !0 : e.stickyTracking);
                null === m.marker && delete e.marker;
                this.zoneAxis = e.zoneAxis;
                g = this.zones = (e.zones || []).slice();
                !e.negativeColor && !e.negativeFillColor || e.zones || (c = {
                    value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                    className: "highcharts-negative"
                }, a || (c.color = e.negativeColor, c.fillColor = e.negativeFillColor), g.push(c));
                g.length && v(g[g.length - 1].value) && g.push(a ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                h(this, "afterSetOptions", {
                    options: e
                });
                return e
            },
            getName: function() {
                return b(this.options.name,
                    "Series " + (this.index + 1))
            },
            getCyclic: function(a, d, e) {
                var g, f = this.chart,
                    c = this.userOptions,
                    h = a + "Index",
                    m = a + "Counter",
                    l = e ? e.length : b(f.options.chart[a + "Count"], f[a + "Count"]);
                d || (g = b(c[h], c["_" + h]), v(g) || (f.series.length || (f[m] = 0), c["_" + h] = g = f[m] % l, f[m] += 1), e && (d = e[g]));
                void 0 !== g && (this[h] = g);
                this[a] = d
            },
            getColor: function() {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function(b) {
                var d = this.options,
                    e = this.points,
                    g = [],
                    f, c, h, m = this.requireSorting;
                this.xIncrement = null;
                b.forEach(function(b) {
                    var c, q, k;
                    c = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b) || {};
                    k = c.x;
                    if ((c = c.id) || l(k)) c && (q = (q = this.chart.get(c)) && q.index), void 0 === q && l(k) && (q = this.xData.indexOf(k, h)), -1 !== q && void 0 !==
                        q && this.cropped && (q = q >= this.cropStart ? q - this.cropStart : q), -1 === q || void 0 === q || e[q] && e[q].touched ? g.push(b) : b !== d.data[q] ? (e[q].update(b, !1, null, !1), e[q].touched = !0, m && (h = q + 1)) : e[q] && (e[q].touched = !0), f = !0
                }, this);
                if (f)
                    for (b = e.length; b--;) c = e[b], c.touched || c.remove(!1), c.touched = !1;
                else if (b.length === e.length) b.forEach(function(a, b) {
                    e[b].update && a !== d.data[b] && e[b].update(a, !1, null, !1)
                });
                else return !1;
                g.forEach(function(a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function(d, g, c, h) {
                var f = this,
                    m =
                    f.points,
                    k = m && m.length || 0,
                    z, u = f.options,
                    r = f.chart,
                    D = null,
                    x = f.xAxis,
                    A = u.turboThreshold,
                    p = this.xData,
                    B = this.yData,
                    t = (z = f.pointArrayMap) && z.length,
                    v = u.keys,
                    E = 0,
                    w = 1,
                    H;
                d = d || [];
                z = d.length;
                g = b(g, !0);
                !1 !== h && z && k && !f.cropped && !f.hasGroupedData && f.visible && !f.isSeriesBoosting && (H = this.updateData(d));
                if (!H) {
                    f.xIncrement = null;
                    f.colorCounter = 0;
                    this.parallelArrays.forEach(function(a) {
                        f[a + "Data"].length = 0
                    });
                    if (A && z > A) {
                        for (c = 0; null === D && c < z;) D = d[c], c++;
                        if (l(D))
                            for (c = 0; c < z; c++) p[c] = this.autoIncrement(), B[c] = d[c];
                        else if (e(D))
                            if (t)
                                for (c = 0; c < z; c++) D = d[c], p[c] = D[0], B[c] = D.slice(1, t + 1);
                            else
                                for (v && (E = v.indexOf("x"), w = v.indexOf("y"), E = 0 <= E ? E : 0, w = 0 <= w ? w : 1), c = 0; c < z; c++) D = d[c], p[c] = D[E], B[c] = D[w];
                        else a.error(12, !1, r)
                    } else
                        for (c = 0; c < z; c++) void 0 !== d[c] && (D = {
                            series: f
                        }, f.pointClass.prototype.applyOptions.apply(D, [d[c]]), f.updateParallelArrays(D, c));
                    B && n(B[0]) && a.error(14, !0, r);
                    f.data = [];
                    f.options.data = f.userOptions.data = d;
                    for (c = k; c--;) m[c] && m[c].destroy && m[c].destroy();
                    x && (x.minRange = x.userMinRange);
                    f.isDirty = r.isDirtyBox = !0;
                    f.isDirtyData = !!m;
                    c = !1
                }
                "point" === u.legendType && (this.processData(), this.generatePoints());
                g && r.redraw(c)
            },
            processData: function(b) {
                var d = this.xData,
                    e = this.yData,
                    c = d.length,
                    f;
                f = 0;
                var g, h, m = this.xAxis,
                    l, k = this.options;
                l = k.cropThreshold;
                var n = this.getExtremesFromAll || k.getExtremesFromAll,
                    u = this.isCartesian,
                    k = m && m.val2lin,
                    r = m && m.isLog,
                    x = this.requireSorting,
                    p, B;
                if (u && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !b) return !1;
                m && (b = m.getExtremes(), p = b.min, B = b.max);
                u && this.sorted && !n && (!l || c > l || this.forceCrop) &&
                    (d[c - 1] < p || d[0] > B ? (d = [], e = []) : this.yData && (d[0] < p || d[c - 1] > B) && (f = this.cropData(this.xData, this.yData, p, B), d = f.xData, e = f.yData, f = f.start, g = !0));
                for (l = d.length || 1; --l;) c = r ? k(d[l]) - k(d[l - 1]) : d[l] - d[l - 1], 0 < c && (void 0 === h || c < h) ? h = c : 0 > c && x && (a.error(15, !1, this.chart), x = !1);
                this.cropped = g;
                this.cropStart = f;
                this.processedXData = d;
                this.processedYData = e;
                this.closestPointRange = h
            },
            cropData: function(a, d, e, c, f) {
                var g = a.length,
                    h = 0,
                    m = g,
                    l;
                f = b(f, this.cropShoulder);
                for (l = 0; l < g; l++)
                    if (a[l] >= e) {
                        h = Math.max(0, l - f);
                        break
                    } for (e =
                    l; e < g; e++)
                    if (a[e] > c) {
                        m = e + f;
                        break
                    } return {
                    xData: a.slice(h, m),
                    yData: d.slice(h, m),
                    start: h,
                    end: m
                }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    d = this.data,
                    e, f = this.processedXData,
                    c = this.processedYData,
                    g = this.pointClass,
                    l = f.length,
                    k = this.cropStart || 0,
                    n, x = this.hasGroupedData,
                    a = a.keys,
                    p, B = [],
                    t;
                d || x || (d = [], d.length = b.length, d = this.data = d);
                a && x && (this.options.keys = !1);
                for (t = 0; t < l; t++) n = k + t, x ? (p = (new g).init(this, [f[t]].concat(u(c[t]))), p.dataGroup = this.groupMap[t], p.dataGroup.options && (p.options =
                    p.dataGroup.options, r(p, p.dataGroup.options), delete p.dataLabels)) : (p = d[n]) || void 0 === b[n] || (d[n] = p = (new g).init(this, b[n], f[t])), p && (p.index = n, B[t] = p);
                this.options.keys = a;
                if (d && (l !== (e = d.length) || x))
                    for (t = 0; t < e; t++) t !== k || x || (t += l), d[t] && (d[t].destroyElements(), d[t].plotX = void 0);
                this.data = d;
                this.points = B;
                h(this, "afterGeneratePoints")
            },
            getExtremes: function(a) {
                var b = this.yAxis,
                    d = this.processedXData,
                    c, f = [],
                    g = 0;
                c = this.xAxis.getExtremes();
                var m = c.min,
                    n = c.max,
                    u, r, x = this.requireSorting ? this.cropShoulder :
                    0,
                    p, B;
                a = a || this.stackedYData || this.processedYData || [];
                c = a.length;
                for (B = 0; B < c; B++)
                    if (r = d[B], p = a[B], u = (l(p, !0) || e(p)) && (!b.positiveValuesOnly || p.length || 0 < p), r = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[B + x] || r) >= m && (d[B - x] || r) <= n, u && r)
                        if (u = p.length)
                            for (; u--;) "number" === typeof p[u] && (f[g++] = p[u]);
                        else f[g++] = p;
                this.dataMin = k(f);
                this.dataMax = G(f);
                h(this, "afterGetExtremes")
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    d = a.stacking,
                    e = this.xAxis,
                    g = e.categories,
                    f = this.yAxis,
                    q = this.points,
                    k = q.length,
                    n = !!this.modifyValue,
                    u, r = this.pointPlacementToXValue(),
                    x = l(r),
                    p = a.threshold,
                    B = a.startFromThreshold ? p : 0,
                    t, E, w, H, y = this.zoneAxis || "y",
                    G = Number.MAX_VALUE;
                for (u = 0; u < k; u++) {
                    var F = q[u],
                        I = F.x,
                        Q = F.y;
                    E = F.low;
                    var N = d && f.stacks[(this.negStacks && Q < (B ? 0 : p) ? "-" : "") + this.stackKey],
                        V;
                    f.positiveValuesOnly && null !== Q && 0 >= Q && (F.isNull = !0);
                    F.plotX = t = c(Math.min(Math.max(-1E5, e.translate(I, 0, 0, 0, 1, r, "flags" === this.type)), 1E5));
                    d && this.visible &&
                        !F.isNull && N && N[I] && (H = this.getStackIndicator(H, I, this.index), V = N[I], Q = V.points[H.key], E = Q[0], Q = Q[1], E === B && H.key === N[I].base && (E = b(l(p) && p, f.min)), f.positiveValuesOnly && 0 >= E && (E = null), F.total = F.stackTotal = V.total, F.percentage = V.total && F.y / V.total * 100, F.stackY = Q, V.setOffset(this.pointXOffset || 0, this.barW || 0));
                    F.yBottom = v(E) ? Math.min(Math.max(-1E5, f.translate(E, 0, 1, 0, 1)), 1E5) : null;
                    n && (Q = this.modifyValue(Q, F));
                    F.plotY = E = "number" === typeof Q && Infinity !== Q ? Math.min(Math.max(-1E5, f.translate(Q, 0, 1, 0, 1)),
                        1E5) : void 0;
                    F.isInside = void 0 !== E && 0 <= E && E <= f.len && 0 <= t && t <= e.len;
                    F.clientX = x ? c(e.translate(I, 0, 0, 0, 1, r)) : t;
                    F.negative = F[y] < (a[y + "Threshold"] || p || 0);
                    F.category = g && void 0 !== g[F.x] ? g[F.x] : F.x;
                    F.isNull || (void 0 !== w && (G = Math.min(G, Math.abs(t - w))), w = t);
                    F.zone = this.zones.length && F.getZone()
                }
                this.closestPointRangePx = G;
                h(this, "afterTranslate")
            },
            getValidPoints: function(a, b, d) {
                var e = this.chart;
                return (a || this.points || []).filter(function(a) {
                    return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : d || !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    d = this.options,
                    e = b.renderer,
                    f = b.inverted,
                    c = this.clipBox,
                    g = c || b.clipBox,
                    h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, d.xAxis, d.yAxis].join(),
                    m = b[h],
                    l = b[h + "m"];
                m || (a && (g.width = 0, f && (g.x = b.plotSizeX), b[h + "m"] = l = e.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[h] = m = e.clipRect(g), m.count = {
                    length: 0
                });
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                !1 !== d.clip && (this.group.clip(a ||
                    c ? m : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = h);
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && h && b[h] && (c || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    d = F(this.options.animation),
                    e;
                a ? this.setClip(d) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, d), b[e + "m"] && b[e + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: 0
                }, d), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                h(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function() {
                var a = this.points,
                    d = this.chart,
                    e, c, f, g, h = this.options.marker,
                    l, k, n, u = this[this.specialGroup] || this.markerGroup;
                e = this.xAxis;
                var r, x = b(h.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= h.enabledThreshold * h.radius);
                if (!1 !== h.enabled || this._hasPointMarkers)
                    for (e = 0; e < a.length; e++) c = a[e], g = c.graphic, l = c.marker || {}, k = !!c.marker, f = x && void 0 === l.enabled || l.enabled, n = !1 !== c.isInside, f && !c.isNull ? (f = b(l.symbol, this.symbol), r = this.markerAttribs(c,
                        c.selected && "select"), g ? g[n ? "show" : "hide"](!0).animate(r) : n && (0 < r.width || c.hasImage) && (c.graphic = g = d.renderer.symbol(f, r.x, r.y, r.width, r.height, k ? l : h).add(u)), g && !d.styledMode && g.attr(this.pointAttribs(c, c.selected && "select")), g && g.addClass(c.getClassName(), !0)) : g && (c.graphic = g.destroy())
            },
            markerAttribs: function(a, d) {
                var e = this.options.marker,
                    c = a.marker || {},
                    f = c.symbol || e.symbol,
                    g = b(c.radius, e.radius);
                d && (e = e.states[d], d = c.states && c.states[d], g = b(d && d.radius, e && e.radius, g + (e && e.radiusPlus || 0)));
                a.hasImage =
                    f && 0 === f.indexOf("url");
                a.hasImage && (g = 0);
                a = {
                    x: Math.floor(a.plotX) - g,
                    y: a.plotY - g
                };
                g && (a.width = a.height = 2 * g);
                return a
            },
            pointAttribs: function(a, d) {
                var e = this.options.marker,
                    c = a && a.options,
                    f = c && c.marker || {},
                    g = this.color,
                    h = c && c.color,
                    m = a && a.color,
                    c = b(f.lineWidth, e.lineWidth);
                a = a && a.zone && a.zone.color;
                g = h || a || m || g;
                a = f.fillColor || e.fillColor || g;
                g = f.lineColor || e.lineColor || g;
                d && (e = e.states[d], d = f.states && f.states[d] || {}, c = b(d.lineWidth, e.lineWidth, c + b(d.lineWidthPlus, e.lineWidthPlus, 0)), a = d.fillColor || e.fillColor ||
                    a, g = d.lineColor || e.lineColor || g);
                return {
                    stroke: g,
                    "stroke-width": c,
                    fill: a
                }
            },
            destroy: function(b) {
                var d = this,
                    e = d.chart,
                    c = /AppleWebKit\/533/.test(B.navigator.userAgent),
                    f, m, l = d.data || [],
                    k, n;
                h(d, "destroy");
                b || x(d);
                (d.axisTypes || []).forEach(function(a) {
                    (n = d[a]) && n.series && (w(n.series, d), n.isDirty = n.forceRedraw = !0)
                });
                d.legendItem && d.chart.legend.destroyItem(d);
                for (m = l.length; m--;)(k = l[m]) && k.destroy && k.destroy();
                d.points = null;
                a.clearTimeout(d.animationTimeout);
                g(d, function(a, b) {
                    a instanceof H && !a.survive &&
                        (f = c && "group" === b ? "hide" : "destroy", a[f]())
                });
                e.hoverSeries === d && (e.hoverSeries = null);
                w(e.series, d);
                e.orderSeries();
                g(d, function(a, f) {
                    b && "hcEvents" === f || delete d[f]
                })
            },
            getGraphPath: function(a, b, d) {
                var e = this,
                    f = e.options,
                    c = f.step,
                    g, h = [],
                    m = [],
                    l;
                a = a || e.points;
                (g = a.reversed) && a.reverse();
                (c = {
                    right: 1,
                    center: 2
                } [c] || c && 3) && g && (c = 4 - c);
                !f.connectNulls || b || d || (a = this.getValidPoints(a));
                a.forEach(function(g, q) {
                    var k = g.plotX,
                        n = g.plotY,
                        u = a[q - 1];
                    (g.leftCliff || u && u.rightCliff) && !d && (l = !0);
                    g.isNull && !v(b) && 0 < q ? l = !f.connectNulls : g.isNull && !b ? l = !0 : (0 === q || l ? q = ["M", g.plotX, g.plotY] : e.getPointSpline ? q = e.getPointSpline(a, g, q) : c ? (q = 1 === c ? ["L", u.plotX, n] : 2 === c ? ["L", (u.plotX + k) / 2, u.plotY, "L", (u.plotX + k) / 2, n] : ["L", k, u.plotY], q.push("L", k, n)) : q = ["L", k, n], m.push(g.x), c && (m.push(g.x), 2 === c && m.push(g.x)), h.push.apply(h, q), l = !1)
                });
                h.xMap = m;
                return e.graphPath = h
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    d = (this.gappedPath || this.getGraphPath).call(this),
                    e = this.chart.styledMode,
                    f = [
                        ["graph", "highcharts-graph"]
                    ];
                e || f[0].push(b.lineColor ||
                    this.color, b.dashStyle);
                f = a.getZonesGraphs(f);
                f.forEach(function(f, c) {
                    var g = f[0],
                        h = a[g];
                    h ? (h.endX = a.preventGraphAnimation ? null : d.xMap, h.animate({
                        d: d
                    })) : d.length && (a[g] = a.chart.renderer.path(d).addClass(f[1]).attr({
                        zIndex: 1
                    }).add(a.group), e || (h = {
                        stroke: f[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, f[3] ? h.dashstyle = f[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[g].attr(h).shadow(2 > c && b.shadow)));
                    h && (h.startX = d.xMap, h.isArea = d.isArea)
                })
            },
            getZonesGraphs: function(a) {
                this.zones.forEach(function(b,
                    d) {
                    d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className || "")];
                    this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                    a.push(d)
                }, this);
                return a
            },
            applyZones: function() {
                var a = this,
                    d = this.chart,
                    e = d.renderer,
                    c = this.zones,
                    f, g, h = this.clips || [],
                    l, k = this.graph,
                    n = this.area,
                    u = Math.max(d.chartWidth, d.chartHeight),
                    r = this[(this.zoneAxis || "y") + "Axis"],
                    x, p, B = d.inverted,
                    t, v, E, w, H = !1;
                c.length && (k || n) && r && void 0 !== r.min && (p = r.reversed, t = r.horiz, k && !this.showLine &&
                    k.hide(), n && n.hide(), x = r.getExtremes(), c.forEach(function(c, m) {
                        f = p ? t ? d.plotWidth : 0 : t ? 0 : r.toPixels(x.min) || 0;
                        f = Math.min(Math.max(b(g, f), 0), u);
                        g = Math.min(Math.max(Math.round(r.toPixels(b(c.value, x.max), !0) || 0), 0), u);
                        H && (f = g = r.toPixels(x.max));
                        v = Math.abs(f - g);
                        E = Math.min(f, g);
                        w = Math.max(f, g);
                        r.isXAxis ? (l = {
                            x: B ? w : E,
                            y: 0,
                            width: v,
                            height: u
                        }, t || (l.x = d.plotHeight - l.x)) : (l = {
                            x: 0,
                            y: B ? w : E,
                            width: u,
                            height: v
                        }, t && (l.y = d.plotWidth - l.y));
                        B && e.isVML && (l = r.isXAxis ? {
                            x: 0,
                            y: p ? E : w,
                            height: l.width,
                            width: d.chartWidth
                        } : {
                            x: l.y - d.plotLeft -
                                d.spacingBox.x,
                            y: 0,
                            width: l.height,
                            height: d.chartHeight
                        });
                        h[m] ? h[m].animate(l) : (h[m] = e.clipRect(l), k && a["zone-graph-" + m].clip(h[m]), n && a["zone-area-" + m].clip(h[m]));
                        H = c.value > x.max;
                        a.resetZones && 0 === g && (g = void 0)
                    }), this.clips = h)
            },
            invertGroups: function(a) {
                function b() {
                    ["group", "markerGroup"].forEach(function(b) {
                        d[b] && (e.renderer.isVML && d[b].attr({
                            width: d.yAxis.len,
                            height: d.xAxis.len
                        }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(a))
                    })
                }
                var d = this,
                    e = d.chart,
                    f;
                d.xAxis && (f = y(e, "resize", b),
                    y(d, "destroy", f), b(a), d.invertGroups = b)
            },
            plotGroup: function(a, b, d, e, f) {
                var c = this[a],
                    g = !c;
                g && (this[a] = c = this.chart.renderer.g().attr({
                    zIndex: e || .1
                }).add(f));
                c.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (v(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (c.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                c.attr({
                    visibility: d
                })[g ? "attr" : "animate"](this.getPlotBox());
                return c
            },
            getPlotBox: function() {
                var a =
                    this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: d ? d.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    d, e = a.options,
                    f = !!a.animate && b.renderer.isSVG && F(e.animation).duration,
                    c = a.visible ? "inherit" : "hidden",
                    g = e.zIndex,
                    l = a.hasRendered,
                    k = b.seriesGroup,
                    n = b.inverted;
                h(this, "render");
                d = a.plotGroup("group", "series", c, g, k);
                a.markerGroup = a.plotGroup("markerGroup", "markers", c, g, k);
                f && a.animate(!0);
                d.inverted = a.isCartesian ?
                    n : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(n);
                !1 === e.clip || a.sharedClipKey || l || d.clip(b.clipRect);
                f && a.animate();
                l || (a.animationTimeout = E(function() {
                    a.afterAnimate()
                }, f));
                a.isDirty = !1;
                a.hasRendered = !0;
                h(a, "afterRender")
            },
            redraw: function() {
                var a = this.chart,
                    d = this.isDirty || this.isDirtyData,
                    e = this.group,
                    c = this.xAxis,
                    f = this.yAxis;
                e && (a.inverted && e.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), e.animate({
                    translateX: b(c && c.left, a.plotLeft),
                    translateY: b(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                d && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var d = this.xAxis,
                    e = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b, a)
            },
            buildKDTree: function(a) {
                function b(a, e, c) {
                    var f, g;
                    if (g = a && a.length) return f = d.kdAxisArray[e % c], a.sort(function(a,
                        b) {
                        return a[f] - b[f]
                    }), g = Math.floor(g / 2), {
                        point: a[g],
                        left: b(a.slice(0, g), e + 1, c),
                        right: b(a.slice(g + 1), e + 1, c)
                    }
                }
                this.buildingKdTree = !0;
                var d = this,
                    e = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete d.kdTree;
                E(function() {
                    d.kdTree = b(d.getValidPoints(null, !d.directTouch), e, e);
                    d.buildingKdTree = !1
                }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
            },
            searchKDTree: function(a, b, d) {
                function e(a, b, d, m) {
                    var l = b.point,
                        k = f.kdAxisArray[d % m],
                        q, n, u = l;
                    n = v(a[c]) && v(l[c]) ? Math.pow(a[c] - l[c], 2) : null;
                    q = v(a[g]) && v(l[g]) ?
                        Math.pow(a[g] - l[g], 2) : null;
                    q = (n || 0) + (q || 0);
                    l.dist = v(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                    l.distX = v(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    k = a[k] - l[k];
                    q = 0 > k ? "left" : "right";
                    n = 0 > k ? "right" : "left";
                    b[q] && (q = e(a, b[q], d + 1, m), u = q[h] < u[h] ? q : l);
                    b[n] && Math.sqrt(k * k) < u[h] && (a = e(a, b[n], d + 1, m), u = a[h] < u[h] ? a : u);
                    return u
                }
                var f = this,
                    c = this.kdAxisArray[0],
                    g = this.kdAxisArray[1],
                    h = b ? "distX" : "dist";
                b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(d);
                if (this.kdTree) return e(a,
                    this.kdTree, b, b)
            },
            pointPlacementToXValue: function() {
                var a = this.options.pointPlacement;
                "between" === a && (a = .5);
                l(a) && (a *= b(this.options.pointRange || this.xAxis.pointRange));
                return a
            }
        })
    })(I);
    (function(a) {
        var y = a.Axis,
            F = a.Chart,
            G = a.correctFloat,
            k = a.defined,
            c = a.destroyObjectProperties,
            p = a.format,
            t = a.objectEach,
            v = a.pick,
            w = a.Series;
        a.StackItem = function(a, c, e, l, k) {
            var d = a.chart.inverted;
            this.axis = a;
            this.isNegative = e;
            this.options = c;
            this.x = l;
            this.total = null;
            this.points = {};
            this.stack = k;
            this.rightCliff = this.leftCliff =
                0;
            this.alignOptions = {
                align: c.align || (d ? e ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (d ? "middle" : e ? "bottom" : "top"),
                y: v(c.y, d ? 4 : e ? 14 : -6),
                x: v(c.x, d ? e ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (d ? e ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function() {
                c(this, this.axis)
            },
            render: function(a) {
                var c = this.axis.chart,
                    e = this.options,
                    l = e.format,
                    l = l ? p(l, this, c.time) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: l,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(l, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(a);
                this.label.labelrank = c.plotHeight
            },
            setOffset: function(a, c) {
                var e = this.axis,
                    h = e.chart,
                    n = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    d = e.translate(0),
                    d = k(n) && Math.abs(n - d);
                a = h.xAxis[0].translate(this.x) + a;
                e = k(n) && this.getStackBox(h, this, a, n, c, d, e);
                (c = this.label) && e && (c.align(this.alignOptions, null, e), e = c.alignAttr, c[!1 === this.options.crop || h.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0))
            },
            getStackBox: function(a, c, e, l, k, d, g) {
                var b = c.axis.reversed,
                    h =
                    a.inverted;
                a = g.height + g.pos - (h ? a.plotLeft : a.plotTop);
                c = c.isNegative && !b || !c.isNegative && b;
                return {
                    x: h ? c ? l : l - d : e,
                    y: h ? a - e - k : c ? a - l - d : a - l,
                    width: h ? d : k,
                    height: h ? k : d
                }
            }
        };
        F.prototype.getStacks = function() {
            var a = this;
            a.yAxis.forEach(function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            a.series.forEach(function(c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + v(c.options.stack, ""))
            })
        };
        y.prototype.buildStacks = function() {
            var a = this.series,
                c = v(this.options.reversedStacks,
                    !0),
                e = a.length,
                l;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (l = e; l--;) a[c ? l : e - l - 1].setStackedPoints();
                for (l = 0; l < e; l++) a[l].modifyStacks()
            }
        };
        y.prototype.renderStackTotals = function() {
            var a = this.chart,
                c = a.renderer,
                e = this.stacks,
                l = this.stackTotalGroup;
            l || (this.stackTotalGroup = l = c.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            l.translate(a.plotLeft, a.plotTop);
            t(e, function(a) {
                t(a, function(a) {
                    a.render(l)
                })
            })
        };
        y.prototype.resetStacks = function() {
            var a = this,
                c = a.stacks;
            a.isXAxis || t(c, function(e) {
                t(e,
                    function(c, h) {
                        c.touched < a.stacksTouched ? (c.destroy(), delete e[h]) : (c.total = null, c.cumulative = null)
                    })
            })
        };
        y.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), t(a, function(a) {
                t(a, function(a) {
                    a.cumulative = a.total
                })
            }))
        };
        w.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var c = this.processedXData,
                    h = this.processedYData,
                    e = [],
                    l = h.length,
                    n = this.options,
                    d = n.threshold,
                    g = v(n.startFromThreshold &&
                        d, 0),
                    b = n.stack,
                    n = n.stacking,
                    x = this.stackKey,
                    u = "-" + x,
                    p = this.negStacks,
                    t = this.yAxis,
                    B = t.stacks,
                    m = t.oldStacks,
                    z, D, A, f, q, w, y;
                t.stacksTouched += 1;
                for (q = 0; q < l; q++) w = c[q], y = h[q], z = this.getStackIndicator(z, w, this.index), f = z.key, A = (D = p && y < (g ? 0 : d)) ? u : x, B[A] || (B[A] = {}), B[A][w] || (m[A] && m[A][w] ? (B[A][w] = m[A][w], B[A][w].total = null) : B[A][w] = new a.StackItem(t, t.options.stackLabels, D, w, b)), A = B[A][w], null !== y ? (A.points[f] = A.points[this.index] = [v(A.cumulative, g)], k(A.cumulative) || (A.base = f), A.touched = t.stacksTouched,
                    0 < z.index && !1 === this.singleStacks && (A.points[f][0] = A.points[this.index + "," + w + ",0"][0])) : A.points[f] = A.points[this.index] = null, "percent" === n ? (D = D ? x : u, p && B[D] && B[D][w] ? (D = B[D][w], A.total = D.total = Math.max(D.total, A.total) + Math.abs(y) || 0) : A.total = G(A.total + (Math.abs(y) || 0))) : A.total = G(A.total + (y || 0)), A.cumulative = v(A.cumulative, g) + (y || 0), null !== y && (A.points[f].push(A.cumulative), e[q] = A.cumulative);
                "percent" === n && (t.usePercentage = !0);
                this.stackedYData = e;
                t.oldStacks = {}
            }
        };
        w.prototype.modifyStacks = function() {
            var a =
                this,
                c = a.stackKey,
                e = a.yAxis.stacks,
                l = a.processedXData,
                k, d = a.options.stacking;
            a[d + "Stacker"] && [c, "-" + c].forEach(function(c) {
                for (var b = l.length, g, h; b--;)
                    if (g = l[b], k = a.getStackIndicator(k, g, a.index, c), h = (g = e[c] && e[c][g]) && g.points[k.key]) a[d + "Stacker"](h, g, b)
            })
        };
        w.prototype.percentStacker = function(a, c, e) {
            c = c.total ? 100 / c.total : 0;
            a[0] = G(a[0] * c);
            a[1] = G(a[1] * c);
            this.stackedYData[e] = a[1]
        };
        w.prototype.getStackIndicator = function(a, c, e, l) {
            !k(a) || a.x !== c || l && a.key !== l ? a = {
                x: c,
                index: 0,
                key: l
            } : a.index++;
            a.key = [e,
                c, a.index
            ].join();
            return a
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.animate,
            G = a.Axis,
            k = a.Chart,
            c = a.createElement,
            p = a.css,
            t = a.defined,
            v = a.erase,
            w = a.extend,
            r = a.fireEvent,
            h = a.isNumber,
            e = a.isObject,
            l = a.isArray,
            n = a.merge,
            d = a.objectEach,
            g = a.pick,
            b = a.Point,
            x = a.Series,
            u = a.seriesTypes,
            H = a.setAnimation,
            E = a.splat;
        a.cleanRecursively = function(b, c) {
            var g = {};
            d(b, function(d, h) {
                if (e(b[h], !0) && c[h]) d = a.cleanRecursively(b[h], c[h]), Object.keys(d).length && (g[h] = d);
                else if (e(b[h]) || b[h] !== c[h]) g[h] = b[h]
            });
            return g
        };
        w(k.prototype, {
            addSeries: function(a, b, d) {
                var e, c = this;
                a && (b = g(b, !0), r(c, "addSeries", {
                    options: a
                }, function() {
                    e = c.initSeries(a);
                    c.isDirtyLegend = !0;
                    c.linkSeries();
                    r(c, "afterAddSeries");
                    b && c.redraw(d)
                }));
                return e
            },
            addAxis: function(a, b, d, e) {
                var c = b ? "xAxis" : "yAxis",
                    f = this.options;
                a = n(a, {
                    index: this[c].length,
                    isX: b
                });
                b = new G(this, a);
                f[c] = E(f[c] || {});
                f[c].push(a);
                g(d, !0) && this.redraw(e);
                return b
            },
            showLoading: function(a) {
                var b = this,
                    d = b.options,
                    e = b.loadingDiv,
                    g = d.loading,
                    f = function() {
                        e && p(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop +
                                "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = c("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = c("span", {
                    className: "highcharts-loading-inner"
                }, null, e), y(b, "redraw", f));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || d.lang.loading;
                b.styledMode || (p(e, w(g.style, {
                    zIndex: 10
                })), p(b.loadingSpan, g.labelStyle), b.loadingShown || (p(e, {
                    opacity: 0,
                    display: ""
                }), F(e, {
                    opacity: g.style.opacity || .5
                }, {
                    duration: g.showDuration || 0
                })));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function() {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || F(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        p(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
            update: function(b, e, c, l) {
                var m = this,
                    f = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    k, u, p, x = [];
                r(m, "update", {
                    options: b
                });
                b.isResponsiveOptions || m.setResponsive(!1, !0);
                b = a.cleanRecursively(b, m.options);
                if (k = b.chart) {
                    n(!0, m.options.chart, k);
                    "className" in k && m.setClassName(k.className);
                    "reflow" in k && m.setReflow(k.reflow);
                    if ("inverted" in k || "polar" in k || "type" in k) m.propFromSeries(), u = !0;
                    "alignTicks" in k && (u = !0);
                    d(k, function(a, b) {
                        -1 !== m.propsRequireUpdateSeries.indexOf("chart." + b) && (p = !0); - 1 !== m.propsRequireDirtyBox.indexOf(b) && (m.isDirtyBox = !0)
                    });
                    !m.styledMode && "style" in k && m.renderer.setStyle(k.style)
                }!m.styledMode && b.colors && (this.options.colors = b.colors);
                b.plotOptions && n(!0, this.options.plotOptions, b.plotOptions);
                d(b, function(a, b) {
                    if (m[b] && "function" === typeof m[b].update) m[b].update(a,
                        !1);
                    else if ("function" === typeof m[f[b]]) m[f[b]](a);
                    "chart" !== b && -1 !== m.propsRequireUpdateSeries.indexOf(b) && (p = !0)
                });
                this.collectionsWithUpdate.forEach(function(a) {
                    var d;
                    b[a] && ("series" === a && (d = [], m[a].forEach(function(a, b) {
                        a.options.isInternal || d.push(g(a.options.index, b))
                    })), E(b[a]).forEach(function(b, f) {
                        (f = t(b.id) && m.get(b.id) || m[a][d ? d[f] : f]) && f.coll === a && (f.update(b, !1), c && (f.touched = !0));
                        if (!f && c)
                            if ("series" === a) m.addSeries(b, !1).touched = !0;
                            else if ("xAxis" === a || "yAxis" === a) m.addAxis(b, "xAxis" ===
                            a, !1).touched = !0
                    }), c && m[a].forEach(function(a) {
                        a.touched || a.options.isInternal ? delete a.touched : x.push(a)
                    }))
                });
                x.forEach(function(a) {
                    a.remove && a.remove(!1)
                });
                u && m.axes.forEach(function(a) {
                    a.update({}, !1)
                });
                p && m.series.forEach(function(a) {
                    a.update({}, !1)
                });
                b.loading && n(!0, m.options.loading, b.loading);
                u = k && k.width;
                k = k && k.height;
                h(u) && u !== m.chartWidth || h(k) && k !== m.chartHeight ? m.setSize(u, k, l) : g(e, !0) && m.redraw(l);
                r(m, "afterUpdate", {
                    options: b
                })
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        w(b.prototype, {
            update: function(a, b, d, c) {
                function h() {
                    f.applyOptions(a);
                    null === f.y && l && (f.graphic = l.destroy());
                    e(a, !0) && (l && l.element && a && a.marker && void 0 !== a.marker.symbol && (f.graphic = l.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()), f.connector && (f.connector = f.connector.destroy()));
                    k = f.index;
                    m.updateParallelArrays(f, k);
                    u.data[k] = e(u.data[k], !0) || e(a, !0) ? f.options : g(a, u.data[k]);
                    m.isDirty = m.isDirtyData = !0;
                    !m.fixedBox && m.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === u.legendType &&
                        (n.isDirtyLegend = !0);
                    b && n.redraw(d)
                }
                var f = this,
                    m = f.series,
                    l = f.graphic,
                    k, n = m.chart,
                    u = m.options;
                b = g(b, !0);
                !1 === c ? h() : f.firePointEvent("update", {
                    options: a
                }, h)
            },
            remove: function(a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            }
        });
        w(x.prototype, {
            addPoint: function(a, b, d, e) {
                var c = this.options,
                    f = this.data,
                    h = this.chart,
                    m = this.xAxis,
                    m = m && m.hasNames && m.names,
                    l = c.data,
                    k, n, u = this.xData,
                    p, r;
                b = g(b, !0);
                k = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(k, [a]);
                r = k.x;
                p = u.length;
                if (this.requireSorting &&
                    r < u[p - 1])
                    for (n = !0; p && u[p - 1] > r;) p--;
                this.updateParallelArrays(k, "splice", p, 0, 0);
                this.updateParallelArrays(k, p);
                m && k.name && (m[r] = k.name);
                l.splice(p, 0, a);
                n && (this.data.splice(p, 0, null), this.processData());
                "point" === c.legendType && this.generatePoints();
                d && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(k, "shift"), l.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(e)
            },
            removePoint: function(a, b, d) {
                var e = this,
                    c = e.data,
                    f = c[a],
                    h = e.points,
                    m = e.chart,
                    l = function() {
                        h && h.length === c.length &&
                            h.splice(a, 1);
                        c.splice(a, 1);
                        e.options.data.splice(a, 1);
                        e.updateParallelArrays(f || {
                            series: e
                        }, "splice", a, 1);
                        f && f.destroy();
                        e.isDirty = !0;
                        e.isDirtyData = !0;
                        b && m.redraw()
                    };
                H(d, m);
                b = g(b, !0);
                f ? f.firePointEvent("remove", null, l) : l()
            },
            remove: function(a, b, d, e) {
                function c() {
                    f.destroy(e);
                    f.remove = null;
                    h.isDirtyLegend = h.isDirtyBox = !0;
                    h.linkSeries();
                    g(a, !0) && h.redraw(b)
                }
                var f = this,
                    h = f.chart;
                !1 !== d ? r(f, "remove", null, c) : c()
            },
            update: function(b, d) {
                b = a.cleanRecursively(b, this.userOptions);
                var e = this,
                    c = e.chart,
                    h = e.userOptions,
                    f = e.initialType || e.type,
                    m = b.type || h.type || c.options.chart.type,
                    l = u[f].prototype,
                    k, p = ["group", "markerGroup", "dataLabelsGroup"],
                    x = ["navigatorSeries", "baseSeries"],
                    t = e.finishedAnimating && {
                        animation: !1
                    },
                    v = ["data", "name", "turboThreshold"],
                    B = Object.keys(b),
                    E = 0 < B.length;
                B.forEach(function(a) {
                    -1 === v.indexOf(a) && (E = !1)
                });
                if (E) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1);
                else {
                    x = p.concat(x);
                    x.forEach(function(a) {
                        x[a] = e[a];
                        delete e[a]
                    });
                    b = n(h, t, {
                        index: e.index,
                        pointStart: g(h.pointStart, e.xData[0])
                    }, {
                        data: e.options.data
                    }, b);
                    e.remove(!1, null, !1, !0);
                    for (k in l) e[k] = void 0;
                    u[m || f] ? w(e, u[m || f].prototype) : a.error(17, !0, c);
                    x.forEach(function(a) {
                        e[a] = x[a]
                    });
                    e.init(c, b);
                    b.zIndex !== h.zIndex && p.forEach(function(a) {
                        e[a] && e[a].attr({
                            zIndex: b.zIndex
                        })
                    });
                    e.initialType = f;
                    c.linkSeries()
                }
                r(this, "afterUpdate");
                g(d, !0) && c.redraw(E ? void 0 : !1)
            },
            setName: function(a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        w(G.prototype, {
            update: function(a, b) {
                var e = this.chart,
                    c = a && a.events || {};
                a = n(this.userOptions, a);
                e.options[this.coll].indexOf && (e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)] = a);
                d(e.options[this.coll].events, function(a, b) {
                    "undefined" === typeof c[b] && (c[b] = void 0)
                });
                this.destroy(!0);
                this.init(e, w(a, {
                    events: c
                }));
                e.isDirtyBox = !0;
                g(b, !0) && e.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, d = this.coll, e = this.series, c = e.length; c--;) e[c] && e[c].remove(!1);
                v(b.axes, this);
                v(b[d], this);
                l(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d];
                b[d].forEach(function(a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                g(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(I);
    (function(a) {
        var y = a.color,
            F = a.pick,
            G = a.Series,
            k = a.seriesType;
        k("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(c) {
                var k = [],
                    t = [],
                    v = this.xAxis,
                    w = this.yAxis,
                    r = w.stacks[this.stackKey],
                    h = {},
                    e = this.index,
                    l = w.series,
                    n = l.length,
                    d, g = F(w.options.reversedStacks,
                        !0) ? 1 : -1,
                    b;
                c = c || this.points;
                if (this.options.stacking) {
                    for (b = 0; b < c.length; b++) c[b].leftNull = c[b].rightNull = null, h[c[b].x] = c[b];
                    a.objectEach(r, function(a, b) {
                        null !== a.total && t.push(b)
                    });
                    t.sort(function(a, b) {
                        return a - b
                    });
                    d = l.map(function(a) {
                        return a.visible
                    });
                    t.forEach(function(a, c) {
                        var l = 0,
                            u, p;
                        if (h[a] && !h[a].isNull) k.push(h[a]), [-1, 1].forEach(function(l) {
                            var k = 1 === l ? "rightNull" : "leftNull",
                                m = 0,
                                x = r[t[c + l]];
                            if (x)
                                for (b = e; 0 <= b && b < n;) u = x.points[b], u || (b === e ? h[a][k] = !0 : d[b] && (p = r[a].points[b]) && (m -= p[1] - p[0])),
                                    b += g;
                            h[a][1 === l ? "rightCliff" : "leftCliff"] = m
                        });
                        else {
                            for (b = e; 0 <= b && b < n;) {
                                if (u = r[a].points[b]) {
                                    l = u[1];
                                    break
                                }
                                b += g
                            }
                            l = w.translate(l, 0, 1, 0, 1);
                            k.push({
                                isNull: !0,
                                plotX: v.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: l,
                                yBottom: l
                            })
                        }
                    })
                }
                return k
            },
            getGraphPath: function(a) {
                var c = G.prototype.getGraphPath,
                    k = this.options,
                    v = k.stacking,
                    w = this.yAxis,
                    r, h, e = [],
                    l = [],
                    n = this.index,
                    d, g = w.stacks[this.stackKey],
                    b = k.threshold,
                    x = w.getThreshold(k.threshold),
                    u, k = k.connectNulls || "percent" === v,
                    H = function(c, h, k) {
                        var m = a[c];
                        c = v && g[m.x].points[n];
                        var u =
                            m[k + "Null"] || 0;
                        k = m[k + "Cliff"] || 0;
                        var p, f, m = !0;
                        k || u ? (p = (u ? c[0] : c[1]) + k, f = c[0] + k, m = !!u) : !v && a[h] && a[h].isNull && (p = f = b);
                        void 0 !== p && (l.push({
                            plotX: d,
                            plotY: null === p ? x : w.getThreshold(p),
                            isNull: m,
                            isCliff: !0
                        }), e.push({
                            plotX: d,
                            plotY: null === f ? x : w.getThreshold(f),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                v && (a = this.getStackPoints(a));
                for (r = 0; r < a.length; r++)
                    if (h = a[r].isNull, d = F(a[r].rectPlotX, a[r].plotX), u = F(a[r].yBottom, x), !h || k) k || H(r, r - 1, "left"), h && !v && k || (l.push(a[r]), e.push({
                        x: r,
                        plotX: d,
                        plotY: u
                    })), k || H(r, r + 1, "right");
                r = c.call(this, l, !0, !0);
                e.reversed = !0;
                h = c.call(this, e, !0, !0);
                h.length && (h[0] = "L");
                h = r.concat(h);
                c = c.call(this, l, !1, k);
                h.xMap = r.xMap;
                this.areaPath = h;
                return c
            },
            drawGraph: function() {
                this.areaPath = [];
                G.prototype.drawGraph.apply(this);
                var a = this,
                    k = this.areaPath,
                    t = this.options,
                    v = [
                        ["area", "highcharts-area", this.color, t.fillColor]
                    ];
                this.zones.forEach(function(c, k) {
                    v.push(["zone-area-" + k, "highcharts-area highcharts-zone-area-" + k + " " + c.className, c.color || a.color, c.fillColor || t.fillColor])
                });
                v.forEach(function(c) {
                    var p =
                        c[0],
                        h = a[p];
                    h ? (h.endX = a.preventGraphAnimation ? null : k.xMap, h.animate({
                        d: k
                    })) : (h = {
                        zIndex: 0
                    }, a.chart.styledMode || (h.fill = F(c[3], y(c[2]).setOpacity(F(t.fillOpacity, .75)).get())), h = a[p] = a.chart.renderer.path(k).addClass(c[1]).attr(h).add(a.group), h.isArea = !0);
                    h.startX = k.xMap;
                    h.shiftUnit = t.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(I);
    (function(a) {
        var y = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, G, k) {
                var c = G.plotX,
                    p = G.plotY,
                    t = a[k - 1];
                k = a[k + 1];
                var v, w, r,
                    h;
                if (t && !t.isNull && !1 !== t.doCurve && !G.isCliff && k && !k.isNull && !1 !== k.doCurve && !G.isCliff) {
                    a = t.plotY;
                    r = k.plotX;
                    k = k.plotY;
                    var e = 0;
                    v = (1.5 * c + t.plotX) / 2.5;
                    w = (1.5 * p + a) / 2.5;
                    r = (1.5 * c + r) / 2.5;
                    h = (1.5 * p + k) / 2.5;
                    r !== v && (e = (h - w) * (r - c) / (r - v) + p - h);
                    w += e;
                    h += e;
                    w > a && w > p ? (w = Math.max(a, p), h = 2 * p - w) : w < a && w < p && (w = Math.min(a, p), h = 2 * p - w);
                    h > k && h > p ? (h = Math.max(k, p), w = 2 * p - h) : h < k && h < p && (h = Math.min(k, p), w = 2 * p - h);
                    G.rightContX = r;
                    G.rightContY = h
                }
                G = ["C", y(t.rightContX, t.plotX), y(t.rightContY, t.plotY), y(v, c), y(w, p), c, p];
                t.rightContX = t.rightContY =
                    null;
                return G
            }
        })
    })(I);
    (function(a) {
        var y = a.seriesTypes.area.prototype,
            F = a.seriesType;
        F("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: y.getStackPoints,
            getGraphPath: y.getGraphPath,
            drawGraph: y.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(I);
    (function(a) {
        var y = a.animObject,
            F = a.color,
            G = a.extend,
            k = a.defined,
            c = a.isNumber,
            p = a.merge,
            t = a.pick,
            v = a.Series,
            w = a.seriesType,
            r = a.svg;
        w("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                v.prototype.init.apply(this, arguments);
                var a = this,
                    e = a.chart;
                e.hasRendered && e.series.forEach(function(e) {
                    e.type === a.type &&
                        (e.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    e = a.options,
                    c = a.xAxis,
                    k = a.yAxis,
                    d = c.options.reversedStacks,
                    d = c.reversed && !d || !c.reversed && d,
                    g, b = {},
                    p = 0;
                !1 === e.grouping ? p = 1 : a.chart.series.forEach(function(d) {
                    var e = d.options,
                        c = d.yAxis,
                        h;
                    d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || k.len !== c.len || k.pos !== c.pos || (e.stacking ? (g = d.stackKey, void 0 === b[g] && (b[g] = p++), h = b[g]) : !1 !== e.grouping && (h = p++), d.columnIndex = h)
                });
                var u = Math.min(Math.abs(c.transA) * (c.ordinalSlope || e.pointRange ||
                        c.closestPointRange || c.tickInterval || 1), c.len),
                    r = u * e.groupPadding,
                    v = (u - 2 * r) / (p || 1),
                    e = Math.min(e.maxPointWidth || c.len, t(e.pointWidth, v * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (v - e) / 2 + (r + ((a.columnIndex || 0) + (d ? 1 : 0)) * v - u / 2) * (d ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, e, c, k) {
                var d = this.chart,
                    g = this.borderWidth,
                    b = -(g % 2 ? .5 : 0),
                    g = g % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (g += 1);
                this.options.crisp && (c = Math.round(a + c) + b, a = Math.round(a) + b, c -= a);
                k = Math.round(e + k) + g;
                b = .5 >= Math.abs(e) && .5 <
                    k;
                e = Math.round(e) + g;
                k -= e;
                b && k && (--e, k += 1);
                return {
                    x: a,
                    y: e,
                    width: c,
                    height: k
                }
            },
            translate: function() {
                var a = this,
                    e = a.chart,
                    c = a.options,
                    n = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    n = a.borderWidth = t(c.borderWidth, n ? 0 : 1),
                    d = a.yAxis,
                    g = c.threshold,
                    b = a.translatedThreshold = d.getThreshold(g),
                    p = t(c.minPointLength, 5),
                    u = a.getColumnMetrics(),
                    r = u.width,
                    E = a.barW = Math.max(r, 1 + 2 * n),
                    B = a.pointXOffset = u.offset;
                e.inverted && (b -= .5);
                c.pointPadding && (E = Math.ceil(E));
                v.prototype.translate.apply(a);
                a.points.forEach(function(c) {
                    var h =
                        t(c.yBottom, b),
                        l = 999 + Math.abs(h),
                        m = r,
                        l = Math.min(Math.max(-l, c.plotY), d.len + l),
                        f = c.plotX + B,
                        n = E,
                        u = Math.min(l, h),
                        x, v = Math.max(l, h) - u;
                    p && Math.abs(v) < p && (v = p, x = !d.reversed && !c.negative || d.reversed && c.negative, c.y === g && a.dataMax <= g && d.min < g && (x = !x), u = Math.abs(u - b) > p ? h - p : b - (x ? p : 0));
                    k(c.options.pointWidth) && (m = n = Math.ceil(c.options.pointWidth), f -= Math.round((m - r) / 2));
                    c.barX = f;
                    c.pointWidth = m;
                    c.tooltipPos = e.inverted ? [d.len + d.pos - e.plotLeft - l, a.xAxis.len - f - n / 2, v] : [f + n / 2, l + d.pos - e.plotTop, v];
                    c.shapeType = c.shapeType ||
                        "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [f, b, n, 0] : [f, u, n, v])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, e) {
                var c = this.options,
                    h, d = this.pointAttrToOptions || {};
                h = d.stroke || "borderColor";
                var g = d["stroke-width"] || "borderWidth",
                    b = a && a.color || this.color,
                    k = a && a[h] || c[h] || this.color || b,
                    u = a && a[g] || c[g] || this[g] || 0,
                    d = c.dashStyle;
                a && this.zones.length && (b = a.getZone(),
                    b = a.options.color || b && b.color || this.color);
                e && (a = p(c.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, b = a.color || void 0 !== e && F(b).brighten(a.brightness).get() || b, k = a[h] || k, u = a[g] || u, d = a.dashStyle || d);
                h = {
                    fill: b,
                    stroke: k,
                    "stroke-width": u
                };
                d && (h.dashstyle = d);
                return h
            },
            drawPoints: function() {
                var a = this,
                    e = this.chart,
                    k = a.options,
                    n = e.renderer,
                    d = k.animationLimit || 250,
                    g;
                a.points.forEach(function(b) {
                    var h = b.graphic,
                        l = h && e.pointCount < d ? "animate" : "attr";
                    if (c(b.plotY) && null !== b.y) {
                        g = b.shapeArgs;
                        if (h) h[l](p(g));
                        else b.graphic = h = n[b.shapeType](g).add(b.group || a.group);
                        k.borderRadius && h.attr({
                            r: k.borderRadius
                        });
                        e.styledMode || h[l](a.pointAttribs(b, b.selected && "select")).shadow(k.shadow, null, k.stacking && !k.borderRadius);
                        h.addClass(b.getClassName(), !0)
                    } else h && (b.graphic = h.destroy())
                })
            },
            animate: function(a) {
                var e = this,
                    c = this.yAxis,
                    h = e.options,
                    d = this.chart.inverted,
                    g = {},
                    b = d ? "translateX" : "translateY",
                    k;
                r && (a ? (g.scaleY = .001, a = Math.min(c.pos + c.len, Math.max(c.pos, c.toPixels(h.threshold))), d ? g.translateX =
                    a - c.len : g.translateY = a, e.clipBox && e.setClip(), e.group.attr(g)) : (k = e.group.attr(b), e.group.animate({
                    scaleY: 1
                }, G(y(e.options.animation), {
                    step: function(a, d) {
                        g[b] = k + d.pos * (c.pos - k);
                        e.group.attr(g)
                    }
                })), e.animate = null))
            },
            remove: function() {
                var a = this,
                    e = a.chart;
                e.hasRendered && e.series.forEach(function(e) {
                    e.type === a.type && (e.isDirty = !0)
                });
                v.prototype.remove.apply(a, arguments)
            }
        })
    })(I);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(I);
    (function(a) {
        var y = a.Series,
            F = a.seriesType;
        F("scatter",
            "line", {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function() {
                    this.options.lineWidth &&
                        y.prototype.drawGraph.call(this)
                },
                applyJitter: function() {
                    var a = this,
                        k = this.options.jitter,
                        c = this.points.length;
                    k && this.points.forEach(function(p, t) {
                        ["x", "y"].forEach(function(v, w) {
                            var r, h = "plot" + v.toUpperCase(),
                                e, l;
                            k[v] && !p.isNull && (r = a[v + "Axis"], l = k[v] * r.transA, r && !r.isLog && (e = Math.max(0, p[h] - l), r = Math.min(r.len, p[h] + l), w = 1E4 * Math.sin(t + w * c), p[h] = e + (r - e) * (w - Math.floor(w)), "x" === v && (p.clientX = p.plotX)))
                        })
                    })
                }
            });
        a.addEvent(y, "afterTranslate", function() {
            this.applyJitter && this.applyJitter()
        })
    })(I);
    (function(a) {
        var y =
            a.deg2rad,
            F = a.isNumber,
            G = a.pick,
            k = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    p = this.chart,
                    t = 2 * (a.slicedOffset || 0),
                    v = p.plotWidth - 2 * t,
                    p = p.plotHeight - 2 * t,
                    w = a.center,
                    w = [G(w[0], "50%"), G(w[1], "50%"), a.size || "100%", a.innerSize || 0],
                    r = Math.min(v, p),
                    h, e;
                for (h = 0; 4 > h; ++h) e = w[h], a = 2 > h || 2 === h && /%$/.test(e), w[h] = k(e, [v, p, r, w[2]][h]) + (a ? t : 0);
                w[3] > w[2] && (w[3] = w[2]);
                return w
            },
            getStartAndEndRadians: function(a, k) {
                a = F(a) ? a : 0;
                k = F(k) && k > a && 360 > k - a ? k : a + 360;
                return {
                    start: y * (a + -90),
                    end: y *
                        (k + -90)
                }
            }
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.CenteredSeriesMixin,
            G = a.defined,
            k = a.extend,
            c = F.getStartAndEndRadians,
            p = a.noop,
            t = a.pick,
            v = a.Point,
            w = a.Series,
            r = a.seriesType,
            h = a.setAnimation;
        r("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0,
                connectorShape: "fixedOffset",
                crookDistance: "70%"
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var e = this,
                    c = e.points,
                    d = e.startAngleRad;
                a || (c.forEach(function(a) {
                    var b = a.graphic,
                        c = a.shapeArgs;
                    b && (b.attr({
                            r: a.startR || e.center[3] / 2,
                            start: d,
                            end: d
                        }),
                        b.animate({
                            r: c.r,
                            start: c.start,
                            end: c.end
                        }, e.options.animation))
                }), e.animate = null)
            },
            updateTotals: function() {
                var a, c = 0,
                    h = this.points,
                    d = h.length,
                    g, b = this.options.ignoreHiddenPoint;
                for (a = 0; a < d; a++) g = h[a], c += b && !g.visible ? 0 : g.isNull ? 0 : g.y;
                this.total = c;
                for (a = 0; a < d; a++) g = h[a], g.percentage = 0 < c && (g.visible || !b) ? g.y / c * 100 : 0, g.total = c
            },
            generatePoints: function() {
                w.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function(a, c, h) {
                var d = this.center,
                    e = this.radii ? this.radii[h.index] : d[2] / 2;
                return d[0] +
                    (c ? -1 : 1) * Math.cos(Math.asin(Math.max(Math.min((a - d[1]) / (e + h.labelDistance), 1), -1))) * (e + h.labelDistance) + (0 < h.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function(a) {
                this.generatePoints();
                var e = 0,
                    h = this.options,
                    d = h.slicedOffset,
                    g = d + (h.borderWidth || 0),
                    b, k, u = c(h.startAngle, h.endAngle),
                    p = this.startAngleRad = u.start,
                    u = (this.endAngleRad = u.end) - p,
                    r = this.points,
                    v, m, z = h.dataLabels.distance,
                    h = h.ignoreHiddenPoint,
                    w, A = r.length,
                    f;
                a || (this.center = a = this.getCenter());
                for (w = 0; w < A; w++) {
                    f = r[w];
                    f.labelDistance = t(f.options.dataLabels && f.options.dataLabels.distance, z);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, f.labelDistance);
                    b = p + e * u;
                    if (!h || f.visible) e += f.percentage / 100;
                    k = p + e * u;
                    f.shapeType = "arc";
                    f.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * b) / 1E3,
                        end: Math.round(1E3 * k) / 1E3
                    };
                    k = (k + b) / 2;
                    k > 1.5 * Math.PI ? k -= 2 * Math.PI : k < -Math.PI / 2 && (k += 2 * Math.PI);
                    f.slicedTranslation = {
                        translateX: Math.round(Math.cos(k) * d),
                        translateY: Math.round(Math.sin(k) * d)
                    };
                    v = Math.cos(k) * a[2] /
                        2;
                    m = Math.sin(k) * a[2] / 2;
                    f.tooltipPos = [a[0] + .7 * v, a[1] + .7 * m];
                    f.half = k < -Math.PI / 2 || k > Math.PI / 2 ? 1 : 0;
                    f.angle = k;
                    b = Math.min(g, f.labelDistance / 5);
                    f.labelPosition = {
                        natural: {
                            x: a[0] + v + Math.cos(k) * f.labelDistance,
                            y: a[1] + m + Math.sin(k) * f.labelDistance
                        },
                        "final": {},
                        alignment: 0 > f.labelDistance ? "center" : f.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: a[0] + v + Math.cos(k) * b,
                                y: a[1] + m + Math.sin(k) * b
                            },
                            touchingSliceAt: {
                                x: a[0] + v,
                                y: a[1] + m
                            }
                        }
                    }
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    c = a.chart,
                    h = c.renderer,
                    d, g, b, p,
                    u = a.options.shadow;
                !u || a.shadowGroup || c.styledMode || (a.shadowGroup = h.g("shadow").add(a.group));
                a.points.forEach(function(e) {
                    g = e.graphic;
                    if (e.isNull) g && (e.graphic = g.destroy());
                    else {
                        p = e.shapeArgs;
                        d = e.getTranslate();
                        if (!c.styledMode) {
                            var l = e.shadowGroup;
                            u && !l && (l = e.shadowGroup = h.g("shadow").add(a.shadowGroup));
                            l && l.attr(d);
                            b = a.pointAttribs(e, e.selected && "select")
                        }
                        g ? (g.setRadialReference(a.center), c.styledMode || g.attr(b), g.animate(k(p, d))) : (e.graphic = g = h[e.shapeType](p).setRadialReference(a.center).attr(d).add(a.group),
                            c.styledMode || g.attr(b).attr({
                                "stroke-linejoin": "round"
                            }).shadow(u, l));
                        g.attr({
                            visibility: e.visible ? "inherit" : "hidden"
                        });
                        g.addClass(e.getClassName())
                    }
                })
            },
            searchPoint: p,
            sortByAngle: function(a, c) {
                a.sort(function(a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: F.getCenter,
            getSymbol: p
        }, {
            init: function() {
                v.prototype.init.apply(this, arguments);
                var a = this,
                    c;
                a.name = t(a.name, "Slice");
                c = function(e) {
                    a.slice("select" === e.type)
                };
                y(a, "select", c);
                y(a, "unselect", c);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, c) {
                var e = this,
                    d = e.series,
                    g = d.chart,
                    b = d.options.ignoreHiddenPoint;
                c = t(c, b);
                a !== e.visible && (e.visible = e.options.visible = a = void 0 === a ? !e.visible : a, d.options.data[d.data.indexOf(e)] = e.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(b) {
                        if (e[b]) e[b][a ? "show" : "hide"](!0)
                    }), e.legendItem && g.legend.colorizeItem(e, a), a || "hover" !== e.state || e.setState(""), b && (d.isDirty = !0), c &&
                    g.redraw())
            },
            slice: function(a, c, k) {
                var d = this.series;
                h(k, d.chart);
                t(c, !0);
                this.sliced = this.options.sliced = G(a) ? a : !this.sliced;
                d.options.data[d.data.indexOf(this)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var e = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y,
                    e.r + a, e.r + a, {
                        innerR: this.shapeArgs.r - 1,
                        start: e.start,
                        end: e.end
                    })
            },
            connectorShapes: {
                fixedOffset: function(a, c, h) {
                    var d = c.breakAt;
                    c = c.touchingSliceAt;
                    return ["M", a.x, a.y].concat(h.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * d.x - c.x, 2 * d.y - c.y, d.x, d.y] : ["L", d.x, d.y]).concat(["L", c.x, c.y])
                },
                straight: function(a, c) {
                    c = c.touchingSliceAt;
                    return ["M", a.x, a.y, "L", c.x, c.y]
                },
                crookedLine: function(e, c, h) {
                    c = c.touchingSliceAt;
                    var d = this.series,
                        g = d.center[0],
                        b = d.chart.plotWidth,
                        k = d.chart.plotLeft,
                        d = e.alignment,
                        l = this.shapeArgs.r;
                    h = a.relativeLength(h.crookDistance, 1);
                    h = "left" === d ? g + l + (b + k - g - l) * (1 - h) : k + (g - l) * h;
                    g = ["L", h, e.y];
                    if ("left" === d ? h > e.x || h < c.x : h < e.x || h > c.x) g = [];
                    return ["M", e.x, e.y].concat(g).concat(["L", c.x, c.y])
                }
            },
            getConnectorPath: function() {
                var a = this.labelPosition,
                    c = this.series.options.dataLabels,
                    h = c.connectorShape,
                    d = this.connectorShapes;
                d[h] && (h = d[h]);
                return h.call(this, {
                    x: a.final.x,
                    y: a.final.y,
                    alignment: a.alignment
                }, a.connectorPosition, c)
            }
        })
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.arrayMax,
            G = a.defined,
            k = a.extend,
            c = a.format,
            p = a.merge,
            t = a.noop,
            v = a.pick,
            w = a.relativeLength,
            r = a.Series,
            h = a.seriesTypes,
            e = a.stableSort,
            l = a.isArray,
            n = a.splat;
        a.distribute = function(d, c, b) {
            function g(a, b) {
                return a.target - b.target
            }
            var h, k = !0,
                l = d,
                n = [],
                m;
            m = 0;
            var p = l.reducedLen || c;
            for (h = d.length; h--;) m += d[h].size;
            if (m > p) {
                e(d, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (m = h = 0; m <= p;) m += d[h].size, h++;
                n = d.splice(h - 1, d.length)
            }
            e(d, g);
            for (d = d.map(function(a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: v(a.align, .5)
                    }
                }); k;) {
                for (h =
                    d.length; h--;) k = d[h], m = (Math.min.apply(0, k.targets) + Math.max.apply(0, k.targets)) / 2, k.pos = Math.min(Math.max(0, m - k.size * k.align), c - k.size);
                h = d.length;
                for (k = !1; h--;) 0 < h && d[h - 1].pos + d[h - 1].size > d[h].pos && (d[h - 1].size += d[h].size, d[h - 1].targets = d[h - 1].targets.concat(d[h].targets), d[h - 1].align = .5, d[h - 1].pos + d[h - 1].size > c && (d[h - 1].pos = c - d[h - 1].size), d.splice(h, 1), k = !0)
            }
            l.push.apply(l, n);
            h = 0;
            d.some(function(d) {
                var e = 0;
                if (d.targets.some(function() {
                        l[h].pos = d.pos + e;
                        if (Math.abs(l[h].pos - l[h].target) > b) return l.slice(0,
                            h + 1).forEach(function(a) {
                            delete a.pos
                        }), l.reducedLen = (l.reducedLen || c) - .1 * c, l.reducedLen > .1 * c && a.distribute(l, c, b), !0;
                        e += l[h].size;
                        h++
                    })) return !0
            });
            e(l, g)
        };
        r.prototype.drawDataLabels = function() {
            function d(a, b) {
                var d = b.filter;
                return d ? (b = d.operator, a = a[d.property], d = d.value, "\x3e" === b && a > d || "\x3c" === b && a < d || "\x3e\x3d" === b && a >= d || "\x3c\x3d" === b && a <= d || "\x3d\x3d" === b && a == d || "\x3d\x3d\x3d" === b && a === d ? !0 : !1) : !0
            }

            function e(a, b) {
                var d = [],
                    c;
                if (l(a) && !l(b)) d = a.map(function(a) {
                    return p(a, b)
                });
                else if (l(b) &&
                    !l(a)) d = b.map(function(b) {
                    return p(a, b)
                });
                else if (l(a) || l(b))
                    for (c = Math.max(a.length, b.length); c--;) d[c] = p(a[c], b[c]);
                else d = p(a, b);
                return d
            }
            var b = this,
                h = b.chart,
                k = b.options,
                r = k.dataLabels,
                t = b.points,
                w, m = b.hasRendered || 0,
                z, D = v(r.defer, !!k.animation),
                A = h.renderer,
                r = e(e(h.options.plotOptions && h.options.plotOptions.series && h.options.plotOptions.series.dataLabels, h.options.plotOptions && h.options.plotOptions[b.type] && h.options.plotOptions[b.type].dataLabels), r);
            a.fireEvent(this, "drawDataLabels");
            if (l(r) ||
                r.enabled || b._hasPointLabels) z = b.plotGroup("dataLabelsGroup", "data-labels", D && !m ? "hidden" : "visible", r.zIndex || 6), D && (z.attr({
                opacity: +m
            }), m || y(b, "afterAnimate", function() {
                b.visible && z.show(!0);
                z[k.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), t.forEach(function(f) {
                w = n(e(r, f.dlOptions || f.options && f.options.dataLabels));
                w.forEach(function(e, g) {
                    var m = e.enabled && !f.isNull && d(f, e),
                        l, n, q, u, p = f.dataLabels ? f.dataLabels[g] : f.dataLabel,
                        r = f.connectors ? f.connectors[g] : f.connector,
                        t = !p;
                    m && (l = f.getLabelConfig(),
                        n = e[f.formatPrefix + "Format"] || e.format, l = G(n) ? c(n, l, h.time) : (e[f.formatPrefix + "Formatter"] || e.formatter).call(l, e), n = e.style, q = e.rotation, h.styledMode || (n.color = v(e.color, n.color, b.color, "#000000"), "contrast" === n.color && (f.contrastColor = A.getContrast(f.color || b.color), n.color = e.inside || 0 > v(e.distance, f.labelDistance) || k.stacking ? f.contrastColor : "#000000"), k.cursor && (n.cursor = k.cursor)), u = {
                            r: e.borderRadius || 0,
                            rotation: q,
                            padding: e.padding,
                            zIndex: 1
                        }, h.styledMode || (u.fill = e.backgroundColor, u.stroke = e.borderColor,
                            u["stroke-width"] = e.borderWidth), a.objectEach(u, function(a, b) {
                            void 0 === a && delete u[b]
                        }));
                    !p || m && G(l) ? m && G(l) && (p ? u.text = l : (f.dataLabels = f.dataLabels || [], p = f.dataLabels[g] = q ? A.text(l, 0, -9999).addClass("highcharts-data-label") : A.label(l, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"), g || (f.dataLabel = p), p.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))), p.options = e, p.attr(u), h.styledMode || p.css(n).shadow(e.shadow), p.added || p.add(z),
                        b.alignDataLabel(f, p, e, null, t)) : (f.dataLabel = f.dataLabel && f.dataLabel.destroy(), f.dataLabels && (1 === f.dataLabels.length ? delete f.dataLabels : delete f.dataLabels[g]), g || delete f.dataLabel, r && (f.connector = f.connector.destroy(), f.connectors && (1 === f.connectors.length ? delete f.connectors : delete f.connectors[g])))
                })
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        r.prototype.alignDataLabel = function(a, e, b, c, h) {
            var d = this.chart,
                g = this.isCartesian && d.inverted,
                l = v(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                m = v(a.plotY,
                    -9999),
                n = e.getBBox(),
                u, p = b.rotation,
                f = b.align,
                q = this.visible && (a.series.forceDL || d.isInsidePlot(l, Math.round(m), g) || c && d.isInsidePlot(l, g ? c.x + 1 : c.y + c.height - 1, g)),
                r = "justify" === v(b.overflow, "justify");
            if (q && (u = d.renderer.fontMetrics(d.styledMode ? void 0 : b.style.fontSize, e).b, c = k({
                    x: g ? this.yAxis.len - m : l,
                    y: Math.round(g ? this.xAxis.len - l : m),
                    width: 0,
                    height: 0
                }, c), k(b, {
                    width: n.width,
                    height: n.height
                }), p ? (r = !1, l = d.renderer.rotCorr(u, p), l = {
                    x: c.x + b.x + c.width / 2 + l.x,
                    y: c.y + b.y + {
                            top: 0,
                            middle: .5,
                            bottom: 1
                        } [b.verticalAlign] *
                        c.height
                }, e[h ? "attr" : "animate"](l).attr({
                    align: f
                }), m = (p + 720) % 360, m = 180 < m && 360 > m, "left" === f ? l.y -= m ? n.height : 0 : "center" === f ? (l.x -= n.width / 2, l.y -= n.height / 2) : "right" === f && (l.x -= n.width, l.y -= m ? 0 : n.height), e.placed = !0, e.alignAttr = l) : (e.align(b, null, c), l = e.alignAttr), r && 0 <= c.height ? a.isLabelJustified = this.justifyDataLabel(e, b, l, n, c, h) : v(b.crop, !0) && (q = d.isInsidePlot(l.x, l.y) && d.isInsidePlot(l.x + n.width, l.y + n.height)), b.shape && !p)) e[h ? "attr" : "animate"]({
                anchorX: g ? d.plotWidth - a.plotY : a.plotX,
                anchorY: g ? d.plotHeight -
                    a.plotX : a.plotY
            });
            q || (e.attr({
                y: -9999
            }), e.placed = !1)
        };
        r.prototype.justifyDataLabel = function(a, e, b, c, h, k) {
            var d = this.chart,
                g = e.align,
                m = e.verticalAlign,
                l, n, u = a.box ? 0 : a.padding || 0;
            l = b.x + u;
            0 > l && ("right" === g ? e.align = "left" : e.x = -l, n = !0);
            l = b.x + c.width - u;
            l > d.plotWidth && ("left" === g ? e.align = "right" : e.x = d.plotWidth - l, n = !0);
            l = b.y + u;
            0 > l && ("bottom" === m ? e.verticalAlign = "top" : e.y = -l, n = !0);
            l = b.y + c.height - u;
            l > d.plotHeight && ("top" === m ? e.verticalAlign = "bottom" : e.y = d.plotHeight - l, n = !0);
            n && (a.placed = !k, a.align(e, null,
                h));
            return n
        };
        h.pie && (h.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function(a) {
                    return a.top + a.distributeBox.pos
                },
                radialDistributionX: function(a, e, b, c) {
                    return a.getX(b < e.top + 2 || b > e.bottom - 2 ? c : b, e.half, e)
                },
                justify: function(a, e, b) {
                    return b[0] + (a.half ? -1 : 1) * (e + a.labelDistance)
                },
                alignToPlotEdges: function(a, e, b, c) {
                    a = a.getBBox().width;
                    return e ? a + c : b - a - c
                },
                alignToConnectors: function(a, e, b, c) {
                    var d = 0,
                        g;
                    a.forEach(function(a) {
                        g = a.dataLabel.getBBox().width;
                        g > d && (d = g)
                    });
                    return e ? d + c : b - d - c
                }
            }, h.pie.prototype.drawDataLabels =
            function() {
                var d = this,
                    e = d.data,
                    b, c = d.chart,
                    h = d.options.dataLabels,
                    k = h.connectorPadding,
                    l = v(h.connectorWidth, 1),
                    n = c.plotWidth,
                    m = c.plotHeight,
                    p = c.plotLeft,
                    t = Math.round(c.chartWidth / 3),
                    w, f = d.center,
                    q = f[2] / 2,
                    y = f[1],
                    K, I, J, M, R = [
                        [],
                        []
                    ],
                    C, P, N, S, O = [0, 0, 0, 0],
                    W = d.dataLabelPositioners;
                d.visible && (h.enabled || d._hasPointLabels) && (e.forEach(function(a) {
                        a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                            width: "auto"
                        }).css({
                            width: "auto",
                            textOverflow: "clip"
                        }), a.dataLabel.shortened = !1)
                    }), r.prototype.drawDataLabels.apply(d),
                    e.forEach(function(a) {
                        a.dataLabel && (a.visible ? (R[a.half].push(a), a.dataLabel._pos = null, !G(h.style.width) && !G(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > t && (a.dataLabel.css({
                            width: .7 * t
                        }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                    }), R.forEach(function(e, g) {
                        var l, u, r = e.length,
                            t = [],
                            x;
                        if (r)
                            for (d.sortByAngle(e, g - .5), 0 < d.maxLabelDistance && (l = Math.max(0, y - q -
                                    d.maxLabelDistance), u = Math.min(y + q + d.maxLabelDistance, c.plotHeight), e.forEach(function(a) {
                                    0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, y - q - a.labelDistance), a.bottom = Math.min(y + q + a.labelDistance, c.plotHeight), x = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                        target: a.labelPosition.natural.y - a.top + x / 2,
                                        size: x,
                                        rank: a.y
                                    }, t.push(a.distributeBox))
                                }), l = u + x - l, a.distribute(t, l, l / 5)), S = 0; S < r; S++) {
                                b = e[S];
                                J = b.labelPosition;
                                K = b.dataLabel;
                                N = !1 === b.visible ? "hidden" : "inherit";
                                P = l = J.natural.y;
                                t && G(b.distributeBox) &&
                                    (void 0 === b.distributeBox.pos ? N = "hidden" : (M = b.distributeBox.size, P = W.radialDistributionY(b)));
                                delete b.positionIndex;
                                if (h.justify) C = W.justify(b, q, f);
                                else switch (h.alignTo) {
                                    case "connectors":
                                        C = W.alignToConnectors(e, g, n, p);
                                        break;
                                    case "plotEdges":
                                        C = W.alignToPlotEdges(K, g, n, p);
                                        break;
                                    default:
                                        C = W.radialDistributionX(d, b, P, l)
                                }
                                K._attr = {
                                    visibility: N,
                                    align: J.alignment
                                };
                                K._pos = {
                                    x: C + h.x + ({
                                        left: k,
                                        right: -k
                                    } [J.alignment] || 0),
                                    y: P + h.y - 10
                                };
                                J.final.x = C;
                                J.final.y = P;
                                v(h.crop, !0) && (I = K.getBBox().width, l = null, C - I < k && 1 ===
                                    g ? (l = Math.round(I - C + k), O[3] = Math.max(l, O[3])) : C + I > n - k && 0 === g && (l = Math.round(C + I - n + k), O[1] = Math.max(l, O[1])), 0 > P - M / 2 ? O[0] = Math.max(Math.round(-P + M / 2), O[0]) : P + M / 2 > m && (O[2] = Math.max(Math.round(P + M / 2 - m), O[2])), K.sideOverflow = l)
                            }
                    }), 0 === F(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), l && this.points.forEach(function(a) {
                    var b;
                    w = a.connector;
                    if ((K = a.dataLabel) && K._pos && a.visible && 0 < a.labelDistance) {
                        N = K._attr.visibility;
                        if (b = !w) a.connector = w = c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" +
                            a.colorIndex + (a.className ? " " + a.className : "")).add(d.dataLabelsGroup), c.styledMode || w.attr({
                            "stroke-width": l,
                            stroke: h.connectorColor || a.color || "#666666"
                        });
                        w[b ? "attr" : "animate"]({
                            d: a.getConnectorPath()
                        });
                        w.attr("visibility", N)
                    } else w && (a.connector = w.destroy())
                }))
            }, h.pie.prototype.placeDataLabels = function() {
                this.points.forEach(function(a) {
                    var d = a.dataLabel;
                    d && a.visible && ((a = d._pos) ? (d.sideOverflow && (d._attr.width = d.getBBox().width - d.sideOverflow, d.css({
                        width: d._attr.width + "px",
                        textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                    }), d.shortened = !0), d.attr(d._attr), d[d.moved ? "animate" : "attr"](a), d.moved = !0) : d && d.attr({
                        y: -9999
                    }))
                }, this)
            }, h.pie.prototype.alignDataLabel = t, h.pie.prototype.verifyDataLabelOverflow = function(a) {
                var d = this.center,
                    b = this.options,
                    e = b.center,
                    c = b.minSize || 80,
                    h, k = null !== b.size;
                k || (null !== e[0] ? h = Math.max(d[2] - Math.max(a[1], a[3]), c) : (h = Math.max(d[2] - a[1] - a[3], c), d[0] += (a[3] - a[1]) / 2), null !== e[1] ? h = Math.max(Math.min(h, d[2] - Math.max(a[0], a[2])), c) : (h = Math.max(Math.min(h, d[2] - a[0] -
                    a[2]), c), d[1] += (a[0] - a[2]) / 2), h < d[2] ? (d[2] = h, d[3] = Math.min(w(b.innerSize || 0, h), h), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : k = !0);
                return k
            });
        h.column && (h.column.prototype.alignDataLabel = function(a, e, b, c, h) {
            var d = this.chart.inverted,
                g = a.series,
                k = a.dlBox || a.shapeArgs,
                l = v(a.below, a.plotY > v(this.translatedThreshold, g.yAxis.len)),
                n = v(b.inside, !!this.options.stacking);
            k && (c = p(k), 0 > c.y && (c.height += c.y, c.y = 0), k = c.y + c.height - g.yAxis.len, 0 < k && (c.height -= k), d && (c = {
                x: g.yAxis.len - c.y - c.height,
                y: g.xAxis.len - c.x - c.width,
                width: c.height,
                height: c.width
            }), n || (d ? (c.x += l ? 0 : c.width, c.width = 0) : (c.y += l ? c.height : 0, c.height = 0)));
            b.align = v(b.align, !d || n ? "center" : l ? "right" : "left");
            b.verticalAlign = v(b.verticalAlign, d || n ? "middle" : l ? "top" : "bottom");
            r.prototype.alignDataLabel.call(this, a, e, b, c, h);
            a.isLabelJustified && a.contrastColor && e.css({
                color: a.contrastColor
            })
        })
    })(I);
    (function(a) {
        var y = a.Chart,
            F = a.isArray,
            G = a.objectEach,
            k = a.pick,
            c = a.addEvent,
            p = a.fireEvent;
        c(y, "render", function() {
            var a = [];
            (this.labelCollectors || []).forEach(function(c) {
                a = a.concat(c())
            });
            (this.yAxis || []).forEach(function(c) {
                c.options.stackLabels && !c.options.stackLabels.allowOverlap && G(c.stacks, function(c) {
                    G(c, function(c) {
                        a.push(c.label)
                    })
                })
            });
            (this.series || []).forEach(function(c) {
                var p = c.options.dataLabels;
                c.visible && (!1 !== p.enabled || c._hasPointLabels) && c.points.forEach(function(c) {
                    c.visible && (F(c.dataLabels) ? c.dataLabels : c.dataLabel ? [c.dataLabel] : []).forEach(function(h) {
                        var e = h.options;
                        h.labelrank = k(e.labelrank, c.labelrank, c.shapeArgs && c.shapeArgs.height);
                        e.allowOverlap || a.push(h)
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        y.prototype.hideOverlappingLabels = function(a) {
            var c = this,
                k = a.length,
                r = c.renderer,
                h, e, l, n, d, g, b = function(a, b, c, d, e, g, h, k) {
                    return !(e > a + c || e + h < a || g > b + d || g + k < b)
                };
            l = function(a) {
                var b, c, d, e = a.box ? 0 : a.padding || 0;
                d = 0;
                if (a && (!a.alignAttr || a.placed)) return b = a.alignAttr || {
                    x: a.attr("x"),
                    y: a.attr("y")
                }, c = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height, d = r.fontMetrics(null, a.element).h), {
                    x: b.x + (c.translateX || 0) + e,
                    y: b.y + (c.translateY ||
                        0) + e - d,
                    width: a.width - 2 * e,
                    height: a.height - 2 * e
                }
            };
            for (e = 0; e < k; e++)
                if (h = a[e]) h.oldOpacity = h.opacity, h.newOpacity = 1, h.absoluteBox = l(h);
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (e = 0; e < k; e++)
                for (g = (l = a[e]) && l.absoluteBox, h = e + 1; h < k; ++h)
                    if (d = (n = a[h]) && n.absoluteBox, g && d && l !== n && 0 !== l.newOpacity && 0 !== n.newOpacity && (d = b(g.x, g.y, g.width, g.height, d.x, d.y, d.width, d.height)))(l.labelrank < n.labelrank ? l : n).newOpacity = 0;
            a.forEach(function(a) {
                var b, d;
                a && (d = a.newOpacity, a.oldOpacity !== d && (a.alignAttr &&
                    a.placed ? (d ? a.show(!0) : b = function() {
                        a.hide()
                    }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), p(c, "afterHideOverlappingLabels")) : a.attr({
                        opacity: d
                    })), a.isOld = !0)
            })
        }
    })(I);
    (function(a) {
        var y = a.addEvent,
            F = a.Chart,
            G = a.createElement,
            k = a.css,
            c = a.defaultOptions,
            p = a.defaultPlotOptions,
            t = a.extend,
            v = a.fireEvent,
            w = a.hasTouch,
            r = a.isObject,
            h = a.Legend,
            e = a.merge,
            l = a.pick,
            n = a.Point,
            d = a.Series,
            g = a.seriesTypes,
            b = a.svg,
            x;
        x = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart,
                    c = b.pointer,
                    d = function(a) {
                        var b = c.getPointFromEvent(a);
                        void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    };
                a.points.forEach(function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (a.trackerGroups.forEach(function(e) {
                        if (a[e]) {
                            a[e].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                                c.onTrackerMouseOut(a)
                            });
                            if (w) a[e].on("touchstart", d);
                            !b.styledMode && a.options.cursor && a[e].css(k).css({
                                cursor: a.options.cursor
                            })
                        }
                    }),
                    a._hasTracking = !0);
                v(this, "afterDrawTracker")
            },
            drawTrackerGraph: function() {
                var a = this,
                    c = a.options,
                    d = c.trackByArea,
                    e = [].concat(d ? a.areaPath : a.graphPath),
                    g = e.length,
                    h = a.chart,
                    k = h.pointer,
                    l = h.renderer,
                    f = h.options.tooltip.snap,
                    n = a.tracker,
                    p, r = function() {
                        if (h.hoverSeries !== a) a.onMouseOver()
                    },
                    t = "rgba(192,192,192," + (b ? .0001 : .002) + ")";
                if (g && !d)
                    for (p = g + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - f, e[p + 2], "L"), (p && "M" === e[p] || p === g) && e.splice(p, 0, "L", e[p - 2] + f, e[p - 1]);
                n ? n.attr({
                    d: e
                }) : a.graph && (a.tracker = l.path(e).attr({
                    visibility: a.visible ?
                        "visible" : "hidden",
                    zIndex: 2
                }).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), h.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: t,
                    fill: d ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * f)
                }), [a.tracker, a.markerGroup].forEach(function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function(a) {
                        k.onTrackerMouseOut(a)
                    });
                    c.cursor && !h.styledMode && a.css({
                        cursor: c.cursor
                    });
                    if (w) a.on("touchstart", r)
                }));
                v(this, "afterDrawTracker")
            }
        };
        g.column &&
            (g.column.prototype.drawTracker = x.drawTrackerPoint);
        g.pie && (g.pie.prototype.drawTracker = x.drawTrackerPoint);
        g.scatter && (g.scatter.prototype.drawTracker = x.drawTrackerPoint);
        t(h.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this,
                    g = d.chart.renderer.boxWrapper,
                    h = "highcharts-legend-" + (a instanceof n ? "point" : "series") + "-active",
                    k = d.chart.styledMode;
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    g.addClass(h);
                    k || b.css(d.options.itemHoverStyle)
                }).on("mouseout", function() {
                    d.styledMode ||
                        b.css(e(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    g.removeClass(h);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    g.removeClass(h);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : v(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = G("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                y(a.checkbox, "click",
                    function(b) {
                        v(a.series || a, "checkboxClick", {
                            checked: b.target.checked,
                            item: a
                        }, function() {
                            a.select()
                        })
                    })
            }
        });
        t(F.prototype, {
            showResetZoom: function() {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    d = c.lang,
                    e = b.options.chart.resetZoomButton,
                    g = e.theme,
                    h = g.states,
                    k = "chart" === e.relativeTo ? null : "plotBox";
                v(this, "beforeShowResetZoom", null, function() {
                    b.resetZoomButton = b.renderer.button(d.resetZoom, null, null, a, g, h && h.hover).attr({
                        align: e.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(e.position,
                        !1, k)
                })
            },
            zoomOut: function() {
                v(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(a) {
                var b, c = this.pointer,
                    d = !1,
                    e;
                !a || a.resetSelection ? (this.axes.forEach(function(a) {
                    b = a.zoom()
                }), c.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function(a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && r(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(l(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                v(this, "pan", {
                    originalEvent: a
                }, function() {
                    d && d.forEach(function(a) {
                        a.setState()
                    });
                    ("xy" === b ? [1, 0] : [1]).forEach(function(b) {
                        b = c[b ? "xAxis" : "yAxis"][0];
                        var d = b.horiz,
                            g = a[d ? "chartX" : "chartY"],
                            d = d ? "mouseDownX" : "mouseDownY",
                            f = c[d],
                            h = (b.pointRange || 0) / 2,
                            k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                            l = b.getExtremes(),
                            m = b.toValue(f - g, !0) + h * k,
                            k = b.toValue(f + b.len - g, !0) - h * k,
                            n = k < m,
                            f = n ? k : m,
                            m = n ? m : k,
                            k = Math.min(l.dataMin, h ? l.min : b.toValue(b.toPixels(l.min) -
                                b.minPixelPadding)),
                            h = Math.max(l.dataMax, h ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                            n = k - f;
                        0 < n && (m += n, f = k);
                        n = m - h;
                        0 < n && (m = h, f -= n);
                        b.series.length && f !== l.min && m !== l.max && (b.setExtremes(f, m, !1, !1, {
                            trigger: "pan"
                        }), e = !0);
                        c[d] = g
                    });
                    e && c.redraw(!1);
                    k(c.container, {
                        cursor: "move"
                    })
                })
            }
        });
        t(n.prototype, {
            select: function(a, b) {
                var c = this,
                    d = c.series,
                    e = d.chart;
                a = l(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[d.data.indexOf(c)] =
                        c.options;
                    c.setState(a && "select");
                    b || e.getSelectedPoints().forEach(function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[d.data.indexOf(a)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                (a.hoverPoints || []).forEach(function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = e(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function(a, c) {
                        y(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX),
                    d = this.plotY,
                    e = this.series,
                    g = e.options.states[a || "normal"] || {},
                    h = p[e.type].marker && e.options.marker,
                    k = h && !1 === h.enabled,
                    f = h && h.states && h.states[a || "normal"] || {},
                    n = !1 === f.enabled,
                    r = e.stateMarkerGraphic,
                    u = this.marker || {},
                    w = e.chart,
                    x = e.halo,
                    y, F = h && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (n || k && !1 === f.enabled) || a && u.states && u.states[a] && !1 === u.states[a].enabled)) {
                    F && (y = e.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), w.styledMode || this.graphic.animate(e.pointAttribs(this, a), l(w.options.chart.animation, g.animation)), y && this.graphic.animate(y, l(w.options.chart.animation,
                        f.animation, h.animation)), r && r.hide();
                    else {
                        if (a && f) {
                            h = u.symbol || e.symbol;
                            r && r.currentSymbol !== h && (r = r.destroy());
                            if (r) r[b ? "animate" : "attr"]({
                                x: y.x,
                                y: y.y
                            });
                            else h && (e.stateMarkerGraphic = r = w.renderer.symbol(h, y.x, y.y, y.width, y.height).add(e.markerGroup), r.currentSymbol = h);
                            !w.styledMode && r && r.attr(e.pointAttribs(this, a))
                        }
                        r && (r[a && w.isInsidePlot(c, d, w.inverted) ? "show" : "hide"](), r.element.point = this)
                    }(c = g.halo) && c.size ? (x || (e.halo = x = w.renderer.path().add((this.graphic || r).parentGroup)), x.show()[b ? "animate" :
                        "attr"]({
                        d: this.haloPath(c.size)
                    }), x.attr({
                        "class": "highcharts-halo highcharts-color-" + l(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), x.point = this, w.styledMode || x.attr(t({
                        fill: this.color || e.color,
                        "fill-opacity": c.opacity
                    }, c.attributes))) : x && x.point && x.point.haloPath && x.animate({
                        d: x.point.haloPath(0)
                    }, null, x.hide);
                    this.state = a;
                    v(this, "afterSetState")
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a,
                    2 * a)
            }
        });
        t(d.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && v(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && v(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var b = this,
                    c = b.options,
                    d = b.graph,
                    e = c.states,
                    g = c.lineWidth,
                    c = 0;
                a = a || "";
                if (b.state !== a && ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function(c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !(b.chart.styledMode || e[a] && !1 === e[a].enabled) && (a && (g = e[a].lineWidth || g + (e[a].lineWidthPlus || 0)), d && !d.dashstyle)))
                    for (g = {
                            "stroke-width": g
                        }, d.animate(g, l(e[a || "normal"] && e[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(g),
                        c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    g, h = d.options.chart.ignoreHiddenSeries,
                    k = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && d.series.forEach(function(a) {
                    a.options.stacking && a.visible &&
                        (a.isDirty = !0)
                });
                c.linkedSeries.forEach(function(b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                v(c, g);
                !1 !== b && d.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                v(this, a ? "select" : "unselect")
            },
            drawTracker: x.drawTrackerGraph
        })
    })(I);
    (function(a) {
        var y = a.Chart,
            F = a.isArray,
            G = a.isObject,
            k = a.pick,
            c = a.splat;
        y.prototype.setResponsive = function(c, k) {
            var p =
                this.options.responsive,
                t = [],
                r = this.currentResponsive;
            !k && p && p.rules && p.rules.forEach(function(h) {
                void 0 === h._id && (h._id = a.uniqueKey());
                this.matchResponsiveRule(h, t, c)
            }, this);
            k = a.merge.apply(0, t.map(function(c) {
                return a.find(p.rules, function(a) {
                    return a._id === c
                }).chartOptions
            }));
            k.isResponsiveOptions = !0;
            t = t.toString() || void 0;
            t !== (r && r.ruleIds) && (r && this.update(r.undoOptions, c), t ? (r = this.currentOptions(k), r.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: t,
                mergedOptions: k,
                undoOptions: r
            }, this.update(k,
                c)) : this.currentResponsive = void 0)
        };
        y.prototype.matchResponsiveRule = function(a, c) {
            var p = a.condition;
            (p.callback || function() {
                return this.chartWidth <= k(p.maxWidth, Number.MAX_VALUE) && this.chartHeight <= k(p.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(p.minWidth, 0) && this.chartHeight >= k(p.minHeight, 0)
            }).call(this) && c.push(a._id)
        };
        y.prototype.currentOptions = function(k) {
            function p(k, r, h, e) {
                var l;
                a.objectEach(k, function(a, d) {
                    if (!e && -1 < ["series", "xAxis", "yAxis"].indexOf(d))
                        for (a = c(a), h[d] = [], l = 0; l < a.length; l++) r[d][l] &&
                            (h[d][l] = {}, p(a[l], r[d][l], h[d][l], e + 1));
                    else G(a) ? (h[d] = F(a) ? [] : {}, p(a, r[d] || {}, h[d], e + 1)) : h[d] = r[d] || null
                })
            }
            var v = {};
            p(k, this.options, v, 0);
            return v
        }
    })(I);
    return I
});
//# sourceMappingURL=highcharts.js.map


! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Chart = t()
    }
}(function() {
    return function t(e, a, i) {
        function n(r, l) {
            if (!a[r]) {
                if (!e[r]) {
                    var s = "function" == typeof require && require;
                    if (!l && s) return s(r, !0);
                    if (o) return o(r, !0);
                    var d = new Error("Cannot find module '" + r + "'");
                    throw d.code = "MODULE_NOT_FOUND", d
                }
                var u = a[r] = {
                    exports: {}
                };
                e[r][0].call(u.exports, function(t) {
                    var a = e[r][1][t];
                    return n(a ? a : t)
                }, u, u.exports, t, e, a, i)
            }
            return a[r].exports
        }
        for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) n(i[r]);
        return n
    }({
        1: [function(t, e, a) {}, {}],
        2: [function(t, e, a) {
            function i(t) {
                if (t) {
                    var e = /^#([a-fA-F0-9]{3})$/,
                        a = /^#([a-fA-F0-9]{6})$/,
                        i = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                        n = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
                        o = /(\w+)/,
                        r = [0, 0, 0],
                        l = 1,
                        s = t.match(e);
                    if (s) {
                        s = s[1];
                        for (var d = 0; d < r.length; d++) r[d] = parseInt(s[d] + s[d], 16)
                    } else if (s = t.match(a)) {
                        s = s[1];
                        for (var d = 0; d < r.length; d++) r[d] = parseInt(s.slice(2 * d, 2 * d + 2), 16)
                    } else if (s = t.match(i)) {
                        for (var d = 0; d < r.length; d++) r[d] = parseInt(s[d + 1]);
                        l = parseFloat(s[4])
                    } else if (s = t.match(n)) {
                        for (var d = 0; d < r.length; d++) r[d] = Math.round(2.55 * parseFloat(s[d + 1]));
                        l = parseFloat(s[4])
                    } else if (s = t.match(o)) {
                        if ("transparent" == s[1]) return [0, 0, 0, 0];
                        if (r = y[s[1]], !r) return
                    }
                    for (var d = 0; d < r.length; d++) r[d] = v(r[d], 0, 255);
                    return l = l || 0 == l ? v(l, 0, 1) : 1, r[3] = l, r
                }
            }

            function n(t) {
                if (t) {
                    var e = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                        a = t.match(e);
                    if (a) {
                        var i = parseFloat(a[4]),
                            n = v(parseInt(a[1]), 0, 360),
                            o = v(parseFloat(a[2]), 0, 100),
                            r = v(parseFloat(a[3]), 0, 100),
                            l = v(isNaN(i) ? 1 : i, 0, 1);
                        return [n, o, r, l]
                    }
                }
            }

            function o(t) {
                if (t) {
                    var e = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
                        a = t.match(e);
                    if (a) {
                        var i = parseFloat(a[4]),
                            n = v(parseInt(a[1]), 0, 360),
                            o = v(parseFloat(a[2]), 0, 100),
                            r = v(parseFloat(a[3]), 0, 100),
                            l = v(isNaN(i) ? 1 : i, 0, 1);
                        return [n, o, r, l]
                    }
                }
            }

            function r(t) {
                var e = i(t);
                return e && e.slice(0, 3)
            }

            function l(t) {
                var e = n(t);
                return e && e.slice(0, 3)
            }

            function s(t) {
                var e = i(t);
                return e ? e[3] : (e = n(t)) ? e[3] : (e = o(t)) ? e[3] : void 0
            }

            function d(t) {
                return "#" + x(t[0]) + x(t[1]) + x(t[2])
            }

            function u(t, e) {
                return 1 > e || t[3] && t[3] < 1 ? c(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
            }

            function c(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
            }

            function h(t, e) {
                if (1 > e || t[3] && t[3] < 1) return f(t, e);
                var a = Math.round(t[0] / 255 * 100),
                    i = Math.round(t[1] / 255 * 100),
                    n = Math.round(t[2] / 255 * 100);
                return "rgb(" + a + "%, " + i + "%, " + n + "%)"
            }

            function f(t, e) {
                var a = Math.round(t[0] / 255 * 100),
                    i = Math.round(t[1] / 255 * 100),
                    n = Math.round(t[2] / 255 * 100);
                return "rgba(" + a + "%, " + i + "%, " + n + "%, " + (e || t[3] || 1) + ")"
            }

            function g(t, e) {
                return 1 > e || t[3] && t[3] < 1 ? p(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
            }

            function p(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
            }

            function m(t, e) {
                return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
            }

            function b(t) {
                return k[t.slice(0, 3)]
            }

            function v(t, e, a) {
                return Math.min(Math.max(e, t), a)
            }

            function x(t) {
                var e = t.toString(16).toUpperCase();
                return e.length < 2 ? "0" + e : e
            }
            var y = t(6);
            e.exports = {
                getRgba: i,
                getHsla: n,
                getRgb: r,
                getHsl: l,
                getHwb: o,
                getAlpha: s,
                hexString: d,
                rgbString: u,
                rgbaString: c,
                percentString: h,
                percentaString: f,
                hslString: g,
                hslaString: p,
                hwbString: m,
                keyword: b
            };
            var k = {};
            for (var S in y) k[y[S]] = S
        }, {
            6: 6
        }],
        3: [function(t, e, a) {
            var i = t(5),
                n = t(2),
                o = function(t) {
                    if (t instanceof o) return t;
                    if (!(this instanceof o)) return new o(t);
                    this.values = {
                        rgb: [0, 0, 0],
                        hsl: [0, 0, 0],
                        hsv: [0, 0, 0],
                        hwb: [0, 0, 0],
                        cmyk: [0, 0, 0, 0],
                        alpha: 1
                    };
                    var e;
                    if ("string" == typeof t)
                        if (e = n.getRgba(t)) this.setValues("rgb", e);
                        else if (e = n.getHsla(t)) this.setValues("hsl", e);
                    else {
                        if (!(e = n.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');
                        this.setValues("hwb", e)
                    } else if ("object" == typeof t)
                        if (e = t, void 0 !== e.r || void 0 !== e.red) this.setValues("rgb", e);
                        else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues("hsl", e);
                    else if (void 0 !== e.v || void 0 !== e.value) this.setValues("hsv", e);
                    else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues("hwb", e);
                    else {
                        if (void 0 === e.c && void 0 === e.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(t));
                        this.setValues("cmyk", e)
                    }
                };
            o.prototype = {
                rgb: function() {
                    return this.setSpace("rgb", arguments)
                },
                hsl: function() {
                    return this.setSpace("hsl", arguments)
                },
                hsv: function() {
                    return this.setSpace("hsv", arguments)
                },
                hwb: function() {
                    return this.setSpace("hwb", arguments)
                },
                cmyk: function() {
                    return this.setSpace("cmyk", arguments)
                },
                rgbArray: function() {
                    return this.values.rgb
                },
                hslArray: function() {
                    return this.values.hsl
                },
                hsvArray: function() {
                    return this.values.hsv
                },
                hwbArray: function() {
                    var t = this.values;
                    return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
                },
                cmykArray: function() {
                    return this.values.cmyk
                },
                rgbaArray: function() {
                    var t = this.values;
                    return t.rgb.concat([t.alpha])
                },
                hslaArray: function() {
                    var t = this.values;
                    return t.hsl.concat([t.alpha])
                },
                alpha: function(t) {
                    return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
                },
                red: function(t) {
                    return this.setChannel("rgb", 0, t)
                },
                green: function(t) {
                    return this.setChannel("rgb", 1, t)
                },
                blue: function(t) {
                    return this.setChannel("rgb", 2, t)
                },
                hue: function(t) {
                    return t && (t %= 360, t = 0 > t ? 360 + t : t), this.setChannel("hsl", 0, t)
                },
                saturation: function(t) {
                    return this.setChannel("hsl", 1, t)
                },
                lightness: function(t) {
                    return this.setChannel("hsl", 2, t)
                },
                saturationv: function(t) {
                    return this.setChannel("hsv", 1, t)
                },
                whiteness: function(t) {
                    return this.setChannel("hwb", 1, t)
                },
                blackness: function(t) {
                    return this.setChannel("hwb", 2, t)
                },
                value: function(t) {
                    return this.setChannel("hsv", 2, t)
                },
                cyan: function(t) {
                    return this.setChannel("cmyk", 0, t)
                },
                magenta: function(t) {
                    return this.setChannel("cmyk", 1, t)
                },
                yellow: function(t) {
                    return this.setChannel("cmyk", 2, t)
                },
                black: function(t) {
                    return this.setChannel("cmyk", 3, t)
                },
                hexString: function() {
                    return n.hexString(this.values.rgb)
                },
                rgbString: function() {
                    return n.rgbString(this.values.rgb, this.values.alpha)
                },
                rgbaString: function() {
                    return n.rgbaString(this.values.rgb, this.values.alpha)
                },
                percentString: function() {
                    return n.percentString(this.values.rgb, this.values.alpha)
                },
                hslString: function() {
                    return n.hslString(this.values.hsl, this.values.alpha)
                },
                hslaString: function() {
                    return n.hslaString(this.values.hsl, this.values.alpha)
                },
                hwbString: function() {
                    return n.hwbString(this.values.hwb, this.values.alpha)
                },
                keyword: function() {
                    return n.keyword(this.values.rgb, this.values.alpha)
                },
                rgbNumber: function() {
                    var t = this.values.rgb;
                    return t[0] << 16 | t[1] << 8 | t[2]
                },
                luminosity: function() {
                    for (var t = this.values.rgb, e = [], a = 0; a < t.length; a++) {
                        var i = t[a] / 255;
                        e[a] = .03928 >= i ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4)
                    }
                    return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
                },
                contrast: function(t) {
                    var e = this.luminosity(),
                        a = t.luminosity();
                    return e > a ? (e + .05) / (a + .05) : (a + .05) / (e + .05)
                },
                level: function(t) {
                    var e = this.contrast(t);
                    return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
                },
                dark: function() {
                    var t = this.values.rgb,
                        e = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3;
                    return 128 > e
                },
                light: function() {
                    return !this.dark()
                },
                negate: function() {
                    for (var t = [], e = 0; 3 > e; e++) t[e] = 255 - this.values.rgb[e];
                    return this.setValues("rgb", t), this
                },
                lighten: function(t) {
                    var e = this.values.hsl;
                    return e[2] += e[2] * t, this.setValues("hsl", e), this
                },
                darken: function(t) {
                    var e = this.values.hsl;
                    return e[2] -= e[2] * t, this.setValues("hsl", e), this
                },
                saturate: function(t) {
                    var e = this.values.hsl;
                    return e[1] += e[1] * t, this.setValues("hsl", e), this
                },
                desaturate: function(t) {
                    var e = this.values.hsl;
                    return e[1] -= e[1] * t, this.setValues("hsl", e), this
                },
                whiten: function(t) {
                    var e = this.values.hwb;
                    return e[1] += e[1] * t, this.setValues("hwb", e), this
                },
                blacken: function(t) {
                    var e = this.values.hwb;
                    return e[2] += e[2] * t, this.setValues("hwb", e), this
                },
                greyscale: function() {
                    var t = this.values.rgb,
                        e = .3 * t[0] + .59 * t[1] + .11 * t[2];
                    return this.setValues("rgb", [e, e, e]), this
                },
                clearer: function(t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e - e * t), this
                },
                opaquer: function(t) {
                    var e = this.values.alpha;
                    return this.setValues("alpha", e + e * t), this
                },
                rotate: function(t) {
                    var e = this.values.hsl,
                        a = (e[0] + t) % 360;
                    return e[0] = 0 > a ? 360 + a : a, this.setValues("hsl", e), this
                },
                mix: function(t, e) {
                    var a = this,
                        i = t,
                        n = void 0 === e ? .5 : e,
                        o = 2 * n - 1,
                        r = a.alpha() - i.alpha(),
                        l = ((o * r === -1 ? o : (o + r) / (1 + o * r)) + 1) / 2,
                        s = 1 - l;
                    return this.rgb(l * a.red() + s * i.red(), l * a.green() + s * i.green(), l * a.blue() + s * i.blue()).alpha(a.alpha() * n + i.alpha() * (1 - n))
                },
                toJSON: function() {
                    return this.rgb()
                },
                clone: function() {
                    var t, e, a = new o,
                        i = this.values,
                        n = a.values;
                    for (var r in i) i.hasOwnProperty(r) && (t = i[r], e = {}.toString.call(t), "[object Array]" === e ? n[r] = t.slice(0) : "[object Number]" === e ? n[r] = t : console.error("unexpected color value:", t));
                    return a
                }
            }, o.prototype.spaces = {
                rgb: ["red", "green", "blue"],
                hsl: ["hue", "saturation", "lightness"],
                hsv: ["hue", "saturation", "value"],
                hwb: ["hue", "whiteness", "blackness"],
                cmyk: ["cyan", "magenta", "yellow", "black"]
            }, o.prototype.maxes = {
                rgb: [255, 255, 255],
                hsl: [360, 100, 100],
                hsv: [360, 100, 100],
                hwb: [360, 100, 100],
                cmyk: [100, 100, 100, 100]
            }, o.prototype.getValues = function(t) {
                for (var e = this.values, a = {}, i = 0; i < t.length; i++) a[t.charAt(i)] = e[t][i];
                return 1 !== e.alpha && (a.a = e.alpha), a
            }, o.prototype.setValues = function(t, e) {
                var a, n = this.values,
                    o = this.spaces,
                    r = this.maxes,
                    l = 1;
                if ("alpha" === t) l = e;
                else if (e.length) n[t] = e.slice(0, t.length), l = e[t.length];
                else if (void 0 !== e[t.charAt(0)]) {
                    for (a = 0; a < t.length; a++) n[t][a] = e[t.charAt(a)];
                    l = e.a
                } else if (void 0 !== e[o[t][0]]) {
                    var s = o[t];
                    for (a = 0; a < t.length; a++) n[t][a] = e[s[a]];
                    l = e.alpha
                }
                if (n.alpha = Math.max(0, Math.min(1, void 0 === l ? n.alpha : l)), "alpha" === t) return !1;
                var d;
                for (a = 0; a < t.length; a++) d = Math.max(0, Math.min(r[t][a], n[t][a])), n[t][a] = Math.round(d);
                for (var u in o) u !== t && (n[u] = i[t][u](n[t]));
                return !0
            }, o.prototype.setSpace = function(t, e) {
                var a = e[0];
                return void 0 === a ? this.getValues(t) : ("number" == typeof a && (a = Array.prototype.slice.call(e)), this.setValues(t, a), this)
            }, o.prototype.setChannel = function(t, e, a) {
                var i = this.values[t];
                return void 0 === a ? i[e] : a === i[e] ? this : (i[e] = a, this.setValues(t, i), this)
            }, "undefined" != typeof window && (window.Color = o), e.exports = o
        }, {
            2: 2,
            5: 5
        }],
        4: [function(t, e, a) {
            function i(t) {
                var e, a, i, n = t[0] / 255,
                    o = t[1] / 255,
                    r = t[2] / 255,
                    l = Math.min(n, o, r),
                    s = Math.max(n, o, r),
                    d = s - l;
                return s == l ? e = 0 : n == s ? e = (o - r) / d : o == s ? e = 2 + (r - n) / d : r == s && (e = 4 + (n - o) / d), e = Math.min(60 * e, 360), 0 > e && (e += 360), i = (l + s) / 2, a = s == l ? 0 : .5 >= i ? d / (s + l) : d / (2 - s - l), [e, 100 * a, 100 * i]
            }

            function n(t) {
                var e, a, i, n = t[0],
                    o = t[1],
                    r = t[2],
                    l = Math.min(n, o, r),
                    s = Math.max(n, o, r),
                    d = s - l;
                return a = 0 == s ? 0 : d / s * 1e3 / 10, s == l ? e = 0 : n == s ? e = (o - r) / d : o == s ? e = 2 + (r - n) / d : r == s && (e = 4 + (n - o) / d), e = Math.min(60 * e, 360), 0 > e && (e += 360), i = s / 255 * 1e3 / 10, [e, a, i]
            }

            function o(t) {
                var e = t[0],
                    a = t[1],
                    n = t[2],
                    o = i(t)[0],
                    r = 1 / 255 * Math.min(e, Math.min(a, n)),
                    n = 1 - 1 / 255 * Math.max(e, Math.max(a, n));
                return [o, 100 * r, 100 * n]
            }

            function l(t) {
                var e, a, i, n, o = t[0] / 255,
                    r = t[1] / 255,
                    l = t[2] / 255;
                return n = Math.min(1 - o, 1 - r, 1 - l), e = (1 - o - n) / (1 - n) || 0, a = (1 - r - n) / (1 - n) || 0, i = (1 - l - n) / (1 - n) || 0, [100 * e, 100 * a, 100 * i, 100 * n]
            }

            function s(t) {
                return Q[JSON.stringify(t)]
            }

            function d(t) {
                var e = t[0] / 255,
                    a = t[1] / 255,
                    i = t[2] / 255;
                e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92, a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92, i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92;
                var n = .4124 * e + .3576 * a + .1805 * i,
                    o = .2126 * e + .7152 * a + .0722 * i,
                    r = .0193 * e + .1192 * a + .9505 * i;
                return [100 * n, 100 * o, 100 * r]
            }

            function u(t) {
                var e, a, i, n = d(t),
                    o = n[0],
                    r = n[1],
                    l = n[2];
                return o /= 95.047, r /= 100, l /= 108.883, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, l = l > .008856 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, e = 116 * r - 16, a = 500 * (o - r), i = 200 * (r - l), [e, a, i]
            }

            function c(t) {
                return W(u(t))
            }

            function h(t) {
                var e, a, i, n, o, r = t[0] / 360,
                    l = t[1] / 100,
                    s = t[2] / 100;
                if (0 == l) return o = 255 * s, [o, o, o];
                a = .5 > s ? s * (1 + l) : s + l - s * l, e = 2 * s - a, n = [0, 0, 0];
                for (var d = 0; 3 > d; d++) i = r + 1 / 3 * -(d - 1), 0 > i && i++, i > 1 && i--, o = 1 > 6 * i ? e + 6 * (a - e) * i : 1 > 2 * i ? a : 2 > 3 * i ? e + (a - e) * (2 / 3 - i) * 6 : e, n[d] = 255 * o;
                return n
            }

            function f(t) {
                var e, a, i = t[0],
                    n = t[1] / 100,
                    o = t[2] / 100;
                return 0 === o ? [0, 0, 0] : (o *= 2, n *= 1 >= o ? o : 2 - o, a = (o + n) / 2, e = 2 * n / (o + n), [i, 100 * e, 100 * a])
            }

            function p(t) {
                return o(h(t))
            }

            function m(t) {
                return l(h(t))
            }

            function v(t) {
                return s(h(t))
            }

            function x(t) {
                var e = t[0] / 60,
                    a = t[1] / 100,
                    i = t[2] / 100,
                    n = Math.floor(e) % 6,
                    o = e - Math.floor(e),
                    r = 255 * i * (1 - a),
                    l = 255 * i * (1 - a * o),
                    s = 255 * i * (1 - a * (1 - o)),
                    i = 255 * i;
                switch (n) {
                    case 0:
                        return [i, s, r];
                    case 1:
                        return [l, i, r];
                    case 2:
                        return [r, i, s];
                    case 3:
                        return [r, l, i];
                    case 4:
                        return [s, r, i];
                    case 5:
                        return [i, r, l]
                }
            }

            function y(t) {
                var e, a, i = t[0],
                    n = t[1] / 100,
                    o = t[2] / 100;
                return a = (2 - n) * o, e = n * o, e /= 1 >= a ? a : 2 - a, e = e || 0, a /= 2, [i, 100 * e, 100 * a]
            }

            function k(t) {
                return o(x(t))
            }

            function S(t) {
                return l(x(t))
            }

            function w(t) {
                return s(x(t))
            }

            function C(t) {
                var e, a, i, n, o = t[0] / 360,
                    l = t[1] / 100,
                    s = t[2] / 100,
                    d = l + s;
                switch (d > 1 && (l /= d, s /= d), e = Math.floor(6 * o), a = 1 - s, i = 6 * o - e, 0 != (1 & e) && (i = 1 - i), n = l + i * (a - l), e) {
                    default:
                    case 6:
                    case 0:
                        r = a, g = n, b = l;
                        break;
                    case 1:
                        r = n, g = a, b = l;
                        break;
                    case 2:
                        r = l, g = a, b = n;
                        break;
                    case 3:
                        r = l, g = n, b = a;
                        break;
                    case 4:
                        r = n, g = l, b = a;
                        break;
                    case 5:
                        r = a, g = l, b = n
                }
                return [255 * r, 255 * g, 255 * b]
            }

            function M(t) {
                return i(C(t))
            }

            function D(t) {
                return n(C(t))
            }

            function A(t) {
                return l(C(t))
            }

            function I(t) {
                return s(C(t))
            }

            function F(t) {
                var e, a, i, n = t[0] / 100,
                    o = t[1] / 100,
                    r = t[2] / 100,
                    l = t[3] / 100;
                return e = 1 - Math.min(1, n * (1 - l) + l), a = 1 - Math.min(1, o * (1 - l) + l), i = 1 - Math.min(1, r * (1 - l) + l), [255 * e, 255 * a, 255 * i]
            }

            function T(t) {
                return i(F(t))
            }

            function P(t) {
                return n(F(t))
            }

            function _(t) {
                return o(F(t))
            }

            function R(t) {
                return s(F(t))
            }

            function V(t) {
                var e, a, i, n = t[0] / 100,
                    o = t[1] / 100,
                    r = t[2] / 100;
                return e = 3.2406 * n + -1.5372 * o + r * -.4986, a = n * -.9689 + 1.8758 * o + .0415 * r, i = .0557 * n + o * -.204 + 1.057 * r, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e = 12.92 * e, a = a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : a = 12.92 * a, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i = 12.92 * i, e = Math.min(Math.max(0, e), 1), a = Math.min(Math.max(0, a), 1), i = Math.min(Math.max(0, i), 1), [255 * e, 255 * a, 255 * i]
            }

            function O(t) {
                var e, a, i, n = t[0],
                    o = t[1],
                    r = t[2];
                return n /= 95.047, o /= 100, r /= 108.883, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, e = 116 * o - 16, a = 500 * (n - o), i = 200 * (o - r), [e, a, i]
            }

            function L(t) {
                return W(O(t))
            }

            function B(t) {
                var e, a, i, n, o = t[0],
                    r = t[1],
                    l = t[2];
                return 8 >= o ? (a = 100 * o / 903.3, n = 7.787 * (a / 100) + 16 / 116) : (a = 100 * Math.pow((o + 16) / 116, 3), n = Math.pow(a / 100, 1 / 3)), e = .008856 >= e / 95.047 ? e = 95.047 * (r / 500 + n - 16 / 116) / 7.787 : 95.047 * Math.pow(r / 500 + n, 3), i = .008859 >= i / 108.883 ? i = 108.883 * (n - l / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(n - l / 200, 3), [e, a, i]
            }

            function W(t) {
                var e, a, i, n = t[0],
                    o = t[1],
                    r = t[2];
                return e = Math.atan2(r, o), a = 360 * e / 2 / Math.PI, 0 > a && (a += 360), i = Math.sqrt(o * o + r * r), [n, i, a]
            }

            function z(t) {
                return V(B(t))
            }

            function H(t) {
                var e, a, i, n = t[0],
                    o = t[1],
                    r = t[2];
                return i = r / 360 * 2 * Math.PI, e = o * Math.cos(i), a = o * Math.sin(i), [n, e, a]
            }

            function N(t) {
                return B(H(t))
            }

            function E(t) {
                return z(H(t))
            }

            function U(t) {
                return G[t]
            }

            function q(t) {
                return i(U(t))
            }

            function j(t) {
                return n(U(t))
            }

            function Y(t) {
                return o(U(t))
            }

            function J(t) {
                return l(U(t))
            }

            function X(t) {
                return u(U(t))
            }

            function Z(t) {
                return d(U(t))
            }
            e.exports = {
                rgb2hsl: i,
                rgb2hsv: n,
                rgb2hwb: o,
                rgb2cmyk: l,
                rgb2keyword: s,
                rgb2xyz: d,
                rgb2lab: u,
                rgb2lch: c,
                hsl2rgb: h,
                hsl2hsv: f,
                hsl2hwb: p,
                hsl2cmyk: m,
                hsl2keyword: v,
                hsv2rgb: x,
                hsv2hsl: y,
                hsv2hwb: k,
                hsv2cmyk: S,
                hsv2keyword: w,
                hwb2rgb: C,
                hwb2hsl: M,
                hwb2hsv: D,
                hwb2cmyk: A,
                hwb2keyword: I,
                cmyk2rgb: F,
                cmyk2hsl: T,
                cmyk2hsv: P,
                cmyk2hwb: _,
                cmyk2keyword: R,
                keyword2rgb: U,
                keyword2hsl: q,
                keyword2hsv: j,
                keyword2hwb: Y,
                keyword2cmyk: J,
                keyword2lab: X,
                keyword2xyz: Z,
                xyz2rgb: V,
                xyz2lab: O,
                xyz2lch: L,
                lab2xyz: B,
                lab2rgb: z,
                lab2lch: W,
                lch2lab: H,
                lch2xyz: N,
                lch2rgb: E
            };
            var G = {
                    aliceblue: [240, 248, 255],
                    antiquewhite: [250, 235, 215],
                    aqua: [0, 255, 255],
                    aquamarine: [127, 255, 212],
                    azure: [240, 255, 255],
                    beige: [245, 245, 220],
                    bisque: [255, 228, 196],
                    black: [0, 0, 0],
                    blanchedalmond: [255, 235, 205],
                    blue: [0, 0, 255],
                    blueviolet: [138, 43, 226],
                    brown: [165, 42, 42],
                    burlywood: [222, 184, 135],
                    cadetblue: [95, 158, 160],
                    chartreuse: [127, 255, 0],
                    chocolate: [210, 105, 30],
                    coral: [255, 127, 80],
                    cornflowerblue: [100, 149, 237],
                    cornsilk: [255, 248, 220],
                    crimson: [220, 20, 60],
                    cyan: [0, 255, 255],
                    darkblue: [0, 0, 139],
                    darkcyan: [0, 139, 139],
                    darkgoldenrod: [184, 134, 11],
                    darkgray: [169, 169, 169],
                    darkgreen: [0, 100, 0],
                    darkgrey: [169, 169, 169],
                    darkkhaki: [189, 183, 107],
                    darkmagenta: [139, 0, 139],
                    darkolivegreen: [85, 107, 47],
                    darkorange: [255, 140, 0],
                    darkorchid: [153, 50, 204],
                    darkred: [139, 0, 0],
                    darksalmon: [233, 150, 122],
                    darkseagreen: [143, 188, 143],
                    darkslateblue: [72, 61, 139],
                    darkslategray: [47, 79, 79],
                    darkslategrey: [47, 79, 79],
                    darkturquoise: [0, 206, 209],
                    darkviolet: [148, 0, 211],
                    deeppink: [255, 20, 147],
                    deepskyblue: [0, 191, 255],
                    dimgray: [105, 105, 105],
                    dimgrey: [105, 105, 105],
                    dodgerblue: [30, 144, 255],
                    firebrick: [178, 34, 34],
                    floralwhite: [255, 250, 240],
                    forestgreen: [34, 139, 34],
                    fuchsia: [255, 0, 255],
                    gainsboro: [220, 220, 220],
                    ghostwhite: [248, 248, 255],
                    gold: [255, 215, 0],
                    goldenrod: [218, 165, 32],
                    gray: [128, 128, 128],
                    green: [0, 128, 0],
                    greenyellow: [173, 255, 47],
                    grey: [128, 128, 128],
                    honeydew: [240, 255, 240],
                    hotpink: [255, 105, 180],
                    indianred: [205, 92, 92],
                    indigo: [75, 0, 130],
                    ivory: [255, 255, 240],
                    khaki: [240, 230, 140],
                    lavender: [230, 230, 250],
                    lavenderblush: [255, 240, 245],
                    lawngreen: [124, 252, 0],
                    lemonchiffon: [255, 250, 205],
                    lightblue: [173, 216, 230],
                    lightcoral: [240, 128, 128],
                    lightcyan: [224, 255, 255],
                    lightgoldenrodyellow: [250, 250, 210],
                    lightgray: [211, 211, 211],
                    lightgreen: [144, 238, 144],
                    lightgrey: [211, 211, 211],
                    lightpink: [255, 182, 193],
                    lightsalmon: [255, 160, 122],
                    lightseagreen: [32, 178, 170],
                    lightskyblue: [135, 206, 250],
                    lightslategray: [119, 136, 153],
                    lightslategrey: [119, 136, 153],
                    lightsteelblue: [176, 196, 222],
                    lightyellow: [255, 255, 224],
                    lime: [0, 255, 0],
                    limegreen: [50, 205, 50],
                    linen: [250, 240, 230],
                    magenta: [255, 0, 255],
                    maroon: [128, 0, 0],
                    mediumaquamarine: [102, 205, 170],
                    mediumblue: [0, 0, 205],
                    mediumorchid: [186, 85, 211],
                    mediumpurple: [147, 112, 219],
                    mediumseagreen: [60, 179, 113],
                    mediumslateblue: [123, 104, 238],
                    mediumspringgreen: [0, 250, 154],
                    mediumturquoise: [72, 209, 204],
                    mediumvioletred: [199, 21, 133],
                    midnightblue: [25, 25, 112],
                    mintcream: [245, 255, 250],
                    mistyrose: [255, 228, 225],
                    moccasin: [255, 228, 181],
                    navajowhite: [255, 222, 173],
                    navy: [0, 0, 128],
                    oldlace: [253, 245, 230],
                    olive: [128, 128, 0],
                    olivedrab: [107, 142, 35],
                    orange: [255, 165, 0],
                    orangered: [255, 69, 0],
                    orchid: [218, 112, 214],
                    palegoldenrod: [238, 232, 170],
                    palegreen: [152, 251, 152],
                    paleturquoise: [175, 238, 238],
                    palevioletred: [219, 112, 147],
                    papayawhip: [255, 239, 213],
                    peachpuff: [255, 218, 185],
                    peru: [205, 133, 63],
                    pink: [255, 192, 203],
                    plum: [221, 160, 221],
                    powderblue: [176, 224, 230],
                    purple: [128, 0, 128],
                    rebeccapurple: [102, 51, 153],
                    red: [255, 0, 0],
                    rosybrown: [188, 143, 143],
                    royalblue: [65, 105, 225],
                    saddlebrown: [139, 69, 19],
                    salmon: [250, 128, 114],
                    sandybrown: [244, 164, 96],
                    seagreen: [46, 139, 87],
                    seashell: [255, 245, 238],
                    sienna: [160, 82, 45],
                    silver: [192, 192, 192],
                    skyblue: [135, 206, 235],
                    slateblue: [106, 90, 205],
                    slategray: [112, 128, 144],
                    slategrey: [112, 128, 144],
                    snow: [255, 250, 250],
                    springgreen: [0, 255, 127],
                    steelblue: [70, 130, 180],
                    tan: [210, 180, 140],
                    teal: [0, 128, 128],
                    thistle: [216, 191, 216],
                    tomato: [255, 99, 71],
                    turquoise: [64, 224, 208],
                    violet: [238, 130, 238],
                    wheat: [245, 222, 179],
                    white: [255, 255, 255],
                    whitesmoke: [245, 245, 245],
                    yellow: [255, 255, 0],
                    yellowgreen: [154, 205, 50]
                },
                Q = {};
            for (var $ in G) Q[JSON.stringify(G[$])] = $
        }, {}],
        5: [function(t, e, a) {
            var i = t(4),
                n = function() {
                    return new d
                };
            for (var o in i) {
                n[o + "Raw"] = function(t) {
                    return function(e) {
                        return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), i[t](e)
                    }
                }(o);
                var r = /(\w+)2(\w+)/.exec(o),
                    l = r[1],
                    s = r[2];
                n[l] = n[l] || {}, n[l][s] = n[o] = function(t) {
                    return function(e) {
                        "number" == typeof e && (e = Array.prototype.slice.call(arguments));
                        var a = i[t](e);
                        if ("string" == typeof a || void 0 === a) return a;
                        for (var n = 0; n < a.length; n++) a[n] = Math.round(a[n]);
                        return a
                    }
                }(o)
            }
            var d = function() {
                this.convs = {}
            };
            d.prototype.routeSpace = function(t, e) {
                var a = e[0];
                return void 0 === a ? this.getValues(t) : ("number" == typeof a && (a = Array.prototype.slice.call(e)), this.setValues(t, a))
            }, d.prototype.setValues = function(t, e) {
                return this.space = t, this.convs = {}, this.convs[t] = e, this
            }, d.prototype.getValues = function(t) {
                var e = this.convs[t];
                if (!e) {
                    var a = this.space,
                        i = this.convs[a];
                    e = n[a][t](i), this.convs[t] = e
                }
                return e
            }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(t) {
                d.prototype[t] = function(e) {
                    return this.routeSpace(t, arguments)
                }
            }), e.exports = n
        }, {
            4: 4
        }],
        6: [function(t, e, a) {
            e.exports = {
                aliceblue: [240, 248, 255],
                antiquewhite: [250, 235, 215],
                aqua: [0, 255, 255],
                aquamarine: [127, 255, 212],
                azure: [240, 255, 255],
                beige: [245, 245, 220],
                bisque: [255, 228, 196],
                black: [0, 0, 0],
                blanchedalmond: [255, 235, 205],
                blue: [0, 0, 255],
                blueviolet: [138, 43, 226],
                brown: [165, 42, 42],
                burlywood: [222, 184, 135],
                cadetblue: [95, 158, 160],
                chartreuse: [127, 255, 0],
                chocolate: [210, 105, 30],
                coral: [255, 127, 80],
                cornflowerblue: [100, 149, 237],
                cornsilk: [255, 248, 220],
                crimson: [220, 20, 60],
                cyan: [0, 255, 255],
                darkblue: [0, 0, 139],
                darkcyan: [0, 139, 139],
                darkgoldenrod: [184, 134, 11],
                darkgray: [169, 169, 169],
                darkgreen: [0, 100, 0],
                darkgrey: [169, 169, 169],
                darkkhaki: [189, 183, 107],
                darkmagenta: [139, 0, 139],
                darkolivegreen: [85, 107, 47],
                darkorange: [255, 140, 0],
                darkorchid: [153, 50, 204],
                darkred: [139, 0, 0],
                darksalmon: [233, 150, 122],
                darkseagreen: [143, 188, 143],
                darkslateblue: [72, 61, 139],
                darkslategray: [47, 79, 79],
                darkslategrey: [47, 79, 79],
                darkturquoise: [0, 206, 209],
                darkviolet: [148, 0, 211],
                deeppink: [255, 20, 147],
                deepskyblue: [0, 191, 255],
                dimgray: [105, 105, 105],
                dimgrey: [105, 105, 105],
                dodgerblue: [30, 144, 255],
                firebrick: [178, 34, 34],
                floralwhite: [255, 250, 240],
                forestgreen: [34, 139, 34],
                fuchsia: [255, 0, 255],
                gainsboro: [220, 220, 220],
                ghostwhite: [248, 248, 255],
                gold: [255, 215, 0],
                goldenrod: [218, 165, 32],
                gray: [128, 128, 128],
                green: [0, 128, 0],
                greenyellow: [173, 255, 47],
                grey: [128, 128, 128],
                honeydew: [240, 255, 240],
                hotpink: [255, 105, 180],
                indianred: [205, 92, 92],
                indigo: [75, 0, 130],
                ivory: [255, 255, 240],
                khaki: [240, 230, 140],
                lavender: [230, 230, 250],
                lavenderblush: [255, 240, 245],
                lawngreen: [124, 252, 0],
                lemonchiffon: [255, 250, 205],
                lightblue: [173, 216, 230],
                lightcoral: [240, 128, 128],
                lightcyan: [224, 255, 255],
                lightgoldenrodyellow: [250, 250, 210],
                lightgray: [211, 211, 211],
                lightgreen: [144, 238, 144],
                lightgrey: [211, 211, 211],
                lightpink: [255, 182, 193],
                lightsalmon: [255, 160, 122],
                lightseagreen: [32, 178, 170],
                lightskyblue: [135, 206, 250],
                lightslategray: [119, 136, 153],
                lightslategrey: [119, 136, 153],
                lightsteelblue: [176, 196, 222],
                lightyellow: [255, 255, 224],
                lime: [0, 255, 0],
                limegreen: [50, 205, 50],
                linen: [250, 240, 230],
                magenta: [255, 0, 255],
                maroon: [128, 0, 0],
                mediumaquamarine: [102, 205, 170],
                mediumblue: [0, 0, 205],
                mediumorchid: [186, 85, 211],
                mediumpurple: [147, 112, 219],
                mediumseagreen: [60, 179, 113],
                mediumslateblue: [123, 104, 238],
                mediumspringgreen: [0, 250, 154],
                mediumturquoise: [72, 209, 204],
                mediumvioletred: [199, 21, 133],
                midnightblue: [25, 25, 112],
                mintcream: [245, 255, 250],
                mistyrose: [255, 228, 225],
                moccasin: [255, 228, 181],
                navajowhite: [255, 222, 173],
                navy: [0, 0, 128],
                oldlace: [253, 245, 230],
                olive: [128, 128, 0],
                olivedrab: [107, 142, 35],
                orange: [255, 165, 0],
                orangered: [255, 69, 0],
                orchid: [218, 112, 214],
                palegoldenrod: [238, 232, 170],
                palegreen: [152, 251, 152],
                paleturquoise: [175, 238, 238],
                palevioletred: [219, 112, 147],
                papayawhip: [255, 239, 213],
                peachpuff: [255, 218, 185],
                peru: [205, 133, 63],
                pink: [255, 192, 203],
                plum: [221, 160, 221],
                powderblue: [176, 224, 230],
                purple: [128, 0, 128],
                rebeccapurple: [102, 51, 153],
                red: [255, 0, 0],
                rosybrown: [188, 143, 143],
                royalblue: [65, 105, 225],
                saddlebrown: [139, 69, 19],
                salmon: [250, 128, 114],
                sandybrown: [244, 164, 96],
                seagreen: [46, 139, 87],
                seashell: [255, 245, 238],
                sienna: [160, 82, 45],
                silver: [192, 192, 192],
                skyblue: [135, 206, 235],
                slateblue: [106, 90, 205],
                slategray: [112, 128, 144],
                slategrey: [112, 128, 144],
                snow: [255, 250, 250],
                springgreen: [0, 255, 127],
                steelblue: [70, 130, 180],
                tan: [210, 180, 140],
                teal: [0, 128, 128],
                thistle: [216, 191, 216],
                tomato: [255, 99, 71],
                turquoise: [64, 224, 208],
                violet: [238, 130, 238],
                wheat: [245, 222, 179],
                white: [255, 255, 255],
                whitesmoke: [245, 245, 245],
                yellow: [255, 255, 0],
                yellowgreen: [154, 205, 50]
            }
        }, {}],
        7: [function(t, e, a) {
            var i = t(26)();
            t(25)(i), t(24)(i), t(21)(i), t(22)(i), t(23)(i), t(27)(i), t(31)(i), t(29)(i), t(30)(i), t(32)(i), t(28)(i), t(33)(i), t(34)(i), t(35)(i), t(36)(i), t(37)(i), t(40)(i), t(38)(i), t(39)(i), t(41)(i), t(42)(i), t(43)(i), t(15)(i), t(16)(i), t(17)(i), t(18)(i), t(19)(i), t(20)(i), t(8)(i), t(9)(i), t(10)(i), t(11)(i), t(12)(i), t(13)(i), t(14)(i), window.Chart = e.exports = i
        }, {
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            16: 16,
            17: 17,
            18: 18,
            19: 19,
            20: 20,
            21: 21,
            22: 22,
            23: 23,
            24: 24,
            25: 25,
            26: 26,
            27: 27,
            28: 28,
            29: 29,
            30: 30,
            31: 31,
            32: 32,
            33: 33,
            34: 34,
            35: 35,
            36: 36,
            37: 37,
            38: 38,
            39: 39,
            40: 40,
            41: 41,
            42: 42,
            43: 43,
            8: 8,
            9: 9
        }],
        8: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                t.Bar = function(e, a) {
                    return a.type = "bar", new t(e, a)
                }
            }
        }, {}],
        9: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                t.Bubble = function(e, a) {
                    return a.type = "bubble", new t(e, a)
                }
            }
        }, {}],
        10: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                t.Doughnut = function(e, a) {
                    return a.type = "doughnut", new t(e, a)
                }
            }
        }, {}],
        11: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                t.Line = function(e, a) {
                    return a.type = "line", new t(e, a)
                }
            }
        }, {}],
        12: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                t.PolarArea = function(e, a) {
                    return a.type = "polarArea", new t(e, a)
                }
            }
        }, {}],
        13: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                t.Radar = function(e, a) {
                    return a.options = t.helpers.configMerge({
                        aspectRatio: 1
                    }, a.options), a.type = "radar", new t(e, a)
                }
            }
        }, {}],
        14: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = {
                    hover: {
                        mode: "single"
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom",
                            id: "x-axis-1"
                        }],
                        yAxes: [{
                            type: "linear",
                            position: "left",
                            id: "y-axis-1"
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            title: function(t, e) {
                                return ""
                            },
                            label: function(t, e) {
                                return "(" + t.xLabel + ", " + t.yLabel + ")"
                            }
                        }
                    }
                };
                t.defaults.scatter = e, t.controllers.scatter = t.controllers.line, t.Scatter = function(e, a) {
                    return a.type = "scatter", new t(e, a)
                }
            }
        }, {}],
        15: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.bar = {
                    hover: {
                        mode: "label"
                    },
                    scales: {
                        xAxes: [{
                            type: "category",
                            categoryPercentage: .8,
                            barPercentage: .9,
                            gridLines: {
                                offsetGridLines: !0
                            }
                        }],
                        yAxes: [{
                            type: "linear"
                        }]
                    }
                }, t.controllers.bar = t.DatasetController.extend({
                    dataElementType: t.elements.Rectangle,
                    initialize: function(e, a) {
                        t.DatasetController.prototype.initialize.call(this, e, a), this.getMeta().bar = !0
                    },
                    getBarCount: function() {
                        var t = this,
                            a = 0;
                        return e.each(t.chart.data.datasets, function(e, i) {
                            var n = t.chart.getDatasetMeta(i);
                            n.bar && t.chart.isDatasetVisible(i) && ++a
                        }, t), a
                    },
                    update: function(t) {
                        var a = this;
                        e.each(a.getMeta().data, function(e, i) {
                            a.updateElement(e, i, t)
                        }, a)
                    },
                    updateElement: function(t, a, i) {
                        var n = this,
                            o = n.getMeta(),
                            r = n.getScaleForId(o.xAxisID),
                            l = n.getScaleForId(o.yAxisID),
                            s = l.getBasePixel(),
                            d = n.chart.options.elements.rectangle,
                            u = t.custom || {},
                            c = n.getDataset();
                        e.extend(t, {
                            _xScale: r,
                            _yScale: l,
                            _datasetIndex: n.index,
                            _index: a,
                            _model: {
                                x: n.calculateBarX(a, n.index),
                                y: i ? s : n.calculateBarY(a, n.index),
                                label: n.chart.data.labels[a],
                                datasetLabel: c.label,
                                base: i ? s : n.calculateBarBase(n.index, a),
                                width: n.calculateBarWidth(a),
                                backgroundColor: u.backgroundColor ? u.backgroundColor : e.getValueAtIndexOrDefault(c.backgroundColor, a, d.backgroundColor),
                                borderSkipped: u.borderSkipped ? u.borderSkipped : d.borderSkipped,
                                borderColor: u.borderColor ? u.borderColor : e.getValueAtIndexOrDefault(c.borderColor, a, d.borderColor),
                                borderWidth: u.borderWidth ? u.borderWidth : e.getValueAtIndexOrDefault(c.borderWidth, a, d.borderWidth)
                            }
                        }), t.pivot()
                    },
                    calculateBarBase: function(t, e) {
                        var a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.yAxisID),
                            o = 0;
                        if (n.options.stacked) {
                            var r = a.chart,
                                l = r.data.datasets,
                                s = l[t].data[e];
                            if (0 > s)
                                for (var d = 0; t > d; d++) {
                                    var u = l[d],
                                        c = r.getDatasetMeta(d);
                                    c.bar && c.yAxisID === n.id && r.isDatasetVisible(d) && (o += u.data[e] < 0 ? u.data[e] : 0)
                                } else
                                    for (var h = 0; t > h; h++) {
                                        var f = l[h],
                                            g = r.getDatasetMeta(h);
                                        g.bar && g.yAxisID === n.id && r.isDatasetVisible(h) && (o += f.data[e] > 0 ? f.data[e] : 0)
                                    }
                            return n.getPixelForValue(o)
                        }
                        return n.getBasePixel()
                    },
                    getRuler: function(t) {
                        var e, a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.xAxisID),
                            o = a.getBarCount();
                        e = "category" === n.options.type ? n.getPixelForTick(t + 1) - n.getPixelForTick(t) : n.width / n.ticks.length;
                        var r = e * n.options.categoryPercentage,
                            l = (e - e * n.options.categoryPercentage) / 2,
                            s = r / o;
                        if (n.ticks.length !== a.chart.data.labels.length) {
                            var d = n.ticks.length / a.chart.data.labels.length;
                            s *= d
                        }
                        var u = s * n.options.barPercentage,
                            c = s - s * n.options.barPercentage;
                        return {
                            datasetCount: o,
                            tickWidth: e,
                            categoryWidth: r,
                            categorySpacing: l,
                            fullBarWidth: s,
                            barWidth: u,
                            barSpacing: c
                        }
                    },
                    calculateBarWidth: function(t) {
                        var e = this.getScaleForId(this.getMeta().xAxisID),
                            a = this.getRuler(t);
                        return e.options.stacked ? a.categoryWidth : a.barWidth
                    },
                    getBarIndex: function(t) {
                        var e, a, i = 0;
                        for (a = 0; t > a; ++a) e = this.chart.getDatasetMeta(a), e.bar && this.chart.isDatasetVisible(a) && ++i;
                        return i
                    },
                    calculateBarX: function(t, e) {
                        var a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.xAxisID),
                            o = a.getBarIndex(e),
                            r = a.getRuler(t),
                            l = n.getPixelForValue(null, t, e, a.chart.isCombo);
                        return l -= a.chart.isCombo ? r.tickWidth / 2 : 0, n.options.stacked ? l + r.categoryWidth / 2 + r.categorySpacing : l + r.barWidth / 2 + r.categorySpacing + r.barWidth * o + r.barSpacing / 2 + r.barSpacing * o
                    },
                    calculateBarY: function(t, e) {
                        var a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.yAxisID),
                            o = a.getDataset().data[t];
                        if (n.options.stacked) {
                            for (var r = 0, l = 0, s = 0; e > s; s++) {
                                var d = a.chart.data.datasets[s],
                                    u = a.chart.getDatasetMeta(s);
                                u.bar && u.yAxisID === n.id && a.chart.isDatasetVisible(s) && (d.data[t] < 0 ? l += d.data[t] || 0 : r += d.data[t] || 0)
                            }
                            return 0 > o ? n.getPixelForValue(l + o) : n.getPixelForValue(r + o)
                        }
                        return n.getPixelForValue(o)
                    },
                    draw: function(t) {
                        var a = this,
                            i = t || 1;
                        e.each(a.getMeta().data, function(t, e) {
                            var n = a.getDataset().data[e];
                            null === n || void 0 === n || isNaN(n) || t.transition(i).draw()
                        }, a)
                    },
                    setHoverStyle: function(t) {
                        var a = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = t._model;
                        o.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : e.getValueAtIndexOrDefault(a.hoverBackgroundColor, i, e.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor ? n.hoverBorderColor : e.getValueAtIndexOrDefault(a.hoverBorderColor, i, e.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : e.getValueAtIndexOrDefault(a.hoverBorderWidth, i, o.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var a = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = t._model,
                            r = this.chart.options.elements.rectangle;
                        o.backgroundColor = n.backgroundColor ? n.backgroundColor : e.getValueAtIndexOrDefault(a.backgroundColor, i, r.backgroundColor), o.borderColor = n.borderColor ? n.borderColor : e.getValueAtIndexOrDefault(a.borderColor, i, r.borderColor), o.borderWidth = n.borderWidth ? n.borderWidth : e.getValueAtIndexOrDefault(a.borderWidth, i, r.borderWidth)
                    }
                }), t.defaults.horizontalBar = {
                    hover: {
                        mode: "label"
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom"
                        }],
                        yAxes: [{
                            position: "left",
                            type: "category",
                            categoryPercentage: .8,
                            barPercentage: .9,
                            gridLines: {
                                offsetGridLines: !0
                            }
                        }]
                    },
                    elements: {
                        rectangle: {
                            borderSkipped: "left"
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function(t, e) {
                                var a = "";
                                return t.length > 0 && (t[0].yLabel ? a = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (a = e.labels[t[0].index])), a
                            },
                            label: function(t, e) {
                                var a = e.datasets[t.datasetIndex].label || "";
                                return a + ": " + t.xLabel
                            }
                        }
                    }
                }, t.controllers.horizontalBar = t.controllers.bar.extend({
                    updateElement: function(t, a, i, n) {
                        var o = this,
                            r = o.getMeta(),
                            l = o.getScaleForId(r.xAxisID),
                            s = o.getScaleForId(r.yAxisID),
                            d = l.getBasePixel(),
                            u = t.custom || {},
                            c = o.getDataset(),
                            h = o.chart.options.elements.rectangle;
                        e.extend(t, {
                            _xScale: l,
                            _yScale: s,
                            _datasetIndex: o.index,
                            _index: a,
                            _model: {
                                x: i ? d : o.calculateBarX(a, o.index),
                                y: o.calculateBarY(a, o.index),
                                label: o.chart.data.labels[a],
                                datasetLabel: c.label,
                                base: i ? d : o.calculateBarBase(o.index, a),
                                height: o.calculateBarHeight(a),
                                backgroundColor: u.backgroundColor ? u.backgroundColor : e.getValueAtIndexOrDefault(c.backgroundColor, a, h.backgroundColor),
                                borderSkipped: u.borderSkipped ? u.borderSkipped : h.borderSkipped,
                                borderColor: u.borderColor ? u.borderColor : e.getValueAtIndexOrDefault(c.borderColor, a, h.borderColor),
                                borderWidth: u.borderWidth ? u.borderWidth : e.getValueAtIndexOrDefault(c.borderWidth, a, h.borderWidth)
                            },
                            draw: function() {
                                function t(t) {
                                    return s[(u + t) % 4]
                                }
                                var e = this._chart.ctx,
                                    a = this._view,
                                    i = a.height / 2,
                                    n = a.y - i,
                                    o = a.y + i,
                                    r = a.base - (a.base - a.x),
                                    l = a.borderWidth / 2;
                                a.borderWidth && (n += l, o -= l, r += l), e.beginPath(), e.fillStyle = a.backgroundColor, e.strokeStyle = a.borderColor, e.lineWidth = a.borderWidth;
                                var s = [
                                        [a.base, o],
                                        [a.base, n],
                                        [r, n],
                                        [r, o]
                                    ],
                                    d = ["bottom", "left", "top", "right"],
                                    u = d.indexOf(a.borderSkipped, 0); - 1 === u && (u = 0), e.moveTo.apply(e, t(0));
                                for (var c = 1; 4 > c; c++) e.lineTo.apply(e, t(c));
                                e.fill(), a.borderWidth && e.stroke()
                            },
                            inRange: function(t, e) {
                                var a = this._view,
                                    i = !1;
                                return a && (i = a.x < a.base ? e >= a.y - a.height / 2 && e <= a.y + a.height / 2 && t >= a.x && t <= a.base : e >= a.y - a.height / 2 && e <= a.y + a.height / 2 && t >= a.base && t <= a.x), i
                            }
                        }), t.pivot()
                    },
                    calculateBarBase: function(t, e) {
                        var a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.xAxisID),
                            o = 0;
                        if (n.options.stacked) {
                            var r = a.chart.data.datasets[t].data[e];
                            if (0 > r)
                                for (var l = 0; t > l; l++) {
                                    var s = a.chart.data.datasets[l],
                                        d = a.chart.getDatasetMeta(l);
                                    d.bar && d.xAxisID === n.id && a.chart.isDatasetVisible(l) && (o += s.data[e] < 0 ? s.data[e] : 0)
                                } else
                                    for (var u = 0; t > u; u++) {
                                        var c = a.chart.data.datasets[u],
                                            h = a.chart.getDatasetMeta(u);
                                        h.bar && h.xAxisID === n.id && a.chart.isDatasetVisible(u) && (o += c.data[e] > 0 ? c.data[e] : 0)
                                    }
                            return n.getPixelForValue(o)
                        }
                        return n.getBasePixel()
                    },
                    getRuler: function(t) {
                        var e, a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.yAxisID),
                            o = a.getBarCount();
                        e = "category" === n.options.type ? n.getPixelForTick(t + 1) - n.getPixelForTick(t) : n.width / n.ticks.length;
                        var r = e * n.options.categoryPercentage,
                            l = (e - e * n.options.categoryPercentage) / 2,
                            s = r / o;
                        if (n.ticks.length !== a.chart.data.labels.length) {
                            var d = n.ticks.length / a.chart.data.labels.length;
                            s *= d
                        }
                        var u = s * n.options.barPercentage,
                            c = s - s * n.options.barPercentage;
                        return {
                            datasetCount: o,
                            tickHeight: e,
                            categoryHeight: r,
                            categorySpacing: l,
                            fullBarHeight: s,
                            barHeight: u,
                            barSpacing: c
                        }
                    },
                    calculateBarHeight: function(t) {
                        var e = this,
                            a = e.getScaleForId(e.getMeta().yAxisID),
                            i = e.getRuler(t);
                        return a.options.stacked ? i.categoryHeight : i.barHeight
                    },
                    calculateBarX: function(t, e) {
                        var a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.xAxisID),
                            o = a.getDataset().data[t];
                        if (n.options.stacked) {
                            for (var r = 0, l = 0, s = 0; e > s; s++) {
                                var d = a.chart.data.datasets[s],
                                    u = a.chart.getDatasetMeta(s);
                                u.bar && u.xAxisID === n.id && a.chart.isDatasetVisible(s) && (d.data[t] < 0 ? l += d.data[t] || 0 : r += d.data[t] || 0)
                            }
                            return 0 > o ? n.getPixelForValue(l + o) : n.getPixelForValue(r + o)
                        }
                        return n.getPixelForValue(o)
                    },
                    calculateBarY: function(t, e) {
                        var a = this,
                            i = a.getMeta(),
                            n = a.getScaleForId(i.yAxisID),
                            o = a.getBarIndex(e),
                            r = a.getRuler(t),
                            l = n.getPixelForValue(null, t, e, a.chart.isCombo);
                        return l -= a.chart.isCombo ? r.tickHeight / 2 : 0, n.options.stacked ? l + r.categoryHeight / 2 + r.categorySpacing : l + r.barHeight / 2 + r.categorySpacing + r.barHeight * o + r.barSpacing / 2 + r.barSpacing * o
                    }
                })
            }
        }, {}],
        16: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.bubble = {
                    hover: {
                        mode: "single"
                    },
                    scales: {
                        xAxes: [{
                            type: "linear",
                            position: "bottom",
                            id: "x-axis-0"
                        }],
                        yAxes: [{
                            type: "linear",
                            position: "left",
                            id: "y-axis-0"
                        }]
                    },
                    tooltips: {
                        callbacks: {
                            title: function(t, e) {
                                return ""
                            },
                            label: function(t, e) {
                                var a = e.datasets[t.datasetIndex].label || "",
                                    i = e.datasets[t.datasetIndex].data[t.index];
                                return a + ": (" + i.x + ", " + i.y + ", " + i.r + ")"
                            }
                        }
                    }
                }, t.controllers.bubble = t.DatasetController.extend({
                    dataElementType: t.elements.Point,
                    update: function(t) {
                        var a = this,
                            i = a.getMeta(),
                            n = i.data;
                        e.each(n, function(e, i) {
                            a.updateElement(e, i, t)
                        })
                    },
                    updateElement: function(a, i, n) {
                        var o = this,
                            r = o.getMeta(),
                            l = o.getScaleForId(r.xAxisID),
                            s = o.getScaleForId(r.yAxisID),
                            d = a.custom || {},
                            u = o.getDataset(),
                            c = u.data[i],
                            h = o.chart.options.elements.point,
                            f = o.index;
                        e.extend(a, {
                            _xScale: l,
                            _yScale: s,
                            _datasetIndex: f,
                            _index: i,
                            _model: {
                                x: n ? l.getPixelForDecimal(.5) : l.getPixelForValue(c, i, f, o.chart.isCombo),
                                y: n ? s.getBasePixel() : s.getPixelForValue(c, i, f),
                                radius: n ? 0 : d.radius ? d.radius : o.getRadius(c),
                                hitRadius: d.hitRadius ? d.hitRadius : e.getValueAtIndexOrDefault(u.hitRadius, i, h.hitRadius)
                            }
                        }), t.DatasetController.prototype.removeHoverStyle.call(o, a, h);
                        var g = a._model;
                        g.skip = d.skip ? d.skip : isNaN(g.x) || isNaN(g.y), a.pivot()
                    },
                    getRadius: function(t) {
                        return t.r || this.chart.options.elements.point.radius
                    },
                    setHoverStyle: function(a) {
                        var i = this;
                        t.DatasetController.prototype.setHoverStyle.call(i, a);
                        var n = i.chart.data.datasets[a._datasetIndex],
                            o = a._index,
                            r = a.custom || {},
                            l = a._model;
                        l.radius = r.hoverRadius ? r.hoverRadius : e.getValueAtIndexOrDefault(n.hoverRadius, o, i.chart.options.elements.point.hoverRadius) + i.getRadius(n.data[o])
                    },
                    removeHoverStyle: function(e) {
                        var a = this;
                        t.DatasetController.prototype.removeHoverStyle.call(a, e, a.chart.options.elements.point);
                        var i = a.chart.data.datasets[e._datasetIndex].data[e._index],
                            n = e.custom || {},
                            o = e._model;
                        o.radius = n.radius ? n.radius : a.getRadius(i)
                    }
                })
            }
        }, {}],
        17: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = t.defaults;
                a.doughnut = {
                    animation: {
                        animateRotate: !0,
                        animateScale: !1
                    },
                    aspectRatio: 1,
                    hover: {
                        mode: "single"
                    },
                    legendCallback: function(t) {
                        var e = [];
                        e.push('<ul class="' + t.id + '-legend">');
                        var a = t.data,
                            i = a.datasets,
                            n = a.labels;
                        if (i.length)
                            for (var o = 0; o < i[0].data.length; ++o) e.push('<li><span style="background-color:' + i[0].backgroundColor[o] + '"></span>'), n[o] && e.push(n[o]), e.push("</li>");
                        return e.push("</ul>"), e.join("")
                    },
                    legend: {
                        labels: {
                            generateLabels: function(t) {
                                var a = t.data;
                                return a.labels.length && a.datasets.length ? a.labels.map(function(i, n) {
                                    var o = t.getDatasetMeta(0),
                                        r = a.datasets[0],
                                        l = o.data[n],
                                        s = l.custom || {},
                                        d = e.getValueAtIndexOrDefault,
                                        u = t.options.elements.arc,
                                        c = s.backgroundColor ? s.backgroundColor : d(r.backgroundColor, n, u.backgroundColor),
                                        h = s.borderColor ? s.borderColor : d(r.borderColor, n, u.borderColor),
                                        f = s.borderWidth ? s.borderWidth : d(r.borderWidth, n, u.borderWidth);
                                    return {
                                        text: i,
                                        fillStyle: c,
                                        strokeStyle: h,
                                        lineWidth: f,
                                        hidden: isNaN(r.data[n]) || o.data[n].hidden,
                                        index: n
                                    }
                                }) : []
                            }
                        },
                        onClick: function(t, e) {
                            var a, i, n, o = e.index,
                                r = this.chart;
                            for (a = 0, i = (r.data.datasets || []).length; i > a; ++a) n = r.getDatasetMeta(a), n.data[o].hidden = !n.data[o].hidden;
                            r.update()
                        }
                    },
                    cutoutPercentage: 50,
                    rotation: Math.PI * -.5,
                    circumference: 2 * Math.PI,
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return ""
                            },
                            label: function(t, e) {
                                return e.labels[t.index] + ": " + e.datasets[t.datasetIndex].data[t.index]
                            }
                        }
                    }
                }, a.pie = e.clone(a.doughnut), e.extend(a.pie, {
                    cutoutPercentage: 0
                }), t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
                    dataElementType: t.elements.Arc,
                    linkScales: e.noop,
                    getRingIndex: function(t) {
                        for (var e = 0, a = 0; t > a; ++a) this.chart.isDatasetVisible(a) && ++e;
                        return e
                    },
                    update: function(t) {
                        var a = this,
                            i = a.chart,
                            n = i.chartArea,
                            o = i.options,
                            r = o.elements.arc,
                            l = n.right - n.left - r.borderWidth,
                            s = n.bottom - n.top - r.borderWidth,
                            d = Math.min(l, s),
                            u = {
                                x: 0,
                                y: 0
                            },
                            c = a.getMeta(),
                            h = o.cutoutPercentage,
                            f = o.circumference;
                        if (f < 2 * Math.PI) {
                            var g = o.rotation % (2 * Math.PI);
                            g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0);
                            var p = g + f,
                                m = {
                                    x: Math.cos(g),
                                    y: Math.sin(g)
                                },
                                b = {
                                    x: Math.cos(p),
                                    y: Math.sin(p)
                                },
                                v = 0 >= g && p >= 0 || g <= 2 * Math.PI && 2 * Math.PI <= p,
                                x = g <= .5 * Math.PI && .5 * Math.PI <= p || g <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
                                y = g <= -Math.PI && -Math.PI <= p || g <= Math.PI && Math.PI <= p,
                                k = g <= .5 * -Math.PI && .5 * -Math.PI <= p || g <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
                                S = h / 100,
                                w = {
                                    x: y ? -1 : Math.min(m.x * (m.x < 0 ? 1 : S), b.x * (b.x < 0 ? 1 : S)),
                                    y: k ? -1 : Math.min(m.y * (m.y < 0 ? 1 : S), b.y * (b.y < 0 ? 1 : S))
                                },
                                C = {
                                    x: v ? 1 : Math.max(m.x * (m.x > 0 ? 1 : S), b.x * (b.x > 0 ? 1 : S)),
                                    y: x ? 1 : Math.max(m.y * (m.y > 0 ? 1 : S), b.y * (b.y > 0 ? 1 : S))
                                },
                                M = {
                                    width: .5 * (C.x - w.x),
                                    height: .5 * (C.y - w.y)
                                };
                            d = Math.min(l / M.width, s / M.height), u = {
                                x: (C.x + w.x) * -.5,
                                y: (C.y + w.y) * -.5
                            }
                        }
                        i.outerRadius = Math.max(d / 2, 0), i.innerRadius = Math.max(h ? i.outerRadius / 100 * h : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), i.offsetX = u.x * i.outerRadius, i.offsetY = u.y * i.outerRadius, c.total = a.calculateTotal(), a.outerRadius = i.outerRadius - i.radiusLength * a.getRingIndex(a.index), a.innerRadius = a.outerRadius - i.radiusLength, e.each(c.data, function(e, i) {
                            a.updateElement(e, i, t)
                        })
                    },
                    updateElement: function(t, a, i) {
                        var n = this,
                            o = n.chart,
                            r = o.chartArea,
                            l = o.options,
                            s = l.animation,
                            d = (l.elements.arc, (r.left + r.right) / 2),
                            u = (r.top + r.bottom) / 2,
                            c = l.rotation,
                            h = l.rotation,
                            f = n.getDataset(),
                            g = i && s.animateRotate ? 0 : t.hidden ? 0 : n.calculateCircumference(f.data[a]) * (l.circumference / (2 * Math.PI)),
                            p = i && s.animateScale ? 0 : n.innerRadius,
                            m = i && s.animateScale ? 0 : n.outerRadius,
                            b = (t.custom || {}, e.getValueAtIndexOrDefault);
                        e.extend(t, {
                            _datasetIndex: n.index,
                            _index: a,
                            _model: {
                                x: d + o.offsetX,
                                y: u + o.offsetY,
                                startAngle: c,
                                endAngle: h,
                                circumference: g,
                                outerRadius: m,
                                innerRadius: p,
                                label: b(f.label, a, o.data.labels[a])
                            }
                        });
                        var v = t._model;
                        this.removeHoverStyle(t), i && s.animateRotate || (0 === a ? v.startAngle = l.rotation : v.startAngle = n.getMeta().data[a - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot()
                    },
                    removeHoverStyle: function(e) {
                        t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    calculateTotal: function() {
                        var t, a = this.getDataset(),
                            i = this.getMeta(),
                            n = 0;
                        return e.each(i.data, function(e, i) {
                            t = a.data[i], isNaN(t) || e.hidden || (n += Math.abs(t))
                        }), n
                    },
                    calculateCircumference: function(t) {
                        var e = this.getMeta().total;
                        return e > 0 && !isNaN(t) ? 2 * Math.PI * (t / e) : 0
                    }
                })
            }
        }, {}],
        18: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                function e(t, e) {
                    return a.getValueOrDefault(t.showLine, e.showLines)
                }
                var a = t.helpers;
                t.defaults.line = {
                    showLines: !0,
                    hover: {
                        mode: "label"
                    },
                    scales: {
                        xAxes: [{
                            type: "category",
                            id: "x-axis-0"
                        }],
                        yAxes: [{
                            type: "linear",
                            id: "y-axis-0"
                        }]
                    }
                }, t.controllers.line = t.DatasetController.extend({
                    datasetElementType: t.elements.Line,
                    dataElementType: t.elements.Point,
                    addElementAndReset: function(a) {
                        var i = this,
                            n = i.chart.options,
                            o = i.getMeta();
                        t.DatasetController.prototype.addElementAndReset.call(i, a), e(i.getDataset(), n) && 0 !== o.dataset._model.tension && i.updateBezierControlPoints()
                    },
                    update: function(t) {
                        var i, n, o, r = this,
                            l = r.getMeta(),
                            s = l.dataset,
                            d = l.data || [],
                            u = r.chart.options,
                            c = u.elements.line,
                            h = r.getScaleForId(l.yAxisID),
                            f = r.getDataset(),
                            g = e(f, u);
                        for (g && (o = s.custom || {}, void 0 !== f.tension && void 0 === f.lineTension && (f.lineTension = f.tension), s._scale = h, s._datasetIndex = r.index, s._children = d, s._model = {
                                spanGaps: f.spanGaps ? f.spanGaps : !1,
                                tension: o.tension ? o.tension : a.getValueOrDefault(f.lineTension, c.tension),
                                backgroundColor: o.backgroundColor ? o.backgroundColor : f.backgroundColor || c.backgroundColor,
                                borderWidth: o.borderWidth ? o.borderWidth : f.borderWidth || c.borderWidth,
                                borderColor: o.borderColor ? o.borderColor : f.borderColor || c.borderColor,
                                borderCapStyle: o.borderCapStyle ? o.borderCapStyle : f.borderCapStyle || c.borderCapStyle,
                                borderDash: o.borderDash ? o.borderDash : f.borderDash || c.borderDash,
                                borderDashOffset: o.borderDashOffset ? o.borderDashOffset : f.borderDashOffset || c.borderDashOffset,
                                borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : f.borderJoinStyle || c.borderJoinStyle,
                                fill: o.fill ? o.fill : void 0 !== f.fill ? f.fill : c.fill,
                                scaleTop: h.top,
                                scaleBottom: h.bottom,
                                scaleZero: h.getBasePixel()
                            }, s.pivot()), i = 0, n = d.length; n > i; ++i) r.updateElement(d[i], i, t);
                        for (g && 0 !== s._model.tension && r.updateBezierControlPoints(), i = 0, n = d.length; n > i; ++i) d[i].pivot()
                    },
                    getPointBackgroundColor: function(t, e) {
                        var i = this.chart.options.elements.point.backgroundColor,
                            n = this.getDataset(),
                            o = t.custom || {};
                        return o.backgroundColor ? i = o.backgroundColor : n.pointBackgroundColor ? i = a.getValueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i
                    },
                    getPointBorderColor: function(t, e) {
                        var i = this.chart.options.elements.point.borderColor,
                            n = this.getDataset(),
                            o = t.custom || {};
                        return o.borderColor ? i = o.borderColor : n.pointBorderColor ? i = a.getValueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i
                    },
                    getPointBorderWidth: function(t, e) {
                        var i = this.chart.options.elements.point.borderWidth,
                            n = this.getDataset(),
                            o = t.custom || {};
                        return o.borderWidth ? i = o.borderWidth : n.pointBorderWidth ? i = a.getValueAtIndexOrDefault(n.pointBorderWidth, e, i) : n.borderWidth && (i = n.borderWidth), i
                    },
                    updateElement: function(t, e, i) {
                        var n, o, r = this,
                            l = r.getMeta(),
                            s = t.custom || {},
                            d = r.getDataset(),
                            u = r.index,
                            c = d.data[e],
                            h = r.getScaleForId(l.yAxisID),
                            f = r.getScaleForId(l.xAxisID),
                            g = r.chart.options.elements.point;
                        void 0 !== d.radius && void 0 === d.pointRadius && (d.pointRadius = d.radius), void 0 !== d.hitRadius && void 0 === d.pointHitRadius && (d.pointHitRadius = d.hitRadius), n = f.getPixelForValue(c, e, u, r.chart.isCombo), o = i ? h.getBasePixel() : r.calculatePointY(c, e, u, r.chart.isCombo), t._xScale = f, t._yScale = h, t._datasetIndex = u, t._index = e, t._model = {
                            x: n,
                            y: o,
                            skip: s.skip || isNaN(n) || isNaN(o),
                            radius: s.radius || a.getValueAtIndexOrDefault(d.pointRadius, e, g.radius),
                            pointStyle: s.pointStyle || a.getValueAtIndexOrDefault(d.pointStyle, e, g.pointStyle),
                            backgroundColor: r.getPointBackgroundColor(t, e),
                            borderColor: r.getPointBorderColor(t, e),
                            borderWidth: r.getPointBorderWidth(t, e),
                            tension: l.dataset._model ? l.dataset._model.tension : 0,
                            hitRadius: s.hitRadius || a.getValueAtIndexOrDefault(d.pointHitRadius, e, g.hitRadius)
                        }
                    },
                    calculatePointY: function(t, e, a, i) {
                        var n, o, r, l = this,
                            s = l.chart,
                            d = l.getMeta(),
                            u = l.getScaleForId(d.yAxisID),
                            c = 0,
                            h = 0;
                        if (u.options.stacked) {
                            for (n = 0; a > n; n++) o = s.data.datasets[n], r = s.getDatasetMeta(n), "line" === r.type && s.isDatasetVisible(n) && (o.data[e] < 0 ? h += o.data[e] || 0 : c += o.data[e] || 0);
                            return 0 > t ? u.getPixelForValue(h + t) : u.getPixelForValue(c + t)
                        }
                        return u.getPixelForValue(t)
                    },
                    updateBezierControlPoints: function() {
                        var t, e, i, n, o, r = this.getMeta(),
                            l = (this.chart.chartArea, r.data || []);
                        for (t = 0, e = l.length; e > t; ++t) i = l[t], n = i._model, o = a.splineCurve(a.previousItem(l, t)._model, n, a.nextItem(l, t)._model, r.dataset._model.tension), n.controlPointPreviousX = o.previous.x, n.controlPointPreviousY = o.previous.y, n.controlPointNextX = o.next.x, n.controlPointNextY = o.next.y
                    },
                    draw: function(t) {
                        var a, i, n = this,
                            o = n.getMeta(),
                            r = o.data || [],
                            l = t || 1;
                        for (a = 0, i = r.length; i > a; ++a) r[a].transition(l);
                        for (e(n.getDataset(), n.chart.options) && o.dataset.transition(l).draw(), a = 0, i = r.length; i > a; ++a) r[a].draw()
                    },
                    setHoverStyle: function(t) {
                        var e = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = t._model;
                        o.radius = n.hoverRadius || a.getValueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), o.backgroundColor = n.hoverBackgroundColor || a.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, i, a.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor || a.getValueAtIndexOrDefault(e.pointHoverBorderColor, i, a.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth || a.getValueAtIndexOrDefault(e.pointHoverBorderWidth, i, o.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var e = this,
                            i = e.chart.data.datasets[t._datasetIndex],
                            n = t._index,
                            o = t.custom || {},
                            r = t._model;
                        void 0 !== i.radius && void 0 === i.pointRadius && (i.pointRadius = i.radius), r.radius = o.radius || a.getValueAtIndexOrDefault(i.pointRadius, n, e.chart.options.elements.point.radius), r.backgroundColor = e.getPointBackgroundColor(t, n), r.borderColor = e.getPointBorderColor(t, n), r.borderWidth = e.getPointBorderWidth(t, n)
                    }
                })
            }
        }, {}],
        19: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.polarArea = {
                    scale: {
                        type: "radialLinear",
                        lineArc: !0
                    },
                    animation: {
                        animateRotate: !0,
                        animateScale: !0
                    },
                    aspectRatio: 1,
                    legendCallback: function(t) {
                        var e = [];
                        e.push('<ul class="' + t.id + '-legend">');
                        var a = t.data,
                            i = a.datasets,
                            n = a.labels;
                        if (i.length)
                            for (var o = 0; o < i[0].data.length; ++o) e.push('<li><span style="background-color:' + i[0].backgroundColor[o] + '">'), n[o] && e.push(n[o]), e.push("</span></li>");
                        return e.push("</ul>"), e.join("")
                    },
                    legend: {
                        labels: {
                            generateLabels: function(t) {
                                var a = t.data;
                                return a.labels.length && a.datasets.length ? a.labels.map(function(i, n) {
                                    var o = t.getDatasetMeta(0),
                                        r = a.datasets[0],
                                        l = o.data[n],
                                        s = l.custom || {},
                                        d = e.getValueAtIndexOrDefault,
                                        u = t.options.elements.arc,
                                        c = s.backgroundColor ? s.backgroundColor : d(r.backgroundColor, n, u.backgroundColor),
                                        h = s.borderColor ? s.borderColor : d(r.borderColor, n, u.borderColor),
                                        f = s.borderWidth ? s.borderWidth : d(r.borderWidth, n, u.borderWidth);
                                    return {
                                        text: i,
                                        fillStyle: c,
                                        strokeStyle: h,
                                        lineWidth: f,
                                        hidden: isNaN(r.data[n]) || o.data[n].hidden,
                                        index: n
                                    }
                                }) : []
                            }
                        },
                        onClick: function(t, e) {
                            var a, i, n, o = e.index,
                                r = this.chart;
                            for (a = 0, i = (r.data.datasets || []).length; i > a; ++a) n = r.getDatasetMeta(a), n.data[o].hidden = !n.data[o].hidden;
                            r.update()
                        }
                    },
                    tooltips: {
                        callbacks: {
                            title: function() {
                                return ""
                            },
                            label: function(t, e) {
                                return e.labels[t.index] + ": " + t.yLabel
                            }
                        }
                    }
                }, t.controllers.polarArea = t.DatasetController.extend({
                    dataElementType: t.elements.Arc,
                    linkScales: e.noop,
                    update: function(t) {
                        var a = this,
                            i = a.chart,
                            n = i.chartArea,
                            o = a.getMeta(),
                            r = i.options,
                            l = r.elements.arc,
                            s = Math.min(n.right - n.left, n.bottom - n.top);
                        i.outerRadius = Math.max((s - l.borderWidth / 2) / 2, 0), i.innerRadius = Math.max(r.cutoutPercentage ? i.outerRadius / 100 * r.cutoutPercentage : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), a.outerRadius = i.outerRadius - i.radiusLength * a.index, a.innerRadius = a.outerRadius - i.radiusLength, o.count = a.countVisibleElements(), e.each(o.data, function(e, i) {
                            a.updateElement(e, i, t)
                        })
                    },
                    updateElement: function(t, a, i) {
                        for (var n = this, o = n.chart, r = o.chartArea, l = n.getDataset(), s = o.options, d = s.animation, u = (s.elements.arc, t.custom || {}, o.scale), c = e.getValueAtIndexOrDefault, h = o.data.labels, f = n.calculateCircumference(l.data[a]), g = (r.left + r.right) / 2, p = (r.top + r.bottom) / 2, m = 0, b = n.getMeta(), v = 0; a > v; ++v) isNaN(l.data[v]) || b.data[v].hidden || ++m;
                        var x = -.5 * Math.PI,
                            y = t.hidden ? 0 : u.getDistanceFromCenterForValue(l.data[a]),
                            k = x + f * m,
                            S = k + (t.hidden ? 0 : f),
                            w = d.animateScale ? 0 : u.getDistanceFromCenterForValue(l.data[a]);
                        e.extend(t, {
                            _datasetIndex: n.index,
                            _index: a,
                            _scale: u,
                            _model: {
                                x: g,
                                y: p,
                                innerRadius: 0,
                                outerRadius: i ? w : y,
                                startAngle: i && d.animateRotate ? x : k,
                                endAngle: i && d.animateRotate ? x : S,
                                label: c(h, a, h[a])
                            }
                        }), n.removeHoverStyle(t), t.pivot()
                    },
                    removeHoverStyle: function(e) {
                        t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
                    },
                    countVisibleElements: function() {
                        var t = this.getDataset(),
                            a = this.getMeta(),
                            i = 0;
                        return e.each(a.data, function(e, a) {
                            isNaN(t.data[a]) || e.hidden || i++
                        }), i
                    },
                    calculateCircumference: function(t) {
                        var e = this.getMeta().count;
                        return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0
                    }
                })
            }
        }, {}],
        20: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.radar = {
                    scale: {
                        type: "radialLinear"
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }, t.controllers.radar = t.DatasetController.extend({
                    datasetElementType: t.elements.Line,
                    dataElementType: t.elements.Point,
                    linkScales: e.noop,
                    addElementAndReset: function(e) {
                        t.DatasetController.prototype.addElementAndReset.call(this, e), this.updateBezierControlPoints()
                    },
                    update: function(t) {
                        var a = this,
                            i = a.getMeta(),
                            n = i.dataset,
                            o = i.data,
                            r = n.custom || {},
                            l = a.getDataset(),
                            s = a.chart.options.elements.line,
                            d = a.chart.scale;
                        void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), e.extend(i.dataset, {
                            _datasetIndex: a.index,
                            _children: o,
                            _loop: !0,
                            _model: {
                                tension: r.tension ? r.tension : e.getValueOrDefault(l.lineTension, s.tension),
                                backgroundColor: r.backgroundColor ? r.backgroundColor : l.backgroundColor || s.backgroundColor,
                                borderWidth: r.borderWidth ? r.borderWidth : l.borderWidth || s.borderWidth,
                                borderColor: r.borderColor ? r.borderColor : l.borderColor || s.borderColor,
                                fill: r.fill ? r.fill : void 0 !== l.fill ? l.fill : s.fill,
                                borderCapStyle: r.borderCapStyle ? r.borderCapStyle : l.borderCapStyle || s.borderCapStyle,
                                borderDash: r.borderDash ? r.borderDash : l.borderDash || s.borderDash,
                                borderDashOffset: r.borderDashOffset ? r.borderDashOffset : l.borderDashOffset || s.borderDashOffset,
                                borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : l.borderJoinStyle || s.borderJoinStyle,
                                scaleTop: d.top,
                                scaleBottom: d.bottom,
                                scaleZero: d.getBasePosition()
                            }
                        }), i.dataset.pivot(), e.each(o, function(e, i) {
                            a.updateElement(e, i, t)
                        }, a), a.updateBezierControlPoints()
                    },
                    updateElement: function(t, a, i) {
                        var n = this,
                            o = t.custom || {},
                            r = n.getDataset(),
                            l = n.chart.scale,
                            s = n.chart.options.elements.point,
                            d = l.getPointPositionForValue(a, r.data[a]);
                        e.extend(t, {
                            _datasetIndex: n.index,
                            _index: a,
                            _scale: l,
                            _model: {
                                x: i ? l.xCenter : d.x,
                                y: i ? l.yCenter : d.y,
                                tension: o.tension ? o.tension : e.getValueOrDefault(r.tension, n.chart.options.elements.line.tension),
                                radius: o.radius ? o.radius : e.getValueAtIndexOrDefault(r.pointRadius, a, s.radius),
                                backgroundColor: o.backgroundColor ? o.backgroundColor : e.getValueAtIndexOrDefault(r.pointBackgroundColor, a, s.backgroundColor),
                                borderColor: o.borderColor ? o.borderColor : e.getValueAtIndexOrDefault(r.pointBorderColor, a, s.borderColor),
                                borderWidth: o.borderWidth ? o.borderWidth : e.getValueAtIndexOrDefault(r.pointBorderWidth, a, s.borderWidth),
                                pointStyle: o.pointStyle ? o.pointStyle : e.getValueAtIndexOrDefault(r.pointStyle, a, s.pointStyle),
                                hitRadius: o.hitRadius ? o.hitRadius : e.getValueAtIndexOrDefault(r.hitRadius, a, s.hitRadius)
                            }
                        }), t._model.skip = o.skip ? o.skip : isNaN(t._model.x) || isNaN(t._model.y)
                    },
                    updateBezierControlPoints: function() {
                        var t = this.chart.chartArea,
                            a = this.getMeta();
                        e.each(a.data, function(i, n) {
                            var o = i._model,
                                r = e.splineCurve(e.previousItem(a.data, n, !0)._model, o, e.nextItem(a.data, n, !0)._model, o.tension);
                            o.controlPointPreviousX = Math.max(Math.min(r.previous.x, t.right), t.left), o.controlPointPreviousY = Math.max(Math.min(r.previous.y, t.bottom), t.top), o.controlPointNextX = Math.max(Math.min(r.next.x, t.right), t.left), o.controlPointNextY = Math.max(Math.min(r.next.y, t.bottom), t.top), i.pivot()
                        })
                    },
                    draw: function(t) {
                        var a = this.getMeta(),
                            i = t || 1;
                        e.each(a.data, function(t, e) {
                            t.transition(i)
                        }), a.dataset.transition(i).draw(), e.each(a.data, function(t) {
                            t.draw()
                        })
                    },
                    setHoverStyle: function(t) {
                        var a = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            o = t._model;
                        o.radius = i.hoverRadius ? i.hoverRadius : e.getValueAtIndexOrDefault(a.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), o.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : e.getValueAtIndexOrDefault(a.pointHoverBackgroundColor, n, e.getHoverColor(o.backgroundColor)), o.borderColor = i.hoverBorderColor ? i.hoverBorderColor : e.getValueAtIndexOrDefault(a.pointHoverBorderColor, n, e.getHoverColor(o.borderColor)), o.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : e.getValueAtIndexOrDefault(a.pointHoverBorderWidth, n, o.borderWidth)
                    },
                    removeHoverStyle: function(t) {
                        var a = this.chart.data.datasets[t._datasetIndex],
                            i = t.custom || {},
                            n = t._index,
                            o = t._model,
                            r = this.chart.options.elements.point;
                        o.radius = i.radius ? i.radius : e.getValueAtIndexOrDefault(a.radius, n, r.radius), o.backgroundColor = i.backgroundColor ? i.backgroundColor : e.getValueAtIndexOrDefault(a.pointBackgroundColor, n, r.backgroundColor), o.borderColor = i.borderColor ? i.borderColor : e.getValueAtIndexOrDefault(a.pointBorderColor, n, r.borderColor), o.borderWidth = i.borderWidth ? i.borderWidth : e.getValueAtIndexOrDefault(a.pointBorderWidth, n, r.borderWidth)
                    }
                })
            }
        }, {}],
        21: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.global.animation = {
                    duration: 1e3,
                    easing: "easeOutQuart",
                    onProgress: e.noop,
                    onComplete: e.noop
                }, t.Animation = t.Element.extend({
                    currentStep: null,
                    numSteps: 60,
                    easing: "",
                    render: null,
                    onAnimationProgress: null,
                    onAnimationComplete: null
                }), t.animationService = {
                    frameDuration: 17,
                    animations: [],
                    dropFrames: 0,
                    request: null,
                    addAnimation: function(t, e, a, i) {
                        var n = this;
                        i || (t.animating = !0);
                        for (var o = 0; o < n.animations.length; ++o)
                            if (n.animations[o].chartInstance === t) return void(n.animations[o].animationObject = e);
                        n.animations.push({
                            chartInstance: t,
                            animationObject: e
                        }), 1 === n.animations.length && n.requestAnimationFrame()
                    },
                    cancelAnimation: function(t) {
                        var a = e.findIndex(this.animations, function(e) {
                            return e.chartInstance === t
                        }); - 1 !== a && (this.animations.splice(a, 1), t.animating = !1)
                    },
                    requestAnimationFrame: function() {
                        var t = this;
                        null === t.request && (t.request = e.requestAnimFrame.call(window, function() {
                            t.request = null, t.startDigest()
                        }))
                    },
                    startDigest: function() {
                        var t = this,
                            e = Date.now(),
                            a = 0;
                        t.dropFrames > 1 && (a = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1);
                        for (var i = 0; i < t.animations.length;) null === t.animations[i].animationObject.currentStep && (t.animations[i].animationObject.currentStep = 0), t.animations[i].animationObject.currentStep += 1 + a, t.animations[i].animationObject.currentStep > t.animations[i].animationObject.numSteps && (t.animations[i].animationObject.currentStep = t.animations[i].animationObject.numSteps), t.animations[i].animationObject.render(t.animations[i].chartInstance, t.animations[i].animationObject), t.animations[i].animationObject.onAnimationProgress && t.animations[i].animationObject.onAnimationProgress.call && t.animations[i].animationObject.onAnimationProgress.call(t.animations[i].chartInstance, t.animations[i]), t.animations[i].animationObject.currentStep === t.animations[i].animationObject.numSteps ? (t.animations[i].animationObject.onAnimationComplete && t.animations[i].animationObject.onAnimationComplete.call && t.animations[i].animationObject.onAnimationComplete.call(t.animations[i].chartInstance, t.animations[i]), t.animations[i].chartInstance.animating = !1, t.animations.splice(i, 1)) : ++i;
                        var n = Date.now(),
                            o = (n - e) / t.frameDuration;
                        t.dropFrames += o, t.animations.length > 0 && t.requestAnimationFrame()
                    }
                }
            }
        }, {}],
        22: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.types = {}, t.instances = {}, t.controllers = {}, t.Controller = function(a) {
                    return this.chart = a, this.config = a.config, this.options = this.config.options = e.configMerge(t.defaults.global, t.defaults[this.config.type], this.config.options || {}), this.id = e.uid(), Object.defineProperty(this, "data", {
                        get: function() {
                            return this.config.data
                        }
                    }), t.instances[this.id] = this, this.options.responsive && this.resize(!0), this.initialize(), this
                }, e.extend(t.Controller.prototype, {
                    initialize: function() {
                        var e = this;
                        return t.plugins.notify("beforeInit", [e]), e.bindEvents(), e.ensureScalesHaveIDs(), e.buildOrUpdateControllers(), e.buildScales(), e.updateLayout(), e.resetElements(), e.initToolTip(), e.update(), t.plugins.notify("afterInit", [e]), e
                    },
                    clear: function() {
                        return e.clear(this.chart), this
                    },
                    stop: function() {
                        return t.animationService.cancelAnimation(this), this
                    },
                    resize: function(a) {
                        var i = this,
                            n = i.chart,
                            o = n.canvas,
                            r = e.getMaximumWidth(o),
                            l = n.aspectRatio,
                            s = i.options.maintainAspectRatio && isNaN(l) === !1 && isFinite(l) && 0 !== l ? r / l : e.getMaximumHeight(o),
                            d = n.width !== r || n.height !== s;
                        if (!d) return i;
                        o.width = n.width = r, o.height = n.height = s, e.retinaScale(n);
                        var u = {
                            width: r,
                            height: s
                        };
                        return t.plugins.notify("resize", [i, u]), i.options.onResize && i.options.onResize(i, u), a || (i.stop(), i.update(i.options.responsiveAnimationDuration)), i
                    },
                    ensureScalesHaveIDs: function() {
                        var t = this.options,
                            a = t.scales || {},
                            i = t.scale;
                        e.each(a.xAxes, function(t, e) {
                            t.id = t.id || "x-axis-" + e
                        }), e.each(a.yAxes, function(t, e) {
                            t.id = t.id || "y-axis-" + e
                        }), i && (i.id = i.id || "scale")
                    },
                    buildScales: function() {
                        var a = this,
                            i = a.options,
                            n = a.scales = {},
                            o = [];
                        i.scales && (o = o.concat((i.scales.xAxes || []).map(function(t) {
                            return {
                                options: t,
                                dtype: "category"
                            }
                        }), (i.scales.yAxes || []).map(function(t) {
                            return {
                                options: t,
                                dtype: "linear"
                            }
                        }))), i.scale && o.push({
                            options: i.scale,
                            dtype: "radialLinear",
                            isDefault: !0
                        }), e.each(o, function(i, o) {
                            var r = i.options,
                                l = e.getValueOrDefault(r.type, i.dtype),
                                s = t.scaleService.getScaleConstructor(l);
                            if (s) {
                                var d = new s({
                                    id: r.id,
                                    options: r,
                                    ctx: a.chart.ctx,
                                    chart: a
                                });
                                n[d.id] = d, i.isDefault && (a.scale = d)
                            }
                        }), t.scaleService.addScalesToLayout(this)
                    },
                    updateLayout: function() {
                        t.layoutService.update(this, this.chart.width, this.chart.height)
                    },
                    buildOrUpdateControllers: function() {
                        var a = this,
                            i = [],
                            n = [];
                        if (e.each(a.data.datasets, function(e, o) {
                                var r = a.getDatasetMeta(o);
                                r.type || (r.type = e.type || a.config.type), i.push(r.type), r.controller ? r.controller.updateIndex(o) : (r.controller = new t.controllers[r.type](a, o), n.push(r.controller))
                            }, a), i.length > 1)
                            for (var o = 1; o < i.length; o++)
                                if (i[o] !== i[o - 1]) {
                                    a.isCombo = !0;
                                    break
                                } return n
                    },
                    resetElements: function() {
                        var t = this;
                        e.each(t.data.datasets, function(e, a) {
                            t.getDatasetMeta(a).controller.reset()
                        }, t)
                    },
                    update: function(a, i) {
                        var n = this;
                        t.plugins.notify("beforeUpdate", [n]), n.tooltip._data = n.data;
                        var o = n.buildOrUpdateControllers();
                        e.each(n.data.datasets, function(t, e) {
                            n.getDatasetMeta(e).controller.buildOrUpdateElements()
                        }, n), t.layoutService.update(n, n.chart.width, n.chart.height), t.plugins.notify("afterScaleUpdate", [n]), e.each(o, function(t) {
                            t.reset()
                        }), n.updateDatasets(), t.plugins.notify("afterUpdate", [n]), n.render(a, i)
                    },
                    updateDatasets: function() {
                        var e, a, i = this;
                        if (t.plugins.notify("beforeDatasetsUpdate", [i])) {
                            for (e = 0, a = i.data.datasets.length; a > e; ++e) i.getDatasetMeta(e).controller.update();
                            t.plugins.notify("afterDatasetsUpdate", [i])
                        }
                    },
                    render: function(a, i) {
                        var n = this;
                        t.plugins.notify("beforeRender", [n]);
                        var o = n.options.animation;
                        if (o && ("undefined" != typeof a && 0 !== a || "undefined" == typeof a && 0 !== o.duration)) {
                            var r = new t.Animation;
                            r.numSteps = (a || o.duration) / 16.66, r.easing = o.easing, r.render = function(t, a) {
                                var i = e.easingEffects[a.easing],
                                    n = a.currentStep / a.numSteps,
                                    o = i(n);
                                t.draw(o, n, a.currentStep)
                            }, r.onAnimationProgress = o.onProgress, r.onAnimationComplete = o.onComplete, t.animationService.addAnimation(n, r, a, i)
                        } else n.draw(), o && o.onComplete && o.onComplete.call && o.onComplete.call(n);
                        return n
                    },
                    draw: function(a) {
                        var i = this,
                            n = a || 1;
                        i.clear(), t.plugins.notify("beforeDraw", [i, n]), e.each(i.boxes, function(t) {
                            t.draw(i.chartArea)
                        }, i), i.scale && i.scale.draw(), t.plugins.notify("beforeDatasetsDraw", [i, n]), e.each(i.data.datasets, function(t, e) {
                            i.isDatasetVisible(e) && i.getDatasetMeta(e).controller.draw(a)
                        }, i, !0), t.plugins.notify("afterDatasetsDraw", [i, n]), i.tooltip.transition(n).draw(), t.plugins.notify("afterDraw", [i, n])
                    },
                    getElementAtEvent: function(t) {
                        var a = this,
                            i = e.getRelativePosition(t, a.chart),
                            n = [];
                        return e.each(a.data.datasets, function(t, o) {
                            if (a.isDatasetVisible(o)) {
                                var r = a.getDatasetMeta(o);
                                e.each(r.data, function(t, e) {
                                    return t.inRange(i.x, i.y) ? (n.push(t), n) : void 0
                                })
                            }
                        }), n
                    },
                    getElementsAtEvent: function(t) {
                        var a = this,
                            i = e.getRelativePosition(t, a.chart),
                            n = [],
                            o = function() {
                                if (a.data.datasets)
                                    for (var t = 0; t < a.data.datasets.length; t++) {
                                        var e = a.getDatasetMeta(t);
                                        if (a.isDatasetVisible(t))
                                            for (var n = 0; n < e.data.length; n++)
                                                if (e.data[n].inRange(i.x, i.y)) return e.data[n]
                                    }
                            }.call(a);
                        return o ? (e.each(a.data.datasets, function(t, e) {
                            if (a.isDatasetVisible(e)) {
                                var i = a.getDatasetMeta(e);
                                n.push(i.data[o._index])
                            }
                        }, a), n) : n
                    },
                    getElementsAtEventForMode: function(t, e) {
                        var a = this;
                        switch (e) {
                            case "single":
                                return a.getElementAtEvent(t);
                            case "label":
                                return a.getElementsAtEvent(t);
                            case "dataset":
                                return a.getDatasetAtEvent(t);
                            default:
                                return t
                        }
                    },
                    getDatasetAtEvent: function(t) {
                        var e = this.getElementAtEvent(t);
                        return e.length > 0 && (e = this.getDatasetMeta(e[0]._datasetIndex).data), e
                    },
                    getDatasetMeta: function(t) {
                        var e = this,
                            a = e.data.datasets[t];
                        a._meta || (a._meta = {});
                        var i = a._meta[e.id];
                        return i || (i = a._meta[e.id] = {
                            type: null,
                            data: [],
                            dataset: null,
                            controller: null,
                            hidden: null,
                            xAxisID: null,
                            yAxisID: null
                        }), i
                    },
                    getVisibleDatasetCount: function() {
                        for (var t = 0, e = 0, a = this.data.datasets.length; a > e; ++e) this.isDatasetVisible(e) && t++;
                        return t
                    },
                    isDatasetVisible: function(t) {
                        var e = this.getDatasetMeta(t);
                        return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
                    },
                    generateLegend: function() {
                        return this.options.legendCallback(this)
                    },
                    destroy: function() {
                        var a = this;
                        a.stop(), a.clear(), e.unbindEvents(a, a.events), e.removeResizeListener(a.chart.canvas.parentNode);
                        var i = a.chart.canvas;
                        i.width = a.chart.width, i.height = a.chart.height, void 0 !== a.chart.originalDevicePixelRatio && a.chart.ctx.scale(1 / a.chart.originalDevicePixelRatio, 1 / a.chart.originalDevicePixelRatio), i.style.width = a.chart.originalCanvasStyleWidth, i.style.height = a.chart.originalCanvasStyleHeight, t.plugins.notify("destroy", [a]), delete t.instances[a.id]
                    },
                    toBase64Image: function() {
                        return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
                    },
                    initToolTip: function() {
                        var e = this;
                        e.tooltip = new t.Tooltip({
                            _chart: e.chart,
                            _chartInstance: e,
                            _data: e.data,
                            _options: e.options.tooltips
                        }, e)
                    },
                    bindEvents: function() {
                        var t = this;
                        e.bindEvents(t, t.options.events, function(e) {
                            t.eventHandler(e)
                        })
                    },
                    updateHoverStyle: function(t, e, a) {
                        var i, n, o, r = a ? "setHoverStyle" : "removeHoverStyle";
                        switch (e) {
                            case "single":
                                t = [t[0]];
                                break;
                            case "label":
                            case "dataset":
                                break;
                            default:
                                return
                        }
                        for (n = 0, o = t.length; o > n; ++n) i = t[n], i && this.getDatasetMeta(i._datasetIndex).controller[r](i)
                    },
                    eventHandler: function(t) {
                        var a = this,
                            i = a.tooltip,
                            n = a.options || {},
                            o = n.hover,
                            r = n.tooltips;
                        return a.lastActive = a.lastActive || [], a.lastTooltipActive = a.lastTooltipActive || [], "mouseout" === t.type ? (a.active = [], a.tooltipActive = []) : (a.active = a.getElementsAtEventForMode(t, o.mode), a.tooltipActive = a.getElementsAtEventForMode(t, r.mode)), o.onHover && o.onHover.call(a, a.active), ("mouseup" === t.type || "click" === t.type) && (n.onClick && n.onClick.call(a, t, a.active), a.legend && a.legend.handleEvent && a.legend.handleEvent(t)), a.lastActive.length && a.updateHoverStyle(a.lastActive, o.mode, !1), a.active.length && o.mode && a.updateHoverStyle(a.active, o.mode, !0), (r.enabled || r.custom) && (i.initialize(), i._active = a.tooltipActive, i.update(!0)), i.pivot(), a.animating || e.arrayEquals(a.active, a.lastActive) && e.arrayEquals(a.tooltipActive, a.lastTooltipActive) || (a.stop(), (r.enabled || r.custom) && i.update(!0), a.render(o.animationDuration, !0)), a.lastActive = a.active, a.lastTooltipActive = a.tooltipActive, a
                    }
                })
            }
        }, {}],
        23: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = e.noop;
                t.DatasetController = function(t, e) {
                    this.initialize.call(this, t, e)
                }, e.extend(t.DatasetController.prototype, {
                    datasetElementType: null,
                    dataElementType: null,
                    initialize: function(t, e) {
                        var a = this;
                        a.chart = t, a.index = e, a.linkScales(), a.addElements()
                    },
                    updateIndex: function(t) {
                        this.index = t
                    },
                    linkScales: function() {
                        var t = this,
                            e = t.getMeta(),
                            a = t.getDataset();
                        null === e.xAxisID && (e.xAxisID = a.xAxisID || t.chart.options.scales.xAxes[0].id), null === e.yAxisID && (e.yAxisID = a.yAxisID || t.chart.options.scales.yAxes[0].id);
                    },
                    getDataset: function() {
                        return this.chart.data.datasets[this.index]
                    },
                    getMeta: function() {
                        return this.chart.getDatasetMeta(this.index)
                    },
                    getScaleForId: function(t) {
                        return this.chart.scales[t]
                    },
                    reset: function() {
                        this.update(!0)
                    },
                    createMetaDataset: function() {
                        var t = this,
                            e = t.datasetElementType;
                        return e && new e({
                            _chart: t.chart.chart,
                            _datasetIndex: t.index
                        })
                    },
                    createMetaData: function(t) {
                        var e = this,
                            a = e.dataElementType;
                        return a && new a({
                            _chart: e.chart.chart,
                            _datasetIndex: e.index,
                            _index: t
                        })
                    },
                    addElements: function() {
                        var t, e, a = this,
                            i = a.getMeta(),
                            n = a.getDataset().data || [],
                            o = i.data;
                        for (t = 0, e = n.length; e > t; ++t) o[t] = o[t] || a.createMetaData(i, t);
                        i.dataset = i.dataset || a.createMetaDataset()
                    },
                    addElementAndReset: function(t) {
                        var e = this,
                            a = e.createMetaData(t);
                        e.getMeta().data.splice(t, 0, a), e.updateElement(a, t, !0)
                    },
                    buildOrUpdateElements: function() {
                        var t = this.getMeta(),
                            e = t.data,
                            a = this.getDataset().data.length,
                            i = e.length;
                        if (i > a) e.splice(a, i - a);
                        else if (a > i)
                            for (var n = i; a > n; ++n) this.addElementAndReset(n)
                    },
                    update: a,
                    draw: function(t) {
                        var a = t || 1;
                        e.each(this.getMeta().data, function(t, e) {
                            t.transition(a).draw()
                        })
                    },
                    removeHoverStyle: function(t, a) {
                        var i = this.chart.data.datasets[t._datasetIndex],
                            n = t._index,
                            o = t.custom || {},
                            r = e.getValueAtIndexOrDefault,
                            l = (e.color, t._model);
                        l.backgroundColor = o.backgroundColor ? o.backgroundColor : r(i.backgroundColor, n, a.backgroundColor), l.borderColor = o.borderColor ? o.borderColor : r(i.borderColor, n, a.borderColor), l.borderWidth = o.borderWidth ? o.borderWidth : r(i.borderWidth, n, a.borderWidth)
                    },
                    setHoverStyle: function(t) {
                        var a = this.chart.data.datasets[t._datasetIndex],
                            i = t._index,
                            n = t.custom || {},
                            o = e.getValueAtIndexOrDefault,
                            r = (e.color, e.getHoverColor),
                            l = t._model;
                        l.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : o(a.hoverBackgroundColor, i, r(l.backgroundColor)), l.borderColor = n.hoverBorderColor ? n.hoverBorderColor : o(a.hoverBorderColor, i, r(l.borderColor)), l.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : o(a.hoverBorderWidth, i, l.borderWidth)
                    }
                }), t.DatasetController.extend = e.inherits
            }
        }, {}],
        24: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.elements = {}, t.Element = function(t) {
                    e.extend(this, t), this.initialize.apply(this, arguments)
                }, e.extend(t.Element.prototype, {
                    initialize: function() {
                        this.hidden = !1
                    },
                    pivot: function() {
                        var t = this;
                        return t._view || (t._view = e.clone(t._model)), t._start = e.clone(t._view), t
                    },
                    transition: function(t) {
                        var a = this;
                        return a._view || (a._view = e.clone(a._model)), 1 === t ? (a._view = a._model, a._start = null, a) : (a._start || a.pivot(), e.each(a._model, function(i, n) {
                            if ("_" === n[0]);
                            else if (a._view.hasOwnProperty(n))
                                if (i === a._view[n]);
                                else if ("string" == typeof i) try {
                                var o = e.color(a._model[n]).mix(e.color(a._start[n]), t);
                                a._view[n] = o.rgbString()
                            } catch (r) {
                                a._view[n] = i
                            } else if ("number" == typeof i) {
                                var l = void 0 !== a._start[n] && isNaN(a._start[n]) === !1 ? a._start[n] : 0;
                                a._view[n] = (a._model[n] - l) * t + l
                            } else a._view[n] = i;
                            else "number" != typeof i || isNaN(a._view[n]) ? a._view[n] = i : a._view[n] = i * t
                        }, a), a)
                    },
                    tooltipPosition: function() {
                        return {
                            x: this._model.x,
                            y: this._model.y
                        }
                    },
                    hasValue: function() {
                        return e.isNumber(this._model.x) && e.isNumber(this._model.y)
                    }
                }), t.Element.extend = e.inherits
            }
        }, {}],
        25: [function(t, e, a) {
            "use strict";
            var i = t(3);
            e.exports = function(t) {
                function e(t, e, a) {
                    var i;
                    return "string" == typeof t ? (i = parseInt(t, 10), -1 != t.indexOf("%") && (i = i / 100 * e.parentNode[a])) : i = t, i
                }

                function a(t) {
                    return void 0 !== t && null !== t && "none" !== t
                }

                function n(t, i, n) {
                    var o = document.defaultView,
                        r = t.parentNode,
                        l = o.getComputedStyle(t)[i],
                        s = o.getComputedStyle(r)[i],
                        d = a(l),
                        u = a(s),
                        c = Number.POSITIVE_INFINITY;
                    return d || u ? Math.min(d ? e(l, t, n) : c, u ? e(s, r, n) : c) : "none"
                }
                var o = t.helpers = {};
                o.each = function(t, e, a, i) {
                    var n, r;
                    if (o.isArray(t))
                        if (r = t.length, i)
                            for (n = r - 1; n >= 0; n--) e.call(a, t[n], n);
                        else
                            for (n = 0; r > n; n++) e.call(a, t[n], n);
                    else if ("object" == typeof t) {
                        var l = Object.keys(t);
                        for (r = l.length, n = 0; r > n; n++) e.call(a, t[l[n]], l[n])
                    }
                }, o.clone = function(t) {
                    var e = {};
                    return o.each(t, function(t, a) {
                        o.isArray(t) ? e[a] = t.slice(0) : "object" == typeof t && null !== t ? e[a] = o.clone(t) : e[a] = t
                    }), e
                }, o.extend = function(t) {
                    for (var e = function(e, a) {
                            t[a] = e
                        }, a = 1, i = arguments.length; i > a; a++) o.each(arguments[a], e);
                    return t
                }, o.configMerge = function(e) {
                    var a = o.clone(e);
                    return o.each(Array.prototype.slice.call(arguments, 1), function(e) {
                        o.each(e, function(e, i) {
                            if ("scales" === i) a[i] = o.scaleMerge(a.hasOwnProperty(i) ? a[i] : {}, e);
                            else if ("scale" === i) a[i] = o.configMerge(a.hasOwnProperty(i) ? a[i] : {}, t.scaleService.getScaleDefaults(e.type), e);
                            else if (a.hasOwnProperty(i) && o.isArray(a[i]) && o.isArray(e)) {
                                var n = a[i];
                                o.each(e, function(t, e) {
                                    e < n.length ? "object" == typeof n[e] && null !== n[e] && "object" == typeof t && null !== t ? n[e] = o.configMerge(n[e], t) : n[e] = t : n.push(t)
                                })
                            } else a.hasOwnProperty(i) && "object" == typeof a[i] && null !== a[i] && "object" == typeof e ? a[i] = o.configMerge(a[i], e) : a[i] = e
                        })
                    }), a
                }, o.scaleMerge = function(e, a) {
                    var i = o.clone(e);
                    return o.each(a, function(e, a) {
                        "xAxes" === a || "yAxes" === a ? i.hasOwnProperty(a) ? o.each(e, function(e, n) {
                            var r = o.getValueOrDefault(e.type, "xAxes" === a ? "category" : "linear"),
                                l = t.scaleService.getScaleDefaults(r);
                            n >= i[a].length || !i[a][n].type ? i[a].push(o.configMerge(l, e)) : e.type && e.type !== i[a][n].type ? i[a][n] = o.configMerge(i[a][n], l, e) : i[a][n] = o.configMerge(i[a][n], e)
                        }) : (i[a] = [], o.each(e, function(e) {
                            var n = o.getValueOrDefault(e.type, "xAxes" === a ? "category" : "linear");
                            i[a].push(o.configMerge(t.scaleService.getScaleDefaults(n), e))
                        })) : i.hasOwnProperty(a) && "object" == typeof i[a] && null !== i[a] && "object" == typeof e ? i[a] = o.configMerge(i[a], e) : i[a] = e
                    }), i
                }, o.getValueAtIndexOrDefault = function(t, e, a) {
                    return void 0 === t || null === t ? a : o.isArray(t) ? e < t.length ? t[e] : a : t
                }, o.getValueOrDefault = function(t, e) {
                    return void 0 === t ? e : t
                }, o.indexOf = Array.prototype.indexOf ? function(t, e) {
                    return t.indexOf(e)
                } : function(t, e) {
                    for (var a = 0, i = t.length; i > a; ++a)
                        if (t[a] === e) return a;
                    return -1
                }, o.where = function(t, e) {
                    if (o.isArray(t) && Array.prototype.filter) return t.filter(e);
                    var a = [];
                    return o.each(t, function(t) {
                        e(t) && a.push(t)
                    }), a
                }, o.findIndex = Array.prototype.findIndex ? function(t, e, a) {
                    return t.findIndex(e, a)
                } : function(t, e, a) {
                    a = void 0 === a ? t : a;
                    for (var i = 0, n = t.length; n > i; ++i)
                        if (e.call(a, t[i], i, t)) return i;
                    return -1
                }, o.findNextWhere = function(t, e, a) {
                    (void 0 === a || null === a) && (a = -1);
                    for (var i = a + 1; i < t.length; i++) {
                        var n = t[i];
                        if (e(n)) return n
                    }
                }, o.findPreviousWhere = function(t, e, a) {
                    (void 0 === a || null === a) && (a = t.length);
                    for (var i = a - 1; i >= 0; i--) {
                        var n = t[i];
                        if (e(n)) return n
                    }
                }, o.inherits = function(t) {
                    var e = this,
                        a = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
                            return e.apply(this, arguments)
                        },
                        i = function() {
                            this.constructor = a
                        };
                    return i.prototype = e.prototype, a.prototype = new i, a.extend = o.inherits, t && o.extend(a.prototype, t), a.__super__ = e.prototype, a
                }, o.noop = function() {}, o.uid = function() {
                    var t = 0;
                    return function() {
                        return t++
                    }
                }(), o.isNumber = function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                }, o.almostEquals = function(t, e, a) {
                    return Math.abs(t - e) < a
                }, o.max = function(t) {
                    return t.reduce(function(t, e) {
                        return isNaN(e) ? t : Math.max(t, e)
                    }, Number.NEGATIVE_INFINITY)
                }, o.min = function(t) {
                    return t.reduce(function(t, e) {
                        return isNaN(e) ? t : Math.min(t, e)
                    }, Number.POSITIVE_INFINITY)
                }, o.sign = Math.sign ? function(t) {
                    return Math.sign(t)
                } : function(t) {
                    return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1
                }, o.log10 = Math.log10 ? function(t) {
                    return Math.log10(t)
                } : function(t) {
                    return Math.log(t) / Math.LN10
                }, o.toRadians = function(t) {
                    return t * (Math.PI / 180)
                }, o.toDegrees = function(t) {
                    return t * (180 / Math.PI)
                }, o.getAngleFromPoint = function(t, e) {
                    var a = e.x - t.x,
                        i = e.y - t.y,
                        n = Math.sqrt(a * a + i * i),
                        o = Math.atan2(i, a);
                    return o < -.5 * Math.PI && (o += 2 * Math.PI), {
                        angle: o,
                        distance: n
                    }
                }, o.aliasPixel = function(t) {
                    return t % 2 === 0 ? 0 : .5
                }, o.splineCurve = function(t, e, a, i) {
                    var n = t.skip ? e : t,
                        o = e,
                        r = a.skip ? e : a,
                        l = Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2)),
                        s = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
                        d = l / (l + s),
                        u = s / (l + s);
                    d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
                    var c = i * d,
                        h = i * u;
                    return {
                        previous: {
                            x: o.x - c * (r.x - n.x),
                            y: o.y - c * (r.y - n.y)
                        },
                        next: {
                            x: o.x + h * (r.x - n.x),
                            y: o.y + h * (r.y - n.y)
                        }
                    }
                }, o.nextItem = function(t, e, a) {
                    return a ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
                }, o.previousItem = function(t, e, a) {
                    return a ? 0 >= e ? t[t.length - 1] : t[e - 1] : 0 >= e ? t[0] : t[e - 1]
                }, o.niceNum = function(t, e) {
                    var a, i = Math.floor(o.log10(t)),
                        n = t / Math.pow(10, i);
                    return a = e ? 1.5 > n ? 1 : 3 > n ? 2 : 7 > n ? 5 : 10 : 1 >= n ? 1 : 2 >= n ? 2 : 5 >= n ? 5 : 10, a * Math.pow(10, i)
                };
                var r = o.easingEffects = {
                    linear: function(t) {
                        return t
                    },
                    easeInQuad: function(t) {
                        return t * t
                    },
                    easeOutQuad: function(t) {
                        return -1 * t * (t - 2)
                    },
                    easeInOutQuad: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t : -0.5 * (--t * (t - 2) - 1)
                    },
                    easeInCubic: function(t) {
                        return t * t * t
                    },
                    easeOutCubic: function(t) {
                        return 1 * ((t = t / 1 - 1) * t * t + 1)
                    },
                    easeInOutCubic: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
                    },
                    easeInQuart: function(t) {
                        return t * t * t * t
                    },
                    easeOutQuart: function(t) {
                        return -1 * ((t = t / 1 - 1) * t * t * t - 1)
                    },
                    easeInOutQuart: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2)
                    },
                    easeInQuint: function(t) {
                        return 1 * (t /= 1) * t * t * t * t
                    },
                    easeOutQuint: function(t) {
                        return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
                    },
                    easeInOutQuint: function(t) {
                        return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
                    },
                    easeInSine: function(t) {
                        return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
                    },
                    easeOutSine: function(t) {
                        return 1 * Math.sin(t / 1 * (Math.PI / 2))
                    },
                    easeInOutSine: function(t) {
                        return -0.5 * (Math.cos(Math.PI * t / 1) - 1)
                    },
                    easeInExpo: function(t) {
                        return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
                    },
                    easeOutExpo: function(t) {
                        return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
                    },
                    easeInOutExpo: function(t) {
                        return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2)
                    },
                    easeInCirc: function(t) {
                        return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
                    },
                    easeOutCirc: function(t) {
                        return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
                    },
                    easeInOutCirc: function(t) {
                        return (t /= .5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                    },
                    easeInElastic: function(t) {
                        var e = 1.70158,
                            a = 0,
                            i = 1;
                        return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a)))
                    },
                    easeOutElastic: function(t) {
                        var e = 1.70158,
                            a = 0,
                            i = 1;
                        return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / a) + 1)
                    },
                    easeInOutElastic: function(t) {
                        var e = 1.70158,
                            a = 0,
                            i = 1;
                        return 0 === t ? 0 : 2 === (t /= .5) ? 1 : (a || (a = 1 * (.3 * 1.5)), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), 1 > t ? -.5 * (i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a)) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a) * .5 + 1)
                    },
                    easeInBack: function(t) {
                        var e = 1.70158;
                        return 1 * (t /= 1) * t * ((e + 1) * t - e)
                    },
                    easeOutBack: function(t) {
                        var e = 1.70158;
                        return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
                    },
                    easeInOutBack: function(t) {
                        var e = 1.70158;
                        return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2)
                    },
                    easeInBounce: function(t) {
                        return 1 - r.easeOutBounce(1 - t)
                    },
                    easeOutBounce: function(t) {
                        return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                    },
                    easeInOutBounce: function(t) {
                        return .5 > t ? .5 * r.easeInBounce(2 * t) : .5 * r.easeOutBounce(2 * t - 1) + .5
                    }
                };
                o.requestAnimFrame = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                        return window.setTimeout(t, 1e3 / 60)
                    }
                }(), o.cancelAnimFrame = function() {
                    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
                        return window.clearTimeout(t, 1e3 / 60)
                    }
                }(), o.getRelativePosition = function(t, e) {
                    var a, i, n = t.originalEvent || t,
                        r = t.currentTarget || t.srcElement,
                        l = r.getBoundingClientRect(),
                        s = n.touches;
                    s && s.length > 0 ? (a = s[0].clientX, i = s[0].clientY) : (a = n.clientX, i = n.clientY);
                    var d = parseFloat(o.getStyle(r, "padding-left")),
                        u = parseFloat(o.getStyle(r, "padding-top")),
                        c = parseFloat(o.getStyle(r, "padding-right")),
                        h = parseFloat(o.getStyle(r, "padding-bottom")),
                        f = l.right - l.left - d - c,
                        g = l.bottom - l.top - u - h;
                    return a = Math.round((a - l.left - d) / f * r.width / e.currentDevicePixelRatio), i = Math.round((i - l.top - u) / g * r.height / e.currentDevicePixelRatio), {
                        x: a,
                        y: i
                    }
                }, o.addEvent = function(t, e, a) {
                    t.addEventListener ? t.addEventListener(e, a) : t.attachEvent ? t.attachEvent("on" + e, a) : t["on" + e] = a
                }, o.removeEvent = function(t, e, a) {
                    t.removeEventListener ? t.removeEventListener(e, a, !1) : t.detachEvent ? t.detachEvent("on" + e, a) : t["on" + e] = o.noop
                }, o.bindEvents = function(t, e, a) {
                    var i = t.events = t.events || {};
                    o.each(e, function(e) {
                        i[e] = function() {
                            a.apply(t, arguments)
                        }, o.addEvent(t.chart.canvas, e, i[e])
                    })
                }, o.unbindEvents = function(t, e) {
                    var a = t.chart.canvas;
                    o.each(e, function(t, e) {
                        o.removeEvent(a, e, t)
                    })
                }, o.getConstraintWidth = function(t) {
                    return n(t, "max-width", "clientWidth")
                }, o.getConstraintHeight = function(t) {
                    return n(t, "max-height", "clientHeight")
                }, o.getMaximumWidth = function(t) {
                    var e = t.parentNode,
                        a = parseInt(o.getStyle(e, "padding-left")) + parseInt(o.getStyle(e, "padding-right")),
                        i = e.clientWidth - a,
                        n = o.getConstraintWidth(t);
                    return isNaN(n) ? i : Math.min(i, n)
                }, o.getMaximumHeight = function(t) {
                    var e = t.parentNode,
                        a = parseInt(o.getStyle(e, "padding-top")) + parseInt(o.getStyle(e, "padding-bottom")),
                        i = e.clientHeight - a,
                        n = o.getConstraintHeight(t);
                    return isNaN(n) ? i : Math.min(i, n)
                }, o.getStyle = function(t, e) {
                    return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
                }, o.retinaScale = function(t) {
                    var e = t.ctx,
                        a = t.canvas,
                        i = a.width,
                        n = a.height,
                        o = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
                    1 !== o && (a.height = n * o, a.width = i * o, e.scale(o, o), t.originalDevicePixelRatio = t.originalDevicePixelRatio || o), a.style.width = i + "px", a.style.height = n + "px"
                }, o.clear = function(t) {
                    t.ctx.clearRect(0, 0, t.width, t.height)
                }, o.fontString = function(t, e, a) {
                    return e + " " + t + "px " + a
                }, o.longestText = function(t, e, a, i) {
                    i = i || {};
                    var n = i.data = i.data || {},
                        r = i.garbageCollect = i.garbageCollect || [];
                    i.font !== e && (n = i.data = {}, r = i.garbageCollect = [], i.font = e), t.font = e;
                    var l = 0;
                    o.each(a, function(e) {
                        void 0 !== e && null !== e && o.isArray(e) !== !0 ? l = o.measureText(t, n, r, l, e) : o.isArray(e) && o.each(e, function(e) {
                            void 0 === e || null === e || o.isArray(e) || (l = o.measureText(t, n, r, l, e))
                        })
                    });
                    var s = r.length / 2;
                    if (s > a.length) {
                        for (var d = 0; s > d; d++) delete n[r[d]];
                        r.splice(0, s)
                    }
                    return l
                }, o.measureText = function(t, e, a, i, n) {
                    var o = e[n];
                    return o || (o = e[n] = t.measureText(n).width, a.push(n)), o > i && (i = o), i
                }, o.numberOfLabelLines = function(t) {
                    var e = 1;
                    return o.each(t, function(t) {
                        o.isArray(t) && t.length > e && (e = t.length)
                    }), e
                }, o.drawRoundedRectangle = function(t, e, a, i, n, o) {
                    t.beginPath(), t.moveTo(e + o, a), t.lineTo(e + i - o, a), t.quadraticCurveTo(e + i, a, e + i, a + o), t.lineTo(e + i, a + n - o), t.quadraticCurveTo(e + i, a + n, e + i - o, a + n), t.lineTo(e + o, a + n), t.quadraticCurveTo(e, a + n, e, a + n - o), t.lineTo(e, a + o), t.quadraticCurveTo(e, a, e + o, a), t.closePath()
                }, o.color = function(e) {
                    return i ? i(e instanceof CanvasGradient ? t.defaults.global.defaultColor : e) : (console.log("Color.js not found!"), e)
                }, o.addResizeListener = function(t, e) {
                    var a = document.createElement("iframe"),
                        i = "chartjs-hidden-iframe";
                    a.classlist ? a.classlist.add(i) : a.setAttribute("class", i);
                    var n = a.style;
                    n.width = "100%", n.display = "block", n.border = 0, n.height = 0, n.margin = 0, n.position = "absolute", n.left = 0, n.right = 0, n.top = 0, n.bottom = 0, t.insertBefore(a, t.firstChild), (a.contentWindow || a).onresize = function() {
                        e && e()
                    }
                }, o.removeResizeListener = function(t) {
                    var e = t.querySelector(".chartjs-hidden-iframe");
                    e && e.parentNode.removeChild(e)
                }, o.isArray = Array.isArray ? function(t) {
                    return Array.isArray(t)
                } : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }, o.arrayEquals = function(t, e) {
                    var a, i, n, r;
                    if (!t || !e || t.length != e.length) return !1;
                    for (a = 0, i = t.length; i > a; ++a)
                        if (n = t[a], r = e[a], n instanceof Array && r instanceof Array) {
                            if (!o.arrayEquals(n, r)) return !1
                        } else if (n != r) return !1;
                    return !0
                }, o.callCallback = function(t, e, a) {
                    t && "function" == typeof t.call && t.apply(a, e)
                }, o.getHoverColor = function(t) {
                    return t instanceof CanvasPattern ? t : o.color(t).saturate(.5).darken(.1).rgbString()
                }
            }
        }, {
            3: 3
        }],
        26: [function(t, e, a) {
            "use strict";
            e.exports = function() {
                var t = function(e, a) {
                    var i = this,
                        n = t.helpers;
                    return i.config = a, e.length && e[0].getContext && (e = e[0]), e.getContext && (e = e.getContext("2d")), i.ctx = e, i.canvas = e.canvas, e.canvas.style.display = e.canvas.style.display || "block", i.width = e.canvas.width || parseInt(n.getStyle(e.canvas, "width"), 10) || n.getMaximumWidth(e.canvas), i.height = e.canvas.height || parseInt(n.getStyle(e.canvas, "height"), 10) || n.getMaximumHeight(e.canvas), i.aspectRatio = i.width / i.height, (isNaN(i.aspectRatio) || isFinite(i.aspectRatio) === !1) && (i.aspectRatio = void 0 !== a.aspectRatio ? a.aspectRatio : 2), i.originalCanvasStyleWidth = e.canvas.style.width, i.originalCanvasStyleHeight = e.canvas.style.height, n.retinaScale(i), a && (i.controller = new t.Controller(i)), n.addResizeListener(e.canvas.parentNode, function() {
                        i.controller && i.controller.config.options.responsive && i.controller.resize()
                    }), i.controller ? i.controller : i
                };
                return t.defaults = {
                    global: {
                        responsive: !0,
                        responsiveAnimationDuration: 0,
                        maintainAspectRatio: !0,
                        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
                        hover: {
                            onHover: null,
                            mode: "single",
                            animationDuration: 400
                        },
                        onClick: null,
                        defaultColor: "rgba(0,0,0,0.1)",
                        defaultFontColor: "#666",
                        defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        defaultFontSize: 12,
                        defaultFontStyle: "normal",
                        showLines: !0,
                        elements: {},
                        legendCallback: function(t) {
                            var e = [];
                            e.push('<ul class="' + t.id + '-legend">');
                            for (var a = 0; a < t.data.datasets.length; a++) e.push('<li><span style="background-color:' + t.data.datasets[a].backgroundColor + '"></span>'), t.data.datasets[a].label && e.push(t.data.datasets[a].label), e.push("</li>");
                            return e.push("</ul>"), e.join("")
                        }
                    }
                }, t.Chart = t, t
            }
        }, {}],
        27: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.layoutService = {
                    defaults: {},
                    addBox: function(t, e) {
                        t.boxes || (t.boxes = []), t.boxes.push(e)
                    },
                    removeBox: function(t, e) {
                        t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1)
                    },
                    update: function(t, a, i) {
                        function n(t) {
                            var e, a = t.isHorizontal();
                            a ? (e = t.update(t.options.fullWidth ? p : k, y), S -= e.height) : (e = t.update(x, v), k -= e.width), w.push({
                                horizontal: a,
                                minSize: e,
                                box: t
                            })
                        }

                        function o(t) {
                            var a = e.findNextWhere(w, function(e) {
                                return e.box === t
                            });
                            if (a)
                                if (t.isHorizontal()) {
                                    var i = {
                                        left: C,
                                        right: M,
                                        top: 0,
                                        bottom: 0
                                    };
                                    t.update(t.options.fullWidth ? p : k, m / 2, i)
                                } else t.update(a.minSize.width, S)
                        }

                        function r(t) {
                            var a = e.findNextWhere(w, function(e) {
                                    return e.box === t
                                }),
                                i = {
                                    left: 0,
                                    right: 0,
                                    top: D,
                                    bottom: A
                                };
                            a && t.update(a.minSize.width, S, i)
                        }

                        function l(t) {
                            t.isHorizontal() ? (t.left = t.options.fullWidth ? s : C, t.right = t.options.fullWidth ? a - s : C + k, t.top = P, t.bottom = P + t.height, P = t.bottom) : (t.left = T, t.right = T + t.width, t.top = D, t.bottom = D + S, T = t.right)
                        }
                        if (t) {
                            var s = 0,
                                d = 0,
                                u = e.where(t.boxes, function(t) {
                                    return "left" === t.options.position
                                }),
                                c = e.where(t.boxes, function(t) {
                                    return "right" === t.options.position
                                }),
                                h = e.where(t.boxes, function(t) {
                                    return "top" === t.options.position
                                }),
                                f = e.where(t.boxes, function(t) {
                                    return "bottom" === t.options.position
                                }),
                                g = e.where(t.boxes, function(t) {
                                    return "chartArea" === t.options.position
                                });
                            h.sort(function(t, e) {
                                return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0)
                            }), f.sort(function(t, e) {
                                return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0)
                            });
                            var p = a - 2 * s,
                                m = i - 2 * d,
                                b = p / 2,
                                v = m / 2,
                                x = (a - b) / (u.length + c.length),
                                y = (i - v) / (h.length + f.length),
                                k = p,
                                S = m,
                                w = [];
                            e.each(u.concat(c, h, f), n);
                            var C = s,
                                M = s,
                                D = d,
                                A = d;
                            e.each(u.concat(c), o), e.each(u, function(t) {
                                C += t.width
                            }), e.each(c, function(t) {
                                M += t.width
                            }), e.each(h.concat(f), o), e.each(h, function(t) {
                                D += t.height
                            }), e.each(f, function(t) {
                                A += t.height
                            }), e.each(u.concat(c), r), C = s, M = s, D = d, A = d, e.each(u, function(t) {
                                C += t.width
                            }), e.each(c, function(t) {
                                M += t.width
                            }), e.each(h, function(t) {
                                D += t.height
                            }), e.each(f, function(t) {
                                A += t.height
                            });
                            var I = i - D - A,
                                F = a - C - M;
                            (F !== k || I !== S) && (e.each(u, function(t) {
                                t.height = I
                            }), e.each(c, function(t) {
                                t.height = I
                            }), e.each(h, function(t) {
                                t.options.fullWidth || (t.width = F)
                            }), e.each(f, function(t) {
                                t.options.fullWidth || (t.width = F)
                            }), S = I, k = F);
                            var T = s,
                                P = d;
                            e.each(u.concat(h), l), T += k, P += S, e.each(c, l), e.each(f, l), t.chartArea = {
                                left: C,
                                top: D,
                                right: C + k,
                                bottom: D + S
                            }, e.each(g, function(e) {
                                e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(k, S)
                            })
                        }
                    }
                }
            }
        }, {}],
        28: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = e.noop;
                t.defaults.global.legend = {
                    display: !0,
                    position: "top",
                    fullWidth: !0,
                    reverse: !1,
                    onClick: function(t, e) {
                        var a = e.datasetIndex,
                            i = this.chart,
                            n = i.getDatasetMeta(a);
                        n.hidden = null === n.hidden ? !i.data.datasets[a].hidden : null, i.update()
                    },
                    labels: {
                        boxWidth: 40,
                        padding: 10,
                        generateLabels: function(t) {
                            var a = t.data;
                            return e.isArray(a.datasets) ? a.datasets.map(function(a, i) {
                                return {
                                    text: a.label,
                                    fillStyle: e.isArray(a.backgroundColor) ? a.backgroundColor[0] : a.backgroundColor,
                                    hidden: !t.isDatasetVisible(i),
                                    lineCap: a.borderCapStyle,
                                    lineDash: a.borderDash,
                                    lineDashOffset: a.borderDashOffset,
                                    lineJoin: a.borderJoinStyle,
                                    lineWidth: a.borderWidth,
                                    strokeStyle: a.borderColor,
                                    datasetIndex: i
                                }
                            }, this) : []
                        }
                    }
                }, t.Legend = t.Element.extend({
                    initialize: function(t) {
                        e.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
                    },
                    beforeUpdate: a,
                    update: function(t, e, a) {
                        var i = this;
                        return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = a, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
                    },
                    afterUpdate: a,
                    beforeSetDimensions: a,
                    setDimensions: function() {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                            width: 0,
                            height: 0
                        }
                    },
                    afterSetDimensions: a,
                    beforeBuildLabels: a,
                    buildLabels: function() {
                        var t = this;
                        t.legendItems = t.options.labels.generateLabels.call(t, t.chart), t.options.reverse && t.legendItems.reverse()
                    },
                    afterBuildLabels: a,
                    beforeFit: a,
                    fit: function() {
                        var a = this,
                            i = a.options,
                            n = i.labels,
                            o = i.display,
                            r = a.ctx,
                            l = t.defaults.global,
                            s = e.getValueOrDefault,
                            d = s(n.fontSize, l.defaultFontSize),
                            u = s(n.fontStyle, l.defaultFontStyle),
                            c = s(n.fontFamily, l.defaultFontFamily),
                            h = e.fontString(d, u, c),
                            f = a.legendHitBoxes = [],
                            g = a.minSize,
                            p = a.isHorizontal();
                        if (p ? (g.width = a.maxWidth, g.height = o ? 10 : 0) : (g.width = o ? 10 : 0, g.height = a.maxHeight), o)
                            if (r.font = h, p) {
                                var m = a.lineWidths = [0],
                                    b = a.legendItems.length ? d + n.padding : 0;
                                r.textAlign = "left", r.textBaseline = "top", e.each(a.legendItems, function(t, e) {
                                    var i = n.boxWidth + d / 2 + r.measureText(t.text).width;
                                    m[m.length - 1] + i + n.padding >= a.width && (b += d + n.padding, m[m.length] = a.left), f[e] = {
                                        left: 0,
                                        top: 0,
                                        width: i,
                                        height: d
                                    }, m[m.length - 1] += i + n.padding
                                }), g.height += b
                            } else {
                                var v = n.padding,
                                    x = a.columnWidths = [],
                                    y = n.padding,
                                    k = 0,
                                    S = 0,
                                    w = d + v;
                                e.each(a.legendItems, function(t, e) {
                                    var a = n.boxWidth + d / 2 + r.measureText(t.text).width;
                                    S + w > g.height && (y += k + n.padding, x.push(k), k = 0, S = 0), k = Math.max(k, a), S += w, f[e] = {
                                        left: 0,
                                        top: 0,
                                        width: a,
                                        height: d
                                    }
                                }), y += k, x.push(k), g.width += y
                            } a.width = g.width, a.height = g.height
                    },
                    afterFit: a,
                    isHorizontal: function() {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    draw: function() {
                        var a = this,
                            i = a.options,
                            n = i.labels,
                            o = t.defaults.global,
                            r = o.elements.line,
                            l = a.width,
                            s = (a.height, a.lineWidths);
                        if (i.display) {
                            var d, u = a.ctx,
                                c = e.getValueOrDefault,
                                h = c(n.fontColor, o.defaultFontColor),
                                f = c(n.fontSize, o.defaultFontSize),
                                g = c(n.fontStyle, o.defaultFontStyle),
                                p = c(n.fontFamily, o.defaultFontFamily),
                                m = e.fontString(f, g, p);
                            u.textAlign = "left", u.textBaseline = "top", u.lineWidth = .5, u.strokeStyle = h, u.fillStyle = h, u.font = m;
                            var b = n.boxWidth,
                                v = a.legendHitBoxes,
                                x = function(t, e, a) {
                                    u.save(), u.fillStyle = c(a.fillStyle, o.defaultColor), u.lineCap = c(a.lineCap, r.borderCapStyle), u.lineDashOffset = c(a.lineDashOffset, r.borderDashOffset), u.lineJoin = c(a.lineJoin, r.borderJoinStyle), u.lineWidth = c(a.lineWidth, r.borderWidth), u.strokeStyle = c(a.strokeStyle, o.defaultColor), u.setLineDash && u.setLineDash(c(a.lineDash, r.borderDash)), u.strokeRect(t, e, b, f), u.fillRect(t, e, b, f), u.restore()
                                },
                                y = function(t, e, a, i) {
                                    u.fillText(a.text, b + f / 2 + t, e), a.hidden && (u.beginPath(), u.lineWidth = 2, u.moveTo(b + f / 2 + t, e + f / 2), u.lineTo(b + f / 2 + t + i, e + f / 2), u.stroke())
                                },
                                k = a.isHorizontal();
                            d = k ? {
                                x: a.left + (l - s[0]) / 2,
                                y: a.top + n.padding,
                                line: 0
                            } : {
                                x: a.left + n.padding,
                                y: a.top,
                                line: 0
                            };
                            var S = f + n.padding;
                            e.each(a.legendItems, function(t, e) {
                                var i = u.measureText(t.text).width,
                                    o = b + f / 2 + i,
                                    r = d.x,
                                    c = d.y;
                                k ? r + o >= l && (c = d.y += f + n.padding, d.line++, r = d.x = a.left + (l - s[d.line]) / 2) : c + S > a.bottom && (r = d.x = r + a.columnWidths[d.line] + n.padding, c = d.y = a.top, d.line++), x(r, c, t), v[e].left = r, v[e].top = c, y(r, c, t, i), k ? d.x += o + n.padding : d.y += S
                            })
                        }
                    },
                    handleEvent: function(t) {
                        var a = this,
                            i = e.getRelativePosition(t, a.chart.chart),
                            n = i.x,
                            o = i.y,
                            r = a.options;
                        if (n >= a.left && n <= a.right && o >= a.top && o <= a.bottom)
                            for (var l = a.legendHitBoxes, s = 0; s < l.length; ++s) {
                                var d = l[s];
                                if (n >= d.left && n <= d.left + d.width && o >= d.top && o <= d.top + d.height) {
                                    r.onClick && r.onClick.call(a, t, a.legendItems[s]);
                                    break
                                }
                            }
                    }
                }), t.plugins.register({
                    beforeInit: function(e) {
                        var a = e.options,
                            i = a.legend;
                        i && (e.legend = new t.Legend({
                            ctx: e.chart.ctx,
                            options: i,
                            chart: e
                        }), t.layoutService.addBox(e, e.legend))
                    }
                })
            }
        }, {}],
        29: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers.noop;
                t.plugins = {
                    _plugins: [],
                    register: function(t) {
                        var e = this._plugins;
                        [].concat(t).forEach(function(t) {
                            -1 === e.indexOf(t) && e.push(t)
                        })
                    },
                    unregister: function(t) {
                        var e = this._plugins;
                        [].concat(t).forEach(function(t) {
                            var a = e.indexOf(t); - 1 !== a && e.splice(a, 1)
                        })
                    },
                    clear: function() {
                        this._plugins = []
                    },
                    count: function() {
                        return this._plugins.length
                    },
                    getAll: function() {
                        return this._plugins
                    },
                    notify: function(t, e) {
                        var a, i, n = this._plugins,
                            o = n.length;
                        for (a = 0; o > a; ++a)
                            if (i = n[a], "function" == typeof i[t] && i[t].apply(i, e || []) === !1) return !1;
                        return !0
                    }
                }, t.PluginBase = t.Element.extend({
                    beforeInit: e,
                    afterInit: e,
                    beforeUpdate: e,
                    afterUpdate: e,
                    beforeDraw: e,
                    afterDraw: e,
                    destroy: e
                }), t.pluginService = t.plugins
            }
        }, {}],
        30: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.scale = {
                    display: !0,
                    position: "left",
                    gridLines: {
                        display: !0,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1,
                        drawBorder: !0,
                        drawOnChartArea: !0,
                        drawTicks: !0,
                        tickMarkLength: 10,
                        zeroLineWidth: 1,
                        zeroLineColor: "rgba(0,0,0,0.25)",
                        offsetGridLines: !1
                    },
                    scaleLabel: {
                        labelString: "",
                        display: !1
                    },
                    ticks: {
                        beginAtZero: !1,
                        minRotation: 0,
                        maxRotation: 50,
                        mirror: !1,
                        padding: 10,
                        reverse: !1,
                        display: !0,
                        autoSkip: !0,
                        autoSkipPadding: 0,
                        labelOffset: 0,
                        callback: function(t) {
                            return e.isArray(t) ? t : "" + t
                        }
                    }
                }, t.Scale = t.Element.extend({
                    beforeUpdate: function() {
                        e.callCallback(this.options.beforeUpdate, [this])
                    },
                    update: function(t, a, i) {
                        var n = this;
                        return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = a, n.margins = e.extend({
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }, i), n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeDataLimits(), n.determineDataLimits(), n.afterDataLimits(), n.beforeBuildTicks(), n.buildTicks(), n.afterBuildTicks(), n.beforeTickToLabelConversion(), n.convertTicksToLabels(), n.afterTickToLabelConversion(), n.beforeCalculateTickRotation(), n.calculateTickRotation(), n.afterCalculateTickRotation(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
                    },
                    afterUpdate: function() {
                        e.callCallback(this.options.afterUpdate, [this])
                    },
                    beforeSetDimensions: function() {
                        e.callCallback(this.options.beforeSetDimensions, [this])
                    },
                    setDimensions: function() {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0
                    },
                    afterSetDimensions: function() {
                        e.callCallback(this.options.afterSetDimensions, [this])
                    },
                    beforeDataLimits: function() {
                        e.callCallback(this.options.beforeDataLimits, [this])
                    },
                    determineDataLimits: e.noop,
                    afterDataLimits: function() {
                        e.callCallback(this.options.afterDataLimits, [this])
                    },
                    beforeBuildTicks: function() {
                        e.callCallback(this.options.beforeBuildTicks, [this])
                    },
                    buildTicks: e.noop,
                    afterBuildTicks: function() {
                        e.callCallback(this.options.afterBuildTicks, [this])
                    },
                    beforeTickToLabelConversion: function() {
                        e.callCallback(this.options.beforeTickToLabelConversion, [this])
                    },
                    convertTicksToLabels: function() {
                        var t = this;
                        t.ticks = t.ticks.map(function(e, a, i) {
                            return t.options.ticks.userCallback ? t.options.ticks.userCallback(e, a, i) : t.options.ticks.callback(e, a, i)
                        }, t)
                    },
                    afterTickToLabelConversion: function() {
                        e.callCallback(this.options.afterTickToLabelConversion, [this])
                    },
                    beforeCalculateTickRotation: function() {
                        e.callCallback(this.options.beforeCalculateTickRotation, [this])
                    },
                    calculateTickRotation: function() {
                        var a = this,
                            i = a.ctx,
                            n = t.defaults.global,
                            o = a.options.ticks,
                            r = e.getValueOrDefault(o.fontSize, n.defaultFontSize),
                            l = e.getValueOrDefault(o.fontStyle, n.defaultFontStyle),
                            s = e.getValueOrDefault(o.fontFamily, n.defaultFontFamily),
                            d = e.fontString(r, l, s);
                        i.font = d;
                        var u, c = i.measureText(a.ticks[0]).width,
                            h = i.measureText(a.ticks[a.ticks.length - 1]).width;
                        if (a.labelRotation = o.minRotation || 0, a.paddingRight = 0, a.paddingLeft = 0, a.options.display && a.isHorizontal()) {
                            a.paddingRight = h / 2 + 3, a.paddingLeft = c / 2 + 3, a.longestTextCache || (a.longestTextCache = {});
                            for (var f, g, p = e.longestText(i, d, a.ticks, a.longestTextCache), m = p, b = a.getPixelForTick(1) - a.getPixelForTick(0) - 6; m > b && a.labelRotation < o.maxRotation;) {
                                if (f = Math.cos(e.toRadians(a.labelRotation)), g = Math.sin(e.toRadians(a.labelRotation)), u = f * c, u + r / 2 > a.yLabelWidth && (a.paddingLeft = u + r / 2), a.paddingRight = r / 2, g * p > a.maxHeight) {
                                    a.labelRotation--;
                                    break
                                }
                                a.labelRotation++, m = f * p
                            }
                        }
                        a.margins && (a.paddingLeft = Math.max(a.paddingLeft - a.margins.left, 0), a.paddingRight = Math.max(a.paddingRight - a.margins.right, 0))
                    },
                    afterCalculateTickRotation: function() {
                        e.callCallback(this.options.afterCalculateTickRotation, [this])
                    },
                    beforeFit: function() {
                        e.callCallback(this.options.beforeFit, [this])
                    },
                    fit: function() {
                        var a = this,
                            i = a.minSize = {
                                width: 0,
                                height: 0
                            },
                            n = a.options,
                            o = t.defaults.global,
                            r = n.ticks,
                            l = n.scaleLabel,
                            s = n.display,
                            d = a.isHorizontal(),
                            u = e.getValueOrDefault(r.fontSize, o.defaultFontSize),
                            c = e.getValueOrDefault(r.fontStyle, o.defaultFontStyle),
                            h = e.getValueOrDefault(r.fontFamily, o.defaultFontFamily),
                            f = e.fontString(u, c, h),
                            g = e.getValueOrDefault(l.fontSize, o.defaultFontSize),
                            p = e.getValueOrDefault(l.fontStyle, o.defaultFontStyle),
                            m = e.getValueOrDefault(l.fontFamily, o.defaultFontFamily),
                            b = (e.fontString(g, p, m), n.gridLines.tickMarkLength);
                        if (d ? i.width = a.isFullWidth() ? a.maxWidth - a.margins.left - a.margins.right : a.maxWidth : i.width = s ? b : 0, d ? i.height = s ? b : 0 : i.height = a.maxHeight, l.display && s && (d ? i.height += 1.5 * g : i.width += 1.5 * g), r.display && s) {
                            a.longestTextCache || (a.longestTextCache = {});
                            var v = e.longestText(a.ctx, f, a.ticks, a.longestTextCache),
                                x = e.numberOfLabelLines(a.ticks),
                                y = .5 * u;
                            if (d) {
                                a.longestLabelWidth = v;
                                var k = Math.sin(e.toRadians(a.labelRotation)) * a.longestLabelWidth + u * x + y * x;
                                i.height = Math.min(a.maxHeight, i.height + k), a.ctx.font = f;
                                var S = a.ctx.measureText(a.ticks[0]).width,
                                    w = a.ctx.measureText(a.ticks[a.ticks.length - 1]).width,
                                    C = Math.cos(e.toRadians(a.labelRotation)),
                                    M = Math.sin(e.toRadians(a.labelRotation));
                                a.paddingLeft = 0 !== a.labelRotation ? C * S + 3 : S / 2 + 3, a.paddingRight = 0 !== a.labelRotation ? M * (u / 2) + 3 : w / 2 + 3
                            } else {
                                var D = a.maxWidth - i.width,
                                    A = r.mirror;
                                A ? v = 0 : v += a.options.ticks.padding, D > v ? i.width += v : i.width = a.maxWidth, a.paddingTop = u / 2, a.paddingBottom = u / 2
                            }
                        }
                        a.margins && (a.paddingLeft = Math.max(a.paddingLeft - a.margins.left, 0), a.paddingTop = Math.max(a.paddingTop - a.margins.top, 0), a.paddingRight = Math.max(a.paddingRight - a.margins.right, 0), a.paddingBottom = Math.max(a.paddingBottom - a.margins.bottom, 0)), a.width = i.width, a.height = i.height
                    },
                    afterFit: function() {
                        e.callCallback(this.options.afterFit, [this])
                    },
                    isHorizontal: function() {
                        return "top" === this.options.position || "bottom" === this.options.position
                    },
                    isFullWidth: function() {
                        return this.options.fullWidth
                    },
                    getRightValue: function a(t) {
                        return null === t || "undefined" == typeof t ? NaN : "number" == typeof t && isNaN(t) ? NaN : "object" == typeof t ? t instanceof Date || t.isValid ? t : a(this.isHorizontal() ? t.x : t.y) : t
                    },
                    getLabelForIndex: e.noop,
                    getPixelForValue: e.noop,
                    getValueForPixel: e.noop,
                    getPixelForTick: function(t, e) {
                        var a = this;
                        if (a.isHorizontal()) {
                            var i = a.width - (a.paddingLeft + a.paddingRight),
                                n = i / Math.max(a.ticks.length - (a.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                o = n * t + a.paddingLeft;
                            e && (o += n / 2);
                            var r = a.left + Math.round(o);
                            return r += a.isFullWidth() ? a.margins.left : 0
                        }
                        var l = a.height - (a.paddingTop + a.paddingBottom);
                        return a.top + t * (l / (a.ticks.length - 1))
                    },
                    getPixelForDecimal: function(t) {
                        var e = this;
                        if (e.isHorizontal()) {
                            var a = e.width - (e.paddingLeft + e.paddingRight),
                                i = a * t + e.paddingLeft,
                                n = e.left + Math.round(i);
                            return n += e.isFullWidth() ? e.margins.left : 0
                        }
                        return e.top + t * e.height
                    },
                    getBasePixel: function() {
                        var t = this,
                            e = t.min,
                            a = t.max;
                        return t.getPixelForValue(t.beginAtZero ? 0 : 0 > e && 0 > a ? a : e > 0 && a > 0 ? e : 0)
                    },
                    draw: function(a) {
                        var i = this,
                            n = i.options;
                        if (n.display) {
                            var o, r, l = i.ctx,
                                s = t.defaults.global,
                                d = n.ticks,
                                u = n.gridLines,
                                c = n.scaleLabel,
                                h = 0 !== i.labelRotation,
                                f = d.autoSkip,
                                g = i.isHorizontal();
                            d.maxTicksLimit && (r = d.maxTicksLimit);
                            var p = e.getValueOrDefault(d.fontColor, s.defaultFontColor),
                                m = e.getValueOrDefault(d.fontSize, s.defaultFontSize),
                                b = e.getValueOrDefault(d.fontStyle, s.defaultFontStyle),
                                v = e.getValueOrDefault(d.fontFamily, s.defaultFontFamily),
                                x = e.fontString(m, b, v),
                                y = u.tickMarkLength,
                                k = e.getValueOrDefault(c.fontColor, s.defaultFontColor),
                                S = e.getValueOrDefault(c.fontSize, s.defaultFontSize),
                                w = e.getValueOrDefault(c.fontStyle, s.defaultFontStyle),
                                C = e.getValueOrDefault(c.fontFamily, s.defaultFontFamily),
                                M = e.fontString(S, w, C),
                                D = e.toRadians(i.labelRotation),
                                A = Math.cos(D),
                                I = (Math.sin(D), i.longestLabelWidth * A);
                            l.fillStyle = p;
                            var F = [];
                            if (g) {
                                if (o = !1, h && (I /= 2), (I + d.autoSkipPadding) * i.ticks.length > i.width - (i.paddingLeft + i.paddingRight) && (o = 1 + Math.floor((I + d.autoSkipPadding) * i.ticks.length / (i.width - (i.paddingLeft + i.paddingRight)))), r && i.ticks.length > r)
                                    for (; !o || i.ticks.length / (o || 1) > r;) o || (o = 1), o += 1;
                                f || (o = !1)
                            }
                            var T = "right" === n.position ? i.left : i.right - y,
                                P = "right" === n.position ? i.left + y : i.right,
                                _ = "bottom" === n.position ? i.top : i.bottom - y,
                                R = "bottom" === n.position ? i.top + y : i.bottom;
                            if (e.each(i.ticks, function(t, r) {
                                    if (void 0 !== t && null !== t) {
                                        var l = i.ticks.length === r + 1,
                                            s = o > 1 && r % o > 0 || r % o === 0 && r + o >= i.ticks.length;
                                        if ((!s || l) && void 0 !== t && null !== t) {
                                            var c, f;
                                            r === ("undefined" != typeof i.zeroLineIndex ? i.zeroLineIndex : 0) ? (c = u.zeroLineWidth, f = u.zeroLineColor) : (c = e.getValueAtIndexOrDefault(u.lineWidth, r), f = e.getValueAtIndexOrDefault(u.color, r));
                                            var p, m, b, v, x, k, S, w, C, M, A, I = "middle";
                                            if (g) {
                                                h || (I = "top" === n.position ? "bottom" : "top"), A = h ? "right" : "center";
                                                var V = i.getPixelForTick(r) + e.aliasPixel(c);
                                                C = i.getPixelForTick(r, u.offsetGridLines) + d.labelOffset, M = h ? i.top + 12 : "top" === n.position ? i.bottom - y : i.top + y, p = b = x = S = V, m = _, v = R, k = a.top, w = a.bottom
                                            } else {
                                                "left" === n.position ? d.mirror ? (C = i.right + d.padding, A = "left") : (C = i.right - d.padding, A = "right") : d.mirror ? (C = i.left - d.padding, A = "right") : (C = i.left + d.padding, A = "left");
                                                var O = i.getPixelForTick(r);
                                                O += e.aliasPixel(c), M = i.getPixelForTick(r, u.offsetGridLines), p = T, b = P, x = a.left, S = a.right, m = v = k = w = O
                                            }
                                            F.push({
                                                tx1: p,
                                                ty1: m,
                                                tx2: b,
                                                ty2: v,
                                                x1: x,
                                                y1: k,
                                                x2: S,
                                                y2: w,
                                                labelX: C,
                                                labelY: M,
                                                glWidth: c,
                                                glColor: f,
                                                rotation: -1 * D,
                                                label: t,
                                                textBaseline: I,
                                                textAlign: A
                                            })
                                        }
                                    }
                                }), e.each(F, function(t) {
                                    if (u.display && (l.lineWidth = t.glWidth, l.strokeStyle = t.glColor, l.beginPath(), u.drawTicks && (l.moveTo(t.tx1, t.ty1), l.lineTo(t.tx2, t.ty2)), u.drawOnChartArea && (l.moveTo(t.x1, t.y1), l.lineTo(t.x2, t.y2)), l.stroke()), d.display) {
                                        l.save(), l.translate(t.labelX, t.labelY), l.rotate(t.rotation), l.font = x, l.textBaseline = t.textBaseline, l.textAlign = t.textAlign;
                                        var a = t.label;
                                        if (e.isArray(a))
                                            for (var i = 0, n = 0; i < a.length; ++i) l.fillText("" + a[i], 0, n), n += 1.5 * m;
                                        else l.fillText(a, 0, 0);
                                        l.restore()
                                    }
                                }), c.display) {
                                var V, O, L = 0;
                                if (g) V = i.left + (i.right - i.left) / 2, O = "bottom" === n.position ? i.bottom - S / 2 : i.top + S / 2;
                                else {
                                    var B = "left" === n.position;
                                    V = B ? i.left + S / 2 : i.right - S / 2, O = i.top + (i.bottom - i.top) / 2, L = B ? -.5 * Math.PI : .5 * Math.PI
                                }
                                l.save(), l.translate(V, O), l.rotate(L), l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = k, l.font = M, l.fillText(c.labelString, 0, 0), l.restore()
                            }
                            if (u.drawBorder) {
                                l.lineWidth = e.getValueAtIndexOrDefault(u.lineWidth, 0), l.strokeStyle = e.getValueAtIndexOrDefault(u.color, 0);
                                var W = i.left,
                                    z = i.right,
                                    H = i.top,
                                    N = i.bottom,
                                    E = e.aliasPixel(l.lineWidth);
                                g ? (H = N = "top" === n.position ? i.bottom : i.top, H += E, N += E) : (W = z = "left" === n.position ? i.right : i.left, W += E, z += E), l.beginPath(), l.moveTo(W, H), l.lineTo(z, N), l.stroke()
                            }
                        }
                    }
                })
            }
        }, {}],
        31: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.scaleService = {
                    constructors: {},
                    defaults: {},
                    registerScaleType: function(t, a, i) {
                        this.constructors[t] = a, this.defaults[t] = e.clone(i)
                    },
                    getScaleConstructor: function(t) {
                        return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
                    },
                    getScaleDefaults: function(a) {
                        return this.defaults.hasOwnProperty(a) ? e.scaleMerge(t.defaults.scale, this.defaults[a]) : {}
                    },
                    updateScaleDefaults: function(t, a) {
                        var i = this.defaults;
                        i.hasOwnProperty(t) && (i[t] = e.extend(i[t], a))
                    },
                    addScalesToLayout: function(a) {
                        e.each(a.scales, function(e) {
                            t.layoutService.addBox(a, e)
                        })
                    }
                }
            }
        }, {}],
        32: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers;
                t.defaults.global.title = {
                    display: !1,
                    position: "top",
                    fullWidth: !0,
                    fontStyle: "bold",
                    padding: 10,
                    text: ""
                };
                var a = e.noop;
                t.Title = t.Element.extend({
                    initialize: function(a) {
                        var i = this;
                        e.extend(i, a), i.options = e.configMerge(t.defaults.global.title, a.options), i.legendHitBoxes = []
                    },
                    beforeUpdate: function() {
                        var a = this.chart.options;
                        a && a.title && (this.options = e.configMerge(t.defaults.global.title, a.title))
                    },
                    update: function(t, e, a) {
                        var i = this;
                        return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = a, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
                    },
                    afterUpdate: a,
                    beforeSetDimensions: a,
                    setDimensions: function() {
                        var t = this;
                        t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
                            width: 0,
                            height: 0
                        }
                    },
                    afterSetDimensions: a,
                    beforeBuildLabels: a,
                    buildLabels: a,
                    afterBuildLabels: a,
                    beforeFit: a,
                    fit: function() {
                        var a = this,
                            i = (a.ctx, e.getValueOrDefault),
                            n = a.options,
                            o = t.defaults.global,
                            r = n.display,
                            l = i(n.fontSize, o.defaultFontSize),
                            s = a.minSize;
                        a.isHorizontal() ? (s.width = a.maxWidth, s.height = r ? l + 2 * n.padding : 0) : (s.width = r ? l + 2 * n.padding : 0, s.height = a.maxHeight), a.width = s.width, a.height = s.height
                    },
                    afterFit: a,
                    isHorizontal: function() {
                        var t = this.options.position;
                        return "top" === t || "bottom" === t
                    },
                    draw: function() {
                        var a = this,
                            i = a.ctx,
                            n = e.getValueOrDefault,
                            o = a.options,
                            r = t.defaults.global;
                        if (o.display) {
                            var l, s, d = n(o.fontSize, r.defaultFontSize),
                                u = n(o.fontStyle, r.defaultFontStyle),
                                c = n(o.fontFamily, r.defaultFontFamily),
                                h = e.fontString(d, u, c),
                                f = 0,
                                g = a.top,
                                p = a.left,
                                m = a.bottom,
                                b = a.right;
                            i.fillStyle = n(o.fontColor, r.defaultFontColor), i.font = h, a.isHorizontal() ? (l = p + (b - p) / 2, s = g + (m - g) / 2) : (l = "left" === o.position ? p + d / 2 : b - d / 2, s = g + (m - g) / 2, f = Math.PI * ("left" === o.position ? -.5 : .5)), i.save(), i.translate(l, s), i.rotate(f), i.textAlign = "center", i.textBaseline = "middle", i.fillText(o.text, 0, 0), i.restore()
                        }
                    }
                }), t.plugins.register({
                    beforeInit: function(e) {
                        var a = e.options,
                            i = a.title;
                        i && (e.titleBlock = new t.Title({
                            ctx: e.chart.ctx,
                            options: i,
                            chart: e
                        }), t.layoutService.addBox(e, e.titleBlock))
                    }
                })
            }
        }, {}],
        33: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                function e(t, e) {
                    return e && (n.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
                }

                function a(t) {
                    if (!t.length) return !1;
                    var e, a, i = [],
                        n = [];
                    for (e = 0, a = t.length; a > e; ++e) {
                        var o = t[e];
                        if (o && o.hasValue()) {
                            var r = o.tooltipPosition();
                            i.push(r.x), n.push(r.y)
                        }
                    }
                    var l = 0,
                        s = 0;
                    for (e = 0, a - i.length; a > e; ++e) l += i[e], s += n[e];
                    return {
                        x: Math.round(l / i.length),
                        y: Math.round(s / i.length)
                    }
                }

                function i(t) {
                    var e = t._xScale,
                        a = t._yScale || t._scale,
                        i = t._index,
                        n = t._datasetIndex;
                    return {
                        xLabel: e ? e.getLabelForIndex(i, n) : "",
                        yLabel: a ? a.getLabelForIndex(i, n) : "",
                        index: i,
                        datasetIndex: n
                    }
                }
                var n = t.helpers;
                t.defaults.global.tooltips = {
                    enabled: !0,
                    custom: null,
                    mode: "single",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleFontStyle: "bold",
                    titleSpacing: 2,
                    titleMarginBottom: 6,
                    titleFontColor: "#fff",
                    titleAlign: "left",
                    bodySpacing: 2,
                    bodyFontColor: "#fff",
                    bodyAlign: "left",
                    footerFontStyle: "bold",
                    footerSpacing: 2,
                    footerMarginTop: 6,
                    footerFontColor: "#fff",
                    footerAlign: "left",
                    yPadding: 6,
                    xPadding: 6,
                    yAlign: "center",
                    xAlign: "center",
                    caretSize: 5,
                    cornerRadius: 6,
                    multiKeyBackground: "#fff",
                    callbacks: {
                        beforeTitle: n.noop,
                        title: function(t, e) {
                            var a = "",
                                i = e.labels,
                                n = i ? i.length : 0;
                            if (t.length > 0) {
                                var o = t[0];
                                o.xLabel ? a = o.xLabel : n > 0 && o.index < n && (a = i[o.index])
                            }
                            return a
                        },
                        afterTitle: n.noop,
                        beforeBody: n.noop,
                        beforeLabel: n.noop,
                        label: function(t, e) {
                            var a = e.datasets[t.datasetIndex].label || "";
                            return a + ": " + t.yLabel
                        },
                        labelColor: function(t, e) {
                            var a = e.getDatasetMeta(t.datasetIndex),
                                i = a.data[t.index],
                                n = i._view;
                            return {
                                borderColor: n.borderColor,
                                backgroundColor: n.backgroundColor
                            }
                        },
                        afterLabel: n.noop,
                        afterBody: n.noop,
                        beforeFooter: n.noop,
                        footer: n.noop,
                        afterFooter: n.noop
                    }
                }, t.Tooltip = t.Element.extend({
                    initialize: function() {
                        var e = this,
                            a = t.defaults.global,
                            i = e._options,
                            o = n.getValueOrDefault;
                        n.extend(e, {
                            _model: {
                                xPadding: i.xPadding,
                                yPadding: i.yPadding,
                                xAlign: i.yAlign,
                                yAlign: i.xAlign,
                                bodyFontColor: i.bodyFontColor,
                                _bodyFontFamily: o(i.bodyFontFamily, a.defaultFontFamily),
                                _bodyFontStyle: o(i.bodyFontStyle, a.defaultFontStyle),
                                _bodyAlign: i.bodyAlign,
                                bodyFontSize: o(i.bodyFontSize, a.defaultFontSize),
                                bodySpacing: i.bodySpacing,
                                titleFontColor: i.titleFontColor,
                                _titleFontFamily: o(i.titleFontFamily, a.defaultFontFamily),
                                _titleFontStyle: o(i.titleFontStyle, a.defaultFontStyle),
                                titleFontSize: o(i.titleFontSize, a.defaultFontSize),
                                _titleAlign: i.titleAlign,
                                titleSpacing: i.titleSpacing,
                                titleMarginBottom: i.titleMarginBottom,
                                footerFontColor: i.footerFontColor,
                                _footerFontFamily: o(i.footerFontFamily, a.defaultFontFamily),
                                _footerFontStyle: o(i.footerFontStyle, a.defaultFontStyle),
                                footerFontSize: o(i.footerFontSize, a.defaultFontSize),
                                _footerAlign: i.footerAlign,
                                footerSpacing: i.footerSpacing,
                                footerMarginTop: i.footerMarginTop,
                                caretSize: i.caretSize,
                                cornerRadius: i.cornerRadius,
                                backgroundColor: i.backgroundColor,
                                opacity: 0,
                                legendColorBackground: i.multiKeyBackground
                            }
                        })
                    },
                    getTitle: function() {
                        var t = this,
                            a = t._options,
                            i = a.callbacks,
                            n = i.beforeTitle.apply(t, arguments),
                            o = i.title.apply(t, arguments),
                            r = i.afterTitle.apply(t, arguments),
                            l = [];
                        return l = e(l, n), l = e(l, o), l = e(l, r)
                    },
                    getBeforeBody: function() {
                        var t = this._options.callbacks.beforeBody.apply(this, arguments);
                        return n.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getBody: function(t, a) {
                        var i = this,
                            o = i._options.callbacks,
                            r = [];
                        return n.each(t, function(t) {
                            var n = {
                                before: [],
                                lines: [],
                                after: []
                            };
                            e(n.before, o.beforeLabel.call(i, t, a)), e(n.lines, o.label.call(i, t, a)), e(n.after, o.afterLabel.call(i, t, a)), r.push(n)
                        }), r
                    },
                    getAfterBody: function() {
                        var t = this._options.callbacks.afterBody.apply(this, arguments);
                        return n.isArray(t) ? t : void 0 !== t ? [t] : []
                    },
                    getFooter: function() {
                        var t = this,
                            a = t._options.callbacks,
                            i = a.beforeFooter.apply(t, arguments),
                            n = a.footer.apply(t, arguments),
                            o = a.afterFooter.apply(t, arguments),
                            r = [];
                        return r = e(r, i), r = e(r, n), r = e(r, o)
                    },
                    update: function(t) {
                        var e, o, r = this,
                            l = r._options,
                            s = r._model,
                            d = r._active,
                            u = r._data,
                            c = r._chartInstance;
                        if (d.length) {
                            s.opacity = 1;
                            var h = [],
                                f = a(d),
                                g = [];
                            for (e = 0, o = d.length; o > e; ++e) g.push(i(d[e]));
                            l.itemSort && (g = g.sort(l.itemSort)), d.length > 1 && n.each(g, function(t) {
                                h.push(l.callbacks.labelColor.call(r, t, c))
                            }), n.extend(s, {
                                title: r.getTitle(g, u),
                                beforeBody: r.getBeforeBody(g, u),
                                body: r.getBody(g, u),
                                afterBody: r.getAfterBody(g, u),
                                footer: r.getFooter(g, u),
                                x: Math.round(f.x),
                                y: Math.round(f.y),
                                caretPadding: n.getValueOrDefault(f.padding, 2),
                                labelColors: h
                            });
                            var p = r.getTooltipSize(s);
                            r.determineAlignment(p), n.extend(s, r.getBackgroundPoint(s, p))
                        } else r._model.opacity = 0;
                        return t && l.custom && l.custom.call(r, s), r
                    },
                    getTooltipSize: function(t) {
                        var e = this._chart.ctx,
                            a = {
                                height: 2 * t.yPadding,
                                width: 0
                            },
                            i = t.body,
                            o = i.reduce(function(t, e) {
                                return t + e.before.length + e.lines.length + e.after.length
                            }, 0);
                        o += t.beforeBody.length + t.afterBody.length;
                        var r = t.title.length,
                            l = t.footer.length,
                            s = t.titleFontSize,
                            d = t.bodyFontSize,
                            u = t.footerFontSize;
                        a.height += r * s, a.height += (r - 1) * t.titleSpacing, a.height += r ? t.titleMarginBottom : 0, a.height += o * d, a.height += o ? (o - 1) * t.bodySpacing : 0, a.height += l ? t.footerMarginTop : 0, a.height += l * u, a.height += l ? (l - 1) * t.footerSpacing : 0;
                        var c = 0,
                            h = function(t) {
                                a.width = Math.max(a.width, e.measureText(t).width + c)
                            };
                        return e.font = n.fontString(s, t._titleFontStyle, t._titleFontFamily), n.each(t.title, h), e.font = n.fontString(d, t._bodyFontStyle, t._bodyFontFamily), n.each(t.beforeBody.concat(t.afterBody), h), c = i.length > 1 ? d + 2 : 0, n.each(i, function(t) {
                            n.each(t.before, h), n.each(t.lines, h), n.each(t.after, h)
                        }), c = 0, e.font = n.fontString(u, t._footerFontStyle, t._footerFontFamily), n.each(t.footer, h), a.width += 2 * t.xPadding, a
                    },
                    determineAlignment: function(t) {
                        var e = this,
                            a = e._model,
                            i = e._chart,
                            n = e._chartInstance.chartArea;
                        a.y < t.height ? a.yAlign = "top" : a.y > i.height - t.height && (a.yAlign = "bottom");
                        var o, r, l, s, d, u = (n.left + n.right) / 2,
                            c = (n.top + n.bottom) / 2;
                        "center" === a.yAlign ? (o = function(t) {
                            return u >= t
                        }, r = function(t) {
                            return t > u
                        }) : (o = function(e) {
                            return e <= t.width / 2
                        }, r = function(e) {
                            return e >= i.width - t.width / 2
                        }), l = function(e) {
                            return e + t.width > i.width
                        }, s = function(e) {
                            return e - t.width < 0
                        }, d = function(t) {
                            return c >= t ? "top" : "bottom"
                        }, o(a.x) ? (a.xAlign = "left", l(a.x) && (a.xAlign = "center", a.yAlign = d(a.y))) : r(a.x) && (a.xAlign = "right", s(a.x) && (a.xAlign = "center", a.yAlign = d(a.y)))
                    },
                    getBackgroundPoint: function(t, e) {
                        var a = {
                                x: t.x,
                                y: t.y
                            },
                            i = t.caretSize,
                            n = t.caretPadding,
                            o = t.cornerRadius,
                            r = t.xAlign,
                            l = t.yAlign,
                            s = i + n,
                            d = o + n;
                        return "right" === r ? a.x -= e.width : "center" === r && (a.x -= e.width / 2), "top" === l ? a.y += s : "bottom" === l ? a.y -= e.height + s : a.y -= e.height / 2, "center" === l ? "left" === r ? a.x += s : "right" === r && (a.x -= s) : "left" === r ? a.x -= d : "right" === r && (a.x += d), a
                    },
                    drawCaret: function(t, e, a, i) {
                        var o, r, l, s, d, u, c = this._view,
                            h = this._chart.ctx,
                            f = c.caretSize,
                            g = c.cornerRadius,
                            p = c.xAlign,
                            m = c.yAlign,
                            b = t.x,
                            v = t.y,
                            x = e.width,
                            y = e.height;
                        "center" === m ? ("left" === p ? (o = b, r = o - f, l = o) : (o = b + x, r = o + f, l = o), d = v + y / 2, s = d - f, u = d + f) : ("left" === p ? (o = b + g, r = o + f, l = r + f) : "right" === p ? (o = b + x - g, r = o - f, l = r - f) : (r = b + x / 2, o = r - f, l = r + f), "top" === m ? (s = v, d = s - f, u = s) : (s = v + y, d = s + f, u = s));
                        var k = n.color(c.backgroundColor);
                        h.fillStyle = k.alpha(a * k.alpha()).rgbString(), h.beginPath(), h.moveTo(o, s), h.lineTo(r, d), h.lineTo(l, u), h.closePath(), h.fill()
                    },
                    drawTitle: function(t, e, a, i) {
                        var o = e.title;
                        if (o.length) {
                            a.textAlign = e._titleAlign, a.textBaseline = "top";
                            var r = e.titleFontSize,
                                l = e.titleSpacing,
                                s = n.color(e.titleFontColor);
                            a.fillStyle = s.alpha(i * s.alpha()).rgbString(), a.font = n.fontString(r, e._titleFontStyle, e._titleFontFamily);
                            var d, u;
                            for (d = 0, u = o.length; u > d; ++d) a.fillText(o[d], t.x, t.y), t.y += r + l, d + 1 === o.length && (t.y += e.titleMarginBottom - l)
                        }
                    },
                    drawBody: function(t, e, a, i) {
                        var o = e.bodyFontSize,
                            r = e.bodySpacing,
                            l = e.body;
                        a.textAlign = e._bodyAlign, a.textBaseline = "top";
                        var s = n.color(e.bodyFontColor),
                            d = s.alpha(i * s.alpha()).rgbString();
                        a.fillStyle = d, a.font = n.fontString(o, e._bodyFontStyle, e._bodyFontFamily);
                        var u = 0,
                            c = function(e) {
                                a.fillText(e, t.x + u, t.y), t.y += o + r
                            };
                        n.each(e.beforeBody, c);
                        var h = l.length > 1;
                        u = h ? o + 2 : 0, n.each(l, function(r, l) {
                            n.each(r.before, c), n.each(r.lines, function(r) {
                                h && (a.fillStyle = n.color(e.legendColorBackground).alpha(i).rgbaString(), a.fillRect(t.x, t.y, o, o), a.strokeStyle = n.color(e.labelColors[l].borderColor).alpha(i).rgbaString(), a.strokeRect(t.x, t.y, o, o), a.fillStyle = n.color(e.labelColors[l].backgroundColor).alpha(i).rgbaString(), a.fillRect(t.x + 1, t.y + 1, o - 2, o - 2), a.fillStyle = d), c(r)
                            }), n.each(r.after, c)
                        }), u = 0, n.each(e.afterBody, c), t.y -= r
                    },
                    drawFooter: function(t, e, a, i) {
                        var o = e.footer;
                        if (o.length) {
                            t.y += e.footerMarginTop, a.textAlign = e._footerAlign, a.textBaseline = "top";
                            var r = n.color(e.footerFontColor);
                            a.fillStyle = r.alpha(i * r.alpha()).rgbString(), a.font = n.fontString(e.footerFontSize, e._footerFontStyle, e._footerFontFamily), n.each(o, function(i) {
                                a.fillText(i, t.x, t.y), t.y += e.footerFontSize + e.footerSpacing
                            })
                        }
                    },
                    draw: function() {
                        var t = this._chart.ctx,
                            e = this._view;
                        if (0 !== e.opacity) {
                            var a = this.getTooltipSize(e),
                                i = {
                                    x: e.x,
                                    y: e.y
                                },
                                o = Math.abs(e.opacity < .001) ? 0 : e.opacity;
                            if (this._options.enabled) {
                                var r = n.color(e.backgroundColor);
                                t.fillStyle = r.alpha(o * r.alpha()).rgbString(), n.drawRoundedRectangle(t, i.x, i.y, a.width, a.height, e.cornerRadius), t.fill(), this.drawCaret(i, a, o, e.caretPadding), i.x += e.xPadding, i.y += e.yPadding, this.drawTitle(i, e, t, o), this.drawBody(i, e, t, o), this.drawFooter(i, e, t, o)
                            }
                        }
                    }
                })
            }
        }, {}],
        34: [function(t, e, a) {
            "use strict";
            e.exports = function(t, e) {
                var a = t.helpers,
                    i = t.defaults.global;
                i.elements.arc = {
                    backgroundColor: i.defaultColor,
                    borderColor: "#fff",
                    borderWidth: 2
                }, t.elements.Arc = t.Element.extend({
                    inLabelRange: function(t) {
                        var e = this._view;
                        return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2) : !1
                    },
                    inRange: function(t, e) {
                        var i = this._view;
                        if (i) {
                            for (var n = a.getAngleFromPoint(i, {
                                    x: t,
                                    y: e
                                }), o = n.angle, r = n.distance, l = i.startAngle, s = i.endAngle; l > s;) s += 2 * Math.PI;
                            for (; o > s;) o -= 2 * Math.PI;
                            for (; l > o;) o += 2 * Math.PI;
                            var d = o >= l && s >= o,
                                u = r >= i.innerRadius && r <= i.outerRadius;
                            return d && u
                        }
                        return !1
                    },
                    tooltipPosition: function() {
                        var t = this._view,
                            e = t.startAngle + (t.endAngle - t.startAngle) / 2,
                            a = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
                        return {
                            x: t.x + Math.cos(e) * a,
                            y: t.y + Math.sin(e) * a
                        }
                    },
                    draw: function() {
                        var t = this._chart.ctx,
                            e = this._view,
                            a = e.startAngle,
                            i = e.endAngle;
                        t.beginPath(), t.arc(e.x, e.y, e.outerRadius, a, i), t.arc(e.x, e.y, e.innerRadius, i, a, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
                    }
                })
            }
        }, {}],
        35: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = t.defaults.global;
                t.defaults.global.elements.line = {
                    tension: .4,
                    backgroundColor: a.defaultColor,
                    borderWidth: 3,
                    borderColor: a.defaultColor,
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0,
                    borderJoinStyle: "miter",
                    fill: !0
                }, t.elements.Line = t.Element.extend({
                    lineToNextPoint: function(t, e, a, i, n) {
                        var o = this,
                            r = o._chart.ctx,
                            l = o._view ? o._view.spanGaps : !1;
                        e._view.skip && !l ? i.call(o, t, e, a) : t._view.skip && !l ? n.call(o, t, e, a) : 0 === e._view.tension ? r.lineTo(e._view.x, e._view.y) : r.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, e._view.controlPointPreviousX, e._view.controlPointPreviousY, e._view.x, e._view.y)
                    },
                    draw: function() {
                        function t(t) {
                            r._view.skip || l._view.skip ? t && o.lineTo(i._view.scaleZero.x, i._view.scaleZero.y) : o.bezierCurveTo(l._view.controlPointNextX, l._view.controlPointNextY, r._view.controlPointPreviousX, r._view.controlPointPreviousY, r._view.x, r._view.y)
                        }
                        var i = this,
                            n = i._view,
                            o = i._chart.ctx,
                            r = i._children[0],
                            l = i._children[i._children.length - 1];
                        o.save(), i._children.length > 0 && n.fill && (o.beginPath(), e.each(i._children, function(t, a) {
                            var r = e.previousItem(i._children, a),
                                l = e.nextItem(i._children, a);
                            0 === a ? (i._loop ? o.moveTo(n.scaleZero.x, n.scaleZero.y) : o.moveTo(t._view.x, n.scaleZero), t._view.skip ? i._loop || o.moveTo(l._view.x, i._view.scaleZero) : o.lineTo(t._view.x, t._view.y)) : i.lineToNextPoint(r, t, l, function(t, e, a) {
                                i._loop ? o.lineTo(i._view.scaleZero.x, i._view.scaleZero.y) : (o.lineTo(t._view.x, i._view.scaleZero), o.moveTo(a._view.x, i._view.scaleZero))
                            }, function(t, e) {
                                o.lineTo(e._view.x, e._view.y)
                            })
                        }, i), i._loop ? t(!0) : (o.lineTo(i._children[i._children.length - 1]._view.x, n.scaleZero), o.lineTo(i._children[0]._view.x, n.scaleZero)), o.fillStyle = n.backgroundColor || a.defaultColor, o.closePath(), o.fill());
                        var s = a.elements.line;
                        o.lineCap = n.borderCapStyle || s.borderCapStyle, o.setLineDash && o.setLineDash(n.borderDash || s.borderDash), o.lineDashOffset = n.borderDashOffset || s.borderDashOffset, o.lineJoin = n.borderJoinStyle || s.borderJoinStyle, o.lineWidth = n.borderWidth || s.borderWidth, o.strokeStyle = n.borderColor || a.defaultColor, o.beginPath(), e.each(i._children, function(t, a) {
                            var n = e.previousItem(i._children, a),
                                r = e.nextItem(i._children, a);
                            0 === a ? o.moveTo(t._view.x, t._view.y) : i.lineToNextPoint(n, t, r, function(t, e, a) {
                                o.moveTo(a._view.x, a._view.y)
                            }, function(t, e) {
                                o.moveTo(e._view.x, e._view.y)
                            })
                        }, i), i._loop && i._children.length > 0 && t(), o.stroke(), o.restore()
                    }
                })
            }
        }, {}],
        36: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = t.defaults.global,
                    i = a.defaultColor;
                a.elements.point = {
                    radius: 3,
                    pointStyle: "circle",
                    backgroundColor: i,
                    borderWidth: 1,
                    borderColor: i,
                    hitRadius: 1,
                    hoverRadius: 4,
                    hoverBorderWidth: 1
                }, t.elements.Point = t.Element.extend({
                    inRange: function(t, e) {
                        var a = this._view;
                        return a ? Math.pow(t - a.x, 2) + Math.pow(e - a.y, 2) < Math.pow(a.hitRadius + a.radius, 2) : !1
                    },
                    inLabelRange: function(t) {
                        var e = this._view;
                        return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2) : !1
                    },
                    tooltipPosition: function() {
                        var t = this._view;
                        return {
                            x: t.x,
                            y: t.y,
                            padding: t.radius + t.borderWidth
                        }
                    },
                    draw: function() {
                        var t, n, o, r, l, s, d = this._view,
                            u = this._chart.ctx,
                            c = d.pointStyle,
                            h = d.radius,
                            f = d.x,
                            g = d.y;
                        if (!d.skip) {
                            if ("object" == typeof c && (t = c.toString(), "[object HTMLImageElement]" === t || "[object HTMLCanvasElement]" === t)) return void u.drawImage(c, f - c.width / 2, g - c.height / 2);
                            if (!(isNaN(h) || 0 >= h)) {
                                switch (u.strokeStyle = d.borderColor || i, u.lineWidth = e.getValueOrDefault(d.borderWidth, a.elements.point.borderWidth), u.fillStyle = d.backgroundColor || i, c) {
                                    default:
                                        u.beginPath(), u.arc(f, g, h, 0, 2 * Math.PI), u.closePath(), u.fill();
                                        break;
                                    case "triangle":
                                        u.beginPath(), n = 3 * h / Math.sqrt(3), l = n * Math.sqrt(3) / 2, u.moveTo(f - n / 2, g + l / 3), u.lineTo(f + n / 2, g + l / 3), u.lineTo(f, g - 2 * l / 3), u.closePath(), u.fill();
                                        break;
                                    case "rect":
                                        s = 1 / Math.SQRT2 * h, u.fillRect(f - s, g - s, 2 * s, 2 * s), u.strokeRect(f - s, g - s, 2 * s, 2 * s);
                                        break;
                                    case "rectRot":
                                        s = 1 / Math.SQRT2 * h, u.beginPath(), u.moveTo(f - s, g), u.lineTo(f, g + s), u.lineTo(f + s, g), u.lineTo(f, g - s), u.closePath(), u.fill();
                                        break;
                                    case "cross":
                                        u.beginPath(), u.moveTo(f, g + h), u.lineTo(f, g - h), u.moveTo(f - h, g), u.lineTo(f + h, g), u.closePath();
                                        break;
                                    case "crossRot":
                                        u.beginPath(), o = Math.cos(Math.PI / 4) * h, r = Math.sin(Math.PI / 4) * h, u.moveTo(f - o, g - r), u.lineTo(f + o, g + r), u.moveTo(f - o, g + r), u.lineTo(f + o, g - r), u.closePath();
                                        break;
                                    case "star":
                                        u.beginPath(), u.moveTo(f, g + h), u.lineTo(f, g - h), u.moveTo(f - h, g), u.lineTo(f + h, g), o = Math.cos(Math.PI / 4) * h, r = Math.sin(Math.PI / 4) * h, u.moveTo(f - o, g - r), u.lineTo(f + o, g + r), u.moveTo(f - o, g + r), u.lineTo(f + o, g - r), u.closePath();
                                        break;
                                    case "line":
                                        u.beginPath(), u.moveTo(f - h, g), u.lineTo(f + h, g), u.closePath();
                                        break;
                                    case "dash":
                                        u.beginPath(), u.moveTo(f, g), u.lineTo(f + h, g), u.closePath()
                                }
                                u.stroke()
                            }
                        }
                    }
                })
            }
        }, {}],
        37: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = (t.helpers, t.defaults.global);
                e.elements.rectangle = {
                    backgroundColor: e.defaultColor,
                    borderWidth: 0,
                    borderColor: e.defaultColor,
                    borderSkipped: "bottom"
                }, t.elements.Rectangle = t.Element.extend({
                    draw: function() {
                        function t(t) {
                            return s[(u + t) % 4]
                        }
                        var e = this._chart.ctx,
                            a = this._view,
                            i = a.width / 2,
                            n = a.x - i,
                            o = a.x + i,
                            r = a.base - (a.base - a.y),
                            l = a.borderWidth / 2;
                        a.borderWidth && (n += l, o -= l, r += l), e.beginPath(), e.fillStyle = a.backgroundColor, e.strokeStyle = a.borderColor, e.lineWidth = a.borderWidth;
                        var s = [
                                [n, a.base],
                                [n, r],
                                [o, r],
                                [o, a.base]
                            ],
                            d = ["bottom", "left", "top", "right"],
                            u = d.indexOf(a.borderSkipped, 0); - 1 === u && (u = 0), e.moveTo.apply(e, t(0));
                        for (var c = 1; 4 > c; c++) e.lineTo.apply(e, t(c));
                        e.fill(), a.borderWidth && e.stroke()
                    },
                    height: function() {
                        var t = this._view;
                        return t.base - t.y
                    },
                    inRange: function(t, e) {
                        var a = this._view;
                        return a ? a.y < a.base ? t >= a.x - a.width / 2 && t <= a.x + a.width / 2 && e >= a.y && e <= a.base : t >= a.x - a.width / 2 && t <= a.x + a.width / 2 && e >= a.base && e <= a.y : !1
                    },
                    inLabelRange: function(t) {
                        var e = this._view;
                        return e ? t >= e.x - e.width / 2 && t <= e.x + e.width / 2 : !1
                    },
                    tooltipPosition: function() {
                        var t = this._view;
                        return {
                            x: t.x,
                            y: t.y
                        }
                    }
                })
            }
        }, {}],
        38: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = {
                        position: "bottom"
                    },
                    i = t.Scale.extend({
                        determineDataLimits: function() {
                            var t = this;
                            t.minIndex = 0, t.maxIndex = t.chart.data.labels.length - 1;
                            var a;
                            void 0 !== t.options.ticks.min && (a = e.indexOf(t.chart.data.labels, t.options.ticks.min), t.minIndex = -1 !== a ? a : t.minIndex), void 0 !== t.options.ticks.max && (a = e.indexOf(t.chart.data.labels, t.options.ticks.max), t.maxIndex = -1 !== a ? a : t.maxIndex), t.min = t.chart.data.labels[t.minIndex], t.max = t.chart.data.labels[t.maxIndex]
                        },
                        buildTicks: function(t) {
                            var e = this;
                            e.ticks = 0 === e.minIndex && e.maxIndex === e.chart.data.labels.length - 1 ? e.chart.data.labels : e.chart.data.labels.slice(e.minIndex, e.maxIndex + 1)
                        },
                        getLabelForIndex: function(t, e) {
                            return this.ticks[t]
                        },
                        getPixelForValue: function(t, e, a, i) {
                            var n = this,
                                o = Math.max(n.maxIndex + 1 - n.minIndex - (n.options.gridLines.offsetGridLines ? 0 : 1), 1);
                            if (n.isHorizontal()) {
                                var r = n.width - (n.paddingLeft + n.paddingRight),
                                    l = r / o,
                                    s = l * (e - n.minIndex) + n.paddingLeft;
                                return n.options.gridLines.offsetGridLines && i && (s += l / 2), n.left + Math.round(s)
                            }
                            var d = n.height - (n.paddingTop + n.paddingBottom),
                                u = d / o,
                                c = u * (e - n.minIndex) + n.paddingTop;
                            return n.options.gridLines.offsetGridLines && i && (c += u / 2), n.top + Math.round(c)
                        },
                        getPixelForTick: function(t, e) {
                            return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e)
                        },
                        getValueForPixel: function(t) {
                            var e, a = this,
                                i = Math.max(a.ticks.length - (a.options.gridLines.offsetGridLines ? 0 : 1), 1),
                                n = a.isHorizontal(),
                                o = n ? a.width - (a.paddingLeft + a.paddingRight) : a.height - (a.paddingTop + a.paddingBottom),
                                r = o / i;
                            return a.options.gridLines.offsetGridLines && (t -= r / 2), t -= n ? a.paddingLeft : a.paddingTop, e = 0 >= t ? 0 : Math.round(t / r)
                        }
                    });
                t.scaleService.registerScaleType("category", i, a)
            }
        }, {}],
        39: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = {
                        position: "left",
                        ticks: {
                            callback: function(t, a, i) {
                                var n = i.length > 3 ? i[2] - i[1] : i[1] - i[0];
                                Math.abs(n) > 1 && t !== Math.floor(t) && (n = t - Math.floor(t));
                                var o = e.log10(Math.abs(n)),
                                    r = "";
                                if (0 !== t) {
                                    var l = -1 * Math.floor(o);
                                    l = Math.max(Math.min(l, 20), 0), r = t.toFixed(l)
                                } else r = "0";
                                return r
                            }
                        }
                    },
                    i = t.LinearScaleBase.extend({
                        determineDataLimits: function() {
                            function t(t) {
                                return l ? t.xAxisID === a.id : t.yAxisID === a.id
                            }
                            var a = this,
                                i = a.options,
                                n = (i.ticks, a.chart),
                                o = n.data,
                                r = o.datasets,
                                l = a.isHorizontal();
                            if (a.min = null, a.max = null, i.stacked) {
                                var s = {},
                                    d = !1,
                                    u = !1;
                                e.each(r, function(o, r) {
                                    var l = n.getDatasetMeta(r);
                                    void 0 === s[l.type] && (s[l.type] = {
                                        positiveValues: [],
                                        negativeValues: []
                                    });
                                    var c = s[l.type].positiveValues,
                                        h = s[l.type].negativeValues;
                                    n.isDatasetVisible(r) && t(l) && e.each(o.data, function(t, e) {
                                        var n = +a.getRightValue(t);
                                        isNaN(n) || l.data[e].hidden || (c[e] = c[e] || 0, h[e] = h[e] || 0, i.relativePoints ? c[e] = 100 : 0 > n ? (u = !0, h[e] += n) : (d = !0, c[e] += n))
                                    })
                                }), e.each(s, function(t) {
                                    var i = t.positiveValues.concat(t.negativeValues),
                                        n = e.min(i),
                                        o = e.max(i);
                                    a.min = null === a.min ? n : Math.min(a.min, n), a.max = null === a.max ? o : Math.max(a.max, o)
                                })
                            } else e.each(r, function(i, o) {
                                var r = n.getDatasetMeta(o);
                                n.isDatasetVisible(o) && t(r) && e.each(i.data, function(t, e) {
                                    var i = +a.getRightValue(t);
                                    isNaN(i) || r.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i))
                                })
                            });
                            this.handleTickRangeOptions()
                        },
                        getTickLimit: function() {
                            var a, i = this,
                                n = i.options.ticks;
                            if (i.isHorizontal()) a = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(i.width / 50));
                            else {
                                var o = e.getValueOrDefault(n.fontSize, t.defaults.global.defaultFontSize);
                                a = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(i.height / (2 * o)))
                            }
                            return a
                        },
                        handleDirectionalChanges: function() {
                            this.isHorizontal() || this.ticks.reverse()
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForValue: function(t, e, a, i) {
                            var n, o, r = this,
                                l = r.paddingLeft,
                                s = r.paddingBottom,
                                d = r.start,
                                u = +r.getRightValue(t),
                                c = r.end - d;
                            return r.isHorizontal() ? (o = r.width - (l + r.paddingRight), n = r.left + o / c * (u - d), Math.round(n + l)) : (o = r.height - (r.paddingTop + s), n = r.bottom - s - o / c * (u - d), Math.round(n))
                        },
                        getValueForPixel: function(t) {
                            var e = this,
                                a = e.isHorizontal(),
                                i = e.paddingLeft,
                                n = e.paddingBottom,
                                o = a ? e.width - (i + e.paddingRight) : e.height - (e.paddingTop + n),
                                r = (a ? t - e.left - i : e.bottom - n - t) / o;
                            return e.start + (e.end - e.start) * r
                        },
                        getPixelForTick: function(t, e) {
                            return this.getPixelForValue(this.ticksAsNumbers[t], null, null, e)
                        }
                    });
                t.scaleService.registerScaleType("linear", i, a)
            }
        }, {}],
        40: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = e.noop;
                t.LinearScaleBase = t.Scale.extend({
                    handleTickRangeOptions: function() {
                        var t = this,
                            a = t.options,
                            i = a.ticks;
                        if (i.beginAtZero) {
                            var n = e.sign(t.min),
                                o = e.sign(t.max);
                            0 > n && 0 > o ? t.max = 0 : n > 0 && o > 0 && (t.min = 0)
                        }
                        void 0 !== i.min ? t.min = i.min : void 0 !== i.suggestedMin && (t.min = Math.min(t.min, i.suggestedMin)), void 0 !== i.max ? t.max = i.max : void 0 !== i.suggestedMax && (t.max = Math.max(t.max, i.suggestedMax)), t.min === t.max && (t.max++, i.beginAtZero || t.min--)
                    },
                    getTickLimit: a,
                    handleDirectionalChanges: a,
                    buildTicks: function() {
                        var t = this,
                            a = t.options,
                            i = a.ticks,
                            n = e.getValueOrDefault,
                            o = (t.isHorizontal(), t.ticks = []),
                            r = t.getTickLimit();
                        r = Math.max(2, r);
                        var l, s = i.fixedStepSize && i.fixedStepSize > 0 || i.stepSize && i.stepSize > 0;
                        if (s) l = n(i.fixedStepSize, i.stepSize);
                        else {
                            var d = e.niceNum(t.max - t.min, !1);
                            l = e.niceNum(d / (r - 1), !0)
                        }
                        var u = Math.floor(t.min / l) * l,
                            c = Math.ceil(t.max / l) * l,
                            h = (c - u) / l;
                        h = e.almostEquals(h, Math.round(h), l / 1e3) ? Math.round(h) : Math.ceil(h), o.push(void 0 !== i.min ? i.min : u);
                        for (var f = 1; h > f; ++f) o.push(u + f * l);
                        o.push(void 0 !== i.max ? i.max : c), t.handleDirectionalChanges(), t.max = e.max(o), t.min = e.min(o), i.reverse ? (o.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                    },
                    convertTicksToLabels: function() {
                        var e = this;
                        e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(e)
                    }
                })
            }
        }, {}],
        41: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = {
                        position: "left",
                        ticks: {
                            callback: function(t, a, i) {
                                var n = t / Math.pow(10, Math.floor(e.log10(t)));
                                return 1 === n || 2 === n || 5 === n || 0 === a || a === i.length - 1 ? t.toExponential() : ""
                            }
                        }
                    },
                    i = t.Scale.extend({
                        determineDataLimits: function() {
                            function t(t) {
                                return d ? t.xAxisID === a.id : t.yAxisID === a.id
                            }
                            var a = this,
                                i = a.options,
                                n = i.ticks,
                                o = a.chart,
                                r = o.data,
                                l = r.datasets,
                                s = e.getValueOrDefault,
                                d = a.isHorizontal();
                            if (a.min = null, a.max = null, i.stacked) {
                                var u = {};
                                e.each(l, function(n, r) {
                                    var l = o.getDatasetMeta(r);
                                    o.isDatasetVisible(r) && t(l) && (void 0 === u[l.type] && (u[l.type] = []), e.each(n.data, function(t, e) {
                                        var n = u[l.type],
                                            o = +a.getRightValue(t);
                                        isNaN(o) || l.data[e].hidden || (n[e] = n[e] || 0, i.relativePoints ? n[e] = 100 : n[e] += o)
                                    }))
                                }), e.each(u, function(t) {
                                    var i = e.min(t),
                                        n = e.max(t);
                                    a.min = null === a.min ? i : Math.min(a.min, i), a.max = null === a.max ? n : Math.max(a.max, n)
                                })
                            } else e.each(l, function(i, n) {
                                var r = o.getDatasetMeta(n);
                                o.isDatasetVisible(n) && t(r) && e.each(i.data, function(t, e) {
                                    var i = +a.getRightValue(t);
                                    isNaN(i) || r.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i))
                                })
                            });
                            a.min = s(n.min, a.min), a.max = s(n.max, a.max), a.min === a.max && (0 !== a.min && null !== a.min ? (a.min = Math.pow(10, Math.floor(e.log10(a.min)) - 1), a.max = Math.pow(10, Math.floor(e.log10(a.max)) + 1)) : (a.min = 1, a.max = 10))
                        },
                        buildTicks: function() {
                            for (var t = this, a = t.options, i = a.ticks, n = e.getValueOrDefault, o = t.ticks = [], r = n(i.min, Math.pow(10, Math.floor(e.log10(t.min)))); r < t.max;) {
                                o.push(r);
                                var l = Math.floor(e.log10(r)),
                                    s = Math.floor(r / Math.pow(10, l)) + 1;
                                10 === s && (s = 1, ++l), r = s * Math.pow(10, l)
                            }
                            var d = n(i.max, r);
                            o.push(d), t.isHorizontal() || o.reverse(), t.max = e.max(o), t.min = e.min(o), i.reverse ? (o.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max)
                        },
                        convertTicksToLabels: function() {
                            this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this)
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        getPixelForTick: function(t, e) {
                            return this.getPixelForValue(this.tickValues[t], null, null, e)
                        },
                        getPixelForValue: function(t, a, i, n) {
                            var o, r, l = this,
                                s = l.start,
                                d = +l.getRightValue(t),
                                u = e.log10(l.end) - e.log10(s),
                                c = l.paddingTop,
                                h = l.paddingBottom,
                                f = l.paddingLeft;
                            return l.isHorizontal() ? 0 === d ? r = l.left + f : (o = l.width - (f + l.paddingRight), r = l.left + o / u * (e.log10(d) - e.log10(s)), r += f) : 0 === d ? r = l.top + c : (o = l.height - (c + h), r = l.bottom - h - o / u * (e.log10(d) - e.log10(s))), r
                        },
                        getValueForPixel: function(t) {
                            var a, i, n = this,
                                o = e.log10(n.end) - e.log10(n.start);
                            return n.isHorizontal() ? (i = n.width - (n.paddingLeft + n.paddingRight), a = n.start * Math.pow(10, (t - n.left - n.paddingLeft) * o / i)) : (i = n.height - (n.paddingTop + n.paddingBottom), a = Math.pow(10, (n.bottom - n.paddingBottom - t) * o / i) / n.start), a
                        }
                    });
                t.scaleService.registerScaleType("logarithmic", i, a)
            }
        }, {}],
        42: [function(t, e, a) {
            "use strict";
            e.exports = function(t) {
                var e = t.helpers,
                    a = t.defaults.global,
                    i = {
                        display: !0,
                        animate: !0,
                        lineArc: !1,
                        position: "chartArea",
                        angleLines: {
                            display: !0,
                            color: "rgba(0, 0, 0, 0.1)",
                            lineWidth: 1
                        },
                        ticks: {
                            showLabelBackdrop: !0,
                            backdropColor: "rgba(255,255,255,0.75)",
                            backdropPaddingY: 2,
                            backdropPaddingX: 2
                        },
                        pointLabels: {
                            fontSize: 10,
                            callback: function(t) {
                                return t
                            }
                        }
                    },
                    n = t.LinearScaleBase.extend({
                        getValueCount: function() {
                            return this.chart.data.labels.length
                        },
                        setDimensions: function() {
                            var t = this,
                                i = t.options,
                                n = i.ticks;
                            t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);
                            var o = e.min([t.height, t.width]),
                                r = e.getValueOrDefault(n.fontSize, a.defaultFontSize);
                            t.drawingArea = i.display ? o / 2 - (r / 2 + n.backdropPaddingY) : o / 2
                        },
                        determineDataLimits: function() {
                            var t = this,
                                a = t.chart;
                            t.min = null, t.max = null, e.each(a.data.datasets, function(i, n) {
                                if (a.isDatasetVisible(n)) {
                                    var o = a.getDatasetMeta(n);
                                    e.each(i.data, function(e, a) {
                                        var i = +t.getRightValue(e);
                                        isNaN(i) || o.data[a].hidden || (null === t.min ? t.min = i : i < t.min && (t.min = i), null === t.max ? t.max = i : i > t.max && (t.max = i))
                                    })
                                }
                            }), t.handleTickRangeOptions()
                        },
                        getTickLimit: function() {
                            var t = this.options.ticks,
                                i = e.getValueOrDefault(t.fontSize, a.defaultFontSize);
                            return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * i)))
                        },
                        convertTicksToLabels: function() {
                            var e = this;
                            t.LinearScaleBase.prototype.convertTicksToLabels.call(e), e.pointLabels = e.chart.data.labels.map(e.options.pointLabels.callback, e)
                        },
                        getLabelForIndex: function(t, e) {
                            return +this.getRightValue(this.chart.data.datasets[e].data[t])
                        },
                        fit: function() {
                            var t, i, n, o, r, l, s, d, u, c, h, f, g = this.options.pointLabels,
                                p = e.getValueOrDefault(g.fontSize, a.defaultFontSize),
                                m = e.getValueOrDefault(g.fontStyle, a.defaultFontStyle),
                                b = e.getValueOrDefault(g.fontFamily, a.defaultFontFamily),
                                v = e.fontString(p, m, b),
                                x = e.min([this.height / 2 - p - 5, this.width / 2]),
                                y = this.width,
                                k = 0;
                            for (this.ctx.font = v, i = 0; i < this.getValueCount(); i++) t = this.getPointPosition(i, x), n = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : "").width + 5, 0 === i || i === this.getValueCount() / 2 ? (o = n / 2, t.x + o > y && (y = t.x + o, r = i), t.x - o < k && (k = t.x - o, s = i)) : i < this.getValueCount() / 2 ? t.x + n > y && (y = t.x + n, r = i) : i > this.getValueCount() / 2 && t.x - n < k && (k = t.x - n, s = i);
                            u = k, c = Math.ceil(y - this.width), l = this.getIndexAngle(r), d = this.getIndexAngle(s), h = c / Math.sin(l + Math.PI / 2), f = u / Math.sin(d + Math.PI / 2), h = e.isNumber(h) ? h : 0, f = e.isNumber(f) ? f : 0, this.drawingArea = Math.round(x - (f + h) / 2), this.setCenterPoint(f, h)
                        },
                        setCenterPoint: function(t, e) {
                            var a = this,
                                i = a.width - e - a.drawingArea,
                                n = t + a.drawingArea;
                            a.xCenter = Math.round((n + i) / 2 + a.left), a.yCenter = Math.round(a.height / 2 + a.top)
                        },
                        getIndexAngle: function(t) {
                            var e = 2 * Math.PI / this.getValueCount();
                            return t * e - Math.PI / 2
                        },
                        getDistanceFromCenterForValue: function(t) {
                            var e = this;
                            if (null === t) return 0;
                            var a = e.drawingArea / (e.max - e.min);
                            return e.options.reverse ? (e.max - t) * a : (t - e.min) * a
                        },
                        getPointPosition: function(t, e) {
                            var a = this,
                                i = a.getIndexAngle(t);
                            return {
                                x: Math.round(Math.cos(i) * e) + a.xCenter,
                                y: Math.round(Math.sin(i) * e) + a.yCenter
                            }
                        },
                        getPointPositionForValue: function(t, e) {
                            return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
                        },
                        getBasePosition: function() {
                            var t = this,
                                e = t.min,
                                a = t.max;
                            return t.getPointPositionForValue(0, t.beginAtZero ? 0 : 0 > e && 0 > a ? a : e > 0 && a > 0 ? e : 0)
                        },
                        draw: function() {
                            var t = this,
                                i = t.options,
                                n = i.gridLines,
                                o = i.ticks,
                                r = i.angleLines,
                                l = i.pointLabels,
                                s = e.getValueOrDefault;
                            if (i.display) {
                                var d = t.ctx,
                                    u = s(o.fontSize, a.defaultFontSize),
                                    c = s(o.fontStyle, a.defaultFontStyle),
                                    h = s(o.fontFamily, a.defaultFontFamily),
                                    f = e.fontString(u, c, h);
                                if (e.each(t.ticks, function(r, l) {
                                        if (l > 0 || i.reverse) {
                                            var c = t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),
                                                h = t.yCenter - c;
                                            if (n.display && 0 !== l)
                                                if (d.strokeStyle = e.getValueAtIndexOrDefault(n.color, l - 1), d.lineWidth = e.getValueAtIndexOrDefault(n.lineWidth, l - 1), i.lineArc) d.beginPath(), d.arc(t.xCenter, t.yCenter, c, 0, 2 * Math.PI), d.closePath(), d.stroke();
                                                else {
                                                    d.beginPath();
                                                    for (var g = 0; g < t.getValueCount(); g++) {
                                                        var p = t.getPointPosition(g, c);
                                                        0 === g ? d.moveTo(p.x, p.y) : d.lineTo(p.x, p.y)
                                                    }
                                                    d.closePath(), d.stroke()
                                                } if (o.display) {
                                                var m = s(o.fontColor, a.defaultFontColor);
                                                if (d.font = f, o.showLabelBackdrop) {
                                                    var b = d.measureText(r).width;
                                                    d.fillStyle = o.backdropColor, d.fillRect(t.xCenter - b / 2 - o.backdropPaddingX, h - u / 2 - o.backdropPaddingY, b + 2 * o.backdropPaddingX, u + 2 * o.backdropPaddingY)
                                                }
                                                d.textAlign = "center", d.textBaseline = "middle", d.fillStyle = m, d.fillText(r, t.xCenter, h)
                                            }
                                        }
                                    }), !i.lineArc) {
                                    d.lineWidth = r.lineWidth, d.strokeStyle = r.color;
                                    for (var g = t.getDistanceFromCenterForValue(i.reverse ? t.min : t.max), p = s(l.fontSize, a.defaultFontSize), m = s(l.fontStyle, a.defaultFontStyle), b = s(l.fontFamily, a.defaultFontFamily), v = e.fontString(p, m, b), x = t.getValueCount() - 1; x >= 0; x--) {
                                        if (r.display) {
                                            var y = t.getPointPosition(x, g);
                                            d.beginPath(), d.moveTo(t.xCenter, t.yCenter), d.lineTo(y.x, y.y), d.stroke(), d.closePath()
                                        }
                                        var k = t.getPointPosition(x, g + 5),
                                            S = s(l.fontColor, a.defaultFontColor);
                                        d.font = v, d.fillStyle = S;
                                        var w = t.pointLabels,
                                            C = w.length,
                                            M = w.length / 2,
                                            D = M / 2,
                                            A = D > x || x > C - D,
                                            I = x === D || x === C - D;
                                        0 === x ? d.textAlign = "center" : x === M ? d.textAlign = "center" : M > x ? d.textAlign = "left" : d.textAlign = "right", I ? d.textBaseline = "middle" : A ? d.textBaseline = "bottom" : d.textBaseline = "top", d.fillText(w[x] ? w[x] : "", k.x, k.y)
                                    }
                                }
                            }
                        }
                    });
                t.scaleService.registerScaleType("radialLinear", n, i)
            }
        }, {}],
        43: [function(t, e, a) {
            "use strict";
            var i = t(1);
            i = "function" == typeof i ? i : window.moment, e.exports = function(t) {
                var e = t.helpers,
                    a = {
                        units: [{
                            name: "millisecond",
                            steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
                        }, {
                            name: "second",
                            steps: [1, 2, 5, 10, 30]
                        }, {
                            name: "minute",
                            steps: [1, 2, 5, 10, 30]
                        }, {
                            name: "hour",
                            steps: [1, 2, 3, 6, 12]
                        }, {
                            name: "day",
                            steps: [1, 2, 5]
                        }, {
                            name: "week",
                            maxStep: 4
                        }, {
                            name: "month",
                            maxStep: 3
                        }, {
                            name: "quarter",
                            maxStep: 4
                        }, {
                            name: "year",
                            maxStep: !1
                        }]
                    },
                    n = {
                        position: "bottom",
                        time: {
                            parser: !1,
                            format: !1,
                            unit: !1,
                            round: !1,
                            displayFormat: !1,
                            isoWeekday: !1,
                            displayFormats: {
                                millisecond: "h:mm:ss.SSS a",
                                second: "h:mm:ss a",
                                minute: "h:mm:ss a",
                                hour: "MMM D, hA",
                                day: "ll",
                                week: "ll",
                                month: "MMM YYYY",
                                quarter: "[Q]Q - YYYY",
                                year: "YYYY"
                            }
                        },
                        ticks: {
                            autoSkip: !1
                        }
                    },
                    o = t.Scale.extend({
                        initialize: function() {
                            if (!i) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
                            t.Scale.prototype.initialize.call(this)
                        },
                        getLabelMoment: function(t, e) {
                            return this.labelMoments[t][e]
                        },
                        getMomentStartOf: function(t) {
                            var e = this;
                            return "week" === e.options.time.unit && e.options.time.isoWeekday !== !1 ? t.clone().startOf("isoWeek").isoWeekday(e.options.time.isoWeekday) : t.clone().startOf(e.tickUnit)
                        },
                        determineDataLimits: function() {
                            var t = this;
                            t.labelMoments = [];
                            var a = [];
                            t.chart.data.labels && t.chart.data.labels.length > 0 ? (e.each(t.chart.data.labels, function(e, i) {
                                var n = t.parseTime(e);
                                n.isValid() && (t.options.time.round && n.startOf(t.options.time.round), a.push(n))
                            }, t), t.firstTick = i.min.call(t, a), t.lastTick = i.max.call(t, a)) : (t.firstTick = null, t.lastTick = null), e.each(t.chart.data.datasets, function(n, o) {
                                var r = [],
                                    l = t.chart.isDatasetVisible(o);
                                "object" == typeof n.data[0] && null !== n.data[0] ? e.each(n.data, function(e, a) {
                                    var n = t.parseTime(t.getRightValue(e));
                                    n.isValid() && (t.options.time.round && n.startOf(t.options.time.round), r.push(n), l && (t.firstTick = null !== t.firstTick ? i.min(t.firstTick, n) : n, t.lastTick = null !== t.lastTick ? i.max(t.lastTick, n) : n))
                                }, t) : r = a, t.labelMoments.push(r)
                            }, t), t.options.time.min && (t.firstTick = t.parseTime(t.options.time.min)), t.options.time.max && (t.lastTick = t.parseTime(t.options.time.max)), t.firstTick = (t.firstTick || i()).clone(), t.lastTick = (t.lastTick || i()).clone()
                        },
                        buildTicks: function(i) {
                            var n = this;
                            n.ctx.save();
                            var o = e.getValueOrDefault(n.options.ticks.fontSize, t.defaults.global.defaultFontSize),
                                r = e.getValueOrDefault(n.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
                                l = e.getValueOrDefault(n.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
                                s = e.fontString(o, r, l);
                            if (n.ctx.font = s, n.ticks = [], n.unitScale = 1, n.scaleSizeInUnits = 0, n.options.time.unit) n.tickUnit = n.options.time.unit || "day", n.displayFormat = n.options.time.displayFormats[n.tickUnit], n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0), n.unitScale = e.getValueOrDefault(n.options.time.unitStepSize, 1);
                            else {
                                var d = n.isHorizontal() ? n.width - (n.paddingLeft + n.paddingRight) : n.height - (n.paddingTop + n.paddingBottom),
                                    u = n.tickFormatFunction(n.firstTick, 0, []),
                                    c = n.ctx.measureText(u).width,
                                    h = Math.cos(e.toRadians(n.options.ticks.maxRotation)),
                                    f = Math.sin(e.toRadians(n.options.ticks.maxRotation));
                                c = c * h + o * f;
                                var g = d / c;
                                n.tickUnit = "millisecond", n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0), n.displayFormat = n.options.time.displayFormats[n.tickUnit];
                                for (var p = 0, m = a.units[p]; p < a.units.length;) {
                                    if (n.unitScale = 1, e.isArray(m.steps) && Math.ceil(n.scaleSizeInUnits / g) < e.max(m.steps)) {
                                        for (var b = 0; b < m.steps.length; ++b)
                                            if (m.steps[b] >= Math.ceil(n.scaleSizeInUnits / g)) {
                                                n.unitScale = e.getValueOrDefault(n.options.time.unitStepSize, m.steps[b]);
                                                break
                                            } break
                                    }
                                    if (m.maxStep === !1 || Math.ceil(n.scaleSizeInUnits / g) < m.maxStep) {
                                        n.unitScale = e.getValueOrDefault(n.options.time.unitStepSize, Math.ceil(n.scaleSizeInUnits / g));
                                        break
                                    }++p, m = a.units[p], n.tickUnit = m.name;
                                    var v = n.firstTick.diff(n.getMomentStartOf(n.firstTick), n.tickUnit, !0),
                                        x = n.getMomentStartOf(n.lastTick.clone().add(1, n.tickUnit)).diff(n.lastTick, n.tickUnit, !0);
                                    n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0) + v + x, n.displayFormat = n.options.time.displayFormats[m.name]
                                }
                            }
                            var y;
                            if (n.options.time.min ? y = n.getMomentStartOf(n.firstTick) : (n.firstTick = n.getMomentStartOf(n.firstTick), y = n.firstTick), !n.options.time.max) {
                                var k = n.getMomentStartOf(n.lastTick);
                                0 !== k.diff(n.lastTick, n.tickUnit, !0) && (n.lastTick = n.getMomentStartOf(n.lastTick.add(1, n.tickUnit)))
                            }
                            n.smallestLabelSeparation = n.width, e.each(n.chart.data.datasets, function(t, e) {
                                for (var a = 1; a < n.labelMoments[e].length; a++) n.smallestLabelSeparation = Math.min(n.smallestLabelSeparation, n.labelMoments[e][a].diff(n.labelMoments[e][a - 1], n.tickUnit, !0))
                            }, n), n.options.time.displayFormat && (n.displayFormat = n.options.time.displayFormat), n.ticks.push(n.firstTick.clone());
                            for (var S = 1; S <= n.scaleSizeInUnits; ++S) {
                                var w = y.clone().add(S, n.tickUnit);
                                if (n.options.time.max && w.diff(n.lastTick, n.tickUnit, !0) >= 0) break;
                                S % n.unitScale === 0 && n.ticks.push(w)
                            }
                            var C = n.ticks[n.ticks.length - 1].diff(n.lastTick, n.tickUnit);
                            (0 !== C || 0 === n.scaleSizeInUnits) && (n.options.time.max ? (n.ticks.push(n.lastTick.clone()), n.scaleSizeInUnits = n.lastTick.diff(n.ticks[0], n.tickUnit, !0)) : (n.ticks.push(n.lastTick.clone()), n.scaleSizeInUnits = n.lastTick.diff(n.firstTick, n.tickUnit, !0))), n.ctx.restore()
                        },
                        getLabelForIndex: function(t, e) {
                            var a = this,
                                i = a.chart.data.labels && t < a.chart.data.labels.length ? a.chart.data.labels[t] : "";
                            return "object" == typeof a.chart.data.datasets[e].data[0] && (i = a.getRightValue(a.chart.data.datasets[e].data[t])), a.options.time.tooltipFormat && (i = a.parseTime(i).format(a.options.time.tooltipFormat)), i
                        },
                        tickFormatFunction: function(t, a, i) {
                            var n = t.format(this.displayFormat),
                                o = this.options.ticks,
                                r = e.getValueOrDefault(o.callback, o.userCallback);
                            return r ? r(n, a, i) : n
                        },
                        convertTicksToLabels: function() {
                            var t = this;
                            t.tickMoments = t.ticks, t.ticks = t.ticks.map(t.tickFormatFunction, t)
                        },
                        getPixelForValue: function(t, e, a, i) {
                            var n = this,
                                o = t && t.isValid && t.isValid() ? t : n.getLabelMoment(a, e);
                            if (o) {
                                var r = o.diff(n.firstTick, n.tickUnit, !0),
                                    l = r / n.scaleSizeInUnits;
                                if (n.isHorizontal()) {
                                    var s = n.width - (n.paddingLeft + n.paddingRight),
                                        d = (s / Math.max(n.ticks.length - 1, 1), s * l + n.paddingLeft);
                                    return n.left + Math.round(d)
                                }
                                var u = n.height - (n.paddingTop + n.paddingBottom),
                                    c = (u / Math.max(n.ticks.length - 1, 1), u * l + n.paddingTop);
                                return n.top + Math.round(c)
                            }
                        },
                        getPixelForTick: function(t, e) {
                            return this.getPixelForValue(this.tickMoments[t], null, null, e)
                        },
                        getValueForPixel: function(t) {
                            var e = this,
                                a = e.isHorizontal() ? e.width - (e.paddingLeft + e.paddingRight) : e.height - (e.paddingTop + e.paddingBottom),
                                n = (t - (e.isHorizontal() ? e.left + e.paddingLeft : e.top + e.paddingTop)) / a;
                            return n *= e.scaleSizeInUnits, e.firstTick.clone().add(i.duration(n, e.tickUnit).asSeconds(), "seconds")
                        },
                        parseTime: function(t) {
                            var e = this;
                            return "string" == typeof e.options.time.parser ? i(t, e.options.time.parser) : "function" == typeof e.options.time.parser ? e.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? i(t) : t.isValid && t.isValid() ? t : "string" != typeof e.options.time.format && e.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), e.options.time.format(t)) : i(t, e.options.time.format)
                        }
                    });
                t.scaleService.registerScaleType("time", o, n)
            }
        }, {
            1: 1
        }]
    }, {}, [7])(7)
});


 $(function () {
  function random_numbers() {
    for (var a = [],i = 0; i < 300; ++i) a[i] = i;

    var tmp, current, top = a.length;

    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = a[current];
      a[current] = a[top];
      a[top] = tmp;
    }
    return a;
  }
  
  Highcharts.setOptions({
    colors: ['#008CFF', '#D68AFF']
  });

  $('#areaChart').highcharts({
    chart: {
      type: 'areaspline',
      zoomType: 'x'
    },
    title: { text: null },
    legend: { enabled: false },

    xAxis: {
      type: 'datetime',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      min: 0.5,
      max: 11,
      plotLines: [{
        color: 'red',
        dashStyle: 'solid',
        value: '3',
        width: '1'
      }]
    },

    yAxis: {
      title: {
        text: null
      }
    },


    credits: {
      enabled: false
    },

    plotOptions: {
      areaspline: {
        fillOpacity: 0.8
      },
      series: {
        marker: { enabled: false },
        lineWidth: 0
      }
    },

    series: [{
      name: 'Failing',
      data: random_numbers()
    }, {
      name: 'Unknown',
      data: random_numbers()
    }, {
      name: 'Passing',
      data: random_numbers()
    }]
  });
});
