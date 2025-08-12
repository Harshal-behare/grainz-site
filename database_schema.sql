-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.admin_profiles (
  id uuid NOT NULL,
  email character varying NOT NULL UNIQUE,
  role character varying DEFAULT 'admin'::character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT admin_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.body_measurements (
  id bigint NOT NULL DEFAULT nextval('body_measurements_id_seq'::regclass),
  submission_id character varying,
  forearm_in numeric,
  bicep_in numeric,
  shoulder_in numeric,
  chest_in numeric,
  upper_waist_in numeric,
  lower_waist_in numeric,
  belly_button_circumference_in numeric,
  buttocks_in numeric,
  thighs_in numeric,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT body_measurements_pkey PRIMARY KEY (id),
  CONSTRAINT body_measurements_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.form_submissions(submission_id)
);
CREATE TABLE public.form_submissions (
  id bigint NOT NULL DEFAULT nextval('form_submissions_id_seq'::regclass),
  submission_id character varying NOT NULL DEFAULT ((('FIT-'::text || (EXTRACT(epoch FROM now()))::bigint) || '-'::text) || ((random() * (1000)::double precision))::integer) UNIQUE,
  user_name character varying,
  email character varying,
  phone_number character varying,
  profession character varying,
  current_diet_timetable text,
  current_workout_plan text,
  daily_schedule text,
  fitness_goal_6_months text,
  fitness_goal_long_term text,
  target_body_areas text,
  medical_issues_allergies text,
  resting_heart_rate integer,
  preferred_workout_time character varying,
  has_personal_trainer boolean DEFAULT false,
  high_calorie_favourite_foods jsonb DEFAULT '[]'::jsonb,
  other_high_calorie_sweets text,
  preferred_included_foods jsonb DEFAULT '[]'::jsonb,
  foods_despised jsonb DEFAULT '[]'::jsonb,
  favourite_fruits jsonb DEFAULT '[]'::jsonb,
  favourite_vegetables jsonb DEFAULT '[]'::jsonb,
  diet_habits jsonb DEFAULT '[]'::jsonb,
  programme_start_date date,
  programme_chosen character varying,
  alcohol_smoke_frequency text,
  blood_report_url text,
  body_composition_report_url text,
  aspiration_image_url text,
  ip_address inet,
  user_agent text,
  form_version character varying DEFAULT 'v1.0'::character varying,
  submitted_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT form_submissions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.full_body_images (
  id bigint NOT NULL DEFAULT nextval('full_body_images_id_seq'::regclass),
  submission_id character varying,
  file_url text NOT NULL,
  view_type character varying,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT full_body_images_pkey PRIMARY KEY (id),
  CONSTRAINT full_body_images_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.form_submissions(submission_id)
);