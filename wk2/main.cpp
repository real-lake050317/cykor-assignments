#include <iostream>
#include <string>
#include <memory>
#include <vector>

#include "Directory.h"
#include "CommandParser.h"
#include "CommandRunner.h"

Directory* root              = new Directory("/");
Directory* home              = new Directory("~");
Directory* currentDir        = root;
std::string username         = "jinhokim";
std::string devicename       = "MacBook Pro";

int main() {
    system("clear");

    while (true) {
        std::cout << username << "@" << devicename << ": " << currentDir->dirname << " $ ";
        std::string input;
        std::getline(std::cin, input);

        std::vector<CommandSegment> segments = parseCommands(input);

        bool lastSuccess = true;

        for (const CommandSegment segment : segments) {
            bool shouldRun = true;

            if (segment.op == Operator::AND && !lastSuccess) shouldRun = false;
            if (segment.op == Operator::OR && lastSuccess) shouldRun = false;

            if (shouldRun) {
                lastSuccess = runCommand(segment.command);
            }
        }
    }

    return 0;
}
