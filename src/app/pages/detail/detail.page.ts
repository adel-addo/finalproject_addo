import { VideoPlayer ,VideoOptions} from '@ionic-native/video-player/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Media } from '../../models/media.interface';
import { MediaService } from '../../services/media.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  ngOnInit() {

  }
 constructor(){}

}
