import { useState } from 'react';
import { useRaiz } from '../../store/RaizContext';
import { STATUS_META } from '../../data/produtores';
import Status from '../../components/Status';

const FILTROS = ['todos', 'conforme', 'pendente', 'alerta'];

/* Cadastro dos associados. Sem limite e sem cobrança:
   a franquia só é consumida na emissão do dossiê. */
export default function Associados() {
  const { produtores, setFichaAberta } = useRaiz();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const termo = busca.toLowerCase();
  const lista = produtores.filter((p) => {
    const casaFiltro = filtro === 'todos' || p.status === filtro;
    const casaBusca =
      p.nome.toLowerCase().includes(termo) ||
      p.titular.toLowerCase().includes(termo) ||
      p.id.toLowerCase().includes(termo);
    return casaFiltro && casaBusca;
  });

  return (
    <>
      <div className="top">
        <div className="eyebrow">Cadastro</div>
        <h1>Associados</h1>
        <p className="sub">
          Cadastrar e mapear não custa nada e não tem limite. A cobrança só aparece na hora de emitir o dossiê.
        </p>
      </div>

      <div className="body">
        <div className="row gap12" style={{ marginBottom: 14, flexWrap: 'wrap' }}>
          <input
            className="busca"
            placeholder="Buscar por nome, titular ou código"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar associado"
          />

          <div className="row gap8">
            {FILTROS.map((f) => (
              <button key={f} className={`btn btn-sm ${filtro === f ? 'btn-g' : 'btn-o'}`}
                onClick={() => setFiltro(f)}>
                {f === 'todos' ? 'Todos' : STATUS_META[f].texto}
              </button>
            ))}
          </div>

          <button className="btn btn-o btn-sm" style={{ marginLeft: 'auto' }}>
            Importar base de associados
          </button>
        </div>

        <div className="panel">
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 78 }}>Código</th>
                <th>Propriedade</th>
                <th>Município</th>
                <th style={{ width: 90 }}>Área</th>
                <th style={{ width: 132 }}>Situação</th>
                <th style={{ width: 108 }}>Mapeada em</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((p) => (
                <tr key={p.id} onClick={() => setFichaAberta(p.id)} style={{ cursor: 'pointer' }}>
                  <td className="mono">{p.id}</td>
                  <td>
                    <div className="nm">{p.nome}</div>
                    <div className="sm">{p.titular}</div>
                  </td>
                  <td>{p.municipio}</td>
                  <td>{p.ha.toFixed(1)} ha</td>
                  <td><Status situacao={p.status} /></td>
                  <td className="sm">{p.capturado || '—'}</td>
                </tr>
              ))}

              {lista.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 30, textAlign: 'center' }} className="helper">
                    Nenhum associado com esse filtro. Ajuste a busca ou importe a base da cooperativa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
