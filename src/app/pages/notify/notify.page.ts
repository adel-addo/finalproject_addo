import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { OneSignal } from '@ionic-native/onesignal/ngx';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {

  constructor(
    private _PLATFORM : Platform,
    private _SIGNAL   : OneSignal)
{
this._PLATFORM.ready()
.then(() =>
{
this.triggerNotification();
});
}


triggerNotification()
{

   // Define settings for iOS
   var iosSettings = {};
   iosSettings["kOSSettingsKeyAutoPrompt"] = true;
   iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;


   // Initialise plugin with OneSignal service
   this._SIGNAL.startInit("6c3d1434-01d9-4861-88f8-44ae2ddaca02", 
                          "627547798901").iOSSettings(iosSettings);


   // Control how OneSignal notifications will be shown when
   // one is received while your app is in focus
   this._SIGNAL.inFocusDisplaying( this._SIGNAL.OSInFocusDisplayOption.InAppAlert);


   // Retrieve the OneSignal user id and the device token
   this._SIGNAL.getIds()
   .then((ids) =>
   {
      console.log('getIds: ' + JSON.stringify(ids));
   });


   // When a push notification is received handle
   // how the application will respond
   this._SIGNAL.handleNotificationReceived()
   .subscribe((msg) =>
   {
      // Log data received from the push notification service
      console.log('Notification received');
      console.dir(msg);
   });


   // When a push notification is opened by the user
   // handle how the application will respond
   this._SIGNAL.handleNotificationOpened()
   .subscribe((msg) =>
   {
      // Log data received from the push notification service
      console.log('Notification opened');
      console.dir(msg);
   });


   // End plugin initialisation
   this._SIGNAL.endInit();

}

  ngOnInit() {
  }

}
