
export class HistorialEstudiante {
    constructor(
        public _id?:string,
        public idEstudiantes?:any,
        public estado?:any,
        public fechaInicioCongelacion?:Date,
        public fechaFinCongelacion?:Date,
        public ultimaAsistencia?:string,
        public fechaUltimaAsistencia?:Date,
        public fechaIncorporacion?:Date,
        public observaciones?:any,
        public docenteAsignado?:any,
        public horarioAsignado?:any,
        public addedUser?:string,
        public modifiedUser?:string
    ){}

}