create extension if not exists pgcrypto;

create table uploads (
    id uuid primary key default gen_random_uuid(),
    cloudinary_public_id text not null,
    cloudinary_url text not null,
    created_at timestamptz(6) not null default current_timestamp
);
