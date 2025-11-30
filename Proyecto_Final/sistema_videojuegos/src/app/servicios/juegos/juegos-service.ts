import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interface para tipado fuerte
export interface Juego {
  id: string;
  nombre: string;
  precio: number;
  plataforma: string;
  genero: string;
  imagen: string;
  rating: number;
  fechaLanzamiento: Date;
  descripcion: string;
  enOferta: boolean;
  precioOriginal?: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  
  // Datos de ejemplo (luego se reemplazarán por Firebase)
  private juegosEjemplo: Juego[] = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
      id: '4',
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
      id: '5',
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
      id: '6',
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
      id: '7',
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
      id: '8',
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
      id: '9',
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
      id: '10',
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

  constructor() { }

  // Obtener todos los juegos (luego será Firebase)
  getJuegos(): Observable<Juego[]> {
    return of(this.juegosEjemplo);
  }

  // Obtener juego por ID (luego será Firebase)
  getJuegoPorId(id: string): Observable<Juego | undefined> {
    const juego = this.juegosEjemplo.find(j => j.id === id);
    return of(juego);
  }

  // Obtener juegos por plataforma (luego será Firebase)
  getJuegosPorPlataforma(plataforma: string): Observable<Juego[]> {
    const juegos = this.juegosEjemplo.filter(j => 
      plataforma === 'todas' ? true : j.plataforma === plataforma
    );
    return of(juegos);
  }

  // Obtener juegos en oferta (luego será Firebase)
  getJuegosEnOferta(): Observable<Juego[]> {
    const juegos = this.juegosEjemplo.filter(j => j.enOferta);
    return of(juegos);
  }

  // Buscar juegos (luego será Firebase)
  buscarJuegos(termino: string): Observable<Juego[]> {
    const busqueda = termino.toLowerCase();
    const juegos = this.juegosEjemplo.filter(j => 
      j.nombre.toLowerCase().includes(busqueda) ||
      j.genero.toLowerCase().includes(busqueda) ||
      j.plataforma.toLowerCase().includes(busqueda)
    );
    return of(juegos);
  }

  // Obtener géneros únicos
  getGeneros(): Observable<string[]> {
    const generos = this.juegosEjemplo.map(juego => juego.genero);
    return of(['todos', ...new Set(generos)]);
  }

  // Obtener plataformas únicas
  getPlataformas(): Observable<string[]> {
    const plataformas = this.juegosEjemplo.map(juego => juego.plataforma);
    return of(['todas', ...new Set(plataformas)]);
  }
}