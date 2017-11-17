const screenWidth = 800;
const screenHeight = 600;

const mapOfMaps: any = {
  'map_1': {
    left: 'map_2',
    up: 'map_3',
  },
  'map_2': {
    right: 'map_1',
  },
  'map_3': {
    down: 'map_1',
  },
};

export class Map {
  private preloads = {
    left: new Image(),
    right: new Image(),
    up: new Image(),
    down: new Image(),
  };

  constructor(
    public name: string,
  ) {
    this.update(name);
  }

  update(name: string) {
    this.name = name;

    if (this.left()) {
      this.preloads.left.src = Map.generateURL(this.left());
    }
    if (this.right()) {
      this.preloads.right.src = Map.generateURL(this.right());
    }
    if (this.up()) {
      this.preloads.up.src = Map.generateURL(this.up());
    }
    if (this.down()) {
      this.preloads.down.src = Map.generateURL(this.down());
    }
  }

  width() {
    return screenWidth;
  }

  height() {
    return screenHeight;
  }

  left() {
    return mapOfMaps[this.name].left;
  }

  right() {
    return mapOfMaps[this.name].right;
  }

  up() {
    return mapOfMaps[this.name].up;
  }

  down() {
    return mapOfMaps[this.name].down;
  }

  url() {
    return Map.generateURL(this.name);
  }

  private static generateURL(filename: string) {
    return `assets/${filename}.png`;
  }
}

export const initialMap = new Map('map_1');
