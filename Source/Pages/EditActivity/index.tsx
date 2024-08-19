import React, {useState, useEffect} from "react"
import react, { Alert, Button} from "react-native";
import { Page } from "../Tasks/style";
import { NovaAtividade } from "./style";
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";


const EditActivity = ({navigation, route}: {navigation: any, route:any})=>{

    const id = route.params.id;
    const name = route.params.name;

    const [NewActName, setNewActName ] = useState<string>(name);
    const {db, setdb} = useContext(DBContext);

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (AddButton
            ),
        });
      }, [navigation, NewActName]);
    
    
    const handleAddAct = () =>{
        if(NewActName==''){
            console.log(NewActName);
            Alert.alert("Dado faltante", 
            "É necessário dar um nome a sua atividade.",[
            {text: "OK"}]
            )}
        else{
            db.transaction(tx =>{
                tx.executeSql(`UPDATE Activity  
                SET Name =  (?)
                WHERE ID = (?)`, [NewActName, id])
            })

            Alert.alert("Sucesso!", 
            "Nome da atividade alterado.",[
            {text: "OK"}]
            );
            navigation.navigate('Atividades')
        };

    };
    const AddButton = <Button 
        onPress={handleAddAct} 
        title="Salvar"
        color="#E9E358"/>



    return(
        <Page>
            
            <NovaAtividade 
            placeholder="Por favor, insira o nome"
            value = {NewActName}
            onChangeText={(text:string) => {setNewActName(text)}}
            />
        </Page>

    )

}

export default EditActivity;