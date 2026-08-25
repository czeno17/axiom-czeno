export const SEED_EVENTS = [
  // ============================================
  // LINE A — Extrusion Events
  // ============================================
  {
    id: "NCR-2606-01",
    title: "Extrusion temperature deviation",
    description:
      "Billet temperature exceeded upper control limit (525°C) during extrusion of heat sink profile #HS-2024-01.",
    category: "Quality",
    severity: "Medium",
    assignee: "Process-Owner-1",
    line: "Line A",
    productLine: "Line A — Heat Sink Extrusion",
    shift: "Day",
    supplier: "Supplier A",
    status: "Closed",
    created: "2026-06-15",
    resolved: "2026-06-20",
    type: "NCR",
    source: "Extrusion",
    priority: 2,
    rootCauseDescription: "Thermocouple calibration drift caused inaccurate temperature readings",
  },
  {
    id: "NCR-2606-02",
    title: "Quenching rate too slow",
    description:
      "Quench rate dropped below 1.5°C/s causing potential material property issues in heat sink batch.",
    category: "Process",
    severity: "High",
    assignee: "Process-Owner-1",
    line: "Line A",
    productLine: "Line A — Heat Sink Extrusion",
    shift: "Night",
    supplier: "Supplier A",
    status: "Open",
    created: "2026-06-18",
    resolved: null,
    type: "NCR",
    source: "Extrusion",
    priority: 1,
    rootCauseDescription: "Cooling pump malfunction reduced water flow rate",
  },
  {
    id: "NCR-2606-03",
    title: "Die temperature fluctuation",
    description:
      "Die temperature varied by more than ±15°C during extrusion run causing dimensional instability.",
    category: "Equipment",
    severity: "Medium",
    assignee: "Process-Owner-1",
    line: "Line A",
    productLine: "Line A — Heat Sink Extrusion",
    shift: "Day",
    supplier: "Supplier B",
    status: "In Progress",
    created: "2026-06-19",
    resolved: null,
    type: "NCR",
    source: "Extrusion",
    priority: 2,
    rootCauseDescription: "Heating element failure in die zone 3",
  },
  {
    id: "CAPA-2606-03",
    title: "Die replacement program",
    description:
      "Implement scheduled die replacement program to prevent wear-related temperature fluctuations.",
    category: "Maintenance",
    severity: "High",
    assignee: "Process-Owner-1",
    line: "Line A",
    productLine: "Line A — Heat Sink Extrusion",
    shift: "Day",
    supplier: null,
    status: "In Progress",
    created: "2026-06-20",
    resolved: null,
    type: "CAPA",
    source: "Extrusion",
    priority: 2,
    rootCauseDescription: null,
  },

  // ============================================
  // LINE B — Bonding Events
  // ============================================
  {
    id: "NCR-2606-04",
    title: "Ultrasonic power fluctuation",
    description:
      "Ultrasonic power dropped below 700W during fin bonding, causing weak joint integrity.",
    category: "Equipment",
    severity: "High",
    assignee: "Process-Owner-2",
    line: "Line B",
    productLine: "Line B — Fin Assembly & Bonding",
    shift: "Day",
    supplier: "Supplier C",
    status: "In Progress",
    created: "2026-06-20",
    resolved: null,
    type: "NCR",
    source: "Bonding",
    priority: 1,
    rootCauseDescription: "Ultrasonic transducer degradation over time",
  },
  {
    id: "CAPA-2606-01",
    title: "Ultrasonic transducer replacement",
    description:
      "Replaced faulty ultrasonic transducer on Line B bonding station with upgraded model.",
    category: "Maintenance",
    severity: "Medium",
    assignee: "Process-Owner-2",
    line: "Line B",
    productLine: "Line B — Fin Assembly & Bonding",
    shift: "Night",
    supplier: null,
    status: "Closed",
    created: "2026-06-10",
    resolved: "2026-06-16",
    type: "CAPA",
    source: "Bonding",
    priority: 3,
    rootCauseDescription: "Proactive replacement prevented production downtime",
  },
  {
    id: "NCR-2606-05",
    title: "Bonding temperature too high",
    description:
      "Bonding temperature exceeded 210°C causing thermal damage to fin material on 3 units.",
    category: "Quality",
    severity: "Critical",
    assignee: "Process-Owner-2",
    line: "Line B",
    productLine: "Line B — Fin Assembly & Bonding",
    shift: "Day",
    supplier: "Supplier A",
    status: "Open",
    created: "2026-06-22",
    resolved: null,
    type: "NCR",
    source: "Bonding",
    priority: 1,
    rootCauseDescription: "Temperature controller setpoint error after maintenance",
  },
  {
    id: "NCR-2606-12",
    title: "Bonding pressure low",
    description: "Bonding pressure dropped below 0.5MPa causing inconsistent joint quality.",
    category: "Process",
    severity: "Medium",
    assignee: "Process-Owner-2",
    line: "Line B",
    productLine: "Line B — Fin Assembly & Bonding",
    shift: "Night",
    supplier: "Supplier D",
    status: "Closed",
    created: "2026-06-08",
    resolved: "2026-06-14",
    type: "NCR",
    source: "Bonding",
    priority: 2,
    rootCauseDescription: "Air pressure regulator failure",
  },

  // ============================================
  // LINE C — Plating Events
  // ============================================
  {
    id: "NCR-2606-06",
    title: "Plating thickness variation",
    description:
      "Measured plating thickness below specification (minimum 5μm) on heat sink batch #HS-2024-03. pH value drifted to 3.8.",
    category: "Quality",
    severity: "Critical",
    assignee: "Process-Owner-3",
    line: "Line C",
    productLine: "Line C — Surface Treatment (Plating/Coating)",
    shift: "Day",
    supplier: "Supplier B",
    status: "Open",
    created: "2026-06-21",
    resolved: null,
    type: "NCR",
    source: "Plating",
    priority: 1,
    rootCauseDescription: "pH sensor calibration drift causing inaccurate readings",
  },
  {
    id: "NCR-2606-07",
    title: "Current density deviation",
    description:
      "Current density on Line C plating tank exceeded 190 A/dm² causing rapid depletion of bath additives.",
    category: "Process",
    severity: "Medium",
    assignee: "Process-Owner-3",
    line: "Line C",
    productLine: "Line C — Surface Treatment (Plating/Coating)",
    shift: "Night",
    supplier: "Supplier E",
    status: "Closed",
    created: "2026-06-12",
    resolved: "2026-06-19",
    type: "NCR",
    source: "Plating",
    priority: 2,
    rootCauseDescription: "Rectifier power supply output drift",
  },
  {
    id: "NCR-2606-08",
    title: "Bath temperature out of spec",
    description:
      "Plating bath temperature dropped below 75°C affecting plating uniformity on 12 units.",
    category: "Process",
    severity: "High",
    assignee: "Process-Owner-3",
    line: "Line C",
    productLine: "Line C — Surface Treatment (Plating/Coating)",
    shift: "Day",
    supplier: "Supplier C",
    status: "In Progress",
    created: "2026-06-23",
    resolved: null,
    type: "NCR",
    source: "Plating",
    priority: 2,
    rootCauseDescription: "Heating element failure in plating tank",
  },
  {
    id: "CAPA-2606-04",
    title: "pH sensor calibration schedule",
    description: "Implement more frequent pH sensor calibration schedule to prevent drift.",
    category: "Quality",
    severity: "Medium",
    assignee: "Process-Owner-3",
    line: "Line C",
    productLine: "Line C — Surface Treatment (Plating/Coating)",
    shift: "Night",
    supplier: null,
    status: "Open",
    created: "2026-06-22",
    resolved: null,
    type: "CAPA",
    source: "Plating",
    priority: 2,
    rootCauseDescription: null,
  },

  // ============================================
  // LINE D — QA/Packing Events
  // ============================================
  {
    id: "NCR-2606-09",
    title: "Dimension deviation detected",
    description:
      "Post-extrusion dimension deviation exceeded 0.10mm tolerance on fin thickness for batch #HS-2024-05.",
    category: "Quality",
    severity: "Medium",
    assignee: "Process-Owner-4",
    line: "Line D",
    productLine: "Line D — Final QA & Packing",
    shift: "Day",
    supplier: "Supplier A",
    status: "In Progress",
    created: "2026-06-22",
    resolved: null,
    type: "NCR",
    source: "QA",
    priority: 2,
    rootCauseDescription: "Die wear on extrusion press",
  },
  {
    id: "CAPA-2606-02",
    title: "Seal integrity improvement",
    description:
      "Updated packaging process to improve seal integrity on heat sink shipping boxes and prevent humidity damage.",
    category: "Packaging",
    severity: "Low",
    assignee: "Process-Owner-4",
    line: "Line D",
    productLine: "Line D — Final QA & Packing",
    shift: "Day",
    supplier: null,
    status: "Closed",
    created: "2026-06-05",
    resolved: "2026-06-10",
    type: "CAPA",
    source: "QA",
    priority: 3,
    rootCauseDescription: "Packaging material supplier change",
  },
  {
    id: "NCR-2606-10",
    title: "Visual defects found",
    description:
      "Multiple visual defects (scratches, dents) found on heat sink surface during final QA inspection.",
    category: "Quality",
    severity: "Medium",
    assignee: "Process-Owner-4",
    line: "Line D",
    productLine: "Line D — Final QA & Packing",
    shift: "Night",
    supplier: "Supplier B",
    status: "Open",
    created: "2026-06-23",
    resolved: null,
    type: "NCR",
    source: "QA",
    priority: 2,
    rootCauseDescription: "Handling damage during transfer to packing station",
  },
  {
    id: "NCR-2606-11",
    title: "Packaging weight discrepancy",
    description: "Packaging weight deviated from standard 12kg by more than ±0.5kg on 5 boxes.",
    category: "Process",
    severity: "Low",
    assignee: "Process-Owner-4",
    line: "Line D",
    productLine: "Line D — Final QA & Packing",
    shift: "Day",
    supplier: "Supplier D",
    status: "Closed",
    created: "2026-06-14",
    resolved: "2026-06-17",
    type: "NCR",
    source: "QA",
    priority: 3,
    rootCauseDescription: "Scale calibration error",
  },
  {
    id: "NCR-2606-13",
    title: "Seal integrity failure",
    description:
      "Seal integrity test failed on 3 boxes, indicating potential humidity damage during shipping.",
    category: "Quality",
    severity: "High",
    assignee: "Process-Owner-4",
    line: "Line D",
    productLine: "Line D — Final QA & Packing",
    shift: "Night",
    supplier: "Supplier E",
    status: "In Progress",
    created: "2026-06-24",
    resolved: null,
    type: "NCR",
    source: "QA",
    priority: 1,
    rootCauseDescription: "Sealing machine temperature too low",
  },
];

// ============================================
// INITIAL AUDIT LOG - Required for auditStore
// ============================================

export const INITIAL_AUDIT = [
  // ... your INITIAL_AUDIT data
];

// ============================================
// OTHER SEED DATA
// ============================================

export const ORGANIZATION_NAME = "Czeno QMS";

// ============================================
// GOLDEN BATCH DATA - Realistic Parameters by Line
// ============================================

export const goldenBatchData = {
  // ============================================
  // LINE A — Heat Sink Extrusion
  // ============================================
  lineA: {
    name: "Line A — Heat Sink Extrusion",
    description: "Aluminum billet extrusion and quenching",
    params: {
      billetTemp: {
        key: "billetTemp",
        label: "Billet Temperature (°C)",
        mean: 510,
        sigma: 8,
        unit: "°C",
        goldenWindow: { lower: 495, upper: 525 },
      },
      dieTemp: {
        key: "dieTemp",
        label: "Die Temperature (°C)",
        mean: 500,
        sigma: 7,
        unit: "°C",
        goldenWindow: { lower: 485, upper: 515 },
      },
      extrusionSpeed: {
        key: "extrusionSpeed",
        label: "Extrusion Speed (m/min)",
        mean: 1.3,
        sigma: 0.3,
        unit: "m/min",
        goldenWindow: { lower: 0.8, upper: 1.8 },
      },
      quenchRate: {
        key: "quenchRate",
        label: "Quenching Rate (°C/s)",
        mean: 2.5,
        sigma: 0.5,
        unit: "°C/s",
        goldenWindow: { lower: 1.5, upper: 3.5 },
      },
    },
    series: [
      { hour: "T-23h", billetTemp: 505, dieTemp: 498, extrusionSpeed: 1.2, quenchRate: 2.3 },
      { hour: "T-19h", billetTemp: 508, dieTemp: 502, extrusionSpeed: 1.4, quenchRate: 2.6 },
      { hour: "T-15h", billetTemp: 512, dieTemp: 505, extrusionSpeed: 1.5, quenchRate: 2.8 },
      { hour: "T-11h", billetTemp: 515, dieTemp: 508, extrusionSpeed: 1.3, quenchRate: 2.4 },
      { hour: "T-7h", billetTemp: 510, dieTemp: 503, extrusionSpeed: 1.1, quenchRate: 2.1 },
      { hour: "T-3h", billetTemp: 507, dieTemp: 500, extrusionSpeed: 1.0, quenchRate: 1.9 },
    ],
  },

  // ============================================
  // LINE B — Fin Assembly & Bonding
  // ============================================
  lineB: {
    name: "Line B — Fin Assembly & Bonding",
    description: "Ultrasonic/soldering bonding of fins to baseplate",
    params: {
      bondingTemp: {
        key: "bondingTemp",
        label: "Bonding Temperature (°C)",
        mean: 180,
        sigma: 15,
        unit: "°C",
        goldenWindow: { lower: 150, upper: 210 },
      },
      ultrasonicPower: {
        key: "ultrasonicPower",
        label: "Ultrasonic Power (W)",
        mean: 800,
        sigma: 50,
        unit: "W",
        goldenWindow: { lower: 700, upper: 900 },
      },
      bondingPressure: {
        key: "bondingPressure",
        label: "Bonding Pressure (MPa)",
        mean: 0.8,
        sigma: 0.15,
        unit: "MPa",
        goldenWindow: { lower: 0.5, upper: 1.1 },
      },
      bondingTime: {
        key: "bondingTime",
        label: "Bonding Time (s)",
        mean: 5.0,
        sigma: 0.8,
        unit: "s",
        goldenWindow: { lower: 3.5, upper: 6.5 },
      },
    },
    series: [
      {
        hour: "T-23h",
        bondingTemp: 175,
        ultrasonicPower: 780,
        bondingPressure: 0.75,
        bondingTime: 4.8,
      },
      {
        hour: "T-19h",
        bondingTemp: 182,
        ultrasonicPower: 810,
        bondingPressure: 0.82,
        bondingTime: 5.2,
      },
      {
        hour: "T-15h",
        bondingTemp: 190,
        ultrasonicPower: 840,
        bondingPressure: 0.85,
        bondingTime: 5.5,
      },
      {
        hour: "T-11h",
        bondingTemp: 185,
        ultrasonicPower: 820,
        bondingPressure: 0.8,
        bondingTime: 5.0,
      },
      {
        hour: "T-7h",
        bondingTemp: 178,
        ultrasonicPower: 790,
        bondingPressure: 0.78,
        bondingTime: 4.6,
      },
      {
        hour: "T-3h",
        bondingTemp: 170,
        ultrasonicPower: 760,
        bondingPressure: 0.72,
        bondingTime: 4.3,
      },
    ],
  },

  // ============================================
  // LINE C — Surface Treatment (Plating/Coating)
  // ============================================
  lineC: {
    name: "Line C — Surface Treatment (Plating/Coating)",
    description: "Electroplating or anodizing of heat sinks",
    params: {
      bathTemp: {
        key: "bathTemp",
        label: "Bath Temperature (°C)",
        mean: 85,
        sigma: 5,
        unit: "°C",
        goldenWindow: { lower: 75, upper: 95 },
      },
      currentDensity: {
        key: "currentDensity",
        label: "Current Density (A/dm²)",
        mean: 150,
        sigma: 20,
        unit: "A/dm²",
        goldenWindow: { lower: 110, upper: 190 },
      },
      phValue: {
        key: "phValue",
        label: "Bath pH Value",
        mean: 4.5,
        sigma: 0.3,
        unit: "",
        goldenWindow: { lower: 3.9, upper: 5.1 },
      },
      platingTime: {
        key: "platingTime",
        label: "Plating Time (min)",
        mean: 30,
        sigma: 4,
        unit: "min",
        goldenWindow: { lower: 22, upper: 38 },
      },
    },
    series: [
      { hour: "T-23h", bathTemp: 82, currentDensity: 145, phValue: 4.3, platingTime: 28 },
      { hour: "T-19h", bathTemp: 86, currentDensity: 155, phValue: 4.6, platingTime: 31 },
      { hour: "T-15h", bathTemp: 88, currentDensity: 160, phValue: 4.8, platingTime: 33 },
      { hour: "T-11h", bathTemp: 85, currentDensity: 150, phValue: 4.5, platingTime: 30 },
      { hour: "T-7h", bathTemp: 83, currentDensity: 140, phValue: 4.2, platingTime: 27 },
      { hour: "T-3h", bathTemp: 80, currentDensity: 135, phValue: 4.0, platingTime: 25 },
    ],
  },

  // ============================================
  // LINE D — Final QA & Packing
  // ============================================
  lineD: {
    name: "Line D — Final QA & Packing",
    description: "Quality inspection, packaging, and shipping",
    params: {
      visualDefects: {
        key: "visualDefects",
        label: "Visual Defects (per batch)",
        mean: 2.0,
        sigma: 0.8,
        unit: "defects",
        goldenWindow: { lower: 0, upper: 4 },
      },
      dimensionDeviation: {
        key: "dimensionDeviation",
        label: "Dimension Deviation (mm)",
        mean: 0.05,
        sigma: 0.02,
        unit: "mm",
        goldenWindow: { lower: 0, upper: 0.1 },
      },
      sealIntegrity: {
        key: "sealIntegrity",
        label: "Seal Integrity (pass rate %)",
        mean: 98.5,
        sigma: 1.0,
        unit: "%",
        goldenWindow: { lower: 96.5, upper: 100 },
      },
      packagingWeight: {
        key: "packagingWeight",
        label: "Packaging Weight (kg)",
        mean: 12.0,
        sigma: 0.5,
        unit: "kg",
        goldenWindow: { lower: 11.0, upper: 13.0 },
      },
    },
    series: [
      {
        hour: "T-23h",
        visualDefects: 2,
        dimensionDeviation: 0.04,
        sealIntegrity: 98.0,
        packagingWeight: 11.8,
      },
      {
        hour: "T-19h",
        visualDefects: 1,
        dimensionDeviation: 0.03,
        sealIntegrity: 99.0,
        packagingWeight: 12.2,
      },
      {
        hour: "T-15h",
        visualDefects: 3,
        dimensionDeviation: 0.06,
        sealIntegrity: 97.5,
        packagingWeight: 12.5,
      },
      {
        hour: "T-11h",
        visualDefects: 2,
        dimensionDeviation: 0.05,
        sealIntegrity: 98.5,
        packagingWeight: 12.0,
      },
      {
        hour: "T-7h",
        visualDefects: 1,
        dimensionDeviation: 0.02,
        sealIntegrity: 99.5,
        packagingWeight: 11.5,
      },
      {
        hour: "T-3h",
        visualDefects: 0,
        dimensionDeviation: 0.01,
        sealIntegrity: 100,
        packagingWeight: 11.0,
      },
    ],
  },
};

// ============================================
// DEFAULT EXPORT - All seed data
// ============================================

export default {
  SEED_EVENTS,
  INITIAL_AUDIT,
  ORGANIZATION_NAME,
  goldenBatchData,
};
