import { useRaiz } from '../../store/RaizContext';

const TITULOS = {
  painel: 'Painel', produtores: 'Associados', lotes: 'Lotes',
  dossies: 'Dossiês', faturamento: 'Plano',
  visitas: 'Sua rota', sync: 'Envio', auditor: 'Dossiê recebido',
};

const ABAS_GESTOR = [
  { chave: 'painel', icone: '▤', rotulo: 'Painel' },
  { chave: 'produtores', icone: '◈', rotulo: 'Associados' },
  { chave: 'lotes', icone: '▣', rotulo: 'Lotes' },
  { chave: 'dossies', icone: '▦', rotulo: 'Dossiês' },
];

export default function CascaMobile({ children }) {
  const { papel, tela, setTela, capturando, setCapturando, fila } = useRaiz();

  const titulo = capturando ? 'Mapear propriedade' : TITULOS[tela] || 'Raiz';
  const usuario = papel === 'tecnico' ? 'Wesley A.' : papel === 'auditor' ? 'Trading Norte' : 'Gabriela S.';
  const legenda = papel === 'tecnico' ? 'Rota de 06/09 · Sul de Minas' : 'Coop. Sul de Minas · safra 2026';

  function ir(destino) {
    setCapturando(null);
    setTela(destino);
  }

  return (
    <div className="frame-mob">
      <div className="mtop">
        <div className="r1">
          <span className="nm">Raiz</span>
          <span style={{ fontSize: 12, color: '#9CB3A5' }}>{usuario}</span>
        </div>
        <h2>{titulo}</h2>
        <div className="sub">{legenda}</div>
      </div>

      {children}

      {papel === 'tecnico' && (
        <div className="mtabs">
          <button data-on={!capturando && tela === 'visitas' ? '1' : '0'} onClick={() => ir('visitas')}>
            <span className="ic">◈</span>Rota
          </button>
          <button data-on={tela === 'sync' ? '1' : '0'} onClick={() => ir('sync')}>
            <span className="ic">⇅</span>Envio {fila.length > 0 && `(${fila.length})`}
          </button>
        </div>
      )}

      {papel === 'gestor' && (
        <div className="mtabs">
          {ABAS_GESTOR.map((aba) => (
            <button key={aba.chave} data-on={tela === aba.chave ? '1' : '0'} onClick={() => ir(aba.chave)}>
              <span className="ic">{aba.icone}</span>{aba.rotulo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
