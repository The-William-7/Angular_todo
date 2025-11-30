import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ofertas',
  imports: [FormsModule, CommonModule],
  templateUrl: './ofertas.html',
  styleUrl: './ofertas.css',
})
export class Ofertas {
  @Input() juegosEnOferta: any[] = [];
  @Input() calcularDescuento: Function = () => 0;
  @Output() verDetalles = new EventEmitter<any>();
}
