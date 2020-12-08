- Run test:
  - docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
- Run "production" version

  - docker-compose -f docker-compose.yaml up --build --abort-on-container-exit

- It's important that you specify that docker-compose aborts when container exits for shutdown state to work correctly.

Testing the system:

- Getting logs: Make a GET request to http://localhost:8081/run-log
- Getting state: Make a GET request to http://localhost:8081/state
- Getting messages: Make a GET request to http://localhost:8081/run-log

- Changing state: Make a PUT request to http://localhost:8081/state
  - Payload should JSON and in following form { "state": "PAUSED" }
  - Parameters are : "INIT", "RUNNING", "PAUSED", "SHUTDOWN"
