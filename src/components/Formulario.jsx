
import {useState, useEffect} from 'react'
import Error from './Error'


function Formulario({paciente, pacientes, setPaciente, setPacientes}) {

  // state
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  // detecta el cambio del objeto para refrescar
  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      
      // asigna los valores para mostrarlos en las cajas de texto
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }

  }, [paciente])
  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }


  const handleSubmit = (e) =>{
    e.preventDefault()

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return
    }
    setError(false)

    // obj paciente
    const objetoPaciente = {nombre, 
                            propietario, 
                            email, 
                            fecha, 
                            sintomas                            
                          }
    if (paciente.id) {

      // editar paciente   
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      
      // limpia el state
      setPaciente({})
    }else{

      // agregar paciente
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }

    //console.log(objetoPaciente)

    //reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }




  return (
    <div className='md:w-1/2 lg:w-2/5'>
      
      <h2 className='font-black text-3xl text-center'>Seguimiento de Pacientes</h2>
      
      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {""}
        <span className=' text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form className='bg-white shadow-md rounded-lg py-10 px-5 mb-10' onSubmit={handleSubmit}>

        {error && 
            <Error mensaje='Todos los campos son obligatorios'/>
        }

        <div>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='mascota'>Nombre Mascota </label>
          <input id="mascota" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="text" placeholder='Nombre de la mascota' value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
        </div>

        <div>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='propietario'>Nombre Propietario</label>
          <input id="propietario" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="text" placeholder='Nombre de la propietario' value={propietario} onChange={(e)=>setPropietario(e.target.value)}/>
        </div>

        <div>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='email'>Email</label>
          <input id="email" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="email" placeholder='Nombre de la email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>

        <div>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='date'>Alta</label>
          <input id="date" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}/>
        </div>

        <div>
          <label className='block text-gray-700 uppercase font-bold' htmlFor='sintomas'>Sintomas</label>
          <textarea id="sintomas" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' placeholder='Describe los sintomas' value={sintomas} onChange={(e)=>setSintomas(e.target.value)}/>
        </div>

        <input type="submit" className=" bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}/>

      </form>
    </div>
  )
}

export default Formulario
