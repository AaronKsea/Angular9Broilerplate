import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http'
import { map, tap } from 'rxjs/operators'

import { data } from './data.model'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  error = new Subject<string>();
  constructor(private http: HttpClient
              ) { }

  CreatePost(postData: data) {
    this.http
      .post<{ name: string }>(
        'https://angulartest-ac673.firebaseio.com/posts.json',
        postData,{
          observe: 'body' //default is 'body' so we get name: 'UNIQUE_KEY' only as responsedata
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  FetchPosts(): Observable<data[]> {
    let params = new HttpParams();
    params = params.append('print','pretty');
    params = params.append('key','custom');

    return this.http.get<{ [key: string]: data }>('https://angulartest-ac673.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders({'customHeader':'This is a custom header'}),
      // params: new HttpParams().set('print', 'pretty')
      params: params
    })
      .pipe(map(
        (responseData) => {
            const responseDataArray: data[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                responseDataArray.push({ ...responseData[key], id: key })
              }
            }
            return responseDataArray;
          }
        )
      )
  };

  DeletePosts() {
    return this.http.delete('https://angulartest-ac673.firebaseio.com/posts.json', {
      observe: 'events'
    }
    ).pipe(tap(
      (events) => {
        console.log(events);
        if(events.type == HttpEventType.Response)
        {
          console.log(events.body);
        }
        if(events.type == HttpEventType.Sent){
          console.log(events.type);
        }
      }
    ))
  }
}
