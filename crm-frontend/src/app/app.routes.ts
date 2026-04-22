import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

// Auth Guard
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'clients', 
    loadComponent: () => import('./features/clients/client-list/client-list.component').then(m => m.ClientListComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'clients/new', 
    loadComponent: () => import('./features/clients/client-form/client-form.component').then(m => m.ClientFormComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'clients/:id/edit', 
    loadComponent: () => import('./features/clients/client-form/client-form.component').then(m => m.ClientFormComponent),
    canActivate: [authGuard]
  }
];