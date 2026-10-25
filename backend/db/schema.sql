-- ============================================================================
-- ASTER HSK MASTER · ENTERPRISE DATABASE SCHEMA (POSTGRESQL 16)
-- Kiến trúc tối ưu cho 10.000 - 100.000 CCU kết hợp PgBouncer & Read Replicas
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. BẢNG NGƯỜI DÙNG & TÀI KHOẢN (USERS)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    current_level SMALLINT NOT NULL DEFAULT 1 CHECK (current_level BETWEEN 1 AND 6),
    streak_days INT NOT NULL DEFAULT 0,
    total_xp INT NOT NULL DEFAULT 0,
    last_study_date DATE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_streak ON users(streak_days DESC);

-- 2. BẢNG TIẾN ĐỘ THẺ GHI NHỚ FSRS / SM-2 (CARD PROGRESS)
CREATE TABLE IF NOT EXISTS fsrs_card_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vocab_id VARCHAR(64) NOT NULL,
    hsk_level SMALLINT NOT NULL DEFAULT 1,
    mastery_level SMALLINT NOT NULL DEFAULT 0 CHECK (mastery_level BETWEEN 0 AND 3),
    interval_days INT NOT NULL DEFAULT 1,
    ease_factor NUMERIC(4, 2) NOT NULL DEFAULT 2.50,
    review_count INT NOT NULL DEFAULT 0,
    next_review_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_vocab UNIQUE (user_id, vocab_id)
);

CREATE INDEX IF NOT EXISTS idx_fsrs_user_review ON fsrs_card_progress(user_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_fsrs_level ON fsrs_card_progress(user_id, hsk_level);

-- 3. BẢNG TIẾN ĐỘ NGHE 120 FILE AUDIO & NGỮ PHÁP TIỂU NGỮ
CREATE TABLE IF NOT EXISTS audio_learning_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_level VARCHAR(10) NOT NULL, -- 'HSK1', 'HSK2', 'HSK3'
    lesson_number VARCHAR(10) NOT NULL,
    track_number VARCHAR(20) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT TRUE,
    listened_count INT NOT NULL DEFAULT 1,
    last_listened_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_audio_track UNIQUE (user_id, course_level, track_number)
);

CREATE INDEX IF NOT EXISTS idx_audio_user_course ON audio_learning_records(user_id, course_level);

-- 4. BẢNG ĐỀ THI CHỨNG CHỈ MÔ PHỎNG CBT (EXAM TEMPLATES)
CREATE TABLE IF NOT EXISTS cbt_exam_templates (
    id VARCHAR(64) PRIMARY KEY,
    hsk_level SMALLINT NOT NULL CHECK (hsk_level BETWEEN 1 AND 6),
    title VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 55,
    total_score INT NOT NULL DEFAULT 200,
    pass_score INT NOT NULL DEFAULT 120,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    questions_encrypted JSONB NOT NULL, -- Lưu trữ câu hỏi đã mã hóa, chỉ giải mã phía server
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. BẢNG BÀI NỘP THI CBT (ASYNCHRONOUS EXAM SUBMISSIONS)
CREATE TABLE IF NOT EXISTS cbt_exam_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exam_id VARCHAR(64) NOT NULL REFERENCES cbt_exam_templates(id),
    status VARCHAR(20) NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'grading', 'graded', 'flagged')),
    raw_answers JSONB NOT NULL,
    score INT,
    passed BOOLEAN,
    tab_switch_count INT NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    graded_at TIMESTAMPTZ,
    audit_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_cbt_user_exams ON cbt_exam_submissions(user_id, submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_cbt_status_queue ON cbt_exam_submissions(status) WHERE status = 'queued';

-- 6. BẢNG SEMANTIC CACHE CHO TRỢ LÝ AI (TIẾT KIỆM 80% CHI PHÍ GEMINI)
CREATE TABLE IF NOT EXISTS ai_semantic_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash VARCHAR(64) UNIQUE NOT NULL,
    query_text TEXT NOT NULL,
    response_text TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    hit_count INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_hit_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_cache_hash ON ai_semantic_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_ai_cache_hits ON ai_semantic_cache(hit_count DESC);
