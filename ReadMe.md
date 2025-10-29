# Partners client application

This is an application, to allow users to view partners.

## How to use the application

Run application unit tests and acceptance tests

```
task web:test      # Run client unit tests
task web:start     # Start the application for the acceptance tests
task accept:test   # Run application acceptance tests
```

If you don't have [`taskfile`](https://taskfile.dev/), execute:

```
cd web/
yarn install
yarn vitest --run
cd ../

cd acceptance/
yarn install
yarn run playwright test
```

## Design decisions:

- I added unit tests to my application workspace, using `vitest`.
- I encapsulated common developer tasks, using [`taskfile`](https://taskfile.dev/). IMHO a better alternative to
  `Makefile`.
- I ran unit tests in github action, to verify the setup can be executed on a machine
  other than my local work station.
- I added a secondary workspace to run acceptance tests in.
- I downgraded `vitest` from `4.0.4` to `3.2.4`, because of a bug in WebStorm IDE:
  https://youtrack.jetbrains.com/issue/WEB-75191/No-tests-found-when-running-Vitest-4-tests
  When the bug is fixed, update to newest `vitest` is encouraged.
- I create a smoke test, that expects to read the application on `http://localhost:8080/`. The tests
  now fail, because the application is not started, and that test-drives me to start the application process.
- I served an empty webpage bundled with `vite`, so that the smoke test can access it.
  **First deliverable**, the application is served at an open port.
