#include <hello.hpp>

ACTION hello::hi(name user) {
  require_auth(user);
  print("Hello, ", name{user});
}
