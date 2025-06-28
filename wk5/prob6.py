from Crypto.Util.number import long_to_bytes, isPrime
import math
from tqdm import tqdm

N = 0x4b30d2db45867f9da191a3d177ac7d19fdddebd1bda6ef0d613d798fc8809b2635e043b1b7f03aa3c3b41ad2a4410c32b25590682fa685bcbeb98a7d770960789733b8975279261a707e5d42a0e6d8f26916ff8905bd3740c39799146bbc94532ce921a30577015a8e71254dfd7b8e8693a2779e1fe9c14fde6634eefd98f6e75a2b2f0cc18944483f7ec6bfd63d077db1e8ecbb67812938784582402c8c6c86ccf2be22013ecf846ccd803199a8e606d05ab35eb3a079f15b6185c1d3c288f679
print("[Chill Up ... ]")
p = int(input("  Enter p: "))
q = (p-1)//2
r = N//p//q


assert N % (p*q) == 0
assert isPrime(p) and isPrime(q) and isPrime(r)


print("flag:", long_to_bytes(r).decode())

