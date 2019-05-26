import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },


  //{ path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
   //{ path: 'slides', loadChildren: './pages/slides/slides.module#SlidesPageModule' },
   //{ path: 'official', loadChildren: './pages/official/official.module#OfficialPageModule' },

   //{ path: 'mediadetails', loadChildren: './pages/mediadetails/mediadetails.module#MediadetailsPageModule' },
   //{ path: 'getmedia', loadChildren: './pages/getmedia/getmedia.module#GetmediaPageModule' },
   //{path: 'detail', loadChildren: './pages/detail/detail.module#DetailPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
