import { useState } from 'react';
import { useRaiz } from '../../store/RaizContext';
import { areaHectares, paraSvg, pontoDoClique } from '../../utils/geo';
import AvisoOffline from './AvisoOffline';


export default function Captura() {
  const { produtores, capturando, setCapturando, offline, salvarCaptura } = useRaiz();
  const produtor = produtores.find((p) => p.id === capturando);

  const [pontos, setPontos] = useState([]);
  const [fechado, setFechado] = useState(false);

  if (!produtor) return null;

  const area = areaHectares(pontos);

  function marcarPonto(evento) {
    if (fechado) return;
    setPontos((atuais) => [...atuais, pontoDoClique(evento)]);
  }

  function simularCaminhada() {
    setPontos([[92, 70], [214, 58], [286, 118], [252, 208], [128, 224], [66, 152]]);
  }

  function refazer() {
    setPontos([]);
    setFechado(false);
  }

  return (
    <>
      <AvisoOffline texto="Sem sinal. A captura fica guardada e sobe sozinha quando pegar rede." />

      <div className="mbody">
        <div className="mcard" style={{ padding: 0, overflow: 'hidden' }}>
          <div onClick={marcarPonto}
            style={{ background: '#E4EBE2', cursor: fechado ? 'default' : 'crosshair' }}>
            <svg viewBox="0 0 400 300" style={{ display: 'block', width: '100%' }}>
              <rect width="400" height="300" fill="#E4EBE2" />
              <path d="M0 120 C80 108 150 148 230 136 S350 100 400 118" fill="none" stroke="#9DC0CE" strokeWidth="6" opacity=".8" />
              <path d="M40 0 L52 300" fill="none" stroke="#CFC5AC" strokeWidth="7" opacity=".8" />

              {pontos.length > 1 && (
                <polygon
                  points={paraSvg(pontos)}
                  fill={fechado ? '#3F7D5C' : '#14607F'}
                  fillOpacity={fechado ? 0.45 : 0.22}
                  stroke={fechado ? '#3F7D5C' : '#14607F'}
                  strokeWidth="2.5"
                  strokeDasharray={fechado ? '0' : '6 4'}
                />
              )}

              {pontos.map((ponto, i) => (
                <g key={i}>
                  <circle cx={ponto[0]} cy={ponto[1]} r="6.5" fill="#fff" stroke="#14607F" strokeWidth="2.5" />
                  <text x={ponto[0]} y={ponto[1] + 3.5} fontSize="8" textAnchor="middle"
                    fill="#14607F" fontWeight="700">{i + 1}</text>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ padding: '12px 14px' }}>
            <div className="t">{produtor.nome}</div>
            <div className="d">{produtor.titular} · CAR {produtor.car}</div>
            <div className="mono mt8" style={{ color: 'var(--tinta-2)' }}>
              {pontos.length} {pontos.length === 1 ? 'ponto' : 'pontos'} · {area.toFixed(2)} ha
              {pontos.length > 0 && ` · -22.1${pontos.length}4, -45.0${pontos.length}8`}
            </div>
          </div>
        </div>

        {!fechado && (
          <>
            <p className="helper" style={{ marginBottom: 10 }}>
              Ande pela divisa da área e marque um ponto em cada canto. Precisa de pelo menos três.
            </p>

            <button className="btn btn-p bigbtn" style={{ marginBottom: 8 }} onClick={simularCaminhada}>
              Simular caminhada pela divisa
            </button>

            <div className="row gap8">
              <button className="btn btn-o btn-full" disabled={pontos.length === 0}
                onClick={() => setPontos((p) => p.slice(0, -1))}>
                Desfazer ponto
              </button>
              <button className="btn btn-g btn-full" disabled={pontos.length < 3}
                onClick={() => setFechado(true)}>
                Fechar polígono
              </button>
            </div>
          </>
        )}

        {fechado && (
          <>
            <div className="mcard" style={{ background: '#E4EFE7', borderColor: '#B7D3C1' }}>
              <div className="t" style={{ color: '#26543D' }}>Polígono fechado</div>
              <div className="d">
                {area.toFixed(2)} ha em {pontos.length} vértices. Confira com o produtor antes de salvar.
              </div>
            </div>

            <button className="btn btn-g bigbtn" onClick={() => salvarCaptura(produtor.id, pontos, area)}>
              Salvar {offline ? 'no aparelho' : 'e sincronizar'}
            </button>

            <button className="btn btn-o btn-full mt8" onClick={refazer}>Refazer captura</button>
          </>
        )}

        <button className="btn btn-t mt12" onClick={() => setCapturando(null)}>Voltar para a rota</button>
      </div>
    </>
  );
}
