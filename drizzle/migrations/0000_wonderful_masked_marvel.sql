CREATE TABLE "aiResponse" (
	"id" serial PRIMARY KEY NOT NULL,
	"formData" varchar(255) NOT NULL,
	"aiResponse" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"templateSlug" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL
);
