/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  Download, 
  Heart, 
  Mail, 
  MessageCircle, 
  Printer, 
  Scissors, 
  ShieldCheck, 
  Star, 
  Zap,
  ChevronRight,
  Lock
} from 'lucide-react';

// --- Components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 47,
    seconds: 8
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            } else {
              clearInterval(timer);
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex items-center justify-center gap-4 font-mono">
      <div className="flex flex-col items-center">
        <div className="bg-white text-rose-600 px-3 py-2 rounded-lg text-3xl md:text-4xl font-bold shadow-sm border border-rose-100">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-[10px] uppercase tracking-wider mt-1 text-rose-400 font-sans font-semibold">Horas</span>
      </div>
      <div className="text-3xl font-bold text-rose-300 mb-6">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-white text-rose-600 px-3 py-2 rounded-lg text-3xl md:text-4xl font-bold shadow-sm border border-rose-100">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-[10px] uppercase tracking-wider mt-1 text-rose-400 font-sans font-semibold">Minutos</span>
      </div>
      <div className="text-3xl font-bold text-rose-300 mb-6">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-white text-rose-600 px-3 py-2 rounded-lg text-3xl md:text-4xl font-bold shadow-sm border border-rose-100">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-[10px] uppercase tracking-wider mt-1 text-rose-400 font-sans font-semibold">Segundos</span>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, initial, text, time }: { name: string, initial: string, text: string, time: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
        {initial}
      </div>
      <div>
        <h4 className="font-bold text-slate-800 leading-tight">{name}</h4>
        <div className="flex gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
        </div>
      </div>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed italic">"{text}"</p>
    <span className="text-xs text-slate-400">{time}</span>
  </motion.div>
);

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-4">
      <Icon size={28} />
    </div>
    <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const BonusCard = ({ title, description, badge }: { title: string, description: string, badge: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-3xl border-2 border-amber-100 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-colors"
  >
    <div className="absolute top-0 right-0 bg-amber-400 text-white px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
      {badge}
    </div>
    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
      <Star size={24} fill="currentColor" />
    </div>
    <h3 className="font-bold text-slate-800 text-lg mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const PricingCard = ({ 
  title, 
  price, 
  originalPrice, 
  features, 
  isPremium = false,
  badge = "",
  link = "#"
}: { 
  title: string, 
  price: string, 
  originalPrice: string, 
  features: string[], 
  isPremium?: boolean,
  badge?: string,
  link?: string
}) => (
  <div className={`relative flex flex-col p-8 rounded-3xl border-2 ${isPremium ? 'border-rose-500 bg-white shadow-xl scale-105 z-10' : 'border-slate-100 bg-slate-50/50'}`}>
    {badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        {badge}
      </div>
    )}
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-slate-400 line-through text-sm">{originalPrice}</span>
        <div className="flex items-baseline">
          <span className="text-slate-800 font-bold text-lg">R$</span>
          <span className="text-slate-800 font-black text-5xl tracking-tight">{price}</span>
        </div>
      </div>
      <p className="text-slate-500 text-xs mt-1">Pagamento único</p>
    </div>

    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
          <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 group ${isPremium ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200' : 'bg-slate-800 text-white hover:bg-slate-900'}`}
    >
      Quero esse!
      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </a>
    <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
      <Zap size={10} className="text-emerald-500" />
      Acesso imediato após pagamento
    </p>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-rose-100 selection:text-rose-600">
      
      {/* Top Bar */}
      <div className="bg-rose-500 text-white py-2 text-center text-sm font-medium px-4">
        <span className="flex items-center justify-center gap-2">
          <Heart size={14} fill="currentColor" />
          +2.847 pessoas já baixaram e estão amando!
        </span>
      </div>

      {/* Hero Section */}
      <header className="relative pt-12 pb-20 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            Moldes de EVA prontos para imprimir
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight"
          >
            Crie Peças Incríveis em EVA Hoje: <br className="hidden md:block" />
            <span className="text-rose-500">Moldes Prontos para Imprimir e Recortar!</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Painéis, lembrancinhas, decoração de sala e muito mais, tudo pronto para recortar e montar. Economize horas de trabalho!
          </motion.p>

          {/* VSL Video */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-[320px] mx-auto mb-12 overflow-hidden rounded-3xl shadow-2xl border-4 border-white bg-slate-200"
          >
            <div className="aspect-[9/16] relative">
              <iframe 
                src="https://www.youtube.com/embed/AIty0Kaj9EM?autoplay=0&controls=1&rel=0"
                title="VSL Moldes EVA"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <Printer size={18} className="text-rose-400" />
              <span className="text-sm font-medium">Pronto pra imprimir</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <Scissors size={18} className="text-rose-400" />
              <span className="text-sm font-medium">Fácil de recortar</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <Download size={18} className="text-rose-400" />
              <span className="text-sm font-medium">Tamanho real</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a 
              href="#oferta"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white px-10 py-5 rounded-2xl text-xl font-black shadow-xl shadow-rose-200 transition-all hover:scale-105 active:scale-95 mb-4 w-full md:w-auto text-center"
            >
              Quero meus moldes agora!
            </a>
            <div className="flex items-center justify-center gap-4 text-slate-400 text-xs font-medium">
              <span className="flex items-center gap-1"><Zap size={14} className="text-amber-400" /> Acesso instantâneo</span>
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> Pagamento seguro</span>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Por que escolher nossos moldes?</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Feito para facilitar sua vida — funciona até para quem nunca usou EVA antes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard 
              icon={Clock}
              title="Economize horas"
              description="Moldes prontos que você imprime direto, sem precisar desenhar nada."
            />
            <BenefitCard 
              icon={Printer}
              title="Variedade enorme"
              description="Animais, números, letras, personagens e muito mais."
            />
            <BenefitCard 
              icon={Zap}
              title="Acesso imediato"
              description="Receba tudo no seu email segundos após o pagamento."
            />
            <BenefitCard 
              icon={Heart}
              title="Feito com carinho"
              description="Cada molde foi criado pensando em facilitar sua vida."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Olha o que estão dizendo</h2>
            <p className="text-slate-600 flex items-center justify-center gap-2">
              Feedback real de quem já está usando nossos moldes <Heart size={16} className="text-rose-500" fill="currentColor" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Maria Silva"
              initial="M"
              text="Gente, que moldes maravilhosos! Fiz o trabalho da minha filha em 15 minutos. Super recomendo! 😍"
              time="Ontem às 14:32"
            />
            <TestimonialCard 
              name="Carla Santos"
              initial="C"
              text="Professora há 12 anos e nunca vi moldes tão práticos assim. Valeu cada centavo!"
              time="Há 3 dias"
            />
            <TestimonialCard 
              name="Amanda Costa"
              initial="A"
              text="Comprei achando que era só mais um... mas NOSSA! A qualidade é incrível. Já imprimi vários 💚"
              time="Há 1 semana"
            />
            <TestimonialCard 
              name="Juliana Oliveira"
              initial="J"
              text="Meu filho amou os animaizinhos! Ficou lindo o mural da escola. Obrigada!"
              time="Há 2 dias"
            />
            <TestimonialCard 
              name="Patricia Lima"
              initial="P"
              text="Achei que seria complicado mas é muito fácil! Só imprimir, recortar e usar no EVA. Perfeito!"
              time="Há 4 dias"
            />
            <TestimonialCard 
              name="Fernanda Rocha"
              initial="F"
              text="Economizei HORAS do meu fim de semana. Não volto mais a desenhar moldes na mão 🙏"
              time="Há 5 dias"
            />
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Star size={14} fill="currentColor" />
              Presentes Exclusivos
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Bônus Especiais (Apenas no Pacote Premium)</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ao garantir o Pacote Premium hoje, você também leva esses bônus incríveis para acelerar seus resultados!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BonusCard 
              badge="Bônus 1"
              title="Guia de Montagem em Vídeo"
              description="Aprenda o passo a passo detalhado para montar suas peças com perfeição, do corte ao acabamento."
            />
            <BonusCard 
              badge="Bônus 2"
              title="Datas Comemorativas"
              description="Moldes exclusivos para Natal, Páscoa, Dia das Mães, Dia dos Pais e muito mais."
            />
            <BonusCard 
              badge="Bônus 3"
              title="Suporte Prioritário"
              description="Tire todas as suas dúvidas diretamente com nossa equipe de especialistas via WhatsApp ou E-mail."
            />
          </div>

          <div className="mt-16 text-center">
            <a 
              href="#oferta"
              className="inline-flex items-center gap-2 text-rose-500 font-bold hover:underline group"
            >
              Quero garantir meus bônus agora!
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-rose-500 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2">Aproveite enquanto está disponível</h2>
          <p className="text-rose-100 mb-8 font-medium">Preço promocional por tempo limitado. Depois, volta ao normal!</p>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 mb-6">
            <p className="text-sm font-bold uppercase tracking-widest mb-6 text-rose-100">Oferta por tempo limitado!</p>
            <CountdownTimer />
          </div>
          
          <p className="flex items-center justify-center gap-2 text-rose-100 font-medium">
            <Clock size={18} />
            ⏰ Depois disso, o preço volta ao normal
          </p>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
      </section>

      {/* Pricing Section */}
      <section id="oferta" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Pacote Standard"
              price="10,00"
              originalPrice="R$ 97,00"
              features={[
                "50+ moldes essenciais",
                "Animais, números e letras",
                "Tamanho A4 pronto pra imprimir",
                "Acesso vitalício",
                "Atualizações gratuitas"
              ]}
            />
            <PricingCard 
              title="Pacote Premium"
              price="29,90"
              originalPrice="R$ 197,00"
              isPremium={true}
              badge="Mais Completo"
              link="https://pay.lowify.com.br/checkout?product_id=fpN4CL"
              features={[
                "200+ moldes completos",
                "Animais, números, letras e personagens",
                "Moldes de datas comemorativas",
                "Tamanhos A4 e A3",
                "Acesso vitalício",
                "Atualizações gratuitas",
                "Bônus: Guia de montagem em vídeo",
                "Suporte prioritário"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2 text-white font-bold text-xl">
                <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center">
                  <Scissors size={18} />
                </div>
                Moldes EVA Lucrativos
              </div>
              <p className="text-sm leading-relaxed text-center md:text-left">
                Facilitando a vida de artesãos, professores e pais com moldes de alta qualidade prontos para o uso.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest">Segurança</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Lock size={16} className="text-emerald-500" />
                  <span>Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap size={16} className="text-emerald-500" />
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle size={16} className="text-emerald-500" />
                  <span>Suporte humanizado</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <h4 className="text-white font-bold uppercase text-xs tracking-widest">Links Úteis</h4>
              <div className="flex flex-col items-center md:items-end gap-2 text-sm">
                <a href="#" className="hover:text-white transition-colors">Compra segura</a>
                <a href="#" className="hover:text-white transition-colors">Suporte por email</a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs">
            <p>Moldes EVA Lucrativos © 2026 — Todos os direitos reservados</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 md:hidden z-50 pointer-events-none">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pointer-events-auto"
        >
          <a 
            href="#oferta"
            className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2"
          >
            Quero meus moldes agora!
            <ChevronRight size={20} />
          </a>
        </motion.div>
      </div>

    </div>
  );
}
