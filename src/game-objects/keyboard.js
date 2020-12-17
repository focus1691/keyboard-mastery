import { KEYS } from '../utils/constants';

class Keyboard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.keys = {};

    let x = 150;
    let y = 200;

    for (let i = 0; i < KEYS.length; i++) {
      if (i > 0) {
        x = i === KEYS.length - 1 ? 500 : 200;
      }

      y += i === KEYS.length - 1 ? 75 : 75;
      for (let j = 0; j < KEYS[i].length; j++) {
        let key = KEYS[i][j];
        // const { scaleX, scaleY } = this.getKeyScaleFactor(key);
        const angle = this.getKeyAngle(key);

        this.keys[`${key.toLocaleLowerCase()}-key`] = this.scene.make.image({
          key: 'keyboard',
          frame: `${key}_paper.png`,
          x: key === 'enter' ? x + 20 : x,
          y: y + (key === 'enter' ? 0 : 0),
          origin: { x: 0, y: 0 },
          angle,
        });
        x += 75;
      }
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
