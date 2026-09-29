// USD per vCPU-hour and GB-hour for AWS Fargate on Linux/x86.
// On-demand: AWS AmazonECS Price List Bulk API, verified 2026-09-29.
// Fargate Spot: AWS pricing page feed, retrieved 2026-09-29 21:41 UTC; rates can change.
export default [
    {
        "region": "ca-central-1",
        "description": "Canada (Central)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04456,
                "ram": 0.004865
            },
            "FARGATE_SPOT": {
                "cpu": 0.013368,
                "ram": 0.0014595
            },
        }
    },
    {
        "region": "eu-west-1",
        "description": "EU (Ireland)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04048,
                "ram": 0.004445
            },
            "FARGATE_SPOT": {
                "cpu": 0.01225536,
                "ram": 0.00134573
            },
        }
    },
    {
        "region": "eu-west-2",
        "description": "EU (London)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04656,
                "ram": 0.00511
            },
            "FARGATE_SPOT": {
                "cpu": 0.01468459,
                "ram": 0.00161165
            },
        }
    },
    {
        "region": "sa-east-1",
        "description": "South America (Sao Paulo)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0696,
                "ram": 0.0076
            },
            "FARGATE_SPOT": {
                "cpu": 0.02199254,
                "ram": 0.00240148
            },
        }
    },
    {
        "region": "ap-northeast-2",
        "description": "Asia Pacific (Seoul)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04656,
                "ram": 0.00511
            },
            "FARGATE_SPOT": {
                "cpu": 0.013968,
                "ram": 0.001533
            },
        }
    },
    {
        "region": "af-south-1",
        "description": "Africa (Cape Town)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0546,
                "ram": 0.006
            },
            "FARGATE_SPOT": {
                "cpu": 0.01638,
                "ram": 0.0018
            },
        }
    },
    {
        "region": "eu-west-3",
        "description": "EU (Paris)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0486,
                "ram": 0.0053
            },
            "FARGATE_SPOT": {
                "cpu": 0.01464299,
                "ram": 0.00159687
            },
        }
    },
    {
        "region": "us-west-2",
        "description": "US West (Oregon)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04048,
                "ram": 0.004445
            },
            "FARGATE_SPOT": {
                "cpu": 0.01258905,
                "ram": 0.00138237
            },
        }
    },
    {
        "region": "ap-southeast-2",
        "description": "Asia Pacific (Sydney)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04856,
                "ram": 0.00532
            },
            "FARGATE_SPOT": {
                "cpu": 0.01520795,
                "ram": 0.00166611
            },
        }
    },
    {
        "region": "ap-northeast-1",
        "description": "Asia Pacific (Tokyo)",
        "prices": {
            "FARGATE": {
                "cpu": 0.05056,
                "ram": 0.00553
            },
            "FARGATE_SPOT": {
                "cpu": 0.01563522,
                "ram": 0.0017101
            },
        }
    },
    {
        "region": "us-gov-east-1",
        "description": "AWS GovCloud (US-East)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0486,
                "ram": 0.0053
            },
            "FARGATE_SPOT": {
                "cpu": 0.01458,
                "ram": 0.00159
            },
        }
    },
    {
        "region": "us-gov-west-1",
        "description": "AWS GovCloud (US)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0486,
                "ram": 0.0053
            },
            "FARGATE_SPOT": {
                "cpu": 0.01458,
                "ram": 0.00159
            },
        }
    },
    {
        "region": "eu-north-1",
        "description": "EU (Stockholm)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0445,
                "ram": 0.0049
            },
            "FARGATE_SPOT": {
                "cpu": 0.01342378,
                "ram": 0.00147812
            },
        }
    },
    {
        "region": "us-west-1",
        "description": "US West (N. California)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04656,
                "ram": 0.00511
            },
            "FARGATE_SPOT": {
                "cpu": 0.01437645,
                "ram": 0.00157783
            },
        }
    },
    {
        "region": "ap-south-1",
        "description": "Asia Pacific (Mumbai)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04256,
                "ram": 0.004655
            },
            "FARGATE_SPOT": {
                "cpu": 0.01344511,
                "ram": 0.00147056
            },
        }
    },
    {
        "region": "us-east-2",
        "description": "US East (Ohio)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04048,
                "ram": 0.004445
            },
            "FARGATE_SPOT": {
                "cpu": 0.01539807,
                "ram": 0.00169082
            },
        }
    },
    {
        "region": "ap-east-1",
        "description": "Asia Pacific (Hong Kong)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0556,
                "ram": 0.0061
            },
            "FARGATE_SPOT": {
                "cpu": 0.01668,
                "ram": 0.00183
            },
        }
    },
    {
        "region": "eu-south-1",
        "description": "EU (Milan)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0486,
                "ram": 0.0053
            },
            "FARGATE_SPOT": {
                "cpu": 0.01458,
                "ram": 0.00159
            },
        }
    },
    {
        "region": "ap-southeast-1",
        "description": "Asia Pacific (Singapore)",
        "prices": {
            "FARGATE": {
                "cpu": 0.05056,
                "ram": 0.00553
            },
            "FARGATE_SPOT": {
                "cpu": 0.01544659,
                "ram": 0.00168947
            },
        }
    },
    {
        "region": "eu-central-1",
        "description": "EU (Frankfurt)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04656,
                "ram": 0.00511
            },
            "FARGATE_SPOT": {
                "cpu": 0.01441236,
                "ram": 0.00158177
            },
        }
    },
    {
        "region": "us-east-1",
        "description": "US East (N. Virginia)",
        "prices": {
            "FARGATE": {
                "cpu": 0.04048,
                "ram": 0.004445
            },
            "FARGATE_SPOT": {
                "cpu": 0.01288561,
                "ram": 0.00141493
            },
        }
    },
    {
        "region": "me-south-1",
        "description": "Middle East (Bahrain)",
        "prices": {
            "FARGATE": {
                "cpu": 0.0526,
                "ram": 0.0058
            },
            "FARGATE_SPOT": {
                "cpu": 0.0162103,
                "ram": 0.00178745
            },
        }
    }
]