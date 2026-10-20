#pragma once
#include <string>
#include <vector>

namespace aisb {
enum class ClusterStatus { Idle, Running, Paused, Completed, Failed };
struct ClusterNode { std::string id; std::string agentId; std::string parentNodeId; std::string taskId; };
struct AgentCluster { std::string id; std::string name; std::string goal; std::vector<ClusterNode> nodes; ClusterStatus status = ClusterStatus::Idle; unsigned maxParallelism = 4; };
}
