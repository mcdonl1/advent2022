
input_array = []

with open("input.txt", "r") as f:
    reindeer = []
    for line in f.readlines():
        try:
            reindeer.append(int(line))
        except:
            input_array.append(reindeer)
            reindeer = []
    print(input_array)

sums = list(map(sum, input_array))
print("Part 1:", max(sums))


sums.sort()
top3 = sum(sums[-3:])

print("Part 2:", top3)
        
        