# Instruction pour spécifier l'image de base
FROM node

# Instruction pour définir le répertoire de travail dans l'image
WORKDIR /app

# Instruction pour copier des fichiers de l'hôte vers l'image
# COPY package*.json ./
COPY . /app

# Instruction pour exécuter une commande pendant la construction de l'image
RUN npm install
RUN npm install nodemon

# Instruction pour exposer un port du conteneur
EXPOSE 5000

# Instruction pour spécifier la commande par défaut à exécuter lors du démarrage du conteneur
# CMD

# Instruction pour définir un volume
# VOLUME /app/data

ENTRYPOINT [ "node", "index.js" ]