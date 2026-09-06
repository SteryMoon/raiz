import { useRaiz } from '../store/RaizContext';
import { STATUS_META } from '../data/produtores';
import { paraSvg } from '../utils/geo';
import Status from './Status';

export default function FichaProdutor() {
  const { produtores, fichaAberta, setFichaAberta } = useRaiz();
  const p = produtores.find((x) => x.id === fichaAberta);
  if (!p) return null;

  const fechar = () => setFichaAberta(null);

  return (
    <div className="drawer" onClick={fechar}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <header>
          <div>
            <div className="mono" style={{ color: 'var(--tinta-2)' }}>{p.id}</div>
            <h2>{p.nome}</h2>
            <div className="helper" style={{ marginTop: 3 }}>{p.titular} · {p.municipio}</div>
          </div>
          <button className="btn btn-o btn-sm" onClick={fechar}>Fechar</button>
        </header>

        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}><Status situacao={p.status} /></div>

          <div className="mapwrap" style={{ marginBottom: 18 }}>
            <svg viewBox="60 20 320 230" style={{ display: 'block', width: '100%' }}>
              <rect x="60" y="20" width="320" height="230" fill="#E4EBE2" />
              <polygon points={paraSvg(p.poly)} fill={STATUS_META[p.status].cor}
                fillOpacity=".5" stroke={STATUS_META[p.status].cor} strokeWidth="2.5" />
              {p.poly.map((c, i) => (
                <circle key={i} cx={c[0]} cy={c[1]} r="4" fill="#fff" stroke="#14607F" strokeWidth="2" />
              ))}
            </svg>
          </div>

          <div className="dl">
            <div className="f"><div className="k">Área declarada</div><div className="v">{p.ha.toFixed(1)} ha</div></div>
            <div className="f"><div className="k">Vértices</div><div className="v">{p.poly.length}</div></div>
            <div className="f"><div className="k">CAR</div><div className="v mono">{p.car}</div></div>
            <div className="f"><div className="k">Mapeada em</div><div className="v">{p.capturado || 'não mapeada'}</div></div>
          </div>

          {p.status === 'alerta' && (
            <div className="aviso mt20">
              <div className="t">Sobreposição detectada</div>
              <p className="helper" style={{ color: 'inherit', marginTop: 5 }}>
                0,9 ha do polígono coincidem com um alerta DETER de agosto de 2025. Enquanto isso não for
                esclarecido, nenhum lote que contenha café desta propriedade pode receber dossiê.
              </p>
              <div className="mt12 row gap8">
                <button className="btn btn-o btn-sm">Agendar vistoria</button>
                <button className="btn btn-o btn-sm">Anexar justificativa</button>
              </div>
            </div>
          )}

          <div className="mt20">
            <div className="helper" style={{ marginBottom: 8 }}>Histórico</div>
            <div className="panel">
              <div className="qitem">
                <span className="dot" style={{ background: 'var(--verde)' }} />
                <div>
                  <div className="t">Polígono capturado em campo</div>
                  <div className="d">{p.capturado || 'aguardando visita'} · técnico Wesley A.</div>
                </div>
              </div>
              <div className="qitem">
                <span className="dot" style={{ background: 'var(--azul)' }} />
                <div>
                  <div className="t">Cruzamento com bases públicas</div>
                  <div className="d">Executado em 02/09/2026 · PRODES, DETER e MapBiomas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
