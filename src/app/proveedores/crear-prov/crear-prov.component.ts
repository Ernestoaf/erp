import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations'

@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css'],
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
export class CrearProvComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;
  proveedorForm: FormGroup;
  proveedor: any;

  provincias: string[] = [
    'Alava', 'Albacete', 'Alicante', 'Gibraltar', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
    'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ]

  mensaje: String = 'Error de conexión con el servidor';
  mostrarAlerta: boolean = false;
  enviando: boolean = false;
  constructor(private pf: FormBuilder, private proveedoresService: ProveedoresService, private router: Router) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null,
      contacto: null,
    });
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  crearProv() {
    // llamamos al metodo guarprov porque si queremos guardarlo en este metodo directamente 
    // debemos de utilizar varias funciones felche para autoinvocar al metodo, entonces 
    // creando el metodo guardar es mas facil
    this.mostrarAlerta = false;
    this.enviando = true;
    this.proveedor = this.guardarProv();
    this.proveedoresService.postProveedor(this.proveedor)
      .subscribe((resp: any) => {
        this.router.navigate(['/listado-proveedores']);
      }, (error: any) => {
        this.mostrarAlerta = true;
        this.enviando = false;

        if (error.error.errores.errors.cif.message) {
          this.mensaje = error.error.errores.errors.cif.message;
          // para que mande el foco
          this.cifRef.nativeElement.focus();
        }
      });

  }

  guardarProv() {
    const guardarProv = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,
      email: this.proveedorForm.get('email').value,
      contacto: this.proveedorForm.get('contacto').value,
    }
    return guardarProv;
  }
}
