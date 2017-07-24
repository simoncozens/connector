import { Component, OnInit, Input } from '@angular/core';
import { Person } from './person';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PersonService } from './person.service';
import 'rxjs/Rx';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
    styleUrls: ['./people.component.sass']

})
export class PersonComponent implements OnInit {
  person: Person;
  constructor(private personService: PersonService,
        private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.personService.getPerson(params.get('id'))
        .then((person: Person) => this.person = person)
        .catch((error) => console.log(error))
    })
  }
}
