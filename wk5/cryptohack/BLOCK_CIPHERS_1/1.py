import requests

BASE = "https://aes.cryptohack.org/ecbcbcwtf/"

def ecb_decrypt(block):
    j = requests.get(f"{BASE}decrypt/{block.hex()}/").json()
    return bytes.fromhex(j["plaintext"])

def xor(a, b):
    res = b""
    for i, j in zip(a, b):
        res += bytes([i ^ j])
        
    return res

ciphertext = bytes.fromhex(requests.get(f"{BASE}encrypt_flag/").json()["ciphertext"])
# print(ciphertext)
# print(len(ciphertext))

iv = ciphertext[:16]
blocks = [ciphertext[16:32], ciphertext[32:48]]

prev = iv
flag = b""

for i in blocks:
    m = xor(ecb_decrypt(i), prev)
    flag += m
    prev = i

print(flag) 