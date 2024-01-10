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
  
  constructor(private http: HttpClient) { 
    this.cargarLocalStorage();
  }

  // Método para obtener una copia de _historialEtiquetas
  get historialEtiquetas() {
    return [...this._historialEtiquetas]
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
      this.listadoGifs = resp.data      
    })

    // Se almacena la etiqueta después de buscarla
    this.almacenarLocalStorage();
  }

  private almacenarLocalStorage(): void {
    localStorage.setItem('historial', JSON.stringify(this._historialEtiquetas));
  }

  private cargarLocalStorage(): void {
    if (!localStorage.getItem('historial')) return;
    this._historialEtiquetas = JSON.parse(localStorage.getItem('historial')!);

    if (this._historialEtiquetas.length === 0) return;
    this.buscarEtiqueta(this._historialEtiquetas[0]);
  }
}
