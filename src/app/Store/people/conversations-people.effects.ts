import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, catchError,   withLatestFrom, mergeMap, of, tap, exhaustMap, take} from 'rxjs';

import { ConversationsActions } from './conversations.action';
import { PeopleConversationsService } from './people-conversations.service';
import { PeopleActions } from './people.action';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { SharedStateActions } from '../shareState/shredState.action';
import { setErrorMassage } from '../shareState/setServerError';
import { Router } from '@angular/router';
import { GivMeConversations, GivMeMeConversationsList, GivMeMeConversationsListPerson, GivSinceConversation } from './people.selectors';

@Injectable({
  providedIn: 'root',
})
export class ConversationsEffect {
  getPeopleList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.peopleStart),

      mergeMap((action) =>
        this.peopleConversationService.getPeopleList().pipe(
          map((res) => {
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));

            return PeopleActions.peopleSuccess({ data: res });
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


  getConversations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.personConversationStart),
      withLatestFrom(this.store$.pipe(select(GivMeMeConversationsListPerson ))), 
      exhaustMap(([action, groupDialogs]) => {
        const existingGroup = groupDialogs.find((group) => group.id === action.data.conversationID);
        if (existingGroup) {
          let since = ''
         this.store$.select(GivSinceConversation).pipe(take(1)).subscribe(e =>since = e )
          return this.peopleConversationService.getConversationPerson(action.data, since  ).pipe(
            map((res) => {
              const currentDate = new Date();
              const unixTimestamp = currentDate.getTime().toString();
              this.store$.dispatch(ConversationsActions.conversationSince({ data: unixTimestamp }));
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              return ConversationsActions.personConversationSinceSuccess({
                data: res,
                redirect: true,
                id: action.data.conversationID,
              });
            }))
        } else {
          
          return this.peopleConversationService.getConversationPerson(action.data).pipe(
            map((res) => {
              const currentDate = new Date();
              const unixTimestamp = currentDate.getTime().toString();
              this.store$.dispatch(ConversationsActions.conversationSince({ data: unixTimestamp }));
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              return ConversationsActions.personConversationSuccess({
                data: res,
                redirect: true,
                id: action.data.conversationID,
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












  getConversationList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.conversationsStart),

      mergeMap((action) =>
        this.peopleConversationService.getConversationsList().pipe(
          map((res) => {
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return ConversationsActions.conversationsSuccess({ data: res });
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


  Redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[ConversationsActions.personConversationSinceSuccess,ConversationsActions.conversationCreateSuccess, ConversationsActions.personConversationSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate([`/conversation/${action.id}`]);
          }
        })
      );
    },
    { dispatch: false }
  );

  RedirectMain$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ConversationsActions.conversationDeleteSuccess),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate([""]);
          }
        })
      );
    },
    { dispatch: false }
  );





  getConversationsSince$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.personConversationSinceStart),

      mergeMap((action) =>
      this.peopleConversationService.getConversationPerson(action.data, action.since ).pipe(
          map((res) => {
            const currentDate = new Date();
            const unixTimestamp = currentDate.getTime().toString();
            this.store$.dispatch(ConversationsActions.conversationSince({ data: unixTimestamp }));
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return ConversationsActions.personConversationSinceSuccess({
              data: res,
              redirect: false,
              id: action.data.conversationID,
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


  postCreateConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.conversationCreateStart),

      mergeMap((action) =>
        this.peopleConversationService.postConversationPersonCreate(action.data).pipe(
          map((res) => {
            this.store$.dispatch(
              SharedStateActions.setModalOk({
                status: true,
                message: 'a new conversation has been created',
              })
            );
            this.store$.dispatch(SharedStateActions.setError({ data: '' }));
            return ConversationsActions.conversationCreateSuccess({ data: res, redirect: true, id: res.conversationID });
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

  postConversationMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.conversationCreateMessage),
      exhaustMap((action) => {

          let since = ''
         this.store$.select(GivSinceConversation).pipe(take(1)).subscribe(e =>since = e )
          return this.peopleConversationService.postConversationPersonMessage(action.data ).pipe(
            map(() => {
              const currentDate = new Date();
              const unixTimestamp = currentDate.getTime().toString();
              this.store$.dispatch(SharedStateActions.setError({ data: '' }));
              this.store$.dispatch(ConversationsActions.personConversationStart({ data: { conversationID : action.data.conversationID } , since: since }))
              return ConversationsActions.conversationSince({data:unixTimestamp })
            }))
        
      })
    );
  });
  deleteConversation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.conversationDelete),
      mergeMap((action) =>
        this.peopleConversationService.DeleteConversation(action.data).pipe(
          map(() => {
            return ConversationsActions.conversationDeleteSuccess({ data:{ conversationID: action.data.conversationID }, redirect: true },);
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
    private actions$: Actions,
    private store$: Store<AppState>,
    private peopleConversationService: PeopleConversationsService
  ) {}
}
