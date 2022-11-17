#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float uHighlightScale;
uniform float uTimeFactor;
uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying float vTimeFactor;

void main() {
    vec3 normal = normalize(aVertexNormal);
    vec3 position = aVertexPosition + normal * (uHighlightScale - 1.0) * (sin((uTimeFactor) * 2.0 * 3.1415) + 1.0) / 2.0;

    vTextureCoord = aTextureCoord;
    vTimeFactor = uTimeFactor;

    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}