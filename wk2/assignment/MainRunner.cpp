#include "Directory.h"
#include "MainRunner.h"
#include "CommandParser.h"
#include "CommandRunner.h"

#include <iostream>
#include <string>

extern Directory*   root;
extern Directory*   home;
extern Directory*   currentDir;
extern std::string  username;
extern std::string  devicename;

void MainRunner() {
    std::cout << username << "@" << devicename << ": " << currentDir->dirname << " $ ";
    std::string input;
    std::getline(std::cin, input);
    std::vector<CommandSegment> segments = parseCommands(input);
    
    bool lastSuccess = true;

    for (const CommandSegment& segment : segments) {
        bool shouldRun = true;

        if (segment.op == Operator::AND && !lastSuccess) shouldRun = false;
        if (segment.op == Operator::OR && lastSuccess) shouldRun = false;

        if (shouldRun) {
            lastSuccess = runCommand(segment.command);
        }
    }
}