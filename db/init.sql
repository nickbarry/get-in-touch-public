CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name,
  email,
  phone,
  facebook,
  twitter,
  lastContacted,
  contactFrequency,
  contactNext,
  notes,
  created_at,
  updated_at
);