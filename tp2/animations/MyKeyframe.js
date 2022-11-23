/**
 * Keyframe class
 * @constructor
 * @param {Number} instant - Instant of the keyframe
 * @param {vec3} translation - Translation vector
 * @param {Number} rotation_x - Rotation around the x axis
 * @param {Number} rotation_y - Rotation around the y axis
 * @param {Number} rotation_z - Rotation around the z axis
 * @param {vec3} scale - Scale vector
 */
export class MyKeyframe {
    constructor(instant, translation, rotation_x, rotation_y, rotation_z, scale){
        this.instant = instant;
        this.translation = translation;
        this.rotation_x = rotation_x;
        this.rotation_y = rotation_y;
        this.rotation_z = rotation_z;
        this.scale = scale;
    }
}