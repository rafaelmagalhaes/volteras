CREATE TABLE IF NOT EXISTS "vehicle_data" (
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id UUID NOT NULL,
    timestamp TIMESTAMP,
    speed TEXT,
    odometer NUMERIC,
    soc NUMERIC,
    elevation NUMERIC,
    shift_state TEXT
);

