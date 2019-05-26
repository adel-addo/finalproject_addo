import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from "@ionic/angular";
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 

  async presentAlert(error) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Login Error!',
      message: error,
      buttons: [
        {
          text: 'Try Again',
         // role: 'ok',
          handler: () => {
            this.router.navigate(['/login']);
          }
        },
        {
          text: 'Register',
          handler: () => {
            this.router.navigate(['/register']);
          }
        }
      ]

    });

     alert.present();
  }
  
constructor(private router: Router,public alertCtrl: AlertController,
  public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  


  signin(username, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
      .then((user) => {
        if(user) {
          // Redirect the user here
         // this.router.navigateByUrl('/menu/chat');
          this.router.navigate(['/menu/chat']);
        }
      })
      .catch((error) => {
    
        var errorCode = error.code;
        var errorMessage = error.message;
    
        this.presentAlert(errorMessage);
    
    
      });
  
  
    }


login(username, password) {
  this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
    .then((user) => {
      if(user) {
        // Redirect the user here
        this.router.navigate(['/menu/online']);
      }
    }).catch()
    {
        this.presentAlert("User does not exist");
      //this.router.navigate(['/register']);
    };


  }



}
