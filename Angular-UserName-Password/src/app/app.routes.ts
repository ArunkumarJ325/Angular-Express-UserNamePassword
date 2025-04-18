import { Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { DisplayUsersComponent } from './components/display-users/display-users.component';

export const routes: Routes = [
  { path: 'add', component: AddUserComponent },
  { path: 'manage', component: ManageUserComponent },
  { path: 'display', component: DisplayUsersComponent },
  { path: '', redirectTo: 'add', pathMatch: 'full' }, // 👈 Default redirect
  { path: '**', redirectTo: 'add' } // 👈 Wildcard fallback redirect (optional)
];
