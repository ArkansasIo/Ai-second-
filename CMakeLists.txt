cmake_minimum_required(VERSION 3.25)
project(AISecondBrain VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

option(AISB_BUILD_TESTS "Build native tests" ON)

add_library(aisb_core STATIC
    src/core/application.cpp
    src/core/application.hpp
    src/core/configuration.cpp
    src/core/configuration.hpp
    src/core/version.hpp
    src/ai/ollama_client.cpp
    src/ai/ollama_client.hpp
    src/ai/agent.cpp
    src/ai/agent.hpp
    src/ai/cluster.cpp
    src/ai/cluster.hpp
    src/updates/update_manager.cpp
    src/updates/update_manager.hpp
)

target_include_directories(aisb_core PUBLIC src)
target_compile_features(aisb_core PUBLIC cxx_std_20)

add_executable(aisb-cli src/main.cpp)
target_link_libraries(aisb-cli PRIVATE aisb_core)

if(AISB_BUILD_TESTS)
    enable_testing()
    add_executable(aisb-core-smoke tests/native/core_smoke.cpp)
    target_link_libraries(aisb-core-smoke PRIVATE aisb_core)
    add_test(NAME aisb-core-smoke COMMAND aisb-core-smoke)
endif()

install(TARGETS aisb-cli RUNTIME DESTINATION bin)
