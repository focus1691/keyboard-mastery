import { ROW_SCALE_FACTOR_X, ROW_SCALE_FACTOR_Y, NUM_SCALE_FACTOR_X, NUM_SCALE_FACTOR_Y, NUM_W, NUM_H } from '../utils/constants/letterboard';
import { WIDTH, HEIGHT } from '../';
import { half } from '../utils/math';

class letterBoard extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);
    console.log(HEIGHT);

    //* Top row
    this.upperRow = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_row', scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y }});
    this.upperRowNumber = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_number', scale: { x: NUM_SCALE_FACTOR_X, y: NUM_SCALE_FACTOR_Y }});

    Phaser.Display.Align.In.TopCenter(this.upperRow, this.scene.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT), -half(NUM_W * NUM_SCALE_FACTOR_X), 0);
    Phaser.Display.Align.To.RightCenter(this.upperRowNumber, this.upperRow, -1250, 0);


    //* Middle row
    this.middleRow = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_row', scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y }});
    this.middleRowNumber = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_number', scale: { x: NUM_SCALE_FACTOR_X, y: NUM_SCALE_FACTOR_Y }});

    Phaser.Display.Align.To.BottomCenter(this.middleRow, this.upperRow, 0, -(NUM_H * NUM_SCALE_FACTOR_Y));
    Phaser.Display.Align.To.RightCenter(this.middleRowNumber, this.middleRow, -1250, 0);

    //* Bottom row
    this.bottomRow = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_row', scale: { x: ROW_SCALE_FACTOR_X, y: ROW_SCALE_FACTOR_Y }});
    this.bottomRowNumber = this.scene.make.image({ x: 0, y: 0, key: 'letterboard_number', scale: { x: NUM_SCALE_FACTOR_X, y: NUM_SCALE_FACTOR_Y }});

    Phaser.Display.Align.To.BottomCenter(this.bottomRow, this.middleRow, 0, -(NUM_H * NUM_SCALE_FACTOR_Y));
    Phaser.Display.Align.To.RightCenter(this.bottomRowNumber, this.bottomRow, -1250, 0);


    this.scene.add.existing(this);
  }
}

export default letterBoard;
