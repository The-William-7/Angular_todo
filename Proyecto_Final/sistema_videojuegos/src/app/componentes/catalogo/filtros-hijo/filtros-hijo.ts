import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros-hijo',
  imports: [FormsModule, CommonModule],
  templateUrl: './filtros-hijo.html',
  styleUrl: './filtros-hijo.css',
})
export class FiltrosHijo {
  @Input() textoBusqueda: string = '';
  @Input() generos: string[] = [];
  @Input() plataformas: string[] = [];
  @Input() generoSeleccionado: string = 'todos';
  @Input() plataformaSeleccionada: string = 'todas';
  @Input() precioMaximo: number = 100;
  @Input() ordenSeleccionado: string = 'nombre';
  @Input() mostrarSoloOfertas: boolean = false;

  // Outputs
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<string>();
  @Output() limpiarFiltros = new EventEmitter<void>();

  // Opciones de ordenamiento
  opcionesOrden = [
    { valor: 'nombre', texto: 'Nombre (A-Z)' },
    { valor: 'precio', texto: 'Precio (Menor a Mayor)' },
    { valor: 'precio-desc', texto: 'Precio (Mayor a Menor)' },
    { valor: 'rating', texto: 'Rating (Mejor primero)' },
    { valor: 'fechaLanzamiento', texto: 'Fecha (Más nuevos)' },
    { valor: 'fechaLanzamiento-desc', texto: 'Fecha (Más viejos)' }
  ];

  // Métodos
  onSearchChange() {
    this.searchChange.emit(this.textoBusqueda);
  }

  onFilterChange() {
    this.filterChange.emit({
      genero: this.generoSeleccionado,
      plataforma: this.plataformaSeleccionada,
      precioMaximo: this.precioMaximo,
      mostrarSoloOfertas: this.mostrarSoloOfertas
    });
  }

  onSortChange() {
    this.sortChange.emit(this.ordenSeleccionado);
  }

  onLimpiarFiltros() {
    this.limpiarFiltros.emit();
  }
}
