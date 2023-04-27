#include <iostream>

int stack[100] = { 0, };
int top = -1;

void push(int val) {
    ++top;
    stack[top] = val;
}

void pop() {
    stack[top] = 0;
    --top;
}

int main() {
    while (1) {
        int mode = 0;
        std::cout << "Enter 1 to push, 2 to pop, 3 to print and 4 to exit." << std::endl;
        std::cin >> mode;

        if (mode == 1) {
            int num = 0;
            std::cout << "Enter number to push" << std::endl;
            std::cin >> num;

            if (top < 99) {
                push(num);
            } else {
                std::cout << "Stack is full" << std::endl;
            }
        } else if (mode == 2) {
            if (top > -1) {
                pop();
            } else {
                std::cout << "Stack is empty; nothing to pop" << std::endl;
            }
        } else if (mode == 3) {
            if (top > -1) {
                std::cout << "========= STACK =========" << std::endl;
                for (int i = top; i >= 0; i--) {
                    std::cout << i << ": " << stack[i] << "\n";
                }
                std::cout << "=========================" << std::endl;

            } else {
                std::cout << "Stack is empty. " << std::endl;
            }
        } else {
            std::cout << "Aborting" << std::endl;
            break;
        }
    }
    return 0;
}