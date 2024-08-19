import React, {useContext} from 'react';
import react, { Button, Image,  Alert} from "react-native";
import { Page } from '../Tasks/style';
import { DBContext } from "../../Database/database_connection";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as SQLite from 'expo-sqlite/legacy'
import { LoadDBContext } from '../../Contexts/loadDBContext';




import { ButtonsArea, Container } from "./style";


const HomePage = ({navigation}: {navigation: any})=>{ 
    const {db, setdb} = useContext(DBContext);
    const { loadDB,  setLoadDB} = useContext(LoadDBContext)

    const importDb = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true
        });
    
        if(result.assets){
          
          
          if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
          }
    
          const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            {
              encoding: FileSystem.EncodingType.Base64
            }
          );
    
          await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/SAMA_APP.db', base64, { encoding: FileSystem.EncodingType.Base64 });
          
          const newdb = SQLite.openDatabase('SAMA_APP.db' );
          setdb(newdb);
          setTimeout(()=>{setLoadDB(!loadDB)}, 1500);

          Alert.alert("Sucesso!", `Base de dados importada. Feche o aplicativo e abra novamente para incorporar as mudanças.
          Caso, mesmo após isso, nenhum dado seja exibe, o arquivo importado pode ser incompatível.`,
                [
                  {
                    text: 'OK'
                  },
                 ])

        }
      };


      const handleImport = ()=>{
        Alert.alert("Atenção!", `Ao continuar, todos os dados salvos nesse dispositivo são substituídos pelos importados.
        É fortemente recomendado exportar um arquivo de backup primeiro, para eventual recuperação.
        Certifique-se de que os dados importados foram extraídos de um aplicativo SAMA, possuem nome "SAMA_APP.db", e não sofreram qualquer alteração. 
        Caso contrário, o App pode deixar de funcionar.`,
                [
                  {
                    text: 'Cancelar', style: 'cancel'
                  },
                  {
                    text: 'Continuar',
                    onPress: () => {importDb()}
                  }])
      }

      db.transaction(tx =>{
        tx.executeSql("SELECT * FROM Task", [], (txObj, {rows:{_array}})=>{
          const today = new Date();
          console.log(today)

          for(let i = 0; i < _array.length; i++){
            const next = _array[i].NextAction.split("-");
            const nextDate = new Date(next[2], next[1]-1, next[0]); 
           

            if(_array[i].Status == 2){
              if(nextDate < today){
                db.transaction(tx => tx.executeSql("UPDATE Task SET Status = (?) WHERE ID =(?)", [1, _array[i].ID]))
              }
            }else{
              if(nextDate < today){
                db.transaction(tx => tx.executeSql("UPDATE Task SET Status = (?) WHERE ID =(?)", [1, _array[i].ID]))
              }else{
                db.transaction(tx => tx.executeSql("UPDATE Task SET Status = (?) WHERE ID =(?)", [3, _array[i].ID]))
              }

            }

          }


        
        })
      })

   

    
    

    return(
            <Page>
                <Container>
                    <Image 
                        source = {require("../../../Public/SAMA_logo.jpeg")}
                        style = {{width: 350, height:350, margin:24 }}
                    />
                    <ButtonsArea>
                        <Button title="Informações" onPress={() => navigation.navigate('Informações')}/>
                        <Button title="Privacidade" onPress={() => navigation.navigate('Privacidade')}/>
                        <Button title="Iniciar" onPress={() => navigation.navigate('Resumo')}/>
                        <Button title="Importar dados" onPress={() => handleImport()}/>
                    </ButtonsArea>
                    
                    
                </Container>
            </Page>

            
    );
}

export default HomePage;