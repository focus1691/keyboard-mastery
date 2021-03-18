//* Game Objects
import Keyboard from '../game-objects/keyboard';
//* Utils
import { KEY_WIDTH, KEY_HEIGHT, ROWS, COLS } from '../utils/constants';
import { binarySearch } from '../utils/search';
//* Images
import backgroundImg from '../assets/images/background.png';
import keyboard from '../assets/images/keyboard.png';
import keyboardJSON from '../assets/images/keyboard.json';
import { assetsDPR, WIDTH, HEIGHT } from '..';
//* Audio
import keyPressSound from '../assets/audio/computer_apple_magic_keyboard_key_press_001_17520.mp3';
class playGame extends Phaser.Scene {
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
    this.word = '';
    this.answerSubmitted = false;
  }
  preload() {
    this.load.text('words', 'src/assets/words/en.txt');
    
    this.load.image('background', backgroundImg);

    this.load.atlas('keyboard', keyboard, keyboardJSON);
    this.load.audio('key_press', keyPressSound);
  }
  create() {
    this.make.image({
      key: 'background',
      x: 0,
      y: 0,
      width: this.cameras.main.width,
      origin: { x: 0, y: 0 },
      scale: { x: 1.5, y: 1.5 },
    });

    this.words = this.cache.text.get('words').split('\n');

    this.keyboard = new Keyboard(this, { x: WIDTH - ((KEY_WIDTH) * (COLS)), y: HEIGHT - ((KEY_HEIGHT) * (ROWS )) });

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
          } else {
            this.word += key;
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
}

export default playGame;
