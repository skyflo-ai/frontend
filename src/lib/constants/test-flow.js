export const testFlow = {
  nodes: [
    {
      id: "1",
      data: {
        label: "Route 53",
        service: "AmazonRoute53",
      },
      position: {
        x: 250,
        y: 50,
      },
      type: "custom",
    },
    {
      id: "2",
      data: {
        label: "Region A",
        service: "Region",
      },
      position: {
        x: 100,
        y: 150,
      },
      type: "custom",
    },
    {
      id: "3",
      data: {
        label: "VPC A",
        service: "AmazonVirtualPrivateCloud",
      },
      position: {
        x: 100,
        y: 250,
      },
      type: "custom",
    },
    {
      id: "4",
      data: {
        label: "Public Subnet A",
        service: "Publicsubnet",
      },
      position: {
        x: 50,
        y: 350,
      },
      type: "custom",
    },
    {
      id: "5",
      data: {
        label: "Private Subnet A",
        service: "Privatesubnet",
      },
      position: {
        x: 150,
        y: 350,
      },
      type: "custom",
    },
    {
      id: "6",
      data: {
        label: "ALB A",
        service: "ElasticLoadBalancingApplicationLoadBalancer",
      },
      position: {
        x: 100,
        y: 450,
      },
      type: "custom",
    },
    {
      id: "7",
      data: {
        label: "EC2 A",
        service: "AmazonEC2",
      },
      position: {
        x: 100,
        y: 550,
      },
      type: "custom",
    },
    {
      id: "8",
      data: {
        label: "RDS A",
        service: "AmazonRDS",
      },
      position: {
        x: 100,
        y: 650,
      },
      type: "custom",
    },
    {
      id: "9",
      data: {
        label: "Region B",
        service: "Region",
      },
      position: {
        x: 400,
        y: 150,
      },
      type: "custom",
    },
    {
      id: "10",
      data: {
        label: "VPC B",
        service: "AmazonVirtualPrivateCloud",
      },
      position: {
        x: 400,
        y: 250,
      },
      type: "custom",
    },
    {
      id: "11",
      data: {
        label: "Public Subnet B",
        service: "Publicsubnet",
      },
      position: {
        x: 350,
        y: 350,
      },
      type: "custom",
    },
    {
      id: "12",
      data: {
        label: "Private Subnet B",
        service: "Privatesubnet",
      },
      position: {
        x: 450,
        y: 350,
      },
      type: "custom",
    },
    {
      id: "13",
      data: {
        label: "ALB B",
        service: "ElasticLoadBalancingApplicationLoadBalancer",
      },
      position: {
        x: 400,
        y: 450,
      },
      type: "custom",
    },
    {
      id: "14",
      data: {
        label: "EC2 B",
        service: "AmazonEC2",
      },
      position: {
        x: 400,
        y: 550,
      },
      type: "custom",
    },
    {
      id: "15",
      data: {
        label: "RDS B",
        service: "AmazonRDS",
      },
      position: {
        x: 400,
        y: 650,
      },
      type: "custom",
    },
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "custom",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      type: "custom",
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "custom",
    },
    {
      id: "e3-5",
      source: "3",
      target: "5",
      type: "custom",
    },
    {
      id: "e4-6",
      source: "4",
      target: "6",
      type: "custom",
    },
    {
      id: "e5-7",
      source: "5",
      target: "7",
      type: "custom",
    },
    {
      id: "e3-8",
      source: "3",
      target: "8",
      type: "custom",
    },
    {
      id: "e1-9",
      source: "1",
      target: "9",
      type: "custom",
    },
    {
      id: "e9-10",
      source: "9",
      target: "10",
      type: "custom",
    },
    {
      id: "e10-11",
      source: "10",
      target: "11",
      type: "custom",
    },
    {
      id: "e10-12",
      source: "10",
      target: "12",
      type: "custom",
    },
    {
      id: "e11-13",
      source: "11",
      target: "13",
      type: "custom",
    },
    {
      id: "e12-14",
      source: "12",
      target: "14",
      type: "custom",
    },
    {
      id: "e10-15",
      source: "10",
      target: "15",
      type: "custom",
    },
  ],
};
