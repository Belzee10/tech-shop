import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      let array = value.split(' ');
      let arrayLength: number = array.length;
      let result: string = '';
      for (let i = 0; i < arrayLength; i++) {
        result += array[i].charAt(0).toLocaleUpperCase()+array[i].slice(1);   
        if ( i+1 != arrayLength && arrayLength > 1 ) {
          result += ' ';
        }
      }           
      return result;
    }
  }

}
