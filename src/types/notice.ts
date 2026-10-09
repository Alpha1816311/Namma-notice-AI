export type LanguageCode = 'en' | 'kn' | 'hi';

export interface NoticeDeadline {
  label: string;
  date: string;
  time?: string;
  urgency: 'urgent' | 'upcoming' | 'passed' | 'unspecified';
  description: string;
}

export interface DocumentItem {
  documentName: string;
  mandatory: boolean;
  notes: string;
  formatRequired?: string;
}

export interface MissingInfoItem {
  item: string;
  status: 'absent_from_notice' | 'blurred_or_torn' | 'ambiguous';
  explanation: string;
  recommendedAction: string;
}

export interface ActionStep {
  stepNumber: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'document' | 'portal' | 'submission' | 'verification' | 'payment';
  dueDate?: string;
}

export interface TrustSafetyReport {
  sealDetected: boolean;
  sealDetails?: string;
  signatureDetected: boolean;
  signatoryDesignation?: string;
  documentIntegrity: 'intact' | 'partial_crop' | 'blurred' | 'low_contrast';
  extractedVsVerifiedDistinction: {
    strictlyExtractedFromDocument: string[];
    contextualNotesFromKnowledge: string[];
    unverifiedClaims: string[];
  };
  confidenceScore: number;
  disclaimer: string;
}

export interface NoticeAnalysis {
  title: string;
  originalTitle?: string;
  originalLanguageDetected: string;
  issuingOrganization: {
    name: string;
    department?: string;
    jurisdiction?: string;
  };
  referenceNumber: string;
  noticeDate: string;
  category: 'scholarship' | 'government_order' | 'civic_bbmp' | 'university_exam' | 'recruitment' | 'utility_bescom' | 'public_alert' | 'other';
  plainSummary: string;
  deadlines: NoticeDeadline[];
  eligibility: {
    whoCanApply: string[];
    whoCannotApply: string[];
    incomeLimit?: string;
    educationalCriteria?: string;
  };
  requiredDocuments: DocumentItem[];
  applicationInstructions: {
    mode: 'online' | 'offline' | 'hybrid' | 'unclear';
    portalUrl?: string;
    submissionLocation?: string;
    applicationFee?: string;
    steps: string[];
  };
  contactDetails: {
    helplinePhone?: string;
    email?: string;
    website?: string;
    officeAddress?: string;
  };
  missingOrUnreadableInfo: MissingInfoItem[];
  trustAndSafety: TrustSafetyReport;
  actionChecklist: ActionStep[];
}

export interface SampleNotice {
  id: string;
  name: string;
  nameKannada: string;
  issuer: string;
  category: string;
  summary: string;
  badge: string;
  imageUrl: string;
  svgContent: string;
}

export interface ModelStatus {
  ok: boolean;
  status: 'online' | 'error' | 'missing_key';
  model: string;
  supportedModels: string[];
  latencyMs?: number;
  testedLive: boolean;
  sampleResponse?: string;
  error?: string;
  troubleshooting?: string;
}
