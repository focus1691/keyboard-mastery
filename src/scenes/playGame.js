



class playGame extends Phaser.Scene {
  init() {
    this.accumMS = 0;
    this.hzMS = (1 / 60) * 1000;
  }
  preload() {

  }
  create() {

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