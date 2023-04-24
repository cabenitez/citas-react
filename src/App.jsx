import { useState, useEffect } from "react"
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {

  console.log(`executionId:${Date.now().toString(36)}`)
  
  //prop
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  
  // se carga cuando el componente está listo, es decir la primera vez
  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      console.log('PACIENTES',pacientesLS)
      setPacientes(pacientesLS);
    }
    obtenerLS();
  }, []);
  
  //cada vez que cambia pacientes lo guardo en localStorage
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);


  const eliminarPaciente = (id) =>{
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }


  return (
      <div className="container mx-auto mt-20">
        
        <Header/>
        
        <div className="mt-12 md:flex">
          <Formulario 
            paciente={paciente}
            setPaciente={setPaciente}
            pacientes={pacientes}
            setPacientes={setPacientes}
          />
          
          <ListadoPacientes
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
        </div>


      </div>
  )
}

export default App