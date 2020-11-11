import Head from "next/head"
import Link from "next/link"
import styled from "styled-components"

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 2px solid ${props => props.theme.colors.accent};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-left: 0.5rem;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;

  text-align: center;

  a {
    color: ${props => props.theme.colors.link};
    text-decoration: none;
    :hover,
    :focus,
    :active {
      text-decoration: underline;
    }
  }
`
const Logo = styled.img`
  height: 1.5em;
  padding-left: 0.25em;
`

const Code = styled.code`
  background: ${props => props.theme.colors.accent};
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.1rem;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace;
`

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Card = styled.a`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 2px solid ${props => props.theme.colors.accent};
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  :hover,
  :focus,
  :active {
    color: ${props => props.theme.colors.link};
    border-color: ${props => props.theme.colors.link};
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 800px;
  margin-top: 3rem;
`

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
