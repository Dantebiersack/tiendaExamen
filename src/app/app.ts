import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './componentes/layout/cabecera/cabecera';
import { Footer } from './componentes/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Cabecera,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Duel Zone';
}