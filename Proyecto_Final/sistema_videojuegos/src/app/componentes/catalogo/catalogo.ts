import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosHijo } from './filtros-hijo/filtros-hijo';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, CommonModule, FiltrosHijo],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  // Lista completa de juegos
  juegos = [
    {
      id: 1,
      nombre: 'The Legend of Zelda: Tears of the Kingdom',
      precio: 59.99,
      plataforma: 'Nintendo Switch',
      genero: 'Aventura',
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
      rating: 5,
      fechaLanzamiento: new Date('2022-11-09'),
      descripcion: 'Kratos y Atreus se embarcan en un viaje mítico a través de los Nueve Reinos.',
      enOferta: true,
      precioOriginal: 79.99,
      stock: 6
    }
  ];

  // Variables para controles
  textoBusqueda: string = '';
  generoSeleccionado: string = 'todos';
  plataformaSeleccionada: string = 'todas';
  precioMaximo: number = 100;
  ordenSeleccionado: string = 'nombre';
  mostrarSoloOfertas: boolean = false;
  juegoSeleccionado: any = null;

  // Obtener listas únicas para los filtros
  get generos() {
    const generos = this.juegos.map(juego => juego.genero);
    return ['todos', ...new Set(generos)];
  }

  get plataformas() {
    const plataformas = this.juegos.map(juego => juego.plataforma);
    return ['todas', ...new Set(plataformas)];
  }

  // Opciones de ordenamiento
  opcionesOrden = [
    { valor: 'nombre', texto: 'Nombre (A-Z)' },
    { valor: 'precio', texto: 'Precio (Menor a Mayor)' },
    { valor: 'precio-desc', texto: 'Precio (Mayor a Menor)' },
    { valor: 'rating', texto: 'Rating (Mejor primero)' },
    { valor: 'fechaLanzamiento', texto: 'Fecha (Más nuevos)' },
    { valor: 'fechaLanzamiento-desc', texto: 'Fecha (Más viejos)' }
  ];

  // FUNCIÓN CORREGIDA para obtener texto del orden
  get textoOrdenActual(): string {
    const opcion = this.opcionesOrden.find(o => o.valor === this.ordenSeleccionado);
    return opcion ? opcion.texto : 'Nombre (A-Z)';
  }

  // Función principal de búsqueda, filtrado y ordenamiento
  buscarJuegos() {
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

    // Aplicar ordenamiento
    return this.ordenarJuegos(juegosFiltrados);
  }

  // Función para ordenar los juegos
  ordenarJuegos(juegos: any[]) {
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
          new Date(b.fechaLanzamiento).getTime() - new Date(a.fechaLanzamiento).getTime()
        );
      case 'fechaLanzamiento-desc':
        return juegosOrdenados.sort((a, b) => 
          new Date(a.fechaLanzamiento).getTime() - new Date(b.fechaLanzamiento).getTime()
        );
      default:
        return juegosOrdenados;
    }
  }

  // Función para formatear fecha
  formatearFecha(fecha: Date) {
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Función para calcular descuento
  calcularDescuento(juego: any) {
    if (!juego.enOferta) return 0;
    return Math.round(((juego.precioOriginal - juego.precio) / juego.precioOriginal) * 100);
  }

  // Función para ver detalles del juego
  verDetalles(juego: any) {
    this.juegoSeleccionado = juego;
  }

  // Función para cerrar detalles
  cerrarDetalles() {
    this.juegoSeleccionado = null;
  }

  // Función para agregar al carrito
  agregarAlCarrito(juego: any) {
    alert(`🎮 ${juego.nombre} agregado al carrito!`);
    // Aquí después integraremos el carrito real
  }

  // Función para agregar a lista de deseos
  agregarListaDeseos(juego: any) {
    alert(`❤️ ${juego.nombre} agregado a lista de deseos!`);
  }

  // Función para calificar juego
  calificarJuego(juego: any, rating: number) {
    juego.rating = rating;
    alert(`⭐ Calificaste ${juego.nombre} con ${rating} estrellas!`);
  }

  // Función para limpiar todos los filtros
  limpiarFiltros() {
    this.textoBusqueda = '';
    this.generoSeleccionado = 'todos';
    this.plataformaSeleccionada = 'todas';
    this.precioMaximo = 100;
    this.ordenSeleccionado = 'nombre';
    this.mostrarSoloOfertas = false;
  }

  // Getter para juegos en oferta
  get juegosEnOferta() {
    return this.juegos.filter(juego => juego.enOferta);
  }
}