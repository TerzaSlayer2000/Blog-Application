import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, FormBuilder,Validators} from '@angular/forms';

import {PostPayload} from './post-payload';

import {AddPostService} from '../add-post.service';

import {Router} from '@angular/router';

 

@Component({

  selector: 'app-add-post',

  templateUrl: './add-post.component.html',

  styleUrls: ['./add-post.component.css']

})

export class AddPostComponent implements OnInit {

 

  addPostForm: FormGroup;

  postPayload: PostPayload;

  title = new FormControl('');

  body = new FormControl('');

 

  constructor(private formBuilder: FormBuilder, private addpostService: AddPostService, private router: Router) {

    this.addPostForm = new FormGroup({

      title: this.title,

      body: this.body

    });

    this.postPayload = {

      id: '',

      content: '',

      title: '',

      username: ''

    }

  }

 

  ngOnInit() {

    this.addPostForm = this.formBuilder.group({

      title: ['', [Validators.required]],

      body: ['', [Validators.required]],

    })

  }

 

  addPost() {

    const bodyControl = this.addPostForm.get('body');

    const titleControl = this.addPostForm.get('title');

 

    if(bodyControl && titleControl)

    {

      this.postPayload.content = bodyControl.value;

      this.postPayload.title = titleControl.value;

    }

   

    this.addpostService.addPost(this.postPayload).subscribe(data => {

      this.router.navigateByUrl('/');

    }, error => {

      console.log('Failure Response');

    })

  }

}