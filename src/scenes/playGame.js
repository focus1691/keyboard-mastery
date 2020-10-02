//* Images
import background from "../assets/images/TexturesCom_PagePlain0008_4_masked_S.png";
import keyboard from '../assets/images/keyboard.png';
import keyboardJSON from '../assets/images/keyboard.json';
import { assetsDPR, WIDTH } from "..";

class playGame extends Phaser.Scene {
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
  }
  preload() {
    this.load.image('background', background);
    this.load.atlas('keyboard', keyboard, keyboardJSON);
  }
  create() {
    console.log(this)

    this.cameras.main.setBackgroundColor(0x66abdd);

    this.make.image({
      key: 'background',
      x: -150,
      y: 0,
      width: 2560,
      origin: { x: 0, y: 0 },
      scale: { x: 4, y: 1.4 },
    });

    const row1 = [ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p' ];

    let x = 200;

    for (let i = 0; i < row1.length; i++) {
      this.make.image({
        key: 'keyboard',
        frame: `${row1[i]}_paper.png`,
        x,
        y: 200,
        origin: { x: 0, y: 0 },
        scale: { x: 1.5, y: 1.5 },
        angle: -20,
      });

      x += 126;
    }

    var atlasTexture = this.textures.get('keyboard');

    var frames = atlasTexture.getFrameNames();
    // console.log(frames);
  }
  update(time, delta) {
    this.accumMS += delta;


    if (this.accumMS >= this.hzMS) {

    }

    while (this.accumMS >= this.hzMS) {
      this.accumMS -= this.hzMS;
    }
  }
}

export default playGame;