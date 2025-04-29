#include <iostream>
#include <vector>
#include <sstream> 

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
            temp->siblingdir->parent = currentDir;
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

    void printWorkingDir(Directory*& currentDir) {
        std::vector<std::string> path;

        Directory* temp = currentDir;
        while (temp != NULL) {
            path.push_back(temp->dirname);
            temp = temp->parent;
        }

        std::cout << "/";
        for (auto it = path.rbegin(); it != path.rend(); ++it) {
            if (*it != "/") {
                std::cout << *it << "/";
            }
        }
        std::cout << std::endl;
    }

    void changeDir(Directory*& currentDir, const std::string& dirname) {
        std::stringstream ss(dirname);
        std::string token;
        Directory* temp = currentDir;
    
        while (std::getline(ss, token, '/')) {
            if (token.empty() || token == ".") {
                continue;
            } else if (token == "..") {
                if (temp->parent != NULL) {
                    temp = temp->parent;
                } else {
                    std::cout << "Already at root directory" << std::endl;
                    return;
                }
            } else {
                Directory* nextDir = temp->findSubdir(token);
                if (nextDir != NULL) {
                    temp = nextDir;
                } else {
                    std::cout << "Directory not found: " << token << std::endl;
                    return;
                }
            }
        }
        currentDir = temp;
        std::cout << "Changed directory to: " << currentDir->dirname << std::endl;
    }
    
    private:

    protected:

};