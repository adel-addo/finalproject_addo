import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GetmediaPage } from './getmedia.page';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
const routes: Routes = [
  {
    path: '',
    component: GetmediaPage,
 
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GetmediaPage]
})
export class GetmediaPageModule {}
