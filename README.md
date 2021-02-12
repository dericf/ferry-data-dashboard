# Ferry Data Dashboard

## Run locally for development

1. Clone the repository
2. Create a `.env.local` file and add the following env vars
```python
STAGING_HASURA_GRAPHQL_ADMIN_SECRET
HASURA_GRAPHQL_ADMIN_SECRET
NEXT_PUBLIC_API_SERVER_URL
DASHBOARD_PASSWORD
DEMO_DASHBOARD_PASSWORD
GRAPHQL_ENDPOINT
ENVIRONMENT=dev
```
3. run `npm install`
4. run `npm run dev`