-- ========================================================
-- BANCO DE DADOS NEON (POSTGRESQL SERVERLESS) - PC BUILDER
-- ========================================================

-- 1. Tabela de Peças e Componentes de Hardware
CREATE TABLE IF NOT EXISTS pecas (
    id VARCHAR(80) PRIMARY KEY,
    categoria VARCHAR(40) NOT NULL, -- 'cpu', 'gpu', 'ram', 'placamae', 'armazenamento', 'fonte', 'gabinete', 'cooler'
    nome VARCHAR(150) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    especificacoes TEXT,
    potencia_watts INT DEFAULT 0,
    soquete VARCHAR(40),
    tipo_memoria VARCHAR(20), -- 'DDR4', 'DDR5'
    perfil_recomendado VARCHAR(50), -- 'escritorio', 'gamer', 'hibrido', 'workstation'
    imagem VARCHAR(255),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Computadores Prontos (Escritório e Gamer)
CREATE TABLE IF NOT EXISTS pcs_prontos (
    id VARCHAR(80) PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL, -- 'escritorio' ou 'gamer'
    nivel VARCHAR(30) NOT NULL, -- 'Basico', 'Intermediario', 'Avancado'
    etiqueta VARCHAR(60),
    nome VARCHAR(150) NOT NULL,
    subtitulo VARCHAR(200),
    preco_total NUMERIC(10, 2) NOT NULL,
    perfil_uso TEXT NOT NULL,
    resolucao_alvo VARCHAR(40),
    componentes JSONB NOT NULL,
    imagem VARCHAR(255),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Orçamentos e Montagens Livres
CREATE TABLE IF NOT EXISTS orcamentos (
    id SERIAL PRIMARY KEY,
    codigo_compartilhamento VARCHAR(64) UNIQUE,
    usuario_nome VARCHAR(100),
    usuario_email VARCHAR(120),
    finalidade VARCHAR(50),
    total_estimado NUMERIC(10, 2) NOT NULL,
    potencia_total_watts INT NOT NULL,
    compatibilidade_status VARCHAR(30) DEFAULT 'compativel',
    pecas_selecionadas JSONB NOT NULL,
    observacoes TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Depoimentos e Prova Social
CREATE TABLE IF NOT EXISTS depoimentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    profissao_perfil VARCHAR(120) NOT NULL,
    avatar_url VARCHAR(255),
    tipo_computador VARCHAR(50) NOT NULL, -- 'PC Escritório', 'PC Gamer', 'Reforma Completa'
    comentario TEXT NOT NULL,
    avaliacao INT DEFAULT 5 CHECK (avaliacao >= 1 AND avaliacao <= 5),
    aprovado BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabela do FAQ Lateral
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    pergunta TEXT NOT NULL,
    resposta TEXT NOT NULL,
    categoria VARCHAR(50) DEFAULT 'geral',
    ordem INT DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE
);

-- ========================================================
-- CARGA INICIAL DE DADOS (SEEDS)
-- ========================================================

-- Inserir Computadores de Escritório e Gamer (Preço Crescente)
INSERT INTO pcs_prontos (id, tipo, nivel, etiqueta, nome, subtitulo, preco_total, perfil_uso, resolucao_alvo, componentes) VALUES
-- ESCRITÓRIO
('escritorio-home-office', 'escritorio', 'Basico', 'ECONÔMICO & COMPACTO', 'Setup Escritório Slim', 'Home Office, Estudos e Tarefas Administrativas', 1890.00, 'Silencioso, baixo consumo e boot em 7 segundos. Ideal para planilhas, aulas online e multitarefa diária sem lentidão.', 'Full HD (1080p)', '{
    "cpu": "AMD Ryzen 3 3200G (4 núcleos, 4.0GHz c/ Vega 8)",
    "placamae": "MSI A520M-A PRO AM4",
    "ram": "16GB (2x8GB) DDR4 3200MHz Dual Channel",
    "armazenamento": "SSD NVMe M.2 512GB Kingston (3500MB/s)",
    "fonte": "MSI MAG A500DN 500W 80 Plus",
    "gabinete": "Slim Office Silent c/ Fan 120mm"
}'),
('escritorio-corporativo-pro', 'escritorio', 'Intermediario', 'PRODUTIVIDADE MULTITAREFA', 'Estação Corporativa Dual-Monitor', 'Finanças, ERPs Pesados, Programação e 40+ Abas', 2990.00, 'Zero travamentos. Processador com 6 núcleos de alta performance e suporte nativo a múltiplos monitores 4K.', 'Dual Display 4K', '{
    "cpu": "Intel Core i5-12400 (6C/12T até 4.4GHz UHD 730)",
    "placamae": "ASUS Prime H610M-E D4 LGA 1700",
    "ram": "16GB DDR4 3200MHz Kingston Fury Beast",
    "armazenamento": "SSD NVMe M.2 1TB Gen4 Kingston NV2",
    "fonte": "MSI MAG A550BN 550W 80 Plus Bronze",
    "gabinete": "DeepCool Wave V2 Minimalista Black"
}'),
('escritorio-workstation-cad', 'escritorio', 'Avancado', 'WORKSTATION ENGENHARIA', 'Workstation AutoCAD & Revit Pro', 'Projetos Arquitetônicos 2D/3D, Renderização e Engenharia', 4790.00, 'Potência bruta para AutoCAD, Revit, SolidWorks e edição com GPU dedicada acelerada por hardware.', 'Quad HD / Multi-Display', '{
    "cpu": "AMD Ryzen 7 5700X (8C/16T até 4.6GHz)",
    "gpu": "NVIDIA GeForce RTX 3050 6GB GDDR6",
    "placamae": "ASUS TUF Gaming B550M-Plus",
    "ram": "32GB (2x16GB) DDR4 3200MHz Kingston Fury",
    "armazenamento": "SSD NVMe M.2 1TB Kingston NV2 3500MB/s",
    "fonte": "Corsair CV650 650W 80 Plus Bronze",
    "cooler": "Air Cooler DeepCool AG400 150W TDP",
    "gabinete": "Montech Air 100 Silent Mesh"
}'),

-- GAMER
('gamer-esports-entrada', 'gamer', 'Basico', 'ENTRADA COMPETITIVA', 'Gamer Hunter eSports 1080p', 'Valorant, CS2, Fortnite, LoL e GTA V com Alto FPS', 3250.00, 'A porta de entrada ideal. Fluidez absoluta em jogos competitivos em 1080p com suporte a DLSS.', 'Full HD (1080p)', '{
    "cpu": "Intel Core i3-12100F (4C/8T até 4.3GHz)",
    "gpu": "NVIDIA GeForce RTX 3050 6GB GDDR6",
    "placamae": "ASUS Prime H610M-E D4",
    "ram": "16GB (2x8GB) DDR4 3200MHz",
    "armazenamento": "SSD NVMe M.2 512GB Kingston",
    "fonte": "MSI MAG A550BN 550W 80 Plus Bronze",
    "gabinete": "Pichau HX300 Glass c/ 3 Fans RGB"
}'),
('gamer-high-fps', 'gamer', 'Intermediario', 'CUSTO-BENEFÍCIO CAMPEÃO', 'Gamer Phantom High FPS & DLSS 3', 'Ray Tracing, DLSS 3 Frame Gen e Jogos AAA em 1080p/1440p', 4890.00, 'Equilíbrio absoluto de performance. Roda lançamentos pesados com Ray Tracing e taxas acima de 120 FPS.', '1080p Ultra / 1440p', '{
    "cpu": "AMD Ryzen 5 5600 (6C/12T até 4.4GHz)",
    "gpu": "NVIDIA GeForce RTX 4060 8GB GDDR6 (DLSS 3)",
    "placamae": "MSI B550M PRO-VDH WiFi",
    "ram": "16GB (2x8GB) DDR4 3600MHz Kingston Fury",
    "armazenamento": "SSD NVMe M.2 1TB Gen4 Kingston NV2",
    "fonte": "MSI MAG A650BN 650W 80 Plus Bronze",
    "cooler": "DeepCool AG400 ARGB",
    "gabinete": "Montech Air 903 Base Black"
}'),
('gamer-extremo-raytracing', 'gamer', 'Avancado', 'ELITE 1440P QUAD HD', 'Cyber Titan 1440p & 4K Ultra', 'Qualidade Máxima, 1440p Ultra, Ray Tracing Extremo e Streaming', 7950.00, 'Processador com tecnologia 3D V-Cache para 1% low impecável e GPU RTX 4070 Super para máxima fidelidade visual.', '1440p Quad HD & 4K', '{
    "cpu": "AMD Ryzen 7 5700X3D (8C/16T com 96MB 3D V-Cache)",
    "gpu": "NVIDIA GeForce RTX 4070 Super 12GB GDDR6X",
    "placamae": "ASUS TUF Gaming B550M-Plus",
    "ram": "32GB (2x16GB) DDR4 3600MHz Corsair Vengeance",
    "armazenamento": "SSD NVMe M.2 2TB Kingston KC3000 (7000MB/s)",
    "fonte": "Corsair RM750e 750W 80 Plus Gold Modular",
    "cooler": "Water Cooler 240mm MasterLiquid ML240L ARGB",
    "gabinete": "Lian Li Lancool 216 Mesh RGB"
}')
ON CONFLICT (id) DO UPDATE SET preco_total = EXCLUDED.preco_total;

-- Inserir Depoimentos Reais de Exemplo
INSERT INTO depoimentos (nome, profissao_perfil, tipo_computador, comentario, avaliacao) VALUES
('Beatriz Mendes', 'Advogada e Consultora Jurídica', 'PC Escritório', 'Meu computador anterior demorava 5 minutos só para abrir o Windows e vivia travando com processos em PDF. O setup corporativo que montaram abre tudo num piscar de olhos e é inacreditavelmente silencioso no meu escritório.', 5),
('Lucas "Kael" Santana', 'Jogador Competitivo de Valorant & Streamer', 'PC Gamer', 'Saí de 80 FPS sofrendo com quedas bruscas para 280+ FPS cravados. A temperatura não passa de 62°C mesmo jogando o dia inteiro no verão. O cable management na parte traseira ficou uma obra de arte.', 5),
('Rodrigo Prado', 'Arquiteto Autônomo', 'Reforma Completa & Upgrade', 'Eu estava quase gastando 10 mil reais em um PC novo porque o meu não aguentava os renders no Revit e AutoCAD. A equipe fez uma reforma, trocou pasta térmica, fez cable management e trocou apenas CPU e GPU: economizei 60% e o PC ficou voando.', 5)
ON CONFLICT DO NOTHING;

-- Inserir Perguntas e Respostas do FAQ Lateral
INSERT INTO faq (pergunta, resposta, categoria, ordem) VALUES
('Como vocês garantem que as peças são 100% compatíveis?', 'Nosso algoritmo valida fisicamente o soquete da CPU, compatibilidade de geração da placa-mãe (incluindo versão de BIOS), altura máxima do cooler no gabinete, comprimento da placa de vídeo e folga mínima de 25% na potência da fonte (Watts).', 'compatibilidade', 1),
('O que é a Reforma de Computadores e quando vale a pena?', 'A reforma envolve limpeza ultrassônica, desoxidação, substituição de pasta térmica por compostos de alta condutividade térmica, cable management cirúrgico e upgrades estratégicos (como SSD NVMe e mais RAM). Revitaliza PCs antigos gastando uma fração do valor de uma máquina nova.', 'reforma', 2),
('Por que o Cable Management é tão importante?', 'Além do visual limpo digno de showroom, o roteamento correto dos cabos atrás da bandeja da placa-mãe desobstrui o túnel de vento do gabinete. Isso reduz a temperatura interna entre 4°C e 8°C e evita acúmulo prematuro de poeira.', 'montagem', 3),
('Como são feitos os testes de estresse antes da entrega?', 'Submetemos a máquina a 12 a 24 horas contínuas de estresse extremo com Prime95 (CPU), FurMark (GPU) e MemTest86 (RAM), monitorando curvas térmicas, tensões das linhas 12V e 5V e consumo para garantir 0% de instabilidade ou tela azul.', 'qualidade', 4),
('Vocês cobram orçamento ou fazem prévia sem compromisso?', 'A simulação na nossa landing page e a consultoria inicial são 100% gratuitas. Você vê os valores reais das peças transparentemente sem superfaturamento.', 'comercial', 5)
ON CONFLICT DO NOTHING;
