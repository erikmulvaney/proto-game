import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { Map } from '@models/map.model';

@Component({
  selector: 'proto-background-map',
  templateUrl: './background-map.component.html',
  styleUrls: ['./background-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundMapComponent {
  @Input() map: Map;

  constructor() { }
}
