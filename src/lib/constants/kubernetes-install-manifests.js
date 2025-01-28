export const kubernetesInstallManifests = `# 1) Namespace
apiVersion: v1
kind: Namespace
metadata:
  name: k8s-crawler
---
# 2) ServiceAccount
apiVersion: v1
kind: ServiceAccount
metadata:
  name: k8s-crawler-sa
  namespace: k8s-crawler
---
# 3) ClusterRole (read-only)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: k8s-crawler-role
rules:
- apiGroups: [ "" ]
  resources:
  - namespaces
  - nodes
  - pods
  - services
  - secrets
  - configmaps
  verbs: [ "get", "list", "watch" ]
- apiGroups: [ "apps" ]
  resources:
  - deployments
  - statefulsets
  verbs: [ "get", "list", "watch" ]
- apiGroups: [ "networking.k8s.io" ]
  resources:
  - ingresses
  verbs: [ "get", "list", "watch" ]

---
# 4) ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: k8s-crawler-rolebinding
subjects:
- kind: ServiceAccount
  name: k8s-crawler-sa
  namespace: k8s-crawler
roleRef:
  kind: ClusterRole
  name: k8s-crawler-role
  apiGroup: rbac.authorization.k8s.io
---
# 5) Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: k8s-crawler-deployment
  namespace: k8s-crawler
spec:
  replicas: 1
  selector:
    matchLabels:
      app: k8s-crawler
  template:
    metadata:
      labels:
        app: k8s-crawler
    spec:
      serviceAccountName: k8s-crawler-sa
      containers:
      - name: k8s-crawler-container
        image: "446581829718.dkr.ecr.us-east-1.amazonaws.com/tools:k8s-crawler"
        imagePullPolicy: Always
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"`;
