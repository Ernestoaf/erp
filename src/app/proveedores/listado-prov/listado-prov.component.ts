import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations'


@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    // triger es el desencadenante
    trigger('alerta', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show =>hide', animate('500ms ease-out')),
      transition('hide =>show', animate('500ms ease-out')),
    ])
  ]
})
export class ListadoProvComponent implements OnInit {

  proveedores: any;
  id:String;
  mensaje: String = '';
  mostrarAlerta: boolean = false;
  constructor(private proveedoresService: ProveedoresService) { }

  ngOnInit() {
    this.cargarProveedores();
    console.log(this.proveedores)
  }

  cargarProveedores() {
    // en proveedores service es donde tenemos la comunicacion
    this.proveedoresService.getProveedores()
      .subscribe((resp: any) => {
        console.log(resp)
        this.proveedores = resp.proveedores;
        console.log(this.proveedores)
      },error=>{
        console.log(error)
      });
  }//fin de cargar

  obtenerId(id){
    this.id=id;
  }

  borrarProveedor(){
    this.proveedoresService.deleteProveedor(this.id)
    .subscribe((resp:any)=>{
      console.log(resp);
      this.mensaje="El proveedor ha sido borrado correctamente";
      this.mostrarAlerta=true;
      this.cargarProveedores();
      setTimeout(()=>{
        this.mostrarAlerta=false;
      },3000);
    },(error:any)=>{
      this.mensaje='Error de conexion';
      this.mostrarAlerta=true;
      setTimeout(()=>{
        this.mostrarAlerta=false;
      },2500);
    })
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }
}
