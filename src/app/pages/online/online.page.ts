import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-online',
  templateUrl: './online.page.html',
  styleUrls: ['./online.page.scss'],
})
export class OnlinePage implements OnInit {
  public countryList:Array<any>;
  public loadedCountryList:Array<any>;
  public countryRef:firebase.database.Reference;


 
  songs: Observable<any[]>;
  contactList:  Observable<any[]>;
  readingsList:  Observable<any[]>;
  public myPerson = {};
   cat: string = "women";


    ngOnInit() {
  }
  
  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }


  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
  
    this.countryList = this.countryList.filter((v) => {
      if(v.Title && q) {
        if (v.Title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  
    console.log(q, this.countryList.length);
  
  }




  constructor( afDatabase: AngularFireDatabase) {
    this.countryRef = firebase.database().ref('/news');
 //this.songs = afDatabase.list('/songs').valueChanges();
  //this.songs = afDatabase.list('/person1').valueChanges();
      this.contactList = afDatabase.list('/contacts').valueChanges();
         this.readingsList = afDatabase.list('/news').valueChanges();
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


  read()
{
  // this.navCtrl.push(HomefivePage);
}


updatePerson(firstName: string, lastName: string): void {
  const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
  personRef.update({ 
    firstName, 
    lastName 
  })
}

deletePerson(): void {
  const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
  personRef.remove()
}


createPerson(firstName: string, lastName: string): void {
  const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
  personRef.push({ 
    firstName, 
    lastName 
  })
}




createNotice(title: string, author: string,content:string): void {
  const personRef: firebase.database.Reference = firebase.database().ref(`/news/`);
  personRef.push({ 
    title, 
    author,
    content 
  })
}


updateNotice(title: string, author: string,content:string): void {
  const personRef: firebase.database.Reference = firebase.database().ref(`/news/`);
  personRef.update({ 
    title, 
    author,
    content 
  })
}

deleteNotice(title: string, author: string,content:string): void {
  const personRef: firebase.database.Reference = firebase.database().ref(`/news/`);
  personRef.remove()
}





}
