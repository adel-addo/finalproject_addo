import { VideoPlayer ,VideoOptions} from '@ionic-native/video-player/ngx';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from '../../models/song.interface';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Media } from '../../models/media.interface';
import { MediaService } from '../../services/media.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

@Component({
  selector: 'app-getmedia',
  templateUrl: './getmedia.page.html',
  styleUrls: ['./getmedia.page.scss'],
})
export class GetmediaPage implements OnInit {
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;


  public song: Observable<Song>;
  public media: Observable<Media>;
  public downloadURL: Observable<string>;
  public filetype:  Observable<string>;
  public pdfURL:string;
  public image:string;
  public video:string;
  public selected:string;
  public paths:string;
  public songId:any;
  public mediaList;
  public mediaId:any;
  public fileurl:string;
  public videoList;
  videoOptions:VideoOptions;
  videoUrl:string;
  currentIndex = 0;
  currentItem:string="";
 
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

async presentAlert(error,sub) {
  const alert = await this.alertCtrl.create({
    header: 'Alert',
    subHeader: sub,
    message: error,
    buttons: [
      {
        text: 'Back to login',
       // role: 'ok',
        handler: () => {
          this.router.navigate(['/login']);
        }
      },
      
      {
        text: 'ok',
        role: 'ok',
      }
    ]

  });

   alert.present();
}

  constructor(public  router: Router,private videoPlayer: VideoPlayer,
    public alertController:AlertController,private streamingMedia: StreamingMedia,
    private mediaService: MediaService,public alertCtrl: AlertController,
    private platform: Platform, private file: File, private ft: FileTransfer, 
    private fileOpener: FileOpener, private document: DocumentViewer,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,private theInAppBrowser: InAppBrowser
  ) {  
         // this.selected="";
         // this.fileurl="";
         this.countryRef = firebase.database().ref('/video');
         //this.songs = afDatabase.list('/songs').valueChanges();
         //this.songs = afDatabase.list('/person1').valueChanges();
         // this.persons = firebase.database().ref('/person1/').valueChanges();
         this.countryRef.on('value', countryList => {
           let countries = [];
           countryList.forEach( country => {
             countries.push(country.val());
             return false;
           });
         
           this.countryList = countries;
           this.loadedCountryList = countries;
         });

  }


  ngOnInit() {
    //const mediaId: string = this.route.snapshot.paramMap.get('id');
    this.mediaList = this.mediaService.getMediaList().valueChanges();
    this.videoList=this.mediaService.getVideoList().valueChanges();
       // this.selected="";
         // this.fileurl="";
         this.countryRef = firebase.database().ref('/video');
         //this.songs = afDatabase.list('/songs').valueChanges();
         //this.songs = afDatabase.list('/person1').valueChanges();
         // this.persons = firebase.database().ref('/person1/').valueChanges();
         this.countryRef.on('value', countryList => {
           let countries = [];
           countryList.forEach( country => {
             countries.push(country.val());
             return false;
           });
         
           this.countryList = countries;
           this.loadedCountryList = countries;
         });
    //this.media = this.mediaService.getMediaDetail(mediaId).valueChanges();
    //this.media.subscribe(event => this.downloadURL = this.storage.ref(event.path).getDownloadURL());
    //this.downloadURL.subscribe(event=>this.pdfURL=event)
   // this.downloadURL.subscribe(url => (this.image = url));
  // this.media.subscribe(event=>(this.filetype = event.type))
   //this.downloadURL = this.storage.ref(this.paths).getDownloadURL();
  
   //this.getFile(this.paths);
  }

 
  onClickPlaylistItem(item,index) {
    this.currentIndex = index;
    this.currentItem = item;
}
 
onClick(url,type,index) {
  this.downloadURL = this.storage.ref(url).getDownloadURL();
      this.storage.ref(url).getDownloadURL().subscribe(event=>this.playVideos(event,type,index));
}


    getUrl(url,type)
    {  this.downloadURL = this.storage.ref(url).getDownloadURL();
      this.storage.ref(url).getDownloadURL().subscribe(event=>this.showfile(event,type));
    }

   
    showfile(url,types)
    { this.fileurl=url;

      if(types="image")
      {  
        
         this.showImage(url)
      }
       else if (types="video")
       { 
         
         this.fileurl=url;
         this.streamMedia(url);
       }  
      else if(types="pdf")
      { 
        this.fileurl=url;
        this.downloadPdf(url);
      }
      else{this.OpenPdf(url)}
    }



    downloadAndOpenPdf(url) {
       
   
      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {});
      } else {
        
        this.fileOpener.open(url, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      }

    }


    downloadPdf(downloadUrl) {
    
      let path = this.file.dataDirectory;
      const transfer = this.ft.create();
     
      transfer.download(downloadUrl, path + 'myfile.pdf').then(entry => {
        let url = entry.toURL();
     
        if (this.platform.is('ios')) {
          this.document.viewDocument(url, 'application/pdf', {});
        } else {
          this.fileOpener.open(url, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        }
      });
    }













    OpenPdf(url) {
      this.selected="pdf";
        this.openWithSystemBrowser(url);
    }
  
    showImage(url)
    { this.image=url;
      this.selected="image";
    }

   playVideos(url,type,index)
   {  this.video=url;
    this.currentIndex = index;
  
  }

    async playVideo(url)
    { this.selected="video";
      this.video=url;
    
     try {
        this.videoOptions={volume:0.7}
          //this.videoUrl='https://youtu.be/E4S1yVBUPpk';     
  // Playing a video.y
  this.videoPlayer.play(url,this.videoOptions).then(() => {
    console.log('video completed');
   }).catch(err => {
    console.log(err);
   });
  
        
      } catch (error) {
        
      }
  
    }
  public openWithSystemBrowser(url : string){
    let target = "_system";
    this.theInAppBrowser.create(url,target,this.options);
}
public openWithInAppBrowser(url : string){
    let target = "_blank";
    this.theInAppBrowser.create(url,target,this.options);
}

public openWithCordovaBrowser(url : string){
    let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
}  







async deleteMedia() {
  const alert = await this.alertController.create({
    message: 'Are you sure you want to delete the file?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: blah => {
          console.log('Confirm Cancel: blah');
        },
      },
      {
        text: 'Okay',
        handler: () => {
          this.mediaService.deleteMedia(this.mediaId).then(() => {
            this.router.navigateByUrl('');
          });
        },
      },
    ],
  });

  await alert.present();
}

goto(mediaid)
{
this.router.navigate(['/menu/mediadetails/getmedia', { id: mediaid }]);
}



getFile(paths)
{
  //const paths: string = this.route.snapshot.paramMap.get('path');
  const ref = this.storage.ref(paths);
  this.downloadURL = ref.getDownloadURL();

}




public streamMedia(url){
  let options: StreamingVideoOptions = {
  successCallback: () => { this.presentAlert('Video played',"success") },
  errorCallback: (e) => { this.presentAlert('Error streaming',"Shutting down") },
  orientation: 'portrait'
  };
  this.streamingMedia.playVideo(url, options); //here url is for video url
  }





}
