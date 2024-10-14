-- Tabla Portfolios
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    divisa_principal VARCHAR(10) NOT NULL,
    fecha_creacion DATE NOT NULL,
    valor_actual DECIMAL(18, 2) NOT NULL
);

-- Tabla Activos
CREATE TABLE activos (
    id SERIAL PRIMARY KEY,
    portfolio_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    ticker VARCHAR(50),
    divisa VARCHAR(10),
    tipo_cambio_divisa_compra DECIMAL(18, 6),
    fecha_compra DATE,
    numero_titulos INT,
    precio_medio_unitario DECIMAL(18, 6),
    coste_comisiones DECIMAL(18, 2),
    precio_total_coste DECIMAL(18, 2),
    precio_actual DECIMAL(18, 2),
    ultima_valorizacion DECIMAL(18, 2),
    fecha_actualizacion DATE,
    tasa_interes_nominal DECIMAL(5, 2),
    plazo_inversion INT,
    precio_unitario_venta DECIMAL(18, 6),
    tipo_cambio_divisa_venta DECIMAL(18, 6),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(id)
);

-- Tabla ValorizacionesDiarias
CREATE TABLE valorizacionesDiarias (
    id SERIAL PRIMARY KEY,
    portfolio_id INT NOT NULL,
    fecha DATE NOT NULL,
    valor DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(id)
);

-- Tabla PreciosActivos
CREATE TABLE preciosactivos (
    id SERIAL PRIMARY KEY,
    activo_id INT NOT NULL,
    fecha DATE NOT NULL,
    precio_cierre DECIMAL(18, 6) NOT NULL,
    precio_apertura DECIMAL(18, 6),
    precio_maximo DECIMAL(18, 6),
    precio_minimo DECIMAL(18, 6),
    volumen INT,
    FOREIGN KEY (activo_id) REFERENCES Activos(id)
);

-- Insert example data for Portfolios
INSERT INTO portfolios (nombre, descripcion, divisa, fecha_creacion, valor_actual) VALUES
('Portfolio 1', 'Descripción del Portfolio 1', 'USD', '2023-01-01', 100000.00),
('Portfolio 2', 'Descripción del Portfolio 2', 'EUR', '2023-02-01', 150000.00);

-- Insert example data for Activos
INSERT INTO activos (portfolio_id, tipo, nombre, ticker, divisa, tipo_cambio_divisa_compra, fecha_compra, numero_titulos, precio_medio_unitario, coste_comisiones, precio_total_coste, precio_actual, ultima_valorizacion, fecha_actualizacion, tasa_interes_nominal, plazo_inversion, precio_unitario_venta, tipo_cambio_divisa_venta) VALUES
(1, 'Acción', 'Activo 1', 'TICK1', 'USD', 1.10, '2023-01-10', 100, 50.00, 10.00, 5010.00, 55.00, 5500.00, '2023-01-15', 0.00, 0, 0.00, 0.00),
(1, 'Bono', 'Activo 2', 'TICK2', 'EUR', 1.00, '2023-01-20', 200, 100.00, 20.00, 20020.00, 105.00, 21000.00, '2023-01-25', 5.00, 365, 0.00, 0.00);




INSERT INTO wealth_data.valorizacionesdiarias (id, portfolio_id, fecha, valor) VALUES(1, 1, '2024-10-10', 19900.00);
INSERT INTO wealth_data.valorizacionesdiarias (id, portfolio_id, fecha, valor) VALUES(2, 1, '2024-10-09', 18400.00);
INSERT INTO wealth_data.valorizacionesdiarias (id, portfolio_id, fecha, valor) VALUES(3, 1, '2024-10-08', 18700.00);
INSERT INTO wealth_data.valorizacionesdiarias (id, portfolio_id, fecha, valor) VALUES(4, 1, '2024-10-14', 20000.00);