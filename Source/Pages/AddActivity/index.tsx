import React, {useState, useEffect} from "react"
import react, { Alert, Button} from "react-native";
import { Page } from "../Tasks/style";
import { NovaAtividade } from "./style";
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";


const AddActivity = ({navigation}: {navigation: any})=>{

    const [NewActName, setNewActName ] = useState<string>('');
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
                tx.executeSql("INSERT INTO Activity ( Name, IsCreated, Active) VALUES (?,?, ?)", [ NewActName, 1, 1])
            })

            Alert.alert("Sucesso!", 
            "Atividade Adicionada.",[
            {text: "OK"}]
            );
            navigation.navigate('Atividades')
        };

    };
    const AddButton = <Button 
        onPress={handleAddAct} 
        title="Adicionar"
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

export default AddActivity;