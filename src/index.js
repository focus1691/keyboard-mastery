import Phaser from 'phaser';
//* Scenes
import preloader from './scenes/preloader';
import startMenu from './scenes/startMenu';
import playGame from './scenes/playGame';
import gameOver from './scenes/gameOver';
import tutorial from './scenes/tutorial';
//* CSS
import './css/style.css';

const roundHalf = (num) => Math.round(num * 2) / 2;
const DPR = window.devicePixelRatio;

const isMobile = () => Math.min(screen.width, screen.height) <= 480;
export const WIDTH = 640 * (isMobile() ? DPR : 4);
export const HEIGHT = 360 * (isMobile() ? DPR : 4);

// will be 1, 1.5, 2, 2.5, 3, 3.5 or 4
export const assetsDPR = roundHalf(Math.min(Math.max(WIDTH / 640, 1), 4));

const config = {
  type: Phaser.AUTO,
  parent: 'keyboard-mastery',
  width: WIDTH,
  height: HEIGHT,
  dom: {
    createContainer: true,
  },
  scale: {
    mode: Phaser.DOM.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
  },
  scene: [preloader, startMenu, playGame, gameOver, tutorial],
};

const game = new Phaser.Game(config);
