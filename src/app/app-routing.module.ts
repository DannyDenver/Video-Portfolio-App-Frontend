import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { VideographerListComponent } from './pages/videographer-list/videographer-list.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: 'your-portfolio',
    component: PortfolioComponent,
    canActivate: [AuthGuard]
  },
  { path: ':name',
  children: [
    { path: 'edit',
      component: EditProfileComponent,
      canActivate: [AuthGuard] 
    },
    { path: ':id', children: [
      { path: 'add-video',
        component: AddVideoComponent,
        canActivate: [AuthGuard]
      }
    ]},
    { path: '', component: PortfolioComponent }    
  ]},
  { path: '', component: VideographerListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
