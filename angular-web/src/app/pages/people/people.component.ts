import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../classes/person';
import { PersonService } from '../../services/person.service';
import { PagedResults } from '../../classes/pagedresults';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
    styleUrls: ['./people.component.sass']

})
export class PeopleComponent implements OnInit {
  result: PagedResults<Person>;
  _page = 1;
  params = {};
  constructor(public personService: PersonService,
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute) {
  }
  getPeople() {
    this.personService.getPeople(this._page, this.params)
        .then(result => this.addMorePeople(result));
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
    this.getPeople();
  }
  get page() { return this._page; }

  addMorePeople(result: PagedResults<Person>) {
    if (!this.result) {
      this.result = result
    } else {
      this.result.entries.push.apply(this.result.entries,result.entries)
    }
  }

  onScroll () {
    this.page = this.page + 1;
  }

  sanitize(url:string){return this.sanitizer.bypassSecurityTrustUrl(url); }

}

@Component({
  selector : 'follows',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class FollowsComponent extends PeopleComponent {
  getPeople() {
    this.personService.getFollows(this._page)
        .then(result => this.addMorePeople(result));
  }
}

@Component({
  selector : 'recent',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class RecentComponent extends PeopleComponent {
  getPeople() {
    this.personService.getRecent(this._page)
        .then(result => this.addMorePeople(result));
  }
}
