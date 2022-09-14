import { Pipe, PipeTransform } from '@angular/core';
import { MarcaService } from '../pages/services/marca.service';

@Pipe({
  name: 'marca'
})
export class MarcaPipe implements PipeTransform {
  constructor(private marcaService:MarcaService) { }
  async transform(dato: any): Promise<string> {
    const data1:any =  this.marcaService.obtenerMarcaById(dato).subscribe(async(res:any) => {
      console.log('PIPE MARCA 1',res);
      return await res.data.nombre;
    })
    console.log('PIPE MARCA 2',data1);
    return data1;
  }

}
