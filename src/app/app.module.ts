import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './Store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './Store/user/user.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseURLInterceptor } from './interceptors/daseURL.ineceptor';
import { TokenService } from './interceptors/token.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { ButtonStandardComponent } from './components/button-standard/button-standart.component';
import { HeaderComponent } from './components/header/header.component';
import { GropeEffect } from './Store/group/group.effects';
import { ConversationsEffect } from './Store/people/conversations-people.effects';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ModalOkComponent } from './components/modal-ok/modal-ok.component';
import { TimerEffects } from './Store/timers/timer.effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { CustomSerializer } from './Store/router.serializer';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    MatIconModule,
    ErrorModalComponent,
    BrowserModule,
    HeaderComponent,
    AppRoutingModule,
    ButtonStandardComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    LoadingComponent,
    ModalOkComponent,
    StoreModule.forRoot(appReducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(
      UserEffect,
      GropeEffect,
      ConversationsEffect,
      TimerEffects
    ),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseURLInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
