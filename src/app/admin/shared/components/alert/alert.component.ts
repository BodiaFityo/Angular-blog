import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
    private delay = 5000;
    public text;
    public type;
    alertSub: Subscription;

    constructor(private alertService: AlertService) {
    }

    ngOnInit(): void {
       this.alertSub = this.alertService.alert$
            .subscribe(observable => {
                this.text = observable.text;
                this.type = observable.type;
                const closeInterval = setTimeout(() => {
                    clearTimeout(closeInterval);
                    this.text = null;
                }, this.delay);
            });
    }

    ngOnDestroy(): void {
        if (this.alertSub) {
            this.alertSub.unsubscribe();
        }
    }
}
