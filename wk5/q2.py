flg = "TPBFI{N3CTFD3_2_TIPGKFXI4GP!}"
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


for offset in range(26):
    print(f"Offset {offset}: ", end=" ")
    for i in flg:
        if i.isalpha():
            print(alphabet[(alphabet.index(i) + offset) % 26], end="")
        else:
            print(i, end="")
    print()

print("The flag is CYKOR{W3LCOM3_2_CRYPTOGR4PY!}, offset = 9")