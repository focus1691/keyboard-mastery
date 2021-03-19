import { WIDTH, HEIGHT } from '../';
import { ORIGIN_X, ORIGIN_Y, SCALE_FACTOR_X, SCALE_FACTOR_Y } from '../utils/constants/wordPanel';
import { half } from '../utils/math';

class wordPanel extends Phaser.GameObjects.Container {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    const wordPanel = this.scene.make.image({ x: 0, y: 0, key: 'word_panel', scale: { x: SCALE_FACTOR_X, y: SCALE_FACTOR_Y }, origin: { x: ORIGIN_X, y: ORIGIN_Y } });

    Phaser.Display.Align.In.BottomCenter(wordPanel, this.scene.add.zone(half(WIDTH), half(HEIGHT), WIDTH, HEIGHT));

    this.scene.add.existing(this);
  }
}

export default wordPanel;
