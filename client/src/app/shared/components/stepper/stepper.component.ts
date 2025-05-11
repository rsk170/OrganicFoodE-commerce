import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {
  // let the client(child component) tell whether the linear mode is selected
  @Input() linearModeSelected: boolean;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  onClick(index: number)
  {
    // keep track of the steps
    this.selectedIndex = index;
  }

}
