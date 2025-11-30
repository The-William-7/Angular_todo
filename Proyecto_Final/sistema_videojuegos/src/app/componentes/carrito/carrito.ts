import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="carrito">
      <h2>🛒 Carrito de Compras</h2>
      <p>Carrito en construcción...</p>
    </div>
  `,
  styleUrl: './carrito.css'
})
export class Carrito {

}
