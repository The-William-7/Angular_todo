import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-hijo',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-hijo.html',
  styleUrl: './lista-hijo.css',
})
export class ListaHijo {
  @Input() juegos: any[] = [];
  @Input() calcularDescuento: Function = () => 0;
  
  @Output() verDetalles = new EventEmitter<any>();
  @Output() agregarCarrito = new EventEmitter<any>();
  @Output() agregarListaDeseos = new EventEmitter<any>();
  @Output() calificarJuego = new EventEmitter<{juego: any, rating: number}>();

  onCalificarJuego(juego: any, rating: number) {
    this.calificarJuego.emit({ juego, rating });
  }
}

