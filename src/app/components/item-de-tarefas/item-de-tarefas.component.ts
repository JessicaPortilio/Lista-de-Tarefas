import { Tarefas } from './../../models/task.model';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-de-tarefas',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-de-tarefas.component.html',
  styleUrl: './item-de-tarefas.component.scss'
})
// export: Permite que esse componente seja usado em outros lugares do projeto
// class ItemDeTarefasComponent: Cria a classe para o componente chamado 
// ItemDeTarefasComponent.
export class ItemDeTarefasComponent {
  // Entrada
  // Input(): Significa que esse componente vai receber dados 
  // de fora (do componente principal).
  // tarefa: É o nome da variável que representa uma tarefa específica.
  // !: Tarefas: Diz que ela será do tipo Tarefas e que a gente garante 
  // que ela sempre vai existir.
  @Input() tarefa!: Tarefas;

  // Saída
  // Essas três linhas são formas de avisar para o componente pai que alguma 
  // ação aconteceu aqui (como apagar, editar ou marcar como concluída).
  // @Output(): Essa parte avisa para o mundo exterior que algo aconteceu aqui dentro.
  // EventEmitter<T>: Um "megafone" que emite eventos com um valor. O tipo <T> é o tipo do dado que será enviado.
  @Output() alternarCompleto = new EventEmitter<number>();
  @Output() remover = new EventEmitter<number>();
  @Output() editar = new EventEmitter<{id: number, titulo: string}>();


  // estaEditando: Um controle interno. Quando true, o componente mostra uma caixa 
  // de edição. Começa como false.
  estaEditando = false;

  // tituloEditado: Guarda o novo título enquanto o usuário edita. Começa vazio.
  tituloEditado = '';

  // Função que começa o processo de edição.
  comecarEditar(): void {
    // Ativa o modo de edição.
    this.estaEditando = true;
    // Copia o título atual da tarefa para que o usuário possa modificá-lo.
    this.tituloEditado = this.tarefa.titulo;
  }

  // Salvar a edição
  // Função que salva o novo nome da tarefa.
  salvarEdicao(): void {
    // Verifica se o título não está em branco.
    if (this.tituloEditado.trim()) {
      // this.edit.emit(...): Envia o novo título e o ID da tarefa para fora.
      this.editar.emit({id: this.tarefa.id, titulo: this.tituloEditado});
      // Sai do modo de edição.
      this.estaEditando = false;
    }
  }

  // Cancelar a edição
  // Se o usuário mudar de ideia, essa função desliga o modo de edição sem salvar.
  cancelarEdicao(): void {
    this.estaEditando = false;
  }

  
}
