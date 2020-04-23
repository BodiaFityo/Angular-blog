import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../shared/interfaces';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
    post: Post;

    constructor(
        private route: ActivatedRoute,
        private postsService: PostsService,
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.postsService.getPostId(params.id);
            })
        )
            .subscribe(post => {
                this.post = post;
            });
    }

}
