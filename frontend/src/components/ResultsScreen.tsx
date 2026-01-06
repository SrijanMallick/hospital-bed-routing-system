import { TriageApiResponse, HospitalRecommendation } from '../types';

interface ResultsScreenProps {
  result: TriageApiResponse;
  onStartOver: () => void;
}

function ResultsScreen({ result, onStartOver }: ResultsScreenProps) {
  const { triage, requiredWard, routing } = result;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'danger';
      case 'URGENT':
        return 'warning';
      case 'STABLE':
        return 'success';
      default:
        return 'gray';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'HIGH':
        return 'success';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'danger';
      default:
        return 'gray';
    }
  };

  const getWardLabel = (ward: string) => {
    switch (ward) {
      case 'icu':
        return 'ICU (Intensive Care)';
      case 'oxygen':
        return 'Oxygen / Monitored Bed';
      case 'general':
        return 'General Ward';
      default:
        return ward;
    }
  };

  const severityColor = getSeverityColor(triage.severity);
  const confidenceColor = getConfidenceColor(triage.confidence);

  const HospitalCard = ({ hospital, rank }: { hospital: HospitalRecommendation; rank: string }) => (
    <div className="card mb-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {rank === 'Recommended' && (
              <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full mr-3">
                ⭐ {rank}
              </span>
            )}
            {rank !== 'Recommended' && (
              <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full mr-3">
                {rank}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
          <p className="text-sm text-gray-600">{hospital.location.address}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{hospital.travelTime} min</div>
          <div className="text-sm text-gray-500">{hospital.distance} km away</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">{hospital.availableBeds}</div>
          <div className="text-xs text-gray-600">Available Beds</div>
          <div className="text-xs text-gray-500 mt-1">{getWardLabel(hospital.requiredWardType)}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-gray-900">{hospital.beds.icu.available}</div>
          <div className="text-xs text-gray-600">ICU Beds</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <div className={`text-2xl font-bold ${hospital.loadScore > 80 ? 'text-danger-600' : 'text-success-600'}`}>
            {100 - hospital.loadScore}%
          </div>
          <div className="text-xs text-gray-600">Capacity Free</div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Last updated: {new Date(hospital.lastUpdated).toLocaleTimeString()}</span>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.location.lat},${hospital.location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
        >
          Get Directions
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Assessment Results */}
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment Complete</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Severity */}
          <div className={`bg-${severityColor}-50 border-2 border-${severityColor}-200 rounded-lg p-4 text-center`}>
            <div className="text-sm font-medium text-gray-600 mb-1">Patient Severity</div>
            <div className={`text-3xl font-bold text-${severityColor}-700`}>{triage.severity}</div>
            <div className="text-xs text-gray-600 mt-2">Score: {triage.score}/30</div>
          </div>

          {/* Required Ward */}
          <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4 text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">Recommended Ward</div>
            <div className="text-lg font-bold text-primary-700">{getWardLabel(requiredWard)}</div>
          </div>

          {/* Confidence */}
          <div className={`bg-${confidenceColor}-50 border-2 border-${confidenceColor}-200 rounded-lg p-4 text-center`}>
            <div className="text-sm font-medium text-gray-600 mb-1">Assessment Confidence</div>
            <div className={`text-3xl font-bold text-${confidenceColor}-700`}>{triage.confidence}</div>
          </div>
        </div>

        {/* Human Review Warning */}
        {triage.requiresHumanReview && (
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-warning-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <h4 className="font-semibold text-warning-900 mb-1">Human Review Recommended</h4>
                <p className="text-sm text-warning-800">
                  This assessment has conflicting signals or low confidence. Please consult with medical staff for verification.
                </p>
                {triage.conflictingSignals.length > 0 && (
                  <ul className="mt-2 text-sm text-warning-700 list-disc list-inside">
                    {triage.conflictingSignals.map((signal, idx) => (
                      <li key={idx}>{signal}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hospital Recommendations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Hospital Recommendations</h2>

        {routing.hasCapacity ? (
          <>
            {routing.recommended && (
              <HospitalCard hospital={routing.recommended} rank="Recommended" />
            )}

            {routing.fallbacks.length > 0 && (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Alternative Options</h3>
                {routing.fallbacks.map((hospital, idx) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    rank={`Option ${idx + 2}`}
                  />
                ))}
              </>
            )}

            <div className="text-sm text-gray-600 mt-4">
              Checked {routing.totalHospitalsChecked} hospitals • {routing.hospitalsWithCapacity} have capacity
            </div>
          </>
        ) : (
          <div className="card bg-danger-50 border-danger-200">
            <div className="text-center py-6">
              <svg className="w-16 h-16 text-danger-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-danger-900 mb-2">No Confirmed Capacity</h3>
              <p className="text-danger-800 mb-4">
                No hospitals have confirmed {getWardLabel(requiredWard)} availability at this moment.
              </p>
              <p className="text-sm text-danger-700 font-semibold">
                ⚠️ ESCALATE TO HUMAN DECISION
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Contact hospitals directly or proceed to nearest facility. Bed availability may have changed.
              </p>
            </div>

            {routing.alternativeOptions && routing.alternativeOptions.length > 0 && (
              <div className="mt-6 border-t border-danger-300 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Alternative Ward Options</h4>
                <p className="text-sm text-gray-700 mb-4">
                  These hospitals have beds in other ward types. Medical staff will determine suitability.
                </p>
                {routing.alternativeOptions.map((hospital, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-gray-900">{hospital.name}</h5>
                        <p className="text-sm text-warning-700 font-medium mt-1">{hospital.note}</p>
                        <p className="text-sm text-gray-600 mt-1">{hospital.availableBeds} beds available</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{hospital.distance} km</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Important Disclaimer */}
      <div className="card bg-gray-50 border-gray-300 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">⚠️ Important</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Final admission decision is made by hospital medical staff upon arrival</li>
          <li>• Bed availability can change rapidly - always call ahead if possible</li>
          <li>• This is a coordination tool, not a medical diagnosis</li>
          <li>• For life-threatening emergencies, proceed to nearest hospital immediately</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button onClick={onStartOver} className="btn btn-secondary">
          Start New Assessment
        </button>
        <button onClick={() => window.print()} className="btn btn-primary">
          Print Results
        </button>
      </div>
    </div>
  );
}

export default ResultsScreen;

