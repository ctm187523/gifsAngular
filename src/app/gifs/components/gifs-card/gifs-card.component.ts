import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
})
export class GifsCardComponent implements OnInit{



  @Input()
  public gif!: Gif;

    //metodo que se ejecuta al iniciar
    ngOnInit(): void {

      //validamos que tengamos la variable gifs
      if ( !this.gif ) throw new Error('Gif property is requiered');
    }

}
