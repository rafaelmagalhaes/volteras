# React + TypeScript + Vite

Project built using vite cli to generate react project

Tech Stack:

1. react
2. typescript
3. react-data-table library
4. shadcn to create following components
   1. Card
   2. Input
   3. Button
5. tailwind css
6. vite

## Setup project



create `.env` file and add
```bash
VITE_API_URL=http://localhost:3000/api
```
this should be the url where the backend is running on

## Docker

once you created `.env` file you can run

```bash
docker compose up --build -d
```
the `-d` will make sure it runs in the background, now you just need to run the same command in backend folder to start the backend services


### Local development

Install packages

```bash
npm install
```

Run dev server

```bash
npm run dev
```
