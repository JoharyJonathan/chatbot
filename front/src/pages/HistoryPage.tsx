import React, { useState } from "react"

const HistoryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const timelineEvents = [
    {
      year: 2020,
      title: "Fondation de l'entreprise",
      description: "Création de MonApp avec une vision claire : révolutionner le développement web.",
      details: "Tout a commencé avec une équipe de 3 développeurs passionnés dans un petit bureau parisien. Notre première mission était de créer des solutions web innovantes pour les PME.",
      icon: "🚀",
      color: "bg-blue-500"
    },
    {
      year: 2021,
      title: "Premier grand projet",
      description: "Lancement de notre première application d'envergure pour un client majeur.",
      details: "Cette année marque un tournant avec le développement d'une plateforme e-commerce complète qui a généré plus de 2M€ de CA pour notre client en première année.",
      icon: "💼",
      color: "bg-green-500"
    },
    {
      year: 2022,
      title: "Expansion de l'équipe",
      description: "Croissance rapide avec le recrutement de 10 nouveaux talents.",
      details: "Face à la demande croissante, nous avons élargi notre équipe avec des experts en UI/UX, DevOps et marketing digital. Ouverture d'un second bureau à Lyon.",
      icon: "👥",
      color: "bg-purple-500"
    },
    {
      year: 2023,
      title: "Innovation technologique",
      description: "Adoption des dernières technologies : IA, blockchain et cloud computing.",
      details: "Intégration de l'intelligence artificielle dans nos solutions, développement de notre première DApp blockchain, et migration complète vers une architecture cloud-native.",
      icon: "🔬",
      color: "bg-orange-500"
    },
    {
      year: 2024,
      title: "Reconnaissance internationale",
      description: "Prix de la meilleure startup tech française et expansion européenne.",
      details: "Récompensés au TechCrunch Disrupt Paris, nous avons lancé nos activités en Allemagne et en Espagne. Plus de 50 projets réalisés avec un taux de satisfaction client de 98%.",
      icon: "🏆",
      color: "bg-yellow-500"
    },
    {
      year: 2025,
      title: "Vision futuriste",
      description: "Développement de solutions Web3 et métavers pour nos clients.",
      details: "Cette année, nous nous concentrons sur les technologies émergentes : réalité virtuelle, NFTs utilitaires, et applications décentralisées pour préparer l'avenir du web.",
      icon: "🌟",
      color: "bg-indigo-500"
    }
  ];

  const achievements = [
    { number: "50+", label: "Projets réalisés", icon: "📊" },
    { number: "25+", label: "Clients satisfaits", icon: "😊" },
    { number: "15", label: "Experts en équipe", icon: "👨‍💻" },
    { number: "5", label: "Années d'expérience", icon: "⏰" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Notre Histoire
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Un voyage de passion, d'innovation et de croissance continue depuis 2020
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 opacity-10 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{achievement.number}</div>
                <div className="text-sm text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Chronologie de notre évolution
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Découvrez les moments clés qui ont façonné notre parcours
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>

          {/* Timeline events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center z-10">
                  <div className={`w-6 h-6 ${event.color} rounded-full flex items-center justify-center text-xs`}>
                    {event.icon}
                  </div>
                </div>

                {/* Event content */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                  <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div 
                      className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${selectedYear === event.year ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setSelectedYear(selectedYear === event.year ? null : event.year)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${event.color}`}>
                          {event.year}
                        </span>
                        <div className="text-2xl">{event.icon}</div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {event.description}
                      </p>

                      {selectedYear === event.year && (
                        <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {event.details}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                        <span>Cliquez pour {selectedYear === event.year ? 'réduire' : 'en savoir plus'}</span>
                        <svg 
                          className={`ml-1 w-4 h-4 transform transition-transform ${selectedYear === event.year ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} hidden lg:block`}>
                    {/* Empty space for alternating layout */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Notre Vision pour l'Avenir
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Nous continuons d'innover et de repousser les limites du possible dans le développement web. 
                Notre objectif est de rester à la pointe de la technologie tout en gardant l'humain au centre 
                de nos préoccupations.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <span className="font-semibold">Innovation continue</span> - Adoption des technologies émergentes
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <span className="font-semibold">Expansion internationale</span> - Présence sur tous les continents d'ici 2027
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <span className="font-semibold">Impact social</span> - Solutions tech pour un monde plus durable
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-8 text-white text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold mb-4">Prochaine étape</h3>
                <p className="text-blue-100 mb-6">
                  Lancement de notre plateforme SaaS révolutionnaire fin 2025
                </p>
                <div className="bg-white bg-opacity-20 rounded-md p-4">
                  <div className="text-sm text-blue-100 mb-2">Progression du développement</div>
                  <div className="w-full bg-blue-200 bg-opacity-30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="text-right text-sm text-blue-100 mt-1">75% complété</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Faites partie de notre histoire
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez-nous dans cette aventure et construisons ensemble l'avenir du web
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition-colors duration-300"
            >
              Démarrer un projet
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
            >
              Découvrir l'équipe
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryPage