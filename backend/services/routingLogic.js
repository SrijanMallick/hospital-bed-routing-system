/**
 * Hospital Routing & Recommendation Engine
 * 
 * Matches patient severity with hospital capacity and proximity
 */

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {Object} coord1 - {lat, lng}
 * @param {Object} coord2 - {lat, lng}
 * @returns {number} - Distance in kilometers
 */
function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Estimate travel time based on distance (simplified)
 * @param {number} distance - Distance in km
 * @returns {number} - Time in minutes
 */
function estimateTravelTime(distance) {
  // Average speed: 30 km/h in city traffic
  const averageSpeed = 30;
  return Math.ceil((distance / averageSpeed) * 60);
}

/**
 * Calculate hospital load score (0-100, lower is better)
 */
function calculateLoadScore(hospital) {
  const icuLoad = (hospital.beds.icu.total - hospital.beds.icu.available) / hospital.beds.icu.total;
  const oxygenLoad = (hospital.beds.oxygen.total - hospital.beds.oxygen.available) / hospital.beds.oxygen.total;
  const generalLoad = (hospital.beds.general.total - hospital.beds.general.available) / hospital.beds.general.total;
  
  // Weighted average (ICU is most critical)
  return Math.round((icuLoad * 0.5 + oxygenLoad * 0.3 + generalLoad * 0.2) * 100);
}

/**
 * Find best hospital matches for patient
 * @param {string} requiredWard - 'icu', 'oxygen', or 'general'
 * @param {Object} patientLocation - {lat, lng}
 * @param {Array} hospitals - List of hospitals
 * @param {string} severity - Patient severity level
 * @returns {Object} - Recommended hospitals with fallbacks
 */
function findBestHospitals(requiredWard, patientLocation, hospitals, severity) {
  // Filter hospitals with available beds in required ward
  const hospitalsWithCapacity = hospitals
    .map(hospital => {
      const distance = calculateDistance(patientLocation, hospital.location);
      const travelTime = estimateTravelTime(distance);
      const loadScore = calculateLoadScore(hospital);
      const availableBeds = hospital.beds[requiredWard].available;
      
      return {
        ...hospital,
        distance: Math.round(distance * 10) / 10, // Round to 1 decimal
        travelTime,
        loadScore,
        availableBeds,
        requiredWardType: requiredWard
      };
    })
    .filter(h => h.availableBeds > 0);

  // Calculate ranking score for each hospital
  const rankedHospitals = hospitalsWithCapacity.map(hospital => {
    let score = 0;
    
    // Distance factor (closer is better)
    // 0-5km: +30, 5-10km: +20, 10-15km: +10, >15km: +5
    if (hospital.distance <= 5) score += 30;
    else if (hospital.distance <= 10) score += 20;
    else if (hospital.distance <= 15) score += 10;
    else score += 5;
    
    // Availability factor
    // More beds available = higher score
    score += Math.min(hospital.availableBeds * 5, 30);
    
    // Load factor (less loaded is better)
    score += (100 - hospital.loadScore) / 5;
    
    // Time factor for critical patients
    if (severity === 'CRITICAL' && hospital.travelTime <= 15) {
      score += 20; // Bonus for nearby hospitals for critical cases
    }
    
    return {
      ...hospital,
      rankingScore: Math.round(score)
    };
  });

  // Sort by ranking score (descending)
  rankedHospitals.sort((a, b) => b.rankingScore - a.rankingScore);

  // Prepare response
  const result = {
    hasCapacity: rankedHospitals.length > 0,
    recommended: rankedHospitals[0] || null,
    fallbacks: rankedHospitals.slice(1, 3), // Next 2 best options
    totalHospitalsChecked: hospitals.length,
    hospitalsWithCapacity: rankedHospitals.length
  };

  // If no capacity, check for alternative ward types
  if (!result.hasCapacity) {
    result.alternativeOptions = findAlternativeWards(requiredWard, patientLocation, hospitals);
  }

  return result;
}

/**
 * Find alternative ward options if primary ward unavailable
 */
function findAlternativeWards(requiredWard, patientLocation, hospitals) {
  const alternatives = [];
  
  // For ICU patients, check oxygen beds as alternative
  if (requiredWard === 'icu') {
    const oxygenBedHospitals = hospitals
      .filter(h => h.beds.oxygen.available > 0)
      .map(h => ({
        ...h,
        distance: Math.round(calculateDistance(patientLocation, h.location) * 10) / 10,
        availableBeds: h.beds.oxygen.available,
        wardType: 'oxygen',
        note: 'ICU not available - Oxygen bed alternative'
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);
    
    alternatives.push(...oxygenBedHospitals);
  }
  
  // For urgent patients, check general beds as last resort
  if (requiredWard === 'oxygen' || requiredWard === 'icu') {
    const generalBedHospitals = hospitals
      .filter(h => h.beds.general.available > 0)
      .map(h => ({
        ...h,
        distance: Math.round(calculateDistance(patientLocation, h.location) * 10) / 10,
        availableBeds: h.beds.general.available,
        wardType: 'general',
        note: `${requiredWard.toUpperCase()} not available - General bed alternative (requires monitoring)`
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);
    
    if (alternatives.length < 2) {
      alternatives.push(...generalBedHospitals.slice(0, 2 - alternatives.length));
    }
  }
  
  return alternatives;
}

module.exports = {
  findBestHospitals,
  calculateDistance,
  estimateTravelTime,
  calculateLoadScore
};

