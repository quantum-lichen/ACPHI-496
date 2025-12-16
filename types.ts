export interface Codon {
  id: string;
  promoter: string;
  type: string;
  payload: string;
  checksum: string;
  bits: string; // Represented as 0/1 string for UI
  phiAlignment: number; // 0.0 to 1.0
}

export interface ProcessingLog {
  timestamp: string;
  stage: 'HELICASE' | 'POLYMERASE' | 'CODONIZER' | 'CRAID' | 'INJECTION';
  message: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}

export interface GenomeStats {
  totalBits: number;
  codonsCount: number;
  compressionRatio: number;
  phiScore: number;
  integrity: number;
}
