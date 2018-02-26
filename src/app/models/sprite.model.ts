const spriteMap: any = {
  'Idle': {
    height: 63,
    width: 36,
    frames: 10,
    frameDelay: 400,
    loops: true,
    offsets: [
      {x:   -5, y:    0},
      {x:  -44, y:    0},
      {x:  -83, y:    0},
      {x:   -5, y:  -60},
      {x:  -44, y:  -60},
      {x:  -83, y:  -60},
      {x: -122, y:    0},
      {x: -122, y:  -60},
      {x:   -5, y: -120},
      {x:  -44, y: -120},
    ],
    path: 'assets/Idle.png',
  },
  'Run': {
    height: 52,
    width: 38,
    frames: 10,
    frameDelay: 100,
    loops: true,
    offsets: [
      {x:    0, y:    0},
      {x:  -38, y:    0},
      {x:  -76, y:    0},
      {x:    0, y:  -52},
      {x:  -38, y:  -52},
      {x:  -76, y:  -52},
      {x: -114, y:    0},
      {x: -114, y:  -52},
      {x:    0, y: -104},
      {x:  -38, y: -104},
    ],
    path: 'assets/Run.png',
  },
  'Dead': {
    height: 60,
    width: 58,
    frames: 10,
    frameDelay: 400,
    loops: false,
    offsets: [
      {x:    0, y:    0},
      {x:  -58, y:    0},
      {x: -116, y:    0},
      {x:    0, y:  -60},
      {x:  -58, y:  -60},
      {x: -116, y:  -60},
      {x:    0, y: -120},
      {x:  -58, y: -120},
      {x: -116, y: -120},
      {x: -174, y:    0},
    ],
    path: 'assets/Dead.png',
  }
}

export class Sprite {
  private frame = 0;
  private lastFrameChange = 0;

  constructor(
    public spriteClass: string,
  ) { }

  reset() {
    this.frame = 0;
  }

  height() {
    return spriteMap[this.spriteClass].height;
  }

  width() {
    return spriteMap[this.spriteClass].width;
  }

  xOffset() {
    return spriteMap[this.spriteClass].offsets[this.frame].x;
  }

  yOffset() {
    return spriteMap[this.spriteClass].offsets[this.frame].y;
  }

  src() {
    return spriteMap[this.spriteClass].path;
  }

  update(speed: number) {
    let ms = Date.now();
    if (ms - this.lastFrameChange >= (this.frameDelay() / speed)) {
      this.lastFrameChange = ms;
      this.frame += 1;
      if (this.loops()) {
        this.frame %= this.frames();
      } else {
        if (this.frame >= this.frames()) {
          this.frame = this.frames() - 1;
        }
      }
    }
  }

  private frames() {
    return spriteMap[this.spriteClass].frames;
  }

  private frameDelay() {
    return spriteMap[this.spriteClass].frameDelay;
  }

  private loops() {
    return spriteMap[this.spriteClass].loops;
  }
}

export const idleSprite = new Sprite('Idle');

export const runSprite = new Sprite('Run');

export const deadSprite = new Sprite('Dead');

const preloadedIdle = new Image();
preloadedIdle.src = idleSprite.src();

const preloadedRun = new Image();
preloadedRun.src = runSprite.src();

const preloadedDead = new Image();
preloadedDead.src = deadSprite.src();
