import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedMachineSource = new BehaviorSubject<string>('');
  selectedMachine$ = this.selectedMachineSource.asObservable();

  updateSelectedMachine(machine: string) {
    this.selectedMachineSource.next(machine);
  }
}
