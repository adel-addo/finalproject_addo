import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WithtabsPage } from './withtabs.page';

const routes: Routes = [
  {
    path: '',
    component: WithtabsPage,
    children: [
     
      { path: 'slides', loadChildren: '../slides/slides.module#SlidesPageModule' },
      { path: 'official', loadChildren: '../official/official.module#OfficialPageModule' }
    ]
  },

  { path: '',  redirectTo: '/menu/withtabs/slides',   pathMatch: 'full' }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WithtabsPage]
})
export class WithtabsPageModule {}
