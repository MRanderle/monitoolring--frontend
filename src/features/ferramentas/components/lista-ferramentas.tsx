import { BotaoTentarNovamente } from "@/components/shared/botao-tentar-novamente";
import { MensagemErro } from "@/components/shared/mensagem-erro";
import { NETWORK_ERROR_STATUS } from "@/lib/action-result";
import { ApiError } from "@/lib/api-client";

import { listarFerramentas } from "../services/ferramentas-api";
import type { Ferramenta } from "../types";
import { TabelaFerramentas } from "./tabela-ferramentas";

export async function ListaFerramentas() {
  let ferramentas: Ferramenta[];
  try {
    ferramentas = await listarFerramentas();
  } catch (erro) {
    // Falha de rede ou HTTP tem tratamento na própria tela; resposta fora do contrato (zod)
    // é erro inesperado e segue para o error boundary da rota.
    if (!(erro instanceof ApiError)) {
      throw erro;
    }
    return <ErroCarregamentoFerramentas status={erro.status} />;
  }

  return <TabelaFerramentas ferramentas={ferramentas} />;
}

function ErroCarregamentoFerramentas({ status }: { status: number }) {
  return (
    <MensagemErro
      titulo="Não foi possível carregar as ferramentas."
      motivo={descreverMotivo(status)}
      orientacao="Tente novamente. Se o problema continuar, avise o responsável pelo sistema."
      acao={<BotaoTentarNovamente />}
    />
  );
}

function descreverMotivo(status: number): string {
  if (status === NETWORK_ERROR_STATUS) {
    return "O servidor não respondeu. A conexão pode estar indisponível.";
  }
  if (status === 401 || status === 403) {
    return "O servidor recusou o acesso porque a sessão é inválida ou expirou.";
  }
  return "O servidor encontrou um problema ao consultar as ferramentas.";
}
