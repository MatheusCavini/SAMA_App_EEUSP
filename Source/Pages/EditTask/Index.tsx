import React, {useState, useEffect} from "react"
import react, { Alert, Button, Keyboard} from "react-native";
import { Page } from "../Tasks/style";
import { NovaTarefa, DescTarefa, PickerTitle } from "./style";
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";
import {Picker} from '@react-native-picker/picker';
import prompt from 'react-native-prompt-android';


interface SectionProps {
    ID : number,
    Name: string,
    Activity: Number, 
    IsCreated: boolean
};


const EditTask = ({navigation, route}: {navigation: any, route:any})=>{
    const task = (route.params.task)

    const [NewTaskName, setNewTaskName ] = useState<string>(task.Name);
    const [TaskDesc, setTaskDesc] = useState<string>(task.Description);
    const [TaskPeriod, setTaskPeriod] = useState<number>(task.Periodicity);
    const [TaskSection, setTaskSection] = useState<number>(task.Section);
    const {db, setdb} = useContext(DBContext);

    const [Sections, setSections] = useState<SectionProps[]>([]);
    const [NewSectionName, setNewSectionName] = useState<string>('');

    useEffect(()=>{db.transaction(tx => {
        tx.executeSql("SELECT * FROM Section WHERE Activity=?", [task.Activity], 
        (txObj, {rows: {_array}}) => {setSections(_array)})
    });})
    
    
    

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (AddButton
            ),
        });

      }, [navigation, NewTaskName, TaskDesc, TaskSection, TaskPeriod]);

    
    const handleSectionSelect = (value:number) =>{
        if(value==0){
            prompt(
                'Nova seção',
                'Por favor, insira um nome para a nova seção',
                [
                 {text: 'Cancel', style: 'cancel'},
                 {text: 'OK', onPress: (sec) => {
                    if(sec==''){
                    Alert.alert("Atenção!", 
                        "Insira um nome para a seção.",[
                        {text: "OK"}]);}
                    else{
                        setNewSectionName(sec)
                        db.transaction(tx => {
                            tx.executeSql("INSERT INTO Section (Name, Activity, IsCreated) VALUES (?,?,?)", [sec, task.Activity, 1], )
                        });
                        db.transaction(tx => {
                            tx.executeSql("SELECT * FROM Section WHERE Activity=?", [task.Activity], 
                            (txObj, {rows: {_array}}) => {setSections(_array); setTaskSection(_array[_array.length -1].ID)}, )
                        });
                        
                    

                    }
                 }},
                ],
                {
                    defaultValue: '',
                    placeholder: ''
                }
            );

        }else{
            setTaskSection(value)
        }

    }
    
    
    const handleAddTask = () =>{
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        if(NewTaskName=='' || TaskDesc=='' || TaskSection == -1 || TaskPeriod == -1){
            Alert.alert("Dado(s) faltante(s)", 
            "Complete todos os campos para criar a tarefa.",[
            {text: "OK"}]
            );
            console.log(NewTaskName, TaskDesc, TaskSection, TaskPeriod)}
        else{

            db.transaction(tx =>{
                tx.executeSql(`UPDATE Task SET
                Name = (?), Description = (?), Periodicity = (?),  Section = (?) 
                WHERE ID = (?)`, [NewTaskName, TaskDesc, TaskPeriod, TaskSection, task.ID])
            })

            Alert.alert("Sucesso!", 
            "Tarefa editada.",[
            {text: "OK"}]
            );
            navigation.goBack()
        };

    };
    const AddButton = <Button 
        onPress={handleAddTask} 
        title="Salvar"
        color="#E9E358"/>



    return(
        <Page>
            
            <NovaTarefa
            placeholder="Nome da tarefa"
            value = {NewTaskName}
            onChangeText={(text:string) => {setNewTaskName(text)}}
            />

            <DescTarefa
            multiline={true}
            placeholder =  "Descrição detalhada"
            value = {TaskDesc}
            blurOnSubmit={true}
            onChangeText={(text:string) => setTaskDesc(text)}
            />

            <PickerTitle>Selecione uma periodicidade: </PickerTitle>

            <Picker
            mode="dialog"
            selectedValue={TaskPeriod}
            onValueChange={(itemValue) =>
                {setTaskPeriod(itemValue)}
            }>

            <Picker.Item color='lightgray' label="Selecionar" value="-1" />
            <Picker.Item label="Bienal" value={1} />
            <Picker.Item label="Anual" value={2} />
            <Picker.Item label="Semestral" value={3} />
            <Picker.Item label="Quadrimestral" value={4} />
            <Picker.Item label="Trimestral" value={5} />
            <Picker.Item label="Bimestral" value={6} />
            <Picker.Item label="Mensal" value={7} />
            <Picker.Item label="Quinzenal" value={8} />
            <Picker.Item label="Semanal" value={9} />
            </Picker>

            <PickerTitle>Selecione uma seção: </PickerTitle>
            
            <Picker 
            mode="dialog"
            selectedValue={TaskSection}
            onValueChange={handleSectionSelect}>
                <Picker.Item color='lightgray' label="Selecionar" value="-1" />
            {Sections.map(sec=>
                <Picker.Item key={sec.ID} label={sec.Name} value={sec.ID} />
            )}
            <Picker.Item label="Nova seção" value="0" />
            </Picker>



            
            
            
            
        </Page>

    )

}

export default EditTask;