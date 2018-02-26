import { InputState } from '@services/engine.service';
import { KeyboardService } from '@services/keyboard.service';

import { initialMap } from '@models/map.model';
import { Sprite, idleSprite, runSprite, deadSprite } from '@models/sprite.model';

const BASE_SPEED = 2;

const FACE_LEFT = 1;
const FACE_RIGHT = 0;

export class Player {
  static moveLeft = 'Move Left';
  static moveRight = 'Move Right';
  static moveUp = 'Move Up';
  static moveDown = 'Move Down';
  static run = 'Run';
  static die = 'Die';

  constructor(
    public x: number = (initialMap.width() - idleSprite.width()) / 2,
    public y: number = (initialMap.height() - idleSprite.height()) / 2,
    public sprite: Sprite = idleSprite,
    public direction: number = FACE_LEFT,
    private running = false,
    private moving = false,
    private dying = false,
  ) { }

  public static bindings(keyboard: KeyboardService) {
    keyboard.addBinding('Player', [
      {keys: KeyboardService.Left, action: Player.moveLeft},
      {keys: KeyboardService.Right, action: Player.moveRight},
      {keys: KeyboardService.Up, action: Player.moveUp},
      {keys: KeyboardService.Down, action: Player.moveDown},
      {keys: KeyboardService.Shift, action: Player.run},
    ]);
  }

  speed() {
    return BASE_SPEED * (this.running ? 2 : 1);
  }

  update(inputState: InputState) {
    if (inputState[Player.run]) {
      this.running = true;
    } else {
      this.running = false;
    }

    if (inputState[Player.moveLeft]) {
      this.x -= this.speed();
      this.direction = FACE_LEFT;
    }
    if (inputState[Player.moveRight]) {
      this.x += this.speed();
      this.direction = FACE_RIGHT;
    }
    if (inputState[Player.moveUp]) {
      this.y -= this.speed();
    }
    if (inputState[Player.moveDown]) {
      this.y += this.speed();
    }

    this.sprite.update(this.speed());

    let oldHeight = this.sprite.height();
    let oldWidth = this.sprite.width();
    if (this.inputMoving(inputState) && !this.moving) {
      this.moving = true;
      this.dying = false;
      this.sprite = runSprite;
      this.sprite.reset();
    }
    if (!this.inputMoving(inputState) && this.moving) {
      this.moving = false;
      this.dying = false;
      this.sprite = idleSprite;
      this.sprite.reset();
    }

    if (inputState[Player.die] && !this.dying) {
      this.dying = true;
      this.moving = false;
      this.sprite = deadSprite;
      this.sprite.reset();
    }

    this.x += (oldWidth - this.sprite.width()) / 2;
    this.y += (oldHeight - this.sprite.height()) / 2;
  }

  private inputMoving(inputState: InputState) {
    let movingHorizontally = !!inputState[Player.moveLeft] != !!inputState[Player.moveRight];
    let movingVertically = !!inputState[Player.moveUp] != !!inputState[Player.moveDown];
    return movingHorizontally || movingVertically;
  }
}
