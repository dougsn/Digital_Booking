# Certified Tech Developer - Projeto Integrador

## Projeto DH Booking System

### Introdução
O projeto foi realizado dentro de 4 sprints, cada uma com 15 dias de duração. A equipe de 8 componentes foi divida em 4 equipes:

- Douglas e Thiago - Backend e DB
- Matheus e Guilherme - Infraestrutura
- Matheus, Mateus e Lucas - Frontend
- Victor e Marcelo - Testes Manuais e Automatizados

O sistema é um "clone" de plataformas conhecidas como 123 milhas, airbnb e outros, só que mais simplificado.

Sabemos que o sistema para ser minimamente utilizado como um produto real deveria conter:

- Multiplos agendamentos para um mesmo dia de produto
- Quantidade de quartos
- Tipos de quartos
- Painel administrativo mais completo
- Entre outros itens

Mas como foi um projeto com tempo e recursos limitados, entregamos o máximo com as informações liberadas.

### Sobre o sistema
- O sistema permite busca de hospedagens por local, data, data e local ou somente por categoria caso nenhum campo tenha sido preenchido.
- Possui sistema de classificação da hospedagem quando for a data do checkout ou posterior
- Possui sistema de favoritar hospedagens da plataforma e visualizá-los
- Permite cadastro de usuários pela própria plataforma ou utilizando o login do google.
- A reserva de uma data só ocorre após o login do usuário.
- Não permite reservas em datas que já estejam bloqueadas
- Administrador pode realizar cadastro de novos produtos

### Sobre a infraestrutura
Dentro de nossa CI que foi feita para rodar no Gitlab, preparamos para os dois ambientes de maneira simples realizar basicamente os seguintes passos: Build, Compile, Test e Deploy (sendo usado somente pelo frontend em DEV)

Os testes automatizados rodam dentro da CI, validando cada ponto desenvolvido, e em caso de erro, é gerado provas visuais (videos e fotos) dos erros que ocorreram.

Dentro da AWS possuimos dois ambientes: dev e produção.

- Link do diagrama para DEV: https://drive.google.com/file/d/1FEFLlSy08UpU4z1b1WEDshK0Uougte_U/view?usp=sharing
- Link do diagrama para PROD: https://drive.google.com/file/d/1B_WyHqHFF8G8w5AlQ68RupmlrfSjkWzG/view

Dentro do nosso ambiente de produção, utilizamos o autoscalling para favorecer picos de demandas e em conjunto o watchtower para facilitar a atualização das instancias docker do front e back quando houver imagens novas.

### Sobre o back-end
- O back-end foi estruturado e construído com SpringBoot, para a construção das API's fornecidas para o front-end, e também com SpringSecurity para a autenticação do usuário com token JWT e autorização para determinadas rotas, a API foi documentado com Swagger: http://api.digitalbooking.projetos.app.br/swagger-ui/index.html

### Sobre o banco de dados
- Foi utilizado o banco de dados RDS da amazon para guardar e manipularmos os dados da nossa aplicação, diagrama UML: https://lucid.app/lucidchart/cf67ee59-b7bb-47f5-b621-c768c1b491ca/edit?invitationId=inv_0d19fc7e-66a0-44f4-8c19-acccc7b42da7&page=0_0#

### Sobre o banco de dados
- Infraestrutura montada na AWS com autoscalling para o Front-end e Back-end, Diagrama da infra(https://drive.google.com/file/d/1B_WyHqHFF8G8w5AlQ68RupmlrfSjkWzG/view)

### Sobre o banco de dados
- Testes manuais e automatizados com CYPRESS e Postman, foram integrados em nossa CI do GitLab: https://gitlab.ctd.academy/ctd/brasil/projeto-integrador-1/0223/turma-6/grupo-7/-/tree/main

