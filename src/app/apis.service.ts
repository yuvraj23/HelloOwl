import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  public localUrl='http://127.0.0.1:8000/'
  public liveUrl='https://hellonightowl.pythonanywhere.com/'
  public rootURL = this.liveUrl; 

  constructor(private http: HttpClient) { }


  public getData(){
    return  this.http.get(this.rootURL + 'posts');
  }

  public updateData(blog:any){
    return  this.http.put(this.rootURL + 'post/like/update/'+blog.id+"/",blog);
  }

  public addSubscriber(subscribe:any){
    return  this.http.post(this.rootURL + 'add/subscriber/',subscribe);
  }
  public  getTaggedPost(tags:any){
    return  this.http.get(this.rootURL + 'tagged/post/'+tags.tags+"/");
  }

  
}
