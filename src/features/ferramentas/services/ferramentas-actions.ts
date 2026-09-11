"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/lib/action-result";
import { runApiAction } from "@/lib/api-action";

import { ROTA_CONSULTA_FERRAMENTAS } from "../rotas";
import type { DadosFerramenta } from "../types";
import { cadastrarFerramenta } from "./ferramentas-api";

export async function acaoCadastrarFerramenta(dados: DadosFerramenta): Promise<ActionResult> {
  const resultado = await runApiAction(() => cadastrarFerramenta(dados));
  if (resultado.ok) {
    revalidatePath(ROTA_CONSULTA_FERRAMENTAS);
  }
  return resultado;
}
