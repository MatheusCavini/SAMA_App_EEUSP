import React, {useState, useEffect} from "react"
import react, {Switch,Alert} from "react-native";
import { Cell } from "react-native-tableview-simple";
import { Title, TitleCont } from "./style";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";



interface ActivityCellProps {
    index: number;
    id: number;
    name: string;
    IsCreated: boolean,
    navigation:any;
    IsActive: boolean
};

const ActivityCell : React.FC<ActivityCellProps> = ({IsActive, index, name, id, IsCreated, navigation}) =>{

    const { showActionSheetWithOptions } = useActionSheet();
    const {db, setdb} = useContext(DBContext);

    const [Active, setActive] = useState<boolean>(IsActive);

    useEffect(()=>{
      db.transaction(tx =>{
        tx.executeSql("SELECT Active FROM Activity WHERE ID=(?)", [id],
        (txObj, {rows:{_array}}) =>{
          setActive((_array[0]).Active ? true: false)
        })
      })
    }, [IsActive])

    const HandleLong = () =>
        showActionSheetWithOptions(
          {
            options: ['Cancelar', 'Editar', 'Excluir'],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
    
          },
          selectedIndex => {
            switch (selectedIndex) {
              case 1:
                navigation.navigate("Editar Atividade", {
                  name: name, id:id})
                break;
      
              case 2:
                Alert.alert("Atenção!", "A atividade e todas as tarefas associadas a ela serão permanentente excluídas. Deseja realmente excluir?",
                [
                  {
                    text: 'Cancelar', style: 'cancel'
                  },
                  {
                    text: 'Excluir',
                    onPress: () => {db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Activity WHERE ID=(?)', [id])
                    });
                    db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Section WHERE Activity=(?)', [id])
                    });
                    db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Task WHERE Activity=(?)', [id])
                    });},
                    style: 'destructive',
                  }])
                
                
                break;
      
              case 0:
                // Canceled
            }}
            );
        

        const HandleNotEdit = () =>{
          Alert.alert("Atenção", 
          "Atividades nativas do SAMA não podem ser editadas ou excluídas.",[
          {text: "OK"}]
          )
        }

        const handleToggle = ()=>{
          db.transaction(tx => {
            tx.executeSql("UPDATE Task SET Active = (?) WHERE Activity = (?)", [Active ? 0:1, id])
          });
          db.transaction(tx => {
            tx.executeSql("UPDATE Activity SET Active = (?) WHERE ID = (?)", [Active ? 0:1, id])
          })
          setActive(!Active)

          
        }

    return(
        
            <Cell
                contentContainerStyle={{height:60,  width:350
                }}
                cellStyle="Basic"
                cellContentView = {<> 
                <TitleCont><Title IsCreated={IsCreated}>{index+1+": " + name}</Title></TitleCont>
                
                <Switch value={Active} onChange={handleToggle} style={{paddingRight:0}}/>
                </>}
                
                onPress={() => navigation.navigate('Tarefas', {
                    name: name, id:id, index:index+1})}
                onLongPress={IsCreated==true ? HandleLong : HandleNotEdit}
            />
        
        
    )
};

export default ActivityCell