import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class MouseService {
  private mouseDown$ = new Subject<string>();
  private mouseUp$ = new Subject<string>();

  private mouseInput$: Observable<(string | boolean)[]>;

  constructor() {
    this.mouseInput$ = this.mouseInputSetup();
  }

  mouseDown(name: string) {
    this.mouseDown$.next(name);
  }

  mouseUp(name: string) {
    this.mouseUp$.next(name);
  }

  mappedMouseInput() {
    return this.mouseInput$;
  }

  private mouseInputSetup() {
    let mouseTrue$ = this.mouseDown$.map((name: string) => [name, true]);
    let mouseFalse$ = this.mouseUp$.map((name: string) => [name, false]);

    let mouseState$ = Observable.merge(mouseTrue$, mouseFalse$);
    return mouseState$.share();
  }
}