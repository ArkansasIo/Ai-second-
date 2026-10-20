#include "core/application.hpp"
#include "updates/update_manager.hpp"
#include <cassert>
int main() {
    aisb::Application app;
    assert(app.configuration().ollamaUrl == "http://127.0.0.1:11434");
    aisb::UpdateManager updates;
    assert(updates.isNewer("0.1.0", "0.2.0"));
    assert(!updates.isNewer("0.2.0", "0.1.0"));
    return 0;
}
