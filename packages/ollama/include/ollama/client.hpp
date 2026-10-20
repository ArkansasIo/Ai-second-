#pragma once

#include <string>
#include <vector>

namespace aisecondbrain::ollama {

struct Model {
    std::string name;
    std::string digest;
    std::string details;
};

struct ChatRequest {
    std::string model;
    std::string systemPrompt;
    std::string message;
    double temperature = 0.2;
    bool stream = true;
};

class Client {
public:
    explicit Client(std::string baseUrl = "http://127.0.0.1:11434");
    bool isAvailable() const;
    std::vector<Model> listModels() const;
    std::string chat(const ChatRequest& request) const;
    const std::string& baseUrl() const noexcept;

private:
    std::string baseUrl_;
};

} // namespace aisecondbrain::ollama
