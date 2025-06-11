from tools.kasiski import kasiski

ciphertext = "BCBCC LBSTGIGSRA TCXRKEIOB VF SHNCER SRU RQKBGDWMMHWSBGPXGKLFJCVGFZTIGVJFONWKODGQEHRPQLURMWKHRCVNSXRKVHRAGEHEPAZBDFGPSKPUWCVJQNWXEMFFOYUCWLCTRHSMPWFYKLRDKLGJSBSNVWXLKESDCGETYPVPTSTGKVOGPJHSRWKWYLVIOXQHFFWCFWFYKCJAKJNTCVJGXSSLVFOPSNCTVCFXSNSPZJOPUZHIYFUWXEPLAOPQLGPYELZDGGJOXBIIONSCKSCAJFCVQVFAOCVKVOETFKSLIESOBUFTKLGNZIGPUSZCPUSXRPRHSMPSMDFGDWNAGEHEPABCBCCLBSTGIGSRAYONCUKOLJKJVOBEFZVCIVGYDNRKWCFZQSLGVBQGPVSBGPXOXBDLGSLGJGKBOZBSQVIODGQEOWMPXCDFGIGDFGJSXCYGFYETRACLQKCXJARHDPCTHOBCSFYYFVFCRWUSXRDFRIDTFAKATFGCRJVDOLKEGEJCSIDYNJCVYKUHRCIICELFNCBIHFFDFGLBSTGIGSRAJTERWISKQCEODGQEOVJGRROPKEFOQGRFMFCERZPQWSCQKFBKJVIOSLKEU"

key_len = kasiski(ciphertext)

text = []
key = "ROKYC"

def initialise_frequency():
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    frequency = {char: 0 for char in alphabet}

    return frequency


def count_frequency(text, line=0):
    if line >= key_len or line < 0:
        raise ValueError("Line index out of range")

    frequency = initialise_frequency()
    for block in text:
        if line >= len(block):
            continue
        char = block[line]
        frequency[char] += 1

    return frequency


def return_most_frequent_char(frequency):
    max_freq = 0
    most_frequent_char = ""

    for char, freq in frequency.items():
        if freq > max_freq:
            max_freq = freq
            most_frequent_char = char

    return most_frequent_char


def calculate_expected_offset(most_frequent_char, expected_char="E"):
    return (ord(most_frequent_char) - ord(expected_char)) % 26


def calculate_expected_key(most_frequent_char, offset):
    return chr(ord("A") + offset)

def decrypt(ciphertext, key):
    decrypted_msg = ""
    key_index = 0
    for i in range(len(ciphertext)):
        if ciphertext[i] == " ":
            decrypted_msg += " "
            continue
        offset = ord(key[key_index % len(key)]) - ord("A")
        decrypted_char = chr((ord(ciphertext[i]) - ord("A") - offset) % 26 + ord("A"))
        decrypted_msg += decrypted_char
        key_index += 1
        
    return decrypted_msg

if __name__ == "__main__":
    for i in range(0, len(ciphertext), key_len):
        text.append(ciphertext[i : i + key_len])

    print(decrypt(ciphertext, key))

# print(
#     calculate_expected_key(
#         return_most_frequent_char(count_frequency(text, 0)),
#         calculate_expected_offset(return_most_frequent_char(count_frequency(text, 0)), "N"),
#     )
# )
# print(
#     calculate_expected_key(
#         return_most_frequent_char(count_frequency(text, 1)),
#         calculate_expected_offset(return_most_frequent_char(count_frequency(text, 1))),
#     )
# )
# print(
#     calculate_expected_key(
#         return_most_frequent_char(count_frequency(text, 2)),
#         calculate_expected_offset(return_most_frequent_char(count_frequency(text, 2)), "I"),
#     )
# )
# print(
#     calculate_expected_key(
#         return_most_frequent_char(count_frequency(text, 3)),
#         calculate_expected_offset(return_most_frequent_char(count_frequency(text, 3))),
#     )
# )
# print(
#     calculate_expected_key(
#         return_most_frequent_char(count_frequency(text, 4)),
#         calculate_expected_offset(return_most_frequent_char(count_frequency(text, 4))),
#     )
# )

