:-consult('bc_sprintB_rede_social').

/*
Caminho mais seguro com força limiar determinada pelo utilizador, neste metodo temos 
a determinação do caminho com maior força média no menor número de ligações, sendo 
que devemos ter uma limiar determinada pelo utilizado, não devendo nenhuma das ligações 
entre dois nós ser menor que essa limiar
*/

:-dynamic melhor_sol_strlig2/2.

plan_strlig2(Orig,Dest,L,LCaminho_strlig):-
    	get_time(Ti),
		(melhor_caminho_strlig2(Orig,Dest,L);true),
		retract(melhor_sol_strlig2(LCaminho_strlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

melhor_caminho_strlig2(Orig,Dest,L):-
		asserta(melhor_sol_strlig2(_,-10000)),
		dfs(Orig,Dest,LCaminho),
		atualiza_melhor_strlig2(LCaminho,L),
		fail.

atualiza_melhor_strlig2(LCaminho,L):-
		melhor_sol_strlig2(_,N),
		forca2(LCaminho,L,S,S2),
		length(LCaminho,Q),
		R is S/Q,
		R>N,retract(melhor_sol_strlig2(_,_)),
		asserta(melhor_sol_strlig2(LCaminho,R)).
		
forca2(X,Y,L,S1,S2):-
		no(N,X,_),
		no(M,Y,_),
		ligacao(N,M,S1,S2).

forca2([X,Y],L,S1,S2):-
		forca2(X,Y,L,S1,S2).

forca2([X|Y],L,S1,S2):-
		forca2(Y,L,F,P),
		F>L-1,
		P>L-1,
		list_head(Y,E),
		forca2(X,E,L,Q,N),
		Q>L-1,
		N>L-1,
		S1 is F+Q,
		S2 is P+N.
