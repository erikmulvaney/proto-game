import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/withLatestFrom';

export interface KeyBinding {
  [name: string]: string
}

interface Binding {
  keys: string[];
  action: string;
}

interface RegisteredBindings {
  [name: string]: Binding[];
}

const KEYDOWN = 'keydown';
const KEYUP = 'keyup';

@Injectable()
export class KeyboardService {
  public static KeyA = ['a', 'A'];
  public static KeyB = ['b', 'B'];
  public static KeyC = ['c', 'C'];
  public static KeyD = ['d', 'D'];
  public static KeyE = ['e', 'E'];
  public static KeyF = ['f', 'F'];
  public static KeyG = ['g', 'G'];
  public static KeyH = ['h', 'H'];
  public static KeyI = ['i', 'I'];
  public static KeyJ = ['j', 'J'];
  public static KeyK = ['k', 'K'];
  public static KeyL = ['l', 'L'];
  public static KeyM = ['m', 'M'];
  public static KeyN = ['n', 'N'];
  public static KeyO = ['o', 'O'];
  public static KeyP = ['p', 'P'];
  public static KeyQ = ['q', 'Q'];
  public static KeyR = ['r', 'R'];
  public static KeyS = ['s', 'S'];
  public static KeyT = ['t', 'T'];
  public static KeyU = ['u', 'U'];
  public static KeyV = ['v', 'V'];
  public static KeyW = ['w', 'W'];
  public static KeyX = ['x', 'X'];
  public static KeyY = ['y', 'Y'];
  public static KeyZ = ['z', 'Z'];
  public static Key0 = ['0'];
  public static Key1 = ['1'];
  public static Key2 = ['2'];
  public static Key3 = ['3'];
  public static Key4 = ['4'];
  public static Key5 = ['5'];
  public static Key6 = ['6'];
  public static Key7 = ['7'];
  public static Key8 = ['8'];
  public static Key9 = ['9'];
  public static Left = ['ArrowLeft', 'Left'];
  public static Right = ['ArrowRight', 'Right'];
  public static Up = ['ArrowUp', 'Up'];
  public static Down = ['ArrowDown', 'Down'];
  public static Enter = ['Enter'];
  public static Tab = ['Tab'];
  public static Spacebar = [' ', 'Spacebar'];
  public static Alt = ['Alt'];
  public static Ctrl = ['Control'];
  public static Meta = ['Meta', 'OS'];
  public static Shift = ['Shift'];

  private static keys = new Set([
    ...KeyboardService.KeyA,
    ...KeyboardService.KeyB,
    ...KeyboardService.KeyC,
    ...KeyboardService.KeyD,
    ...KeyboardService.KeyE,
    ...KeyboardService.KeyF,
    ...KeyboardService.KeyG,
    ...KeyboardService.KeyH,
    ...KeyboardService.KeyI,
    ...KeyboardService.KeyJ,
    ...KeyboardService.KeyK,
    ...KeyboardService.KeyL,
    ...KeyboardService.KeyM,
    ...KeyboardService.KeyN,
    ...KeyboardService.KeyO,
    ...KeyboardService.KeyP,
    ...KeyboardService.KeyQ,
    ...KeyboardService.KeyR,
    ...KeyboardService.KeyS,
    ...KeyboardService.KeyT,
    ...KeyboardService.KeyU,
    ...KeyboardService.KeyV,
    ...KeyboardService.KeyW,
    ...KeyboardService.KeyX,
    ...KeyboardService.KeyY,
    ...KeyboardService.KeyZ,
    ...KeyboardService.Key0,
    ...KeyboardService.Key1,
    ...KeyboardService.Key2,
    ...KeyboardService.Key3,
    ...KeyboardService.Key4,
    ...KeyboardService.Key5,
    ...KeyboardService.Key6,
    ...KeyboardService.Key7,
    ...KeyboardService.Key8,
    ...KeyboardService.Key9,
    ...KeyboardService.Left,
    ...KeyboardService.Right,
    ...KeyboardService.Up,
    ...KeyboardService.Down,
    ...KeyboardService.Enter,
    ...KeyboardService.Tab,
    ...KeyboardService.Spacebar,
    ...KeyboardService.Alt,
    ...KeyboardService.Ctrl,
    ...KeyboardService.Meta,
    ...KeyboardService.Shift,
  ]);

  private keyboardInput$: Observable<(string | boolean)[]>;
  private binding$: BehaviorSubject<KeyBinding> = new BehaviorSubject({});

  private registeredBindings: RegisteredBindings = {};

  constructor() {
    this.keyboardInput$ = this.keyboardInputSetup();
  }

  addBinding(name: string, bindings: Binding[]) {
    this.registeredBindings[name] = bindings;
    this.updateBindings();
  }

  removeBinding(name: string) {
    delete this.registeredBindings[name];
    this.updateBindings();
  }

  removeAllBindings() {
    this.registeredBindings = {};
    this.updateBindings();
  }

  mappedKeyboardInput() {
    return this.keyboardInput$
      .withLatestFrom(this.binding$)
      .filter(([[key], binding]: [[string], KeyBinding]) => new Set(Object.keys(binding)).has(key))
      .map(([[key, flag], binding]: [[string, boolean], KeyBinding]) => [binding[key], flag]);
  }

  private updateBindings() {
    let bindings: KeyBinding = {};
    Object.keys(this.registeredBindings).forEach((key: string) => {
      let keyBindings = this.registeredBindings[key];
      keyBindings.forEach((binding: Binding) => {
        binding.keys.forEach((key: string) => {
          if (KeyboardService.keys.has(key)) {
            bindings[key] = binding.action;
          }
        });
      });
    });
    this.binding$.next(bindings);
  }

  private keyboardInputSetup() {
    let keyTrue$ = Observable.fromEvent(document, KEYDOWN).map((event: KeyboardEvent) => [event.key, true]);
    let keyFalse$ = Observable.fromEvent(document, KEYUP).map((event: KeyboardEvent) => [event.key, false]);

    let keyState$ = Observable.merge(keyTrue$, keyFalse$);
    return keyState$.share();
  }
}