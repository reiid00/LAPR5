:-consult('bc_sprintB_rede_social').


subrede(N,E,L):-
    N>0,
    findall(Y,ligacao(E,Y,_,_),L2), %encontra ligacoes diretas de E, guarda em L2
    N2 is N-1,
    maplist(subrede(N2),L2,L3), %chama predicado para cada elemento de L2, guarda em L3
    addToList(L2,L3,L4), %concatena L2 e L3
%    list_to_set(L4,L5),
    sort(L4,L5), %remove elementos repetidos
    exclude(empty,L5,L). %remove elementos vazios

subrede(0,_,[]).
