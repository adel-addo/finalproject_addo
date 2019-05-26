
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  selectedPath = '';
 
  pages = [
   
    {
      title: 'Pinboard',
      url: '/menu/online'
    },
    {
      title: 'Admin Page',
      url: '/menu/withtabs'
    },
    {
      title: 'Official Website',
      url: '/menu/mediadetails'
    },
    {
      title: 'Online Library',
      url: '/menu/getmedia'
    },
    {
      title: 'ChatPage',
      url: '/menu/chat'
    },
    {
      title: 'Notification Page',
      url: '/menu/notify'
    }
  ];
 
  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
 
  ngOnInit() {
 
  }

}
