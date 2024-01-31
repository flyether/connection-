import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoModel } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);

  public todos: Observable<TodoModel[]> = this._todos.asObservable();

  constructor() {
    
    // const persistedTodos:TodoModel[] =  [];
    const storedData = localStorage.getItem('todos');
    const persistedTodos = storedData ? JSON.parse(storedData) : [];

    const _todos = persistedTodos.map((todo: TodoModel ) => {
      const ret = new TodoModel(todo.title);
      ret.completed = todo.completed;
      ret.id = todo.id;
      return ret;
    });

    this._todos.next(_todos);
  }

  public removeCompleted(): void {
    const todos = this._todos.getValue();
    const remainingTodos = todos.filter((todo: TodoModel) => {
      return todo.completed === false;
    });
    this._todos.next(remainingTodos);
    this._persist();
  }

  public setCompletedToAll(completed: boolean): void {
    const todos = this._todos.getValue();
    todos.forEach((todo) => todo.completed = completed);
    this._todos.next(todos);
    this._persist();
  }

  public add(title:string): void {
    const todos = this._todos.getValue();
    todos.push(new TodoModel(title));
    this._todos.next(todos);
    this._persist();
  }

  public remove(id:string): void {
    const todos = this._todos.getValue();
    const newTodo = todos.filter((t: TodoModel) => {
      return t.id !== id;
    });
    this._todos.next(newTodo);
    this._persist();
  }

  public update(newTodo: TodoModel): void {
    let newTodos = this._todos.getValue();
    newTodos = newTodos.map((todo: TodoModel) => {
      if (newTodo.id === todo.id) {
        return newTodo;
      }

      return todo;
    });

    this._todos.next(newTodos);
    this._persist();
  }

  public toggleCompletion(id:string): void {
    const todos = this._todos.getValue();
    const todo = todos.find((t: TodoModel) => t.id === id);

    if (todo) {
      todo.completed = !todo.completed;
      this._todos.next(todos);
      this._persist();
    }
  }

  private _persist(): void {
    const todos = this._todos.getValue();
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
