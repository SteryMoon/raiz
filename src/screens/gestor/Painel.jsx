import { useState } from 'react';
import { useRaiz } from '../../store/RaizContext';
import Mapa from '../../components/Mapa';

/* Painel de conformidade: o retrato da safra em números,
   o mapa dos talhões e a fila do que precisa de decisão nesta semana. */
export default function Painel() {
  const { produtores, setFichaAberta, setTela } = useRaiz();
  const [selecionado, setSelecionado] = useState(null);

  const conformes = produtores.filter((p) => p.status === 'conforme').length;
  const pendentes = produtores.filter((p) => p.status === 'pendente').length;
  const alertas = produtores.filter((p) => p.status === 'alerta').length;
  const hectares = produtores.reduce((soma, p) => soma + p.ha, 0);
  const prontos = Math.round((conformes / produtores.length) * 100);

  function abrir(id) {
    setSelecionado(id);
    setFichaAberta(id);
  }

  return (
    <>
      <div className="top">
        <div className="eyebrow">Cooperativa dos Cafeicultores do Sul de Minas</div>
        <h1>Painel de conformidade</h1>
        <p className="sub">
          Safra 2026. Cada propriedade é cruzada com as bases públicas de desmatamento toda madrugada.
          O que aparece aqui é o que o comprador europeu vai ver no dossiê.
        </p>
      </div>

      <div className="body">
        <div className="kpis">
          <div className="kpi">
            <div className="v">{prontos}%</div>
            <div className="k">Associados prontos para exportar</div>
            <div className="bar"><i style={{ width: `${prontos}%`, background: 'var(--verde)' }} /></div>
          </div>
          <div className="kpi">
            <div className="v">{pendentes}</div>
            <div className="k">Sem polígono capturado</div>
            <div className="bar"><i style={{ width: `${(pendentes / produtores.length) * 100}%`, background: 'var(--ambar)' }} /></div>
          </div>
          <div className="kpi">
            <div className="v">{alertas}</div>
            <div className="k">Com alerta de sobreposição</div>
            <div className="bar"><i style={{ width: `${(alertas / produtores.length) * 100}%`, background: 'var(--risco)' }} /></div>
          </div>
          <div className="kpi">
            <div className="v">{hectares.toFixed(0)}</div>
            <div className="k">Hectares mapeados</div>
            <div className="bar"><i style={{ width: '72%', background: 'var(--azul)' }} /></div>
          </div>
        </div>

        <div className="grid2">
          <div className="panel">
            <header>
              <h3>Talhões dos associados</h3>
              <span className="hint">Clique num talhão para abrir a ficha</span>
            </header>
            <div style={{ padding: 12 }}>
              <Mapa produtores={produtores} selecionado={selecionado} aoSelecionar={abrir} />
            </div>
          </div>

          <div className="panel">
            <header><h3>Fila da semana</h3><span className="hint">4 itens</span></header>

            <div className="qitem">
              <span className="dot" style={{ background: 'var(--risco)' }} />
              <div>
                <div className="t">Sítio Três Barras precisa de vistoria</div>
                <div className="d">
                  O polígono cobre 0,9 ha de área com alerta DETER de agosto de 2025.
                  Sem resolver, o lote que contiver esse café não embarca.
                </div>
                <button className="btn btn-t" onClick={() => abrir('P-031')}>Abrir ficha</button>
              </div>
            </div>

            <div className="qitem">
              <span className="dot" style={{ background: 'var(--ambar)' }} />
              <div>
                <div className="t">Duas propriedades sem polígono</div>
                <div className="d">
                  Fazenda Recanto e Sítio Pedra Alta ainda não receberam visita.
                  Juntas somam 62 ha e 480 sacas previstas.
                </div>
              </div>
            </div>

            <div className="qitem">
              <span className="dot" style={{ background: 'var(--azul)' }} />
              <div>
                <div className="t">Lote L-2026-016 sem composição</div>
                <div className="d">505 sacas registradas na entrada do armazém, ainda sem origem atribuída.</div>
                <button className="btn btn-t" onClick={() => setTela('lotes')}>Atribuir origem</button>
              </div>
            </div>

            <div className="qitem">
              <span className="dot" style={{ background: 'var(--verde)' }} />
              <div>
                <div className="t">Base MapBiomas atualizada</div>
                <div className="d">Coleção nova processada em 02/09. Nenhum associado mudou de status.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
