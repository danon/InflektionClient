# Partners client application

This is an application, to allow users to view partners.

## How to use the application

Run application unit tests:

```
task web:test
```

If you don't have [`taskfile`](https://taskfile.dev/), execute:

```
yarn install
yarn vitest --run
```

## Design decisions:

- I added unit tests to my application workspace, using `vitest`.
- I ran unit tests in github action, to verify the setup can be executed on a machine
  other than my local work station.
- I added a secondary workspace to run acceptance tests in.
- I downgraded `vitest` from `4.0.4` to `3.2.4`, because of a bug in WebStorm IDE:
  https://youtrack.jetbrains.com/issue/WEB-75191/No-tests-found-when-running-Vitest-4-tests
  When the bug is fixed, update to newest `vitest` is encouraged.
