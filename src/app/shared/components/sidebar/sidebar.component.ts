import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor (private gifsService: GifsService) { } // aqui se inyecta el servicio
  
  crearBotones(): string[] {
    return this.gifsService.historialEtiquetas;
  }

  cargarEtiqueta(etiqe: string): void {
    this.gifsService.buscarEtiqueta(etiqe)
  }
}
