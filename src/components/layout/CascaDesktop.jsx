import { useRaiz } from '../../store/RaizContext';
import FichaProdutor from '../FichaProdutor';

const MENU_GESTOR = [
  { chave: 'painel', rotulo: 'Painel' },
  { chave: 'produtores', rotulo: 'Associados' },
  { chave: 'lotes', rotulo: 'Lotes' },
  { chave: 'dossies', rotulo: 'Dossiês' },
  { chave: 'faturamento', rotulo: 'Plano' },
];

const MENU_AUDITOR = [{ chave: 'auditor', rotulo: 'Dossiê recebido' }];

export default function CascaDesktop({ children }) {
  const { papel, tela, setTela, plano, fichaAberta } = useRaiz();
  const menu = papel === 'auditor' ? MENU_AUDITOR : MENU_GESTOR;
  const franquiaZerada = plano.franquia - plano.usados <= 0;

  return (
    <div className="frame-desk">
      <aside className="side">
        <div className="logo">
          <div className="n">Raiz</div>
          <div className="s">Coop. Sul de Minas</div>
        </div>

        <nav>
          {menu.map((item) => (
            <button key={item.chave} data-on={tela === item.chave ? '1' : '0'}
              onClick={() => setTela(item.chave)}>
              {item.rotulo}
              {item.chave === 'dossies' && franquiaZerada && <span className="pill">0</span>}
            </button>
          ))}
        </nav>

        <div className="foot">
          <b>{papel === 'auditor' ? 'Trading Norte Café' : 'Gabriela Salomão'}</b>
          {papel === 'auditor' ? 'acesso somente leitura' : `plano ${plano.faixa}`}
        </div>
      </aside>

      <div className="main">{children}</div>

      {fichaAberta && <FichaProdutor />}
    </div>
  );
}
