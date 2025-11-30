import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosHijo } from './filtros-hijo/filtros-hijo';
import { ListaHijo } from './lista-hijo/lista-hijo';
import { Funciones } from './funciones/funciones';
import { Ofertas } from './ofertas/ofertas';
import { Juego, JuegosService } from '../../servicios/juegos/juegos-service';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, CommonModule, FiltrosHijo, ListaHijo, Funciones, Ofertas],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {
  // Datos desde el servicio
  juegos: Juego[] = [];
  generos: string[] = [];
  plataformas: string[] = [];

  // Estado del catálogo
  textoBusqueda: string = '';
  generoSeleccionado: string = 'todos';
  plataformaSeleccionada: string = 'todas';
  precioMaximo: number = 100;
  ordenSeleccionado: string = 'nombre';
  mostrarSoloOfertas: boolean = false;
  juegoSeleccionado: Juego | null = null;
  cargando: boolean = true;

  constructor(private juegosService: JuegosService) {}

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  // Cargar datos iniciales desde el servicio
  cargarDatosIniciales() {
    this.cargando = true;
    
    // Cargar juegos
    this.juegosService.getJuegos().subscribe({
      next: (juegos: Juego[]) => {
        this.juegos = juegos;
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error cargando juegos:', error);
        this.cargando = false;
      }
    });

    // Cargar géneros
    this.juegosService.getGeneros().subscribe((generos: string[]) => {
      this.generos = generos;
    });

    // Cargar plataformas
    this.juegosService.getPlataformas().subscribe((plataformas: string[]) => {
      this.plataformas = plataformas;
    });
  }

  // Getters computados
  get juegosFiltrados(): Juego[] {
    return this.buscarJuegos();
  }

  get juegosEnOferta(): Juego[] {
    return this.juegos.filter(juego => juego.enOferta);
  }

  // Funciones principales (igual que antes pero con datos del servicio)
  buscarJuegos(): Juego[] {
    let juegosFiltrados = this.juegos;

    // Filtro por texto de búsqueda
    if (this.textoBusqueda) {
      const busqueda = this.textoBusqueda.toLowerCase();
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.nombre.toLowerCase().includes(busqueda) ||
        juego.genero.toLowerCase().includes(busqueda) ||
        juego.plataforma.toLowerCase().includes(busqueda)
      );
    }

    // Filtro por género
    if (this.generoSeleccionado !== 'todos') {
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.genero === this.generoSeleccionado
      );
    }

    // Filtro por plataforma
    if (this.plataformaSeleccionada !== 'todas') {
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.plataforma === this.plataformaSeleccionada
      );
    }

    // Filtro por precio máximo
    juegosFiltrados = juegosFiltrados.filter(juego => 
      juego.precio <= this.precioMaximo
    );

    // Filtro por ofertas
    if (this.mostrarSoloOfertas) {
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.enOferta
      );
    }

    return this.ordenarJuegos(juegosFiltrados);
  }

  ordenarJuegos(juegos: Juego[]): Juego[] {
    const juegosOrdenados = [...juegos];
    
    switch (this.ordenSeleccionado) {
      case 'nombre': 
        return juegosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'precio': 
        return juegosOrdenados.sort((a, b) => a.precio - b.precio);
      case 'precio-desc': 
        return juegosOrdenados.sort((a, b) => b.precio - a.precio);
      case 'rating': 
        return juegosOrdenados.sort((a, b) => b.rating - a.rating);
      case 'fechaLanzamiento': 
        return juegosOrdenados.sort((a, b) => 
          new Date(b.fechaLanzamiento).getTime() - new Date(a.fechaLanzamiento).getTime());
      case 'fechaLanzamiento-desc': 
        return juegosOrdenados.sort((a, b) => 
          new Date(a.fechaLanzamiento).getTime() - new Date(b.fechaLanzamiento).getTime());
      default: 
        return juegosOrdenados;
    }
  }

  // Funciones de utilidad
  formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  calcularDescuento(juego: Juego): number {
    if (!juego.enOferta || !juego.precioOriginal) return 0;
    return Math.round(((juego.precioOriginal - juego.precio) / juego.precioOriginal) * 100);
  }

  // Event handlers
  onSearchChange(texto: string) {
    this.textoBusqueda = texto;
  }

  onFilterChange(filtros: any) {
    this.generoSeleccionado = filtros.genero;
    this.plataformaSeleccionada = filtros.plataforma;
    this.precioMaximo = filtros.precioMaximo;
    this.mostrarSoloOfertas = filtros.mostrarSoloOfertas;
  }

  onSortChange(orden: string) {
    this.ordenSeleccionado = orden;
  }

  onVerDetalles(juego: Juego) {
    this.juegoSeleccionado = juego;
  }

  onCerrarDetalles() {
    this.juegoSeleccionado = null;
  }

  onAgregarCarrito(juego: Juego) {
    alert(`🎮 ${juego.nombre} agregado al carrito!`);
  }

  onAgregarListaDeseos(juego: Juego) {
    alert(`❤️ ${juego.nombre} agregado a lista de deseos!`);
  }

  onCalificarJuego(evento: { juego: Juego; rating: number }) {
    evento.juego.rating = evento.rating;
    alert(`⭐ Calificaste ${evento.juego.nombre} con ${evento.rating} estrellas!`);
  }

  onLimpiarFiltros() {
    this.textoBusqueda = '';
    this.generoSeleccionado = 'todos';
    this.plataformaSeleccionada = 'todas';
    this.precioMaximo = 100;
    this.ordenSeleccionado = 'nombre';
    this.mostrarSoloOfertas = false;
  }
}