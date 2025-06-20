from Crypto.Cipher import AES
from Crypto.Util.number import bytes_to_long
from os import urandom

key, iv = urandom(16), urandom(16)

crack = "00000000000000000000000000000000004920444f4e542048415645204120564d20544f2052554e20544849532e2e2e"

def enc(msg):
    padding_len = (-len(msg)) % 16
    print(f"Padding length: {padding_len}, Message length: {len(msg)}, msg: {list(msg)}, added padding: {list(bytes([padding_len] * padding_len))}")
    msg += bytes([padding_len] * padding_len)
    print(f"Message after padding: {list(msg)}")
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return cipher.encrypt(msg)

def dec(msg):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    pt = cipher.decrypt(msg)
    print(f"Decrypted message: {list(pt)}, padding length: {pt[-1]}")
    return pt[:-pt[-1]]

def zerosum(msg):
    return bytes_to_long(msg) - bytes_to_long(dec(enc(msg)))

print("[Zero Sum Checker]")

ans = input("INPUT: ")
print(f"Btl: {bytes_to_long(b"I DONT HAVE A VM TO RUN THIS...")}") # 129202533240186286462732125273400048806685490057755497850365772060813045294
print(f"goal bytes: {list(b"I DONT HAVE A VM TO RUN THIS...")}") # [73, 32, 68, 79, 78, 84, 32, 72, 65, 86, 69, 32, 65, 32, 86, 77, 32, 84, 79, 32, 82, 85, 78, 32, 84, 72, 73, 83, 46, 46, 46]

print(f"zerosum: {zerosum(bytes.fromhex(ans))}")
print(f"code binary: {bin(bytes_to_long(b"I DONT HAVE A VM TO RUN THIS..."))}")
print(f"Binary zerosum: {bin(zerosum(bytes.fromhex(ans)))}")
print(f"input bin: {bin(bytes_to_long(bytes.fromhex(ans)))}")
print(f"input long: {bytes_to_long(bytes.fromhex(ans))}")

print(f"{zerosum(bytes.fromhex(ans)) == bytes_to_long(b'I DONT HAVE A VM TO RUN THIS...')}")
# if (zerosum(bytes.fromhex(ans)) == bytes_to_long(b"I DONT HAVE A VM TO RUN THIS...")):
#     print(f"zerosum: {zerosum(bytes.fromhex(ans))}")
#     print("Correct!")
# else:
#     print(f"zerosum: {zerosum(bytes.fromhex(ans))}")
#     print("Try Again...")


# data = bytes_to_long(b"I DONT HAVE A VM TO RUN THIS...")

# print("Ciphertext:", enc(b"I DONT HAVE A VM TO RUN THIS...").hex())
# print(-len("I DONT HAVE A VM TO RUN THIS...") % 16)
# print("Ciphertext (bin):", bin(int(enc(b"I DONT HAVE A VM TO RUN THIS...").hex(), 16)))
# print("Decoded:", dec(enc(b"I DONT HAVE A VM TO RUN THIS...")).decode())
