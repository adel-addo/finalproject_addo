import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminGuard } from '../../guards/admin.guard';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'online', loadChildren: '../online/online.module#OnlinePageModule' },
      { path: 'withtabs', loadChildren: '../withtabs/withtabs.module#WithtabsPageModule',canActivate: [AdminGuard]},

      { path: 'chat', loadChildren: '../chat/chat.module#ChatPageModule'  },
      { path: 'mediadetails', loadChildren: '../mediadetails/mediadetails.module#MediadetailsPageModule' },
      { path: 'getmedia', loadChildren: '../getmedia/getmedia.module#GetmediaPageModule' },
      { path: 'notify', loadChildren: '../notify/notify.module#NotifyPageModule' },
      //{ path: 'mediadetails/getmedia/:id', loadChildren: '../getmedia/getmedia.module#GetmediaPageModule' },
    // {path: 'getmedia/:id', loadChildren: '../detail/detail.module#DetailPageModule'}
    
  
  ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
