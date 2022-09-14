import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AsignarHorariosEstudianteService } from 'src/app/pages/services/asignar-horarios-estudiante.service';
import { AsistenciaService } from 'src/app/pages/services/asistencia.service';
import { SucursalService } from 'src/app/pages/services/sucursal.service';

@Component({
  selector: 'app-docente-reporte',
  templateUrl: './docente-reporte.component.html',
  styles: [
  ]
})
export class DocenteReporteComponent implements OnInit {

  docenteHorario: any;
  docenteHorario1: any;

  public dropdownListSucursales: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public sucursal: any = [];

  public dropdownList: any = [];
  public dropdownSettings1: IDropdownSettings = {};
  public dias: any = [];


  public totalEstudaintes: number = 0;

  constructor(
    private fb: FormBuilder,
    private asignarHorarioEstudianteService: AsignarHorariosEstudianteService,
    private asistenciaService: AsistenciaService,
    private sucursalService: SucursalService,
  ) { }

  ngOnInit(): void {
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownList = [
      { item_id: 1, nombre: 'Lunes' },
      { item_id: 2, nombre: 'Martes' },
      { item_id: 3, nombre: 'Miercoles' },
      { item_id: 4, nombre: 'Jueves' },
      { item_id: 5, nombre: 'Viernes' },
      { item_id: 6, nombre: 'Sabado' },
    ];

  }



  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursalesSinLimite().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;
    });
  }

  public registerForm = this.fb.group({
    rangoFechas: [null],

    dias: [null],
    idSucursal: [null],
  });

  busqueda() {
    //obtener el valor del dia
    let dato = this.registerForm.get('dia').value;
    this.totalEstudaintes = 0;
    if (this.sucursal.length == 0) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any) => {
          //Buscar la ultima asistencia con el idDocente y idHorario
          this.asistenciaService.getAllByDocenteHorario(element.idDocente, element.idHorario).subscribe((resp: any) => {
            console.log('NUEVA: ', resp);
          })
          element.datos.map((element2: any) => {
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });

    } else {
      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any) => {
          element.datos.map((element2: any) => {
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });

      });
    }

  }



  /** SUCRUSAL */
  /** Item Seleccionado */
  onItemSelectsucursal(item: any) {
    this.sucursal.push(item);
    console.log('Agregar', this.sucursal);
    let lista = [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });

    this.totalEstudaintes = 0;
    if (!this.sucursal) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;
        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            })
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });

    } else {

      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            })
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    }

  }
  /** Todos los items Seleccionados */
  onSelectAllsucursal(items: any) {
    this.sucursal = items;
  }
  /** Deselccionar item */
  findByItemIdIndexSucursal(id: any) {
    return this.sucursal.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */

    const index = this.findByItemIdIndexSucursal(item.item_id);
    const newArray = (index > -1) ? [
      ...this.sucursal.slice(0, index),
      ...this.sucursal.slice(index + 1)
    ] : this.sucursal;
    this.sucursal = newArray;
    console.log(this.sucursal);

    let lista = [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });
    if (!this.sucursal) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;
        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            })
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    } else {
      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            })
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    }

  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;

    let lista = [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });
    if (!this.sucursal) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;
        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            })
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    } else {
      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            })
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    }

  }



  onItemSelect(item: any) {
    this.dias.push(item);

    let lista = [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });

    this.totalEstudaintes = 0;
    if (!this.sucursal) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            });
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });

    } else {
      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            });
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    }

  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.dias = items;

    let lista = [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });

    this.totalEstudaintes = 0;
    if (!this.sucursal) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            });
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });

    } else {
      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            });
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    }

  }
  /** Deselccionar item */
  findByItemIdIndexDias(id: any) {
    return this.dias.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelect(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexDias(item.item_id);
    const newArray = (index > -1) ? [
      ...this.dias.slice(0, index),
      ...this.dias.slice(index + 1)
    ] : this.dias;
    this.dias = newArray;

    let lista = [];
    this.dias.map((element: any) => {
      lista.push(element.nombre);
    });

    this.totalEstudaintes = 0;
    if (!this.sucursal) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, 'todas').subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            });
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });

    } else {
      let listaSucursales = [];
      this.sucursal.map((element: any) => {
        listaSucursales.push(element.item_id);
      });
      this.asignarHorarioEstudianteService.docentehorarioPorDia(lista, true, listaSucursales).subscribe((resp: any) => {
        console.log(resp);
        this.docenteHorario = resp.data;

        this.docenteHorario.map((element: any, index1: number) => {
          element.datos.map((element2: any, index2: number) => {
            //Buscar la ultima asistencia con el idDocente y idHorario
            this.asistenciaService.getAllByDocenteHorario(element2.idDocente, element2.idHorario).subscribe((resp: any) => {
              this.docenteHorario[index1].datos[index2].ultimaAsistencia = resp?.data[0]?.unidad;
            });
            this.totalEstudaintes = this.totalEstudaintes + element2.idEstudiantes.length;
          });
        });
      });
    }
  }
  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.dias = items;
  }

}
