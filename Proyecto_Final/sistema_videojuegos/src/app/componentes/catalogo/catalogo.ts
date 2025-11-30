import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, CommonModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  // Tu lista de juegos actual
  juegos = [
    {
      id: 1,
      nombre: 'The Legend of Zelda',
      precio: 59.99,
      plataforma: 'Nintendo Switch',
      genero: 'Aventura',
      imagen: 'https://ejemplo.com/zelda.jpg',
      rating: 5
    },
    {
      id: 2,
      nombre: 'Call of Duty',
      precio: 49.99,
      plataforma: 'PlayStation',
      genero: 'Shooter',
      imagen: 'https://ejemplo.com/cod.jpg',
      rating: 4
    },
    {
      id: 3,
      nombre: 'Halo Infinite',
      precio: 54.99,
      plataforma: 'Xbox',
      genero: 'Shooter',
      imagen: 'https://ejemplo.com/halo.jpg',
      rating: 4
    },
    // Agregamos más juegos para probar búsqueda
    {
      id: 4,
      nombre: 'Mario Kart 8',
      precio: 49.99,
      plataforma: 'Nintendo Switch',
      genero: 'Carreras',
      imagen: 'https://ejemplo.com/mario-kart.jpg',
      rating: 5
    },
    {
      id: 5,
      nombre: 'FIFA 24',
      precio: 39.99,
      plataforma: 'PlayStation',
      genero: 'Deportes',
      imagen: 'https://ejemplo.com/fifa.jpg',
      rating: 4
    }
  ];

  // Variable para el texto de búsqueda
  textoBusqueda: string = '';

  // Función para buscar juegos
  buscarJuegos() {
    if (!this.textoBusqueda) {
      return this.juegos; // Si no hay búsqueda, mostrar todos
    }
    
    const busqueda = this.textoBusqueda.toLowerCase();
    return this.juegos.filter(juego => 
      juego.nombre.toLowerCase().includes(busqueda) ||
      juego.genero.toLowerCase().includes(busqueda) ||
      juego.plataforma.toLowerCase().includes(busqueda)
    );
  }

  // Función simple para mostrar juego seleccionado
  verDetalles(juego: any) {
    console.log('Viendo detalles de:', juego.nombre);
    alert(`Detalles de ${juego.nombre}\nPrecio: $${juego.precio}\nPlataforma: ${juego.plataforma}\nGénero: ${juego.genero}`);
  }
}