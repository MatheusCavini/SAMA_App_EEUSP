import styled, {css} from "styled-components/native";



interface CreatedProps {
    IsCreated: boolean
}
export const Title = styled.Text<CreatedProps>`
    ${(props: { IsCreated: boolean; }) => (props.IsCreated==true) && css` font-style: italic;`  }
`

export const TitleCont = styled.View`
    width: 100%;
`

