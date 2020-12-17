//* Game Objects
import Keyboard from '../game-objects/keyboard';
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

class playGame extends Phaser.Scene {
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
    this.word = '';
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

    this.keyboard = new Keyboard(this, { x: 150, y: 200 });
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

        if (this.keyboard.keys[`${key}-key`]) {
          if (key === 'enter') {
            this.answerSubmitted = true;
            this.submitWord();
          } else if (key === 'backspace') {
            this.word = this.word.substring(0, this.word.length - 1);
            this.text.setText(this.word);
          } else {
            this.word += key;
            this.text.setText(this.word);
          }
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_pressed_paper.png`);
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

        if (this.keyboard.keys[`${key}-key`]) {
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_paper.png`);
        }
      },
      this
    );
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
      });
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
