import React, {useState, useEffect} from "react"
import react, { ScrollView, Text, TouchableOpacity, Image, View, Alert } from "react-native";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";
import { Page } from "../Tasks/style";
import { Title, DescCont, FooterInfo, TextPeriod, TextStatus } from "./style";
import { Footer } from "../Tasks/style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RefreshContext } from "../../Contexts/refreshContext";
import { useActionSheet } from '@expo/react-native-action-sheet';


const TaskInfo = ({navigation, route}: {navigation:any, route:any}) =>{

    const { showActionSheetWithOptions } = useActionSheet();

    const [Task, setTask] = useState<any>();
    const [periods, setPeriods] = useState<any[]>([]);
    const [actions, setActions] = useState<any[]>([]);
    const {db} = useContext(DBContext);
    const {effectVar, setEffectVar} = useContext(RefreshContext)

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [selectedAction, setSelectedAction ] = useState<number>(0)
    const today = new Date();

    const status = ["Pendente", "Agendado", "Atualizado"]
    function addDays(date: Date, days:number) {
        date.setDate(date.getDate() + days);
        return date;
      }
    
    useEffect(()=>{
        db.transaction(tx => tx.executeSql(`SELECT * FROM Periodicity`, [],
            (txObj, {rows:{_array}})=>{setPeriods(_array)}));
    },[]);

    useEffect(()=>{
        db.transaction(tx => tx.executeSql(`SELECT * FROM Task WHERE ID = (?)`, [route.params.id],
            (txObj, {rows:{_array}})=>{setTask(_array[0])}));
        db.transaction(tx => tx.executeSql(`SELECT * FROM Action WHERE Task = (?) ORDER BY Date ASC`, [route.params.id],
            (txObj,{rows:{_array}})=>{setActions(_array)}))
    },[effectVar, open])
    
    

    
    

    const handleNewDate=(date:any) =>{
        if(date>today){
            db.transaction(tx =>{
                tx.executeSql("UPDATE Task SET NextAction = (?), Status = (?) WHERE ID = (?)",
                [date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(), 2, Task.ID])
            });
            setOpen(false);
        }else{
            Alert.alert("Data incorreta", "Você não pode agendar uma tarefa para uma data passada. Se quiser resgistrar como uma tarefa concluída, utilize o botão (+) à direita da lista de registros.");
            setOpen(false);
        }

    }

    const handleNewAction=(date:any) =>{
        if(date<today){
            db.transaction(tx =>{
                tx.executeSql("INSERT INTO Action (Task, Date, Note) VALUES (?,?,?)",
                [Task.ID, (date.getFullYear()+"-"+(("0" + (date.getMonth()+1)).slice(-2))+"-"+("0" + date.getDate()).slice(-2)), ""])
            });
            recalculate();
            setOpen2(false);

            
        }else{
            Alert.alert("Data incorreta", "Você não pode registrar uma tarefa concluída em uma data futura. Se quiser agendar a realização da tarefa, utilize o botão (Nova data) no canto inferior esquerdo.");
            setOpen2(false);
        };

    };


    const handleChangeDate = (date:any)=>{
        if(date<today){
        db.transaction(tx =>{
            tx.executeSql("UPDATE Action SET Date = (?) WHERE ID = (?)", 
            [(date.getFullYear()+"-"+(("0" + (date.getMonth()+1)).slice(-2))+"-"+("0" + date.getDate()).slice(-2)), selectedAction])
        });
        setOpen3(false);
        recalculate();
        
    }else{
        Alert.alert("Data incorreta", "Você não pode registrar uma tarefa concluída em uma data futura. Se quiser agendar a realização da tarefa, utilize o botão (Nova data) no canto inferior esquerdo.");
        setOpen3(false);
    };

    }



    const HandlePress = (action:any) =>
        showActionSheetWithOptions(
          { title:action.Date.split("-")[2] +"/"+action.Date.split("-")[1]+"/"+action.Date.split("-")[0],
            options: ['Cancelar', 'Excluir','Mudar data', "Notas"],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
    
          },
          selectedIndex => {
            switch (selectedIndex) {
              case 0 : 
                break;
              case 1:
                db.transaction(tx =>
                    tx.executeSql("DELETE FROM Action WHERE ID = (?)", [action.ID]));
                recalculate();
                break;
      
              case 2:
                setSelectedAction(action.ID);
                setOpen3(true);

                break;
      
              case 3:
                
                navigation.navigate("Anotação", {id: action.ID, note: action.Note});
                setEffectVar(!effectVar);
                break;
            }}
            );

    const recalculate = ()=>{
        db.transaction(tx => tx.executeSql(`SELECT * FROM Action WHERE Task = (?) ORDER BY Date ASC`, [Task ? Task.ID:0],
            (txObj,{rows:{_array}})=>{
            setActions(_array);
            if(_array.length){
                const lastDate = (_array[_array.length-1].Date)
                const LastAction = new Date(lastDate.split("-")[0],lastDate.split("-")[1]-1,lastDate.split("-")[2] );
                const NextDate = (addDays(LastAction,periods[Task.Periodicity -1].AddDays))
                db.transaction(tx =>{
                    tx.executeSql("UPDATE Task SET NextAction = (?), Status = (?) WHERE ID = (?)",
                [NextDate.getDate()+"-"+(NextDate.getMonth()+1)+"-"+NextDate.getFullYear(), 
                (NextDate > today ? 3: 1), 
                Task.ID], ()=>{
                    db.transaction(tx => tx.executeSql(`SELECT * FROM Task WHERE ID = (?)`, [route.params.id],
                    (txObj, {rows:{_array}})=>{setTask(_array[0])}));

                })

                })
            }else{
                db.transaction(tx =>{
                    tx.executeSql("UPDATE Task SET NextAction = (?), Status = (?) WHERE ID = (?)",
                [today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear(), 1, Task.ID],()=>{
                    db.transaction(tx => tx.executeSql(`SELECT * FROM Task WHERE ID = (?)`, [route.params.id],
                    (txObj, {rows:{_array}})=>{setTask(_array[0])}));

                }
                )

                })

            }
            }));


    }
    


    return(
        <Page>
            <DateTimePickerModal
            isVisible={open}
            mode="date"
            onConfirm={handleNewDate}
            locale="pt-BR"
            onCancel={()=>setOpen(false)}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            onChange={(date) =>{setDate(date)}}
            
            />
            <DateTimePickerModal
            isVisible={open2}
            mode="date"
            onConfirm={handleNewAction}
            locale="pt-BR"
            onCancel={()=>setOpen2(false)}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            onChange={(date) =>{setDate(date)}}
            
            />

            <DateTimePickerModal
            isVisible={open3}
            mode="date"
            onConfirm={handleChangeDate}
            locale="pt-BR"
            onCancel={()=>setOpen3(false)}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            onChange={(date) =>{setDate(date)}}
            
            />
           
           <Title>{Task ? Task.Name :null}</Title>
            <DescCont><ScrollView><Text>{Task ? Task.Description:null}</Text></ScrollView></DescCont>
            <View style={{height:"72%", display:"flex", flexDirection: "row"}}>
            <ScrollView >
            <TableView  style={{display:"flex", paddingLeft:40}}>
                <Section>
                {actions ? actions.map(action =>
                <Cell key={action.ID} titleTextStyle={{textAlign:"center", fontSize:18}}
                title={action.Date.split("-")[2] +"/"+action.Date.split("-")[1]+"/"+action.Date.split("-")[0]}
                cellAccessoryView={
                    <Image  style={{height:28, width:21.5}}source={action.Note=="" ? require("../../../Public/notes.png"): require("../../../Public/notes_fill.png")}></Image>
                }
                onPress={()=>HandlePress(action)}
                ></Cell>):null}
                </Section>    
            </TableView>
            </ScrollView>
            <TouchableOpacity style={{display:"flex", flexDirection:"column", 
            justifyContent:"center", margin:28}}
            onPress={()=> setOpen2(true)}>
                <Image 
                source={require("../../../Public/plus.png")}
                style={{height:18, width:18}}></Image>
            </TouchableOpacity>
            </View>
            <FooterInfo>
                <View>
                <Text style={{fontSize: 16}}>{"Próximo: "+ (Task ? Task.NextAction.split("-")[0] +"/"+Task.NextAction.split("-")[1]+"/"+Task.NextAction.split("-")[2]: null)}</Text>
                <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text style={{fontSize: 16, paddingTop:6, color:"#0E7Aff"}}>Nova data</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() =>navigation.navigate("Notas", {note: Task.Note, id: Task.ID})}>
                    <Image source={Task ? (Task.Note === ""? require("../../../Public/info.png"):require("../../../Public/info_fill.png")  )
                    : require("../../../Public/info.png")}
                    style={{height:26, width:26, marginRight:50}}/>
                
                </TouchableOpacity>
                <View>
                <TextPeriod status={Task ? status[Task.Status -1]:null}>{Task ? periods[Task.Periodicity -1].Period :null}</TextPeriod>
                <TextStatus status={Task ? status[Task.Status -1]:null}>{Task ? status[Task.Status -1]:null}</TextStatus>
                </View>
            </FooterInfo>
            <Footer style={{height: 24}}></Footer>
           

        </Page>

    )
}

export default TaskInfo;