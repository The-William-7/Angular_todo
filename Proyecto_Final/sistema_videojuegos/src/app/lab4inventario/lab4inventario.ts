import { Component, EventEmitter, Output } from '@angular/core';
import { CalculadoraImpuestosService } from '../calculadora-impuestos-service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab4inventario',
  imports: [CommonModule, FormsModule],
  templateUrl: './lab4inventario.html',
  styleUrl: './lab4inventario.css'
})

export class Lab4inventario {
  nombreProducto: string = '';
  precioBase: number = 0;
  categoria: string = '';
  categorias: string[] = ['Electrónica', 'Alimentos', 'Libros'];

  constructor(private calculadoraService: CalculadoraImpuestosService) {}

  calcularImpuestos() {
    if (this.nombreProducto && this.precioBase > 0 && this.categoria) {
      const resultado = this.calculadoraService.calcularImpuestos(this.precioBase, this.categoria);
      this.mostrarAlerta(resultado);
      this.limpiarFormulario();
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  private mostrarAlerta(resultado: any) {
    const mensaje = `
      Detalle del Producto
      Nombre del Producto: ${this.nombreProducto}
      Categoría Aplicada: ${this.categoria}
      Precio Base: $${this.precioBase.toFixed(2)}

      Desglose de Costos
      Tasa de IVA Aplicada: ${resultado.tasaIVA}%
      Monto Total del IVA: $${resultado.montoIVA.toFixed(2)}
      Precio Final (Total a Pagar): $${resultado.precioFinal.toFixed(2)}
    `.trim();
    alert(mensaje);
  }
  private limpiarFormulario() {
    this.nombreProducto = '';
    this.precioBase = 0;
    this.categoria = '';
  }
}