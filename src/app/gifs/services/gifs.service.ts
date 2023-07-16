import { Injectable } from '@angular/core';

//con provideIn: 'root' hacemos que el servicio sea accesible en todo el proyecto sin tener que exportarlo
//en el gifs.module
@Injectable({ providedIn: 'root' }) 
export class GifsService {

    //propiedades
    private _tagsHistory: string[] = [];


    constructor() { }

    //método getter
    get tagsHistory() {
        return [...this._tagsHistory]; //usamos el spread para crear un nuevo arreglo ya que javascript lo pasa por referencia
    }

    //metodo para añadir un nuevo tag al array de arriba _tagsHistory
    //El unshift() método agrega los elementos especificados al comienzo de una matriz
    // y devuelve la nueva longitud de la matriz.
    searchTag(tag: string): void {
        this._tagsHistory.unshift(tag);
        
    }

}