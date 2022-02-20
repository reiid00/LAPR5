# Relatório

===========================================

## Architecture Background
No desenvolvimento deste projeto foi utilizada uma arquitetura baseada em Onion, sendo uma aplicação de arquitetura mais flexível, sustentável e portátil.

## Problem Background

### System Overview
A Graphs4Social, S.A. é uma startup com sede no Porto (Portugal) cuja missão é fornecer aplicações de manipulação e visualização de grafos de redes sociais. A empresa decidiu recentemente expandir o
sue portfolio de produtos entrando na área de jogos, mas mantendo o foco nos grafos de redes sociais.


### Context
O jogo simula uma rede social e o jogador tem por objetivo expandir a sua rede social, com o objetivo último de ter a maior e mais forte rede social possível. O jogo desenrola-se numa série de missões em que o jogador terá que avançar e aumentar a sua rede para subir no leader board. Um utilizador pode iniciar um jogo/missão em qualquer momento escolhendo o nível de dificuldade pretendido.

### Driving Requirements
Temos abaixo definidos os requisitos funcionais e não funcionais.

#### Functional Requirements
* UC 3: Editar relacionamento com tags e força de ligação.
* UC 5: Editar perfil próprio.
* UC 6: Editar estado de humor.
* UC 7: consultar a rede a partir da sua perspetiva.
* UC 8: Registar utilizador no sistema.
* UC 9: Escolher quais “utilizadores objetivo” (sugeridos pelo sistema) o jogador recém registado gostaria de ter na sua rede.
* UC 10: Pesquisar utilizadores que conheça na rede, e pedir ligação de utilizador.
* UC 11: Pedir introdução a utilizador objetivo.
* UC 12: Aprovar/desaprovar pedido de introdução.
* UC 33: Aceitar ou rejeitar a introdução.
* UC 35: Obter lista de pedidos de ligação pendentes.

#### Quality Attributes
Os atributos de qualidade foram definidos segundo o modelo FURPS+.
##### Funcionalidade

1. Adicionalmente para manter concordância com as práticas de desenvolvimento da empresa, todas as aplicações devem possuir uma organização em camadas separando os componentes de apresentação (interface humano-computador) dos componentes de processamento e acesso a dados recorrendo às boas práticas da indústria.

2. Uma vez que o sistema se encontra virado para o exterior é necessário ter especial atenção com a privacidade e proteção de dados à luz do RGPD. Assim é necessário que o sistema cumpra a legislação em vigor e, em especial, disponibilize as informações legais e informe o utilizador aquando do seu registo, bem como permita aceder e cancelar a sua conta nos casos e nas condições legalmente permitidas.

3. Cada sistema só poderá aceder aos dados que lhe dizem respeito. Além disso e com vista à necessidade de saber e necessidade de conhecer toda a informação deve estar protegida de acessos indevidos. Ou seja, o princípio de minimização de acesso ao que é essencial para cada utilizador/aplicação, criação de túneis para transferência de informação, avaliação da integridade de dados e aplicações, e encriptação/minimização dos dados.


##### Usabilidade
1. O ao site da rede social está disponível para utilizadores registados e cada utilizador tem apenas acesso aos seus dados e da sua rede social. Todos os utilizadores (estejam ou não autenticados) podem consultar a informação de carácter genérico tal como: Leader board, Dimensão da rede (número de utilizadores), Tag cloud das tags de todos os utilizadores, Tag cloud das tags de todas as relações. Para os utilizadores autenticados será ainda possível consultar: Sugestões de amigos, Tamanho da sua rede social (até ao 3º nível), Tag cloud das suas tags de utilizador, Tag cloud das suas tags das relações.

2. Pretende-se um efeito de navegação no espaço em que o grafo representa uma estrutura sólida, podendo a câmara movimentar-se livremente à sua volta. Deve-se considerar os nós e as ligações como obstáculos através dos quais não é possível passar. É importante dar destaque aos nós e às ligações para onde a câmara está apontada, devendo configurar-se as fontes de iluminação mais adequadas para obter esse efeito final.

3. Todas as aplicações devem ter em consideração as perspetivas de internacionalização da empresa e por isso devem suportar localização do software para, pelo menos, Português e Inglês.


##### Confiabilidade (Reliability)
1. Devem existir dois servidores em load balancing, onde estão instaladas as aplicações, serviços e as bases de dados e que se encarregam do armazenamento da informação. Devem também existir dois servidores em failover que distribuem os endereços a todos os sistemas e se encarregam da autenticação de sistemas e utilizadores (DHCP, DNS (se aplicável) e autenticação de servidores, e eventualmente um servidor Kerberos). Deve ser auditada e verificada a integridade da informação a que os sistemas acedem.

##### Desempenho (Performance)
Por definir


##### Suportabilidade
Por definir


##### Design Constraints
1. O sistema deve ser composto por uma aplicação web do tipo Single Page Application (SPA) que permite aos utilizadores autorizados acederem aos diferentes módulos da aplicação, bem como por um conjunto de serviços que implementem as componentes de regras de negócio necessárias para o funcionamento da aplicação web.
A Aplicação é constituída pelos seguintes módulos:

* Master Data Rede social: permite a gestão de informação relacionada com a rede de utilizadores, jogadores, relações e pedidos de ligação.
* Analisador Rede social: com base na interação entre os utilizadores este módulo deve pegar na informação do master data rede social e classificar os utilizadores em leader boards relacionados a força de ligação entre estes.
* Visualizador 3D: permite a visualização do grafo de relações entre utilizadores, indicando a força da ligação e o tipo de relação entre eles.
* UI: interface com o utilizador.
* Clientes + RGPD: gestão de informação do utilizadores finais "clientes" e seus consentimentos no âmbito do RGPD.

##### Implementatio Constraints
Definir depois

##### Interface Constraints
Definir depois

##### Physical Constraints
1. Existem dois servidores em load balancing, onde estão instaladas as aplicações, serviços e as bases de dados e que se encarregam do armazenamento da informação.

2. Existem ainda dois servidores em failover que distribuem os endereços a todos os sistemas e se encarregam da autenticação de sistemas e utilizadores (DHCP, DNS (se aplicável) e autenticação de servidores, e eventualmente um servidor Kerberos).

## Solution Background
Abaixo temos a definição das arquiteturas usadas e uma análise dos resultados obtidos.

#### Architecture Approaches
definir depois

#### Analysis Results
Definir depois

#### Mapping Requirements to Architecture
definir depois
