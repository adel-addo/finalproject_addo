import { Injectable } from '@angular/core';
import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { Media } from '../models/media.interface'
import { AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';
export enum UserType {
  admin = 'admin',
  editor = 'editor',
  student= 'student',

}
export enum FileType {
  all = '',
  image = 'image',
  video = 'video',
  pdf = 'pdf',
  docs='docs'
}
@Injectable({
  providedIn: 'root'
})
export class MediaService {
  getMediaList(): AngularFirestoreCollection<Media> {
    return this.firestore.collection(`photos`);
  }
  getMediaDetail(mediaId: string): AngularFirestoreDocument<Media> {
    return this.firestore.collection('photos').doc(mediaId);
  }

  deleteMedia(mediaId: string): Promise<void> {
    return this.firestore.doc(`photos/${mediaId}`).delete();
  }

 
  getVideoList(): AngularFirestoreCollection<Media> {
    return this.firestore.collection(`files`);
  }

  constructor(public firestore: AngularFirestore) {}


}
