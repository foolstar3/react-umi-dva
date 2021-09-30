FROM registry-dev.uihcloud.cn/tc-team/react:1.1

WORKDIR /mnt

COPY package*.json /mnt/

RUN yarn config set registry https://nexus.uihcloud.cn/repository/npm-group/ \
  && yarn install

