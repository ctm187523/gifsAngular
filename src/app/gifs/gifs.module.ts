import { CardListComponent } from './components/card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { GifsCardComponent } from './components/gifs-card/gifs-card.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { NgModule } from '@angular/core';
import { SearchBoxComponent } from './components/search-box/shearch-box.components';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ //declaracion de los componentes creados
    CardListComponent,
    GifsCardComponent,
    HomePageComponent,
    SearchBoxComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [  //exportamos el componente para que se pueda utilizar en otros lugares en este caso app.component
    HomePageComponent
  ]
})
export class GifsModule { }
