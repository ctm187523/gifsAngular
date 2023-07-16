import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [ //declaracion de los componentes creados
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ //exportamos el componente para que se pueda utilizar en otros lugares en este caso app.component
    SidebarComponent
  ]
})
export class SharedModule { }
