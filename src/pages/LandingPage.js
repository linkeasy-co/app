import React from 'react';
import '../styles/LandingPage.scss';
import HeroSection from '../components/sections/HeroSection';

const LandingPage = () => {
  return (
    <div className='landing-container'>
      <HeroSection />
    </div>
  )
}

// const LandingPage = () => (
//   <div className="landing-container">
//     {/* Contêiner da imagem que ocupará metade da tela com o botão */}
//     <div className="landing-image">
//       <div className="banner-content">
//         <p className="price">Assine por apenas <strong>R$ 30/mês</strong></p>
//         <Link to="/compra">
//           <button className="cta-button">
//             <FaShoppingCart className="icon" /> Assinar Agora!
//           </button>
//         </Link>
//       </div>
//     </div>

//     {/* Conteúdo restante da página */}
//     <div className="landing-content">
//       <header className="site-header">
//         <div className="container">
//           <div className="site-header-inner">
//             <div className="brand header-brand">
//               {/* Logo ou nome da marca pode ser inserido aqui */}
//             </div>
//           </div>
//         </div>
//       </header>

//       <main>
//         <section className="features section">
//           <div className="container">
//             <h1>Automatize Postagens no LinkedIn</h1>
//             <p>A solução para otimizar suas postagens com agendamento inteligente.</p>
//             <h2 className="section-title">Benefícios</h2>
//             <div className="benefits-cards">
//               <div className="card">
//                 <h3>💼 Economize Tempo</h3>
//                 <p>Automatize suas postagens e foque no que realmente importa.</p>
//               </div>
//               <div className="card">
//                 <h3>📈 Aumente o Engajamento</h3>
//                 <p>Conteúdo personalizado para aumentar sua interação no LinkedIn.</p>
//               </div>
//               <div className="card">
//                 <h3>🗓️ Programe Inteligentemente</h3>
//                 <p>Agende postagens nos horários mais estratégicos.</p>
//               </div>
//               <div className="card">
//                 <h3>🚀 Expanda Sua Rede</h3>
//                 <p>Postagens consistentes que ajudam a expandir sua rede de contatos.</p>
//               </div>
//               <div className="card">
//                 <h3>🔍 Acompanhe Seus Resultados</h3>
//                 <p>Obtenha insights sobre o desempenho de suas postagens.</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   </div>
// );

export default LandingPage;
