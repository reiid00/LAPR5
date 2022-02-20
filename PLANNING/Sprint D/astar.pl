:-ensure_loaded("./bc_sprintB_rede_social.pl").
:-ensure_loaded("./subrede.pl").

:-dynamic melhor_sol_strlig/2.

aStar(Orig,Dest,Cam,Custo,Max):-
		get_time(Ti),
		aStar2(Dest,[(_,0,[Orig])],Cam,Custo,Max-1),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.
		%write('Caminho='),write(Cam),nl,
		%write('Custo='),write(Custo),nl.

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
		reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Max):-
		LA=[Act|_],

		length(LA,N),
		write('Length='),write(N),nl,

		N=<Max,

		users_angustiados(A),

		findall((CEX,CaX,[X|LA]),
		(Dest\==Act,ligacao(Act,X,CustoX,_),\+ member(X,LA), \+ member(X,A),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX,Max-N),
		CEX is CaX +EstX),Novos),
		append(Outros,Novos,Todos),
		write('Novos='),write(Novos),nl,
		sort(Todos,TodosOrd),
		reverse(TodosOrd,TodosRev),
		write('TodosOrd='),write(TodosRev),nl,
		aStar2(Dest,TodosRev,Cam,Custo,Max).

users_angustiados(L):-
		findall(User,(no(User,_,_),emocoes(User,_,N), N > 0.5),L).

estimativa(_,_,0,_). %nao sei para q eq isto serve mas se eu tirar deixa de funcionar por isso...... :)

estimativa(_,_,-9999,N):-
		N=<0.

estimativa(Nodo1,Nodo2,Estimativa,Max):-
		\+ Max <0,
		subrede(Max,Nodo1,L),!, %DEFINE A SUBREDE DO NO ATUAL
		find_node_level(L,Nodo2,N),!, %ENCONTRA EM QUE NIVEL ESTA O NO DESTINO, DENTRO DA SUBREDE
		calcular_est(N,Estimativa). %MULTIPLICA A DISTANCIA PELA FORCA MAXIMA

calcular_est(N,E):-
		find_max_str(FL),
		find_max_fr(FR),			%	A FUNCAO MULTICRITERIO TEM MUITO IMPACTO NA PERFORMANCE, PRINCIPALMENTE QUANDO AS FORCAS DE LIGACAO
		%multicriterio(FL,FR,R),		%	TEM VALORES MUITO DIFERENTES/ VALORES MUITO ALTOS. NESTE MOMENTO A MAIOR FORCA DE RELACAO EQUIVALE 
		%E is N*R.					%	A 15% ENTAO O IMPACTO E MINIMO (A MAIOR FORCA DE LIGACAO EQUIVALE A 10% ENTAO A FUNCAO MULTICRITEIRO
		E is N*FL.					%	DEVOLVE 12.5)

multicriterio(FL,FR,R):-
		FLR is FL/100,
		FR2 is FR+200,
		FRR is FR2/400,
		S is FLR+FRR,
		P is S/2,
		R is P*100.

find_max_fr(FR):-
		relacao(_,_,FR),
		\+ (relacao(_,_,FR1), FR1>FR).

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