from math import gcd

nums = [588, 665, 216,113,642,4,836,114,851,492,819,237]

li = []
for i in range(11):
    for j in range(i + 1, 11):
        li.append(nums[i+1] * nums[j] - nums[j+1] * nums[i])

print(gcd(*li))