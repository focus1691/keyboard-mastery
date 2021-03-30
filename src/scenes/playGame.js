//* Game Objects
import Keyboard from '../game-objects/keyboard';
import LetterBoard from '../game-objects/letterBoard';
import WordPanel from '../game-objects/wordPanel';
//* Utils
import { ALPHABET, MAX_LETTERS, KEYBOARD_H, KEY_SCALE_FACTOR } from '../utils/constants/keyboard';
import { BUTTON_HANG_TIME } from '../utils/constants/menu';
import { binarySearch } from '../utils/search';
import { isPreviousWordUsed } from '../utils/words';
import { half } from '../utils/math';

import { WIDTH, HEIGHT } from '..';

class playGame extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
    this.word = '';
    this.usedWords = [];
    this.processingAnswer = false;
    this.score = 0;
    this.isReplaying = false;
  }
  create() {
    this.wordList = this.cache.text
      .get('words')
      .split('\n')
      .map((word) => word.trim());

    this.make.image({ key: 'background', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    //* Components
    this.letterBoard = new LetterBoard(this, { x: 0, y: 0 });
    this.keyboard = new Keyboard(this, { x: WIDTH / 2, y: HEIGHT - KEYBOARD_H * KEY_SCALE_FACTOR });
    this.wordPanel = new WordPanel(this, { x: 0, y: 0 });


    this.zone = this.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT);

    //* Replay
    this.replayBtn = this.add.image(0, 0, 'menu', 'replay.png').setInteractive();
    this.replayBtn.on('pointerup', this.handleReplay, this);
    Phaser.Display.Align.In.TopLeft(this.replayBtn, this.zone, 10, 10);

    //* Score
    this.scoreContainer = this.add.image(0, 0, 'menu', 'score_container.png');
    this.scoreBorder = this.add.image(0, 0, 'menu', 'score.png');
    this.scoreLabel = this.make.text({
      x: 0,
      y: 0,
      text: 'Score:',
      style: { fontFamily: 'Chunk Five Print', fontSize: '4rem', color: '#20176B' },
    });
    this.scoreText = this.make.text({
      x: 0,
      y: 0,
      text: `${this.score}`,
      style: { fontFamily: 'Paneuropa Freeway', fontSize: '5rem', strokeThickness: 3, color: '#000' },
    });

    Phaser.Display.Align.In.TopRight(this.scoreContainer, this.zone);
    Phaser.Display.Align.In.TopRight(this.scoreBorder, this.scoreContainer);
    Phaser.Display.Align.In.Center(this.scoreText, this.scoreBorder);
    Phaser.Display.Align.To.LeftCenter(this.scoreLabel, this.scoreBorder);

    //* Letter animations
    this.createAnimation('destroy_green_letter', 'blocks_squares', 'green_square_00', 0, 5, '.png', false, 0, 10);
    this.createAnimation('destroy_blue_letter', 'blocks_squares', 'blue_square_00', 0, 5, '.png', false, 0, 10);
    this.createAnimation('destroy_yellow_letter', 'blocks_squares', 'yellow_square_00', 0, 5, '.png', false, 0, 10);
    this.createAnimation('destroy_pink_letter', 'blocks_squares', 'pink_square_00', 0, 5, '.png', false, 0, 10);

    //* Audio
    this.sound.add('theme_song');
    this.sound.volume = 0.2;
    this.sound.play('theme_song', {
      loop: true,
    });

    this.input.keyboard.on(
      'keydown',
      function (event) {
        if (this.processingAnswer) return;

        let key = event.key.toLowerCase();

        if (ALPHABET.includes(key)) {
          if (this.word.length < MAX_LETTERS) {
            this.word += key;
            this.keyboard.keys[`${key}-key`].setFrame(`${key}_key_pressed.png`);
            this.sound.play('key_press');
          }
          this.updateWordDisplay();
        } else if (key === 'enter') {
          this.submitWord();
        } else if (key === 'backspace') {
          this.word = this.word.substring(0, this.word.length - 1);
          this.updateWordDisplay();
        }
      },
      this
    );

    this.input.keyboard.on(
      'keyup',
      function (event) {
        let key = event.key.toLowerCase();

        if (ALPHABET.includes(key)) {
          this.keyboard.keys[`${key}-key`].setFrame(`${key}_key.png`);
        }
      },
      this
    );
  }
  updateWordDisplay() {
    this.wordPanel.setWord(this.word);
  }
  handleReplay() {
    if (!this.isReplaying) {
      this.replayBtn.setFrame('replay_pressed.png');
      this.sound.play('button_click');
      this.time.delayedCall(BUTTON_HANG_TIME, () => this.scene.start('startMenu'), [], this);
      this.isReplaying = true;
    }
  }
  submitWord() {
    // Only continue if there is input
    if (!this.word || this.word.trim().length === 0) return;

    this.processingAnswer = true;
    if (!isPreviousWordUsed(this.usedWords, this.word) && binarySearch(this.wordList, this.word) > -1) {
      this.handleWordCorrect();
    } else {
      this.handleWordError();
    }
  }
  handleWordCorrect() {
    for (let i = 0; i < this.word.length; i++) {
      const letter = this.word[i];
      if (!this.letterBoard.isRowFull(letter)) {
        this.letterBoard.constructBlock(letter);
      } else {
        //! Game Over
        this.handleGameOver();
      }
    }
    this.wordPanel.createWordBlock(this.word);
  }
  handleWordError() {
    this.clearWord();
    this.letterBoard.constructEmptyBlocks();
    if (this.letterBoard.isAnyRowFull()) {
      //! Game Over
      this.handleGameOver();
    } else {
      this.processingAnswer = false;
    }
  }
  onWordTweenOver() {
    this.checkKeyStroke();
    this.processingAnswer = false;
    this.addUsedWord(this.word);
    this.clearWord();
  }
  // A Key Stroke = 3 rows have an equal amount of blocks
  checkKeyStroke() {
    if (this.letterBoard.isKeyStroke()) {
      // Update score
      const points = this.letterBoard.getTotalPoints();
      this.score += points;
      this.scoreText.setText(this.score);
      Phaser.Display.Align.In.Center(this.scoreText, this.scoreBorder);

      // Destroy blocks
      this.letterBoard.destroyBlocks();
      this.wordPanel.destroyWordBlocks();
      this.letterBoard.resetLetterCount();
      this.letterBoard.recenterLetterCounters();

      this.sound.play('blocks_destroyed');
    }
  }
  handleGameOver() {
    this.scene.start('gameOver');
  }
  clearWord() {
    this.word = '';
    this.updateWordDisplay();
  }
  addUsedWord(word) {
    this.usedWords.push(word);
    if (this.usedWords.length > 20) {
      this.usedWords.shift();
    }
  }
  createAnimation(key, name, prefix, start, end, suffix, yoyo, repeat, frameRate) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(name, {
        prefix,
        start,
        end,
        suffix,
      }),
      frameRate,
      yoyo,
      repeat,
    });
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
