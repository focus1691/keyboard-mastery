import { WIDTH, HEIGHT } from '../';
//* Util
import { BUTTON_HANG_TIME } from '../utils/constants/menu';
import { half } from '../utils/math';
//* Instructions
import KeyboardInstruction from '../game-objects/instructions/keyboard';
import KeystrokeInstruction from '../game-objects/instructions/keystroke';
import PointsInstruction from '../game-objects/instructions/points';
import ErrorsInstruction from '../game-objects/instructions/errors';
import WordsInstruction from '../game-objects/instructions/words';

class tutorial extends Phaser.Scene {
  constructor() {
    super('tutorial');
  }
  init() {
    this.currentPage = 1;
    this.nInstructions = 5;
  }
  create() {
    this.make.image({ key: 'background_menu', x: 0, y: 0, width: this.cameras.main.width, origin: { x: 0, y: 0 }, scale: { x: 1, y: 1 } });

    this.instructions = this.add.image(0, 0, 'menu', 'how_to_play.png');

    const zone = this.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT);

    this.title = this.make.text({
      x: 0,
      y: 0,
      text: 'How to Play',
      style: { fontFamily: 'Chunk Five Print', fontSize: '4rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5' },
    });

    this.pageTrackerTxt = this.make.text({
      x: 0,
      y: 0,
      text: `Page ${this.currentPage} / ${this.nInstructions}`,
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5' },
    });

    this.returnBtn = this.add.image(0, 0, 'menu', 'back.png').setInteractive();
    this.returnBtn.setScale(0.5, 0.5);
    this.returnBtn.on('pointerdown', this.handleReturn, this);

    this.keyboardInstruction = new KeyboardInstruction(this);
    this.keystrokeInstruction = new KeystrokeInstruction(this);
    this.pointsInstruction = new PointsInstruction(this);
    this.errorsInstruction = new ErrorsInstruction(this);
    this.wordsInstruction = new WordsInstruction(this);

    this.leftArrow = this.add.image(0, 0, 'menu', 'arrow_left.png').setInteractive();
    this.rightArrow = this.add.image(0, 0, 'menu', 'arrow_right.png').setInteractive();

    this.leftArrow.on('pointerdown', this.handlePrevPage, this);
    this.rightArrow.on('pointerdown', this.handleNextPage, this);

    Phaser.Display.Align.In.Center(this.instructions, zone); // instructions in the center
    Phaser.Display.Align.In.TopRight(this.returnBtn, this.instructions, 50, 20);
    Phaser.Display.Align.In.TopCenter(this.title, zone, 0, -this.title.height * 2 - 10); // Title in the top inside the instructions

    //* Left/right arrows inside the instructions panel to the bottom left/right, respectively
    Phaser.Display.Align.In.BottomLeft(this.leftArrow, this.instructions, -this.leftArrow.width / 2, -this.leftArrow.height / 2);
    Phaser.Display.Align.In.BottomRight(this.rightArrow, this.instructions, -this.rightArrow.width / 2, -this.rightArrow.height / 2);

    //* Page number in the bottom center
    Phaser.Display.Align.To.BottomCenter(this.pageTrackerTxt, this.instructions, 0, -this.pageTrackerTxt.height * 2);

    // Align instructions below the title inside the container
    Phaser.Display.Align.In.BottomLeft(this.keyboardInstruction, this.title, 50, 50);
    Phaser.Display.Align.In.BottomLeft(this.keystrokeInstruction, this.title, 50, 50);
    Phaser.Display.Align.In.BottomLeft(this.pointsInstruction, this.title, 50, 50);
    Phaser.Display.Align.In.BottomLeft(this.errorsInstruction, this.title, 50, 50);
    Phaser.Display.Align.In.BottomLeft(this.wordsInstruction, this.title, 50, 50);

    this.hideAllInstructions();
    this.setInstructions();
  }
  handleReturn() {
    this.leftArrow.off('pointerdown');
    this.rightArrow.off('pointerdown');

    this.returnBtn.setFrame('back_pressed.png');
    this.sound.play('button_click');
    this.time.delayedCall(BUTTON_HANG_TIME, this.returnToMenu, [], this);
  }
  returnToMenu() {
    this.scene.start('startMenu');
  }
  handlePrevPage() {
    this.currentPage -= this.currentPage > 1 ? 1 : 0;
    this.hideAllInstructions();
    this.setInstructions();
    this.updateDisplayPage();
  }
  handleNextPage() {
    this.currentPage += this.currentPage < this.nInstructions ? 1 : 0;
    this.hideAllInstructions();
    this.setInstructions();
    this.updateDisplayPage();
  }
  setInstructions() {
    if (this.currentPage === 1) this.keyboardInstruction.setVisible(true);
    else if (this.currentPage === 2) this.keystrokeInstruction.setVisible(true);
    else if (this.currentPage === 3) this.pointsInstruction.setVisible(true);
    else if (this.currentPage === 4) this.errorsInstruction.setVisible(true);
    else if (this.currentPage === 5) this.wordsInstruction.setVisible(true);
  }
  hideAllInstructions() {
    this.keyboardInstruction.setVisible(false);
    this.keystrokeInstruction.setVisible(false);
    this.pointsInstruction.setVisible(false);
    this.errorsInstruction.setVisible(false);
    this.wordsInstruction.setVisible(false);
  }
  updateDisplayPage() {
    this.pageTrackerTxt.setText(`Page ${this.currentPage} / ${this.nInstructions}`);
  }
}

export default tutorial;
