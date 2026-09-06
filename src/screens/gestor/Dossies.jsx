import { useRaiz } from '../../store/RaizContext';
import Status from '../../components/Status';

/* O ponto de cobrança do produto.
   A prévia é sempre aberta; a emissão oficial consome a franquia. */
export default function Dossies() {
  const {
    lotes, produtores, plano, loteFoco, setLoteFoco,
    emitirDossie, trocarPlano, comprarAvulsos,
  } = useRaiz();

  const lote = lotes.find((l) => l.id === loteFoco) || lotes[0];
  const restante = plano.franquia - plano.usados;
  const semFranquia = restante <= 0;
  const emitido = Boolean(lote.dossie);
  const semOrigem = Object.keys(lote.comp).length === 0;

  return (
    <>
      <div className="top">
        <div className="eyebrow">Conformidade</div>
        <h1>Dossiê de origem</h1>
        <p className="sub">
          O documento que acompanha o lote até o comprador. Prévia sempre aberta,
          emissão oficial conforme o plano.
        </p>
      </div>

      <div className="body">
        <div className="row gap8" style={{ marginBottom: 14, flexWrap: 'wrap' }}>
          {lotes.map((l) => (
            <button key={l.id} className={`btn btn-sm ${l.id === lote.id ? 'btn-g' : 'btn-o'}`}
              onClick={() => setLoteFoco(l.id)}>
              {l.id}
            </button>
          ))}
          <div className="helper" style={{ marginLeft: 'auto' }}>
            Franquia do plano {plano.faixa}: <b>{plano.usados} de {plano.franquia}</b> dossiês usados neste mês
          </div>
        </div>

        <div className="grid2">
          <div className={`doc ${emitido ? '' : 'locked'}`}>
            <h4>Dossiê de origem — {lote.id}</h4>
            <div className="meta">
              Cooperativa dos Cafeicultores do Sul de Minas · CNPJ 00.000.000/0001-00 · Safra 2026
            </div>

            <div className="mt16">
              <div className="helper" style={{ marginBottom: 6 }}>Composição de origem</div>

              {semOrigem && (
                <div className="helper">Sem origem atribuída. Volte em Lotes e feche a composição.</div>
              )}

              {Object.entries(lote.comp).map(([produtorId, pct]) => {
                const p = produtores.find((x) => x.id === produtorId);
                return (
                  <div className="row" key={produtorId} style={{ padding: '7px 0' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.nome}</div>
                      <div className="mono" style={{ color: 'var(--tinta-2)' }}>
                        CAR {p.car} · {p.poly.length} vértices · {p.ha.toFixed(1)} ha
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{pct}%</div>
                  </div>
                );
              })}
            </div>

            <div className="mt16">
              <div className="helper" style={{ marginBottom: 6 }}>Verificação</div>
              <div className="docrow"><span>Cruzamento PRODES / DETER</span><span>Sem sobreposição</span></div>
              <div className="docrow"><span>Corte temporal aplicado</span><span>31/12/2020</span></div>
              <div className="docrow" style={{ borderBottom: 'none' }}>
                <span>Assinatura e carimbo de tempo</span>
                <span className="mono">{emitido ? lote.dossie.hash : '—'}</span>
              </div>
            </div>

            {emitido && (
              <div className="mt16">
                <Status situacao="conforme" />
                <span className="helper"> Emitido em {lote.dossie.data}, formato {lote.dossie.versao}</span>
              </div>
            )}
          </div>

          <div className="stack gap16">
            {!emitido && !semFranquia && (
              <div className="panel">
                <div className="pad">
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Emitir versão oficial</h3>
                  <p className="helper mt8">
                    A prévia ao lado não tem validade para auditoria. A emissão oficial assina o documento,
                    registra o carimbo de tempo e consome um dossiê da sua franquia.
                  </p>
                  <button className="btn btn-p btn-full mt16" disabled={semOrigem}
                    onClick={() => emitirDossie(lote.id)}>
                    Emitir dossiê oficial
                  </button>
                  <p className="helper mt8">Restam {restante} dossiês na franquia deste mês.</p>
                </div>
              </div>
            )}

            {!emitido && semFranquia && (
              <div className="paywall">
                <h3>Sua franquia do mês acabou</h3>
                <p>
                  Você usou os {plano.franquia} dossiês incluídos no plano {plano.faixa}. Todo o resto da
                  plataforma continua liberado: cadastro, mapeamento e conferência de conformidade
                  seguem sem limite.
                </p>
                <div className="mt16 row gap8" style={{ flexWrap: 'wrap' }}>
                  <button className="btn btn-p" onClick={() => comprarAvulsos(10)}>
                    Comprar 10 dossiês avulsos
                  </button>
                  <button className="btn btn-o" onClick={() => trocarPlano('Raiz')}>
                    Subir para o plano Raiz
                  </button>
                </div>
              </div>
            )}

            {emitido && (
              <div className="panel">
                <div className="pad">
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>Dossiê emitido</h3>
                  <p className="helper mt8">
                    Compartilhe o link de auditoria com a trading. O acesso do comprador é somente
                    leitura e não consome franquia.
                  </p>
                  <div className="mt12 row gap8" style={{ flexWrap: 'wrap' }}>
                    <button className="btn btn-g">Baixar PDF</button>
                    <button className="btn btn-o">Copiar link de auditoria</button>
                  </div>
                </div>
              </div>
            )}

            <div className="panel">
              <header><h3>Onde entra a cobrança</h3></header>
              <div className="pad helper">
                Cadastro de produtores, captura de polígono, sincronização e painel de conformidade são
                ilimitados. A franquia só é consumida na emissão oficial, que é o ponto em que o documento
                passa a valer para o comprador.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
