# SecureWorks UI Code Challenge

This project is an Angular application integrated with GitHub OAuth. It uses a NestJS backend to exchange the access token and then uses the token to call the GitHub GraphQL APIs. 

The application features:

- Displaying a list of repositories in a tabular format using ag-Grid.
- Data visualization using D3 to draw a bar chart displaying the top 5 starred repos.
- State management using Angular Signal Store.
- Apollo Angular Client for accessing GitHub GraphQL API
- TailwindCSS for styling
- Storybook for Component Design System
- Nx for Integrated Monorepo

## Prerequisites
- Node 20.10.0
- Nx 19.5.6
- GitHub account and OAuth app configured.

# Getting Started

## Install Dependencies

```npm install```

## Development server

```
npx nx run-many --target=serve --projects=backend,ng-challenge 
```

Run above for running frontend & backend dev server. Navigate to `http://localhost:4200/` for frontend. The application will automatically reload if you change any of the source files.
