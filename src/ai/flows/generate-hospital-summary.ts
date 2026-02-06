'use server';
/**
 * @fileOverview Generates professional hospital operation summaries for reports.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReportInputSchema = z.object({
  hospitalName: z.string(),
  stats: z.object({
    occupancy: z.number(),
    alos: z.number(),
    revenue: z.number(),
    criticalDepts: z.array(z.string()),
  }),
});

const ReportOutputSchema = z.object({
  summary: z.string().describe('A professional 3-paragraph executive summary of hospital operations.'),
  recommendations: z.array(z.string()).describe('Top 3 strategic recommendations based on the stats.'),
});

export async function generateHospitalSummary(input: z.infer<typeof ReportInputSchema>) {
  return generateHospitalSummaryFlow(input);
}

const reportPrompt = ai.definePrompt({
  name: 'reportPrompt',
  input: {schema: ReportInputSchema},
  output: {schema: ReportOutputSchema},
  prompt: `You are a senior hospital administrator writing an executive summary for {{hospitalName}}.

Current Stats:
- Bed Occupancy: {{stats.occupancy}}%
- Avg. Length of Stay: {{stats.alos}} days
- Daily Revenue: ₹{{stats.revenue}}
- Critical Departments (High Load): {{#each stats.criticalDepts}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

Write a professional executive summary and provide 3 actionable recommendations to improve efficiency.`,
});

const generateHospitalSummaryFlow = ai.defineFlow(
  {
    name: 'generateHospitalSummaryFlow',
    inputSchema: ReportInputSchema,
    outputSchema: ReportOutputSchema,
  },
  async input => {
    const {output} = await reportPrompt(input);
    return output!;
  }
);
