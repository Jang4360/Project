#1. 운영체제 및 프로그램 설치 (하나하나 입력하는 방식)
# FROM ubuntu:22.04
# RUN sudo apt install nodejs
# RUN sudoo npm install -g yarn 

#1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn 까지 모두 깔려있는 컴퓨터 다운로드하는 방식)
# FROM node:14
FROM docker.io/library/node:16.20.1

#2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기 
COPY package.json /myfolder/
COPY yarn.lock /myfolder/
# RUN cd ./myfolder/ => workdir로 대체 (myfolder로 이동 후, yarn install 실행) 
WORKDIR /myfolder/
#버전을 맞추기 위해 node_modules를 따로 만들어줌 
RUN yarn install 

COPY . /myfolder/


#3. 도커안에서 index.js 실행시키기 
CMD yarn start:dev 
