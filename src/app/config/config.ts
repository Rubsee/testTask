import {Component, inject} from '@angular/core';
import {MockService} from './mockService';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';

type ValidatorsField =
  | { type: "required" }
  | { type: "minLength"; value: number }
  | { type: "maxLength"; value: number }
  | { type: "pattern"; value: string }


export interface FormConfig {
  formId: string;
  title: string;
  version: number;
  fields: FormField[]
}

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  order: number;
  validators: ValidatorsField[];
}

@Component({
  selector: 'app-config',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './config.html',
  styleUrl: './config.scss',
})
export class ConfigComponent {
  mockService = inject(MockService)
  formInfo!: FormConfig

  form = new FormGroup({})

  getJobConfig() {
    this.mockService.getAplicationJob().subscribe(formObj => {
      this.formInfo = formObj;
      const fields = [...this.formInfo.fields].sort((a, b) => a.order - b.order);
      fields.forEach((field) => {
        const validators: ValidatorFn[] = [];

        field.validators.forEach(validator => {
          switch (validator.type) {
            case 'required':
              validators.push(Validators.required)
              break;
            case 'minLength':
              validators.push(Validators.minLength(validator.value))
              break;
            case 'maxLength':
              validators.push(Validators.maxLength(validator.value))
              break;
            case 'pattern':
              validators.push(Validators.pattern(validator.value));
              break;
          }

          this.form.addControl(field.id, new FormControl(null, validators));
        })
      })
    })
  }


  onSubmit() {
    console.log(this.form.value)
  }
}
