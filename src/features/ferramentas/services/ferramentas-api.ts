import "server-only";

import { apiRequest } from "@/lib/api-client";

import { listaFerramentasSchema, type Ferramenta } from "../types";

const RECURSO_FERRAMENTAS = "/tools";

export async function listarFerramentas(): Promise<Ferramenta[]> {
  const resposta = await apiRequest(RECURSO_FERRAMENTAS);
  return listaFerramentasSchema.parse(resposta);
}
