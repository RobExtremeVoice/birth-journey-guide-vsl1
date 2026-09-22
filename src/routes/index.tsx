import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type DetailedHTMLProps, type HTMLAttributes } from "react";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  CircleCheck,
  HeartHandshake,
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
import testimonial1 from "@/assets/testimonials/testimonial-1.jpg.asset.json";
import testimonial2 from "@/assets/testimonials/testimonial-2.jpg.asset.json";
import testimonial3 from "@/assets/testimonials/testimonial-3.jpg.asset.json";
import testimonial4 from "@/assets/testimonials/testimonial-4.jpg.asset.json";
import testimonial5 from "@/assets/testimonials/testimonial-5.jpg.asset.json";
import testimonial6 from "@/assets/testimonials/testimonial-6.jpg.asset.json";
import testimonial7 from "@/assets/testimonials/testimonial-7.jpg.asset.json";
import testimonial8 from "@/assets/testimonials/testimonial-8.jpg.asset.json";
import testimonial9 from "@/assets/testimonials/testimonial-9.jpg.asset.json";
import videoPoster from "@/assets/video-poster.webp.asset.json";
import module1 from "@/assets/course/modulo-1.jpg.asset.json";
import module2 from "@/assets/course/modulo-2.jpg.asset.json";
import module3 from "@/assets/course/modulo-3.jpg.asset.json";
import module4 from "@/assets/course/modulo-4.jpg.asset.json";
import module6 from "@/assets/course/modulo-6.jpg.asset.json";
import module7 from "@/assets/course/modulo-7.jpg.asset.json";
import module8 from "@/assets/course/modulo-8.jpg.asset.json";
import bonus1 from "@/assets/course/bonus-1.jpg.asset.json";
import bonus2 from "@/assets/course/bonus-2.jpg.asset.json";
import bonus3 from "@/assets/course/bonus-3.jpg.asset.json";
import bonus4 from "@/assets/course/bonus-4.jpg.asset.json";
import bonus5 from "@/assets/course/bonus-5.jpg.asset.json";
import bonus6 from "@/assets/course/bonus-6.jpg.asset.json";
import bonus7 from "@/assets/course/bonus-7.jpg.asset.json";

const VIDEO_SCRIPT_URL = "https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6a288cff68519b4d1b50bf92/v4/player.js";

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
    links: [{ rel: "preload", as: "image", href: videoPoster.url, fetchPriority: "high" }],
  }),
  component: Index,
});

const modules = [
  ["Módulo 1", "Primeiros Passos", "Entenda tudo sobre a jornada que está começando.", module1.url],
  ["Módulo 2", "A Realidade do Parto", "Descubra como funciona o sistema e garanta um parto respeitoso.", module2.url],
  ["Módulo 3", "Preparo Emocional", "Trabalhe o medo, a ansiedade e fortaleça sua confiança.", module3.url],
  ["Módulo 4", "Como Funciona o Parto", "Identifique e saiba o que fazer em cada fase do trabalho de parto.", module4.url],
  ["Módulo 5", "O Corpo na Gravidez", "Cuide de si e prepare-se fisicamente para o parto.", module4.url],
  ["Módulo 6", "Indução & Cesárea", "Entenda indicações, intervenções e parto normal após cesárea.", module6.url],
  ["Módulo 7", "Técnicas de Alívio da Dor", "Respiração, massagem, acupressão e outros métodos naturais.", module7.url],
  ["Módulo 8", "Plano de Parto", "Crie um plano de parto que funciona e seja respeitado.", module8.url],
] as const;

const bonuses = [
  ["Bônus 1", "Posições para encaixar o bebê", bonus1.url],
  ["Bônus 2", "Massagem com convidada especialista", bonus2.url],
  ["Bônus 3", "Preparando o seu acompanhante", bonus3.url],
  ["Bônus 4", "Comunidade no WhatsApp", bonus4.url],
  ["Bônus 5", "O pós-parto", bonus5.url],
  ["Bônus 6", "Respiração na gravidez e no parto", bonus6.url],
  ["Bônus 7", "10 ensinamentos para o bebê dormir melhor", bonus7.url],
];

const painPoints = [
  "Não saber se já é a hora de ir para a maternidade",
  "Sentir medo de intervenções que você não compreende",
  "Ter um acompanhante que quer ajudar, mas não sabe como",
  "Não conseguir organizar e comunicar seu plano de parto",
  "Chegar ao nascimento sem conhecer seus direitos e escolhas",
];

const testimonials = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6, testimonial7, testimonial8, testimonial9];

const comparison = [
  ["Curso O Poder do Parto", true, true],
  ["8 módulos de preparação", true, true],
  ["Acesso vitalício", true, true],
  ["Mari com Você: canal direto pelo WhatsApp", false, true],
  ["Mensagens de texto e áudio", false, true],
  ["Acompanhamento durante a gestação, até o parto", false, true],
] as const;

const faqs: Array<[string, string]> = [
  ["Qual é a diferença entre Essencial e Completo?", "O Essencial dá acesso ao curso O Poder do Parto. O Completo inclui todo o conteúdo do Essencial e também o Mari com Você: um canal direto pelo WhatsApp para falar com a Mari durante a gestação, até o parto."],
  ["Por quanto tempo tenho acesso?", "Os dois planos foram estruturados com acesso vitalício, para você rever o conteúdo sempre que precisar."],
  ["Posso fazer mesmo estando no final da gestação?", "Sim. As aulas são organizadas para você priorizar os temas mais importantes conforme o momento da sua gestação."],
  ["O curso substitui o acompanhamento médico?", "Não. O conteúdo é educativo e não substitui pré-natal, consulta, diagnóstico ou orientação da equipe responsável pela sua assistência."],
  ["Como funciona a garantia?", "Você tem sete dias após a compra para conhecer o conteúdo e solicitar o reembolso, conforme as condições apresentadas no checkout."],
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
  const [videoStatus, setVideoStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [slowConnection, setSlowConnection] = useState(false);

  useEffect(() => {
    trackEvent("page_view", { page_path: window.location.pathname });
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setSlowConnection(Boolean(connection?.saveData || connection?.effectiveType?.includes("2g")));
  }, []);

  const loadVideo = () => {
    if (videoStatus === "loading" || videoStatus === "ready") return;
    setVideoStatus("loading");
    trackEvent("video_load_requested", { connection: slowConnection ? "slow_or_data_saver" : "standard" });

    const finishLoading = () => {
      window.customElements.whenDefined("vturb-smartplayer").then(() => setVideoStatus("ready"));
    };
    if (window.customElements.get("vturb-smartplayer")) {
      setVideoStatus("ready");
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${VIDEO_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", finishLoading, { once: true });
      existingScript.addEventListener("error", () => setVideoStatus("error"), { once: true });
    } else {
      const script = document.createElement("script");
      script.src = VIDEO_SCRIPT_URL;
      script.async = true;
      script.onload = finishLoading;
      script.onerror = () => setVideoStatus("error");
      document.head.appendChild(script);
    }

    window.setTimeout(() => {
      if (!window.customElements.get("vturb-smartplayer")) setVideoStatus("error");
    }, 15000);
  };

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-plum px-4 py-2 text-center text-xs font-semibold text-primary-foreground sm:text-sm">Preparação completa para gestantes e seus acompanhantes • SUS e Particular</div>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:h-20 md:px-8">
          <Brand />
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Navegação principal">
            <Button className="h-11 rounded-full px-6 font-bold" onClick={() => scrollToOffers("navbar")}>Garantir vaga <ArrowRight /></Button>
          </nav>
          <Button variant="ghost" size="icon" className="size-11 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t bg-background px-4 py-5 lg:hidden"><Button className="mt-4 h-12 w-full rounded-full" onClick={() => scrollToOffers("mobile_nav")}>Garantir vaga</Button></nav>}
      </header>

      <main>
        <section id="inicio" className="relative px-4 pb-14 pt-3 md:px-8 md:pb-20 md:pt-3">
          <div className="absolute inset-x-0 top-0 -z-10 h-3/4 bg-gradient-to-b from-secondary/80 to-background" />
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1 text-[11px] font-bold text-primary"><Sparkles className="size-3.5" />Informação transforma medo em escolha</div>
            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-plum lg:text-4xl">Prepare-se para viver o nascimento do seu bebê com mais consciência, confiança e protagonismo</h1>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">Da gestação ao pós-parto: entenda o trabalho de parto, conheça seus direitos e prepare um acompanhante verdadeiramente ativo.</p>
            <div className="relative mx-auto mt-3 aspect-video w-full max-w-[38rem] overflow-hidden rounded-2xl border-4 border-background bg-plum shadow-2xl">
              {videoStatus !== "idle" && <vturb-smartplayer id="vid-6a288cff68519b4d1b50bf92" className="block h-full w-full" />}
              {videoStatus !== "ready" && <div className="absolute inset-0 bg-plum text-primary-foreground">
                <img src={videoPoster.url} alt="Mariana Betioli apresentando O Poder do Parto" width={640} height={360} fetchPriority="high" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-foreground/25" />
                <div className="absolute inset-0 grid place-items-center px-4">
                  {videoStatus === "loading" ? <div className="text-center" role="status" aria-live="polite"><span className="mx-auto block size-10 animate-spin rounded-full border-4 border-primary-foreground/40 border-t-primary-foreground" /><p className="mt-3 text-sm font-bold">Preparando o vídeo...</p></div> : <Button type="button" variant="ghost" onClick={loadVideo} aria-label={videoStatus === "error" ? "Tentar carregar o vídeo novamente" : "Reproduzir vídeo: O Poder do Parto"} className="h-auto flex-col gap-2 rounded-xl p-3 text-primary-foreground hover:bg-foreground/20 hover:text-primary-foreground">
                    <span className="grid size-16 place-items-center rounded-full bg-accent shadow-lg"><Play className="ml-1 size-7 fill-current" /></span>
                    <span className="text-sm font-extrabold">{videoStatus === "error" ? "Tentar novamente" : "Assistir ao vídeo"}</span>
                  </Button>}
                </div>
                {slowConnection && videoStatus === "idle" && <p className="absolute inset-x-3 bottom-2 text-center text-[11px] font-semibold drop-shadow">Modo econômico: o vídeo só será carregado ao tocar em assistir.</p>}
                {videoStatus === "error" && <p className="absolute inset-x-3 bottom-2 text-center text-[11px] font-semibold drop-shadow">A conexão está lenta. A capa permanece disponível enquanto você tenta novamente.</p>}
              </div>}
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

        <section id="modulos" className="bg-muted px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Por dentro do curso" title="Uma preparação completa, passo a passo" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{modules.map(([number,title,description,image]) => <article key={number} className="overflow-hidden rounded-lg border bg-card shadow-sm"><div className="aspect-video w-full overflow-hidden bg-secondary"><img src={image} alt={`Capa do ${number}: ${title}`} width={1024} height={576} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div><div className="p-4 md:p-5"><span className="text-xs font-bold uppercase text-primary">{number}</span><h3 className="mt-1 text-lg font-extrabold text-plum">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div></article>)}</div>
        </div></section>

        <section id="bonus" className="bg-plum px-4 py-16 text-primary-foreground md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle light eyebrow="Bônus incríveis" title="Recursos extras para você se sentir ainda mais segura" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{bonuses.map(([number,title,image]) => <article key={number} className="overflow-hidden rounded-lg bg-primary-foreground/10"><div className="aspect-video w-full overflow-hidden bg-primary-foreground/10"><img src={image} alt={`Capa do ${number}: ${title}`} width={1600} height={900} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div><div className="p-3 text-center md:p-4"><p className="text-xs font-bold uppercase text-primary-foreground/90">{number}</p><h3 className="mt-1 text-sm font-bold leading-snug md:text-base">{title}</h3></div></article>)}</div>
        </div></section>

        <section className="bg-secondary px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Histórias de transformação" title="Depoimentos reais de quem se preparou para esse momento" />
          <div className="columns-2 gap-3 md:columns-3 md:gap-6">{testimonials.map((image, index) => <figure key={image.asset_id} className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-background shadow-sm md:mb-6"><img src={image.url} alt={`Depoimento real de aluna do O Poder do Parto ${index + 1}`} loading="lazy" className="h-auto w-full" /></figure>)}</div>
        </div></section>

        <section id="mari" className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="relative"><div className="absolute -inset-3 -z-10 rounded-2xl bg-secondary" /><img src={mariPortrait.url} alt="Mariana Betioli, especialista em preparação para o parto" loading="lazy" width={294} height={300} className="aspect-[4/5] w-full rounded-2xl object-cover" /></div>
          <div><p className="text-xs font-extrabold uppercase text-primary">Sua especialista</p><h2 className="mt-3 text-4xl font-extrabold text-plum md:text-5xl">Mari Betioli</h2><p className="mt-3 text-lg font-bold text-primary">19 anos dedicados à assistência ao parto e à saúde da mulher</p><p className="mt-6 leading-relaxed text-muted-foreground">Com experiência no Brasil, em Portugal e nos Estados Unidos, Mariana acompanhou mulheres em casas de parto, hospitais e partos domiciliares. Sua missão é tornar o conhecimento acessível para que cada família participe do nascimento com mais consciência e respeito.</p><blockquote className="mt-7 border-l-4 border-warm pl-5 text-xl font-semibold leading-relaxed text-plum">“Preparar-se não é buscar um parto perfeito. É construir recursos para viver cada escolha com informação, apoio e protagonismo.”</blockquote></div>
        </div></section>

        <section id="ofertas" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-5xl"><SectionTitle eyebrow="Escolha sua experiência" title="Qual preparação combina com você?" text="Os dois planos oferecem o curso completo. No plano Completo, você também conta com um canal direto com a Mari durante a gestação." />
          <div className="grid items-stretch gap-8 pt-3 md:grid-cols-2">
            <PlanCard plan="essential" onChoose={chooseEssential} />
            <PlanCard plan="complete" featured onChoose={() => showCompleteOrderBump("pricing")} />
          </div><p className="mt-5 text-center text-xs text-muted-foreground">*Parcelamento com acréscimo da plataforma. Consulte as condições no checkout.</p>
        </div></section>

        <section className="px-4 pb-16 md:px-8 md:pb-24"><div className="mx-auto max-w-5xl"><SectionTitle eyebrow="Compare com calma" title="Veja a diferença entre os planos" />
          <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <table className="w-full table-fixed text-left text-[0.78rem] sm:text-base">
              <caption className="sr-only">Comparação dos benefícios dos planos Essencial e Completo</caption>
              <colgroup><col className="w-[52%] sm:w-[47%]" /><col className="w-[24%] sm:w-[26.5%]" /><col className="w-[24%] sm:w-[26.5%]" /></colgroup>
              <thead className="bg-muted"><tr><th scope="col" className="p-3 font-bold sm:p-5">O que você recebe</th><th scope="col" className="border-l p-2 text-center font-bold sm:p-5">Essencial</th><th scope="col" className="border-l p-2 text-center font-bold sm:p-5">Completo</th></tr></thead>
              <tbody>{comparison.map(([label, essential, complete]) => <tr key={label} className="border-t"><th scope="row" className="p-3 font-medium leading-snug sm:p-5">{label}</th>{[essential, complete].map((included, index) => <td key={`${label}-${index}`} className="border-l p-2 text-center sm:p-5"><span className="sr-only">{included ? "Incluído" : "Não incluído"}</span>{included ? <Check className="mx-auto size-5 text-primary" strokeWidth={3} aria-hidden="true" /> : <span aria-hidden="true" className="text-muted-foreground">—</span>}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div></section>

        <section className="bg-warm-soft px-4 py-14 md:px-8"><div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center md:flex-row md:text-left"><div className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-primary bg-background text-primary"><ShieldCheck className="size-12" /></div><div><p className="text-xs font-extrabold uppercase text-primary">Seu risco é zero</p><h2 className="mt-2 text-3xl font-extrabold text-plum">Garantia incondicional de 7 dias</h2><p className="mt-3 leading-relaxed text-muted-foreground">Entre, assista às primeiras aulas e conheça a metodologia. Se o curso não fizer sentido para você, solicite o reembolso dentro do prazo, sem burocracia.</p></div></div></section>

        <section className="bg-muted px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><SectionTitle eyebrow="Dúvidas frequentes" title="Antes de escolher" />
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5 md:px-8" onValueChange={(value) => value && trackEvent("faq_open", { question: value })}>{faqs.map(([q,a],i) => <AccordionItem key={q} value={`faq_${i+1}`}><AccordionTrigger className="py-5 text-base font-bold text-plum md:text-lg">{q}</AccordionTrigger><AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion>
        </div></section>

        <section className="bg-plum px-4 py-16 text-center text-primary-foreground md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><Baby className="mx-auto size-12 text-warm" /><h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">Você não precisa chegar ao parto sem saber o que esperar.</h2><p className="mx-auto mt-5 max-w-2xl text-primary-foreground/75 md:text-lg">Prepare-se com informação confiável, ferramentas práticas e acolhimento para viver esse momento com mais segurança.</p><Button onClick={() => scrollToOffers("final_cta")} className="mt-8 min-h-14 w-full rounded-2xl bg-accent px-7 font-extrabold hover:bg-accent/90 sm:w-auto">QUERO COMEÇAR AGORA <ArrowRight /></Button></div></section>
      </main>

      <footer className="bg-foreground px-4 py-12 text-background/70 md:px-8"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3"><div><Brand light /><p className="mt-4 max-w-sm text-sm leading-relaxed">Educação para uma experiência de nascimento mais consciente, respeitosa e informada.</p></div><div><p className="font-bold text-background">Atendimento</p><p className="mt-3 text-sm">Suporte: atendimento@poderdoparto.com.br</p><p className="mt-2 text-sm">Dados cadastrais e CNPJ: consulte no checkout</p></div><div><p className="font-bold text-background">Informações legais</p><div className="mt-3 flex gap-4 text-sm"><a href="https://www.poderdoparto.com.br/termos" className="underline">Termos de Uso</a><a href="https://www.poderdoparto.com.br/privacidade" className="underline">Política de Privacidade</a></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-background/15 pt-7 text-xs leading-relaxed"><p>O conteúdo possui finalidade educacional e não substitui consultas, diagnóstico, orientação ou acompanhamento de profissionais de saúde. © 2026 O Poder do Parto. Todos os direitos reservados.</p></div></footer>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}><DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-primary/20 p-7 md:p-9"><div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary"><MessageCircleHeart className="size-7" /></div><DialogTitle className="text-center text-2xl font-extrabold leading-tight text-plum">{offerConfig.upgradeModal.title}</DialogTitle><DialogDescription className="text-center text-base leading-relaxed">{offerConfig.upgradeModal.subtitle}</DialogDescription><div className="rounded-2xl bg-secondary p-5 text-center"><p className="text-sm text-muted-foreground line-through">de R$ 97,00</p><p className="mt-1 text-4xl font-extrabold text-plum">por R$ {offerConfig.upgradeModal.differencePrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p><p className="mt-2 font-bold text-primary">50% de desconto</p></div><p className="flex gap-3 text-sm leading-relaxed"><CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />{offerConfig.upgradeModal.includedBenefit}</p><Button className="min-h-14 rounded-2xl bg-accent font-extrabold hover:bg-accent/90" onClick={() => { trackEvent("upgrade_accepted", { total_price: offerConfig.upgradeModal.totalPrice }); goToCheckout(offerConfig.upgradeModal.upgradeCheckoutUrl, "essential_upgrade"); }}>SIM, QUERO O PLANO COMPLETO</Button><DialogClose asChild><Button variant="link" className="h-auto whitespace-normal text-sm text-muted-foreground" onClick={() => goToCheckout(offerConfig.essential.checkoutUrl, "essential")}>Não, obrigada. Continuar apenas com o Essencial por R$ 297</Button></DialogClose></DialogContent></Dialog>

      <Dialog open={orderBumpOpen} onOpenChange={setOrderBumpOpen}><DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-primary/20 p-7 md:p-9"><div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary"><BookOpen className="size-7" /></div><DialogTitle className="text-center text-2xl font-extrabold leading-tight text-plum">{offerConfig.orderBump.title}</DialogTitle><DialogDescription className="text-center text-base leading-relaxed">Antes de continuar, adicione este material objetivo ao seu Plano Completo.</DialogDescription><div className="rounded-2xl border border-primary/20 bg-secondary p-5"><p className="text-center text-lg font-extrabold leading-snug text-plum">{offerConfig.orderBump.name}</p><p className="mt-3 text-center text-4xl font-extrabold text-primary">R$ {offerConfig.orderBump.price},00</p></div><p className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />Leve perguntas essenciais organizadas para conversar com seu obstetra com mais clareza.</p><Button className="min-h-14 whitespace-normal rounded-2xl bg-accent font-extrabold hover:bg-accent/90" onClick={() => { trackEvent("order_bump_accepted", { product: "guia_18_perguntas", price: 27 }); goToCheckout(offerConfig.orderBump.checkoutUrl, "complete_with_guide"); }}>SIM, QUERO ADICIONAR O GUIA POR R$ 27</Button><DialogClose asChild><Button variant="link" className="h-auto whitespace-normal text-sm text-muted-foreground" onClick={() => { trackEvent("order_bump_declined", { product: "guia_18_perguntas" }); goToCheckout(offerConfig.complete.checkoutUrl, "complete"); }}>Não, obrigada. Continuar somente com o Plano Completo</Button></DialogClose></DialogContent></Dialog>
    </div>
  );
}

function PlanCard({ plan, featured = false, onChoose }: { plan: "essential" | "complete"; featured?: boolean; onChoose: () => void }) {
  const data = offerConfig[plan];
  return <article className={`relative flex flex-col rounded-2xl border-2 p-7 md:p-9 ${featured ? "border-primary bg-plum text-primary-foreground shadow-2xl md:-translate-y-2" : "border-border bg-card"}`}>{featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-warm px-4 py-2 text-xs font-extrabold text-plum">{offerConfig.complete.tag}</span>}<p className={`text-sm font-bold ${featured ? "text-warm" : "text-primary"}`}>PLANO {plan === "complete" ? "COMPLETO" : "ESSENCIAL"}</p><h3 className="mt-2 text-2xl font-extrabold">{data.name}</h3><p className={`mt-3 text-sm leading-relaxed ${featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{plan === "complete" ? "Todo o curso e a tranquilidade de poder falar diretamente com a Mari durante a gestação." : "Para compreender o parto, reconhecer escolhas e chegar mais preparada."}</p><div className="mt-7"><div className="flex flex-wrap items-baseline gap-2"><span className="text-lg font-bold">{data.installmentCount}x</span><span className="text-4xl font-extrabold md:text-5xl">R$ {data.installmentPrice}*</span></div><p className="mt-2 text-sm">ou <strong>R$ {data.price},00</strong> à vista</p></div><div className="my-7 h-px bg-current opacity-15" /><ul className="flex-1 space-y-4">{data.features.map(feature => <li key={feature} className="flex gap-3 text-sm leading-relaxed"><Check className={`mt-0.5 size-5 shrink-0 ${featured ? "text-warm" : "text-primary"}`} />{feature}</li>)}</ul><Button onClick={onChoose} variant={featured ? "default" : "outline"} className={`mt-8 min-h-14 rounded-2xl font-extrabold ${featured ? "bg-accent text-primary-foreground hover:bg-accent/90" : "border-primary text-primary hover:bg-secondary"}`}>{featured ? "QUERO A PREPARAÇÃO COMPLETA" : "ESCOLHER O ESSENCIAL"}</Button><small className={`mt-3 text-center ${featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>Garantia incondicional de 7 dias</small></article>;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}