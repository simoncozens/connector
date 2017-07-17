import { Component, OnInit, Input } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';
import { PagedResults } from './pagedresults';

@Component({
  selector: 'people',
  templateUrl: './person.component.html',
    styleUrls: ['./person.component.sass']

})
export class PersonComponent implements OnInit {
  result: PagedResults<Person>;
  _page: number = 1;
  constructor(private personService: PersonService) {
  }
  getPeople() {
    this.personService.getPeople(this._page)
      .then(result => this.result = result);
  }
  ngOnInit(): void { this.getPeople() }
  @Input() set page(value: number) {
    this._page = value
    this.getPeople()
  }
  get page() { return this._page }

}
