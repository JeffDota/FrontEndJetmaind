import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';

import Swal from 'sweetalert2';
import { EvaluacionCharlotteService } from '../../services/evaluacion-charlotte.service';

@Component({
  selector: 'app-lista-evaluacion-charlotte',
  templateUrl: './lista-evaluacion-charlotte.component.html',
  styleUrls: ['./lista-evaluacion-charlotte.component.css']
})
export class ListaEvaluacionCharlotteComponent implements OnInit {

  public cargando:boolean=false;
  public evaluaciones:any [] = [];
  public totalevaluaciones:number=0;
  public desde:number = 0;
  public evaluaciones1:any [] = [];
  public evaluacionesTemporales:any [] = [];
  public datos:any ;

  constructor(
    private evaluacionService:EvaluacionCharlotteService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones(){
    this.cargando=true;
    this.evaluacionService.cargarevaluacioncharlotte(this.desde).subscribe((resp:any)=>{
      console.log(resp);
      this.cargando=false;
      this.evaluaciones = resp.data;
      this.evaluaciones1 = resp.data;
      this.evaluacionesTemporales = resp.data;
      this.totalevaluaciones = resp.totalevaluaciones;
      this.datos = resp;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalevaluaciones){
      this.desde -= valor;  
    }
    this.cargarEvaluaciones();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.evaluaciones = this.evaluacionesTemporales;
    }
    return this.busquedaService.buscar2('evaluaciones',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.evaluaciones = resp;
      }
    );
  }

  borrarCiudad(ciudad:any){
    
   
  }

}
