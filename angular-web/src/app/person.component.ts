import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { PersonService } from './person.service';

@Component({
  selector: 'people',
  templateUrl: './person.component.html',
    styleUrls: ['./person.component.sass']

})
export class PersonComponent implements OnInit {
  people: Person[];
  page: number = 1;
  constructor(private personService: PersonService) {
  }
  ngOnInit(): void {
    this.personService.getPeople()
      .then(people => this.people = people);
  }

}
