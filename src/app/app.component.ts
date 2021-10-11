import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
// import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { filter } from 'rxjs/operators';
import { AuthsService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private router: Router,
        public authService: AuthsService,
        // private toastyService: ToastyService,
        // private toastyConfig: ToastyConfig

    ) {
        //         this.toastyConfig.theme = 'material';
        // this.toastyConfig.timeout = 5000;
        // this.toastyConfig.showClose = true;
        // this.toastyConfig.limit = 2;
        // this.toastyConfig.position = 'top-right';
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
        this.getToken()
    }

    getToken() {
        let credentials = {
            Username: 'Truckee-Service',
            Password: 'Truckee-Service'
        }
        this.authService.oauth(credentials).subscribe((res: any) => {
            console.log('res', res)
        })
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}