import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historialEtiquetas: string[] = [];

  get historialEtiquetas() {
    return [...this._historialEtiquetas]
  }

  buscarEtiqueta(etiqueta: string): void {
    if (etiqueta.length != 0) {
      this._historialEtiquetas.unshift(etiqueta);  
      console.log(this.historialEtiquetas);      
    }
  }

  constructor() { }
}
