/**
 * MyHighlightInfo
 * @constructor
 * @param {boolean} highlight - True if highlighted, false otherwise
 * @param {vec3} color - Highlight color
 * @param {Number} scale - Highlight scale
 */
export class MyHighlightInfo {
    constructor(highlight, color, scale) {
        this.highlight = highlight;
        this.color = color;
        this.scale = scale;
    }
}