import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TriageFlow from './components/TriageFlow';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'ml', name: 'മലയാളം' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GitHub Project Disclaimer - Prominent Warning */}
      <div className="bg-danger-600 text-white py-3 px-4 text-center font-semibold">
        <div className="max-w-7xl mx-auto">
          ⚠️ {t('disclaimer')} - {t('disclaimerWarning')}
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
                <p className="text-xs text-gray-500">{t('appSubtitle')}</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <Link to="/" className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium">
                  {t('home')}
                </Link>
                {/* Admin panel accessible only via direct URL: /admin-panel-2024 */}
              </nav>
              
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/triage" element={<TriageFlow />} />
            {/* Hidden admin route - accessible only via direct URL */}
            <Route path="/admin-panel-2024" element={<AdminPanel />} />
          </Routes>
        </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* GitHub Project Warning */}
          <div className="bg-warning-50 border-2 border-warning-300 rounded-lg p-6 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-warning-900 mb-3">
                🚨 IMPORTANT NOTICE - GITHUB DEMONSTRATION PROJECT 🚨
              </h3>
              <div className="text-sm text-warning-800 space-y-2">
                <p className="font-semibold text-base">
                  {t('disclaimerAction')}
                </p>
                <p className="text-danger-700 font-bold text-base mt-3">
                  DO NOT USE THIS SYSTEM FOR REAL MEDICAL DECISIONS
                </p>
                <p className="mt-2">
                  This is a portfolio/demonstration project. No real hospital data is used.
                  All information is mock data for educational purposes only.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 space-y-3">
            <p className="font-medium text-warning-700">
              ⚠️ {t('notDiagnosis')}
            </p>
            <p>{t('finalAdmission')}</p>
            <p>{t('emergencyCall')}</p>
            <p className="text-gray-500">{t('bedAvailability')}</p>
            <p className="mt-4 text-xs text-gray-400">
              GitHub Project | For Educational & Demonstration Purposes Only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;

