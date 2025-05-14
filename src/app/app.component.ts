import { Component } from '@angular/core';
import { ListaDeTarefasComponent } from "./components/lista-de-tarefas/lista-de-tarefas.component";

@Component({
  selector: 'app-root',
  imports: [ ListaDeTarefasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lista-de-tarefas';
}
