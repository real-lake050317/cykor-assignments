p = 28151

for i in range(2, p):
    k = 1
    x = i % p

    while x != 1:
        x = (x * i) % p
        k += 1
        
    if k == p - 1:
        print(i)
        break
