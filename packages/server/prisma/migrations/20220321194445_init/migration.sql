create extension if not exists pgcrypto;

CREATE TABLE "Uploads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cloudinary_public_id" TEXT NOT NULL,
    "cloudinary_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("id")
);
