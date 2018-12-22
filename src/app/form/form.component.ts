import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  type: string;

  messageForm: FormGroup;
  submitted = false;
  success = false;
  output: number;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.messageForm = this.formBuilder.group({
      expression: ['', Validators.required]
    });
  }

  onSubmit() {
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
        // lol;
        break;
      case 'third':
        // lol;
        break;
    }
  }

  private first() {
    return this.apiService.calculate(this.messageForm.controls.expression.value)
      .subscribe(data => this.output = data.result);
  }

  ngOnInit() {
  }

}
