import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import backend from '../../../backend_requests';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const login = f.value.login;
    const passw = f.value.password;
    console.log(login, passw);
    backend.authorize(login, passw,
      () => {
        console.log('OK');
      },
      () => {
        console.log('not OK');
      });
  }
}
