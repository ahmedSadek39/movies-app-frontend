import { CanActivateFn } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  let token = localStorage.getItem('token') || '';
  let role = localStorage.getItem('role') || '';

  return token != '' && (role === 'ADMIN' || role === 'USER');
};
