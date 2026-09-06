# Raiz — plataforma de rastreabilidade de origem

Protótipo navegável da startup Raiz, do projeto Startup One (FIAP, 2TWDOA).
Rastreia a origem do café do talhão do produtor até o lote exportado e emite
o dossiê de conformidade exigido pelo comprador europeu.

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  main.jsx                    ponto de entrada, importa os CSS
  App.jsx                     escolhe a casca e a tela conforme o perfil

  styles/
    tokens.css                paleta e tipografia — mude as cores aqui
    base.css                  reset e utilitários
    components.css            todos os componentes visuais

  data/
    produtores.js             associados da cooperativa e seus polígonos
    lotes.js                  lotes do armazém e composição de origem
    planos.js                 faixas de assinatura e preço do excedente

  utils/
    geo.js                    área por shoelace e conversão de coordenadas

  store/
    RaizContext.jsx           todo o estado do app em um lugar só

  components/
    Status.jsx                etiqueta de conformidade
    Mapa.jsx                  mapa SVG dos talhões
    FichaProdutor.jsx         painel lateral com o detalhe da propriedade
    BarraPrototipo.jsx        troca de perfil e de dispositivo
    layout/
      CascaDesktop.jsx        barra lateral + conteúdo
      CascaMobile.jsx         cabeçalho + abas inferiores

  screens/
    Login.jsx
    gestor/
      Painel.jsx              indicadores, mapa e fila da semana
      Associados.jsx          cadastro com busca e filtro
      Lotes.jsx               composição de origem com proporção
      Dossies.jsx             prévia, emissão e paywall
      Faturamento.jsx         plano vigente e faixas
    campo/
      Visitas.jsx             rota do dia
      Captura.jsx             desenho do polígono e cálculo de área
      Envio.jsx               fila de sincronização offline
      AvisoOffline.jsx        faixa de sem sinal
    auditor/
      DossieRecebido.jsx      visão somente leitura do comprador
```

## Os três perfis

**Gestor da cooperativa** — desktop. Cadastra associados, acompanha a
conformidade, monta a composição dos lotes e emite os dossiês. É o único
perfil que vê preço.

**Técnico de campo** — celular, offline por padrão. Percorre a rota do dia,
desenha o polígono da propriedade e deixa a captura na fila até a rede voltar.
Nunca vê nada de cobrança.

**Comprador** — acesso somente leitura ao dossiê pelo link de auditoria.
Sem login e sem cobrança.

## Onde entra a monetização

A cobrança fica em um único ponto: a emissão oficial do dossiê. Cadastro,
mapeamento, sincronização e conferência de conformidade são ilimitados.
A franquia começa em 11 de 12 usados, então emitir um dossiê já dispara o
paywall — é assim que se demonstra o modelo na apresentação.

## O que é simulado

Os dados são fictícios e ficam em `src/data/`. O cruzamento com PRODES,
DETER, MapBiomas e SICAR é representado visualmente, sem chamada real de API.
O cálculo de área é de verdade, pela fórmula do shoelace em `src/utils/geo.js`.
