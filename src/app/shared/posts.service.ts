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
}
