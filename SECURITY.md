# Security Guidelines

## Environment Files Location
- **Place environment files (e.g., `.env`) in the root of the project**. These files are critical for the configuration of the application and should be handled with care. E.g. docker compose uses the secrets from the env file to configure the containers.

## Access to Environment Files
- To gain access to the environment files, **contact the project administrator**. They will provide you with the necessary permissions or access credentials.

## Never Commit Environment Files
- **Never commit environment files to version control (e.g., Git)**. These files often contain sensitive information such as API keys, database credentials, and other private data. Always ensure that the `.env` files are added to `.gitignore` to prevent accidental commits.

## Best Practices
- **Use environment variables** securely and ensure they are kept private to maintain the integrity and security of the application.
