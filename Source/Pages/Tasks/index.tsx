import React, {useState, useEffect, useContext} from "react";
import react, {ScrollView, Button, Alert, Text} from "react-native";
import { Page, TitleCont, Title, SectionCont, SectionName, DeleteButton } from "./style";
import { Section, TableView, Cell } from "react-native-tableview-simple";
import { Footer } from "./style";
import { useIsFocused } from "@react-navigation/native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import prompt from 'react-native-prompt-android';
import { RefreshContext } from "../../Contexts/refreshContext";
import { DBContext } from "../../Database/database_connection";
import TaskCell from "../../Components/TaskCell";

interface SectionProps {
    ID : number,
    Name: string,
    Activity: Number, 
    IsCreated: boolean
};

interface TaskProps {
    ID: number,
    Name: string,
    Description: string,
    Periodicty: Number,
    Section: number,
    Activity: number,
    Active: number,
    Status: number,
    NextAction: string,
    Note: string,
    IsCreated: boolean
};

const TasksPage = ({navigation, route}: {navigation: any, route:any}) =>{
    const ActName = route.params.name;
    const ActIndex = route.params.index;
    const { showActionSheetWithOptions } = useActionSheet();

    
    


    const [Sections, setSections] = useState<SectionProps[]>([]);
    const [Tasks, setTasks] = useState<TaskProps[]>([]);
    const {db, setdb} = useContext(DBContext);

    const isFocused = useIsFocused();
    const {effectVar, setEffectVar } = useContext(RefreshContext);

    useEffect(()=>{

        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Section WHERE Activity=?", [route.params.id], 
            (txObj, {rows: {_array}}) => {setSections(_array)})
        });
    
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM Task WHERE Activity=?", [route.params.id], 
            (txObj, {rows: {_array}}) => {setTasks(_array)})
        });
    },[isFocused, effectVar]);

    const HandleLong = (sec:any) =>
        showActionSheetWithOptions(
          {
            options: ['Cancelar', 'Editar', 'Excluir'],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
    
          },
          selectedIndex => {
            switch (selectedIndex) {
              case 1:
                prompt(
                    'Editar seção',
                    'Por favor, insira um novo nome para a nova seção',
                    [
                     {text: 'Cancel', style: 'cancel'},
                     {text: 'OK', onPress: (name) => {
                        if(sec==''){
                        Alert.alert("Atenção!", 
                            "Insira um nome para a seção.",[
                            {text: "OK"}]);}
                        else{
                            db.transaction(tx => {
                                tx.executeSql("UPDATE Section SET Name = (?) WHERE ID =(?)", [name, sec.ID], )
                            });
                            setEffectVar(!effectVar);

                        }
                     }},
                    ],
                    {
                        defaultValue: '',
                        placeholder: ''
                    }
                );
                break;
      
              case 2:
                Alert.alert("Atenção!", "A seção e todas as tarefas pertecentes a ela serão permanentente excluídas. Deseja realmente excluir?",
                [
                  {
                    text: 'Cancelar', style: 'cancel'
                  },
                  {
                    text: 'Excluir',
                    onPress: () => {db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Section WHERE ID=(?)', [sec.ID])
                    }); 
                    db.transaction(tx =>{
                      tx.executeSql('DELETE FROM Task WHERE Section=(?)', [sec.ID])
                    });
                    setEffectVar(!effectVar);
                    
                    
                  },
                    style: 'destructive',
                  }])
                
                
                break;
      
              case 0:
                // Canceled
            }}
            );



    return(<Page>
        <TitleCont>
            <Title>{"Atividade "+ ActIndex +": " +ActName}</Title>
        </TitleCont>
        
        <ScrollView bounces={false} scrollsToTop={true} overScrollMode="always">
        <TableView>
            {Sections.map(sec => <Section
            sectionPaddingTop={0}
             
            key={sec.ID}
            headerComponent={<SectionCont>
                <SectionName IsCreated={sec.IsCreated}>{sec.Name}</SectionName>
                {sec.IsCreated ? <DeleteButton title="Teste" onPress={()=>HandleLong(sec)}>
                    <Text style={{fontSize:18, paddingRight:16,color:"#ff5555" }}>⊖</Text>
                </DeleteButton> :null}
                
                </SectionCont>}
             >
                {Tasks.map(task =>task.Section == sec.ID ? 
                <TaskCell key={task.ID}
                Activity={route.params.id}
                id={task.ID} 
                name={task.Name}
                IsCreated={task.IsCreated}
                navigation={navigation}
                ></TaskCell> 
                
                
                
                
                
                :null)}


            </Section>)}

        </TableView>
        </ScrollView>

        <Footer>
                <Button 
                title="+  Adicionar Tarefa" 
                color={'#E9E358'}
                onPress={() =>  navigation.navigate("Nova Tarefa", {id:route.params.id})}></Button>
            </Footer>
        
        </Page>
        
    );

};

export default TasksPage;