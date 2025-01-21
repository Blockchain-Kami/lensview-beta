# Below line are used to create ./build folder,
# which is used to copy the build files from the builder stage.
# This is done to reduce the size of the final image.
FROM node:16.19.0-alpine3.16 AS builder
WORKDIR /lensview-beta-backend-docker
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run prod-build
RUN npm ci --omit dev
############################################################

# Below line are used to create the final image.
# Using lightweight Linux distribution based on Alpine Linux.
FROM node:16.19.0-alpine3.16

# Copy the build files from the builder stage.
WORKDIR /lensview-beta-backend-docker
COPY --from=builder /lensview-beta-backend-docker/dist ./dist
COPY --from=builder /lensview-beta-backend-docker/node_modules ./node_modules
COPY package.json .

# Run the Node.js server.
CMD ["node", "dist/app.js"]
