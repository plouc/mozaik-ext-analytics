const noop = function(){};

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.SVGPathSegClosePath = noop;
global.SVGPathSegMovetoAbs = noop;
global.SVGPathSeg = noop;
global.SVGPathSegMovetoRel = noop;
global.SVGPathSegLinetoAbs = noop;
global.SVGPathSegLinetoRel = noop;
global.SVGPathSegCurvetoCubicAbs = noop;
global.SVGPathSegCurvetoCubicRel = noop;
global.SVGPathSegCurvetoQuadraticAbs = noop;
global.SVGPathSegCurvetoQuadraticRel = noop;
global.SVGPathSegArcAbs = noop;
global.SVGPathSegArcRel = noop;
global.SVGPathSegLinetoHorizontalAbs = noop;
global.SVGPathSegLinetoHorizontalRel = noop;
global.SVGPathSegLinetoVerticalAbs = noop;
global.SVGPathSegLinetoVerticalRel = noop;
global.SVGPathSegCurvetoCubicSmoothAbs = noop;
global.SVGPathSegCurvetoCubicSmoothRel = noop;
global.SVGPathSegCurvetoQuadraticSmoothAbs = noop;
global.SVGPathSegCurvetoQuadraticSmoothRel = noop;
global.SVGPathElement = noop;
global.SVGPathSegList = noop;
