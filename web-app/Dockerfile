FROM node:18-alpine AS builder
WORKDIR /lensview-beta-docker
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --omit dev

FROM node:18-alpine
USER node:node
WORKDIR /lensview-beta-docker
COPY --from=builder --chown=node:node /lensview-beta-docker/build ./build
COPY --from=builder --chown=node:node /lensview-beta-docker/node_modules ./node_modules
COPY --chown=node:node package.json .
CMD ["node", "build"]
