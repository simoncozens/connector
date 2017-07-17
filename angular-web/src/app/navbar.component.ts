import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  searchForm : FormGroup;
  constructor(fb: FormBuilder){
    this.searchForm  = fb.group({})
  }
}
