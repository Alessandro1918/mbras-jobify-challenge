CREATE TABLE "favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"job_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
