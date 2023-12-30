import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  merge,
  Observable,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Todo } from '../model/todo';
import { TaskService } from '../services/task.service';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoSearchComponent } from '../todo-search/todo-search.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    HeaderComponent,
    TodoListComponent,
    TodoSearchComponent,
    FooterComponent,
  ],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css',
})
export class TodoPageComponent implements OnInit {
  taskService = inject(TaskService);
  tasks$!: Observable<Todo[]>;
  readonly search$ = new BehaviorSubject<string | null>(null);
  readonly refresh$ = new Subject<void>();
  readonly router = inject(Router);
  ngOnInit(): void {
    this.tasks$ = merge(
      this.refresh$.pipe(startWith(undefined)),
      this.search$
    ).pipe(switchMap(() => this.taskService.getAll(this.search$.value)));
  }
  onAdd(): void {
    this.router.navigate(['todo-form']);
  }

  onEdit(id: number): void {
    this.router.navigate(['todo-form', id]);
  }

  onRemove(id: number): void {
    this.taskService.remove(id).subscribe(() => this.refresh$.next());
  }
  onStateChange({ task, state }: { task: Todo; state: boolean }): void {
    this.taskService
      .updateState(task, state)
      .subscribe(() => this.refresh$.next());
  }
  onSearch(content: string | null): void {
    this.search$.next(content);
  }
  onView(id: number): void {
    this.router.navigate(['todo', id]);
  }
}