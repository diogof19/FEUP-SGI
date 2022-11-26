#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uSampler;
uniform vec3 uHighlightColor;
uniform vec3 uMaterialColor;

varying vec2 vTextureCoord;
varying float vTimeFactor;

void main() {
    vec3 objectColor = texture2D(uSampler, vTextureCoord).rgb;;

    // If the object has no texture use the provided material color
    if (uMaterialColor != vec3(-1.0, -1.0, -1.0)) {
        objectColor = uMaterialColor;
    }

    vec3 highlightColor = uHighlightColor;

    vec3 mixedColor = mix(objectColor, highlightColor, 1.0 - vTimeFactor);

    gl_FragColor = vec4(mixedColor, 1.0);
}
