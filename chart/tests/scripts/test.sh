#!/bin/bash
set -ex

export HOME=/test

kubectl get ns

echo "All tests complete!"
