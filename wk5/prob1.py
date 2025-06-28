def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

def bezout(a, b):
    old_r, r = a, b
    old_s, s = 1, 0
    old_t, t = 0, 1
    
    while r != 0:
        quotient = old_r // r
        remainder = old_r - quotient * r
        old_r, r = r, remainder
        old_s, s = s, old_s - quotient * s
        old_t, t = t, old_t - quotient * t

    return old_r, old_s, old_t

def inverse(n, a):
    g, s, t = bezout(n, a)
    if g != 1:
        return -1
    return s % a
        
print(inverse(11, 3))