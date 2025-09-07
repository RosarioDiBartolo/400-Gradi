import {
  addDoc,
  deleteDoc,
  getDoc,
  getFirelord,
  onSnapshot,
  setDoc,
  type MetaTypeCreator,
} from "firelordjs";
import { db } from "./firebase";
import type { ProductReference } from "./types";
import { useEffect, useState } from "react";


type Table =  {
      lastSessionId: string;
    }
    
export const tables = getFirelord<
  MetaTypeCreator<
  Table,
    "tables"
  >
>(db, "tables");

interface Order {
  product: ProductReference;
}
export const sessions = getFirelord<
  MetaTypeCreator<
    {
      table: number;
      orders: Order[];
    },
    "sessions"
  >
>(db, "sessions");

const createTable = async (tableId: number) => {
  const session = addDoc(sessions.collection(), {
    table: tableId,
    orders: [],
  });

  await setDoc(tables.doc(tableId.toString()), {
    lastSessionId: (await session).id,
  });

  return await getDoc(tables.doc(tableId.toString()));
};

export const getTable = async (tableId: number) => {
  let table = await getDoc(tables.doc(tableId.toString()));
  if (!table.exists()) {
    table = await createTable(tableId);
  }

  return table
};
  
export const closeTable = async (tableId: number) => deleteDoc(tables.doc(tableId.toString()))
 

export const useTables = ()=>{
    const [Tables, setTables] = useState<( Table & {id: number})[] | null >(null);

    
  useEffect(() => {
    const unsub = onSnapshot( tables.collection(), (snap) => {
      setTables(
        snap.docs.map(
          doc => ({id: Number(doc.id), ...doc.data()})
        )
      )
     });
    return () => unsub();
  }, [ ]);

  return Tables

}
export const useTable = (id: number)=>{
    const [Table , setTable] = useState<( Table & {id: number}) | null >(null);

    
  useEffect(() => {
    const unsub = onSnapshot( tables.doc(id.toString()), (snap) => {
              const data =snap.data()

      if (snap.exists()&& data){ 
       setTable(
         {... data , id}
      )}
     });
    return () => unsub();
  }, [id]);

  return Table

}