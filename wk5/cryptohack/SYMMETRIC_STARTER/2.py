import hashlib, requests, string
from tqdm import tqdm
from Crypto.Cipher import AES

URI = "https://aes.cryptohack.org/passwords_as_keys/"
WORDS_URL = "https://gist.githubusercontent.com/wchargin/8927565/raw/d9783627c731268fb2935a731a618aa8e95cf465/words"

words = requests.get(WORDS_URL).text.splitlines()

# ciphertext = requests.get(f"https://aes.cryptohack.org/passwords_as_keys/encrypt_flag/").json()["ciphertext"]
# print(ciphertext)
ciphertext = bytes.fromhex("c92b7734070205bdf6c0087a751466ec13ae15e6f1bcdd3f3a535ec0f4bbae66")

def is_candidate(bs):
    for i in bs:
        if i < 32 or i > 126:
            return False
    return True

for word in tqdm(words, total=len(words)):
    key_hex = hashlib.md5(word.encode()).hexdigest()
    key = bytes.fromhex(key_hex)
    cipher = AES.new(key, AES.MODE_ECB)
    
    try:
        decrypted = cipher.decrypt(ciphertext)
    except ValueError as e:
        break
    
    if is_candidate(decrypted):
        print(f"Candidate found. keyword: {word}, key: {key_hex}, plaintext: {decrypted.decode()}")
        print(decrypted)
        break
