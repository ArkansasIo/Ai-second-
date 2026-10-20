#pragma once
#include <string>

namespace aisb {
struct Configuration {
    std::string ollamaUrl = "http://127.0.0.1:11434";
    std::string updateChannel = "stable";
    bool automaticUpdates = true;
    bool automaticDownload = false;
    bool automaticInstall = false;
};
}
