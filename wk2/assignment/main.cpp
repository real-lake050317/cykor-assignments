#include "Directory.h"
#include "MainRunner.h"

Directory* root              = new Directory("/");
Directory* currentDir        = root;
std::string username         = "jinhokim";
std::string devicename       = "MacBook Pro";

int main() {
    system("clear");

    while (true) {
        MainRunner();
    }

    return 0;
}
