import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {RegisterPayload} from '../register-payload';

import {PasswordMatchValidator} from './password-match.validator'

import {AuthService} from '../auth.service';

import {Router} from '@angular/router';

 

@Component({

  selector: 'app-register',

  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css']

})

export class RegisterComponent implements OnInit {

 

  registerForm: FormGroup;

  registerPayload: RegisterPayload;

 

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {

    this.registerForm = this.formBuilder.group({

      username: '',

      email: '',

      password: '',

      confirmPassword: ''

    });

    this.registerPayload = {

      username: '',

      email: '',

      password: '',

      confirmPassword: ''

    };

  }

 

  ngOnInit() {

    this.registerForm = this.formBuilder.group({

      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]+$')]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required]],

    }, {validator: PasswordMatchValidator.matchPassword()});

  }

 

  onSubmit() {

    if(this.registerForm.valid)

    {

            const usernameControl = this.registerForm.get('username');

            const emailControl = this.registerForm.get('email');

            const passwordControl = this.registerForm.get('password');

            const confirmPasswordControl = this.registerForm.get('confirmPassword');

       

            if(usernameControl && emailControl && passwordControl && confirmPasswordControl)

            {

              this.registerPayload.username = usernameControl.value;

              this.registerPayload.email = emailControl.value;

              this.registerPayload.password = passwordControl.value;

              this.registerPayload.confirmPassword = confirmPasswordControl.value;

            }

           

 

              this.authService.register(this.registerPayload).subscribe(data => {

                console.log('register succes');

                this.router.navigateByUrl('/register-success');

              }, error => {

                console.log('register failed');

              });

    }

  }

   

}