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

    for (unsigned long i = 0; i < segments.size(); ++i) {
        const CommandSegment& segment = segments[i];
    
        if (i > 0) {
            Operator prev = segments[i - 1].op;
    
            if (prev == Operator::AND && !lastSuccess) continue;
            if (prev == Operator::OR && lastSuccess) continue;
        }
    
        if (segment.op == Operator::BACKGROUND) {
            lastSuccess = runCommand(segment.command, true);
            continue;
        }
    
        if (segment.op == Operator::PIPELINE) {
            // temporary
            continue;
        }
    
        lastSuccess = runCommand(segment.command);
    }
}