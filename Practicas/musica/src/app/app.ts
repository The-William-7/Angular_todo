import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioPlayerComponent } from "./audio-player/audio-player";
import { OptionBar } from "./option-bar/option-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AudioPlayerComponent, OptionBar, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  currentView: string = 'player';
  title = 'musica';

  handleOption(selectedOption: string): void {
    this.currentView = selectedOption;
    console.log('Opción seleccionada:', selectedOption);
  }
}