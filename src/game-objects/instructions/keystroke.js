import { GameObjects } from 'phaser';

export default class KeystrokeInstruction extends GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.instruction = this.scene.make.text({
      x: 0,
      y: 0,
      text: 'You need an equal matching number or blocks in each row to knock them off. This is called a Keystroke.',
      style: { fontFamily: 'Paneuropa Road', fontSize: '4rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5', wordWrap: { width: 500 } },
    });

    this.visual = this.scene.add.image(0, 0, 'instructions', 'instruction_1.png');

    this.add(this.instruction);
    this.add(this.visual);

    Phaser.Display.Align.To.BottomCenter(this.visual, this.instruction, 0, 10);

    this.scene.add.existing(this);
  }
};
