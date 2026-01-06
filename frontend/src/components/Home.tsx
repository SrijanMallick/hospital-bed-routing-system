import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* GitHub Disclaimer Banner */}
      <div className="card bg-danger-50 border-danger-300 border-2 mb-8">
        <div className="text-center">
          <h2 className="text-xl font-bold text-danger-900 mb-3">
            ⚠️ DEMONSTRATION PROJECT ONLY
          </h2>
          <p className="text-danger-800 font-semibold mb-2">
            {t('disclaimerAction')}
          </p>
          <p className="text-sm text-danger-700">
            This system uses mock data and is NOT connected to real hospitals.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('heroTitle')}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {t('heroSubtitle')}
        </p>
        <p className="text-sm text-gray-500">
          {t('heroDescription')}
        </p>
      </div>

      {/* Main CTA */}
      <div className="card mb-8 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Start Patient Assessment
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Answer simple questions about the patient's condition. We'll assess urgency 
            and recommend the best nearby hospital with available beds.
          </p>
          <Link to="/triage" className="btn btn-primary btn-lg inline-block">
            {t('beginTriage')} →
          </Link>
        </div>
      </div>

      {/* How it Works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('howItWorks')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('step1Title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('step1Desc')}
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('step2Title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('step2Desc')}
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('step3Title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('step3Desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="card bg-warning-50 border-warning-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('notDiagnosis')}</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('finalAdmission')}</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('emergencyCall')}</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-warning-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t('bedAvailability')}</span>
          </li>
        </ul>
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-3xl font-bold text-primary-600">15</div>
          <div className="text-sm text-gray-600">Government Hospitals</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600">&lt;3</div>
          <div className="text-sm text-gray-600">Minutes to Complete</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary-600">24/7</div>
          <div className="text-sm text-gray-600">Real-time Updates</div>
        </div>
      </div>
    </div>
  );
}

export default Home;

