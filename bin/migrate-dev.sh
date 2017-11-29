#!/usr/bin/env bash
cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../"
truffle compile && truffle migrate --reset
cp -R ./build/contracts ./src