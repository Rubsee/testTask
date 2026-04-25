import {Component} from '@angular/core';
import {ConfigComponent} from './config/config';

@Component({
  selector: 'app-root',
  imports: [ConfigComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
