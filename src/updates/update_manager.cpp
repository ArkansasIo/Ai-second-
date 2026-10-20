#include "updates/update_manager.hpp"
#include <sstream>
#include <tuple>
namespace aisb {
bool UpdateManager::isNewer(const std::string& current, const std::string& candidate) const {
    auto parse=[](const std::string& v){ std::string s=v; if(!s.empty()&&s[0]=='v') s.erase(0,1); std::istringstream in(s); int a=0,b=0,c=0; char dot; in>>a>>dot>>b>>dot>>c; return std::tuple<int,int,int>{a,b,c}; };
    return parse(candidate) > parse(current);
}
}
