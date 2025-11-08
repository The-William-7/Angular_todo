import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Productos } from "./productos/productos";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Lab4inventario } from "./lab4inventario/lab4inventario";

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, Productos, Lab4inventario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sistema_videojuegos');
  
}
