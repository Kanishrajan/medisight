import { config } from 'dotenv';
config();

import '@/ai/flows/predict-icu-bed-shortage.ts';
import '@/ai/flows/generate-hospital-summary.ts';
