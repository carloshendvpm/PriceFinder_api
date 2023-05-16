![workflow](https://github.com/carloshendvpm/PriceFinder_api/actions/workflows/ci.yml/badge.svg)
# PriceFinder

PriceFinder is a Node.js API that allows the registration of supermarkets, products, product prices, and product categories. This project uses technologies such as Express, Prisma, Docker, Jest, and TypeScript. Continuous integration is handled through GitHub Actions.

## Technologies Used

- Node.js
- Express
- Prisma
- Docker
- Jest
- TypeScript
- GitHub Actions

## Prerequisites

Before you begin, you will need to have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Yarn](https://yarnpkg.com/getting-started/install) or [NPM](https://www.npmjs.com/get-npm)

## How to Use

```bash
# Clone this repository
$ git clone https://github.com/your_username/pricefinder

# Go into the repository folder
$ cd pricefinder

# Install dependencies
$ yarn

# Run the application in development mode
$ yarn dev

# The server will start on port 3000 - go to http://localhost:3000 
```

## Running the Tests

```bash
# Run the tests
$ yarn test
```

## Docker

This project uses Docker. To build and run the project container, follow the steps below:

```bash
# Build the image
$ docker build -t pricefinder .

# Run the container
$ docker run -p 3000:3000 pricefinder
```

## Contributing

Contributions are always welcome! To contribute, please:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Add your changes (`git add .`)
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Contact

Carlos Henrique - @carloshendvpm - hencarlosdv@gmail.com
