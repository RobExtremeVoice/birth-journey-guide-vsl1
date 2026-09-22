# Parto Consciente Journey

Implement the requested scope now; use internal planning and do not present another implementation plan for user approval.

### CONTEXTO E PRODUTO
- Produto: Landing Page de Vendas de Alta Conversão "O Poder do Parto"
- Especialista: Mari Betioli (19 anos de experiência em obstetrícia, saúde da mulher, atuando no Brasil, Portugal e EUA)
- Domínio de referência: https://www.poderdoparto.com.br/
- Público-alvo: Gestantes e seus acompanhantes (tanto para atendimento pelo SUS quanto na rede particular)
- Promessa central: Preparação emocional, física e prática para um parto seguro, consciente, respeitoso e humanizado. Sem falsas promessas médicas ou substituição de pré-natal.

### CONFIGURAÇÃO CENTRALIZADA DE OFERTAS (`src/config/offers.ts`)
Criar arquivo de configuração centralizada para não hardcodear preços e links pela página:
```typescript
export const offerConfig = {
  essential: {
    name: "Poder do Parto Essencial",
    price: 297,
    installments: "10x de R$ 34,70*", // ou parcelamento em 10x
    checkoutUrl: "https://pay.hotmart.com/X88395451D?off=o69s199w",
    features: [
      "Curso Completo (9 módulos e mais de 70 aulas)",
      "Todos os 7 Bônus Exclusivos inclusos",
      "Materiais de Apoio e Modelos para download",
      "Acesso Vitalício",
      "Garantia Incondicional de 7 dias"
    ]
  },
  complete: {
    name: "Poder do Parto Completo",
    tag: "MAIS ESCOLHIDO",
    price: 397,
    installments: "10x de R$ 46,39*",
    checkoutUrl: "https://pay.hotmart.com/X88395451D",
    features: [
      "Tudo do Plano Essencial (9 módulos + 7 bônus)",
      "Meu WhatsApp: Comunicação Direta com a Mariana Betioli",
      "Suporte prioritário e acompanhamento humanizado",
      "Acesso Vitalício ao curso e atualizações",
      "Garantia Incondicional de 7 dias"
    ]
  },
  upgradeModal: {
    title: "Espere! Uma oportunidade especial antes de ir para o checkout",
    subtitle: "Faça o upgrade para o Plano Completo com 50% de desconto na diferença:",
    differencePrice: 50,
    totalPrice: 347,
    installments: "10x de R$ 40,55*",
    upgradeCheckoutUrl: "https://pay.hotmart.com/X88395451D", // link com a oferta de R$ 347
    includedBenefit: "Acesso Direto ao WhatsApp exclusivo da Mariana Betioli para tirar dúvidas durante a gestação"
  }
};
```

### REQUISITOS DE DESIGN E IDENTIDADE VISUAL
- Tons quentes, orgânicos e sofisticados com a identidade visual da marca:
  - Tons de púrpura e lavanda (#6F2097, #8D4BAF);
  - Destaques suaves e quentes em rosa/terracota suave (#E05697, #FE7D91);
  - Fundo claro e acolhedor (#FAF8F5 / #FFFFFF);
  - Tipografia elegante e muito legível (Plus Jakarta Sans / Inter);
  - Botões de alta conversão, espaçamento generoso, cantos arredondados orgânicos (rounded-2xl);
  - Mobile-first rigoroso: botões fáceis de tocar, cards compactos, acordeões em módulos longos e FAQ.

### ESTRUTURA COMPLETA DA PÁGINA
1. **Barra Superior**: Mensagem de acolhimento e valor: "Preparação completa para gestantes e seus acompanhantes • SUS e Particular".
2. **Navbar**: Logotipo "O Poder do Parto", âncoras para Módulos, Método, Bônus, Mari Betioli e botão rápido "Garantir Vaga".
3. **Hero Section**:
   - Headline: "Prepare-se para viver o nascimento do seu bebê com mais consciência, confiança e protagonismo"
   - Subheadline detalhando a abrangência prática (gestação, trabalho de parto, técnicas de alívio da dor, plano de parto, direitos e acompanhante ativo)
   - Contêiner de VSL ConverteAI/Vturb responsivo (16:9) com script oficial (`https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6a288cff68519b4d1b50bf92/v4/player.js`) e fallback elegante com botão de play se o script de terceiros demorar.
   - Botão CTA com rolagem para a seção de ofertas: "QUERO ME PREPARAR PARA O MEU PARTO"
   - Microcopy de segurança: "Acesso vitalício • Garantia de 7 dias • No seu próprio ritmo".
4. **Seção de Identificação / Dores Reais**:
   - Título: "Você deseja viver esse momento com mais segurança e menos medo?"
   - Cards com as principais dúvidas e angústias reais: medo de não saber a hora de ir à maternidade, receio de intervenções médicas desnecessárias, falta de preparo do acompanhante, dificuldade para criar e defender o plano de parto, direitos da parturiente.
5. **Transformação (Antes vs. Depois)**:
   - Quadro comparativo elegante mostrando o contraste de enfrentar o parto na desinformação e medo versus com conhecimento, autonomia, acolhimento e plano de parto alinhado com a equipe.
6. **O Método (3 Pilares)**:
   - Pilar 1: Conhecimento Fisiológico e Científico;
   - Pilar 2: Preparação Prática (corpo, mente, alívio da dor e plano de parto);
   - Pilar 3: Protagonismo & Diálogo Consciente com a Equipe de Saúde.
7. **Conteúdo do Curso (9 Módulos)**:
   - Apresentação em cards no desktop e accordion no mobile com os 9 módulos catalogados (fisiologia, trabalho de parto, alívio da dor, acompanhante, direitos, plano de parto, pós-parto e amamentação).
8. **Bônus Especiais (7 Bônus)**:
   - Cards visuais com tag "BÔNUS INCLUÍDO": Guias práticos, exercícios respiratórios, modelos de plano de parto e materiais complementares.
9. **Tabela de Comparação de Ofertas (Essencial vs. Completo)**:
   - Plano Essencial: R$ 297 à vista ou 10x (ao clicar, abre o Modal de Upgrade).
   - Plano Completo: R$ 397 à vista ou 10x (com tag visual "MAIS RECOMENDADO", inclui o WhatsApp direto com a Mariana).
10. **Modal de Upgrade Inteligente**:
    - Disparado ao clicar para comprar o Plano Essencial.
    - Proposta ética e transparente: "Leve o WhatsApp direto com a Mari Betioli por apenas +R$ 50 (50% OFF na diferença), totalizando R$ 347 ou 10x".
    - Botão primário para aceitar o upgrade e link discreto para prosseguir com o Essencial de R$ 297.
11. **Prova Social e Depoimentos**:
    - Carrossel mobile com suporte a swipe e grid desktop com relatos reais de mães que viveram partos conscientes e transformadores.
12. **Sobre Mari Betioli**:
    - Trajetória com 19 anos dedicados à assistência ao parto, experiência internacional (Brasil, Portugal, EUA), casas de parto, hospitais e parto domiciliar. Foto profissional e declaração de missão.
13. **Garantia Incondicional de 7 Dias**:
    - Selo de garantia sem burocracia, reforçando que a gestante pode entrar e assistir as primeiras aulas sem riscos.
14. **FAQ Completo**:
    - Accordion acessível com respostas sobre: SUS x particular, indicação para cesárea, acompanhante, acesso vitalício, suporte e formas de pagamento.
15. **CTA Final**:
    - "Você não precisa chegar ao parto sem saber o que esperar."
    - Botão de ação direta.
16. **Rodapé Completo**:
    - CNPJ/dados cadastrais, e-mail de suporte, links para Termos de Uso e Política de Privacidade, Direitos Autorais e o disclaimer educacional: "O conteúdo possui finalidade educacional e não substitui consultas, diagnóstico, orientação ou acompanhamento de profissionais de saúde."

### RASTREAMENTO, UTMS E ANALYTICS
- Preservar o container Google Tag Manager: `GTM-TKG2VFL6`.
- Utilitário de UTM passthrough para capturar `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` da URL e anexar automaticamente aos links de checkout da Hotmart.
- Disparos de eventos limpos no `window.dataLayer`: `page_view`, `cta_click`, `plan_selected`, `upgrade_modal_view`, `upgrade_accepted`, `checkout_redirect`, `faq_open`.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://birth-journey-guide-vsl1.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e972a872-f657-4344-b8e6-cab1a5618fee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
