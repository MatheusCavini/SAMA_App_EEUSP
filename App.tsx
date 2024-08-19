import { StatusBar } from 'expo-status-bar';
import { Button,  TouchableOpacity, Image, Platform, Alert, View} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import RefreshContextProvider from './Source/Contexts/refreshContext';
import DbContextProvider from './Source/Database/database_connection';
import LoadDBContextProvider from './Source/Contexts/loadDBContext';
import EditActionNote from './Source/Pages/EditActionNote';




import HomePage from './Source/Pages/Home';
import SummaryPage from './Source/Pages/Summary';
import ActivitiesPage from './Source/Pages/Activities';
import TasksPage from './Source/Pages/Tasks';
import AddActivity from './Source/Pages/AddActivity';
import EditActivity from './Source/Pages/EditActivity';
import AddTask from './Source/Pages/AddTask';
import EditTask from './Source/Pages/EditTask/Index';
import TaskInfo from './Source/Pages/TaskInfo';
import EditTaskNote from './Source/Pages/EditTaskNote';

import InformationPDF from './Source/Pages/InformationPDF';
import PrivacyPDF from './Source/Pages/PrivacyPDF';
import ReportPDF from './Source/Pages/Report';

const Stack = createNativeStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: '#E9E358',
    card: '#14A111',
    text: '#E9E358',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
    background: '#14A111'
  },
  
};


function App() {
    const handleExportDb = () =>{
      Alert.alert("Exportar Dados", 'Deseja exportar uma cópia dos dados para importá-los em outro dispositivo?',
      [
        {
          text: 'Cancelar', style: 'cancel'
        },
        {
          text: 'Exportar',
          onPress: () => {exportDb()}
        }])
    };

   

    const exportDb = async () => {
    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + 'SQLite/SAMA_APP.db',
          {
            encoding: FileSystem.EncodingType.Base64
          }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'SAMA_APP.db', 'application/octet-stream')
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
        })
        .catch((e) => console.log(e));
      } else {
        console.log("Permission not granted");
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/SAMA_APP.db');
    }
  };

  function addDays(date: Date, days:number) {
    date.setDate(date.getDate() + days);
    return date;
  }
  
  let date = new Date();
  
  const newDate = addDays(date, 1);

  date = new Date();
 
  console.log(newDate == date);



  return (
    <LoadDBContextProvider>
    <DbContextProvider>
    <RefreshContextProvider>
    <ActionSheetProvider>
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        backgroundColor='#14A111'
      />
      <Stack.Navigator>
        <Stack.Screen name="Início" component={HomePage} />
        <Stack.Screen 
          name="Resumo" 
          component={SummaryPage} 
          options={({navigation})=>({
            headerRight: () => (
              <>
              <TouchableOpacity style={{padding:8}}
                onPress={()=> handleExportDb()}>
                  <Image style={{height:30, width:30}} source={require("./Public/share_icon.png")}/>
                </TouchableOpacity>
              
              <TouchableOpacity style={{padding:8}}
                onPress={()=> {
                  Alert.alert("Relatório PDF", 'Deseja gerar um relatório de cumprimento de objetivos de tarefas ativas?',
                  [
                    {
                      text: 'Cancelar', style: 'cancel'
                    },
                    {
                      text: 'Gerar',
                      onPress: () => {navigation.navigate("Relatório")}
                    }])
                }}>
                  <Image style={{height:30, width:30}} source={require("./Public/icon_document.png")}/>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:8, paddingRight:0}}
                onPress={() =>  navigation.navigate('Atividades')}>
                  <Image style={{height:30, width:30}} source={require("./Public/settings_icon.png")}/>
                </TouchableOpacity>
              </>
                
              ),
            })}
        />
        <Stack.Screen name="Atividades" component={ActivitiesPage} />
        <Stack.Screen name="Tarefas" component={TasksPage} />
        <Stack.Screen name="Detalhes" component={TaskInfo} />

        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen 
          name="Informações" component={InformationPDF} 
          options={({navigation})=>({
            headerLeft: () => (
              <View style={{ marginRight: 16 }}>
              <Button
                onPress={() =>  navigation.navigate('Início')}
                title="Voltar"
                color="#E9E358"/></View>
                
              ),
            })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Privacidade" component={PrivacyPDF} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.navigate('Início')}
              title="Voltar"
              color="#E9E358"/></View>
              
            ),
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Nova Atividade" component={AddActivity} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.navigate('Atividades')}
              title="Cancelar"
              color="#E9E358"/></View>
              
            )
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Editar Atividade" component={EditActivity} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.navigate('Atividades')}
              title="Cancelar"
              color="#E9E358"
              /></View>
              
            )
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Nova Tarefa" component={AddTask} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.goBack()}
              title="Cancelar"
              color="#E9E358"/></View>
              
            )
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Editar Tarefa" component={EditTask} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.goBack()}
              title="Cancelar"
              color="#E9E358"/></View>
              
            )
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Notas" component={EditTaskNote} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.goBack()}
              title="Cancelar"
              color="#E9E358"/></View>
              
            )
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Anotação" component={EditActionNote} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.goBack()}
              title="Cancelar"
              color="#E9E358"/></View>
              
            )
          })}/>
        </Stack.Group>

        <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen 
        name="Relatório" component={ReportPDF} 
        options={({navigation})=>({
          headerLeft: () => (
            <View style={{ marginRight: 16 }}>
            <Button
              onPress={() =>  navigation.goBack()}
              title="Voltar"
              color="#E9E358"/></View>
              
            ),
          })}/>
        </Stack.Group>


        

        
        


      </Stack.Navigator>
    </NavigationContainer>
    </ActionSheetProvider>
    </RefreshContextProvider>
    </DbContextProvider>
    </LoadDBContextProvider>
   
    
  );
}
export default App;
