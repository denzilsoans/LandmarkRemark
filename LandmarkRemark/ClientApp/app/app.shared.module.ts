import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatDialogModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationFilterPipe } from "./components/pipe/location-filter.pipe";

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RemarkComponent } from './components/remark/remark.component';
import { MapAddComponent } from './components/map-add/map-add.component';

import { AgmCoreModule, MapsAPILoader } from "angular2-google-maps/core";

import { AlertService } from './components/_services/alert.service';
import { AuthenticationService } from './components/_services/authentication.service';
import { RemarkService } from './components/_services/remark.service';
import { UserService } from './components/_services/user.service';
import { AuthGuard } from './components/_guards/auth.guard';
import { AppConfig } from './components/app/app.config';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RemarkComponent,
        MapAddComponent,
        LocationFilterPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        AgmCoreModule,
        RouterModule.forRoot([
            { path: '', component: RemarkComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent },
            { path: 'remark', component: RemarkComponent },
            { path: '**', redirectTo: 'login' }
        ]),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyA4LJ1DjsaPkD0A2MMjTGMMvbej7dZnRcg' })
    ],
    providers: [
        AppConfig,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        RemarkService
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [MapAddComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModuleShared {
}
