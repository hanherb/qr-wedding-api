FROM node:14-alpine as builder
ENV NODE_OPTIONS="--max-old-space-size=4028"
ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node
RUN apk add git --no-cache
RUN npm ci \
    && npm run build
# ---

FROM node:14-alpine

ENV NODE_ENV production

WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN npm i --production
EXPOSE 3000

CMD ["node", "dist/main.js"]
