import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  searchForm: FormGroup;
  constructor(fb: FormBuilder, private router: Router, public auth: AuthService) {
    this.searchForm  = fb.group({
      'fts': ''
      });
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
