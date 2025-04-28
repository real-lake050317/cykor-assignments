#include <iostream>
#include <cstring>
#include <memory>
#include "Directory.h"

Directory* root = new Directory("/");
Directory* home = new Directory("~");
static Directory* currentDir = root;

int main() {
    Directory *d = new Directory("newfile");

    d->mkdir("newfile 1");
    d->mkdir("newfile 2");
    d->mkdir("newfile 3");
    d->mkdir("newfile 4");

    std::cout << (d->findSubdir("newfile 2")) << std::endl;

    return 0;
}