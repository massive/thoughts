const pptxgen = require('pptxgenjs');
const html2pptx = require('./html2pptx');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/Users/matias.kakela/code/thoughts/workspace';
const SLIDES_DIR = path.join(WORKSPACE, 'slides');

// Design tokens
const COLORS = {
  navy: '#0A2E4D',
  blue: '#00A8E8',
  orange: '#FF6B35',
  gray: '#F5F7FA',
  slate: '#1E293B',
  white: '#FFFFFF',
  lightBlue: '#E8F4FD'
};

// Create gradient background for navy sections
async function createNavyGradient(filename, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0A2E4D"/>
        <stop offset="100%" style="stop-color:#1A4A6E"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#navyGrad)"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(filename);
  return filename;
}

// Create checkmark icon
async function createCheckIcon(filename, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="${color}" opacity="0.15"/>
    <path d="M9 12l2 2 4-4" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(filename);
  return filename;
}

// Create arrow icon
async function createArrowIcon(filename, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="${color}" opacity="0.15"/>
    <path d="M5 12h14m-6-6l6 6-6 6" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(filename);
  return filename;
}

// Create down arrow for architecture
async function createDownArrow(filename) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40">
    <path d="M30 5 L30 30 M20 22 L30 32 L40 22" stroke="${COLORS.blue}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(filename);
  return filename;
}

// Slide 1: The Cost of Manual Configuration
function createSlide1HTML() {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${COLORS.gray}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  padding: 18pt 40pt 10pt 40pt;
}
.title {
  color: ${COLORS.navy}; font-size: 28pt; font-weight: bold;
  font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0;
}
.subtitle {
  color: ${COLORS.slate}; font-size: 12pt; margin: 4pt 0 0 0;
  opacity: 0.7;
}
.content {
  padding: 0 40pt;
  display: flex; flex-direction: column; gap: 8pt;
}
.card {
  background: ${COLORS.white};
  border-radius: 6pt;
  padding: 12pt 16pt;
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 2pt 6pt rgba(0,0,0,0.08);
  border-left: 5pt solid ${COLORS.blue};
}
.card-left {
  display: flex; flex-direction: column;
}
.card-number {
  color: ${COLORS.blue}; font-size: 22pt; font-weight: bold; margin: 0;
}
.card-title {
  color: ${COLORS.navy}; font-size: 12pt; font-weight: bold; margin: 2pt 0 0 0;
}
.card-subtitle {
  color: ${COLORS.slate}; font-size: 9pt; margin: 1pt 0 0 0; opacity: 0.6;
}
.card-right {
  text-align: right;
}
.card-time {
  color: ${COLORS.orange}; font-size: 12pt; font-weight: bold; margin: 0;
}
.card-time-label {
  color: ${COLORS.slate}; font-size: 8pt; margin: 1pt 0 0 0; opacity: 0.6;
}
.summary-box {
  margin: 12pt 40pt 40pt 40pt;
  background: ${COLORS.navy};
  border-radius: 6pt;
  padding: 12pt 18pt;
  display: flex; align-items: center; justify-content: space-between;
}
.summary-main {
  color: ${COLORS.white}; font-size: 14pt; font-weight: bold; margin: 0;
}
.summary-sub {
  color: ${COLORS.white}; font-size: 11pt; margin: 0; opacity: 0.8;
}
</style>
</head>
<body>
<div class="header">
  <h1 class="title">The Cost of Manual Configuration</h1>
  <p class="subtitle">Last Year's Configuration Tickets</p>
</div>

<div class="content">
  <div class="card">
    <div class="card-left">
      <p class="card-number">~600</p>
      <p class="card-title">Storage Account Management</p>
      <p class="card-subtitle">Whitelisting, credentials, access</p>
    </div>
    <div class="card-right">
      <p class="card-time">3 days</p>
      <p class="card-time-label">avg lead time</p>
    </div>
  </div>

  <div class="card">
    <div class="card-left">
      <p class="card-number">~450</p>
      <p class="card-title">IP Whitelisting</p>
      <p class="card-subtitle">Network access configuration</p>
    </div>
    <div class="card-right">
      <p class="card-time">2 days</p>
      <p class="card-time-label">avg lead time</p>
    </div>
  </div>

  <div class="card">
    <div class="card-left">
      <p class="card-number">~100</p>
      <p class="card-title">Service Principal Rotation</p>
      <p class="card-subtitle">Manual credential rotation</p>
    </div>
    <div class="card-right">
      <p class="card-time">On request</p>
      <p class="card-time-label">manual</p>
    </div>
  </div>
</div>

<div class="summary-box">
  <p class="summary-main">~1,150 tickets/year for simple configuration</p>
  <p class="summary-sub">This doesn't scale as we grow</p>
</div>
</body>
</html>`;
}

// Slide 2: The Self-Service Vision
function createSlide2HTML() {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${COLORS.gray}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  padding: 20pt 40pt 12pt 40pt;
}
.title {
  color: ${COLORS.navy}; font-size: 28pt; font-weight: bold;
  font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0;
}
.subtitle {
  color: ${COLORS.slate}; font-size: 12pt; margin: 6pt 0 0 0; opacity: 0.7;
}
.phases {
  padding: 0 40pt;
  display: flex; flex-direction: column; gap: 10pt;
}
.phase {
  background: ${COLORS.white};
  border-radius: 6pt;
  padding: 12pt 16pt;
  box-shadow: 0 2pt 6pt rgba(0,0,0,0.06);
}
.phase-highlighted {
  background: ${COLORS.lightBlue};
  border: 2pt solid ${COLORS.blue};
}
.phase-header {
  display: flex; align-items: center; gap: 10pt; margin-bottom: 6pt;
}
.phase-badge {
  background: ${COLORS.slate}; color: ${COLORS.white};
  font-size: 9pt; font-weight: bold; padding: 3pt 8pt;
  border-radius: 3pt;
}
.phase-badge-active {
  background: ${COLORS.blue};
}
.prototype-badge {
  background: ${COLORS.orange}; color: ${COLORS.white};
  font-size: 8pt; font-weight: bold; padding: 2pt 6pt;
  border-radius: 10pt;
}
.phase-title {
  color: ${COLORS.navy}; font-size: 14pt; font-weight: bold; margin: 0;
}
.phase-status {
  color: ${COLORS.slate}; font-size: 10pt; margin: 0; opacity: 0.6;
}
.phase-desc {
  color: ${COLORS.slate}; font-size: 10pt; margin: 4pt 0 0 0;
}
.metrics-row {
  display: flex; gap: 16pt; margin: 6pt 0;
}
.metric {
  color: ${COLORS.slate}; font-size: 9pt; margin: 0;
}
.metric-highlight {
  color: ${COLORS.blue}; font-weight: bold;
}
.phase-cta {
  color: ${COLORS.orange}; font-size: 10pt; font-weight: bold; margin: 6pt 0 0 0;
}
</style>
</head>
<body>
<div class="header">
  <h1 class="title">The Self-Service Vision</h1>
  <p class="subtitle">Three phases from tickets to autonomy</p>
</div>

<div class="phases">
  <div class="phase">
    <div class="phase-header">
      <div class="phase-badge"><p style="margin:0;color:white;font-size:9pt;">PHASE 1</p></div>
      <p class="phase-title">Auto-Provisioning</p>
    </div>
    <p class="phase-status">In Progress - Kasa's team</p>
    <p class="phase-desc">Salesforce -> Automated setup -> Portal access</p>
  </div>

  <div class="phase phase-highlighted">
    <div class="phase-header">
      <div class="phase-badge phase-badge-active"><p style="margin:0;color:white;font-size:9pt;">PHASE 2</p></div>
      <p class="phase-title">Customer Self-Configuration</p>
      <div class="prototype-badge"><p style="margin:0;color:white;font-size:8pt;">PROTOTYPE READY</p></div>
    </div>
    <p class="phase-status">Demo available - 6-12 month timeline</p>
    <div class="metrics-row">
      <p class="metric"><span class="metric-highlight">Storage accounts:</span> 3 days -> 2 min</p>
      <p class="metric"><span class="metric-highlight">IP whitelisting:</span> 2 days -> 30 sec</p>
      <p class="metric"><span class="metric-highlight">SP credentials:</span> On-demand</p>
    </div>
    <p class="phase-desc">+ API clients, webhooks, SSO configuration</p>
    <p class="phase-cta">-> Let me show you this working... [DEMO]</p>
  </div>

  <div class="phase">
    <div class="phase-header">
      <div class="phase-badge"><p style="margin:0;color:white;font-size:9pt;">PHASE 3</p></div>
      <p class="phase-title">Build Integrations</p>
    </div>
    <p class="phase-status">Future vision - 12-24 months</p>
    <p class="phase-desc">Customer creates transformations - Low-code interface - DM already does this</p>
    <p class="phase-cta">-> Here's where we're heading... [DEMO]</p>
  </div>
</div>
</body>
</html>`;
}

// Slide 3: This Is Real Demand
function createSlide3HTML() {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${COLORS.gray}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  padding: 16pt 40pt 8pt 40pt;
}
.title {
  color: ${COLORS.navy}; font-size: 26pt; font-weight: bold;
  font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0;
}
.subtitle {
  color: ${COLORS.slate}; font-size: 11pt; margin: 4pt 0 0 0; opacity: 0.7;
}
.examples {
  padding: 0 40pt;
  display: flex; flex-direction: column; gap: 8pt;
}
.example {
  background: ${COLORS.white};
  border-radius: 6pt;
  padding: 10pt 14pt;
  box-shadow: 0 2pt 6pt rgba(0,0,0,0.06);
  display: flex; gap: 12pt; align-items: flex-start;
}
.example-icon {
  width: 28pt; height: 28pt; flex-shrink: 0;
}
.example-content {
  flex: 1;
}
.example-company {
  color: ${COLORS.navy}; font-size: 12pt; font-weight: bold; margin: 0;
}
.example-desc {
  color: ${COLORS.slate}; font-size: 10pt; margin: 2pt 0 0 0;
}
.example-proof {
  font-size: 9pt; margin: 3pt 0 0 0; font-style: italic;
}
.proof-blue { color: ${COLORS.blue}; }
.proof-orange { color: ${COLORS.orange}; }
.insight-box {
  margin: 10pt 40pt 40pt 40pt;
  background: ${COLORS.white};
  border-radius: 6pt;
  padding: 10pt 14pt;
  border-left: 5pt solid ${COLORS.orange};
  box-shadow: 0 2pt 6pt rgba(0,0,0,0.06);
}
.insight-main {
  color: ${COLORS.navy}; font-size: 12pt; font-weight: bold; margin: 0;
}
.insight-sub {
  color: ${COLORS.slate}; font-size: 10pt; margin: 4pt 0 0 0;
}
</style>
</head>
<body>
<div class="header">
  <h1 class="title">This Is Real Demand</h1>
  <p class="subtitle">Customers are asking for this today</p>
</div>

<div class="examples">
  <div class="example">
    <img class="example-icon" src="check-blue.png">
    <div class="example-content">
      <p class="example-company">DM</p>
      <p class="example-desc">Built their own integrations independently without RELEX TC involvement</p>
      <p class="example-proof proof-blue">Proof: Customers can manage complex integrations when given the tools</p>
    </div>
  </div>

  <div class="example">
    <img class="example-icon" src="check-blue.png">
    <div class="example-content">
      <p class="example-company">ATEA</p>
      <p class="example-desc">Explicitly requesting self-service configuration capabilities</p>
      <p class="example-proof proof-blue">Proof: Enterprise customers expect modern self-service experiences</p>
    </div>
  </div>

  <div class="example">
    <img class="example-icon" src="arrow-orange.png">
    <div class="example-content">
      <p class="example-company">George's P and P Team</p>
      <p class="example-desc">Building self-service exports right now - same pattern emerging internally</p>
      <p class="example-proof proof-orange">Proof: Need is urgent - teams building workarounds without central coordination</p>
    </div>
  </div>
</div>

<div class="insight-box">
  <p class="insight-main">The question isn't "if" - it's "when" and "how"</p>
  <p class="insight-sub">We can lead with a unified platform, or watch teams build fragmented solutions</p>
</div>
</body>
</html>`;
}

// Slide 4: How The Pieces Fit Together
function createSlide4HTML() {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${COLORS.gray}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  padding: 14pt 40pt 8pt 40pt;
}
.title {
  color: ${COLORS.navy}; font-size: 24pt; font-weight: bold;
  font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0;
}
.subtitle {
  color: ${COLORS.slate}; font-size: 10pt; margin: 4pt 0 0 0; opacity: 0.7;
}
.architecture {
  padding: 0 40pt;
  display: flex; flex-direction: column; align-items: center; gap: 8pt;
}
.layer-label {
  color: ${COLORS.slate}; font-size: 8pt; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1pt; margin: 0;
}
.top-layer {
  width: 100%;
  background: ${COLORS.navy};
  border-radius: 6pt;
  padding: 12pt 20pt;
  display: flex; justify-content: center; align-items: center; gap: 16pt;
}
.portal-box {
  background: ${COLORS.white};
  border-radius: 5pt;
  padding: 8pt 18pt;
  text-align: center;
  min-width: 150pt;
}
.portal-title {
  color: ${COLORS.navy}; font-size: 11pt; font-weight: bold; margin: 0;
}
.portal-subtitle {
  color: ${COLORS.slate}; font-size: 9pt; margin: 2pt 0 0 0;
}
.connector {
  color: ${COLORS.white}; font-size: 16pt; font-weight: bold;
}
.arrow-down {
  width: 32pt; height: 20pt;
}
.bottom-layer {
  width: 100%;
  background: ${COLORS.white};
  border: 2pt solid ${COLORS.blue};
  border-radius: 6pt;
  padding: 10pt 18pt;
}
.platform-row {
  display: flex; justify-content: center; align-items: center; gap: 10pt;
  margin-bottom: 6pt;
}
.platform-box {
  background: ${COLORS.gray};
  border-radius: 5pt;
  padding: 8pt 14pt;
  text-align: center;
}
.platform-title {
  color: ${COLORS.navy}; font-size: 10pt; font-weight: bold; margin: 0;
}
.platform-connector {
  color: ${COLORS.blue}; font-size: 12pt; font-weight: bold;
}
.monitoring-row {
  display: flex; justify-content: center; margin-top: 6pt;
}
.monitoring-box {
  background: ${COLORS.lightBlue};
  border-radius: 5pt;
  padding: 6pt 14pt;
}
.monitoring-title {
  color: ${COLORS.navy}; font-size: 10pt; font-weight: bold; margin: 0;
}
.pills-row {
  display: flex; justify-content: center; gap: 8pt; margin-top: 8pt;
}
.pill {
  background: ${COLORS.orange}; color: ${COLORS.white};
  font-size: 8pt; font-weight: bold; padding: 3pt 8pt;
  border-radius: 10pt;
}
.footer-text {
  color: ${COLORS.slate}; font-size: 9pt; text-align: center;
  margin: 8pt 40pt 40pt 40pt; opacity: 0.7;
}
</style>
</head>
<body>
<div class="header">
  <h1 class="title">How The Pieces Fit Together</h1>
  <p class="subtitle">Unified customer experience across tools</p>
</div>

<div class="architecture">
  <p class="layer-label">CUSTOMER EXPERIENCE LAYER</p>
  <div class="top-layer">
    <div class="portal-box">
      <p class="portal-title">Self-Service Portal</p>
      <p class="portal-subtitle">Configuration and Access</p>
    </div>
    <p class="connector" style="margin:0;color:white;">&#8596;</p>
    <div class="portal-box">
      <p class="portal-title">Connect 3000</p>
      <p class="portal-subtitle">Integration Building</p>
    </div>
  </div>

  <img class="arrow-down" src="arrow-down.png">

  <p class="layer-label">INTEGRATION PLATFORM</p>
  <div class="bottom-layer">
    <div class="platform-row">
      <div class="platform-box">
        <p class="platform-title">Developer Portal</p>
      </div>
      <p class="platform-connector" style="margin:0;">&#8596;</p>
      <div class="platform-box">
        <p class="platform-title">Data Product Designer</p>
      </div>
      <p class="platform-connector" style="margin:0;">&#8596;</p>
      <div class="platform-box">
        <p class="platform-title">API Management</p>
      </div>
    </div>
    <div class="monitoring-row">
      <div class="monitoring-box">
        <p class="monitoring-title">Monitoring API</p>
      </div>
    </div>
    <div class="pills-row">
      <div class="pill"><p style="margin:0;color:white;font-size:8pt;">SAP Connector</p></div>
      <div class="pill"><p style="margin:0;color:white;font-size:8pt;">Batch Files</p></div>
      <div class="pill"><p style="margin:0;color:white;font-size:8pt;">Data API</p></div>
    </div>
  </div>
</div>

<p class="footer-text">All components work together to provide seamless integration experience</p>
</body>
</html>`;
}

// Slide 5: Expected Impact
function createSlide5HTML() {
  return `<!DOCTYPE html>
<html>
<head>
<style>
html { background: ${COLORS.white}; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  background: ${COLORS.gray}; font-family: Arial, sans-serif;
  display: flex; flex-direction: column;
}
.header {
  padding: 12pt 40pt 6pt 40pt;
}
.title {
  color: ${COLORS.navy}; font-size: 24pt; font-weight: bold;
  font-family: 'Trebuchet MS', Arial, sans-serif; margin: 0;
}
.subtitle {
  color: ${COLORS.slate}; font-size: 10pt; margin: 2pt 0 0 0; opacity: 0.7;
}
.content {
  padding: 0 40pt;
  display: flex; flex-direction: column; gap: 6pt;
}
.section-title {
  color: ${COLORS.navy}; font-size: 11pt; font-weight: bold; margin: 0 0 4pt 0;
}
.bars-container {
  display: flex; flex-direction: column; gap: 4pt;
}
.bar-row {
  display: flex; align-items: center; gap: 8pt;
}
.bar {
  background: ${COLORS.blue};
  height: 18pt;
  border-radius: 3pt;
  flex: 1;
  display: flex; align-items: center; padding: 0 10pt;
}
.bar-label {
  color: ${COLORS.white}; font-size: 9pt; margin: 0;
}
.bar-value {
  color: ${COLORS.navy}; font-size: 9pt; font-weight: bold; margin: 0;
  min-width: 110pt; text-align: right;
}
.summary-result {
  background: ${COLORS.blue};
  border-radius: 4pt;
  padding: 6pt 12pt;
  margin-top: 4pt;
}
.summary-text {
  color: ${COLORS.white}; font-size: 11pt; font-weight: bold; margin: 0;
}
.benefits-grid {
  display: flex; flex-wrap: wrap; gap: 6pt;
}
.benefit-card {
  background: ${COLORS.white};
  border-radius: 4pt;
  padding: 6pt 8pt;
  width: calc(33.33% - 5pt);
  box-shadow: 0 1pt 3pt rgba(0,0,0,0.06);
}
.benefit-title {
  color: ${COLORS.navy}; font-size: 9pt; font-weight: bold; margin: 0;
}
.benefit-desc {
  color: ${COLORS.slate}; font-size: 8pt; margin: 2pt 0 0 0;
}
.timeline-banner {
  margin: 8pt 40pt 40pt 40pt;
  background: ${COLORS.navy};
  border-radius: 4pt;
  padding: 8pt 16pt;
  text-align: center;
}
.timeline-text {
  color: ${COLORS.white}; font-size: 11pt; font-weight: bold; margin: 0;
}
</style>
</head>
<body>
<div class="header">
  <h1 class="title">Expected Impact</h1>
  <p class="subtitle">What changes when we ship this</p>
</div>

<div class="content">
  <p class="section-title">Ticket Elimination</p>
  <div class="bars-container">
    <div class="bar-row">
      <div class="bar">
        <p class="bar-label">600 storage tickets</p>
      </div>
      <p class="bar-value">3 days -> 2 minutes</p>
    </div>
    <div class="bar-row">
      <div class="bar">
        <p class="bar-label">450 IP whitelisting</p>
      </div>
      <p class="bar-value">2 days -> 30 seconds</p>
    </div>
    <div class="bar-row">
      <div class="bar">
        <p class="bar-label">100 SP rotations</p>
      </div>
      <p class="bar-value">Customer-controlled</p>
    </div>
  </div>

  <div class="summary-result">
    <p class="summary-text">Result: ~1,150 tickets/year eliminated</p>
  </div>

  <p class="section-title">Key Benefits</p>
  <div class="benefits-grid">
    <div class="benefit-card">
      <p class="benefit-title">For TC</p>
      <p class="benefit-desc">Focus on complex problems, not repetitive tasks</p>
    </div>
    <div class="benefit-card">
      <p class="benefit-title">For Customers</p>
      <p class="benefit-desc">Move at their own pace - minutes, not days</p>
    </div>
    <div class="benefit-card">
      <p class="benefit-title">Scalability</p>
      <p class="benefit-desc">100 or 10,000 customers - same effort</p>
    </div>
    <div class="benefit-card">
      <p class="benefit-title">Security</p>
      <p class="benefit-desc">No credential sharing via email</p>
    </div>
    <div class="benefit-card">
      <p class="benefit-title">Audit</p>
      <p class="benefit-desc">Full logging of all changes</p>
    </div>
    <div class="benefit-card">
      <p class="benefit-title">Partner Ecosystem</p>
      <p class="benefit-desc">Enable independent implementations</p>
    </div>
  </div>
</div>

<div class="timeline-banner">
  <p class="timeline-text">Timeline: Phase 2 production-ready in 6-12 months</p>
</div>
</body>
</html>`;
}

async function main() {
  console.log('Creating presentation...\n');

  // Create icons
  console.log('Creating icons...');
  await createCheckIcon(path.join(SLIDES_DIR, 'check-blue.png'), COLORS.blue);
  await createArrowIcon(path.join(SLIDES_DIR, 'arrow-orange.png'), COLORS.orange);
  await createDownArrow(path.join(SLIDES_DIR, 'arrow-down.png'));

  // Write HTML files
  console.log('Creating HTML slides...');
  fs.writeFileSync(path.join(SLIDES_DIR, 'slide1.html'), createSlide1HTML());
  fs.writeFileSync(path.join(SLIDES_DIR, 'slide2.html'), createSlide2HTML());
  fs.writeFileSync(path.join(SLIDES_DIR, 'slide3.html'), createSlide3HTML());
  fs.writeFileSync(path.join(SLIDES_DIR, 'slide4.html'), createSlide4HTML());
  fs.writeFileSync(path.join(SLIDES_DIR, 'slide5.html'), createSlide5HTML());

  // Create presentation
  console.log('Converting to PowerPoint...');
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'Self-Service Vision for External Integrations';
  pptx.author = 'R&D Monthly Meeting';

  // Convert each slide
  for (let i = 1; i <= 5; i++) {
    console.log(`  Processing slide ${i}...`);
    await html2pptx(path.join(SLIDES_DIR, `slide${i}.html`), pptx);
  }

  // Save
  const outputPath = path.join(WORKSPACE, 'Self-Service-Vision.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\nPresentation saved to: ${outputPath}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
