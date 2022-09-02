#!/bin/bash

cd front
yarn build

cd ../

cp -r front/build/* static

go build
