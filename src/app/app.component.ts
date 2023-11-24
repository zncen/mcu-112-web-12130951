import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content = '待辦事項 A';

  hasFinished = false;

  
  onSetStatus(hasFinished: boolean): void {
    this.hasFinished = hasFinished;
  }

}