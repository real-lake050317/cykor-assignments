ans = 1

for i in range(17):
    ans *= 101
    ans %= 22663

print(ans)