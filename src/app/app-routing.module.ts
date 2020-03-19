import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { AuthGuard } from './guards/auth.guard';
import { EditVideoComponent } from './pages/edit-video/edit-video.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';


const routes: Routes = [
  {
    path: ':name',
    children: [
      {
        path: 'videos/:id/edit',
        loadChildren: () => import('./pages/edit-video/edit-video.module').then(m => m.EditVideoModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        loadChildren: () => import('./pages/edit-profile/edit-profile.module').then(m => m.EditProfileModule),
      },
      {
        path: 'create',
        loadChildren: () => import('./pages/create-profile/create-profile.module').then(m => m.CreateProfileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'add-video',
        loadChildren: () => import('./pages/add-video/add-video.module').then(m => m.AddVideoModule),
        canActivate: [AuthGuard]
      },
      { path: '',
      loadChildren: () => import('./pages/portfolio/portfolio.module').then(m => m.PortfolioModule)
      }
    ]
  },
  {
    path: '',
    loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
