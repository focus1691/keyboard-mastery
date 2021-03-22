import { WIDTH, HEIGHT } from '../';
import { KEYS, KEY_W, KEY_H, KEYBOARD_H, KEY_X_SPACE, KEY_Y_SPACE, KEY_SCALE_FACTOR } from '../utils/constants/keyboard';
import { H as WORD_PANEL_H, SCALE_FACTOR_Y as WORD_PANEL_SCALE_FACTOR_Y, INPUT_H, INPUT_SCALE_FACTOR_Y } from '../utils/constants/wordPanel';
import { half } from '../utils/math';

class Keyboard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.keys = {};

    const offsetY = -(WORD_PANEL_H * WORD_PANEL_SCALE_FACTOR_Y / 2 ) + -(INPUT_H * INPUT_SCALE_FACTOR_Y / 2);
    let x = half(WIDTH) - (KEY_W + KEY_X_SPACE) * KEY_SCALE_FACTOR * 4 - half((KEY_W + KEY_X_SPACE) * KEY_SCALE_FACTOR);
    let y = config.y - (KEY_H + KEY_Y_SPACE) * KEY_SCALE_FACTOR + offsetY;

    this.scene.make.image({ key: 'keyboard_container', x: half(WIDTH), y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR + offsetY , scale: KEY_SCALE_FACTOR });
    this.scene.make.image({ key: 'keyboard_background', x: half(WIDTH), y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR + offsetY, scale: KEY_SCALE_FACTOR });
    this.scene.make.image({ key: 'keyboard_outline', x: half(WIDTH), y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR + offsetY, scale: KEY_SCALE_FACTOR });

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
        x += (KEY_W + KEY_X_SPACE) * KEY_SCALE_FACTOR;
      }
      if (i === 0) {
        x = half(WIDTH) - (KEY_W + KEY_X_SPACE) * KEY_SCALE_FACTOR * 4;
      } else if (i === 1) {
        x = half(WIDTH) - (KEY_W + KEY_X_SPACE) * KEY_SCALE_FACTOR * 3;
      }
      y += (KEY_H + KEY_Y_SPACE) * KEY_SCALE_FACTOR;
    }
    this.scene.add.existing(this);
  }
}

export default Keyboard;
