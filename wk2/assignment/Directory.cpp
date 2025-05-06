#include "Directory.h"

#include <iostream>
#include <vector>
#include <sstream>
#include <unistd.h>
#include <sys/wait.h>

Directory::Directory(std::string name) {
    dirname = name;
    parent = nullptr;
    subdir = nullptr;
    siblingdir = nullptr;
}

void Directory::mkdir(Directory* currentDir, std::string name) {
    Directory* newDir = new Directory(name);
    newDir->parent = currentDir;

    if (currentDir->subdir == nullptr) {
        currentDir->subdir = newDir;
    } else {
        Directory* temp = currentDir->subdir;
        while (temp->siblingdir != nullptr) {
            temp = temp->siblingdir;
        }
        temp->siblingdir = newDir;
    }
}

void Directory::listDir(bool isBackground) {
    pid_t pid = fork();

    if (pid < 0) {
        std::cerr << "Error! Fork failed for ls." << std::endl;
        return;
    }

    if (pid == 0) {
        Directory* temp = subdir;
        while (temp != nullptr) {
            std::cout << temp->dirname << "  ";
            temp = temp->siblingdir;
        }
        std::cout << std::endl;
        _exit(0);
    } else {
        if (!isBackground) {
            int status;
            waitpid(pid, &status, 0);
        } else {
            std::cout << "Background process ls started with PID: " << pid << std::endl;
        }
    }
}

Directory* Directory::findSubdir(std::string name) {
    Directory* temp = subdir;
    while (temp != nullptr) {
        if (temp->dirname == name) {
            return temp;
        }
        temp = temp->siblingdir;
    }
    return nullptr;
}

bool Directory::changeDir(Directory*& currentDir, const std::string& dirname) {
    std::stringstream ss(dirname);
    std::string token;
    Directory* temp = currentDir;

    while (std::getline(ss, token, '/')) {
        if (token.empty() || token == ".") {
            continue;
        } else if (token == "..") {
            if (temp->parent != nullptr) {
                temp = temp->parent;
            } else {
                std::cout << "Already at root directory" << std::endl;
                return false;
            }
        } else {
            Directory* nextDir = temp->findSubdir(token);
            if (nextDir != nullptr) {
                temp = nextDir;
            } else {
                std::cout << "Directory not found: " << token << std::endl;
                return false;
            }
        }
    }
    currentDir = temp;
    return true;
}

void Directory::printWorkingDir(Directory* currentDir, bool isBackground) {
    pid_t pid = fork();

    if (pid < 0) {
        std::cerr << "Error! Fork failed for pwd." << std::endl;
        return;
    }

    if (pid == 0) {
        std::vector<std::string> path;
        Directory* temp = currentDir;

        while (temp != nullptr) {
            path.push_back(temp->dirname);
            temp = temp->parent;
        }

        std::cout << "/";
        for (std::vector<std::string>::reverse_iterator it = path.rbegin(); it != path.rend(); ++it) {
            if (*it != "/") std::cout << *it << "/";
        }
        std::cout << std::endl;

        _exit(0);
    } else {
        if (!isBackground) {
            int status;
            waitpid(pid, &status, 0);
        } else {
            std::cout << "Background process pwd started with PID: " << pid << std::endl;
        }
    }
}

