import { Hospital, TriageResponses, PatientLocation, TriageApiResponse, DashboardStats } from '../types';

// For production demo, point directly to your Render backend
// Example: https://hospital-bed-routing-system.onrender.com/api
const API_BASE_URL = 'https://hospital-bed-routing-system.onrender.com/api';

export const api = {
  // Get all hospitals
  async getHospitals(): Promise<Hospital[]> {
    const response = await fetch(`${API_BASE_URL}/hospitals`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch hospitals');
    }
    return data.data;
  },

  // Get single hospital
  async getHospital(id: string): Promise<Hospital> {
    const response = await fetch(`${API_BASE_URL}/hospitals/${id}`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch hospital');
    }
    return data.data;
  },

  // Submit triage and get recommendations
  async submitTriage(
    responses: TriageResponses,
    patientLocation: PatientLocation
  ): Promise<TriageApiResponse> {
    const response = await fetch(`${API_BASE_URL}/triage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses, patientLocation }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to process triage');
    }
    return data;
  },

  // Update bed availability (Admin)
  async updateBedAvailability(
    hospitalId: string,
    bedType: 'icu' | 'oxygen' | 'general',
    available: number
  ): Promise<Hospital> {
    const response = await fetch(`${API_BASE_URL}/admin/hospitals/${hospitalId}/beds`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bedType, available }),
    });
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to update bed availability');
    }
    return data.data;
  },

  // Get admin dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`);
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch dashboard stats');
    }
    return data.data;
  },
};

