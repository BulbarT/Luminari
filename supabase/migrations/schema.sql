-- База данных для проекта Luminari
-- Интеграция с GitHub настроена напрямую

create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone
);