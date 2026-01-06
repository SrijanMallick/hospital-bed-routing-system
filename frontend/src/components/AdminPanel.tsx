import { useState, useEffect } from 'react';
import { Hospital, DashboardStats } from '../types';
import { api } from '../services/api';

function AdminPanel() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingBed, setEditingBed] = useState<{
    hospitalId: string;
    bedType: 'icu' | 'oxygen' | 'general';
    value: number;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [hospitalsData, statsData] = await Promise.all([
        api.getHospitals(),
        api.getDashboardStats(),
      ]);
      setHospitals(hospitalsData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBed = async (
    hospitalId: string,
    bedType: 'icu' | 'oxygen' | 'general',
    newValue: number
  ) => {
    setError(null);
    setSuccessMessage(null);

    try {
      await api.updateBedAvailability(hospitalId, bedType, newValue);
      setSuccessMessage('Bed availability updated successfully');
      setEditingBed(null);
      await loadData(); // Reload data
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update bed availability');
    }
  };

  const BedEditor = ({
    hospital,
    bedType,
  }: {
    hospital: Hospital;
    bedType: 'icu' | 'oxygen' | 'general';
  }) => {
    const [value, setValue] = useState(hospital.beds[bedType].available);
    const isEditing =
      editingBed?.hospitalId === hospital.id && editingBed?.bedType === bedType;

    if (!isEditing) {
      return (
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">
            {hospital.beds[bedType].available} / {hospital.beds[bedType].total}
          </span>
          <button
            onClick={() =>
              setEditingBed({
                hospitalId: hospital.id,
                bedType,
                value: hospital.beds[bedType].available,
              })
            }
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          max={hospital.beds[bedType].total}
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
        />
        <span className="text-sm text-gray-500">/ {hospital.beds[bedType].total}</span>
        <button
          onClick={() => handleUpdateBed(hospital.id, bedType, value)}
          className="text-success-600 hover:text-success-700 text-sm font-medium"
        >
          Save
        </button>
        <button
          onClick={() => setEditingBed(null)}
          className="text-gray-600 hover:text-gray-700 text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage bed availability and monitor hospital capacity across the network
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-danger-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-danger-900">{error}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-success-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-success-900">{successMessage}</p>
          </div>
        </div>
      )}

      {/* System-wide Stats */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-primary-50 border-primary-200">
            <div className="text-sm font-medium text-gray-600 mb-1">Total Hospitals</div>
            <div className="text-3xl font-bold text-primary-700">{stats.totalHospitals}</div>
          </div>

          <div className="card">
            <div className="text-sm font-medium text-gray-600 mb-1">ICU Beds</div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalBeds.icu.available}
            </div>
            <div className="text-sm text-gray-500">
              of {stats.totalBeds.icu.total} total
            </div>
          </div>

          <div className="card">
            <div className="text-sm font-medium text-gray-600 mb-1">Oxygen Beds</div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalBeds.oxygen.available}
            </div>
            <div className="text-sm text-gray-500">
              of {stats.totalBeds.oxygen.total} total
            </div>
          </div>

          <div className="card">
            <div className="text-sm font-medium text-gray-600 mb-1">General Beds</div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalBeds.general.available}
            </div>
            <div className="text-sm text-gray-500">
              of {stats.totalBeds.general.total} total
            </div>
          </div>
        </div>
      )}

      {/* Critical Capacity Alerts */}
      {stats && stats.criticalCapacityHospitals.length > 0 && (
        <div className="card bg-danger-50 border-danger-200 mb-8">
          <h2 className="text-xl font-bold text-danger-900 mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Critical Capacity Alerts
          </h2>
          <div className="space-y-3">
            {stats.criticalCapacityHospitals.map((hospital) => (
              <div key={hospital.id} className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{hospital.name}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">ICU:</span>
                    <span className={`ml-2 font-semibold ${hospital.icuAvailable === 0 ? 'text-danger-600' : 'text-warning-600'}`}>
                      {hospital.icuAvailable} available
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Oxygen:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {hospital.oxygenAvailable} available
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">General:</span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {hospital.generalAvailable} available
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospital Load Distribution */}
      {stats && (
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hospital Load Distribution</h2>
          <div className="space-y-4">
            {stats.hospitalsByLoad.map((hospital) => (
              <div key={hospital.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{hospital.name}</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {hospital.overallOccupancy}% Overall Occupancy
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>ICU</span>
                      <span>{hospital.icuOccupancy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          hospital.icuOccupancy > 90
                            ? 'bg-danger-600'
                            : hospital.icuOccupancy > 75
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                        }`}
                        style={{ width: `${hospital.icuOccupancy}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Oxygen</span>
                      <span>{hospital.oxygenOccupancy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          hospital.oxygenOccupancy > 90
                            ? 'bg-danger-600'
                            : hospital.oxygenOccupancy > 75
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                        }`}
                        style={{ width: `${hospital.oxygenOccupancy}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>General</span>
                      <span>{hospital.generalOccupancy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          hospital.generalOccupancy > 90
                            ? 'bg-danger-600'
                            : hospital.generalOccupancy > 75
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                        }`}
                        style={{ width: `${hospital.generalOccupancy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bed Management */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Bed Availability Management</h2>
          <button
            onClick={loadData}
            className="btn btn-secondary text-sm py-2"
          >
            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Hospital
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  ICU Beds
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Oxygen Beds
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  General Beds
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{hospital.name}</div>
                    <div className="text-sm text-gray-500">{hospital.location.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <BedEditor hospital={hospital} bedType="icu" />
                  </td>
                  <td className="px-6 py-4">
                    <BedEditor hospital={hospital} bedType="oxygen" />
                  </td>
                  <td className="px-6 py-4">
                    <BedEditor hospital={hospital} bedType="general" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(hospital.lastUpdated).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;

