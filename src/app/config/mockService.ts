import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {FormConfig} from './config';

@Injectable({providedIn: 'root'})
export class MockService {
  getAplicationJob() {
    return of<FormConfig>(
      {
        "formId": "job-application-v2",
        "title": "Анкета соискателя",
        "version": 2,
        "fields": [
          {
            "id": "first_name",
            "type": "text",
            "label": "Имя",
            "placeholder": "Введите имя",
            "order": 1,
            "validators": [
              {"type": "required"},
              {"type": "minLength", "value": 2},
              {"type": "maxLength", "value": 50}
            ]
          },
          {
            "id": "last_name",
            "type": "text",
            "label": "Фамилия",
            "placeholder": "Введите фамилию",
            "order": 2,
            "validators": [
              {"type": "required"},
              {"type": "minLength", "value": 2}
            ]
          },
          {
            "id": "email",
            "type": "text",
            "label": "Email",
            "placeholder": "example@mail.com",
            "order": 3,
            "validators": [
              {"type": "required"},
              {"type": "pattern", "value": "^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$"}
            ]
          },
        ]
      }
    )
  }
}
