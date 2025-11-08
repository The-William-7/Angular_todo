import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraImpuestosService {
  calcularImpuestos(precioBase: number, categoria: string) {
    let iva = 0;
    if (categoria === 'Electrónica') {
      iva = 0.13;
    } else if (categoria === 'Alimentos') {
      iva = 0.05;
    } else if (categoria === 'Libros') {
      iva = 0;
    }

    const montoIVA = precioBase * iva;
    const precioFinal = precioBase + montoIVA;

    return {
      tasaIVA: iva * 100,
      montoIVA: montoIVA,
      precioFinal: precioFinal
    };
  }
}