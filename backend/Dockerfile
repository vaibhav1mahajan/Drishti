FROM oven/bun:1
WORKDIR /app

COPY package.json tsconfig.json ./
RUN bun install

COPY src ./src
EXPOSE 5050
CMD ["bun","src/index.ts"]
