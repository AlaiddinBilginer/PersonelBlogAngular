import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './reader/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RegisterComponent } from './reader/components/register/register.component';
import { LoginComponent } from './reader/components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { 
    path: 'blogs', loadChildren: () => 
      import('./reader/components/blogs/blogs.module')
        .then((module) => module.BlogsModule)
  },

  { 
    path: 'writer', loadChildren: () => 
      import('./writer/components/components.module')
        .then((module) => module.ComponentsModule)
  },

  { path: 'admin', component: LayoutComponent},

  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},

  { path: '**', pathMatch: 'full', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
