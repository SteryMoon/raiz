import { useRaiz } from '../../store/RaizContext';
import Status from '../../components/Status';


export default function Envio() {
  const { fila, offline, setOffline, sincronizar } = useRaiz();

  return (
    <div className="mbody">
      <div className="mcard">
        <div className="spread">
          <div>
            <div className="t">{offline ? 'Sem sinal' : 'Conectado'}</div>
            <div className="d">
              {offline
                ? 'As capturas ficam guardadas no aparelho e sobem sozinhas quando a rede voltar.'
                : 'Tudo que for capturado sobe na hora.'}
            </div>
          </div>
          <button className="btn btn-o btn-sm" onClick={() => setOffline(!offline)}>
            {offline ? 'Simular rede' : 'Simular queda'}
          </button>
        </div>
      </div>

      <div className="helper" style={{ margin: '16px 0 10px' }}>
        Fila de envio · {fila.length} {fila.length === 1 ? 'item' : 'itens'}
      </div>

      {fila.length === 0 && (
        <div className="mcard">
          <div className="t">Nada na fila</div>
          <div className="d">Toda captura feita neste aparelho já chegou na cooperativa.</div>
        </div>
      )}

      {fila.map((item, i) => (
        <div className="mcard" key={i}>
          <div className="spread">
            <div>
              <div className="t">{item.nome}</div>
              <div className="d">{item.ha.toFixed(2)} ha · {item.pontos} vértices · capturado agora</div>
            </div>
            <Status situacao="pendente" />
          </div>
        </div>
      ))}

      {fila.length > 0 && !offline && (
        <button className="btn btn-p bigbtn mt8" onClick={sincronizar}>
          Enviar {fila.length} {fila.length === 1 ? 'captura' : 'capturas'}
        </button>
      )}
    </div>
  );
}
