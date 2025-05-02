#include "Directory.h"
#include <iostream>
#include <vector>

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

void Directory::listDir() {
    Directory* temp = subdir;
    while (temp != nullptr) {
        std::cout << temp->dirname << "  ";
        temp = temp->siblingdir;
    }
    std::cout << std::endl;
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

bool Directory::changeDir(Directory*& currentDir, std::string name) {
    if (name == "..") {
        if (currentDir->parent != nullptr) {
            currentDir = currentDir->parent;
            return true;
        } else {
            std::cout << "Already at root directory." << std::endl;
            return false;
        }
    }

    Directory* temp = currentDir->findSubdir(name);
    if (temp != nullptr) {
        currentDir = temp;
        return true;
    } else {
        std::cout << "Directory not found: " << name << std::endl;
        return false;
    }
}

void Directory::printWorkingDir(Directory* currentDir) {
    std::vector<std::string> path;
    Directory* temp = currentDir;

    while (temp != nullptr) {
        path.push_back(temp->dirname);
        temp = temp->parent;
    }

    std::cout << "/";
    for (auto it = path.rbegin(); it != path.rend(); ++it) {
        if (*it != "/") std::cout << *it << "/";
    }
    std::cout << std::endl;
}
