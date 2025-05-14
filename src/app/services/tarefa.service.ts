// Está trazendo o Injectable, que permite que esse serviço 
// seja usado em qualquer parte do 
// app (como um ajudante que pode ser injetado em outros lugares).
import { Injectable } from '@angular/core';
// BehaviorSubject é como um alto-falante de dados: 
// ele guarda e avisa quando algo muda.
// Observable é um jeito de escutar mudanças. 
// A tela do app escuta isso pra se atualizar automaticamente.
import { BehaviorSubject, Observable } from 'rxjs';
// Trazendo o molde da tarefa que criamos (com id, titulo, concluida, etc.)
import { Tarefas } from '../models/task.model';

// Dizendo que esse serviço pode ser usado em todo o aplicativo (root quer dizer “raiz”).
@Injectable({
  providedIn: 'root'
})
// Aqui começa a criação da classe (conjunto de comandos) chamada TarefasService.
export class TarefasService {
  // Criando uma lista de tarefas, inicialmente vazia ([]).
  // private significa que só essa classe pode mexer nessa lista.
  private tarefas: Tarefas[] = [];
  // Isso é como um alto-falante de tarefas atualizadas.
  // Ele começa vazio, mas vai avisar toda vez que a lista de tarefas mudar.
  private assuntoTarefas = new BehaviorSubject<Tarefas[]>([]);

  // Quando esse serviço é criado, ele executa o método carregarTarefas(). 
  // Isso significa que, se tiver tarefas salvas no navegador, ele vai carregar.
  constructor() {
    this.carregarTarefas();
  }

  // Essa função entrega as tarefas para quem pedir.
  // asObservable() quer dizer: “Deixe alguém escutar quando a lista mudar”.
  obterTarefas(): Observable<Tarefas[]> {
    return this.assuntoTarefas.asObservable();
  }

  // Função que cria uma nova tarefa.
  // titulo é o texto da tarefa (obrigatório).
  // prioridade é opcional (? significa que pode ou não ser passada).
  adicionarTarefa(titulo: string, prioridade?: 'baixa' | 'media' | 'alta'): void {
    // Está criando um objeto com os dados da nova tarefa.
    const newTask: Tarefas = {
      id: Date.now(), // usa o momento atual (um número único).
      titulo, 
      concluida: false, // a tarefa começa como “não feita”.
      criadoEm: new Date(), // guarda a data atual.
      prioridade: prioridade || 'media' // se não for passada, assume “média”.
    };
    // push() adiciona a nova tarefa à lista.
    this.tarefas.push(newTask);
    // Depois ele chama a função para atualizar a lista e avisar todo mundo.
    this.atualizarTarefas();
  }

  // Essa função marca uma tarefa como feita ou desfaz.
  // Recebe o id da tarefa.
  alternarConclusaoDeTarefa(id: number): void {
    // Ele procura a tarefa com o ID certo.
    // ...task copia todos os dados da tarefa.
    // concluida: !task.concluida inverte o valor: se era false, 
    // vira true, e vice-versa.
    this.tarefas = this.tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    );

    // Depois de mudar, ele atualiza e salva.
    this.atualizarTarefas();
  }

  // Essa função remove uma tarefa com base no id.
  removerTarefas(id: number): void {
    // filter cria uma nova lista sem a tarefa com aquele id.
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
    // Depois ele atualiza
    this.atualizarTarefas();
  }


  // Essa função atualiza qualquer parte de uma tarefa 
  // (ex: mudar o título ou prioridade).
  // Partial<Tarefas> significa que não precisa atualizar tudo, só o que quiser.
  // procura a tarefa certa e aplica as mudanças (...updates).
  atualizarTarefa(id: number, atualizar: Partial<Tarefas>): void {
    this.tarefas = this.tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, ...atualizar } : tarefa
    );
    this.atualizarTarefas();
  }

  // next([...this.tarefas]): avisa para quem está escutando que a lista mudou.
  private atualizarTarefas(): void {
    this.assuntoTarefas.next([...this.tarefas]);
    // salva no navegador.
    this.salvarTarefas();
  }

  // localStorage: é como um armazenamento do navegador (não precisa de internet).
  // JSON.stringify: transforma o conteúdo da lista em texto para guardar.
  private salvarTarefas(): void {
    localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
  }


  private carregarTarefas(): void {
    // getItem('tarefas'): pega as tarefas salvas.
    const salvarTarefas = localStorage.getItem('tarefas');
    if (salvarTarefas) {
      // JSON.parse: transforma de volta para lista.
      this.tarefas = JSON.parse(salvarTarefas);
      // e tiver tarefas guardadas, ele carrega e avisa todo mundo.
      this.assuntoTarefas.next([...this.tarefas]);
    }
  }
}
