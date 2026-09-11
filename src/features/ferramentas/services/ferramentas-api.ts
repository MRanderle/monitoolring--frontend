import "server-only";

import { apiRequest } from "@/lib/api-client";

import {
  ferramentaSchema,
  listaFerramentasSchema,
  type DadosFerramenta,
  type Ferramenta,
} from "../types";

const RECURSO_FERRAMENTAS = "/tools";

export async function listarFerramentas(): Promise<Ferramenta[]> {
  const resposta = await apiRequest(RECURSO_FERRAMENTAS);
  return listaFerramentasSchema.parse(resposta);
}

export async function cadastrarFerramenta(dados: DadosFerramenta): Promise<Ferramenta> {
  const resposta = await apiRequest(RECURSO_FERRAMENTAS, { method: "POST", body: dados });
  return ferramentaSchema.parse(resposta);
}
