FROM registry-dev.uihcloud.cn/tc-team/react:1.0 AS nodebuilder

WORKDIR /mnt

COPY . /mnt/

RUN yarn config set registry https://nexus.uihcloud.cn/repository/npm-group/ \
  && yarn build-test


FROM registry-dev.uihcloud.cn/com.uih.uplus.base/nginx:1.20.1-alpine

COPY --from=nodebuilder /mnt/dist/  /usr/share/nginx/html/
COPY --from=nodebuilder /mnt/default.conf  /etc/nginx/conf.d/

EXPOSE 9002
