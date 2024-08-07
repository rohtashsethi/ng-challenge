import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = new Router();
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
