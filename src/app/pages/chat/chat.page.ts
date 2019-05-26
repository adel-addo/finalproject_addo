import { Component,  NgZone, OnInit } from '@angular/core';
import { Platform }  from '@ionic/angular';


declare var ApiAIPromises: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  sent=[];
  answers=[];
  constructor(
    public platform: Platform, public ngZone: NgZone)
     {
      platform.ready().then(() => {
        ApiAIPromises.init({
          clientAccessToken: "7b2c09610d5c43e19ad767a46d41f618"
        }).then(result => console.log(result));
      });
}

ask(question) {
 // this.sent.push(question);
  ApiAIPromises.requestText({
    query: question
  })
  .then(({result: {fulfillment: {speech}}}) => {
     this.ngZone.run(()=> {
       this.answers.push(speech);
        this.sent.push({key:question, value: speech});
      
      
     });
  })
}


  ngOnInit() {
  }

}
