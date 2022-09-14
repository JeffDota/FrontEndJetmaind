import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EncuestaPadresService } from 'src/app/services/encuesta-padres.service';
import { PersonaService } from '../persona/persona.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-encuesta-padres-reporte',
  templateUrl: './encuesta-padres-reporte.component.html',
  styleUrls: ['./encuesta-padres-reporte.component.css']
})
export class EncuestaPadresReporteComponent implements OnInit {
  title = 'angular-chart';

  public persona: any = [];

  public dropdownSettings: IDropdownSettings = {};

  public dropdownListPersonas: any = [];


  public pregunta1?: any = [
    { nombre: 'Excelente', cantidad: 0 },
    { nombre: 'Muy Bueno', cantidad: 0 },
    { nombre: 'Bueno', cantidad: 0 },
    { nombre: 'Regular', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 }
  ];
  public pregunta2?: any = [
    { nombre: 'Excelente', cantidad: 0 },
    { nombre: 'Muy Bueno', cantidad: 0 },
    { nombre: 'Bueno', cantidad: 0 },
    { nombre: 'Regular', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 }
  ];
  public pregunta3?: any = [
    { nombre: 'Siempre', cantidad: 0 },
    { nombre: 'Casi Siempre', cantidad: 0 },
    { nombre: 'A veces', cantidad: 0 },
    { nombre: 'Nunca', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 }
  ];
  public pregunta4?: any = [
    { nombre: 'Excelente', cantidad: 0 },
    { nombre: 'Muy Bueno', cantidad: 0 },
    { nombre: 'Bueno', cantidad: 0 },
    { nombre: 'Regular', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 },
    { nombre: 'No aplica', cantidad: 0 }
  ];
  public pregunta5?: any = [
    { nombre: 'Excelente', cantidad: 0 },
    { nombre: 'Muy Bueno', cantidad: 0 },
    { nombre: 'Bueno', cantidad: 0 },
    { nombre: 'Regular', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 }
  ];
  public pregunta6?: any = [
    { nombre: 'Excelente', cantidad: 0 },
    { nombre: 'Muy Bueno', cantidad: 0 },
    { nombre: 'Bueno', cantidad: 0 },
    { nombre: 'Regular', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 }
  ];
  public pregunta7?: any = [
    { nombre: 'Excelente', cantidad: 0 },
    { nombre: 'Muy Bueno', cantidad: 0 },
    { nombre: 'Bueno', cantidad: 0 },
    { nombre: 'Regular', cantidad: 0 },
    { nombre: 'Malo', cantidad: 0 }
  ];


  constructor(
    private personaService: PersonaService,
    private encuestaService: EncuestaPadresService,
    private fb: FormBuilder,

  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {

    this.recuperarDatosPersonas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };




  }


  grafica1() {

    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart1')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo'],
        datasets: [
          {
            label: 'Cantidad ',
            data: [this.pregunta1[0].cantidad, this.pregunta1[1].cantidad, this.pregunta1[2].cantidad, this.pregunta1[3].cantidad, this.pregunta1[4].cantidad],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  grafica2() {

    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart2')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo'],
        datasets: [
          {
            label: 'Cantidad ',
            data: [this.pregunta2[0].cantidad, this.pregunta2[1].cantidad, this.pregunta2[2].cantidad, this.pregunta2[3].cantidad, this.pregunta2[4].cantidad],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  grafica3() {

    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart3')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Siempre', 'Casi Siempre', 'A veces', 'Nunca'],
        datasets: [
          {
            label: 'Cantidad ',
            data: [this.pregunta3[0].cantidad, this.pregunta3[1].cantidad, this.pregunta3[2].cantidad, this.pregunta3[3].cantidad, this.pregunta3[4].cantidad],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  grafica4() {

    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart4')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo', 'No aplica'],
        datasets: [
          {
            label: 'Cantidad ',
            data: [this.pregunta4[0].cantidad, this.pregunta4[1].cantidad, this.pregunta4[2].cantidad, this.pregunta4[3].cantidad, this.pregunta4[4].cantidad, this.pregunta4[5].cantidad],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  grafica5() {

    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart5')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Excelente', 'Muy Bueno', 'Bueno', 'Regular', 'Malo'],
        datasets: [
          {
            label: 'Cantidad ',
            data: [this.pregunta6[0].cantidad, this.pregunta6[1].cantidad, this.pregunta6[2].cantidad, this.pregunta6[3].cantidad, this.pregunta6[4].cantidad],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  grafica6() {

    // Bar chart
    const barCanvasEle: any = document.getElementById('bar_chart6')
    const barChart = new Chart(barCanvasEle.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Me siente satisfecho/a', 'He notado cambios pero creo que aún le falta', 'No me siento satisfecho/a con el entrenamiento', 'Solicito reunión con Dirección Académica'],
        datasets: [
          {
            label: 'Cantidad ',
            data: [this.pregunta7[0].cantidad, this.pregunta7[1].cantidad, this.pregunta7[2].cantidad, this.pregunta7[3].cantidad],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  public registerForm = this.fb.group({
    rangoFechas: [null],
    docentes: [null],
  });

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
    });
  }

  Buscar() {
    console.log(this.registerForm.value);
    this.encuestaService.reporteEvaluacioncharlotte(this.registerForm.value).subscribe((resp: any) => {
      console.log(resp);
      resp.data.map((element: any) => {
        //PREGUNTA 1
        if (element.pregunta1 == 'Excelente') {
          this.pregunta1[0].cantidad += 1;
        }
        if (element.pregunta1 == 'Muy Bueno') {
          this.pregunta1[1].cantidad += 1;
        }
        if (element.pregunta1 == 'Bueno') {
          this.pregunta1[2].cantidad += 1;
        }
        if (element.pregunta1 == 'Regular') {
          this.pregunta1[3].cantidad += 1;
        }
        if (element.pregunta1 == 'Malo') {
          this.pregunta1[4].cantidad += 1;
        }
        //PREGUNTA 2
        if (element.pregunta2 == 'Excelente') {
          this.pregunta2[0].cantidad += 1;
        }
        if (element.pregunta2 == 'Muy Bueno') {
          this.pregunta2[1].cantidad += 1;
        }
        if (element.pregunta2 == 'Bueno') {
          this.pregunta2[2].cantidad += 1;
        }
        if (element.pregunta2 == 'Regular') {
          this.pregunta2[3].cantidad += 1;
        }
        if (element.pregunta2 == 'Malo') {
          this.pregunta2[4].cantidad += 1;
        }
        //PREGUNTA 3
        if (element.pregunta3 == 'Siempre') {
          this.pregunta3[0].cantidad += 1;
        }
        if (element.pregunta3 == 'Casi Siempre') {
          this.pregunta3[1].cantidad += 1;
        }
        if (element.pregunta3 == 'A veces') {
          this.pregunta3[2].cantidad += 1;
        }
        if (element.pregunta3 == 'Nunca') {
          this.pregunta3[3].cantidad += 1;
        }
        //PREGUNTA 4
        if (element.pregunta4 == 'Excelente') {
          this.pregunta4[0].cantidad += 1;
        }
        if (element.pregunta4 == 'Muy Bueno') {
          this.pregunta4[1].cantidad += 1;
        }
        if (element.pregunta4 == 'Bueno') {
          this.pregunta4[2].cantidad += 1;
        }
        if (element.pregunta4 == 'Regular') {
          this.pregunta4[3].cantidad += 1;
        }
        if (element.pregunta4 == 'Malo') {
          this.pregunta4[4].cantidad += 1;
        }
        if (element.pregunta4 == 'No aplica') {
          this.pregunta4[5].cantidad += 1;
        }
        //PREGUNTA 5
        if (element.pregunta5 == 'Excelente') {
          this.pregunta5[0].cantidad += 1;
        }
        if (element.pregunta5 == 'Muy Bueno') {
          this.pregunta5[1].cantidad += 1;
        }
        if (element.pregunta5 == 'Bueno') {
          this.pregunta5[2].cantidad += 1;
        }
        if (element.pregunta5 == 'Regular') {
          this.pregunta5[3].cantidad += 1;
        }
        if (element.pregunta5 == 'Malo') {
          this.pregunta5[4].cantidad += 1;
        }
        //PREGUNTA 6
        if (element.pregunta6 == 'Me siente satisfecho/a') {
          this.pregunta6[0].cantidad += 1;
        }
        if (element.pregunta6 == 'He notado cambios pero creo que aún le falta') {
          this.pregunta6[1].cantidad += 1;
        }
        if (element.pregunta6 == 'No me siento satisfecho/a con el entrenamiento') {
          this.pregunta6[2].cantidad += 1;
        }
        if (element.pregunta6 == 'Solicito reunión con Dirección Académica') {
          this.pregunta6[3].cantidad += 1;
        }
        
      })
      setTimeout(() => {
        this.grafica1();
        this.grafica2();
        this.grafica3();
        this.grafica4();
        this.grafica5();
        this.grafica6();
      }, 600);
    })
  }




  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona.push(item);
    console.log(this.persona);
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
    const index = this.findByItemIdIndexPersona(item.item_id);
    const newArray = (index > -1) ? [
      ...this.persona.slice(0, index),
      ...this.persona.slice(index + 1)
    ] : this.persona;
    this.persona = newArray;
    console.log(this.persona);
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

}
