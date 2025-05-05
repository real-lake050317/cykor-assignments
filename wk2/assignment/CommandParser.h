#pragma once
#include <string>
#include <vector>

enum class Operator { NONE, SEQUENTIAL, AND, OR, BACKGROUND, PIPELINE };

struct CommandSegment {
    std::string command;
    Operator op = Operator::NONE;
};

std::vector<CommandSegment> parseCommands(const std::string& input);
