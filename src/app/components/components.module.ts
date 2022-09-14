import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';
import { EstudianteComponent } from '../pages/estudiante/estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  declarations: [
    ModalImagenComponent,
  ],
  exports:[
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxIntlTelInputModule
  ]
})
export class ComponentsModule { }
