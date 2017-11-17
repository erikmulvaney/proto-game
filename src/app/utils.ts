import { Player } from '@models/player.model';
import { Map } from '@models/map.model';

export function checkBounds(player: Player, map: Map) {
  let maxX = map.width() - player.sprite.width();
  let maxY = map.height() - player.sprite.height();

  if (player.x < 0) {
    if (map.left()) {
      map.update(map.left());
      player.x = maxX;
    } else {
      player.x = 0;
    }
  } else if (player.x > maxX) {
    if (map.right()) {
      map.update(map.right());
      player.x = 0;
    } else {
      player.x = maxX;
    }
  }

  if (player.y < 0) {
    if (map.up()) {
      map.update(map.up());
      player.y = maxY;
    } else {
      player.y = 0;
    }
  } else if (player.y > maxY) {
    if (map.down()) {
      map.update(map.down());
      player.y = 0;
    } else {
      player.y = maxY;
    }
  }
}
