create table usuarios (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    telefono VARCHAR(80) NOT NULL,
    imagen VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    is_available BOOLEAN  NULL,
    session_token VARCHAR(255) NULL,
    created_at TIMESTAMP (0) NOT NULL,
    updated_at TIMESTAMP (0) NOT NULL,
);

INSERT INTO usuarios(
    email,
    nombre,
    apellido,
    telefono,
    password,
    created_at,
    updated_at
) VALUES (
    'admin@example.com',
    'Manuel',
    'Hernandez',
    '99946464',
    '$2y$10$92IXUNpkjO0rOQ5byMi',
    '2021-01-14 12:00:00',
    '2021-01-14 12:00:00'
);

