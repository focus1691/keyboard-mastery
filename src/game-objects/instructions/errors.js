import { GameObjects } from 'phaser';

export default class ErrorsInstruction extends GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.instruction = this.scene.make.text({
      x: 0,
      y: 0,
      text: 'An empty block will fill in each row if a non-word is entered.',
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5', wordWrap: { width: 500 } },
    });

    this.visual = this.scene.add.image(0, 0, 'instructions', 'instruction_3.png');

    this.add(this.instruction);
    this.add(this.visual);

    Phaser.Display.Align.To.BottomCenter(this.visual, this.instruction, 0, 10);

    this.scene.add.existing(this);
  }
};
