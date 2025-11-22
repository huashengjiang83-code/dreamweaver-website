
export interface SymbolDefinition {
  id: number;
  symbol_name: string;
  theory_or_source: string;
  meaning: string;
  emotional_link?: string;
  prediction_type?: string;
  source: string;
  type: 'scientific' | 'traditional';
}

export interface SourceReference {
  id: string;
  text: string;
}

export interface DreamReport {
  introduction: string;
  psychological_decode: {
    content: string;
    key_concepts: string[];
  };
  traditional_divination: {
    content: string;
    cultural_context: string;
  };
  sources: SourceReference[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum AnalysisState {
  IDLE,
  ANALYZING,
  COMPLETE,
  ERROR,
}
