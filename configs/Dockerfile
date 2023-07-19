FROM node:20.4
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN ./node_modules/./bin/apidoc -i src -o apidoc

EXPOSE 80

ENTRYPOINT [ "/bin/sh" ]

