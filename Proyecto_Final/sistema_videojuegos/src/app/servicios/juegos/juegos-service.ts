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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
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
      imagen: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
      rating: 4,
      fechaLanzamiento: new Date('2023-11-10'),
      descripcion: 'Intensa experiencia de combate moderno con multijugador y campaña emocionante.',
      enOferta: true,
      precioOriginal: 69.99,
      stock: 8
    },
    // ... (todos los demás juegos)
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