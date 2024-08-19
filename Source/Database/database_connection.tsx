import * as SQLite from 'expo-sqlite/legacy'
import React, {useState, createContext, useEffect, useContext} from 'react'
import { InsertActivities, InsertPeriods, InsertSections, InsertStatus, InsertTasks } from './InitialData';
import { LoadDBContext } from '../Contexts/loadDBContext';

type contextType ={
  db: SQLite.Database;
  setdb: (db: any) => void;
} 
interface Props {
  children: React.ReactNode;
}

export const DBContext = createContext<contextType>({db:SQLite.openDatabase('SAMA_APP.db'), setdb:()=>null});



    const DbContextProvider:React.FC<Props> = ({children}) =>{

    const [db, setdb] = useState(SQLite.openDatabase('SAMA_APP.db')) // returns Database object
    const {loadDB, setLoadDB } = useContext(LoadDBContext)

  /*   db.transaction(tx =>{
      tx.executeSql("DROP TABLE IF EXISTS Activity")
    });

    db.transaction(tx =>{
      tx.executeSql("DROP TABLE IF EXISTS Section")
    });

    db.transaction(tx =>{
      tx.executeSql("DROP TABLE IF EXISTS Status")
    });
    
    db.transaction(tx =>{
      tx.executeSql("DROP TABLE IF EXISTS Periodicity")
    });

    db.transaction(tx =>{
      tx.executeSql("DROP TABLE IF EXISTS Task")
    });
  
    db.transaction(tx =>{
      tx.executeSql("DROP TABLE IF EXISTS Action")
    }) */

  
    

  useEffect(()=>{db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Activity (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Name TEXT, IsCreated BOOLEAN, Active BOOLEAN
      )`,[],
      (_, resultSet) => {
    
      },
      (_, error) => {
        console.error('Erro criando Act:', error); return true;
      });
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Section (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Name TEXT, 
        Activity INTEGER REFERENCES Activity(ID),
        IsCreated BOOLEAN
      )`,[]);
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Status (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Name TEXT
      )`,[]);
  });


  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Periodicity (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Period TEXT, 
        AddDays INTEGER
      )`,[]);
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Task (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Name TEXT, 
        Description TEXT,
        Periodicity INTEGER REFERENCES Periodicity(ID),
        Section INTEGER REFERENCES Section(ID),
        Activity INTEGER REFERENCES Activity(ID),
        Active BOOLEAN,
        Status INTEGER REFERENCES Status(ID),
        NextAction DATE,
        Note TEXT,
        IsCreated BOOLEAN
      )`,[],
      (_, resultSet) => {
        
      },
      (_, error) => {
        console.error('Erro criando Task:', error); return true;
      });
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Action (
        ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        Task INTEGER REFERENCES Task(ID),
        Date DATE,
        Note TEXT
      )`,[]);
  });
}, [loadDB])
    



    const initializeActivity = () => {
      db.transaction((tx) => {
        tx.executeSql(
          InsertActivities,
          [],
          (_, resultSet) => {
            console.log('Atividades inseridas com sucesso.');
          },
          (_, error) => {
            console.error('Erro inserindo atividades:', error); return true;
          }
        );
      });
    };

    const initializeStatus = () => {
      db.transaction((tx) => {
        tx.executeSql(
          InsertStatus,
          [],
          (_, resultSet) => {
            console.log('Status inseridas com sucesso.');
          },
          (_, error) => {
            console.error('Erro inserindo Status:', error); return true;
          }
        );
      });
    };

    const initializeSections = () => {
      db.transaction((tx) => {
        tx.executeSql(
          InsertSections,
          [],
          (_, resultSet) => {
            console.log('Sections inseridas com sucesso.');
          },
          (_, error) => {
            console.error('Erro inserindo Sections:', error); return true;
          }
        );
      });
    };

    const initializePeriods = () => {
      db.transaction((tx) => {
        tx.executeSql(
          InsertPeriods,
          [],
          (_, resultSet) => {
            console.log('Periods inseridss com sucesso.');
          },
          (_, error) => {
            console.error('Erro inserindo Periods:', error); return true;
          }
        );
      });
    };

    const initializeTasks = () => {
      db.transaction((tx) => {
        tx.executeSql(
          InsertTasks,
          [],
          (_, resultSet) => {
            console.log('Tasks inseridas com sscesso.');
          },
          (_, error) => {
            console.error('Erro inserindo Task:', error); return true;
          }
        );
      });
    };


    const checkDatabaseInitialization = () => {

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT COUNT(*) FROM Activity',
          [],
          (_, resultSet) => {
            const rowCount = resultSet.rows.item(0)['COUNT(*)'];
            if (rowCount === 0) {
              initializeActivity();
              initializeStatus();
              initializeSections();
              initializePeriods();
              initializeTasks();
            } else {
              console.log('Database already initialized.');
            }
          },
          (_, error) => {
            console.error('Error checking database initialization:', error); return true;
          }
        );
      });
    };


    useEffect(()=>{checkDatabaseInitialization()},[loadDB])

    return(
      <DBContext.Provider value={{db, setdb}} > 
        {children} 
        </DBContext.Provider>
    )
    };

export default DbContextProvider;







