import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MediaService, UserType } from '../../services/media.service'
import * as firebase from 'firebase'
import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
@Component({
  selector: 'app-official',
  templateUrl: './official.page.html',
  styleUrls: ['./official.page.scss'],
})
export class OfficialPage implements OnInit {
  ids:string;

   
  constructor(private storage: AngularFireStorage, private db: AngularFirestore) 
  {
    
   }

   createUser(username,email,roles)
   {
       this.ids = email;
            
    this.db.doc(`users/${this.ids}`).set( { username:username,email:email,roles:roles})

   }


   
  ngOnInit() {
  }

}
