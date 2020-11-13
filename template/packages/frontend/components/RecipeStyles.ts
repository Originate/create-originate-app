import styled from "styled-components"

export const Button = styled.button<{ primary?: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? "palevioletred" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 10rem;
`

export const RecipeContainer = styled.div`
  padding: 0 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
