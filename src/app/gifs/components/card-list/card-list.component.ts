import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  //recibimos la informacion del padre, el arreglo de tipo Gif tipado de la interface creada en app/gifs/interfaces
  @Input()
  public gifs: Gif[] = [];

}
