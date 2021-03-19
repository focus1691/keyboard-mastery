import { assetsDPR, WIDTH, HEIGHT } from '../';
import { KEYS, KEY_WIDTH, KEY_HEIGHT, KEY_X_SPACE, KEY_Y_SPACE, KEY_SCALE_FACTOR } from '../utils/constants';

class Keyboard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.keys = {};

    let x = WIDTH / 2 - (KEY_WIDTH / 2);
    let y = config.y - (KEY_HEIGHT + KEY_Y_SPACE) * KEY_SCALE_FACTOR;


    this.scene.make.image({ key: 'keyboard_container', x: WIDTH / 2, y: 230, scale: 0.3 });
    this.scene.make.image({ key: 'keyboard_background', x: WIDTH / 2, y: 230, scale: 0.3 });
    this.scene.make.image({ key: 'keyboard_outline', x: WIDTH / 2, y: 230, scale: 0.3 });
    // this.scene.make.image({ key: 'w_key', x: WIDTH / 2, y: 230, scale: 0.3 });

    //     this.keys[`w-key`] = this.scene.make.image({
    //       key: 'keyboard',
    //       frame: `w_key.png`,
    //       x: x,
    //       y: y,
    //       // origin: { x: 0, y: 0 },
    //       scale: 0.3,
    //     });

    for (let i = 0; i < KEYS.length; i++) {
      for (let j = 0; j < KEYS[i].length; j++) {
        const key = KEYS[i][j];
        this.keys[`${key.toLocaleLowerCase()}-key`] = this.scene.make.image({
          key: 'keyboard',
          frame: `${key}_key.png`,
          x: x,
          y: y,
          scale: 0.3,
        });
        x += KEY_WIDTH * KEY_SCALE_FACTOR;
      }
      x = config.x;
      y += KEY_HEIGHT * KEY_SCALE_FACTOR;
    }
    this.scene.add.existing(this);
  }

  getKeyScaleFactor(key) {
    if (key === 'enter') {
      return { scaleX: assetsDPR, scaleY: assetsDPR / 1.5 };
    }
    if (key === 'space') {
      return { scaleX: assetsDPR * 2, scaleY: assetsDPR / 1.5 };
    }
    return { scaleX: assetsDPR / 2, scaleY: assetsDPR / 2 };
  }
  getKeyAngle(key) {
    if (key === 'space') {
      return -8;
    }
    return -20;
  }
}

export default Keyboard;
