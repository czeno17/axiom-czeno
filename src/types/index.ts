export interface BatchParamDef {
  key: string;
  label: string;
  mean: number;
  sigma: number;
  unit: string;
  goldenWindow: {
    lower: number;
    upper: number;
  };
}

export interface BatchPoint {
  hour: string;
  [key: string]: string | number; // Dynamic keys for parameters
}

export interface LineConfig {
  name: string;
  description: string;
  params: {
    [key: string]: BatchParamDef;
  };
  series: BatchPoint[];
}
