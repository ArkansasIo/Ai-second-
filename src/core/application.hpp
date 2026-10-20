#pragma once
#include "core/configuration.hpp"

namespace aisb {
class Application {
public:
    explicit Application(Configuration configuration = {});
    const Configuration& configuration() const noexcept;
    int run() const;
private:
    Configuration configuration_;
};
}
