# Self-hosting Camunda 8

This project provides an easy way to self-host Camunda 8 with all services and a custom UI. The application is split into multiple services, each handled in its own directory under `/src`, and can be easily run using Docker Compose and Spring Boot.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Starting the Application](#starting-the-application)
5. [UI Development](#ui-development)
6. [Service Development](#service-development)
7. [Useful Commands](#useful-commands)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop) (for running containers)
- [Docker Compose](https://docs.docker.com/compose/install/) (to manage multi-container Docker applications)
- [Java 17+](https://adoptopenjdk.net/) (required for Spring Boot services)
- [Maven](https://maven.apache.org/) (for building and running Spring Boot services)
- [Node.js](https://nodejs.org/en/) (for UI development)
- [npm](https://www.npmjs.com/) (for managing Node packages)

## Project Structure

The project is structured as follows:

```
/project-root
├── /src
│   ├── /health-management     (Spring Boot app)
│   ├── /userportal            (Spring Boot app)
│   ├── /ui                    (React + Vite-based UI)
│
├── docker-compose.yml         # Docker Compose file to start all services
```

- `/src/health-management`, `/src/userportal`: These directories contain the Spring Boot services that make up your backend.
- `/src/ui`: This folder contains the frontend, built using React and Vite.
- `docker-compose.yml`: Defines how to run all the services (including Camunda 8 and any other required services) using Docker.

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/camunda-nextgen.git
cd camunda-nextgen
```

### 2. Install Dependencies

#### Backend (Spring Boot Services)

In each service folder (e.g., `/src/health-management`), install dependencies using Maven:

```bash
cd src/health-management
./mvnw clean package
```

Repeat this for all backend services inside the `/src` folder.

#### Frontend (React + Vite UI)

In the `src/ui` folder, install the required dependencies:

```bash
cd src/ui
npm install
```
## Starting the Application

### 1. Start Docker Compose Stack

To bring up all services, including Camunda 8, use Docker Compose. From the root of your project:

```bash
docker-compose up
```

This will pull the necessary Docker images and start all containers (including Camunda and your services). The process may take some time, depending on the size of the images.

### Services Overview

Here is a brief description of each service:

#### `init`
- **Purpose**: Initializes system settings for OpenSearch (sets `vm.max_map_count`).
- **Usage**: Prepares the system for OpenSearch by adjusting the kernel parameters.

#### `db` (Postgres)
- **Purpose**: A PostgreSQL database for storing data used by services like Keycloak.
- **Usage**: Provides storage for user data and authentication sessions.

#### `zeebe`
- **Purpose**: A distributed workflow engine for BPMN (Business Process Model and Notation).
- **Usage**: Executes workflows and integrates with services like Operate, Tasklist, and Optimize.

#### `operate`
- **Purpose**: A web-based tool for monitoring Zeebe workflows.
- **Usage**: Visualizes workflow data, provides insights, and helps track workflow execution.

#### `tasklist`
- **Purpose**: A task management interface for interacting with tasks in Zeebe workflows.
- **Usage**: Allows users to claim, complete, and manage tasks within Zeebe workflows.

#### `connectors`
- **Purpose**: Provides out-of-the-box connectors for integrating Zeebe with external systems (e.g., HTTP, databases).
- **Usage**: Facilitates the connection of Zeebe workflows to other systems, enabling external service integrations.

#### `optimize`
- **Purpose**: A tool for tracking and analyzing Zeebe workflow performance.
- **Usage**: Monitors, reports, and analyzes Zeebe workflow execution to identify bottlenecks and optimize process flows.

#### `identity`
- **Purpose**: Manages user identities and integrates with Keycloak for authentication and authorization.
- **Usage**: Handles OAuth2 and OpenID Connect-based authentication and authorizes user access to Camunda Platform components.

#### `postgres` (for Keycloak)
- **Purpose**: A PostgreSQL instance for storing Keycloak user and session data.
- **Usage**: Provides a database backend for Keycloak to manage user identities and authentication.

#### `keycloak`
- **Purpose**: Identity and access management system for the Camunda Platform.
- **Usage**: Centralized authentication service, using OAuth2 and OpenID Connect for secure access control across the platform.

#### `opensearch`
- **Purpose**: A distributed search and analytics engine.
- **Usage**: Stores logs and provides real-time search and analytics, primarily used by services like Operate and Optimize.

#### `elasticsearch`
- **Purpose**: An alternative to OpenSearch, also used for search and analytics.
- **Usage**: Similar to OpenSearch, Elasticsearch stores and analyzes log and performance data.

#### `kibana`
- **Purpose**: A data visualization tool for Elasticsearch.
- **Usage**: Provides dashboards and visual representations of data stored in Elasticsearch, allowing for easy monitoring and analysis.

## Volumes
The services make use of Docker volumes for persistent data storage:
- `zeebe`
- `elastic`
- `opensearch-data`
- `postgres`
- `keycloak-theme`
- `kibana`
- `operate_tmp`
- `tasklist_tmp`

## Networks
There are two bridge networks:
- `camunda-platform`: Used by all the platform services like Zeebe, Operate, Tasklist, etc.
- `identity-network`: Specifically for identity-related services like Keycloak and Identity.

For more details on each service confi



### 2. Start Spring Boot Services

In addition to Docker Compose, you can also run each Spring Boot service locally by navigating to each service folder and running:

```bash
cd src/service1
./mvnw spring-boot:run
```

Repeat this for all services you wish to run locally.

### 3. Start the UI

Once the backend services are running, you can start the React-based UI. Navigate to the `src/ui` folder and run:

```bash
cd src/ui
npm run dev
```

This will start the frontend server on `http://localhost:3000`.

## UI Development

The UI is built using React and Vite. Here are the commands you'll need for working on the frontend:

- **Install dependencies** (if not done yet):
  ```bash
  npm install
  ```

- **Run the development server**:
  ```bash
  npm run dev
  ```
  This will start a local development server at `http://localhost:3000`.

- **Build the production version**:
  ```bash
  npm run build
  ```
  This will create an optimized production build in the `/dist` folder.

## Service Development

Each backend service is a Spring Boot application. You can run them independently for development and debugging using the following command inside each service directory:

```bash
./mvnw spring-boot:run
```

This will start the service on the default port (usually `8080`), and you can test it via the browser or Postman, depending on the service.

If you want to run all services together, it's recommended to use Docker Compose.

## Useful Commands

Here are some of the most common commands to manage your project:

### Docker Commands

- **Start all services** (using Docker Compose):
  ```bash
  docker-compose up
  ```

- **Start services in the background**:
  ```bash
  docker-compose up -d
  ```

- **Stop all services**:
  ```bash
  docker-compose down
  ```

- **View logs of a specific service**:
  ```bash
  docker-compose logs [service-name]
  ```

- **Build and start services with changes**:
  ```bash
  docker-compose up --build
  ```

### Spring Boot Commands

- **Run a Spring Boot service** (e.g., Service 1):
  ```bash
  cd src/service1
  ./mvnw spring-boot:run
  ```

### React Commands

- **Install Node.js dependencies** (frontend):
  ```bash
  cd src/ui
  npm install
  ```

- **Run the UI in development mode**:
  ```bash
  npm run dev
  ```

- **Build the UI for production**:
  ```bash
  npm run build
  ```

## Troubleshooting

- **Docker Compose not starting properly**: Ensure that Docker is running and the Docker daemon is properly configured.
  
- **Service not responding**: Check the logs of the individual services with `docker-compose logs [service-name]`.

- **React UI not showing up**: Verify that the UI server is running on `http://localhost:3000`, and check the browser's console for any errors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.