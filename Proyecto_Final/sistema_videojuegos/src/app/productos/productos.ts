import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [FormsModule, CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  productos: {nombre: string, cantidad: number}[] = [
    {nombre: "Leche", cantidad: 10},
    {nombre: "Pan", cantidad: 5},
    {nombre: "Arroz", cantidad: 20},
    {nombre: "Huevos", cantidad: 2},
    {nombre: "Azúcar", cantidad: 15},
    {nombre: "Café", cantidad: 8},
    {nombre: "Té", cantidad: 3},
    {nombre: "Mantequilla", cantidad: 12}
  ];

  agregar_producto(nombre: string, cantidad: number){
    this.productos.push({nombre: nombre, cantidad: cantidad});
  }
}