create table if not exists users (
    id bigserial primary key,
    name varchar not null,
    phone varchar,
    password varchar,

    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table if not exists group_spaces (
    id bigserial primary key,
    name varchar not null,
    creator_id bigint references users(id) on update cascade on delete set null,

    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
create index if not exists idx_group_spaces_creator_id on group_spaces(creator_id);

create table if not exists messages (
    id bigserial primary key,
    group_space_id bigint references group_spaces(id) on update cascade on delete cascade,
    user_id bigint references users(id) on update cascade on delete set null,
    content varchar,

    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
create index if not exists idx_messages_group_space_id on messages(group_space_id);
create index if not exists idx_messages_user_id on messages(user_id);

create table if not exists notes (
    id bigserial primary key,
    creator_id bigint references users(id) on update cascade on delete set null,
    group_space_id bigint references group_spaces(id) on update cascade on delete cascade,
    title varchar,
    content varchar,

    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);
create index if not exists idx_notes_creator_id on notes(creator_id);
create index if not exists idx_notes_group_space_id on notes(group_space_id);