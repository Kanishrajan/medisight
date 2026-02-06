'use server';
/**
 * @fileOverview Predicts ICU bed shortages, ventilator shortages, and doctor overloads using moving averages and LLM reasoning for alert triggering.
 *
 * - predictIcuBedShortage - A function that predicts resource shortages and potential overloads.
 * - PredictiveAlertInput - The input type for the predictIcuBedShortage function.
 * - PredictiveAlertOutput - The return type for the predictIcuBedShortage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveAlertInputSchema = z.object({
  hospitalId: z.string().describe('The ID of the hospital to analyze.'),
  occupiedBeds: z.number().describe('The current number of occupied beds.'),
  occupiedICUBeds: z.number().describe('The current number of occupied ICU beds.'),
  ventilatorsInUse: z.number().describe('The current number of ventilators in use.'),
  doctorSchedules: z.array(
    z.object({
      doctorId: z.string().describe('The ID of the doctor.'),
      date: z.string().describe('The date of the schedule (YYYY-MM-DD).'),
      availableHours: z.number().describe('The number of available hours for the doctor.'),
      bookedHours: z.number().describe('The number of booked hours for the doctor.'),
    })
  ).describe('An array of doctor schedules to assess doctor overload.'),
  averageIcuBedOccupancyRate: z.number().describe('The average ICU bed occupancy rate.'),
  averageVentilatorUseRate: z.number().describe('The average ventilator use rate.'),
  averageDoctorUtilizationRate: z.number().describe('The average doctor utilization rate.'),
});
export type PredictiveAlertInput = z.infer<typeof PredictiveAlertInputSchema>;

const PredictiveAlertOutputSchema = z.object({
  icuBedShortageAlert: z.boolean().describe('Whether an ICU bed shortage is predicted.'),
  ventilatorShortageAlert: z.boolean().describe('Whether a ventilator shortage is predicted.'),
  doctorOverloadAlert: z.boolean().describe('Whether a doctor overload is predicted.'),
  reasoning: z.string().describe('The reasoning behind the alerts.'),
});
export type PredictiveAlertOutput = z.infer<typeof PredictiveAlertOutputSchema>;

export async function predictIcuBedShortage(input: PredictiveAlertInput): Promise<PredictiveAlertOutput> {
  return predictIcuBedShortageFlow(input);
}

const predictiveAlertPrompt = ai.definePrompt({
  name: 'predictiveAlertPrompt',
  input: {schema: PredictiveAlertInputSchema},
  output: {schema: PredictiveAlertOutputSchema},
  prompt: `You are an AI assistant specialized in predicting resource shortages in hospitals.

  Analyze the provided hospital data and doctor schedules to predict potential ICU bed shortages, ventilator shortages, and doctor overloads.

  Consider the current occupancy, usage rates, and doctor availability compared to historical averages.

  Provide a boolean value for each type of alert (icuBedShortageAlert, ventilatorShortageAlert, doctorOverloadAlert) based on your analysis.

  Also provide a detailed reasoning for your predictions in the reasoning field.

Hospital ID: {{{hospitalId}}}
Occupied Beds: {{{occupiedBeds}}}
Occupied ICU Beds: {{{occupiedICUBeds}}}
Ventilators in Use: {{{ventilatorsInUse}}}
Average ICU Bed Occupancy Rate: {{{averageIcuBedOccupancyRate}}}
Average Ventilator Use Rate: {{{averageVentilatorUseRate}}}
Average Doctor Utilization Rate: {{{averageDoctorUtilizationRate}}}

Doctor Schedules:
{{#each doctorSchedules}}
  - Doctor ID: {{{doctorId}}}, Date: {{{date}}}, Available Hours: {{{availableHours}}}, Booked Hours: {{{bookedHours}}}
{{/each}}

Output:
{
  "icuBedShortageAlert": boolean,
  "ventilatorShortageAlert": boolean,
  "doctorOverloadAlert": boolean,
  "reasoning": string
}
  `,
});

const predictIcuBedShortageFlow = ai.defineFlow(
  {
    name: 'predictIcuBedShortageFlow',
    inputSchema: PredictiveAlertInputSchema,
    outputSchema: PredictiveAlertOutputSchema,
  },
  async input => {
    const {output} = await predictiveAlertPrompt(input);
    return output!;
  }
);
