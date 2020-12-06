- Run test:
  - docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
- Run "production" version

  - docker-compose -f docker-compose.yaml up --build --abort-on-container-exit

- It's important that you specify that docker-compose aborts when container exits for shutdown state to work correctly.
