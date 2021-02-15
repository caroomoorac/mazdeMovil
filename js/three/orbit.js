(THREE.OrbitControls = function (e, t) {
    var o, n, a, i, c;
    void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
        t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
        (this.object = e),
        (this.domElement = t),
        (this.enabled = !0),
        (this.target = new THREE.Vector3()),
        (this.minDistance = 0),
        (this.maxDistance = 1 / 0),
        (this.minZoom = 0),
        (this.maxZoom = 1 / 0),
        (this.minPolarAngle = 0),
        (this.maxPolarAngle = Math.PI),
        (this.minAzimuthAngle = -1 / 0),
        (this.maxAzimuthAngle = 1 / 0),
        (this.enableDamping = !1),
        (this.dampingFactor = 0.05),
        (this.enableZoom = !0),
        (this.zoomSpeed = 1),
        (this.enableRotate = !0),
        (this.rotateSpeed = 1),
        (this.enablePan = !0),
        (this.panSpeed = 1),
        (this.screenSpacePanning = !1),
        (this.keyPanSpeed = 7),
        (this.autoRotate = !1),
        (this.autoRotateSpeed = 2),
        (this.enableKeys = !0),
        (this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 }),
        (this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }),
        (this.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }),
        (this.target0 = this.target.clone()),
        (this.position0 = this.object.position.clone()),
        (this.zoom0 = this.object.zoom),
        (this.getPolarAngle = function () {
            return p.phi;
        }),
        (this.getAzimuthalAngle = function () {
            return p.theta;
        }),
        (this.saveState = function () {
            s.target0.copy(s.target), s.position0.copy(s.object.position), (s.zoom0 = s.object.zoom);
        }),
        (this.reset = function () {
            s.target.copy(s.target0), s.object.position.copy(s.position0), (s.object.zoom = s.zoom0), s.object.updateProjectionMatrix(), s.dispatchEvent(r), s.update(), (E = m.NONE);
        }),
        (this.update =
            ((o = new THREE.Vector3()),
            (n = new THREE.Quaternion().setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0))),
            (a = n.clone().inverse()),
            (i = new THREE.Vector3()),
            (c = new THREE.Quaternion()),
            function () {
                var e = s.object.position;
                return (
                    o.copy(e).sub(s.target),
                    o.applyQuaternion(n),
                    p.setFromVector3(o),
                    s.autoRotate && E === m.NONE && j(((2 * Math.PI) / 60 / 60) * s.autoRotateSpeed),
                    s.enableDamping ? ((p.theta += d.theta * s.dampingFactor), (p.phi += d.phi * s.dampingFactor)) : ((p.theta += d.theta), (p.phi += d.phi)),
                    (p.theta = Math.max(s.minAzimuthAngle, Math.min(s.maxAzimuthAngle, p.theta))),
                    (p.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, p.phi))),
                    p.makeSafe(),
                    (p.radius *= b),
                    (p.radius = Math.max(s.minDistance, Math.min(s.maxDistance, p.radius))),
                    !0 === s.enableDamping ? s.target.addScaledVector(T, s.dampingFactor) : s.target.add(T),
                    o.setFromSpherical(p),
                    o.applyQuaternion(a),
                    e.copy(s.target).add(o),
                    s.object.lookAt(s.target),
                    !0 === s.enableDamping ? ((d.theta *= 1 - s.dampingFactor), (d.phi *= 1 - s.dampingFactor), T.multiplyScalar(1 - s.dampingFactor)) : (d.set(0, 0, 0), T.set(0, 0, 0)),
                    (b = 1),
                    !!(O || i.distanceToSquared(s.object.position) > h || 8 * (1 - c.dot(s.object.quaternion)) > h) && (s.dispatchEvent(r), i.copy(s.object.position), c.copy(s.object.quaternion), (O = !1), !0)
                );
            })),
        (this.dispose = function () {
            s.domElement.removeEventListener("contextmenu", $, !1),
                s.domElement.removeEventListener("mousedown", F, !1),
                s.domElement.removeEventListener("wheel", K, !1),
                s.domElement.removeEventListener("touchstart", q, !1),
                s.domElement.removeEventListener("touchend", J, !1),
                s.domElement.removeEventListener("touchmove", Q, !1),
                document.removeEventListener("mousemove", B, !1),
                document.removeEventListener("mouseup", G, !1),
                s.domElement.removeEventListener("keydown", W, !1);
        });
    var s = this,
        r = { type: "change" },
        u = { type: "start" },
        l = { type: "end" },
        m = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_PAN: 4, TOUCH_DOLLY_PAN: 5, TOUCH_DOLLY_ROTATE: 6 },
        E = m.NONE,
        h = 1e-6,
        p = new THREE.Spherical(),
        d = new THREE.Spherical(),
        b = 1,
        T = new THREE.Vector3(),
        O = !1,
        f = new THREE.Vector2(),
        g = new THREE.Vector2(),
        R = new THREE.Vector2(),
        H = new THREE.Vector2(),
        v = new THREE.Vector2(),
        y = new THREE.Vector2(),
        P = new THREE.Vector2(),
        L = new THREE.Vector2(),
        A = new THREE.Vector2();
    function N() {
        return Math.pow(0.95, s.zoomSpeed);
    }
    function j(e) {
        d.theta -= e;
    }
    function w(e) {
        d.phi -= e;
    }
    var C,
        M =
            ((C = new THREE.Vector3()),
            function (e, t) {
                C.setFromMatrixColumn(t, 0), C.multiplyScalar(-e), T.add(C);
            }),
        S = (function () {
            var e = new THREE.Vector3();
            return function (t, o) {
                !0 === s.screenSpacePanning ? e.setFromMatrixColumn(o, 1) : (e.setFromMatrixColumn(o, 0), e.crossVectors(s.object.up, e)), e.multiplyScalar(t), T.add(e);
            };
        })(),
        k = (function () {
            var e = new THREE.Vector3();
            return function (t, o) {
                var n = s.domElement;
                if (s.object.isPerspectiveCamera) {
                    var a = s.object.position;
                    e.copy(a).sub(s.target);
                    var i = e.length();
                    (i *= Math.tan(((s.object.fov / 2) * Math.PI) / 180)), M((2 * t * i) / n.clientHeight, s.object.matrix), S((2 * o * i) / n.clientHeight, s.object.matrix);
                } else
                    s.object.isOrthographicCamera
                        ? (M((t * (s.object.right - s.object.left)) / s.object.zoom / n.clientWidth, s.object.matrix), S((o * (s.object.top - s.object.bottom)) / s.object.zoom / n.clientHeight, s.object.matrix))
                        : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), (s.enablePan = !1));
            };
        })();
    function Y(e) {
        s.object.isPerspectiveCamera
            ? (b /= e)
            : s.object.isOrthographicCamera
            ? ((s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * e))), s.object.updateProjectionMatrix(), (O = !0))
            : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (s.enableZoom = !1));
    }
    function D(e) {
        s.object.isPerspectiveCamera
            ? (b *= e)
            : s.object.isOrthographicCamera
            ? ((s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / e))), s.object.updateProjectionMatrix(), (O = !0))
            : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), (s.enableZoom = !1));
    }
    function x(e) {
        f.set(e.clientX, e.clientY);
    }
    function U(e) {
        H.set(e.clientX, e.clientY);
    }
    function V(e) {
        if (1 == e.touches.length) f.set(e.touches[0].pageX, e.touches[0].pageY);
        else {
            var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
            f.set(t, o);
        }
    }
    function z(e) {
        if (1 == e.touches.length) H.set(e.touches[0].pageX, e.touches[0].pageY);
        else {
            var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
            H.set(t, o);
        }
    }
    function X(e) {
        var t = e.touches[0].pageX - e.touches[1].pageX,
            o = e.touches[0].pageY - e.touches[1].pageY,
            n = Math.sqrt(t * t + o * o);
        P.set(0, n);
    }
    function _(e) {
        if (1 == e.touches.length) g.set(e.touches[0].pageX, e.touches[0].pageY);
        else {
            var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
            g.set(t, o);
        }
        R.subVectors(g, f).multiplyScalar(s.rotateSpeed);
        var n = s.domElement;
        j((2 * Math.PI * R.x) / n.clientHeight), w((2 * Math.PI * R.y) / n.clientHeight), f.copy(g);
    }
    function Z(e) {
        if (1 == e.touches.length) v.set(e.touches[0].pageX, e.touches[0].pageY);
        else {
            var t = 0.5 * (e.touches[0].pageX + e.touches[1].pageX),
                o = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
            v.set(t, o);
        }
        y.subVectors(v, H).multiplyScalar(s.panSpeed), k(y.x, y.y), H.copy(v);
    }
    function I(e) {
        var t = e.touches[0].pageX - e.touches[1].pageX,
            o = e.touches[0].pageY - e.touches[1].pageY,
            n = Math.sqrt(t * t + o * o);
        L.set(0, n), A.set(0, Math.pow(L.y / P.y, s.zoomSpeed)), Y(A.y), P.copy(L);
    }
    function F(e) {
        if (!1 !== s.enabled) {
            var t;
            switch ((e.preventDefault(), s.domElement.focus ? s.domElement.focus() : window.focus(), e.button)) {
                case 0:
                    t = s.mouseButtons.LEFT;
                    break;
                case 1:
                    t = s.mouseButtons.MIDDLE;
                    break;
                case 2:
                    t = s.mouseButtons.RIGHT;
                    break;
                default:
                    t = -1;
            }
            switch (t) {
                case THREE.MOUSE.DOLLY:
                    if (!1 === s.enableZoom) return;
                    !(function (e) {
                        P.set(e.clientX, e.clientY);
                    })(e),
                        (E = m.DOLLY);
                    break;
                case THREE.MOUSE.ROTATE:
                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                        if (!1 === s.enablePan) return;
                        U(e), (E = m.PAN);
                    } else {
                        if (!1 === s.enableRotate) return;
                        x(e), (E = m.ROTATE);
                    }
                    break;
                case THREE.MOUSE.PAN:
                    if (e.ctrlKey || e.metaKey || e.shiftKey) {
                        if (!1 === s.enableRotate) return;
                        x(e), (E = m.ROTATE);
                    } else {
                        if (!1 === s.enablePan) return;
                        U(e), (E = m.PAN);
                    }
                    break;
                default:
                    E = m.NONE;
            }
            E !== m.NONE && (document.addEventListener("mousemove", B, !1), document.addEventListener("mouseup", G, !1), s.dispatchEvent(u));
        }
    }
    function B(e) {
        if (!1 !== s.enabled)
            switch ((e.preventDefault(), E)) {
                case m.ROTATE:
                    if (!1 === s.enableRotate) return;
                    !(function (e) {
                        g.set(e.clientX, e.clientY), R.subVectors(g, f).multiplyScalar(s.rotateSpeed);
                        var t = s.domElement;
                        j((2 * Math.PI * R.x) / t.clientHeight), w((2 * Math.PI * R.y) / t.clientHeight), f.copy(g), s.update();
                    })(e);
                    break;
                case m.DOLLY:
                    if (!1 === s.enableZoom) return;
                    !(function (e) {
                        L.set(e.clientX, e.clientY), A.subVectors(L, P), A.y > 0 ? Y(N()) : A.y < 0 && D(N()), P.copy(L), s.update();
                    })(e);
                    break;
                case m.PAN:
                    if (!1 === s.enablePan) return;
                    !(function (e) {
                        v.set(e.clientX, e.clientY), y.subVectors(v, H).multiplyScalar(s.panSpeed), k(y.x, y.y), H.copy(v), s.update();
                    })(e);
            }
    }
    function G(e) {
        !1 !== s.enabled && (document.removeEventListener("mousemove", B, !1), document.removeEventListener("mouseup", G, !1), s.dispatchEvent(l), (E = m.NONE));
    }
    function K(e) {
        !1 === s.enabled ||
            !1 === s.enableZoom ||
            (E !== m.NONE && E !== m.ROTATE) ||
            (e.preventDefault(),
            e.stopPropagation(),
            s.dispatchEvent(u),
            (function (e) {
                e.deltaY < 0 ? D(N()) : e.deltaY > 0 && Y(N()), s.update();
            })(e),
            s.dispatchEvent(l));
    }
    function W(e) {
        !1 !== s.enabled &&
            !1 !== s.enableKeys &&
            !1 !== s.enablePan &&
            (function (e) {
                var t = !1;
                switch (e.keyCode) {
                    case s.keys.UP:
                        k(0, s.keyPanSpeed), (t = !0);
                        break;
                    case s.keys.BOTTOM:
                        k(0, -s.keyPanSpeed), (t = !0);
                        break;
                    case s.keys.LEFT:
                        k(s.keyPanSpeed, 0), (t = !0);
                        break;
                    case s.keys.RIGHT:
                        k(-s.keyPanSpeed, 0), (t = !0);
                }
                t && (e.preventDefault(), s.update());
            })(e);
    }
    function q(e) {
        if (!1 !== s.enabled) {
            switch ((e.preventDefault(), e.touches.length)) {
                case 1:
                    switch (s.touches.ONE) {
                        case THREE.TOUCH.ROTATE:
                            if (!1 === s.enableRotate) return;
                            V(e), (E = m.TOUCH_ROTATE);
                            break;
                        case THREE.TOUCH.PAN:
                            if (!1 === s.enablePan) return;
                            z(e), (E = m.TOUCH_PAN);
                            break;
                        default:
                            E = m.NONE;
                    }
                    break;
                case 2:
                    switch (s.touches.TWO) {
                        case THREE.TOUCH.DOLLY_PAN:
                            if (!1 === s.enableZoom && !1 === s.enablePan) return;
                            !(function (e) {
                                s.enableZoom && X(e), s.enablePan && z(e);
                            })(e),
                                (E = m.TOUCH_DOLLY_PAN);
                            break;
                        case THREE.TOUCH.DOLLY_ROTATE:
                            if (!1 === s.enableZoom && !1 === s.enableRotate) return;
                            !(function (e) {
                                s.enableZoom && X(e), s.enableRotate && V(e);
                            })(e),
                                (E = m.TOUCH_DOLLY_ROTATE);
                            break;
                        default:
                            E = m.NONE;
                    }
                    break;
                default:
                    E = m.NONE;
            }
            E !== m.NONE && s.dispatchEvent(u);
        }
    }
    function Q(e) {
        if (!1 !== s.enabled)
            switch ((e.preventDefault(), e.stopPropagation(), E)) {
                case m.TOUCH_ROTATE:
                    if (!1 === s.enableRotate) return;
                    _(e), s.update();
                    break;
                case m.TOUCH_PAN:
                    if (!1 === s.enablePan) return;
                    Z(e), s.update();
                    break;
                case m.TOUCH_DOLLY_PAN:
                    if (!1 === s.enableZoom && !1 === s.enablePan) return;
                    !(function (e) {
                        s.enableZoom && I(e), s.enablePan && Z(e);
                    })(e),
                        s.update();
                    break;
                case m.TOUCH_DOLLY_ROTATE:
                    if (!1 === s.enableZoom && !1 === s.enableRotate) return;
                    !(function (e) {
                        s.enableZoom && I(e), s.enableRotate && _(e);
                    })(e),
                        s.update();
                    break;
                default:
                    E = m.NONE;
            }
    }
    function J(e) {
        !1 !== s.enabled && (s.dispatchEvent(l), (E = m.NONE));
    }
    function $(e) {
        !1 !== s.enabled && e.preventDefault();
    }
    s.domElement.addEventListener("contextmenu", $, !1),
        s.domElement.addEventListener("mousedown", F, !1),
        s.domElement.addEventListener("wheel", K, !1),
        s.domElement.addEventListener("touchstart", q, !1),
        s.domElement.addEventListener("touchend", J, !1),
        s.domElement.addEventListener("touchmove", Q, !1),
        s.domElement.addEventListener("keydown", W, !1),
        -1 === s.domElement.tabIndex && (s.domElement.tabIndex = 0),
        this.update();
}),
    (THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype)),
    (THREE.OrbitControls.prototype.constructor = THREE.OrbitControls),
    (THREE.MapControls = function (e, t) {
        THREE.OrbitControls.call(this, e, t), (this.mouseButtons.LEFT = THREE.MOUSE.PAN), (this.mouseButtons.RIGHT = THREE.MOUSE.ROTATE), (this.touches.ONE = THREE.TOUCH.PAN), (this.touches.TWO = THREE.TOUCH.DOLLY_ROTATE);
    }),
    (THREE.MapControls.prototype = Object.create(THREE.EventDispatcher.prototype)),
    (THREE.MapControls.prototype.constructor = THREE.MapControls);