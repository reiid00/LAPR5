:-ensure_loaded("./bc_sprintB_rede_social.pl").
:-ensure_loaded("./subrede.pl").
:-dynamic melhor_sol_strlig/2.

% ESTE METODO NAO E GD COISA. A LIGACAO 21-33 PARECE MELHOR (BEST FIRST) MAS ACABA NUM CAMINHO COM MENOS PESO ENTAO
% A SOLUCAO ACABA SEMPRE POR SER ERRADA

plan_strlig(Orig,Dest,L,C,Max):-
    	get_time(Ti),
		(melhor_caminho_strlig(Orig,Dest,L,C,Max);true),
		retract(melhor_sol_strlig(L,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_strlig(Orig,Dest,L,C,Max):-
		asserta(melhor_sol_strlig(_,-10000)),
		bestfs1(Orig,Dest,L,C,Max),
		atualiza_melhor_strlig(L,C),
		fail.

atualiza_melhor_strlig(LCaminho,Custo):-
		melhor_sol_strlig(_,N),
		Custo>N,retract(melhor_sol_strlig(_,_)),
		asserta(melhor_sol_strlig(LCaminho,Custo)).

bestfs(Orig,Dest,Cam,Custo,Max):-
        bestfs2(Dest,(0,[Orig]),Cam,Custo,Max).

bestfs2(Dest,(Custo,[Dest|T]),Cam,Custo,_):-
        !,
        reverse([Dest|T],Cam).

bestfs2(Dest,(Ca,LA),Cam,Custo,Max):-
        LA=[Act|_],

        length(LA,N),
	write('Length='),write(N),nl,

	N=<Max,

        findall((EstX,CaX,[X|LA]),
        ((ligacao(Act,X,CX,_)),
        \+member(X,LA),estimativa(X,Dest,EstX,Max-N),
        CaX is Ca+CX),Novos),
        write('Novos='),write(Novos),nl,
        sort(Novos,NovosOrd),
        reverse(NovosOrd,NovosRev),
        NovosRev = [(_,CM,Melhor)|_],
        write('NovosOrd='),write(NovosRev),nl,
        bestfs2(Dest,(CM,Melhor),Cam,Custo,Max).

bestfs1(Orig,Dest,Cam,Custo,Max):- bestfs12(Dest,[[Orig]],Cam,Custo,Max),
        write('Caminho='),write(Cam),nl.

bestfs12(Dest,[[Dest|T]|_],Cam,Custo,_):- reverse([Dest|T],Cam), calcula_custo(Cam,Custo).
bestfs12(Dest,[[Dest|_]|LLA2],Cam,Custo,Max):- !, bestfs12(Dest,LLA2,Cam,Custo,Max).
bestfs12(Dest,LLA,Cam,Custo,Max):- member1(LA,LLA,LLA1), LA=[Act|_],
        ((Act==Dest,!,bestfs12(Dest,[LA|LLA1],Cam,Custo))
        ;
        length(LA,N),
	write('Length='),write(N),nl,

	N=<Max,
        ( findall((CX,[X|LA]),(ligacao(Act,X,CX,_), \+member(X,LA)),Novos),
        Novos\==[],!,
        sort(0,@>=,Novos,NovosOrd),
        retira_custos(NovosOrd,NovosOrd1),
        append(NovosOrd1,LLA1,LLA2),
        %write('LLA2='),write(LLA2),nl,
        bestfs12(Dest,LLA2,Cam,Custo,Max) )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C):-!,ligacao(Act,X,C,_). 
calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1), ligacao(Act,X,C,_),S is S1+C.

%estimativa(_,_,0,_).

estimativa(_,_,-9999,N):-
		N=<0.
estimativa(N,N,0,_).

estimativa(Nodo1,Nodo2,Estimativa,Max):-
		\+ Max <0,
		subrede(Max,Nodo1,L),!,
		find_node_level(L,Nodo2,N),!,
		calcular_est(N,Estimativa).

calcular_est(N,E):-
		find_max_str(S),
		E is N*S.

find_max_str(N):-
		ligacao(_,_,N,_),
		\+ (ligacao(_,_,N1,_), N1 > N).

find_node_level(L,E,1):-
	parse_rede(L,H,_),
	member(E,H).

find_node_level(L,E,N):-
	parse_rede(L,_,T),
	find_node_level(T,E,N2),
	N is N2+1.


parse_rede([H],[H],[]).

parse_rede([H|_],[],H):-
	is_list(H).

parse_rede([H|L],[H|L1],L2):-
	parse_rede(L,L1,L2).