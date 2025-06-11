# 두 정수 a,b가 들어왔을 떄 최대공약수를 알려주는 코드이다. 
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

# list의 형태로 여러 입력이 들어올 경우 최대공약수를 알려주는 코드이다. 
# 앞에서부터 순차적으로 list의 형태로 gcd를 취하고 최종적인 값을 return해준다. 
def gcd_list(numbers):
    if not numbers:
        return None
    result = numbers[0]
    for number in numbers[1:]:
        result = gcd(result, number)
    return result

# kasiski test에서는 반복되는 index의 차이에 대한 gcd가 필요하다.
# 따라서 순차적으로 index마다 빼주고 gcd_list()를 통해 index 차이를 return해주는 함수를 짰다. 
def difference_gcd(index_list):
    if len(index_list) < 2:
        return None
    diff = []
    for i in range(len(index_list)-1):
        k = index_list[i+1]-index_list[i]
        if k not in diff:
            diff.append(k)
    return gcd_list(diff)

# kasiski test를 수행하고 결과를 출력하는 함수이다. 
# 앞에서부터 순차적으로 3개씩의 문자열 단위로, 중복되는 입력의 index를 리스트에 담는다.
# 이 index의 크기가 3 이상일 경우, difference_gcd(index_list)로 kasiski test를 수행한다. 
def kasiski(ciphertext):
    l = len(ciphertext)
    if l < 3 : return None 
    total = [] 
    #kasiski test의 모든 결과를 담는다. 
    meaningful = [] 
    #kasiski test의 결과 중 3이상인(유의미한) 결과만 담는다.
    done = [] 
    #중복을 방지하기 위해, kasiski test를 수행한 문자열을 담아, 향후 사용한다. 

    # print("Kasiski Test for Each Triple")
    for i in range(l-3):
        index_list = []
        index_list.append(i)
        if ciphertext[i:i+3] not in done:
				# 처음 발견한 크기 3짜리 문자열에 대해서만 kasiski test를 하여 중복을 방지한다. 
            for j in range(i+1,l-2):
                if ciphertext[i:i+3] ==  ciphertext[j:j+3]: 
                    index_list.append(j)
            done.append(ciphertext[i:i+3])
        if (len(index_list) >= 3):
            k = difference_gcd(index_list)
            # print(ciphertext[i:i+3] + " (" +str(len(index_list)) + ") : " + str(k))
            # 추적을 돕기 위해 kasiski test에 사용된 크기 3짜리 문자열과 나타난 횟수를 함께 출력한다. 
            total.append(k)
            if k >= 3: 
                meaningful.append(k)
    # print()
    # print("Total GCD results : " + str(gcd_list(total)))
    
    return gcd_list(total)

ciphertext = "BCBCCLBSTGIGSRATCXRKEIOBVFSHNCERSRURQKBGDWMMHWSBGPXGKLFJCVGFZTIGVJFONWKODGQEHRPQLURMWKHRCVNSXRKVHRAGEHEPAZBDFGPSKPUWCVJQNWXEMFFOYUCWLCTRHSMPWFYKLRDKLGJSBSNVWXLKESDCGETYPVPTSTGKVOGPJHSRWKWYLVIOXQHFFWCFWFYKCJAKJNTCVJGXSSLVFOPSNCTVCFXSNSPZJOPUZHIYFUWXEPLAOPQLGPYELZDGGJOXBIIONSCKSCAJFCVQVFAOCVKVOETFKSLIESOBUFTKLGNZIGPUSZCPUSXRPRHSMPSMDFGDWNAGEHEPABCBCCLBSTGIGSRAYONCUKOLJKJVOBEFZVCIVGYDNRKWCFZQSLGVBQGPVSBGPXOXBDLGSLGJGKBOZBSQVIODGQEOWMPXCDFGIGDFGJSXCYGFYETRACLQKCXJARHDPCTHOBCSFYYFVFCRWUSXRDFRIDTFAKATFGCRJVDOLKEGEJCSIDYNJCVYKUHRCIICELFNCBIHFFDFGLBSTGIGSRAJTERWISKQCEODGQEOVJGRROPKEFOQGRFMFCERZPQWSCQKFBKJVIOSLKEU"

if __name__ == "__main__":
    kasiski(ciphertext)