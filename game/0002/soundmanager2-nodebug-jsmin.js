/** @license
 *
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20130512
 */
(function(l, h) {
    function V(V, la) {
        function W(b) {
            return c.preferFlash && D && !c.ignoreFlash && c.flash[b] !== h && c.flash[b]
        }

        function r(b) {
            return function(c) {
                var d = this._s;
                return !d || !d._a ? null : b.call(this, c)
            }
        }
        this.setupOptions = {
            url: V || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1E3,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !0,
            noSWFCache: !1,
            idPrefix: "sound"
        };
        this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onposition: null,
            onstop: null,
            onfailure: null,
            onfinish: null,
            multiShot: !0,
            multiShotEvents: !1,
            position: null,
            pan: 0,
            stream: !0,
            to: null,
            type: null,
            usePolicyFile: !1,
            volume: 100
        };
        this.flash9Options = {
            isMovieStar: null,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null,
            onconnect: null,
            duration: null
        };
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs\x3d"mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a", "m4b"],
                type: ['audio/mp4; codecs\x3d"mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: !1
            },
            ogg: {
                type: ["audio/ogg; codecs\x3dvorbis"],
                required: !1
            },
            opus: {
                type: ["audio/ogg; codecs\x3dopus", "audio/opus"],
                required: !1
            },
            wav: {
                type: ['audio/wav; codecs\x3d"1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: !1
            }
        };
        this.movieID = "sm2-container";
        this.id = la || "sm2movie";
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.versionNumber = "V2.97a.20130512";
        this.altURL = this.movieURL = this.version = null;
        this.enabled = this.swfLoaded = !1;
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.didFlashBlock = this.muted = !1;
        this.filePattern = null;
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        };
        this.features = {
            buffering: !1,
            peakData: !1,
            waveformData: !1,
            eqData: !1,
            movieStar: !1
        };
        this.sandbox = {};
        this.html5 = {
            usingFlash: null
        };
        this.flash = {};
        this.ignoreFlash = this.html5Only = !1;
        var Ja, c = this,
            Ka = null,
            k = null,
            X, p = navigator.userAgent,
            La = l.location.href.toString(),
            n = document,
            ma, Ma, na, m, u = [],
            L = !1,
            M = !1,
            q = !1,
            x = !1,
            oa = !1,
            N, w, pa, Y, qa, E, F, G, Na, ra, Z, sa, $, ta, H, ua, O, va, aa, I, Oa, wa, Pa, xa, Qa, P = null,
            ya = null,
            Q, za, J, ba, ca, s, R = !1,
            Aa = !1,
            Ra, Sa, Ta, da = 0,
            S = null,
            ea, Ua = [],
            fa, v = null,
            Va, ga, T, y, ha, Ba, Wa, t, fb = Array.prototype.slice,
            z = !1,
            Ca, D, Da, Xa,
            B, ia, Ya = 0,
            U = p.match(/(ipad|iphone|ipod)/i),
            Za = p.match(/android/i),
            C = p.match(/msie/i),
            gb = p.match(/webkit/i),
            ja = p.match(/safari/i) && !p.match(/chrome/i),
            Ea = p.match(/opera/i),
            hb = p.match(/firefox/i),
            Fa = p.match(/(mobile|pre\/|xoom)/i) || U || Za,
            $a = !La.match(/usehtml5audio/i) && !La.match(/sm2\-ignorebadua/i) && ja && !p.match(/silk/i) && p.match(/OS X 10_6_([3-7])/i),
            Ga = n.hasFocus !== h ? n.hasFocus() : null,
            ka = ja && (n.hasFocus === h || !n.hasFocus()),
            ab = !ka,
            bb = /(mp3|mp4|mpa|m4a|m4b)/i,
            Ha = n.location ? n.location.protocol.match(/http/i) :
            null,
            cb = !Ha ? "http://" : "",
            db = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            eb = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
            ib = RegExp("\\.(" + eb.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.useAltURL = !Ha;
        var Ia;
        try {
            Ia = Audio !== h && (Ea && opera !== h && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== h
        } catch (jb) {
            Ia = !1
        }
        this.hasHTML5 = Ia;
        this.setup = function(b) {
            var e = !c.url;
            b !== h && q && v && c.ok();
            pa(b);
            b && (e && (O && b.url !== h) && c.beginDelayedInit(), !O && (b.url !== h && "complete" === n.readyState) && setTimeout(H, 1));
            return c
        };
        this.supported = this.ok = function() {
            return v ? q && !x : c.useHTML5Audio && c.hasHTML5
        };
        this.getMovie = function(b) {
            return X(b) || n[b] || l[b]
        };
        this.createSound = function(b, e) {
            function d() {
                a = ba(a);
                c.sounds[a.id] = new Ja(a);
                c.soundIDs.push(a.id);
                return c.sounds[a.id]
            }
            var a, f = null;
            if (!q || !c.ok()) return !1;
            e !== h && (b = {
                id: b,
                url: e
            });
            a = w(b);
            a.url = ea(a.url);
            void 0 === a.id && (a.id = c.setupOptions.idPrefix + Ya++);
            if (s(a.id, !0)) return c.sounds[a.id];
            if (ga(a)) f = d(), f._setup_html5(a);
            else {
                if (c.html5Only || c.html5.usingFlash && a.url && a.url.match(/data\:/i)) return d();
                8 < m && null === a.isMovieStar && (a.isMovieStar = !(!a.serverURL && !(a.type && a.type.match(db) || a.url && a.url.match(ib))));
                a = ca(a, void 0);
                f = d();
                8 === m ? k._createSound(a.id, a.loops || 1, a.usePolicyFile) : (k._createSound(a.id, a.url, a.usePeakData, a.useWaveformData, a.useEQData, a.isMovieStar, a.isMovieStar ? a.bufferTime : !1, a.loops || 1, a.serverURL, a.duration || null, a.autoPlay, !0, a.autoLoad,
                    a.usePolicyFile), a.serverURL || (f.connected = !0, a.onconnect && a.onconnect.apply(f)));
                !a.serverURL && (a.autoLoad || a.autoPlay) && f.load(a)
            }!a.serverURL && a.autoPlay && f.play();
            return f
        };
        this.destroySound = function(b, e) {
            if (!s(b)) return !1;
            var d = c.sounds[b],
                a;
            d._iO = {};
            d.stop();
            d.unload();
            for (a = 0; a < c.soundIDs.length; a++)
                if (c.soundIDs[a] === b) {
                    c.soundIDs.splice(a, 1);
                    break
                }
            e || d.destruct(!0);
            delete c.sounds[b];
            return !0
        };
        this.load = function(b, e) {
            return !s(b) ? !1 : c.sounds[b].load(e)
        };
        this.unload = function(b) {
            return !s(b) ?
                !1 : c.sounds[b].unload()
        };
        this.onposition = this.onPosition = function(b, e, d, a) {
            return !s(b) ? !1 : c.sounds[b].onposition(e, d, a)
        };
        this.clearOnPosition = function(b, e, d) {
            return !s(b) ? !1 : c.sounds[b].clearOnPosition(e, d)
        };
        this.start = this.play = function(b, e) {
            var d = null,
                a = e && !(e instanceof Object);
            if (!q || !c.ok()) return !1;
            if (s(b, a)) a && (e = {
                url: e
            });
            else {
                if (!a) return !1;
                a && (e = {
                    url: e
                });
                e && e.url && (e.id = b, d = c.createSound(e).play())
            }
            null === d && (d = c.sounds[b].play(e));
            return d
        };
        this.setPosition = function(b, e) {
            return !s(b) ? !1 : c.sounds[b].setPosition(e)
        };
        this.stop = function(b) {
            return !s(b) ? !1 : c.sounds[b].stop()
        };
        this.stopAll = function() {
            for (var b in c.sounds) c.sounds.hasOwnProperty(b) && c.sounds[b].stop()
        };
        this.pause = function(b) {
            return !s(b) ? !1 : c.sounds[b].pause()
        };
        this.pauseAll = function() {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].pause()
        };
        this.resume = function(b) {
            return !s(b) ? !1 : c.sounds[b].resume()
        };
        this.resumeAll = function() {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].resume()
        };
        this.togglePause = function(b) {
            return !s(b) ?
                !1 : c.sounds[b].togglePause()
        };
        this.setPan = function(b, e) {
            return !s(b) ? !1 : c.sounds[b].setPan(e)
        };
        this.setVolume = function(b, e) {
            return !s(b) ? !1 : c.sounds[b].setVolume(e)
        };
        this.mute = function(b) {
            var e = 0;
            b instanceof String && (b = null);
            if (b) return !s(b) ? !1 : c.sounds[b].mute();
            for (e = c.soundIDs.length - 1; 0 <= e; e--) c.sounds[c.soundIDs[e]].mute();
            return c.muted = !0
        };
        this.muteAll = function() {
            c.mute()
        };
        this.unmute = function(b) {
            b instanceof String && (b = null);
            if (b) return !s(b) ? !1 : c.sounds[b].unmute();
            for (b = c.soundIDs.length -
                1; 0 <= b; b--) c.sounds[c.soundIDs[b]].unmute();
            c.muted = !1;
            return !0
        };
        this.unmuteAll = function() {
            c.unmute()
        };
        this.toggleMute = function(b) {
            return !s(b) ? !1 : c.sounds[b].toggleMute()
        };
        this.getMemoryUse = function() {
            var b = 0;
            k && 8 !== m && (b = parseInt(k._getMemoryUse(), 10));
            return b
        };
        this.disable = function(b) {
            var e;
            b === h && (b = !1);
            if (x) return !1;
            x = !0;
            for (e = c.soundIDs.length - 1; 0 <= e; e--) Pa(c.sounds[c.soundIDs[e]]);
            N(b);
            t.remove(l, "load", F);
            return !0
        };
        this.canPlayMIME = function(b) {
            var e;
            c.hasHTML5 && (e = T({
                type: b
            }));
            !e && v && (e = b &&
                c.ok() ? !!(8 < m && b.match(db) || b.match(c.mimePattern)) : null);
            return e
        };
        this.canPlayURL = function(b) {
            var e;
            c.hasHTML5 && (e = T({
                url: b
            }));
            !e && v && (e = b && c.ok() ? !!b.match(c.filePattern) : null);
            return e
        };
        this.canPlayLink = function(b) {
            return b.type !== h && b.type && c.canPlayMIME(b.type) ? !0 : c.canPlayURL(b.href)
        };
        this.getSoundById = function(b, e) {
            return !b ? null : c.sounds[b]
        };
        this.onready = function(b, c) {
            if ("function" === typeof b) c || (c = l), qa("onready", b, c), E();
            else throw Q("needFunction", "onready");
            return !0
        };
        this.ontimeout = function(b,
            c) {
            if ("function" === typeof b) c || (c = l), qa("ontimeout", b, c), E({
                type: "ontimeout"
            });
            else throw Q("needFunction", "ontimeout");
            return !0
        };
        this._wD = this._writeDebug = function(b, c) {
            return !0
        };
        this._debug = function() {};
        this.reboot = function(b, e) {
            var d, a, f;
            for (d = c.soundIDs.length - 1; 0 <= d; d--) c.sounds[c.soundIDs[d]].destruct();
            if (k) try {
                C && (ya = k.innerHTML), P = k.parentNode.removeChild(k)
            } catch (h) {}
            ya = P = v = k = null;
            c.enabled = O = q = R = Aa = L = M = x = z = c.swfLoaded = !1;
            c.soundIDs = [];
            c.sounds = {};
            Ya = 0;
            if (b) u = [];
            else
                for (d in u)
                    if (u.hasOwnProperty(d)) {
                        a =
                            0;
                        for (f = u[d].length; a < f; a++) u[d][a].fired = !1
                    }
            c.html5 = {
                usingFlash: null
            };
            c.flash = {};
            c.html5Only = !1;
            c.ignoreFlash = !1;
            l.setTimeout(function() {
                ta();
                e || c.beginDelayedInit()
            }, 20);
            return c
        };
        this.reset = function() {
            return c.reboot(!0, !0)
        };
        this.getMoviePercent = function() {
            return k && "PercentLoaded" in k ? k.PercentLoaded() : null
        };
        this.beginDelayedInit = function() {
            oa = !0;
            H();
            setTimeout(function() {
                if (Aa) return !1;
                aa();
                $();
                return Aa = !0
            }, 20);
            G()
        };
        this.destruct = function() {
            c.disable(!0)
        };
        Ja = function(b) {
            var e, d, a = this,
                f, g, K,
                A, l, n, r = !1,
                p = [],
                q = 0,
                v, x, u = null,
                y;
            d = e = null;
            this.sID = this.id = b.id;
            this.url = b.url;
            this._iO = this.instanceOptions = this.options = w(b);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this.isHTML5 = !1;
            this._a = null;
            y = this.url ? !1 : !0;
            this.id3 = {};
            this._debug = function() {};
            this.load = function(b) {
                var e = null,
                    d;
                b !== h ? a._iO = w(b, a.options) : (b = a.options, a._iO = b, u && u !== a.url && (a._iO.url = a.url, a.url = null));
                a._iO.url || (a._iO.url = a.url);
                a._iO.url = ea(a._iO.url);
                d = a.instanceOptions = a._iO;
                if (!d.url && !a.url) return a;
                if (d.url === a.url && 0 !== a.readyState && 2 !== a.readyState) return 3 === a.readyState && d.onload && ia(a, function() {
                    d.onload.apply(a, [!!a.duration])
                }), a;
                a.loaded = !1;
                a.readyState = 1;
                a.playState = 0;
                a.id3 = {};
                if (ga(d)) e = a._setup_html5(d), e._called_load || (a._html5_canplay = !1, a.url !== d.url && (a._a.src = d.url, a.setPosition(0)), a._a.autobuffer = "auto", a._a.preload = "auto", a._a._called_load = !0, d.autoPlay && a.play());
                else {
                    if (c.html5Only || a._iO.url && a._iO.url.match(/data\:/i)) return a;
                    try {
                        a.isHTML5 = !1, a._iO = ca(ba(d)), d = a._iO,
                            8 === m ? k._load(a.id, d.url, d.stream, d.autoPlay, d.usePolicyFile) : k._load(a.id, d.url, !!d.stream, !!d.autoPlay, d.loops || 1, !!d.autoLoad, d.usePolicyFile)
                    } catch (f) {
                        I({
                            type: "SMSOUND_LOAD_JS_EXCEPTION",
                            fatal: !0
                        })
                    }
                }
                a.url = d.url;
                return a
            };
            this.unload = function() {
                0 !== a.readyState && (a.isHTML5 ? (A(), a._a && (a._a.pause(), u = ha(a._a))) : 8 === m ? k._unload(a.id, "about:blank") : k._unload(a.id), f());
                return a
            };
            this.destruct = function(b) {
                a.isHTML5 ? (A(), a._a && (a._a.pause(), ha(a._a), z || K(), a._a._s = null, a._a = null)) : (a._iO.onfailure =
                    null, k._destroySound(a.id));
                b || c.destroySound(a.id, !0)
            };
            this.start = this.play = function(b, e) {
                var d, f, g, K, A;
                f = !0;
                f = null;
                e = e === h ? !0 : e;
                b || (b = {});
                a.url && (a._iO.url = a.url);
                a._iO = w(a._iO, a.options);
                a._iO = w(b, a._iO);
                a._iO.url = ea(a._iO.url);
                a.instanceOptions = a._iO;
                if (!a.isHTML5 && a._iO.serverURL && !a.connected) return a.getAutoPlay() || a.setAutoPlay(!0), a;
                ga(a._iO) && (a._setup_html5(a._iO), l());
                1 === a.playState && !a.paused && (d = a._iO.multiShot, d || (a.isHTML5 && a.setPosition(a._iO.position), f = a));
                if (null !== f) return f;
                b.url && b.url !== a.url && (!a.readyState && !a.isHTML5 && 8 === m && y ? y = !1 : a.load(a._iO));
                a.loaded || (0 === a.readyState ? (!a.isHTML5 && !c.html5Only ? (a._iO.autoPlay = !0, a.load(a._iO)) : a.isHTML5 ? a.load(a._iO) : f = a, a.instanceOptions = a._iO) : 2 === a.readyState && (f = a));
                if (null !== f) return f;
                !a.isHTML5 && (9 === m && 0 < a.position && a.position === a.duration) && (b.position = 0);
                if (a.paused && 0 <= a.position && (!a._iO.serverURL || 0 < a.position)) a.resume();
                else {
                    a._iO = w(b, a._iO);
                    if (null !== a._iO.from && null !== a._iO.to && 0 === a.instanceCount && 0 === a.playState &&
                        !a._iO.serverURL) {
                        d = function() {
                            a._iO = w(b, a._iO);
                            a.play(a._iO)
                        };
                        if (a.isHTML5 && !a._html5_canplay) a.load({
                            oncanplay: d
                        }), f = !1;
                        else if (!a.isHTML5 && !a.loaded && (!a.readyState || 2 !== a.readyState)) a.load({
                            onload: d
                        }), f = !1;
                        if (null !== f) return f;
                        a._iO = x()
                    }(!a.instanceCount || a._iO.multiShotEvents || a.isHTML5 && a._iO.multiShot && !z || !a.isHTML5 && 8 < m && !a.getAutoPlay()) && a.instanceCount++;
                    a._iO.onposition && 0 === a.playState && n(a);
                    a.playState = 1;
                    a.paused = !1;
                    a.position = a._iO.position !== h && !isNaN(a._iO.position) ? a._iO.position :
                        0;
                    a.isHTML5 || (a._iO = ca(ba(a._iO)));
                    a._iO.onplay && e && (a._iO.onplay.apply(a), r = !0);
                    a.setVolume(a._iO.volume, !0);
                    a.setPan(a._iO.pan, !0);
                    a.isHTML5 ? 2 > a.instanceCount ? (l(), f = a._setup_html5(), a.setPosition(a._iO.position), f.play()) : (g = new Audio(a._iO.url), K = function() {
                        t.remove(g, "onended", K);
                        a._onfinish(a);
                        ha(g);
                        g = null
                    }, A = function() {
                        t.remove(g, "canplay", A);
                        try {
                            g.currentTime = a._iO.position / 1E3
                        } catch (b) {}
                        g.play()
                    }, t.add(g, "ended", K), a._iO.position ? t.add(g, "canplay", A) : g.play()) : (f = k._start(a.id, a._iO.loops ||
                        1, 9 === m ? a.position : a.position / 1E3, a._iO.multiShot || !1), 9 === m && !f && a._iO.onplayerror && a._iO.onplayerror.apply(a))
                }
                return a
            };
            this.stop = function(b) {
                var c = a._iO;
                1 === a.playState && (a._onbufferchange(0), a._resetOnPosition(0), a.paused = !1, a.isHTML5 || (a.playState = 0), v(), c.to && a.clearOnPosition(c.to), a.isHTML5 ? a._a && (b = a.position, a.setPosition(0), a.position = b, a._a.pause(), a.playState = 0, a._onTimer(), A()) : (k._stop(a.id, b), c.serverURL && a.unload()), a.instanceCount = 0, a._iO = {}, c.onstop && c.onstop.apply(a));
                return a
            };
            this.setAutoPlay = function(b) {
                a._iO.autoPlay = b;
                a.isHTML5 || (k._setAutoPlay(a.id, b), b && !a.instanceCount && 1 === a.readyState && a.instanceCount++)
            };
            this.getAutoPlay = function() {
                return a._iO.autoPlay
            };
            this.setPosition = function(b) {
                b === h && (b = 0);
                var c = a.isHTML5 ? Math.max(b, 0) : Math.min(a.duration || a._iO.duration, Math.max(b, 0));
                a.position = c;
                b = a.position / 1E3;
                a._resetOnPosition(a.position);
                a._iO.position = c;
                if (a.isHTML5) {
                    if (a._a) {
                        if (a._html5_canplay) {
                            if (a._a.currentTime !== b) try {
                                a._a.currentTime = b, (0 === a.playState ||
                                    a.paused) && a._a.pause()
                            } catch (e) {}
                        } else if (b) return a;
                        a.paused && a._onTimer(!0)
                    }
                } else b = 9 === m ? a.position : b, a.readyState && 2 !== a.readyState && k._setPosition(a.id, b, a.paused || !a.playState, a._iO.multiShot);
                return a
            };
            this.pause = function(b) {
                if (a.paused || 0 === a.playState && 1 !== a.readyState) return a;
                a.paused = !0;
                a.isHTML5 ? (a._setup_html5().pause(), A()) : (b || b === h) && k._pause(a.id, a._iO.multiShot);
                a._iO.onpause && a._iO.onpause.apply(a);
                return a
            };
            this.resume = function() {
                var b = a._iO;
                if (!a.paused) return a;
                a.paused = !1;
                a.playState = 1;
                a.isHTML5 ? (a._setup_html5().play(), l()) : (b.isMovieStar && !b.serverURL && a.setPosition(a.position), k._pause(a.id, b.multiShot));
                !r && b.onplay ? (b.onplay.apply(a), r = !0) : b.onresume && b.onresume.apply(a);
                return a
            };
            this.togglePause = function() {
                if (0 === a.playState) return a.play({
                    position: 9 === m && !a.isHTML5 ? a.position : a.position / 1E3
                }), a;
                a.paused ? a.resume() : a.pause();
                return a
            };
            this.setPan = function(b, c) {
                b === h && (b = 0);
                c === h && (c = !1);
                a.isHTML5 || k._setPan(a.id, b);
                a._iO.pan = b;
                c || (a.pan = b, a.options.pan = b);
                return a
            };
            this.setVolume = function(b, e) {
                b === h && (b = 100);
                e === h && (e = !1);
                a.isHTML5 ? a._a && (a._a.volume = Math.max(0, Math.min(1, b / 100))) : k._setVolume(a.id, c.muted && !a.muted || a.muted ? 0 : b);
                a._iO.volume = b;
                e || (a.volume = b, a.options.volume = b);
                return a
            };
            this.mute = function() {
                a.muted = !0;
                a.isHTML5 ? a._a && (a._a.muted = !0) : k._setVolume(a.id, 0);
                return a
            };
            this.unmute = function() {
                a.muted = !1;
                var b = a._iO.volume !== h;
                a.isHTML5 ? a._a && (a._a.muted = !1) : k._setVolume(a.id, b ? a._iO.volume : a.options.volume);
                return a
            };
            this.toggleMute = function() {
                return a.muted ?
                    a.unmute() : a.mute()
            };
            this.onposition = this.onPosition = function(b, c, e) {
                p.push({
                    position: parseInt(b, 10),
                    method: c,
                    scope: e !== h ? e : a,
                    fired: !1
                });
                return a
            };
            this.clearOnPosition = function(a, b) {
                var c;
                a = parseInt(a, 10);
                if (isNaN(a)) return !1;
                for (c = 0; c < p.length; c++)
                    if (a === p[c].position && (!b || b === p[c].method)) p[c].fired && q--, p.splice(c, 1)
            };
            this._processOnPosition = function() {
                var b, c;
                b = p.length;
                if (!b || !a.playState || q >= b) return !1;
                for (b -= 1; 0 <= b; b--) c = p[b], !c.fired && a.position >= c.position && (c.fired = !0, q++, c.method.apply(c.scope, [c.position]));
                return !0
            };
            this._resetOnPosition = function(a) {
                var b, c;
                b = p.length;
                if (!b) return !1;
                for (b -= 1; 0 <= b; b--) c = p[b], c.fired && a <= c.position && (c.fired = !1, q--);
                return !0
            };
            x = function() {
                var b = a._iO,
                    c = b.from,
                    e = b.to,
                    d, f;
                f = function() {
                    a.clearOnPosition(e, f);
                    a.stop()
                };
                d = function() {
                    if (null !== e && !isNaN(e)) a.onPosition(e, f)
                };
                null !== c && !isNaN(c) && (b.position = c, b.multiShot = !1, d());
                return b
            };
            n = function() {
                var b, c = a._iO.onposition;
                if (c)
                    for (b in c)
                        if (c.hasOwnProperty(b)) a.onPosition(parseInt(b, 10), c[b])
            };
            v = function() {
                var b,
                    c = a._iO.onposition;
                if (c)
                    for (b in c) c.hasOwnProperty(b) && a.clearOnPosition(parseInt(b, 10))
            };
            l = function() {
                a.isHTML5 && Ra(a)
            };
            A = function() {
                a.isHTML5 && Sa(a)
            };
            f = function(b) {
                b || (p = [], q = 0);
                r = !1;
                a._hasTimer = null;
                a._a = null;
                a._html5_canplay = !1;
                a.bytesLoaded = null;
                a.bytesTotal = null;
                a.duration = a._iO && a._iO.duration ? a._iO.duration : null;
                a.durationEstimate = null;
                a.buffered = [];
                a.eqData = [];
                a.eqData.left = [];
                a.eqData.right = [];
                a.failures = 0;
                a.isBuffering = !1;
                a.instanceOptions = {};
                a.instanceCount = 0;
                a.loaded = !1;
                a.metadata = {};
                a.readyState = 0;
                a.muted = !1;
                a.paused = !1;
                a.peakData = {
                    left: 0,
                    right: 0
                };
                a.waveformData = {
                    left: [],
                    right: []
                };
                a.playState = 0;
                a.position = null;
                a.id3 = {}
            };
            f();
            this._onTimer = function(b) {
                var c, f = !1,
                    g = {};
                if (a._hasTimer || b) {
                    if (a._a && (b || (0 < a.playState || 1 === a.readyState) && !a.paused)) c = a._get_html5_duration(), c !== e && (e = c, a.duration = c, f = !0), a.durationEstimate = a.duration, c = 1E3 * a._a.currentTime || 0, c !== d && (d = c, f = !0), (f || b) && a._whileplaying(c, g, g, g, g);
                    return f
                }
            };
            this._get_html5_duration = function() {
                var b = a._iO;
                return (b = a._a &&
                    a._a.duration ? 1E3 * a._a.duration : b && b.duration ? b.duration : null) && !isNaN(b) && Infinity !== b ? b : null
            };
            this._apply_loop = function(a, b) {
                a.loop = 1 < b ? "loop" : ""
            };
            this._setup_html5 = function(b) {
                b = w(a._iO, b);
                var c = z ? Ka : a._a,
                    e = decodeURI(b.url),
                    d;
                z ? e === decodeURI(Ca) && (d = !0) : e === decodeURI(u) && (d = !0);
                if (c) {
                    if (c._s)
                        if (z) c._s && (c._s.playState && !d) && c._s.stop();
                        else if (!z && e === decodeURI(u)) return a._apply_loop(c, b.loops), c;
                    d || (f(!1), c.src = b.url, Ca = u = a.url = b.url, c._called_load = !1)
                } else a._a = b.autoLoad || b.autoPlay ? new Audio(b.url) :
                    Ea && 10 > opera.version() ? new Audio(null) : new Audio, c = a._a, c._called_load = !1, z && (Ka = c);
                a.isHTML5 = !0;
                a._a = c;
                c._s = a;
                g();
                a._apply_loop(c, b.loops);
                b.autoLoad || b.autoPlay ? a.load() : (c.autobuffer = !1, c.preload = "auto");
                return c
            };
            g = function() {
                if (a._a._added_events) return !1;
                var b;
                a._a._added_events = !0;
                for (b in B) B.hasOwnProperty(b) && a._a && a._a.addEventListener(b, B[b], !1);
                return !0
            };
            K = function() {
                var b;
                a._a._added_events = !1;
                for (b in B) B.hasOwnProperty(b) && a._a && a._a.removeEventListener(b, B[b], !1)
            };
            this._onload = function(b) {
                var c = !!b || !a.isHTML5 && 8 === m && a.duration;
                a.loaded = c;
                a.readyState = c ? 3 : 2;
                a._onbufferchange(0);
                a._iO.onload && ia(a, function() {
                    a._iO.onload.apply(a, [c])
                });
                return !0
            };
            this._onbufferchange = function(b) {
                if (0 === a.playState || b && a.isBuffering || !b && !a.isBuffering) return !1;
                a.isBuffering = 1 === b;
                a._iO.onbufferchange && a._iO.onbufferchange.apply(a);
                return !0
            };
            this._onsuspend = function() {
                a._iO.onsuspend && a._iO.onsuspend.apply(a);
                return !0
            };
            this._onfailure = function(b, c, e) {
                a.failures++;
                if (a._iO.onfailure && 1 === a.failures) a._iO.onfailure(a,
                    b, c, e)
            };
            this._onfinish = function() {
                var b = a._iO.onfinish;
                a._onbufferchange(0);
                a._resetOnPosition(0);
                a.instanceCount && (a.instanceCount--, a.instanceCount || (v(), a.playState = 0, a.paused = !1, a.instanceCount = 0, a.instanceOptions = {}, a._iO = {}, A(), a.isHTML5 && (a.position = 0)), (!a.instanceCount || a._iO.multiShotEvents) && b && ia(a, function() {
                    b.apply(a)
                }))
            };
            this._whileloading = function(b, c, e, d) {
                var f = a._iO;
                a.bytesLoaded = b;
                a.bytesTotal = c;
                a.duration = Math.floor(e);
                a.bufferLength = d;
                a.durationEstimate = !a.isHTML5 && !f.isMovieStar ?
                    f.duration ? a.duration > f.duration ? a.duration : f.duration : parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10) : a.duration;
                a.isHTML5 || (a.buffered = [{
                    start: 0,
                    end: a.duration
                }]);
                (3 !== a.readyState || a.isHTML5) && f.whileloading && f.whileloading.apply(a)
            };
            this._whileplaying = function(b, c, e, d, f) {
                var g = a._iO;
                if (isNaN(b) || null === b) return !1;
                a.position = Math.max(0, b);
                a._processOnPosition();
                !a.isHTML5 && 8 < m && (g.usePeakData && (c !== h && c) && (a.peakData = {
                    left: c.leftPeak,
                    right: c.rightPeak
                }), g.useWaveformData && (e !== h && e) && (a.waveformData = {
                    left: e.split(","),
                    right: d.split(",")
                }), g.useEQData && (f !== h && f && f.leftEQ) && (b = f.leftEQ.split(","), a.eqData = b, a.eqData.left = b, f.rightEQ !== h && f.rightEQ && (a.eqData.right = f.rightEQ.split(","))));
                1 === a.playState && (!a.isHTML5 && (8 === m && !a.position && a.isBuffering) && a._onbufferchange(0), g.whileplaying && g.whileplaying.apply(a));
                return !0
            };
            this._oncaptiondata = function(b) {
                a.captiondata = b;
                a._iO.oncaptiondata && a._iO.oncaptiondata.apply(a, [b])
            };
            this._onmetadata = function(b, c) {
                var e = {},
                    d, f;
                d = 0;
                for (f = b.length; d < f; d++) e[b[d]] =
                    c[d];
                a.metadata = e;
                a._iO.onmetadata && a._iO.onmetadata.apply(a)
            };
            this._onid3 = function(b, c) {
                var e = [],
                    d, f;
                d = 0;
                for (f = b.length; d < f; d++) e[b[d]] = c[d];
                a.id3 = w(a.id3, e);
                a._iO.onid3 && a._iO.onid3.apply(a)
            };
            this._onconnect = function(b) {
                b = 1 === b;
                if (a.connected = b) a.failures = 0, s(a.id) && (a.getAutoPlay() ? a.play(h, a.getAutoPlay()) : a._iO.autoLoad && a.load()), a._iO.onconnect && a._iO.onconnect.apply(a, [b])
            };
            this._ondataerror = function(b) {
                0 < a.playState && a._iO.ondataerror && a._iO.ondataerror.apply(a)
            }
        };
        va = function() {
            return n.body ||
                n._docElement || n.getElementsByTagName("div")[0]
        };
        X = function(b) {
            return n.getElementById(b)
        };
        w = function(b, e) {
            var d = b || {},
                a, f;
            a = e === h ? c.defaultOptions : e;
            for (f in a) a.hasOwnProperty(f) && d[f] === h && (d[f] = "object" !== typeof a[f] || null === a[f] ? a[f] : w(d[f], a[f]));
            return d
        };
        ia = function(b, c) {
            !b.isHTML5 && 8 === m ? l.setTimeout(c, 0) : c()
        };
        Y = {
            onready: 1,
            ontimeout: 1,
            defaultOptions: 1,
            flash9Options: 1,
            movieStarOptions: 1
        };
        pa = function(b, e) {
            var d, a = !0,
                f = e !== h,
                g = c.setupOptions;
            for (d in b)
                if (b.hasOwnProperty(d))
                    if ("object" !== typeof b[d] ||
                        null === b[d] || b[d] instanceof Array || b[d] instanceof RegExp) f && Y[e] !== h ? c[e][d] = b[d] : g[d] !== h ? (c.setupOptions[d] = b[d], c[d] = b[d]) : Y[d] === h ? a = !1 : c[d] instanceof Function ? c[d].apply(c, b[d] instanceof Array ? b[d] : [b[d]]) : c[d] = b[d];
                    else if (Y[d] === h) a = !1;
            else return pa(b[d], d);
            return a
        };
        t = function() {
            function b(a) {
                a = fb.call(a);
                var b = a.length;
                d ? (a[1] = "on" + a[1], 3 < b && a.pop()) : 3 === b && a.push(!1);
                return a
            }

            function c(b, e) {
                var h = b.shift(),
                    k = [a[e]];
                if (d) h[k](b[0], b[1]);
                else h[k].apply(h, b)
            }
            var d = l.attachEvent,
                a = {
                    add: d ?
                        "attachEvent" : "addEventListener",
                    remove: d ? "detachEvent" : "removeEventListener"
                };
            return {
                add: function() {
                    c(b(arguments), "add")
                },
                remove: function() {
                    c(b(arguments), "remove")
                }
            }
        }();
        B = {
            abort: r(function() {}),
            canplay: r(function() {
                var b = this._s,
                    c;
                if (b._html5_canplay) return !0;
                b._html5_canplay = !0;
                b._onbufferchange(0);
                c = b._iO.position !== h && !isNaN(b._iO.position) ? b._iO.position / 1E3 : null;
                if (b.position && this.currentTime !== c) try {
                    this.currentTime = c
                } catch (d) {}
                b._iO._oncanplay && b._iO._oncanplay()
            }),
            canplaythrough: r(function() {
                var b =
                    this._s;
                b.loaded || (b._onbufferchange(0), b._whileloading(b.bytesLoaded, b.bytesTotal, b._get_html5_duration()), b._onload(!0))
            }),
            ended: r(function() {
                this._s._onfinish()
            }),
            error: r(function() {
                this._s._onload(!1)
            }),
            loadeddata: r(function() {
                var b = this._s;
                !b._loaded && !ja && (b.duration = b._get_html5_duration())
            }),
            loadedmetadata: r(function() {}),
            loadstart: r(function() {
                this._s._onbufferchange(1)
            }),
            play: r(function() {
                this._s._onbufferchange(0)
            }),
            playing: r(function() {
                this._s._onbufferchange(0)
            }),
            progress: r(function(b) {
                var c =
                    this._s,
                    d, a, f = 0,
                    f = b.target.buffered;
                d = b.loaded || 0;
                var g = b.total || 1;
                c.buffered = [];
                if (f && f.length) {
                    d = 0;
                    for (a = f.length; d < a; d++) c.buffered.push({
                        start: 1E3 * f.start(d),
                        end: 1E3 * f.end(d)
                    });
                    f = 1E3 * (f.end(0) - f.start(0));
                    d = Math.min(1, f / (1E3 * b.target.duration))
                }
                isNaN(d) || (c._onbufferchange(0), c._whileloading(d, g, c._get_html5_duration()), d && (g && d === g) && B.canplaythrough.call(this, b))
            }),
            ratechange: r(function() {}),
            suspend: r(function(b) {
                var c = this._s;
                B.progress.call(this, b);
                c._onsuspend()
            }),
            stalled: r(function() {}),
            timeupdate: r(function() {
                this._s._onTimer()
            }),
            waiting: r(function() {
                this._s._onbufferchange(1)
            })
        };
        ga = function(b) {
            return !b || !b.type && !b.url && !b.serverURL ? !1 : b.serverURL || b.type && W(b.type) ? !1 : b.type ? T({
                type: b.type
            }) : T({
                url: b.url
            }) || c.html5Only || b.url.match(/data\:/i)
        };
        ha = function(b) {
            var c;
            b && (c = ja && !U ? null : hb ? "about:blank" : null, b.src = c, void 0 !== b._called_unload && (b._called_load = !1));
            z && (Ca = null);
            return c
        };
        T = function(b) {
            if (!c.useHTML5Audio || !c.hasHTML5) return !1;
            var e = b.url || null;
            b = b.type || null;
            var d = c.audioFormats,
                a;
            if (b && c.html5[b] !== h) return c.html5[b] && !W(b);
            if (!y) {
                y = [];
                for (a in d) d.hasOwnProperty(a) && (y.push(a), d[a].related && (y = y.concat(d[a].related)));
                y = RegExp("\\.(" + y.join("|") + ")(\\?.*)?$", "i")
            }
            a = e ? e.toLowerCase().match(y) : null;
            !a || !a.length ? b && (e = b.indexOf(";"), a = (-1 !== e ? b.substr(0, e) : b).substr(6)) : a = a[1];
            a && c.html5[a] !== h ? e = c.html5[a] && !W(a) : (b = "audio/" + a, e = c.html5.canPlayType({
                type: b
            }), e = (c.html5[a] = e) && c.html5[b] && !W(b));
            return e
        };
        Wa = function() {
            function b(a) {
                var b, d, f = b = !1;
                if (!e || "function" !== typeof e.canPlayType) return b;
                if (a instanceof Array) {
                    b = 0;
                    for (d = a.length; b < d; b++)
                        if (c.html5[a[b]] || e.canPlayType(a[b]).match(c.html5Test)) f = !0, c.html5[a[b]] = !0, c.flash[a[b]] = !!a[b].match(bb);
                    b = f
                } else a = e && "function" === typeof e.canPlayType ? e.canPlayType(a) : !1, b = !(!a || !a.match(c.html5Test));
                return b
            }
            if (!c.useHTML5Audio || !c.hasHTML5) return v = c.html5.usingFlash = !0, !1;
            var e = Audio !== h ? Ea && 10 > opera.version() ? new Audio(null) : new Audio : null,
                d, a, f = {},
                g;
            g = c.audioFormats;
            for (d in g)
                if (g.hasOwnProperty(d) && (a = "audio/" + d, f[d] = b(g[d].type), f[a] =
                        f[d], d.match(bb) ? (c.flash[d] = !0, c.flash[a] = !0) : (c.flash[d] = !1, c.flash[a] = !1), g[d] && g[d].related))
                    for (a = g[d].related.length - 1; 0 <= a; a--) f["audio/" + g[d].related[a]] = f[d], c.html5[g[d].related[a]] = f[d], c.flash[g[d].related[a]] = f[d];
            f.canPlayType = e ? b : null;
            c.html5 = w(c.html5, f);
            c.html5.usingFlash = Va();
            v = c.html5.usingFlash;
            return !0
        };
        sa = {};
        Q = function() {};
        ba = function(b) {
            8 === m && (1 < b.loops && b.stream) && (b.stream = !1);
            return b
        };
        ca = function(b, c) {
            if (b && !b.usePolicyFile && (b.onid3 || b.usePeakData || b.useWaveformData ||
                    b.useEQData)) b.usePolicyFile = !0;
            return b
        };
        ma = function() {
            return !1
        };
        Pa = function(b) {
            for (var c in b) b.hasOwnProperty(c) && "function" === typeof b[c] && (b[c] = ma)
        };
        xa = function(b) {
            b === h && (b = !1);
            (x || b) && c.disable(b)
        };
        Qa = function(b) {
            var e = null;
            if (b)
                if (b.match(/\.swf(\?.*)?$/i)) {
                    if (e = b.substr(b.toLowerCase().lastIndexOf(".swf?") + 4)) return b
                } else b.lastIndexOf("/") !== b.length - 1 && (b += "/");
            b = (b && -1 !== b.lastIndexOf("/") ? b.substr(0, b.lastIndexOf("/") + 1) : "./") + c.movieURL;
            c.noSWFCache && (b += "?ts\x3d" + (new Date).getTime());
            return b
        };
        ra = function() {
            m = parseInt(c.flashVersion, 10);
            8 !== m && 9 !== m && (c.flashVersion = m = 8);
            var b = c.debugMode || c.debugFlash ? "_debug.swf" : ".swf";
            c.useHTML5Audio && (!c.html5Only && c.audioFormats.mp4.required && 9 > m) && (c.flashVersion = m = 9);
            c.version = c.versionNumber + (c.html5Only ? " (HTML5-only mode)" : 9 === m ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            8 < m ? (c.defaultOptions = w(c.defaultOptions, c.flash9Options), c.features.buffering = !0, c.defaultOptions = w(c.defaultOptions, c.movieStarOptions), c.filePatterns.flash9 = RegExp("\\.(mp3|" +
                eb.join("|") + ")(\\?.*)?$", "i"), c.features.movieStar = !0) : c.features.movieStar = !1;
            c.filePattern = c.filePatterns[8 !== m ? "flash9" : "flash8"];
            c.movieURL = (8 === m ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", b);
            c.features.peakData = c.features.waveformData = c.features.eqData = 8 < m
        };
        Oa = function(b, c) {
            if (!k) return !1;
            k._setPolling(b, c)
        };
        wa = function() {};
        s = this.getSoundById;
        J = function() {
            var b = [];
            c.debugMode && b.push("sm2_debug");
            c.debugFlash && b.push("flash_debug");
            c.useHighPerformance && b.push("high_performance");
            return b.join(" ")
        };
        za = function() {
            Q("fbHandler");
            var b = c.getMoviePercent(),
                e = {
                    type: "FLASHBLOCK"
                };
            if (c.html5Only) return !1;
            c.ok() ? c.oMC && (c.oMC.className = [J(), "movieContainer", "swf_loaded" + (c.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (v && (c.oMC.className = J() + " movieContainer " + (null === b ? "swf_timedout" : "swf_error")), c.didFlashBlock = !0, E({
                type: "ontimeout",
                ignoreInit: !0,
                error: e
            }), I(e))
        };
        qa = function(b, c, d) {
            u[b] === h && (u[b] = []);
            u[b].push({
                method: c,
                scope: d || null,
                fired: !1
            })
        };
        E = function(b) {
            b || (b = {
                type: c.ok() ?
                    "onready" : "ontimeout"
            });
            if (!q && b && !b.ignoreInit || "ontimeout" === b.type && (c.ok() || x && !b.ignoreInit)) return !1;
            var e = {
                    success: b && b.ignoreInit ? c.ok() : !x
                },
                d = b && b.type ? u[b.type] || [] : [],
                a = [],
                f, e = [e],
                g = v && !c.ok();
            b.error && (e[0].error = b.error);
            b = 0;
            for (f = d.length; b < f; b++) !0 !== d[b].fired && a.push(d[b]);
            if (a.length) {
                b = 0;
                for (f = a.length; b < f; b++) a[b].scope ? a[b].method.apply(a[b].scope, e) : a[b].method.apply(this, e), g || (a[b].fired = !0)
            }
            return !0
        };
        F = function() {
            l.setTimeout(function() {
                c.useFlashBlock && za();
                E();
                "function" ===
                typeof c.onload && c.onload.apply(l);
                c.waitForWindowLoad && t.add(l, "load", F)
            }, 1)
        };
        Da = function() {
            if (D !== h) return D;
            var b = !1,
                c = navigator,
                d = c.plugins,
                a, f = l.ActiveXObject;
            if (d && d.length)(c = c.mimeTypes) && (c["application/x-shockwave-flash"] && c["application/x-shockwave-flash"].enabledPlugin && c["application/x-shockwave-flash"].enabledPlugin.description) && (b = !0);
            else if (f !== h && !p.match(/MSAppHost/i)) {
                try {
                    a = new f("ShockwaveFlash.ShockwaveFlash")
                } catch (g) {
                    a = null
                }
                b = !!a
            }
            return D = b
        };
        Va = function() {
            var b, e, d = c.audioFormats;
            if (U && p.match(/os (1|2|3_0|3_1)/i)) c.hasHTML5 = !1, c.html5Only = !0, c.oMC && (c.oMC.style.display = "none");
            else if (c.useHTML5Audio && (!c.html5 || !c.html5.canPlayType)) c.hasHTML5 = !1;
            if (c.useHTML5Audio && c.hasHTML5)
                for (e in fa = !0, d)
                    if (d.hasOwnProperty(e) && d[e].required)
                        if (c.html5.canPlayType(d[e].type)) {
                            if (c.preferFlash && (c.flash[e] || c.flash[d[e].type])) b = !0
                        } else fa = !1, b = !0;
            c.ignoreFlash && (b = !1, fa = !0);
            c.html5Only = c.hasHTML5 && c.useHTML5Audio && !b;
            return !c.html5Only
        };
        ea = function(b) {
            var e, d, a = 0;
            if (b instanceof Array) {
                e =
                    0;
                for (d = b.length; e < d; e++)
                    if (b[e] instanceof Object) {
                        if (c.canPlayMIME(b[e].type)) {
                            a = e;
                            break
                        }
                    } else if (c.canPlayURL(b[e])) {
                    a = e;
                    break
                }
                b[a].url && (b[a] = b[a].url);
                b = b[a]
            }
            return b
        };
        Ra = function(b) {
            b._hasTimer || (b._hasTimer = !0, !Fa && c.html5PollingInterval && (null === S && 0 === da && (S = setInterval(Ta, c.html5PollingInterval)), da++))
        };
        Sa = function(b) {
            b._hasTimer && (b._hasTimer = !1, !Fa && c.html5PollingInterval && da--)
        };
        Ta = function() {
            var b;
            if (null !== S && !da) return clearInterval(S), S = null, !1;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].isHTML5 &&
                c.sounds[c.soundIDs[b]]._hasTimer && c.sounds[c.soundIDs[b]]._onTimer()
        };
        I = function(b) {
            b = b !== h ? b : {};
            "function" === typeof c.onerror && c.onerror.apply(l, [{
                type: b.type !== h ? b.type : null
            }]);
            b.fatal !== h && b.fatal && c.disable()
        };
        Xa = function() {
            if (!$a || !Da()) return !1;
            var b = c.audioFormats,
                e, d;
            for (d in b)
                if (b.hasOwnProperty(d) && ("mp3" === d || "mp4" === d))
                    if (c.html5[d] = !1, b[d] && b[d].related)
                        for (e = b[d].related.length - 1; 0 <= e; e--) c.html5[b[d].related[e]] = !1
        };
        this._setSandboxType = function(b) {};
        this._externalInterfaceOK = function(b) {
            if (c.swfLoaded) return !1;
            c.swfLoaded = !0;
            ka = !1;
            $a && Xa();
            setTimeout(na, C ? 100 : 1)
        };
        aa = function(b, e) {
            function d(a, b) {
                return '\x3cparam name\x3d"' + a + '" value\x3d"' + b + '" /\x3e'
            }
            if (L && M) return !1;
            if (c.html5Only) return ra(), c.oMC = X(c.movieID), na(), M = L = !0, !1;
            var a = e || c.url,
                f = c.altURL || a,
                g = va(),
                k = J(),
                l = null,
                l = n.getElementsByTagName("html")[0],
                m, r, q, l = l && l.dir && l.dir.match(/rtl/i);
            b = b === h ? c.id : b;
            ra();
            c.url = Qa(Ha ? a : f);
            e = c.url;
            c.wmode = !c.wmode && c.useHighPerformance ? "transparent" : c.wmode;
            if (null !== c.wmode && (p.match(/msie 8/i) || !C && !c.useHighPerformance) &&
                navigator.platform.match(/win32|win64/i)) Ua.push(sa.spcWmode), c.wmode = null;
            g = {
                name: b,
                id: b,
                src: e,
                quality: "high",
                allowScriptAccess: c.allowScriptAccess,
                bgcolor: c.bgColor,
                pluginspage: cb + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: c.wmode,
                hasPriority: "true"
            };
            c.debugFlash && (g.FlashVars = "debug\x3d1");
            c.wmode || delete g.wmode;
            if (C) a = n.createElement("div"), r = ['\x3cobject id\x3d"' + b + '" data\x3d"' + e + '" type\x3d"' + g.type + '" title\x3d"' +
                g.title + '" classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase\x3d"' + cb + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version\x3d6,0,40,0"\x3e', d("movie", e), d("AllowScriptAccess", c.allowScriptAccess), d("quality", g.quality), c.wmode ? d("wmode", c.wmode) : "", d("bgcolor", c.bgColor), d("hasPriority", "true"), c.debugFlash ? d("FlashVars", g.FlashVars) : "", "\x3c/object\x3e"
            ].join("");
            else
                for (m in a = n.createElement("embed"), g) g.hasOwnProperty(m) && a.setAttribute(m, g[m]);
            wa();
            k = J();
            if (g =
                va())
                if (c.oMC = X(c.movieID) || n.createElement("div"), c.oMC.id) q = c.oMC.className, c.oMC.className = (q ? q + " " : "movieContainer") + (k ? " " + k : ""), c.oMC.appendChild(a), C && (m = c.oMC.appendChild(n.createElement("div")), m.className = "sm2-object-box", m.innerHTML = r), M = !0;
                else {
                    c.oMC.id = c.movieID;
                    c.oMC.className = "movieContainer " + k;
                    m = k = null;
                    c.useFlashBlock || (c.useHighPerformance ? k = {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    } : (k = {
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        top: "-9999px",
                        left: "-9999px"
                    }, l && (k.left = Math.abs(parseInt(k.left, 10)) + "px")));
                    gb && (c.oMC.style.zIndex = 1E4);
                    if (!c.debugFlash)
                        for (q in k) k.hasOwnProperty(q) && (c.oMC.style[q] = k[q]);
                    try {
                        C || c.oMC.appendChild(a), g.appendChild(c.oMC), C && (m = c.oMC.appendChild(n.createElement("div")), m.className = "sm2-object-box", m.innerHTML = r), M = !0
                    } catch (s) {
                        throw Error(Q("domError") + " \n" + s.toString());
                    }
                }
            return L = !0
        };
        $ = function() {
            if (c.html5Only) return aa(), !1;
            if (k || !c.url) return !1;
            k = c.getMovie(c.id);
            k || (P ? (C ? c.oMC.innerHTML = ya : c.oMC.appendChild(P),
                P = null, L = !0) : aa(c.id, c.url), k = c.getMovie(c.id));
            "function" === typeof c.oninitmovie && setTimeout(c.oninitmovie, 1);
            return !0
        };
        G = function() {
            setTimeout(Na, 1E3)
        };
        Na = function() {
            var b, e = !1;
            if (!c.url || R) return !1;
            R = !0;
            t.remove(l, "load", G);
            if (ka && !Ga) return !1;
            q || (b = c.getMoviePercent(), 0 < b && 100 > b && (e = !0));
            setTimeout(function() {
                b = c.getMoviePercent();
                if (e) return R = !1, l.setTimeout(G, 1), !1;
                !q && ab && (null === b ? c.useFlashBlock || 0 === c.flashLoadTimeout ? c.useFlashBlock && za() : !c.useFlashBlock && fa ? l.setTimeout(function() {
                    c.setup({
                        preferFlash: !1
                    }).reboot();
                    c.didFlashBlock = !0;
                    c.beginDelayedInit()
                }, 1) : E({
                    type: "ontimeout",
                    ignoreInit: !0
                }) : 0 !== c.flashLoadTimeout && xa(!0))
            }, c.flashLoadTimeout)
        };
        Z = function() {
            if (Ga || !ka) return t.remove(l, "focus", Z), !0;
            Ga = ab = !0;
            R = !1;
            G();
            t.remove(l, "focus", Z);
            return !0
        };
        N = function(b) {
            if (q) return !1;
            if (c.html5Only) return q = !0, F(), !0;
            var e = !0,
                d;
            if (!c.useFlashBlock || !c.flashLoadTimeout || c.getMoviePercent()) q = !0, x && (d = {
                type: !D && v ? "NO_FLASH" : "INIT_TIMEOUT"
            });
            if (x || b) c.useFlashBlock && c.oMC && (c.oMC.className = J() + " " + (null === c.getMoviePercent() ?
                "swf_timedout" : "swf_error")), E({
                type: "ontimeout",
                error: d,
                ignoreInit: !0
            }), I(d), e = !1;
            x || (c.waitForWindowLoad && !oa ? t.add(l, "load", F) : F());
            return e
        };
        Ma = function() {
            var b, e = c.setupOptions;
            for (b in e) e.hasOwnProperty(b) && (c[b] === h ? c[b] = e[b] : c[b] !== e[b] && (c.setupOptions[b] = c[b]))
        };
        na = function() {
            if (q) return !1;
            if (c.html5Only) return q || (t.remove(l, "load", c.beginDelayedInit), c.enabled = !0, N()), !0;
            $();
            try {
                k._externalInterfaceTest(!1), Oa(!0, c.flashPollingInterval || (c.useHighPerformance ? 10 : 50)), c.debugMode || k._disableDebug(),
                    c.enabled = !0, c.html5Only || t.add(l, "unload", ma)
            } catch (b) {
                return I({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }), xa(!0), N(), !1
            }
            N();
            t.remove(l, "load", c.beginDelayedInit);
            return !0
        };
        H = function() {
            if (O) return !1;
            O = !0;
            Ma();
            wa();
            !D && c.hasHTML5 && c.setup({
                useHTML5Audio: !0,
                preferFlash: !1
            });
            Wa();
            !D && v && (Ua.push(sa.needFlash), c.setup({
                flashLoadTimeout: 1
            }));
            n.removeEventListener && n.removeEventListener("DOMContentLoaded", H, !1);
            $();
            return !0
        };
        Ba = function() {
            "complete" === n.readyState && (H(), n.detachEvent("onreadystatechange",
                Ba));
            return !0
        };
        ua = function() {
            oa = !0;
            t.remove(l, "load", ua)
        };
        ta = function() {
            if (Fa && (c.setupOptions.useHTML5Audio = !0, c.setupOptions.preferFlash = !1, U || Za && !p.match(/android\s2\.3/i))) U && (c.ignoreFlash = !0), z = !0
        };
        ta();
        Da();
        t.add(l, "focus", Z);
        t.add(l, "load", G);
        t.add(l, "load", ua);
        n.addEventListener ? n.addEventListener("DOMContentLoaded", H, !1) : n.attachEvent ? n.attachEvent("onreadystatechange", Ba) : I({
            type: "NO_DOM2_EVENTS",
            fatal: !0
        })
    }
    var la = null;
    if (void 0 === l.SM2_DEFER || !SM2_DEFER) la = new V;
    l.SoundManager = V;
    l.soundManager =
        la
})(window);