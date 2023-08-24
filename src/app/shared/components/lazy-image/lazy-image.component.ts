import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {


  @Input()
  public url!:string;
  @Input()
  public alt: string = '';

  //propiedad booleana que indica cuando se carga la imagen
  public hasLoaded: boolean = false;

  ngOnInit(): void {
   
    //si no viene la url mandamos un error
    if ( !this.url ) throw new Error('URL property is required');
  }

  //metodo que se ejecuta la cargar la página
  onLoad(){
    this.hasLoaded = true;
  }

}
