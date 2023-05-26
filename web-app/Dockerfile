FROM node:16.19.0-alpine3.16 AS builder
WORKDIR /lensview-beta
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --omit dev

FROM node:16.19.0-alpine3.16
USER node:node
WORKDIR /lensview-beta
COPY --from=builder --chown=node:node /lensview-beta/build ./build
COPY --from=builder --chown=node:node /lensview-beta/node_modules ./node_modules
COPY --chown=node:node package.json .
CMD ["node","build"]
