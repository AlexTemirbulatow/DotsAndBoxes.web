# Dots and Boxes

Further development of the game Dots and Boxes as a web application.
The application consists of a Vue.js frontend and a Scala Play backend.

<img src="https://github.com/AlexTemirbulatow/de.htwg.wa.DotsAndBoxes/blob/main/.github/resources/homepage.png" />

<img src="https://github.com/AlexTemirbulatow/de.htwg.wa.DotsAndBoxes/blob/main/.github/resources/gameboard.png" />

Click here to view the <a href="https://docs.google.com/presentation/d/1YrpwBn4b6vXIt88sh1MSPNJsU7vgnV_iSH1vH-02SCw/edit#slide=id.p">project presentation</a>

## Requirements
- Node.js and npm
- sbt (Simple Build Tool)

## Installation and Execution

#### 1. Backend (Scala Play Framework)

Navigate to the project root directory and start the server using sbt:

```bash
sbt run
```


#### 2. Frontend (Vue.js)

Navigate to the `/vue_ui` directory and install the dependencies:

```bash
cd vue_ui
npm install
```

Then start the frontend:

```bash
npm run serve
```

Once the frontend has started, it should be accessible at `http://localhost:8080`

## LICENSE
This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License. See the [LICENSE](./LICENSE) file for more details.
