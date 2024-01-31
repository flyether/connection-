import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerCountSubject = new BehaviorSubject<number>(0);
  private stopTimerSubject = new Subject<void>();
  private timerCountSubjectPeople = new BehaviorSubject<number>(0);
  private stopTimerSubjectPeople = new Subject<void>();

  get timerCount$() {
    return this.timerCountSubject.asObservable();
  }
  get timerCountPeople$() {
    return this.timerCountSubjectPeople.asObservable();
  }


  startTimer() {
    timer(0, 1000)
      .pipe(
        takeUntil(this.stopTimerSubject),
        takeWhile((count) => count <= 60)
      )
      .subscribe((count) => {
        this.timerCountSubject.next(count);
      });
  }
  startTimerPeople() {
    timer(0, 1000)
      .pipe(
        takeUntil(this.stopTimerSubjectPeople),
        takeWhile((count) => count <= 60)
      )
      .subscribe((count) => {
        this.timerCountSubjectPeople.next(count);
      });
  }

  stopTimer() {
    this.stopTimerSubjectPeople.next();
    this.stopTimerSubject.next();
    this.timerCountSubject.next(0);
    this.timerCountSubjectPeople.next(0);
  }
}
