:-ensure_loaded("./bc_sprintB_rede_social.pl").

max_valor(N):-
        N is 200.        % e preciso implementar uma forma de procurar o maior valor de likes-dislikes. hardcoded 200 para agora

nova_alegria(N,V,T1):-
        emocoes(N,T,_),
        CT is 1-T,
        max_valor(MaxV),
        Min is min(V,MaxV),  % min(Valor,Valor_Sat)
        Vt is Min/MaxV,
        Mul is CT*Vt,
        T1 is T+Mul.

nova_angustia(N,V,T1):-
        emocoes(N,_,T),
        max_valor(MaxV),
        Min is min(V,MaxV),
        Vt is Min/MaxV,
        CVt is 1-Vt,
        T1 is T*CVt.

        




