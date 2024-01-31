import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('fakeToken');
  const oauthService: Router = inject(Router);
  if (token) return true;
  oauthService.navigate(['login']);
  return false;
};
