FROM node:latest

# Create working directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and install bot
COPY package.json /usr/src/bot
RUN npm install
COPY . /usr/src/bot

# Start bot
CMD ["node", "main.js"]
