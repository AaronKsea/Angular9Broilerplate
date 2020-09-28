import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any , filterText : any): any {
    if (value.length === 0 || filterText === '') {
      return value;
    }
    const filteredServers = [];
    for(let item of value) {
      if(item['status'] == filterText){
        filteredServers.push(item);
      }
    }
    return filteredServers;
  }

}
