create database pdv;

create table usuarios(
  id serial primary key,
  nome varchar(275) not null,
  email varchar(275) unique not null,
  senha varchar (275) not null
);
  
create table categorias(
    id serial primary key,
    descricao text not null
);
  
insert into categorias(descricao)
values
  ('Informática'), ('Celulares'),('Beleza e Perfumaria'), ('Mercado'), ('Livros e Papelaria'), 
  ('Brinquedos'), ('Moda'), ('Bebê'), ('Games');  

create table clientes (
  id serial primary key,
  nome varchar(275) not null, 
  email varchar(275) unique not null,
  cpf varchar(14) unique not null,
  cep varchar(9),
  rua varchar(275),
  numero varchar(20),
  bairro varchar(275),
  cidade text,
  estado varchar(2)
);

create table produtos (
  id serial primary key,
  descricao varchar(275) not null, 
  quantidade_estoque int not null,
  valor int not null,
  categoria_id int references categorias(id) not null
);

create table pedidos (
  id serial primary key,
  cliente_id int references clientes(id) not null,
  observacao varchar(275),
  valor_total int not null
);
  
create table pedido_produtos (
  id serial primary key,
  pedido_id int references pedidos(id) not null,
  produto_id int references produtos(id) not null,
  quantidade_produto int not null,
  valor_produto int not null
);

alter table produtos add column produto_imagem text;
