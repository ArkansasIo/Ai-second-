CREATE TABLE IF NOT EXISTS update_releases (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(32) NOT NULL,
  channel VARCHAR(16) NOT NULL,
  release_date DATETIME NOT NULL,
  release_url TEXT,
  manifest_url TEXT,
  checksum VARCHAR(128),
  signature TEXT,
  status VARCHAR(32) NOT NULL DEFAULT 'available',
  UNIQUE KEY uq_release_version_channel (version, channel)
);

CREATE TABLE IF NOT EXISTS update_history (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  installed_version VARCHAR(32) NOT NULL,
  previous_version VARCHAR(32),
  channel VARCHAR(16) NOT NULL,
  started_at DATETIME NOT NULL,
  completed_at DATETIME,
  result VARCHAR(32) NOT NULL,
  migration_result VARCHAR(32),
  rollback_performed BOOLEAN NOT NULL DEFAULT FALSE,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS patch_notes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  version VARCHAR(32) NOT NULL,
  category VARCHAR(32) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  source_commit VARCHAR(64),
  source_pr BIGINT,
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS ollama_models (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  digest VARCHAR(128),
  parameter_size VARCHAR(64),
  quantization VARCHAR(64),
  context_length INT,
  capabilities JSON,
  discovered_at DATETIME NOT NULL,
  last_seen_at DATETIME NOT NULL
);
