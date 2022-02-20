export interface Utilizador {
    
    id: string;
    nome: string;
    email: string;
    dataNascimento: Date;
    password: string;
    avatar: string;
    cidade: string;
    pais: string;
    descricao: string;
    numTelemovel: string;
    estadoHumorId: string;
    tags: [string];
  
}