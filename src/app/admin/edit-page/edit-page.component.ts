import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../../shared/posts.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {pipe, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    post: Post;
    submited = false;
    upSub: Subscription;

    constructor(
        private postsService: PostsService,
        private rout: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
    ) {
    }

    ngOnInit(): void {
        this.rout.params.pipe(
                switchMap((params: Params) => {
                    return this.postsService.getPostId(params.id);
                })
            )
            .subscribe((post: Post) => {
                this.post = post;
                this.form = new FormGroup({
                    title: new FormControl(post.title, Validators.required),
                    text: new FormControl(post.text, Validators.required)
                });
            });
    }

    onSave() {
        this.submited = true;
        const updatedPost: Post = {
            ...this.post,
            title: this.form.value.title,
            text: this.form.value.text,
        };
        this.upSub = this.postsService.updatePost(updatedPost)
            .subscribe(() => {
                this.submited = false;
                this.alertService.success('Post Updated', 'success');
                this.router.navigate(['/admin', 'dashboard']);
            });
    }

    ngOnDestroy(): void {
        if (this.upSub) {
            this.upSub.unsubscribe();
        }
    }
}
