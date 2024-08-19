import react, {Switch, Text} from "react-native";
import { Cell } from "react-native-tableview-simple";
import { DetailContainer, DateText, StatusText, CellContainer, Title } from "./style";

interface SummaryCellProps {
    id: number;
    name: string;
    status: any;
    date: string;
    navigation: any
};



const SummaryCell : React.FC<SummaryCellProps> = ({id, navigation, name, status, date}) =>{
    const statusNames = ["Pendente", "Agendado", "Atualizado"]

    return(
        <Cell
            
            cellStyle="Subtitle"
            cellContentView={<CellContainer>
                <Title>{name}</Title>
                <DetailContainer>
                        <DateText>{"Próximo: "+ date.split("-")[0] + "/"+ date.split("-")[1] + "/"+date.split("-")[2] }</DateText>
                        <StatusText status={statusNames[status-1]}>{statusNames[status-1]}</StatusText>
                </DetailContainer>
            </CellContainer>
                
            }

            onPress={() => navigation.navigate("Detalhes", {id:id, name:name})}
        />
    )
};

export default SummaryCell