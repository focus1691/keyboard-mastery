import { GameObjects } from 'phaser';

export default class WordsInstruction extends GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.instruction = this.scene.make.text({
      x: 0,
      y: 0,
      text: 'You must enter a valid english word.',
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5', wordWrap: { width: 500 } },
    });

    this.visual = this.scene.add.image(0, 0, 'instructions', 'instruction_4.png');

    this.add(this.instruction);
    this.add(this.visual);

    Phaser.Display.Align.To.BottomCenter(this.visual, this.instruction, 0, 10);

    this.scene.add.existing(this);
  }
};
