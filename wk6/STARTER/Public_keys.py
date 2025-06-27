e = 65537
p = 17
q = 23
plaintext = 12

def find_d(e, p, q):
    phi = (p-1) * (q-1)
    for d in range(1, phi):
        if (e * d) % phi == 1:
            return d
        
d = find_d(e, p, q)

N = p * q

ciphertext = (plaintext ** e) % N
print(ciphertext)