import { useRaiz } from '../../store/RaizContext';
import { FAIXAS, PRECO_EXCEDENTE } from '../../data/planos';

/* Plano e consumo. Única tela do produto que fala de dinheiro,
   e só o gestor da cooperativa a enxerga. */
export default function Faturamento() {
  const { plano, trocarPlano } = useRaiz();
  const pct = Math.min(100, Math.round((plano.usados / plano.franquia) * 100));

  return (
    <>
      <div className="top">
        <div className="eyebrow">Contrato</div>
        <h1>Plano e consumo</h1>
        <p className="sub">
          O plano é anual e escalonado pelo número de associados cadastrados. A franquia de dossiês
          acompanha a faixa, e o excedente é cobrado por documento emitido.
        </p>
      </div>

      <div className="body">
        <div className="panel" style={{ marginBottom: 16 }}>
          <div className="pad">
            <div className="spread">
              <div>
                <div className="helper">Plano vigente</div>
                <div className="disp" style={{ fontSize: 24, fontWeight: 700, marginTop: 2 }}>{plano.faixa}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="helper">Dossiês emitidos em setembro</div>
                <div className="disp" style={{ fontSize: 24, fontWeight: 700, marginTop: 2 }}>
                  {plano.usados}<span style={{ color: 'var(--tinta-3)', fontWeight: 500 }}> / {plano.franquia}</span>
                </div>
              </div>
            </div>

            <div className="kpi" style={{ border: 'none', padding: 0, marginTop: 14 }}>
              <div className="bar" style={{ height: 8 }}>
                <i style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--risco)' : 'var(--azul)' }} />
              </div>
            </div>

            <p className="helper mt8">
              Excedente cobrado a R$ {PRECO_EXCEDENTE} por dossiê. Renovação do contrato em 30/06/2027.
            </p>
          </div>
        </div>

        <div className="plans">
          {FAIXAS.map((f) => (
            <button key={f.nome} className="plan" data-on={plano.faixa === f.nome ? '1' : '0'}
              onClick={() => trocarPlano(f.nome)}>
              <div className="n">{f.nome}</div>
              <div className="r">{f.faixa}</div>
              <div className="p">{f.preco}</div>
              <div className="r" style={{ marginTop: 6 }}>{f.franquia} dossiês/mês inclusos</div>
            </button>
          ))}
        </div>

        <p className="helper mt16" style={{ maxWidth: '70ch' }}>
          Valores de referência do protótipo. O produtor associado nunca paga nada, e o técnico de campo
          não vê nenhuma tela de cobrança.
        </p>
      </div>
    </>
  );
}
