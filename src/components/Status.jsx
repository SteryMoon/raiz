import { STATUS_META } from '../data/produtores';

export default function Status({ situacao }) {
  const meta = STATUS_META[situacao];
  return (
    <span className={`st ${meta.classe}`}>
      <i /> {meta.texto}
    </span>
  );
}
