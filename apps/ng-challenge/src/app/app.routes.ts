import { authGuard } from './guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component')
  },
  {
    path: 'callback',
    loadComponent: () => import('./pages/auth-callback/auth-callback.component')
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.component'),
    children: [
      { 
        path: 'repositories',
        loadComponent: () => import('./pages/repositories-list/repositories-list.component')
      },
      { 
        path: 'report',
        loadComponent: () => import('./pages/report/report.component')
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
