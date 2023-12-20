# Structure of the Desktop App

The desktop application will be structured in the following way:

```makefile
./desktop/
 │
 ├── src/                # Source files
 │   ├── main.cpp        # Main application entry point
 │   ├── UI/             # User Interface files
 │   │   ├── MainWindow/
 │   │   └── Widgets/
 │   │
 │   ├── Network/        # Networking related files
 │   │   ├── ApiClient.cpp
 │   │   └── Endpoints.h
 │   │ 
 │   ├── Auth/           # Authentication related files
 │   │   ├── LoginManager.cpp
 │   │   └── SessionManager.cpp
 │   │
 │   ├── Business/       # Business logic
 │   │   ├── DataManager.cpp
 │   │   └── Models/
 │   │
 │   └── Utils/          # Utility functions
 │       └── Helpers.cpp
 │
 ├── include/            # Header files
 │   ├── UI/
 │   ├── Network/
 │   ├── Auth/
 │   ├── Business/
 │   └── Utils/
 │
 ├── tests/              # Test cases
 │   ├── NetworkTests/
 │   ├── AuthTests/
 │   └── BusinessTests/
 │
 ├── lib/                # External libraries
 │
 ├── assets/             # Images, fonts, and other static assets
 │
 └── CMakeLists.txt      # CMake project configuration
```
