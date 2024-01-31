import { AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { SharedStateSelectors } from './Store/shareState/sareState.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'connections';
  errorServer$: Observable<string>;
  showLoading$: Observable<boolean>;
  okModal$: Observable<boolean>;

  constructor( public loader: LoaderService, private store$: Store) {}
  ngOnInit(): void {
  
    this.errorServer$ = this.store$.select(SharedStateSelectors.errorFromServer)
    this.showLoading$ = this.store$.select(SharedStateSelectors.isLoading)
    this.okModal$ = this.store$.select(SharedStateSelectors.modalOkStatus)
   
  }
   
}
// export class AppComponent {
//   title = 'connections';
//   loader$ = this.loader.isLoading$;

//   constructor(
//     public loader: LoaderService,
//     private zone: NgZone,
//     private appRef: ApplicationRef
//   ) {}

//   ngAfterViewInit(): void {
//     this.loader$.subscribe(() => {
//       this.zone.runOutsideAngular(() => {
//         setTimeout(() => {
//           this.zone.run(() => {
//             this.appRef.tick();
//           });
//         });
//       });
//     });
//   }
// }