'use client';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PARTS } from '@/lib/parts';
import { useSceneState } from '@/lib/store';
import { TELAS, useRota, type Tela } from '@/lib/rotas';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { quantidadeEscolhida, useMontagem } from '@/lib/montagem';
import BuscaGlobal from './BuscaGlobal';
import LoginGoogle from './LoginGoogle';

interface ItemNavegacao {
  id: string;
  rotulo: string;
  href: string;
  isTela?: boolean;
}

const MENU: ItemNavegacao[] = [
  { id: 'inicio', rotulo: 'Início', href: '#inicio', isTela: true },
  { id: 'aprender', rotulo: 'Estudo Livre', href: '#aprender', isTela: true },
  { id: 'escritorio', rotulo: 'Escritório', href: '#escritorio' },
  { id: 'gamer-section', rotulo: 'Gamer', href: '#gamer-section' },
  { id: 'montagem-livre', rotulo: 'Montagem Livre', href: '#montagem-livre' },
  { id: 'montar', rotulo: 'Monte seu PC', href: '#montar', isTela: true },
];

function Marca() {
  return (
    <a href="#inicio" className="display shrink-0 py-3 text-[1rem] font-[800] uppercase tracking-wider text-white" aria-label="PC Builder, ir para o início">
      Konoha<span className="text-[#00ff88]">.</span>HW
    </a>
  );
}

/** Contador de peças ao lado de "Monte seu PC": mostra o progresso de qualquer lugar do site. */
function SeloMontagem() {
  const { selecao } = useMontagem();
  const n = quantidadeEscolhida(selecao);
  if (!n) return null;
  return (
    <span className="tnum ml-1.5 rounded-full bg-[#00ff88] px-1.5 py-[1px] text-[0.68rem] font-bold text-black shadow-[0_0_8px_rgba(0,255,136,0.6)]" aria-label={`${n} de 8 peças escolhidas`}>
      {n}/8
    </span>
  );
}

function LinkNavegacao({ item, atual, aoClicar, grande }: { item: ItemNavegacao; atual: boolean; aoClicar?: () => void; grande?: boolean }) {
  if (grande) {
    return (
      <a
        href={item.href}
        onClick={aoClicar}
        aria-current={atual ? 'page' : undefined}
        className={`display flex items-center justify-between border-b border-gray-800 py-3.5 text-[1.1rem] font-[700] transition-colors ${atual ? 'text-[#00ff88]' : 'text-gray-200 hover:text-[#00ff88]'}`}
      >
        <span>
          {item.rotulo}
          {item.id === 'montar' && <SeloMontagem />}
        </span>
        <span aria-hidden className="text-gray-500">
          {atual ? '●' : '→'}
        </span>
      </a>
    );
  }
  return (
    <a
      href={item.href}
      aria-current={atual ? 'page' : undefined}
      className={`relative flex items-center rounded-full px-2.5 py-1.5 text-[0.82rem] font-semibold transition-colors xl:px-3.5 xl:py-2 xl:text-[0.86rem] ${
        atual ? 'text-[#00ff88]' : 'text-gray-300 hover:text-white'
      }`}
    >
      {item.rotulo}
      {item.id === 'montar' && <SeloMontagem />}
      {atual && <motion.span layoutId="nav-dot" className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)] xl:inset-x-3" />}
    </a>
  );
}

function BarraProgresso() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="h-[2px] origin-left bg-gradient-to-r from-[#00ff88] via-[#00f0ff] to-[#b026ff]" style={{ scaleX: x }} />;
}

export default function Nav() {
  const { tela } = useRota();
  const { phase, active } = useSceneState();
  const [menu, setMenu] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, menu);
  const naHistoria = tela === 'aprender';
  const mostrarTrilho = naHistoria && phase === 'parts';
  const telaAtual = TELAS.find((t) => t.id === tela) || { rotulo: 'Início' };

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      menuBtn.current?.focus();
    };
  }, [menu]);

  // fecha o menu quando a tela muda (ex.: pela busca)
  useEffect(() => setMenu(false), [tela]);

  const rotuloCelular =
    naHistoria && phase === 'parts' && active >= 0 ? `${active + 1}/${PARTS.length} · ${PARTS[active].name}` : telaAtual.rotulo;

  return (
    <>
      <a href="#conteudo" className="sr-only sr-only-focusable">
        Pular para o conteúdo
      </a>
      <header className="gutter fixed inset-x-0 top-0 z-40 border-b border-[#00ff88]/20 bg-[#090b14]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center gap-2 xl:gap-3">
          <Marca />

          <nav aria-label="Seções do site" className="ml-2 hidden gap-0.5 lg:flex xl:ml-4">
            {MENU.map((item) => (
              <LinkNavegacao
                key={item.id}
                item={item}
                atual={tela === item.id}
              />
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <BuscaGlobal id="busca-topo" />
            <div className="rounded-xl border border-[#b026ff]/40 bg-[#b026ff]/10 p-0.5 shadow-[0_0_15px_rgba(176,38,255,0.2)]">
              <LoginGoogle />
            </div>
          </div>

          <span className="ml-auto min-w-0 truncate text-[0.82rem] font-semibold text-[#00ff88] lg:hidden" aria-live="polite">
            {rotuloCelular}
          </span>
          <button
            ref={menuBtn}
            type="button"
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(true)}
            className="rounded-lg border border-gray-800 bg-[#121422] px-3 py-1.5 text-xs font-bold text-gray-200 shrink-0 lg:hidden hover:border-[#00ff88]"
          >
            Menu
          </button>
        </div>
        {naHistoria && <BarraProgresso />}
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gutter fixed inset-0 z-[70] overflow-y-auto bg-[#090b14] text-white pb-[max(24px,env(safe-area-inset-bottom,0px))] pt-[env(safe-area-inset-top,0px)]"
          >
            <div className="flex h-16 items-center justify-between border-b border-gray-800">
              <Marca />
              <button type="button" onClick={() => setMenu(false)} className="rounded-lg border border-gray-800 px-3 py-1.5 text-xs text-gray-300">
                Fechar ×
              </button>
            </div>
            <div className="mt-4">
              <BuscaGlobal id="busca-menu" aoConcluir={() => setMenu(false)} />
            </div>
            <nav aria-label="Seções do site" className="mt-6">
              {MENU.map((item) => (
                <LinkNavegacao
                  key={item.id}
                  item={item}
                  atual={tela === item.id}
                  aoClicar={() => setMenu(false)}
                  grande
                />
              ))}
            </nav>
            <div className="mt-6 border-t border-gray-800 pt-4">
              <LoginGoogle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {naHistoria && (
        <nav
          aria-label="Peças"
          className={`fixed right-[max(16px,env(safe-area-inset-right,0px))] top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-2 transition-opacity duration-500 lg:flex ${
            mostrarTrilho ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <span className="mono mb-1 text-[0.66rem] uppercase tracking-[0.14em] text-gray-500">{active >= 0 ? `${active + 1} de ${PARTS.length}` : ''}</span>
          {PARTS.map((p, i) => (
            <a key={p.id} href={`#part-${p.id}`} className="group flex items-center justify-end gap-3" aria-current={active === i ? 'step' : undefined}>
              <span
                className={`text-[0.78rem] font-semibold transition-all ${
                  active === i ? 'text-[#00ff88] opacity-100' : 'text-gray-500 opacity-0 group-hover:opacity-100'
                }`}
              >
                {p.name}
              </span>
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  active === i ? 'w-6 bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)]' : i < active ? 'w-2 bg-gray-400' : 'w-2 bg-gray-800 group-hover:bg-gray-400'
                }`}
              />
            </a>
          ))}
          <a href="#comparar" className="mt-2 text-[0.75rem] font-semibold text-[#00ff88] hover:text-white">
            Pular peças →
          </a>
        </nav>
      )}
    </>
  );
}
