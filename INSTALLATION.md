# Installation guide

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
├── /.github/workflows         # Github workflows, e.g. release workflow or image push
├── /src
│   ├── /health-management     # Spring Boot app
│   ├── /userportal            # Spring Boot app
│   ├── /ui                    # React + Vite-based UI
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

### 1. Execute run scripts

There are multiple run scripts.

The `run.sh` script is the main entry point for starting the entire project. It orchestrates the execution of the Docker container, the backend services, and the UI. Running `run.sh` will execute the following:

- Start the Docker services using `run-docker.sh`
- Start the backend services located in the `src` directory using `run-backend.sh`
- Start the frontend UI using `run-ui.sh`


The run script can be executed like this

```sh
  chmod +x ./run.sh && ./run.sh
```

If you want to run backend or frontend in different shells you can start the script seperately, it works like the example above.

### 2. Start Docker Compose Stack

To bring up all services, including Camunda 8, use Docker Compose. From the root of your project:

```bash
docker-compose up
```

It is important to mention that the `.env` files should be available before starting the containers. Take a look at [SECURITY.md](./)
 
This will pull the necessary Docker images and start all containers (including Camunda and your services). The process may take some time, depending on the size of the images.

### Services Overview

To get Camunda up and running, we had to use the official Docker Compose YAML file and configure it for our needs. There is already a pre-configured values.yaml. We also wrote shell scripts that are necessary to start the application. For example, the Spring services need to be built and started, and the Docker containers also need to be launched.

To successfully start the Docker containers, local environment files must be set up. The secrets are not committed to the repository. The UI includes a user management system that is integrated with Keycloak. To set this up properly, the UI application must be registered in the Identity service. Then you can configure the client id in the env file. In order for Keycloak to work correctly, the resolve_keycloak.sh script must also be executed.


Not all services listed in the Docker Compose definition are required to run Camunda. We suggest starting with the essential services:

```bash
    docker compose up init db zeebe operate identity postgres keycloak opensearch
```

but you can also choose the ones that best suit your needs

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






### 2. Start Spring Boot Services

In addition to Docker Compose, you can also run the Spring Boot service locally by navigating to each service folder and running:

```bash
cd src/health-management
./mvnw spring-boot:run
```


### 3. Start the UI

Once the backend services are running, you can start the React-based UI. Navigate to the `src/ui` folder and run:

```bash
cd src/ui
npm run dev
```

This will start the frontend server on `http://localhost:5173`.

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
  This will start a local development server at `http://localhost:5173`.

- **Build the production version**:
  ```bash
  npm run build
  ```
  This will create an optimized production build in the `/dist` folder.

## Service Development

You can run the services  for development and debugging using the following command:

```bash
./mvnw spring-boot:run
```

This will start the service on the default port (usually `8080`), and you can test it via the browser or Postman, depending on the service.



## Camunda Identity

The custom ui we build includes a user management that is directly linked to the camunda identy management. So therefore camunda identity needs to be configured properly.
When starting the Identity container the user should register the ui as a custom client application. The given client id can be configured in `keycloak.ts` in the ui project.
When you click on login the applications redirects you to authenticate, afterwards you are redirected to the application where you can proceed.



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

- **React UI not showing up**: Verify that the UI server is running on `http://localhost:5173`, and check the browser's console for any errors.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
