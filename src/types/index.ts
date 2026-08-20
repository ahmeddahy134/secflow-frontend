export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type ScanStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export type FindingStatus = 'open' | 'resolved' | 'false_positive' | 'accepted_risk' | 'mitigated';

export type ScannerType = 'SAST' | 'DAST' | 'Dependency' | 'Secrets';

export interface Repository {
  id: string;
  name: string;
  url: string;
  branch: string;
  language: string;
  lastScan: string | null;
  lastScanStatus: ScanStatus | null;
  securityScore: number | null;
  isConnected: boolean;
}

export interface ScanJob {
  id: string;
  repositoryId: string;
  repositoryName: string;
  branch: string;
  status: ScanStatus;
  startedAt: string;
  completedAt: string | null;
  duration: string | null;
  stages: PipelineStage[];
  totalFindings: number;
  findingsBySeverity: Record<Severity, number>;
}

export interface PipelineStage {
  id: string;
  name: string;
  status: ScanStatus | 'pending';
  duration: string | null;
  order: number;
  icon?: string;
}

export interface Finding {
  id: string;
  scanId: string;
  severity: Severity;
  title: string;
  description: string;
  file: string;
  line: number;
  column?: number;
  scanner: ScannerType;
  scannerTool: string;
  cwe: string | null;
  cve: string | null;
  cvss: number | null;
  status: FindingStatus;
  remediation: string | null;
  codeSnippet: string | null;
  impact: string | null;
  detectedAt: string;
}

export interface Report {
  id: string;
  scanId: string;
  repositoryName: string;
  createdAt: string;
  totalFindings: number;
  findingsBySeverity: Record<Severity, number>;
  scannerCoverage: number;
  status: 'passed' | 'failed';
}

export interface Deployment {
  id: string;
  repositoryName: string;
  environment: 'staging' | 'production';
  status: 'deploying' | 'deployed' | 'failed' | 'rolling_back' | 'rolled_back';
  applicationUrl: string | null;
  region: string;
  healthStatus: 'healthy' | 'unhealthy' | 'unknown';
  deployedAt: string;
  stages: DeploymentStage[];
}

export interface DeploymentStage {
  name: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  description?: string;
}

export interface MonitoringMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

export interface TimeSeriesPoint {
  time: string;
  value: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  environment: string;
  service: string;
  triggeredAt: string;
  acknowledged: boolean;
}

export interface Notification {
  id: string;
  type: 'deployment' | 'scan' | 'vulnerability' | 'alert' | 'repository';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  icon?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'success' | 'failure';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'developer' | 'security_analyst' | 'viewer';
  avatar: string | null;
  organization: string;
}
