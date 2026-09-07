import { FaultCase, Technician, SiteKnowledgeItem } from '../types';

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: 'TECH-104',
    name: 'Marcus Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 492-8812',
    currentStatus: 'ONLINE_AVAILABLE',
    currentLocationName: 'Sector 4 - South Bay Logistics Corridor',
    coordinates: { x: 38, y: 44, lat: 37.3861, lng: -122.0839 },
    certifications: ['HVAC Master EPA-Universal', 'Cleanroom ISO-4 Protocol', 'Chiller Overhaul Level 3'],
    specialties: ['Centrifugal Compressors', 'VAV Controls', 'Glycol Chilling Loops'],
    shiftHours: '06:00 - 16:30 (Day)',
    hoursWorkedToday: 4.2,
    rating: 4.96,
    jobsCompletedToday: 2,
    vanInventory: [
      { partNumber: 'CAR-CH-994', name: 'Expansion Valve TXV 45T', qty: 2, category: 'HVAC' },
      { partNumber: 'SEN-PT-100', name: 'Pressure Transducer 0-500PSI', qty: 4, category: 'Sensors' },
      { partNumber: 'BELT-V-304', name: 'Industrial V-Belt High-Torque', qty: 3, category: 'Mechanical' },
      { partNumber: 'FUSE-100A-BUS', name: 'Bussmann Low-Peak Fuse 100A', qty: 6, category: 'Electrical' },
    ]
  },
  {
    id: 'TECH-209',
    name: 'Elena Rostova',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 381-9921',
    currentStatus: 'ONLINE_AVAILABLE',
    currentLocationName: 'Sector 2 - Mission Bay Bio-Cluster',
    coordinates: { x: 62, y: 28, lat: 37.7749, lng: -122.4194 },
    certifications: ['High-Voltage 33kV Switchgear', 'Eaton/APC UPS Master', 'Arc Flash NFPA 70E'],
    specialties: ['UPS Power Inverters', 'Automatic Transfer Switches (ATS)', 'Static Bypass Modules'],
    shiftHours: '07:00 - 17:30 (Day)',
    hoursWorkedToday: 3.8,
    rating: 4.98,
    jobsCompletedToday: 1,
    vanInventory: [
      { partNumber: 'CAP-DC-450V', name: 'DC Bus Electrolytic Cap 450V', qty: 8, category: 'Power Electronics' },
      { partNumber: 'IGBT-MOD-1200V', name: 'Infineon Dual IGBT 1200V 400A', qty: 2, category: 'Power Electronics' },
      { partNumber: 'RELAY-SCH-24V', name: 'Schneider Safety Control Relay', qty: 5, category: 'Controls' },
      { partNumber: 'LOTO-KIT-HV', name: 'NFPA 70E High-Voltage LOTO Padlock Set', qty: 1, category: 'Safety' },
    ]
  },
  {
    id: 'TECH-315',
    name: 'Devon Gallagher',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 772-1044',
    currentStatus: 'EN_ROUTE',
    currentLocationName: 'En Route to SFO Airport Cargo Gateway',
    coordinates: { x: 50, y: 65, lat: 37.6213, lng: -122.3790 },
    activeCaseId: '#FLT-9840',
    certifications: ['Siemens S7/TIA Automation', 'Allen-Bradley GuardLogix', 'Industrial Robotics Level 2'],
    specialties: ['Baggage Sorter PLCs', 'Variable Frequency Drives (VFD)', 'Optical Barcode Scanners'],
    shiftHours: '05:30 - 16:00 (Early)',
    hoursWorkedToday: 5.5,
    rating: 4.91,
    jobsCompletedToday: 3,
    vanInventory: [
      { partNumber: 'SIEM-IO-ET200', name: 'Siemens ET200SP Digital Input Module', qty: 3, category: 'Automation' },
      { partNumber: 'VFD-ABB-55KW', name: 'ABB ACS880 Control Board', qty: 1, category: 'Drives' },
      { partNumber: 'OPT-SICK-102', name: 'SICK Laser Array Scanner Sensor', qty: 2, category: 'Optics' },
    ]
  },
  {
    id: 'TECH-408',
    name: 'Tariq Al-Mansoor',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 619-3340',
    currentStatus: 'ON_SITE',
    currentLocationName: 'Equinix SV10 Hyperscale Colocation',
    coordinates: { x: 74, y: 52, lat: 37.4030, lng: -121.9560 },
    activeCaseId: '#FLT-9838',
    certifications: ['Data Center CRAC Certified', 'ASHRAE TC 9.9 Thermal Lead', 'Refrigerant R-410A Safety'],
    specialties: ['Precision Cooling AHU', 'Containment Hot-Aisle Airflow', 'Ultrasonic Humidifiers'],
    shiftHours: '08:00 - 18:30 (Day)',
    hoursWorkedToday: 2.1,
    rating: 4.94,
    jobsCompletedToday: 1,
    vanInventory: [
      { partNumber: 'EBM-EC-FAN', name: 'EBM-Papst EC Centrifugal Fan 500mm', qty: 1, category: 'Fans' },
      { partNumber: 'CAREL-PCO-5', name: 'Carel pCO5+ HVAC Controller Board', qty: 2, category: 'Controls' },
      { partNumber: 'NTC-TEMP-10K', name: 'Precision Airflow Temp Probe 10k', qty: 10, category: 'Sensors' },
    ]
  },
  {
    id: 'TECH-512',
    name: 'Sarah Chen-Miller',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 883-4920',
    currentStatus: 'ONLINE_AVAILABLE',
    currentLocationName: 'Sector 1 - North Valley Tech Campus',
    coordinates: { x: 25, y: 22, lat: 37.8044, lng: -122.2712 },
    certifications: ['Ultra-Low Temp Cryogenics -80C', 'Biosafety BSL-3 Cleanroom Access', 'Pharmaceutical Calibration'],
    specialties: ['Cryogenic Ultra-Freezers', 'HEPA Filtration Laminar Hoods', 'CO2 Incubator Gas Regulators'],
    shiftHours: '09:00 - 19:30 (Late)',
    hoursWorkedToday: 1.5,
    rating: 4.99,
    jobsCompletedToday: 0,
    vanInventory: [
      { partNumber: 'CRYO-SEAL-80', name: 'Hermetic Cryo Silicone Gasket Set', qty: 4, category: 'Cryo' },
      { partNumber: 'DANF-SC-18CL', name: 'Danfoss R290 Cascade Compressor Relay', qty: 2, category: 'Cryo' },
      { partNumber: 'PT100-RTD-CAL', name: 'NIST Certified Class A RTD Sensor', qty: 6, category: 'Sensors' },
    ]
  },
  {
    id: 'TECH-604',
    name: 'Javier Morales',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 902-1133',
    currentStatus: 'REST_BREAK',
    currentLocationName: 'Peninsula Service Depot #3',
    coordinates: { x: 42, y: 78, lat: 37.5485, lng: -122.3186 },
    certifications: ['Fire Suppression FM-200', 'VESDA Early Smoke Detection', 'NFPA 72 Signaling'],
    specialties: ['Clean Agent Actuators', 'Aspirating Smoke Detectors', 'Emergency Exhaust Dampers'],
    shiftHours: '06:00 - 16:30 (Day)',
    hoursWorkedToday: 6.0,
    rating: 4.89,
    jobsCompletedToday: 2,
    vanInventory: [
      { partNumber: 'VESDA-XTR-501', name: 'VESDA Laser Plus Filter Cartridge', qty: 4, category: 'Fire' },
      { partNumber: 'SOLENOID-24VDC', name: 'Fike Nitrogen Release Solenoid Valve', qty: 2, category: 'Fire' },
    ]
  }
];

export const INITIAL_FAULT_CASES: FaultCase[] = [
  {
    id: '#FLT-9842',
    title: 'Chiller Plant #2 Surge & High Head Pressure Trip',
    siteName: 'Equinix SV11 Silicon Valley Hyperscale',
    siteAddress: '1400 Federal Way, San Jose, CA 95131',
    facilityType: 'Data Center',
    coordinates: { x: 40, y: 46, lat: 37.4123, lng: -121.9211 },
    assetName: 'Carrier 19XR Water-Cooled Centrifugal Chiller (800 Ton)',
    assetTag: 'EQX-CHL-02B',
    errorCode: 'ERR-702B: CONDENSER_PRESSURE_LIMIT_EXCEEDED',
    description: 'Compressor discharge transducer triggered emergency lockout after head pressure spiked to 310 PSI during peak server load transition. Auto-restart disabled due to safety interlock.',
    severity: 'P1-CRITICAL',
    status: 'UNASSIGNED',
    isVipClient: true,
    vipClientName: 'Equinix Global Tier-4 SLA (99.999% Uptime Guarantee)',
    reportedAt: '12 min ago (14:11:04 UTC)',
    slaTargetMinutes: 45,
    slaMinutesRemaining: 18,
    telemetryReadings: [
      { metric: 'Head Condenser Pressure', value: '312.4 PSI', normalRange: '200 - 240 PSI', status: 'critical', unit: 'PSI' },
      { metric: 'Discharge Gas Temp', value: '108.6 °C', normalRange: '72 - 88 °C', status: 'critical', unit: '°C' },
      { metric: 'Chilled Water Supply Temp', value: '13.2 °C', normalRange: '6.0 - 7.5 °C', status: 'warning', unit: '°C' },
      { metric: 'Compressor Motor Current', value: '540 A', normalRange: '320 - 460 A', status: 'warning', unit: 'A' },
      { metric: 'Refrigerant Level', value: '94%', normalRange: '90 - 100%', status: 'nominal', unit: '%' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 3 - Biometric & Secret',
      accessCode: 'SEC-EQX-9941#',
      gateContact: 'David Sterling (Facilities Director)',
      gatePhone: '+1 (408) 555-0199',
      ppeRequired: ['Hard Hat', 'Safety Glasses (Z87.1)', 'Steel Toe Boots', 'Arc Flash Face Shield Level 2'],
      lotoRequired: true,
      notes: 'Escort required past security man-trap portal 4B. Inform NOC manager before isolating 480V 800A main circuit breaker.'
    },
    recommendedTechnicians: [
      {
        technicianId: 'TECH-104',
        overallScore: 98,
        proximityMinutes: 11,
        distanceMiles: 4.8,
        skillMatchScore: 100,
        hasRequiredParts: true,
        workloadScore: 94,
        matchReasons: [
          'Master EPA Chiller Overhaul certified',
          'Only 11 mins away in South Bay Corridor',
          'Carries TXV 45T valve & 0-500PSI transducer in van',
          'Completed 4 similar 19XR overhauls this quarter'
        ]
      },
      {
        technicianId: 'TECH-408',
        overallScore: 82,
        proximityMinutes: 19,
        distanceMiles: 7.2,
        skillMatchScore: 88,
        hasRequiredParts: false,
        workloadScore: 65,
        matchReasons: [
          'CRAC / Data Center certified',
          'Currently on-site finishing minor preventive task'
        ],
        missingCertifications: ['Centrifugal Chiller Overhaul Level 3']
      }
    ],
    requiredParts: [
      { partNumber: 'SEN-PT-100', name: 'Pressure Transducer 0-500PSI', requiredQty: 1 },
      { partNumber: 'CAR-CH-994', name: 'Expansion Valve TXV 45T', requiredQty: 1 }
    ],
    auditLogs: [
      { id: 'LOG-1', timestamp: '14:11:04', actor: 'SCADA Telemetry Agent #4', action: 'High Pressure Alert Triggered (>310 PSI)', type: 'telemetry', details: 'Auto-trip executed' },
      { id: 'LOG-2', timestamp: '14:11:06', actor: 'Automated AI Triage Engine', action: 'Classified as P1-CRITICAL (VIP SLA)', type: 'system', details: 'Breach risk < 20 mins' },
      { id: 'LOG-3', timestamp: '14:11:10', actor: 'FieldOps Match Engine', action: 'Identified Tech-104 as 98% Best Fit', type: 'system', details: 'Proximity: 11m, Parts: Verified' }
    ]
  },
  {
    id: '#FLT-9839',
    title: 'UPS Module B DC Bus Capacitor Bank Ripple Anomaly',
    siteName: 'Stanford Biomedical Genome Research Core',
    siteAddress: '3165 Porter Drive, Palo Alto, CA 94304',
    facilityType: 'Biotech Cleanroom',
    coordinates: { x: 58, y: 32, lat: 37.4275, lng: -122.1697 },
    assetName: 'Eaton 9395 500kVA Double-Conversion Uninterruptible Power Supply',
    assetTag: 'STN-UPS-01B',
    errorCode: 'ERR-304D: DC_LINK_RIPPLE_VOLTAGE_CRITICAL',
    description: 'Internal DC bus capacitor health diagnostic detected harmonic ripple voltage >15% on Phase C bank. System running on utility power with imminent risk of dropping mission-critical DNA sequencer load.',
    severity: 'P1-CRITICAL',
    status: 'AI_RECOMMENDED',
    isVipClient: true,
    vipClientName: 'Stanford Medicine Research Core (Zero-Interruption Protocol)',
    reportedAt: '24 min ago (13:59:18 UTC)',
    slaTargetMinutes: 60,
    slaMinutesRemaining: 26,
    telemetryReadings: [
      { metric: 'DC Bus Voltage', value: '448.2 V', normalRange: '445 - 455 V', status: 'nominal', unit: 'V' },
      { metric: 'DC Harmonic Ripple', value: '18.4%', normalRange: '< 4.5%', status: 'critical', unit: '%' },
      { metric: 'Inverter Ingoing Current', value: '620 A', normalRange: '400 - 650 A', status: 'nominal', unit: 'A' },
      { metric: 'Capacitor Bank Core Temp', value: '78.5 °C', normalRange: '40 - 55 °C', status: 'warning', unit: '°C' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 2 - Escort Required',
      accessCode: 'MED-7719-GATE',
      gateContact: 'Dr. Helen Vance / Facility Ops',
      gatePhone: '+1 (650) 555-8822',
      ppeRequired: ['Cleanroom Tyvek Suit', 'ESD Shoes', 'Arc Flash PPE Cat 4 (40 cal/cm2)', 'Safety Glasses'],
      lotoRequired: true,
      notes: 'Transfer system to Static Maintenance Bypass prior to opening Inverter Cabinet 3. Cleanroom shoe-covers mandatory.'
    },
    recommendedTechnicians: [
      {
        technicianId: 'TECH-209',
        overallScore: 99,
        proximityMinutes: 14,
        distanceMiles: 6.1,
        skillMatchScore: 100,
        hasRequiredParts: true,
        workloadScore: 98,
        matchReasons: [
          'Eaton/APC UPS Master & NFPA 70E Arc Flash Certified',
          'Only 14 mins away in Mission Bay Corridor',
          'Van contains DC Bus 450V caps & Infineon 1200V IGBT modules',
          'Authorized for Bio-Cleanroom ISO Level 5 entry'
        ]
      }
    ],
    requiredParts: [
      { partNumber: 'CAP-DC-450V', name: 'DC Bus Electrolytic Cap 450V', requiredQty: 4 }
    ],
    auditLogs: [
      { id: 'LOG-20', timestamp: '13:59:18', actor: 'Eaton PowerXpert Gateway', action: 'Harmonic Ripple Diagnostic Triggered', type: 'telemetry' },
      { id: 'LOG-21', timestamp: '13:59:22', actor: 'Automated AI Triage Engine', action: 'Assigned Match Tech-209 (99% Fit)', type: 'system' }
    ]
  },
  {
    id: '#FLT-9836',
    title: 'Primary Sort Line High-Speed Optical Diverter Jam',
    siteName: 'San Francisco International Airport (SFO) Cargo Hub 3',
    siteAddress: 'North Access Rd, San Francisco, CA 94128',
    facilityType: 'Airport Terminal',
    coordinates: { x: 48, y: 64, lat: 37.6213, lng: -122.3790 },
    assetName: 'Siemens S7-1500 / Vanderlande High-Speed Baggage Matrix',
    assetTag: 'SFO-SRT-M04',
    errorCode: 'ERR-518A: OPTICAL_SYNC_TIMEOUT_AXIS_4',
    description: 'Laser array position encoder mismatch on sorting vane diverter 4. Sorter automatically routed 380 packages to overflow reject recirc loop.',
    severity: 'P2-HIGH',
    status: 'DISPATCHED',
    isVipClient: true,
    vipClientName: 'SFO Terminal Air Cargo Ops',
    reportedAt: '45 min ago (13:38:12 UTC)',
    slaTargetMinutes: 90,
    slaMinutesRemaining: 45,
    assignedTechnicianId: 'TECH-315',
    assignedTechnicianName: 'Devon Gallagher',
    telemetryReadings: [
      { metric: 'Belt Speed', value: '2.4 m/s', normalRange: '2.2 - 2.6 m/s', status: 'nominal', unit: 'm/s' },
      { metric: 'Laser Scanner Lag', value: '412 ms', normalRange: '< 40 ms', status: 'critical', unit: 'ms' },
      { metric: 'VFD Output Torque', value: '88%', normalRange: '50 - 75%', status: 'warning', unit: '%' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 3 - Biometric & Secret',
      accessCode: 'SFO-TSA-CARGO-884',
      gateContact: 'SFO Airside Operations Dispatch',
      gatePhone: '+1 (650) 555-7000',
      ppeRequired: ['Hi-Vis Class 3 Vest', 'Steel Toe Boots', 'Hearing Protection', 'TSA SIDA Badge'],
      lotoRequired: true,
      notes: 'Must display SIDA airside badge at Gate 14. Turn off conveyor emergency pull-cord before inspecting pneumatic diverter.'
    },
    recommendedTechnicians: [
      {
        technicianId: 'TECH-315',
        overallScore: 96,
        proximityMinutes: 8,
        distanceMiles: 2.3,
        skillMatchScore: 98,
        hasRequiredParts: true,
        workloadScore: 90,
        matchReasons: ['Siemens S7 automation specialist', 'TSA Airside Clearance on file', 'Has replacement SICK laser scanner']
      }
    ],
    requiredParts: [
      { partNumber: 'OPT-SICK-102', name: 'SICK Laser Array Scanner Sensor', requiredQty: 1 }
    ],
    auditLogs: [
      { id: 'LOG-30', timestamp: '13:38:12', actor: 'SFO SCADA Diverter PLC', action: 'Axis 4 Sync Fault Logged', type: 'telemetry' },
      { id: 'LOG-31', timestamp: '13:42:00', actor: 'Dispatcher Rachel Torres', action: 'Dispatched Devon Gallagher (TECH-315)', type: 'manual' },
      { id: 'LOG-32', timestamp: '13:44:10', actor: 'TECH-315 Mobile App', action: 'Accepted Dispatch & En Route', type: 'status_change' }
    ]
  },
  {
    id: '#FLT-9831',
    title: 'Ultra-Low Temp Cryo-Freezer -80C Secondary Cascade Warning',
    siteName: 'Genentech B28 Cell Banking Facility',
    siteAddress: '1 DNA Way, South San Francisco, CA 94080',
    facilityType: 'Biotech Cleanroom',
    coordinates: { x: 28, y: 25, lat: 37.6625, lng: -122.3855 },
    assetName: 'Thermo Scientific TSX Series Ultra-Low Temp Freezer (-86°C)',
    assetTag: 'GNT-CRYO-09',
    errorCode: 'ERR-112C: STAGE_2_COMPRESSOR_THERMAL_OVERLOAD',
    description: 'Secondary cascade loop temperature drifting towards -68°C (critical threshold -70°C). Primary R290 stage running continuously with elevated head pressure.',
    severity: 'P1-CRITICAL',
    status: 'UNASSIGNED',
    isVipClient: true,
    vipClientName: 'Genentech Clinical Trial Biobank',
    reportedAt: '18 min ago (14:05:00 UTC)',
    slaTargetMinutes: 45,
    slaMinutesRemaining: 27,
    telemetryReadings: [
      { metric: 'Core Chamber Temp', value: '-71.8 °C', normalRange: '-86 to -80 °C', status: 'critical', unit: '°C' },
      { metric: 'Stage 2 Suction Pressure', value: '4.2 PSI', normalRange: '1.2 - 2.5 PSI', status: 'warning', unit: 'PSI' },
      { metric: 'Gasket Perimeter Delta', value: '6.4 °C', normalRange: '< 2.0 °C', status: 'warning', unit: '°C' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 4 - High Voltage / Hazmat',
      accessCode: 'BIO-GNT-4491',
      gateContact: 'Markus Weber (Lab Operations Lead)',
      gatePhone: '+1 (650) 555-3399',
      ppeRequired: ['Cryogenic Gloves', 'Cleanroom Booties', 'Safety Glasses', 'Cryo Face Shield'],
      lotoRequired: false,
      notes: 'Contains irreplaceable Phase 3 clinical trial vaccine cell stock. CO2 backup injection armed as contingency.'
    },
    recommendedTechnicians: [
      {
        technicianId: 'TECH-512',
        overallScore: 97,
        proximityMinutes: 16,
        distanceMiles: 5.4,
        skillMatchScore: 100,
        hasRequiredParts: true,
        workloadScore: 95,
        matchReasons: [
          'Ultra-Low Temp Cryogenics Master certified',
          'Cleanroom BSL-3 credentials verified',
          'Carries Danfoss R290 cascade compressor relay & seals'
        ]
      }
    ],
    requiredParts: [
      { partNumber: 'DANF-SC-18CL', name: 'Danfoss R290 Cascade Compressor Relay', requiredQty: 1 },
      { partNumber: 'CRYO-SEAL-80', name: 'Hermetic Cryo Silicone Gasket Set', requiredQty: 1 }
    ],
    auditLogs: [
      { id: 'LOG-40', timestamp: '14:05:00', actor: 'Building Management System', action: 'Thermal Drift Threshold Exceeded (-72°C)', type: 'telemetry' }
    ]
  },
  {
    id: '#FLT-9828',
    title: 'VESDA Laser Aspirating Smoke Detection Fault & Damper Interlock',
    siteName: 'Federal Reserve Vault & Data Clearing Center',
    siteAddress: '101 Market St, San Francisco, CA 94105',
    facilityType: 'Financial Vault',
    coordinates: { x: 72, y: 18, lat: 37.7937, lng: -122.3965 },
    assetName: 'Xtralis VESDA LaserPlus High Sensitivity Aspirator',
    assetTag: 'FED-VSD-04',
    errorCode: 'ERR-881F: ASPIRATOR_FLOW_DEVIATION_HIGH',
    description: 'Manifold sample tube #3 flow rate dropped below 40% due to micro-particulate filter saturation. Secondary smoke zone lockout activated.',
    severity: 'P2-HIGH',
    status: 'ON_SITE',
    isVipClient: true,
    vipClientName: 'Federal Reserve Bank Cyber-Vault',
    reportedAt: '1h 12m ago (13:11:00 UTC)',
    slaTargetMinutes: 120,
    slaMinutesRemaining: 48,
    assignedTechnicianId: 'TECH-408',
    assignedTechnicianName: 'Tariq Al-Mansoor',
    telemetryReadings: [
      { metric: 'Aspirator Flow Rate', value: '38%', normalRange: '80 - 105%', status: 'critical', unit: '%' },
      { metric: 'Laser Obscuration', value: '0.012 %/m', normalRange: '< 0.008 %/m', status: 'nominal', unit: '%/m' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 3 - Biometric & Secret',
      accessCode: 'FRB-VAULT-9901',
      gateContact: 'US Marshals Security Desk',
      gatePhone: '+1 (415) 555-1200',
      ppeRequired: ['Steel Toe Shoes', 'Eye Protection', 'Federal Escort Required'],
      lotoRequired: false,
      notes: 'No electronic recording equipment allowed in sub-vault. Badge surrender at gate required.'
    },
    recommendedTechnicians: [],
    requiredParts: [
      { partNumber: 'VESDA-XTR-501', name: 'VESDA Laser Plus Filter Cartridge', requiredQty: 2 }
    ],
    auditLogs: [
      { id: 'LOG-50', timestamp: '13:11:00', actor: 'VESDA Manifold Sensor', action: 'Flow Restriction Detected', type: 'telemetry' },
      { id: 'LOG-51', timestamp: '13:20:10', actor: 'System Auto-Dispatcher', action: 'Dispatched Tariq Al-Mansoor', type: 'system' },
      { id: 'LOG-52', timestamp: '13:48:00', actor: 'TECH-408 Mobile App', action: 'Arrived On Site - Vault Security Clearance Passed', type: 'status_change' }
    ]
  },
  {
    id: '#FLT-9822',
    title: 'Hospital ICU Isolation Room Negative Pressure Gradient Loss',
    siteName: 'UCSF Medical Center Helen Diller Hospital',
    siteAddress: '505 Parnassus Ave, San Francisco, CA 94143',
    facilityType: 'Hospital Facility',
    coordinates: { x: 32, y: 70, lat: 37.7631, lng: -122.4580 },
    assetName: 'Price Industries Room Pressure Monitor & VAV Fast Actuator',
    assetTag: 'UCSF-ICU-VAV-12',
    errorCode: 'ERR-409P: PRESSURE_DIFFERENTIAL_COLLAPSED',
    description: 'Isolation Ward 4B differential pressure dropped to -0.001 in. w.g. (standard -0.025 in. w.g.). Fast-acting exhaust damper servo unresponsive to 0-10V analog control signal.',
    severity: 'P1-CRITICAL',
    status: 'AI_RECOMMENDED',
    isVipClient: true,
    vipClientName: 'UCSF Health Infection Control Unit',
    reportedAt: '31 min ago (13:52:00 UTC)',
    slaTargetMinutes: 45,
    slaMinutesRemaining: 14,
    telemetryReadings: [
      { metric: 'Differential Pressure', value: '-0.002 in. w.g.', normalRange: '-0.030 to -0.020', status: 'critical', unit: 'in. w.g.' },
      { metric: 'Air Exchange Rate', value: '8.4 ACH', normalRange: '12.0 - 15.0 ACH', status: 'warning', unit: 'ACH' },
      { metric: 'Damper Actuator Position', value: '18%', normalRange: '70 - 85%', status: 'critical', unit: '%' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 2 - Escort Required',
      accessCode: 'UCSF-ISO-4402',
      gateContact: 'Head Nurse Station - Ward 4B',
      gatePhone: '+1 (415) 555-4000',
      ppeRequired: ['N95 Respirator', 'Gown', 'Gloves', 'Eye Protection'],
      lotoRequired: false,
      notes: 'Active patient isolation ward. Maintain negative seal with portable HEPA scrubber during actuator replacement.'
    },
    recommendedTechnicians: [
      {
        technicianId: 'TECH-104',
        overallScore: 94,
        proximityMinutes: 18,
        distanceMiles: 7.2,
        skillMatchScore: 96,
        hasRequiredParts: true,
        workloadScore: 89,
        matchReasons: ['HVAC Master & Hospital Isolation certified', 'Carries Belimo fast-acting servos']
      }
    ],
    requiredParts: [
      { partNumber: 'BEL-ACT-24V', name: 'Belimo Fast-Acting Damper Actuator 24V', requiredQty: 1 }
    ],
    auditLogs: [
      { id: 'LOG-60', timestamp: '13:52:00', actor: 'Johnson Controls Metasys BMS', action: 'Isolation Loss Critical Alarm', type: 'telemetry' }
    ]
  },
  {
    id: '#FLT-9817',
    title: 'Steam Boiler High-Water Cutoff Probe Carbonization',
    siteName: 'Kaiser Permanente Regional Medical Center',
    siteAddress: '2425 Geary Blvd, San Francisco, CA 94115',
    facilityType: 'Hospital Facility',
    coordinates: { x: 52, y: 15, lat: 37.7831, lng: -122.4430 },
    assetName: 'Cleaver-Brooks 400HP Firetube Steam Boiler',
    assetTag: 'KSR-BLR-01',
    errorCode: 'ERR-211W: CONDUCTIVITY_PROBE_SHORT',
    description: 'Probe false-positive indicates boiler flooding; automated blowdown opened unexpectedly. Primary sterilization steam pressure dropping.',
    severity: 'P3-STANDARD',
    status: 'PENDING_PARTS',
    isVipClient: false,
    reportedAt: '2h 10m ago (12:13:00 UTC)',
    slaTargetMinutes: 240,
    slaMinutesRemaining: 110,
    telemetryReadings: [
      { metric: 'Steam Header Pressure', value: '92 PSI', normalRange: '100 - 120 PSI', status: 'warning', unit: 'PSI' },
      { metric: 'Water Level Sight Glass', value: '48%', normalRange: '45 - 55%', status: 'nominal', unit: '%' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 1 - Public',
      accessCode: 'BLR-ROOM-102',
      gateContact: 'Facilities Plant Chief',
      gatePhone: '+1 (415) 555-8300',
      ppeRequired: ['Safety Glasses', 'Heat-Resistant Gloves', 'Steel Toe Boots'],
      lotoRequired: true,
      notes: 'Depressurize probe inspection nipple before unscrewing sensor rod.'
    },
    recommendedTechnicians: [],
    requiredParts: [
      { partNumber: 'CB-PROBE-SS', name: 'Stainless Steel Liquid Level Conductivity Probe', requiredQty: 1 }
    ],
    auditLogs: [
      { id: 'LOG-70', timestamp: '12:13:00', actor: 'Boiler SCADA Module', action: 'False High Water Trip', type: 'telemetry' }
    ]
  },
  {
    id: '#FLT-9810',
    title: 'CRAC Unit 3B Blower Motor V-Belt Slippage & Temp Delta',
    siteName: 'Digital Realty SuperNAP Colocation',
    siteAddress: '365 S Randolph Ave, South San Francisco, CA 94080',
    facilityType: 'Data Center',
    coordinates: { x: 65, y: 72, lat: 37.6540, lng: -122.4080 },
    assetName: 'Liebert DS 105kW Downflow Precision CRAC',
    assetTag: 'DLR-CRAC-03B',
    errorCode: 'ERR-109B: AIRFLOW_CFM_REDUCED_25PCT',
    description: 'Optical strobe check indicates 14% motor pulley slippage under thermal load. Replaced belt during routine servicing 4 hours ago.',
    severity: 'P4-LOW',
    status: 'RESOLVED',
    isVipClient: false,
    reportedAt: '4h 30m ago (09:53:00 UTC)',
    slaTargetMinutes: 480,
    slaMinutesRemaining: 0,
    assignedTechnicianId: 'TECH-104',
    assignedTechnicianName: 'Marcus Vance',
    telemetryReadings: [
      { metric: 'Supply Air CFM', value: '14,200 CFM', normalRange: '14,000 - 15,000 CFM', status: 'nominal', unit: 'CFM' },
      { metric: 'Motor Vibration', value: '0.08 in/s', normalRange: '< 0.15 in/s', status: 'nominal', unit: 'in/s' },
    ],
    securityProtocol: {
      clearanceLevel: 'Level 2 - Escort Required',
      accessCode: 'DLR-BADGE-1190',
      gateContact: 'Shift Engineer',
      gatePhone: '+1 (650) 555-9922',
      ppeRequired: ['Safety Glasses', 'Hearing Protection'],
      lotoRequired: true,
      notes: 'Service completed. Belt tension recalibrated to 65 lbs-ft.'
    },
    recommendedTechnicians: [],
    requiredParts: [],
    auditLogs: [
      { id: 'LOG-80', timestamp: '09:53:00', actor: 'BMS Alert', action: 'CFM Drop Noted', type: 'telemetry' },
      { id: 'LOG-81', timestamp: '11:40:00', actor: 'Marcus Vance', action: 'Resolved: Replaced belt & torqued pulley', type: 'status_change' }
    ]
  }
];

export const SITE_KNOWLEDGE_BASE: SiteKnowledgeItem[] = [
  {
    id: 'SITE-001',
    siteName: 'Equinix SV11 Silicon Valley Hyperscale',
    facilityType: 'Data Center',
    primaryEquipment: ['Carrier 19XR 800T Centrifugal Chillers', 'Eaton 9395 750kVA UPS', 'Liebert DSE Free-Cooling AHU', 'Caterpillar 2MW Diesel Generators'],
    accessGuide: 'Enter via Federal Way Security Gate 2. Provide government ID and active badge requisition number. Biometric iris scanner at Entrance 4B.',
    powerSchematicCode: 'DWG-EQX-SV11-E04 (Dual Feed 21kV to 480V Substation)',
    hvacZoneGuide: 'Data Halls A-D on N+2 Closed Glycol Loop. Pressure regulated at 45 PSI. Containment aisles locked at 22.5°C +/- 1.0°C.',
    emergencyContacts: [
      { role: 'Lead Facilities Director', name: 'David Sterling', phone: '+1 (408) 555-0199' },
      { role: '24/7 Hyperscale NOC', name: 'NOC Command Desk', phone: '+1 (408) 555-0100' }
    ],
    pastIncidentsCount: 14,
    lastUpdated: '2026-08-14'
  },
  {
    id: 'SITE-002',
    siteName: 'Stanford Biomedical Genome Research Core',
    facilityType: 'Biotech Cleanroom',
    primaryEquipment: ['Eaton 9395 500kVA Double-Conversion UPS', 'Thermo Scientific TSX Cryo Freezers', 'Cleanroom Recirculating Air Handlers ISO-5', 'Pure Steam Generators'],
    accessGuide: 'Porter Drive entrance. Tyvek bunny suit and ESD footings required in air-lock transition chamber. No silicon or mineral oils allowed.',
    powerSchematicCode: 'DWG-STN-BIO-P02 (Dedicated Medical Isolation Transformer Bank)',
    hvacZoneGuide: 'Cleanroom Grade B & C positive pressure cascade (+15 Pa relative to corridor). Laminar flow velocity maintained at 0.45 m/s.',
    emergencyContacts: [
      { role: 'Biobank Operations Lead', name: 'Dr. Helen Vance', phone: '+1 (650) 555-8822' },
      { role: 'Stanford EH&S Biosafety Officer', name: 'James Kim', phone: '+1 (650) 555-7711' }
    ],
    pastIncidentsCount: 8,
    lastUpdated: '2026-08-28'
  },
  {
    id: 'SITE-003',
    siteName: 'San Francisco International Airport (SFO) Cargo Hub 3',
    facilityType: 'Airport Terminal',
    primaryEquipment: ['Siemens S7-1500 Baggage PLCs', 'Vanderlande High-Speed Diverters', 'ABB ACS880 VFDs', 'Fike Nitrogen Clean Agent Fire Suppression'],
    accessGuide: 'Airside Gate 14. TSA SIDA Badge and background clearance mandatory. Tool inventory inspection upon vehicle entry.',
    powerSchematicCode: 'DWG-SFO-CARGO-HV-09 (Airside Ring Main Unit 12kV)',
    hvacZoneGuide: 'Warehouse high-bay exhaust system with automated smoke extraction dampers.',
    emergencyContacts: [
      { role: 'SFO Airside Operations Dispatch', name: 'Duty Superintendent', phone: '+1 (650) 555-7000' },
      { role: 'TSA Security Terminal Officer', name: 'Agent Morales', phone: '+1 (650) 555-7140' }
    ],
    pastIncidentsCount: 22,
    lastUpdated: '2026-09-01'
  },
  {
    id: 'SITE-004',
    siteName: 'Genentech B28 Cell Banking Facility',
    facilityType: 'Biotech Cleanroom',
    primaryEquipment: ['Thermo TSX -86C Freezers', 'Liquid Nitrogen Bulk Tanks (10,000 gal)', 'Ruskin Fast-Acting Bubble-Tight Isolation Dampers'],
    accessGuide: '1 DNA Way Security Checkpoint. Cleanroom certification card scan required at gowning room entrance.',
    powerSchematicCode: 'DWG-GNT-B28-CRYO-01',
    hvacZoneGuide: 'Bio-Safety Level 3 (BSL-3) negative pressure suite. Continuous HEPA filtration with DOP testing ports.',
    emergencyContacts: [
      { role: 'Cryo Storage Manager', name: 'Markus Weber', phone: '+1 (650) 555-3399' }
    ],
    pastIncidentsCount: 6,
    lastUpdated: '2026-07-30'
  },
  {
    id: 'SITE-005',
    siteName: 'Federal Reserve Vault & Data Clearing Center',
    facilityType: 'Financial Vault',
    primaryEquipment: ['Xtralis VESDA LaserPlus Detectors', 'Halon 1301 / Novec 1230 Systems', 'APC Symmetra PX 500kVA UPS', 'Sub-terrain High-Volume Dehumidifiers'],
    accessGuide: '101 Market St. Armed US Marshals security screening. Mobile phones, wireless radios, and unauthorized cameras prohibited.',
    powerSchematicCode: 'DWG-FRB-SEC-PWR-99',
    hvacZoneGuide: 'Class 1 secure vault zone. Relative humidity strictly controlled to 45% +/- 3% RH.',
    emergencyContacts: [
      { role: 'Chief Security Officer', name: 'Capt. R. Hernandez', phone: '+1 (415) 555-1200' }
    ],
    pastIncidentsCount: 3,
    lastUpdated: '2026-08-19'
  }
];
