#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform vec3 uHighlightColor;
uniform float uTimeFactor;

varying vec2 vTextureCoord;

void main() {
    vec3 objectColor = texture2D(uSampler, vTextureCoord).xyz;

    vec3 highlightColor = uHighlightColor;

    vec3 mixedColor = mix(objectColor, highlightColor, uTimeFactor);

    gl_FragColor = vec4(mixedColor, 1.0);
}
