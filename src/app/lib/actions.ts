'use server';

import { predictIcuBedShortage, type PredictiveAlertInput } from '@/ai/flows/predict-icu-bed-shortage';
import { generateHospitalSummary } from '@/ai/flows/generate-hospital-summary';
import { KPI_TRENDS, DEPT_STATS, HOSPITALS } from './mock-data';

export async function getKpiSummary() {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    alos: 5.2,
    bedOccupancy: 84.5,
    totalAdmissions: 1240,
    readmissionRate: 12.4,
    emergencyRatio: 65,
    costPerDischarge: 18500,
  };
}

export async function runPredictiveAnalysis(hospitalId: string) {
  const input: PredictiveAlertInput = {
    hospitalId,
    occupiedBeds: 420,
    occupiedICUBeds: 45,
    ventilatorsInUse: 12,
    averageIcuBedOccupancyRate: 0.85,
    averageVentilatorUseRate: 0.60,
    averageDoctorUtilizationRate: 0.82,
    doctorSchedules: [
      { doctorId: 'd1', date: '2024-03-20', availableHours: 8, bookedHours: 9 },
      { doctorId: 'd2', date: '2024-03-20', availableHours: 8, bookedHours: 7.5 },
    ]
  };

  try {
    const result = await predictIcuBedShortage(input);
    return result;
  } catch (error) {
    console.error('Prediction failed:', error);
    return null;
  }
}

export async function generateNewReportAction() {
  const stats = {
    occupancy: 84.5,
    alos: 5.2,
    revenue: 1250000,
    criticalDepts: ['Emergency', 'ICU', 'General Medicine'],
  };

  try {
    const reportData = await generateHospitalSummary({
      hospitalName: 'MediSight Main Mumbai',
      stats,
    });

    return {
      id: `rep-${Date.now()}`,
      name: `AI Ops Summary - ${new Date().toLocaleDateString('en-IN')}`,
      type: 'PDF',
      date: new Date().toISOString().split('T')[0],
      size: '1.2 MB',
      content: reportData,
    };
  } catch (error) {
    console.error('Report generation failed:', error);
    return null;
  }
}
