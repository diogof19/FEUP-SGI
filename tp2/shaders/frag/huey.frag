#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform vec3 uHighlightColor;

varying vec2 vTextureCoord;
varying float vTimeFactor;

void main() {
    vec3 objectColor = texture2D(uSampler, vTextureCoord).xyz;

    vec3 highlightColor = uHighlightColor;

    vec3 mixedColor = mix(objectColor, highlightColor, (sin(vTimeFactor / 60.0) + 1.0) / 2.0);

    gl_FragColor = vec4(mixedColor, 1.0);
}
