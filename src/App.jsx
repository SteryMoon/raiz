import { useRaiz } from './store/RaizContext';

import BarraPrototipo from './components/BarraPrototipo';
import CascaDesktop from './components/layout/CascaDesktop';
import CascaMobile from './components/layout/CascaMobile';

import Login from './screens/Login';
import Painel from './screens/gestor/Painel';
import Associados from './screens/gestor/Associados';
import Lotes from './screens/gestor/Lotes';
import Dossies from './screens/gestor/Dossies';
import Faturamento from './screens/gestor/Faturamento';
import Visitas from './screens/campo/Visitas';
import Captura from './screens/campo/Captura';
import Envio from './screens/campo/Envio';
import DossieRecebido from './screens/auditor/DossieRecebido';



const TELAS_GESTOR = {
  painel: Painel,
  produtores: Associados,
  lotes: Lotes,
  dossies: Dossies,
  faturamento: Faturamento,
};

export default function App() {
  const { logado, papel, tela, dispositivo, capturando } = useRaiz();

  function conteudo() {
    if (papel === 'auditor') return <DossieRecebido />;

    if (papel === 'tecnico') {
      if (capturando) return <Captura />;
      if (tela === 'sync') return <Envio />;
      return <Visitas />;
    }

    const Tela = TELAS_GESTOR[tela] || Painel;
    return <Tela />;
  }

  return (
    <>
      <BarraPrototipo />

      <div className="stage">
        {!logado && <Login />}

        {logado && dispositivo === 'desktop' && (
          <CascaDesktop>{conteudo()}</CascaDesktop>
        )}

        {logado && dispositivo === 'mobile' && (
          <CascaMobile>
            {papel === 'tecnico'
              ? conteudo()
              : <div className="mbody" style={{ padding: 0 }}>{conteudo()}</div>}
          </CascaMobile>
        )}
      </div>
    </>
  );
}
