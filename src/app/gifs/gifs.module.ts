import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/shearch-box.components';
import { CardListComponent } from './components/card-list/card-list.component';




@NgModule({
  declarations: [ //declaracion de los componentes creados
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [  //exportamos el componente para que se pueda utilizar en otros lugares en este caso app.component
    HomePageComponent
  ]
})
export class GifsModule { }
