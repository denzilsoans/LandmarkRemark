import { AppConfig } from '../app/app.config';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { UserLocation } from "../models/user-location";


@Injectable()
export class RemarkService {
    baseUrl: string;
    constructor(private http: Http,@Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl
    }

    getLocations(): Observable<UserLocation[]> {
        return this.http
            .get(this.baseUrl + 'Remark/GetUserLocations')
            .map((res: Response) => {
                console.log('Locations found', res.json().location);
                return <UserLocation[]>res.json().location
            })
    }

    addLocation(userLocation: UserLocation): Observable<UserLocation> {
        return this.http
            .post(this.baseUrl + 'Remark/AddUserLocation', userLocation)
            .map((response: Response) => {
                return <UserLocation>response.json().userLocation
            });
    }

    private handleError(error: Response) {
        console.log(error);
        let msg = `Error with ${error.status} and url ${error.url}`
        return Observable.throw(msg);
    }

}