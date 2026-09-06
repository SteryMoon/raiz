import { useRaiz } from '../store/RaizContext';

export default function Login() {
  const { papel, trocarPapel } = useRaiz();

  return (
    <div className="frame-desk">
      <div className="login">
        <div className="art">
          <div className="n">Raiz</div>
          <p>A origem do café sai da lavoura junto com a saca. Aqui ela não se perde no armazém.</p>
          <div className="stat">
            <div className="big">51,2%</div>
            <div className="cap">
              da produção brasileira de café foi para a União Europeia em 2024.
              Sem comprovar origem, esse mercado fecha.
            </div>
          </div>
        </div>

        <div className="form">
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>Entrar</h2>
          <p className="helper mt8" style={{ marginBottom: 18 }}>
            Use o acesso enviado pela cooperativa.
          </p>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" defaultValue="gestao@coopsulminas.coop.br" />
          </div>

          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" defaultValue="123456" />
          </div>

          <button className="btn btn-g btn-full mt8" onClick={() => trocarPapel(papel)}>Entrar</button>

          <p className="helper mt16">Primeiro acesso? Peça o convite ao gestor da sua cooperativa.</p>
        </div>
      </div>
    </div>
  );
}
