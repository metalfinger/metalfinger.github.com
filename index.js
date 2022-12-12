//glsl canvas
var options = {
    backgroundColor: 'rgba(0.0, 0.0, 0.0, 0.0)',
    alpha: true,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    extensions: [],
    doubleSided: false,
};

var canvas = document.querySelector('.glsl-canvas');
var glsl = new glsl.Canvas(canvas, options);
glsl.setUniforms({
    color1: [4, 18, 11],
    color2: [12, 47, 29],
    color3: [15, 100, 58],
    color4: [19, 86, 53]
});

glsl.on('render', function() {

});