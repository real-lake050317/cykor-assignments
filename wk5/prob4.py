from tools.kasiski import kasiski

ciphertext = "BCBCCLBSTGIGSRATCXRKEIOBVFSHNCERSRURQKBGDWMMHWSBGPXGKLFJCVGFZTIGVJFONWKODGQEHRPQLURMWKHRCVNSXRKVHRAGEHEPAZBDFGPSKPUWCVJQNWXEMFFOYUCWLCTRHSMPWFYKLRDKLGJSBSNVWXLKESDCGETYPVPTSTGKVOGPJHSRWKWYLVIOXQHFFWCFWFYKCJAKJNTCVJGXSSLVFOPSNCTVCFXSNSPZJOPUZHIYFUWXEPLAOPQLGPYELZDGGJOXBIIONSCKSCAJFCVQVFAOCVKVOETFKSLIESOBUFTKLGNZIGPUSZCPUSXRPRHSMPSMDFGDWNAGEHEPABCBCCLBSTGIGSRAYONCUKOLJKJVOBEFZVCIVGYDNRKWCFZQSLGVBQGPVSBGPXOXBDLGSLGJGKBOZBSQVIODGQEOWMPXCDFGIGDFGJSXCYGFYETRACLQKCXJARHDPCTHOBCSFYYFVFCRWUSXRDFRIDTFAKATFGCRJVDOLKEGEJCSIDYNJCVYKUHRCIICELFNCBIHFFDFGLBSTGIGSRAJTERWISKQCEODGQEOVJGRROPKEFOQGRFMFCERZPQWSCQKFBKJVIOSLKEU"

key_len = kasiski(ciphertext)

text = []

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
        print(char, end='')
        frequency[char] += 1
            
    return frequency
    
for i in range(0, len(ciphertext), key_len):
    text.append(ciphertext[i:i + key_len])

