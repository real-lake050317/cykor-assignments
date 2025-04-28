#include <iostream>
#include <cstring>

class Directory {
    public:
    Directory* parent       = NULL;
    Directory* subdir       = NULL;
    Directory* siblingdir   = NULL;

    std::string dirname;

    Directory(std::string dirname) {
        this->dirname = dirname;
    }

    void mkdir(std::string dirname) {
        if (subdir == NULL) {
            subdir = new Directory(dirname);
        }
    }
};

int main() {
    // while (true) {
    //     std::cout << "Hello, World!" << std::endl;
    // }

    Directory *d = new Directory("newfile");

    d->mkdir("newfile");

    std::cout << (d->subdir->dirname) << std::endl;



    return 0;
}