# Setup your development database

## Steps overview

1. Setup and run Postgres Docker image on your machine
1. Get a dump and use `pg_restore` to load the database on your local database

### 1. Setup Postgres on your machine

You can run Postgres locally by using Docker, ensuring that Postgres
behaves in a predictable manner, regardless of your individual machine.

1. Install Docker Desktop from the official website
1. Create account + Setup + Follow instructions
1. To pull down an image for the latest stable release of Postgres, hit `docker pull postgres`
1. Create a directory where your Postgres database will save its data: `mkdir -p $HOME/docker/volumes/careers`
1. Install the Postgres client locally (but don't bother running Postgres directly on your machine - we'll do that with Docker): `brew install postgres`. Now you can use the `psql` command.
1. Hit `npm db:run` which will run our docker script, setting up the db in a docker instance
1. You can access the using `psql`.

```bash
psql -h localhost -U testuser -d careeers # password: testpassword
```

### 2. In progress...lol

Ask karming for the dump file
