import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Morena } from "./morena/morena";
import { William } from './william/william';
import { Athenea } from './athenea/athenea';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Morena, William, Athenea],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tarea');
}
