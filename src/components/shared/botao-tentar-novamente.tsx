"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BotaoTentarNovamenteProps {
  onTentarNovamente?: () => void;
}

// router.refresh() refaz a busca dos Server Components; o callback opcional permite ao
// error boundary limpar o próprio estado de erro na mesma transição.
export function BotaoTentarNovamente({ onTentarNovamente }: BotaoTentarNovamenteProps) {
  const router = useRouter();
  const [isTentando, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      router.refresh();
      onTentarNovamente?.();
    });
  }

  return (
    <Button type="button" variant="outline" onClick={handleClick} disabled={isTentando}>
      <RotateCw
        aria-hidden="true"
        className={cn("mr-2 h-4 w-4", isTentando && "motion-safe:animate-spin")}
      />
      {isTentando ? "Tentando novamente…" : "Tentar novamente"}
    </Button>
  );
}
