import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'repositories',
    loadComponent: () => import('./pages/repositories-list/repositories-list.component')
  },
  { 
    path: 'report',
    loadComponent: () => import('./pages/report/report.component')
  }
];
