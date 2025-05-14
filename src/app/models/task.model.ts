// export: isso significa que essa interface pode ser usada em outros arquivos. 
// interface: isso define um molde (modelo). Uma interface diz como um 
// objeto deve ser estruturado, mas não guarda valores, 
// só define o formato dos dados.
// Tarefas: é o nome dessa interface. A gente está dizendo: 
// “Toda tarefa no meu sistema vai seguir esse formato chamado Tarefas”.
export interface Tarefas {
    id: number;
    titulo: string;
    concluida: boolean;
    criadoEm: Date;
    // prioridade? → essa propriedade é opcional. O ? significa que não é 
    // obrigatório informar a prioridade quando a tarefa for criada.
    // Pode ter um desses três valores
    prioridade?: 'baixa' | 'media' | 'alta';
}