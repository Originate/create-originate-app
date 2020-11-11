import Head from "next/head"
import Link from "next/link"
import {
  Container,
  Title,
  Description,
  Card,
  Code,
  Main,
  Grid,
  Footer,
  Logo,
} from "./IndexStyles"

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Create a new Originate App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Title>
          Welcome to{" "}
          <a href="https://github.com/Originate/create-react-app">
            Create Originate App!
          </a>
        </Title>

        <Description>
          Get started by editing <Code>pages/index.js</Code>
        </Description>

        <Grid>
          <Card href="https://nextjs.org/docs">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </Card>

          <Card href="https://nextjs.org/learn">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </Card>

          <Card href="https://github.com/vercel/next.js/tree/master/examples">
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </Card>

          <Link href="/recipes">
            <Card>
              <h3>Try the Recipes Demo &rarr;</h3>
              <p>See a working example of Create Originate App. It's cool.</p>
            </Card>
          </Link>
        </Grid>
      </Main>

      <Footer>
        <a
          href="https://originate.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <Logo src="/originate.svg" alt="Originate Logo" />
        </a>
      </Footer>
    </Container>
  )
}
