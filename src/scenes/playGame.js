//* Images
import background from '../assets/images/TexturesCom_PagePlain0008_4_masked_S.png';
import keyboard from '../assets/images/keyboard.png';
import keyboardJSON from '../assets/images/keyboard.json';
import { assetsDPR, WIDTH } from '..';
//* Audio
import keyPressSound from '../assets/audio/computer_apple_magic_keyboard_key_press_001_17520.mp3';
//* Fonts
import whereMyKeysImg from '../assets/fonts/where_my_keys/font.png';
import whereMyKeysXML from '../assets/fonts/where_my_keys/font.xml';

const KEYS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'minus', 'plus', 'backspace'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'enter'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'L'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ['space'],
];

class playGame extends Phaser.Scene {
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
    this.word = '';
    this.keys = {};
    this.answerSubmitted = false;
  }
  preload() {
    this.load.bitmapFont('whereMyKeysFont', whereMyKeysImg, whereMyKeysXML);

    this.load.image('background', background);
    this.load.atlas('keyboard', keyboard, keyboardJSON);
    this.load.audio('key_press', keyPressSound);
  }
  create() {
    this.cameras.main.setBackgroundColor(0x66abdd);

    this.make.image({
      key: 'background',
      x: -150,
      y: 0,
      width: 2560,
      origin: { x: 0, y: 0 },
      scale: { x: 4, y: 1.4 },
    });

    let x = 150;
    let y = 200;

    for (let i = 0; i < KEYS.length; i++) {
      if (i > 0) {
        x = i === KEYS.length - 1 ? 500 : 200;
      }

      y += i === KEYS.length - 1 ? 126 + 126 / 1.5 : 126 * 1.2;
      for (let j = 0; j < KEYS[i].length; j++) {
        let key = KEYS[i][j];
        const { scaleX, scaleY } = this.getKeyScaleFactor(key);
        const angle = this.getKeyAngle(key);

        this.keys[`${key.toLocaleLowerCase()}-key`] = this.make.image({
          key: 'keyboard',
          frame: `${key}_paper.png`,
          x,
          y: y + (key === 'enter' ? 50 : 0),
          origin: { x: 0, y: 0 },
          scale: { x: scaleX, y: scaleY },
          angle,
        });
        x += (126 * assetsDPR) / 3;
      }
    }
    this.text = this.add.bitmapText(150, 50, 'whereMyKeysFont', this.word).setFontSize(128);

    this.input.keyboard.on(
      'keydown',
      function (event) {
        if (this.answerSubmitted) return;

        let key = event.key.toLowerCase();
        // Spacebar
        if (key === ' ') {
          key = 'space';
        }

        if (this.keys[`${key}-key`]) {
          if (key === 'enter') {
            this.answerSubmitted = true;
            this.submitWord();
          } else {
            this.word += key;
            this.text.setText(this.word);
          }
          this.keys[`${key}-key`].setFrame(`${key}_pressed_paper.png`);
          this.sound.play('key_press');
        }
      },
      this
    );

    this.input.keyboard.on(
      'keyup',
      function (event) {
        let key = event.key.toLowerCase();

        // Spacebar
        if (key === ' ') {
          key = 'space';
        }

        if (this.keys[`${key}-key`]) {
          this.keys[`${key}-key`].setFrame(`${key}_paper.png`);
        }
      },
      this
    );
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
  submitWord() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          handleWordCorrect();
        } else {
          handleWordError();
        }
        this.answerSubmitted = false;
      })
  }
  handleWordCorrect() {
    this.word = '';
  }
  handleWordError() {
    this.word = '';
  }
  update(time, delta) {
    this.accumMS += delta;

    if (this.accumMS >= this.hzMS) {
    }
    while (this.accumMS >= this.hzMS) {
      this.accumMS -= this.hzMS;
    }
  }
  render() {
    this.children.bringToTop(this.text);
  }
}

export default playGame;
