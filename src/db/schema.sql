-- ============================================
-- EVENTS TABLE (NCRs/CAPAs)
-- ============================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(50) UNIQUE NOT NULL,
    event_type VARCHAR(20) CHECK (event_type IN ('NCR', 'CAPA', 'AuditFinding')),
    title TEXT NOT NULL,
    description TEXT,
    severity VARCHAR(20) CHECK (severity IN ('Minor', 'Major', 'Critical')),
    category VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('Open', 'InReview', 'Closed', 'Archived')),
    
    -- RCA Fields
    root_cause_category VARCHAR(50),
    root_cause_description TEXT,
    corrective_action TEXT,
    preventive_action TEXT,
    effectiveness BOOLEAN,
    effectiveness_verification TEXT,
    lessons_learned TEXT,
    
    -- Metadata
    product_line VARCHAR(50),
    sub_assembly VARCHAR(50),
    supplier VARCHAR(100),
    material_lot VARCHAR(50),
    operator VARCHAR(100),
    shift VARCHAR(20),
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    closed_at TIMESTAMP,
    created_by UUID,
    closed_by UUID,
    
    -- AI Metadata
    ai_suggested_severity VARCHAR(20),
    ai_suggested_category VARCHAR(50),
    ai_confidence FLOAT,
    human_accepted BOOLEAN,
    
    -- Embedding
    embedding VECTOR(1536)
);

-- ============================================
-- RCA KNOWLEDGE BASE (Learned Patterns)
-- ============================================
CREATE TABLE rca_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    issue_pattern TEXT NOT NULL,
    root_cause_pattern TEXT,
    solution_pattern TEXT,
    effectiveness_score FLOAT,
    frequency INTEGER DEFAULT 1,
    last_occurrence TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TRIAGE HISTORY (For AI Learning)
-- ============================================
CREATE TABLE triage_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id),
    ai_suggestion JSONB,
    human_decision VARCHAR(20) CHECK (human_decision IN ('Accepted', 'Edited', 'Rejected')),
    human_edit JSONB,
    timestamp TIMESTAMP DEFAULT NOW(),
    user_id UUID
);

-- ============================================
-- PROPAGATION TRACKING
-- ============================================
CREATE TABLE propagation_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_capa_id UUID REFERENCES events(id),
    target_line VARCHAR(50),
    probability_score FLOAT,
    status VARCHAR(20) CHECK (status IN ('Recommended', 'Converted', 'Implemented', 'Ignored')),
    created_at TIMESTAMP DEFAULT NOW(),
    converted_at TIMESTAMP
);

-- ============================================
-- GOLDEN BATCH PARAMETERS
-- ============================================
CREATE TABLE golden_batch_parameters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_line VARCHAR(50),
    parameter_name VARCHAR(50),
    mean FLOAT,
    sigma FLOAT,
    lower_limit FLOAT,
    upper_limit FLOAT,
    last_calculated TIMESTAMP DEFAULT NOW(),
    sample_size INTEGER
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_events_embedding ON events USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_product_line ON events(product_line);
CREATE INDEX idx_events_created_at ON events(created_at);
CREATE INDEX idx_rca_patterns_issue_pattern ON rca_patterns USING GIN (issue_pattern gin_trgm_ops);