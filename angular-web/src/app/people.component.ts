import { Component, OnInit, Input } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';
import { PagedResults } from './pagedresults';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
    styleUrls: ['./people.component.sass']

})
export class PeopleComponent implements OnInit {
  result: PagedResults<Person>;
  _page: number = 1;
  constructor(public personService: PersonService, private route: ActivatedRoute) {
  }
  getPeople() {
    this.route.params.subscribe(params => {
      this.personService.getPeople(this._page, params)
        .then(result => this.result = result);
    })
  }
  ngOnInit(): void { this.getPeople() }
  @Input() set page(value: number) {
    this._page = value
    this.getPeople()
  }
  get page() { return this._page }
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
