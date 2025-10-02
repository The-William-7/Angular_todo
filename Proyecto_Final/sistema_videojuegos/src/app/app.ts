import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Productos } from "./productos/productos";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, Productos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sistema_videojuegos');
}
