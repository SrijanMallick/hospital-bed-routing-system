const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { calculateSeverity, getRequiredWardType } = require('./services/triageLogic');
const { findBestHospitals } = require('./services/routingLogic');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const HOSPITALS_DATA_PATH = path.join(__dirname, 'data', 'hospitals.json');

// Helper to read hospitals data
function getHospitals() {
  const data = fs.readFileSync(HOSPITALS_DATA_PATH, 'utf8');
  return JSON.parse(data);
}

// Helper to write hospitals data
function saveHospitals(hospitals) {
  fs.writeFileSync(HOSPITALS_DATA_PATH, JSON.stringify(hospitals, null, 2));
}

// ============= API ENDPOINTS =============

/**
 * GET /api/hospitals
 * Get all hospitals with current bed availability
 */
app.get('/api/hospitals', (req, res) => {
  try {
    const hospitals = getHospitals();
    res.json({
      success: true,
      data: hospitals,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hospitals data'
    });
  }
});

/**
 * GET /api/hospitals/:id
 * Get specific hospital details
 */
app.get('/api/hospitals/:id', (req, res) => {
  try {
    const hospitals = getHospitals();
    const hospital = hospitals.find(h => h.id === req.params.id);
    
    if (!hospital) {
      return res.status(404).json({
        success: false,
        error: 'Hospital not found'
      });
    }
    
    res.json({
      success: true,
      data: hospital
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hospital data'
    });
  }
});

/**
 * POST /api/triage
 * Process triage responses and get hospital recommendations
 */
app.post('/api/triage', (req, res) => {
  try {
    const { responses, patientLocation } = req.body;
    
    // Validate input
    if (!responses || !patientLocation) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: responses and patientLocation'
      });
    }
    
    // Calculate severity
    const triageResult = calculateSeverity(responses);
    
    // Get required ward type
    const requiredWard = getRequiredWardType(triageResult.severity);
    
    // Get hospitals
    const hospitals = getHospitals();
    
    // Find best hospital matches
    const routingResult = findBestHospitals(
      requiredWard,
      patientLocation,
      hospitals,
      triageResult.severity
    );
    
    // Compile final result
    const result = {
      success: true,
      triage: triageResult,
      requiredWard,
      routing: routingResult,
      timestamp: new Date().toISOString()
    };
    
    res.json(result);
  } catch (error) {
    console.error('Triage error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process triage request'
    });
  }
});

/**
 * PUT /api/admin/hospitals/:id/beds
 * Update bed availability for a hospital (Admin only)
 */
app.put('/api/admin/hospitals/:id/beds', (req, res) => {
  try {
    const { id } = req.params;
    const { bedType, available } = req.body;
    
    // Validate input
    if (!['icu', 'oxygen', 'general'].includes(bedType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid bed type. Must be: icu, oxygen, or general'
      });
    }
    
    if (typeof available !== 'number' || available < 0) {
      return res.status(400).json({
        success: false,
        error: 'Available beds must be a non-negative number'
      });
    }
    
    // Get hospitals
    const hospitals = getHospitals();
    const hospitalIndex = hospitals.findIndex(h => h.id === id);
    
    if (hospitalIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Hospital not found'
      });
    }
    
    // Validate against total capacity
    const hospital = hospitals[hospitalIndex];
    if (available > hospital.beds[bedType].total) {
      return res.status(400).json({
        success: false,
        error: `Available beds cannot exceed total capacity (${hospital.beds[bedType].total})`
      });
    }
    
    // Update bed availability
    hospitals[hospitalIndex].beds[bedType].available = available;
    hospitals[hospitalIndex].lastUpdated = new Date().toISOString();
    
    // Save to file
    saveHospitals(hospitals);
    
    res.json({
      success: true,
      data: hospitals[hospitalIndex],
      message: 'Bed availability updated successfully'
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update bed availability'
    });
  }
});

/**
 * GET /api/admin/dashboard
 * Get dashboard statistics for admin view
 */
app.get('/api/admin/dashboard', (req, res) => {
  try {
    const hospitals = getHospitals();
    
    // Calculate aggregate statistics
    const stats = {
      totalHospitals: hospitals.length,
      totalBeds: {
        icu: { available: 0, total: 0 },
        oxygen: { available: 0, total: 0 },
        general: { available: 0, total: 0 }
      },
      hospitalsByLoad: [],
      criticalCapacityHospitals: []
    };
    
    hospitals.forEach(hospital => {
      // Aggregate totals
      stats.totalBeds.icu.available += hospital.beds.icu.available;
      stats.totalBeds.icu.total += hospital.beds.icu.total;
      stats.totalBeds.oxygen.available += hospital.beds.oxygen.available;
      stats.totalBeds.oxygen.total += hospital.beds.oxygen.total;
      stats.totalBeds.general.available += hospital.beds.general.available;
      stats.totalBeds.general.total += hospital.beds.general.total;
      
      // Calculate individual hospital load
      const icuOccupancy = ((hospital.beds.icu.total - hospital.beds.icu.available) / hospital.beds.icu.total * 100).toFixed(1);
      const oxygenOccupancy = ((hospital.beds.oxygen.total - hospital.beds.oxygen.available) / hospital.beds.oxygen.total * 100).toFixed(1);
      const generalOccupancy = ((hospital.beds.general.total - hospital.beds.general.available) / hospital.beds.general.total * 100).toFixed(1);
      
      stats.hospitalsByLoad.push({
        id: hospital.id,
        name: hospital.name,
        icuOccupancy: parseFloat(icuOccupancy),
        oxygenOccupancy: parseFloat(oxygenOccupancy),
        generalOccupancy: parseFloat(generalOccupancy),
        overallOccupancy: parseFloat(((parseFloat(icuOccupancy) + parseFloat(oxygenOccupancy) + parseFloat(generalOccupancy)) / 3).toFixed(1))
      });
      
      // Flag critical capacity hospitals (ICU >90% or all bed types >80%)
      if (icuOccupancy > 90 || (icuOccupancy > 80 && oxygenOccupancy > 80 && generalOccupancy > 80)) {
        stats.criticalCapacityHospitals.push({
          id: hospital.id,
          name: hospital.name,
          icuAvailable: hospital.beds.icu.available,
          oxygenAvailable: hospital.beds.oxygen.available,
          generalAvailable: hospital.beds.general.available
        });
      }
    });
    
    // Sort hospitals by overall occupancy
    stats.hospitalsByLoad.sort((a, b) => b.overallOccupancy - a.overallOccupancy);
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🏥 Hospital Triage Backend Server`);
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   GET  /api/hospitals`);
  console.log(`   GET  /api/hospitals/:id`);
  console.log(`   POST /api/triage`);
  console.log(`   PUT  /api/admin/hospitals/:id/beds`);
  console.log(`   GET  /api/admin/dashboard`);
  console.log(`   GET  /health\n`);
});

