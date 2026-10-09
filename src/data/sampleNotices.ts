import { SampleNotice } from '../types/notice';

/**
 * Helper to convert SVG text to a PNG/JPEG DataURL via an in-memory canvas
 */
export async function svgToPngDataUrl(svgString: string, width = 800, height = 1100): Promise<string> {
  return new Promise((resolve) => {
    try {
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          const pngUrl = canvas.toDataURL('image/png');
          URL.revokeObjectURL(blobURL);
          resolve(pngUrl);
        } else {
          URL.revokeObjectURL(blobURL);
          resolve('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))));
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(blobURL);
        resolve('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))));
      };

      img.src = blobURL;
    } catch {
      resolve('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))));
    }
  });
}

export const SAMPLE_NOTICES: SampleNotice[] = [
  {
    id: 'ssp-scholarship',
    name: 'Karnataka SSP Post-Matric Scholarship Extension',
    nameKannada: 'ಕರ್ನಾಟಕ SSP ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ ವಿಸ್ತರಣೆ',
    issuer: 'Department of Social Welfare, Govt. of Karnataka',
    category: 'scholarship',
    badge: 'Govt. Circular',
    summary: 'Official notification extending the final deadline for post-matric scholarship submissions on State Scholarship Portal (SSP).',
    imageUrl: '',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
  <defs>
    <style>
      .hdr-kn { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #1e3a8a; text-anchor: middle; }
      .hdr-en { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 14px; font-weight: bold; fill: #111827; text-anchor: middle; letter-spacing: 0.5px; }
      .sub-kn { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 12px; fill: #374151; text-anchor: middle; }
      .meta { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11px; fill: #1f2937; }
      .title { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; }
      .body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11px; fill: #334155; line-height: 1.5; }
      .highlight { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11.5px; font-weight: bold; fill: #991b1b; }
      .table-hdr { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 10.5px; font-weight: bold; fill: #1e293b; }
      .table-txt { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 10px; fill: #334155; }
    </style>
  </defs>

  <!-- Page Background (Authentic Govt Paper Texture) -->
  <rect width="800" height="1100" fill="#fcfcf9"/>
  <rect x="25" y="25" width="750" height="1050" fill="none" stroke="#d1d5db" stroke-width="1.5"/>
  <rect x="30" y="30" width="740" height="1040" fill="none" stroke="#e5e7eb" stroke-width="0.75"/>

  <!-- Official Emblem Emblem Placeholder -->
  <g transform="translate(370, 48)">
    <circle cx="30" cy="30" r="28" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
    <text x="30" y="25" font-size="10" font-weight="bold" fill="#78350f" text-anchor="middle">GOVT OF</text>
    <text x="30" y="38" font-size="9" font-weight="bold" fill="#78350f" text-anchor="middle">KARNATAKA</text>
    <text x="30" y="50" font-size="8" fill="#92400e" text-anchor="middle">ಸತ್ಯಮೇವ ಜಯತೇ</text>
  </g>

  <!-- Header Text -->
  <text x="400" y="125" class="hdr-kn">ಕರ್ನಾಟಕ ಸರ್ಕಾರ - ಸಮಾಜ ಕಲ್ಯಾಣ ಇಲಾಖೆ</text>
  <text x="400" y="145" class="hdr-en">GOVERNMENT OF KARNATAKA - SOCIAL WELFARE DEPARTMENT</text>
  <text x="400" y="162" class="sub-kn">ವಿಕಾಸ ಸೌಧ, ಬೆಂಗಳೂರು - ೫೬೦ ೦೦೧ | Vikas Soudha, Bengaluru - 560 001</text>
  <line x1="50" y1="172" x2="750" y2="172" stroke="#1e3a8a" stroke-width="1.5"/>

  <!-- Reference and Date -->
  <text x="55" y="195" class="meta" font-weight="bold">ಸಂಖ್ಯೆ: ಸಕಇ/ವಿದ್ಯಾ/ಮೆ-ನಂ/೨೦೨೫-೨೬/ಸಿಆರ್-೧೦೪</text>
  <text x="55" y="210" class="meta">Ref No: SWD/SCH/POST-MAT/2025-26/CR-104</text>
  <text x="600" y="195" class="meta" font-weight="bold">ದಿನಾಂಕ / Date: 20-10-2026</text>
  <text x="600" y="210" class="meta">Bengaluru Urban</text>

  <!-- Subject Title Box -->
  <rect x="55" y="225" width="690" height="60" fill="#f1f5f9" stroke="#cbd5e1" rx="4"/>
  <text x="400" y="247" class="title">ಅಧಿಕೃತ ಸುತ್ತೋಲೆ / OFFICIAL CIRCULAR</text>
  <text x="400" y="265" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold" fill="#0369a1" text-anchor="middle">
    ವಿಷಯ: ೨೦೨೫-೨೬ನೇ ಸಾಲಿನ ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ (SSP) ಅರ್ಜಿ ಸಲ್ಲಿಕೆಯ ಕೊನೆಯ ದಿನಾಂಕ ವಿಸ್ತರಣೆ ಕುರಿತು.
  </text>
  <text x="400" y="278" font-family="'Segoe UI', sans-serif" font-size="10px" fill="#475569" text-anchor="middle">
    Sub: Final extension of deadline for online submission of Post-Matric Scholarship (SSP) for Academic Year 2025-26.
  </text>

  <!-- Body Content -->
  <text x="55" y="315" class="body">ಪ್ರಸ್ತಾವನೆ: ರಾಜ್ಯದ ವಿವಿಧ ವಿಶ್ವವಿದ್ಯಾಲಯಗಳು ಮತ್ತು ಕಾಲೇಜುಗಳಲ್ಲಿ ಪ್ರವೇಶ ಪ್ರಕ್ರಿಯೆ ವಿಳಂಬವಾಗಿರುವುದರಿಂದ ವಿದ್ಯಾರ್ಥಿಗಳ ಹಿತದೃಷ್ಟಿಯಿಂದ,</text>
  <text x="55" y="333" class="body">ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶದಲ್ಲಿ (State Scholarship Portal - SSP) ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಕೊನೆಯ ದಿನಾಂಕವನ್ನು ವಿಸ್ತರಿಸಲು ಆದೇಶಿಸಲಾಗಿದೆ.</text>
  
  <text x="55" y="360" class="body">In view of delayed university admissions and representation from student bodies across Karnataka,</text>
  <text x="55" y="378" class="body">the Department of Social Welfare hereby extends the deadline for submitting online Post-Matric scholarships.</text>

  <!-- Key Dates Table -->
  <rect x="55" y="405" width="690" height="130" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="55" y="405" width="690" height="26" fill="#e2e8f0"/>
  <text x="70" y="422" class="table-hdr">ವಿವರ / Activity Description</text>
  <text x="360" y="422" class="table-hdr">ಹಿಂದಿನ ದಿನಾಂಕ / Previous Date</text>
  <text x="540" y="422" class="table-hdr">ವಿಸ್ತರಿಸಿದ ದಿನಾಂಕ / Extended Deadline</text>
  <line x1="55" y1="431" x2="745" y2="431" stroke="#94a3b8"/>

  <text x="70" y="455" class="table-txt">Online Application Submission on SSP Portal</text>
  <text x="360" y="455" class="table-txt">31-10-2026</text>
  <text x="540" y="455" class="highlight">15-11-2026 (11:59 PM)</text>

  <line x1="55" y1="467" x2="745" y2="467" stroke="#e2e8f0"/>
  <text x="70" y="488" class="table-txt">College Verification & E-Attestation by Nodal Officer</text>
  <text x="360" y="488" class="table-txt">07-11-2026</text>
  <text x="540" y="488" class="table-txt" font-weight="bold" fill="#0f766e">25-11-2026</text>

  <line x1="55" y1="500" x2="745" y2="500" stroke="#e2e8f0"/>
  <text x="70" y="521" class="table-txt">Taluk Welfare Office Hardcopy Verification</text>
  <text x="360" y="521" class="table-txt">15-11-2026</text>
  <text x="540" y="521" class="table-txt" font-weight="bold">30-11-2026</text>

  <!-- Eligibility Section -->
  <text x="55" y="565" class="meta" font-weight="bold" fill="#1e3a8a">ಅರ್ಹತೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳು / Eligibility & Mandatory Conditions:</text>
  <text x="65" y="585" class="body">1. SC/ST ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಮಿತಿ ₹2.50 ಲಕ್ಷಗಳು. OBC (Cat-1/2A/2B/3A/3B) ಗೆ ₹1.00 ಲಕ್ಷ.</text>
  <text x="65" y="603" class="body">2. ವಿದ್ಯಾರ್ಥಿಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಕಡ್ಡಾಯವಾಗಿ ಆಧಾರ್ ಕಾರ್ಡ್ ಸೀಡಿಂಗ್ (Aadhaar NPCI Mapping) ಆಗಿರಬೇಕು.</text>
  <text x="65" y="621" class="body">3. Candidate must be enrolled in recognized Diploma / Degree / PG course in Karnataka for 2025-26.</text>
  <text x="65" y="639" class="body">4. Applications must be completed via official portal: https://ssp.postmatric.karnataka.gov.in</text>

  <!-- Required Documents Box -->
  <rect x="55" y="655" width="690" height="120" fill="#f8fafc" stroke="#cbd5e1" rx="4"/>
  <text x="70" y="677" class="meta" font-weight="bold" fill="#0f172a">ಲಗತ್ತಿಸಬೇಕಾದ ದಾಖಲೆಗಳು / Required Documents for E-Attestation:</text>
  <text x="75" y="697" class="table-txt">• RD ಸಂಖ್ಯೆ ಹೊಂದಿರುವ ಜಾತಿ ಮತ್ತು ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ (Caste & Income RD Certificate)</text>
  <text x="75" y="715" class="table-txt">• SSLC / 10th Marks Card (Registration Number for Kutumba matching)</text>
  <text x="75" y="733" class="table-txt">• Current Year College Fee Receipt with University Registration Number (UUCMS ID)</text>
  <text x="75" y="751" class="table-txt">• Hosteller certificate issued by Taluk Social Welfare Officer (if residing in Govt Hostel)</text>
  <text x="75" y="767" class="table-txt">• Disability Certificate issued by UDID portal (if applicable for 40%+ benchmark disability)</text>

  <!-- Contact & Helpline -->
  <rect x="55" y="790" width="690" height="60" fill="#eff6ff" stroke="#bfdbfe" rx="4"/>
  <text x="70" y="810" class="meta" font-weight="bold" fill="#1d4ed8">ಸಹಾಯವಾಣಿ / Contact & Citizen Helpline:</text>
  <text x="70" y="828" class="body">ಸಹಾಯವಾಣಿ ಕೇಂದ್ರ (Toll Free): 1902 | ಕಚೇರಿ ದೂರವಾಣಿ: 080-22634300 / 080-22634333</text>
  <text x="70" y="842" class="body">E-mail: postmatric-swd@karnataka.gov.in | Portal: https://ssp.postmatric.karnataka.gov.in</text>

  <!-- Official Sign & Seal -->
  <g transform="translate(100, 870)">
    <circle cx="50" cy="50" r="42" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4 2"/>
    <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" stroke-width="1"/>
    <text x="50" y="42" font-size="8.5" font-weight="bold" fill="#1d4ed8" text-anchor="middle">SOCIAL WELFARE DEPT</text>
    <text x="50" y="54" font-size="8" fill="#1d4ed8" text-anchor="middle">GOVT OF KARNATAKA</text>
    <text x="50" y="66" font-size="7.5" fill="#1d4ed8" text-anchor="middle">SEAL / ಮುದ್ರೆ</text>
  </g>

  <g transform="translate(520, 890)">
    <path d="M 10 25 Q 30 5 60 20 T 110 15 T 150 22" fill="none" stroke="#0f172a" stroke-width="1.8"/>
    <text x="80" y="45" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">ಜಂಟಿ ನಿರ್ದೇಶಕರು (ವಿದ್ಯಾರ್ಥಿವೇತನ)</text>
    <text x="80" y="60" font-size="10" fill="#334155" text-anchor="middle">Joint Director (Scholarships)</text>
    <text x="80" y="73" font-size="9" fill="#64748b" text-anchor="middle">Directorate of Social Welfare, Bengaluru</text>
  </g>

  <!-- Footer Disclaimer text -->
  <line x1="50" y1="1020" x2="750" y2="1020" stroke="#e2e8f0"/>
  <text x="400" y="1040" font-size="8.5" fill="#94a3b8" text-anchor="middle">
    ಪ್ರತಿಗಳನ್ನು: ಎಲ್ಲಾ ಜಿಲ್ಲಾ ಸಮಾಜ ಕಲ್ಯಾಣಾಧಿಕಾರಿಗಳು, ಕಾಲೇಜು ಪ್ರಾಂಶುಪಾಲರು, ನಿರ್ದೇಶಕರು, ಡಿ.ಸಿ.ಇ ಹಾಗೂ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಇಲಾಖೆಗೆ ಮಾಹಿತಿಗಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ.
  </text>
</svg>`,
  },
  {
    id: 'bbmp-ots-tax',
    name: 'BBMP Bengaluru Property Tax OTS 50% Penalty Waiver',
    nameKannada: 'ಬಿಬಿಎಂಪಿ ಆಸ್ತಿ ತೆರಿಗೆ ೫೦% ಬಡ್ಡಿ ಮನ್ನಾ ಸುತ್ತೋಲೆ',
    issuer: 'Bruhat Bengaluru Mahanagara Palike (BBMP Revenue Dept)',
    category: 'civic_bbmp',
    badge: 'Civic Notice',
    summary: 'One-Time Settlement (OTS) scheme offering 50% interest concession and 100% penalty waiver for Bangalore property tax defaulters.',
    imageUrl: '',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
  <defs>
    <style>
      .bbmp-hdr { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 16px; font-weight: bold; fill: #7c2d12; text-anchor: middle; }
      .bbmp-sub { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #1e293b; text-anchor: middle; }
      .bbmp-body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11px; fill: #334155; }
    </style>
  </defs>

  <rect width="800" height="1100" fill="#fffdfa"/>
  <rect x="25" y="25" width="750" height="1050" fill="none" stroke="#ea580c" stroke-width="2"/>
  <rect x="30" y="30" width="740" height="1040" fill="none" stroke="#fdba74" stroke-width="0.75"/>

  <!-- BBMP Logo Area -->
  <g transform="translate(370, 48)">
    <rect x="5" y="5" width="50" height="50" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
    <text x="30" y="27" font-size="11" font-weight="bold" fill="#9a3412" text-anchor="middle">BBMP</text>
    <text x="30" y="42" font-size="9" font-weight="bold" fill="#c2410c" text-anchor="middle">ಬೆಂಗಳೂರು</text>
  </g>

  <text x="400" y="125" class="bbmp-hdr">ಬೃಹತ್ ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ</text>
  <text x="400" y="145" class="bbmp-sub">BRUHAT BENGALURU MAHANAGARA PALIKE (BBMP)</text>
  <text x="400" y="162" font-family="'Segoe UI', sans-serif" font-size="11px" fill="#64748b" text-anchor="middle">
    ಕಂದಾಯ ವಿಭಾಗ, ಎನ್.ಆರ್. ಚೌಕ, ಬೆಂಗಳೂರು - ೫೬೦ ೦೦೨ | Revenue Department, N.R. Square, Bengaluru
  </text>
  <line x1="50" y1="172" x2="750" y2="172" stroke="#ea580c" stroke-width="1.5"/>

  <text x="55" y="195" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold">ಕ್ರ.ಸಂಖ್ಯೆ: ಬಿಬಿಎಂಪಿ/ಕಂ/ಒಟಿಎಸ್/೨೦೨೬/ಅಧಿಸೂಚನೆ-೭೭೨</text>
  <text x="55" y="210" font-family="'Segoe UI', sans-serif" font-size="10.5px">Ref: BBMP/REV/OTS/2026/NOTIF-772</text>
  <text x="610" y="195" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold">ದಿನಾಂಕ: 12-10-2026</text>
  <text x="610" y="210" font-family="'Segoe UI', sans-serif" font-size="10.5px">Bengaluru</text>

  <!-- Alert Title -->
  <rect x="55" y="225" width="690" height="70" fill="#fef2f2" stroke="#fca5a5" rx="6"/>
  <text x="400" y="248" font-family="'Segoe UI', sans-serif" font-size="14px" font-weight="bold" fill="#991b1b" text-anchor="middle">
    ವಿಶೇಷ ಒನ್-ಟೈಮ್ ಸೆಟ್ಲ್‌ಮೆಂಟ್ (OTS) ಆಸ್ತಿ ತೆರಿಗೆ ರಿಯಾಯಿತಿ ಯೋಜನೆ
  </text>
  <text x="400" y="268" font-family="'Segoe UI', sans-serif" font-size="11.5px" font-weight="bold" fill="#1f2937" text-anchor="middle">
    ONE-TIME SETTLEMENT (OTS) SCHEME: 50% INTEREST WAIVER ON PROPERTY TAX ARREARS
  </text>
  <text x="400" y="284" font-family="'Segoe UI', sans-serif" font-size="10px" fill="#dc2626" text-anchor="middle">
    Under Section 144 of the BBMP Act 2020 &amp; Govt Order No. UDD 84 MNY 2026
  </text>

  <!-- Core Body Content -->
  <text x="55" y="325" class="bbmp-body" font-weight="bold">ನಾಗರಿಕರ ಗಮನಕ್ಕೆ / PUBLIC NOTICE TO BENGALURU CITIZENS &amp; PROPERTY OWNERS:</text>
  <text x="55" y="345" class="bbmp-body">ಬೆಂಗಳೂರು ಮಹಾನಗರ ಪಾಲಿಕೆ ವ್ಯಾಪ್ತಿಯ ವಸತಿ ಮತ್ತು ವಾಣಿಜ್ಯ ಆಸ್ತಿ ಮಾಲೀಕರಿಗೆ ಬಾಕಿ ಉಳಿದಿರುವ ಆಸ್ತಿ ತೆರಿಗೆಯನ್ನು ಪಾವತಿಸಲು</text>
  <text x="55" y="362" class="bbmp-body">ಸರ್ಕಾರವು ಸುವರ್ಣ ಅವಕಾಶವನ್ನು ಕಲ್ಪಿಸಿದೆ. ನಿಗದಿತ ಅವಧಿಯೊಳಗೆ ಪೂರ್ಣ ತೆರಿಗೆ ಪಾವತಿಸಿದರೆ ಶೇ. ೫೦ರಷ್ಟು ಬಡ್ಡಿಯನ್ನು ಮನ್ನಾ ಮಾಡಲಾಗುವುದು.</text>

  <text x="55" y="390" class="bbmp-body">All residential, commercial, industrial and vacant land owners who have pending property tax dues for</text>
  <text x="55" y="407" class="bbmp-body">previous financial years are eligible to clear arrears under this OTS relief window.</text>

  <!-- Concession Grid -->
  <rect x="55" y="425" width="690" height="110" fill="#fff7ed" stroke="#fed7aa" rx="4"/>
  <text x="75" y="450" font-family="'Segoe UI', sans-serif" font-size="12px" font-weight="bold" fill="#9a3412">ಯೋಜನೆಯ ಪ್ರಮುಖ ಮುಖ್ಯಾಂಶಗಳು / Scheme Highlights:</text>
  <text x="80" y="472" class="bbmp-body">• 100% Penalty (ದಂಡ) completely waived for unpaid financial years prior to 2025-26.</text>
  <text x="80" y="490" class="bbmp-body">• 50% Interest Concession (ಬಡ್ಡಿಯಲ್ಲಿ ಶೇ. ೫೦ ರಿಯಾಯಿತಿ) on accrued overdue interest amount.</text>
  <text x="80" y="508" class="bbmp-body">• Non-residential buildings will not face distraint warrant or water/power disconnection if settled under OTS.</text>
  <text x="80" y="524" class="bbmp-body">• Final Last Date for Availing OTS: 30th NOVEMBER 2026 (No further extensions permitted).</text>

  <!-- How to Pay -->
  <text x="55" y="560" font-family="'Segoe UI', sans-serif" font-size="12px" font-weight="bold" fill="#1e3a8a">ಪಾವತಿ ವಿಧಾನ / How &amp; Where to Pay:</text>
  <text x="65" y="580" class="bbmp-body">1. Online: Visit official BBMP tax portal: https://bbmptax.karnataka.gov.in (Enter 10-digit SAS PID).</text>
  <text x="65" y="598" class="bbmp-body">2. Counters: Any BangaloreOne Center across Bengaluru (Cash / Demand Draft / UPI accepted up to ₹50,000).</text>
  <text x="65" y="616" class="bbmp-body">3. ARO Office: Respective BBMP Ward Assistant Revenue Officer office with original tax challan.</text>

  <!-- Missing info tear area simulation (Intentional for Gemma 4 testing!) -->
  <rect x="55" y="640" width="690" height="90" fill="#fef2f2" stroke="#f87171" stroke-dasharray="6 3" rx="4"/>
  <text x="70" y="662" font-family="'Segoe UI', sans-serif" font-size="11.5px" font-weight="bold" fill="#b91c1c">
    [ಗಮನಿಸಿ: ವಿಶೇಷ ವಾರ್ಡ್ ಕೌಂಟರ್ ವಿವರಗಳು - ಭಾಗಶಃ ಅಸ್ಪಷ್ಟ / NOTE: SPECIAL WARD COUNTER LISTING PARTIALLY TORN]
  </text>
  <text x="70" y="682" font-family="'Segoe UI', sans-serif" font-size="10.5px" fill="#7f1d1d">
    Ward 150 to 198 special weekend payment counters at Bommanahalli &amp; Mahadevapura zones:
  </text>
  <text x="70" y="700" font-family="'Segoe UI', sans-serif" font-size="10px" fill="#991b1b" font-style="italic">
    "Counter working hours: [Text obscured by paper crease / torn fold] ... Contact local ARO for updated schedule."
  </text>
  <text x="70" y="718" font-family="'Segoe UI', sans-serif" font-size="9.5px" fill="#6b7280">
    (Forensic AI Note: Official counter hours for southern wards must be verified via helpline).
  </text>

  <!-- Contact & Helpline -->
  <rect x="55" y="750" width="690" height="70" fill="#f8fafc" stroke="#cbd5e1" rx="4"/>
  <text x="70" y="772" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold" fill="#0f172a">ಸಹಾಯವಾಣಿ / BBMP Citizen Helpline:</text>
  <text x="70" y="790" class="bbmp-body">BBMP Central Control Room: 080-22660000 | WhatsApp Grievance: 9480685700</text>
  <text x="70" y="806" class="bbmp-body">Email: contactusbbmp@gmail.com | Website: https://bbmp.karnataka.gov.in</text>

  <!-- Official Stamp & Commissioner Sign -->
  <g transform="translate(100, 850)">
    <circle cx="50" cy="50" r="42" fill="none" stroke="#ea580c" stroke-width="2"/>
    <text x="50" y="44" font-size="8.5" font-weight="bold" fill="#c2410c" text-anchor="middle">COMMISSIONER</text>
    <text x="50" y="56" font-size="8" fill="#ea580c" text-anchor="middle">BBMP REVENUE</text>
    <text x="50" y="68" font-size="8" fill="#9a3412" text-anchor="middle">BENGALURU</text>
  </g>

  <g transform="translate(510, 860)">
    <path d="M 20 30 Q 60 5 90 25 T 140 18" fill="none" stroke="#0f172a" stroke-width="2"/>
    <text x="80" y="52" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">ವಿಶೇಷ ಆಯುಕ್ತರು (ಕಂದಾಯ)</text>
    <text x="80" y="68" font-size="10" fill="#334155" text-anchor="middle">Special Commissioner (Revenue)</text>
    <text x="80" y="82" font-size="9" fill="#64748b" text-anchor="middle">Bruhat Bengaluru Mahanagara Palike</text>
  </g>
</svg>`,
  },
  {
    id: 'vtu-exam-circular',
    name: 'VTU Belagavi Semester Exam & Fast-Track Revaluation',
    nameKannada: 'ವಿಟಿಯು ಬೆಳಗಾವಿ ಪರೀಕ್ಷಾ ಮತ್ತು ಮರುಮೌಲ್ಯಮಾಪನ ಸುತ್ತೋಲೆ',
    issuer: 'Visvesvaraya Technological University, Belagavi',
    category: 'university_exam',
    badge: 'University Notice',
    summary: 'Revised circular regarding examination form filling and revaluation schedule for B.E./B.Tech 3rd and 5th Semester students.',
    imageUrl: '',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
  <defs>
    <style>
      .vtu-hdr { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #065f46; text-anchor: middle; }
      .vtu-body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11px; fill: #1e293b; }
    </style>
  </defs>

  <rect width="800" height="1100" fill="#fcfffd"/>
  <rect x="25" y="25" width="750" height="1050" fill="none" stroke="#059669" stroke-width="1.5"/>

  <!-- University Emblem -->
  <g transform="translate(370, 48)">
    <circle cx="30" cy="30" r="28" fill="#ecfdf5" stroke="#059669" stroke-width="1.5"/>
    <text x="30" y="28" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">VTU</text>
    <text x="30" y="42" font-size="9" fill="#065f46" text-anchor="middle">BELAGAVI</text>
  </g>

  <text x="400" y="125" class="vtu-hdr">ವಿಶ್ವೇಶ್ವರಯ್ಯ ತಾಂತ್ರಿಕ ವಿಶ್ವವಿದ್ಯಾಲಯ, ಬೆಳಗಾವಿ</text>
  <text x="400" y="145" font-family="'Segoe UI', sans-serif" font-size="13px" font-weight="bold" fill="#0f172a" text-anchor="middle">
    VISVESVARAYA TECHNOLOGICAL UNIVERSITY, BELAGAVI
  </text>
  <text x="400" y="162" font-family="'Segoe UI', sans-serif" font-size="11px" fill="#475569" text-anchor="middle">
    "Jnana Sangama", Belagavi - 590 018, Karnataka State, India
  </text>
  <line x1="50" y1="172" x2="750" y2="172" stroke="#059669" stroke-width="1.5"/>

  <text x="55" y="195" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold">Ref: VTU/BGM/EXAM-CR/2026/Cir-119</text>
  <text x="610" y="195" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold">Date: 15-10-2026</text>

  <!-- Title -->
  <rect x="55" y="220" width="690" height="55" fill="#f0fdf4" stroke="#86efac" rx="4"/>
  <text x="400" y="243" font-family="'Segoe UI', sans-serif" font-size="13px" font-weight="bold" fill="#14532d" text-anchor="middle">
    CIRCULAR: B.E. / B.TECH III &amp; V SEMESTER EXAMINATION FORM FILING &amp; REVALUATION
  </text>
  <text x="400" y="260" font-family="'Segoe UI', sans-serif" font-size="11px" fill="#166534" text-anchor="middle">
    Schedule for November/December 2026 University Examinations
  </text>

  <!-- Key Dates -->
  <text x="55" y="300" class="vtu-body" font-weight="bold">IMPORTANT DEADLINES &amp; FEE SCHEDULE:</text>
  <rect x="55" y="315" width="690" height="110" fill="#ffffff" stroke="#94a3b8"/>
  <rect x="55" y="315" width="690" height="24" fill="#f1f5f9"/>
  <text x="70" y="331" font-size="10.5px" font-weight="bold" fill="#0f172a">Particulars / Event</text>
  <text x="400" y="331" font-size="10.5px" font-weight="bold" fill="#0f172a">Cutoff Date</text>
  <text x="580" y="331" font-size="10.5px" font-weight="bold" fill="#0f172a">Fee / Penalty</text>

  <text x="70" y="358" font-size="10.5px" fill="#334155">Filing of Examination Application Forms without penalty</text>
  <text x="400" y="358" font-size="10.5px" font-weight="bold" fill="#15803d">28-10-2026</text>
  <text x="580" y="358" font-size="10.5px" fill="#334155">Standard Exam Fee</text>

  <line x1="55" y1="370" x2="745" y2="370" stroke="#f1f5f9"/>
  <text x="70" y="392" font-size="10.5px" fill="#334155">Filing with Penal Fee (Late Application Window)</text>
  <text x="400" y="392" font-size="10.5px" font-weight="bold" fill="#b91c1c">02-11-2026</text>
  <text x="580" y="392" font-size="10.5px" font-weight="bold" fill="#b91c1c">+ ₹500/- Fine</text>

  <!-- Instructions -->
  <text x="55" y="455" class="vtu-body" font-weight="bold">APPLICATION GUIDELINES FOR STUDENTS &amp; COLLEGES:</text>
  <text x="65" y="475" class="vtu-body">1. Candidate must login via portal: https://prexam.vtu.ac.in using student credentials (USN &amp; password).</text>
  <text x="65" y="493" class="vtu-body">2. Revaluation fee: ₹400 per subject. Photocopy of answer scripts: ₹300 per subject.</text>
  <text x="65" y="511" class="vtu-body">3. Principals must approve candidate attendance (&gt;= 75% mandatory) before confirming examination hall ticket.</text>
  <text x="65" y="529" class="vtu-body">4. Offline applications or late submissions beyond 02-11-2026 will NOT be entertained under any circumstances.</text>

  <!-- Signature & Seal -->
  <g transform="translate(100, 580)">
    <circle cx="45" cy="45" r="40" fill="none" stroke="#059669" stroke-width="1.5"/>
    <text x="45" y="40" font-size="8" font-weight="bold" fill="#047857" text-anchor="middle">REGISTRAR (EVAL)</text>
    <text x="45" y="52" font-size="8" fill="#065f46" text-anchor="middle">VTU BELAGAVI</text>
  </g>
  <g transform="translate(520, 600)">
    <path d="M 15 20 Q 40 5 80 18 T 130 15" fill="none" stroke="#064e3b" stroke-width="1.8"/>
    <text x="70" y="42" font-size="11" font-weight="bold" fill="#064e3b" text-anchor="middle">ಕುಲಸಚಿವರು (ಮೌಲ್ಯಮಾಪನ)</text>
    <text x="70" y="56" font-size="10" fill="#334155" text-anchor="middle">Registrar (Evaluation)</text>
  </g>
</svg>`,
  },
  {
    id: 'bmrcl-metro-recruitment',
    name: 'BMRCL Namma Metro Apprentice Walk-in Verification',
    nameKannada: 'ನಮ್ಮ ಮೆಟ್ರೋ - BMRCL ಅಪ್ರೆಂಟಿಸ್ ನೇಮಕಾತಿ ಅಧಿಸೂಚನೆ',
    issuer: 'Bangalore Metro Rail Corporation Limited (BMRCL)',
    category: 'recruitment',
    badge: 'Recruitment Notice',
    summary: 'Notification for walk-in document verification and selection of Graduate and Diploma Apprentices in Civil, Electrical and Signalling streams.',
    imageUrl: '',
    svgContent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" width="800" height="1100">
  <defs>
    <style>
      .metro-hdr { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #4338ca; text-anchor: middle; }
      .metro-body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11px; fill: #1e293b; }
    </style>
  </defs>

  <rect width="800" height="1100" fill="#fafaff"/>
  <rect x="25" y="25" width="750" height="1050" fill="none" stroke="#6366f1" stroke-width="1.5"/>

  <!-- Metro Logo Area -->
  <g transform="translate(370, 48)">
    <circle cx="30" cy="30" r="28" fill="#e0e7ff" stroke="#4f46e5" stroke-width="1.5"/>
    <text x="30" y="28" font-size="9" font-weight="bold" fill="#3730a3" text-anchor="middle">NAMMA</text>
    <text x="30" y="42" font-size="9" font-weight="bold" fill="#3730a3" text-anchor="middle">METRO</text>
  </g>

  <text x="400" y="125" class="metro-hdr">ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ರೈಲು ಕಾರ್ಪೊರೇಷನ್ ಲಿಮಿಟೆಡ್</text>
  <text x="400" y="145" font-family="'Segoe UI', sans-serif" font-size="13px" font-weight="bold" fill="#1e1b4b" text-anchor="middle">
    BANGALORE METRO RAIL CORPORATION LIMITED (BMRCL)
  </text>
  <text x="400" y="162" font-family="'Segoe UI', sans-serif" font-size="11px" fill="#475569" text-anchor="middle">
    3rd Floor, BMTC Complex, K.H. Road, Shantinagar, Bengaluru - 560 027
  </text>
  <line x1="50" y1="172" x2="750" y2="172" stroke="#4f46e5" stroke-width="1.5"/>

  <text x="55" y="195" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold">Notification No: BMRCL/HR/TRN/2026/APPR-04</text>
  <text x="610" y="195" font-family="'Segoe UI', sans-serif" font-size="11px" font-weight="bold">Date: 18-10-2026</text>

  <!-- Title -->
  <rect x="55" y="220" width="690" height="55" fill="#eef2ff" stroke="#a5b4fc" rx="4"/>
  <text x="400" y="243" font-family="'Segoe UI', sans-serif" font-size="13px" font-weight="bold" fill="#312e81" text-anchor="middle">
    WALK-IN DOCUMENT VERIFICATION FOR ENGAGEMENT OF APPRENTICES (2026-27)
  </text>
  <text x="400" y="260" font-family="'Segoe UI', sans-serif" font-size="10.5px" fill="#4338ca" text-anchor="middle">
    Under Apprenticeship Act 1961 for Engineering Degree &amp; Diploma Holders
  </text>

  <!-- Details -->
  <text x="55" y="300" class="metro-body" font-weight="bold">SCHEDULE &amp; VENUE FOR VERIFICATION:</text>
  <rect x="55" y="315" width="690" height="90" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="75" y="340" class="metro-body"><tspan font-weight="bold">Date &amp; Time:</tspan> 10-11-2026 at 09:30 AM (Sharp)</text>
  <text x="75" y="362" class="metro-body"><tspan font-weight="bold">Venue:</tspan> BMRCL Training Institute, Metro Operation Control Centre, Baiyappanahalli, Bengaluru</text>
  <text x="75" y="384" class="metro-body"><tspan font-weight="bold">Monthly Stipend:</tspan> ₹12,000 for Graduate Apprentices | ₹10,500 for Technician (Diploma) Apprentices</text>

  <!-- Eligibility -->
  <text x="55" y="430" class="metro-body" font-weight="bold">ELIGIBILITY CRITERIA:</text>
  <text x="65" y="450" class="metro-body">1. B.E. / B.Tech or 3-Year Diploma in Electrical / Mechanical / Civil / Electronics passed in 2024, 2025, or 2026.</text>
  <text x="65" y="468" class="metro-body">2. Minimum 60% aggregate marks (50% for SC/ST/PwD candidates).</text>
  <text x="65" y="486" class="metro-body">3. Candidate must be a domicile of Karnataka with valid Domicile / Kannada medium certificate.</text>
  <text x="65" y="504" class="metro-body">4. Must be registered on NATS portal (https://nats.education.gov.in) with 16-digit enrollment number.</text>

  <!-- Documents to Bring -->
  <text x="55" y="540" class="metro-body" font-weight="bold">MANDATORY DOCUMENTS TO CARRY (Original + 2 sets self-attested copies):</text>
  <text x="65" y="560" class="metro-body">• Printout of NATS Enrollment Slip &amp; Online Registration</text>
  <text x="65" y="578" class="metro-body">• Degree / Diploma Convocation or Provisional Passing Certificate</text>
  <text x="65" y="596" class="metro-body">• All Semester Marksheets (Consolidated Marks Card)</text>
  <text x="65" y="614" class="metro-body">• Caste Certificate / Income Certificate (if claiming reservation)</text>
  <text x="65" y="632" class="metro-body">• Aadhaar Card and 4 recent passport size photographs</text>

  <!-- Seal & Sign -->
  <g transform="translate(100, 680)">
    <circle cx="45" cy="45" r="40" fill="none" stroke="#4f46e5" stroke-width="1.5"/>
    <text x="45" y="42" font-size="8.5" font-weight="bold" fill="#4338ca" text-anchor="middle">GENERAL MANAGER</text>
    <text x="45" y="54" font-size="8" fill="#4338ca" text-anchor="middle">HR - BMRCL</text>
  </g>
  <g transform="translate(520, 700)">
    <path d="M 20 20 Q 50 2 90 20 T 140 15" fill="none" stroke="#1e1b4b" stroke-width="1.8"/>
    <text x="80" y="42" font-size="11" font-weight="bold" fill="#1e1b4b" text-anchor="middle">ಮಹಾವ್ಯವಸ್ಥಾಪಕರು (ಮಾನವ ಸಂಪನ್ಮೂಲ)</text>
    <text x="80" y="58" font-size="10" fill="#334155" text-anchor="middle">General Manager (HR)</text>
    <text x="80" y="72" font-size="9" fill="#64748b" text-anchor="middle">Bangalore Metro Rail Corp. Ltd.</text>
  </g>
</svg>`,
  },
];
