'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Carrega o visualizador 3D existente dinamicamente com fallback suave
const GamerChassis3D = dynamic(() => import('@/components/three/GamerChassis3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full flex-col items-center justify-center rounded-2xl border border-[#00ff88]/30 bg-[#0c0d16] p-6 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#00ff88] border-t-transparent shadow-[0_0_15px_rgba(0,255,136,0.5)]" />
      <p className="mt-4 font-mono text-sm uppercase tracking-wider text-[#00ff88]">
        Inicializando Motor 3D & Eixo Isométrico...
      </p>
      <p className="mt-1 text-xs text-gray-500">Renderizando chassi e componentes com iluminação neon</p>
    </div>
  ),
});

interface PecaItem {
  id: string;
  nome: string;
  preco: number;
  watts: number;
  soquete?: string;
  tipoMemoria?: string;
}

const CPUS: PecaItem[] = [
  { id: 'i3-12100f', nome: 'Intel Core i3-12100F (4C/8T 4.3GHz)', preco: 580, watts: 65, soquete: 'LGA1700' },
  { id: 'r5-5600', nome: 'AMD Ryzen 5 5600 (6C/12T 4.4GHz)', preco: 840, watts: 65, soquete: 'AM4' },
  { id: 'i5-12400f', nome: 'Intel Core i5-12400F (6C/12T 4.4GHz)', preco: 920, watts: 65, soquete: 'LGA1700' },
  { id: 'r7-5700x3d', nome: 'AMD Ryzen 7 5700X3D (8C/16T 3D V-Cache)', preco: 1490, watts: 105, soquete: 'AM4' },
];

const GPUS: PecaItem[] = [
  { id: 'vega-integrada', nome: 'Vídeo Integrado (Ideal p/ Escritório / Básico)', preco: 0, watts: 15 },
  { id: 'rtx-3050', nome: 'NVIDIA GeForce RTX 3050 6GB GDDR6', preco: 1290, watts: 70 },
  { id: 'rtx-4060', nome: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (DLSS 3)', preco: 2190, watts: 115 },
  { id: 'rtx-4070-super', nome: 'NVIDIA GeForce RTX 4070 Super 12GB GDDR6X', preco: 4490, watts: 220 },
];

const RAMS: PecaItem[] = [
  { id: 'ram-16-ddr4', nome: '16GB (2x8GB) DDR4 3200MHz Dual Channel', preco: 280, watts: 10, tipoMemoria: 'DDR4' },
  { id: 'ram-32-ddr4', nome: '32GB (2x16GB) DDR4 3600MHz Kingston Fury', preco: 540, watts: 15, tipoMemoria: 'DDR4' },
  { id: 'ram-32-ddr5', nome: '32GB (2x16GB) DDR5 6000MHz Corsair Vengeance', preco: 890, watts: 20, tipoMemoria: 'DDR5' },
];

const ARMAZENAMENTOS: PecaItem[] = [
  { id: 'ssd-500', nome: 'SSD NVMe M.2 500GB Kingston NV2 (3500MB/s)', preco: 230, watts: 5 },
  { id: 'ssd-1000', nome: 'SSD NVMe M.2 1TB Gen4 Kingston NV2 (3500MB/s)', preco: 390, watts: 7 },
  { id: 'ssd-2000', nome: 'SSD NVMe M.2 2TB Kingston KC3000 (7000MB/s)', preco: 890, watts: 10 },
];

const FONTES: PecaItem[] = [
  { id: 'psu-550', nome: 'MSI MAG A550BN 550W 80 Plus Bronze', preco: 320, watts: 550 },
  { id: 'psu-650', nome: 'MSI MAG A650BN 650W 80 Plus Bronze', preco: 390, watts: 650 },
  { id: 'psu-750-gold', nome: 'Corsair RM750e 750W 80 Plus Gold Modular', preco: 690, watts: 750 },
];

export default function ExplodedPCSection() {
  const [modoVisualizacao, setModoVisualizacao] = useState<'3d' | 'camadas'>('3d');
  const [cpuSel, setCpuSel] = useState<string>('r5-5600');
  const [gpuSel, setGpuSel] = useState<string>('rtx-4060');
  const [ramSel, setRamSel] = useState<string>('ram-16-ddr4');
  const [ssdSel, setSsdSel] = useState<string>('ssd-1000');
  const [fonteSel, setFonteSel] = useState<string>('psu-650');
  const [camadaAtiva, setCamadaAtiva] = useState<string>('todos');

  // Cálculos dinâmicos
  const cpu = CPUS.find((c) => c.id === cpuSel)!;
  const gpu = GPUS.find((g) => g.id === gpuSel)!;
  const ram = RAMS.find((r) => r.id === ramSel)!;
  const ssd = ARMAZENAMENTOS.find((s) => s.id === ssdSel)!;
  const fonte = FONTES.find((f) => f.id === fonteSel)!;

  // Custo base de placa-mãe compatível, gabinete e refrigeração
  const custoBase = useMemo(() => {
    let mbPreco = cpu.soquete === 'AM4' ? 520 : 540;
    let gabinetePreco = 290;
    let coolerPreco = cpu.watts > 100 ? 280 : 140;
    return mbPreco + gabinetePreco + coolerPreco;
  }, [cpu]);

  const consumoTotalWatts = useMemo(() => {
    const margemSistema = 70; // Fans, chipset, RGB
    return cpu.watts + gpu.watts + ram.watts + ssd.watts + margemSistema;
  }, [cpu, gpu, ram, ssd]);

  const fonteSuficiente = fonte.watts >= consumoTotalWatts * 1.25;

  const precoEstimadoTotal = useMemo(() => {
    return cpu.preco + gpu.preco + ram.preco + ssd.preco + fonte.preco + custoBase;
  }, [cpu, gpu, ram, ssd, fonte, custoBase]);

  return (
    <section id="montagem-livre" className="relative scroll-mt-20 py-20">
      {/* Background neon glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88]/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-10 top-2/3 -z-10 h-96 w-96 rounded-full bg-[#b026ff]/10 blur-[130px]" />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        {/* Cabeçalho da Seção */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00ff88]/40 bg-[#00ff88]/10 px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.2)]">
            <span className="h-2 w-2 rounded-full bg-[#00ff88] animate-pulse" />
            BLOCO 03 • MONTAGEM LIVRE & REFORMA
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            O PC Desmontado: <span className="bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#b026ff] bg-clip-text text-transparent">Engenharia em Camadas</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400">
            Inspecione as entranhas da máquina em 3D, selecione peças compatíveis e visualize a estimativa de orçamento em tempo real sem surpresas na montagem.
          </p>
        </div>

        {/* Alternador de Modo de Visualização */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setModoVisualizacao('3d')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              modoVisualizacao === '3d'
                ? 'border border-[#00ff88] bg-[#00ff88]/20 text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                : 'border border-gray-800 bg-[#0f111c] text-gray-400 hover:text-white'
            }`}
          >
            <span>🌀</span> Visualizador 3D Interativo
          </button>
          <button
            type="button"
            onClick={() => setModoVisualizacao('camadas')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
              modoVisualizacao === 'camadas'
                ? 'border border-[#b026ff] bg-[#b026ff]/20 text-[#b026ff] shadow-[0_0_20px_rgba(176,38,255,0.3)]'
                : 'border border-gray-800 bg-[#0f111c] text-gray-400 hover:text-white'
            }`}
          >
            <span>📑</span> Vista Explodida em Camadas
          </button>
        </div>

        {/* Grid Principal: Visualizador à Esquerda, Calculadora à Direita */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Lado Esquerdo: Área Visual 3D ou Camadas */}
          <div className="lg:col-span-7">
            {modoVisualizacao === '3d' ? (
              <div className="relative overflow-hidden rounded-2xl border border-[#00ff88]/30 bg-[#0a0c14] shadow-[0_0_35px_rgba(0,255,136,0.1)]">
                <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-[#00ff88]/30 bg-[#090b14]/80 px-3 py-1.5 font-mono text-xs text-[#00ff88] backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#00ff88] animate-ping" />
                  MOTOR 3D • ARRASTE PARA GIRAR E DAR ZOOM
                </div>
                <div className="h-[520px] w-full">
                  <GamerChassis3D tier="gamer-intermediario" />
                </div>
                <div className="border-t border-gray-800/80 bg-[#0d0f1a] px-4 py-2.5 text-center text-xs text-gray-400">
                  Dica: Você pode rotacionar 360°, inspecionar os fans iluminados e verificar o encaixe dos módulos.
                </div>
              </div>
            ) : (
              <div className="space-y-4 rounded-2xl border border-[#b026ff]/30 bg-[#0a0c14] p-6 shadow-[0_0_35px_rgba(176,38,255,0.1)]">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    Camadas da Arquitetura do PC
                  </h3>
                  <span className="rounded bg-[#b026ff]/20 px-2 py-0.5 font-mono text-[0.7rem] text-[#b026ff]">
                    VISTA EXPLODIDA
                  </span>
                </div>

                {/* Camadas clicáveis */}
                {[
                  {
                    id: 'chassi',
                    nome: 'Gabinete & Chassi com Airflow Mesh',
                    desc: 'Estrutura externa em aço SPCC e vidro temperado. Túnel inferior para PSU e furação para cable routing.',
                    cor: '#00ff88',
                  },
                  {
                    id: 'placamae',
                    nome: 'Placa-Mãe (Backbone do Sistema)',
                    desc: `Soquete ${cpu.soquete} com dissipadores nos VRMs e slot PCIe 4.0 blindado contra empenamento de GPU pesada.`,
                    cor: '#00f0ff',
                  },
                  {
                    id: 'cpu-cooler',
                    nome: 'Processador (CPU) & Refrigeração Térmica',
                    desc: 'Pasta térmica à base de prata com condutividade de 12.8 W/m-K e cooler torre de 4 heatpipes de cobre.',
                    cor: '#b026ff',
                  },
                  {
                    id: 'gpu',
                    nome: 'Placa de Vídeo (GPU Dedicada)',
                    desc: 'Alimentação dedicada com cabo PCIe 8 pinos individual sem emendas, evitando sobrecarga na linha de 12V.',
                    cor: '#ff007f',
                  },
                  {
                    id: 'fonte-cabos',
                    nome: 'Fonte de Alimentação & Cable Management',
                    desc: 'Certificação 80 Plus com cabos trançados e amarrações com velcro na parte traseira da bandeja.',
                    cor: '#39ff14',
                  },
                ].map((camada) => (
                  <div
                    key={camada.id}
                    onClick={() => setCamadaAtiva(camada.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      camadaAtiva === camada.id
                        ? 'border-[#b026ff] bg-[#141525] shadow-[0_0_15px_rgba(176,38,255,0.2)]'
                        : 'border-gray-800 bg-[#0d0f19] hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: camada.cor }} />
                        <h4 className="text-sm font-bold text-white">{camada.nome}</h4>
                      </div>
                      <span className="font-mono text-xs text-gray-500">Ver detalhes →</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-gray-400">{camada.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Diferenciais Técnicos: Cable Management & Testes de Estresse */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#00ff88]/30 bg-[#0c0e18] p-4 shadow-[0_0_15px_rgba(0,255,136,0.08)]">
                <div className="flex items-center gap-2 text-[#00ff88]">
                  <span className="text-lg">⚡</span>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                    Cable Management Cirúrgico
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-300">
                  Roteamento individual de cabos atrás da bandeja com presilhas de velcro. Zero fios soltos na frente do fluxo de ar, garantindo redução de até 8°C e estética limpa.
                </p>
              </div>

              <div className="rounded-xl border border-[#b026ff]/30 bg-[#0c0e18] p-4 shadow-[0_0_15px_rgba(176,38,255,0.08)]">
                <div className="flex items-center gap-2 text-[#b026ff]">
                  <span className="text-lg">🔥</span>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                    Testes de Estresse de 24h
                  </h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-gray-300">
                  Bateria pesada contínua com Prime95, FurMark e MemTest86 para estressar CPU, GPU e memória no limite, assegurando 0% de instabilidade ou tela azul (BSOD).
                </p>
              </div>
            </div>
          </div>

          {/* Lado Direito: Calculadora de Orçamento e Compatibilidade */}
          <div className="flex flex-col justify-between rounded-2xl border border-gray-800 bg-[#0c0e18] p-6 shadow-2xl lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <h3 className="font-mono text-base font-bold uppercase tracking-wider text-white">
                  Simulador de Peças
                </h3>
                <span className="rounded-md border border-[#00ff88]/40 bg-[#00ff88]/10 px-2 py-0.5 font-mono text-[0.7rem] text-[#00ff88]">
                  COMPATIBILIDADE ATIVA
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {/* Seletor CPU */}
                <div>
                  <label className="block font-mono text-xs text-gray-400">1. Processador (CPU):</label>
                  <select
                    value={cpuSel}
                    onChange={(e) => setCpuSel(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-800 bg-[#121422] p-2.5 text-xs text-white outline-none focus:border-[#00ff88]"
                  >
                    {CPUS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome} — R$ {c.preco}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seletor GPU */}
                <div>
                  <label className="block font-mono text-xs text-gray-400">2. Placa de Vídeo (GPU):</label>
                  <select
                    value={gpuSel}
                    onChange={(e) => setGpuSel(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-800 bg-[#121422] p-2.5 text-xs text-white outline-none focus:border-[#00ff88]"
                  >
                    {GPUS.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.nome} — R$ {g.preco}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seletor RAM */}
                <div>
                  <label className="block font-mono text-xs text-gray-400">3. Memória RAM:</label>
                  <select
                    value={ramSel}
                    onChange={(e) => setRamSel(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-800 bg-[#121422] p-2.5 text-xs text-white outline-none focus:border-[#00ff88]"
                  >
                    {RAMS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nome} — R$ {r.preco}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seletor Armazenamento */}
                <div>
                  <label className="block font-mono text-xs text-gray-400">4. Armazenamento SSD:</label>
                  <select
                    value={ssdSel}
                    onChange={(e) => setSsdSel(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-800 bg-[#121422] p-2.5 text-xs text-white outline-none focus:border-[#00ff88]"
                  >
                    {ARMAZENAMENTOS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nome} — R$ {s.preco}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seletor Fonte */}
                <div>
                  <label className="block font-mono text-xs text-gray-400">5. Fonte de Alimentação (PSU):</label>
                  <select
                    value={fonteSel}
                    onChange={(e) => setFonteSel(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-gray-800 bg-[#121422] p-2.5 text-xs text-white outline-none focus:border-[#00ff88]"
                  >
                    {FONTES.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.nome} — R$ {f.preco}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status de Compatibilidade e Energia */}
              <div className="mt-5 rounded-xl border border-gray-800 bg-[#0f111c] p-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Consumo Pico Estimado:</span>
                  <span className="font-mono font-bold text-white">{consumoTotalWatts} Watts</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Capacidade da Fonte:</span>
                  <span className="font-mono font-bold text-white">{fonte.watts} Watts</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  {fonteSuficiente ? (
                    <span className="flex items-center gap-1.5 font-semibold text-[#00ff88]">
                      <span>✓</span> Margem de segurança de energia OK (+{Math.round((fonte.watts / consumoTotalWatts - 1) * 100)}%)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-semibold text-amber-400">
                      <span>⚠</span> Recomendado fonte de 650W+ para esta configuração
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Preço Total Estimado e Ação */}
            <div className="mt-6 border-t border-gray-800 pt-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-mono text-xs uppercase text-gray-400">Orçamento Estimado:</span>
                  <p className="text-xs text-gray-500">(Inclui peças, placa-mãe, gabinete e montagem)</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-black text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.3)]">
                    R$ {precoEstimadoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <p className="font-mono text-[0.7rem] text-gray-400">
                    ou 10x de R$ {(precoEstimadoTotal / 10).toFixed(2)} sem juros
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href="#montar"
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00f0ff] py-3 text-center font-mono text-xs font-bold uppercase tracking-wider text-black transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(0,255,136,0.4)]"
                >
                  Abrir Montador Completo
                </a>
                <a
                  href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20montei%20uma%20configura%C3%A7%C3%A3o%20de%20R%24%20${precoEstimadoTotal}%20no%20simulador%20e%20gostaria%20de%20um%20or%C3%A7amento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#b026ff]/50 bg-[#b026ff]/10 px-4 py-3 font-mono text-xs font-bold text-[#b026ff] transition-all hover:bg-[#b026ff]/20"
                  title="Enviar para WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
