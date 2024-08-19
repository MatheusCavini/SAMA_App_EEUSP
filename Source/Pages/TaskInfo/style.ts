import styled, {css} from "styled-components/native";


interface StatusProps{
    status: string;
}


export const Title = styled.Text`
    font-weight: 600;
    text-align: center;
    font-size: 16px;
    margin: 11px;
`

export const DescCont = styled.View`
    margin: 0px 16px;
    padding: 8px;
    font-size: 16px;
    background-color: #eee;
    height: 13%;
    overflow: scroll;

`

export const FooterInfo = styled.View`
    height: 7%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px;

`

export const TextPeriod = styled.Text<StatusProps>`
    font-size: 14px;
    text-align: right;
    font-style: italic;
    ${(props: { status: string; }) => (props.status =="Pendente") && css` color: red;`  }
    ${(props: { status: string; }) => (props.status =="Atualizado") && css` color: green;`  }
    ${(props: { status: string; }) => (props.status =="Agendado") && css` color: orange;`  }
`

export const TextStatus = styled.Text<StatusProps>`
    font-size: 18px;
    text-align: right;
    ${(props: { status: string; }) => (props.status =="Pendente") && css` color: red;`  }
    ${(props: { status: string; }) => (props.status =="Atualizado") && css` color: green;`  }
    ${(props: { status: string; }) => (props.status =="Agendado") && css` color: orange;`  }
`

