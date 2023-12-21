import { Component, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';


@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})

export class CardListComponent {
  resultadosGifs: Gif[] = [];

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
    // Acceder a listadoGifs a través del Subject del servicio
    // Suscribirse a los cambios en los resultados
    this.gifsService.getResultadosActualizadosObservable().subscribe(resultados => {
      this.resultadosGifs = resultados;
      console.log('Resultados GIFs:', this.resultadosGifs); // test
    });
  }
}
