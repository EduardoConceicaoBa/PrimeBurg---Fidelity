# Vamos fazer um projeto em Python
# Sistema de Fidelidade + Verificação de Idade 
# A ideia do projeto é que juntemos um programa de fidelidade de uma lanchonete com um sistema de verifcação de idade 

# 1. Aqui ele está em loop de repetição, basicamente o programa só roda se voce for maior de idade.
while True:
    idade_str = input("Digite sua idade: ")

    if idade_str.isdigit():
        idade = int(idade_str)
        break
    else:
        print("Valor inválido! Digite apenas números.")

if idade < 18:
    print("\nVocê é menor de idade. Sistema não permitido.")
    exit()  # encerra o programa

print("\nAcesso liberado. Vamos continuar!\n")


# 2. Sistema de Fidelidade - Lanchonete
nome = input("Digite seu nome: ").strip().capitalize()
plano = input("Digite seu plano (Bronze / Prata / Ouro)?: ").strip().capitalize()

# Essa parte nós vamos validar o plano do usuário
#Validação do plano
while plano not in ["Bronze", "Prata", "Ouro"]:
    print("Plano inválido! Digite Bronze, Prata ou Ouro.")
    plano = input("Qual o plano atual? ").strip().capitalize()

# Aqui vamos validar o gasto mensal do usuário
# valida gasto mensal
while True:
    gasto_str = input("Digite o valor gasto no mês (R$): ").replace(",", ".")
    try:
        gasto = float(gasto_str)
        if gasto >= 0:
            break
        else:
            print("O valor não pode ser negativo.")
    except:
        print("Digite um valor válido (ex: 150.50).")

# Variável que guarda o desconto
desconto = 0

# 3. Regras do plano 
# Bronze
if plano == "Bronze":
    if gasto > 500:
        print(f" ALERTA: O cliente {nome}, Bronze, foi promovido a Prata.")
    elif gasto > 300:
        desconto = 12
    elif gasto > 150:
        desconto = 8
    elif gasto < 50:
        print(f" ALERTA: O cliente {nome}, Bronze, está com engajamento baixo.")

# Prata
elif plano == "Prata":
    if gasto > 1200:
        print(f" ALERTA: O cliente {nome}, Prata, foi promovido a Ouro.")
    elif gasto > 700:
        desconto = 18
    elif gasto > 400:
        desconto = 10
    elif gasto < 150:
        print(f" ALERTA: O cliente {nome}, Prata, corre risco de voltar para Bronze.")

# Ouro
elif plano == "Ouro":
    if gasto > 2500:
        print(f" ALERTA: O cliente {nome}, Ouro, ganhou Combo Vitalício por 1 mês!")
    elif gasto > 1200:
        desconto = 25
    elif gasto > 800:
        desconto = 15
    elif gasto < 300:
        print(f" ALERTA: O cliente {nome}, Ouro, corre risco de voltar para Prata.")

# Mensagem padrão de desconto 
if desconto > 0:
    print(f" O cliente {nome}, plano {plano}, receberá um desconto de {desconto}% no próximo mês.")




