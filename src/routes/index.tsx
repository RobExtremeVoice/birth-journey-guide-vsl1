import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type DetailedHTMLProps, type HTMLAttributes } from "react";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  HeartHandshake,
  Menu,
  MessageCircleHeart,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { offerConfig } from "@/config/offers";
import { goToCheckout, trackEvent } from "@/lib/tracking";
import mariPortrait from "@/assets/mariana-betioli.png.asset.json";
import brandLogo from "@/assets/o-poder-do-parto.png.asset.json";
import brandLogoWhite from "@/assets/o-poder-do-parto-white.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O Poder do Parto | Preparação para um parto consciente" },
      { name: "description", content: "Prepare-se emocional, física e praticamente para viver o nascimento com mais consciência, confiança e protagonismo." },
      { property: "og:title", content: "O Poder do Parto | Preparação completa" },
      { property: "og:description", content: "Conhecimento e ferramentas práticas para gestantes e acompanhantes, no SUS ou na rede particular." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const modules: Array<[string, string, string]> = [
  ["01", "A jornada começa na gestação", "Como preparar corpo, mente e ambiente para as escolhas que virão."],
  ["02", "Fisiologia do parto", "Entenda hormônios, posições e os sinais naturais do corpo."],
  ["03", "Trabalho de parto", "Fases, contrações e o momento mais seguro de ir à maternidade."],
  ["04", "Alívio da dor", "Recursos não farmacológicos, respiração, movimento e conforto."],
  ["05", "Acompanhante ativo", "Como oferecer apoio emocional e prático em cada etapa."],
  ["06", "Intervenções e escolhas", "Informação para conversar com clareza sobre condutas e alternativas."],
  ["07", "Direitos e plano de parto", "Como construir preferências e dialogar com a equipe de saúde."],
  ["08", "Nascimento e primeiras horas", "Contato pele a pele, primeiros cuidados e acolhimento do bebê."],
  ["09", "Pós-parto e amamentação", "Uma preparação realista para o puerpério e os primeiros dias."],
];

const bonuses: Array<[string, string, string]> = [
  ["Guia prático", "Quando ir à maternidade", "Um checklist objetivo para reconhecer sinais e organizar a saída."],
  ["Áudios guiados", "Respiração e relaxamento", "Práticas curtas para treinar durante a gestação e usar no trabalho de parto."],
  ["Modelo editável", "Plano de parto", "Estrutura para registrar preferências e facilitar o diálogo com a equipe."],
  ["Checklist", "Mala da maternidade", "O essencial para gestante, bebê e acompanhante, sem excessos."],
  ["Guia do acompanhante", "Presença que faz diferença", "Orientações para apoio físico, emocional e comunicação."],
  ["Material de apoio", "Direitos da parturiente", "Referências práticas para conhecer direitos e fazer perguntas melhores."],
  ["Aula especial", "Primeiras horas com o bebê", "Acolhimento, vínculo e decisões comuns logo após o nascimento."],
];

const painPoints = [
  "Não saber se já é a hora de ir para a maternidade",
  "Sentir medo de intervenções que você não compreende",
  "Ter um acompanhante que quer ajudar, mas não sabe como",
  "Não conseguir organizar e comunicar seu plano de parto",
  "Chegar ao nascimento sem conhecer seus direitos e escolhas",
];

const faqs: Array<[string, string]> = [
  ["O curso serve para quem terá o bebê pelo SUS?", "Sim. O conteúdo foi pensado para preparar gestantes e acompanhantes tanto para o SUS quanto para a rede particular, respeitando os diferentes contextos de assistência."],
  ["E se eu tiver indicação de cesárea?", "O curso também ajuda você a compreender o nascimento, preparar-se para conversar com a equipe e viver a experiência com mais consciência. As decisões médicas devem sempre ser tomadas com seus profissionais de saúde."],
  ["Meu acompanhante também pode assistir?", "Sim. Há conteúdos específicos para que a pessoa escolhida saiba acolher, apoiar e participar de forma ativa."],
  ["Por quanto tempo terei acesso?", "O acesso é vitalício, para que você assista no seu ritmo e retome as aulas sempre que precisar."],
  ["Como funciona o suporte?", "O plano Completo inclui comunicação direta pelo WhatsApp da Mariana Betioli. O plano Essencial inclui todo o conteúdo e os materiais do curso."],
  ["Quais são as formas de pagamento?", "A compra é processada pela Hotmart, com pagamento à vista ou parcelado em até 12 vezes, conforme as condições exibidas no checkout."],
];

function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14"><p className={`mb-3 text-xs font-extrabold uppercase ${light ? "text-warm" : "text-primary"}`}>{eyebrow}</p><h2 className={`text-3xl font-extrabold leading-tight md:text-5xl ${light ? "text-primary-foreground" : "text-plum"}`}>{title}</h2>{text && <p className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{text}</p>}</div>;
}

function Brand({ light = false }: { light?: boolean }) {
  const logo = light ? brandLogoWhite : brandLogo;
  return <a href="#inicio" className="inline-flex shrink-0" aria-label="O Poder do Parto — início"><img src={logo.url} alt="O Poder do Parto" width={1600} height={531} className="h-10 w-auto object-contain md:h-12" /></a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [orderBumpOpen, setOrderBumpOpen] = useState(false);
  const [testimonial, setTestimonial] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    trackEvent("page_view", { page_path: window.location.pathname });
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6a288cff68519b4d1b50bf92/v4/player.js";
    script.async = true;
    script.onload = () => setVideoReady(true);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const scrollToOffers = (location: string) => {
    trackEvent("cta_click", { location });
    document.getElementById("ofertas")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const chooseEssential = () => {
    trackEvent("plan_selected", { plan: "essential" });
    trackEvent("upgrade_modal_view", { from_plan: "essential" });
    setUpgradeOpen(true);
  };

  const showCompleteOrderBump = (source: string) => {
    trackEvent("plan_selected", { plan: "complete", source });
    trackEvent("order_bump_view", { product: "guia_18_perguntas", price: offerConfig.orderBump.price });
    setUpgradeOpen(false);
    setOrderBumpOpen(true);
  };

  const testimonials: Array<[string, string]> = [
    ["Camila, mãe da Helena", "Eu deixei de imaginar apenas cenários assustadores. Cheguei mais calma, entendendo o que meu corpo estava fazendo e o que eu poderia perguntar."],
    ["Renata e Guilherme", "Meu companheiro saiu do papel de espectador. Ele sabia como me apoiar, como conversar com a equipe e como proteger aquele momento."],
    ["Juliana, mãe do Theo", "O plano de parto organizou nossas escolhas. Mesmo quando o nascimento tomou outro caminho, eu me senti ouvida e participante."],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-plum px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">Preparação completa para gestantes e seus acompanhantes • SUS e Particular</div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:h-20 md:px-8">
          <Brand />
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Navegação principal">
            {[['Módulos','modulos'],['Método','metodo'],['Bônus','bonus'],['Mari Betioli','mari']].map(([label,id]) => <a key={id} href={`#${id}`} className="hover:text-primary">{label}</a>)}
            <Button className="h-11 rounded-full px-6 font-bold" onClick={() => scrollToOffers("navbar")}>Garantir vaga <ArrowRight /></Button>
          </nav>
          <Button variant="ghost" size="icon" className="size-11 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t bg-background px-4 py-5 lg:hidden">{[['Módulos','modulos'],['Método','metodo'],['Bônus','bonus'],['Mari Betioli','mari']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b py-3 font-semibold">{label}</a>)}<Button className="mt-4 h-12 w-full rounded-full" onClick={() => scrollToOffers("mobile_nav")}>Garantir vaga</Button></nav>}
      </header>

      <main>
        <section id="inicio" className="relative px-4 pb-14 pt-6 md:px-8 md:pb-20 md:pt-8">
          <div className="absolute inset-x-0 top-0 -z-10 h-3/4 bg-gradient-to-b from-secondary/80 to-background" />
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-[11px] font-bold text-primary md:text-xs"><Sparkles className="size-3.5" />Informação transforma medo em escolha</div>
            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-plum md:text-4xl lg:text-5xl">Prepare-se para viver o nascimento do seu bebê com mais consciência, confiança e protagonismo</h1>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">Da gestação ao pós-parto: entenda o trabalho de parto, conheça seus direitos e prepare um acompanhante verdadeiramente ativo.</p>
            <div className="relative mx-auto mt-5 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border-4 border-background bg-plum shadow-2xl">
              <vturb-smartplayer id="vid-6a288cff68519b4d1b50bf92" className="block h-full w-full" />
              {!videoReady && <div className="absolute inset-0 grid place-items-center bg-plum text-primary-foreground"><div className="text-center"><span className="mx-auto grid size-20 place-items-center rounded-full bg-accent shadow-lg"><Play className="ml-1 size-8 fill-current" /></span><p className="mt-4 text-sm font-semibold">O vídeo está carregando...</p></div></div>}
            </div>
            <Button onClick={() => scrollToOffers("hero")} className="mt-6 min-h-14 w-full rounded-2xl bg-accent px-6 text-sm font-extrabold shadow-xl hover:bg-accent/90 sm:w-auto sm:text-base">QUERO ME PREPARAR PARA O MEU PARTO <ArrowRight /></Button>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Acesso vitalício • Garantia de 7 dias • No seu próprio ritmo</p>
          </div>
        </section>

        <section className="bg-plum px-4 py-16 text-primary-foreground md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl"><SectionTitle light eyebrow="Você não está sozinha" title="Você deseja viver esse momento com mais segurança e menos medo?" text="É comum sentir insegurança diante do desconhecido. Preparação não é controlar o parto — é chegar com recursos para compreender, perguntar e participar." />
            <div className="grid gap-3 md:grid-cols-5">{painPoints.map((item, i) => <div key={item} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-5"><span className="mb-5 block text-3xl font-extrabold text-warm">0{i + 1}</span><p className="font-semibold leading-relaxed">{item}</p></div>)}</div>
          </div>
        </section>

        <section className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="A transformação" title="Informação muda a forma como você atravessa essa experiência" />
          <div className="grid overflow-hidden rounded-2xl border bg-card shadow-sm md:grid-cols-2">
            <div className="p-7 md:p-10"><p className="mb-6 text-sm font-extrabold uppercase text-muted-foreground">Sem preparação</p>{["Medo do que pode acontecer", "Dúvidas que ficam sem resposta", "Acompanhante inseguro", "Preferências difíceis de comunicar"].map(x => <p key={x} className="mb-4 flex gap-3 text-muted-foreground"><X className="mt-0.5 size-5 shrink-0 text-destructive" />{x}</p>)}</div>
            <div className="bg-secondary p-7 md:p-10"><p className="mb-6 text-sm font-extrabold uppercase text-primary">Com O Poder do Parto</p>{["Conhecimento para reconhecer cada fase", "Recursos práticos de conforto", "Acompanhante preparado e presente", "Plano alinhado e diálogo consciente"].map(x => <p key={x} className="mb-4 flex gap-3 font-semibold text-plum"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{x}</p>)}</div>
          </div>
          </div>
        </section>

        <section id="metodo" className="bg-muted px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="O método" title="Três pilares para uma preparação completa" text="Ciência, prática e diálogo — sem fórmulas mágicas e sem substituir seu acompanhamento pré-natal." />
          <div className="grid gap-5 md:grid-cols-3">{[[BookOpen,"Conhecimento fisiológico e científico","Entenda o que acontece no corpo e reconheça as fases do nascimento."],[HeartHandshake,"Preparação prática","Corpo, mente, alívio da dor e plano de parto em ferramentas aplicáveis."],[MessageCircleHeart,"Protagonismo e diálogo","Construa perguntas, preferências e conversas mais conscientes com sua equipe."]].map(([Icon,title,text],i) => { const IconComponent = Icon as typeof BookOpen; return <article key={String(title)} className="rounded-2xl border bg-background p-7"><div className="mb-7 grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><IconComponent className="size-7" /></div><span className="text-xs font-bold text-warm">PILAR {i+1}</span><h3 className="mt-2 text-xl font-extrabold text-plum">{String(title)}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{String(text)}</p></article>})}</div>
        </div></section>

        <section id="modulos" className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Por dentro do curso" title="9 módulos, mais de 70 aulas, uma jornada completa" text="Conteúdo direto e acolhedor para assistir no seu ritmo, desde a gestação até os primeiros dias com o bebê." />
          <div className="md:hidden"><Accordion type="single" collapsible className="rounded-2xl border bg-card px-5">{modules.map(([n,t,d]) => <AccordionItem key={n} value={n}><AccordionTrigger className="text-left text-base font-bold text-plum"><span className="mr-3 text-primary">{n}</span>{t}</AccordionTrigger><AccordionContent className="pl-9 leading-relaxed text-muted-foreground">{d}</AccordionContent></AccordionItem>)}</Accordion></div>
          <div className="hidden grid-cols-3 gap-4 md:grid">{modules.map(([n,t,d]) => <article key={n} className="rounded-2xl border bg-card p-6 transition-transform hover:-translate-y-1"><span className="text-3xl font-extrabold text-secondary-foreground">{n}</span><h3 className="mt-5 text-lg font-bold text-plum">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p></article>)}</div>
        </div></section>

        <section id="bonus" className="bg-plum px-4 py-16 text-primary-foreground md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle light eyebrow="Ainda tem mais" title="7 bônus para levar o conteúdo à prática" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{bonuses.map(([tag,title,text],i) => <article key={title} className={`rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-6 ${i === 6 ? "lg:col-span-2" : ""}`}><span className="inline-flex rounded-full bg-warm px-3 py-1 text-[10px] font-extrabold text-plum">BÔNUS INCLUÍDO</span><p className="mt-5 text-xs font-bold uppercase text-warm-soft">{tag}</p><h3 className="mt-2 text-lg font-extrabold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{text}</p></article>)}</div>
        </div></section>

        <section id="ofertas" className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-5xl"><SectionTitle eyebrow="Escolha sua experiência" title="Comece hoje a sua preparação" text="Os dois planos incluem o curso completo, bônus, materiais e acesso vitalício." />
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            <PlanCard plan="essential" onChoose={chooseEssential} />
            <PlanCard plan="complete" featured onChoose={() => showCompleteOrderBump("pricing")} />
          </div><p className="mt-5 text-center text-xs text-muted-foreground">*Parcelamento com acréscimo da plataforma. Consulte as condições no checkout.</p>
        </div></section>

        <section className="bg-secondary px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Histórias de transformação" title="Mais presença, clareza e confiança para o grande dia" />
          <div className="hidden gap-5 md:grid md:grid-cols-3">{testimonials.map(([name,quote]) => <Testimonial key={name} name={name} quote={quote} />)}</div>
          <div className="md:hidden"><Testimonial name={testimonials[testimonial]?.[0] ?? ""} quote={testimonials[testimonial]?.[1] ?? ""} /><div className="mt-5 flex justify-center gap-3"><Button variant="outline" size="icon" className="rounded-full" onClick={() => setTestimonial((testimonial + 2) % 3)} aria-label="Depoimento anterior"><ChevronLeft /></Button><Button variant="outline" size="icon" className="rounded-full" onClick={() => setTestimonial((testimonial + 1) % 3)} aria-label="Próximo depoimento"><ChevronRight /></Button></div></div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Relatos ilustrativos da transformação proporcionada pela preparação; substitua por depoimentos autorizados antes da publicação.</p>
        </div></section>

        <section id="mari" className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="relative"><div className="absolute -inset-3 -z-10 rounded-2xl bg-secondary" /><img src={mariPortrait.url} alt="Mariana Betioli, especialista em preparação para o parto" loading="lazy" width={294} height={300} className="aspect-[4/5] w-full rounded-2xl object-cover" /></div>
          <div><p className="text-xs font-extrabold uppercase text-primary">Sua especialista</p><h2 className="mt-3 text-4xl font-extrabold text-plum md:text-5xl">Mari Betioli</h2><p className="mt-3 text-lg font-bold text-primary">19 anos dedicados à assistência ao parto e à saúde da mulher</p><p className="mt-6 leading-relaxed text-muted-foreground">Com experiência no Brasil, em Portugal e nos Estados Unidos, Mariana acompanhou mulheres em casas de parto, hospitais e partos domiciliares. Sua missão é tornar o conhecimento acessível para que cada família participe do nascimento com mais consciência e respeito.</p><blockquote className="mt-7 border-l-4 border-warm pl-5 text-xl font-semibold leading-relaxed text-plum">“Preparar-se não é buscar um parto perfeito. É construir recursos para viver cada escolha com informação, apoio e protagonismo.”</blockquote></div>
        </div></section>

        <section className="bg-warm-soft px-4 py-14 md:px-8"><div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center md:flex-row md:text-left"><div className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-primary bg-background text-primary"><ShieldCheck className="size-12" /></div><div><p className="text-xs font-extrabold uppercase text-primary">Seu risco é zero</p><h2 className="mt-2 text-3xl font-extrabold text-plum">Garantia incondicional de 7 dias</h2><p className="mt-3 leading-relaxed text-muted-foreground">Entre, assista às primeiras aulas e conheça a metodologia. Se o curso não fizer sentido para você, solicite o reembolso dentro do prazo, sem burocracia.</p></div></div></section>

        <section className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><SectionTitle eyebrow="Dúvidas frequentes" title="Tudo o que você precisa saber" />
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5 md:px-8" onValueChange={(value) => value && trackEvent("faq_open", { question: value })}>{faqs.map(([q,a],i) => <AccordionItem key={q} value={`faq_${i+1}`}><AccordionTrigger className="py-5 text-base font-bold text-plum md:text-lg">{q}</AccordionTrigger><AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion>
        </div></section>

        <section className="bg-plum px-4 py-16 text-center text-primary-foreground md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><Baby className="mx-auto size-12 text-warm" /><h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">Você não precisa chegar ao parto sem saber o que esperar.</h2><p className="mx-auto mt-5 max-w-2xl text-primary-foreground/75 md:text-lg">Prepare-se com informação confiável, ferramentas práticas e acolhimento para viver esse momento com mais segurança.</p><Button onClick={() => scrollToOffers("final_cta")} className="mt-8 min-h-14 w-full rounded-2xl bg-accent px-7 font-extrabold hover:bg-accent/90 sm:w-auto">QUERO COMEÇAR AGORA <ArrowRight /></Button></div></section>
      </main>

      <footer className="bg-foreground px-4 py-12 text-background/70 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><Brand light /><p className="mt-4 max-w-sm text-sm leading-relaxed">Educação para uma experiência de nascimento mais consciente, respeitosa e informada.</p></div><div><p className="font-bold text-background">Atendimento</p><p className="mt-3 text-sm">Suporte: atendimento@poderdoparto.com.br</p><p className="mt-2 text-sm">Dados cadastrais e CNPJ: consulte no checkout</p></div><div><p className="font-bold text-background">Informações legais</p><div className="mt-3 flex gap-4 text-sm"><a href="https://www.poderdoparto.com.br/termos" className="underline">Termos de Uso</a><a href="https://www.poderdoparto.com.br/privacidade" className="underline">Política de Privacidade</a></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-background/15 pt-7 text-xs leading-relaxed"><p>O conteúdo possui finalidade educacional e não substitui consultas, diagnóstico, orientação ou acompanhamento de profissionais de saúde. © 2026 O Poder do Parto. Todos os direitos reservados.</p></div></footer>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}><DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-primary/20 p-7 md:p-9"><div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary"><MessageCircleHeart className="size-7" /></div><DialogTitle className="text-center text-2xl font-extrabold leading-tight text-plum">{offerConfig.upgradeModal.title}</DialogTitle><DialogDescription className="text-center text-base leading-relaxed">{offerConfig.upgradeModal.subtitle}</DialogDescription><div className="rounded-2xl bg-secondary p-5 text-center"><p className="text-sm font-semibold text-primary">Adicione o suporte direto por apenas</p><p className="mt-1 text-4xl font-extrabold text-plum">+ R$ {offerConfig.upgradeModal.differencePrice}</p><p className="mt-2 font-bold text-plum">Total R$ {offerConfig.upgradeModal.totalPrice} • {offerConfig.upgradeModal.installments}</p></div><p className="flex gap-3 text-sm leading-relaxed"><CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />{offerConfig.upgradeModal.includedBenefit}</p><Button className="min-h-14 rounded-2xl bg-accent font-extrabold hover:bg-accent/90" onClick={() => { trackEvent("upgrade_accepted", { total_price: 347 }); goToCheckout(offerConfig.upgradeModal.upgradeCheckoutUrl, "essential_upgrade"); }}>SIM, QUERO O PLANO COMPLETO</Button><DialogClose asChild><Button variant="link" className="h-auto whitespace-normal text-sm text-muted-foreground" onClick={() => goToCheckout(offerConfig.essential.checkoutUrl, "essential")}>Não, obrigada. Continuar apenas com o Essencial por R$ 297</Button></DialogClose></DialogContent></Dialog>

      <Dialog open={orderBumpOpen} onOpenChange={setOrderBumpOpen}><DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-primary/20 p-7 md:p-9"><div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary"><BookOpen className="size-7" /></div><DialogTitle className="text-center text-2xl font-extrabold leading-tight text-plum">{offerConfig.orderBump.title}</DialogTitle><DialogDescription className="text-center text-base leading-relaxed">Antes de continuar, adicione este material objetivo ao seu Plano Completo.</DialogDescription><div className="rounded-2xl border border-primary/20 bg-secondary p-5"><p className="text-center text-lg font-extrabold leading-snug text-plum">{offerConfig.orderBump.name}</p><p className="mt-3 text-center text-4xl font-extrabold text-primary">R$ {offerConfig.orderBump.price},00</p></div><p className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />Leve perguntas essenciais organizadas para conversar com seu obstetra com mais clareza.</p><Button className="min-h-14 whitespace-normal rounded-2xl bg-accent font-extrabold hover:bg-accent/90" onClick={() => { trackEvent("order_bump_accepted", { product: "guia_18_perguntas", price: 27 }); goToCheckout(offerConfig.orderBump.checkoutUrl, "complete_with_guide"); }}>SIM, QUERO ADICIONAR O GUIA POR R$ 27</Button><DialogClose asChild><Button variant="link" className="h-auto whitespace-normal text-sm text-muted-foreground" onClick={() => { trackEvent("order_bump_declined", { product: "guia_18_perguntas" }); goToCheckout(offerConfig.complete.checkoutUrl, "complete"); }}>Não, obrigada. Continuar somente com o Plano Completo</Button></DialogClose></DialogContent></Dialog>
    </div>
  );
}

function PlanCard({ plan, featured = false, onChoose }: { plan: "essential" | "complete"; featured?: boolean; onChoose: () => void }) {
  const data = offerConfig[plan];
  return <article className={`relative flex flex-col rounded-2xl border-2 p-7 md:p-9 ${featured ? "border-primary bg-plum text-primary-foreground shadow-2xl" : "border-border bg-card"}`}>{featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-warm px-4 py-2 text-xs font-extrabold text-plum">{offerConfig.complete.tag}</span>}<p className={`text-sm font-bold ${featured ? "text-warm" : "text-primary"}`}>{plan === "complete" ? "CURSO + SUPORTE DIRETO" : "CURSO COMPLETO"}</p><h3 className="mt-2 text-2xl font-extrabold">{data.name}</h3><div className="mt-7"><span className="text-sm">R$</span> <span className="text-5xl font-extrabold">{data.price}</span> <span className="text-sm">à vista</span><p className="mt-1 font-semibold">ou {data.installments}</p></div><div className="my-7 h-px bg-current opacity-15" /><ul className="flex-1 space-y-4">{data.features.map(feature => <li key={feature} className="flex gap-3 text-sm leading-relaxed"><Check className={`mt-0.5 size-5 shrink-0 ${featured ? "text-warm" : "text-primary"}`} />{feature}</li>)}</ul><Button onClick={onChoose} variant={featured ? "default" : "outline"} className={`mt-8 min-h-14 rounded-2xl font-extrabold ${featured ? "bg-accent text-primary-foreground hover:bg-accent/90" : "border-primary text-primary hover:bg-secondary"}`}>{featured ? "QUERO O PLANO COMPLETO" : "QUERO O PLANO ESSENCIAL"}</Button></article>;
}

function Testimonial({ name, quote }: { name: string; quote: string }) {
  return <blockquote className="h-full rounded-2xl border bg-background p-7"><div className="text-xl text-warm">★★★★★</div><p className="mt-5 leading-relaxed text-foreground">“{quote}”</p><footer className="mt-6 text-sm font-extrabold text-primary">{name}</footer></blockquote>;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}