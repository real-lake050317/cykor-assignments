#include <string>
#include <vector>

enum class Operator { NONE, SEQUENTIAL, AND, OR };

struct CommandSegment {
    std::string command;
    Operator op = Operator::NONE;
};

std::vector<CommandSegment> parseCommands(const std::string& input);
