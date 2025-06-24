import requests

URI = "https://aes.cryptohack.org/block_cipher_starter"

ciphertext = requests.get(f"{URI}/encrypt_flag/").json()["ciphertext"]

plaintext = requests.get(f"{URI}/decrypt/{ciphertext}/").json()["plaintext"]

plaintext = bytes.fromhex(plaintext)
plaintext = plaintext.decode()

print(plaintext)
