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

/*




CREATE TABLE usuario (
    no_control SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    edad INT,
    carrera VARCHAR(100),
    semestre INT,
    email VARCHAR(100) UNIQUE NOT NULL,  
    password VARCHAR(255) NOT NULL    
);


altere la tabla para agregar el campo "rol"
ALTER TABLE usuario
ADD COLUMN rol VARCHAR(50) DEFAULT 'usuario';


CREATE TABLE administradores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

altere la tabla para agregar el campo "rol"
ALTER TABLE administradores
ADD COLUMN rol VARCHAR(50) DEFAULT 'administrador';



CREATE TABLE expediente (
    id SERIAL PRIMARY KEY,                
    no_control INT NOT NULL,              
    sexo VARCHAR(10),                     
    edad INT,                          
    estado_civil VARCHAR(20),           
    direccion VARCHAR(255),                
    telefono VARCHAR(10),                 
    ingenieria VARCHAR(100),              
    modalidad VARCHAR(50),               
    semestre INT,                          
    fecha_registro DATE,                   
    numero_sesiones INT,                   
    FOREIGN KEY (no_control) REFERENCES usuario(no_control)  
);
*/