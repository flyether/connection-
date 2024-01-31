import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { URLConstants } from './core/models/constants';
import { loginGuard } from './core/guards/login.guard';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [loginGuard],
    loadChildren: () => import('./main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: URLConstants.SINGUP,
    loadChildren: () => import('./singup-page/singup-page.module').then((m) => m.SingupPageModule),
  },
  {
    path: URLConstants.LOGIN,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: URLConstants.GROUP,
    canActivate: [loginGuard],
    loadChildren: () => import('./group/group.module').then((m) => m.GroupModule),
  },
  {
    path: URLConstants.PROFILE,
    canActivate: [loginGuard],
    loadChildren: () => import('./profile-page/profile-page.module').then((m) => m.ProfilePageModule ),
  },

  {
    path: URLConstants.CONVERSATION,
    canActivate: [loginGuard],
    loadChildren: () => import('./person-conversation/person-conversation.module').then((m) => m.PersonConversationModule  ),
  },
  {
    path: URLConstants.TODO ,
    canActivate: [loginGuard],
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule  ),
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
