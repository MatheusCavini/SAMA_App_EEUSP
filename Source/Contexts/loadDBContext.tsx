import React, { useState, createContext} from 'react';

type contextType ={
    loadDB: boolean;
    setLoadDB: (effectVar:boolean) => void;
} 

interface Props {
    children: React.ReactNode;
  }

export const LoadDBContext = createContext<contextType>({loadDB: true, setLoadDB:()=>null});

const LoadDBContextProvider: React.FC<Props> = ({children}) =>{
	const [ loadDB, setLoadDB] = useState(true);
	
	return(
		<LoadDBContext.Provider value={{loadDB, setLoadDB}} > 
		{children} 
		</LoadDBContext.Provider>
	);
}
export default LoadDBContextProvider;