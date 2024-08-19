import React, {useState} from "react"
import react, { ScrollView,  } from "react-native";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";

import SummaryCell from "../../Components/SummaryCell";
import { Footer } from "./style";
import { Page } from "../Tasks/style";

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
    Note: string
}

const SummaryPage = ({navigation}: {navigation: any})=>{ 
    const [Tasks, setTasks] =  useState<TaskProps[]>([]);
    const {db, setdb} = useContext(DBContext);

    db.transaction(tx => {
        tx.executeSql(`SELECT * FROM Task WHERE Active = 1 ORDER BY Status ASC`, [], 
        (txObj, {rows: {_array}}) => {setTasks(_array)})
    });

    return(
        <Page>
            <ScrollView bounces={false} scrollsToTop={true} overScrollMode="always">
                <TableView>
                <Section>
                    {Tasks.map(task => <SummaryCell 
                    key={task.ID}
                    id={task.ID}
                    name={task.Name} 
                    date={task.NextAction} 
                    status={task.Status}
                    navigation={navigation}/>)}
                </Section>
                
                </TableView>
            
            </ScrollView>
            <Footer/>
        </Page>
    );
}

export default SummaryPage;