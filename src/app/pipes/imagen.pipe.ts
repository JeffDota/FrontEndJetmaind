import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, tipo: any): string {
    //return  `${environment.base_url}/utils/uploads/${tipo}/${img}`;
    if (!img) {
      console.log('no hay imagen');
      return `${environment.base_url}/utils/getDigitalOCean/usuario.PNG`;
    }
    return  `${environment.base_url}/utils/getDigitalOCean/${img}`;
  }

}
