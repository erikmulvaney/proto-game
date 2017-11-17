import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EngineService, InputState } from '@services/engine.service';
import { KeyboardService } from '@services/keyboard.service';

import { Map, initialMap } from '@models/map.model';
import { Player } from '@models/player.model';

import { checkBounds } from '../../utils';

interface OverworldState {
  player: Player,
  map: Map
}

const initialState: OverworldState = {
  player: new Player(),
  map: initialMap
};

@Component({
  selector: 'proto-overworld',
  templateUrl: './overworld.component.html',
  styleUrls: ['./overworld.component.scss']
})
export class OverworldComponent implements OnDestroy {
  state$: Observable<OverworldState>;

  constructor(
    private engine: EngineService,
    private keyboard: KeyboardService,
  ) {
    Player.bindings(this.keyboard);
    this.state$ = this.engine.updateState(initialState, (inputState, state) => this.updateGameState(inputState, state));
    this.engine.start();
  }

  ngOnDestroy() {
    this.keyboard.removeAllBindings();
    this.engine.stop();
  }

  private updateGameState(inputState: InputState, state: OverworldState) {
    state.player.update(inputState);
    checkBounds(state.player, state.map);
    return state;
  }
}
