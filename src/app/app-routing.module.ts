import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { VideographerListComponent } from './pages/videographer-list/videographer-list.component';
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
        component: EditVideoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      },
      {
        path: 'create',
        component: CreateProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'add-video',
        component: AddVideoComponent,
        canActivate: [AuthGuard]
      },
      { path: '', component: PortfolioComponent }
    ]
  },
  { path: '', component: VideographerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
