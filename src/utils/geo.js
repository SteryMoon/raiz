
export const ESCALA_HA = 0.0135;

export function areaHectares(pontos) {
  if (pontos.length < 3) return 0;

  let soma = 0;
  for (let i = 0; i < pontos.length; i++) {
    const [x1, y1] = pontos[i];
    const [x2, y2] = pontos[(i + 1) % pontos.length];
    soma += x1 * y2 - x2 * y1;
  }

  return Math.abs(soma / 2) * ESCALA_HA;
}


export function paraSvg(pontos) {
  return pontos.map((p) => p.join(',')).join(' ');
}


export function pontoDoClique(evento, largura = 400, altura = 300) {
  const caixa = evento.currentTarget.getBoundingClientRect();
  const x = ((evento.clientX - caixa.left) / caixa.width) * largura;
  const y = ((evento.clientY - caixa.top) / caixa.height) * altura;
  return [Math.round(x), Math.round(y)];
}
