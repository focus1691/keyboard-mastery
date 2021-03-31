import { GameObjects } from 'phaser';

export default class PointsInstruction extends GameObjects.Container {
  constructor(scene) {
    super(scene, 0, 0);

    this.instructionOne = this.scene.make.text({
      x: 0,
      y: 0,
      text: 'Words with rare letters (x, y, u) are worth more (10 points) and common ones like \'a\', \'i\' are worth 1 point.',
      style: { fontFamily: 'Paneuropa Road', fontSize: '3rem', strokeThickness: 3, textAlign: 'center', color: '#81ADE5', wordWrap: { width: 500 } },
    });

    this.visualOne = this.scene.add.image(0, 0, 'menu', 'instruction_2.png');

    this.add(this.instructionOne);
    this.add(this.visualOne);

    Phaser.Display.Align.To.BottomCenter(this.visualOne, this.instructionOne, 0, 10);

    this.scene.add.existing(this);
  }
};
