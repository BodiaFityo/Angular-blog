import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export type AlertType = 'success' | 'danger';

export interface Alert {
    text: string;
    type: AlertType;
}

@Injectable()
export class AlertService {
    alert$ = new Subject<Alert>();

    success(text: string, type: AlertType) {
        this.alert$.next({
            type,
            text
        });
    }
}
