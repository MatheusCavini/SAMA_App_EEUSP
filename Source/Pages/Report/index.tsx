import React , {useState, useEffect, useContext} from 'react';
import react, {TouchableOpacity, Image} from "react-native"
import WebView from 'react-native-webview';
import {printToFileAsync} from "expo-print";
import { shareAsync } from 'expo-sharing';
import SummaryPage from '../Summary';
import { DBContext } from '../../Database/database_connection';




const ReportPDF = ({navigation, route}: {navigation:any, route:any})=>{
    const [fileUri, setFileUri]= useState<string>("../../../Public/blank.pdf");
    const today = new Date();
    const {db} = useContext(DBContext);

    const AddButton = <TouchableOpacity style={{padding:8}}
    onPress={()=> generatePDF()}>
      <Image style={{height:30, width:30}} source={require("../../../Public/share_icon.png")}/>
    </TouchableOpacity>

    const status = ["Pendente", "Agendada", "Atualizada"]



    const [act, setAct] = useState<any[]>([]);
    const [sec, setSec]= useState<any[]>([]);
    const [task, setTask]= useState<any[]>([]);

    useEffect(()=>{
        db.transaction(tx => {
        tx.executeSql(`SELECT * FROM Activity WHERE Active = 1`, [], 
        (txObj, {rows: {_array}}) => {setAct(_array)})
    });
    db.transaction(tx => {
        tx.executeSql(`SELECT * FROM Section`, [], 
        (txObj, {rows: {_array}}) => {setSec(_array)})
    });
    db.transaction(tx => {
        tx.executeSql(`SELECT * FROM Task WHERE Active = 1`, [], 
        (txObj, {rows: {_array}}) => {setTask(_array)})
    });},[])

    

    
    



    const html = `
        <html>
            <head>
                <style>
                body{
                    font-family:Arial
                }
                .chart-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100px;
                  }
                
                  .bar-chart {
                    display: flex;
                    width: 500px;
                    height: 50px;
                    background-color: #EEE;
                    border-radius: 5px;
                  }
                
                  .bar {
                    height: 100%;
                    
                  }
                
                  .section1 { background-color: red; display:flex; align-items:center; justify-content:center; color:white; font-size:18 }
                  .section2 { background-color: yellow; display:flex; align-items:center; justify-content:center; color:black; font-size:18  }
                  .section3 { background-color: green; display:flex; align-items:center; justify-content:center; color:white; font-size:18 }
                
                  .legend {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                }
        
                .legend-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                }
        
                .legend-color {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                p{
                    font-size: 20;
                }
                </style>
            </head>
            <body>
                <h1> Relatório - Safety Agenda Mobile App</h1>
                <h2>Relatório de cumprimento de objetivos</h2>
                <h2>Data: ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}</h2>
                <br/> <br/>
                <h1>Resultados globais </h1>
                <div class="chart-container">
                    <div class="bar-chart">
                        <div class="bar section1" style="width: ${((task.filter(t =>t.Status === 1).length)/(task.length))*100}%;"></div>
                        <div class="bar section2" style="width: ${((task.filter(t =>t.Status === 2).length)/(task.length))*100}%;"></div>
                        <div class="bar section3" style="width: ${((task.filter(t =>t.Status === 3).length)/(task.length))*100}%;"></div>
                    </div>
                    <ul class="legend">
                        <li class="legend-item">
                        <div class="legend-color" style="background-color: red;"></div>
                        Pendente
                        </li>
                        <li class="legend-item">
                        <div class="legend-color" style="background-color: yellow;"></div>
                        Agendado
                        </li>
                        <li class="legend-item">
                        <div class="legend-color" style="background-color: green;"></div>
                        Atualizado
                        </li>
                    </ul>
                    </div>
                

                ${act.map((atividade) => 
                    '<h1>Atividade '+(atividade.ID)+": "+atividade.Name+'</h1>' +
                    `<div class="chart-container">
                    <div class="bar-chart">
                        <div class="bar section1" style="width: ${((task.filter(t =>(t.Status === 1)&&(t.Activity ==atividade.ID)).length)/(task.filter(t =>(t.Activity ==atividade.ID)).length))*100}%;"></div>
                        <div class="bar section2" style="width: ${((task.filter(t =>(t.Status === 2)&&(t.Activity ==atividade.ID)).length)/(task.filter(t =>(t.Activity ==atividade.ID)).length))*100}%;"></div>
                        <div class="bar section3" style="width: ${((task.filter(t =>(t.Status === 3)&&(t.Activity ==atividade.ID)).length)/(task.filter(t =>(t.Activity ==atividade.ID)).length))*100}%;"></div>
                    </div>
                    <ul class="legend">
                        <li class="legend-item">
                        <div class="legend-color" style="background-color: red;"></div>
                        Pendente
                        </li>
                        <li class="legend-item">
                        <div class="legend-color" style="background-color: yellow;"></div>
                        Agendado
                        </li>
                        <li class="legend-item">
                        <div class="legend-color" style="background-color: green;"></div>
                        Atualizado
                        </li>
                    </ul>
                    </div>`+
                    sec.map(section=> ((section.Activity == (atividade.ID))&& task.some(t =>t.Section == section.ID)? '<h2>'+section.Name+'</h2>' + 
                    task.map(task =>(task.Section == (section.ID) ? '<p>&emsp;&emsp;'+task.Name+'</p> <p>&emsp;&emsp;Próxima: '+task.NextAction.split("-")[0]+"/"+task.NextAction.split("-")[1]+"/"+task.NextAction.split("-")[2]+',  '+ status[task.Status-1]+'</p></br>':null)).join(''):[])).join('') + "<br/><br/>"
                    ).join('')}
            </body>
        </html>
    `

  

    
    

    //https://www.npmjs.com/package/react-native-pdf-lib

    const generatePDF = async ()=>{
        const file = await printToFileAsync({
            html: html,
            base64: false,


        })

        setFileUri(file.uri)
        await shareAsync(file.uri)
        
        

    } 

    useEffect(() => {
        navigation.setOptions({
          headerRight: () => (AddButton
            ),
        });

      }, [navigation, setTask, html]);

    

    return(
        
           <WebView source={{html}}></WebView>
         
    )
};

export default ReportPDF;