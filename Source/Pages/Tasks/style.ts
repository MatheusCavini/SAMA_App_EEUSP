import styled, {css} from "styled-components/native";


interface CreatedProps {
    IsCreated: boolean
}

export const Page = styled.View`
    background-color: white;
    height: 100%;
`

export const TitleCont = styled.View`
    height: 10%;
    width: 100% ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    margin: 0;
    background-color: white;
`

export const Title = styled.Text`
    font-size: 16px;
    text-align: center;
`

export const SectionCont = styled.View`
        background-color: lightgray;
        padding: 4px;
        margin: 0;
        color: #000;
        font-size: 15px;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        
    `

export const SectionName = styled.Text<CreatedProps>`
    font-size: 15px;
    padding-left: 16px;
    font-weight: bold;
    ${(props: { IsCreated: boolean; }) => (props.IsCreated==true) && css` font-style: italic;`  }
`

export const Footer = styled.View`
    height: 10%;
    width: 100%;
    background-color: #14A111;
`

export const DeleteButton = styled.TouchableOpacity`
    height: 20px;
`



