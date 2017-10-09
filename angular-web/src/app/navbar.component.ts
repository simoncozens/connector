import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from './services/message.service';
import { InterComponentMessageService } from './services/intercomponentmessage.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  searchForm: FormGroup;
  unreadCount: number;
  constructor(public messageService: MessageService,
    public interComponentMessageService: InterComponentMessageService,
    fb: FormBuilder, private router: Router, public auth: AuthService) {
    this.searchForm  = fb.group({
      'fts': ''
      });
    this.reloadUnread();
    this.interComponentMessageService.getMessageFor("navbar").subscribe(message => {
      console.log(message)
      if (message.text =="check read") { this.reloadUnread()}
    })
  }

  reloadUnread() {
    this.messageService.unreadCount().then(result => this.unreadCount = result)
    .catch((error) => console.log(error));
  }

  doSearch(query: any) {
    if (query.fts.length > 2 || query.fts.length == 0)
      this.router.navigate(['people', query]);
  }
  logout() {
    this.auth.logOut();
    this.router.navigate(['']);
  }
}
