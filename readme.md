<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">


<h3 align="center">Tv Show Recommender</h3>

  <p align="center">
    The primary goal of the website is to fetch the users completed tv shows from the Anilist api, allow the user to change ratings/delete shows,
    then recommend tv shows based off of their completed tv shows and ratings. All of the tv shows and recommendations are stored in a MongoDB database and tied to the users account.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][bot-screenshot]

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [NodeJS](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)
* [ReactJS](http://reactjs.org/)
* [ExpressJS](http://expressjs.com/)
* [Python](https://www.python.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

 The following versions of software were used:  
 
 [NodeJS v16.15.0](https://nodejs.org/download/release/v16.15.0/)  
 
 [npm 8.5.5](https://www.npmjs.com/package/npm/v/8.5.0)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Jake-Andrews/recommender.git 
   ```
2. Install backend modules:
   ```sh
   npm install
   ```
3. Install frontend modules:
   ```sh
   cd frontend
   npm install
   ```
4. Create a .env file in the root and add the following:
   ```js
   MONGO_URI=
   PORT=
   NODE_ENV=development
   JWT_SECRET=
   
   ```
4. To run the discord bot on windows cd to the root directory and type:
   ```js
   npm run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

![Product Name Screen Shot][bot-screenshot]
![Product Name Screen Shot][bot-screenshot1]
![Product Name Screen Shot][bot-screenshot2]
![Product Name Screen Shot][bot-screenshot3]

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add pagination for the list of completed shows
- [ ] Allow the user to save more than one list of completed shows and recommendations
- [ ] Rework the recommendation algorithm


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[bot-screenshot]: images/basic_usage.PNG?raw=true
[bot-screenshot1]: images/basic_usage1.PNG?raw=true
[bot-screenshot2]: images/basic_usage2.PNG?raw=true
[bot-screenshot3]: images/basic_usage3.PNG?raw=true
