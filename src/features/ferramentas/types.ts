import { z } from "zod";

// Campos de ToolResponse usados pelas telas; o restante (auditoria) é descartado pelo zod.
export const ferramentaSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  nome: z.string(),
  quantidade: z.number().int(),
  versao: z.number().int(),
});

export const listaFerramentasSchema = z.array(ferramentaSchema);

export type Ferramenta = z.infer<typeof ferramentaSchema>;
