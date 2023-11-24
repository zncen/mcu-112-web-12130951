import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content = '待辦事項 A';
  hasFinished = false;
}