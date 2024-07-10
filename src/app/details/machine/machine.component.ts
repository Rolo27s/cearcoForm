import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-machine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.css'
})
export class MachineComponent {
  @Input() title: string = '';
  @Input() imageName: string = '';
  @Input() description: string = '';

  @Output() machineClicked = new EventEmitter<void>();

  get imagePath(): string {
    return `./assets/images/${this.imageName}`;
  }

  handleClick() {
    this.machineClicked.emit();
  }
}
