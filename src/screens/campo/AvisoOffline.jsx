import { useRaiz } from '../../store/RaizContext';


export default function AvisoOffline({ texto }) {
  const { offline, fila } = useRaiz();
  if (!offline) return null;

  const padrao = `Sem sinal. ${fila.length} ${fila.length === 1 ? 'captura guardada' : 'capturas guardadas'} no aparelho.`;

  return (
    <div className="offbadge">
      <span className="offdot" />
      {texto || padrao}
    </div>
  );
}
