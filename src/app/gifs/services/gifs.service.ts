import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//con provideIn: 'root' hacemos que el servicio sea accesible en todo el proyecto sin tener que exportarlo
//en el gifs.module
@Injectable({ providedIn: 'root' })
export class GifsService {

    //propiedades
    private _tagsHistory: string[] = [];
    private apiKey: string = 'uNKEqRinqh8gXTPbEd4kNFj5ag82VgCT';
    private serciceUrl: string = 'https://api.giphy.com/v1/gifs';

    //creamos un listado de los gifs obtenidos tipado del tipo Gif creado en app/gifs/interfaces
    //la hacemos publica y no la manejamos con un getter porque este listado es volatil a cada peticion
    //se actualiza se podria hacer tambien un getter pero no es necesario
    public gifList: Gif[] = []; 

    //inyectamos el servicio de HttpClientModule importado en app.module para manejar las peticios http
    constructor(private http: HttpClient) {

        //llamamos en el constructor el metodo loadLocalStorage para recuperar la informacion grabada en el Local Storage
        //y lo llame nada mas se llame al constructor
        this.loadLocalStorage();
       
     }

    //método getter
    get tagsHistory() {
        return [...this._tagsHistory]; //usamos el spread para crear un nuevo arreglo ya que javascript lo pasa por referencia
    }

    //metodo para manejar los tags y hacer validaciones
    private organizeHistory(tag: string) {

        tag = tag.toLowerCase(); //pasamos a minusculas

        //comprobamos si el tag ya existe en el arreglo, si existe lo borramos para ponerlo al inicio
        if (this._tagsHistory.includes(tag)) {
            //filtramos el arreglo para crear un nuevo arreglo que excluya el tag recibido por parametro
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
        }

        this._tagsHistory.unshift(tag); //colocamos el tag recibido por parametro al inicio ya habiendo borrado el anterior en caso de estar repetido
        this._tagsHistory = this.tagsHistory.splice(0, 10); //limitamos a 10 el listado
        this.saveLocalStorage(); //llamamos al metodo de abajo para almacenar el listado de tags en el LocalStorage
    }

    //metodo para grabar en el LocalStorage, localStorage no necesita importacion, siempre graba como String
    //con JSON.stringify lo pasamos a String en formato JSON
    private saveLocalStorage():void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    //metodo para cargar del localStorage
    private loadLocalStorage():void{

        //comprobamos que haya informacion en el localStorage, si no hay informacion salimos del metodo
        if(!localStorage.getItem('history')) return;

        this._tagsHistory = JSON.parse(localStorage.getItem('history')!); //ponemos ! para indicar que no viene nulo y con JSON.parse parseamos la informacion
   
        if(this._tagsHistory.length === 0) return; //comprobamos que el listado de tag sea mayor que 0
        this.searchTag( this._tagsHistory[0]); //mostramos los gifs del primer tag de la lista
    }

    //metodo para añadir un nuevo tag al array de arriba _tagsHistory
    //El unshift() método agrega los elementos especificados al comienzo de una matriz
    // y devuelve la nueva longitud de la matriz.
    searchTag(tag: string): void {

        if (tag.length === 0) return; //si el tag es vacio salimos y no se agrega
        this.organizeHistory(tag); //llamamos al metodo de arriba para hacer validaciones del tag recibido

        //hacemos la peticion http usamos provisionalmente fetch, LO COMENTAMOS PORQUE USAREMOS HttpClientModule
        //haciendo asincrono el metodo y devolviendo una Promise de tipo void
        //la peticion la hemos echo primero en postman poniendo por parametros el api_key, q el criterio de busqueda
        //y limit el limite de gifs antes hemos puesto https:// el API usada es --> https://developers.giphy.com/docs/api/endpoint#search
        // fetch('https://api.giphy.com/v1/gifs/search?api_key=uNKEqRinqh8gXTPbEd4kNFj5ag82VgCT&q=valorant&limit=10')
        //   .then( resp => resp.json()) //serializamos la respuesta  
        //   .then( data => console.log(data));


        //creamos un objeto de tipo HttpParams para poner los parametros que usaremos en la peticion Http
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag)

        //usamos el servicio importado en el constructor para las peticiones http es  un observable
        //el observable es un objeto en el cual a lo largo del tiempo, puedo estar emitiendo valores, usualemente
        //cuando hablamos de 'susbscribirnos a los observables', significa estar escuchando las emisiones que ese
        //objeto estará emitiendo a lo largo de su vida
        //hemos tipado el get usando la interfaz creada en app/gifs/interfaces SearchResponse
        this.http.get<SearchResponse>(`${this.serciceUrl}/search`, { params })
            .subscribe( resp => {
                
                this.gifList = resp.data; //agregamos los gifs obtenidos en la variable creada arriba en propiedades
                console.log({ gifs: this.gifList})
            })

    }

}