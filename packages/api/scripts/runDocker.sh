# refer to https://hackernoon.com/dont-install-postgres-docker-pull-postgres-bee20e200198
# docker exec <container_name> pg_dump -U <user> --column-inserts --data-only  <schema_name> > inserts.sql
# psql -h localhost -U testuser -d sneakers #password is testpassword
(
    docker run --rm --name pg-careeers-docker -e POSTGRES_PASSWORD=testpassword -e POSTGRES_USER=testuser -e POSTGRES_DB=careeers -d -p 5432:5432 -v $HOME/docker/volumes/careeers:/var/lib/postgresql/data  postgres
)