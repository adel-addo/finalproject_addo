import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { StreamingMedia} from '@ionic-native/streaming-media/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import * as firebase from 'firebase/app';
import { Camera } from '@ionic-native/camera/ngx';
import { from } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { DropZoneDirective } from './directives/drop-zone.directive';
export const firebaseConfig = {
  apiKey: "AIzaSyBLXwIQDqMIE-fzsxbFg2i-9ybbzrg3VYI",
  authDomain			: "myschoolapp-a2e02.firebaseapp.com",
  databaseURL			: "https://myschoolapp-a2e02.firebaseio.com",
  projectId				: "myschoolapp-a2e02",
  storageBucket			: "myschoolapp-a2e02.appspot.com",
  messagingSenderId		: "627547798901"
  
};
@NgModule({
  declarations: [AppComponent, DropZoneDirective],
  entryComponents: [],
  imports: [ BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
 //   AngularFireAuth,
    AppRoutingModule
  
  
  ],
  providers: [
    StatusBar,
    VideoPlayer,
    AngularFireAuth,
    SplashScreen,
    OneSignal,
    File, Camera,
    EmailComposer,
    CallNumber,
    InAppBrowser,
    StreamingMedia,
    FileOpener,
    FileTransfer,
    DocumentViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
