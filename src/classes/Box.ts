import Sprite from './Sprite';

export default class Box {
  sprite: Sprite;

  constructor(
    imgSrc: string,
    posX: number,
    posY: number,
    width: number,
    container: HTMLDivElement,
    onClick: (ev: MouseEvent) => any,
  ) {
    this.sprite = new Sprite(imgSrc, posX, posY, width, container, onClick);
  }
}
