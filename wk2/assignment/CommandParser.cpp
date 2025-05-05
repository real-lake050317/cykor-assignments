#include "CommandParser.h"

#include <sstream>

std::vector<CommandSegment> parseCommands(const std::string& input) {
    std::vector<CommandSegment> result;
    std::istringstream iss(input);
    std::string token, commandBuffer;

    while (iss >> token) {
        if (token == ";") {
            result.push_back({commandBuffer, Operator::SEQUENTIAL});
            commandBuffer.clear();
        } else if (token == "&&") {
            result.push_back({commandBuffer, Operator::AND});
            commandBuffer.clear();
        } else if (token == "||") {
            result.push_back({commandBuffer, Operator::OR});
            commandBuffer.clear();
        } else if (token == "&") {
            result.push_back({commandBuffer, Operator::BACKGROUND});
            commandBuffer.clear();
        } else if (token == "|") {
            result.push_back({commandBuffer, Operator::PIPELINE});
            commandBuffer.clear();
        } else {
            if (!commandBuffer.empty()) commandBuffer += " ";
            commandBuffer += token;
        }
    }

    if (!commandBuffer.empty()) {
        result.push_back({commandBuffer, Operator::NONE});
    }

    return result;
}
