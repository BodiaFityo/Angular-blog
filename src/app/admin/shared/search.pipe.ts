import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../../shared/interfaces';

@Pipe({
    name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
    transform(posts: Post[], value = ''): Post[] {
        if (!value.trim()) {
            return posts;
        }
        return posts.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase());
        });
    }
}
