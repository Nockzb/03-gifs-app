import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'IsQyHrWS9GjZMX0zOTUrPQmg7wB5I6Zf';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  private _listadoGifs: Gif[] = []
  private _historialEtiquetas: string[] = [];
  private _resultadosActualizados = new Subject<Gif[]>();

  constructor(private http: HttpClient) { }

  // Método para obtener una copia de listadoGifs
  getListadoGifs(): Gif[] {
    return [...this._listadoGifs];
  }

  // Método para obtener una copia de _historialEtiquetas
  get historialEtiquetas() {
    return [...this._historialEtiquetas]
  }

   // Método para obtener el Subject de resultados actualizados
   getResultadosActualizadosObservable() {
    return this._resultadosActualizados.asObservable();
  }

  // Método para organizar el historial de búsquedas
  organizarHistorial(etiquet: string): void {
    if (etiquet.length == 0 || etiquet == null) {

    } else {
      if (this._historialEtiquetas.includes(etiquet)) {
        this._historialEtiquetas = this._historialEtiquetas.filter(etiq => etiq != etiquet)
        this._historialEtiquetas.unshift(etiquet);

      } else {
        this._historialEtiquetas.unshift(etiquet);
      }
    }

    // Se muestran siempre los últimos 10 elementos
    this._historialEtiquetas = this._historialEtiquetas.splice(0, 10);
  }

  // Método para realizar búsquedas
  // y generar un objeto de tipo <SearchResponse>
  // con los resultados
  buscarEtiqueta(etiqueta: string): void {
    const etiquetaTrim = etiqueta.toLowerCase().trim();
    this.organizarHistorial(etiquetaTrim);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', etiqueta)
      .set('limit', 10)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe(resp => {
      console.log("respuesta: ", resp.data); // test
      this._listadoGifs = resp.data
      this._resultadosActualizados.next(this._listadoGifs);  // Notificar a los suscriptores

      console.log("listado guardado: ", this._listadoGifs); // test
    })
  }
}
