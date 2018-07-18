import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public displayHeader = true;
    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
        this.displayHeader = this.authService.isLoggedIn();
    }
}


