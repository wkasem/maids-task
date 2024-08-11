import { Routes } from '@angular/router';

export const routes: Routes = [
     {path:'' , pathMatch:'full', redirectTo:'/users'},
     {
          path: 'users',
          loadComponent: () => import('./pages/users/users.component').then((component) => component.UsersComponent),
         
     },
     { path: "users/:id", loadComponent: () => import('./pages/user-detail/user-detail.component').then((component) => component.UserDetailComponent) }

];
