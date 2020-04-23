import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreatedResponse, Post} from './interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class PostsService {
    constructor(private http: HttpClient) {
    }

    createPost(post: Post): Observable<any> {
        return this.http.post(`${environment.fbDbUrls}/posts.json`, post)
            .pipe(
                map((response: FbCreatedResponse) => {
                    return {
                        ...post,
                        id: response.name,
                        data: new Date(post.data),
                    };
                })
            );
    }

    getPosts(): Observable<any> {
        return this.http.get(`${environment.fbDbUrls}/posts.json`)
            .pipe(
                map((response: {[key: string]: any}) => {
                    return Object
                        .keys(response)
                        .map(key => ({
                            ...response[key],
                            id: key,
                            date: new Date(response[key].date)
                        }));
                })
            );
    }

    getPostId(id: string): Observable<any> {
       return this.http.get(`${environment.fbDbUrls}/posts/${id}.json`)
           .pipe(
               map((post: Post) => {
                   return {
                       ...post,
                       id,
                       data: new Date(),
                   };
               })
           );
    }

    deletePost(id: string): Observable<void> {
       return this.http.delete<void>(`${environment.fbDbUrls}/posts/${id}.json`);
    }

    updatePost(post) {
        return this.http.patch(`${environment.fbDbUrls}/posts/${post.id}.json`, post);
    }
}
