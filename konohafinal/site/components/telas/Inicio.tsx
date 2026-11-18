'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ExplodedPCSection from '@/components/sections/ExplodedPCSection';

// PCs Prontos de Escritório (Preço Crescente)
const PCS_ESCRITORIO = [
  {
    id: 'esc-1',
    nivel: 'Nível 01 • Básico',
    nome: 'Home Office & Estudos Slim',
    estilo: 'Minimalista & Silencioso',
    preco: 1890,
    parcelas: '10x de R$ 189,00 sem juros',
    imagem: 'img/pecas/reais/cpu-amd-1-amd-ryzen-3-3200g.jpg',
    hardwares: [
      'AMD Ryzen 3 3200G (4 núcleos até 4.0GHz c/ Vega 8)',
      '16GB (2x8GB) DDR4 3200MHz Dual Channel',
      'Placa-Mãe MSI A520M-A PRO (AM4)',
      'SSD NVMe M.2 512GB Kingston (Leitura 3500MB/s)',
      'Fonte MSI MAG 500W 80 Plus Eficiente',
      'Gabinete Slim Office Acústico c/ Fan 120mm Silenciosa',
    ],
    resolucao: 'Full HD 1080p (Até 2 Monitores)',
    problemaResolvido:
      'Acaba com os travamentos em planilhas Excel pesadas, PDFs de centenas de páginas e reuniões no Teams/Zoom. Liga em 7 segundos e opera em silêncio absoluto no quarto ou escritório.',
  },
  {
    id: 'esc-2',
    nivel: 'Nível 02 • Intermediário',
    nome: 'Estação Corporativa Multitarefa',
    estilo: 'Produtividade Intensa & CRM',
    preco: 2990,
    parcelas: '10x de R$ 299,00 sem juros',
    imagem: 'img/pecas/reais/cpu-intel-1-intel-core-i5-12400.jpg',
    hardwares: [
      'Intel Core i5-12400 (6C/12T até 4.4GHz Gráficos UHD 730)',
      '16GB DDR4 3200MHz Kingston Fury Beast',
      'Placa-Mãe ASUS Prime H610M-E D4 LGA 1700',
      'SSD NVMe M.2 1TB Gen4 Kingston NV2 (Alta Velocidade)',
      'Fonte MSI MAG A550BN 550W 80 Plus Bronze',
      'Gabinete Minimalista Black com Filtro Antipoeira',
    ],
    resolucao: 'Dual Display 4K (HDMI + DisplayPort)',
    problemaResolvido:
      'Projetado para quem trabalha com 40+ abas no Chrome, sistemas ERP, compilação de código e planilhas dinâmicas simultaneamente. Zero lentidão e suporte nativo a dois monitores 4K.',
  },
  {
    id: 'esc-3',
    nivel: 'Nível 03 • Avançado',
    nome: 'Workstation AutoCAD & Engenharia',
    estilo: 'Engenharia, Revit & Projetos 2D/3D',
    preco: 4790,
    parcelas: '10x de R$ 479,00 sem juros',
    imagem: 'img/pecas/reais/gpu-1-geforce-rtx-3050-nvidia-6gb-gddr6-70w-nenhum.jpg',
    hardwares: [
      'AMD Ryzen 7 5700X (8C/16T até 4.6GHz Alto Desempenho)',
      'NVIDIA GeForce RTX 3050 6GB GDDR6 (Aceleração CUDA)',
      '32GB (2x16GB) DDR4 3200MHz Dual Channel',
      'Placa-Mãe ASUS TUF Gaming B550M-Plus',
      'SSD NVMe M.2 1TB Kingston NV2 3500MB/s',
      'Air Cooler DeepCool AG400 (TDP 150W Silencioso)',
      'Fonte Corsair CV650 650W 80 Plus Bronze',
    ],
    resolucao: 'Modelagem 3D & Multi-Display Profissional',
    problemaResolvido:
      'Elimina engasgos em viewport pesada de AutoCAD, modelagens no Revit, SketchUp e renderizações no V-Ray. A GPU dedicada com aceleração por hardware evita crashes e perda de projetos.',
  },
];

// PCs Prontos Gamer (Preço Crescente)
const PCS_GAMER = [
  {
    id: 'gam-1',
    nivel: 'Nível 01 • Entrada Competitiva',
    nome: 'Gamer Hunter eSports 1080p',
    estilo: 'Competitivo & Alta Fluidez',
    preco: 3250,
    parcelas: '10x de R$ 325,00 sem juros',
    imagem: 'img/pecas/reais/gpu-1-geforce-rtx-3050-nvidia-6gb-gddr6-70w-nenhum.jpg',
    hardwares: [
      'Intel Core i3-12100F (4C/8T até 4.3GHz IPC Alto)',
      'NVIDIA GeForce RTX 3050 6GB GDDR6 (DLSS & Ray Tracing)',
      'Placa-Mãe ASUS Prime H610M-E D4 LGA 1700',
      '16GB (2x8GB) DDR4 3200MHz Dual Channel',
      'SSD NVMe M.2 512GB Kingston NV2',
      'Fonte MSI MAG A550BN 550W 80 Plus Bronze',
      'Gabinete Mesh c/ Lateral de Vidro e 3 Fans RGB',
    ],
    fpsMedio: 'Valorant: 240+ FPS | CS2: 160+ FPS | GTA V: 110 FPS',
    problemaResolvido:
      'Solução acessível para quem quer sair dos gráficos integrados e ter fluidez total em monitores 144Hz. Suporte a NVIDIA DLSS para jogar os lançamentos sem quedas de frames.',
  },
  {
    id: 'gam-2',
    nivel: 'Nível 02 • Intermediário Campeão',
    nome: 'Gamer Phantom High FPS & DLSS 3',
    estilo: 'Ray Tracing & AAA Ultra 1080p/1440p',
    preco: 4890,
    parcelas: '10x de R$ 489,00 sem juros',
    imagem: 'img/pecas/reais/gpu-27-rx-580-amd-8gb-gddr5-185w-6-pin.jpg',
    hardwares: [
      'AMD Ryzen 5 5600 (6C/12T até 4.4GHz 35MB Cache)',
      'NVIDIA GeForce RTX 4060 8GB GDDR6 (DLSS 3 Frame Generation)',
      'Placa-Mãe MSI B550M PRO-VDH WiFi c/ Dissipador VRM',
      '16GB (2x8GB) DDR4 3600MHz Kingston Fury Beast',
      'SSD NVMe M.2 1TB Gen4 Kingston NV2 (3500MB/s)',
      'Air Cooler DeepCool AG400 ARGB Térmico',
      'Fonte MSI MAG A650BN 650W 80 Plus Bronze',
      'Gabinete Montech Air 903 Mesh Alto Fluxo de Ar',
    ],
    fpsMedio: 'Cyberpunk 2077 Ultra: 95 FPS (DLSS 3) | Warzone: 130 FPS',
    problemaResolvido:
      'Acaba com o thermal throttling e o stuttering em jogos exigentes. O DLSS 3 gera quadros via IA, dobrando o FPS em títulos pesados sem esquentar a GPU.',
  },
  {
    id: 'gam-3',
    nivel: 'Nível 03 • Elite Avançado',
    nome: 'Cyber Titan 1440p & 4K Ultra',
    estilo: 'Extremo 1440p Quad HD, 4K & Streaming',
    preco: 7950,
    parcelas: '10x de R$ 795,00 sem juros',
    imagem: 'img/pecas/hero-pc-gamer.webp',
    hardwares: [
      'AMD Ryzen 7 5700X3D (8C/16T com 96MB 3D V-Cache)',
      'NVIDIA GeForce RTX 4070 Super 12GB GDDR6X',
      'Placa-Mãe ASUS TUF Gaming B550M-Plus',
      '32GB (2x16GB) DDR4 3600MHz Dual Channel',
      'SSD NVMe M.2 2TB Kingston KC3000 (Leitura 7000MB/s)',
      'Water Cooler 240mm ARGB c/ Radiador Duplo',
      'Fonte Corsair RM750e 750W 80 Plus Gold Modular',
      'Gabinete Lian Li Lancool 216 Mesh Alta Eficiência',
    ],
    fpsMedio: '1440p Ultra Ray Tracing: 140+ FPS | 4K Nativo: 80+ FPS',
    problemaResolvido:
      'Para quem exige qualidade visual máxima com Ray Tracing no talo e faz streaming simultâneo com codificador NVENC AV1. O 3D V-Cache garante 1% low altíssimo, sem nenhuma micro-travada.',
  },
];

// Depoimentos Reais de Exemplo
const DEPOIMENTOS = [
  {
    id: 1,
    nome: 'Beatriz Mendes',
    cargo: 'Advogada & Consultora Tributária',
    avatar: '👩‍💼',
    tipo: 'PC Escritório • Estação Corporativa',
    estrelas: 5,
    texto:
      'Meu desktop anterior demorava quase 5 minutos para ligar e congelava ao abrir processos com centenas de páginas em PDF. A máquina de escritório que montaram liga em segundos, não faz barulho nenhum e o design minimalista combinou perfeitamente com minha bancada de trabalho.',
  },
  {
    id: 2,
    nome: 'Lucas "Kael" Santana',
    cargo: 'Jogador Competitivo de Valorant & Streamer',
    avatar: '🎮',
    tipo: 'PC Gamer • Hunter eSports',
    estrelas: 5,
    texto:
      'Eu jogava em um setup antigo que oscilava entre 70 e 100 FPS com quedas horríveis nos tiroteios. Agora jogo a 280+ FPS cravados sem nenhuma queda de frame. A temperatura não passa de 63°C mesmo jogando o dia inteiro no calor, e o cable management atrás da tampa ficou cirúrgico!',
  },
  {
    id: 3,
    nome: 'Rodrigo Prado',
    cargo: 'Arquiteto Autônomo',
    avatar: '📐',
    tipo: 'Reforma Completa & Upgrade',
    estrelas: 5,
    texto:
      'Eu estava prestes a gastar mais de 9 mil reais em um computador novo porque o meu não aguentava mais os renders no Revit e AutoCAD. A equipe fez um diagnóstico, substituiu a pasta térmica por composto de alta condutividade, reorganizou os cabos e fez upgrade pontual de GPU e SSD. Economizei 60% e o PC parece novo!',
  },
];

export default function Inicio() {
  const [filtroEscritorio, setFiltroEscritorio] = useState<'todos' | 'esc-1' | 'esc-2' | 'esc-3'>('todos');
  const [filtroGamer, setFiltroGamer] = useState<'todos' | 'gam-1' | 'gam-2' | 'gam-3'>('todos');

  return (
    <div className="relative min-h-screen bg-[#08090f] text-gray-100 selection:bg-[#00ff88] selection:text-black">
      {/* Luzes de Fundo Ambientais (Cyberpunk Glow) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-[#00ff88]/10 blur-[150px]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#b026ff]/10 blur-[160px]" />
        <div className="absolute bottom-1/4 left-10 h-[500px] w-[500px] rounded-full bg-[#00f0ff]/8 blur-[140px]" />
      </div>

      {/* ========================================================
          HERO SECTION (CYBERPUNK EDGERUNNERS DARK MODE)
         ======================================================== */}
      <section className="relative px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-6xl text-center">
          {/* Badge de status tecnológico */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]"></span>
            </span>
            CONSTRUÇÃO & REFORMA DE COMPUTADORES • VIBE EDGERUNNERS
          </div>

          {/* Título Principal com Gradiente Neon Verde & Roxo */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Construa e Reforme com{' '}
            <span className="bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#b026ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,255,136,0.3)]">
              Engenharia de Precisão
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg">
            Do setup silencioso de produtividade para o escritório à máquina gamer extrema com Ray Tracing e alto FPS. Peças 100% compatíveis, <strong>cable management cirúrgico</strong> e <strong>testes de estresse de 24 horas</strong> para assegurar zero tela azul.
          </p>

          {/* Botões de Ação Rápida */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#escritorio"
              className="rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00f0ff] px-6 py-3.5 font-mono text-xs font-extrabold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(0,255,136,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(0,255,136,0.5)]"
            >
              Setups de Escritório ↓
            </a>
            <a
              href="#gamer-section"
              className="rounded-xl border border-[#b026ff]/60 bg-[#b026ff]/15 px-6 py-3.5 font-mono text-xs font-extrabold uppercase tracking-wider text-[#d884ff] shadow-[0_0_20px_rgba(176,38,255,0.2)] transition-all hover:-translate-y-0.5 hover:border-[#b026ff] hover:bg-[#b026ff]/30 hover:text-white hover:shadow-[0_0_30px_rgba(176,38,255,0.4)]"
            >
              Setups Gamer ↓
            </a>
            <a
              href="#montagem-livre"
              className="rounded-xl border border-gray-700 bg-[#121422]/80 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-gray-300 transition-all hover:border-gray-500 hover:text-white"
            >
              PC Desmontado & Simulador 3D 🌀
            </a>
          </div>

          {/* Métricas e Garantias */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-y border-gray-800/80 bg-[#0b0c16]/70 py-6 backdrop-blur-md sm:grid-cols-4">
            <div>
              <div className="font-mono text-2xl font-black text-[#00ff88]">0%</div>
              <div className="text-xs text-gray-400">Gargalo ou Tela Azul</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-[#00f0ff]">24 Horas</div>
              <div className="text-xs text-gray-400">Testes de Estresse Reais</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-[#b026ff]">Até -8°C</div>
              <div className="text-xs text-gray-400">Com Cable Management</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-[#ff007f]">100%</div>
              <div className="text-xs text-gray-400">Compatibilidade Física</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BLOCO 01: COMPUTADORES "ESCRITÓRIO" (PREÇO CRESCENTE)
         ======================================================== */}
      <section id="escritorio" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Cabeçalho do Bloco Escritório */}
          <div className="border-l-4 border-[#00ff88] pl-4 sm:pl-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00ff88]">
              BLOCO 01 • PRODUTIVIDADE & SILÊNCIO
            </span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Computadores para <span className="text-[#00ff88]">Escritório & Home Office</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Estilos refinados para trabalho contínuo: gabinetes compactos, zero ruído em chamadas, baixo consumo de energia e velocidade instantânea com SSD NVMe.
            </p>
          </div>

          {/* Cards de Computadores de Escritório com Preço Crescente */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PCS_ESCRITORIO.map((pc, idx) => (
              <div
                key={pc.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#0d0f19] p-6 transition-all duration-300 hover:border-[#00ff88]/60 hover:bg-[#111422] hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
              >
                <div>
                  {/* Tag do Nível */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-[#00ff88]/30 bg-[#00ff88]/10 px-2.5 py-0.5 font-mono text-[0.7rem] font-bold uppercase text-[#00ff88]">
                      {pc.nivel}
                    </span>
                    <span className="font-mono text-xs text-gray-400">Estilo #{idx + 1}</span>
                  </div>

                  {/* Nome e Estilo */}
                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#00ff88] transition-colors">
                    {pc.nome}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-gray-400">{pc.estilo}</p>

                  {/* Preço em destaque */}
                  <div className="mt-4 border-y border-gray-800/80 py-3">
                    <span className="font-mono text-xs text-gray-400">Investimento à vista:</span>
                    <div className="font-mono text-2xl font-black text-white">
                      R$ {pc.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="font-mono text-[0.7rem] text-[#00ff88]">{pc.parcelas}</span>
                  </div>

                  {/* Lista dos Principais Hardwares */}
                  <div className="mt-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-gray-400">
                      Hardwares Principais:
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs text-gray-300">
                      {pc.hardwares.map((hw, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-[#00ff88]">✓</span>
                          <span>{hw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resolução Suportada */}
                  <div className="mt-3 rounded-lg border border-gray-800 bg-[#0a0c14] p-2 text-[0.75rem] text-gray-400">
                    <strong className="text-gray-200">Displays:</strong> {pc.resolucao}
                  </div>

                  {/* Como resolve o problema do usuário */}
                  <div className="mt-4 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-3 text-xs leading-relaxed text-gray-300">
                    <strong className="block font-mono text-[0.7rem] font-bold uppercase text-[#00ff88]">
                      Problema que resolve:
                    </strong>
                    {pc.problemaResolvido}
                  </div>
                </div>

                {/* Botão de Solicitação / Ação */}
                <div className="mt-6 pt-4 border-t border-gray-800/80">
                  <a
                    href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20${encodeURIComponent(pc.nome)}%20(R%24%20${pc.preco})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl border border-[#00ff88]/40 bg-[#00ff88]/10 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#00ff88] transition-all hover:bg-[#00ff88] hover:text-black"
                  >
                    Montar Esta Configuração
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BLOCO 02: COMPUTADORES "GAMER" (PREÇO CRESCENTE)
         ======================================================== */}
      <section id="gamer-section" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Cabeçalho do Bloco Gamer */}
          <div className="border-l-4 border-[#b026ff] pl-4 sm:pl-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#b026ff]">
              BLOCO 02 • ALTO FPS & RAY TRACING
            </span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Computadores <span className="text-[#b026ff]">Gamer & eSports</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-400">
              Estilos dedicados para máxima taxa de quadros: refrigeração otimizada com túnel de vento, placas GeForce RTX com DLSS 3, CPUs com alto IPC e iluminação personalizada.
            </p>
          </div>

          {/* Cards de Computadores Gamer com Preço Crescente */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PCS_GAMER.map((pc, idx) => (
              <div
                key={pc.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#0d0f19] p-6 transition-all duration-300 hover:border-[#b026ff]/70 hover:bg-[#121324] hover:shadow-[0_0_35px_rgba(176,38,255,0.2)]"
              >
                <div>
                  {/* Tag do Nível */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-[#b026ff]/40 bg-[#b026ff]/15 px-2.5 py-0.5 font-mono text-[0.7rem] font-bold uppercase text-[#d884ff]">
                      {pc.nivel}
                    </span>
                    <span className="font-mono text-xs text-gray-400">Setup #{idx + 1}</span>
                  </div>

                  {/* Nome e Estilo */}
                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-[#b026ff] transition-colors">
                    {pc.nome}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-gray-400">{pc.estilo}</p>

                  {/* Preço em destaque */}
                  <div className="mt-4 border-y border-gray-800/80 py-3">
                    <span className="font-mono text-xs text-gray-400">Investimento à vista:</span>
                    <div className="font-mono text-2xl font-black text-white">
                      R$ {pc.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="font-mono text-[0.7rem] text-[#b026ff]">{pc.parcelas}</span>
                  </div>

                  {/* Lista dos Principais Hardwares */}
                  <div className="mt-4">
                    <h4 className="font-mono text-xs font-bold uppercase text-gray-400">
                      Hardwares Principais:
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-xs text-gray-300">
                      {pc.hardwares.map((hw, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-[#b026ff]">⚡</span>
                          <span>{hw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Desempenho Estimado em Jogos */}
                  <div className="mt-3 rounded-lg border border-gray-800 bg-[#0a0c14] p-2 text-[0.75rem] text-[#00f0ff]">
                    <strong className="text-gray-200">FPS Estimado:</strong> {pc.fpsMedio}
                  </div>

                  {/* Como resolve o problema do usuário */}
                  <div className="mt-4 rounded-xl border border-[#b026ff]/25 bg-[#b026ff]/5 p-3 text-xs leading-relaxed text-gray-300">
                    <strong className="block font-mono text-[0.7rem] font-bold uppercase text-[#b026ff]">
                      Problema que resolve:
                    </strong>
                    {pc.problemaResolvido}
                  </div>
                </div>

                {/* Botão de Solicitação / Ação */}
                <div className="mt-6 pt-4 border-t border-gray-800/80">
                  <a
                    href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20${encodeURIComponent(pc.nome)}%20(R%24%20${pc.preco})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl border border-[#b026ff]/40 bg-[#b026ff]/15 py-2.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-[#d884ff] transition-all hover:bg-[#b026ff] hover:text-white"
                  >
                    Configurar Setup Gamer
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          BLOCO 03: MONTAGEM LIVRE & O PC DESMONTADO (3D E COMPATIBILIDADE)
         ======================================================== */}
      <ExplodedPCSection />

      {/* ========================================================
          DEPOIMENTOS DE EXEMPLO (PROVA SOCIAL & CONFIANÇA)
         ======================================================== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-[#090b14]/90 border-t border-gray-800/80">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00f0ff]">
              DEPOIMENTOS REAIS
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Quem construiu ou reformou com a gente
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-400">
              Histórias reais de profissionais e jogadores que resolveram gargalos, economizaram com upgrades inteligentes e alcançaram estabilidade total.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DEPOIMENTOS.map((dep) => (
              <div
                key={dep.id}
                className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#0d0f19] p-6 shadow-xl transition-all hover:border-gray-700 hover:bg-[#111320]"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {'★'.repeat(dep.estrelas)}
                  </div>
                  <p className="mt-4 text-xs italic leading-relaxed text-gray-300">
                    "{dep.texto}"
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-gray-800/80 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-[#161828] text-xl">
                    {dep.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{dep.nome}</h4>
                    <p className="text-[0.7rem] text-gray-400">{dep.cargo}</p>
                    <span className="font-mono text-[0.65rem] text-[#00ff88]">{dep.tipo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SOBRE QUEM CRIOU (AUTOR / EQUIPE DE ENGENHARIA)
         ======================================================== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-t border-gray-800/80">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#00ff88]/30 bg-gradient-to-b from-[#0e111d] to-[#090b14] p-8 text-center sm:p-12 shadow-[0_0_40px_rgba(0,255,136,0.08)]">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#00ff88]">
            SOBRE O PROJETO & QUEM CRIOU
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            Engenharia de Software Aplicada à Arquitetura de Hardware
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300">
            Este projeto foi concebido e desenvolvido por acadêmicos e entusiastas de Engenharia de Software com uma missão transparente: <strong>desmistificar a montagem de computadores</strong>. Eliminamos pegadinhas de marcas genéricas, testamos termicamente cada combinação e fornecemos dados reais de compatibilidade para que ninguém gaste dinheiro à toa.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-400">
            <span className="rounded-lg border border-gray-800 bg-[#121422] px-3 py-1.5">
              🎓 Engenharia de Software
            </span>
            <span className="rounded-lg border border-gray-800 bg-[#121422] px-3 py-1.5">
              🔬 Testes Físicos de Bancada
            </span>
            <span className="rounded-lg border border-gray-800 bg-[#121422] px-3 py-1.5">
              ⚡ Código Aberto & Modular
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          RODAPÉ COMPLETO COM LINKS RÁPIDOS & REDES SOCIAIS
         ======================================================== */}
      <footer className="border-t border-gray-800 bg-[#06070b] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Coluna 1: Marca & Missão */}
            <div className="space-y-3">
              <a href="#inicio" className="font-mono text-base font-extrabold uppercase tracking-wider text-white">
                Konoha<span className="text-[#00ff88]">.</span>HW
              </a>
              <p className="text-xs leading-relaxed text-gray-400">
                Plataforma de simulação, construção e reforma técnica de computadores com padrão de laboratório.
              </p>
              <p className="font-mono text-[0.7rem] text-gray-500">
                © {new Date().getFullYear()} Todos os direitos reservados.
              </p>
            </div>

            {/* Coluna 2: Navegação Rápida */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#00ff88]">
                Navegação Rápida
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#escritorio" className="hover:text-white transition-colors">Computadores Escritório</a></li>
                <li><a href="#gamer-section" className="hover:text-white transition-colors">Computadores Gamer</a></li>
                <li><a href="#montagem-livre" className="hover:text-white transition-colors">Montagem Livre & 3D</a></li>
                <li><a href="#aprender" className="hover:text-white transition-colors">Estudo Livre das Peças</a></li>
              </ul>
            </div>

            {/* Coluna 3: Qualidade & Métodos */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#b026ff]">
                Garantia Técnica
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-400">
                <li><span>Cable Management em Velcro</span></li>
                <li><span>Pasta Térmica Alta Condutividade</span></li>
                <li><span>Bancada de Burn-in 24h</span></li>
                <li><span>Validação de BIOS e VRM</span></li>
                <li><span>Cálculo de Margem da Fonte</span></li>
              </ul>
            </div>

            {/* Coluna 4: Redes Sociais & Contato */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#00f0ff]">
                Conecte-se
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="https://github.com/ViniciusEstev3s/pc-builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-800 bg-[#0f111c] px-3 py-1.5 text-xs text-gray-300 hover:border-[#00ff88] hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-800 bg-[#0f111c] px-3 py-1.5 text-xs text-gray-300 hover:border-[#b026ff] hover:text-white"
                >
                  Discord
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-800 bg-[#0f111c] px-3 py-1.5 text-xs text-gray-300 hover:border-[#ff007f] hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-800 bg-[#0f111c] px-3 py-1.5 text-xs text-gray-300 hover:border-red-500 hover:text-white"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================
          BOTÃO FLUTUANTE (FAB) PARA CONTATO / WHATSAPP
         ======================================================== */}
      <aside aria-label="Contato Rápido WhatsApp" className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20constru%C3%A7%C3%A3o%20ou%20reforma%20de%20PC"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#00ff88] to-[#00f0ff] text-black shadow-[0_0_25px_rgba(0,255,136,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(0,255,136,0.8)]"
          title="Fale Conosco pelo WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b026ff] opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#b026ff]"></span>
          </span>
          <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
          </svg>
        </a>
      </aside>
    </div>
  );
}
