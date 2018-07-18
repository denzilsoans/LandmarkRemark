import { IUserLocation } from "./user-location.interface";

export class UserLocation implements IUserLocation {
    public latitude: number = 0;
    public longitude: number = 0;
    public address: string = "";
    public notes: string = "";
    public username: string = "";
    public dateCreated: Date = new Date();
}
