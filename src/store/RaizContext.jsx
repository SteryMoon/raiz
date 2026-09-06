import { createContext, useContext, useMemo, useState } from 'react';
import { PRODUTORES } from '../data/produtores';
import { LOTES } from '../data/lotes';
import { FAIXAS } from '../data/planos';


const RaizContext = createContext(null);

export function useRaiz() {
  const ctx = useContext(RaizContext);
  if (!ctx) throw new Error('useRaiz precisa estar dentro de <RaizProvider>');
  return ctx;
}

export function RaizProvider({ children }) {
  // navegação
  const [dispositivo, setDispositivo] = useState('desktop');
  const [papel, setPapel] = useState('gestor');
  const [tela, setTela] = useState('login');

  // dados
  const [produtores, setProdutores] = useState(PRODUTORES);
  const [lotes, setLotes] = useState(LOTES);
  const [plano, setPlano] = useState({ faixa: 'Semente', franquia: 12, usados: 11 });

  // interface
  const [fichaAberta, setFichaAberta] = useState(null);
  const [loteFoco, setLoteFoco] = useState('L-2026-016');

  // campo
  const [offline, setOffline] = useState(true);
  const [fila, setFila] = useState([]);
  const [capturando, setCapturando] = useState(null);

  const logado = tela !== 'login';

  function trocarPapel(novo) {
    setPapel(novo);
    setCapturando(null);
    setFichaAberta(null);
    if (novo === 'gestor') { setDispositivo('desktop'); setTela('painel'); }
    if (novo === 'tecnico') { setDispositivo('mobile'); setTela('visitas'); }
    if (novo === 'auditor') { setTela('auditor'); }
  }

  function sair() {
    setTela('login');
    setCapturando(null);
    setFichaAberta(null);
  }

  /* Grava o polígono na propriedade e marca como conforme. */
  function aplicarCaptura(id, pontos, area) {
    setProdutores((lista) =>
      lista.map((p) =>
        p.id !== id
          ? p
          : { ...p, poly: pontos, ha: Number(area.toFixed(1)), status: 'conforme', capturado: '06/09/2026' }
      )
    );
  }

  /* Offline a captura vai para a fila; online sobe na hora. */
  function salvarCaptura(id, pontos, area) {
    const p = produtores.find((x) => x.id === id);
    if (offline) {
      setFila((f) => [...f, { id, nome: p.nome, ha: area, pontos: pontos.length, poly: pontos }]);
      setTela('sync');
    } else {
      aplicarCaptura(id, pontos, area);
      setTela('visitas');
    }
    setCapturando(null);
  }

  function sincronizar() {
    fila.forEach((item) => aplicarCaptura(item.id, item.poly, item.ha));
    setFila([]);
  }

  /* Emissão oficial: consome um dossiê da franquia e assina o documento. */
  function emitirDossie(loteId) {
    if (plano.usados >= plano.franquia) return;
    setPlano((p) => ({ ...p, usados: p.usados + 1 }));
    setLotes((ls) =>
      ls.map((l) =>
        l.id !== loteId
          ? l
          : {
              ...l,
              dossie: {
                data: '06/09/2026',
                hash: Math.random().toString(16).slice(2, 14),
                versao: 'v1.2',
              },
            }
      )
    );
  }

  function definirProporcao(loteId, produtorId, valor) {
    setLotes((ls) =>
      ls.map((l) => (l.id !== loteId ? l : { ...l, comp: { ...l.comp, [produtorId]: valor } }))
    );
  }

  function removerOrigem(loteId, produtorId) {
    setLotes((ls) =>
      ls.map((l) => {
        if (l.id !== loteId) return l;
        const comp = { ...l.comp };
        delete comp[produtorId];
        return { ...l, comp };
      })
    );
  }

  function trocarPlano(nome) {
    const f = FAIXAS.find((x) => x.nome === nome);
    setPlano((p) => ({ ...p, faixa: f.nome, franquia: f.franquia }));
  }

  function comprarAvulsos(qtd = 10) {
    setPlano((p) => ({ ...p, franquia: p.franquia + qtd }));
  }

  const valor = useMemo(
    () => ({
      dispositivo, setDispositivo,
      papel, trocarPapel,
      tela, setTela, logado, sair,
      produtores, lotes, plano,
      fichaAberta, setFichaAberta,
      loteFoco, setLoteFoco,
      offline, setOffline, fila, capturando, setCapturando,
      salvarCaptura, sincronizar,
      emitirDossie, definirProporcao, removerOrigem,
      trocarPlano, comprarAvulsos,
    }),
    [dispositivo, papel, tela, produtores, lotes, plano, fichaAberta, loteFoco, offline, fila, capturando]
  );

  return <RaizContext.Provider value={valor}>{children}</RaizContext.Provider>;
}
