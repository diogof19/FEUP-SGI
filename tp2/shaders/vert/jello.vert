attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
attribute mat4 aPMatrix;
attribute mat4 aMVMatrix;

uniform float uHighlightScale;
uniform float uTimeFactor;

varying vec2 vTextureCoord;
varying float vTimeFactor;

void main() {
    vec3 normal = normalize(aVertexNormal);
    vec3 position = aVertexPosition + normal * uHighlightScale * (sin(uTimeFactor / 60.0) + 1.0) / 2.0;
    gl_Position = aPMatrix * aMVMatrix * vec4(position, 1.0);
    vTextureCoord = aTextureCoord;
    vTimeFactor = uTimeFactor;
}