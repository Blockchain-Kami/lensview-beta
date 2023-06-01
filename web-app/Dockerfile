# Below line are used to create ./build folder,
# which is used to copy the build files from the builder stage.
# This is done to reduce the size of the final image.
FROM node:16.19.0-alpine3.16 AS builder
WORKDIR /lensview-beta-docker
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --omit dev
############################################################

# Below line are used to create the final image.
# Using lightweight Linux distribution based on Alpine Linux.
# https://pptr.dev/troubleshooting#running-on-alpine
FROM alpine
# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

# Copy the build files from the builder stage.
WORKDIR /lensview-beta-docker
COPY --from=builder --chown=pptruser /lensview-beta-docker/build ./build
COPY --from=builder --chown=pptruser /lensview-beta-docker/node_modules ./node_modules
COPY --chown=pptruser package.json .
CMD ["node","build"]
