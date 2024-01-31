import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-standard',
  templateUrl: './button-standard.component.html',
  styleUrls: ['./button-standard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
 
})
export class ButtonStandardComponent<T> {
  @Input() link: string;

  @Input() text: string;

  @Input() type = 'button';

  @Input() disabled = false;

  @Output() buttonClick = new EventEmitter<T>();

  handleClick() {
    this.buttonClick.emit();
  }
}
