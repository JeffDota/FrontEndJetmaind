import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HistorialEstudiante } from 'src/app/models/historial_estudiante.model';
import { environment } from '../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HistorialEstudianteService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Historiales */
  getAllHistoriales(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/historial-estudiante`, { headers: headers });
  }
  
  getAllHistorialesSinLimite(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/historial-estudiante/all`, { headers: headers });
  }
  
  getAllHistorialesallByIdEstudiante(idEstudiante:string){
    console.log('Entre consulta kuhjdfak');
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/historial-estudiante/allByIdHistorialEstudiante/${idEstudiante}`, { headers: headers });
  }

  obtenerHistorialById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/historial-estudiante/${id}`, { headers: headers })
  }

  crearHistorial(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/historial-estudiante`, formData, { headers: headers });
  }

  updateHistorial(id:string, historial:HistorialEstudiante){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/historial-estudiante/${id}`, historial, { headers: headers });
  }

  eliminarHistorial( historial:HistorialEstudiante){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/historial-estudiante/${historial._id}`, { headers: headers });
  }


  cargarHistoriales (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/historial-estudiante?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const historiales = resp.data.map((historial:any) => 
          new HistorialEstudiante(
              historial._id, historial.estudiante, historial.estado, historial.fechaInicioCongelacion,
              historial.fechaFinCongelacion, historial.ultimaAsistencia, historial.fechaUltimaAsistencia, historial.fechaIncorporacion,
              historial.observaciones, historial.docenteAsignado, historial.horarioAsignado
            )
        );
        
        return{
          total:resp.totalHistoriales,
          historiales
        };
      })
    )
    
     
  }
}
