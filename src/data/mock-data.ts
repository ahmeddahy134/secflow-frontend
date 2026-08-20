import type { Repository, ScanJob, Finding, Report, Deployment, Alert, Notification, AuditLogEntry, MonitoringMetric, TimeSeriesPoint, PipelineStage, DeploymentStage } from '@/types';

// ── Repositories ──
export const mockRepositories: Repository[] = [
  { id: '1', name: 'ecommerce-api', url: 'https://github.com/secflow/ecommerce-api', branch: 'main', language: 'TypeScript', lastScan: 'May 30, 11:04 AM', lastScanStatus: 'completed', securityScore: 82, isConnected: true },
  { id: '2', name: 'user-service', url: 'https://github.com/secflow/user-service', branch: 'develop', language: 'Python', lastScan: 'May 29, 3:45 PM', lastScanStatus: 'failed', securityScore: 64, isConnected: true },
  { id: '3', name: 'payment-gateway', url: 'https://github.com/secflow/payment-gateway', branch: 'main', language: 'Go', lastScan: 'May 18, 08:41 AM', lastScanStatus: 'completed', securityScore: 91, isConnected: true },
  { id: '4', name: 'mobile-app', url: 'https://github.com/secflow/mobile-app', branch: 'release/v1.3', language: 'TypeScript', lastScan: 'May 17, 04:32 PM', lastScanStatus: 'running', securityScore: 75, isConnected: true },
];

// ── Pipeline Stages ──
export const mockPipelineStages: PipelineStage[] = [
  { id: '1', name: 'Clone', status: 'completed', duration: '3s', order: 1 },
  { id: '2', name: 'Sandbox', status: 'completed', duration: '45s', order: 2 },
  { id: '3', name: 'SAST', status: 'completed', duration: '2m 41s', order: 3 },
  { id: '4', name: 'DAST', status: 'running', duration: null, order: 4 },
  { id: '5', name: 'Dependencies', status: 'pending', duration: null, order: 5 },
  { id: '6', name: 'Secrets', status: 'pending', duration: null, order: 6 },
  { id: '7', name: 'Report', status: 'pending', duration: null, order: 7 },
  { id: '8', name: 'Deploy', status: 'pending', duration: null, order: 8 },
];

// ── Security Pipeline (12-step from wireframes) ──
export const mockSecurityPipeline: PipelineStage[] = [
  { id: 'sp-1', name: 'Repository Submitted', status: 'completed', duration: null, order: 1 },
  { id: 'sp-2', name: 'Clone & Sandbox', status: 'completed', duration: null, order: 2 },
  { id: 'sp-3', name: 'Analysis', status: 'completed', duration: null, order: 3 },
  { id: 'sp-4', name: 'Manifest Generation', status: 'completed', duration: null, order: 4 },
  { id: 'sp-5', name: 'SAST', status: 'completed', duration: null, order: 5 },
  { id: 'sp-6', name: 'Dependency Analysis', status: 'completed', duration: null, order: 6 },
  { id: 'sp-7', name: 'DAST', status: 'completed', duration: null, order: 7 },
  { id: 'sp-8', name: 'AI Intelligence', status: 'running', duration: null, order: 8 },
  { id: 'sp-9', name: 'Auto Fix', status: 'pending', duration: null, order: 9 },
  { id: 'sp-10', name: 'Revalidate', status: 'pending', duration: null, order: 10 },
  { id: 'sp-11', name: 'CI/CD', status: 'pending', duration: null, order: 11 },
  { id: 'sp-12', name: 'Deploy', status: 'pending', duration: null, order: 12 },
];

// ── Scan Jobs ──
export const mockScanJobs: ScanJob[] = [
  {
    id: '1057', repositoryId: '1', repositoryName: 'acme/checkout-service', branch: 'main',
    status: 'completed', startedAt: 'May 30, 11:06 AM', completedAt: 'May 30, 11:04 AM',
    duration: '1m 01s', stages: mockPipelineStages, totalFindings: 132,
    findingsBySeverity: { critical: 15, high: 32, medium: 62, low: 23, info: 0 },
  },
  {
    id: '1056', repositoryId: '2', repositoryName: 'acme/auth-service', branch: 'main',
    status: 'failed', startedAt: 'May 29, 3:45 PM', completedAt: 'May 29, 3:50 PM',
    duration: '4m 17s', stages: [], totalFindings: 0,
    findingsBySeverity: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
  },
  {
    id: '1055', repositoryId: '3', repositoryName: 'acme/payment-gateway', branch: 'main',
    status: 'completed', startedAt: 'May 18, 08:41 AM', completedAt: 'May 18, 08:56 AM',
    duration: '15m 20s', stages: [], totalFindings: 48,
    findingsBySeverity: { critical: 2, high: 8, medium: 18, low: 20, info: 0 },
  },
];

// ── Findings ──
export const mockFindings: Finding[] = [
  {
    id: 'f-1', scanId: '1057', severity: 'critical', title: 'SQL Injection', description: 'User input is used in a SQL query without proper sanitization, allowing an attacker to modify the query.', file: 'app/controllers/api.rb', line: 45, scanner: 'SAST', scannerTool: 'Semgrep', cwe: 'CWE-89', cve: 'CVE-2023-1234', cvss: 9.8, status: 'open', remediation: 'Use parameterized queries or prepared statements instead of string concatenation for SQL queries.', codeSnippet: 'query = "SELECT * FROM users WHERE id = \'" + params[:id] + "\'";\nresult = db.execute(query);', impact: 'An attacker can read, modify, or delete data in the database, potentially gaining full control of the application.', detectedAt: '2m ago',
  },
  {
    id: 'f-2', scanId: '1057', severity: 'critical', title: 'Command Injection', description: 'Unsanitized user input is passed to a system command execution function.', file: 'app/utils/exec.py', line: 12, scanner: 'SAST', scannerTool: 'Bandit', cwe: 'CWE-78', cve: 'CVE-2023-5678', cvss: 9.1, status: 'open', remediation: 'Use subprocess with shell=False and pass arguments as a list.', codeSnippet: 'os.system("ping " + user_input)', impact: 'Remote code execution on the server.', detectedAt: '2m ago',
  },
  {
    id: 'f-3', scanId: '1057', severity: 'high', title: 'XSS (Reflected)', description: 'User-supplied data is rendered in HTML without proper escaping.', file: 'app/views/search.py', line: 78, scanner: 'DAST', scannerTool: 'OWASP ZAP', cwe: 'CWE-79', cve: 'CVE-2023-4196', cvss: 7.5, status: 'open', remediation: 'Use context-aware output encoding to sanitize user input before rendering it in HTML.', codeSnippet: '<div>Results for: {{ request.query }}</div>', impact: 'Attackers can inject malicious scripts to steal session cookies or perform actions on behalf of users.', detectedAt: '3m ago',
  },
  {
    id: 'f-4', scanId: '1057', severity: 'high', title: 'Insecure Deserialization', description: 'Application deserializes untrusted data without validation.', file: 'app/api/data/cookie.py', line: 33, scanner: 'SAST', scannerTool: 'Semgrep', cwe: 'CWE-502', cve: null, cvss: 7.2, status: 'open', remediation: 'Avoid deserializing untrusted data. If necessary, use a safe deserialization library with allowlists.', codeSnippet: 'data = pickle.loads(request.cookies["session_data"])', impact: 'Remote code execution through crafted serialized objects.', detectedAt: '3m ago',
  },
  {
    id: 'f-5', scanId: '1057', severity: 'high', title: 'Outdated Dependency: lodash < 4.17.21', description: 'The lodash package version in use has known prototype pollution vulnerability.', file: 'package.json', line: 15, scanner: 'Dependency', scannerTool: 'Trivy', cwe: 'CWE-1321', cve: 'CVE-2021-23337', cvss: 7.2, status: 'open', remediation: 'Update lodash to version 4.17.21 or later.', codeSnippet: '"lodash": "^4.17.15"', impact: 'Prototype pollution can lead to denial of service or remote code execution.', detectedAt: '5m ago',
  },
  {
    id: 'f-6', scanId: '1057', severity: 'high', title: 'Hardcoded AWS Access Key', description: 'An AWS access key is hardcoded in a configuration file.', file: '/config/aws.js', line: 12, scanner: 'Secrets', scannerTool: 'Gitleaks', cwe: 'CWE-798', cve: null, cvss: 8.0, status: 'open', remediation: 'Remove the hardcoded key and use environment variables or AWS IAM roles.', codeSnippet: 'const accessKey = "AKIA1234567890ABCDEF"', impact: 'Unauthorized access to AWS resources and potential data breach.', detectedAt: '7m ago',
  },
  {
    id: 'f-7', scanId: '1057', severity: 'medium', title: 'CORS Misconfiguration', description: 'The application allows requests from any origin.', file: '/api/config.js', line: 45, scanner: 'DAST', scannerTool: 'OWASP ZAP', cwe: 'CWE-942', cve: null, cvss: 5.3, status: 'open', remediation: 'Configure CORS to only allow specific trusted origins.', codeSnippet: 'app.use(cors({ origin: "*" }))', impact: 'Cross-origin attacks can be performed against authenticated users.', detectedAt: '11m ago',
  },
  {
    id: 'f-8', scanId: '1057', severity: 'medium', title: 'Insecure Cookie Attribute', description: 'Session cookie is set without the Secure and HttpOnly flags.', file: '/middleware/auth.js', line: 23, scanner: 'DAST', scannerTool: 'OWASP ZAP', cwe: 'CWE-614', cve: null, cvss: 4.7, status: 'open', remediation: 'Set Secure, HttpOnly, and SameSite attributes on all session cookies.', codeSnippet: 'res.cookie("session", token, { httpOnly: false })', impact: 'Session hijacking through XSS or network interception.', detectedAt: '12m ago',
  },
  {
    id: 'f-9', scanId: '1057', severity: 'low', title: 'Information Disclosure', description: 'The application exposes detailed error messages including stack traces to users.', file: 'app/errors.js', line: 12, scanner: 'DAST', scannerTool: 'OWASP ZAP', cwe: 'CWE-209', cve: null, cvss: 3.1, status: 'open', remediation: 'Use generic error messages in production and log detailed errors server-side.', codeSnippet: 'res.status(500).json({ error: err.stack })', impact: 'Attackers can gather technical details about the application to craft targeted attacks.', detectedAt: '15m ago',
  },
];

// ── Reports ──
export const mockReports: Report[] = [
  { id: 'r-1', scanId: '1057', repositoryName: 'acme/checkout-service', createdAt: 'May 30, 2026, 11:04 AM', totalFindings: 132, findingsBySeverity: { critical: 15, high: 32, medium: 62, low: 23, info: 0 }, scannerCoverage: 85, status: 'failed' },
  { id: 'r-2', scanId: '1055', repositoryName: 'acme/payment-gateway', createdAt: 'May 18, 2026, 08:56 AM', totalFindings: 48, findingsBySeverity: { critical: 2, high: 8, medium: 18, low: 20, info: 0 }, scannerCoverage: 92, status: 'passed' },
];

// ── Deployments ──
export const mockDeployments: Deployment[] = [
  {
    id: 'd-1', repositoryName: 'ecommerce-api', environment: 'production', status: 'deployed',
    applicationUrl: 'https://ecommerce-api.secflow.app', region: 'us-east-1',
    healthStatus: 'healthy', deployedAt: '2h ago',
    stages: [
      { name: 'Build Docker Image', status: 'completed' },
      { name: 'Push to ECR', status: 'completed' },
      { name: 'Create ECS Task', status: 'completed' },
      { name: 'Update Service', status: 'completed' },
      { name: 'Health Check', status: 'completed' },
    ] as DeploymentStage[],
  },
];

// ── Monitoring ──
export const mockMetrics: MonitoringMetric[] = [
  { label: 'CPU', value: 23, unit: '%', trend: 'stable', trendValue: '+0.5%' },
  { label: 'Memory', value: 61, unit: '%', trend: 'up', trendValue: '+2.3%' },
  { label: 'Response Time', value: 245, unit: 'ms', trend: 'down', trendValue: '-12ms' },
  { label: 'Requests', value: 1.2, unit: 'K', trend: 'up', trendValue: '+150' },
  { label: 'Error Rate', value: 0.3, unit: '%', trend: 'down', trendValue: '-0.1%' },
];

// Deterministic pseudo-random wave (not Math.random()) so server-rendered and
// client-hydrated markup always match exactly — avoids React hydration mismatches.
function seededWave(i: number, base: number, amplitude: number, seed: number): number {
  const a = Math.sin(i * 12.9898 + seed) * 43758.5453;
  const noise = a - Math.floor(a); // pseudo-random in [0, 1), deterministic per (i, seed)
  return base + noise * amplitude;
}

export const mockCpuTimeSeries: TimeSeriesPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  value: seededWave(i, 15, 30, 1.7),
}));

export const mockMemoryTimeSeries: TimeSeriesPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  value: seededWave(i, 45, 25, 4.2),
}));

// ── Alerts ──
export const mockAlerts: Alert[] = [
  { id: 'a-1', title: 'High CPU Usage', description: 'CPU usage is above 80%', severity: 'critical', environment: 'Production — ecommerce-api', service: 'ecommerce-api', triggeredAt: '2 min ago', acknowledged: false },
  { id: 'a-2', title: 'Health Check Failed', description: '2 targets are unhealthy', severity: 'critical', environment: 'Production — payment-gateway', service: 'payment-gateway', triggeredAt: '5 min ago', acknowledged: false },
  { id: 'a-3', title: 'High Memory Usage', description: 'Memory usage is above 85%', severity: 'high', environment: 'Production — ecommerce-api', service: 'ecommerce-api', triggeredAt: '10 min ago', acknowledged: false },
  { id: 'a-4', title: 'Error Rate High', description: 'Error rate is above 5%', severity: 'high', environment: 'Production — payment-gateway', service: 'payment-gateway', triggeredAt: '25 min ago', acknowledged: true },
  { id: 'a-5', title: 'Disk Usage High', description: 'Disk usage is above 70%', severity: 'medium', environment: 'Staging — mobile-api', service: 'mobile-api', triggeredAt: '2 hours ago', acknowledged: false },
  { id: 'a-6', title: 'Low Request Rate', description: 'Request rate is below normal', severity: 'medium', environment: 'Staging — mobile-api', service: 'mobile-api', triggeredAt: '3 hours ago', acknowledged: true },
  { id: 'a-7', title: 'Slow Response Time', description: 'Response time is above 1s', severity: 'medium', environment: 'Staging — mobile-api', service: 'mobile-api', triggeredAt: '1 hour ago', acknowledged: false },
];

// ── Notifications ──
export const mockNotifications: Notification[] = [
  { id: 'n-1', type: 'deployment', title: 'Deployment Successful', message: 'ecommerce-api deployed to Production', read: false, createdAt: '1 min ago' },
  { id: 'n-2', type: 'scan', title: 'Scan Completed', message: 'Scan #1057 completed with 132 issues', read: false, createdAt: '15 min ago' },
  { id: 'n-3', type: 'vulnerability', title: 'New Critical Vulnerability', message: 'CVE-2023-1234 found in ecommerce-api', read: false, createdAt: '1 hour ago' },
  { id: 'n-4', type: 'deployment', title: 'Deployment Failed', message: 'user-service deployment to Staging failed', read: true, createdAt: '1 hour ago' },
  { id: 'n-5', type: 'repository', title: 'Repository Connected', message: 'mobile-app repository connected', read: true, createdAt: '1 hour ago' },
];

// ── Audit Log ──
export const mockAuditLog: AuditLogEntry[] = [
  { id: 'al-1', timestamp: 'May 30, 11:04 AM', user: 'Ahmad Khaled', action: 'Deployment Succeeded', resource: 'ecommerce-api', ipAddress: '45.133.23.10', status: 'success' },
  { id: 'al-2', timestamp: 'May 30, 11:02 AM', user: 'Ahmad Khaled', action: 'Scan Completed', resource: 'Scan: #1957', ipAddress: '45.133.23.10', status: 'success' },
  { id: 'al-3', timestamp: 'May 30, 10:58 AM', user: 'System', action: 'Repository Cloned', resource: '—', ipAddress: '—', status: 'success' },
  { id: 'al-4', timestamp: 'May 20, 10:30 AM', user: 'Sara Ali', action: 'Login', resource: '—', ipAddress: '192.168.1.45', status: 'success' },
  { id: 'al-5', timestamp: 'May 20, 09:12 AM', user: 'Omar Hassan', action: 'Settings Updated', resource: 'Project Settings', ipAddress: '197.218.1.22', status: 'success' },
];

// ── Dashboard Summary ──
export const mockDashboardStats = {
  repositories: 12,
  pipelines: 56,
  scans: 132,
  deployments: 48,
  alerts: 2,
  securityScore: 82,
  totalVulnerabilities: 214,
  vulnerabilitiesBySeverity: { critical: 23, high: 67, medium: 91, low: 33, info: 0 },
  scanStatus: {
    sast: { label: 'SAST', status: 'completed' as const },
    dependency: { label: 'Dependency', status: 'completed' as const },
    dast: { label: 'DAST', status: 'completed' as const },
  },
  recentActivity: [
    { icon: 'critical', count: 15, label: 'Repository connected', time: '5 min ago' },
    { icon: 'high', count: 32, label: 'Scan #1057 completed', time: '10 min ago' },
    { icon: 'medium', count: 62, label: 'Deployment to Production', time: '32 min ago' },
    { icon: 'low', count: 23, label: 'New critical vulnerability', time: '1 hour ago' },
  ],
};

// ── Pipeline Status (for dashboard) ──
export const mockRecentPipelines = [
  { repo: 'ecommerce-api', branch: 'main', status: 'completed' as const, stages: '7/7', duration: '2m ago' },
  { repo: 'auth-service', branch: 'main', status: 'failed' as const, stages: '4/7', duration: '18m ago' },
  { repo: 'payment-gateway', branch: 'release/v2.1', status: 'completed' as const, stages: '7/7', duration: '3h ago' },
  { repo: 'mobile-app', branch: 'main', status: 'running' as const, stages: '3/7', duration: '3m ago' },
];
