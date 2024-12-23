# 🎉 **Setup and Running erp-be Application**

This guide will help you set up and run the **erp-be** application using Docker and the `run-arm.sh` script. Follow the steps below to get started!

&nbsp;

## 🚀 Prerequisites

Before starting, ensure you have the following software installed:

- **Docker** – Ensure Docker is installed on your system. If not, follow the installation guide [here](https://docs.docker.com/get-docker/).

&nbsp;

## 📝 Steps

### 1. 📥 Clone the Repository

First, clone the **erp-be** repository from GitHub:

```bash
git clone https://github.com/sectenzorg/erp-be
```

After the repository is cloned, navigate to the project directory:

```bash
cd erp-be
```



### 2. ✅ Verify Docker Installation

Ensure Docker is installed and running on your system by checking the version:

```bash
docker --version
```

If Docker is not installed, please download and install Docker Desktop from Docker's official website.



### 3. 🔒 Grant Execute Permissions to `run-arm.sh`

Ensure the `run-arm.sh` script has execute permissions. Run the following command:

```bash
chmod +x run-arm.sh
```


### 4. 🏃 Run the `run-arm.sh` Script

Once the script has execute permissions, you can run the `run-arm.sh` script to build the Docker image and start the container:

```bash
./run-arm.sh
```

#### What the Script Does:
- 🚫 **Stops** and removes any existing container named `erp-be` if it exists.
- 🔨 **Rebuilds** the Docker image based on the `Dockerfile` located in `.devops/Dockerfile`.
- 🚀 **Starts** a new container using the newly built image and maps port 3100 from the container to port 3100 on the host.



### 5. 👀 Verify the Container is Running

After the script completes, verify that the container is running with the following command:

```bash
docker ps
```

This will show a list of running containers. Make sure that the container with the name `erp-be` is listed.


### 6. 🌐 Access the Application

If the application inside the container is listening on port 3100, you can access it in your browser by navigating to:

```
http://localhost:3100
```

If you are accessing from a server or another device, replace `localhost` with the appropriate IP address of the server.


## ⚠️ Notes

- 🛠️ **Docker must be running** on your system for the script to work.
- 🔄 The script **rebuilds** the Docker image every time it runs to ensure that you are using the latest version of the application.

&nbsp;

# 🎯 GitHub Actions for Deployment

This section outlines how to configure GitHub Actions for continuous integration and deployment to Amazon ECS. It will deploy the **erp-be** application on a push to the `main` branch.



## ⏱ Trigger Events

The GitHub Actions workflow is triggered by a **push event** to the `main` branch. This means that every time you push code to `main`, the workflow will run automatically.

```yaml
on:
  push:
    branches:
      - main  # Trigger deployment on push to main branch
```

&nbsp;


## 🔑 Steps for Configuring Secrets in GitHub Actions

To securely store and use AWS credentials in GitHub Actions, you'll need to set up secrets for your AWS credentials and other sensitive data. Here’s how you can create secrets in your repository:

### 1. 🏠 Go to the GitHub Repository

- Navigate to your GitHub repository.

### 2. ⚙️ Open Repository Settings

- In the repository, click on the **Settings** tab (next to the "Insights" tab).

### 3. 🔒 Access Secrets

- Scroll down to the **Secrets and variables** section in the left-hand sidebar.
- Click on **Actions** under **Secrets and variables**.

### 4. ➕ Add a New Secret

- Click the **New repository secret** button.
- Enter a **name** for the secret (e.g., `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `ECR_REPOSITORY`).
- Paste the secret value in the **Value** field.
- Click **Add secret** to save it.

&nbsp;

## 📝 Secrets Needed for the Workflow:

- **AWS_ACCESS_KEY_ID** – Your AWS access key ID.
- **AWS_SECRET_ACCESS_KEY** – Your AWS secret access key.
- **ECR_REPOSITORY** – The name of the Amazon ECR repository **(erp-be-development)** where your Docker images will be pushed. 

&nbsp;


## 🎉 Congratulations!

You are all set to deploy the **erp-be** application using Docker and GitHub Actions. Every time you push code to the `main` branch, GitHub Actions will automatically deploy the updated application to Amazon ECS. 🎉