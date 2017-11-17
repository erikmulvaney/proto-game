import { Component, Input } from '@angular/core';

@Component({
  selector: 'proto-sprite',
  templateUrl: './sprite.component.html',
  styleUrls: ['./sprite.component.scss']
})
export class SpriteComponent {
  @Input() src: string;
  @Input() height: number;
  @Input() width: number;
  @Input() xOffset: number;
  @Input() yOffset: number;

  constructor() { }
}
