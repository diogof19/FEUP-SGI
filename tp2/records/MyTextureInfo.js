/**
 * MyTextureInfo
 * @constructor
 * @param {String} textureId - Texture ID
 * @param {Number} lengthS - Texture length in the s axis
 * @param {Number} lengthT - Texture length in the t axis
 */
export class MyTextureInfo {
    constructor(textureId, lengthS, lengthT) {
        this.textureId = textureId;
        this.lengthS = lengthS;
        this.lengthT = lengthT;
    }
}