import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    psSub: Subscription;
    deleteSub: Subscription;
    filter = '';

    constructor(
        private postService: PostsService,
        private alertService: AlertService,
        ) {
    }

    ngOnInit(): void {
       this.psSub = this.postService.getPosts()
            .subscribe(response => {
                this.posts = response;
            });
    }

    onDelete(id) {
        this.deleteSub = this.postService.deletePost(id)
            .subscribe(() => {
                this.alertService.success('Post Deleted', 'danger')
                this.posts = this.posts.filter(item => item.id !== id);
            });
    }

    ngOnDestroy(): void {
        if (this.psSub) {
            this.psSub.unsubscribe();
        }
        if (this.deleteSub) {
            this.deleteSub.unsubscribe();
        }
    }
}
