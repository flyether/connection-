import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
  map,
  catchError,
  of,
  exhaustMap,
  tap,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { UserActions } from './user.action';
import { AppState } from '../app.state';
import { UserService } from './user.service';
import { GivMeProfile } from './user.selectors';
import { SharedStateActions } from '../shareState/shredState.action';
import { setErrorMassage } from '../shareState/setServerError';

@Injectable({
  providedIn: 'root',
})
export class UserEffect {
  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginUserStart),
      exhaustMap((action) =>
        this.userService.login(action.data).pipe(
          map((res) => {
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            localStorage.setItem('email', action.data.email);
            localStorage.setItem('uid', res.uid);
            localStorage.setItem('fakeToken', res.token);
            return UserActions.loginUserSuccess({ data: res, redirect: true });
          }),
          catchError((errResp) => {
            // this.store$.dispatch(
            //   SharedStateActions.setLoadingShow({ status: false })
            // );

            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        )
      )
    );
  });

  DeleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userDelete),
      exhaustMap((action) => {
        return this.userService.DeleteUser().pipe(
          map(() => {
            this.store$.dispatch(
              SharedStateActions.setModalOk({
                status: true,
                message: 'user successfully deleted',
              })
            );
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            localStorage.clear();
            return UserActions.userDeleteSuccess({ redirect: true });
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ...[UserActions.loginUserSuccess, UserActions.userDeleteSuccess]
        ),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  SingUpUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.singUpUserStart),
      exhaustMap((action) => {
        return this.userService.signUp(action.data).pipe(
          map(() => {
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return UserActions.singUpUserSuccess({ redirect: true });
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        );
      })
    );
  });

  SingUpRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.singUpUserSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/login']);
          }
        })
      );
    },
    { dispatch: false }
  );

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.profileStart),
      withLatestFrom(this.store$.pipe(select(GivMeProfile))),
      switchMap(([action, profile]) => {
        if (profile?.email.S) {
          return [UserActions.profileSuccess({ data: profile })];
        } else {
          return this.userService.getUser().pipe(
            map((res) => {
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              return UserActions.profileSuccess({ data: res });
            }),
            catchError((errResp) => {
              return of(
                SharedStateActions.setError({ data: setErrorMassage(errResp) })
              );
            })
          );
        }
      })
    )
  );

  
  putUserName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.namePut),
      exhaustMap((action) => {
        return this.userService.putName(action.data).pipe(
          map(() => {
            this.store$.dispatch(
              SharedStateActions.setModalOk({
                status: true,
                message: 'name successfully changed',
              })
            );
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return UserActions.nameNewToStore({ name: action.data.name });
          }),
          catchError((errResp) => {
            return of(
              SharedStateActions.setError({ data: setErrorMassage(errResp) })
            );
          })
        );
      })
    )
  );

  // PatchUsers$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(UserActions.patchUser),
  //   exhaustMap((action) =>
  //   this.userService.patchUserMe(action.data).pipe(
  //       map(res=>{  this.store$.dispatch(SharedStateActions.setModalOk({ status: true,message:'Ваши данные обновлены' }))
  //     return UserActions.patchUserSuccess({ data: res })
  //     } ),
  //       catchError((errResp) => {
  //      return of(SharedStateActions.setError({ data: setErrorMassage(errResp)}));
  //    })
  //     )
  //   )
  // )
  // );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store$: Store<AppState>,
    private router: Router
  ) {}
}
