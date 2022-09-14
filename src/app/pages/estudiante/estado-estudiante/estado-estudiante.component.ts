import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EstudianteService } from '../../services/estudiante.service';

import Swal from 'sweetalert2';
import { HistorialEstudianteService } from '../../services/historial-estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignarHorariosEstudianteService } from '../../services/asignar-horarios-estudiante.service';

@Component({
  selector: 'app-estado-estudiante',
  templateUrl: './estado-estudiante.component.html',
  styles: [
  ]
})
export class EstadoEstudianteComponent implements OnInit {

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public estudiante: any = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudianteService,
    private historialEstudianteService:HistorialEstudianteService,
    private asignarHorarioService: AsignarHorariosEstudianteService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.recuperarDatosEstudiantes();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  public registerForm = this.fb.group({
    estado: [null],
    idEstudiantes: [this.estudiante],
    fechaInicioCongelacion: [null],
    fechaFinCongelacion: [null],
    tiempoCongelacion: [null],
    fechaIncorporacion: [null],
    observaciones: [null],
  });

  crearEstudiante() {
    //IDEA cuando se agregue o cambie de grupo tb se envia al historial
    //crear un historial del estudainte
    if (this.registerForm.invalid) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: '- Campos con asterisco son obligatorios\n - Verificar campos invalidos, \n indicados con el color rojo  '
      })
      return;
    } else {
      console.log(this.registerForm.value);
      this.historialEstudianteService.crearHistorial(this.registerForm.value).subscribe((resp) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Guardado correctamente'
        })

        this.router.navigateByUrl('/lista-historial-estudiantes');
      }, (err: any) => {

        console.warn(err.error.message);

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
        Toast.fire({
          icon: 'error',
          title: 'ERROR: ' + err.error.statusCode + '\nContactese con su proveedor de software '
        })
      });
    }

    //Actualizar el estado del estudiante
    this.estudiantesService.obtenerEstudianteById(this.registerForm.value.idEstudiantes[0].item_id).subscribe((resp: any) => {
      let estudiante = resp.data;
      estudiante.estado = this.registerForm.value.estado;
      this.estudiantesService.updateEstudiante(estudiante._id, estudiante).subscribe((resp: any) => {
        console.log(resp);
      });
    });

    //retirar estudiante del grupo activo
    if (this.registerForm.value.estado != 'Activo') {
      //buscar en que grupos se encuentra el estudiante
      this.asignarHorarioService.buscarbyEstudiante(this.registerForm.value.idEstudiantes[0].item_id).subscribe((resp: any) => {
        console.log('BUSQUEDA HORARIO: ',resp);
        resp.data.map((asignarHorario:any)=>{
          let asignarHorario1 = asignarHorario;
          //retirar estudiante del grupo activo
          
          /* this.asignarHorarioService.updateasignarhorarioestudiante(asignarHorario._id,asignarHorario1).subscribe(
            (resp: any) => {
              console.log(resp);
            }
          ); */
        })
      });
    }
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/lista-historial-estudiantes');
  }

  limpiarCampos() {
    if (this.registerForm.value.estado == 'Congelado') {
      this.registerForm.get('fechaIncorporacion').setValue(null);
    } else if (this.registerForm.value.estado == 'Incorporado') {
      this.registerForm.get('tiempoCongelacion').setValue(null);
      this.registerForm.get('rangoFechas').setValue(null);
    } else {
      this.registerForm.get('tiempoCongelacion').setValue(null);
      this.registerForm.get('fechaIncorporacion').setValue(null);
      this.registerForm.get('rangoFechas').setValue(null);
    }
  }

  calcularMeses() {
    console.log(this.registerForm.value);
    console.log('Entre');
    let fechaInicio = new Date(this.registerForm.value.fechaInicioCongelacion);
    let fechaFin = new Date(this.registerForm.value.fechaFinCongelacion);
    if(fechaInicio && fechaFin){
      let meses = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12;
      meses -= fechaInicio.getMonth();
      meses += fechaFin.getMonth();
      this.registerForm.get('tiempoCongelacion').setValue(meses);
    }
  }

  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesallSinEstado().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;

    });
  }


  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante = [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = [items];
  }
  /** Deselccionar item */

  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = [items]
  }

}
