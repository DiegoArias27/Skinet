/*creamos el archivo context/usercontext.js para manejar el contexto de usuario, 
es decir guardar y compartir la información del usuario en toda la aplicación*/
import { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
// Crear el contexto de usuario
const UserContext = createContext();

//esta funcion provee el contexto a los componentes hijos
export function UserProvider({ children }) {

    // Estado para almacenar la información del usuario y pagos por ahorita aqui agregaremos las demas pantallas

    //la primera es para guardar el usuario actual
    const [user, setUser] = useState(null);
    //en la segunda guardaremos el id del usuario seleccionado
    const [selectedUserId, setSelectedUserId] = useState(null);
    //la tercera es para los pagos
    const [payments, setPayments] = useState({});
    //la cuarta para los tickets
    const [tickets, setTickets] = useState({});

    // Escuchar cambios en los pagos desde Firebase Realtime Database
    useEffect(() => {
        const db = getDatabase();
        const paymentsRef = ref(db, "payments");

        const unsubscribe = onValue(paymentsRef, (snapshot) => {
            setPayments(snapshot.val() || {});
        });

        return () => unsubscribe();
    }, []);

    //escucha para cargar los tickets
    useEffect(() => {
        const db = getDatabase();
        const ticketsRef = ref(db, "tickets"); // Referencia a la ruta /tickets

        const unsubscribe = onValue(ticketsRef, (snapshot) => {
            // Guardamos todos los datos bajo el nodo /tickets
            setTickets(snapshot.val() || {});
        });

        return () => unsubscribe();
    }, []);

    /*Proveer el contexto a los componentes hijos, en este caso los estados, 
    esto se utilizará para compartir la información del usuario y pagos en toda la aplicación*/
    return (
        <UserContext.Provider value={{
            user,
            setUser,
            payments,
            //el setPayments no se exporta porque no se va a modificar desde otros componentes
            selectedUserId,
            setSelectedUserId,
            tickets,
            setTickets
        }}>
            {children}
        </UserContext.Provider>
    );
}


export function useUserContext() {
    return useContext(UserContext);
}
