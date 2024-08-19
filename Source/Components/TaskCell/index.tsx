import React, {useState, useEffect, useContext} from "react"
import react, {Switch,Alert} from "react-native";
import { Cell } from "react-native-tableview-simple";
import { Title, TitleCont } from "./style";
import { useActionSheet } from '@expo/react-native-action-sheet';
import { DBContext } from "../../Database/database_connection";
import { RefreshContext } from "../../Contexts/refreshContext";

interface TaskCellProps {
    id: number;
    name: string;
    IsCreated: boolean,
    navigation:any;
    Activity: number
};

const TaskCell : React.FC<TaskCellProps> = ({ name, id, IsCreated, Activity, navigation}) =>{
    const { showActionSheetWithOptions } = useActionSheet();

    const [Active, setActive] = useState<boolean>(true);
    const [task, setTask]= useState();
    const {effectVar, setEffectVar} = useContext(RefreshContext)
    const {db, setdb} = useContext(DBContext);

    useEffect(()=>{
      db.transaction(tx =>{
        tx.executeSql("SELECT * FROM Task WHERE ID=(?)", [id],
        (txObj, {rows:{_array}}) =>{
          setActive((_array[0]).Active ? true: false);
          setTask((_array[0]))
        })
      })
    }, []);


    const handleToggle = ()=>{
        db.transaction(tx => {
          tx.executeSql("UPDATE Task SET Active = (?) WHERE ID = (?)", [Active ? 0:1, id])
        });

    
        //
        db.transaction(tx =>{
            tx.executeSql("SELECT MAX(Active) AS max FROM Task WHERE Activity =  (?)", [Activity],
            (txObj, {rows:{_array}})=>{console.log(_array[0].max);
                _array[0].max == 1 ? 
                db.transaction(tx=>{tx.executeSql("UPDATE Activity SET Active =(1) WHERE ID = (?)", [Activity])})
                :
                db.transaction(tx=>{tx.executeSql("UPDATE Activity SET Active =(0) WHERE ID = (?)", [Activity],
                ()=>db.transaction(tx =>{ tx.executeSql("SELECT Active FROM Activity WHERE ID = (?)", [Activity],
                (txObj, {rows:{_array}})=> console.log(_array))}))})
            }
            )
        })

        setActive(!Active)

        
      }

      const HandleNotEdit = () =>{
        Alert.alert("Atenção", 
        "Tarefas nativas do SAMA não podem ser editadas ou excluídas.",[
        {text: "OK"}]
        )
      };

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
                navigation.navigate("Editar Tarefa", {task:task});
                break;
      
              case 2:
                Alert.alert("Atenção!", "A tarefa e todos os registros associados a ela serão permanentente excluídas. Deseja realmente excluir?",
                [
                  {
                    text: 'Cancelar', style: 'cancel'
                  },
                  {
                    text: 'Excluir',
                    onPress: () => {db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Task WHERE ID=(?)', [id])
                    }); 
                    db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Action WHERE Task=(?)', [id])
                    });
                    setEffectVar(!effectVar)
                    
                    
                  },
                    style: 'destructive',
                  }])
                
                
                break;
      
              case 0:
                // Canceled
            }}
            );
    
    return(
        
        <Cell
            contentContainerStyle={{height:48,  width:350
            }}
            cellStyle="Basic"
            cellContentView = {<> 
            <TitleCont><Title IsCreated={IsCreated}>{name}</Title></TitleCont>
            
            <Switch value={Active} onChange={handleToggle}/>
            </>}
            
            onLongPress={IsCreated==true ? HandleLong : HandleNotEdit}
        />
    
    
)

}

export default TaskCell;