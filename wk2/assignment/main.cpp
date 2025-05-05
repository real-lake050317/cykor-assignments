#include <iostream>
#include <string>
#include <memory>
#include <vector>

#include "Directory.h"
#include "CommandParser.h"
#include "CommandRunner.h"
#include "MainRunner.h"

Directory* root              = new Directory("/");
Directory* home              = new Directory("~");
Directory* currentDir        = root;
std::string username         = "jinhokim";
std::string devicename       = "MacBook Pro";

extern bool runCommand(const std::string& commandLine);

int main() {
    system("clear");

    while (true) {
        MainRunner();
    }

    return 0;
}
