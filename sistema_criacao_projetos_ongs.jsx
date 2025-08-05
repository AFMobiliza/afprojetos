// Sistema de Criação de Projetos para ONGs
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ProjetoONGBuilder() {
  const [dadosProjeto, setDadosProjeto] = useState({
    nome: "",
    cidade: "",
    idade: "",
    publico: "",
    tema: "",
    tipoProjeto: "",
    leiIncentivo: "",
    descricao: "",
    estrutura: "",
    metasValidas: true,
    sugestoesMetas: []
  });

  const leis = [
    { id: "fia", label: "FIA - Fundo da Infância e Adolescência" },
    { id: "idoso", label: "Pessoa Idosa" },
    { id: "esporte", label: "Esporte" },
    { id: "rouanet", label: "Lei Rouanet" },
    { id: "reciclagem", label: "Reciclagem" },
    { id: "nao_incentivo", label: "Sem lei de incentivo" }
  ];

  const temas = ["Educação", "Meio Ambiente", "Saúde", "Cultura", "Geração de Renda", "Direitos Humanos"];

  const exemplosProjetos = [
    {
      titulo: "Educar para Transformar",
      tema: "Educação",
      publico: "adolescentes em situação de vulnerabilidade social",
      lei: "fia",
      link: "https://www.exemplo.com/educar-para-transformar"
    },
    {
      titulo: "Cultura em Movimento",
      tema: "Cultura",
      publico: "jovens artistas periféricos",
      lei: "rouanet",
      link: "https://www.exemplo.com/cultura-em-movimento"
    }
  ];

  const sugestoesPorTema = {
    "Educação": ["Aumentar em 30% a taxa de alfabetização dos participantes.", "Oferecer 60 horas de reforço escolar por trimestre.", "Capacitar 20 educadores comunitários."],
    "Meio Ambiente": ["Reduzir resíduos sólidos em 20% na comunidade.", "Promover mutirão de plantio com 200 mudas nativas.", "Realizar oficinas sobre reciclagem para 100 crianças."],
    "Saúde": ["Atender 200 pessoas com serviços de saúde preventiva.", "Realizar 10 oficinas de alimentação saudável.", "Promover atividades físicas semanais com 3 grupos."],
    "Cultura": ["Apresentar 5 espetáculos abertos ao público.", "Oferecer 4 oficinas de formação artística.", "Envolver 100 jovens em atividades culturais locais."],
    "Geração de Renda": ["Formar 50 mulheres em costura e empreendedorismo.", "Iniciar 20 pequenos negócios comunitários.", "Oferecer oficinas de gestão financeira para 80 pessoas."],
    "Direitos Humanos": ["Realizar 3 campanhas públicas de conscientização.", "Atender 150 pessoas com apoio psicossocial.", "Promover 10 rodas de diálogo sobre direitos sociais."]
  };

  const handleChange = (campo, valor) => {
    const sugestoesMetas = sugestoesPorTema[valor] || [];
    setDadosProjeto({ ...dadosProjeto, [campo]: valor, ...(campo === "tema" ? { sugestoesMetas } : {}) });
  };

  const validarMetasEIndicadores = () => {
    const descricao = dadosProjeto.descricao.toLowerCase();
    const contemMetas = descricao.includes("meta") || descricao.includes("objetivo");
    const contemIndicadores = descricao.includes("indicador") || descricao.includes("avaliação") || descricao.includes("resultado");
    return contemMetas && contemIndicadores;
  };

  const gerarDicas = () => {
    switch (dadosProjeto.leiIncentivo) {
      case "fia":
        return "Para projetos no FIA, destaque como a ação contribui com os direitos da criança e do adolescente (ECA). Use dados do IBGE, UNICEF e Conselhos de Direitos.";
      case "rouanet":
        return "Para a Lei Rouanet, foque em democratização do acesso à cultura, formação de plateia e contrapartidas sociais. Consulte portais como o SalicNet.";
      case "reciclagem":
        return "Projetos de reciclagem devem incluir impacto ambiental, logística reversa, educação ambiental e envolvimento comunitário. Consulte dados do MMA e SNIS.";
      default:
        return "Descreva claramente o impacto social, a metodologia, o público-alvo e os resultados esperados. Use dados atualizados do IBGE, GIFE, UNICEF.";
    }
  };

  const gerarEstrutura = () => {
    const metasValidas = validarMetasEIndicadores();

    const estrutura = `
Justificativa:
O projeto "${dadosProjeto.nome}" surge da necessidade de atuação junto ao público ${dadosProjeto.publico}, com faixa etária de ${dadosProjeto.idade}, na região de ${dadosProjeto.cidade}. Considerando os dados de fontes como IBGE, UNICEF e GIFE, percebe-se a urgência de ações que promovam transformação social através de iniciativas no campo de ${dadosProjeto.tema}.

Objetivo Geral:
Promover ações de impacto social na área de ${dadosProjeto.tema}, voltadas ao público ${dadosProjeto.publico} da região de ${dadosProjeto.cidade}.

Objetivos Específicos:
- Garantir acesso a oportunidades de desenvolvimento social e pessoal;
- Realizar atividades contínuas e planejadas com foco no protagonismo do público-alvo;
- Estimular a participação comunitária e o fortalecimento de vínculos.

Metodologia:
As atividades serão realizadas através de oficinas, vivências, atendimentos especializados e ações de mobilização social. Serão aplicadas estratégias pedagógicas, culturais e/ou esportivas, dependendo do enfoque do projeto.

Resultados Esperados:
- Atendimento direto a X beneficiários;
- Melhoria nos indicadores sociais da população atendida;
- Fortalecimento de redes locais e parcerias institucionais.

Cronograma e Etapas:
1. Mobilização e articulação com rede local;
2. Seleção dos participantes e início das atividades;
3. Execução de ações planejadas;
4. Avaliação e prestação de contas.

Avaliação:
O projeto será avaliado por meio de indicadores qualitativos e quantitativos, com base em relatórios, depoimentos e participação comunitária.

Contrapartidas:
- Compartilhamento de resultados com a comunidade;
- Relatórios públicos de execução;
- Inclusão do patrocinador/nome da política pública em materiais de divulgação.
    `;

    const blob = new Blob([estrutura], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${dadosProjeto.nome.replace(/\s+/g, '_') || 'Projeto'}.doc`;
    link.click();
    setDadosProjeto({ ...dadosProjeto, estrutura, metasValidas });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Construtor de Projetos para ONGs</h1>
      <Card>
        <CardContent className="space-y-4 p-4">
          <Input placeholder="Nome do Projeto" value={dadosProjeto.nome} onChange={e => handleChange("nome", e.target.value)} />
          <Input placeholder="Cidade ou Região" value={dadosProjeto.cidade} onChange={e => handleChange("cidade", e.target.value)} />
          <Input placeholder="Faixa Etária (ex: 0 a 18 anos)" value={dadosProjeto.idade} onChange={e => handleChange("idade", e.target.value)} />
          <Input placeholder="Público-alvo (ex: crianças, idosos, pessoas com deficiência)" value={dadosProjeto.publico} onChange={e => handleChange("publico", e.target.value)} />
          <Select onValueChange={value => handleChange("tema", value)}>
            <SelectTrigger><SelectValue placeholder="Tema Prioritário" /></SelectTrigger>
            <SelectContent>
              {temas.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={value => handleChange("leiIncentivo", value)}>
            <SelectTrigger><SelectValue placeholder="Lei de Incentivo" /></SelectTrigger>
            <SelectContent>
              {leis.map(l => <SelectItem key={l.id} value={l.id}>{l.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Textarea placeholder="Descrição do Projeto" value={dadosProjeto.descricao} onChange={e => handleChange("descricao", e.target.value)} />
          {!dadosProjeto.metasValidas && (
            <div className="text-red-600 text-sm space-y-1">
              <p>⚠️ Inclua metas e indicadores claros na descrição para garantir a qualidade do projeto.</p>
              <p className="text-black">Sugestões de metas e indicadores para o tema <strong>{dadosProjeto.tema}</strong>:</p>
              <ul className="list-disc ml-4">
                {dadosProjeto.sugestoesMetas.map((meta, i) => <li key={i}>{meta}</li>)}
              </ul>
            </div>
          )}
          <p className="text-muted-foreground text-sm italic">{gerarDicas()}</p>
          <Button onClick={gerarEstrutura}>Gerar Estrutura do Projeto (.doc)</Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold">Referências Úteis</h2>
        <ul className="list-disc ml-6 text-sm">
          <li><a className="text-blue-600 underline" href="https://www.ibge.gov.br/" target="_blank">IBGE – Indicadores territoriais e sociais</a></li>
          <li><a className="text-blue-600 underline" href="https://www.unicef.org/brazil/" target="_blank">UNICEF Brasil – Relatórios e dados sobre infância e juventude</a></li>
          <li><a className="text-blue-600 underline" href="https://gife.org.br/" target="_blank">GIFE – Tendências de investimento social privado</a></li>
          <li><a className="text-blue-600 underline" href="https://www.gov.br/cultura/pt-br" target="_blank">MinC – Cultura e Lei Rouanet</a></li>
          <li><a className="text-blue-600 underline" href="https://www.gov.br/cidadania/pt-br/acoes-e-programas/pessoa-idosa" target="_blank">Pessoa Idosa – Ministério da Cidadania</a></li>
          <li><a className="text-blue-600 underline" href="https://www.gov.br/mdh/pt-br/assuntos/crianca-e-adolescente/conselho-nacional-dos-direitos-da-crianca-e-do-adolescente-conanda" target="_blank">CONANDA – Conselho dos Direitos da Criança e do Adolescente</a></li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Exemplos Inspiradores</h2>
        <ul className="list-disc ml-6 text-sm">
          {exemplosProjetos.map((ex, idx) => (
            <li key={idx}>
              <strong>{ex.titulo}</strong> – Tema: {ex.tema}, Público: {ex.publico}, Lei: {leis.find(l => l.id === ex.lei)?.label} – <a href={ex.link} target="_blank" className="text-blue-600 underline">Ver projeto</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
