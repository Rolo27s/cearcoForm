import { Component } from '@angular/core';
import { MachineComponent } from './machine/machine.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MachineComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  constructor(private sharedService: SharedService) { }

  onMachineSelect(machine: string) {
    this.sharedService.updateSelectedMachine(machine);
    this.scrollToForm();
  }

  private scrollToForm() {
    const formElement = document.querySelector('#form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
