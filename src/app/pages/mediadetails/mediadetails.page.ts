import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Media } from '../../models/media.interface';
import { IMedia } from '../../models/imedia.interface';
import { MediaService } from '../../services/media.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
@Component({
  selector: 'app-mediadetails',
  templateUrl: './mediadetails.page.html',
  styleUrls: ['./mediadetails.page.scss'],
})
export class MediadetailsPage implements OnInit {

  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;


  currentImage = null;
  cat: string = "women";
  public mediaList;
  public videoList;
  public mediaId:any;
  public items: Array<any> = [];
  public itemRef =  this.firestore.collection(`photos`);
  constructor(public  router: Router,private camera: Camera, 
    public alertController:AlertController,private callNumber: CallNumber,
    private mediaService: MediaService,private emailComposer: EmailComposer,
    private route: ActivatedRoute,public firestore: AngularFirestore,
    private iab: InAppBrowser
  ) {
    this.countryRef = firebase.database().ref('/video');
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

 




  playlist: Array<IMedia> = [
    {
        title: 'Pale Blue Dot',
        src: 'http://static.videogular.com/assets/videos/videogular.mp4',
        type: 'video/mp4'
    },
    {
        title: 'Big Buck Bunny',
        src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
        type: 'video/mp4'
    },
    {
        title: 'Elephants Dream',
        src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
        type: 'video/mp4'
    }
];
  currentIndex = 0;
  currentItem: IMedia = this.playlist[ this.currentIndex ];



  PlayVideo(item: IMedia,index) {
    this.currentIndex = index;
    this.currentItem = item;
  }


  onClickPlaylistItem(item: IMedia,index) {
    this.currentIndex = index;
    this.currentItem = item;
  }
  ngOnInit() {
    const mediaId: string = this.route.snapshot.paramMap.get('id');
    this.mediaList = this.mediaService.getMediaList().valueChanges();
    this.videoList=this.mediaService.getMediaList().valueChanges();
    this.videoList.on('value', itemSnapshot => {
      this.items = [];
      itemSnapshot.forEach( itemSnap => {
        this.items.push(itemSnap.val());
        return false;
      });
    });
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



public open(url : string){
 // let target = "_system";
  this.iab.create(url);
}






captureImage() {
  const options: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
  }

  this.camera.getPicture(options).then((imageData) => {
    this.currentImage = imageData;
  }, (err) => {
    // Handle error
    console.log('Image error: ', err);
  });
}

sendEmail() {
  let email = {
    to: 'mostb18@gmail.com',
    cc: 'adelbampoe@gmail.com',
    attachments: [
      this.currentImage
    ],
    subject: 'My Cool Image',
    body: 'Hey Simon, what do you thing about this image?',
    isHtml: true
  };

  this.emailComposer.open(email);
}

upload(title,message,mail) {
  let email = {
    to: mail,
    cc: mail,
    attachments: [
      this.currentImage
    ],
    subject: title,
    body: message,
    isHtml: true
  };

  this.emailComposer.open(email);
}




call(number)
{
  this.callNumber.callNumber(number, true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
}



}















  


