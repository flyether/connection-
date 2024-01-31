import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,

} from '@angular/animations';
import { TodoModel } from '../todo.model';
import { TrimPipe } from '../trim.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  standalone: true,
  imports: [TrimPipe, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('stateAnimation', [
      state('incomplete', style({
        'color': 'black',
        'text-decoration': 'none'
      })),
      state('complete', style({
        'color': '#d9d9d9',
        'text-decoration': 'line-through'
      })),
      transition('incomplete => complete', [
        style({
          'text-decoration': 'line-through'
        }),
        animate('0.2s')
      ]),
      transition('complete => incomplete', [
        style({
          'text-decoration': 'none'
        }),
        animate('0.2s')
      ])
    ])
  ]
})
export class TodoItemComponent {
  @Input() todo: TodoModel;

  @Output() itemModified = new EventEmitter();

  @Output() itemRemoved = new EventEmitter();

  public editing = false;

  @HostBinding('@stateAnimation') get state() {
    return this.todo.completed ? 'complete' : 'incomplete';
  }

  public edit(todo: TodoModel) {
    this.editing = true;
  }

  public cancelEditing() {
    this.editing = false;
  }

  public stopEditing(editedTitle: { value: string; }) {
    if (this.editing) {
      this.editing = false;
      this.todo.setTitle(editedTitle.value);
      if (this.todo.title.length === 0) {
        this.remove();
      } else {
        this.update();
      }
    }
  }

  public toggleCompletion() {
    this.todo.completed = !this.todo.completed;
    this.update();
  }

  public remove() {
    this.itemRemoved.next(this.todo.id);
  }

  public update() {
    this.itemModified.next(this.todo);
  }

}
