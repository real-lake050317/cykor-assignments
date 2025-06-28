e = 65537
p = 17
q = 23
plaintext = 12

N = p * q

ciphertext = (plaintext ** e) % N
print(ciphertext)