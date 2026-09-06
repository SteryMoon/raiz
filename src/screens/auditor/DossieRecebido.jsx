import { useRaiz } from '../../store/RaizContext';
import Mapa from '../../components/Mapa';
import Status from '../../components/Status';


export default function DossieRecebido() {
  const { lotes, produtores } = useRaiz();
  const lote = lotes.find((l) => l.dossie) || lotes[0];
  const origens = produtores.filter((p) => p.id in lote.comp);

  return (
    <>
      <div className="top">
        <div className="eyebrow">Acesso de auditoria · somente leitura</div>
        <h1>Dossiê de origem {lote.id}</h1>
        <p className="sub">
          É isto que a trading ou a torrefadora abre pelo link. Sem login, sem cobrança
          e sem acesso ao restante da plataforma.
        </p>
      </div>

      <div className="body">
        <div className="grid2">
          <div className="panel">
            <header>
              <h3>Talhões de origem do lote</h3>
              <span className="hint">{lote.sacas} sacas · {lote.tipo}</span>
            </header>
            <div style={{ padding: 12 }}>
              <Mapa produtores={origens} selecionado={null} altura={240} />
            </div>
          </div>

          <div className="panel">
            <header><h3>Verificação</h3></header>
            <div className="pad">
              {origens.map((p) => (
                <div key={p.id} style={{ padding: '10px 0', borderBottom: '1px solid #EEE7D8' }}>
                  <div className="spread">
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{p.nome}</div>
                    <div style={{ fontWeight: 700 }}>{lote.comp[p.id]}%</div>
                  </div>
                  <div className="mono" style={{ color: 'var(--tinta-2)', marginTop: 3 }}>
                    CAR {p.car} · {p.ha.toFixed(1)} ha · {p.municipio}
                  </div>
                  <div className="mt8"><Status situacao={p.status} /></div>
                </div>
              ))}

              <div className="docrow mt16"><span>Cruzamento PRODES / DETER</span><span>Sem sobreposição</span></div>
              <div className="docrow"><span>Corte temporal aplicado</span><span>31/12/2020</span></div>

              <div className="mt16 helper">
                Documento assinado <span className="mono">{lote.dossie ? lote.dossie.hash : '—'}</span>,
                formato {lote.dossie ? lote.dossie.versao : '—'}. Reemitido automaticamente quando o
                formato exigido mudar.
              </div>

              <button className="btn btn-o btn-full mt16">Baixar cópia em PDF</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
