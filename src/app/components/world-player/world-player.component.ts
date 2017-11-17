import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { MouseService } from '@services/mouse.service';

import { Player } from '@models/player.model';

@Component({
  selector: 'proto-world-player',
  templateUrl: './world-player.component.html',
  styleUrls: ['./world-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldPlayerComponent {
  @Input() player: Player;

  constructor(
    private mouse: MouseService,
  ) { }

  onPlayerMouseDown() {
    this.mouse.mouseDown(Player.die);
  }

  onPlayerMouseUp() {
    this.mouse.mouseUp(Player.die);
  }
}
