import { useState } from 'react';
import { useRaiz } from '../../store/RaizContext';
import Status from '../../components/Status';

/* Composição de origem do lote.
   As sacas se misturam no armazém, mas a proporção de cada talhão
   precisa continuar rastreável — é ela que vai para o dossiê. */
export default function Lotes() {
  const {
    lotes, produtores, definirProporcao, removerOrigem,
    setLoteFoco, setTela,
  } = useRaiz();

  const [abertoId, setAbertoId] = useState('L-2026-016');
  const lote = lotes.find((l) => l.id === abertoId) || lotes[0];

  const soma = Object.values(lote.comp).reduce((a, b) => a + b, 0);
  const fechado = soma === 100;

  const temAlerta = Object.keys(lote.comp).some(
    (id) => produtores.find((p) => p.id === id)?.status === 'alerta'
  );

  const disponiveis = produtores.filter(
    (p) => p.status !== 'pendente' && !(p.id in lote.comp)
  );

  function gerarDossie() {
    setLoteFoco(lote.id);
    setTela('dossies');
  }

  return (
    <>
      <div className="top">
        <div className="eyebrow">Armazém</div>
        <h1>Lotes e composição de origem</h1>
        <p className="sub">
          As sacas se misturam no armazém, mas a origem não pode se perder. Aqui você atribui a proporção
          de cada talhão dentro do lote, e é essa proporção que vai para o dossiê.
        </p>
      </div>

      <div className="body">
        <div className="grid2">
          <div className="panel">
            <header>
              <h3>Composição do {lote.id}</h3>
              <span className="hint">{lote.sacas} sacas · {lote.tipo}</span>
            </header>

            <div className="pad">
              {Object.keys(lote.comp).length === 0 && (
                <p className="helper" style={{ padding: '14px 0 18px' }}>
                  Este lote ainda não tem origem atribuída. Adicione as propriedades que entregaram café
                  e distribua a proporção até fechar 100%.
                </p>
              )}

              {Object.entries(lote.comp).map(([produtorId, pct]) => {
                const p = produtores.find((x) => x.id === produtorId);
                return (
                  <div className="comp" key={produtorId}>
                    <div className="nm">
                      {p.nome} <span className="mono" style={{ color: 'var(--tinta-3)' }}>{produtorId}</span>
                      {p.status === 'alerta' && (
                        <div className="sm" style={{ color: 'var(--risco)' }}>Alerta de sobreposição</div>
                      )}
                    </div>
                    <input
                      type="range" min="0" max="100" value={pct}
                      aria-label={`Proporção de ${p.nome}`}
                      onChange={(e) => definirProporcao(lote.id, produtorId, Number(e.target.value))}
                    />
                    <div className="pc">{pct}%</div>
                    <button className="btn btn-t" onClick={() => removerOrigem(lote.id, produtorId)}>Tirar</button>
                  </div>
                );
              })}

              <div className="sumline">
                <span>Total atribuído</span>
                <span style={{ color: fechado ? 'var(--verde)' : 'var(--ambar)' }}>
                  {soma}% {fechado ? '· fechado' : `· faltam ${100 - soma}%`}
                </span>
              </div>

              {disponiveis.length > 0 && (
                <div className="mt16">
                  <div className="helper" style={{ marginBottom: 8 }}>Adicionar propriedade ao lote</div>
                  <div className="row gap8" style={{ flexWrap: 'wrap' }}>
                    {disponiveis.map((p) => (
                      <button key={p.id} className="btn btn-o btn-sm"
                        onClick={() => definirProporcao(lote.id, p.id, 0)}>
                        + {p.nome}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {temAlerta && (
                <div className="aviso mt16">
                  <div className="t">Este lote não pode ser exportado</div>
                  <div className="helper" style={{ color: 'inherit', marginTop: 4 }}>
                    Há uma propriedade com alerta de sobreposição na composição. Resolva a pendência
                    ou retire a origem antes de emitir o dossiê.
                  </div>
                </div>
              )}

              <div className="mt16">
                <button className="btn btn-p" disabled={!fechado || temAlerta} onClick={gerarDossie}>
                  Gerar dossiê deste lote
                </button>
              </div>
            </div>
          </div>

          <div className="panel">
            <header><h3>Lotes da safra</h3></header>
            <table className="tbl">
              <tbody>
                {lotes.map((l) => {
                  const total = Object.values(l.comp).reduce((a, b) => a + b, 0);
                  return (
                    <tr key={l.id} data-sel={l.id === lote.id ? '1' : '0'}
                      onClick={() => setAbertoId(l.id)} style={{ cursor: 'pointer' }}>
                      <td>
                        <div className="nm mono">{l.id}</div>
                        <div className="sm">{l.sacas} sacas · {l.tipo}</div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        {l.dossie
                          ? <Status situacao="conforme" />
                          : total === 100
                            ? <span className="sm">Pronto para dossiê</span>
                            : <span className="sm">{total}% atribuído</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
