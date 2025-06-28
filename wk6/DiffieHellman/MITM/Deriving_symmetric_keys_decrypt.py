from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import hashlib


def is_pkcs7_padded(message):
    padding = message[-message[-1]:]
    return all(padding[i] == len(padding) for i in range(0, len(padding)))


def decrypt_flag(shared_secret: int, iv: str, ciphertext: str):
    # Derive AES key from shared secret
    sha1 = hashlib.sha1()
    sha1.update(str(shared_secret).encode('ascii'))
    key = sha1.digest()[:16]
    # Decrypt flag
    ciphertext = bytes.fromhex(ciphertext)
    iv = bytes.fromhex(iv)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    plaintext = cipher.decrypt(ciphertext)

    if is_pkcs7_padded(plaintext):
        return unpad(plaintext, 16).decode('ascii')
    else:
        return plaintext.decode('ascii')


shared_secret = 1044541680517900075473735839543912235900597170403771432065087606996217895497883456789326966610314524717580810978697915693220368669766725266391105357630665397768668005951499270342147720056412598282296872382346149894727231889366708733888383317109798146685657236515970239861333694915064180616139408271461064926646901379379923230843979202482023868323324830410308984217254412624518780814063642529375514995681047195610122624232501129553019702339653338784145623585303541
iv = "ab07201ef73b8fd2640d2e65d6056391"
ciphertext = "76ac082460c7c1a870e6d588c01d0b3bf60bb4eafd8d1652ec273e25c5c7f4835a301f68d20a7fb2caf0bc8d3cf38be6"

print(decrypt_flag(shared_secret, iv, ciphertext))
