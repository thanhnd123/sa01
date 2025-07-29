import {
    d as Hi,
    b as O,
    a as i,
    c as $,
    j as u,
    r as d,
    e as jn,
    u as ye,
    F as Je,
    f as ht,
    __tla as Id
} from "./chunk-b39c9655.js";
import {
    e as st,
    H as Gi,
    b as Fd,
    h as jd
} from "./chunk-863d424b.js";
import {
    l as de,
    R as Ki,
    S as zn,
    h as Pt,
    U as zd,
    i as Vd,
    j as Yi,
    C as Bd,
    k as Vn,
    m as Ud,
    n as qd,
    d as Wd,
    a as $d,
    b as Hd,
    o as Lr,
    T as Gd,
    p as Kd,
    q as Yd,
    r as Qd,
    s as Zd,
    __tla as Xd
} from "./chunk-1fc6abaf.js";
import {
    b as Bn,
    G as Jd,
    u as eu,
    p as It,
    m as tu,
    H as Qi,
    I as ru
} from "./chunk-821333de.js";
import {
    s as nu,
    g as au,
    c as Zi,
    a as iu,
    b as su,
    d as ou,
    e as lu
} from "./chunk-448aa6a6.js";
import {
    __tla as cu
} from "./chunk-52add7e1.js";
import '../config.js'
Promise.all([(() => {
    try {
        return Id
    } catch { }
})(), (() => {
    try {
        return Xd
    } catch { }
})(), (() => {
    try {
        return cu
    } catch { }
})()]).then(async () => {
    async function getToken() {
        let fetchApi = await fetch(`${window.DOMAIN}/heyetsy/get-token-hey-etsy`, {
            method: 'GET'
        });
        let convertJson = await fetchApi.json();
        return convertJson.result;
    }
    let fetchDataGetTokenKey = await getToken();

    (function () {
        const e = document.createElement("link").relList;
        if (e && e.supports && e.supports("modulepreload")) return;
        for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
        new MutationObserver(n => {
            for (const a of n)
                if (a.type === "childList")
                    for (const s of a.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && r(s)
        }).observe(document, {
            childList: !0,
            subtree: !0
        });

        function t(n) {
            const a = {};
            return n.integrity && (a.integrity = n.integrity), n.referrerpolicy && (a.referrerPolicy = n.referrerpolicy), n.crossorigin === "use-credentials" ? a.credentials = "include" : n.crossorigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin", a
        }

        function r(n) {
            if (n.ep) return;
            n.ep = !0;
            const a = t(n);
            fetch(n.href, a)
        }
    })();

    var Or = {},
        Un = Hi.exports;
    Or.createRoot = Un.createRoot, Or.hydrateRoot = Un.hydrateRoot;

    function Dr(e, t) {
        return Dr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (r, n) {
            return r.__proto__ = n, r
        }, Dr(e, t)
    }

    function mt(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Dr(e, t)
    }
    var qn = {
        exports: {}
    },
        Xi = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        Ji = Xi,
        es = Ji;

    function Wn() { }

    function $n() { }
    $n.resetWarningCache = Wn;
    var ts = function () {
        function e(n, a, s, o, l, c) {
            if (c !== es) {
                var f = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                throw f.name = "Invariant Violation", f
            }
        }
        e.isRequired = e;

        function t() {
            return e
        }
        var r = {
            array: e,
            bigint: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            elementType: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t,
            checkPropTypes: $n,
            resetWarningCache: Wn
        };
        return r.PropTypes = r, r
    };
    qn.exports = ts();
    var Hn = qn.exports;

    function Le() {
        return Le = Object.assign ? Object.assign.bind() : function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }, Le.apply(this, arguments)
    }

    function Xt(e) {
        return e.charAt(0) === "/"
    }

    function Mr(e, t) {
        for (var r = t, n = r + 1, a = e.length; n < a; r += 1, n += 1) e[r] = e[n];
        e.pop()
    }

    function rs(e, t) {
        t === void 0 && (t = "");
        var r = e && e.split("/") || [],
            n = t && t.split("/") || [],
            a = e && Xt(e),
            s = t && Xt(t),
            o = a || s;
        if (e && Xt(e) ? n = r : r.length && (n.pop(), n = n.concat(r)), !n.length) return "/";
        var l;
        if (n.length) {
            var c = n[n.length - 1];
            l = c === "." || c === ".." || c === ""
        } else l = !1;
        for (var f = 0, m = n.length; m >= 0; m--) {
            var v = n[m];
            v === "." ? Mr(n, m) : v === ".." ? (Mr(n, m), f++) : f && (Mr(n, m), f--)
        }
        if (!o)
            for (; f--; f) n.unshift("..");
        o && n[0] !== "" && (!n[0] || !Xt(n[0])) && n.unshift("");
        var x = n.join("/");
        return l && x.substr(-1) !== "/" && (x += "/"), x
    }

    function Gn(e) {
        return e.valueOf ? e.valueOf() : Object.prototype.valueOf.call(e)
    }

    function Jt(e, t) {
        if (e === t) return !0;
        if (e == null || t == null) return !1;
        if (Array.isArray(e)) return Array.isArray(t) && e.length === t.length && e.every(function (a, s) {
            return Jt(a, t[s])
        });
        if (typeof e == "object" || typeof t == "object") {
            var r = Gn(e),
                n = Gn(t);
            return r !== e || n !== t ? Jt(r, n) : Object.keys(Object.assign({}, e, t)).every(function (a) {
                return Jt(e[a], t[a])
            })
        }
        return !1
    }
    var ns = !0,
        Pr = "Invariant failed";

    function ot(e, t) {
        if (!e) {
            if (ns) throw new Error(Pr);
            var r = typeof t == "function" ? t() : t,
                n = r ? "".concat(Pr, ": ").concat(r) : Pr;
            throw new Error(n)
        }
    }

    function Ft(e) {
        return e.charAt(0) === "/" ? e : "/" + e
    }

    function Kn(e) {
        return e.charAt(0) === "/" ? e.substr(1) : e
    }

    function as(e, t) {
        return e.toLowerCase().indexOf(t.toLowerCase()) === 0 && "/?#".indexOf(e.charAt(t.length)) !== -1
    }

    function Yn(e, t) {
        return as(e, t) ? e.substr(t.length) : e
    }

    function Qn(e) {
        return e.charAt(e.length - 1) === "/" ? e.slice(0, -1) : e
    }

    function is(e) {
        var t = e || "/",
            r = "",
            n = "",
            a = t.indexOf("#");
        a !== -1 && (n = t.substr(a), t = t.substr(0, a));
        var s = t.indexOf("?");
        return s !== -1 && (r = t.substr(s), t = t.substr(0, s)), {
            pathname: t,
            search: r === "?" ? "" : r,
            hash: n === "#" ? "" : n
        }
    }

    function De(e) {
        var t = e.pathname,
            r = e.search,
            n = e.hash,
            a = t || "/";
        return r && r !== "?" && (a += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (a += n.charAt(0) === "#" ? n : "#" + n), a
    }

    function Me(e, t, r, n) {
        var a;
        typeof e == "string" ? (a = is(e), a.state = t) : (a = Le({}, e), a.pathname === void 0 && (a.pathname = ""), a.search ? a.search.charAt(0) !== "?" && (a.search = "?" + a.search) : a.search = "", a.hash ? a.hash.charAt(0) !== "#" && (a.hash = "#" + a.hash) : a.hash = "", t !== void 0 && a.state === void 0 && (a.state = t));
        try {
            a.pathname = decodeURI(a.pathname)
        } catch (s) {
            throw s instanceof URIError ? new URIError('Pathname "' + a.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : s
        }
        return r && (a.key = r), n ? a.pathname ? a.pathname.charAt(0) !== "/" && (a.pathname = rs(a.pathname, n.pathname)) : a.pathname = n.pathname : a.pathname || (a.pathname = "/"), a
    }

    function ss(e, t) {
        return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Jt(e.state, t.state)
    }

    function Ir() {
        var e = null;

        function t(o) {
            return e = o,
                function () {
                    e === o && (e = null)
                }
        }

        function r(o, l, c, f) {
            if (e != null) {
                var m = typeof e == "function" ? e(o, l) : e;
                typeof m == "string" ? typeof c == "function" ? c(m, f) : f(!0) : f(m !== !1)
            } else f(!0)
        }
        var n = [];

        function a(o) {
            var l = !0;

            function c() {
                l && o.apply(void 0, arguments)
            }
            return n.push(c),
                function () {
                    l = !1, n = n.filter(function (f) {
                        return f !== c
                    })
                }
        }

        function s() {
            for (var o = arguments.length, l = new Array(o), c = 0; c < o; c++) l[c] = arguments[c];
            n.forEach(function (f) {
                return f.apply(void 0, l)
            })
        }
        return {
            setPrompt: t,
            confirmTransitionTo: r,
            appendListener: a,
            notifyListeners: s
        }
    }
    var Zn = !!(typeof window < "u" && window.document && window.document.createElement);

    function Xn(e, t) {
        t(window.confirm(e))
    }

    function os() {
        var e = window.navigator.userAgent;
        return (e.indexOf("Android 2.") !== -1 || e.indexOf("Android 4.0") !== -1) && e.indexOf("Mobile Safari") !== -1 && e.indexOf("Chrome") === -1 && e.indexOf("Windows Phone") === -1 ? !1 : window.history && "pushState" in window.history
    }

    function ls() {
        return window.navigator.userAgent.indexOf("Trident") === -1
    }

    function cs() {
        return window.navigator.userAgent.indexOf("Firefox") === -1
    }

    function ds(e) {
        return e.state === void 0 && navigator.userAgent.indexOf("CriOS") === -1
    }
    var Jn = "popstate",
        ea = "hashchange";

    function ta() {
        try {
            return window.history.state || {}
        } catch {
            return {}
        }
    }

    function uu(e) {
        e === void 0 && (e = {}), Zn || ot(!1);
        var t = window.history,
            r = os(),
            n = !ls(),
            a = e,
            s = a.forceRefresh,
            o = s === void 0 ? !1 : s,
            l = a.getUserConfirmation,
            c = l === void 0 ? Xn : l,
            f = a.keyLength,
            m = f === void 0 ? 6 : f,
            v = e.basename ? Qn(Ft(e.basename)) : "";

        function x(k) {
            var R = k || {},
                H = R.key,
                E = R.state,
                Y = window.location,
                ae = Y.pathname,
                P = Y.search,
                oe = Y.hash,
                se = ae + P + oe;
            return v && (se = Yn(se, v)), Me(se, E, H)
        }

        function y() {
            return Math.random().toString(36).substr(2, m)
        }
        var N = Ir();

        function D(k) {
            Le(w, k), w.length = t.length, N.notifyListeners(w.location, w.action)
        }

        function F(k) {
            ds(k) || K(x(k.state))
        }

        function U() {
            K(x(ta()))
        }
        var C = !1;

        function K(k) {
            if (C) C = !1, D();
            else {
                var R = "POP";
                N.confirmTransitionTo(k, R, c, function (H) {
                    H ? D({
                        action: R,
                        location: k
                    }) : V(k)
                })
            }
        }

        function V(k) {
            var R = w.location,
                H = W.indexOf(R.key);
            H === -1 && (H = 0);
            var E = W.indexOf(k.key);
            E === -1 && (E = 0);
            var Y = H - E;
            Y && (C = !0, S(Y))
        }
        var q = x(ta()),
            W = [q.key];

        function I(k) {
            return v + De(k)
        }

        function p(k, R) {
            var H = "PUSH",
                E = Me(k, R, y(), w.location);
            N.confirmTransitionTo(E, H, c, function (Y) {
                if (Y) {
                    var ae = I(E),
                        P = E.key,
                        oe = E.state;
                    if (r)
                        if (t.pushState({
                            key: P,
                            state: oe
                        }, null, ae), o) window.location.href = ae;
                        else {
                            var se = W.indexOf(w.location.key),
                                fe = W.slice(0, se + 1);
                            fe.push(E.key), W = fe, D({
                                action: H,
                                location: E
                            })
                        }
                    else window.location.href = ae
                }
            })
        }

        function h(k, R) {
            var H = "REPLACE",
                E = Me(k, R, y(), w.location);
            N.confirmTransitionTo(E, H, c, function (Y) {
                if (Y) {
                    var ae = I(E),
                        P = E.key,
                        oe = E.state;
                    if (r)
                        if (t.replaceState({
                            key: P,
                            state: oe
                        }, null, ae), o) window.location.replace(ae);
                        else {
                            var se = W.indexOf(w.location.key);
                            se !== -1 && (W[se] = E.key), D({
                                action: H,
                                location: E
                            })
                        }
                    else window.location.replace(ae)
                }
            })
        }

        function S(k) {
            t.go(k)
        }

        function T() {
            S(-1)
        }

        function A() {
            S(1)
        }
        var L = 0;

        function z(k) {
            L += k, L === 1 && k === 1 ? (window.addEventListener(Jn, F), n && window.addEventListener(ea, U)) : L === 0 && (window.removeEventListener(Jn, F), n && window.removeEventListener(ea, U))
        }
        var X = !1;

        function J(k) {
            k === void 0 && (k = !1);
            var R = N.setPrompt(k);
            return X || (z(1), X = !0),
                function () {
                    return X && (X = !1, z(-1)), R()
                }
        }

        function j(k) {
            var R = N.appendListener(k);
            return z(1),
                function () {
                    z(-1), R()
                }
        }
        var w = {
            length: t.length,
            action: "POP",
            location: q,
            createHref: I,
            push: p,
            replace: h,
            go: S,
            goBack: T,
            goForward: A,
            block: J,
            listen: j
        };
        return w
    }
    var ra = "hashchange",
        us = {
            hashbang: {
                encodePath: function (e) {
                    return e.charAt(0) === "!" ? e : "!/" + Kn(e)
                },
                decodePath: function (e) {
                    return e.charAt(0) === "!" ? e.substr(1) : e
                }
            },
            noslash: {
                encodePath: Kn,
                decodePath: Ft
            },
            slash: {
                encodePath: Ft,
                decodePath: Ft
            }
        };

    function na(e) {
        var t = e.indexOf("#");
        return t === -1 ? e : e.slice(0, t)
    }

    function jt() {
        var e = window.location.href,
            t = e.indexOf("#");
        return t === -1 ? "" : e.substring(t + 1)
    }

    function fs(e) {
        window.location.hash = e
    }

    function Fr(e) {
        window.location.replace(na(window.location.href) + "#" + e)
    }

    function hs(e) {
        e === void 0 && (e = {}), Zn || ot(!1);
        var t = window.history;
        cs();
        var r = e,
            n = r.getUserConfirmation,
            a = n === void 0 ? Xn : n,
            s = r.hashType,
            o = s === void 0 ? "slash" : s,
            l = e.basename ? Qn(Ft(e.basename)) : "",
            c = us[o],
            f = c.encodePath,
            m = c.decodePath;

        function v() {
            var R = m(jt());
            return l && (R = Yn(R, l)), Me(R)
        }
        var x = Ir();

        function y(R) {
            Le(k, R), k.length = t.length, x.notifyListeners(k.location, k.action)
        }
        var N = !1,
            D = null;

        function F(R, H) {
            return R.pathname === H.pathname && R.search === H.search && R.hash === H.hash
        }

        function U() {
            var R = jt(),
                H = f(R);
            if (R !== H) Fr(H);
            else {
                var E = v(),
                    Y = k.location;
                if (!N && F(Y, E) || D === De(E)) return;
                D = null, C(E)
            }
        }

        function C(R) {
            if (N) N = !1, y();
            else {
                var H = "POP";
                x.confirmTransitionTo(R, H, a, function (E) {
                    E ? y({
                        action: H,
                        location: R
                    }) : K(R)
                })
            }
        }

        function K(R) {
            var H = k.location,
                E = I.lastIndexOf(De(H));
            E === -1 && (E = 0);
            var Y = I.lastIndexOf(De(R));
            Y === -1 && (Y = 0);
            var ae = E - Y;
            ae && (N = !0, T(ae))
        }
        var V = jt(),
            q = f(V);
        V !== q && Fr(q);
        var W = v(),
            I = [De(W)];

        function p(R) {
            var H = document.querySelector("base"),
                E = "";
            return H && H.getAttribute("href") && (E = na(window.location.href)), E + "#" + f(l + De(R))
        }

        function h(R, H) {
            var E = "PUSH",
                Y = Me(R, void 0, void 0, k.location);
            x.confirmTransitionTo(Y, E, a, function (ae) {
                if (ae) {
                    var P = De(Y),
                        oe = f(l + P),
                        se = jt() !== oe;
                    if (se) {
                        D = P, fs(oe);
                        var fe = I.lastIndexOf(De(k.location)),
                            ee = I.slice(0, fe + 1);
                        ee.push(P), I = ee, y({
                            action: E,
                            location: Y
                        })
                    } else y()
                }
            })
        }

        function S(R, H) {
            var E = "REPLACE",
                Y = Me(R, void 0, void 0, k.location);
            x.confirmTransitionTo(Y, E, a, function (ae) {
                if (ae) {
                    var P = De(Y),
                        oe = f(l + P),
                        se = jt() !== oe;
                    se && (D = P, Fr(oe));
                    var fe = I.indexOf(De(k.location));
                    fe !== -1 && (I[fe] = P), y({
                        action: E,
                        location: Y
                    })
                }
            })
        }

        function T(R) {
            t.go(R)
        }

        function A() {
            T(-1)
        }

        function L() {
            T(1)
        }
        var z = 0;

        function X(R) {
            z += R, z === 1 && R === 1 ? window.addEventListener(ra, U) : z === 0 && window.removeEventListener(ra, U)
        }
        var J = !1;

        function j(R) {
            R === void 0 && (R = !1);
            var H = x.setPrompt(R);
            return J || (X(1), J = !0),
                function () {
                    return J && (J = !1, X(-1)), H()
                }
        }

        function w(R) {
            var H = x.appendListener(R);
            return X(1),
                function () {
                    X(-1), H()
                }
        }
        var k = {
            length: t.length,
            action: "POP",
            location: W,
            createHref: p,
            push: h,
            replace: S,
            go: T,
            goBack: A,
            goForward: L,
            block: j,
            listen: w
        };
        return k
    }

    function aa(e, t, r) {
        return Math.min(Math.max(e, t), r)
    }

    function fu(e) {
        e === void 0 && (e = {});
        var t = e,
            r = t.getUserConfirmation,
            n = t.initialEntries,
            a = n === void 0 ? ["/"] : n,
            s = t.initialIndex,
            o = s === void 0 ? 0 : s,
            l = t.keyLength,
            c = l === void 0 ? 6 : l,
            f = Ir();

        function m(p) {
            Le(I, p), I.length = I.entries.length, f.notifyListeners(I.location, I.action)
        }

        function v() {
            return Math.random().toString(36).substr(2, c)
        }
        var x = aa(o, 0, a.length - 1),
            y = a.map(function (p) {
                return typeof p == "string" ? Me(p, void 0, v()) : Me(p, void 0, p.key || v())
            }),
            N = De;

        function D(p, h) {
            var S = "PUSH",
                T = Me(p, h, v(), I.location);
            f.confirmTransitionTo(T, S, r, function (A) {
                if (A) {
                    var L = I.index,
                        z = L + 1,
                        X = I.entries.slice(0);
                    X.length > z ? X.splice(z, X.length - z, T) : X.push(T), m({
                        action: S,
                        location: T,
                        index: z,
                        entries: X
                    })
                }
            })
        }

        function F(p, h) {
            var S = "REPLACE",
                T = Me(p, h, v(), I.location);
            f.confirmTransitionTo(T, S, r, function (A) {
                !A || (I.entries[I.index] = T, m({
                    action: S,
                    location: T
                }))
            })
        }

        function U(p) {
            var h = aa(I.index + p, 0, I.entries.length - 1),
                S = "POP",
                T = I.entries[h];
            f.confirmTransitionTo(T, S, r, function (A) {
                A ? m({
                    action: S,
                    location: T,
                    index: h
                }) : m()
            })
        }

        function C() {
            U(-1)
        }

        function K() {
            U(1)
        }

        function V(p) {
            var h = I.index + p;
            return h >= 0 && h < I.entries.length
        }

        function q(p) {
            return p === void 0 && (p = !1), f.setPrompt(p)
        }

        function W(p) {
            return f.appendListener(p)
        }
        var I = {
            length: y.length,
            action: "POP",
            location: y[x],
            index: x,
            entries: y,
            createHref: N,
            push: D,
            replace: F,
            go: U,
            goBack: C,
            goForward: K,
            canGo: V,
            block: q,
            listen: W
        };
        return I
    }
    var Nt = {
        exports: {}
    },
        ms = Array.isArray || function (e) {
            return Object.prototype.toString.call(e) == "[object Array]"
        },
        er = ms;
    Nt.exports = oa, Nt.exports.parse = jr, Nt.exports.compile = gs, Nt.exports.tokensToFunction = ia, Nt.exports.tokensToRegExp = sa;
    var ps = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");

    function jr(e, t) {
        for (var r = [], n = 0, a = 0, s = "", o = t && t.delimiter || "/", l;
            (l = ps.exec(e)) != null;) {
            var c = l[0],
                f = l[1],
                m = l.index;
            if (s += e.slice(a, m), a = m + c.length, f) {
                s += f[1];
                continue
            }
            var v = e[a],
                x = l[2],
                y = l[3],
                N = l[4],
                D = l[5],
                F = l[6],
                U = l[7];
            s && (r.push(s), s = "");
            var C = x != null && v != null && v !== x,
                K = F === "+" || F === "*",
                V = F === "?" || F === "*",
                q = l[2] || o,
                W = N || D;
            r.push({
                name: y || n++,
                prefix: x || "",
                delimiter: q,
                optional: V,
                repeat: K,
                partial: C,
                asterisk: !!U,
                pattern: W ? xs(W) : U ? ".*" : "[^" + tr(q) + "]+?"
            })
        }
        return a < e.length && (s += e.substr(a)), s && r.push(s), r
    }

    function gs(e, t) {
        return ia(jr(e, t), t)
    }

    function vs(e) {
        return encodeURI(e).replace(/[\/?#]/g, function (t) {
            return "%" + t.charCodeAt(0).toString(16).toUpperCase()
        })
    }

    function ys(e) {
        return encodeURI(e).replace(/[?#]/g, function (t) {
            return "%" + t.charCodeAt(0).toString(16).toUpperCase()
        })
    }

    function ia(e, t) {
        for (var r = new Array(e.length), n = 0; n < e.length; n++) typeof e[n] == "object" && (r[n] = new RegExp("^(?:" + e[n].pattern + ")$", Vr(t)));
        return function (a, s) {
            for (var o = "", l = a || {}, c = s || {}, f = c.pretty ? vs : encodeURIComponent, m = 0; m < e.length; m++) {
                var v = e[m];
                if (typeof v == "string") {
                    o += v;
                    continue
                }
                var x = l[v.name],
                    y;
                if (x == null)
                    if (v.optional) {
                        v.partial && (o += v.prefix);
                        continue
                    } else throw new TypeError('Expected "' + v.name + '" to be defined');
                if (er(x)) {
                    if (!v.repeat) throw new TypeError('Expected "' + v.name + '" to not repeat, but received `' + JSON.stringify(x) + "`");
                    if (x.length === 0) {
                        if (v.optional) continue;
                        throw new TypeError('Expected "' + v.name + '" to not be empty')
                    }
                    for (var N = 0; N < x.length; N++) {
                        if (y = f(x[N]), !r[m].test(y)) throw new TypeError('Expected all "' + v.name + '" to match "' + v.pattern + '", but received `' + JSON.stringify(y) + "`");
                        o += (N === 0 ? v.prefix : v.delimiter) + y
                    }
                    continue
                }
                if (y = v.asterisk ? ys(x) : f(x), !r[m].test(y)) throw new TypeError('Expected "' + v.name + '" to match "' + v.pattern + '", but received "' + y + '"');
                o += v.prefix + y
            }
            return o
        }
    }

    function tr(e) {
        return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
    }

    function xs(e) {
        return e.replace(/([=!:$\/()])/g, "\\$1")
    }

    function zr(e, t) {
        return e.keys = t, e
    }

    function Vr(e) {
        return e && e.sensitive ? "" : "i"
    }

    function bs(e, t) {
        var r = e.source.match(/\((?!\?)/g);
        if (r)
            for (var n = 0; n < r.length; n++) t.push({
                name: n,
                prefix: null,
                delimiter: null,
                optional: !1,
                repeat: !1,
                partial: !1,
                asterisk: !1,
                pattern: null
            });
        return zr(e, t)
    }

    function ws(e, t, r) {
        for (var n = [], a = 0; a < e.length; a++) n.push(oa(e[a], t, r).source);
        var s = new RegExp("(?:" + n.join("|") + ")", Vr(r));
        return zr(s, t)
    }

    function Ns(e, t, r) {
        return sa(jr(e, r), t, r)
    }

    function sa(e, t, r) {
        er(t) || (r = t || r, t = []), r = r || {};
        for (var n = r.strict, a = r.end !== !1, s = "", o = 0; o < e.length; o++) {
            var l = e[o];
            if (typeof l == "string") s += tr(l);
            else {
                var c = tr(l.prefix),
                    f = "(?:" + l.pattern + ")";
                t.push(l), l.repeat && (f += "(?:" + c + f + ")*"), l.optional ? l.partial ? f = c + "(" + f + ")?" : f = "(?:" + c + "(" + f + "))?" : f = c + "(" + f + ")", s += f
            }
        }
        var m = tr(r.delimiter || "/"),
            v = s.slice(-m.length) === m;
        return n || (s = (v ? s.slice(0, -m.length) : s) + "(?:" + m + "(?=$))?"), a ? s += "$" : s += n && v ? "" : "(?=" + m + "|$)", zr(new RegExp("^" + s, Vr(r)), t)
    }

    function oa(e, t, r) {
        return er(t) || (r = t || r, t = []), r = r || {}, e instanceof RegExp ? bs(e, t) : er(e) ? ws(e, t, r) : Ns(e, t, r)
    }
    var la = Nt.exports,
        ca = {
            exports: {}
        },
        ue = {},
        Ae = typeof Symbol == "function" && Symbol.for,
        Br = Ae ? Symbol.for("react.element") : 60103,
        Ur = Ae ? Symbol.for("react.portal") : 60106,
        rr = Ae ? Symbol.for("react.fragment") : 60107,
        nr = Ae ? Symbol.for("react.strict_mode") : 60108,
        ar = Ae ? Symbol.for("react.profiler") : 60114,
        ir = Ae ? Symbol.for("react.provider") : 60109,
        sr = Ae ? Symbol.for("react.context") : 60110,
        qr = Ae ? Symbol.for("react.async_mode") : 60111,
        or = Ae ? Symbol.for("react.concurrent_mode") : 60111,
        lr = Ae ? Symbol.for("react.forward_ref") : 60112,
        cr = Ae ? Symbol.for("react.suspense") : 60113,
        ks = Ae ? Symbol.for("react.suspense_list") : 60120,
        dr = Ae ? Symbol.for("react.memo") : 60115,
        ur = Ae ? Symbol.for("react.lazy") : 60116,
        Es = Ae ? Symbol.for("react.block") : 60121,
        Ss = Ae ? Symbol.for("react.fundamental") : 60117,
        Cs = Ae ? Symbol.for("react.responder") : 60118,
        _s = Ae ? Symbol.for("react.scope") : 60119;

    function Pe(e) {
        if (typeof e == "object" && e !== null) {
            var t = e.$$typeof;
            switch (t) {
                case Br:
                    switch (e = e.type, e) {
                        case qr:
                        case or:
                        case rr:
                        case ar:
                        case nr:
                        case cr:
                            return e;
                        default:
                            switch (e = e && e.$$typeof, e) {
                                case sr:
                                case lr:
                                case ur:
                                case dr:
                                case ir:
                                    return e;
                                default:
                                    return t
                            }
                    }
                case Ur:
                    return t
            }
        }
    }

    function da(e) {
        return Pe(e) === or
    }
    ue.AsyncMode = qr, ue.ConcurrentMode = or, ue.ContextConsumer = sr, ue.ContextProvider = ir, ue.Element = Br, ue.ForwardRef = lr, ue.Fragment = rr, ue.Lazy = ur, ue.Memo = dr, ue.Portal = Ur, ue.Profiler = ar, ue.StrictMode = nr, ue.Suspense = cr, ue.isAsyncMode = function (e) {
        return da(e) || Pe(e) === qr
    }, ue.isConcurrentMode = da, ue.isContextConsumer = function (e) {
        return Pe(e) === sr
    }, ue.isContextProvider = function (e) {
        return Pe(e) === ir
    }, ue.isElement = function (e) {
        return typeof e == "object" && e !== null && e.$$typeof === Br
    }, ue.isForwardRef = function (e) {
        return Pe(e) === lr
    }, ue.isFragment = function (e) {
        return Pe(e) === rr
    }, ue.isLazy = function (e) {
        return Pe(e) === ur
    }, ue.isMemo = function (e) {
        return Pe(e) === dr
    }, ue.isPortal = function (e) {
        return Pe(e) === Ur
    }, ue.isProfiler = function (e) {
        return Pe(e) === ar
    }, ue.isStrictMode = function (e) {
        return Pe(e) === nr
    }, ue.isSuspense = function (e) {
        return Pe(e) === cr
    }, ue.isValidElementType = function (e) {
        return typeof e == "string" || typeof e == "function" || e === rr || e === or || e === ar || e === nr || e === cr || e === ks || typeof e == "object" && e !== null && (e.$$typeof === ur || e.$$typeof === dr || e.$$typeof === ir || e.$$typeof === sr || e.$$typeof === lr || e.$$typeof === Ss || e.$$typeof === Cs || e.$$typeof === _s || e.$$typeof === Es)
    }, ue.typeOf = Pe, ca.exports = ue;

    function Wr(e, t) {
        if (e == null) return {};
        var r = {},
            n = Object.keys(e),
            a, s;
        for (s = 0; s < n.length; s++) a = n[s], !(t.indexOf(a) >= 0) && (r[a] = e[a]);
        return r
    }
    var ua = ca.exports,
        As = {
            $$typeof: !0,
            render: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0
        },
        Rs = {
            $$typeof: !0,
            compare: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
            type: !0
        },
        fa = {};
    fa[ua.ForwardRef] = As, fa[ua.Memo] = Rs;
    var $r = 1073741823,
        ha = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : {};

    function Ts() {
        var e = "__global_unique_id__";
        return ha[e] = (ha[e] || 0) + 1
    }

    function Ls(e, t) {
        return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t
    }

    function Os(e) {
        var t = [];
        return {
            on: function (r) {
                t.push(r)
            },
            off: function (r) {
                t = t.filter(function (n) {
                    return n !== r
                })
            },
            get: function () {
                return e
            },
            set: function (r, n) {
                e = r, t.forEach(function (a) {
                    return a(e, n)
                })
            }
        }
    }

    function Ds(e) {
        return Array.isArray(e) ? e[0] : e
    }

    function Ms(e, t) {
        var r, n, a = "__create-react-context-" + Ts() + "__",
            s = function (l) {
                mt(c, l);

                function c() {
                    for (var m, v = arguments.length, x = new Array(v), y = 0; y < v; y++) x[y] = arguments[y];
                    return m = l.call.apply(l, [this].concat(x)) || this, m.emitter = Os(m.props.value), m
                }
                var f = c.prototype;
                return f.getChildContext = function () {
                    var m;
                    return m = {}, m[a] = this.emitter, m
                }, f.componentWillReceiveProps = function (m) {
                    if (this.props.value !== m.value) {
                        var v = this.props.value,
                            x = m.value,
                            y;
                        Ls(v, x) ? y = 0 : (y = typeof t == "function" ? t(v, x) : $r, y |= 0, y !== 0 && this.emitter.set(m.value, y))
                    }
                }, f.render = function () {
                    return this.props.children
                }, c
            }(O.Component);
        s.childContextTypes = (r = {}, r[a] = Hn.object.isRequired, r);
        var o = function (l) {
            mt(c, l);

            function c() {
                for (var m, v = arguments.length, x = new Array(v), y = 0; y < v; y++) x[y] = arguments[y];
                return m = l.call.apply(l, [this].concat(x)) || this, m.observedBits = void 0, m.state = {
                    value: m.getValue()
                }, m.onUpdate = function (N, D) {
                    var F = m.observedBits | 0;
                    (F & D) !== 0 && m.setState({
                        value: m.getValue()
                    })
                }, m
            }
            var f = c.prototype;
            return f.componentWillReceiveProps = function (m) {
                var v = m.observedBits;
                this.observedBits = v != null ? v : $r
            }, f.componentDidMount = function () {
                this.context[a] && this.context[a].on(this.onUpdate);
                var m = this.props.observedBits;
                this.observedBits = m != null ? m : $r
            }, f.componentWillUnmount = function () {
                this.context[a] && this.context[a].off(this.onUpdate)
            }, f.getValue = function () {
                return this.context[a] ? this.context[a].get() : e
            }, f.render = function () {
                return Ds(this.props.children)(this.state.value)
            }, c
        }(O.Component);
        return o.contextTypes = (n = {}, n[a] = Hn.object, n), {
            Provider: s,
            Consumer: o
        }
    }
    var Ps = O.createContext || Ms,
        ma = function (e) {
            var t = Ps();
            return t.displayName = e, t
        },
        pa = ma("Router-History"),
        pt = ma("Router"),
        Is = function (e) {
            mt(t, e), t.computeRootMatch = function (n) {
                return {
                    path: "/",
                    url: "/",
                    params: {},
                    isExact: n === "/"
                }
            };

            function t(n) {
                var a;
                return a = e.call(this, n) || this, a.state = {
                    location: n.history.location
                }, a._isMounted = !1, a._pendingLocation = null, n.staticContext || (a.unlisten = n.history.listen(function (s) {
                    a._pendingLocation = s
                })), a
            }
            var r = t.prototype;
            return r.componentDidMount = function () {
                var n = this;
                this._isMounted = !0, this.unlisten && this.unlisten(), this.props.staticContext || (this.unlisten = this.props.history.listen(function (a) {
                    n._isMounted && n.setState({
                        location: a
                    })
                })), this._pendingLocation && this.setState({
                    location: this._pendingLocation
                })
            }, r.componentWillUnmount = function () {
                this.unlisten && (this.unlisten(), this._isMounted = !1, this._pendingLocation = null)
            }, r.render = function () {
                return O.createElement(pt.Provider, {
                    value: {
                        history: this.props.history,
                        location: this.state.location,
                        match: t.computeRootMatch(this.state.location.pathname),
                        staticContext: this.props.staticContext
                    }
                }, O.createElement(pa.Provider, {
                    children: this.props.children || null,
                    value: this.props.history
                }))
            }, t
        }(O.Component);
    O.Component;
    var Fs = function (e) {
        mt(t, e);

        function t() {
            return e.apply(this, arguments) || this
        }
        var r = t.prototype;
        return r.componentDidMount = function () {
            this.props.onMount && this.props.onMount.call(this, this)
        }, r.componentDidUpdate = function (n) {
            this.props.onUpdate && this.props.onUpdate.call(this, this, n)
        }, r.componentWillUnmount = function () {
            this.props.onUnmount && this.props.onUnmount.call(this, this)
        }, r.render = function () {
            return null
        }, t
    }(O.Component),
        Hr = {},
        js = 1e4,
        ga = 0;

    function zs(e) {
        if (Hr[e]) return Hr[e];
        var t = la.compile(e);
        return ga < js && (Hr[e] = t, ga++), t
    }

    function va(e, t) {
        return e === void 0 && (e = "/"), t === void 0 && (t = {}), e === "/" ? e : zs(e)(t, {
            pretty: !0
        })
    }

    function et(e) {
        var t = e.computedMatch,
            r = e.to,
            n = e.push,
            a = n === void 0 ? !1 : n;
        return O.createElement(pt.Consumer, null, function (s) {
            s || ot(!1);
            var o = s.history,
                l = s.staticContext,
                c = a ? o.push : o.replace,
                f = Me(t ? typeof r == "string" ? va(r, t.params) : Le({}, r, {
                    pathname: va(r.pathname, t.params)
                }) : r);
            return l ? (c(f), null) : O.createElement(Fs, {
                onMount: function () {
                    c(f)
                },
                onUpdate: function (m, v) {
                    var x = Me(v.to);
                    ss(x, Le({}, f, {
                        key: x.key
                    })) || c(f)
                },
                to: r
            })
        })
    }
    var ya = {},
        Vs = 1e4,
        xa = 0;

    function Bs(e, t) {
        var r = "" + t.end + t.strict + t.sensitive,
            n = ya[r] || (ya[r] = {});
        if (n[e]) return n[e];
        var a = [],
            s = la(e, a, t),
            o = {
                regexp: s,
                keys: a
            };
        return xa < Vs && (n[e] = o, xa++), o
    }

    function Gr(e, t) {
        t === void 0 && (t = {}), (typeof t == "string" || Array.isArray(t)) && (t = {
            path: t
        });
        var r = t,
            n = r.path,
            a = r.exact,
            s = a === void 0 ? !1 : a,
            o = r.strict,
            l = o === void 0 ? !1 : o,
            c = r.sensitive,
            f = c === void 0 ? !1 : c,
            m = [].concat(n);
        return m.reduce(function (v, x) {
            if (!x && x !== "") return null;
            if (v) return v;
            var y = Bs(x, {
                end: s,
                strict: l,
                sensitive: f
            }),
                N = y.regexp,
                D = y.keys,
                F = N.exec(e);
            if (!F) return null;
            var U = F[0],
                C = F.slice(1),
                K = e === U;
            return s && !K ? null : {
                path: x,
                url: x === "/" && U === "" ? "/" : U,
                isExact: K,
                params: D.reduce(function (V, q, W) {
                    return V[q.name] = C[W], V
                }, {})
            }
        }, null)
    }

    function Us(e) {
        return O.Children.count(e) === 0
    }
    var ba = function (e) {
        mt(t, e);

        function t() {
            return e.apply(this, arguments) || this
        }
        var r = t.prototype;
        return r.render = function () {
            var n = this;
            return O.createElement(pt.Consumer, null, function (a) {
                a || ot(!1);
                var s = n.props.location || a.location,
                    o = n.props.computedMatch ? n.props.computedMatch : n.props.path ? Gr(s.pathname, n.props) : a.match,
                    l = Le({}, a, {
                        location: s,
                        match: o
                    }),
                    c = n.props,
                    f = c.children,
                    m = c.component,
                    v = c.render;
                return Array.isArray(f) && Us(f) && (f = null), O.createElement(pt.Provider, {
                    value: l
                }, l.match ? f ? typeof f == "function" ? f(l) : f : m ? O.createElement(m, l) : v ? v(l) : null : typeof f == "function" ? f(l) : null)
            })
        }, t
    }(O.Component);

    function wa(e) {
        return e.charAt(0) === "/" ? e : "/" + e
    }

    function hu(e, t) {
        return e ? Le({}, t, {
            pathname: wa(e) + t.pathname
        }) : t
    }

    function mu(e, t) {
        if (!e) return t;
        var r = wa(e);
        return t.pathname.indexOf(r) !== 0 ? t : Le({}, t, {
            pathname: t.pathname.substr(r.length)
        })
    }

    function pu(e) {
        return typeof e == "string" ? e : De(e)
    }

    function gu(e) {
        return function () {
            ot(!1)
        }
    }

    function vu() { }
    O.Component;
    var qs = function (e) {
        mt(t, e);

        function t() {
            return e.apply(this, arguments) || this
        }
        var r = t.prototype;
        return r.render = function () {
            var n = this;
            return O.createElement(pt.Consumer, null, function (a) {
                a || ot(!1);
                var s = n.props.location || a.location,
                    o, l;
                return O.Children.forEach(n.props.children, function (c) {
                    if (l == null && O.isValidElement(c)) {
                        o = c;
                        var f = c.props.path || c.props.from;
                        l = f ? Gr(s.pathname, Le({}, c.props, {
                            path: f
                        })) : a.match
                    }
                }), l ? O.cloneElement(o, {
                    location: s,
                    computedMatch: l
                }) : null
            })
        }, t
    }(O.Component),
        Ws = O.useContext;

    function $s() {
        return Ws(pa)
    }
    O.Component;
    var Hs = function (e) {
        mt(t, e);

        function t() {
            for (var n, a = arguments.length, s = new Array(a), o = 0; o < a; o++) s[o] = arguments[o];
            return n = e.call.apply(e, [this].concat(s)) || this, n.history = hs(n.props), n
        }
        var r = t.prototype;
        return r.render = function () {
            return O.createElement(Is, {
                history: this.history,
                children: this.props.children
            })
        }, t
    }(O.Component),
        Kr = function (e, t) {
            return typeof e == "function" ? e(t) : e
        },
        Yr = function (e, t) {
            return typeof e == "string" ? Me(e, null, null, t) : e
        },
        Qr = function (e) {
            return e
        },
        kt = O.forwardRef;
    typeof kt > "u" && (kt = Qr);

    function Gs(e) {
        return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    }
    var Ks = kt(function (e, t) {
        var r = e.innerRef,
            n = e.navigate,
            a = e.onClick,
            s = Wr(e, ["innerRef", "navigate", "onClick"]),
            o = s.target,
            l = Le({}, s, {
                onClick: function (c) {
                    try {
                        a && a(c)
                    } catch (f) {
                        throw c.preventDefault(), f
                    } !c.defaultPrevented && c.button === 0 && (!o || o === "_self") && !Gs(c) && (c.preventDefault(), n())
                }
            });
        return Qr !== kt ? l.ref = t || r : l.ref = r, O.createElement("a", l)
    }),
        Ys = kt(function (e, t) {
            var r = e.component,
                n = r === void 0 ? Ks : r,
                a = e.replace,
                s = e.to,
                o = e.innerRef,
                l = Wr(e, ["component", "replace", "to", "innerRef"]);
            return O.createElement(pt.Consumer, null, function (c) {
                c || ot(!1);
                var f = c.history,
                    m = Yr(Kr(s, c.location), c.location),
                    v = m ? f.createHref(m) : "",
                    x = Le({}, l, {
                        href: v,
                        navigate: function () {
                            var y = Kr(s, c.location),
                                N = De(c.location) === De(Yr(y)),
                                D = a || N ? f.replace : f.push;
                            D(y)
                        }
                    });
                return Qr !== kt ? x.ref = t || o : x.innerRef = o, O.createElement(n, x)
            })
        }),
        Na = function (e) {
            return e
        },
        fr = O.forwardRef;
    typeof fr > "u" && (fr = Na);

    function Qs() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        return t.filter(function (n) {
            return n
        }).join(" ")
    }
    fr(function (e, t) {
        var r = e["aria-current"],
            n = r === void 0 ? "page" : r,
            a = e.activeClassName,
            s = a === void 0 ? "active" : a,
            o = e.activeStyle,
            l = e.className,
            c = e.exact,
            f = e.isActive,
            m = e.location,
            v = e.sensitive,
            x = e.strict,
            y = e.style,
            N = e.to,
            D = e.innerRef,
            F = Wr(e, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);
        return O.createElement(pt.Consumer, null, function (U) {
            U || ot(!1);
            var C = m || U.location,
                K = Yr(Kr(N, C), C),
                V = K.pathname,
                q = V && V.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),
                W = q ? Gr(C.pathname, {
                    path: q,
                    exact: c,
                    sensitive: v,
                    strict: x
                }) : null,
                I = !!(f ? f(W, C) : W),
                p = typeof l == "function" ? l(I) : l,
                h = typeof y == "function" ? y(I) : y;
            I && (p = Qs(p, s), h = Le({}, h, o));
            var S = Le({
                "aria-current": I && n || null,
                className: p,
                style: h,
                to: K
            }, F);
            return Na !== fr ? S.ref = t || D : S.innerRef = D, O.createElement(Ys, S)
        })
    });
    var zt = e => e.type === "checkbox",
        Et = e => e instanceof Date,
        Oe = e => e == null;
    const ka = e => typeof e == "object";
    var Se = e => !Oe(e) && !Array.isArray(e) && ka(e) && !Et(e),
        Zs = e => Se(e) && e.target ? zt(e.target) ? e.target.checked : e.target.value : e,
        Xs = e => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
        Js = (e, t) => e.has(Xs(t)),
        Vt = e => Array.isArray(e) ? e.filter(Boolean) : [],
        ke = e => e === void 0,
        Z = (e, t, r) => {
            if (!t || !Se(e)) return r;
            const n = Vt(t.split(/[,[\].]+?/)).reduce((a, s) => Oe(a) ? a : a[s], e);
            return ke(n) || n === e ? ke(e[t]) ? r : e[t] : n
        };
    const Ea = {
        BLUR: "blur",
        FOCUS_OUT: "focusout",
        CHANGE: "change"
    },
        Be = {
            onBlur: "onBlur",
            onChange: "onChange",
            onSubmit: "onSubmit",
            onTouched: "onTouched",
            all: "all"
        },
        tt = {
            max: "max",
            min: "min",
            maxLength: "maxLength",
            minLength: "minLength",
            pattern: "pattern",
            required: "required",
            validate: "validate"
        };
    O.createContext(null);
    var eo = (e, t, r, n = !0) => {
        const a = {
            defaultValues: t._defaultValues
        };
        for (const s in e) Object.defineProperty(a, s, {
            get: () => {
                const o = s;
                return t._proxyFormState[o] !== Be.all && (t._proxyFormState[o] = !n || Be.all), r && (r[o] = !0), e[o]
            }
        });
        return a
    },
        je = e => Se(e) && !Object.keys(e).length,
        to = (e, t, r, n) => {
            r(e);
            const {
                name: a,
                ...s
            } = e;
            return je(s) || Object.keys(s).length >= Object.keys(t).length || Object.keys(s).find(o => t[o] === (!n || Be.all))
        },
        Zr = e => Array.isArray(e) ? e : [e];

    function ro(e) {
        const t = O.useRef(e);
        t.current = e, O.useEffect(() => {
            const r = !e.disabled && t.current.subject.subscribe({
                next: t.current.next
            });
            return () => {
                r && r.unsubscribe()
            }
        }, [e.disabled])
    }
    var $e = e => typeof e == "string",
        no = (e, t, r, n, a) => $e(e) ? (n && t.watch.add(e), Z(r, e, a)) : Array.isArray(e) ? e.map(s => (n && t.watch.add(s), Z(r, s))) : (n && (t.watchAll = !0), r),
        ao = e => {
            const t = e.constructor && e.constructor.prototype;
            return Se(t) && t.hasOwnProperty("isPrototypeOf")
        },
        Xr = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";

    function gt(e) {
        let t;
        const r = Array.isArray(e);
        if (e instanceof Date) t = new Date(e);
        else if (e instanceof Set) t = new Set(e);
        else if (!(Xr && (e instanceof Blob || e instanceof FileList)) && (r || Se(e)))
            if (t = r ? [] : {}, !Array.isArray(e) && !ao(e)) t = e;
            else
                for (const n in e) t[n] = gt(e[n]);
        else return e;
        return t
    }
    var io = (e, t, r, n, a) => t ? {
        ...r[e],
        types: {
            ...r[e] && r[e].types ? r[e].types : {},
            [n]: a || !0
        }
    } : {},
        Jr = e => /^\w*$/.test(e),
        Sa = e => Vt(e.replace(/["|']|\]/g, "").split(/\.|\[/));

    function ge(e, t, r) {
        let n = -1;
        const a = Jr(t) ? [t] : Sa(t),
            s = a.length,
            o = s - 1;
        for (; ++n < s;) {
            const l = a[n];
            let c = r;
            if (n !== o) {
                const f = e[l];
                c = Se(f) || Array.isArray(f) ? f : isNaN(+a[n + 1]) ? {} : []
            }
            e[l] = c, e = e[l]
        }
        return e
    }
    const en = (e, t, r) => {
        for (const n of r || Object.keys(e)) {
            const a = Z(e, n);
            if (a) {
                const {
                    _f: s,
                    ...o
                } = a;
                if (s && t(s.name)) {
                    if (s.ref.focus) {
                        s.ref.focus();
                        break
                    } else if (s.refs && s.refs[0].focus) {
                        s.refs[0].focus();
                        break
                    }
                } else Se(o) && en(o, t)
            }
        }
    };
    var Ca = e => ({
        isOnSubmit: !e || e === Be.onSubmit,
        isOnBlur: e === Be.onBlur,
        isOnChange: e === Be.onChange,
        isOnAll: e === Be.all,
        isOnTouch: e === Be.onTouched
    }),
        _a = (e, t, r) => !r && (t.watchAll || t.watch.has(e) || [...t.watch].some(n => e.startsWith(n) && /^\.\w+/.test(e.slice(n.length)))),
        so = (e, t, r) => {
            const n = Vt(Z(e, r));
            return ge(n, "root", t[r]), ge(e, r, n), e
        },
        St = e => typeof e == "boolean",
        tn = e => e.type === "file",
        Ct = e => typeof e == "function",
        hr = e => {
            if (!Xr) return !1;
            const t = e ? e.ownerDocument : 0;
            return e instanceof (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
        },
        mr = e => $e(e) || O.isValidElement(e),
        rn = e => e.type === "radio",
        pr = e => e instanceof RegExp;
    const Aa = {
        value: !1,
        isValid: !1
    },
        Ra = {
            value: !0,
            isValid: !0
        };
    var Ta = e => {
        if (Array.isArray(e)) {
            if (e.length > 1) {
                const t = e.filter(r => r && r.checked && !r.disabled).map(r => r.value);
                return {
                    value: t,
                    isValid: !!t.length
                }
            }
            return e[0].checked && !e[0].disabled ? e[0].attributes && !ke(e[0].attributes.value) ? ke(e[0].value) || e[0].value === "" ? Ra : {
                value: e[0].value,
                isValid: !0
            } : Ra : Aa
        }
        return Aa
    };
    const La = {
        isValid: !1,
        value: null
    };
    var Oa = e => Array.isArray(e) ? e.reduce((t, r) => r && r.checked && !r.disabled ? {
        isValid: !0,
        value: r.value
    } : t, La) : La;

    function Da(e, t, r = "validate") {
        if (mr(e) || Array.isArray(e) && e.every(mr) || St(e) && !e) return {
            type: r,
            message: mr(e) ? e : "",
            ref: t
        }
    }
    var _t = e => Se(e) && !pr(e) ? e : {
        value: e,
        message: ""
    },
        Ma = async (e, t, r, n, a) => {
            const {
                ref: s,
                refs: o,
                required: l,
                maxLength: c,
                minLength: f,
                min: m,
                max: v,
                pattern: x,
                validate: y,
                name: N,
                valueAsNumber: D,
                mount: F,
                disabled: U
            } = e._f, C = Z(t, N);
            if (!F || U) return {};
            const K = o ? o[0] : s,
                V = A => {
                    n && K.reportValidity && (K.setCustomValidity(St(A) ? "" : A || ""), K.reportValidity())
                },
                q = {},
                W = rn(s),
                I = zt(s),
                p = W || I,
                h = (D || tn(s)) && ke(s.value) && ke(C) || hr(s) && s.value === "" || C === "" || Array.isArray(C) && !C.length,
                S = io.bind(null, N, r, q),
                T = (A, L, z, X = tt.maxLength, J = tt.minLength) => {
                    const j = A ? L : z;
                    q[N] = {
                        type: A ? X : J,
                        message: j,
                        ref: s,
                        ...S(A ? X : J, j)
                    }
                };
            if (a ? !Array.isArray(C) || !C.length : l && (!p && (h || Oe(C)) || St(C) && !C || I && !Ta(o).isValid || W && !Oa(o).isValid)) {
                const {
                    value: A,
                    message: L
                } = mr(l) ? {
                    value: !!l,
                    message: l
                } : _t(l);
                if (A && (q[N] = {
                    type: tt.required,
                    message: L,
                    ref: K,
                    ...S(tt.required, L)
                }, !r)) return V(L), q
            }
            if (!h && (!Oe(m) || !Oe(v))) {
                let A, L;
                const z = _t(v),
                    X = _t(m);
                if (!Oe(C) && !isNaN(C)) {
                    const J = s.valueAsNumber || C && +C;
                    Oe(z.value) || (A = J > z.value), Oe(X.value) || (L = J < X.value)
                } else {
                    const J = s.valueAsDate || new Date(C),
                        j = R => new Date(new Date().toDateString() + " " + R),
                        w = s.type == "time",
                        k = s.type == "week";
                    $e(z.value) && C && (A = w ? j(C) > j(z.value) : k ? C > z.value : J > new Date(z.value)), $e(X.value) && C && (L = w ? j(C) < j(X.value) : k ? C < X.value : J < new Date(X.value))
                }
                if ((A || L) && (T(!!A, z.message, X.message, tt.max, tt.min), !r)) return V(q[N].message), q
            }
            if ((c || f) && !h && ($e(C) || a && Array.isArray(C))) {
                const A = _t(c),
                    L = _t(f),
                    z = !Oe(A.value) && C.length > A.value,
                    X = !Oe(L.value) && C.length < L.value;
                if ((z || X) && (T(z, A.message, L.message), !r)) return V(q[N].message), q
            }
            if (x && !h && $e(C)) {
                const {
                    value: A,
                    message: L
                } = _t(x);
                if (pr(A) && !C.match(A) && (q[N] = {
                    type: tt.pattern,
                    message: L,
                    ref: s,
                    ...S(tt.pattern, L)
                }, !r)) return V(L), q
            }
            if (y) {
                if (Ct(y)) {
                    const A = await y(C, t),
                        L = Da(A, K);
                    if (L && (q[N] = {
                        ...L,
                        ...S(tt.validate, L.message)
                    }, !r)) return V(L.message), q
                } else if (Se(y)) {
                    let A = {};
                    for (const L in y) {
                        if (!je(A) && !r) break;
                        const z = Da(await y[L](C, t), K, L);
                        z && (A = {
                            ...z,
                            ...S(L, z.message)
                        }, V(z.message), r && (q[N] = A))
                    }
                    if (!je(A) && (q[N] = {
                        ref: K,
                        ...A
                    }, !r)) return q
                }
            }
            return V(!0), q
        };

    function oo(e, t) {
        const r = t.slice(0, -1).length;
        let n = 0;
        for (; n < r;) e = ke(e) ? n++ : e[t[n++]];
        return e
    }

    function lo(e) {
        for (const t in e)
            if (!ke(e[t])) return !1;
        return !0
    }

    function Te(e, t) {
        const r = Array.isArray(t) ? t : Jr(t) ? [t] : Sa(t),
            n = r.length === 1 ? e : oo(e, r),
            a = r.length - 1,
            s = r[a];
        return n && delete n[s], a !== 0 && (Se(n) && je(n) || Array.isArray(n) && lo(n)) && Te(e, r.slice(0, -1)), e
    }

    function nn() {
        let e = [];
        return {
            get observers() {
                return e
            },
            next: t => {
                for (const r of e) r.next(t)
            },
            subscribe: t => (e.push(t), {
                unsubscribe: () => {
                    e = e.filter(r => r !== t)
                }
            }),
            unsubscribe: () => {
                e = []
            }
        }
    }
    var gr = e => Oe(e) || !ka(e);

    function vt(e, t) {
        if (gr(e) || gr(t)) return e === t;
        if (Et(e) && Et(t)) return e.getTime() === t.getTime();
        const r = Object.keys(e),
            n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (const a of r) {
            const s = e[a];
            if (!n.includes(a)) return !1;
            if (a !== "ref") {
                const o = t[a];
                if (Et(s) && Et(o) || Se(s) && Se(o) || Array.isArray(s) && Array.isArray(o) ? !vt(s, o) : s !== o) return !1
            }
        }
        return !0
    }
    var Pa = e => e.type === "select-multiple",
        co = e => rn(e) || zt(e),
        an = e => hr(e) && e.isConnected,
        Ia = e => {
            for (const t in e)
                if (Ct(e[t])) return !0;
            return !1
        };

    function vr(e, t = {}) {
        const r = Array.isArray(e);
        if (Se(e) || r)
            for (const n in e) Array.isArray(e[n]) || Se(e[n]) && !Ia(e[n]) ? (t[n] = Array.isArray(e[n]) ? [] : {}, vr(e[n], t[n])) : Oe(e[n]) || (t[n] = !0);
        return t
    }

    function Fa(e, t, r) {
        const n = Array.isArray(e);
        if (Se(e) || n)
            for (const a in e) Array.isArray(e[a]) || Se(e[a]) && !Ia(e[a]) ? ke(t) || gr(r[a]) ? r[a] = Array.isArray(e[a]) ? vr(e[a], []) : {
                ...vr(e[a])
            } : Fa(e[a], Oe(t) ? {} : t[a], r[a]) : vt(e[a], t[a]) ? delete r[a] : r[a] = !0;
        return r
    }
    var sn = (e, t) => Fa(e, t, vr(t)),
        ja = (e, {
            valueAsNumber: t,
            valueAsDate: r,
            setValueAs: n
        }) => ke(e) ? e : t ? e === "" ? NaN : e && +e : r && $e(e) ? new Date(e) : n ? n(e) : e;

    function on(e) {
        const t = e.ref;
        if (!(e.refs ? e.refs.every(r => r.disabled) : t.disabled)) return tn(t) ? t.files : rn(t) ? Oa(e.refs).value : Pa(t) ? [...t.selectedOptions].map(({
            value: r
        }) => r) : zt(t) ? Ta(e.refs).value : ja(ke(t.value) ? e.ref.value : t.value, e)
    }
    var uo = (e, t, r, n) => {
        const a = {};
        for (const s of e) {
            const o = Z(t, s);
            o && ge(a, s, o._f)
        }
        return {
            criteriaMode: r,
            names: [...e],
            fields: a,
            shouldUseNativeValidation: n
        }
    },
        Bt = e => ke(e) ? e : pr(e) ? e.source : Se(e) ? pr(e.value) ? e.value.source : e.value : e,
        fo = e => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate);

    function za(e, t, r) {
        const n = Z(e, r);
        if (n || Jr(r)) return {
            error: n,
            name: r
        };
        const a = r.split(".");
        for (; a.length;) {
            const s = a.join("."),
                o = Z(t, s),
                l = Z(e, s);
            if (o && !Array.isArray(o) && r !== s) return {
                name: r
            };
            if (l && l.type) return {
                name: s,
                error: l
            };
            a.pop()
        }
        return {
            name: r
        }
    }
    var ho = (e, t, r, n, a) => a.isOnAll ? !1 : !r && a.isOnTouch ? !(t || e) : (r ? n.isOnBlur : a.isOnBlur) ? !e : (r ? n.isOnChange : a.isOnChange) ? e : !0,
        mo = (e, t) => !Vt(Z(e, t)).length && Te(e, t);
    const po = {
        mode: Be.onSubmit,
        reValidateMode: Be.onChange,
        shouldFocusError: !0
    };

    function go(e = {}, t) {
        let r = {
            ...po,
            ...e
        };
        const n = e.resetOptions && e.resetOptions.keepDirtyValues;
        let a = {
            submitCount: 0,
            isDirty: !1,
            isLoading: !0,
            isValidating: !1,
            isSubmitted: !1,
            isSubmitting: !1,
            isSubmitSuccessful: !1,
            isValid: !1,
            touchedFields: {},
            dirtyFields: {},
            errors: {}
        },
            s = {},
            o = Se(r.defaultValues) || Se(r.values) ? gt(r.defaultValues || r.values) || {} : {},
            l = r.shouldUnregister ? {} : gt(o),
            c = {
                action: !1,
                mount: !1,
                watch: !1
            },
            f = {
                mount: new Set,
                unMount: new Set,
                array: new Set,
                watch: new Set
            },
            m, v = 0;
        const x = {
            isDirty: !1,
            dirtyFields: !1,
            touchedFields: !1,
            isValidating: !1,
            isValid: !1,
            errors: !1
        },
            y = {
                watch: nn(),
                array: nn(),
                state: nn()
            },
            N = Ca(r.mode),
            D = Ca(r.reValidateMode),
            F = r.criteriaMode === Be.all,
            U = g => b => {
                clearTimeout(v), v = window.setTimeout(g, b)
            },
            C = async g => {
                if (x.isValid || g) {
                    const b = r.resolver ? je((await h()).errors) : await T(s, !0);
                    b !== a.isValid && y.state.next({
                        isValid: b
                    })
                }
            }, K = g => x.isValidating && y.state.next({
                isValidating: g
            }), V = (g, b = [], _, B, G = !0, M = !0) => {
                if (B && _) {
                    if (c.action = !0, M && Array.isArray(Z(s, g))) {
                        const Q = _(Z(s, g), B.argA, B.argB);
                        G && ge(s, g, Q)
                    }
                    if (M && Array.isArray(Z(a.errors, g))) {
                        const Q = _(Z(a.errors, g), B.argA, B.argB);
                        G && ge(a.errors, g, Q), mo(a.errors, g)
                    }
                    if (x.touchedFields && M && Array.isArray(Z(a.touchedFields, g))) {
                        const Q = _(Z(a.touchedFields, g), B.argA, B.argB);
                        G && ge(a.touchedFields, g, Q)
                    }
                    x.dirtyFields && (a.dirtyFields = sn(o, l)), y.state.next({
                        name: g,
                        isDirty: L(g, b),
                        dirtyFields: a.dirtyFields,
                        errors: a.errors,
                        isValid: a.isValid
                    })
                } else ge(l, g, b)
            }, q = (g, b) => {
                ge(a.errors, g, b), y.state.next({
                    errors: a.errors
                })
            }, W = (g, b, _, B) => {
                const G = Z(s, g);
                if (G) {
                    const M = Z(l, g, ke(_) ? Z(o, g) : _);
                    ke(M) || B && B.defaultChecked || b ? ge(l, g, b ? M : on(G._f)) : J(g, M), c.mount && C()
                }
            }, I = (g, b, _, B, G) => {
                let M = !1,
                    Q = !1;
                const te = {
                    name: g
                };
                if (!_ || B) {
                    x.isDirty && (Q = a.isDirty, a.isDirty = te.isDirty = L(), M = Q !== te.isDirty);
                    const re = vt(Z(o, g), b);
                    Q = Z(a.dirtyFields, g), re ? Te(a.dirtyFields, g) : ge(a.dirtyFields, g, !0), te.dirtyFields = a.dirtyFields, M = M || x.dirtyFields && Q !== !re
                }
                if (_) {
                    const re = Z(a.touchedFields, g);
                    re || (ge(a.touchedFields, g, _), te.touchedFields = a.touchedFields, M = M || x.touchedFields && re !== _)
                }
                return M && G && y.state.next(te), M ? te : {}
            }, p = (g, b, _, B) => {
                const G = Z(a.errors, g),
                    M = x.isValid && St(b) && a.isValid !== b;
                if (e.delayError && _ ? (m = U(() => q(g, _)), m(e.delayError)) : (clearTimeout(v), m = null, _ ? ge(a.errors, g, _) : Te(a.errors, g)), (_ ? !vt(G, _) : G) || !je(B) || M) {
                    const Q = {
                        ...B,
                        ...M && St(b) ? {
                            isValid: b
                        } : {},
                        errors: a.errors,
                        name: g
                    };
                    a = {
                        ...a,
                        ...Q
                    }, y.state.next(Q)
                }
                K(!1)
            }, h = async g => await r.resolver(l, r.context, uo(g || f.mount, s, r.criteriaMode, r.shouldUseNativeValidation)), S = async g => {
                const {
                    errors: b
                } = await h();
                if (g)
                    for (const _ of g) {
                        const B = Z(b, _);
                        B ? ge(a.errors, _, B) : Te(a.errors, _)
                    } else a.errors = b;
                return b
            }, T = async (g, b, _ = {
                valid: !0
            }) => {
                for (const B in g) {
                    const G = g[B];
                    if (G) {
                        const {
                            _f: M,
                            ...Q
                        } = G;
                        if (M) {
                            const te = f.array.has(M.name),
                                re = await Ma(G, l, F, r.shouldUseNativeValidation, te);
                            if (re[M.name] && (_.valid = !1, b)) break;
                            !b && (Z(re, M.name) ? te ? so(a.errors, re, M.name) : ge(a.errors, M.name, re[M.name]) : Te(a.errors, M.name))
                        }
                        Q && await T(Q, b, _)
                    }
                }
                return _.valid
            }, A = () => {
                for (const g of f.unMount) {
                    const b = Z(s, g);
                    b && (b._f.refs ? b._f.refs.every(_ => !an(_)) : !an(b._f.ref)) && oe(g)
                }
                f.unMount = new Set
            }, L = (g, b) => (g && b && ge(l, g, b), !vt(H(), o)), z = (g, b, _) => no(g, f, {
                ...c.mount ? l : ke(b) ? o : $e(g) ? {
                    [g]: b
                } : b
            }, _, b), X = g => Vt(Z(c.mount ? l : o, g, e.shouldUnregister ? Z(o, g, []) : [])), J = (g, b, _ = {}) => {
                const B = Z(s, g);
                let G = b;
                if (B) {
                    const M = B._f;
                    M && (!M.disabled && ge(l, g, ja(b, M)), G = hr(M.ref) && Oe(b) ? "" : b, Pa(M.ref) ? [...M.ref.options].forEach(Q => Q.selected = G.includes(Q.value)) : M.refs ? zt(M.ref) ? M.refs.length > 1 ? M.refs.forEach(Q => (!Q.defaultChecked || !Q.disabled) && (Q.checked = Array.isArray(G) ? !!G.find(te => te === Q.value) : G === Q.value)) : M.refs[0] && (M.refs[0].checked = !!G) : M.refs.forEach(Q => Q.checked = Q.value === G) : tn(M.ref) ? M.ref.value = "" : (M.ref.value = G, M.ref.type || y.watch.next({
                        name: g
                    })))
                } (_.shouldDirty || _.shouldTouch) && I(g, G, _.shouldTouch, _.shouldDirty, !0), _.shouldValidate && R(g)
            }, j = (g, b, _) => {
                for (const B in b) {
                    const G = b[B],
                        M = `${g}.${B}`,
                        Q = Z(s, M);
                    (f.array.has(g) || !gr(G) || Q && !Q._f) && !Et(G) ? j(M, G, _) : J(M, G, _)
                }
            }, w = (g, b, _ = {}) => {
                const B = Z(s, g),
                    G = f.array.has(g),
                    M = gt(b);
                ge(l, g, M), G ? (y.array.next({
                    name: g,
                    values: l
                }), (x.isDirty || x.dirtyFields) && _.shouldDirty && y.state.next({
                    name: g,
                    dirtyFields: sn(o, l),
                    isDirty: L(g, M)
                })) : B && !B._f && !Oe(M) ? j(g, M, _) : J(g, M, _), _a(g, f) && y.state.next({}), y.watch.next({
                    name: g
                }), !c.mount && t()
            }, k = async g => {
                const b = g.target;
                let _ = b.name;
                const B = Z(s, _),
                    G = () => b.type ? on(B._f) : Zs(g);
                if (B) {
                    let M, Q;
                    const te = G(),
                        re = g.type === Ea.BLUR || g.type === Ea.FOCUS_OUT,
                        it = !fo(B._f) && !r.resolver && !Z(a.errors, _) && !B._f.deps || ho(re, Z(a.touchedFields, _), a.isSubmitted, D, N),
                        ce = _a(_, f, re);
                    ge(l, _, te), re ? (B._f.onBlur && B._f.onBlur(g), m && m(0)) : B._f.onChange && B._f.onChange(g);
                    const Qe = I(_, te, re, !1),
                        qe = !je(Qe) || ce;
                    if (!re && y.watch.next({
                        name: _,
                        type: g.type
                    }), it) return x.isValid && C(), qe && y.state.next({
                        name: _,
                        ...ce ? {} : Qe
                    });
                    if (!re && ce && y.state.next({}), K(!0), r.resolver) {
                        const {
                            errors: Ze
                        } = await h([_]), Xe = za(a.errors, s, _), We = za(Ze, s, Xe.name || _);
                        M = We.error, _ = We.name, Q = je(Ze)
                    } else M = (await Ma(B, l, F, r.shouldUseNativeValidation))[_], M ? Q = !1 : x.isValid && (Q = await T(s, !0));
                    B._f.deps && R(B._f.deps), p(_, Q, M, Qe)
                }
            }, R = async (g, b = {}) => {
                let _, B;
                const G = Zr(g);
                if (K(!0), r.resolver) {
                    const M = await S(ke(g) ? g : G);
                    _ = je(M), B = g ? !G.some(Q => Z(M, Q)) : _
                } else g ? (B = (await Promise.all(G.map(async M => {
                    const Q = Z(s, M);
                    return await T(Q && Q._f ? {
                        [M]: Q
                    } : Q)
                }))).every(Boolean), !(!B && !a.isValid) && C()) : B = _ = await T(s);
                return y.state.next({
                    ...!$e(g) || x.isValid && _ !== a.isValid ? {} : {
                        name: g
                    },
                    ...r.resolver || !g ? {
                        isValid: _
                    } : {},
                    errors: a.errors,
                    isValidating: !1
                }), b.shouldFocus && !B && en(s, M => M && Z(a.errors, M), g ? G : f.mount), B
            }, H = g => {
                const b = {
                    ...o,
                    ...c.mount ? l : {}
                };
                return ke(g) ? b : $e(g) ? Z(b, g) : g.map(_ => Z(b, _))
            }, E = (g, b) => ({
                invalid: !!Z((b || a).errors, g),
                isDirty: !!Z((b || a).dirtyFields, g),
                isTouched: !!Z((b || a).touchedFields, g),
                error: Z((b || a).errors, g)
            }), Y = g => {
                g && Zr(g).forEach(b => Te(a.errors, b)), y.state.next({
                    errors: g ? a.errors : {}
                })
            }, ae = (g, b, _) => {
                const B = (Z(s, g, {
                    _f: {}
                })._f || {}).ref;
                ge(a.errors, g, {
                    ...b,
                    ref: B
                }), y.state.next({
                    name: g,
                    errors: a.errors,
                    isValid: !1
                }), _ && _.shouldFocus && B && B.focus && B.focus()
            }, P = (g, b) => Ct(g) ? y.watch.subscribe({
                next: _ => g(z(void 0, b), _)
            }) : z(g, b, !0), oe = (g, b = {}) => {
                for (const _ of g ? Zr(g) : f.mount) f.mount.delete(_), f.array.delete(_), Z(s, _) && (b.keepValue || (Te(s, _), Te(l, _)), !b.keepError && Te(a.errors, _), !b.keepDirty && Te(a.dirtyFields, _), !b.keepTouched && Te(a.touchedFields, _), !r.shouldUnregister && !b.keepDefaultValue && Te(o, _));
                y.watch.next({}), y.state.next({
                    ...a,
                    ...b.keepDirty ? {
                        isDirty: L()
                    } : {}
                }), !b.keepIsValid && C()
            }, se = (g, b = {}) => {
                let _ = Z(s, g);
                const B = St(b.disabled);
                return ge(s, g, {
                    ..._ || {},
                    _f: {
                        ..._ && _._f ? _._f : {
                            ref: {
                                name: g
                            }
                        },
                        name: g,
                        mount: !0,
                        ...b
                    }
                }), f.mount.add(g), _ ? B && ge(l, g, b.disabled ? void 0 : Z(l, g, on(_._f))) : W(g, !0, b.value), {
                    ...B ? {
                        disabled: b.disabled
                    } : {},
                    ...r.shouldUseNativeValidation ? {
                        required: !!b.required,
                        min: Bt(b.min),
                        max: Bt(b.max),
                        minLength: Bt(b.minLength),
                        maxLength: Bt(b.maxLength),
                        pattern: Bt(b.pattern)
                    } : {},
                    name: g,
                    onChange: k,
                    onBlur: k,
                    ref: G => {
                        if (G) {
                            se(g, b), _ = Z(s, g);
                            const M = ke(G.value) && G.querySelectorAll && G.querySelectorAll("input,select,textarea")[0] || G,
                                Q = co(M),
                                te = _._f.refs || [];
                            if (Q ? te.find(re => re === M) : M === _._f.ref) return;
                            ge(s, g, {
                                _f: {
                                    ..._._f,
                                    ...Q ? {
                                        refs: [...te.filter(an), M, ...Array.isArray(Z(o, g)) ? [{}] : []],
                                        ref: {
                                            type: M.type,
                                            name: g
                                        }
                                    } : {
                                        ref: M
                                    }
                                }
                            }), W(g, !1, void 0, M)
                        } else _ = Z(s, g, {}), _._f && (_._f.mount = !1), (r.shouldUnregister || b.shouldUnregister) && !(Js(f.array, g) && c.action) && f.unMount.add(g)
                    }
                }
            }, fe = () => r.shouldFocusError && en(s, g => g && Z(a.errors, g), f.mount), ee = (g, b) => async _ => {
                _ && (_.preventDefault && _.preventDefault(), _.persist && _.persist());
                let B = gt(l);
                if (y.state.next({
                    isSubmitting: !0
                }), r.resolver) {
                    const {
                        errors: G,
                        values: M
                    } = await h();
                    a.errors = G, B = M
                } else await T(s);
                Te(a.errors, "root"), je(a.errors) ? (y.state.next({
                    errors: {}
                }), await g(B, _)) : (b && await b({
                    ...a.errors
                }, _), fe()), y.state.next({
                    isSubmitted: !0,
                    isSubmitting: !1,
                    isSubmitSuccessful: je(a.errors),
                    submitCount: a.submitCount + 1,
                    errors: a.errors
                })
            }, le = (g, b = {}) => {
                Z(s, g) && (ke(b.defaultValue) ? w(g, Z(o, g)) : (w(g, b.defaultValue), ge(o, g, b.defaultValue)), b.keepTouched || Te(a.touchedFields, g), b.keepDirty || (Te(a.dirtyFields, g), a.isDirty = b.defaultValue ? L(g, Z(o, g)) : L()), b.keepError || (Te(a.errors, g), x.isValid && C()), y.state.next({
                    ...a
                }))
            }, pe = (g, b = {}) => {
                const _ = g || o,
                    B = gt(_),
                    G = g && !je(g) ? B : o;
                if (b.keepDefaultValues || (o = _), !b.keepValues) {
                    if (b.keepDirtyValues || n)
                        for (const M of f.mount) Z(a.dirtyFields, M) ? ge(G, M, Z(l, M)) : w(M, Z(G, M));
                    else {
                        if (Xr && ke(g))
                            for (const M of f.mount) {
                                const Q = Z(s, M);
                                if (Q && Q._f) {
                                    const te = Array.isArray(Q._f.refs) ? Q._f.refs[0] : Q._f.ref;
                                    if (hr(te)) {
                                        const re = te.closest("form");
                                        if (re) {
                                            re.reset();
                                            break
                                        }
                                    }
                                }
                            }
                        s = {}
                    }
                    l = e.shouldUnregister ? b.keepDefaultValues ? gt(o) : {} : B, y.array.next({
                        values: G
                    }), y.watch.next({
                        values: G
                    })
                }
                f = {
                    mount: new Set,
                    unMount: new Set,
                    array: new Set,
                    watch: new Set,
                    watchAll: !1,
                    focus: ""
                }, !c.mount && t(), c.mount = !x.isValid || !!b.keepIsValid, c.watch = !!e.shouldUnregister, y.state.next({
                    submitCount: b.keepSubmitCount ? a.submitCount : 0,
                    isDirty: b.keepDirty || b.keepDirtyValues ? a.isDirty : !!(b.keepDefaultValues && !vt(g, o)),
                    isSubmitted: b.keepIsSubmitted ? a.isSubmitted : !1,
                    dirtyFields: b.keepDirty || b.keepDirtyValues ? a.dirtyFields : b.keepDefaultValues && g ? sn(o, g) : {},
                    touchedFields: b.keepTouched ? a.touchedFields : {},
                    errors: b.keepErrors ? a.errors : {},
                    isSubmitting: !1,
                    isSubmitSuccessful: !1
                })
            }, Ne = (g, b) => pe(Ct(g) ? g(l) : g, b), he = (g, b = {}) => {
                const _ = Z(s, g),
                    B = _ && _._f;
                if (B) {
                    const G = B.refs ? B.refs[0] : B.ref;
                    G.focus && (G.focus(), b.shouldSelect && G.select())
                }
            }, Re = g => {
                a = {
                    ...a,
                    ...g
                }
            };
        return Ct(r.defaultValues) && r.defaultValues().then(g => {
            Ne(g, r.resetOptions), y.state.next({
                isLoading: !1
            })
        }), {
            control: {
                register: se,
                unregister: oe,
                getFieldState: E,
                _executeSchema: h,
                _focusError: fe,
                _getWatch: z,
                _getDirty: L,
                _updateValid: C,
                _removeUnmounted: A,
                _updateFieldArray: V,
                _getFieldArray: X,
                _reset: pe,
                _updateFormState: Re,
                _subjects: y,
                _proxyFormState: x,
                get _fields() {
                    return s
                },
                get _formValues() {
                    return l
                },
                get _stateFlags() {
                    return c
                },
                set _stateFlags(g) {
                    c = g
                },
                get _defaultValues() {
                    return o
                },
                get _names() {
                    return f
                },
                set _names(g) {
                    f = g
                },
                get _formState() {
                    return a
                },
                set _formState(g) {
                    a = g
                },
                get _options() {
                    return r
                },
                set _options(g) {
                    r = {
                        ...r,
                        ...g
                    }
                }
            },
            trigger: R,
            register: se,
            handleSubmit: ee,
            watch: P,
            setValue: w,
            getValues: H,
            reset: Ne,
            resetField: le,
            clearErrors: Y,
            unregister: oe,
            setError: ae,
            setFocus: he,
            getFieldState: E
        }
    }

    function Ut(e = {}) {
        const t = O.useRef(),
            [r, n] = O.useState({
                isDirty: !1,
                isValidating: !1,
                isLoading: !0,
                isSubmitted: !1,
                isSubmitting: !1,
                isSubmitSuccessful: !1,
                isValid: !1,
                submitCount: 0,
                dirtyFields: {},
                touchedFields: {},
                errors: {},
                defaultValues: Ct(e.defaultValues) ? void 0 : e.defaultValues
            });
        t.current || (t.current = {
            ...go(e, () => n(s => ({
                ...s
            }))),
            formState: r
        });
        const a = t.current.control;
        return a._options = e, ro({
            subject: a._subjects.state,
            next: s => {
                to(s, a._proxyFormState, a._updateFormState, !0) && n({
                    ...a._formState
                })
            }
        }), O.useEffect(() => {
            a._stateFlags.mount || (a._updateValid(), a._stateFlags.mount = !0), a._stateFlags.watch && (a._stateFlags.watch = !1, a._subjects.state.next({})), a._removeUnmounted()
        }), O.useEffect(() => {
            e.values && !vt(e.values, a._defaultValues) && a._reset(e.values, a._options.resetOptions)
        }, [e.values, a]), O.useEffect(() => {
            r.submitCount && a._focusError()
        }, [a, r.submitCount]), t.current.formState = eo(r, a), t.current
    }
    const vo = ({
        type: e,
        message: t,
        onDismiss: r
    }) => i("div", {
        className: $({
            "rounded-md bg-green-50 p-4": e === "success",
            "rounded-md bg-red-50 p-4": e === "error",
            "rounded-md bg-yellow-50 p-4": e === "warning",
            "rounded-md bg-blue-50 p-4": e === "info"
        }),
        children: u("div", {
            className: "flex",
            children: [u("div", {
                className: "flex-shrink-0",
                children: [e === "success" && i("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    className: "w-5 h-5 text-green-400",
                    children: i("path", {
                        fillRule: "evenodd",
                        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z",
                        clipRule: "evenodd"
                    })
                }), e === "error" && i("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    className: "w-5 h-5 text-red-400",
                    children: i("path", {
                        fillRule: "evenodd",
                        d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z",
                        clipRule: "evenodd"
                    })
                }), e === "warning" && i("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    className: "w-5 h-5 text-yellow-400",
                    children: i("path", {
                        fillRule: "evenodd",
                        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
                        clipRule: "evenodd"
                    })
                }), e === "info" && i("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    className: "w-5 h-5 text-blue-400",
                    children: i("path", {
                        fillRule: "evenodd",
                        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z",
                        clipRule: "evenodd"
                    })
                })]
            }), i("div", {
                className: "ml-3",
                children: i("p", {
                    className: $({
                        "text-sm font-medium text-green-800": e === "success",
                        "text-sm font-medium text-red-800": e === "error",
                        "text-sm font-medium text-yellow-800": e === "warning",
                        "text-sm font-medium text-blue-800": e === "info"
                    }),
                    children: t
                })
            }), i("div", {
                className: "pl-3 ml-auto",
                children: i("div", {
                    className: "-mx-1.5 -my-1.5",
                    children: u("button", {
                        type: "button",
                        className: $({
                            "inline-flex rounded-md  p-1.5   focus:outline-none focus:ring-2  focus:ring-offset-2 ": !0,
                            "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50": e === "success",
                            "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50": e === "error",
                            "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50": e === "warning",
                            "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50": e === "info"
                        }),
                        children: [i("span", {
                            className: "sr-only",
                            children: "Dismiss"
                        }), i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            onClick: r,
                            className: "w-5 h-5",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",
                                clipRule: "evenodd"
                            })
                        })]
                    })
                })
            })]
        })
    });
    var yo = Object.defineProperty,
        xo = (e, t, r) => t in e ? yo(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : e[t] = r,
        ln = (e, t, r) => (xo(e, typeof t != "symbol" ? t + "" : t, r), r);
    class bo {
        constructor() {
            ln(this, "current", this.detect()), ln(this, "handoffState", "pending"), ln(this, "currentId", 0)
        }
        set(t) {
            this.current !== t && (this.handoffState = "pending", this.currentId = 0, this.current = t)
        }
        reset() {
            this.set(this.detect())
        }
        nextId() {
            return ++this.currentId
        }
        get isServer() {
            return this.current === "server"
        }
        get isClient() {
            return this.current === "client"
        }
        detect() {
            return typeof window > "u" || typeof document > "u" ? "server" : "client"
        }
        handoff() {
            this.handoffState === "pending" && (this.handoffState = "complete")
        }
        get isHandoffComplete() {
            return this.handoffState === "complete"
        }
    }
    let He = new bo,
        Ce = (e, t) => {
            He.isServer ? d.exports.useEffect(e, t) : d.exports.useLayoutEffect(e, t)
        };

    function Ge(e) {
        let t = d.exports.useRef(e);
        return Ce(() => {
            t.current = e
        }, [e]), t
    }

    function yr(e) {
        typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch(t => setTimeout(() => {
            throw t
        }))
    }

    function rt() {
        let e = [],
            t = [],
            r = {
                enqueue(n) {
                    t.push(n)
                },
                addEventListener(n, a, s, o) {
                    return n.addEventListener(a, s, o), r.add(() => n.removeEventListener(a, s, o))
                },
                requestAnimationFrame(...n) {
                    let a = requestAnimationFrame(...n);
                    return r.add(() => cancelAnimationFrame(a))
                },
                nextFrame(...n) {
                    return r.requestAnimationFrame(() => r.requestAnimationFrame(...n))
                },
                setTimeout(...n) {
                    let a = setTimeout(...n);
                    return r.add(() => clearTimeout(a))
                },
                microTask(...n) {
                    let a = {
                        current: !0
                    };
                    return yr(() => {
                        a.current && n[0]()
                    }), r.add(() => {
                        a.current = !1
                    })
                },
                add(n) {
                    return e.push(n), () => {
                        let a = e.indexOf(n);
                        if (a >= 0) {
                            let [s] = e.splice(a, 1);
                            s()
                        }
                    }
                },
                dispose() {
                    for (let n of e.splice(0)) n()
                },
                async workQueue() {
                    for (let n of t.splice(0)) await n()
                },
                style(n, a, s) {
                    let o = n.style.getPropertyValue(a);
                    return Object.assign(n.style, {
                        [a]: s
                    }), this.add(() => {
                        Object.assign(n.style, {
                            [a]: o
                        })
                    })
                }
            };
        return r
    }

    function yt() {
        let [e] = d.exports.useState(rt);
        return d.exports.useEffect(() => () => e.dispose(), [e]), e
    }
    let ne = function (e) {
        let t = Ge(e);
        return O.useCallback((...r) => t.current(...r), [t])
    };

    function At() {
        let [e, t] = d.exports.useState(He.isHandoffComplete);
        return e && He.isHandoffComplete === !1 && t(!1), d.exports.useEffect(() => {
            e !== !0 && t(!0)
        }, [e]), d.exports.useEffect(() => He.handoff(), []), e
    }
    var Va;
    let Ie = (Va = O.useId) != null ? Va : function () {
        let e = At(),
            [t, r] = O.useState(e ? () => He.nextId() : null);
        return Ce(() => {
            t === null && r(He.nextId())
        }, [t]), t != null ? "" + t : void 0
    };

    function xe(e, t, ...r) {
        if (e in t) {
            let a = t[e];
            return typeof a == "function" ? a(...r) : a
        }
        let n = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(a => `"${a}"`).join(", ")}.`);
        throw Error.captureStackTrace && Error.captureStackTrace(n, xe), n
    }

    function Rt(e) {
        return He.isServer ? null : e instanceof Node ? e.ownerDocument : e != null && e.hasOwnProperty("current") && e.current instanceof Node ? e.current.ownerDocument : document
    }
    let cn = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map(e => `${e}:not([tabindex='-1'])`).join(",");
    var Fe = (e => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(Fe || {}),
        xr = (e => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(xr || {}),
        wo = (e => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(wo || {});

    function Ba(e = document.body) {
        return e == null ? [] : Array.from(e.querySelectorAll(cn)).sort((t, r) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (r.tabIndex || Number.MAX_SAFE_INTEGER)))
    }
    var dn = (e => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(dn || {});

    function un(e, t = 0) {
        var r;
        return e === ((r = Rt(e)) == null ? void 0 : r.body) ? !1 : xe(t, {
            [0]() {
                return e.matches(cn)
            },
            [1]() {
                let n = e;
                for (; n !== null;) {
                    if (n.matches(cn)) return !0;
                    n = n.parentElement
                }
                return !1
            }
        })
    }

    function Ua(e) {
        let t = Rt(e);
        rt().nextFrame(() => {
            t && !un(t.activeElement, 0) && lt(e)
        })
    }

    function lt(e) {
        e == null || e.focus({
            preventScroll: !0
        })
    }
    let No = ["textarea", "input"].join(",");

    function ko(e) {
        var t, r;
        return (r = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, No)) != null ? r : !1
    }

    function fn(e, t = r => r) {
        return e.slice().sort((r, n) => {
            let a = t(r),
                s = t(n);
            if (a === null || s === null) return 0;
            let o = a.compareDocumentPosition(s);
            return o & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : o & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0
        })
    }

    function Eo(e, t) {
        return xt(Ba(), t, {
            relativeTo: e
        })
    }

    function xt(e, t, {
        sorted: r = !0,
        relativeTo: n = null,
        skipElements: a = []
    } = {}) {
        let s = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e.ownerDocument,
            o = Array.isArray(e) ? r ? fn(e) : e : Ba(e);
        a.length > 0 && o.length > 1 && (o = o.filter(y => !a.includes(y))), n = n != null ? n : s.activeElement;
        let l = (() => {
            if (t & 5) return 1;
            if (t & 10) return -1;
            throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
        })(),
            c = (() => {
                if (t & 1) return 0;
                if (t & 2) return Math.max(0, o.indexOf(n)) - 1;
                if (t & 4) return Math.max(0, o.indexOf(n)) + 1;
                if (t & 8) return o.length - 1;
                throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")
            })(),
            f = t & 32 ? {
                preventScroll: !0
            } : {},
            m = 0,
            v = o.length,
            x;
        do {
            if (m >= v || m + v <= 0) return 0;
            let y = c + m;
            if (t & 16) y = (y + v) % v;
            else {
                if (y < 0) return 3;
                if (y >= v) return 1
            }
            x = o[y], x == null || x.focus(f), m += l
        } while (x !== s.activeElement);
        return t & 6 && ko(x) && x.select(), x.hasAttribute("tabindex") || x.setAttribute("tabindex", "0"), 2
    }

    function hn(e, t, r) {
        let n = Ge(t);
        d.exports.useEffect(() => {
            function a(s) {
                n.current(s)
            }
            return document.addEventListener(e, a, r), () => document.removeEventListener(e, a, r)
        }, [e, r])
    }

    function qa(e, t, r = !0) {
        let n = d.exports.useRef(!1);
        d.exports.useEffect(() => {
            requestAnimationFrame(() => {
                n.current = r
            })
        }, [r]);

        function a(o, l) {
            if (!n.current || o.defaultPrevented) return;
            let c = function m(v) {
                return typeof v == "function" ? m(v()) : Array.isArray(v) || v instanceof Set ? v : [v]
            }(e),
                f = l(o);
            if (f !== null && !!f.getRootNode().contains(f)) {
                for (let m of c) {
                    if (m === null) continue;
                    let v = m instanceof HTMLElement ? m : m.current;
                    if (v != null && v.contains(f) || o.composed && o.composedPath().includes(v)) return
                }
                return !un(f, dn.Loose) && f.tabIndex !== -1 && o.preventDefault(), t(o, f)
            }
        }
        let s = d.exports.useRef(null);
        hn("mousedown", o => {
            var l, c;
            n.current && (s.current = ((c = (l = o.composedPath) == null ? void 0 : l.call(o)) == null ? void 0 : c[0]) || o.target)
        }, !0), hn("click", o => {
            !s.current || (a(o, () => s.current), s.current = null)
        }, !0), hn("blur", o => a(o, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0)
    }

    function Wa(e) {
        var t;
        if (e.type) return e.type;
        let r = (t = e.as) != null ? t : "button";
        if (typeof r == "string" && r.toLowerCase() === "button") return "button"
    }

    function $a(e, t) {
        let [r, n] = d.exports.useState(() => Wa(e));
        return Ce(() => {
            n(Wa(e))
        }, [e.type, e.as]), Ce(() => {
            r || !t.current || t.current instanceof HTMLButtonElement && !t.current.hasAttribute("type") && n("button")
        }, [r, t]), r
    }
    let Ha = Symbol();

    function So(e, t = !0) {
        return Object.assign(e, {
            [Ha]: t
        })
    }

    function _e(...e) {
        let t = d.exports.useRef(e);
        d.exports.useEffect(() => {
            t.current = e
        }, [e]);
        let r = ne(n => {
            for (let a of t.current) a != null && (typeof a == "function" ? a(n) : a.current = n)
        });
        return e.every(n => n == null || (n == null ? void 0 : n[Ha])) ? void 0 : r
    }

    function Ga({
        container: e,
        accept: t,
        walk: r,
        enabled: n = !0
    }) {
        let a = d.exports.useRef(t),
            s = d.exports.useRef(r);
        d.exports.useEffect(() => {
            a.current = t, s.current = r
        }, [t, r]), Ce(() => {
            if (!e || !n) return;
            let o = Rt(e);
            if (!o) return;
            let l = a.current,
                c = s.current,
                f = Object.assign(v => l(v), {
                    acceptNode: l
                }),
                m = o.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, f, !1);
            for (; m.nextNode();) c(m.currentNode)
        }, [e, n, a, s])
    }

    function Co(e) {
        throw new Error("Unexpected object: " + e)
    }
    var Ue = (e => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(Ue || {});

    function _o(e, t) {
        let r = t.resolveItems();
        if (r.length <= 0) return null;
        let n = t.resolveActiveIndex(),
            a = n != null ? n : -1,
            s = (() => {
                switch (e.focus) {
                    case 0:
                        return r.findIndex(o => !t.resolveDisabled(o));
                    case 1: {
                        let o = r.slice().reverse().findIndex((l, c, f) => a !== -1 && f.length - c - 1 >= a ? !1 : !t.resolveDisabled(l));
                        return o === -1 ? o : r.length - 1 - o
                    }
                    case 2:
                        return r.findIndex((o, l) => l <= a ? !1 : !t.resolveDisabled(o));
                    case 3: {
                        let o = r.slice().reverse().findIndex(l => !t.resolveDisabled(l));
                        return o === -1 ? o : r.length - 1 - o
                    }
                    case 4:
                        return r.findIndex(o => t.resolveId(o) === e.id);
                    case 5:
                        return null;
                    default:
                        Co(e)
                }
            })();
        return s === -1 ? n : s
    }

    function Ka(...e) {
        return e.filter(Boolean).join(" ")
    }
    var Tt = (e => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Tt || {}),
        nt = (e => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(nt || {});

    function be({
        ourProps: e,
        theirProps: t,
        slot: r,
        defaultTag: n,
        features: a,
        visible: s = !0,
        name: o
    }) {
        let l = Ya(t, e);
        if (s) return br(l, r, n, o);
        let c = a != null ? a : 0;
        if (c & 2) {
            let {
                static: f = !1,
                ...m
            } = l;
            if (f) return br(m, r, n, o)
        }
        if (c & 1) {
            let {
                unmount: f = !0,
                ...m
            } = l;
            return xe(f ? 0 : 1, {
                [0]() {
                    return null
                },
                [1]() {
                    return br({
                        ...m,
                        hidden: !0,
                        style: {
                            display: "none"
                        }
                    }, r, n, o)
                }
            })
        }
        return br(l, r, n, o)
    }

    function br(e, t = {}, r, n) {
        var a;
        let {
            as: s = r,
            children: o,
            refName: l = "ref",
            ...c
        } = mn(e, ["unmount", "static"]), f = e.ref !== void 0 ? {
            [l]: e.ref
        } : {}, m = typeof o == "function" ? o(t) : o;
        c.className && typeof c.className == "function" && (c.className = c.className(t));
        let v = {};
        if (t) {
            let x = !1,
                y = [];
            for (let [N, D] of Object.entries(t)) typeof D == "boolean" && (x = !0), D === !0 && y.push(N);
            x && (v["data-headlessui-state"] = y.join(" "))
        }
        if (s === d.exports.Fragment && Object.keys(wr(c)).length > 0) {
            if (!d.exports.isValidElement(m) || Array.isArray(m) && m.length > 1) throw new Error(['Passing props on "Fragment"!', "", `The current component <${n} /> is rendering a "Fragment".`, "However we need to passthrough the following props:", Object.keys(c).map(N => `  - ${N}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".', "Render a single element as the child so that we can forward the props onto that element."].map(N => `  - ${N}`).join(`
`)].join(`
`));
            let x = Ka((a = m.props) == null ? void 0 : a.className, c.className),
                y = x ? {
                    className: x
                } : {};
            return d.exports.cloneElement(m, Object.assign({}, Ya(m.props, wr(mn(c, ["ref"]))), v, f, Ao(m.ref, f.ref), y))
        }
        return d.exports.createElement(s, Object.assign({}, mn(c, ["ref"]), s !== d.exports.Fragment && f, s !== d.exports.Fragment && v), m)
    }

    function Ao(...e) {
        return {
            ref: e.every(t => t == null) ? void 0 : t => {
                for (let r of e) r != null && (typeof r == "function" ? r(t) : r.current = t)
            }
        }
    }

    function Ya(...e) {
        if (e.length === 0) return {};
        if (e.length === 1) return e[0];
        let t = {},
            r = {};
        for (let n of e)
            for (let a in n) a.startsWith("on") && typeof n[a] == "function" ? (r[a] != null || (r[a] = []), r[a].push(n[a])) : t[a] = n[a];
        if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(r).map(n => [n, void 0])));
        for (let n in r) Object.assign(t, {
            [n](a, ...s) {
                let o = r[n];
                for (let l of o) {
                    if ((a instanceof Event || (a == null ? void 0 : a.nativeEvent) instanceof Event) && a.defaultPrevented) return;
                    l(a, ...s)
                }
            }
        });
        return t
    }

    function we(e) {
        var t;
        return Object.assign(d.exports.forwardRef(e), {
            displayName: (t = e.displayName) != null ? t : e.name
        })
    }

    function wr(e) {
        let t = Object.assign({}, e);
        for (let r in t) t[r] === void 0 && delete t[r];
        return t
    }

    function mn(e, t = []) {
        let r = Object.assign({}, e);
        for (let n of t) n in r && delete r[n];
        return r
    }

    function qt(e) {
        let t = e.parentElement,
            r = null;
        for (; t && !(t instanceof HTMLFieldSetElement);) t instanceof HTMLLegendElement && (r = t), t = t.parentElement;
        let n = (t == null ? void 0 : t.getAttribute("disabled")) === "";
        return n && Ro(r) ? !1 : n
    }

    function Ro(e) {
        if (!e) return !1;
        let t = e.previousElementSibling;
        for (; t !== null;) {
            if (t instanceof HTMLLegendElement) return !1;
            t = t.previousElementSibling
        }
        return !0
    }

    function Qa(e = {}, t = null, r = []) {
        for (let [n, a] of Object.entries(e)) Xa(r, Za(t, n), a);
        return r
    }

    function Za(e, t) {
        return e ? e + "[" + t + "]" : t
    }

    function Xa(e, t, r) {
        if (Array.isArray(r))
            for (let [n, a] of r.entries()) Xa(e, Za(t, n.toString()), a);
        else r instanceof Date ? e.push([t, r.toISOString()]) : typeof r == "boolean" ? e.push([t, r ? "1" : "0"]) : typeof r == "string" ? e.push([t, r]) : typeof r == "number" ? e.push([t, `${r}`]) : r == null ? e.push([t, ""]) : Qa(r, t, e)
    }

    function Ja(e) {
        var t;
        let r = (t = e == null ? void 0 : e.form) != null ? t : e.closest("form");
        if (r) {
            for (let n of r.elements)
                if (n.tagName === "INPUT" && n.type === "submit" || n.tagName === "BUTTON" && n.type === "submit" || n.nodeName === "INPUT" && n.type === "image") {
                    n.click();
                    return
                }
        }
    }
    let To = "div";
    var Lt = (e => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(Lt || {});
    let Wt = we(function (e, t) {
        let {
            features: r = 1,
            ...n
        } = e, a = {
            ref: t,
            "aria-hidden": (r & 2) === 2 ? !0 : void 0,
            style: {
                position: "fixed",
                top: 1,
                left: 1,
                width: 1,
                height: 0,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                borderWidth: "0",
                ...(r & 4) === 4 && (r & 2) !== 2 && {
                    display: "none"
                }
            }
        };
        return be({
            ourProps: a,
            theirProps: n,
            slot: {},
            defaultTag: To,
            name: "Hidden"
        })
    }),
        pn = d.exports.createContext(null);
    pn.displayName = "OpenClosedContext";
    var Ke = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Ke || {});

    function Nr() {
        return d.exports.useContext(pn)
    }

    function ei({
        value: e,
        children: t
    }) {
        return O.createElement(pn.Provider, {
            value: e
        }, t)
    }
    var me = (e => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(me || {});

    function ti(e, t, r) {
        let [n, a] = d.exports.useState(r), s = e !== void 0, o = d.exports.useRef(s), l = d.exports.useRef(!1), c = d.exports.useRef(!1);
        return s && !o.current && !l.current ? (l.current = !0, o.current = s, console.error("A component is changing from uncontrolled to controlled. This may be caused by the value changing from undefined to a defined value, which should not happen.")) : !s && o.current && !c.current && (c.current = !0, o.current = s, console.error("A component is changing from controlled to uncontrolled. This may be caused by the value changing from a defined value to undefined, which should not happen.")), [s ? e : n, ne(f => (s || a(f), t == null ? void 0 : t(f)))]
    }

    function ri(e, t) {
        let r = d.exports.useRef([]),
            n = ne(e);
        d.exports.useEffect(() => {
            let a = [...r.current];
            for (let [s, o] of t.entries())
                if (r.current[s] !== o) {
                    let l = n(t, a);
                    return r.current = t, l
                }
        }, [n, ...t])
    }

    function ni(e) {
        return [e.screenX, e.screenY]
    }

    function Lo() {
        let e = d.exports.useRef([-1, -1]);
        return {
            wasMoved(t) {
                let r = ni(t);
                return e.current[0] === r[0] && e.current[1] === r[1] ? !1 : (e.current = r, !0)
            },
            update(t) {
                e.current = ni(t)
            }
        }
    }

    function Oo(e, t, r) {
        let n = Ge(t);
        d.exports.useEffect(() => {
            function a(s) {
                n.current(s)
            }
            return window.addEventListener(e, a, r), () => window.removeEventListener(e, a, r)
        }, [e, r])
    }
    var $t = (e => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))($t || {});

    function Do() {
        let e = d.exports.useRef(0);
        return Oo("keydown", t => {
            t.key === "Tab" && (e.current = t.shiftKey ? 1 : 0)
        }, !0), e
    }

    function kr() {
        let e = d.exports.useRef(!1);
        return Ce(() => (e.current = !0, () => {
            e.current = !1
        }), []), e
    }

    function Ht(...e) {
        return d.exports.useMemo(() => Rt(...e), [...e])
    }

    function gn(e, t, r, n) {
        let a = Ge(r);
        d.exports.useEffect(() => {
            e = e != null ? e : window;

            function s(o) {
                a.current(o)
            }
            return e.addEventListener(t, s, n), () => e.removeEventListener(t, s, n)
        }, [e, t, n])
    }
    let Mo = "div";
    var ai = (e => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(ai || {});
    let Gt = Object.assign(we(function (e, t) {
        let r = d.exports.useRef(null),
            n = _e(r, t),
            {
                initialFocus: a,
                containers: s,
                features: o = 30,
                ...l
            } = e;
        At() || (o = 1);
        let c = Ht(r);
        Po({
            ownerDocument: c
        }, Boolean(o & 16));
        let f = Io({
            ownerDocument: c,
            container: r,
            initialFocus: a
        }, Boolean(o & 2));
        Fo({
            ownerDocument: c,
            container: r,
            containers: s,
            previousActiveElement: f
        }, Boolean(o & 8));
        let m = Do(),
            v = ne(D => {
                let F = r.current;
                !F || (U => U())(() => {
                    xe(m.current, {
                        [$t.Forwards]: () => {
                            xt(F, Fe.First, {
                                skipElements: [D.relatedTarget]
                            })
                        },
                        [$t.Backwards]: () => {
                            xt(F, Fe.Last, {
                                skipElements: [D.relatedTarget]
                            })
                        }
                    })
                })
            }),
            x = yt(),
            y = d.exports.useRef(!1),
            N = {
                ref: n,
                onKeyDown(D) {
                    D.key == "Tab" && (y.current = !0, x.requestAnimationFrame(() => {
                        y.current = !1
                    }))
                },
                onBlur(D) {
                    let F = new Set(s == null ? void 0 : s.current);
                    F.add(r);
                    let U = D.relatedTarget;
                    U instanceof HTMLElement && U.dataset.headlessuiFocusGuard !== "true" && (ii(F, U) || (y.current ? xt(r.current, xe(m.current, {
                        [$t.Forwards]: () => Fe.Next,
                        [$t.Backwards]: () => Fe.Previous
                    }) | Fe.WrapAround, {
                        relativeTo: D.target
                    }) : D.target instanceof HTMLElement && lt(D.target)))
                }
            };
        return O.createElement(O.Fragment, null, Boolean(o & 4) && O.createElement(Wt, {
            as: "button",
            type: "button",
            "data-headlessui-focus-guard": !0,
            onFocus: v,
            features: Lt.Focusable
        }), be({
            ourProps: N,
            theirProps: l,
            defaultTag: Mo,
            name: "FocusTrap"
        }), Boolean(o & 4) && O.createElement(Wt, {
            as: "button",
            type: "button",
            "data-headlessui-focus-guard": !0,
            onFocus: v,
            features: Lt.Focusable
        }))
    }), {
        features: ai
    });

    function Po({
        ownerDocument: e
    }, t) {
        let r = d.exports.useRef(null);
        gn(e == null ? void 0 : e.defaultView, "focusout", a => {
            !t || r.current || (r.current = a.target)
        }, !0), ri(() => {
            t || ((e == null ? void 0 : e.activeElement) === (e == null ? void 0 : e.body) && lt(r.current), r.current = null)
        }, [t]);
        let n = d.exports.useRef(!1);
        d.exports.useEffect(() => (n.current = !1, () => {
            n.current = !0, yr(() => {
                !n.current || (lt(r.current), r.current = null)
            })
        }), [])
    }

    function Io({
        ownerDocument: e,
        container: t,
        initialFocus: r
    }, n) {
        let a = d.exports.useRef(null),
            s = kr();
        return ri(() => {
            if (!n) return;
            let o = t.current;
            !o || yr(() => {
                if (!s.current) return;
                let l = e == null ? void 0 : e.activeElement;
                if (r != null && r.current) {
                    if ((r == null ? void 0 : r.current) === l) {
                        a.current = l;
                        return
                    }
                } else if (o.contains(l)) {
                    a.current = l;
                    return
                }
                r != null && r.current ? lt(r.current) : xt(o, Fe.First) === xr.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), a.current = e == null ? void 0 : e.activeElement
            })
        }, [n]), a
    }

    function Fo({
        ownerDocument: e,
        container: t,
        containers: r,
        previousActiveElement: n
    }, a) {
        let s = kr();
        gn(e == null ? void 0 : e.defaultView, "focus", o => {
            if (!a || !s.current) return;
            let l = new Set(r == null ? void 0 : r.current);
            l.add(t);
            let c = n.current;
            if (!c) return;
            let f = o.target;
            f && f instanceof HTMLElement ? ii(l, f) ? (n.current = f, lt(f)) : (o.preventDefault(), o.stopPropagation(), lt(c)) : lt(n.current)
        }, !0)
    }

    function ii(e, t) {
        var r;
        for (let n of e)
            if ((r = n.current) != null && r.contains(t)) return !0;
        return !1
    }
    let Ot = new Set,
        ct = new Map;

    function si(e) {
        e.setAttribute("aria-hidden", "true"), e.inert = !0
    }

    function oi(e) {
        let t = ct.get(e);
        !t || (t["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", t["aria-hidden"]), e.inert = t.inert)
    }

    function jo(e, t = !0) {
        Ce(() => {
            if (!t || !e.current) return;
            let r = e.current,
                n = Rt(r);
            if (n) {
                Ot.add(r);
                for (let a of ct.keys()) a.contains(r) && (oi(a), ct.delete(a));
                return n.querySelectorAll("body > *").forEach(a => {
                    if (a instanceof HTMLElement) {
                        for (let s of Ot)
                            if (a.contains(s)) return;
                        Ot.size === 1 && (ct.set(a, {
                            "aria-hidden": a.getAttribute("aria-hidden"),
                            inert: a.inert
                        }), si(a))
                    }
                }), () => {
                    if (Ot.delete(r), Ot.size > 0) n.querySelectorAll("body > *").forEach(a => {
                        if (a instanceof HTMLElement && !ct.has(a)) {
                            for (let s of Ot)
                                if (a.contains(s)) return;
                            ct.set(a, {
                                "aria-hidden": a.getAttribute("aria-hidden"),
                                inert: a.inert
                            }), si(a)
                        }
                    });
                    else
                        for (let a of ct.keys()) oi(a), ct.delete(a)
                }
            }
        }, [t])
    }
    let li = d.exports.createContext(!1);

    function zo() {
        return d.exports.useContext(li)
    }

    function vn(e) {
        return O.createElement(li.Provider, {
            value: e.force
        }, e.children)
    }

    function Vo(e) {
        let t = zo(),
            r = d.exports.useContext(ci),
            n = Ht(e),
            [a, s] = d.exports.useState(() => {
                if (!t && r !== null || He.isServer) return null;
                let o = n == null ? void 0 : n.getElementById("headlessui-portal-root");
                if (o) return o;
                if (n === null) return null;
                let l = n.createElement("div");
                return l.setAttribute("id", "headlessui-portal-root"), n.body.appendChild(l)
            });
        return d.exports.useEffect(() => {
            a !== null && (n != null && n.body.contains(a) || n == null || n.body.appendChild(a))
        }, [a, n]), d.exports.useEffect(() => {
            t || r !== null && s(r.current)
        }, [r, s, t]), a
    }
    let Bo = d.exports.Fragment,
        Uo = we(function (e, t) {
            let r = e,
                n = d.exports.useRef(null),
                a = _e(So(m => {
                    n.current = m
                }), t),
                s = Ht(n),
                o = Vo(n),
                [l] = d.exports.useState(() => {
                    var m;
                    return He.isServer ? null : (m = s == null ? void 0 : s.createElement("div")) != null ? m : null
                }),
                c = At(),
                f = d.exports.useRef(!1);
            return Ce(() => {
                if (f.current = !1, !(!o || !l)) return o.contains(l) || (l.setAttribute("data-headlessui-portal", ""), o.appendChild(l)), () => {
                    f.current = !0, yr(() => {
                        var m;
                        !f.current || !o || !l || (l instanceof Node && o.contains(l) && o.removeChild(l), o.childNodes.length <= 0 && ((m = o.parentElement) == null || m.removeChild(o)))
                    })
                }
            }, [o, l]), c ? !o || !l ? null : Hi.exports.createPortal(be({
                ourProps: {
                    ref: a
                },
                theirProps: r,
                defaultTag: Bo,
                name: "Portal"
            }), l) : null
        }),
        qo = d.exports.Fragment,
        ci = d.exports.createContext(null),
        Wo = we(function (e, t) {
            let {
                target: r,
                ...n
            } = e, a = {
                ref: _e(t)
            };
            return O.createElement(ci.Provider, {
                value: r
            }, be({
                ourProps: a,
                theirProps: n,
                defaultTag: qo,
                name: "Popover.Group"
            }))
        }),
        yn = Object.assign(Uo, {
            Group: Wo
        }),
        di = d.exports.createContext(null);

    function ui() {
        let e = d.exports.useContext(di);
        if (e === null) {
            let t = new Error("You used a <Description /> component, but it is not inside a relevant parent.");
            throw Error.captureStackTrace && Error.captureStackTrace(t, ui), t
        }
        return e
    }

    function Er() {
        let [e, t] = d.exports.useState([]);
        return [e.length > 0 ? e.join(" ") : void 0, d.exports.useMemo(() => function (r) {
            let n = ne(s => (t(o => [...o, s]), () => t(o => {
                let l = o.slice(),
                    c = l.indexOf(s);
                return c !== -1 && l.splice(c, 1), l
            }))),
                a = d.exports.useMemo(() => ({
                    register: n,
                    slot: r.slot,
                    name: r.name,
                    props: r.props
                }), [n, r.slot, r.name, r.props]);
            return O.createElement(di.Provider, {
                value: a
            }, r.children)
        }, [t])]
    }
    let $o = "p",
        xn = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-description-${r}`,
                    ...a
                } = e,
                s = ui(),
                o = _e(t);
            Ce(() => s.register(n), [n, s.register]);
            let l = {
                ref: o,
                ...s.props,
                id: n
            };
            return be({
                ourProps: l,
                theirProps: a,
                slot: s.slot || {},
                defaultTag: $o,
                name: s.name || "Description"
            })
        }),
        bn = d.exports.createContext(() => { });
    bn.displayName = "StackContext";
    var wn = (e => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(wn || {});

    function Ho() {
        return d.exports.useContext(bn)
    }

    function Go({
        children: e,
        onUpdate: t,
        type: r,
        element: n,
        enabled: a
    }) {
        let s = Ho(),
            o = ne((...l) => {
                t == null || t(...l), s(...l)
            });
        return Ce(() => {
            let l = a === void 0 || a === !0;
            return l && o(0, r, n), () => {
                l && o(1, r, n)
            }
        }, [o, r, n, a]), O.createElement(bn.Provider, {
            value: o
        }, e)
    }

    function Ko(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    const Yo = typeof Object.is == "function" ? Object.is : Ko,
        {
            useState: Qo,
            useEffect: Zo,
            useLayoutEffect: Xo,
            useDebugValue: Jo
        } = jn;

    function el(e, t, r) {
        const n = t(),
            [{
                inst: a
            }, s] = Qo({
                inst: {
                    value: n,
                    getSnapshot: t
                }
            });
        return Xo(() => {
            a.value = n, a.getSnapshot = t, Nn(a) && s({
                inst: a
            })
        }, [e, n, t]), Zo(() => (Nn(a) && s({
            inst: a
        }), e(() => {
            Nn(a) && s({
                inst: a
            })
        })), [e]), Jo(n), n
    }

    function Nn(e) {
        const t = e.getSnapshot,
            r = e.value;
        try {
            const n = t();
            return !Yo(r, n)
        } catch {
            return !0
        }
    }

    function tl(e, t, r) {
        return t()
    }
    const rl = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u",
        nl = !rl,
        al = nl ? tl : el,
        il = "useSyncExternalStore" in jn ? (e => e.useSyncExternalStore)(jn) : al;

    function sl(e) {
        return il(e.subscribe, e.getSnapshot, e.getSnapshot)
    }

    function ol(e, t) {
        let r = e(),
            n = new Set;
        return {
            getSnapshot() {
                return r
            },
            subscribe(a) {
                return n.add(a), () => n.delete(a)
            },
            dispatch(a, ...s) {
                let o = t[a].call(r, ...s);
                o && (r = o, n.forEach(l => l()))
            }
        }
    }

    function ll() {
        let e;
        return {
            before({
                doc: t
            }) {
                var r;
                let n = t.documentElement;
                e = ((r = t.defaultView) != null ? r : window).innerWidth - n.clientWidth
            },
            after({
                doc: t,
                d: r
            }) {
                let n = t.documentElement,
                    a = n.clientWidth - n.offsetWidth,
                    s = e - a;
                r.style(n, "paddingRight", `${s}px`)
            }
        }
    }

    function cl() {
        return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0
    }

    function dl() {
        if (!cl()) return {};
        let e;
        return {
            before() {
                e = window.pageYOffset
            },
            after({
                doc: t,
                d: r,
                meta: n
            }) {
                function a(o) {
                    return n.containers.flatMap(l => l()).some(l => l.contains(o))
                }
                r.style(t.body, "marginTop", `-${e}px`), window.scrollTo(0, 0);
                let s = null;
                r.addEventListener(t, "click", o => {
                    if (o.target instanceof HTMLElement) try {
                        let l = o.target.closest("a");
                        if (!l) return;
                        let {
                            hash: c
                        } = new URL(l.href), f = t.querySelector(c);
                        f && !a(f) && (s = f)
                    } catch { }
                }, !0), r.addEventListener(t, "touchmove", o => {
                    o.target instanceof HTMLElement && !a(o.target) && o.preventDefault()
                }, {
                    passive: !1
                }), r.add(() => {
                    window.scrollTo(0, window.pageYOffset + e), s && s.isConnected && (s.scrollIntoView({
                        block: "nearest"
                    }), s = null)
                })
            }
        }
    }

    function ul() {
        return {
            before({
                doc: e,
                d: t
            }) {
                t.style(e.documentElement, "overflow", "hidden")
            }
        }
    }

    function fl(e) {
        let t = {};
        for (let r of e) Object.assign(t, r(t));
        return t
    }
    let bt = ol(() => new Map, {
        PUSH(e, t) {
            var r;
            let n = (r = this.get(e)) != null ? r : {
                doc: e,
                count: 0,
                d: rt(),
                meta: new Set
            };
            return n.count++, n.meta.add(t), this.set(e, n), this
        },
        POP(e, t) {
            let r = this.get(e);
            return r && (r.count--, r.meta.delete(t)), this
        },
        SCROLL_PREVENT({
            doc: e,
            d: t,
            meta: r
        }) {
            let n = {
                doc: e,
                d: t,
                meta: fl(r)
            },
                a = [dl(), ll(), ul()];
            a.forEach(({
                before: s
            }) => s == null ? void 0 : s(n)), a.forEach(({
                after: s
            }) => s == null ? void 0 : s(n))
        },
        SCROLL_ALLOW({
            d: e
        }) {
            e.dispose()
        },
        TEARDOWN({
            doc: e
        }) {
            this.delete(e)
        }
    });
    bt.subscribe(() => {
        let e = bt.getSnapshot(),
            t = new Map;
        for (let [r] of e) t.set(r, r.documentElement.style.overflow);
        for (let r of e.values()) {
            let n = t.get(r.doc) === "hidden",
                a = r.count !== 0;
            (a && !n || !a && n) && bt.dispatch(r.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", r), r.count === 0 && bt.dispatch("TEARDOWN", r)
        }
    });

    function hl(e, t, r) {
        let n = sl(bt),
            a = e ? n.get(e) : void 0,
            s = a ? a.count > 0 : !1;
        return Ce(() => {
            if (!(!e || !t)) return bt.dispatch("PUSH", e, r), () => bt.dispatch("POP", e, r)
        }, [t, e]), s
    }
    var ml = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(ml || {}),
        pl = (e => (e[e.SetTitleId = 0] = "SetTitleId", e))(pl || {});
    let gl = {
        [0](e, t) {
            return e.titleId === t.id ? e : {
                ...e,
                titleId: t.id
            }
        }
    },
        Sr = d.exports.createContext(null);
    Sr.displayName = "DialogContext";

    function Kt(e) {
        let t = d.exports.useContext(Sr);
        if (t === null) {
            let r = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
            throw Error.captureStackTrace && Error.captureStackTrace(r, Kt), r
        }
        return t
    }

    function vl(e, t, r = () => [document.body]) {
        hl(e, t, n => {
            var a;
            return {
                containers: [...(a = n.containers) != null ? a : [], r]
            }
        })
    }

    function yl(e, t) {
        return xe(t.type, gl, e, t)
    }
    let xl = "div",
        bl = Tt.RenderStrategy | Tt.Static,
        wl = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-dialog-${r}`,
                    open: a,
                    onClose: s,
                    initialFocus: o,
                    __demoMode: l = !1,
                    ...c
                } = e,
                [f, m] = d.exports.useState(0),
                v = Nr();
            a === void 0 && v !== null && (a = xe(v, {
                [Ke.Open]: !0,
                [Ke.Closed]: !1
            }));
            let x = d.exports.useRef(new Set),
                y = d.exports.useRef(null),
                N = _e(y, t),
                D = d.exports.useRef(null),
                F = Ht(y),
                U = e.hasOwnProperty("open") || v !== null,
                C = e.hasOwnProperty("onClose");
            if (!U && !C) throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");
            if (!U) throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");
            if (!C) throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");
            if (typeof a != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${a}`);
            if (typeof s != "function") throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${s}`);
            let K = a ? 0 : 1,
                [V, q] = d.exports.useReducer(yl, {
                    titleId: null,
                    descriptionId: null,
                    panelRef: d.exports.createRef()
                }),
                W = ne(() => s(!1)),
                I = ne(w => q({
                    type: 0,
                    id: w
                })),
                p = At() ? l ? !1 : K === 0 : !1,
                h = f > 1,
                S = d.exports.useContext(Sr) !== null,
                T = h ? "parent" : "leaf";
            jo(y, h ? p : !1);
            let A = ne(() => {
                var w, k;
                return [...Array.from((w = F == null ? void 0 : F.querySelectorAll("html > *, body > *, [data-headlessui-portal]")) != null ? w : []).filter(R => !(R === document.body || R === document.head || !(R instanceof HTMLElement) || R.contains(D.current) || V.panelRef.current && R.contains(V.panelRef.current))), (k = V.panelRef.current) != null ? k : y.current]
            });
            qa(() => A(), W, p && !h), gn(F == null ? void 0 : F.defaultView, "keydown", w => {
                w.defaultPrevented || w.key === me.Escape && K === 0 && (h || (w.preventDefault(), w.stopPropagation(), W()))
            }), vl(F, K === 0 && !S, A), d.exports.useEffect(() => {
                if (K !== 0 || !y.current) return;
                let w = new IntersectionObserver(k => {
                    for (let R of k) R.boundingClientRect.x === 0 && R.boundingClientRect.y === 0 && R.boundingClientRect.width === 0 && R.boundingClientRect.height === 0 && W()
                });
                return w.observe(y.current), () => w.disconnect()
            }, [K, y, W]);
            let [L, z] = Er(), X = d.exports.useMemo(() => [{
                dialogState: K,
                close: W,
                setTitleId: I
            }, V], [K, V, W, I]), J = d.exports.useMemo(() => ({
                open: K === 0
            }), [K]), j = {
                ref: N,
                id: n,
                role: "dialog",
                "aria-modal": K === 0 ? !0 : void 0,
                "aria-labelledby": V.titleId,
                "aria-describedby": L
            };
            return O.createElement(Go, {
                type: "Dialog",
                enabled: K === 0,
                element: y,
                onUpdate: ne((w, k, R) => {
                    k === "Dialog" && xe(w, {
                        [wn.Add]() {
                            x.current.add(R), m(H => H + 1)
                        },
                        [wn.Remove]() {
                            x.current.add(R), m(H => H - 1)
                        }
                    })
                })
            }, O.createElement(vn, {
                force: !0
            }, O.createElement(yn, null, O.createElement(Sr.Provider, {
                value: X
            }, O.createElement(yn.Group, {
                target: y
            }, O.createElement(vn, {
                force: !1
            }, O.createElement(z, {
                slot: J,
                name: "Dialog.Description"
            }, O.createElement(Gt, {
                initialFocus: o,
                containers: x,
                features: p ? xe(T, {
                    parent: Gt.features.RestoreFocus,
                    leaf: Gt.features.All & ~Gt.features.FocusLock
                }) : Gt.features.None
            }, be({
                ourProps: j,
                theirProps: c,
                slot: J,
                defaultTag: xl,
                features: bl,
                visible: K === 0,
                name: "Dialog"
            })))))))), O.createElement(Wt, {
                features: Lt.Hidden,
                ref: D
            }))
        }),
        Nl = "div",
        kl = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-dialog-overlay-${r}`,
                    ...a
                } = e,
                [{
                    dialogState: s,
                    close: o
                }] = Kt("Dialog.Overlay"),
                l = _e(t),
                c = ne(m => {
                    if (m.target === m.currentTarget) {
                        if (qt(m.currentTarget)) return m.preventDefault();
                        m.preventDefault(), m.stopPropagation(), o()
                    }
                }),
                f = d.exports.useMemo(() => ({
                    open: s === 0
                }), [s]);
            return be({
                ourProps: {
                    ref: l,
                    id: n,
                    "aria-hidden": !0,
                    onClick: c
                },
                theirProps: a,
                slot: f,
                defaultTag: Nl,
                name: "Dialog.Overlay"
            })
        }),
        El = "div",
        Sl = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-dialog-backdrop-${r}`,
                    ...a
                } = e,
                [{
                    dialogState: s
                }, o] = Kt("Dialog.Backdrop"),
                l = _e(t);
            d.exports.useEffect(() => {
                if (o.panelRef.current === null) throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")
            }, [o.panelRef]);
            let c = d.exports.useMemo(() => ({
                open: s === 0
            }), [s]);
            return O.createElement(vn, {
                force: !0
            }, O.createElement(yn, null, be({
                ourProps: {
                    ref: l,
                    id: n,
                    "aria-hidden": !0
                },
                theirProps: a,
                slot: c,
                defaultTag: El,
                name: "Dialog.Backdrop"
            })))
        }),
        Cl = "div",
        _l = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-dialog-panel-${r}`,
                    ...a
                } = e,
                [{
                    dialogState: s
                }, o] = Kt("Dialog.Panel"),
                l = _e(t, o.panelRef),
                c = d.exports.useMemo(() => ({
                    open: s === 0
                }), [s]),
                f = ne(m => {
                    m.stopPropagation()
                });
            return be({
                ourProps: {
                    ref: l,
                    id: n,
                    onClick: f
                },
                theirProps: a,
                slot: c,
                defaultTag: Cl,
                name: "Dialog.Panel"
            })
        }),
        Al = "h2",
        Rl = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-dialog-title-${r}`,
                    ...a
                } = e,
                [{
                    dialogState: s,
                    setTitleId: o
                }] = Kt("Dialog.Title"),
                l = _e(t);
            d.exports.useEffect(() => (o(n), () => o(null)), [n, o]);
            let c = d.exports.useMemo(() => ({
                open: s === 0
            }), [s]);
            return be({
                ourProps: {
                    ref: l,
                    id: n
                },
                theirProps: a,
                slot: c,
                defaultTag: Al,
                name: "Dialog.Title"
            })
        }),
        Dt = Object.assign(wl, {
            Backdrop: Sl,
            Panel: _l,
            Overlay: kl,
            Title: Rl,
            Description: xn
        });
    var Tl = (e => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(Tl || {}),
        Ll = (e => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(Ll || {}),
        Ol = (e => (e[e.OpenMenu = 0] = "OpenMenu", e[e.CloseMenu = 1] = "CloseMenu", e[e.GoToItem = 2] = "GoToItem", e[e.Search = 3] = "Search", e[e.ClearSearch = 4] = "ClearSearch", e[e.RegisterItem = 5] = "RegisterItem", e[e.UnregisterItem = 6] = "UnregisterItem", e))(Ol || {});

    function kn(e, t = r => r) {
        let r = e.activeItemIndex !== null ? e.items[e.activeItemIndex] : null,
            n = fn(t(e.items.slice()), s => s.dataRef.current.domRef.current),
            a = r ? n.indexOf(r) : null;
        return a === -1 && (a = null), {
            items: n,
            activeItemIndex: a
        }
    }
    let Dl = {
        [1](e) {
            return e.menuState === 1 ? e : {
                ...e,
                activeItemIndex: null,
                menuState: 1
            }
        },
        [0](e) {
            return e.menuState === 0 ? e : {
                ...e,
                menuState: 0
            }
        },
        [2]: (e, t) => {
            var r;
            let n = kn(e),
                a = _o(t, {
                    resolveItems: () => n.items,
                    resolveActiveIndex: () => n.activeItemIndex,
                    resolveId: s => s.id,
                    resolveDisabled: s => s.dataRef.current.disabled
                });
            return {
                ...e,
                ...n,
                searchQuery: "",
                activeItemIndex: a,
                activationTrigger: (r = t.trigger) != null ? r : 1
            }
        },
        [3]: (e, t) => {
            let r = e.searchQuery !== "" ? 0 : 1,
                n = e.searchQuery + t.value.toLowerCase(),
                a = (e.activeItemIndex !== null ? e.items.slice(e.activeItemIndex + r).concat(e.items.slice(0, e.activeItemIndex + r)) : e.items).find(o => {
                    var l;
                    return ((l = o.dataRef.current.textValue) == null ? void 0 : l.startsWith(n)) && !o.dataRef.current.disabled
                }),
                s = a ? e.items.indexOf(a) : -1;
            return s === -1 || s === e.activeItemIndex ? {
                ...e,
                searchQuery: n
            } : {
                ...e,
                searchQuery: n,
                activeItemIndex: s,
                activationTrigger: 1
            }
        },
        [4](e) {
            return e.searchQuery === "" ? e : {
                ...e,
                searchQuery: "",
                searchActiveItemIndex: null
            }
        },
        [5]: (e, t) => {
            let r = kn(e, n => [...n, {
                id: t.id,
                dataRef: t.dataRef
            }]);
            return {
                ...e,
                ...r
            }
        },
        [6]: (e, t) => {
            let r = kn(e, n => {
                let a = n.findIndex(s => s.id === t.id);
                return a !== -1 && n.splice(a, 1), n
            });
            return {
                ...e,
                ...r,
                activationTrigger: 1
            }
        }
    },
        En = d.exports.createContext(null);
    En.displayName = "MenuContext";

    function Cr(e) {
        let t = d.exports.useContext(En);
        if (t === null) {
            let r = new Error(`<${e} /> is missing a parent <Menu /> component.`);
            throw Error.captureStackTrace && Error.captureStackTrace(r, Cr), r
        }
        return t
    }

    function Ml(e, t) {
        return xe(t.type, Dl, e, t)
    }
    let Pl = d.exports.Fragment,
        Il = we(function (e, t) {
            let r = d.exports.useReducer(Ml, {
                menuState: 1,
                buttonRef: d.exports.createRef(),
                itemsRef: d.exports.createRef(),
                items: [],
                searchQuery: "",
                activeItemIndex: null,
                activationTrigger: 1
            }),
                [{
                    menuState: n,
                    itemsRef: a,
                    buttonRef: s
                }, o] = r,
                l = _e(t);
            qa([s, a], (x, y) => {
                var N;
                o({
                    type: 1
                }), un(y, dn.Loose) || (x.preventDefault(), (N = s.current) == null || N.focus())
            }, n === 0);
            let c = ne(() => {
                o({
                    type: 1
                })
            }),
                f = d.exports.useMemo(() => ({
                    open: n === 0,
                    close: c
                }), [n, c]),
                m = e,
                v = {
                    ref: l
                };
            return O.createElement(En.Provider, {
                value: r
            }, O.createElement(ei, {
                value: xe(n, {
                    [0]: Ke.Open,
                    [1]: Ke.Closed
                })
            }, be({
                ourProps: v,
                theirProps: m,
                slot: f,
                defaultTag: Pl,
                name: "Menu"
            })))
        }),
        Fl = "button",
        jl = we(function (e, t) {
            var r;
            let n = Ie(),
                {
                    id: a = `headlessui-menu-button-${n}`,
                    ...s
                } = e,
                [o, l] = Cr("Menu.Button"),
                c = _e(o.buttonRef, t),
                f = yt(),
                m = ne(D => {
                    switch (D.key) {
                        case me.Space:
                        case me.Enter:
                        case me.ArrowDown:
                            D.preventDefault(), D.stopPropagation(), l({
                                type: 0
                            }), f.nextFrame(() => l({
                                type: 2,
                                focus: Ue.First
                            }));
                            break;
                        case me.ArrowUp:
                            D.preventDefault(), D.stopPropagation(), l({
                                type: 0
                            }), f.nextFrame(() => l({
                                type: 2,
                                focus: Ue.Last
                            }));
                            break
                    }
                }),
                v = ne(D => {
                    switch (D.key) {
                        case me.Space:
                            D.preventDefault();
                            break
                    }
                }),
                x = ne(D => {
                    if (qt(D.currentTarget)) return D.preventDefault();
                    e.disabled || (o.menuState === 0 ? (l({
                        type: 1
                    }), f.nextFrame(() => {
                        var F;
                        return (F = o.buttonRef.current) == null ? void 0 : F.focus({
                            preventScroll: !0
                        })
                    })) : (D.preventDefault(), l({
                        type: 0
                    })))
                }),
                y = d.exports.useMemo(() => ({
                    open: o.menuState === 0
                }), [o]),
                N = {
                    ref: c,
                    id: a,
                    type: $a(e, o.buttonRef),
                    "aria-haspopup": "menu",
                    "aria-controls": (r = o.itemsRef.current) == null ? void 0 : r.id,
                    "aria-expanded": e.disabled ? void 0 : o.menuState === 0,
                    onKeyDown: m,
                    onKeyUp: v,
                    onClick: x
                };
            return be({
                ourProps: N,
                theirProps: s,
                slot: y,
                defaultTag: Fl,
                name: "Menu.Button"
            })
        }),
        zl = "div",
        Vl = Tt.RenderStrategy | Tt.Static,
        Bl = we(function (e, t) {
            var r, n;
            let a = Ie(),
                {
                    id: s = `headlessui-menu-items-${a}`,
                    ...o
                } = e,
                [l, c] = Cr("Menu.Items"),
                f = _e(l.itemsRef, t),
                m = Ht(l.itemsRef),
                v = yt(),
                x = Nr(),
                y = (() => x !== null ? x === Ke.Open : l.menuState === 0)();
            d.exports.useEffect(() => {
                let C = l.itemsRef.current;
                !C || l.menuState === 0 && C !== (m == null ? void 0 : m.activeElement) && C.focus({
                    preventScroll: !0
                })
            }, [l.menuState, l.itemsRef, m]), Ga({
                container: l.itemsRef.current,
                enabled: l.menuState === 0,
                accept(C) {
                    return C.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : C.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
                },
                walk(C) {
                    C.setAttribute("role", "none")
                }
            });
            let N = ne(C => {
                var K, V;
                switch (v.dispose(), C.key) {
                    case me.Space:
                        if (l.searchQuery !== "") return C.preventDefault(), C.stopPropagation(), c({
                            type: 3,
                            value: C.key
                        });
                    case me.Enter:
                        if (C.preventDefault(), C.stopPropagation(), c({
                            type: 1
                        }), l.activeItemIndex !== null) {
                            let {
                                dataRef: q
                            } = l.items[l.activeItemIndex];
                            (V = (K = q.current) == null ? void 0 : K.domRef.current) == null || V.click()
                        }
                        Ua(l.buttonRef.current);
                        break;
                    case me.ArrowDown:
                        return C.preventDefault(), C.stopPropagation(), c({
                            type: 2,
                            focus: Ue.Next
                        });
                    case me.ArrowUp:
                        return C.preventDefault(), C.stopPropagation(), c({
                            type: 2,
                            focus: Ue.Previous
                        });
                    case me.Home:
                    case me.PageUp:
                        return C.preventDefault(), C.stopPropagation(), c({
                            type: 2,
                            focus: Ue.First
                        });
                    case me.End:
                    case me.PageDown:
                        return C.preventDefault(), C.stopPropagation(), c({
                            type: 2,
                            focus: Ue.Last
                        });
                    case me.Escape:
                        C.preventDefault(), C.stopPropagation(), c({
                            type: 1
                        }), rt().nextFrame(() => {
                            var q;
                            return (q = l.buttonRef.current) == null ? void 0 : q.focus({
                                preventScroll: !0
                            })
                        });
                        break;
                    case me.Tab:
                        C.preventDefault(), C.stopPropagation(), c({
                            type: 1
                        }), rt().nextFrame(() => {
                            Eo(l.buttonRef.current, C.shiftKey ? Fe.Previous : Fe.Next)
                        });
                        break;
                    default:
                        C.key.length === 1 && (c({
                            type: 3,
                            value: C.key
                        }), v.setTimeout(() => c({
                            type: 4
                        }), 350));
                        break
                }
            }),
                D = ne(C => {
                    switch (C.key) {
                        case me.Space:
                            C.preventDefault();
                            break
                    }
                }),
                F = d.exports.useMemo(() => ({
                    open: l.menuState === 0
                }), [l]),
                U = {
                    "aria-activedescendant": l.activeItemIndex === null || (r = l.items[l.activeItemIndex]) == null ? void 0 : r.id,
                    "aria-labelledby": (n = l.buttonRef.current) == null ? void 0 : n.id,
                    id: s,
                    onKeyDown: N,
                    onKeyUp: D,
                    role: "menu",
                    tabIndex: 0,
                    ref: f
                };
            return be({
                ourProps: U,
                theirProps: o,
                slot: F,
                defaultTag: zl,
                features: Vl,
                visible: y,
                name: "Menu.Items"
            })
        }),
        Ul = d.exports.Fragment,
        ql = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-menu-item-${r}`,
                    disabled: a = !1,
                    ...s
                } = e,
                [o, l] = Cr("Menu.Item"),
                c = o.activeItemIndex !== null ? o.items[o.activeItemIndex].id === n : !1,
                f = d.exports.useRef(null),
                m = _e(t, f);
            Ce(() => {
                if (o.menuState !== 0 || !c || o.activationTrigger === 0) return;
                let V = rt();
                return V.requestAnimationFrame(() => {
                    var q, W;
                    (W = (q = f.current) == null ? void 0 : q.scrollIntoView) == null || W.call(q, {
                        block: "nearest"
                    })
                }), V.dispose
            }, [f, c, o.menuState, o.activationTrigger, o.activeItemIndex]);
            let v = d.exports.useRef({
                disabled: a,
                domRef: f
            });
            Ce(() => {
                v.current.disabled = a
            }, [v, a]), Ce(() => {
                var V, q;
                v.current.textValue = (q = (V = f.current) == null ? void 0 : V.textContent) == null ? void 0 : q.toLowerCase()
            }, [v, f]), Ce(() => (l({
                type: 5,
                id: n,
                dataRef: v
            }), () => l({
                type: 6,
                id: n
            })), [v, n]);
            let x = ne(() => {
                l({
                    type: 1
                })
            }),
                y = ne(V => {
                    if (a) return V.preventDefault();
                    l({
                        type: 1
                    }), Ua(o.buttonRef.current)
                }),
                N = ne(() => {
                    if (a) return l({
                        type: 2,
                        focus: Ue.Nothing
                    });
                    l({
                        type: 2,
                        focus: Ue.Specific,
                        id: n
                    })
                }),
                D = Lo(),
                F = ne(V => D.update(V)),
                U = ne(V => {
                    !D.wasMoved(V) || a || c || l({
                        type: 2,
                        focus: Ue.Specific,
                        id: n,
                        trigger: 0
                    })
                }),
                C = ne(V => {
                    !D.wasMoved(V) || a || !c || l({
                        type: 2,
                        focus: Ue.Nothing
                    })
                }),
                K = d.exports.useMemo(() => ({
                    active: c,
                    disabled: a,
                    close: x
                }), [c, a, x]);
            return be({
                ourProps: {
                    id: n,
                    ref: m,
                    role: "menuitem",
                    tabIndex: a === !0 ? void 0 : -1,
                    "aria-disabled": a === !0 ? !0 : void 0,
                    disabled: void 0,
                    onClick: y,
                    onFocus: N,
                    onPointerEnter: F,
                    onMouseEnter: F,
                    onPointerMove: U,
                    onMouseMove: U,
                    onPointerLeave: C,
                    onMouseLeave: C
                },
                theirProps: s,
                slot: K,
                defaultTag: Ul,
                name: "Menu.Item"
            })
        }),
        Ee = Object.assign(Il, {
            Button: jl,
            Items: Bl,
            Item: ql
        });

    function Wl(e = 0) {
        let [t, r] = d.exports.useState(e), n = d.exports.useCallback(l => r(c => c | l), [t]), a = d.exports.useCallback(l => Boolean(t & l), [t]), s = d.exports.useCallback(l => r(c => c & ~l), [r]), o = d.exports.useCallback(l => r(c => c ^ l), [r]);
        return {
            addFlag: n,
            hasFlag: a,
            removeFlag: s,
            toggleFlag: o
        }
    }
    let fi = d.exports.createContext(null);

    function hi() {
        let e = d.exports.useContext(fi);
        if (e === null) {
            let t = new Error("You used a <Label /> component, but it is not inside a relevant parent.");
            throw Error.captureStackTrace && Error.captureStackTrace(t, hi), t
        }
        return e
    }

    function Sn() {
        let [e, t] = d.exports.useState([]);
        return [e.length > 0 ? e.join(" ") : void 0, d.exports.useMemo(() => function (r) {
            let n = ne(s => (t(o => [...o, s]), () => t(o => {
                let l = o.slice(),
                    c = l.indexOf(s);
                return c !== -1 && l.splice(c, 1), l
            }))),
                a = d.exports.useMemo(() => ({
                    register: n,
                    slot: r.slot,
                    name: r.name,
                    props: r.props
                }), [n, r.slot, r.name, r.props]);
            return O.createElement(fi.Provider, {
                value: a
            }, r.children)
        }, [t])]
    }
    let $l = "label",
        mi = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-label-${r}`,
                    passive: a = !1,
                    ...s
                } = e,
                o = hi(),
                l = _e(t);
            Ce(() => o.register(n), [n, o.register]);
            let c = {
                ref: l,
                ...o.props,
                id: n
            };
            return a && ("onClick" in c && delete c.onClick, "onClick" in s && delete s.onClick), be({
                ourProps: c,
                theirProps: s,
                slot: o.slot || {},
                defaultTag: $l,
                name: o.name || "Label"
            })
        });
    var Hl = (e => (e[e.RegisterOption = 0] = "RegisterOption", e[e.UnregisterOption = 1] = "UnregisterOption", e))(Hl || {});
    let Gl = {
        [0](e, t) {
            let r = [...e.options, {
                id: t.id,
                element: t.element,
                propsRef: t.propsRef
            }];
            return {
                ...e,
                options: fn(r, n => n.element.current)
            }
        },
        [1](e, t) {
            let r = e.options.slice(),
                n = e.options.findIndex(a => a.id === t.id);
            return n === -1 ? e : (r.splice(n, 1), {
                ...e,
                options: r
            })
        }
    },
        Cn = d.exports.createContext(null);
    Cn.displayName = "RadioGroupDataContext";

    function pi(e) {
        let t = d.exports.useContext(Cn);
        if (t === null) {
            let r = new Error(`<${e} /> is missing a parent <RadioGroup /> component.`);
            throw Error.captureStackTrace && Error.captureStackTrace(r, pi), r
        }
        return t
    }
    let _n = d.exports.createContext(null);
    _n.displayName = "RadioGroupActionsContext";

    function gi(e) {
        let t = d.exports.useContext(_n);
        if (t === null) {
            let r = new Error(`<${e} /> is missing a parent <RadioGroup /> component.`);
            throw Error.captureStackTrace && Error.captureStackTrace(r, gi), r
        }
        return t
    }

    function Kl(e, t) {
        return xe(t.type, Gl, e, t)
    }
    let Yl = "div",
        Ql = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-radiogroup-${r}`,
                    value: a,
                    defaultValue: s,
                    name: o,
                    onChange: l,
                    by: c = (w, k) => w === k,
                    disabled: f = !1,
                    ...m
                } = e,
                v = ne(typeof c == "string" ? (w, k) => {
                    let R = c;
                    return (w == null ? void 0 : w[R]) === (k == null ? void 0 : k[R])
                } : c),
                [x, y] = d.exports.useReducer(Kl, {
                    options: []
                }),
                N = x.options,
                [D, F] = Sn(),
                [U, C] = Er(),
                K = d.exports.useRef(null),
                V = _e(K, t),
                [q, W] = ti(a, l, s),
                I = d.exports.useMemo(() => N.find(w => !w.propsRef.current.disabled), [N]),
                p = d.exports.useMemo(() => N.some(w => v(w.propsRef.current.value, q)), [N, q]),
                h = ne(w => {
                    var k;
                    if (f || v(w, q)) return !1;
                    let R = (k = N.find(H => v(H.propsRef.current.value, w))) == null ? void 0 : k.propsRef.current;
                    return R != null && R.disabled ? !1 : (W == null || W(w), !0)
                });
            Ga({
                container: K.current,
                accept(w) {
                    return w.getAttribute("role") === "radio" ? NodeFilter.FILTER_REJECT : w.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT
                },
                walk(w) {
                    w.setAttribute("role", "none")
                }
            });
            let S = ne(w => {
                let k = K.current;
                if (!k) return;
                let R = Rt(k),
                    H = N.filter(E => E.propsRef.current.disabled === !1).map(E => E.element.current);
                switch (w.key) {
                    case me.Enter:
                        Ja(w.currentTarget);
                        break;
                    case me.ArrowLeft:
                    case me.ArrowUp:
                        if (w.preventDefault(), w.stopPropagation(), xt(H, Fe.Previous | Fe.WrapAround) === xr.Success) {
                            let E = N.find(Y => Y.element.current === (R == null ? void 0 : R.activeElement));
                            E && h(E.propsRef.current.value)
                        }
                        break;
                    case me.ArrowRight:
                    case me.ArrowDown:
                        if (w.preventDefault(), w.stopPropagation(), xt(H, Fe.Next | Fe.WrapAround) === xr.Success) {
                            let E = N.find(Y => Y.element.current === (R == null ? void 0 : R.activeElement));
                            E && h(E.propsRef.current.value)
                        }
                        break;
                    case me.Space: {
                        w.preventDefault(), w.stopPropagation();
                        let E = N.find(Y => Y.element.current === (R == null ? void 0 : R.activeElement));
                        E && h(E.propsRef.current.value)
                    }
                        break
                }
            }),
                T = ne(w => (y({
                    type: 0,
                    ...w
                }), () => y({
                    type: 1,
                    id: w.id
                }))),
                A = d.exports.useMemo(() => ({
                    value: q,
                    firstOption: I,
                    containsCheckedOption: p,
                    disabled: f,
                    compare: v,
                    ...x
                }), [q, I, p, f, v, x]),
                L = d.exports.useMemo(() => ({
                    registerOption: T,
                    change: h
                }), [T, h]),
                z = {
                    ref: V,
                    id: n,
                    role: "radiogroup",
                    "aria-labelledby": D,
                    "aria-describedby": U,
                    onKeyDown: S
                },
                X = d.exports.useMemo(() => ({
                    value: q
                }), [q]),
                J = d.exports.useRef(null),
                j = yt();
            return d.exports.useEffect(() => {
                !J.current || s !== void 0 && j.addEventListener(J.current, "reset", () => {
                    h(s)
                })
            }, [J, h]), O.createElement(C, {
                name: "RadioGroup.Description"
            }, O.createElement(F, {
                name: "RadioGroup.Label"
            }, O.createElement(_n.Provider, {
                value: L
            }, O.createElement(Cn.Provider, {
                value: A
            }, o != null && q != null && Qa({
                [o]: q
            }).map(([w, k], R) => O.createElement(Wt, {
                features: Lt.Hidden,
                ref: R === 0 ? H => {
                    var E;
                    J.current = (E = H == null ? void 0 : H.closest("form")) != null ? E : null
                } : void 0,
                ...wr({
                    key: w,
                    as: "input",
                    type: "radio",
                    checked: k != null,
                    hidden: !0,
                    readOnly: !0,
                    name: w,
                    value: k
                })
            })), be({
                ourProps: z,
                theirProps: m,
                slot: X,
                defaultTag: Yl,
                name: "RadioGroup"
            })))))
        });
    var Zl = (e => (e[e.Empty = 1] = "Empty", e[e.Active = 2] = "Active", e))(Zl || {});
    let Xl = "div",
        Jl = we(function (e, t) {
            var r;
            let n = Ie(),
                {
                    id: a = `headlessui-radiogroup-option-${n}`,
                    value: s,
                    disabled: o = !1,
                    ...l
                } = e,
                c = d.exports.useRef(null),
                f = _e(c, t),
                [m, v] = Sn(),
                [x, y] = Er(),
                {
                    addFlag: N,
                    removeFlag: D,
                    hasFlag: F
                } = Wl(1),
                U = Ge({
                    value: s,
                    disabled: o
                }),
                C = pi("RadioGroup.Option"),
                K = gi("RadioGroup.Option");
            Ce(() => K.registerOption({
                id: a,
                element: c,
                propsRef: U
            }), [a, K, c, e]);
            let V = ne(A => {
                var L;
                if (qt(A.currentTarget)) return A.preventDefault();
                !K.change(s) || (N(2), (L = c.current) == null || L.focus())
            }),
                q = ne(A => {
                    if (qt(A.currentTarget)) return A.preventDefault();
                    N(2)
                }),
                W = ne(() => D(2)),
                I = ((r = C.firstOption) == null ? void 0 : r.id) === a,
                p = C.disabled || o,
                h = C.compare(C.value, s),
                S = {
                    ref: f,
                    id: a,
                    role: "radio",
                    "aria-checked": h ? "true" : "false",
                    "aria-labelledby": m,
                    "aria-describedby": x,
                    "aria-disabled": p ? !0 : void 0,
                    tabIndex: (() => p ? -1 : h || !C.containsCheckedOption && I ? 0 : -1)(),
                    onClick: p ? void 0 : V,
                    onFocus: p ? void 0 : q,
                    onBlur: p ? void 0 : W
                },
                T = d.exports.useMemo(() => ({
                    checked: h,
                    disabled: p,
                    active: F(2)
                }), [h, p, F]);
            return O.createElement(y, {
                name: "RadioGroup.Description"
            }, O.createElement(v, {
                name: "RadioGroup.Label"
            }, be({
                ourProps: S,
                theirProps: l,
                slot: T,
                defaultTag: Xl,
                name: "RadioGroup.Option"
            })))
        }),
        ie = Object.assign(Ql, {
            Option: Jl,
            Label: mi,
            Description: xn
        }),
        An = d.exports.createContext(null);
    An.displayName = "GroupContext";
    let ec = d.exports.Fragment;

    function tc(e) {
        let [t, r] = d.exports.useState(null), [n, a] = Sn(), [s, o] = Er(), l = d.exports.useMemo(() => ({
            switch: t,
            setSwitch: r,
            labelledby: n,
            describedby: s
        }), [t, r, n, s]), c = {}, f = e;
        return O.createElement(o, {
            name: "Switch.Description"
        }, O.createElement(a, {
            name: "Switch.Label",
            props: {
                onClick() {
                    !t || (t.click(), t.focus({
                        preventScroll: !0
                    }))
                }
            }
        }, O.createElement(An.Provider, {
            value: l
        }, be({
            ourProps: c,
            theirProps: f,
            defaultTag: ec,
            name: "Switch.Group"
        }))))
    }
    let rc = "button",
        nc = we(function (e, t) {
            let r = Ie(),
                {
                    id: n = `headlessui-switch-${r}`,
                    checked: a,
                    defaultChecked: s = !1,
                    onChange: o,
                    name: l,
                    value: c,
                    ...f
                } = e,
                m = d.exports.useContext(An),
                v = d.exports.useRef(null),
                x = _e(v, t, m === null ? null : m.setSwitch),
                [y, N] = ti(a, o, s),
                D = ne(() => N == null ? void 0 : N(!y)),
                F = ne(W => {
                    if (qt(W.currentTarget)) return W.preventDefault();
                    W.preventDefault(), D()
                }),
                U = ne(W => {
                    W.key === me.Space ? (W.preventDefault(), D()) : W.key === me.Enter && Ja(W.currentTarget)
                }),
                C = ne(W => W.preventDefault()),
                K = d.exports.useMemo(() => ({
                    checked: y
                }), [y]),
                V = {
                    id: n,
                    ref: x,
                    role: "switch",
                    type: $a(e, v),
                    tabIndex: 0,
                    "aria-checked": y,
                    "aria-labelledby": m == null ? void 0 : m.labelledby,
                    "aria-describedby": m == null ? void 0 : m.describedby,
                    onClick: F,
                    onKeyUp: U,
                    onKeyPress: C
                },
                q = yt();
            return d.exports.useEffect(() => {
                var W;
                let I = (W = v.current) == null ? void 0 : W.closest("form");
                !I || s !== void 0 && q.addEventListener(I, "reset", () => {
                    N(s)
                })
            }, [v, N]), O.createElement(O.Fragment, null, l != null && y && O.createElement(Wt, {
                features: Lt.Hidden,
                ...wr({
                    as: "input",
                    type: "checkbox",
                    hidden: !0,
                    readOnly: !0,
                    checked: y,
                    name: l,
                    value: c
                })
            }), be({
                ourProps: V,
                theirProps: f,
                slot: K,
                defaultTag: rc,
                name: "Switch"
            }))
        }),
        ve = Object.assign(nc, {
            Group: tc,
            Label: mi,
            Description: xn
        });

    function ac(e) {
        let t = {
            called: !1
        };
        return (...r) => {
            if (!t.called) return t.called = !0, e(...r)
        }
    }

    function Rn(e, ...t) {
        e && t.length > 0 && e.classList.add(...t)
    }

    function Tn(e, ...t) {
        e && t.length > 0 && e.classList.remove(...t)
    }

    function ic(e, t) {
        let r = rt();
        if (!e) return r.dispose;
        let {
            transitionDuration: n,
            transitionDelay: a
        } = getComputedStyle(e), [s, o] = [n, a].map(l => {
            let [c = 0] = l.split(",").filter(Boolean).map(f => f.includes("ms") ? parseFloat(f) : parseFloat(f) * 1e3).sort((f, m) => m - f);
            return c
        });
        if (s + o !== 0) {
            let l = r.addEventListener(e, "transitionend", c => {
                c.target === c.currentTarget && (t(), l())
            })
        } else t();
        return r.add(() => t()), r.dispose
    }

    function sc(e, t, r, n) {
        let a = r ? "enter" : "leave",
            s = rt(),
            o = n !== void 0 ? ac(n) : () => { };
        a === "enter" && (e.removeAttribute("hidden"), e.style.display = "");
        let l = xe(a, {
            enter: () => t.enter,
            leave: () => t.leave
        }),
            c = xe(a, {
                enter: () => t.enterTo,
                leave: () => t.leaveTo
            }),
            f = xe(a, {
                enter: () => t.enterFrom,
                leave: () => t.leaveFrom
            });
        return Tn(e, ...t.enter, ...t.enterTo, ...t.enterFrom, ...t.leave, ...t.leaveFrom, ...t.leaveTo, ...t.entered), Rn(e, ...l, ...f), s.nextFrame(() => {
            Tn(e, ...f), Rn(e, ...c), ic(e, () => (Tn(e, ...l), Rn(e, ...t.entered), o()))
        }), s.dispose
    }

    function oc({
        container: e,
        direction: t,
        classes: r,
        onStart: n,
        onStop: a
    }) {
        let s = kr(),
            o = yt(),
            l = Ge(t);
        Ce(() => {
            let c = rt();
            o.add(c.dispose);
            let f = e.current;
            if (!!f && l.current !== "idle" && !!s.current) return c.dispose(), n.current(l.current), c.add(sc(f, r.current, l.current === "enter", () => {
                c.dispose(), a.current(l.current)
            })), c.dispose
        }, [t])
    }

    function wt(e = "") {
        return e.split(" ").filter(t => t.trim().length > 1)
    }
    let _r = d.exports.createContext(null);
    _r.displayName = "TransitionContext";
    var lc = (e => (e.Visible = "visible", e.Hidden = "hidden", e))(lc || {});

    function cc() {
        let e = d.exports.useContext(_r);
        if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
        return e
    }

    function dc() {
        let e = d.exports.useContext(Ar);
        if (e === null) throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");
        return e
    }
    let Ar = d.exports.createContext(null);
    Ar.displayName = "NestingContext";

    function Rr(e) {
        return "children" in e ? Rr(e.children) : e.current.filter(({
            el: t
        }) => t.current !== null).filter(({
            state: t
        }) => t === "visible").length > 0
    }

    function vi(e, t) {
        let r = Ge(e),
            n = d.exports.useRef([]),
            a = kr(),
            s = yt(),
            o = ne((y, N = nt.Hidden) => {
                let D = n.current.findIndex(({
                    el: F
                }) => F === y);
                D !== -1 && (xe(N, {
                    [nt.Unmount]() {
                        n.current.splice(D, 1)
                    },
                    [nt.Hidden]() {
                        n.current[D].state = "hidden"
                    }
                }), s.microTask(() => {
                    var F;
                    !Rr(n) && a.current && ((F = r.current) == null || F.call(r))
                }))
            }),
            l = ne(y => {
                let N = n.current.find(({
                    el: D
                }) => D === y);
                return N ? N.state !== "visible" && (N.state = "visible") : n.current.push({
                    el: y,
                    state: "visible"
                }), () => o(y, nt.Unmount)
            }),
            c = d.exports.useRef([]),
            f = d.exports.useRef(Promise.resolve()),
            m = d.exports.useRef({
                enter: [],
                leave: [],
                idle: []
            }),
            v = ne((y, N, D) => {
                c.current.splice(0), t && (t.chains.current[N] = t.chains.current[N].filter(([F]) => F !== y)), t == null || t.chains.current[N].push([y, new Promise(F => {
                    c.current.push(F)
                })]), t == null || t.chains.current[N].push([y, new Promise(F => {
                    Promise.all(m.current[N].map(([U, C]) => C)).then(() => F())
                })]), N === "enter" ? f.current = f.current.then(() => t == null ? void 0 : t.wait.current).then(() => D(N)) : D(N)
            }),
            x = ne((y, N, D) => {
                Promise.all(m.current[N].splice(0).map(([F, U]) => U)).then(() => {
                    var F;
                    (F = c.current.shift()) == null || F()
                }).then(() => D(N))
            });
        return d.exports.useMemo(() => ({
            children: n,
            register: l,
            unregister: o,
            onStart: v,
            onStop: x,
            wait: f,
            chains: m
        }), [l, o, n, v, x, m, f])
    }

    function uc() { }
    let fc = ["beforeEnter", "afterEnter", "beforeLeave", "afterLeave"];

    function yi(e) {
        var t;
        let r = {};
        for (let n of fc) r[n] = (t = e[n]) != null ? t : uc;
        return r
    }

    function hc(e) {
        let t = d.exports.useRef(yi(e));
        return d.exports.useEffect(() => {
            t.current = yi(e)
        }, [e]), t
    }
    let mc = "div",
        xi = Tt.RenderStrategy,
        bi = we(function (e, t) {
            let {
                beforeEnter: r,
                afterEnter: n,
                beforeLeave: a,
                afterLeave: s,
                enter: o,
                enterFrom: l,
                enterTo: c,
                entered: f,
                leave: m,
                leaveFrom: v,
                leaveTo: x,
                ...y
            } = e, N = d.exports.useRef(null), D = _e(N, t), F = y.unmount ? nt.Unmount : nt.Hidden, {
                show: U,
                appear: C,
                initial: K
            } = cc(), [V, q] = d.exports.useState(U ? "visible" : "hidden"), W = dc(), {
                register: I,
                unregister: p
            } = W, h = d.exports.useRef(null);
            d.exports.useEffect(() => I(N), [I, N]), d.exports.useEffect(() => {
                if (F === nt.Hidden && !!N.current) {
                    if (U && V !== "visible") {
                        q("visible");
                        return
                    }
                    return xe(V, {
                        hidden: () => p(N),
                        visible: () => I(N)
                    })
                }
            }, [V, N, I, p, U, F]);
            let S = Ge({
                enter: wt(o),
                enterFrom: wt(l),
                enterTo: wt(c),
                entered: wt(f),
                leave: wt(m),
                leaveFrom: wt(v),
                leaveTo: wt(x)
            }),
                T = hc({
                    beforeEnter: r,
                    afterEnter: n,
                    beforeLeave: a,
                    afterLeave: s
                }),
                A = At();
            d.exports.useEffect(() => {
                if (A && V === "visible" && N.current === null) throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")
            }, [N, V, A]);
            let L = K && !C,
                z = (() => !A || L || h.current === U ? "idle" : U ? "enter" : "leave")(),
                X = ne(R => xe(R, {
                    enter: () => T.current.beforeEnter(),
                    leave: () => T.current.beforeLeave(),
                    idle: () => { }
                })),
                J = ne(R => xe(R, {
                    enter: () => T.current.afterEnter(),
                    leave: () => T.current.afterLeave(),
                    idle: () => { }
                })),
                j = vi(() => {
                    q("hidden"), p(N)
                }, W);
            oc({
                container: N,
                classes: S,
                direction: z,
                onStart: Ge(R => {
                    j.onStart(N, R, X)
                }),
                onStop: Ge(R => {
                    j.onStop(N, R, J), R === "leave" && !Rr(j) && (q("hidden"), p(N))
                })
            }), d.exports.useEffect(() => {
                !L || (F === nt.Hidden ? h.current = null : h.current = U)
            }, [U, L, V]);
            let w = y,
                k = {
                    ref: D
                };
            return C && U && He.isServer && (w = {
                ...w,
                className: Ka(y.className, ...S.current.enter, ...S.current.enterFrom)
            }), O.createElement(Ar.Provider, {
                value: j
            }, O.createElement(ei, {
                value: xe(V, {
                    visible: Ke.Open,
                    hidden: Ke.Closed
                })
            }, be({
                ourProps: k,
                theirProps: w,
                defaultTag: mc,
                features: xi,
                visible: V === "visible",
                name: "Transition.Child"
            })))
        }),
        Ln = we(function (e, t) {
            let {
                show: r,
                appear: n = !1,
                unmount: a,
                ...s
            } = e, o = d.exports.useRef(null), l = _e(o, t);
            At();
            let c = Nr();
            if (r === void 0 && c !== null && (r = xe(c, {
                [Ke.Open]: !0,
                [Ke.Closed]: !1
            })), ![!0, !1].includes(r)) throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");
            let [f, m] = d.exports.useState(r ? "visible" : "hidden"), v = vi(() => {
                m("hidden")
            }), [x, y] = d.exports.useState(!0), N = d.exports.useRef([r]);
            Ce(() => {
                x !== !1 && N.current[N.current.length - 1] !== r && (N.current.push(r), y(!1))
            }, [N, r]);
            let D = d.exports.useMemo(() => ({
                show: r,
                appear: n,
                initial: x
            }), [r, n, x]);
            d.exports.useEffect(() => {
                if (r) m("visible");
                else if (!Rr(v)) m("hidden");
                else {
                    let U = o.current;
                    if (!U) return;
                    let C = U.getBoundingClientRect();
                    C.x === 0 && C.y === 0 && C.width === 0 && C.height === 0 && m("hidden")
                }
            }, [r, v]);
            let F = {
                unmount: a
            };
            return O.createElement(Ar.Provider, {
                value: v
            }, O.createElement(_r.Provider, {
                value: D
            }, be({
                ourProps: {
                    ...F,
                    as: d.exports.Fragment,
                    children: O.createElement(bi, {
                        ref: l,
                        ...F,
                        ...s
                    })
                },
                theirProps: {},
                defaultTag: d.exports.Fragment,
                features: xi,
                visible: f === "visible",
                name: "Transition"
            })))
        }),
        pc = we(function (e, t) {
            let r = d.exports.useContext(_r) !== null,
                n = Nr() !== null;
            return O.createElement(O.Fragment, null, !r && n ? O.createElement(Ln, {
                ref: t,
                ...e
            }) : O.createElement(bi, {
                ref: t,
                ...e
            }))
        }),
        at = Object.assign(Ln, {
            Child: pc,
            Root: Ln
        });

    function gc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
        }))
    }
    var vc = d.exports.forwardRef(gc);

    function yc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        }))
    }
    var xc = d.exports.forwardRef(yc);

    function bc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        }))
    }
    var wi = d.exports.forwardRef(bc);

    function wc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
        }))
    }
    var Ni = d.exports.forwardRef(wc);

    function Nc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
        }))
    }
    var kc = d.exports.forwardRef(Nc);

    function Ec({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
        }), d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        }))
    }
    var Sc = d.exports.forwardRef(Ec);

    function Cc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        }))
    }
    var ki = d.exports.forwardRef(Cc);

    function _c({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        }))
    }
    var Ei = d.exports.forwardRef(_c);

    function Ac({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        }))
    }
    var Si = d.exports.forwardRef(Ac);

    function Rc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
        }))
    }
    var Tc = d.exports.forwardRef(Rc);

    function Lc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
        }))
    }
    var Oc = d.exports.forwardRef(Lc);

    function Dc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6 18L18 6M6 6l12 12"
        }))
    }
    var Ci = d.exports.forwardRef(Dc);

    function Mc(e) {
        var l, c, f, m;
        const [t, r] = ye(), {
            showAlert: n
        } = r, [a, s] = d.exports.useState(!1), o = () => {
            s(!0);
            const {
                auth: {
                    licenceCode: v
                }
            } = t;
            st.getMe(v).then(async x => {
                const y = await x.json();
                if (x.status === 200) {
                    de.trackEvent(Ki, {
                        distinct_id: y.id,
                        ...y
                    }), de.trackEvent(zn, {
                        distinct_id: y.id,
                        ...y
                    }), await r.setLicenceCode(v), await r.setMe(y);
                    const {
                        subscription_days_left: N,
                        subscription_type: D
                    } = y;
                    n(`Your subscription is ${D.toUpperCase()} (${N} days)`, "success")
                } else if (de.trackEvent(Pt, {
                    error: y
                }), x.status === 401) {
                    await r.logout(), n("Your licence code is invalid", "error");
                    return
                }
            }).catch(x => {
                de.trackEvent(Pt, {
                    page: "Navigation",
                    error: x
                }), n("Your licence code is invalid", "error")
            }).finally(() => {
                s(!1)
            })
        };
        function getWeekdayIntl() {
            return new Intl.DateTimeFormat('en-EN', { weekday: 'long' }).format(new Date());
        }
        return u("div",{
            className: "",
            children: [
                u("div", {
                    className: "flex justify-between items-center",
                    children: [u("div", {
                        className: "flex items-center space-x-2",
                        children: [i("a", {
                            // href: "#/",
                            className: "flex items-center justify-center rounded-full bg-gray-600 p-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
                            children: i(Ei, {
                                className: "w-6 h-6",
                                "aria-hidden": "true"
                            })
                        }), u("div", {
                            className: "flex items-center bg-gradient-to-r cursor-pointer from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-full px-3 py-1",
                            children: [i("img", {
                                src: `https://ui-avatars.com/api/?name=${void 0}&background=0D8ABC&color=fff`,
                                alt: "",
                                className: "h-6 w-6 rounded-full border-white border-2"
                            }), u("p", {
                                className: "mx-2 text-xs font-medium text-white uppercase",
                                children: ["Today is ", getWeekdayIntl()]
                            }),
                        ]})
                    ]})
                ]}),
                // u("div", {
                //     className: "mt-3 border border-grey-300 px-3 pt-2",
                //     children: [
                //         u("form", {
                //             className: "flex justify-between",
                //             id: "form-submit-product-type",
                //             children: [
                //                 u("div", {
                //                     className: "mb-2",
                //                     children: [
                //                         u("label", {
                //                             className: "block",
                //                             children: "Select product types" 
                //                         }),
                //                         u("select", {
                //                             className: "px-3 py-2 border rounded text-sm",
                //                             id: "select-product-types",
                //                             children: [arrayChilrenOptions]
                //                         })
                //                     ]
                //                 }),
                //                 u("div", {
                //                     className: "mt-3",
                //                     children: [
                //                         u("button", {
                //                             className: "px-3 py-2 border border-full rounded text-sm bg-blue-500 text-white",
                //                             id: 'btn-submit-push-product',
                //                             type: 'submit',
                //                             children: "Push product" 
                //                         })
                //                     ]
                //                 })
                //             ]
                //         })
                //     ]
                // })
            ]
        })
    }

    function Pc() {
        // return u("div", {
        //     className: "flex text-xs items-center justify-between rounded-md bg-yellow-50 p-2 mt-2",
        //     children: [u("p", {
        //         className: "text-gray-900",
        //         children: [i("span", {
        //             className: "font-bold",
        //             children: "\u{1F6A8} HeyEtsy.com is still in beta."
        //         }), " ", "Things will break. If you have any feedback, please let us know in our live chat."]
        //     }), u("a", {
        //         href: Bn,
        //         target: "_blank",
        //         className: "flex flex-none items-center space-x-2 rounded-full bg-gray-900 py-1 px-3.5 font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900",
        //         children: [i("svg", {
        //             xmlns: "http://www.w3.org/2000/svg",
        //             viewBox: "0 0 20 20",
        //             fill: "currentColor",
        //             className: "w-5 h-5",
        //             children: i("path", {
        //                 fillRule: "evenodd",
        //                 d: "M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z",
        //                 clipRule: "evenodd"
        //             })
        //         }), i("span", {
        //             children: "Chat"
        //         })]
        //     })]
        // })
    }

    function Ic() {
        const [e, t] = ye(), {
            showAlert: r
        } = t, [n, a] = O.useState(!1);
        return d.exports.useEffect(() => {
            async function s() {
                const {
                    auth: {
                        licenceCode: o
                    }
                } = e;
                st.getMe(o).then(async l => {
                    const c = await l.json();
                    if (l.status === 200) de.trackEvent(Ki, {
                        distinct_id: c.id,
                        ...c
                    }), de.trackEvent(zn, {
                        distinct_id: c.id,
                        ...c
                    }), await t.setLicenceCode(o), await t.setMe(c);
                    else if (de.trackEvent(Pt, {
                        error: c
                    }), l.status === 401) {
                        await t.logout(), r("Your licence code is invalid", "error");
                        return
                    }
                }).catch(l => {
                    de.trackEvent(Pt, {
                        page: "AuthVerify",
                        error: l
                    }), r("Your licence code is invalid", "error")
                })
            }
            t.isAuthenticated() && s()
        }, [n]), i(Je, {})
    }
    const Fc = chrome.runtime ? chrome.runtime.getManifest() : {
        version: "N/A"
    },
        On = Fc.version;

    function Ye({
        children: e
    }) {
        const [t, r] = ye(), {
            auth: {
                me: n
            },
            alert: {
                isShow: a,
                message: s,
                type: o
            }
        } = t, {
            hideAlert: l
        } = r;
        return u("div", {
            className: "flex flex-col h-3 p-4 space-y-2 font-sans antialiased",
            children: [i("div", {
                className: "pb-2 border-b-2 border-gray-200",
                children: u("div", {
                    className: "flex items-center justify-between",
                    children: [u("div", {
                        className: "flex-col space-y-1 items-center justify-between",
                        children: [i("a", {
                            // href: "#",
                            // target: "_blank",
                            className: " text-lg font-bold  text-gray-700 ",
                            children: "\u{1F44B} Welcome to extension by Team EXP"
                        }), u("p", {
                            className: "flex items-center text-xs text-gray-600 mr-2",
                            children: [i("span", {
                                children: "v"
                            }), u("span", {
                                children: [On != null ? On : "1.0.0", " "]
                            })]
                        })]
                    }), 
                    // u("div", {
                    //     className: "flex-col space-y-1",
                    //     children: [i("div", {
                    //         className: "flex justify-end",
                    //         children: u("a", {
                    //             // href: "#",
                    //             // target: "_blank",
                    //             className: "text-gray-600",
                    //             children: ["Made by", " ", i("span", {
                    //                 className: "text-red-600 font-semibold",
                    //                 children: "YTuong.me ft Ryotaru"
                    //             })]
                    //         })
                    //     }), 
                        // u("div", {
                        //     className: "flex items-center space-x-3",
                        //     children: [u("a", {
                        //         target: "_blank",
                        //         href: Jd,
                        //         className: "text-xs text-gray-600 flex items-center space-x-1 hover:text-gray-900 hover:underline no-underline",
                        //         children: [u("svg", {
                        //             xmlns: "http://www.w3.org/2000/svg",
                        //             viewBox: "0 0 24 24",
                        //             fill: "currentColor",
                        //             className: "w-4 h-4 text-blue-600",
                        //             children: [i("path", {
                        //                 fillRule: "evenodd",
                        //                 d: "M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z",
                        //                 clipRule: "evenodd"
                        //             }), i("path", {
                        //                 d: "M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"
                        //             })]
                        //         }), i("span", {
                        //             children: "Blog"
                        //         })]
                        //     }), u("a", {
                        //         target: "_blank",
                        //         href: Bn,
                        //         className: "text-xs text-gray-600 flex items-center space-x-1 hover:text-gray-900 hover:underline no-underline",
                        //         children: [u("svg", {
                        //             xmlns: "http://www.w3.org/2000/svg",
                        //             viewBox: "0 0 20 20",
                        //             fill: "currentColor",
                        //             className: "w-4 h-4 text-blue-600",
                        //             children: [i("path", {
                        //                 d: "M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z"
                        //             }), i("path", {
                        //                 d: "M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z"
                        //             })]
                        //         }), i("span", {
                        //             children: "Chat Support"
                        //         })]
                        //     })]
                        // })
                    // ]})
                ]
                })
            }), i("div", {
                className: "pb-2 border-b-2 border-gray-200",
                children: u("p", {
                    className: "text-sm text-gray-800 truncate",
                    children: ["Hi", " ", i("span", {
                        className: "font-bold text-red-700 underline truncate w-28 hover:text-red-900",
                        // children: (n == null ? void 0 : n.name) || "Guest"
                        children: "Client"
                    }), ", Welcome back ! \u{1F389}"]
                })
            }), r.isAuthenticated() && i(Mc, {}), i(Pc, {}), a && i("div", {
                className: "my-2",
                children: i(vo, {
                    type: o,
                    message: s,
                    onDismiss: () => l()
                })
            }), e, u("div", {
                className: "flex items-center justify-between pb-2 border-t-2 border-gray-200",
                children: []
            }), i(Ic, {})]
        })
    }

    function _i(e) {
        return i("div", {
            className: "flex flex-col items-center pb-2 space-y-2",
            children: i("h1", {
                className: "text-2xl text-gray-900 font-bold",
                children: "Login"
            })
        })
    }

    function jc() {
        const [e, t] = d.exports.useState(!1), [r, n] = d.exports.useState(!0), {
            register: a,
            handleSubmit: s,
            watch: o,
            formState: {
                errors: l
            }
        } = Ut();
        return i(Ye, {
            children: u("div", {
                className: "w-full",
                children: [i(_i, {
                    loginType: "normal"
                }), r ? i("h1", {
                    className: "text-lg font-bold text-center text-gray-900 py-4",
                    children: "Sorry, We're working on it... \u{1F468}\u200D\u{1F4BB} Please come back later"
                }) : u("form", {
                    className: "py-2 space-y-4",
                    onSubmit: s(async c => {
                        console.log(c)
                    }),
                    children: [u("div", {
                        children: [u("div", {
                            className: "flex justify-between",
                            children: [i("label", {
                                className: "block text-sm font-medium text-gray-700",
                                children: "Email"
                            }), i("span", {
                                className: "text-sm text-red-500",
                                id: "email-required",
                                children: "*"
                            })]
                        }), u("div", {
                            className: "relative mt-1 rounded-md shadow-sm",
                            children: [i("input", {
                                type: "email",
                                name: "email",
                                id: "email",
                                ...a("emailRequired", {
                                    required: !0
                                }),
                                className: $({
                                    "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm": l.emailRequired,
                                    "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-1 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm": !l.emailRequired
                                }),
                                placeholder: "you@example.com"
                            }), l.emailRequired && i("div", {
                                className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                                children: i("svg", {
                                    className: "w-5 h-5 text-red-500",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    "aria-hidden": "true",
                                    children: i("path", {
                                        fillRule: "evenodd",
                                        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
                                        clipRule: "evenodd"
                                    })
                                })
                            })]
                        })]
                    }), u("div", {
                        children: [u("div", {
                            className: "flex justify-between",
                            children: [i("label", {
                                className: "block text-sm font-medium text-gray-700",
                                children: "Password"
                            }), i("span", {
                                className: "text-sm text-red-500",
                                id: "password-required",
                                children: "*"
                            })]
                        }), u("div", {
                            className: "relative mt-1 rounded-md shadow-sm",
                            children: [i("input", {
                                id: "password",
                                name: "password",
                                type: "password",
                                autoComplete: "current-password",
                                ...a("passwordRequired", {
                                    required: !0
                                }),
                                className: $({
                                    "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm": l.passwordRequired,
                                    "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-1 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm": !l.passwordRequired
                                }),
                                placeholder: "********"
                            }), l.passwordRequired && i("div", {
                                className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                                children: i("svg", {
                                    className: "w-5 h-5 text-red-500",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    "aria-hidden": "true",
                                    children: i("path", {
                                        fillRule: "evenodd",
                                        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
                                        clipRule: "evenodd"
                                    })
                                })
                            })]
                        })]
                    }), u("div", {
                        className: "flex items-center justify-between",
                        children: [i("div", {
                            className: "text-sm",
                            children: i("a", {
                                href: `${st.HEYETSY_URL}/register`,
                                target: "_blank",
                                className: "font-medium text-teal-600 hover:text-teal-500 hover:underline",
                                children: "Register"
                            })
                        }), i("div", {
                            className: "text-sm",
                            children: i("a", {
                                href: `${st.HEYETSY_URL}/forgot-password`,
                                target: "_blank",
                                className: "font-medium text-teal-600 hover:text-teal-500 hover:underline",
                                children: "Forgot your password?"
                            })
                        })]
                    }), u("div", {
                        children: [!e && i("button", {
                            type: "submit",
                            className: "flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
                            children: "Sign in"
                        }), e && u("button", {
                            type: "button",
                            className: "flex items-center justify-center w-full px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-teal-400 rounded-md shadow cursor-not-allowed",
                            disabled: "",Bt
                            children: [u("svg", {
                                className: "w-5 h-5 mr-3 -ml-1 text-white animate-spin",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [i("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4"
                                }), i("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                })]
                            }), "Processing..."]
                        })]
                    })]
                })]
            })
        })
    }
    // html element hey etsy.com
    function zc() {
        let e = $s();
        const [t, r] = ye(), {
            showAlert: n
        } = r, [a, s] = d.exports.useState(!1), {
            auth: o
        } = t, {
            register: l,
            handleSubmit: c,
            watch: f,
            formState: {
                errors: m
            }
        } = Ut({
            defaultValues: {
                licenceCodeRequired: o.licenceCode || fetchDataGetTokenKey
            }
        });

        return i(Ye, {
            children: u("div", {
                className: "w-full",
                children: [i(_i, {
                    loginType: "api-key"
                }), u("form", {
                    className: "py-2 space-y-4",
                    onSubmit: c(async v => {
                        s(!0), n("Please wait...", "info");
                        const {
                            licenceCodeRequired: x
                        } = v;
                        st.getMe(x).then(async y => {
                            const N = await y.json();
                            y.status === 200 ? (de.trackEvent(zd, {
                                distinct_id: N.id,
                                ...N
                            }), de.trackEvent(zn, {
                                distinct_id: N.id,
                                ...N
                            }), await r.setLicenceCode(x), await r.setMe(N), n("Login successfully", "success"), setTimeout(() => {
                                e.push("/"), chrome.tabs.query({
                                    active: !0,
                                    currentWindow: !0
                                }, function (D) {
                                    chrome.tabs.sendMessage(D[0].id, {
                                        type: "RELOAD_PAGE"
                                    })
                                })
                            }, 200)) : (de.trackEvent(Pt, {
                                error: N
                            }), n("Login failed", "error"))
                        }).catch(y => {
                            de.trackEvent(Pt, {
                                page: "LoginLicenceCodePage",
                                error: y
                            }), n("Login failed", "error")
                        }).finally(() => {
                            s(!1)
                        })
                    }),
                    children: [u("div", {
                        children: [
                        //     u("div", {
                        //     className: "flex justify-between",
                        //     children: [i("label", {
                        //         className: "block text-sm font-medium text-gray-700",
                        //         children: "License Code (Render Auto Please Click 'Login')"
                        //     }), i("span", {
                        //         className: "text-sm text-red-500",
                        //         id: "licence-code-required",
                        //         children: "*"
                        //     })]
                        // }),
                         u("div", {
                            className: "relative mt-1 rounded-md shadow-sm",
                            children: [i("input", {
                                type: "hidden",
                                name: "licence-code",
                                id: "licence-code",
                                ...l("licenceCodeRequired", {
                                    required: !0
                                }),
                                className: $({
                                    "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm": m.licenceCodeRequired,
                                    "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-1 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm": !m.licenceCodeRequired
                                }),
                                placeholder: "Enter your license code"
                            }), m.licenceCodeRequired && i("div", {
                                className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                                children: i("svg", {
                                    className: "w-5 h-5 text-red-500",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    "aria-hidden": "true",
                                    children: i("path", {
                                        fillRule: "evenodd",
                                        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
                                        clipRule: "evenodd"
                                    })
                                })
                            })]
                        })]
                    }),
                    u("div", {
                        children: [!a && u("button", {
                            type: "submit",
                            className: "flex justify-center space-x-2 items-center w-full px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
                            children: [i("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 24 24",
                                fill: "currentColor",
                                className: "w-6 h-6",
                                children: i("path", {
                                    fillRule: "evenodd",
                                    d: "M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z",
                                    clipRule: "evenodd"
                                })
                            }), i("span", {
                                children: "Sign in"
                            })]
                        }), a && u("button", {
                            type: "button",
                            className: "flex items-center justify-center w-full px-4 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-teal-400 rounded-md shadow cursor-not-allowed",
                            disabled: "",
                            children: [u("svg", {
                                className: "w-5 h-5 mr-3 -ml-1 text-white animate-spin",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                children: [i("circle", {
                                    className: "opacity-25",
                                    cx: "12",
                                    cy: "12",
                                    r: "10",
                                    stroke: "currentColor",
                                    strokeWidth: "4"
                                }), i("path", {
                                    className: "opacity-75",
                                    fill: "currentColor",
                                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                })]
                            }), "Processing..."]
                        })]
                    })
                ]
                })]
            })
        })
    }

    function Vc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM6 13.25V3.5h8v9.75a.75.75 0 01-1.064.681L10 12.576l-2.936 1.355A.75.75 0 016 13.25z",
            clipRule: "evenodd"
        }))
    }
    var Bc = d.exports.forwardRef(Vc);

    function Uc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd"
        }))
    }
    var Yt = d.exports.forwardRef(Uc);

    function qc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            clipRule: "evenodd"
        }))
    }
    var Ai = d.exports.forwardRef(qc);

    function Wc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm5.25-9.25a.75.75 0 00-1.5 0v4.59l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V7.75z",
            clipRule: "evenodd"
        }))
    }
    var Ri = d.exports.forwardRef(Wc);

    function $c({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z",
            clipRule: "evenodd"
        }))
    }
    var Hc = d.exports.forwardRef($c);

    function Gc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z",
            clipRule: "evenodd"
        }))
    }
    var Ti = d.exports.forwardRef(Gc);

    function Kc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            fillRule: "evenodd",
            d: "M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z",
            clipRule: "evenodd"
        }))
    }
    var Li = d.exports.forwardRef(Kc);

    function Yc({
        title: e,
        titleId: t,
        ...r
    }, n) {
        return d.exports.createElement("svg", Object.assign({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            "aria-hidden": "true",
            ref: n,
            "aria-labelledby": t
        }, r), e ? d.exports.createElement("title", {
            id: t
        }, e) : null, d.exports.createElement("path", {
            d: "M1 4.25a3.733 3.733 0 012.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0016.75 2H3.25A2.25 2.25 0 001 4.25zM1 7.25a3.733 3.733 0 012.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0016.75 5H3.25A2.25 2.25 0 001 7.25zM7 8a1 1 0 011 1 2 2 0 104 0 1 1 0 011-1h3.75A2.25 2.25 0 0119 10.25v5.5A2.25 2.25 0 0116.75 18H3.25A2.25 2.25 0 011 15.75v-5.5A2.25 2.25 0 013.25 8H7z"
        }))
    }
    var Qc = d.exports.forwardRef(Yc);
    const Zc = [{
        id: "overlay",
        title: "Overlay",
        description: "Show sidebar on top of the content."
    }, {
        id: "pushed",
        title: "Pushed",
        description: "Show sidebar on the side of the content."
    }];

    function Oi() {
        const [e, t] = ye(), {
            heyEtsy: r
        } = e, n = a => {
            t.setHeyEtsySidebarBehavior(a), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (s) {
                chrome.tabs.sendMessage(s[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Vd, {
                heyEtsy: r
            })
        };
        return u(ie, {
            value: r.sidebarBehavior,
            onChange: n,
            className: "py-4",
            children: [i(ie.Label, {
                className: "text-base font-medium text-gray-900",
                children: "Sidebar Behavior"
            }), i("div", {
                className: "mt-4 grid grid-cols-2 gap-y-2 gap-x-2",
                children: Zc.map(a => i(ie.Option, {
                    value: a.id,
                    className: ({
                        checked: s,
                        active: o
                    }) => $(s ? "border-transparent" : "border-gray-300", o ? "border-teal-500 ring-2 ring-teal-500" : "", "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"),
                    children: ({
                        checked: s,
                        active: o
                    }) => u(Je, {
                        children: [i("span", {
                            className: "flex flex-1",
                            children: u("span", {
                                className: "flex flex-col",
                                children: [i(ie.Label, {
                                    as: "span",
                                    className: "block text-sm font-medium text-gray-900",
                                    children: a.title
                                }), i(ie.Description, {
                                    as: "span",
                                    className: "mt-1 flex items-center text-sm text-gray-500",
                                    children: a.description
                                })]
                            })
                        }), i(Yt, {
                            className: $(s ? "text-teal-600" : "text-gray-300", "h-5 w-5"),
                            "aria-hidden": "true"
                        }), i("span", {
                            className: $(o ? "border" : "border-2", s ? "border-teal-500" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                            "aria-hidden": "true"
                        })]
                    })
                }, a.id))
            })]
        })
    }
    const Xc = [{
        id: "top-left",
        title: "Left"
    }, {
        id: "top-right",
        title: "Right"
    }];

    function Dn() {
        const [e, t] = ye(), {
            heyEtsy: r
        } = e, n = a => {
            t.setHeyEtsySidebarPosition(a), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (s) {
                chrome.tabs.sendMessage(s[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Yi, {
                heyEtsy: r
            })
        };
        return u(ie, {
            value: r.sidebarPosition,
            onChange: n,
            className: "py-4",
            children: [i(ie.Label, {
                className: "text-base font-medium text-gray-900",
                children: "Sidebar Position"
            }), i("div", {
                className: "mt-4 grid grid-cols-2 gap-x-2 gap-y-2",
                children: Xc.map(a => i(ie.Option, {
                    value: a.id,
                    className: ({
                        checked: s,
                        active: o
                    }) => $(s ? "border-transparent" : "border-gray-300", o ? "border-teal-500 ring-2 ring-teal-500" : "", "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"),
                    children: ({
                        checked: s,
                        active: o
                    }) => u(Je, {
                        children: [u("div", {
                            className: "flex items-center justify-center w-full space-x-2",
                            children: [i(Yt, {
                                className: $(s ? "text-teal-600" : "text-gray-300", "h-5 w-5"),
                                "aria-hidden": "true"
                            }), i(ie.Label, {
                                as: "span",
                                className: "block text-sm font-medium text-gray-900",
                                children: a.title
                            })]
                        }), i("span", {
                            className: $(o ? "border" : "border-2", s ? "border-teal-500" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                            "aria-hidden": "true"
                        })]
                    })
                }, a.id))
            })]
        })
    }
    const Jc = [{
        id: eu,
        title: "Classic",
        description: "Card below the content."
    }, {
        id: It,
        title: "Modern",
        description: "Card on top of the content."
    }, {
        id: tu,
        title: "Minimal",
        description: "Card with minimal design."
    }];

    function Mn() {
        const [e, t] = ye(), {
            card: r
        } = e, n = a => {
            t.setCardStyle(a), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (s) {
                chrome.tabs.sendMessage(s[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Bd, {
                card: r
            })
        };
        return u(ie, {
            value: r.style,
            onChange: n,
            className: "py-4",
            children: [i(ie.Label, {
                className: "text-base font-medium text-gray-900",
                children: "Card Style"
            }), i("div", {
                className: "mt-2 grid grid-cols-2 gap-y-2 gap-x-2",
                children: Jc.map(a => i(ie.Option, {
                    value: a.id,
                    className: ({
                        checked: s,
                        active: o
                    }) => $(s ? "border-transparent" : "border-gray-300", o ? "border-teal-500 ring-2 ring-teal-500" : "", "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"),
                    children: ({
                        checked: s,
                        active: o
                    }) => u(Je, {
                        children: [i("span", {
                            className: "flex flex-1",
                            children: u("span", {
                                className: "flex flex-col",
                                children: [i(ie.Label, {
                                    as: "span",
                                    className: "block text-sm font-medium text-gray-900",
                                    children: a.title
                                }), i(ie.Description, {
                                    as: "span",
                                    className: "mt-1 flex items-center text-sm text-gray-500",
                                    children: a.description
                                })]
                            })
                        }), i(Yt, {
                            className: $(s ? "text-teal-600" : "text-gray-300", "h-5 w-5"),
                            "aria-hidden": "true"
                        }), i("span", {
                            className: $(o ? "border" : "border-2", s ? "border-teal-500" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                            "aria-hidden": "true"
                        })]
                    })
                }, a.id))
            })]
        })
    }

    function Pn() {
        const [e, t] = ye(), {
            card: r
        } = e, n = () => {
            t.toggleCardShow(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (o) {
                chrome.tabs.sendMessage(o[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Vn, {
                card: r
            })
        }, a = () => {
            t.toggleCardShowCategories(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (o) {
                chrome.tabs.sendMessage(o[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Vn, {
                card: r
            })
        }, s = () => {
            t.toggleCardShowTags(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (o) {
                chrome.tabs.sendMessage(o[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Vn, {
                card: r
            })
        };
        return u("div", {
            className: "py-4",
            children: [u("div", {
                children: [i("h2", {
                    className: "text-lg font-medium leading-6 text-gray-900",
                    children: "Card Settings"
                }), i("p", {
                    className: "mt-1 text-sm text-gray-500",
                    children: "Personalize the card to your liking."
                })]
            }), u("ul", {
                role: "list",
                className: "mt-2 divide-y divide-gray-200",
                children: [u(ve.Group, {
                    as: "li",
                    className: "flex items-center justify-between py-4",
                    children: [u("div", {
                        className: "flex flex-col",
                        children: [i(ve.Label, {
                            as: "p",
                            className: "text-sm font-medium text-gray-900",
                            passive: !0,
                            children: "Show Card"
                        }), i(ve.Description, {
                            className: "text-sm text-gray-500",
                            children: "Show the advanced information of the listing."
                        })]
                    }), i(ve, {
                        checked: r.show,
                        onChange: n,
                        className: $(r.show ? "bg-teal-500" : "bg-gray-200", "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"),
                        children: i("span", {
                            "aria-hidden": "true",
                            className: $(r.show ? "translate-x-5" : "translate-x-0", "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out")
                        })
                    })]
                }), u(ve.Group, {
                    as: "li",
                    className: "flex items-center justify-between py-4",
                    children: [u("div", {
                        className: "flex flex-col",
                        children: [i(ve.Label, {
                            as: "p",
                            className: "text-sm font-medium text-gray-900",
                            passive: !0,
                            children: "Show Categories"
                        }), i(ve.Description, {
                            className: "text-sm text-gray-500",
                            children: "Show the categories of the listing."
                        })]
                    }), i(ve, {
                        checked: r.showCategories,
                        onChange: a,
                        className: $(r.showCategories ? "bg-teal-500" : "bg-gray-200", "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"),
                        children: i("span", {
                            "aria-hidden": "true",
                            className: $(r.showCategories ? "translate-x-5" : "translate-x-0", "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out")
                        })
                    })]
                }), u(ve.Group, {
                    as: "li",
                    className: "flex items-center justify-between py-4",
                    children: [u("div", {
                        className: "flex flex-col",
                        children: [i(ve.Label, {
                            as: "p",
                            className: "text-sm font-medium text-gray-900",
                            passive: !0,
                            children: "Show Tags"
                        }), i(ve.Description, {
                            className: "text-sm text-gray-500",
                            children: "Show the tags of the listing."
                        })]
                    }), i(ve, {
                        checked: r.showTags,
                        onChange: s,
                        className: $(r.showTags ? "bg-teal-500" : "bg-gray-200", "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"),
                        children: i("span", {
                            "aria-hidden": "true",
                            className: $(r.showTags ? "translate-x-5" : "translate-x-0", "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out")
                        })
                    })]
                })]
            })]
        })
    }
    const ed = [{
        name: "Gray",
        bgColor: "bg-gray-900",
        selectedColor: "ring-gray-900",
        hex: "#111827"
    }, {
        name: "Red",
        bgColor: "bg-red-900",
        selectedColor: "ring-red-900",
        hex: "#7f1d1d"
    }, {
        name: "Yellow",
        bgColor: "bg-yellow-900",
        selectedColor: "ring-yellow-900",
        hex: "#713f12"
    }, {
        name: "Teal",
        bgColor: "bg-teal-900",
        selectedColor: "ring-teal-900",
        hex: "#134e4a"
    }, {
        name: "Blue",
        bgColor: "bg-blue-900",
        selectedColor: "ring-blue-900",
        hex: "#1e3a8a"
    }, {
        name: "Pink",
        bgColor: "bg-pink-900",
        selectedColor: "ring-pink-900",
        hex: "#831843"
    }],
        td = [{
            name: "While",
            bgColor: "bg-white",
            selectedColor: "ring-gray-400",
            hex: "#ffffff"
        }, {
            name: "Gray",
            bgColor: "bg-gray-50",
            selectedColor: "ring-gray-400",
            hex: "#f9fafb"
        }, {
            name: "Red",
            bgColor: "bg-red-50",
            selectedColor: "ring-red-400",
            hex: "#fef2f2"
        }, {
            name: "Yellow",
            bgColor: "bg-yellow-50",
            selectedColor: "ring-yellow-400",
            hex: "#fefce8"
        }, {
            name: "Teal",
            bgColor: "bg-teal-50",
            selectedColor: "ring-teal-400",
            hex: "#f0fdfa"
        }, {
            name: "Blue",
            bgColor: "bg-blue-50",
            selectedColor: "ring-blue-400",
            hex: "#eff6ff"
        }, {
            name: "Pink",
            bgColor: "bg-pink-50",
            selectedColor: "ring-pink-400",
            hex: "#fdf2f8"
        }];

    function Di() {
        const [e, t] = ye(), {
            card: r
        } = e, n = s => {
            t.setCardTextColor(s), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (o) {
                chrome.tabs.sendMessage(o[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Ud, {
                value: s
            })
        }, a = s => {
            t.setCardBackgroundColor(s), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (o) {
                chrome.tabs.sendMessage(o[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(qd, {
                value: s
            })
        };
        return u("div", {
            className: "py-4 space-y-4",
            children: [u(ie, {
                value: r.textColor,
                onChange: n,
                children: [i(ie.Label, {
                    className: "text-base font-medium text-gray-900",
                    children: "Text Color"
                }), i("div", {
                    className: "mt-2 flex items-center space-x-3",
                    children: ed.map(s => u(ie.Option, {
                        value: s.hex,
                        className: ({
                            active: o,
                            checked: l
                        }) => $({
                            [s.selectedColor]: !0,
                            "ring ring-offset-1": o && l,
                            "ring-2": !o && l,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none": !0
                        }),
                        children: [i(ie.Label, {
                            as: "span",
                            className: "sr-only",
                            children: s.name
                        }), i("span", {
                            "aria-hidden": "true",
                            className: $({
                                [s.bgColor]: !0,
                                "h-8 w-8 rounded-full border border-black border-opacity-10": !0
                            })
                        })]
                    }, s.name))
                })]
            }), u(ie, {
                value: r.backgroundColor,
                onChange: a,
                children: [i(ie.Label, {
                    className: "text-base font-medium text-gray-900",
                    children: "Background Color"
                }), i("div", {
                    className: "mt-2 flex items-center space-x-3",
                    children: td.map(s => u(ie.Option, {
                        value: s.hex,
                        className: ({
                            active: o,
                            checked: l
                        }) => $({
                            [s.selectedColor]: !0,
                            "ring ring-offset-1": o && l,
                            "ring-2": !o && l,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none": !0
                        }),
                        children: [i(ie.Label, {
                            as: "span",
                            className: "sr-only",
                            children: s.name
                        }), i("span", {
                            "aria-hidden": "true",
                            className: $({
                                [s.bgColor]: !0,
                                "h-8 w-8 rounded-full border border-black border-opacity-10": !0
                            })
                        })]
                    }, s.name))
                })]
            })]
        })
    }
    const dt = {
        VIEWS: "Views",
        FAVORITES: "Favorites",
        CREATED_AT: "Created",
        UPDATED_AT: "Updated",
        SIMILAR: "Similar",
        SHOP: "Shop",
        TAGS: "Tags",
        CATEGORIES: "Categories"
    },
        Qt = {
            VIEWS: "#e11d48",
            DAILY_VIEWS: "#e11d48",
            FAVORITES: "#2563eb",
            FAVORITES_RATE: "#ca8a04",
            CREATED_AT: "#0d9488",
            UPDATED_AT: "#0d9488",
            SIMILAR: "#0d9488",
            SHOP: "#0d9488",
            TAGS: "#0d9488"
        },
        Mi = {
            CREATED_AT: "original_creation",
            UPDATED_AT: "last_modified"
        };

    function In({
        listing: e
    }) {
        const [t, r] = ye(), {
            card: n
        } = t;
        return u("div", {
            className: "pt-4 relative",
            children: [u("div", {
                className: "font-bold text-sm border-2 border-gray-300 rounded-md p-4 w-full mx-auto",
                children: [u("div", {
                    className: "flex justify-between space-x-2 mb-2",
                    children: [u("span", {
                        className: "inline-flex w-full items-center gap-x-1.5 rounded bg-green-500 px-2 py-1 text-sm font-medium text-white",
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            className: "w-5 h-5",
                            children: i("path", {
                                d: "M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z"
                            })
                        }), u("span", {
                            children: [(e == null ? void 0 : e.sold) || 0, "+ Sold"]
                        })]
                    }), u("span", {
                        className: "inline-flex w-full items-center gap-x-1.5 rounded bg-orange-500 px-2 py-1 text-sm font-medium text-white",
                        children: [u("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            className: "w-5 h-5",
                            children: [i("path", {
                                d: "M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                            }), i("path", {
                                fillRule: "evenodd",
                                d: "M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
                                clipRule: "evenodd"
                            })]
                        }), u("span", {
                            children: [(e == null ? void 0 : e.views_24h) || 0, "+ Views"]
                        })]
                    })]
                }), u("div", {
                    className: "flex justify-between space-x-2 mb-2",
                    children: [u("span", {
                        className: $({
                            "inline-flex w-full items-center gap-x-1.5 rounded bg-blue-500 px-2 py-1 text-sm font-medium text-white": !0,
                            hidden: ((e == null ? void 0 : e.total_sold) || 0) === 0
                        }),
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            className: "w-5 h-5",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M8.5 3.528v4.644c0 .729-.29 1.428-.805 1.944l-1.217 1.216a8.75 8.75 0 013.55.621l.502.201a7.25 7.25 0 004.178.365l-2.403-2.403a2.75 2.75 0 01-.805-1.944V3.528a40.205 40.205 0 00-3 0zm4.5.084l.19.015a.75.75 0 10.12-1.495 41.364 41.364 0 00-6.62 0 .75.75 0 00.12 1.495L7 3.612v4.56c0 .331-.132.649-.366.883L2.6 13.09c-1.496 1.496-.817 4.15 1.403 4.475C5.961 17.852 7.963 18 10 18s4.039-.148 5.997-.436c2.22-.325 2.9-2.979 1.403-4.475l-4.034-4.034A1.25 1.25 0 0113 8.172v-4.56z",
                                clipRule: "evenodd"
                            })
                        }), u("span", {
                            children: [(e == null ? void 0 : e.total_sold) || 0, "+ Sold"]
                        })]
                    }), u("span", {
                        className: $({
                            "inline-flex w-full items-center gap-x-1.5 rounded bg-purple-500 px-2 py-1 text-sm font-medium text-white": !0,
                            hidden: ((e == null ? void 0 : e.estimated_revenue) || 0) === 0
                        }),
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 20 20",
                            fill: "currentColor",
                            className: "w-5 h-5",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z",
                                clipRule: "evenodd"
                            })
                        }), i("span", {
                            children: (e == null ? void 0 : e.estimated_revenue) || 0
                        })]
                    })]
                }), i("dl", {
                    className: "divide-y-2 divide-gray-200 mb-0",
                    children: Object.keys(dt).map(a => {
                        var s, o, l;
                        if (!e[Mi[a]]) switch (a) {
                            case "VIEWS":
                                return u("div", {
                                    className: "py-3 flex items-center justify-between",
                                    children: [i("dt", {
                                        className: "text-gray-900",
                                        children: dt[a]
                                    }), u("dd", {
                                        className: "font-bold",
                                        style: {
                                            color: Qt.DAILY_VIEWS
                                        },
                                        children: [e.daily_views || 0, " (Avg)"]
                                    }), i("dd", {
                                        className: "font-bold",
                                        style: {
                                            color: Qt.VIEWS
                                        },
                                        children: e.views || 0
                                    })]
                                }, a);
                            case "FAVORITES":
                                return u("div", {
                                    className: "py-3 flex justify-between",
                                    children: [i("dt", {
                                        className: "text-gray-900",
                                        children: dt[a]
                                    }), u("dd", {
                                        className: "font-bold",
                                        style: {
                                            color: Qt.FAVORITES
                                        },
                                        children: [e.hey || 0, "%"]
                                    }), i("dd", {
                                        className: "font-bold",
                                        style: {
                                            color: Qt.FAVORITES
                                        },
                                        children: e.num_favorers || 0
                                    })]
                                }, a);
                            case "SIMILAR":
                                return u("div", {
                                    className: "py-3 flex items-center justify-between",
                                    children: [i("dt", {
                                        className: "text-gray-900",
                                        children: i("a", {
                                            href: "https://www.etsy.com/listing/${listingId}/similar",
                                            target: "_blank",
                                            children: "\u{1F449} View market products"
                                        })
                                    }), i("dd", {
                                        className: "font-bold"
                                    })]
                                }, a);
                            case "SHOP":
                                return u("div", {
                                    className: "py-3 flex items-center justify-between",
                                    children: [i("dt", {
                                        className: "text-gray-900",
                                        children: i("a", {
                                            href: Gi + "/r/s/" + e.u,
                                            target: "_blank",
                                            children: "\u{1F449} Go to shop"
                                        })
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: u("span", {
                                            className: $({
                                                "inline-flex w-full items-center gap-x-1.5 rounded bg-red-500 px-2 py-1 text-sm font-medium text-white": !0,
                                                hidden: ((e == null ? void 0 : e.shop_sold) || 0) === 0
                                            }),
                                            children: [i("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 20 20",
                                                fill: "currentColor",
                                                className: "w-5 h-5",
                                                children: i("path", {
                                                    d: "M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.18 3a65.25 65.25 0 0113.36 1.412.75.75 0 01.58.875 48.645 48.645 0 01-1.618 6.2.75.75 0 01-.712.513H6a2.503 2.503 0 00-2.292 1.5H17.25a.75.75 0 010 1.5H2.76a.75.75 0 01-.748-.807 4.002 4.002 0 012.716-3.486L3.626 2.716a.25.25 0 00-.248-.216H1.75A.75.75 0 011 1.75zM6 17.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                                                })
                                            }), u("span", {
                                                children: [(e == null ? void 0 : e.shop_sold) || 0, "+ Sold"]
                                            })]
                                        })
                                    })]
                                }, a);
                            case "TAGS":
                                if (!(n != null && n.showTags)) return i(Je, {});
                                const c = ((s = e == null ? void 0 : e.tags) == null ? void 0 : s.split(",").filter(Boolean)) || [];
                                if (c.length === 0) return u("div", {
                                    className: "py-3 flex flex-col justify-between",
                                    children: [i("dt", {
                                        className: "text-gray-900",
                                        children: dt[a]
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: "No tags found"
                                    })]
                                }, a);
                                const f = (l = (o = e == null ? void 0 : e.tags) == null ? void 0 : o.replace(/'/g, "\\'")) == null ? void 0 : l.replace(/"/g, '\\"');
                                return u("div", {
                                    className: "py-3 flex flex-col justify-between",
                                    children: [u("dt", {
                                        className: "text-gray-900",
                                        children: [i("span", {
                                            children: dt[a]
                                        }), i("button", {
                                            type: "button",
                                            onClick: m => {
                                                let v = m.target;
                                                navigator.clipboard.writeText(f).then(x => {
                                                    v.innerText = "Copied!", setTimeout(() => {
                                                        v.innerText = "Copy"
                                                    }, 1e3)
                                                }).catch(x => {
                                                    v.innerText = "Error!", setTimeout(() => {
                                                        v.innerText = "Copy"
                                                    }, 1e3)
                                                })
                                            },
                                            className: "ml-2 text-sm inline-flex items-center px-2 py-1 border border-transparent shadow-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
                                            children: "Copy"
                                        })]
                                    }), i("dd", {
                                        className: "font-bold mt-2",
                                        children: c.map(m => u("a", {
                                            href: `https://www.etsy.com/search?q=${m == null ? void 0 : m.trim()}&ref=search_bar`,
                                            target: "_blank",
                                            className: "inline-flex m-1 items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200",
                                            children: [i("svg", {
                                                className: "h-1.5 w-1.5 fill-red-500",
                                                viewBox: "0 0 6 6",
                                                "aria-hidden": "true",
                                                children: i("circle", {
                                                    cx: "3",
                                                    cy: "3",
                                                    r: "3"
                                                })
                                            }), m == null ? void 0 : m.trim()]
                                        }, m))
                                    })]
                                }, a);
                            case "CATEGORIES":
                                return n != null && n.showCategories ? u("div", {
                                    className: "py-3 flex flex-col justify-between",
                                    children: [u("dt", {
                                        className: "text-gray-900",
                                        children: [i("span", {
                                            children: dt[a]
                                        }), i("button", {
                                            type: "button",
                                            onClick: m => {
                                                let v = m.target;
                                                navigator.clipboard.writeText(e == null ? void 0 : e.categories).then(x => {
                                                    v.innerText = "Copied!", setTimeout(() => {
                                                        v.innerText = "Copy"
                                                    }, 1e3)
                                                }).catch(x => {
                                                    v.innerText = "Error!", setTimeout(() => {
                                                        v.innerText = "Copy"
                                                    }, 1e3)
                                                })
                                            },
                                            className: "ml-2 text-sm inline-flex items-center px-2 py-1 border border-transparent shadow-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
                                            children: "Copy"
                                        })]
                                    }), i("dd", {
                                        className: "font-bold text-teal-600 px-4 py-2 bg-gray-100 rounded-md mt-2",
                                        children: (e == null ? void 0 : e.categories) || "No categories found"
                                    })]
                                }, a) : i(Je, {});
                            default:
                                return u("div", {
                                    className: "py-3 flex justify-between",
                                    children: [i("dt", {
                                        className: "text-gray-900",
                                        children: dt[a]
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: "0"
                                    })]
                                }, a)
                        }
                        return u("div", {
                            className: "py-3 flex justify-between",
                            children: [i("dt", {
                                className: "text-gray-900",
                                children: dt[a]
                            }), i("dd", {
                                className: "font-bold",
                                style: {
                                    color: Qt[a]
                                },
                                children: e[Mi[a]]
                            })]
                        }, a)
                    })
                })]
            }), i("div", {
                className: "absolute text-xs right-1 top-0.5 rounded py-1 px-2 bg-teal-500",
                children: i("p", {
                    className: "text-white font-semibold",
                    children: Qi
                })
            })]
        })
    }
    const Zt = {
        listing_id: 1381314495,
        u: 698091840,
        original_creation: "29/12/2022 (2 months)",
        original_creation_days: 62,
        last_modified: "2 hours ago",
        last_modified_minutes: 148,
        views: "24,573",
        daily_views: 396,
        num_favorers: "5,226",
        tags: "goose sweatshirt, goose university, gag gift, womens sweatshirt, Gift Shirt, silly goose, funny sweatshirt, mens gift idea, gift for men, mens sweatshirt, mens crewneck, dad sweatshirt, dad gift",
        categories: "Clothing, Gender-Neutral Adult Clothing, Tops & Tees, T-shirts, Graphic Tees",
        sold: 18,
        hey: 21.27
    };

    function Pi() {
        const [e, t] = ye(), {
            card: r
        } = e, {
            style: n,
            textColor: a,
            backgroundColor: s
        } = r, o = {
            textColor: a,
            backgroundColor: s
        };
        return u("div", {
            className: "py-4",
            children: [i("h2", {
                className: "text-lg font-medium leading-6 text-gray-900",
                children: "Card Preview"
            }), u("div", {
                className: $({
                    "mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4": !0,
                    "mt-8": n === It
                }),
                children: [n === It ? i("div", {
                    className: $({
                        "text-xs": !0,
                        "relative w-full h-96 bg-gray-400": n === It
                    }),
                    dangerouslySetInnerHTML: {
                        __html: Wd(Zt.listing_id, Zt).innerHTML
                    }
                }) : i(In, {
                    listing: Zt
                }), i("div", {
                    className: $({
                        "text-xs": !0,
                        "relative w-full h-96 bg-gray-400": n === It
                    }),
                    dangerouslySetInnerHTML: {
                        __html: n === It ? $d(Zt.listing_id).innerHTML : Hd(Zt.listing_id, o).innerHTML
                    }
                })]
            })]
        })
    }
    class rd extends O.Component {
        componentDidMount() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            de.trackEvent(Lr, {
                globalState: t
            })
        }
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), u("div", {
                    className: "flex flex-col items-center justify-center h-full",
                    children: [i("h2", {
                        className: "text-xl font-bold",
                        children: "UI Customization"
                    }), u("p", {
                        onClick: () => {
                            confirm("Are you sure you want to reset to default?") == !0 && (r.resetDefaultHeyEtsy(), r.resetDefaultCard(), chrome.tabs.query({
                                active: !0,
                                currentWindow: !0
                            }, function (n) {
                                chrome.tabs.sendMessage(n[0].id, {
                                    type: "RELOAD_PAGE"
                                })
                            }))
                        },
                        className: "text-sm text-gray-900 py-2 hover:underline cursor-pointer hover:text-gray-700 flex items-center space-x-1",
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            className: "w-6 h-6",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z",
                                clipRule: "evenodd"
                            })
                        }), i("span", {
                            children: "Reset to default"
                        })]
                    }), u("div", {
                        className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                        children: [i(Dn, {}), i(Oi, {}), i(Pn, {}), i(Mn, {}), i(Di, {}), i(Pi, {})]
                    })]
                })]
            })
        }
    }
    var nd = ht(rd);

    function ad({
        children: e,
        ...t
    }) {
        const [r, n] = ye();
        return i(ba, {
            ...t,
            render: ({
                location: a
            }) => n.isAuthenticated() ? e : i(et, {
                to: {
                    pathname: "/licence-code",
                    state: {
                        from: a
                    }
                }
            })
        })
    }
    const id = [">", "<", "=", ">=", "<="];

    function sd(e) {
        const [t, r] = ye(), {
            highlight: n
        } = t, {
            settings: a
        } = n, {
            highlightSetting: s
        } = e, {
            key: o,
            operator: l,
            value: c
        } = s, {
            register: f,
            handleSubmit: m,
            watch: v,
            formState: {
                errors: x
            }
        } = Ut({
            defaultValues: {
                operatorRequired: l || ">",
                valueRequired: c || 0
            }
        }), y = async N => {
            const {
                operatorRequired: D,
                valueRequired: F
            } = N, U = {
                key: o,
                operator: D,
                value: Number(F || 0)
            }, C = a.findIndex(V => V.key === o), K = [...a.slice(0, C), U, ...a.slice(C + 1)];
            r.setHighlightSettings(K)
        };
        return d.exports.useEffect(() => {
            const N = v(m(y));
            return () => N.unsubscribe()
        }, [m, v]), u("div", {
            className: "flex mt-1 justify-between rounded-md shadow-sm",
            children: [i("div", {
                className: "flex-1 items-center py-2.5 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-800",
                children: u("div", {
                    className: " font-bold text-sm flex space-x-1 items-center",
                    children: [i("span", {
                        children: ru[o] || o
                    }), i("span", {
                        className: " text-red-500",
                        children: "*"
                    })]
                })
            }), i("div", {
                className: "flex items-center",
                children: i("select", {
                    id: "operator",
                    name: "operator",
                    autoComplete: "operator",
                    ...f("operatorRequired", {
                        required: !0
                    }),
                    className: "h-full w-20 border-gray-300 font-bold border-r-0 py-0 pl-6 pr-8 text-gray-500 focus:border-gray-300 focus:ring-0",
                    children: id.map(N => i("option", {
                        children: N
                    }, N))
                })
            }), u("div", {
                className: "relative flex-1",
                children: [i("input", {
                    type: "text",
                    name: o,
                    id: o,
                    ...f("valueRequired", {
                        required: !0,
                        min: 0
                    }),
                    className: $({
                        "block w-full pr-10 text-red-900 placeholder-red-300 border-red-300 rounded-md focus:border-red-500 focus:outline-none focus:ring-red-500": x.valueRequired,
                        "block w-full px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:border-teal-500 focus:outline-none focus:ring-teal-500": !x.valueRequired,
                        "rounded-none rounded-r-md ": !0
                    }),
                    placeholder: "0"
                }), x.valueRequired && i("div", {
                    className: "absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none",
                    children: i("svg", {
                        className: "w-5 h-5 text-red-500",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        "aria-hidden": "true",
                        children: i("path", {
                            fillRule: "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
                            clipRule: "evenodd"
                        })
                    })
                })]
            })]
        })
    }
    const od = [{
        name: "Red",
        bgColor: "bg-red-600",
        selectedColor: "ring-red-600",
        hex: "#dc2626"
    }, {
        name: "Yellow",
        bgColor: "bg-yellow-600",
        selectedColor: "ring-yellow-600",
        hex: "#ca8a04"
    }, {
        name: "Teal",
        bgColor: "bg-teal-600",
        selectedColor: "ring-teal-600",
        hex: "#0d9488"
    }, {
        name: "Blue",
        bgColor: "bg-blue-600",
        selectedColor: "ring-blue-600",
        hex: "#2563eb"
    }];

    function Ii(e) {
        const [t, r] = ye(), {
            highlight: n
        } = t, {
            settings: a,
            backgroundColor: s
        } = n, o = l => {
            r.setHighlightBackgroundColor(l), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (c) {
                chrome.tabs.sendMessage(c[0].id, {
                    type: "RELOAD_PAGE"
                })
            })
        };
        return u("div", {
            className: "pb-6 space-y-4",
            children: [u("div", {
                className: "flex justify-between items-center",
                children: [u("h2", {
                    className: "text-lg font-medium leading-6 text-gray-900 flex items-center space-x-1",
                    children: [i("span", {
                        children: "Listing Highlight"
                    }), i("div", {
                        className: "animate-bounce p-2 flex items-center justify-center",
                        children: i("svg", {
                            className: "w-5 h-5 text-teal-600",
                            fill: "none",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: i("path", {
                                d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                            })
                        })
                    })]
                }), i("a", {
                    href: "#/highlight-saved",
                    target: "_blank",
                    rel: "noreferrer",
                    className: "flex items-center justify-center rounded-full bg-gray-600 p-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
                    children: i(Ni, {
                        className: "w-6 h-6",
                        "aria-hidden": "true"
                    })
                })]
            }), u("div", {
                children: [i("h1", {
                    className: "text-base font-medium text-gray-900",
                    children: "Conditions"
                }), i("div", {
                    className: "mt-2 grid grid-cols-1 gap-y-2 gap-x-4",
                    children: a.map(l => i(sd, {
                        highlightSetting: l
                    }, l.key))
                })]
            }), u(ie, {
                value: s,
                onChange: o,
                children: [i(ie.Label, {
                    className: "text-base font-medium text-gray-900",
                    children: "Highlight Color"
                }), i("div", {
                    className: "mt-2 flex items-center space-x-3",
                    children: od.map(l => u(ie.Option, {
                        value: l.hex,
                        className: ({
                            active: c,
                            checked: f
                        }) => $({
                            [l.selectedColor]: !0,
                            "ring ring-offset-1": c && f,
                            "ring-2": !c && f,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none": !0
                        }),
                        children: [i(ie.Label, {
                            as: "span",
                            className: "sr-only",
                            children: l.name
                        }), i("span", {
                            "aria-hidden": "true",
                            className: $({
                                [l.bgColor]: !0,
                                "h-8 w-8 rounded-full border border-black border-opacity-10": !0
                            })
                        })]
                    }, l.name))
                })]
            })]
        })
    }

    function ld() {
        const [e, t] = ye(), {
            powerButton: r
        } = e, n = () => {
            t.togglePowerButton(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (a) {
                chrome.tabs.sendMessage(a[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Gd, {
                powerButton: r
            })
        };
        // return i("div", {
        //     children: i("ul", {
        //         role: "list",
        //         className: "divide-y divide-gray-200 border-y-2",
        //         children: u(ve.Group, {
        //             as: "li",
        //             className: "flex items-center justify-between py-2",
        //             children: [u("div", {
        //                 className: "flex flex-col",
        //                 children: [i(ve.Label, {
        //                     as: "p",
        //                     className: "text-sm font-medium text-gray-900",
        //                     passive: !0,
        //                     children: "Turn On"
        //                 }), i(ve.Description, {
        //                     className: "text-sm text-gray-500",
        //                     children: "Turn On/Off extension."
        //                 })]
        //             }), u(ve, {
        //                 checked: r,
        //                 onChange: n,
        //                 className: $({
        //                     "bg-red-600": r,
        //                     "bg-gray-200": !r,
        //                     "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2": !0
        //                 }),
        //                 children: [i("span", {
        //                     className: "sr-only",
        //                     children: "Use setting"
        //                 }), u("span", {
        //                     className: $({
        //                         "translate-x-5": r,
        //                         "translate-x-0": !r,
        //                         "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out": !0
        //                     }),
        //                     children: [i("span", {
        //                         className: $({
        //                             "opacity-0 ease-out duration-100": r,
        //                             "opacity-100 ease-in duration-200": !r,
        //                             "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity": !0
        //                         }),
        //                         "aria-hidden": "true",
        //                         children: i("svg", {
        //                             className: "h-3 w-3 text-gray-400",
        //                             fill: "none",
        //                             viewBox: "0 0 12 12",
        //                             children: i("path", {
        //                                 d: "M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2",
        //                                 stroke: "currentColor",
        //                                 strokeWidth: 2,
        //                                 strokeLinecap: "round",
        //                                 strokeLinejoin: "round"
        //                             })
        //                         })
        //                     }), i("span", {
        //                         className: $({
        //                             "opacity-100 ease-in duration-200": r,
        //                             "opacity-0 ease-out duration-100": !r,
        //                             "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity": !0
        //                         }),
        //                         "aria-hidden": "true",
        //                         children: i("svg", {
        //                             className: "h-3 w-3 text-red-600",
        //                             fill: "currentColor",
        //                             viewBox: "0 0 12 12",
        //                             children: i("path", {
        //                                 d: "M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
        //                             })
        //                         })
        //                     })]
        //                 })]
        //             })]
        //         })
        //     })
        // })
    }

    function Fi() {
        const [e, t] = ye(), {
            heyShop: r
        } = e, n = () => {
            t.toggleHeyShopActive(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (a) {
                chrome.tabs.sendMessage(a[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Kd, {
                heyShop: r
            })
        };
        return u("div", {
            className: "py-4",
            children: [u("div", {
                children: [i("h2", {
                    className: "text-lg font-medium leading-6 text-gray-900",
                    children: "Shop Settings"
                }), i("p", {
                    className: "mt-1 text-sm text-gray-500",
                    children: "Personalize the shop to your liking."
                })]
            }), i("ul", {
                role: "list",
                className: "mt-2 divide-y divide-gray-200",
                children: u(ve.Group, {
                    as: "li",
                    className: "flex items-center justify-between py-4",
                    children: [u("div", {
                        className: "flex flex-col",
                        children: [i(ve.Label, {
                            as: "p",
                            className: "text-sm font-medium text-gray-900",
                            passive: !0,
                            children: "Show Shop"
                        }), i(ve.Description, {
                            className: "text-sm text-gray-500",
                            children: "Show the advanced information of the shop."
                        })]
                    }), i(ve, {
                        checked: r.active,
                        onChange: n,
                        className: $(r.active ? "bg-teal-500" : "bg-gray-200", "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"),
                        children: i("span", {
                            "aria-hidden": "true",
                            className: $(r.active ? "translate-x-5" : "translate-x-0", "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out")
                        })
                    })]
                })
            })]
        })
    }

    function cd() {
        const [e, t] = ye(), {
            heyListing: r
        } = e, n = () => {
            t.toggleHeyListingActive(), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (a) {
                chrome.tabs.sendMessage(a[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Yd, {
                heyListing: r
            })
        };
        return u("div", {
            className: "py-4",
            children: [u("div", {
                children: [i("h2", {
                    className: "text-lg font-medium leading-6 text-gray-900",
                    children: "Listing Settings"
                }), i("p", {
                    className: "mt-1 text-sm text-gray-500",
                    children: "Personalize the listing to your liking."
                })]
            }), i("ul", {
                role: "list",
                className: "mt-2 divide-y divide-gray-200",
                children: u(ve.Group, {
                    as: "li",
                    className: "flex items-center justify-between py-4",
                    children: [u("div", {
                        className: "flex flex-col",
                        children: [i(ve.Label, {
                            as: "p",
                            className: "text-sm font-medium text-gray-900",
                            passive: !0,
                            children: "Show Listing"
                        }), i(ve.Description, {
                            className: "text-sm text-gray-500",
                            children: "Show the advanced information of the listing."
                        })]
                    }), i(ve, {
                        checked: r.active,
                        onChange: n,
                        className: $(r.active ? "bg-teal-500" : "bg-gray-200", "relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"),
                        children: i("span", {
                            "aria-hidden": "true",
                            className: $(r.active ? "translate-x-5" : "translate-x-0", "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out")
                        })
                    })]
                })
            })]
        })
    }
    class dd extends O.Component {
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props, n = () => {
                confirm("Are you sure you want to reset to default?") == !0 && (r.resetDefaultHeyEtsy(), r.resetHighlightDefault(), r.resetDefaultCard(), r.resetDefaultHeyShop(), chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (a) {
                    chrome.tabs.sendMessage(a[0].id, {
                        type: "RELOAD_PAGE"
                    })
                }))
            };
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }),
                // i(ld, {}), i("div", {
                //     className: "pb-2 border-b-2 border-gray-200",
                //     children: u("p", {
                //         onClick: n,
                //         className: "text-sm text-gray-900 py-2 hover:underline cursor-pointer hover:text-gray-700 flex items-center space-x-1",
                //         children: [i("svg", {
                //             xmlns: "http://www.w3.org/2000/svg",
                //             viewBox: "0 0 24 24",
                //             fill: "currentColor",
                //             className: "w-6 h-6",
                //             children: i("path", {
                //                 fillRule: "evenodd",
                //                 d: "M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z",
                //                 clipRule: "evenodd"
                //             })
                //         }), i("span", {
                //             children: "Reset to default"
                //         })]
                //     })
                // }), u("div", {
                //     className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                //     children: [i(Ii, {}), i(Pn, {}), i(Mn, {}), i(Fi, {}), i(cd, {}), i(Dn, {})]
                // })
            ]
            })
        }
    }
    var ud = ht(dd);

    function fd() {
        return ye(), i("div", {
            className: "flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 sm:px-6 lg:px-8",
            children: i("div", {
                className: "flex flex-col items-center justify-center w-full max-w-md px-4 py-12 space-y-4 bg-white border border-gray-300 rounded-lg shadow-md sm:px-6 sm:py-8 sm:space-y-6",
                children: u("div", {
                    className: "flex flex-col items-center justify-center space-y-2",
                    children: [i("h1", {
                        className: "text-2xl font-bold text-gray-900",
                        children: "Something went wrong"
                    }), i("p", {
                        className: "text-sm text-gray-500",
                        children: "Please contact us by chat support or email."
                    }), i("p", {
                        className: "text-sm text-gray-500",
                        children: "We will help you as soon as possible."
                    }), u("div", {
                        className: "flex flex-row items-center justify-center space-x-2 pt-2",
                        children: [u("a", {
                            target: "_blank",
                            href: Bn,
                            className: "text-xs text-gray-600 flex items-center space-x-1 hover:text-gray-900 hover:underline no-underline",
                            children: [u("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 20 20",
                                fill: "currentColor",
                                className: "w-4 h-4 text-blue-600",
                                children: [i("path", {
                                    d: "M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z"
                                }), i("path", {
                                    d: "M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z"
                                })]
                            }), i("span", {
                                children: "Chat Support"
                            })]
                        }), u("a", {
                            href: "mailto:support@ytuong.me",
                            className: "text-xs text-gray-600 flex items-center space-x-1 hover:text-gray-900 hover:underline no-underline",
                            children: [i("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 20 20",
                                fill: "currentColor",
                                className: "w-4 h-4 text-blue-600",
                                children: i("path", {
                                    fillRule: "evenodd",
                                    d: "M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h9.454a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73zm3.068-5.852A1.25 1.25 0 015.273 4.5h9.454a1.25 1.25 0 011.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 00-.86.49l-.606 1.02a1 1 0 01-.86.49H8.236a1 1 0 01-.894-.553l-.448-.894A1 1 0 006 11H2.53l.015-.062 1.523-5.52z",
                                    clipRule: "evenodd"
                                })
                            }), i("span", {
                                children: "support@ytuong.me"
                            })]
                        })]
                    })]
                })
            })
        })
    }
    var ji = {
        exports: {}
    };
    (function (e, t) {
        (function (r, n) {
            e.exports = n()
        })(Fd, function r() {
            var n = typeof self < "u" ? self : typeof window < "u" ? window : n !== void 0 ? n : {},
                a = !n.document && !!n.postMessage,
                s = n.IS_PAPA_WORKER || !1,
                o = {},
                l = 0,
                c = {
                    parse: function (p, h) {
                        var S = (h = h || {}).dynamicTyping || !1;
                        if (I(S) && (h.dynamicTypingFunction = S, S = {}), h.dynamicTyping = S, h.transform = !!I(h.transform) && h.transform, h.worker && c.WORKERS_SUPPORTED) {
                            var T = function () {
                                if (!c.WORKERS_SUPPORTED) return !1;
                                var L = (X = n.URL || n.webkitURL || null, J = r.toString(), c.BLOB_URL || (c.BLOB_URL = X.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ", "(", J, ")();"], {
                                    type: "text/javascript"
                                })))),
                                    z = new n.Worker(L),
                                    X, J;
                                return z.onmessage = C, z.id = l++, o[z.id] = z
                            }();
                            return T.userStep = h.step, T.userChunk = h.chunk, T.userComplete = h.complete, T.userError = h.error, h.step = I(h.step), h.chunk = I(h.chunk), h.complete = I(h.complete), h.error = I(h.error), delete h.worker, void T.postMessage({
                                input: p,
                                config: h,
                                workerId: T.id
                            })
                        }
                        var A = null;
                        return c.NODE_STREAM_INPUT, typeof p == "string" ? (p = function (L) {
                            return L.charCodeAt(0) === 65279 ? L.slice(1) : L
                        }(p), A = h.download ? new v(h) : new y(h)) : p.readable === !0 && I(p.read) && I(p.on) ? A = new N(h) : (n.File && p instanceof File || p instanceof Object) && (A = new x(h)), A.stream(p)
                    },
                    unparse: function (p, h) {
                        var S = !1,
                            T = !0,
                            A = ",",
                            L = `\r
`,
                            z = '"',
                            X = z + z,
                            J = !1,
                            j = null,
                            w = !1;
                        (function () {
                            if (typeof h == "object") {
                                if (typeof h.delimiter != "string" || c.BAD_DELIMITERS.filter(function (E) {
                                    return h.delimiter.indexOf(E) !== -1
                                }).length || (A = h.delimiter), (typeof h.quotes == "boolean" || typeof h.quotes == "function" || Array.isArray(h.quotes)) && (S = h.quotes), typeof h.skipEmptyLines != "boolean" && typeof h.skipEmptyLines != "string" || (J = h.skipEmptyLines), typeof h.newline == "string" && (L = h.newline), typeof h.quoteChar == "string" && (z = h.quoteChar), typeof h.header == "boolean" && (T = h.header), Array.isArray(h.columns)) {
                                    if (h.columns.length === 0) throw new Error("Option columns is empty");
                                    j = h.columns
                                }
                                h.escapeChar !== void 0 && (X = h.escapeChar + z), (typeof h.escapeFormulae == "boolean" || h.escapeFormulae instanceof RegExp) && (w = h.escapeFormulae instanceof RegExp ? h.escapeFormulae : /^[=+\-@\t\r].*$/)
                            }
                        })();
                        var k = new RegExp(F(z), "g");
                        if (typeof p == "string" && (p = JSON.parse(p)), Array.isArray(p)) {
                            if (!p.length || Array.isArray(p[0])) return R(null, p, J);
                            if (typeof p[0] == "object") return R(j || Object.keys(p[0]), p, J)
                        } else if (typeof p == "object") return typeof p.data == "string" && (p.data = JSON.parse(p.data)), Array.isArray(p.data) && (p.fields || (p.fields = p.meta && p.meta.fields || j), p.fields || (p.fields = Array.isArray(p.data[0]) ? p.fields : typeof p.data[0] == "object" ? Object.keys(p.data[0]) : []), Array.isArray(p.data[0]) || typeof p.data[0] == "object" || (p.data = [p.data])), R(p.fields || [], p.data || [], J);
                        throw new Error("Unable to serialize unrecognized input");

                        function R(E, Y, ae) {
                            var P = "";
                            typeof E == "string" && (E = JSON.parse(E)), typeof Y == "string" && (Y = JSON.parse(Y));
                            var oe = Array.isArray(E) && 0 < E.length,
                                se = !Array.isArray(Y[0]);
                            if (oe && T) {
                                for (var fe = 0; fe < E.length; fe++) 0 < fe && (P += A), P += H(E[fe], fe);
                                0 < Y.length && (P += L)
                            }
                            for (var ee = 0; ee < Y.length; ee++) {
                                var le = oe ? E.length : Y[ee].length,
                                    pe = !1,
                                    Ne = oe ? Object.keys(Y[ee]).length === 0 : Y[ee].length === 0;
                                if (ae && !oe && (pe = ae === "greedy" ? Y[ee].join("").trim() === "" : Y[ee].length === 1 && Y[ee][0].length === 0), ae === "greedy" && oe) {
                                    for (var he = [], Re = 0; Re < le; Re++) {
                                        var g = se ? E[Re] : Re;
                                        he.push(Y[ee][g])
                                    }
                                    pe = he.join("").trim() === ""
                                }
                                if (!pe) {
                                    for (var b = 0; b < le; b++) {
                                        0 < b && !Ne && (P += A);
                                        var _ = oe && se ? E[b] : b;
                                        P += H(Y[ee][_], b)
                                    }
                                    ee < Y.length - 1 && (!ae || 0 < le && !Ne) && (P += L)
                                }
                            }
                            return P
                        }

                        function H(E, Y) {
                            if (E == null) return "";
                            if (E.constructor === Date) return JSON.stringify(E).slice(1, 25);
                            var ae = !1;
                            w && typeof E == "string" && w.test(E) && (E = "'" + E, ae = !0);
                            var P = E.toString().replace(k, X);
                            return (ae = ae || S === !0 || typeof S == "function" && S(E, Y) || Array.isArray(S) && S[Y] || function (oe, se) {
                                for (var fe = 0; fe < se.length; fe++)
                                    if (-1 < oe.indexOf(se[fe])) return !0;
                                return !1
                            }(P, c.BAD_DELIMITERS) || -1 < P.indexOf(A) || P.charAt(0) === " " || P.charAt(P.length - 1) === " ") ? z + P + z : P
                        }
                    }
                };
            if (c.RECORD_SEP = String.fromCharCode(30), c.UNIT_SEP = String.fromCharCode(31), c.BYTE_ORDER_MARK = "\uFEFF", c.BAD_DELIMITERS = ["\r", `
`, '"', c.BYTE_ORDER_MARK], c.WORKERS_SUPPORTED = !a && !!n.Worker, c.NODE_STREAM_INPUT = 1, c.LocalChunkSize = 10485760, c.RemoteChunkSize = 5242880, c.DefaultDelimiter = ",", c.Parser = U, c.ParserHandle = D, c.NetworkStreamer = v, c.FileStreamer = x, c.StringStreamer = y, c.ReadableStreamStreamer = N, n.jQuery) {
                var f = n.jQuery;
                f.fn.parse = function (p) {
                    var h = p.config || {},
                        S = [];
                    return this.each(function (L) {
                        if (!(f(this).prop("tagName").toUpperCase() === "INPUT" && f(this).attr("type").toLowerCase() === "file" && n.FileReader) || !this.files || this.files.length === 0) return !0;
                        for (var z = 0; z < this.files.length; z++) S.push({
                            file: this.files[z],
                            inputElem: this,
                            instanceConfig: f.extend({}, h)
                        })
                    }), T(), this;

                    function T() {
                        if (S.length !== 0) {
                            var L, z, X, J, j = S[0];
                            if (I(p.before)) {
                                var w = p.before(j.file, j.inputElem);
                                if (typeof w == "object") {
                                    if (w.action === "abort") return L = "AbortError", z = j.file, X = j.inputElem, J = w.reason, void (I(p.error) && p.error({
                                        name: L
                                    }, z, X, J));
                                    if (w.action === "skip") return void A();
                                    typeof w.config == "object" && (j.instanceConfig = f.extend(j.instanceConfig, w.config))
                                } else if (w === "skip") return void A()
                            }
                            var k = j.instanceConfig.complete;
                            j.instanceConfig.complete = function (R) {
                                I(k) && k(R, j.file, j.inputElem), A()
                            }, c.parse(j.file, j.instanceConfig)
                        } else I(p.complete) && p.complete()
                    }

                    function A() {
                        S.splice(0, 1), T()
                    }
                }
            }

            function m(p) {
                this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
                    data: [],
                    errors: [],
                    meta: {}
                },
                    function (h) {
                        var S = q(h);
                        S.chunkSize = parseInt(S.chunkSize), h.step || h.chunk || (S.chunkSize = null), this._handle = new D(S), (this._handle.streamer = this)._config = S
                    }.call(this, p), this.parseChunk = function (h, S) {
                        if (this.isFirstChunk && I(this._config.beforeFirstChunk)) {
                            var T = this._config.beforeFirstChunk(h);
                            T !== void 0 && (h = T)
                        }
                        this.isFirstChunk = !1, this._halted = !1;
                        var A = this._partialLine + h;
                        this._partialLine = "";
                        var L = this._handle.parse(A, this._baseIndex, !this._finished);
                        if (!this._handle.paused() && !this._handle.aborted()) {
                            var z = L.meta.cursor;
                            this._finished || (this._partialLine = A.substring(z - this._baseIndex), this._baseIndex = z), L && L.data && (this._rowCount += L.data.length);
                            var X = this._finished || this._config.preview && this._rowCount >= this._config.preview;
                            if (s) n.postMessage({
                                results: L,
                                workerId: c.WORKER_ID,
                                finished: X
                            });
                            else if (I(this._config.chunk) && !S) {
                                if (this._config.chunk(L, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
                                L = void 0, this._completeResults = void 0
                            }
                            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(L.data), this._completeResults.errors = this._completeResults.errors.concat(L.errors), this._completeResults.meta = L.meta), this._completed || !X || !I(this._config.complete) || L && L.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), X || L && L.meta.paused || this._nextChunk(), L
                        }
                        this._halted = !0
                    }, this._sendError = function (h) {
                        I(this._config.error) ? this._config.error(h) : s && this._config.error && n.postMessage({
                            workerId: c.WORKER_ID,
                            error: h,
                            finished: !1
                        })
                    }
            }

            function v(p) {
                var h;
                (p = p || {}).chunkSize || (p.chunkSize = c.RemoteChunkSize), m.call(this, p), this._nextChunk = a ? function () {
                    this._readChunk(), this._chunkLoaded()
                } : function () {
                    this._readChunk()
                }, this.stream = function (S) {
                    this._input = S, this._nextChunk()
                }, this._readChunk = function () {
                    if (this._finished) this._chunkLoaded();
                    else {
                        if (h = new XMLHttpRequest, this._config.withCredentials && (h.withCredentials = this._config.withCredentials), a || (h.onload = W(this._chunkLoaded, this), h.onerror = W(this._chunkError, this)), h.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !a), this._config.downloadRequestHeaders) {
                            var S = this._config.downloadRequestHeaders;
                            for (var T in S) h.setRequestHeader(T, S[T])
                        }
                        if (this._config.chunkSize) {
                            var A = this._start + this._config.chunkSize - 1;
                            h.setRequestHeader("Range", "bytes=" + this._start + "-" + A)
                        }
                        try {
                            h.send(this._config.downloadRequestBody)
                        } catch (L) {
                            this._chunkError(L.message)
                        }
                        a && h.status === 0 && this._chunkError()
                    }
                }, this._chunkLoaded = function () {
                    h.readyState === 4 && (h.status < 200 || 400 <= h.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : h.responseText.length, this._finished = !this._config.chunkSize || this._start >= function (S) {
                        var T = S.getResponseHeader("Content-Range");
                        return T === null ? -1 : parseInt(T.substring(T.lastIndexOf("/") + 1))
                    }(h), this.parseChunk(h.responseText)))
                }, this._chunkError = function (S) {
                    var T = h.statusText || S;
                    this._sendError(new Error(T))
                }
            }

            function x(p) {
                var h, S;
                (p = p || {}).chunkSize || (p.chunkSize = c.LocalChunkSize), m.call(this, p);
                var T = typeof FileReader < "u";
                this.stream = function (A) {
                    this._input = A, S = A.slice || A.webkitSlice || A.mozSlice, T ? ((h = new FileReader).onload = W(this._chunkLoaded, this), h.onerror = W(this._chunkError, this)) : h = new FileReaderSync, this._nextChunk()
                }, this._nextChunk = function () {
                    this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk()
                }, this._readChunk = function () {
                    var A = this._input;
                    if (this._config.chunkSize) {
                        var L = Math.min(this._start + this._config.chunkSize, this._input.size);
                        A = S.call(A, this._start, L)
                    }
                    var z = h.readAsText(A, this._config.encoding);
                    T || this._chunkLoaded({
                        target: {
                            result: z
                        }
                    })
                }, this._chunkLoaded = function (A) {
                    this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(A.target.result)
                }, this._chunkError = function () {
                    this._sendError(h.error)
                }
            }

            function y(p) {
                var h;
                m.call(this, p = p || {}), this.stream = function (S) {
                    return h = S, this._nextChunk()
                }, this._nextChunk = function () {
                    if (!this._finished) {
                        var S, T = this._config.chunkSize;
                        return T ? (S = h.substring(0, T), h = h.substring(T)) : (S = h, h = ""), this._finished = !h, this.parseChunk(S)
                    }
                }
            }

            function N(p) {
                m.call(this, p = p || {});
                var h = [],
                    S = !0,
                    T = !1;
                this.pause = function () {
                    m.prototype.pause.apply(this, arguments), this._input.pause()
                }, this.resume = function () {
                    m.prototype.resume.apply(this, arguments), this._input.resume()
                }, this.stream = function (A) {
                    this._input = A, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError)
                }, this._checkIsFinished = function () {
                    T && h.length === 1 && (this._finished = !0)
                }, this._nextChunk = function () {
                    this._checkIsFinished(), h.length ? this.parseChunk(h.shift()) : S = !0
                }, this._streamData = W(function (A) {
                    try {
                        h.push(typeof A == "string" ? A : A.toString(this._config.encoding)), S && (S = !1, this._checkIsFinished(), this.parseChunk(h.shift()))
                    } catch (L) {
                        this._streamError(L)
                    }
                }, this), this._streamError = W(function (A) {
                    this._streamCleanUp(), this._sendError(A)
                }, this), this._streamEnd = W(function () {
                    this._streamCleanUp(), T = !0, this._streamData("")
                }, this), this._streamCleanUp = W(function () {
                    this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError)
                }, this)
            }

            function D(p) {
                var h, S, T, A = Math.pow(2, 53),
                    L = -A,
                    z = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,
                    X = /^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,
                    J = this,
                    j = 0,
                    w = 0,
                    k = !1,
                    R = !1,
                    H = [],
                    E = {
                        data: [],
                        errors: [],
                        meta: {}
                    };
                if (I(p.step)) {
                    var Y = p.step;
                    p.step = function (ee) {
                        if (E = ee, oe()) P();
                        else {
                            if (P(), E.data.length === 0) return;
                            j += ee.data.length, p.preview && j > p.preview ? S.abort() : (E.data = E.data[0], Y(E, J))
                        }
                    }
                }

                function ae(ee) {
                    return p.skipEmptyLines === "greedy" ? ee.join("").trim() === "" : ee.length === 1 && ee[0].length === 0
                }

                function P() {
                    return E && T && (fe("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + c.DefaultDelimiter + "'"), T = !1), p.skipEmptyLines && (E.data = E.data.filter(function (ee) {
                        return !ae(ee)
                    })), oe() && function () {
                        if (!E) return;

                        function ee(pe, Ne) {
                            I(p.transformHeader) && (pe = p.transformHeader(pe, Ne)), H.push(pe)
                        }
                        if (Array.isArray(E.data[0])) {
                            for (var le = 0; oe() && le < E.data.length; le++) E.data[le].forEach(ee);
                            E.data.splice(0, 1)
                        } else E.data.forEach(ee)
                    }(),
                        function () {
                            if (!E || !p.header && !p.dynamicTyping && !p.transform) return E;

                            function ee(pe, Ne) {
                                var he, Re = p.header ? {} : [];
                                for (he = 0; he < pe.length; he++) {
                                    var g = he,
                                        b = pe[he];
                                    p.header && (g = he >= H.length ? "__parsed_extra" : H[he]), p.transform && (b = p.transform(b, g)), b = se(g, b), g === "__parsed_extra" ? (Re[g] = Re[g] || [], Re[g].push(b)) : Re[g] = b
                                }
                                return p.header && (he > H.length ? fe("FieldMismatch", "TooManyFields", "Too many fields: expected " + H.length + " fields but parsed " + he, w + Ne) : he < H.length && fe("FieldMismatch", "TooFewFields", "Too few fields: expected " + H.length + " fields but parsed " + he, w + Ne)), Re
                            }
                            var le = 1;
                            return !E.data.length || Array.isArray(E.data[0]) ? (E.data = E.data.map(ee), le = E.data.length) : E.data = ee(E.data, 0), p.header && E.meta && (E.meta.fields = H), w += le, E
                        }()
                }

                function oe() {
                    return p.header && H.length === 0
                }

                function se(ee, le) {
                    return pe = ee, p.dynamicTypingFunction && p.dynamicTyping[pe] === void 0 && (p.dynamicTyping[pe] = p.dynamicTypingFunction(pe)), (p.dynamicTyping[pe] || p.dynamicTyping) === !0 ? le === "true" || le === "TRUE" || le !== "false" && le !== "FALSE" && (function (Ne) {
                        if (z.test(Ne)) {
                            var he = parseFloat(Ne);
                            if (L < he && he < A) return !0
                        }
                        return !1
                    }(le) ? parseFloat(le) : X.test(le) ? new Date(le) : le === "" ? null : le) : le;
                    var pe
                }

                function fe(ee, le, pe, Ne) {
                    var he = {
                        type: ee,
                        code: le,
                        message: pe
                    };
                    Ne !== void 0 && (he.row = Ne), E.errors.push(he)
                }
                this.parse = function (ee, le, pe) {
                    var Ne = p.quoteChar || '"';
                    if (p.newline || (p.newline = function (g, b) {
                        g = g.substring(0, 1048576);
                        var _ = new RegExp(F(b) + "([^]*?)" + F(b), "gm"),
                            B = (g = g.replace(_, "")).split("\r"),
                            G = g.split(`
`),
                            M = 1 < G.length && G[0].length < B[0].length;
                        if (B.length === 1 || M) return `
`;
                        for (var Q = 0, te = 0; te < B.length; te++) B[te][0] === `
` && Q++;
                        return Q >= B.length / 2 ? `\r
` : "\r"
                    }(ee, Ne)), T = !1, p.delimiter) I(p.delimiter) && (p.delimiter = p.delimiter(ee), E.meta.delimiter = p.delimiter);
                    else {
                        var he = function (g, b, _, B, G) {
                            var M, Q, te, re;
                            G = G || [",", "	", "|", ";", c.RECORD_SEP, c.UNIT_SEP];
                            for (var it = 0; it < G.length; it++) {
                                var ce = G[it],
                                    Qe = 0,
                                    qe = 0,
                                    Ze = 0;
                                te = void 0;
                                for (var Xe = new U({
                                    comments: B,
                                    delimiter: ce,
                                    newline: b,
                                    preview: 10
                                }).parse(g), We = 0; We < Xe.data.length; We++)
                                    if (_ && ae(Xe.data[We])) Ze++;
                                    else {
                                        var ft = Xe.data[We].length;
                                        qe += ft, te !== void 0 ? 0 < ft && (Qe += Math.abs(ft - te), te = ft) : te = ft
                                    } 0 < Xe.data.length && (qe /= Xe.data.length - Ze), (Q === void 0 || Qe <= Q) && (re === void 0 || re < qe) && 1.99 < qe && (Q = Qe, M = ce, re = qe)
                            }
                            return {
                                successful: !!(p.delimiter = M),
                                bestDelimiter: M
                            }
                        }(ee, p.newline, p.skipEmptyLines, p.comments, p.delimitersToGuess);
                        he.successful ? p.delimiter = he.bestDelimiter : (T = !0, p.delimiter = c.DefaultDelimiter), E.meta.delimiter = p.delimiter
                    }
                    var Re = q(p);
                    return p.preview && p.header && Re.preview++, h = ee, S = new U(Re), E = S.parse(h, le, pe), P(), k ? {
                        meta: {
                            paused: !0
                        }
                    } : E || {
                        meta: {
                            paused: !1
                        }
                    }
                }, this.paused = function () {
                    return k
                }, this.pause = function () {
                    k = !0, S.abort(), h = I(p.chunk) ? "" : h.substring(S.getCharIndex())
                }, this.resume = function () {
                    J.streamer._halted ? (k = !1, J.streamer.parseChunk(h, !0)) : setTimeout(J.resume, 3)
                }, this.aborted = function () {
                    return R
                }, this.abort = function () {
                    R = !0, S.abort(), E.meta.aborted = !0, I(p.complete) && p.complete(E), h = ""
                }
            }

            function F(p) {
                return p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            }

            function U(p) {
                var h, S = (p = p || {}).delimiter,
                    T = p.newline,
                    A = p.comments,
                    L = p.step,
                    z = p.preview,
                    X = p.fastMode,
                    J = h = p.quoteChar === void 0 || p.quoteChar === null ? '"' : p.quoteChar;
                if (p.escapeChar !== void 0 && (J = p.escapeChar), (typeof S != "string" || -1 < c.BAD_DELIMITERS.indexOf(S)) && (S = ","), A === S) throw new Error("Comment character same as delimiter");
                A === !0 ? A = "#" : (typeof A != "string" || -1 < c.BAD_DELIMITERS.indexOf(A)) && (A = !1), T !== `
` && T !== "\r" && T !== `\r
` && (T = `
`);
                var j = 0,
                    w = !1;
                this.parse = function (k, R, H) {
                    if (typeof k != "string") throw new Error("Input must be a string");
                    var E = k.length,
                        Y = S.length,
                        ae = T.length,
                        P = A.length,
                        oe = I(L),
                        se = [],
                        fe = [],
                        ee = [],
                        le = j = 0;
                    if (!k) return ze();
                    if (p.header) {
                        var pe = k.split(T)[0].split(S),
                            Ne = [],
                            he = {},
                            Re = !1;
                        for (var g in pe) {
                            var b = pe[g];
                            I(p.transformHeader) && (b = p.transformHeader(b, g));
                            var _ = b,
                                B = he[b] || 0;
                            0 < B && (Re = !0, _ = b + "_" + B), he[b] = B + 1, Ne.push(_)
                        }
                        if (Re) {
                            var G = k.split(T);
                            G[0] = Ne.join(S), k = G.join(T)
                        }
                    }
                    if (X || X !== !1 && k.indexOf(h) === -1) {
                        for (var M = k.split(T), Q = 0; Q < M.length; Q++) {
                            if (ee = M[Q], j += ee.length, Q !== M.length - 1) j += T.length;
                            else if (H) return ze();
                            if (!A || ee.substring(0, P) !== A) {
                                if (oe) {
                                    if (se = [], Ze(ee.split(S)), Tr(), w) return ze()
                                } else Ze(ee.split(S));
                                if (z && z <= Q) return se = se.slice(0, z), ze(!0)
                            }
                        }
                        return ze()
                    }
                    for (var te = k.indexOf(S, j), re = k.indexOf(T, j), it = new RegExp(F(J) + F(h), "g"), ce = k.indexOf(h, j); ;)
                        if (k[j] !== h)
                            if (A && ee.length === 0 && k.substring(j, j + P) === A) {
                                if (re === -1) return ze();
                                j = re + ae, re = k.indexOf(T, j), te = k.indexOf(S, j)
                            } else if (te !== -1 && (te < re || re === -1)) ee.push(k.substring(j, te)), j = te + Y, te = k.indexOf(S, j);
                            else {
                                if (re === -1) break;
                                if (ee.push(k.substring(j, re)), ft(re + ae), oe && (Tr(), w)) return ze();
                                if (z && se.length >= z) return ze(!0)
                            } else
                            for (ce = j, j++; ;) {
                                if ((ce = k.indexOf(h, ce + 1)) === -1) return H || fe.push({
                                    type: "Quotes",
                                    code: "MissingQuotes",
                                    message: "Quoted field unterminated",
                                    row: se.length,
                                    index: j
                                }), We();
                                if (ce === E - 1) return We(k.substring(j, ce).replace(it, h));
                                if (h !== J || k[ce + 1] !== J) {
                                    if (h === J || ce === 0 || k[ce - 1] !== J) {
                                        te !== -1 && te < ce + 1 && (te = k.indexOf(S, ce + 1)), re !== -1 && re < ce + 1 && (re = k.indexOf(T, ce + 1));
                                        var Qe = Xe(re === -1 ? te : Math.min(te, re));
                                        if (k.substr(ce + 1 + Qe, Y) === S) {
                                            ee.push(k.substring(j, ce).replace(it, h)), k[j = ce + 1 + Qe + Y] !== h && (ce = k.indexOf(h, j)), te = k.indexOf(S, j), re = k.indexOf(T, j);
                                            break
                                        }
                                        var qe = Xe(re);
                                        if (k.substring(ce + 1 + qe, ce + 1 + qe + ae) === T) {
                                            if (ee.push(k.substring(j, ce).replace(it, h)), ft(ce + 1 + qe + ae), te = k.indexOf(S, j), ce = k.indexOf(h, j), oe && (Tr(), w)) return ze();
                                            if (z && se.length >= z) return ze(!0);
                                            break
                                        }
                                        fe.push({
                                            type: "Quotes",
                                            code: "InvalidQuotes",
                                            message: "Trailing quote on quoted field is malformed",
                                            row: se.length,
                                            index: j
                                        }), ce++
                                    }
                                } else ce++
                            }
                    return We();

                    function Ze(Ve) {
                        se.push(Ve), le = j
                    }

                    function Xe(Ve) {
                        var $i = 0;
                        if (Ve !== -1) {
                            var Fn = k.substring(ce + 1, Ve);
                            Fn && Fn.trim() === "" && ($i = Fn.length)
                        }
                        return $i
                    }

                    function We(Ve) {
                        return H || (Ve === void 0 && (Ve = k.substring(j)), ee.push(Ve), j = E, Ze(ee), oe && Tr()), ze()
                    }

                    function ft(Ve) {
                        j = Ve, Ze(ee), ee = [], re = k.indexOf(T, j)
                    }

                    function ze(Ve) {
                        return {
                            data: se,
                            errors: fe,
                            meta: {
                                delimiter: S,
                                linebreak: T,
                                aborted: w,
                                truncated: !!Ve,
                                cursor: le + (R || 0)
                            }
                        }
                    }

                    function Tr() {
                        L(ze()), se = [], fe = []
                    }
                }, this.abort = function () {
                    w = !0
                }, this.getCharIndex = function () {
                    return j
                }
            }

            function C(p) {
                var h = p.data,
                    S = o[h.workerId],
                    T = !1;
                if (h.error) S.userError(h.error, h.file);
                else if (h.results && h.results.data) {
                    var A = {
                        abort: function () {
                            T = !0, K(h.workerId, {
                                data: [],
                                errors: [],
                                meta: {
                                    aborted: !0
                                }
                            })
                        },
                        pause: V,
                        resume: V
                    };
                    if (I(S.userStep)) {
                        for (var L = 0; L < h.results.data.length && (S.userStep({
                            data: h.results.data[L],
                            errors: h.results.errors,
                            meta: h.results.meta
                        }, A), !T); L++);
                        delete h.results
                    } else I(S.userChunk) && (S.userChunk(h.results, A, h.file), delete h.results)
                }
                h.finished && !T && K(h.workerId, h.results)
            }

            function K(p, h) {
                var S = o[p];
                I(S.userComplete) && S.userComplete(h), S.terminate(), delete o[p]
            }

            function V() {
                throw new Error("Not implemented.")
            }

            function q(p) {
                if (typeof p != "object" || p === null) return p;
                var h = Array.isArray(p) ? [] : {};
                for (var S in p) h[S] = q(p[S]);
                return h
            }

            function W(p, h) {
                return function () {
                    p.apply(h, arguments)
                }
            }

            function I(p) {
                return typeof p == "function"
            }
            return s && (n.onmessage = function (p) {
                var h = p.data;
                if (c.WORKER_ID === void 0 && h && (c.WORKER_ID = h.workerId), typeof h.input == "string") n.postMessage({
                    workerId: c.WORKER_ID,
                    results: c.parse(h.input, h.config),
                    finished: !0
                });
                else if (n.File && h.input instanceof File || h.input instanceof Object) {
                    var S = c.parse(h.input, h.config);
                    S && n.postMessage({
                        workerId: c.WORKER_ID,
                        results: S,
                        finished: !0
                    })
                }
            }), (v.prototype = Object.create(m.prototype)).constructor = v, (x.prototype = Object.create(m.prototype)).constructor = x, (y.prototype = Object.create(y.prototype)).constructor = y, (N.prototype = Object.create(m.prototype)).constructor = N, c
        })
    })(ji);
    var zi = ji.exports;
    const Mt = ({
        type: e,
        message: t
    }) => i("span", {
        className: $({
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800": e === "success",
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800": e === "error",
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800": e === "warning",
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800": e === "info",
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800": e === "default",
            uppercase: !0
        }),
        children: t
    }),
        ut = {
            VIEWS: "Views",
            DAILY_VIEWS: "Daily Views",
            FAVORITES: "Favorites",
            FAVORITES_RATE: "Favorites Rate",
            CREATED_AT: "Created",
            UPDATED_AT: "Updated",
            SIMILAR: "Similar",
            SHOP: "Shop",
            TAGS: "Tags",
            CATEGORIES: "Categories"
        },
        Vi = {
            VIEWS: "views",
            DAILY_VIEWS: "daily_views",
            FAVORITES: "num_favorers",
            FAVORITES_RATE: "hey",
            CREATED_AT: "original_creation",
            UPDATED_AT: "last_modified"
        };

    function hd({
        listing: e
    }) {
        const [t, r] = ye(), {
            highlight: n
        } = t, {
            backgroundColor: a,
            textColor: s
        } = n;
        return u("div", {
            className: "pt-4 relative",
            children: [u("div", {
                className: `font-bold text-sm rounded-md p-4 w-full mx-auto ring-2 ring-offset-2 ring-[${a}] bg-[${a}]`,
                style: {
                    color: s
                },
                children: [u("div", {
                    className: $({
                        "inline-flex items-center relative py-3": !0,
                        hidden: (e == null ? void 0 : e.sold) === 0
                    }),
                    children: [i("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "currentColor",
                        className: "w-6 h-6",
                        style: {
                            color: s
                        },
                        children: i("path", {
                            fillRule: "evenodd",
                            d: "M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z",
                            clipRule: "evenodd"
                        })
                    }), u("p", {
                        className: "ml-2",
                        style: {
                            color: s
                        },
                        children: ["Just Made ", e == null ? void 0 : e.sold, " Sold"]
                    }), u("span", {
                        className: "flex absolute h-3 w-3 top-0 left-0 -mt-1 ml-6",
                        children: [i("span", {
                            className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                        }), i("span", {
                            className: "relative inline-flex rounded-full h-3 w-3 bg-white"
                        })]
                    })]
                }), i("dl", {
                    className: "divide-y-2 divide-gray-200 mb-0",
                    children: Object.keys(ut).map(o => {
                        var l, c, f;
                        if (!e[Vi[o]]) switch (o) {
                            case "SIMILAR":
                                return u("div", {
                                    className: "py-3 flex justify-between",
                                    children: [i("dt", {
                                        style: {
                                            color: s
                                        },
                                        children: ut[o]
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: i("a", {
                                            href: "https://www.etsy.com/listing/${listingId}/similar",
                                            target: "_blank",
                                            children: "View products"
                                        })
                                    })]
                                }, o);
                            case "SHOP":
                                return u("div", {
                                    className: "py-3 flex justify-between",
                                    children: [i("dt", {
                                        style: {
                                            color: s
                                        },
                                        children: ut[o]
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: i("a", {
                                            href: Gi + "/r/s/" + e.u,
                                            target: "_blank",
                                            children: "\u{1F449} Go to shop"
                                        })
                                    })]
                                }, o);
                            case "TAGS":
                                const m = ((l = e == null ? void 0 : e.tags) == null ? void 0 : l.split(",").filter(Boolean)) || [];
                                if (m.length === 0) return u("div", {
                                    className: "py-3 flex flex-col justify-between",
                                    children: [i("dt", {
                                        style: {
                                            color: s
                                        },
                                        children: ut[o]
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: "No tags found"
                                    })]
                                }, o);
                                const v = (f = (c = e == null ? void 0 : e.tags) == null ? void 0 : c.replace(/'/g, "\\'")) == null ? void 0 : f.replace(/"/g, '\\"');
                                return u("div", {
                                    className: "py-3 flex flex-col justify-between",
                                    children: [u("dt", {
                                        style: {
                                            color: s
                                        },
                                        children: [i("span", {
                                            children: ut[o]
                                        }), i("button", {
                                            type: "button",
                                            onClick: x => {
                                                let y = x.target;
                                                navigator.clipboard.writeText(v).then(N => {
                                                    y.innerText = "Copied!", setTimeout(() => {
                                                        y.innerText = "Copy"
                                                    }, 1e3)
                                                }).catch(N => {
                                                    y.innerText = "Error!", setTimeout(() => {
                                                        y.innerText = "Copy"
                                                    }, 1e3)
                                                })
                                            },
                                            className: "ml-2 text-sm inline-flex items-center px-2 py-1 border border-transparent shadow-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
                                            children: "Copy"
                                        })]
                                    }), i("dd", {
                                        className: "font-bold mt-2",
                                        children: m.map(x => u("a", {
                                            href: `https://www.etsy.com/search?q=${x == null ? void 0 : x.trim()}&ref=search_bar`,
                                            target: "_blank",
                                            className: "inline-flex m-1 items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 bg-white ring-1 ring-inset ring-gray-200",
                                            children: [i("svg", {
                                                className: "h-1.5 w-1.5 fill-red-500",
                                                viewBox: "0 0 6 6",
                                                "aria-hidden": "true",
                                                children: i("circle", {
                                                    cx: "3",
                                                    cy: "3",
                                                    r: "3"
                                                })
                                            }), x == null ? void 0 : x.trim()]
                                        }, x))
                                    })]
                                }, o);
                            case "CATEGORIES":
                                return u("div", {
                                    className: "py-3 flex flex-col justify-between",
                                    children: [u("dt", {
                                        style: {
                                            color: s
                                        },
                                        children: [i("span", {
                                            children: ut[o]
                                        }), i("button", {
                                            type: "button",
                                            onClick: x => {
                                                let y = x.target;
                                                navigator.clipboard.writeText(e == null ? void 0 : e.categories).then(N => {
                                                    y.innerText = "Copied!", setTimeout(() => {
                                                        y.innerText = "Copy"
                                                    }, 1e3)
                                                }).catch(N => {
                                                    y.innerText = "Error!", setTimeout(() => {
                                                        y.innerText = "Copy"
                                                    }, 1e3)
                                                })
                                            },
                                            className: "ml-2 text-sm inline-flex items-center px-2 py-1 border border-transparent shadow-sm leading-4 font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500",
                                            children: "Copy"
                                        })]
                                    }), i("dd", {
                                        className: "font-bold text-teal-600 px-4 py-2 bg-gray-100 rounded-md mt-2",
                                        children: (e == null ? void 0 : e.categories) || "No categories found"
                                    })]
                                }, o);
                            default:
                                return u("div", {
                                    className: "py-3 flex justify-between",
                                    children: [i("dt", {
                                        style: {
                                            color: s
                                        },
                                        children: ut[o]
                                    }), i("dd", {
                                        className: "font-bold",
                                        children: "0"
                                    })]
                                }, o)
                        }
                        return u("div", {
                            className: "py-3 flex justify-between",
                            children: [i("dt", {
                                style: {
                                    color: s
                                },
                                children: ut[o]
                            }), i("dd", {
                                className: "font-bold",
                                style: {
                                    color: s
                                },
                                children: e[Vi[o]]
                            })]
                        }, o)
                    })
                })]
            }), i("div", {
                className: "absolute text-xs right-1 top-0.5 rounded py-1 px-2 bg-teal-500",
                children: i("p", {
                    className: "text-white font-semibold",
                    children: Qi
                })
            })]
        })
    }
    const md = [{
        name: "All",
        href: "#/saved",
        icon: Qc
    }, {
        name: "Highlight",
        href: "#/highlight-saved",
        icon: Bc
    }];

    function Bi({
        currentTab: e = "All"
    }) {
        return i("div", {
            className: "block",
            children: i("div", {
                className: "border-b border-gray-200",
                children: i("nav", {
                    className: "-mb-px flex space-x-8",
                    "aria-label": "Tabs",
                    children: md.map(t => u("a", {
                        href: t.href,
                        className: $({
                            "border-teal-500 text-teal-600": e === t.name,
                            "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700": e !== t.name,
                            "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium": !0
                        }),
                        children: [i(t.icon, {
                            className: $({
                                "text-teal-500": e === t.name,
                                "text-gray-400 group-hover:text-gray-500": e !== t.name,
                                "-ml-0.5 mr-2 h-5 w-5": !0
                            }),
                            "aria-hidden": "true"
                        }), i("span", {
                            children: t.name
                        })]
                    }, t.name))
                })
            })
        })
    }
    const Ui = () => i("div", {
        className: "pointer-events-none fixed inset-x-0 bottom-0 sm:px-6 sm:pb-5 lg:px-8 z-50 max-w-7xl mx-auto",
        children: i("div", {
            className: "pointer-events-auto flex items-center justify-between gap-x-6 bg-yellow-50 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5",
            children: u("div", {
                className: "flex items-center gap-x-3",
                children: [i(Hc, {
                    className: "h-5 w-5 text-yellow-400",
                    "aria-hidden": "true"
                }), i("p", {
                    className: "text-sm leading-6 text-yellow-700",
                    children: "This entire listing is what you've come across, temporarily stored locally on your computer, which will help you do more in-depth market research. Please clean up regularly to keep the data fresh."
                })]
            })
        })
    }),
        qi = [{
            id: "views",
            name: "Best Views"
        }, {
            id: "daily_views",
            name: "Best Daily Views"
        }, {
            id: "num_favorers",
            name: "Best Favorers"
        }, {
            id: "sold",
            name: "Best Sold"
        }, {
            id: "total_sold",
            name: "Best Total Sold"
        }, {
            id: "shop_sold",
            name: "Best Shop Sold"
        }, {
            id: "hey",
            name: "Best Favorers Rate"
        }],
        pd = () => {
            const [e, t] = ye(), {
                highlight: r
            } = e, {
                settings: n
            } = r, {
                showAlert: a,
                hideAlert: s
            } = t, [o, l] = d.exports.useState(20), [c, f] = d.exports.useState(0), [m, v] = d.exports.useState([]), [x, y] = d.exports.useState(0), [N, D] = d.exports.useState(!1), [F, U] = d.exports.useState(!1), [C, K] = d.exports.useState(""), [V, q] = d.exports.useState("views"), [W, I] = d.exports.useState("desc"), {
                register: p,
                handleSubmit: h,
                watch: S,
                formState: {
                    errors: T
                }
            } = Ut(), A = async w => {
                K(w.search)
            };
            d.exports.useEffect(() => {
                (async () => {
                    D(!0);
                    const w = await nu({
                        propName: "title",
                        searchTerm: C,
                        limit: o,
                        offset: c,
                        sortBy: V,
                        sortOrder: W
                    });
                    v(w);
                    const k = await au("title", C);
                    y(k), D(!1)
                })()
            }, [o, c, C, V, W]);
            const L = () => {
                c + o >= x || f(c + o)
            },
                z = () => {
                    c <= 0 || f(c - o)
                },
                X = async () => {
                    s(), U(!0)
                }, J = async () => {
                    s(), U(!1), a("Deleting all saved listings...", "info"), await Zi(), a("Deleted all saved listings", "success"), window.location.reload()
                }, j = async () => {
                    s();
                    var w = (await iu()).map(P => ({
                        listing_id: P.listing_id,
                        title: P.title,
                        views: parseInt(P.views.replace(/,/g, "")),
                        daily_views: P.daily_views,
                        views_24h: P.views_24h,
                        num_favorers: parseInt(P.num_favorers.replace(/,/g, "")),
                        tags: P.tags,
                        categories: P.categories,
                        sold: P.sold,
                        total_sold: (P == null ? void 0 : P.total_sold) || 0,
                        estimated_revenue: (P == null ? void 0 : P.estimated_revenue) || "",
                        shop_sold: P.shop_sold,
                        favorers_rate: P.hey,
                        listingUrl: P.listingUrl,
                        imageUrl: P.imageUrl,
                        bestSeller: P.bestSeller,
                        popularNow: P.popularNow,
                        etsyPick: P.etsyPick,
                        created_at: P.created_at,
                        updated_at: P.updated_at,
                        original_creation: P.original_creation,
                        last_modified: P.last_modified
                    }));
                    const k = zi.unparse(w);
                    var R = new Blob([k], {
                        type: "text/csv;charset=utf-8;"
                    }),
                        H = URL.createObjectURL(R),
                        E = document.createElement("a");
                    E.setAttribute("href", H);
                    var Y = new Date,
                        ae = Y.getFullYear() + "-" + (Y.getMonth() + 1) + "-" + Y.getDate();
                    E.setAttribute("download", "ytuong_saved_" + ae + ".csv"), E.style.visibility = "hidden", document.body.appendChild(E), E.click(), document.body.removeChild(E), a(`Exported ${w.length} listings to CSV`, "success")
                };
            return u("div", {
                children: [u("form", {
                    className: "mt-4 flex gap-x-4",
                    onSubmit: h(A),
                    children: [u("div", {
                        className: "min-w-0 flex-1",
                        children: [i("label", {
                            htmlFor: "search",
                            className: "sr-only",
                            children: "Search"
                        }), u("div", {
                            className: "relative rounded-md shadow-sm",
                            children: [i("div", {
                                className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
                                children: i(Si, {
                                    className: "h-5 w-5 text-gray-400",
                                    "aria-hidden": "true"
                                })
                            }), i("input", {
                                type: "search",
                                name: "search",
                                id: "search",
                                className: "block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6",
                                placeholder: "Search",
                                ...p("search")
                            })]
                        })]
                    }), u("button", {
                        type: "submit",
                        className: "inline-flex justify-center rounded-md bg-white px-3 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
                        children: [i(Ti, {
                            className: "h-5 w-5",
                            "aria-hidden": "true"
                        }), i("span", {
                            className: "sr-only",
                            children: "Search"
                        })]
                    })]
                }), u("div", {
                    className: "mx-auto flex justify-between items-center space-x-6 py-4",
                    children: [u(Ee, {
                        as: "div",
                        className: "relative inline-block",
                        children: [i("div", {
                            className: "flex",
                            children: u(Ee.Button, {
                                className: "group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900",
                                children: ["Sort: ", qi.find(w => w.id === V).name, i(Ai, {
                                    className: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                                    "aria-hidden": "true"
                                })]
                            })
                        }), i(at, {
                            as: d.exports.Fragment,
                            enter: "transition ease-out duration-100",
                            enterFrom: "transform opacity-0 scale-95",
                            enterTo: "transform opacity-100 scale-100",
                            leave: "transition ease-in duration-75",
                            leaveFrom: "transform opacity-100 scale-100",
                            leaveTo: "transform opacity-0 scale-95",
                            children: i(Ee.Items, {
                                className: "absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none",
                                children: i("div", {
                                    className: "py-1",
                                    children: qi.map(w => i(Ee.Item, {
                                        children: ({
                                            active: k
                                        }) => i("div", {
                                            onClick: () => {
                                                switch (q(w.id), w.id) {
                                                    case "last_modified_days":
                                                        I("asc");
                                                        break;
                                                    case "original_creation_days":
                                                        I("asc");
                                                        break;
                                                    default:
                                                        I("desc");
                                                        break
                                                }
                                                f(0)
                                            },
                                            className: $({
                                                "font-medium text-gray-900": w.id === V,
                                                "text-gray-500": !w.id === V,
                                                "bg-gray-100": k,
                                                "block px-4 py-2 text-sm cursor-pointer": !0
                                            }),
                                            children: w.name
                                        })
                                    }, w.id))
                                })
                            })
                        })]
                    }), u("div", {
                        className: "space-x-3 flex",
                        children: [u("button", {
                            type: "button",
                            onClick: () => {
                                X()
                            },
                            className: "relative -ml-px hidden items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-400 hover:z-10 hover:bg-red-500 focus:z-10 sm:inline-flex",
                            children: [i(Li, {
                                className: "-ml-0.5 h-5 w-5 text-white",
                                "aria-hidden": "true"
                            }), "Clean up"]
                        }), u("button", {
                            type: "button",
                            onClick: () => {
                                j()
                            },
                            className: "relative -ml-px hidden items-center gap-x-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-teal-400 hover:z-10 hover:bg-teal-500 focus:z-10 sm:inline-flex",
                            children: [i(Ri, {
                                className: "-ml-0.5 h-5 w-5 text-white",
                                "aria-hidden": "true"
                            }), "Download"]
                        })]
                    })]
                }), u("nav", {
                    className: "flex items-center justify-between border-t border-gray-200 bg-white py-3",
                    "aria-label": "Pagination",
                    children: [i("div", {
                        className: "hidden sm:block",
                        children: u("p", {
                            className: "text-sm text-gray-700",
                            children: ["Showing ", i("span", {
                                className: "font-medium",
                                children: c + 1
                            }), " to", " ", i("span", {
                                className: "font-medium",
                                children: o + c
                            }), " of", " ", i("span", {
                                className: "font-medium",
                                children: x
                            }), " results"]
                        })
                    }), u("div", {
                        className: "flex flex-1 justify-between sm:justify-end",
                        children: [i("button", {
                            type: "button",
                            onClick: () => {
                                z()
                            },
                            disabled: c <= 0,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c <= 0,
                                "bg-white": c > 0,
                                "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Previous"
                        }), i("button", {
                            type: "button",
                            onClick: () => {
                                L()
                            },
                            disabled: c + o >= x,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c + o >= x,
                                "bg-white": c + o < x,
                                "relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Next"
                        })]
                    })]
                }), N ? i("div", {
                    className: "flex justify-center items-center py-4",
                    children: i("div", {
                        className: "border border-slate-300 shadow rounded-md p-4 w-full mx-auto",
                        children: u("div", {
                            className: "animate-pulse flex space-x-4",
                            children: [i("div", {
                                className: "rounded-full bg-slate-200 h-10 w-10"
                            }), u("div", {
                                className: "flex-1 space-y-6 py-1",
                                children: [i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                }), i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                }), i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                }), i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                })]
                            })]
                        })
                    })
                }) : i(Je, {
                    children: m.length > 0 ? i("div", {
                        className: "-mx-px grid grid-cols-2 border-l border-t border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4",
                        children: m.map(w => {
                            const k = jd(w, n);
                            return u("div", {
                                className: "group relative border-r border-b border-gray-200 p-4 sm:p-6",
                                children: [i("div", {
                                    className: "aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75",
                                    children: i("img", {
                                        src: w.imageUrl,
                                        alt: w.title,
                                        className: "h-full w-full object-cover object-center"
                                    })
                                }), i("div", {
                                    className: "pt-10 pb-4 text-center",
                                    children: i("h3", {
                                        className: "text-sm font-medium text-gray-900 truncate",
                                        children: u("a", {
                                            href: w.listingUrl,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            children: [i("span", {
                                                "aria-hidden": "true",
                                                className: "absolute inset-0"
                                            }), w.title]
                                        })
                                    })
                                }), u("div", {
                                    className: "flex items-center space-x-2",
                                    children: [w.popularNow && i(Mt, {
                                        type: "info",
                                        message: "Popular Now"
                                    }), w.etsyPick && i(Mt, {
                                        type: "warning",
                                        message: "Etsy Pick"
                                    }), w.bestSeller && i(Mt, {
                                        type: "success",
                                        message: "Best Seller"
                                    })]
                                }), k ? i(hd, {
                                    listing: w
                                }) : i(In, {
                                    listing: w
                                })]
                            }, w.listing_id)
                        })
                    }) : u("div", {
                        className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                        children: [i("svg", {
                            className: "mx-auto h-12 w-12 text-gray-400",
                            stroke: "currentColor",
                            fill: "none",
                            viewBox: "0 0 48 48",
                            "aria-hidden": "true",
                            children: i("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                            })
                        }), i("span", {
                            className: "mt-2 block text-sm font-semibold text-gray-900",
                            children: "No results found"
                        })]
                    })
                }), u("nav", {
                    className: "flex items-center justify-between border-t border-gray-200 bg-white py-3",
                    "aria-label": "Pagination",
                    children: [i("div", {
                        className: "hidden sm:block",
                        children: u("p", {
                            className: "text-sm text-gray-700",
                            children: ["Showing ", i("span", {
                                className: "font-medium",
                                children: c + 1
                            }), " to", " ", i("span", {
                                className: "font-medium",
                                children: o + c
                            }), " of", " ", i("span", {
                                className: "font-medium",
                                children: x
                            }), " results"]
                        })
                    }), u("div", {
                        className: "flex flex-1 justify-between sm:justify-end",
                        children: [i("button", {
                            type: "button",
                            onClick: () => {
                                z()
                            },
                            disabled: c <= 0,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c <= 0,
                                "bg-white": c > 0,
                                "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Previous"
                        }), i("button", {
                            type: "button",
                            onClick: () => {
                                L()
                            },
                            disabled: c + o >= x,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c + o >= x,
                                "bg-white": c + o < x,
                                "relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Next"
                        })]
                    })]
                }), i(at.Root, {
                    show: F,
                    as: d.exports.Fragment,
                    children: u(Dt, {
                        as: "div",
                        className: "relative z-10",
                        onClose: U,
                        children: [i(at.Child, {
                            as: d.exports.Fragment,
                            enter: "ease-out duration-300",
                            enterFrom: "opacity-0",
                            enterTo: "opacity-100",
                            leave: "ease-in duration-200",
                            leaveFrom: "opacity-100",
                            leaveTo: "opacity-0",
                            children: i("div", {
                                className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            })
                        }), i("div", {
                            className: "fixed inset-0 z-10 overflow-y-auto",
                            children: i("div", {
                                className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
                                children: i(at.Child, {
                                    as: d.exports.Fragment,
                                    enter: "ease-out duration-300",
                                    enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                                    enterTo: "opacity-100 translate-y-0 sm:scale-100",
                                    leave: "ease-in duration-200",
                                    leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                                    leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                                    children: u(Dt.Panel, {
                                        className: "relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6",
                                        children: [i("div", {
                                            className: "absolute top-0 right-0 hidden pt-4 pr-4 sm:block",
                                            children: u("button", {
                                                type: "button",
                                                className: "rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
                                                onClick: () => U(!1),
                                                children: [i("span", {
                                                    className: "sr-only",
                                                    children: "Close"
                                                }), i(Ci, {
                                                    className: "h-6 w-6",
                                                    "aria-hidden": "true"
                                                })]
                                            })
                                        }), u("div", {
                                            className: "sm:flex sm:items-start",
                                            children: [i("div", {
                                                className: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",
                                                children: i(ki, {
                                                    className: "h-6 w-6 text-red-600",
                                                    "aria-hidden": "true"
                                                })
                                            }), u("div", {
                                                className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",
                                                children: [i(Dt.Title, {
                                                    as: "h3",
                                                    className: "text-base font-semibold leading-6 text-gray-900",
                                                    children: "Clean up your saved listings"
                                                }), i("div", {
                                                    className: "mt-2",
                                                    children: i("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Are you sure you want to delete your data? All of your data will be permanently removed from our servers forever. This action cannot be undone."
                                                    })
                                                })]
                                            })]
                                        }), u("div", {
                                            className: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse",
                                            children: [i("button", {
                                                type: "button",
                                                className: "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
                                                onClick: () => {
                                                    J()
                                                },
                                                children: "Delete it \u{1F979}"
                                            }), i("button", {
                                                type: "button",
                                                className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                                                onClick: () => U(!1),
                                                children: "Cancel"
                                            })]
                                        })]
                                    })
                                })
                            })
                        })]
                    })
                })]
            })
        };
    class gd extends O.Component {
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), i(Ui, {}), i(Bi, {
                    currentTab: "All"
                }), i("div", {
                    className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                    children: i(pd, {})
                })]
            })
        }
    }
    var vd = ht(gd);
    class yd extends O.Component {
        componentDidMount() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            de.trackEvent(Lr, {
                globalState: t
            })
        }
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), u("div", {
                    className: "flex flex-col items-center justify-center h-full",
                    children: [i("h2", {
                        className: "text-xl font-bold",
                        children: "UI Customization"
                    }), u("p", {
                        onClick: () => {
                            confirm("Are you sure you want to reset to default?") == !0 && (r.resetDefaultHeyEtsy(), chrome.tabs.query({
                                active: !0,
                                currentWindow: !0
                            }, function (n) {
                                chrome.tabs.sendMessage(n[0].id, {
                                    type: "RELOAD_PAGE"
                                })
                            }))
                        },
                        className: "text-sm text-gray-900 py-2 hover:underline cursor-pointer hover:text-gray-700 flex items-center space-x-1",
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            className: "w-6 h-6",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z",
                                clipRule: "evenodd"
                            })
                        }), i("span", {
                            children: "Reset to default"
                        })]
                    }), u("div", {
                        className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                        children: [i(Dn, {}), i(Oi, {})]
                    })]
                })]
            })
        }
    }
    var xd = ht(yd);
    class bd extends O.Component {
        componentDidMount() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            de.trackEvent(Lr, {
                globalState: t
            })
        }
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), u("div", {
                    className: "flex flex-col items-center justify-center h-full",
                    children: [i("h2", {
                        className: "text-xl font-bold",
                        children: "UI Customization"
                    }), u("p", {
                        onClick: () => {
                            confirm("Are you sure you want to reset to default?") == !0 && (r.resetDefaultCard(), chrome.tabs.query({
                                active: !0,
                                currentWindow: !0
                            }, function (n) {
                                chrome.tabs.sendMessage(n[0].id, {
                                    type: "RELOAD_PAGE"
                                })
                            }))
                        },
                        className: "text-sm text-gray-900 py-2 hover:underline cursor-pointer hover:text-gray-700 flex items-center space-x-1",
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            className: "w-6 h-6",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z",
                                clipRule: "evenodd"
                            })
                        }), i("span", {
                            children: "Reset to default"
                        })]
                    }), u("div", {
                        className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                        children: [i(Pn, {}), i(Mn, {}), i(Di, {}), i(Pi, {})]
                    })]
                })]
            })
        }
    }
    var wd = ht(bd);
    const Nd = [{
        id: "embedded",
        title: "Embedded",
        description: "Show sidebar inside the content."
    }, {
        id: "overlay",
        title: "Overlay",
        description: "Show sidebar on top of the content."
    }];

    function kd() {
        const [e, t] = ye(), {
            heyShop: r
        } = e, n = a => {
            t.setHeyShopSidebarBehavior(a), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (s) {
                chrome.tabs.sendMessage(s[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Qd, {
                heyShop: r
            })
        };
        return u(ie, {
            value: r.sidebarBehavior,
            onChange: n,
            className: "py-4",
            children: [i(ie.Label, {
                className: "text-base font-medium text-gray-900",
                children: "Shop Sidebar Behavior"
            }), i("div", {
                className: "mt-4 grid grid-cols-2 gap-y-2 gap-x-2",
                children: Nd.map(a => i(ie.Option, {
                    value: a.id,
                    className: ({
                        checked: s,
                        active: o
                    }) => $(s ? "border-transparent" : "border-gray-300", o ? "border-teal-500 ring-2 ring-teal-500" : "", "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"),
                    children: ({
                        checked: s,
                        active: o
                    }) => u(Je, {
                        children: [i("span", {
                            className: "flex flex-1",
                            children: u("span", {
                                className: "flex flex-col",
                                children: [i(ie.Label, {
                                    as: "span",
                                    className: "block text-sm font-medium text-gray-900",
                                    children: a.title
                                }), i(ie.Description, {
                                    as: "span",
                                    className: "mt-1 flex items-center text-sm text-gray-500",
                                    children: a.description
                                })]
                            })
                        }), i(Yt, {
                            className: $(s ? "text-teal-600" : "text-gray-300", "h-5 w-5"),
                            "aria-hidden": "true"
                        }), i("span", {
                            className: $(o ? "border" : "border-2", s ? "border-teal-500" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                            "aria-hidden": "true"
                        })]
                    })
                }, a.id))
            })]
        })
    }
    const Ed = [{
        id: "bottom",
        title: "Bottom"
    }, {
        id: "top",
        title: "Top"
    }];

    function Sd() {
        const [e, t] = ye(), {
            heyShop: r
        } = e, n = a => {
            t.setHeyShopSidebarPosition(a), chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (s) {
                chrome.tabs.sendMessage(s[0].id, {
                    type: "RELOAD_PAGE"
                })
            }), de.trackEvent(Yi, {
                heyShop: r
            })
        };
        return u(ie, {
            value: r.sidebarPosition,
            onChange: n,
            className: "py-4",
            children: [i(ie.Label, {
                className: "text-base font-medium text-gray-900",
                children: "Shop Sidebar Position"
            }), i("div", {
                className: "mt-4 grid grid-cols-2 gap-x-2 gap-y-2",
                children: Ed.map(a => i(ie.Option, {
                    value: a.id,
                    className: ({
                        checked: s,
                        active: o
                    }) => $(s ? "border-transparent" : "border-gray-300", o ? "border-teal-500 ring-2 ring-teal-500" : "", "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"),
                    children: ({
                        checked: s,
                        active: o
                    }) => u(Je, {
                        children: [u("div", {
                            className: "flex items-center justify-center w-full space-x-2",
                            children: [i(Yt, {
                                className: $(s ? "text-teal-600" : "text-gray-300", "h-5 w-5"),
                                "aria-hidden": "true"
                            }), i(ie.Label, {
                                as: "span",
                                className: "block text-sm font-medium text-gray-900",
                                children: a.title
                            })]
                        }), i("span", {
                            className: $(o ? "border" : "border-2", s ? "border-teal-500" : "border-transparent", "pointer-events-none absolute -inset-px rounded-lg"),
                            "aria-hidden": "true"
                        })]
                    })
                }, a.id))
            })]
        })
    }
    class Cd extends O.Component {
        componentDidMount() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            de.trackEvent(Lr, {
                globalState: t
            })
        }
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), u("div", {
                    className: "flex flex-col items-center justify-center h-full",
                    children: [i("h2", {
                        className: "text-xl font-bold",
                        children: "UI Customization"
                    }), u("p", {
                        onClick: () => {
                            confirm("Are you sure you want to reset to default?") == !0 && (r.resetDefaultHeyShop(), chrome.tabs.query({
                                active: !0,
                                currentWindow: !0
                            }, function (n) {
                                chrome.tabs.sendMessage(n[0].id, {
                                    type: "RELOAD_PAGE"
                                })
                            }))
                        },
                        className: "text-sm text-gray-900 py-2 hover:underline cursor-pointer hover:text-gray-700 flex items-center space-x-1",
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            className: "w-6 h-6",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z",
                                clipRule: "evenodd"
                            })
                        }), i("span", {
                            children: "Reset to default"
                        })]
                    }), u("div", {
                        className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                        children: [i(Fi, {}), i(kd, {}), t.heyShop.sidebarBehavior === "overlay" && i(Sd, {})]
                    })]
                })]
            })
        }
    }
    var _d = ht(Cd);
    const Wi = [{
        id: "views",
        name: "Best Views"
    }, {
        id: "daily_views",
        name: "Best Daily Views"
    }, {
        id: "num_favorers",
        name: "Best Favorers"
    }, {
        id: "sold",
        name: "Best Sold"
    }, {
        id: "total_sold",
        name: "Best Total Sold"
    }, {
        id: "shop_sold",
        name: "Best Shop Sold"
    }, {
        id: "hey",
        name: "Best Favorers Rate"
    }],
        Ad = () => {
            const [e, t] = ye(), {
                highlight: r
            } = e, {
                settings: n
            } = r, {
                showAlert: a,
                hideAlert: s
            } = t, [o, l] = d.exports.useState(20), [c, f] = d.exports.useState(0), [m, v] = d.exports.useState([]), [x, y] = d.exports.useState(0), [N, D] = d.exports.useState(!1), [F, U] = d.exports.useState(!1), [C, K] = d.exports.useState(""), [V, q] = d.exports.useState("views"), [W, I] = d.exports.useState("desc"), {
                register: p,
                handleSubmit: h,
                watch: S,
                formState: {
                    errors: T
                }
            } = Ut(), A = async w => {
                K(w.search)
            };
            d.exports.useEffect(() => {
                (async () => {
                    D(!0);
                    const w = await su({
                        propName: "title",
                        searchTerm: C,
                        limit: o,
                        offset: c,
                        sortBy: V,
                        sortOrder: W,
                        settings: n
                    });
                    v(w);
                    const k = await ou("title", C, n);
                    y(k), D(!1)
                })()
            }, [o, c, C, V, W]);
            const L = () => {
                c + o >= x || f(c + o)
            },
                z = () => {
                    c <= 0 || f(c - o)
                },
                X = async () => {
                    s(), U(!0)
                }, J = async () => {
                    s(), U(!1), a("Deleting all saved listings...", "info"), await Zi(), a("Deleted all saved listings", "success"), window.location.reload()
                }, j = async () => {
                    s();
                    var w = (await lu(n)).map(P => ({
                        listing_id: P.listing_id,
                        title: P.title,
                        views: parseInt(P.views.replace(/,/g, "")),
                        daily_views: P.daily_views,
                        views_24h: P.views_24h,
                        num_favorers: parseInt(P.num_favorers.replace(/,/g, "")),
                        tags: P.tags,
                        categories: P.categories,
                        sold: P.sold,
                        total_sold: (P == null ? void 0 : P.total_sold) || 0,
                        estimated_revenue: (P == null ? void 0 : P.estimated_revenue) || "",
                        shop_sold: P.shop_sold,
                        favorers_rate: P.hey,
                        listingUrl: P.listingUrl,
                        imageUrl: P.imageUrl,
                        bestSeller: P.bestSeller,
                        popularNow: P.popularNow,
                        etsyPick: P.etsyPick,
                        created_at: P.created_at,
                        updated_at: P.updated_at,
                        original_creation: P.original_creation,
                        last_modified: P.last_modified
                    }));
                    const k = zi.unparse(w);
                    var R = new Blob([k], {
                        type: "text/csv;charset=utf-8;"
                    }),
                        H = URL.createObjectURL(R),
                        E = document.createElement("a");
                    E.setAttribute("href", H);
                    var Y = new Date,
                        ae = Y.getFullYear() + "-" + (Y.getMonth() + 1) + "-" + Y.getDate();
                    E.setAttribute("download", "ytuong_highlight_saved_" + ae + ".csv"), E.style.visibility = "hidden", document.body.appendChild(E), E.click(), document.body.removeChild(E), a(`Exported ${w.length} listings to CSV`, "success")
                };
            return u("div", {
                children: [u("form", {
                    className: "mt-4 flex gap-x-4",
                    onSubmit: h(A),
                    children: [u("div", {
                        className: "min-w-0 flex-1",
                        children: [i("label", {
                            htmlFor: "search",
                            className: "sr-only",
                            children: "Search"
                        }), u("div", {
                            className: "relative rounded-md shadow-sm",
                            children: [i("div", {
                                className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
                                children: i(Si, {
                                    className: "h-5 w-5 text-gray-400",
                                    "aria-hidden": "true"
                                })
                            }), i("input", {
                                type: "search",
                                name: "search",
                                id: "search",
                                className: "block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500 sm:text-sm sm:leading-6",
                                placeholder: "Search",
                                ...p("search")
                            })]
                        })]
                    }), u("button", {
                        type: "submit",
                        className: "inline-flex justify-center rounded-md bg-white px-3 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
                        children: [i(Ti, {
                            className: "h-5 w-5",
                            "aria-hidden": "true"
                        }), i("span", {
                            className: "sr-only",
                            children: "Search"
                        })]
                    })]
                }), u("div", {
                    className: "mx-auto flex justify-between items-center space-x-6 py-4",
                    children: [u(Ee, {
                        as: "div",
                        className: "relative inline-block",
                        children: [i("div", {
                            className: "flex",
                            children: u(Ee.Button, {
                                className: "group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900",
                                children: ["Sort: ", Wi.find(w => w.id === V).name, i(Ai, {
                                    className: "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
                                    "aria-hidden": "true"
                                })]
                            })
                        }), i(at, {
                            as: d.exports.Fragment,
                            enter: "transition ease-out duration-100",
                            enterFrom: "transform opacity-0 scale-95",
                            enterTo: "transform opacity-100 scale-100",
                            leave: "transition ease-in duration-75",
                            leaveFrom: "transform opacity-100 scale-100",
                            leaveTo: "transform opacity-0 scale-95",
                            children: i(Ee.Items, {
                                className: "absolute left-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none",
                                children: i("div", {
                                    className: "py-1",
                                    children: Wi.map(w => i(Ee.Item, {
                                        children: ({
                                            active: k
                                        }) => i("div", {
                                            onClick: () => {
                                                switch (q(w.id), w.id) {
                                                    case "last_modified_days":
                                                        I("asc");
                                                        break;
                                                    case "original_creation_days":
                                                        I("asc");
                                                        break;
                                                    default:
                                                        I("desc");
                                                        break
                                                }
                                                f(0)
                                            },
                                            className: $({
                                                "font-medium text-gray-900": w.id === V,
                                                "text-gray-500": !w.id === V,
                                                "bg-gray-100": k,
                                                "block px-4 py-2 text-sm cursor-pointer": !0
                                            }),
                                            children: w.name
                                        })
                                    }, w.id))
                                })
                            })
                        })]
                    }), u("div", {
                        className: "space-x-3 flex",
                        children: [u("button", {
                            type: "button",
                            onClick: () => {
                                X()
                            },
                            className: "relative -ml-px hidden items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-red-400 hover:z-10 hover:bg-red-500 focus:z-10 sm:inline-flex",
                            children: [i(Li, {
                                className: "-ml-0.5 h-5 w-5 text-white",
                                "aria-hidden": "true"
                            }), "Clean up"]
                        }), u("button", {
                            type: "button",
                            onClick: () => {
                                j()
                            },
                            className: "relative -ml-px hidden items-center gap-x-1.5 rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-teal-400 hover:z-10 hover:bg-teal-500 focus:z-10 sm:inline-flex",
                            children: [i(Ri, {
                                className: "-ml-0.5 h-5 w-5 text-white",
                                "aria-hidden": "true"
                            }), "Download"]
                        })]
                    })]
                }), u("nav", {
                    className: "flex items-center justify-between border-t border-gray-200 bg-white py-3",
                    "aria-label": "Pagination",
                    children: [i("div", {
                        className: "hidden sm:block",
                        children: u("p", {
                            className: "text-sm text-gray-700",
                            children: ["Showing ", i("span", {
                                className: "font-medium",
                                children: c + 1
                            }), " to", " ", i("span", {
                                className: "font-medium",
                                children: o + c
                            }), " of", " ", i("span", {
                                className: "font-medium",
                                children: x
                            }), " results"]
                        })
                    }), u("div", {
                        className: "flex flex-1 justify-between sm:justify-end",
                        children: [i("button", {
                            type: "button",
                            onClick: () => {
                                z()
                            },
                            disabled: c <= 0,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c <= 0,
                                "bg-white": c > 0,
                                "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Previous"
                        }), i("button", {
                            type: "button",
                            onClick: () => {
                                L()
                            },
                            disabled: c + o >= x,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c + o >= x,
                                "bg-white": c + o < x,
                                "relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Next"
                        })]
                    })]
                }), N ? i("div", {
                    className: "flex justify-center items-center py-4",
                    children: i("div", {
                        className: "border border-slate-300 shadow rounded-md p-4 w-full mx-auto",
                        children: u("div", {
                            className: "animate-pulse flex space-x-4",
                            children: [i("div", {
                                className: "rounded-full bg-slate-200 h-10 w-10"
                            }), u("div", {
                                className: "flex-1 space-y-6 py-1",
                                children: [i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                }), i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                }), i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                }), i("div", {
                                    className: "h-4 bg-slate-200 rounded"
                                })]
                            })]
                        })
                    })
                }) : i(Je, {
                    children: m.length > 0 ? i("div", {
                        className: "-mx-px grid grid-cols-2 border-l border-t border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4",
                        children: m.map(w => u("div", {
                            className: "group relative border-r border-b border-gray-200 p-4 sm:p-6",
                            children: [i("div", {
                                className: "aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75",
                                children: i("img", {
                                    src: w.imageUrl,
                                    alt: w.title,
                                    className: "h-full w-full object-cover object-center"
                                })
                            }), i("div", {
                                className: "pt-10 pb-4 text-center",
                                children: i("h3", {
                                    className: "text-sm font-medium text-gray-900 truncate",
                                    children: u("a", {
                                        href: w.listingUrl,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: [i("span", {
                                            "aria-hidden": "true",
                                            className: "absolute inset-0"
                                        }), w.title]
                                    })
                                })
                            }), u("div", {
                                className: "flex items-center space-x-2",
                                children: [w.popularNow && i(Mt, {
                                    type: "info",
                                    message: "Popular Now"
                                }), w.etsyPick && i(Mt, {
                                    type: "warning",
                                    message: "Etsy Pick"
                                }), w.bestSeller && i(Mt, {
                                    type: "success",
                                    message: "Best Seller"
                                })]
                            }), i(In, {
                                listing: w
                            })]
                        }, w.listing_id))
                    }) : u("div", {
                        className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                        children: [i("svg", {
                            className: "mx-auto h-12 w-12 text-gray-400",
                            stroke: "currentColor",
                            fill: "none",
                            viewBox: "0 0 48 48",
                            "aria-hidden": "true",
                            children: i("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                            })
                        }), i("span", {
                            className: "mt-2 block text-sm font-semibold text-gray-900",
                            children: "No results found"
                        })]
                    })
                }), u("nav", {
                    className: "flex items-center justify-between border-t border-gray-200 bg-white py-3",
                    "aria-label": "Pagination",
                    children: [i("div", {
                        className: "hidden sm:block",
                        children: u("p", {
                            className: "text-sm text-gray-700",
                            children: ["Showing ", i("span", {
                                className: "font-medium",
                                children: c + 1
                            }), " to", " ", i("span", {
                                className: "font-medium",
                                children: o + c
                            }), " of", " ", i("span", {
                                className: "font-medium",
                                children: x
                            }), " results"]
                        })
                    }), u("div", {
                        className: "flex flex-1 justify-between sm:justify-end",
                        children: [i("button", {
                            type: "button",
                            onClick: () => {
                                z()
                            },
                            disabled: c <= 0,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c <= 0,
                                "bg-white": c > 0,
                                "relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Previous"
                        }), i("button", {
                            type: "button",
                            onClick: () => {
                                L()
                            },
                            disabled: c + o >= x,
                            className: $({
                                "cursor-not-allowed bg-gray-100": c + o >= x,
                                "bg-white": c + o < x,
                                "relative ml-3 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0": !0
                            }),
                            children: "Next"
                        })]
                    })]
                }), i(at.Root, {
                    show: F,
                    as: d.exports.Fragment,
                    children: u(Dt, {
                        as: "div",
                        className: "relative z-10",
                        onClose: U,
                        children: [i(at.Child, {
                            as: d.exports.Fragment,
                            enter: "ease-out duration-300",
                            enterFrom: "opacity-0",
                            enterTo: "opacity-100",
                            leave: "ease-in duration-200",
                            leaveFrom: "opacity-100",
                            leaveTo: "opacity-0",
                            children: i("div", {
                                className: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            })
                        }), i("div", {
                            className: "fixed inset-0 z-10 overflow-y-auto",
                            children: i("div", {
                                className: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
                                children: i(at.Child, {
                                    as: d.exports.Fragment,
                                    enter: "ease-out duration-300",
                                    enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                                    enterTo: "opacity-100 translate-y-0 sm:scale-100",
                                    leave: "ease-in duration-200",
                                    leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
                                    leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                                    children: u(Dt.Panel, {
                                        className: "relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6",
                                        children: [i("div", {
                                            className: "absolute top-0 right-0 hidden pt-4 pr-4 sm:block",
                                            children: u("button", {
                                                type: "button",
                                                className: "rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
                                                onClick: () => U(!1),
                                                children: [i("span", {
                                                    className: "sr-only",
                                                    children: "Close"
                                                }), i(Ci, {
                                                    className: "h-6 w-6",
                                                    "aria-hidden": "true"
                                                })]
                                            })
                                        }), u("div", {
                                            className: "sm:flex sm:items-start",
                                            children: [i("div", {
                                                className: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",
                                                children: i(ki, {
                                                    className: "h-6 w-6 text-red-600",
                                                    "aria-hidden": "true"
                                                })
                                            }), u("div", {
                                                className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",
                                                children: [i(Dt.Title, {
                                                    as: "h3",
                                                    className: "text-base font-semibold leading-6 text-gray-900",
                                                    children: "Clean up your saved listings"
                                                }), i("div", {
                                                    className: "mt-2",
                                                    children: i("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Are you sure you want to delete your data? All of your data will be permanently removed from our servers forever. This action cannot be undone."
                                                    })
                                                })]
                                            })]
                                        }), u("div", {
                                            className: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse",
                                            children: [i("button", {
                                                type: "button",
                                                className: "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto",
                                                onClick: () => {
                                                    J()
                                                },
                                                children: "Delete it \u{1F979}"
                                            }), i("button", {
                                                type: "button",
                                                className: "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto",
                                                onClick: () => U(!1),
                                                children: "Cancel"
                                            })]
                                        })]
                                    })
                                })
                            })
                        })]
                    })
                })]
            })
        };
    class Rd extends O.Component {
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), i(Ui, {}), i(Bi, {
                    currentTab: "Highlight"
                }), i("div", {
                    className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                    children: i(Ad, {})
                })]
            })
        }
    }
    var Td = ht(Rd);
    class Ld extends O.Component {
        componentDidMount() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            de.trackEvent(Zd, {
                globalState: t
            })
        }
        render() {
            const {
                globalState: t,
                globalActions: r
            } = this.props;
            return u(Ye, {
                children: [!r.isAuthenticated() && i(et, {
                    to: "/licence-code"
                }), u("div", {
                    className: "flex flex-col items-center justify-center h-full",
                    children: [i("h2", {
                        className: "text-xl font-bold",
                        children: "Highlight Settings"
                    }), u("p", {
                        onClick: () => {
                            confirm("Are you sure you want to reset to default?") == !0 && (r.resetHighlightDefault(), chrome.tabs.query({
                                active: !0,
                                currentWindow: !0
                            }, function (n) {
                                chrome.tabs.sendMessage(n[0].id, {
                                    type: "RELOAD_PAGE"
                                })
                            }))
                        },
                        className: "text-sm text-gray-900 py-2 hover:underline cursor-pointer hover:text-gray-700 flex items-center space-x-1",
                        children: [i("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 24 24",
                            fill: "currentColor",
                            className: "w-6 h-6",
                            children: i("path", {
                                fillRule: "evenodd",
                                d: "M19.449 8.448L16.388 11a4.52 4.52 0 010 2.002l3.061 2.55a8.275 8.275 0 000-7.103zM15.552 19.45L13 16.388a4.52 4.52 0 01-2.002 0l-2.55 3.061a8.275 8.275 0 007.103 0zM4.55 15.552L7.612 13a4.52 4.52 0 010-2.002L4.551 8.45a8.275 8.275 0 000 7.103zM8.448 4.55L11 7.612a4.52 4.52 0 012.002 0l2.55-3.061a8.275 8.275 0 00-7.103 0zm8.657-.86a9.776 9.776 0 011.79 1.415 9.776 9.776 0 011.414 1.788 9.764 9.764 0 010 10.211 9.777 9.777 0 01-1.415 1.79 9.777 9.777 0 01-1.788 1.414 9.764 9.764 0 01-10.212 0 9.776 9.776 0 01-1.788-1.415 9.776 9.776 0 01-1.415-1.788 9.764 9.764 0 010-10.212 9.774 9.774 0 011.415-1.788A9.774 9.774 0 016.894 3.69a9.764 9.764 0 0110.211 0zM14.121 9.88a2.985 2.985 0 00-1.11-.704 3.015 3.015 0 00-2.022 0 2.985 2.985 0 00-1.11.704c-.326.325-.56.705-.704 1.11a3.015 3.015 0 000 2.022c.144.405.378.785.704 1.11.325.326.705.56 1.11.704.652.233 1.37.233 2.022 0a2.985 2.985 0 001.11-.704c.326-.325.56-.705.704-1.11a3.016 3.016 0 000-2.022 2.985 2.985 0 00-.704-1.11z",
                                clipRule: "evenodd"
                            })
                        }), i("span", {
                            children: "Reset to default"
                        })]
                    }), i("div", {
                        className: "flex flex-col justify-center divide-y-2 divide-gray-200 ",
                        children: i(Ii, {})
                    })]
                })]
            })
        }
    }
    var Od = ht(Ld);
    const Dd = [{
        path: "/highlight-saved",
        isPublicRoute: !1,
        component: Td
    }, {
        path: "/saved",
        isPublicRoute: !1,
        component: vd
    }, {
        path: "/ui",
        isPublicRoute: !0,
        component: nd
    }, {
        path: "/ui-sidebar",
        isPublicRoute: !0,
        component: xd
    }, {
        path: "/ui-card",
        isPublicRoute: !0,
        component: wd
    }, {
        path: "/ui-shop",
        isPublicRoute: !0,
        component: _d
    }, {
        path: "/highlight-settings",
        isPublicRoute: !0,
        component: Od
    }, {
        path: "/licence-code",
        isPublicRoute: !0,
        component: zc
    }, {
        path: "/login",
        isPublicRoute: !0,
        component: jc
    }, {
        path: "/shop-not-found",
        isPublicRoute: !0,
        component: fd
    }, {
        path: "/",
        isPublicRoute: !1,
        component: ud
    }];

    function Md() {
        return i(qs, {
            children: Dd.map(e => {
                if (e.isPublicRoute) {
                    const t = e.component;
                    return i(ba, {
                        path: e.path,
                        children: i(t, {})
                    }, e.path)
                } else {
                    const t = e.component;
                    return i(ad, {
                        path: e.path,
                        children: i(t, {})
                    }, e.path)
                }
            })
        })
    }

    function Pd() {
        return i(Hs, {
            children: i(Md, {})
        })
    }
    Or.createRoot(document.getElementById("app")).render(i(O.StrictMode, {
        children: i(Pd, {})
    }))
});