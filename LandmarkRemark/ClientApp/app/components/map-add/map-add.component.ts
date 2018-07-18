import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatCard, MatCardModule } from '@angular/material';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RemarkService } from "../_services/remark.service";
import { UserLocation } from "../models/user-location";

import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-map-add',
    templateUrl: './map-add.component.html',
    styleUrls: ['./map-add.component.css'],
    providers: [RemarkService],
})
export class MapAddComponent implements OnInit {

    locationToSave: UserLocation = new UserLocation;
    locationForm = new FormGroup({
        username: new FormControl(),
        notes: new FormControl()
    });

    constructor(@Inject(MAT_DIALOG_DATA) public myLocation: UserLocation, public dialogRef: MatDialogRef<MapAddComponent>, public remarkService: RemarkService) { }

    ngOnInit() {
    }

    cancel() {
        this.dialogRef.close();
    }

    onSubmit() {
        const formModel = this.locationForm.value;
        var username = "unknown";
        this.locationToSave = new UserLocation();
        if (localStorage.getItem('currentUser')) {
            username = localStorage.getItem('currentUser')!.slice(1, -1);
        }

        this.locationToSave.address = this.myLocation.address;
        this.locationToSave.latitude = this.myLocation.latitude;
        this.locationToSave.longitude = this.myLocation.longitude;
        this.locationToSave.notes = formModel.notes;
        this.locationToSave.username = username
        this.locationToSave.dateCreated = new Date();

        this.remarkService.addLocation(this.locationToSave)
            .subscribe(
                locations => {
                    console.log('User locations saved', locations);
                    this.dialogRef.close(locations);
                });
    }
}
