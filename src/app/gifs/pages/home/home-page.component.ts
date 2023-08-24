import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  //inyectamos el servico GifsService
  constructor( private gifsService: GifsService) {}

  //creamos un metodo get que retornara el arreglo de gifs tipado con la interfaz creada en app/gifs/interfaces
  //creamos un metodo get para que sea dinamico
  get gifs(): Gif[] {
    
    return this.gifsService.gifList;
  }

}
