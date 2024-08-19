import React, {useState, useEffect} from "react"
import react, {Button} from "react-native";
import { NoteTarefa } from "./style";
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";
import { Page } from "../Tasks/style";
import { RefreshContext } from "../../Contexts/refreshContext";

const EditTaskNote = ({navigation, route}: {navigation:any, route:any}) =>{

    const [note, setNote] = useState<string>(route.params.note);
    const {db} = useContext(DBContext);
    const {effectVar, setEffectVar} = useContext(RefreshContext)

    const handleSaveNote = ()=>{
        db.transaction(tx =>
            tx.executeSql(`UPDATE Task SET Note = (?) WHERE ID =(?)`, [note, route.params.id])
        );
        db.transaction(tx => tx.executeSql(`SELECT * FROM Task 
        WHERE ID = (?)`, [route.params.id]));
        navigation.goBack();
        setEffectVar(!effectVar);
    }

    const AddButton = <Button 
        onPress={handleSaveNote} 
        title="Salvar"
        color="#E9E358"/>

        useEffect(() => {
            navigation.setOptions({
              headerRight: () => (AddButton
                ),
            });
    
          }, [navigation, note]);
    
    


    return(
        <Page>
            <NoteTarefa 
            onChangeText={(text:string) => setNote(text)}
            blurOnSubmit={true}
            value = {note} 
            placeholder="Insira o texto aqui"
            multiline={true}></NoteTarefa>

        </Page>
    )
}

export default EditTaskNote

