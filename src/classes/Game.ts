import { Ingredient } from '../enums';
import Box from './Box';
import {
  DOUGH_BOX_WIDTH,
  GAME_WIDTH,
  INGREDIENT_BOX_WIDTH,
  PIZZA_SIZE,
  SAUCE_BOX_HEIGHT,
  SAUCE_BOX_WIDTH,
  TABLE_WIDTH,
} from '../constants';
import Pizza from './Pizza';
import type { IGame, Order } from '../interfaces';
import Sprite from './Sprite';

export default class Game implements IGame {
  boxes: Box[];
  selectedIngredient: Ingredient;
  pizzas: Pizza[];
  container: HTMLDivElement;
  //   Current order info
  order: Order;

  constructor(container: HTMLDivElement) {
    this.boxes = [];
    this.pizzas = [];
    this.selectedIngredient = Ingredient.NONE;
    this.container = container;
    this.order = {
      ingredients: [Ingredient.SAUCE, Ingredient.CHEESE, Ingredient.PEPPERONI],
    };

    // this.loadOrderCounter();
    this.loadKitchen();
  }

  clearImages = () => {
    this.container.innerHTML = '';
  };

  loadOrderCounter = () => {
    new Sprite(
      'assets/background/shop.png',
      0,
      0,
      GAME_WIDTH,
      this.container,
      () => {
        this.clearImages();
        this.loadKitchen();
      },
    );
  };

  loadKitchen = () => {
    // Ingredient boxes
    new Box(
      'assets/ingredients/boxes/cheese-box.png',
      0,
      0,
      SAUCE_BOX_WIDTH,
      this.container,
      (ev) => {
        this.selectedIngredient = Ingredient.CHEESE;
        console.log('cheese');
      },
    );

    new Box(
      'assets/ingredients/boxes/tomato-sauce-box.png',
      0,
      SAUCE_BOX_HEIGHT,
      SAUCE_BOX_WIDTH,
      this.container,
      (ev) => {
        this.selectedIngredient = Ingredient.SAUCE;
      },
    );

    // Dough box

    new Box(
      'assets/ingredients/boxes/dough-box.png',
      0,
      SAUCE_BOX_HEIGHT * 2,
      DOUGH_BOX_WIDTH,
      this.container,
      (ev) => {
        this.makePizza();
        console.log('dough');
      },
    );

    // Topping boxes

    new Box(
      'assets/ingredients/boxes/pepperoni-box.png',
      SAUCE_BOX_WIDTH,
      0,
      INGREDIENT_BOX_WIDTH,
      this.container,
      (ev) => {
        this.selectedIngredient = Ingredient.PEPPERONI;
        console.log('pepperoni');
      },
    );

    new Box(
      'assets/ingredients/boxes/mushroom-box.png',
      SAUCE_BOX_WIDTH,
      SAUCE_BOX_HEIGHT,
      INGREDIENT_BOX_WIDTH,
      this.container,
      (ev) => {
        this.selectedIngredient = Ingredient.MUSHROOM;
        console.log('mushroom');
      },
    );

    // Table
    new Sprite(
      'assets/kitchen/cutting-table.png',
      DOUGH_BOX_WIDTH + PIZZA_SIZE * 2,
      SAUCE_BOX_HEIGHT * 2,
      TABLE_WIDTH,
      this.container,
      (ev) => {
        this.servePizza();
      },
    );
  };

  servePizza = () => {
    console.log('Order: ', this.order);

    const pizza = this.pizzas.shift();

    console.log('Pizza: ', pizza);
    if (!pizza) return;
    const score = this.compareOrder(pizza);
    console.log('Score: ', score);
  };

  makePizza = () => {
    this.pizzas.push(
      new Pizza(
        'assets/ingredients/doughs/good-pizza-uncooked.png',
        SAUCE_BOX_WIDTH + this.pizzas.length * PIZZA_SIZE,
        SAUCE_BOX_HEIGHT * 2,
        PIZZA_SIZE,
        this.container,
        this,
      ),
    );
    console.log(this.pizzas);
  };

  setSelectedIngredient = (ingredient: Ingredient) => {
    this.selectedIngredient = ingredient;
    console.log(this.selectedIngredient);
  };

  //   Comparison logic
  compareOrder = (pizza: Pizza): number => {
    // returns multiplier - 1 is max
    let score = 1;
    this.order.ingredients.forEach((elem) => {
      if (!pizza.ingredients.includes(elem)) {
        score *= 0.95;
      }
    });
    return score;
    // if (
    //   this.order.ingredients.every((elem) => pizza.ingredients.includes(elem))
    // ) {
    //   return true;
    // }
    // return false;
  };
}
