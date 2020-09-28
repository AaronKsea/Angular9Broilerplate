import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'shorten'
})

export class shortenpipe implements PipeTransform {
    transform(value: any) {
        if (value.length > 10) {
            return value.substr(0, 10) + '...';
        }
        return value;

    }
}