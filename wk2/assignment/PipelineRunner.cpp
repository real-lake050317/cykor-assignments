#include "PipelineRunner.h"

#include <iostream>
#include <sstream>
#include <vector>
#include <cstring>
#include <unistd.h>
#include <sys/wait.h>

std::vector<char*> parseArgs(const std::string& command) {
    std::istringstream iss(command);
    std::string token;
    std::vector<char*> args;

    while (iss >> token) {
        char* arg = new char[token.size() + 1];
        std::strcpy(arg, token.c_str());
        args.push_back(arg);
    }

    args.push_back(nullptr);
    return args;
}

void freeArgs(std::vector<char*>& args) {
    for (char* arg : args) delete[] arg;
}

bool runPipeline(const std::vector<std::string>& commands) {
    int numCmds = commands.size();
    int prevPipe[2] = { -1, -1 };

    for (int i = 0; i < numCmds; ++i) {
        int pipefd[2];
        if (i < numCmds - 1) {
            if (pipe(pipefd) < 0) {
                std::cerr << "Pipe creation failed\n";
                return false;
            }
        }

        pid_t pid = fork();
        if (pid < 0) {
            std::cerr << "Fork failed\n";
            return false;
        }

        if (pid == 0) {
            if (prevPipe[0] != -1) {
                dup2(prevPipe[0], STDIN_FILENO);
                close(prevPipe[0]);
                close(prevPipe[1]);
            }

            if (i < numCmds - 1) {
                close(pipefd[0]);
                dup2(pipefd[1], STDOUT_FILENO);
                close(pipefd[1]);
            }

            std::vector<char*> args = parseArgs(commands[i]);
            execvp(args[0], args.data());

            std::cerr << "Command not found: " << args[0] << "\n";
            freeArgs(args);
            _exit(1);
        }

        if (prevPipe[0] != -1) {
            close(prevPipe[0]);
            close(prevPipe[1]);
        }

        if (i < numCmds - 1) {
            prevPipe[0] = pipefd[0];
            prevPipe[1] = pipefd[1];
        }
    }

    for (int i = 0; i < numCmds; ++i) {
        wait(nullptr);
    }

    return true;
}
