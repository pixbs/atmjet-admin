CREATE TABLE IF NOT EXISTS "atmjet_admin__empty_legs" (
	"id" serial PRIMARY KEY NOT NULL,
	"start" timestamp with time zone NOT NULL,
	"end" timestamp with time zone NOT NULL,
	"from" varchar(4) NOT NULL,
	"to" varchar(4) NOT NULL,
	"type" varchar(255),
	"company" varchar(255),
	"safety" varchar(255),
	"price" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "atmjet_admin__users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(256) NOT NULL,
	"password" text NOT NULL
);
