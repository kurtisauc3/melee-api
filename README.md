<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h1 align="center">Melee Api</h3>

  <p align="center">
    An express api for the windows melee client
    <br />
    <a href="https://github.com/kurtisauc3/melee-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/kurtisauc3/melee-api/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project


### Built With

* [NodeJS 10.22.1](https://nodejs.org/en/)
* [ExpressJS 4.17.1](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [SocketIO 2.3.0](https://socket.io/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```
* [Auth0 Client](https://auth0.com/blog/securing-electron-applications-with-openid-connect-and-oauth-2/?_ga=2.70585232.1042524595.1604766759-829895036.1603478319)
* [Mongo Database (see resources for custom auth0 functions)](https://auth0.com/blog/auth0-tutorials-using-mongodb-atlas-as-a-custom-database/)
### Installation

1. Clone the repo
```sh
git clone https://github.com/kurtisauc3/melee-api.git
```
2. Change directory
```sh
cd melee-api
```
3. Install NPM packages
```sh
npm install
```
4. Create env-variables.json with your information, as well as update your auth0 custom database connection and functions
```
{
  "auth0Domain": "<YOUR_AUTH0_DOMAIN>",
  "apiIdentifier": "<YOUR_AUTH0_API_IDENTIFER>",
  "mongoUrl": "<YOUR_MONGO_URL>"
}
```
5. Build for development
```sh
npm start
```



<!-- USAGE EXAMPLES -->
## Usage

to-do



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/kurtisauc3/melee-api/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/kurtisauc3/melee-api](https://github.com/kurtisauc3/melee-api)





<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/kurtisauc3/repo.svg?style=flat-square
[contributors-url]: https://github.com/kurtisauc3/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kurtisauc3/repo.svg?style=flat-square
[forks-url]: https://github.com/kurtisauc3/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/kurtisauc3/repo.svg?style=flat-square
[stars-url]: https://github.com/kurtisauc3/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/kurtisauc3/repo.svg?style=flat-square
[issues-url]: https://github.com/kurtisauc3/repo/issues
[license-shield]: https://img.shields.io/github/license/kurtisauc3/repo.svg?style=flat-square
[license-url]: https://github.com/kurtisauc3/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png
