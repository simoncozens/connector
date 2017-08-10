import { Component, OnInit, Input } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';
import { PagedResults } from './pagedresults';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
    styleUrls: ['./people.component.sass']

})
export class PeopleComponent implements OnInit {
  result: PagedResults<Person>;
  _page = 1;
  constructor(public personService: PersonService, private route: ActivatedRoute) {
  }
  getPeople() {
    this.route.params.subscribe(params => {
      this.personService.getPeople(this._page, params)
        .then(result => this.addMorePeople(result));
    });
  }
  ngOnInit(): void { this.getPeople(); }
  @Input() set page(value: number) {
    this._page = value;
    this.getPeople();
  }
  get page() { return this._page; }

  addMorePeople(result: PagedResults<Person>) {
    if (!this.result) {
      this.result = result
    }
    this._page = result.current_page;
    this.result.entries.push.apply(this.result.entries,result.entries)
  }

  onScroll () {
    this.page = this.page + 1;
  }
}

@Component({
  selector : 'follows',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.sass']
})
export class FollowsComponent extends PeopleComponent {
  getPeople() {
    this.personService.getFollows(this._page)
      .then(result => this.result = result);
  }
}
