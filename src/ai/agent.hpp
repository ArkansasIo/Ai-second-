#pragma once
#include <string>
#include <vector>
#include <unordered_map>

namespace aisb {
struct AgentDefinition {
    std::string id;
    std::string name;
    std::string role;
    std::string baseModel;
    std::string systemPrompt;
    double temperature = 0.2;
    std::vector<std::string> tools;
    std::unordered_map<std::string, bool> permissions;
    std::string memoryScope = "project";
};
}
