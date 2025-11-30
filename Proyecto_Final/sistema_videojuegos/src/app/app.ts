import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Catalogo } from "./componentes/catalogo/catalogo";


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sistema_videojuegos');
  
}
