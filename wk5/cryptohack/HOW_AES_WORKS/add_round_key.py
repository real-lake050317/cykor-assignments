from matrix import matrix2bytes

state = [
    [206, 243, 61, 34],
    [171, 11, 93, 31],
    [16, 200, 91, 108],
    [150, 3, 194, 51],
]

round_key = [
    [173, 129, 68, 82],
    [223, 100, 38, 109],
    [32, 189, 53, 8],
    [253, 48, 187, 78],
]

def add_round_key(s, k):
    mat = []
    for i in range(4):
        row = []
        for j in range(4):
            row.append(s[i][j] ^ k[i][j])
        mat.append(row)
    return mat

if __name__ == "__main__":
    # print(add_round_key(state, round_key))
    
    print(matrix2bytes(add_round_key(state, round_key)))