def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def bezout(a, b):
    old_r, r = a, b
    
    while r != 0:
        quotient = old_r // r
        remainder = old_r - quotient * r
        print(f"{old_r} = {r} * {quotient} + {remainder}")
        old_r, r = r, remainder

    print(f"GCD = {old_r}")

        
        
bezout(252, 198)