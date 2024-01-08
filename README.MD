# Food_Explorer - API 🍽️🍽️

- Link deploy: https://jmourafoodexplorer.netlify.app/

- ***API from complete project of a fictitious restaurant, from creating/visualizing the dishes to choosing the payment method and finalizing purchases. Ordinary users can view and add the desired amount of dishes and finalize the order, being able to follow the status of the order while waiting. Administrators can add, edit or delete a dish whenever they want, uploading the image of the dish and its characteristics, in addition to having control of orders and being able to make changes to the status to keep updating the customer. Both have a favorites list, being able to add or remove a dish from that list at any time.***


- Search filter by dish name and ingredients to facilitate search

- Ingredients connected with dishes for easy view;

- User JWT Token to authentication at login;

- Upload of images dishes;

- List of favorites to users and admin select your favorites dishes;

- users viewed the list of dish orders and their status, which can be updated by the administrator at any time;

## Code Versioning

- **GIT**
- **GITHUB**


## Tech used

****Backend:**** **Nodejs, Express, API RESTfull** - *Knex*, *Database relational*, *Sqlite*, *Routes*, *Cors*, *JWT Token*, *Multer - upload of images*, *Jest*;


# Endpoints

- Users - create(para cadastrar o usuário passando seu email e senha, verificando se já existe), Update(para atualizar os dados do usuário), UpdateIsAdmin(para atualizar o status da coluna isAdmin, que define se é admin ou não. Endpoint atualiza apenas o usuário logado. Para atualizar basta passar um JSON com a coluna "isAdmin": true ou false, de acordo com o desejado);

- Sessions - Create(Faz o login do usuário por meio do email e senha de um usuário existente no banco do dados, pegando os dados do corpo da requisição(com seus dados e com o token de autenticação));

- Dishes - Create(cria um novo prato com os dados[name, avatar_dish, description, price, category] desejados e os ingredientes), Show(Mostra os dados de um prato específico e seus ingredientes com base no ID enviado pelo parâmetro), Index(Mostra uma lista com todos os pratos cadastrados, seus dados e os ingredientes), Delete(Deleta um prato específico com base no ID enviado pelo parâmetro), Update(Atualiza um prato, pegando somente os campos que estão diferentes dos dados antigos e faz essa atualização por meio do ID enviado pelo parâmetro);

- Requests - Create(cria um novo pedido, pegando a data atualizada de acordo com o horário de SP, o user_id para saber quem foi o usuário que criou e seu ID único), Show(Mostra um único pedido com seus dados e os dados de todos os itens que pertencem a esse pedido, de acordo com o user_id enviado pelo usuário logado para filtrar apenas os pedidos que pertencem a ele), Index(Mostra todos os pedidos seus dados e os dados dos itens que pertencem a esse pedido, útil para o Admin ter o controle dos pedidos), Delete(Deleta um pedido específico e todos os itens que pertencem a ele, filtro feito por meio do ID enviado pelo parâmetro da requisição), Update(Atualiza o estado de um pedido feito, serve para o controle se o pedido já foi entregue, está sendo preparado ou pendente. Filtro feito por meio do ID do pedido, enviado pelo corpo da requisição);

- ItemsRequests - Create(cria uma lista com todos os itens, quantidade, valor e seus dados e cadastra junto com o pedido por meio da cardinalidade usando o request_id como parâmetro para especificar a qual pedido os itens pertencem), Update(Atualiza os itens do pedido, podendo mudar sua quantidade, filtro feito por meio do ID do item enviado pelo parâmetro da requisição). Delete(Remove um item específico da lista de itens do pedido, filtro feito por meio do ID do item enviado por meio do parâmetro da requisição);

- Category - Create(Cria uma nova categoria para conter a lista de pratos que pertencem a essa categoria. É necessário criar as tabelas: Refeição, Bebidas e Sobremesas, nessa ordem para depois cadastrar os pratos em uma dessas categorias e para o bom funcionamento da aplicação), Delete(Deleta uma categoria específica de acordo com o ID passado por meio do parâmetro.); Obs: Deletar uma categoria pode acarretar em problemas na aplicação;

- Files - Serve para armazenar um arquivo de imagem antes de ser atualizado em um prato, a criação ou atualização de imagem do prato deve passar por esse arquivo, pois o express está usando um método específico para ele, o static();

- Favorites - Create(Adiciona um prato e seus dados a uma lista de favoritos por meio do dish_id ou ID do prato para especificar o prato adicionado), Index(Mostra a lista dos pratos favoritos e seus dados por meio do ID do usuário, para filtrar apenas os favoritos do usuário autênticado/logado), Delete(Remove um prato e seus dados da lista de favoriros, filtrando por meio do ID do prato para remover apenas o prato especificado da lista).


# important
To install the project's dependencies and start it running, run the "npm i" or "yarn i" command in the terminal. It is important to run this command to ensure that all required dependencies are installed correctly.

To initialize the database tables, run the "npm run migrate" command.

To make requests in insomnia it is necessary to use the following address in the parameters, http://localhost:3333/"table name" which can be [users, sessions, dishes, requests, items_requests, category, files, favorites] according to the table that will be modified.
