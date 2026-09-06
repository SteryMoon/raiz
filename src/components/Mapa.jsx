import { STATUS_META } from '../data/produtores';
import { paraSvg } from '../utils/geo';

export default function Mapa({ produtores, selecionado, aoSelecionar, altura = 300, comLegenda = true }) {
  return (
    <div className="mapwrap">
      <svg viewBox="0 0 400 260" style={{ height: altura }} role="img"
        aria-label="Mapa dos talhões da cooperativa">
        <defs>
          <pattern id="hachura" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#A33B2A" strokeWidth="2.5" opacity=".5" />
          </pattern>
        </defs>

        <rect width="400" height="260" fill="#E4EBE2" />
        <path d="M0 96 C70 86 120 118 190 108 S320 78 400 92" fill="none" stroke="#9DC0CE" strokeWidth="5" opacity=".85" />
        <path d="M0 214 C90 206 140 232 230 222 S340 200 400 210" fill="none" stroke="#9DC0CE" strokeWidth="4" opacity=".7" />
        <path d="M28 0 L38 260" fill="none" stroke="#CFC5AC" strokeWidth="6" opacity=".8" />

        {produtores.map((p) => {
          const ativo = selecionado === p.id;
          const cor = STATUS_META[p.status].cor;
          const semPoligono = p.status === 'pendente';

          return (
            <g key={p.id}>
              <polygon
                className="poly"
                points={paraSvg(p.poly)}
                fill={semPoligono ? '#F0E4CA' : cor}
                fillOpacity={ativo ? 0.85 : 0.55}
                stroke={ativo ? '#14607F' : cor}
                strokeWidth={ativo ? 3 : 1.6}
                strokeDasharray={semPoligono ? '5 3' : '0'}
                onClick={() => aoSelecionar && aoSelecionar(p.id)}
              />
              {p.status === 'alerta' && (
                <polygon points={paraSvg(p.poly)} fill="url(#hachura)" pointerEvents="none" />
              )}
              <text x={p.poly[0][0] + 6} y={p.poly[0][1] + 16} fontSize="9.5" fill="#1E2A24"
                fontFamily="IBM Plex Mono, monospace" pointerEvents="none">
                {p.id}
              </text>
            </g>
          );
        })}
      </svg>

      {comLegenda && (
        <div className="maplegend">
          <span><i style={{ background: '#3F7D5C' }} />Conforme</span>
          <span><i style={{ background: '#F0E4CA', border: '1px dashed #B07714' }} />Sem polígono</span>
          <span><i style={{ background: '#A33B2A' }} />Sobreposição com alerta de desmatamento</span>
          <span style={{ marginLeft: 'auto' }}>Base: PRODES + MapBiomas, ciclo 2025</span>
        </div>
      )}
    </div>
  );
}
