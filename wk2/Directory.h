#include <iostream>

class Directory {
    public:
    Directory* parent       = NULL;
    Directory* subdir       = NULL;
    Directory* siblingdir   = NULL;

    std::string dirname;

    Directory(std::string dirname) {
        this->dirname = dirname;
    }

    Directory* findSubdir(std::string dirname) {
        if (subdir == NULL) {
            return NULL;
        }

        if (subdir->dirname == dirname) {
            return subdir;
        } else {
            Directory* temp = subdir;
            while (temp != NULL) {
                if (temp->dirname == dirname) {
                    return temp;
                }
                temp = temp->siblingdir;
            }
            return NULL;
        }
    }

    Directory* findSiblingdir(std::string dirname) {
        if (subdir == NULL) {
            return NULL;
        }

        if (siblingdir->dirname == dirname) {
            return siblingdir;
        } else {
            return siblingdir->findSiblingdir(dirname);
        }
    }

    void mkdir(Directory*& currentDir, std::string dirname) {
        if (subdir == NULL) {
            subdir = new Directory(dirname);
            subdir->parent = currentDir;
        } else {
            Directory* temp = subdir;
            while (temp->siblingdir != NULL) {
                temp = temp->siblingdir;
            }
            temp->siblingdir = new Directory(dirname);
        }
    }

    void listDir() {
        Directory* temp = subdir;
        while (temp != NULL) {
            std::cout << temp->dirname << "\t";
            temp = temp->siblingdir;
        }
        std::cout << std::endl;
    }

    void changeDir(Directory*& currentDir, std::string dirname) {
        if (dirname == "..") {
            if (currentDir->parent != NULL) {
                currentDir = currentDir->parent;
                std::cout << "Changed directory to: " << currentDir->dirname << std::endl;
            } else {
                std::cout << "Already at root directory" << std::endl;
            }
            return;
        } else if (dirname == ".") {
            return;
        } else if (dirname == "/") {
            currentDir = this;
        } else { // need ~
            Directory* temp = findSubdir(dirname);
            if (temp != NULL) {
                std::cout << "Changing directory to: " << dirname << std::endl;
                currentDir = temp;
            } else {
                std::cout << "Directory not found" << std::endl;
            }
        }
    }

    private:
    protected:
};