import react, { Button, ScrollView , Image, Text} from "react-native";
import React, {useEffect} from 'react';

import {Section } from 'react-native-tableview-simple';
import ActivityCell from "../../Components/ActivityCell";
import { useContext } from "react";
import { DBContext } from "../../Database/database_connection";
import { Page } from "../Tasks/style";


import { Footer, AddButton } from "./style";
import { useState } from "react";

interface AtividadeProps {
    ID : number,
    Name: string
    IsCreated: boolean
    Active: boolean
};

const ActivitiesPage = ({navigation}: {navigation: any})=>{
    const [Atividades, setAtividades] = useState<AtividadeProps[]>([]);
    const {db, setdb} = useContext(DBContext);

    
    db.transaction(tx => {
        tx.executeSql("SELECT * FROM Activity", [], 
        (txObj, {rows: {_array}}) => {setAtividades(_array)})});
    
   
    
    

    return(
        <Page>
            <ScrollView bounces={false} scrollsToTop={true} overScrollMode="always">
                <Section>
                    {Atividades.map((act, index) => <ActivityCell key={index}
                    IsActive={act.Active}
                    index={index}
                    id={act.ID} 
                    name={act.Name}
                    IsCreated={act.IsCreated}
                    navigation={navigation}
                    ></ActivityCell>)}
                </Section>
                
            </ScrollView>
            <Footer>
                <Button 
                title="+  Adicionar Atividade" 
                color={'#E9E358'}
                onPress={() =>  navigation.navigate('Nova Atividade')}></Button>
            </Footer>
        </Page>
    );
};

export default ActivitiesPage;