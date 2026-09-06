export const PRODUTORES = [
  {
    id: 'P-018', nome: 'Sítio Boa Vista', titular: 'Antônio R. Prado',
    municipio: 'Carmo de Minas, MG', ha: 12.4, car: 'MG-3115003-A41F',
    status: 'conforme', capturado: '12/03/2026',
    poly: [[42,58],[96,44],[128,78],[110,126],[56,120]],
  },
  {
    id: 'P-022', nome: 'Fazenda Serra Nova', titular: 'Marli de Souza',
    municipio: 'Carmo de Minas, MG', ha: 31.8, car: 'MG-3115003-B72C',
    status: 'conforme', capturado: '12/03/2026',
    poly: [[146,52],[224,40],[252,92],[206,132],[150,110]],
  },
  {
    id: 'P-031', nome: 'Sítio Três Barras', titular: 'Joaquim N. Ferreira',
    municipio: 'Cristina, MG', ha: 8.1, car: 'MG-3119203-D18B',
    status: 'alerta', capturado: '14/03/2026',
    poly: [[268,60],[330,54],[348,104],[300,128],[266,102]],
  },
  {
    id: 'P-044', nome: 'Chácara Água Limpa', titular: 'Sebastiana Alves',
    municipio: 'Cristina, MG', ha: 5.6, car: 'MG-3119203-C09E',
    status: 'conforme', capturado: '14/03/2026',
    poly: [[54,152],[118,142],[140,186],[92,214],[46,192]],
  },
  {
    id: 'P-057', nome: 'Fazenda Recanto', titular: 'Élio Barbosa',
    municipio: 'Santa Rita, MG', ha: 44.2, car: 'MG-3159803-F55A',
    status: 'pendente', capturado: null,
    poly: [[164,150],[240,144],[262,196],[214,226],[162,200]],
  },
  {
    id: 'P-063', nome: 'Sítio Pedra Alta', titular: 'Vanda M. Rocha',
    municipio: 'Santa Rita, MG', ha: 17.9, car: 'MG-3159803-A22D',
    status: 'pendente', capturado: null,
    poly: [[282,150],[344,146],[356,196],[312,222],[280,192]],
  },
];

export const STATUS_META = {
  conforme: { classe: 'st-ok', texto: 'Conforme', cor: '#3F7D5C' },
  pendente: { classe: 'st-pd', texto: 'Pendente', cor: '#B07714' },
  alerta:   { classe: 'st-al', texto: 'Alerta',   cor: '#A33B2A' },
};
