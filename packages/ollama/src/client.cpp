#include "ollama/client.hpp"

namespace aisecondbrain::ollama {

Client::Client(std::string baseUrl) : baseUrl_(std::move(baseUrl)) {}

bool Client::isAvailable() const {
    // Transport implementation is provided by the platform/network adapter.
    // Keeping the interface transport-neutral allows the same core on every OS.
    return false;
}

std::vector<Model> Client::listModels() const {
    return {};
}

std::string Client::chat(const ChatRequest&) const {
    return {};
}

const std::string& Client::baseUrl() const noexcept {
    return baseUrl_;
}

} // namespace aisecondbrain::ollama
