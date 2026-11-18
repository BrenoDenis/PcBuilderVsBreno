import { neon, neonConfig } from '@neondatabase/serverless';

// Configura pool/fetch compatível com Edge e Serverless
neonConfig.fetchConnectionCache = true;

const databaseUrl = process.env.DATABASE_URL || '';

export const sql = databaseUrl
  ? neon(databaseUrl)
  : (() => {
      console.warn('DATABASE_URL do Neon não configurada. Defina a variável de ambiente no arquivo .env.local');
      return async () => [];
    })();

export interface PecaDB {
  id: string;
  categoria: string;
  nome: string;
  preco: number;
  especificacoes: string;
  potencia_watts: number;
  soquete?: string;
  imagem?: string;
}

export interface DepoimentoDB {
  id: number;
  nome: string;
  perfil: string;
  texto: string;
  tipo_pc: string;
  nota: number;
  criado_em: string;
}

export interface FaqDB {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: string;
  ordem: number;
}
