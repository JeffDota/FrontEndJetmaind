import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../../persona/persona.service';
import { AsignarHorariosEstudianteService } from '../../services/asignar-horarios-estudiante.service';
import { AsistenciaService } from '../../services/asistencia.service';
import { EstudianteService } from '../../services/estudiante.service';
import { EvaluacionCharlotteService } from '../../services/evaluacion-charlotte.service';
import { HorarioService } from '../../services/horario.service';
import { EvaluacionCharlotte } from '../evaluacion-charlotte.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evaluacion',
  templateUrl: './crear-evaluacion.component.html',
  styleUrls: ['./crear-evaluacion.component.css']
})
export class CrearEvaluacionComponent implements OnInit {

  public evaluacionCharlotteSeleccionada: any;
  public EvaluacionCHModel: EvaluacionCharlotte;

  public dropdownListPersonas: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};
  public dropdownListHorarios: any = [];

  public persona: any = [];
  public horario: any = [];
  public estudiante: any = [];

  public listaEstudiantes: any = [];
  public listaEstudiantesCopia: any = [];
  public listaEstudiantesPresentes: any = [];
  public listaEstudiantesAusentes: any = [];

  public ausentes: any = [];
  public presentes: any = [];

  public dropdownListEstudiantes: any = [];


  public evaluacioncharlotte: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private asignarHorariosEstudianteService: AsignarHorariosEstudianteService,
    private asistenciaService: AsistenciaService,
    private horariosService: HorarioService,
    private evaluacionService: EvaluacionCharlotteService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.recuperarDatosHorarios();
      this.recuperarDatosPersonas();
      this.recuperarDatosEstudiantes();
    }, 600);


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.dropdownSettingsSingle = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  public registerForm = this.fb.group({
    idDocente: [null],
    idHorario: [null],
    idEstudiante: [null],
    fecha: [new Date()],
    nombre: [null],
    listening: [null],
    reading: [null],
    grammar: [null],
    writting: [null],
    speaking: [null],
    platform: [null],

  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/lista-evaluacion-charlotte');
  }

  crear() {
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

      this.evaluacioncharlotte = this.registerForm.value;
      this.evaluacioncharlotte.idDocente = this.persona[0].item_id;
      this.evaluacioncharlotte.idHorario = this.horario[0].item_id;
      this.evaluacioncharlotte.idEstudiante = this.estudiante[0].item_id;

      this.evaluacionService.crearevaluacioncharlotte(this.evaluacioncharlotte).subscribe((resp) => {
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

        this.router.navigateByUrl('/lista-evaluacion-charlotte');
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
  }


  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
      if (this.evaluacionCharlotteSeleccionada) {

        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.evaluacionCharlotteSeleccionada.idDocente
        );
        if (findMarcaPersona) {
          this.onItemSelectPersona(findMarcaPersona);
          this.registerForm.get('idDocente')?.setValue(this.persona);
        }

      }

    });

  }
  recuperarDatosHorarios() {
    this.horariosService.getAllHorario().subscribe((resp: any) => {
      let nombreHorarios: any = [];
      resp.data.forEach((element: any) => {
        nombreHorarios.push({ item_id: element._id, nombre: `${element.nombre}-${element.modalidad}-${element.dias}-${element.horaInicio}-${element.horaFin}` });
      });
      this.dropdownListHorarios = nombreHorarios;

      if (this.evaluacionCharlotteSeleccionada) {

        const findHorario = this.dropdownListHorarios.find(
          (item: any) => item.item_id === this.evaluacionCharlotteSeleccionada.idHorario
        );
        if (findHorario) {
          this.onItemSelectHorario(findHorario);
          this.registerForm.get('idHorario')?.setValue(this.horario);
        }

      }

    });

  }

  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;

    });
  }

  mostrarCamposSegunNombreListening() {
    let nombre = this.registerForm.get('nombre')?.value;
    if (nombre == 'Kid') {
      return true;
    } else if (nombre == 'Pandy') {
      return true;
    } else if (nombre == 'Top Notch') {
      return true;
    } else {
      return false;
    }
  }
  mostrarCamposSegunNombreReading() {
    let nombre = this.registerForm.get('nombre')?.value;
    if (nombre == 'Kid') {
      return false;
    } else if (nombre == 'Pandy') {
      return false;
    } else if (nombre == 'Top Notch') {
      return false;
    } else {
      return false;
    }
  }
  mostrarCamposSegunNombreGrammar() {
    let nombre = this.registerForm.get('nombre')?.value;
    if (nombre == 'Kid') {
      return true;
    } else if (nombre == 'Pandy') {
      return false;
    } else if (nombre == 'Top Notch') {
      return true;
    } else {
      return false;
    }
  }
  mostrarCamposSegunNombreWritting() {
    let nombre = this.registerForm.get('nombre')?.value;
    if (nombre == 'Kid') {
      return true;
    } else if (nombre == 'Pandy') {
      return false;
    } else if (nombre == 'Top Notch') {
      return true;
    } else {
      return false;
    }
  }
  mostrarCamposSegunNombrePlatform() {
    let nombre = this.registerForm.get('nombre')?.value;
    if (nombre == 'Kid') {
      return true;
    } else if (nombre == 'Pandy') {
      return true;
    } else if (nombre == 'Top Notch') {
      return true;
    } else {
      return false;
    }
  }
  mostrarCamposSegunNombreSpeaking() {
    let nombre = this.registerForm.get('nombre')?.value;
    if (nombre == 'Kid') {
      return true;
    } else if (nombre == 'Pandy') {
      return false;
    } else if (nombre == 'Top Notch') {
      return true;
    } else {
      return false;
    }
  }


  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona = [item];
  }

  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);

  }

  /** Deselccionar item */
  findByItemIdIndexPersona(id: any) {
    return this.persona.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }

  onDeSelectPersona(item: any) {
    /** Borrar elemento del array  */
    this.persona = [];

    this.listaEstudiantes = [];
    this.listaEstudiantesAusentes = [];
    this.listaEstudiantesPresentes = [];

    console.log('Estudiantes', this.listaEstudiantes);
    console.log('Ausentes', this.listaEstudiantesAusentes);
    console.log('Presentes', this.listaEstudiantesPresentes);

  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

  /** horario */
  /** Item Seleccionado */
  onItemSelectHorario(item: any) {
    this.horario = [item];

  }
  /** Todos los items Seleccionados */
  onSelectAllHorario(items: any) {
    this.horario = items;
    console.log(this.horario);
  }
  /** Deselccionar item */
  findByItemIdIndexHorario(id: any) {
    return this.horario.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectHorario(item: any) {
    /** Borrar elemento del array  */
    this.horario = [];

    this.listaEstudiantes = [];
    this.listaEstudiantesAusentes = [];
    this.listaEstudiantesPresentes = [];
    console.log('Estudiantes', this.listaEstudiantes);
    console.log('Ausentes', this.listaEstudiantesAusentes);
    console.log('Presentes', this.listaEstudiantesPresentes);
  }
  /** Deselccionar todos los items */
  onDeSelectAllHorario(items: any) {
    this.horario = items;
  }


  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante = [item];
    console.log(this.estudiante);
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = [items];
    console.log(this.estudiante);
  }

  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }


}
