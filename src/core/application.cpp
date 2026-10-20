#include "core/application.hpp"
#include <iostream>
#include "core/version.hpp"

namespace aisb {
Application::Application(Configuration configuration) : configuration_(std::move(configuration)) {}
const Configuration& Application::configuration() const noexcept { return configuration_; }
int Application::run() const {
    std::cout << kProductName << " " << kVersion << " (" << kEdition << ")\n";
    std::cout << "Ollama: " << configuration_.ollamaUrl << "\n";
    return 0;
}
}
