#include <iostream>
#include <cstring>
#include <memory>
#include "Directory.h"

Directory* root                 = new Directory("/");
Directory* home                 = new Directory("~");
static Directory* currentDir    = root;
std::string username            = "jinhokim";
std::string devicename          = "MacBook Pro";

int main() {
    // currentDir->mkdir("newfile 1");
    // currentDir->mkdir("newfile 2");
    // currentDir->mkdir("newfile 3");
    // currentDir->mkdir("newfile 4");
    
    // currentDir->listDir();

    // currentDir->changeDir(currentDir, "newfile 1");

    // currentDir->mkdir("newfile_under_1");

    // currentDir->listDir();

    // currentDir->changeDir(currentDir, "..");
    
    system("clear");

    while (true) {
        std::string command;
        std::cout << username << "@" << devicename << ": " << currentDir->dirname << " $ ";
        
        std::cin >> command;

        if (command == "mkdir") {
            std::string dirname;
            std::cin >> dirname;

            currentDir->mkdir(currentDir, dirname);
        } else if (command == "clear") {
            system("clear");
        } else if (command == "ls") {
            currentDir->listDir();
        } else if (command == "cd") {
            std::string dirname;
            std::cin >> dirname;
            
            currentDir->changeDir(currentDir, dirname);
        } else if (command == "exit") {
            break;
        } else if (command == "pwd") {
            currentDir->printWorkingDir(currentDir);
        } else {
            std::cout << "Command not found: " << command << std::endl;
        }
    }

    return 0;
}