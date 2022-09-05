#!/bin/bash

cd front
yarn build

cd ../

rm -rf static/*
cp -r front/build/* static

go build
