import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'urlImage'
})
export class UrlImagePipe implements PipeTransform {

  private url = environment.apiUrl+'/categories';

  transform(value: string, args?: any): any {

    let url: string = environment.apiUrlImage;

    return value ? url+value.replace('public', 'storage') : '';

  }

}
