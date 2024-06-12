import type { IGame } from '../interfaces';
import Sprite from './Sprite';
import { Ingredient } from '../enums';
import { SAUCE_OFFSET } from '../constants';

export default class Pizza {
  sprite: Sprite;
  game: IGame;
  ingredients: Ingredient[];
  container: HTMLDivElement;
  isDragging: boolean;

  constructor(
    imgSrc: string,
    posX: number,
    posY: number,
    width: number,
    container: HTMLDivElement,
    game: IGame,
  ) {
    this.isDragging = false;
    this.game = game;
    this.container = container;
    this.sprite = new Sprite(imgSrc, posX, posY, width, container, () => {});

    this.sprite.img.onpointerdown = () => {
      this.isDragging = true;
    };

    this.sprite.img.onpointermove = (e) => {
      if (this.isDragging) {
        console.log('dragging');
        this.sprite.moveX(e.movementX);
        this.sprite.moveY(e.movementY);
      }
    };

    this.sprite.img.onpointerup = (e) => {
      this.isDragging = false;
      if (this.game.selectedIngredient === Ingredient.SAUCE) {
        if (!this.ingredients.includes(Ingredient.SAUCE)) {
          this.ingredients.push(Ingredient.SAUCE);
          this.addSauce();
        }
      } else if (this.game.selectedIngredient === Ingredient.CHEESE) {
        if (!this.ingredients.includes(Ingredient.CHEESE)) {
          this.ingredients.push(Ingredient.CHEESE);
          this.addCheese();
        }
      } else if (this.game.selectedIngredient === Ingredient.PEPPERONI) {
        if (!this.ingredients.includes(Ingredient.PEPPERONI)) {
          this.ingredients.push(Ingredient.PEPPERONI);
        }
        this.addPepperoni(e);
      }
    };

    this.ingredients = [];
  }

  addSauce() {
    if (this.ingredients.includes(Ingredient.CHEESE)) {
      // put sauce blow cheese
    }
    const sauce = new Sprite(
      'assets/ingredients/sauces/good-pizza-unbaked-sauce.png',
      this.sprite.posX + SAUCE_OFFSET,
      this.sprite.posY + SAUCE_OFFSET,
      this.sprite.width - SAUCE_OFFSET * 2,
      this.container,
      () => {},
    );
    sauce.img.style.pointerEvents = 'none';
  }

  addCheese() {
    console.log('add cheese');

    const cheese = new Sprite(
      'assets/ingredients/good-pizza-unbaked-cheese.png',
      this.sprite.posX + SAUCE_OFFSET,
      this.sprite.posY + SAUCE_OFFSET,
      this.sprite.width - SAUCE_OFFSET * 2,
      this.container,
      () => {},
    );
    cheese.img.style.pointerEvents = 'none';
  }

  addPepperoni(e: MouseEvent) {
    console.log(e.clientX);
    console.log(e.clientY);

    const pep = new Sprite(
      'assets/ingredients/toppings/good-pizza-pepperoni.png',
      e.clientX - 10,
      e.clientY - 10,
      20,
      this.container,
      () => {},
    );
    pep.img.style.pointerEvents = 'none';
  }
}
