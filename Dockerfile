FROM node:latest

ARG token

# Create working directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and install bot
COPY package.json /usr/src/bot
RUN npm install
RUN echo '{ "token" : "'"$token"'" }' > secret_settings.json
COPY . /usr/src/bot

# Start bot
CMD ["node", "main.js"]
