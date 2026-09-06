import { useRaiz } from '../../store/RaizContext';
import Status from '../../components/Status';
import AvisoOffline from './AvisoOffline';

export default function Visitas() {
  const { produtores, setCapturando } = useRaiz();

  const pendentes = produtores.filter((p) => !p.capturado);
  const mapeadas = produtores.filter((p) => p.capturado);

  return (
    <>
      <AvisoOffline />

      <div className="mbody">
        <div className="helper" style={{ marginBottom: 10 }}>A visitar hoje</div>

        {pendentes.map((p) => (
          <div className="mcard" key={p.id}>
            <div className="spread">
              <div>
                <div className="t">{p.nome}</div>
                <div className="d">{p.titular} · {p.municipio}</div>
              </div>
              <Status situacao="pendente" />
            </div>
            <button className="btn btn-g btn-full mt12" onClick={() => setCapturando(p.id)}>
              Mapear propriedade
            </button>
          </div>
        ))}

        {pendentes.length === 0 && (
          <div className="mcard">
            <div className="t">Nada pendente por aqui</div>
            <div className="d">
              Todas as propriedades da sua rota já foram mapeadas.
              Passe na cooperativa para pegar a próxima rota.
            </div>
          </div>
        )}

        <div className="helper" style={{ margin: '18px 0 10px' }}>Já mapeadas</div>

        {mapeadas.map((p) => (
          <div className="mcard" key={p.id}>
            <div className="spread">
              <div>
                <div className="t">{p.nome}</div>
                <div className="d">{p.ha.toFixed(1)} ha · mapeada em {p.capturado}</div>
              </div>
              <Status situacao={p.status} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
