docker run -p 8080:8080 \
    -e HASURA_GRAPHQL_ADMIN_SECRET="myadminsecretkey" \
    hasura/graphql-engine:latest \
    graphql-engine \
    --database-url postgres://postgres:postgrespassword@postgres:5432/postgres \
    serve