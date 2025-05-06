# Projeto Interdisciplinar desenvolvido no 1º semestre de 2023 
# Projeto-Interdisciplinar-2Semestre do curso Desenvolvimento de Software Multiplataforma

Integrantes do grupo:
RA	Nome completo	e-mail
1111392221006	Daniel Viegas Cardamoni	
1111392221043	Eloah Baracho dos Santos	
1111392221007
1111392221015	Felipe Selva Rocha Alves
Leonardo da Silva Lima	

Título do Projeto e/ou logotipo

Objetivo do Projeto
 Descrição da finalidade do projeto, alinhada a especificação. Lembrando que o mesmo tem que ser realista, consistente e claro.

O sistema de reservas de restaurantes possui a finalidade de proporcionar aos clientes de um restaurante maior conforto e organização no momento de suas refeições. Um sistema capaz de reduzir filas, tempo de espera e problemas com quantidades de assentos se faz necessário, uma vez que o antro gastronômico no Brasil tem crescido e se expandido.

Descrição do Projeto
 Detalhes do projeto (storytelling) e da especificação dos requisitos de informação e regras de negócio do domínio do problema (Requisitos Func. e Não Func.)
A necessidade de solucionar o problema da ausência de organização nos restaurantes de grandes metrópoles é urgente, tendo e vista que fatores negativos na experiência e no atendimento desses estabelecimentos definem sua sobrevida e, consequentemente, o seu sucesso.
O problema de	Ausência de organização e disponibilidade (superlotação).
afeta	Clientes.
cujo impacto é	A péssima experiência e atendimento.
uma boa solução seria	Sistema de reservas capaz de organizar clientes por horários, número de assentos e número de mesas.

Requisitos Funcionais  
ID do
Requisito	Nível de
 Prioridade (A / M / B)	
Descrição do Requisito	
Categoria do Requisito
RF01	A	Sistema deve cadastrar cliente.
	 Autenticação
RF02	A	Usuário deve ser identificado pelo login e senha.	 Autenticação
RF03	A	Usuário deve ser capaz de realizar as reservas.	 Controle de usuário

RF04	A	Usuário deve ser capaz de gerenciar suas reservas (editar e excluir).	Controle de usuário

Regras de Negócio  
RN01	 Mesas Especificas podem apresentar Status Disponível ou Indisponível.
RN02	 Para reservar uma mesa, o mínimo de assentos precisará, necessariamente, ser 1.

RN03	Fila de Espera não garantirá acesso a mesas.

RN04	Cancelamentos só estarão disponíveis até dois dias antes da data marcada, a fim de manter a organização e coerência na disponibilidade das mesas. Caso o cliente não compareça, será necessário pagar uma taxa para efetuar uma nova reserva.


RN05	A indisponibilidade de uma mesa possuirá o prazo de 2 (duas) horas. Após esse período, a mesa retornará ao status disponível.


Modelagem Física

Script SQL da criação das Tabelas, Atributos, Chaves primárias e Estrangeiras (DDL)

-- -----------------------------------------------------
-- Schema ReservasOnline
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ReservasOnline` DEFAULT CHARACTER SET utf8 ;
USE `ReservasOnline` ;
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` INT NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `DataAniver` DATE NULL,
  `Genero` VARCHAR(1) NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE INDEX `idCliente_UNIQUE` (`idCliente` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) );
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Resturante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Resturante` (
  `idResturante` INT NOT NULL,
  `Nome` VARCHAR(255) NOT NULL,
  `CNPJ` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idResturante`));
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Unidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Unidade` (
  `idUnidade` INT NOT NULL,
  `Resturante_idResturante` INT NOT NULL,
  `CNPJ` VARCHAR(45) NULL,
  `endereco` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idUnidade`, `Resturante_idResturante`),
  INDEX `fk_Unidade_Resturante_idx` (`Resturante_idResturante` ASC) ,
  CONSTRAINT `fk_Unidade_Resturante`
    FOREIGN KEY (`Resturante_idResturante`)
    REFERENCES `ReservasOnline`.`Resturante` (`idResturante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Ambiente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Ambiente` (
  `idAmbiente` INT NOT NULL,
  `Unidade_idUnidade` INT NOT NULL,
  `nome` VARCHAR(255) NULL,
  PRIMARY KEY (`idAmbiente`, `Unidade_idUnidade`),
  INDEX `fk_Ambiente_Unidade1_idx` (`Unidade_idUnidade` ASC) ,
  CONSTRAINT `fk_Ambiente_Unidade1`
    FOREIGN KEY (`Unidade_idUnidade`)
    REFERENCES `ReservasOnline`.`Unidade` (`idUnidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Mesa` (
  `idMesa` INT NOT NULL,
  `Ambiente_idAmbiente` INT NOT NULL,
  `Assentos` INT NOT NULL,
  PRIMARY KEY (`idMesa`, `Ambiente_idAmbiente`),
  INDEX `fk_Mesa_Ambiente1_idx` (`Ambiente_idAmbiente` ASC) ,
  CONSTRAINT `fk_Mesa_Ambiente1`
    FOREIGN KEY (`Ambiente_idAmbiente`)
    REFERENCES `ReservasOnline`.`Ambiente` (`idAmbiente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Periodo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Periodo` (
  `idPeriodo` INT NOT NULL,
  `PeriodoDATA` DATE NULL,
  `PeriodoHORA` TIME NULL,
  PRIMARY KEY (`idPeriodo`));
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Periodo_has_Mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Periodo_has_Mesa` (
  `Periodo_idPeriodo` INT NOT NULL,
  `Mesa_idMesa` INT NOT NULL,
  `Mesa_Ambiente_idAmbiente` INT NOT NULL,
  `Disponivel` TINYINT NOT NULL,
  PRIMARY KEY (`Periodo_idPeriodo`, `Mesa_idMesa`, `Mesa_Ambiente_idAmbiente`),
  INDEX `fk_Periodo_has_Mesa_Mesa1_idx` (`Mesa_idMesa` ASC, `Mesa_Ambiente_idAmbiente` ASC) ,
  INDEX `fk_Periodo_has_Mesa_Periodo1_idx` (`Periodo_idPeriodo` ASC) ,
  CONSTRAINT `fk_Periodo_has_Mesa_Periodo1`
    FOREIGN KEY (`Periodo_idPeriodo`)
    REFERENCES `ReservasOnline`.`Periodo` (`idPeriodo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Periodo_has_Mesa_Mesa1`
    FOREIGN KEY (`Mesa_idMesa` , `Mesa_Ambiente_idAmbiente`)
    REFERENCES `ReservasOnline`.`Mesa` (`idMesa` , `Ambiente_idAmbiente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
-- -----------------------------------------------------
-- Table `ReservasOnline`.`Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ReservasOnline`.`Reserva` (
  `Cliente_idCliente` INT NOT NULL,
  `Periodo_has_Mesa_Periodo_idPeriodo` INT NOT NULL,
  `Periodo_has_Mesa_Mesa_idMesa` INT NOT NULL,
  `Periodo_has_Mesa_Mesa_Ambiente_idAmbiente` INT NOT NULL,
  PRIMARY KEY (`Cliente_idCliente`, `Periodo_has_Mesa_Periodo_idPeriodo`, `Periodo_has_Mesa_Mesa_idMesa`, `Periodo_has_Mesa_Mesa_Ambiente_idAmbiente`),
  INDEX `fk_Cliente_has_periodo_Cliente1_idx` (`Cliente_idCliente` ASC) ,
  INDEX `fk_Reserva_Periodo_has_Mesa1_idx` (`Periodo_has_Mesa_Periodo_idPeriodo` ASC, `Periodo_has_Mesa_Mesa_idMesa` ASC, `Periodo_has_Mesa_Mesa_Ambiente_idAmbiente` ASC) ,
  CONSTRAINT `fk_Cliente_has_periodo_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `ReservasOnline`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reserva_Periodo_has_Mesa1`
    FOREIGN KEY (`Periodo_has_Mesa_Periodo_idPeriodo` , `Periodo_has_Mesa_Mesa_idMesa` , `Periodo_has_Mesa_Mesa_Ambiente_idAmbiente`)
    REFERENCES `ReservasOnline`.`Periodo_has_Mesa` (`Periodo_idPeriodo` , `Mesa_idMesa` , `Mesa_Ambiente_idAmbiente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
