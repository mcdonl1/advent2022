
stacks_list = []
with open("input.txt", "r") as f:
    stack = []
    lineNum = 0
    while(lineNum < 8):
        line = f.readline()    
        lineNum += 1
        for i in range(9):
            stack.append(line[i*4:i*4+3])
        stacks_list.append(stack)
        stack = []
    for i in range(len(stacks_list)):
        stacks_list[i] = list(map(lambda el: el[1] if el != "   " else "", stacks_list[i]))


    stacks1 = []
    stacks2 = []
    for i in range(len(stacks_list[0])):
        stack = []
        for j in range(len(stacks_list)):
            if stacks_list[j][i] != "":
                stack.insert(0, stacks_list[j][i])
        stacks1.append(stack)
        stacks2.append(stack.copy())
        

    f.readline()
    f.readline()

    def map_func(line):
        split = line[:-1].split(" ")
        return [int(split[1]),int(split[3])-1,int(split[5])-1]

    instructions = list(map(map_func,f.readlines()))

    for inst in instructions:
        for i in range(inst[0]):
            stacks1[inst[2]].append(stacks1[inst[1]].pop())
            stacks2[inst[2]].append(stacks2[inst[1]].pop(-inst[0]+i))

    ans1 = ""
    ans2 = ""


    for stack in stacks1:
        ans1 += stack[-1]
    
    for stack in stacks2:
        ans2 += stack[-1]

    print("Part 1:", ans1)
    print("Part 2", ans2)