import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-funciones',
  imports: [],
  templateUrl: './funciones.html',
  styleUrl: './funciones.css',
})
export class Funciones {
  @Input() juego: any = null;
  @Input() calcularDescuento: Function = () => 0;
  @Input() formatearFecha: Function = () => '';
  
  @Output() cerrar = new EventEmitter<void>();
  @Output() agregarCarrito = new EventEmitter<any>();
  @Output() agregarListaDeseos = new EventEmitter<any>();

  onCerrar() {
    this.cerrar.emit();
  }

  onAgregarCarrito() {
    this.agregarCarrito.emit(this.juego);
  }

  onAgregarListaDeseos() {
    this.agregarListaDeseos.emit(this.juego);
  }
}
