import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import {LoginPayload} from '../login-payload';

import {AuthService} from '../auth.service';

import {Router} from '@angular/router';

 

@Component({

  selector: 'app-login',

  templateUrl: './login.component.html',

  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {

 

  loginForm: FormGroup;

  loginPayload: LoginPayload;

  error: String = "";

 

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) {

    this.loginForm = new FormGroup({

      username: new FormControl(),

      password: new FormControl()

    });

    this.loginPayload = {

      username: '',

      password: ''

    };

  }

 

  ngOnInit() {

    this.loginForm = this.formBuilder.group({

      username: ['', [Validators.required]],

      password: ['', [Validators.required]],

    })

  }

 

  onSubmit() {

    if(this.loginForm.valid)

    {

            const usernameControl = this.loginForm.get('username');

            const passwordControl = this.loginForm.get('password');

         

            if(usernameControl && passwordControl)

            {

              this.loginPayload.username = usernameControl.value;

              this.loginPayload.password = passwordControl.value;

            }

           

              this.authService.login(this.loginPayload).subscribe(data => {

              if (data) {

                console.log('login success');

                this.router.navigateByUrl('/home');

              }

              this.error="Login failed";

              console.log('Login failed');

             

            });

    }

   

  }

}