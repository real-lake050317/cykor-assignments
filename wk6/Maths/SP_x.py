nums = [588, 665, 216,113,642,4,836,114,851,492,819,237]
p = 919

inv = pow(nums[0], -1, p)
x = (nums[1] * inv) % p

print(pow(x, 3, p))

print(x)