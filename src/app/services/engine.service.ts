import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';

import { KeyboardService } from '@services/keyboard.service';
import { MouseService } from '@services/mouse.service';

export interface InputState {
  [name: string]: boolean
}

@Injectable()
export class EngineService {
  private _tick = new Subject();
  private inputSubscription?: Subscription;

  constructor(
    private keyboard: KeyboardService,
    private mouse: MouseService,
  ) { }

  start() {
    requestAnimationFrame(() => this.onTick());
  }

  stop() {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
      this.inputSubscription = undefined;
    }
  }

  tick() {
    return this._tick;
  }

  updateState<T>(initialState: T, updateState: (inputState: InputState, state: T) => T): Observable<T> {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
    let stream = new BehaviorSubject<T>(initialState);
    this.inputSubscription = this.tickInputState()
      .withLatestFrom(stream)
      .map(([inputState, state]: [InputState, T]) => updateState(inputState, Object.assign({}, state)))
      .subscribe((state: T) => {
        stream.next(state);
        requestAnimationFrame(() => this.onTick());
      });
    return stream;
  }

  private onTick() {
    this.tick().next();
  }

  private tickInputState(): Observable<InputState> {
    return this.tick()
      .withLatestFrom(this.inputState())
      .map(([, inputState]: [any, any]) => inputState);
  }

  private inputState() {
    return this.mappedInputs()
      .scan((inputState: any, inputEvent: [string, boolean]) => {
        inputState[inputEvent[0]] = inputEvent[1];
        return inputState;
      }, {})
      .startWith({});
  }

  private mappedInputs() {
    return Observable.merge(
      this.keyboard.mappedKeyboardInput(),
      this.mouse.mappedMouseInput()
      );
  }
}
