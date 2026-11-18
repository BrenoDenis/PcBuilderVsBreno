'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: string;
}

const FAQS_PADRAO: FAQItem[] = [
  {
    id: 1,
    pergunta: 'Como é garantida a compatibilidade das peças?',
    resposta:
      'Nossa matriz de compatibilidade valida soquete físico da CPU, suporte de chipset e versão de BIOS da placa-mãe, padrão de memória (DDR4 vs DDR5), folga de energia em Watts (mínimo de 25% de margem na linha de 12V da fonte) e dimensões físicas (comprimento da GPU e altura do cooler no gabinete).',
    categoria: 'Compatibilidade',
  },
  {
    id: 2,
    pergunta: 'Como funciona a reforma e restauração de computadores?',
    resposta:
      'Realizamos diagnóstico completo de componentes, banho químico desoxidante em contatos, troca de pasta térmica por compostos de alto rendimento à base de prata/diamante, substituição de pads térmicos em VRM/GPU, cable management cirúrgico e upgrades estratégicos (como transição para SSD NVMe Gen4), recuperando até 100% da velocidade e estabilidade da máquina.',
    categoria: 'Reforma',
  },
  {
    id: 3,
    pergunta: 'O que é o Cable Management e por que ele importa tanto?',
    resposta:
      'Cable management é a arte de organizar, fixar e rotear cada cabo individual atrás da bandeja da placa-mãe. Além da estética impecável digna de vitrine, o fluxo de ar desobstruído reduz as temperaturas internas em até 8°C, prolonga a vida útil dos capacitores e previne o acúmulo prematuro de poeira.',
    categoria: 'Montagem',
  },
  {
    id: 4,
    pergunta: 'Como são feitos os testes de estresse antes da entrega?',
    resposta:
      'Nenhuma máquina sai sem validação em bancada sob carga máxima contínua: Prime95 e Cinebench para estresse térmico da CPU, FurMark para estabilidade da GPU e MemTest86 para garantir zero erros de memória RAM. Monitoramos linhas de 12V, 5V e 3.3V com osciloscópio digital para assegurar 0% de tela azul.',
    categoria: 'Qualidade',
  },
  {
    id: 5,
    pergunta: 'Qual a principal diferença entre um PC Escritório e um PC Gamer?',
    resposta:
      'O PC de Escritório prioriza baixíssimo ruído, alta eficiência energética, multitarefa fluida (muitas abas e planilhas) e longevidade sem custos desnecessários em placas de vídeo dedicadas de alto consumo. O PC Gamer foca em alta taxa de quadros (FPS), chips gráficos velozes com Ray Tracing/DLSS e fluxo de ar turbinado para longas sessões de jogatina.',
    categoria: 'Hardware',
  },
  {
    id: 6,
    pergunta: 'Vocês realizam orçamento personalizado sem compromisso?',
    resposta:
      'Sim! Toda a simulação e o dimensionamento de peças na nossa plataforma são 100% gratuitos e transparentes. Você pode salvar seu orçamento, consultar preços reais de mercado e solicitar atendimento técnico direto.',
    categoria: 'Atendimento',
  },
];

export default function LateralFAQDrawer() {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [expandidoId, setExpandidoId] = useState<number | null>(1);

  // Fecha com ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && aberto) setAberto(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aberto]);

  const filtrados = FAQS_PADRAO.filter(
    (item) =>
      item.pergunta.toLowerCase().includes(busca.toLowerCase()) ||
      item.resposta.toLowerCase().includes(busca.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <>
      {/* Botão Flutuante Lateral que acompanha o scroll */}
      <aside aria-label="Menu de Ajuda e FAQ" className="fixed right-0 top-1/2 z-40 -translate-y-1/2">
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="group relative flex items-center gap-2 rounded-l-2xl border-y border-l border-[#00ff88]/40 bg-[#0c0d16]/90 py-3.5 pl-3 pr-2.5 text-xs font-bold uppercase tracking-wider text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.25)] backdrop-blur-md transition-all duration-300 hover:border-[#b026ff] hover:bg-[#131424] hover:text-[#b026ff] hover:shadow-[0_0_25px_rgba(176,38,255,0.4)]"
          title="Abrir FAQ Lateral Interativo"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75 group-hover:bg-[#b026ff]"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88] group-hover:bg-[#b026ff]"></span>
          </span>
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono tracking-widest text-[0.72rem]">
            FAQ LATERAL
          </span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </aside>

      {/* Drawer Lateral */}
      <AnimatePresence>
        {aberto && (
          <>
            {/* Backdrop escurecido */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAberto(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Painel Deslizante Lateral */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-[#00ff88]/30 bg-[#090a12]/95 text-gray-100 shadow-[0_0_50px_rgba(0,255,136,0.15)] backdrop-blur-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Perguntas Frequentes e Suporte"
            >
              {/* Topo do Drawer */}
              <div className="flex items-center justify-between border-b border-[#00ff88]/20 bg-[#0f111c]/90 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88] shadow-[0_0_12px_rgba(0,255,136,0.3)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold uppercase tracking-wider text-white">
                      FAQ <span className="text-[#00ff88]">Rápido</span>
                    </h3>
                    <p className="text-xs text-gray-400">Dúvidas técnicas e montagem</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAberto(false)}
                  className="rounded-lg border border-gray-700/60 p-2 text-gray-400 transition-colors hover:border-[#b026ff] hover:bg-[#b026ff]/10 hover:text-white"
                  title="Fechar FAQ"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Campo de Busca Rápida */}
              <div className="border-b border-gray-800/80 px-6 py-4">
                <div className="relative">
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Filtrar por dúvida, peça ou garantia..."
                    className="w-full rounded-xl border border-gray-800 bg-[#121422] py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 outline-none transition-all focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88]"
                  />
                  <svg
                    className="absolute left-3 top-3 h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {busca && (
                    <button
                      type="button"
                      onClick={() => setBusca('')}
                      className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-white"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </div>

              {/* Lista de Perguntas (Accordion) */}
              <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                {filtrados.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    <p className="text-sm">Nenhuma resposta encontrada para "{busca}".</p>
                    <button
                      type="button"
                      onClick={() => setBusca('')}
                      className="mt-3 text-xs font-semibold text-[#00ff88] hover:underline"
                    >
                      Ver todas as perguntas
                    </button>
                  </div>
                ) : (
                  filtrados.map((item) => {
                    const ativo = expandidoId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                          ativo
                            ? 'border-[#00ff88]/50 bg-[#121524] shadow-[0_0_15px_rgba(0,255,136,0.12)]'
                            : 'border-gray-800/80 bg-[#0d0f19] hover:border-gray-700'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setExpandidoId(ativo ? null : item.id)}
                          className="flex w-full items-start justify-between gap-3 p-4 text-left"
                        >
                          <div>
                            <span className="inline-block rounded-md border border-[#00ff88]/30 bg-[#00ff88]/10 px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase text-[#00ff88]">
                              {item.categoria}
                            </span>
                            <h4 className="mt-1.5 text-sm font-semibold text-white">
                              {item.pergunta}
                            </h4>
                          </div>
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-700 text-xs transition-transform duration-200 ${
                              ativo ? 'rotate-180 border-[#00ff88] text-[#00ff88]' : 'text-gray-400'
                            }`}
                          >
                            ▼
                          </span>
                        </button>

                        <AnimatePresence>
                          {ativo && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-gray-800/80 px-4 pb-4 pt-3 text-xs leading-relaxed text-gray-300">
                                {item.resposta}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Rodapé do FAQ com Chamada Direta */}
              <div className="border-t border-[#00ff88]/20 bg-[#0e101b] p-5">
                <div className="rounded-xl border border-[#b026ff]/30 bg-[#b026ff]/10 p-3.5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#b026ff]">
                    <span>⚡</span> Precisa de uma análise personalizada?
                  </div>
                  <p className="mt-1 text-gray-300">
                    Nossa equipe valida sua lista de peças ou setup antigo sem nenhum custo.
                  </p>
                  <a
                    href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20um%20diagn%C3%B3stico%20para%20meu%20PC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block w-full rounded-lg bg-gradient-to-r from-[#00ff88] to-[#00f0ff] py-2 text-center font-mono text-xs font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-95"
                  >
                    Falar com Especialista
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
