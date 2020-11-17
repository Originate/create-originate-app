import styled from "styled-components"

export const Button = styled.button<{ primary?: boolean }>`
  background: ${props =>
    props.primary ? props.theme.colors.accent2 : props.theme.colors.white};
  color: ${props =>
    props.primary ? props.theme.colors.white : props.theme.colors.accent2};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${props => props.theme.colors.accent2};
  border-radius: 3px;
  width: 10rem;
  :focus {
    border-color: ${props => props.theme.colors.accent};
    outline: none;
  }
  :hover {
    cursor: pointer;
  }
`

export const BackButton = styled(Button)`
  position: absolute;
  left: 1rem;
  top: 1rem;
`

export const RecipeContainer = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
