import Box from './classes/Box';
import Game from './classes/Game';
import Sprite from './classes/Sprite';
import {
  GAME_WIDTH,
  GAME_HEIGHT,
  SAUCE_BOX_WIDTH,
  SAUCE_BOX_HEIGHT,
} from './constants';

const container = document.querySelector<HTMLDivElement>('#game-container');
if (container) {
  container.style.width = `${GAME_WIDTH}px`;
  container.style.height = `${GAME_HEIGHT}px`;

  new Game(container);
}
