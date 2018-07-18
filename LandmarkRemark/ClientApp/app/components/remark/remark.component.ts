import { Component, ViewChild, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { } from '@types/googlemaps';
declare var google: any;
import { forEach } from '@angular/router/src/utils/collection';

import { RemarkService } from "../_services/remark.service";
import { UserLocation } from "../models/user-location";
import { Observable } from "rxjs/Observable";
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MapAddComponent } from "../map-add/map-add.component";

import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
    selector: 'Remark',
    templateUrl: './remark.component.html'
})
export class RemarkComponent implements OnInit {
    loadingApi: boolean = false;
    isNavigating: boolean = false;
    title: string = 'Angular Map';
    lat: number = 0;
    lng: number = 0;
    zoom: number = 16;
    mapLocations: UserLocation[] = [];
    tableLocations: UserLocation[] = [];
    locationToSave: UserLocation = new UserLocation();
    filterString: string = '';

    myLocation: any = {
        latitude: 0,
        longitude: 0,
        address: '',
        label: '',
        iconUrl: './assets/home-map.png',
        notes: '',
        username: '',
        dateCreated: '',
        isHome: true
    };

    map: any;
    currentLat: number = 1.3521;
    currentLong: number = 103.8198;

    constructor(private remarkService: RemarkService,
        private _ngZone: NgZone,
        private ref: ChangeDetectorRef,
        public dialog: MatDialog,
        private _mapsLoader: MapsAPILoader
    ) {
    }

    ngOnInit() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        };

        this.loadUserlocations();
    }

    reCenter() {
        if (navigator.geolocation) {
            this.isNavigating = true;
            navigator.geolocation.getCurrentPosition(this.centerPosition.bind(this));
        };
    }

    centerPosition(position: Position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.isNavigating = false;
    }

    setPosition(position: Position) {
        this.myLocation.latitude = position.coords.latitude;
        this.myLocation.longitude = position.coords.longitude;

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this._mapsLoader.load().then(() => {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(this.myLocation.latitude, this.myLocation.longitude);
            let request = { latLng: latlng };

            var that = this;
            geocoder.geocode(request, (results: any, status: any) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    if (result != null) {
                        this._ngZone.run(() => {
                            that.myLocation.address = result.formatted_address;
                            that.mapLocations.push(this.myLocation);
                        });
                    } else {
                        alert("Unable to find current address");
                    }
                }
            });
        });
       
    }

    loadUserlocations() {
        this.loadingApi = true;
        const that = this;
        this.remarkService.getLocations()
            .subscribe(
                locations => {
                    that.loadingApi = false;
                    that.tableLocations = locations;

                    locations.forEach((item) => {
                        that.mapLocations.push(item);
                    });
                },
                err => {
                    that.loadingApi = false;
                    console.log(err);
            });
    }

    openDialog() {
        let dialogRef = this.dialog.open(MapAddComponent, {
            data: this.myLocation
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.mapLocations.push(result);
                this.tableLocations.push(result);
            }
        });
    }
}
