#include "CommandRunner.h"
#include "Directory.h"
#include <sstream>
#include <iostream>

extern Directory* currentDir;
extern std::string username;
extern std::string devicename;

bool runCommand(const std::string& commandLine) {
    std::istringstream iss(commandLine);
    std::string cmd;
    iss >> cmd;

    if (cmd == "mkdir") {
        std::string dirname;
        iss >> dirname;
        currentDir->mkdir(currentDir, dirname);
        return true;
    } else if (cmd == "clear") {
        system("clear");
        return true;
    } else if (cmd == "ls") {
        currentDir->listDir();
        return true;
    } else if (cmd == "cd") {
        std::string dirname;
        iss >> dirname;
        return currentDir->changeDir(currentDir, dirname); // must return true/false
    } else if (cmd == "pwd") {
        currentDir->printWorkingDir(currentDir);
        return true;
    } else if (cmd == "exit") {
        exit(0);
    } else {
        std::cout << "Command not found: " << cmd << std::endl;
        return false;
    }
}
