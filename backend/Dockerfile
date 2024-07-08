FROM node:alpine AS builder

WORKDIR /src

COPY package.json /src/
COPY package-lock.json /src/

RUN npm install
# copy rest of files to the workdir
ADD . /src

# build the project
RUN npm run build
#
## start final image
FROM node:alpine

WORKDIR /src

## copy over build files from builder step
COPY --from=builder /src/.output  src/.output

ENV HOST 0.0.0.0
EXPOSE 3000
## run the build project with node
ENTRYPOINT ["node", "src/.output/server/index.mjs", "--", "--host","0.0.0.0"]