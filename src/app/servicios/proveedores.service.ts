import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class ProveedoresService {

  // creamos la clase http de HttoClient
  constructor(private http: HttpClient) { }

  // lo llamaremos desde el componente para ejecutar el codigo de aqui
  // cuando llamemos a get proveedores ejecutaremos la peticion get que devolvera un
  //  resultado y necesatiamos que se ejecute de forma asincrona y lo haremos con las
  // libreria que hemos importado, vamos a usar map y pasarle una funcion flecha

  getProveedores() {
    let url = 'http://localhost:3000/proveedor';
    return this.http.get(url)
      // la tenemos que tipar como any
      .map((resp: any) => {
        return resp;
      });
  }

  // pasamos id como parametro para traerlo desde el componente
  getProveedorId(id) {
    let url = "http://localhost:3000/proveedor/";
    return this.http.get(url + id)
      .map((resp: any) => {
        return resp;
      });
  }

  // tendra la url donde mandaremos el proveedor
  postProveedor(proveedor) {
    let url = "http://localhost:3000/proveedor";

    // el metodo post recibe dos parametros la url y el obejto que vamos a enviar
    return this.http.post(url, proveedor)
      .map((resp: any) => {
        console.log(resp)
        return resp;
      });
  }

  // actualizaremos un proveedor que le mandaremos desde el componente
  putProveedor(id, proveedor) {
    let url = "http://localhost:3000/proveedor/";
    return this.http.put(url + id, proveedor)
      .map((resp: any) => {
        return resp;
      })
  }//fin de put

  deleteProveedor(id){
    let url ='http://localhost:3000/proveedor/'
    return this.http.delete(url +id)
    .map((resp:any)=>{
      return resp;
    })
  } 
}
