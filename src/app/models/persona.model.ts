import { environment } from "src/environments/environment";//ojo

const base_url = environment.base_url;

export class Persona {
    constructor(
        public tipo?: Array<string>,
        public idMarca?: Array<string>,
        public idCiudad?: Array<string>,
        public idSucursal?: Array<string>,
        public nombresApellidos?: string,
        public email?: string,
        public password?: string,
        public cedula?: string,
        public telefono?: string,
        public telefonoDomicilio?: string,
        public fechaNacimiento?: Date,
        public direccion?: string,
        public genero?: string,
        public estado?: string,
        public fotoPerfil?: string,
        public fotoCedula1?: string,
        public fotoCedula2?: string,
        public fechaIngresoEmpresa?: Date,
        public numeroCuenta?: string,
        public addedUser?: string,
        public modifiedUser?: string,
        public _id?: string
    ) { }

    getURLImagenfotoPerfil() {
        if (!this.fotoPerfil) {
            return `${base_url}/utils/getDigitalOCean/usuario.PNG`;
        }
        return `${base_url}/utils/getDigitalOCean/${this.fotoPerfil}`;


    }
    getURLImagenfotoCedula1() {
        if (this.fotoCedula1) {
            return `${base_url}/utils/uploads/personas/${this.fotoCedula1}`;
        } else {
            return `${base_url}/utils/uploads/noIMG.png`;
        }
    }
    getURLImagenfotoCedula2() {
        if (this.fotoCedula2) {
            return `${base_url}/utils/uploads/personas/${this.fotoCedula2}`;
        } else {
            return `${base_url}/utils/uploads/noIMG.png`;
        }
    }
}