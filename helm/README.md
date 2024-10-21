# Helm charts

## Camunda Helm Chart Deployment Guide

### Prerequisites

Before deploying Camunda using Helm, ensure you have the following:

1. **Kubernetes Cluster**: This can be a local cluster, a cloud platform cluster, or an on-premises cluster.
2. **Helm**: Make sure Helm is installed on your system.
3. **Kubectl CLI**: This command-line tool is required to interact with your Kubernetes cluster.
4. **Helm Repository**: Add the Camunda Helm chart repository to use the charts.

```bash
  helm repo add camunda https://helm.camunda.io
  helm repo update
```


Install helm chart

```bash
 helm upgrade --install camunda camunda/camunda-platform --values ./camunda-8.6.yml
```

