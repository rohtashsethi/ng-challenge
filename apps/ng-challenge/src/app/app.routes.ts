import { Routes } from '@angular/router';
import { authGuard } from '@lib/core';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadComponent: () => import('@lib/features/auth').then(m => m.AuthComponent)
  },
  {
    path: 'callback',
    loadComponent: () => import('@lib/features/auth-callback').then(m => m.AuthCallbackComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('@lib/features/home').then(m => m.HomeComponent),
    children: [
      { 
        path: 'repositories',
        loadComponent: () => import('@lib/features/reporitories').then(m => m.RepositoriesComponent)
      },
      { 
        path: 'report',
        loadComponent: () => import('@lib/features/reports').then(m => m.ReportComponent)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
