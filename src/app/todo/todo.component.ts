import { Component , HostBinding} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

// V1
const enterTransition = transition(':enter', [
  style({
    opacity: 0,
    color: 'yellow'
  }),
  animate('1s ease-in', style({
    opacity: 1,
    color: 'green'
  }))
])

const exitTransition = transition(':leave', [
  style({
    opacity: 1,
    color: 'red'
  }),
  animate('1s ease-in', style({
    opacity: 0,
    color: 'blue'
  }))
])
const fadeIn = trigger('fadeIn', [enterTransition])
const fadeOut = trigger('fadeOut', [exitTransition])

// v2
const fadeInOut = trigger('fadeInOut', [state('open', style({
 opacity: 0,
   color: 'yellow'
  })),
 state('close', style ({opacity: 1,
  color: 'blue'
})),
transition('open => *', [animate('1s ease-out')]),
transition('* => open', [animate('1s ease-in')])
]
  )

// V3
const fadeInOut3 = trigger('fadeInOut3', [
  state(
    'in',
    style ({opacity: 1,
        color: 'red'
      })
  ),
  transition('void => *', [ style ({opacity: 0,
    color: 'pink'
  }), animate('1s ease-out')]),
  transition('* => void', [ style ({opacity: 0,
    color: 'green'
  }), animate('1s ease-out')])
] )

import { TodoListComponent } from './todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [
    TodoListComponent,
     CommonModule
  ],
  animations: [
    fadeInOut,
    fadeIn, fadeOut, fadeInOut3
  ]
  // animations: [
  //   fadeIn, fadeOut
  // ]
})
export class TodoComponent {
  shown = false
// $event: AnimationEvent;
  onClick() {
this.shown = !this.shown
  }

   onAnimationDone(event: AnimationEvent){
    console.log( 'onAnimationDone')

  }
   onAnimationStart(event: AnimationEvent){
    console.log( 'onAnimationStart')
  }
}
