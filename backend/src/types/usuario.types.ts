export interface Usuario {
  idusuario: string;
  nombre: string;
  email: string;
  contrasena: string; // Include password for backend validation
  rol: string;
}