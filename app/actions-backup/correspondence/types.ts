// Types for correspondence actions (BACKUP)
// Note: This file does NOT use "use server" because it only exports types

import { LetterRequest, LetterStatus } from "@/types/correspondence"
export type AdditionalInfoType = Record<string, string | number>;
export type { LetterRequest, LetterStatus }; 
