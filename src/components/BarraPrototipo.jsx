import { useRaiz } from '../store/RaizContext';

const PAPEIS = [
  ['gestor', 'Gestor da cooperativa'],
  ['tecnico', 'Técnico de campo'],
  ['auditor', 'Comprador'],
];

export default function BarraPrototipo() {
  const { papel, trocarPapel, dispositivo, setDispositivo, logado, sair } = useRaiz();

  return (
    <div className="pbar">
      <span className="brandmark">Raiz</span>
      <span className="lbl">protótipo</span>

      <div className="seg">
        {PAPEIS.map(([chave, rotulo]) => (
          <button key={chave} data-on={papel === chave ? '1' : '0'} onClick={() => trocarPapel(chave)}>
            {rotulo}
          </button>
        ))}
      </div>

      <div className="seg">
        {[['desktop', 'Desktop'], ['mobile', 'Mobile']].map(([chave, rotulo]) => (
          <button key={chave} data-on={dispositivo === chave ? '1' : '0'} onClick={() => setDispositivo(chave)}>
            {rotulo}
          </button>
        ))}
      </div>

      <div className="spacer" />
      {logado && (
        <button className="btn btn-sm" style={{ color: '#9CB3A5' }} onClick={sair}>Sair</button>
      )}
    </div>
  );
}
