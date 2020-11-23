"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var head_1 = __importDefault(require("next/head"));
var link_1 = __importDefault(require("next/link"));
var IndexStyles_1 = require("../components/IndexStyles");
function Home() {
    return (<IndexStyles_1.Container>
      <head_1["default"]>
        <title>Create a new Originate App</title>
        <link rel="icon" href="/favicon.ico"/>
      </head_1["default"]>

      <IndexStyles_1.Main>
        <IndexStyles_1.Title>
          Welcome to{" "}
          <a href="https://github.com/Originate/create-react-app">
            Create Originate App!
          </a>
        </IndexStyles_1.Title>

        <IndexStyles_1.Description>
          Get started by editing <IndexStyles_1.Code>pages/index.js</IndexStyles_1.Code>
        </IndexStyles_1.Description>

        <IndexStyles_1.Grid>
          <IndexStyles_1.Card href="https://nextjs.org/docs">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </IndexStyles_1.Card>

          <IndexStyles_1.Card href="https://nextjs.org/learn">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </IndexStyles_1.Card>

          <IndexStyles_1.Card href="https://github.com/vercel/next.js/tree/master/examples">
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </IndexStyles_1.Card>

          <link_1["default"] href="/recipes" passHref={true}>
            <IndexStyles_1.Card>
              <h3>Try the Recipes Demo &rarr;</h3>
              <p>See a working example of Create Originate App. It's cool.</p>
            </IndexStyles_1.Card>
          </link_1["default"]>
        </IndexStyles_1.Grid>
      </IndexStyles_1.Main>

      <IndexStyles_1.Footer>
        <a href="https://originate.com" target="_blank" rel="noopener noreferrer">
          Powered by <IndexStyles_1.Logo src="/originate.svg" alt="Originate Logo"/>
        </a>
      </IndexStyles_1.Footer>
    </IndexStyles_1.Container>);
}
exports["default"] = Home;
//# sourceMappingURL=index.js.map