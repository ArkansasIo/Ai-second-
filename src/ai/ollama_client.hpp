#pragma once
#include <string>
#include <vector>
namespace aisb {
class OllamaClient {
public:
    explicit OllamaClient(std::string baseUrl = "http://127.0.0.1:11434") : baseUrl_(std::move(baseUrl)) {}
    const std::string& baseUrl() const noexcept { return baseUrl_; }
private:
    std::string baseUrl_;
};
}
