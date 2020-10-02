import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { data } from './data.model'
import { PostsService } from './posts.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  loadedPosts: data[] = [];
  isFetching = false;
  error = null;
  errorSub: Subscription;

  constructor(private http: HttpClient,
              private postservice: PostsService) { }

  ngOnInit() {
    this.errorSub =  this.postservice.error.subscribe(
      (errorMsg) => {
        this.error = errorMsg;
      }
    )
    this.fetchandstorepost();
  }

  onCreatePost(postData: data) {
    // Send Http request
    this.postservice.CreatePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchandstorepost();
  }

  onClearPosts() {
    // Send Http request
    this.postservice.DeletePosts().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

  private fetchandstorepost() {
    this.isFetching = true;
    this.postservice.FetchPosts().subscribe(
      (fetchedPosts) => {
        this.loadedPosts = fetchedPosts;
        this.isFetching = false;
        // console.log( fetchedPosts);
      }, error => {
         this.error = error.message;
         console.log(this.error);
      }
    );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
