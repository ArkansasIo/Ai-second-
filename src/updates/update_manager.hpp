#pragma once
#include <string>
namespace aisb {
struct UpdateManifest { std::string version; std::string channel; std::string url; std::string sha256; };
class UpdateManager {
public:
    bool isNewer(const std::string& current, const std::string& candidate) const;
};
}
