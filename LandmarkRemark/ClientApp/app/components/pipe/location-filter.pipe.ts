import { Pipe, PipeTransform } from '@angular/core';
import { UserLocation } from "../models/user-location";

@Pipe({
  name: 'locationFilter'
})
export class LocationFilterPipe implements PipeTransform {

  transform(value: UserLocation[], filter: any): UserLocation[] {
    filter = filter ? filter.toLocaleLowerCase() : '';
    return filter && value ?
        value.filter(loc =>
           (loc.username && loc.username.toLocaleLowerCase().indexOf(filter) !== -1) ||
           (loc.notes && loc.notes.toLocaleLowerCase().indexOf(filter) !== -1)
        ) :
        value;
  }
}
