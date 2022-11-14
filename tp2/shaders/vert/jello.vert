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

void main() {
    vec3 normal = normalize(aVertexNormal);
    vec3 position = aVertexPosition + normal * uHighlightScale * uTimeFactor;

    vTextureCoord = aTextureCoord;

    gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
}