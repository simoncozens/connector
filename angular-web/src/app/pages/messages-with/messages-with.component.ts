import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../classes/message';
import { MessageService } from '../../services/message.service';
import { PagedResults } from '../../classes/pagedresults';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {DomSanitizer} from '@angular/platform-browser';
import { Person } from '../../classes/person';
import * as moment from 'moment';

@Component({
  selector: 'messages-with',
  templateUrl: './messages-with.component.html',
    styleUrls: ['../inbox/inbox.component.sass']

})
export class MessagesWithComponent implements OnInit {
  result: PagedResults<Message>;
  _page = 1;
  withId: string;
  newMessage: string;
  with: Person;
  params = {};
  moment;
  constructor(public messageService: MessageService,
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute) {
    this.moment = moment
  }

  getMessages() {
      this.messageService.getThread(this.withId, this._page)
        .then(result => this.addMoreMessages(result))
        .catch((error) => console.log(error));
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.withId = params.get('id')
      this.getMessages()
    });
  }

  @Input() set page(value: number) {
    this._page = value;
    this.getMessages();
  }
  get page() { return this._page; }

  addMoreMessages(result: PagedResults<Message>) {
    this.with = (<any>result).other // Thread stashes more stuff in the response
    if (!this.result) {
      this.result = result
    } else {
      // XXX Actually we need to put them at the start
      this.result.entries.push.apply(this.result.entries,result.entries)
    }
    console.log(this.result)
  }

  onScroll () {
    this.page = this.page + 1;
  }
  sanitize(url:string){return this.sanitizer.bypassSecurityTrustUrl(url); }

  sendMessage() {
    this.messageService.sendMessage(this.withId, this.newMessage)
    .then(response => {
      var r = response.json();
      if (r.ok) {
        // Clear the box
        this.newMessage = ""
        // Add message to list
        this.result.entries.unshift(r.message)
      }
    })
  }

  toMe(message) {
    return message.sender_id.$oid == this.withId
  }
}
