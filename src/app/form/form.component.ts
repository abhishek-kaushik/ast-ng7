import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../api.service';
import { Calculate } from '../../utils/calculate';

import { Data } from '../data';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {

  @Input()
  type: string;

  messageForm: FormGroup;
  submitted = false;
  success = false;
  output: number;

  private calculate:Calculate = new Calculate;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
  ) {
    this.messageForm = this.formBuilder.group({
      expression: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;

    switch (this.type) {
      case 'first':
        this.first();
        break;
      case 'second':
        this.second();
        break;
      case 'third':
        // lol;
        break;
    }
  }

  private first(): void {
    this.calculate.solve(this.messageForm.controls.expression.value);

    this.output = parseInt(this.calculate.get(), 10);
  }

  private second(): object {
    return this.apiService.calculate(this.messageForm.controls.expression.value)
      .subscribe((data: Data): void => {
        this.output = data.result;
      });
  }

  ngOnInit() {
  }

}
