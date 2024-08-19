import styled, {css} from "styled-components/native";

interface StatusProps{
    status: string;
}

export const CellContainer = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Title = styled.Text`
    font-size: 16px;
    margin: 8px 4px;
`

export const DetailContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 8px 4px;
    padding-top: 0;
`

export const DateText = styled.Text`
    font-size: 15px;
    color: #444;
    font-style: italic;
`

export const StatusText = styled.Text<StatusProps>`
    font-size: 15px;
    font-weight: bold;
    ${(props: { status: string; }) => (props.status =="Pendente") && css` color: red;`  }
    ${(props: { status: string; }) => (props.status =="Atualizado") && css` color: green;`  }
    ${(props: { status: string; }) => (props.status =="Agendado") && css` color: orange;`  }

    
`

