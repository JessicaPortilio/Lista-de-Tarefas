import { TarefasService } from './../../services/tarefa.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tarefas } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemDeTarefasComponent } from "../item-de-tarefas/item-de-tarefas.component";

@Component({
  selector: 'app-lista-de-tarefas',
  imports: [CommonModule, FormsModule, ItemDeTarefasComponent],
  templateUrl: './lista-de-tarefas.component.html',
  styleUrl: './lista-de-tarefas.component.scss'
})
// export: Diz que essa classe pode ser usada em outros arquivos do projeto.
// class: Estamos criando uma classe chamada ListaDeTarefasComponent.
// implements OnInit: A classe está dizendo que vai usar um "modelo" chamado
// OnInit, que serve para rodar uma função assim que o componente aparecer na tela.
export class ListaDeTarefasComponent implements OnInit{
  // tarefas$: Um nome com $ no final normalmente significa que é 
  // uma stream de dados (algo que atualiza automaticamente, como uma 
  // rede social mostrando novos posts).
  // !:: Diz ao TypeScript que essa variável vai ser definida depois.
  // Observable<Tarefas[]>: É uma lista de tarefas que pode mudar com o tempo e 
  // ser observada para atualizar a interface sempre que mudar.
  tarefas$!: Observable<Tarefas[]>;

  // novoTituloDaTarefa: Armazena o título (nome) que o usuário digita para uma nova tarefa.
  // Começa vazio ('').
  novoTituloDaTarefa = '';

  // prioridadeSelecionada: Guarda a prioridade escolhida para a nova tarefa.
  // Pode ser: 'baixa' | 'media' | 'alta'
  // Começa com o valor 'media'.
  prioridadeSelecionada: 'baixa' | 'media' | 'alta' = 'media';


  // O constructor é executado quando o componente é criado.
  // Estamos pedindo uma ajuda externa chamada tarefaService, 
  // que é responsável por guardar e cuidar das tarefas 
  // (criar, apagar, editar etc.).
  // O private significa que só esta classe pode usar esse serviço diretamente.
  constructor(private tarefaService: TarefasService) {}

  // ngOnInit(): Essa função roda automaticamente 
  // assim que o componente aparece na tela.
  ngOnInit(): void {
    // Chamamos o serviço (tarefaService) e pegamos todas as tarefas 
    // já criadas usando o método obterTarefas().
    // Armazenamos essa "lista observável" de tarefas em tarefas$.
    this.tarefas$ = this.tarefaService.obterTarefas();
  }

  // adicionarTarefa(): Função chamada quando o usuário quer adicionar uma tarefa nova.
  adicionarTarefa(): void {
    // Só adiciona se o campo do título não estiver vazio.
    if (this.novoTituloDaTarefa.trim()) {
      // Se tiver texto
      // Chamamos o serviço para criar a tarefa com título e prioridade.
      this.tarefaService.adicionarTarefa(this.novoTituloDaTarefa, this.prioridadeSelecionada);
      // Limpamos o campo de texto depois
      this.novoTituloDaTarefa = '';
    }
  }

  // Marca a tarefa como feita ou desfeita.
  // Usa o ID da tarefa (número único que identifica cada tarefa).
  alternarConclusaoDeTarefa(id: number): void {
    // Chama o serviço para fazer isso.
    this.tarefaService.alternarConclusaoDeTarefa(id);
  }

  // Função para remover uma tarefa
  removerTarefas(id: number): void {
    // Apaga uma tarefa com base no ID.
    // Usa o serviço para remover.
    this.tarefaService.removerTarefas(id);
  }

  // Função para atualizar o título de uma tarefa
  atualizarTarefa(id: number, titulo: string): void {
    // Altera o nome de uma tarefa.
    // Recebe o ID da tarefa e o novo título.
    // Chama o serviço passando esses dados.
    this.tarefaService.atualizarTarefa(id, { titulo });
  }

  // Quantidade de tarefas concluídas
  // Isso é como um campo automático que sempre mostra 
  // quantas tarefas estão concluídas.
  get contagemDeTarefasConcluidas$(): Observable<number> {
    // Observa tarefas$ (a lista de tarefas),
    // Filtra as que estão marcadas como feitas (t.concluida),
    // Conta quantas são (.length).
    return this.tarefas$.pipe(
      map(tarefas => tarefas.filter(t => t.concluida).length)
    );
  }

  // Quantidade total de tarefas
  // Isso é parecido com o anterior.
  get contagemTotalDeTarefas$(): Observable<number> {
    // Aqui estamos apenas contando quantas tarefas no total existem 
    // (sem importar se foram concluídas ou não).
    return this.tarefas$.pipe(
      map(tarefas => tarefas.length)
    );
  }
}
