import { Component, OnInit } from '@angular/core';
import { HistorialEstudiante } from 'src/app/models/historial_estudiante.model';
import { HistorialEstudianteService } from 'src/app/pages/services/historial-estudiante.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-estado-estudiante',
  templateUrl: './lista-estado-estudiante.component.html',
  styleUrls: ['./lista-estado-estudiante.component.css']
})
export class ListaEstadoEstudianteComponent implements OnInit {

  public cargando:boolean=false;
  public historiales:any [] = [];
  public totalhistoriales:number=0;
  public desde:number = 0;
  public historiales1:HistorialEstudiante [] = [];
  public historialesTemporales:HistorialEstudiante [] = [];

  constructor(
    private historialService:HistorialEstudianteService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarhistoriales();
  }

  cargarhistoriales(){
    this.cargando=true;
    this.historialService.cargarHistoriales(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.historiales = resp.data;
      this.historiales1 = resp.data;
      this.historialesTemporales = resp.data;
      this.totalhistoriales = resp.totalhistoriales;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalhistoriales){
      this.desde -= valor;  
    }
    this.cargarhistoriales();
  }

  buscar(busqueda:any){
    /* if (busqueda.length === 0) {
      return this.historiales = this.historialesTemporales;
    }
    return this.busquedaService.buscar2('historiales',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.historiales = resp;
      }
    ); */
  }




}
