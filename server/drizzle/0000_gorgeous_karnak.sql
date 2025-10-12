CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"original_url" varchar(2048),
	"short_url" varchar(255),
	"hits" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url")
);
