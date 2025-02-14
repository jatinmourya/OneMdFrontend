import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewComponent } from './components/view/view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'edit/:id', component: RegisterComponent },
];
