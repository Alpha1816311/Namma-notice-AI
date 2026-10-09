🇮🇳 NammaNotice AI

Making Government Notices Understandable for Everyone

NammaNotice AI is an AI-powered public notice decoder designed to help citizens and students understand complex government circulars, scholarship announcements, recruitment notifications, university notices, and other public documents.

Powered by Google’s Gemini API and the Gemma model integration, the application uses multimodal AI to analyze uploaded notice images and transform complicated administrative language into clear, actionable information.

Our goal is simple: No citizen should miss an opportunity because they couldn’t understand a notice.

⸻

🚨 Problem Statement

Government notices and public circulars often contain complex administrative language, unfamiliar terminology, and lengthy instructions.

For many citizens and students, understanding these documents can be challenging because of:

* Language barriers, particularly for regional-language speakers.
* Confusing eligibility criteria and application requirements.
* Difficulty identifying deadlines and important dates.
* Unclear instructions regarding application procedures.
* Missing or unreadable information in scanned documents.
* Limited awareness of scholarship opportunities and government services.

These challenges can lead to missed deadlines, incomplete applications, and lost opportunities.

💡 Our Solution

NammaNotice AI transforms complicated public notices into simple, understandable, and actionable guidance.

Users upload an image of a public notice, and the application analyzes its contents to present important information in a structured format.

Instead of manually reading lengthy documents, users can quickly understand what the notice means, who it applies to, which documents are required, and what actions they need to take.

⸻

✨ Key Features

1. 📄 AI-Powered Notice Analysis

* Upload an image of a government notice or circular.
* Extract and interpret information from the document using a multimodal AI model.
* Convert complicated administrative content into a plain-language summary.
* Organize extracted information into structured sections.

2. 🌐 Multilingual Accessibility

The application interface and notice-analysis workflow support three languages:

* 🇬🇧 English
* 🇮🇳 ಕನ್ನಡ (Kannada)
* 🇮🇳 हिन्दी (Hindi)

This helps make public information more accessible to users with different language preferences.

3. ⏰ Deadline Detection

Identify important dates and deadlines mentioned in notices.

The application organizes deadline information to help users understand upcoming requirements and time-sensitive opportunities.

4. 🎓 Eligibility Analysis

Help users understand:

* Who can apply.
* Who may not be eligible.
* Educational requirements.
* Income criteria, when specified.
* Other eligibility conditions mentioned in the notice.

5. 📋 Required Documents

Identify documents mentioned in the notice and organize them into a readable checklist.

Users can better understand which documents are mandatory and whether any additional instructions apply.

6. 🧭 Step-by-Step Action Checklist

Convert application instructions into actionable steps.

Depending on the information available in the notice, the analysis can identify:

* Application procedures.
* Online or offline submission methods.
* Verification requirements.
* Payment-related instructions.
* Important follow-up actions.

7. 🔍 Missing Information Detection

Highlight information that may be:

* Absent from the notice.
* Blurred or unreadable.
* Ambiguous or unclear.

This helps users identify details that may require confirmation from the issuing authority.

8. 🛡️ Trust and Safety Indicators

The application includes a trust-and-safety analysis structure designed to distinguish extracted information from contextual notes and unverified claims.

It can also report document-integrity indicators and detected signature or seal information.

Important: These indicators are AI-generated observations, not proof that a document is authentic or officially verified.

9. 🤖 AI Model Connectivity

The application includes a model-status endpoint to check API configuration and attempt a live model connectivity test.

This helps identify configuration or connectivity problems before notice analysis.

⸻

🏗️ How It Works

        USER UPLOADS A NOTICE
                  |
                  v
       IMAGE / DOCUMENT INPUT
                  |
                  v
       MULTIMODAL AI ANALYSIS
                  |
                  v
       INFORMATION EXTRACTION
                  |
         +--------+--------+
         |        |        |
         v        v        v
      Summary  Deadlines Eligibility
         |        |        |
         +--------+--------+
                  |
                  v
        DOCUMENT REQUIREMENTS
                  |
                  v
       APPLICATION INSTRUCTIONS
                  |
                  v
       MISSING-INFO IDENTIFICATION
                  |
                  v
       STRUCTURED ACTION CHECKLIST
                  |
                  v
       CLEAR, ACTIONABLE GUIDANCE

The workflow converts an uploaded notice into structured information that users can understand and act upon.

⸻

🛠️ Technology Stack

Component	Technology
Frontend	React 19
Programming Language	TypeScript
Build Tool	Vite
Styling	Tailwind CSS 4
Icons	Lucide React
Animations	Motion
Backend	Node.js with Express
AI Integration	Google GenAI SDK
AI Model	Gemma model integration
Configuration	dotenv
Development Runtime	tsx

Architecture

NammaNotice AI uses a client-server architecture.

Frontend

* Provides the user interface.
* Handles notice-image selection and language preferences.
* Displays analysis results and model status.
* Sends analysis requests to the backend.

Backend

* Receives API requests.
* Communicates with Google’s AI service.
* Processes model responses.
* Returns structured notice-analysis results.
* Provides endpoints for model diagnostics and notice-related queries.

AI Layer

* Analyzes notice images.
* Extracts relevant information.
* Organizes results into structured data.
* Generates explanations and actionable guidance.

⸻

📂 Project Structure

nammanoticeAI/
│
├── src/
│   ├── components/
│   │   ├── AnalysisView.tsx
│   │   ├── Header.tsx
│   │   ├── NoticeInspectorModal.tsx
│   │   ├── RunLocallyModal.tsx
│   │   └── UploadSection.tsx
│   │
│   ├── data/
│   │   └── sampleNotices.ts
│   │
│   ├── types/
│   │   └── notice.ts
│   │
│   ├── utils/
│   │   ├── calendar.ts
│   │   ├── speech.ts
│   │   └── translations.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts

⸻

⚙️ Installation and Setup

Follow these steps to run NammaNotice AI locally.

Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git (optional, for cloning the repository)
* A Google AI API key with access to the configured model

Step 1: Clone the Repository

git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project directory:

cd nammanoticeAI

Replace YOUR_GITHUB_REPOSITORY_URL with your actual GitHub repository URL.

If you downloaded the ZIP file instead, extract it and open the extracted folder in VS Code.

Step 2: Install Dependencies

Run:

npm install

This installs the dependencies required by the frontend, backend, and AI integration.

Step 3: Configure Environment Variables

Create a .env file in the project root.

Add the following configuration:

GEMINI_API_KEY=your_google_ai_api_key
PORT=3000

Replace your_google_ai_api_key with your actual API key.

Security reminder: Never upload your real API key to GitHub or include it in frontend code.

The application uses GEMINI_API_KEY on the server side to initialize the Google GenAI SDK.

If you are running the project in Google AI Studio, configure the required secret through the platform’s Secrets settings when applicable.

Step 4: Start the Development Server

Run:

npm run dev

The application starts using the development command configured in package.json.

Open the local address displayed in your terminal. The default backend port is 3000, unless the PORT environment variable specifies another port.

Step 5: Start Analyzing Notices

Once the application is running:

1. Open NammaNotice AI in your browser.
2. Upload an image of a public notice.
3. Select your preferred language.
4. Start the AI analysis.
5. Review the summary, eligibility criteria, deadlines, required documents, and action checklist.

The results depend on the quality of the uploaded document, the model response, and the information available in the notice.

⸻

🔑 API Configuration

The application currently defines the following backend endpoints:

Endpoint	Method	Purpose
/api/status	GET	Checks API-key configuration and attempts a live model connectivity test.
/api/analyze-notice	POST	Analyzes an uploaded notice image.
/api/ask-notice	POST	Handles notice-related questions.

The analysis endpoint accepts the uploaded image data, selected language, and selected model.

The status endpoint can report configuration errors, connectivity failures, and model-response latency.

Troubleshooting

Problem: API key missing

Check that GEMINI_API_KEY is configured in the server environment.

Problem: Model connectivity error

Verify your API key, model availability, API access, and usage quota.

Problem: Notice analysis fails

Try a clearer image with readable text and ensure that the document is not excessively cropped.

Problem: Application does not start

Check that Node.js is installed and run:

npm install
npm run dev

⸻

🌍 Real-World Applications

NammaNotice AI can support several public-information use cases.

🎓 Students

Understand scholarship notifications, university circulars, examination announcements, and admission-related instructions.

🏛️ Citizens

Understand government announcements, public-service notices, and administrative instructions.

💼 Job Seekers

Identify eligibility conditions, application deadlines, and document requirements in recruitment notifications.

♿ Accessibility

Make complicated public information easier to understand through simplified explanations and multilingual support.

🏙️ Civic Awareness

Help users interpret civic announcements and public-service notifications, subject to the information contained in the uploaded document.

⸻

🚀 Innovation and Uniqueness

NammaNotice AI focuses on turning document understanding into actionable public-information assistance.

1. From Reading to Action

Rather than stopping at a summary, the application organizes information into eligibility criteria, document requirements, deadlines, and next steps.

2. Multilingual Access

The English, Kannada, and Hindi workflows are designed to reduce language barriers when interpreting public notices.

3. Missing-Information Awareness

The application can flag absent, ambiguous, or unreadable information instead of presenting every detail as certain.

4. Structured Information Extraction

The notice-analysis data model represents information in defined categories, making the results easier to navigate and understand.

5. Practical Public-Sector Use Cases

The project targets everyday problems involving scholarships, recruitment, examinations, government circulars, and civic information.

⸻

📈 Future Scope

Potential future improvements include:

* Support for PDFs and multi-page documents.
* OCR optimization for low-quality scans.
* More Indian regional languages.
* Voice-based explanations for accessibility.
* Downloadable summaries and document checklists.
* Calendar reminders for important deadlines.
* Direct links to official application portals when available in the source.
* Improved uncertainty reporting and human verification workflows.
* Integration with verified public-service information sources.
* Privacy-focused document processing and automatic deletion of uploaded files.
* Deployment with monitoring, rate limiting, and robust error handling.

These are proposed improvements and should not be considered implemented features unless they are added to the codebase.

⸻

🔐 Privacy, Reliability and Responsible AI

NammaNotice AI is designed to assist users in understanding public documents, but AI-generated results may contain errors.

Users should keep the following points in mind:

* Verify important dates and eligibility conditions against the original notice.
* Confirm application requirements through the relevant official authority.
* Do not treat AI-generated seal or signature detection as proof of authenticity.
* Avoid uploading documents containing sensitive personal information unless appropriate safeguards are in place.
* Keep API credentials confidential.
* Do not rely solely on AI output for legal, financial, educational, or government-service decisions.

The application is an information-assistance tool and does not replace official government communication.

⸻

🤝 Contributing

Contributions and suggestions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes.
5. Open a pull request describing your improvements.

Example:

git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature

⸻

📜 License

A license has not yet been specified for this project.

Before distributing or reusing the code, add an appropriate open-source license and verify the licensing terms of all third-party dependencies and model services.

⸻

💙 Our Vision

Making public information understandable, accessible, and actionable for everyone.

NammaNotice AI aims to bridge the gap between complex public documents and the people who depend on them.

NammaNotice AI

Understand the Notice. Know Your Rights. Never Miss an Opportunity.
