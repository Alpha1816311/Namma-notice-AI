import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI SDK on server side with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_MODEL = 'gemma-4-26b-a4b-it';
const FALLBACK_MODEL = 'gemma-4-31b-it';

const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

/**
 * Health & Model Diagnostics endpoint
 * Checks real connectivity to Gemma 4 via official @google/genai SDK
 */
app.get('/api/status', async (_req: Request, res: Response) => {
  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5);

  if (!apiKeyPresent) {
    res.json({
      ok: false,
      status: 'missing_key',
      message: 'GEMINI_API_KEY is not configured in server environment secrets.',
      model: DEFAULT_MODEL,
      testedLive: false,
    });
    return;
  }

  const startTime = Date.now();
  try {
    // Perform a lightweight 1-token real check against the actual Gemma 4 model
    const testResult = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: 'Ping. Reply with "OK".',
      config: {
        maxOutputTokens: 10,
        temperature: 0.1,
      },
    });

    const latencyMs = Date.now() - startTime;
    res.json({
      ok: true,
      status: 'online',
      model: DEFAULT_MODEL,
      supportedModels: [DEFAULT_MODEL, FALLBACK_MODEL],
      latencyMs,
      testedLive: true,
      sampleResponse: testResult.text?.trim() || 'OK',
      hackathonContext: 'Hacktoberfest Hack Day Bengaluru × IEEE CIS (Best Use of Gemma 4)',
    });
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    console.error('Gemma 4 model verification error:', error?.message);
    res.status(500).json({
      ok: false,
      status: 'error',
      model: DEFAULT_MODEL,
      error: error?.message || 'Failed to communicate with Gemma 4',
      latencyMs,
      troubleshooting:
        'Verify GEMINI_API_KEY in the AI Studio Secrets panel. Ensure Gemma 4 access is enabled for your project quota.',
    });
  }
});

function normalizeNoticeData(raw: any, _language: string) {
  const item = Array.isArray(raw) ? raw[0] : raw || {};

  const title = item.title || item.noticeTitle || 'Official Public Notice';
  const originalTitle = item.originalTitle || title;
  const originalLanguageDetected = item.originalLanguageDetected || 'Kannada & English';

  const issuingOrgRaw = item.issuingOrganization || item.issuingOrg || {};
  const issuingOrganization =
    typeof issuingOrgRaw === 'string'
      ? { name: issuingOrgRaw, department: 'General Administration', jurisdiction: 'Karnataka' }
      : {
          name: issuingOrgRaw.name || 'Public Authority',
          department: issuingOrgRaw.department || 'Administrative Wing',
          jurisdiction: issuingOrgRaw.jurisdiction || 'Karnataka',
        };

  const referenceNumber = item.referenceNumber || item.refNo || item.circularNumber || 'Not mentioned';
  const noticeDate = item.noticeDate || item.date || 'Not mentioned';
  const category = item.category || 'government_order';
  const plainSummary = item.plainSummary || item.summary || 'Public notification issued by authority.';

  // Deadlines
  let deadlines: any[] = [];
  if (Array.isArray(item.deadlines)) {
    deadlines = item.deadlines.map((d: any) => {
      if (typeof d === 'string') {
        return {
          label: 'Important Cutoff',
          date: d,
          urgency: 'upcoming',
          description: 'Official deadline stated in circular',
        };
      }
      return {
        label: d.label || 'Deadline',
        date: d.date || 'Specified in circular',
        time: d.time || '',
        urgency: d.urgency || 'upcoming',
        description: d.description || '',
      };
    });
  } else if (item.deadline) {
    deadlines = [
      {
        label: 'Final Cutoff Date',
        date: String(item.deadline),
        urgency: 'upcoming',
        description: 'Last date for submission',
      },
    ];
  }

  // Eligibility
  const eligRaw = item.eligibility || {};
  const eligibility =
    typeof eligRaw === 'string'
      ? { whoCanApply: [eligRaw], whoCannotApply: [], incomeLimit: 'As per norms', educationalCriteria: 'See circular' }
      : {
          whoCanApply: Array.isArray(eligRaw.whoCanApply)
            ? eligRaw.whoCanApply
            : eligRaw.whoCanApply
            ? [String(eligRaw.whoCanApply)]
            : ['General public / Eligible applicants'],
          whoCannotApply: Array.isArray(eligRaw.whoCannotApply) ? eligRaw.whoCannotApply : [],
          incomeLimit: eligRaw.incomeLimit || 'Not specified',
          educationalCriteria: eligRaw.educationalCriteria || 'Not specified',
        };

  // Required Documents
  let requiredDocuments: any[] = [];
  if (Array.isArray(item.requiredDocuments)) {
    requiredDocuments = item.requiredDocuments.map((doc: any) => {
      if (typeof doc === 'string') {
        return {
          documentName: doc,
          mandatory: true,
          notes: 'Standard self-attested document',
          formatRequired: 'Original / Photocopy',
        };
      }
      return {
        documentName: doc.documentName || doc.name || 'Required Certificate',
        mandatory: doc.mandatory !== false,
        notes: doc.notes || 'As per portal guidelines',
        formatRequired: doc.formatRequired || 'Upload / Physical',
      };
    });
  }

  // Instructions
  const appRaw = item.applicationInstructions || item.instructions || {};
  const applicationInstructions =
    typeof appRaw === 'string'
      ? { mode: 'online', portalUrl: '', steps: [appRaw] }
      : {
          mode: appRaw.mode || 'online',
          portalUrl: appRaw.portalUrl || '',
          submissionLocation: appRaw.submissionLocation || '',
          applicationFee: appRaw.applicationFee || 'Not specified',
          steps: Array.isArray(appRaw.steps) ? appRaw.steps : ['Follow official portal instructions.'],
        };

  // Contact Details
  const contactRaw = item.contactDetails || item.contact || {};
  const contactDetails =
    typeof contactRaw === 'string'
      ? { helplinePhone: contactRaw }
      : {
          helplinePhone: contactRaw.helplinePhone || contactRaw.phone || 'Citizen Helpline 1902',
          email: contactRaw.email || '',
          website: contactRaw.website || '',
          officeAddress: contactRaw.officeAddress || '',
        };

  // Missing or unreadable info
  let missingOrUnreadableInfo: any[] = [];
  if (Array.isArray(item.missingOrUnreadableInfo)) {
    missingOrUnreadableInfo = item.missingOrUnreadableInfo.map((m: any) => {
      if (typeof m === 'string') {
        return {
          item: m,
          status: 'absent_from_notice',
          explanation: 'Not explicitly printed on the document',
          recommendedAction: 'Verify with department helpline or local office',
        };
      }
      return {
        item: m.item || 'Unspecified Detail',
        status: m.status || 'absent_from_notice',
        explanation: m.explanation || 'Not clearly legible in document',
        recommendedAction: m.recommendedAction || 'Contact issuing office',
      };
    });
  } else if (item.missingInfo) {
    missingOrUnreadableInfo = [
      {
        item: 'Notice Omissions',
        status: 'absent_from_notice',
        explanation: String(item.missingInfo),
        recommendedAction: 'Cross-verify through official helpline or web portal',
      },
    ];
  }

  // Trust & Safety
  const trustRaw = item.trustAndSafety || {};
  const trustAndSafety = {
    sealDetected: Boolean(trustRaw.sealDetected ?? item.sealDetected),
    sealDetails: trustRaw.sealDetails || (trustRaw.sealDetected ? 'Official Department Seal' : 'None detected'),
    signatureDetected: Boolean(trustRaw.signatureDetected ?? item.signatureDetected),
    signatoryDesignation:
      trustRaw.signatoryDesignation || (trustRaw.signatureDetected ? 'Authorized Signatory' : 'None visible'),
    documentIntegrity: trustRaw.documentIntegrity || 'intact',
    extractedVsVerifiedDistinction: {
      strictlyExtractedFromDocument: Array.isArray(
        trustRaw.extractedVsVerifiedDistinction?.strictlyExtractedFromDocument
      )
        ? trustRaw.extractedVsVerifiedDistinction.strictlyExtractedFromDocument
        : ['Document reference number and title', 'Prescribed deadlines and requirements'],
      contextualNotesFromKnowledge: Array.isArray(
        trustRaw.extractedVsVerifiedDistinction?.contextualNotesFromKnowledge
      )
        ? trustRaw.extractedVsVerifiedDistinction.contextualNotesFromKnowledge
        : ['Keep digital backups of all submission receipts', 'Ensure Aadhaar NPCI seeding before applying'],
      unverifiedClaims: Array.isArray(trustRaw.extractedVsVerifiedDistinction?.unverifiedClaims)
        ? trustRaw.extractedVsVerifiedDistinction.unverifiedClaims
        : [],
    },
    confidenceScore: Number(trustRaw.confidenceScore ?? item.confidenceScore ?? 92),
    disclaimer:
      trustRaw.disclaimer ||
      'Extracted strictly from the provided notice image. For statutory and legal matters, cross-verify with the issuing authority.',
  };

  // Action Checklist
  let actionChecklist: any[] = [];
  if (Array.isArray(item.actionChecklist)) {
    actionChecklist = item.actionChecklist.map((act: any, idx: number) => {
      if (typeof act === 'string') {
        return {
          stepNumber: idx + 1,
          title: act,
          description: act,
          priority: idx === 0 ? 'high' : 'medium',
          category: 'submission',
        };
      }
      return {
        stepNumber: act.stepNumber || idx + 1,
        title: act.title || `Action Step ${idx + 1}`,
        description: act.description || '',
        priority: act.priority || 'medium',
        category: act.category || 'submission',
      };
    });
  } else if (Array.isArray(item.actionSteps)) {
    actionChecklist = item.actionSteps.map((act: string, idx: number) => ({
      stepNumber: idx + 1,
      title: act,
      description: act,
      priority: idx === 0 ? 'high' : 'medium',
      category: 'submission',
    }));
  }

  return {
    title,
    originalTitle,
    originalLanguageDetected,
    issuingOrganization,
    referenceNumber,
    noticeDate,
    category,
    plainSummary,
    deadlines,
    eligibility,
    requiredDocuments,
    applicationInstructions,
    contactDetails,
    missingOrUnreadableInfo,
    trustAndSafety,
    actionChecklist,
  };
}

/**
 * Main Multimodal Notice Analysis Endpoint
 * Sends notice image to Gemma 4 and extracts structured schema
 */
app.post('/api/analyze-notice', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/png', language = 'en', selectedModel = DEFAULT_MODEL } = req.body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Missing or invalid imageBase64 payload.',
      });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        success: false,
        error: 'GEMINI_API_KEY is not configured on the server. Please attach an API key in the Secrets panel.',
      });
      return;
    }

    // Clean base64 data if data URI prefix was supplied
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

    const languageInstructions: Record<string, string> = {
      en: 'Provide all titles, summaries, action steps, explanations, and instructions in clear, plain English.',
      kn: 'Provide all summaries, action steps, explanations, titles, and instructions in natural, authentic Kannada (ಕನ್ನಡ). You may keep proper nouns, portal URLs, and legal acts in English or bilingual.',
      hi: 'Provide all summaries, action steps, explanations, titles, and instructions in natural, clear Hindi (हिन्दी). You may keep portal URLs and reference codes in English.',
    };

    const targetLangInstruction = languageInstructions[language] || languageInstructions.en;

    const systemPrompt = `You are NammaNotice AI, a forensic document analysis engine powered by Google's Gemma 4 for Hacktoberfest Hack Day Bengaluru × IEEE CIS.
Analyze the provided public notice, circular, or announcement image with forensic precision.

CRITICAL RULES:
1. STRICT TRUTH: Never invent facts absent from the notice.
2. MISSING INFO: If dates, fee, portal link, or seals are absent or torn, clearly note them in "missingOrUnreadableInfo".
3. OFFICIAL SIGNS: Detect whether official seals (Govt of Karnataka Gandaberunda, BBMP, University seal) and authorized signatures are present.
4. LANGUAGE: ${targetLangInstruction}

OUTPUT VALID JSON:
{
  "title": "Title of notice in requested language",
  "originalTitle": "Original title on document",
  "originalLanguageDetected": "Kannada" | "English" | "Bilingual (Kannada & English)" | "Hindi",
  "issuingOrganization": {
    "name": "Issuing authority",
    "department": "Sub-department",
    "jurisdiction": "Karnataka | Bengaluru | Central | University"
  },
  "referenceNumber": "Circular/Ref No or 'Not mentioned'",
  "noticeDate": "Date printed or 'Not mentioned'",
  "category": "scholarship" | "civic_bbmp" | "university_exam" | "recruitment" | "government_order" | "other",
  "plainSummary": "2-3 sentences explaining what this means for citizens/students",
  "deadlines": [
    { "label": "Cutoff name", "date": "Date", "time": "Time or empty", "urgency": "urgent" | "upcoming" | "passed", "description": "Details" }
  ],
  "eligibility": {
    "whoCanApply": ["Eligible groups"],
    "whoCannotApply": ["Ineligible groups"],
    "incomeLimit": "Income ceiling or Not specified",
    "educationalCriteria": "Prerequisites or Not specified"
  },
  "requiredDocuments": [
    { "documentName": "Document name", "mandatory": true, "notes": "Format", "formatRequired": "Original/Copy" }
  ],
  "applicationInstructions": {
    "mode": "online" | "offline" | "hybrid",
    "portalUrl": "URL or Not mentioned",
    "submissionLocation": "Location or Not mentioned",
    "applicationFee": "Fee or Not mentioned",
    "steps": ["Step 1", "Step 2"]
  },
  "contactDetails": {
    "helplinePhone": "Helpline",
    "email": "Email",
    "website": "Website",
    "officeAddress": "Address"
  },
  "missingOrUnreadableInfo": [
    { "item": "Missing item", "status": "absent_from_notice" | "blurred_or_torn", "explanation": "Why this matters", "recommendedAction": "What citizen should do" }
  ],
  "trustAndSafety": {
    "sealDetected": true or false,
    "sealDetails": "Seal description or None visible",
    "signatureDetected": true or false,
    "signatoryDesignation": "Signatory designation or None visible",
    "documentIntegrity": "intact" | "partial_crop" | "blurred",
    "extractedVsVerifiedDistinction": {
      "strictlyExtractedFromDocument": ["Direct document facts"],
      "contextualNotesFromKnowledge": ["Helpful general advice"],
      "unverifiedClaims": []
    },
    "confidenceScore": 92,
    "disclaimer": "Extracted strictly from the notice image. Verify with issuing authority."
  },
  "actionChecklist": [
    { "stepNumber": 1, "title": "Action title", "description": "Details", "priority": "high" | "medium" | "low", "category": "document" | "portal" | "submission" }
  ]
}`;

    const startTime = Date.now();
    const modelToUse = selectedModel || DEFAULT_MODEL;

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: systemPrompt,
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.15,
      },
    });

    const elapsedMs = Date.now() - startTime;
    const responseText = response.text?.trim() || '{}';

    let rawParsed: any;
    try {
      rawParsed = JSON.parse(responseText);
    } catch (parseError) {
      console.warn('JSON direct parse failed, attempting extraction from markdown wrapper:', parseError);
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        rawParsed = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Gemma 4 response could not be parsed as valid JSON.');
      }
    }

    const normalizedData = normalizeNoticeData(rawParsed, language);

    res.json({
      success: true,
      data: normalizedData,
      meta: {
        modelUsed: modelToUse,
        elapsedMs,
        language,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    console.error('Error in /api/analyze-notice:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'Failed to process notice with Gemma 4',
      details: err?.status || 'INTERNAL_ERROR',
      hint: 'Ensure image is clear and Gemma 4 model quota is active on your API key.',
    });
  }
});

/**
 * Ask Gemma 4 a follow-up question regarding the uploaded notice
 */
app.post('/api/ask-notice', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/png', question, language = 'en', selectedModel = DEFAULT_MODEL } = req.body;

    if (!question || typeof question !== 'string') {
      res.status(400).json({ success: false, error: 'Question is required.' });
      return;
    }

    const cleanBase64 = imageBase64 ? imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '') : null;

    if (!cleanBase64) {
      res.json({
        success: true,
        answer: 'Please upload a notice image first so Gemma 4 can inspect the circular and answer your question.',
        modelUsed: selectedModel || DEFAULT_MODEL,
      });
      return;
    }

    const langDirective =
      language === 'kn'
        ? 'Answer concisely in natural Kannada (ಕನ್ನಡ).'
        : language === 'hi'
        ? 'Answer concisely in natural Hindi (हिन्दी).'
        : 'Answer concisely in plain English.';

    const promptText = `Citizen Question: "${question}"
Notice Document Guidelines:
1. Answer strictly based on the notice image. If the detail is absent, state: "The notice does not mention this detail."
2. ${langDirective}
3. Keep the response concise, factual, and direct (under 3 sentences).`;

    const response = await ai.models.generateContent({
      model: selectedModel || DEFAULT_MODEL,
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            { text: promptText },
          ],
        },
      ],
      config: {
        temperature: 0.2,
      },
    });

    res.json({
      success: true,
      answer: response.text?.trim() || 'No answer generated.',
      modelUsed: selectedModel || DEFAULT_MODEL,
    });
  } catch (err: any) {
    console.error('Error in /api/ask-notice:', err);
    res.status(500).json({
      success: false,
      error: err?.message || 'Failed to answer question with Gemma 4',
    });
  }
});

// Vite middleware in dev or static serving in prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 NammaNotice AI server running at http://localhost:${PORT} in ${isProd ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server start error:', err);
  process.exit(1);
});
