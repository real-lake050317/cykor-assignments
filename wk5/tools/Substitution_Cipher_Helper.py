#Total Substitution Cipher Solving Helper (Ver 1.0)
    # Made by Jungwoo Park
    # October 4th, 2023 
    # Only in use for Substitution Cipher

ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
attempt = 0
input_record = [] 
#input_record는 이전의 입력들을 담을 전역변수이다. 다음 substitution chart를 입력하기 편하게 하기 위해 만들어졌다. 

#통계적 특징을 출력해주는 함수이며, 분석하게 될 암호문을 인자로 받는다. 
def statistcs(ciphertext):
    #setup 
    # 함수 구동을 하기 위한 변수 등이 선언되고 초기화된다. 
		# 분석하게 될 입력된 암호문을 보여준다. 
    print("\nCiphertext Being Analyzed :\n" + ciphertext, end =' ')
    l = len(ciphertext) 
    if l<=2 : 
        return False
    print("(length(" + str(len(ciphertext)) + "))\n")
    temp = {}
    order = {}
    
    print("\n===========================================================================")

    #monogram을 만들어주는 코드이다. 
    #temp라는 dictionary를 활용한다. 
    temp.clear()
    for i in range(l):
        if ciphertext[i] not in temp:
            temp[ciphertext[i]] = 1
        else :
            temp[ciphertext[i]] += 1
    order = sorted(temp.items(), key= lambda x:x[0])
    #알파벳 순으로 temp를 정렬하여 order로 준다. 
    monogram = sorted(order, key= lambda x:x[1], reverse=True)
	  # 빈도 수 많은 순서대로 order를 정렬하여 monogram에 준다. 
    # 빈도 1순위, 알파벳 순서 2순위로 정렬됨
    # monogram이 완성된다.

    # monogram중에서 발생 빈도 수가 같은 것끼리 합쳐서 보기 편하게 만든다.
    group_monogram = {}
    value = monogram[0][1]
    key = []
    for i in monogram:
        if i[1] == value :
            key.append(i[0])
        else:
            group_monogram[tuple(key)] = value 
            key.clear()
            value = i[1]
            key.append(i[0])
    group_monogram[tuple(key)] = value
    key.clear()
    #중복끼리 합쳐서 있는 형태의 group_monogram이 완성된다. (합쳐진 인자들은 알파벳 순서)

    #group_monogram을 빈도 수 순서대로 출력한다. 
    print("\n(1) Monogram:\n")
    for i in group_monogram.items():
        for j in i[0]:
            print(str(j), end = ' ')
        print(': ' + str(round(i[1]/l*100,2)) + '% - ' + str(i[1]))
        # 알파벳과 빈도 수 뿐 아니라 퍼센트 비율도 함께 표시하도록 코드를 짠다. 
        # 퍼센트 비율은 보기 편하게 소수 점 2자리로 반올림하여 출력하도록 한다. 
        
    #diagram을 출력하는 코드이다. 
    #monogram을 출력해주는 코드와 같은 방식으로 구현되었으니,monogram 참고 
    #(:) 슬라이싱 기능을 통해 2개 단위로 생각해주도록 만들었다는 차이가 있다.
    temp.clear()     
    for i in range(l-1):
        if ciphertext[i:i+2] not in temp:
            temp[ciphertext[i:i+2]] = 1
        else :
            temp[ciphertext[i:i+2]] += 1
    order = sorted(temp.items(), key= lambda x:x[0])
    diagram = sorted(order, key= lambda x:x[1], reverse=True)

    group_diagram = {}
    value = diagram[0][1]
    key = []
    for i in diagram:
        if i[1] == value :
            key.append(i[0])
        else:
            group_diagram[tuple(key)] = value 
            key.clear()
            value = i[1]
            key.append(i[0])
    group_diagram[tuple(key)] = value
    key.clear()

    print("\n(2) Diagram:\n")
    for i in group_diagram.items():
        for j in i[0]:
            print(str(j), end = ' ')
        print(': ' + str(round(i[1]/(l-1)*100,2)) + '% - ' + str(i[1]))
        
    #Trigram을 출력하는 코드이다. 
    #monogram을 출력해주는 코드와 같은 방식으로 구현되었으니,monogram 참고 
    #(:) 슬라이싱 기능을 통해 3개 단위로 생각해주도록 만들었다는 차이가 있다.
    temp.clear()      
    for i in range(l-2):
        if ciphertext[i:i+3] not in temp:
            temp[ciphertext[i:i+3]] = 1
        else :
            temp[ciphertext[i:i+3]] += 1
    order = sorted(temp.items(), key= lambda x:x[0])
    trigram = sorted(order, key= lambda x:x[1], reverse=True)
        
    group_trigram = {}
    value = trigram[0][1]
    key = []
    for i in trigram:
        if i[1] == value :
            key.append(i[0])
        else:
            group_trigram[tuple(key)] = value 
            key.clear()
            value = i[1]
            key.append(i[0])
    group_trigram[tuple(key)] = value
    key.clear()

    print("\n(3) Trigram:\n")
    for i in group_trigram.items():
        for j in i[0]:
            print(str(j), end = ' ')
        print(': ' + str(round(i[1]/(l-2)*100,2)) + '% - ' + str(i[1]))
    print()
    print("===========================================================================\n\n")
    return True

# 암호문을 입력한 CHART에 맞게 치환해주는 함수이다. 
# 통계분석 함수를 위해, 공백입력은 원본암호에서 가져오는 치환방식인 substitution_text
# 암호를 푸는 사용자가 보기 편하도록, 공백입력은 공백으로 놔두는 substitution_text_show
# 두 가지 방식으로 한 치환 결과를 모두 return한다. 
def substitute(CHART):
    substitute_text = ""
    substitute_text_show = ""
    for i in ciphertext:
        for j in range(len(ALPHABETS)):
            if ALPHABETS[j] == i :
                if CHART[j] == '-':
                    substitute_text += i
                else:
                    substitute_text += CHART[j]
                substitute_text_show += CHART[j]
                break
    return (substitute_text, substitute_text_show)

# 입력한 치환표의 역을 계산해서 key를 계산해주는 함수이다. 
def key_finder(CHART):
    key = ""
    alphabets = ALPHABETS.lower()
    for i in alphabets:
        if i not in CHART:
            key += '-'
        else:
            for j in range(len(CHART)):
                if i == CHART[j] :
                    key += alphabets[j]
    return key
    
# ENTER CIPHERTEXT "HERE"!!
# 문제의 암호문이 입력되어 있다. 
# 다른 치환암호를 분석하고 싶을 경우, 아래 따옴표 사이에 대문자로 변환하여 입력해주면 된다. 
##############################################################################################################
ciphertext = "KCOIHVYKXDUDSKCQMJVZOCDTJKCOIHVYIQSPXVYJQUKVTSVYPTIVSQSKFVKXVSKXDCDHOWMVUQSHQCKAIQSATJXVYUTIIDSKYQSPQUKVTSYXQRDWDDSUXQCQUKDCVGDPQYCQUVYKTCIVYTZASVYKVUQSPXDXQYIQPDJQMYDQSPIVYMDQPVSZYKQKDIDSKYQSPHCTITKDPUTSYHVCQUAKXDTCVDYKTQPDZCDDOSHCDUDPDSKDPVSQIDCVUQSHTMVKVUYKCOIHYQUKVTSYDYHDUVQMMAVSXVYYDUTSPKDCIXQRDWDDSPDYUCVWDPQYQOKXTCVKQCVQSQSPUTSKCVWOKVSZKTPDITUCQKVUWQUNYMVPVSZQJKDCXVYJVCYKKDCIYUXTMQCYQSPXVYKTCVQSYCQSNDPXVIQYTSDTJKXDFTCYKHCDYVPDSKYVSQIDCVUQSXVYKTCA"
##############################################################################################################


# main function
# 함수들을 순차적으로 실행하고 입력 등을 받는 main 함수이다. 
print("\n\nTotal Substitution Cipher Solving Helper 1.0\n(By Jungwoo Park, Korea Univ. Dept. of Cyberdefense Undergraduate Student)\n")

print("===========================================================================\n")
print("Original Ciphertext Statistics")
# mono/dia/tri-gram과 통계 특성을 보여준다. 
statistcs(ciphertext)

#원하는 만큼 반복하며, 치환표에 맞게 치환하고, 바뀐 암호문과 통계특성, 새 key 값을 보여주는 과정을 반복한다. 
while(True):
    attempt += 1 
    print("\n\n===========================================================================")
    print("Attempt " + str(attempt))
    print("===========================================================================\n\n")
    print("Enter a Substitution Chart. \n    - 26 characters of lower case letters and \'-\' should be inputed \n    - Other characters except for lowercase letters are treated as \'-\'\n    - Enter \'exit\' to end program \n\n")
    print("CHART #" + str(attempt))
    print(ALPHABETS)
    substitution_chart= input("--------------------------\033[G")
    # 알파벳 아래에 치환할 문자를 소문자로 입력해주면 그에 따른 결과가 나온다. 
    if (substitution_chart.lower() == 'exit'):
        print("\nBYE BYE\n")
        break
    #exit이라 입력하면 프로그램을 종료한다. 
    if (len(substitution_chart) != 26):
        print("Input Size Error! Try again! \n\n")
        continue
    #입력된 차트의 크기가 26이 아니라면 다시 입력하도록 한다. 
    for i in range(len(substitution_chart)):
        if not substitution_chart[i].islower() :
            substitution_chart = substitution_chart[:i] + '-' + substitution_chart[i+1:]
    input_record.append(substitution_chart)
    #소문자가 아닌 입력은 '-' 로 바꾸어 통일해준다. 
    print("\n\n===========================================================================\n")
    key = key_finder(substitution_chart)
		# key_finder함수로 key를 계산한다.
    # 치환된 결과를 여러 형식으로 display한다.
    substituted = substitute(substitution_chart)
    print("Original Cipertext : \n" + ciphertext)
    print()
    print("Substituted Text : \n" + substituted[1])
    print()
    statistcs(substituted[0])
    print()
    print("===========================================================================\n")
    #key와 입력했던 치환표, 과거의 치환표들을 보여준다. 
    print("[Key Chart]")
    print(ALPHABETS)
    print(key)
    print()
    print("[Reversed Key Chart]")
    print(ALPHABETS)
    print(substitution_chart)
    print()
    print("[Input Chart Record]")
    print('NUM  ' + ALPHABETS)
    for i in range(len(input_record)):
        print("[" + str(i+1) + "]  " + input_record[i])
    print("\n===========================================================================\n")
    print()
    # 한 attempt가 끝나면 프로그램 종료의사 여부를 묻는다. 
    if (input("End Program?[Y/n] ").upper() == "Y"):
        print("\nBYE BYE\n")
        break