#include "CommandRunner.h"
#include "Directory.h"

#include <sstream>
#include <iostream>

extern Directory*   currentDir;
extern std::string  username;
extern std::string  devicename;

bool runCommand(const std::string& commandLine, bool isBackground) {
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
        if (isBackground) {
            currentDir->listDir(true);
        } else {
            currentDir->listDir();
        }
        return true;
    } else if (cmd == "cd") {
        std::string dirname;
        iss >> dirname;
        return currentDir->changeDir(currentDir, dirname); // must return true/false
    } else if (cmd == "pwd") {
        if (isBackground) {
            currentDir->printWorkingDir(currentDir, true);
        } else {
            currentDir->printWorkingDir(currentDir);
        }
        return true;
    } else if (cmd == "echo") {
        std::string message;
        std::getline(iss, message);
        std::cout << message << std::endl;
        return true;
    } else if (cmd == "whoami") {
        std::cout << username << "@" << devicename << std::endl;
        return true;
    } else if (cmd == "exit") {
        exit(0);
    } else {
        std::cout << "Command not found: " << cmd << std::endl;
        return false;
    }
}
