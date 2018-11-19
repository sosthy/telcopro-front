import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
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
    this.auth.onLogin(new User(this.form.value)).subscribe(resp => {

      const token = resp.headers.get('Authorization');
      this.auth.setToken(token);
      this.auth.setUser(this.form.value);

      if (resp.ok === true) {
        this.router.navigateByUrl('dashboard');
      }
      console.log(resp);
    });

  }

}
