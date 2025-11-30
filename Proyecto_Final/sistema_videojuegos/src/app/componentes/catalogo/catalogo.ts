import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosHijo } from './filtros-hijo/filtros-hijo';
import { ListaHijo } from './lista-hijo/lista-hijo';
import { Funciones } from './funciones/funciones';
import { Ofertas } from './ofertas/ofertas';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, CommonModule, FiltrosHijo, ListaHijo, Funciones, Ofertas],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  // Datos principales (igual que antes)
  juegos = [
    {
      id: 1,
      nombre: 'The Legend of Zelda: Tears of the Kingdom',
      precio: 59.99,
      plataforma: 'Nintendo Switch',
      genero: 'Aventura',
      imagen: 'https://ejemplo.com/zelda.jpg',
      rating: 5,
      fechaLanzamiento: new Date('2023-05-12'),
      descripcion: 'Una épica aventura en el reino de Hyrule con nuevas habilidades y misterios por descubrir.',
      enOferta: false,
      stock: 15
    },
    {
      id: 2,
      nombre: 'Call of Duty: Modern Warfare III',
      precio: 49.99,
      plataforma: 'PlayStation',
      genero: 'Shooter',
      imagen: 'https://ejemplo.com/cod.jpg',
      rating: 4,
      fechaLanzamiento: new Date('2023-11-10'),
      descripcion: 'Intensa experiencia de combate moderno con multijugador y campaña emocionante.',
      enOferta: true,
      precioOriginal: 69.99,
      stock: 8
    },
    {
      id: 3,
      nombre: 'Halo Infinite',
      precio: 54.99,
      plataforma: 'Xbox',
      genero: 'Shooter',
      imagen: 'https://ejemplo.com/halo.jpg',
      rating: 4,
      fechaLanzamiento: new Date('2021-12-08'),
      descripcion: 'El Jefe Maestro regresa en su aventura más grande para salvar la humanidad.',
      enOferta: false,
      stock: 12
    },
    {
      id: 4,
      nombre: 'Mario Kart 8 Deluxe',
      precio: 49.99,
      plataforma: 'Nintendo Switch',
      genero: 'Carreras',
      imagen: 'https://ejemplo.com/mario-kart.jpg',
      rating: 5,
      fechaLanzamiento: new Date('2017-04-28'),
      descripcion: 'Diversión acelerada con tus personajes favoritos de Mario en emocionantes carreras.',
      enOferta: true,
      precioOriginal: 59.99,
      stock: 20
    },
    {
      id: 5,
      nombre: 'FIFA 24',
      precio: 39.99,
      plataforma: 'PlayStation',
      genero: 'Deportes',
      imagen: 'https://ejemplo.com/fifa.jpg',
      rating: 4,
      fechaLanzamiento: new Date('2023-09-29'),
      descripcion: 'El simulador de fútbol más realista con todos los equipos y ligas oficiales.',
      enOferta: false,
      stock: 18
    },
    {
      id: 6,
      nombre: 'Minecraft',
      precio: 29.99,
      plataforma: 'PC',
      genero: 'Sandbox',
      imagen: 'https://ejemplo.com/minecraft.jpg',
      rating: 5,
      fechaLanzamiento: new Date('2011-11-18'),
      descripcion: 'Crea, explora y sobrevive en un mundo infinito hecho de bloques.',
      enOferta: false,
      stock: 25
    },
    {
      id: 7,
      nombre: 'Fortnite',
      precio: 0.00,
      plataforma: 'Todas',
      genero: 'Battle Royale',
      imagen: 'https://ejemplo.com/fortnite.jpg',
      rating: 4,
      fechaLanzamiento: new Date('2017-07-25'),
      descripcion: 'Batalla real gratuita con construcción y colaboraciones exclusivas.',
      enOferta: false,
      stock: 999
    },
    {
      id: 8,
      nombre: 'God of War Ragnarök',
      precio: 69.99,
      plataforma: 'PlayStation',
      genero: 'Aventura',
      imagen: 'https://ejemplo.com/god-of-war.jpg',
      rating: 5,
      fechaLanzamiento: new Date('2022-11-09'),
      descripcion: 'Kratos y Atreus se embarcan en un viaje mítico a través de los Nueve Reinos.',
      enOferta: true,
      precioOriginal: 79.99,
      stock: 6
    },
    {
      id: 9,
      nombre: 'Animal Crossing: New Horizons',
      precio: 44.99,
      plataforma: 'Nintendo Switch',
      genero: 'Simulación',
      imagen: 'https://ejemplo.com/animal-crossing.jpg',
      rating: 5,
      fechaLanzamiento: new Date('2020-03-20'),
      descripcion: 'Crea tu paraíso insular y vive una vida tranquila llena de sorpresas.',
      enOferta: true,
      precioOriginal: 59.99,
      stock: 14
    },
    {
      id: 10,
      nombre: 'Cyberpunk 2077',
      precio: 34.99,
      plataforma: 'PC',
      genero: 'RPG',
      imagen: 'https://ejemplo.com/cyberpunk.jpg',
      rating: 4,
      fechaLanzamiento: new Date('2020-12-10'),
      descripcion: 'Inmersivo RPG de mundo abierto en la distópica Night City.',
      enOferta: false,
      stock: 10
    }
  ];

  // Estado del catálogo
  textoBusqueda: string = '';
  generoSeleccionado: string = 'todos';
  plataformaSeleccionada: string = 'todas';
  precioMaximo: number = 100;
  ordenSeleccionado: string = 'nombre';
  mostrarSoloOfertas: boolean = false;
  juegoSeleccionado: any = null;

  // Getters
  get generos() {
    const generos = this.juegos.map(juego => juego.genero);
    return ['todos', ...new Set(generos)];
  }

  get plataformas() {
    const plataformas = this.juegos.map(juego => juego.plataforma);
    return ['todas', ...new Set(plataformas)];
  }

  get juegosFiltrados() {
    return this.buscarJuegos();
  }

  get juegosEnOferta() {
    return this.juegos.filter(juego => juego.enOferta);
  }

  // Funciones principales (igual que antes)
  buscarJuegos() {
    let juegosFiltrados = this.juegos;

    if (this.textoBusqueda) {
      const busqueda = this.textoBusqueda.toLowerCase();
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.nombre.toLowerCase().includes(busqueda) ||
        juego.genero.toLowerCase().includes(busqueda) ||
        juego.plataforma.toLowerCase().includes(busqueda)
      );
    }

    if (this.generoSeleccionado !== 'todos') {
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.genero === this.generoSeleccionado
      );
    }

    if (this.plataformaSeleccionada !== 'todas') {
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.plataforma === this.plataformaSeleccionada
      );
    }

    juegosFiltrados = juegosFiltrados.filter(juego => 
      juego.precio <= this.precioMaximo
    );

    if (this.mostrarSoloOfertas) {
      juegosFiltrados = juegosFiltrados.filter(juego => 
        juego.enOferta
      );
    }

    return this.ordenarJuegos(juegosFiltrados);
  }

  ordenarJuegos(juegos: any[]) {
    const juegosOrdenados = [...juegos];
    
    switch (this.ordenSeleccionado) {
      case 'nombre': return juegosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case 'precio': return juegosOrdenados.sort((a, b) => a.precio - b.precio);
      case 'precio-desc': return juegosOrdenados.sort((a, b) => b.precio - a.precio);
      case 'rating': return juegosOrdenados.sort((a, b) => b.rating - a.rating);
      case 'fechaLanzamiento': return juegosOrdenados.sort((a, b) => 
        new Date(b.fechaLanzamiento).getTime() - new Date(a.fechaLanzamiento).getTime());
      case 'fechaLanzamiento-desc': return juegosOrdenados.sort((a, b) => 
        new Date(a.fechaLanzamiento).getTime() - new Date(b.fechaLanzamiento).getTime());
      default: return juegosOrdenados;
    }
  }

  // Funciones de utilidad
  formatearFecha(fecha: Date) {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  calcularDescuento(juego: any) {
    if (!juego.enOferta) return 0;
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

  onVerDetalles(juego: any) {
    this.juegoSeleccionado = juego;
  }

  onCerrarDetalles() {
    this.juegoSeleccionado = null;
  }

  onAgregarCarrito(juego: any) {
    alert(`🎮 ${juego.nombre} agregado al carrito!`);
  }

  onAgregarListaDeseos(juego: any) {
    alert(`❤️ ${juego.nombre} agregado a lista de deseos!`);
  }

  onCalificarJuego(evento: { juego: any; rating: number }) {
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