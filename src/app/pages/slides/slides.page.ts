import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MediaService, FileType } from '../../services/media.service'
import * as firebase from 'firebase'
import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  ngOnInit() {
  }

  results: Observable<any>;
  searchTerm: string = '';
  type: FileType = FileType.all;
  title:string='';
  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  
  getTitle(title)
  {this.title=title;}
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    /*
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }
*/
    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    //this.snapshot   = this.task.snapshotChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          
                   const ref = this.storage.ref(path);
                   this.downloadURL = ref.getDownloadURL();

          // Update firestore on completion
          const id = this.db.createId();
            
           this.db.doc(`photos/${id}`).set( { id:id,title:this.title,type:this.type,path, size: snap.totalBytes})
           this.uploadFile(id,this.title,path,this.type,snap.totalBytes);
          //this.db.collection('photos').add( { title:this.title,type:this.type,path, size: snap.totalBytes})
        }
      })
    )
    
  //  const ref = this.storage.ref(path);
    // The file's download URL
   //  this.downloadURL = this.storage.upload(path, file, { customMetadata }). 


  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  
  upload(title,url,type)
  {
      
           
   this.db.doc(`files/${this.title}`).set( { title:title,url:url,type:type})
 

  }
 
  uploadFile(id,title,path,type,size): void {
    const name=type;
    const personRef: firebase.database.Reference = firebase.database().ref(`/`+name);
    personRef.push({ 
      title, 
     path,
     size,
     id,
      type
    })
  }
  




}
