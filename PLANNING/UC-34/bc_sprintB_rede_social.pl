% Base de Conhecimento

user(1,ana,[natureza,pintura,musica,sw,porto]).
user(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
user(12,beatriz,[natureza,musica,carros,porto,moda]).
user(13,carlos,[natureza,musica,sw,futebol,coimbra]).
user(14,daniel,[natureza,cinema,jogos,sw,moda]).
user(21,eduardo,[natureza,cinema,teatro,carros,coimbra]).
user(22,isabel,[natureza,musica,porto,lisboa,cinema]).
user(23,jose,[natureza,pintura,sw,musica,carros,lisboa]).
user(24,luisa,[natureza,cinema,jogos,moda,porto]).
user(31,maria,[natureza,pintura,musica,moda,porto]).
user(32,anabela,[natureza,cinema,musica,tecuserlogia,porto]).
user(33,andre,[natureza,carros,futebol,coimbra]).
user(34,catia,[natureza,musica,cinema,lisboa,moda]).
user(41,cesar,[natureza,teatro,tecuserlogia,futebol,porto]).
user(42,diogo,[natureza,futebol,sw,jogos,porto]).
user(43,ernesto,[natureza,teatro,carros,porto]).
user(44,isaura,[natureza,moda,tecuserlogia,cinema]).
user(200,sara,[natureza,moda,musica,sw,coimbra]).
user(51,rodolfo,[natureza,musica,sw]).
user(61,rita,[moda,tecuserlogia,cinema]).


ligacao(1,11,10,8).
ligacao(1,12,2,6).
ligacao(1,13,-3,-2).
ligacao(1,14,1,-5).
ligacao(11,21,5,7).
ligacao(11,22,2,-4).
ligacao(11,23,-2,8).
ligacao(11,24,6,0).
ligacao(12,21,4,9).
ligacao(12,22,-3,-8).
ligacao(12,23,2,4).
ligacao(12,24,-2,4).
ligacao(13,21,3,2).
ligacao(13,22,0,-3).
ligacao(13,23,5,9).
ligacao(13,24,-2, 4).
ligacao(14,21,2,6).
ligacao(14,22,6,-3).
ligacao(14,23,7,0).
ligacao(14,24,2,2).
ligacao(21,31,2,1).
ligacao(21,32,-2,3).
ligacao(21,33,3,5).
ligacao(21,34,4,2).
ligacao(22,31,5,-4).
ligacao(22,32,-1,6).
ligacao(22,33,2,1).
ligacao(22,34,2,3).
ligacao(23,31,4,-3).
ligacao(23,32,3,5).
ligacao(23,33,4,1).
ligacao(23,34,-2,-3).
ligacao(24,31,1,-5).
ligacao(24,32,1,0).
ligacao(24,33,3,-1).
ligacao(24,34,-1,5).
ligacao(31,41,2,4).
ligacao(31,42,6,3).
ligacao(31,43,2,1).
ligacao(31,44,2,1).
ligacao(32,41,2,3).
ligacao(32,42,-1,0).
ligacao(32,43,0,1).
ligacao(32,44,1,2).
ligacao(33,41,4,-1).
ligacao(33,42,-1,3).
ligacao(33,43,7,2).
ligacao(33,44,5,-3).
ligacao(34,41,3,2).
ligacao(34,42,1,-1).
ligacao(34,43,2,4).
ligacao(34,44,1,-2).
ligacao(41,200,2,0).
ligacao(42,200,7,-2).
ligacao(43,200,-2,4).
ligacao(44,200,-1,-3).

ligacao(1,51,6,2).
ligacao(51,61,7,3).
ligacao(61,200,2,4).


