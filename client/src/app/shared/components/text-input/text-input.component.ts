import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  // access to the native element which is the input field
  @ViewChild('input', {static: true}) input: ElementRef;

  // override whether this element is a type of text input and take label as well
  @Input() type = 'text';
  @Input() label: string;

  // access to the control iteself (its properties and validation) by injecting it in constructor
  constructor(@Self() public controlDir: NgControl) {
    // binds this to the class  - access to the control directive inside the component
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;

    // what validators have been set on this control
    const validators = control.validator ? [control.validator] : [];

    // async validators which are applied after the sync validators - checks in the API
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);

    // validate the form on initialization
    control.updateValueAndValidity();
  }

  onChange(event) { }
  onTouched() { }

  // methods from the ControlValueAccessor class - bridge between Angular forms and input element in DOM
  // get value from input and write it into this
  // gives CVA access to what was input in the input field
  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
