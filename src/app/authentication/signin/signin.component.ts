import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {User} from '../../models/user.model';
import {tokenKey} from "@angular/core/src/view";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  textMessage = '';
  constructor(
    private fb: FormBuilder, private router: Router,
    private auth: AuthenticationService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      username: [null , Validators.compose ( [ Validators.required ] )] ,
      password: [null , Validators.compose ( [ Validators.required ] )],
      remember: [false , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    console.log(this.auth.getToken());
    this.textMessage = '... checking, please wait!!!';
    this.auth.onLogin(new User(this.form.value)).subscribe(resp => {

      const token = resp.headers.get('Authorization');
      this.auth.setToken(token);
      this.auth.setUser(this.form.value);
        console.log(resp);
        console.log(resp.ok);

      if (resp.ok === true) {
        this.router.navigateByUrl('dashboard');
      }
    },
      err => {
        console.log(err);
        const  str = '' + err._body;
        if (str.includes('Unauthorized')) {
          this.textMessage = 'your username or your password incorrect!!!';
        } else {
          this.router.navigateByUrl('error/503');
        }
      }
    );

  }

}
