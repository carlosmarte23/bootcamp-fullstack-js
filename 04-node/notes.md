# Module 04 — Node

Our next step is to learn Node.js. This is a JavaScript runtime environment that allows us to run JavaScript code outside the browser using the V8 engine. With Node.js, we can use JavaScript to create web applications and APIs, and to build command-line tools. In the bootcamp well start by learning the basics of Node by building simple scripts, using the modern ESM module system, creating a mini CLI and a simple web server.

## Environment variables (.env)

This module uses environment variables to configure the server port.

Important rules:

- The real `.env` file is **ignored by Git** and should not be committed.
- A `.env.example` file is committed so others can see which variables are required.

### Current variables

- `PORT="1243"`

### Setup

Create your local `.env` file from the example:

macOS/Linux:
cp .env.example .env

Windows PowerShell:
Copy-Item .env.example .env

Then edit `.env` and adjust the values if needed.
