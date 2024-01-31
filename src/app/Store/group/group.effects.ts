import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, catchError,   withLatestFrom, mergeMap, of, tap, exhaustMap, take} from 'rxjs';

import { AppState } from '../app.state';

import { GropeService } from './group.service';
import { GroupActions } from './group.action';
import { SharedStateActions } from '../shareState/shredState.action';
import { setErrorMassage } from '../shareState/setServerError';
import { GivMeGroupDialogsList, GivSinceDialogs } from './group.selectors';

@Injectable({
  providedIn: 'root',
})
export class GropeEffect {
  Redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[GroupActions.groupDialogSinceSuccess,GroupActions.groupDialogSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate([`/group/${action.id}`]);
          }
        })
      );
    },
    { dispatch: false }
  );
  RedirectMain$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupActions.groupDelete),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate([""]);
          }
        })
      );
    },
    { dispatch: false }
  );

  postGroupMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupCreateMessage),
      exhaustMap((action) => {
       
          let since = ''
         this.store$.select(GivSinceDialogs).pipe(take(1)).subscribe(e =>since = e )
          return this.groupService.postGropeMessage(action.data ).pipe(
            map(() => {
               const currentDate = new Date();
            const unixTimestamp = currentDate.getTime().toString();
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              this.store$.dispatch(GroupActions.groupDialogStart({ data: { groupID : action.data.groupID } , since: since }))
              return GroupActions.groupSince({data:unixTimestamp })
            }))
        
      })
    );
  });

  getGroupDialogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupDialogStart),
      withLatestFrom(this.store$.pipe(select(GivMeGroupDialogsList))), 
      exhaustMap(([action, groupDialogs]) => {
        const existingGroup = groupDialogs.find((group) => group.id === action.data.groupID);
        if (existingGroup) {
          let since = ''
         this.store$.select(GivSinceDialogs).pipe(take(1)).subscribe(e =>since = e )
          return this.groupService.getGropeDialogs(action.data, since  ).pipe(
            map((res) => {
              const currentDate = new Date();
              const unixTimestamp = currentDate.getTime().toString();
              this.store$.dispatch(GroupActions.groupSince({ data: unixTimestamp }));
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              return GroupActions.groupDialogSinceSuccess({
                data: res,
                redirect: true,
                id: action.data.groupID,
              });
            }))
        } else {
          
          return this.groupService.getGropeDialogs(action.data).pipe(
            map((res) => {
              const currentDate = new Date();
              const unixTimestamp = currentDate.getTime().toString();
              this.store$.dispatch(GroupActions.groupSince({ data: unixTimestamp }));
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              return GroupActions.groupDialogSuccess({
                data: res,
                redirect: true,
                id: action.data.groupID,
              });
            }),
            catchError((errResp) => {
              return of(
                SharedStateActions.setError({ data: setErrorMassage(errResp) })
              );
            })
          );
        }
      })
    );
  });



  getGroupDialogsSince$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupDialogSinceStart),

      mergeMap((action) =>
        this.groupService.getGropeDialogs(action.data, action.since ).pipe(
          map((res) => {
            const currentDate = new Date();
            const unixTimestamp = currentDate.getTime().toString();
            this.store$.dispatch(GroupActions.groupSince({ data: unixTimestamp }));
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return GroupActions.groupDialogSinceSuccess({
              data: res,
              redirect: false,
              id: action.data.groupID,
            });
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        )
      )
    );
  });




  getGroupList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupStart),

      mergeMap((action) =>
        this.groupService.getGropeList().pipe(
          map((res) => {
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return GroupActions.groupSuccess({ data: res });
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        )
      )
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupDelete),
      mergeMap((action) =>
        this.groupService.DeleteGrope(action.data).pipe(
          mergeMap(() => {
            return this.groupService.getGropeList().pipe(
              map((res) => {
                this.store$.dispatch(
                  SharedStateActions.setModalOk({
                    status: true,
                    message: 'a  group has been deleted',
                  })
                );
                this.store$.dispatch(SharedStateActions.setError({ data: '' }));
                return GroupActions.groupSuccess({ data: res });
              })
            );
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        )
      )
    );
  });

  postCreateGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.groupCreateStart),

      mergeMap((action) =>
        this.groupService.postGropeCreate(action.data).pipe(
          map((res) => {
            this.store$.dispatch(
              SharedStateActions.setModalOk({
                status: true,
                message: 'a new group has been created',
              })
            );
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return GroupActions.groupCreateSuccess({ data: res });
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        )
      )
    );
  });

  constructor(
    private router: Router,
    private store$: Store<AppState>,
    private actions$: Actions,
    private groupService: GropeService
  ) {}
}
