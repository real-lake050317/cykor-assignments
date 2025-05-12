#include <iostream>
#include <cstring>

#define STACK_SIZE      50
#define ERROR_SENTINEL -999

int            call_stack[STACK_SIZE];     // Call Stack을 저장하는 배열
std::string    stack_info[STACK_SIZE];     // Call Stack 요소에 대한 설명을 저장하는 배열

int SP = -1;
int FP = -1;

void func1(int arg1, int arg2, int arg3);
void func2(int arg1, int arg2);
void func3(int arg1);

void print_stack()
{
    if (SP == -1)
    {
        std::cout << "Stack is empty." << std::endl;
        return;
    }

    std::cout << "====== Current Call Stack ======" << std::endl;

    
    for (int i = SP; i >= 0; i--)
    {
        if (call_stack[i] != -1)
            std::cout << i << ": " << stack_info[i] << " = " << call_stack[i];
        else
            std::cout << i << ": " << stack_info[i];

        if (i == SP)
            std::cout << "    <=== [esp]" << std::endl;
        else if (i == FP)
            std::cout << "    <=== [ebp]" << std::endl;
        else
            std::cout << std::endl;
    }
    std::cout << "================================\n\n" << std::endl;
}

void push(int value, std::string info) { 
    if (SP >= STACK_SIZE - 1) {
        std::cerr << "Stack is full" << std::endl; // prints error message to prevent stack overflow
        return;
    }
    
    ++SP;
    call_stack[SP] = value;
    stack_info[SP] = info;

    return;
}

int pop() {
    if (SP == -1) {
        std::cerr << "Stack is already empty" << std::endl; // prints error message when trying to pop from an empty stack
        return ERROR_SENTINEL;
    }

    int return_value = call_stack[SP];

    call_stack[SP] = 0;
    stack_info[SP] = "";
    --SP;

    return return_value;
}

void prologue(std::string function_name) {
    push(-1, "Return Address");
    push(FP, function_name + " SFP");
    FP = SP;
}

void epilogue() {
    if (SP < 1) {
        std::cerr << "Error" << std::endl;
        return;
    }

    while (SP > FP) {
        pop();
    }

    FP = call_stack[FP];
    pop();
    pop();
}

void func1(int arg1, int arg2, int arg3)
{
    int var_1 = 100;

    // func1의 스택 프레임 형성 (함수 프롤로그 + push)
    prologue("func1");
    push(arg1, "arg1");
    push(arg2, "arg2");
    push(arg3, "arg3");
    push(var_1, "var_1");
    print_stack();
    
    func2(11, 13);

    // func2의 스택 프레임 제거 (함수 에필로그 + pop)
    print_stack();
    epilogue();

    return;
}


void func2(int arg1, int arg2)
{
    int var_2 = 200;

    // func2의 스택 프레임 형성 (함수 프롤로그 + push)
    prologue("func2");
    push(arg1, "arg1");
    push(arg2, "arg2");
    push(var_2, "var_2");
    print_stack();

    func3(77);

    // func3의 스택 프레임 제거 (함수 에필로그 + pop)
    print_stack();
    epilogue();

    return;
}


void func3(int arg1)
{
    int var_3 = 300;
    int var_4 = 400;

    // func3의 스택 프레임 형성 (함수 프롤로그 + push)
    prologue("func3");
    push(arg1, "arg1");
    push(var_3, "var_3");
    push(var_4, "var_4");

    // func3의 스택 프레임 제거 (함수 에필로그 + pop)
    print_stack();
    epilogue();
    return;
}

//main 함수에 관련된 stack frame은 구현하지 않아도 됩니다.
int main()
{
    func1(1, 2, 3);
    // func1의 스택 프레임 제거 (함수 에필로그 + pop)
    print_stack();
    return 0;
}