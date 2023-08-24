import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  //inyectamos el servicio GifsService
  constructor(private gisfService:GifsService){

  }

  //metodo getter para regresar los tags recibidos en el servicio, creamos un getter porque es dinamico
  //no podemos usar una variable public tags: string[] = this.gisfService.tagsHistory; solo funciona
  //si el array ya tiene los elementos, es fijo, para este caso hay que crear un metodo getter y usarlo
  //en el componente sidebar.component.html
  get tags(): string[] {
    return this.gisfService.tagsHistory;
  }

  searchTag(tag: string){
    this.gisfService.searchTag(tag);
  }
}
