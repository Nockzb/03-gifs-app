import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public listadoGifs: Gif[] = []
  private _historialEtiquetas: string[] = [];
  private apiKey: string = 'IsQyHrWS9GjZMX0zOTUrPQmg7wB5I6Zf';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'
  
  constructor(private http: HttpClient) { }

  get historialEtiquetas() {
    return [...this._historialEtiquetas]
  }

  // Metodo para organizar el historial de busquedas
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

    this._historialEtiquetas = this._historialEtiquetas.splice(0, 10);
  }

  // Metodo para realizar busquedas
  buscarEtiqueta(etiqueta: string): void {
    const etiquetaTrim = etiqueta.toLowerCase().trim();
    this.organizarHistorial(etiquetaTrim);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', etiqueta)
      .set('limit', 10)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe(resp => {
      console.log(resp);   
      this.listadoGifs = resp.data   
    })
  }  
}
