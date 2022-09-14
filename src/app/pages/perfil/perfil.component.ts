import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

import Swal from 'sweetalert2';
import { PersonaService } from '../persona/persona.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public imagenSubir: any;
  public imgTemp: any;
  public persona:any;
  constructor(
    private fileUploadService:FileUploadService,
    private personaService:PersonaService
  ) { }

  ngOnInit(): void {
    this.persona = this.personaService.persona;
  }


  subirImagen(){
    this.fileUploadService.actualizarFotoDigitalOCean(this.imagenSubir, this.persona._id)
      .then((resp:any)=>{
        //this.cargarMarcabyId(this.persona._id);

        //recargar pagina
        window.location.reload();

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
          title: 'La imagen se actualizo correctamente'
        })
      })
      .catch((resp:any)=>{
        console.log(resp);
      })
  }

  cambiarImagen(file:any){
    
    console.log(file);
    this.imagenSubir = file.target.files[0];
    console.log(this.imagenSubir);
    if(!file){
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file.target.files[0]);
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;
      //console.log(reader.result);
    } 

  }

}
