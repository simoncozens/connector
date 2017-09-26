import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../classes/message';
import { MessageService } from '../../services/message.service';
import { PagedResults } from '../../classes/pagedresults';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'inbox',
  templateUrl: './inbox.component.html'

})
export class InboxComponent implements OnInit {
  result: PagedResults<Message>;
  _page = 1;
  params = {};
  constructor(public messageService: MessageService,
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute) {
  }
  getMessages() {
    this.messageService.getInbox(this._page, this.params)
        .then(result => this.addMoreMessages(result));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.result = null
      this.params = params
      this.page = 1
    })
  }

  @Input() set page(value: number) {
    this._page = value;
    this.getMessages();
  }
  get page() { return this._page; }

  addMoreMessages(result: PagedResults<Message>) {
    if (!this.result) {
      this.result = result
    } else {
      this.result.entries.push.apply(this.result.entries,result.entries)
    }
    console.log(this.result)
  }

  onScroll () {
    this.page = this.page + 1;
  }

}
