export default function FaixaAluno({ faixa }: { faixa: string }) {
  const faixas = {
    branco: { cor: "bg-white", secundaria: null },
    azul: { cor: "bg-[#0000FF]", secundaria: null },
    roxo: { cor: "bg-[#800080]", secundaria: null },
    marrom: { cor: "bg-[#63300C]", secundaria: null },
    preto: { cor: "bg-black", secundaria: null },
    
    cinza: { cor: "bg-[#808080]", secundaria: null },
    "cinza-branca": { cor: "bg-[#808080]", secundaria: "bg-white" },
    "cinza-preta": { cor: "bg-[#808080]", secundaria: "bg-black" },

    amarelo: { cor: "bg-[#FFD700]", secundaria: null },
    "amarela-branca": { cor: "bg-[#FFD700]", secundaria: "bg-white" },
    "amarela-preta": { cor: "bg-[#FFD700]", secundaria: "bg-black" },

    laranja: { cor: "bg-[#FF8C00]", secundaria: null },
    "laranja-branca": { cor: "bg-[#FF8C00]", secundaria: "bg-white" },
    "laranja-preta": { cor: "bg-[#FF8C00]", secundaria: "bg-black" },

    verde: { cor: "bg-[#008000]", secundaria: null },
    "verde-branca": { cor: "bg-[#008000]", secundaria: "bg-white" },
    "verde-preta": { cor: "bg-[#008000]", secundaria: "bg-black" },
  };

  const faixaInfo = faixas[faixa as keyof typeof faixas] || faixas["branco"];

  return (
    <div
      className={`relative w-full h-[100px] rounded-[5px] overflow-hidden flex justify-center items-center ${faixaInfo.cor}`}
    >
      {faixaInfo.secundaria && (
        <div
          className={`w-full h-[25px] ${faixaInfo.secundaria}`}
        />
      )}
    </div>
  );
}