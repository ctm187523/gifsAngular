
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'gifs-search-box',
    // creamos el html en el template directamente entre bag tips ``
    //usamos el siguiente codigo:
    //    (keyup)="searchTag( txtTagInput.value)"
    //    #txtTagInput
    //para no tener que importar el formsModule para tener acceso al ngModel(banana in box)
    //usamos una referencia local #txtTagInput (el nombre se lo ponemos nosotros)
    //y lo mandamos usando el evento keyup al metodo creado abajo searchTag()
    //en el evento keyup.enter ponemos enter para que el evento se mande al presionar enter
    //si no se manda al metodo a cada letra que se escribe si no ponemos el .enter

    template:
        `
            <h5>Buscar:</h5>
            <input type="text"
                class="form-control"
                placeholder="Buscar gifs..."
                (keyup.enter)="searchTag()"
                #txtTagInput
            >
        `
})

export class SearchBoxComponent {

    //con el decorador ViewChild cojemos una referencia al html,podemos poner el Input,h5 etc
    //pero tomaremos la referencia creada en el input txtTagInput,
    //tambien existe el ViewChildren para obtener un arreglo de referencias o elementos Html
    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>; //indicamos que tenemos una referencia de tipo HTMLInputElement, le ponemos ! para indicar que no va a ser nulo

    //inyectamos el servicio gifsService
    constructor( private gifsService: GifsService) { }

    //metodo, no hace falta que recibamos ningun argumento en el metodo,porque usamos la varaible creada
    //arriba tagInput que es una referencia al HTML en este caso el Input y podemos obtener todas sus
    //caracteristicas usamos el value para obtener lo que se escribe en el Input
    searchTag() {

        const newTag = this.tagInput.nativeElement.value;

        this.gifsService.searchTag(newTag); //enviamos al servicio el tag

        this.tagInput.nativeElement.value = ''; //limpiamos la caja de texto del Input
        
    }
}