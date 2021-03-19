import { WIDTH, HEIGHT } from '../';
import { KEYS, KEY_WIDTH, KEY_HEIGHT, KEYBOARD_H, KEY_X_SPACE, KEY_Y_SPACE, KEY_SCALE_FACTOR } from '../utils/constants';

class Keyboard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.keys = {};

    let x = WIDTH / 2 - (((KEY_WIDTH + KEY_X_SPACE) * KEY_SCALE_FACTOR) * 4) - (((KEY_WIDTH + KEY_X_SPACE) * KEY_SCALE_FACTOR) / 2);
    let y = config.y - ((KEY_HEIGHT + KEY_Y_SPACE) * KEY_SCALE_FACTOR);

    const c1 = this.scene.make.image({ key: 'keyboard_container', x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR, scale: KEY_SCALE_FACTOR });
    console.log(c1);
    this.scene.make.image({ key: 'keyboard_background', x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR, scale: KEY_SCALE_FACTOR });
    this.scene.make.image({ key: 'keyboard_outline', x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR, scale: KEY_SCALE_FACTOR });

    for (let i = 0; i < KEYS.length; i++) {
      for (let j = 0; j < KEYS[i].length; j++) {
        const key = KEYS[i][j];
        this.keys[`${key.toLocaleLowerCase()}-key`] = this.scene.make.image({
          key: 'keyboard',
          frame: `${key}_key.png`,
          x: x,
          y: y,
          scale: KEY_SCALE_FACTOR,
        });
        x += (KEY_WIDTH + KEY_X_SPACE) * KEY_SCALE_FACTOR;
      }
      if (i === 0) {
        x = WIDTH / 2 - (((KEY_WIDTH + KEY_X_SPACE) * KEY_SCALE_FACTOR) * 4);
      }
      else if (i === 1) {
        x = WIDTH / 2 - (((KEY_WIDTH + KEY_X_SPACE) * KEY_SCALE_FACTOR) * 3);
      }
      y += (KEY_HEIGHT + KEY_Y_SPACE) * KEY_SCALE_FACTOR;
    }
    this.scene.add.existing(this);
  }
}

export default Keyboard;
