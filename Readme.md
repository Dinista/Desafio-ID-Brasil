# Desafio ID Brasil

## Objetivo

Este é um desafio **Front-end** promovido pela equipe da **ID brasil** que consiste na concepção de uma aplicação em **React** que tenha uma **listagem de usuários com filtros**, incluindo funcionalidades como **criação**, **edição** e **exclusão de registros**, além de **login/logout de usuários** e **níveis de acesso de usuário** na aplicação.

### Interfaces

<div>
  <img style= "width: 400px; height: 225px;" src="https://raw.githubusercontent.com/Dinista/Desafio-ID-Brasil/main/front-end/src/assets/Screenshot_LoginPage.png" style="width: 550px;" />
  <img style= "width: 400px; height: 225px; " src="https://raw.githubusercontent.com/Dinista/Desafio-ID-Brasil/main/front-end/src/assets/Screenshot_ListPage.png" style="width: 550px;" />
</div>

## Como usar

Primeiramente instale as dependências utilizando package.json com o comando dentro da pasta **./front-end**:

```bash

npm install

```

e para executar utilize:

```bash

npm run dev

```

## Tecnologias

![image](https://raw.githubusercontent.com/Dinista/Desafio-ID-Brasil/main/front-end/src/assets/react.svg) **React** + ![image](https://raw.githubusercontent.com/Dinista/Desafio-ID-Brasil/main/front-end/public/vite.svg) **Vite**

Neste projeto foi utilizado além do **React** o Freamework **Vite**, que possibilita desenvolver uma aplicação de forma mais ágil e direta, com suporte a Hot Module Replacement (HMR), construção otimizada e uma configuração mínima.

As validações foram feitas sem utilizar biblioteca, com **feedBack de erros** ao usuário tanto nos **Forms** como nas requisições a **Api**. O armazenamento de **Login** é feito no **LocalStorage**, além da verificação de permissão como **Admin** liberando acesso a criação, adição e exclusão.

### Bibliotecas

As bibliotecas utilizadas foram:

<ul>
    <li>Fontawesome (Icones);</li>
    <li>React-Router-Dom (Rotas);</li>
</ul>
