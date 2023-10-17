import { useEffect, useState  } from "react";

const url = 'http://localhost:3000/api/persona';

export const Lista = () => {


    const [boolEdit, setBoolEdit] = useState("");
    const [idEdit ,setIdEdit] = useState(0);

    const [dataForm, setDataForm] = useState({
        nombre: "",
        apellido: "",
        direccion: ""
    });


    const formChange = (event)=>{
        const {nombre, value} = event.target;
        setDataForm( previo =>({...previo, [nombre]:value}) );
    };
    
    const formSubmit = async()=>{
    
        event.preventDefault();
    
        if (boolEdit){
            await editData();
        }else{
            await datos();
        }
        

        setDataForm({
    
            nombre: "",
            apellido: "",
            direccion: ""
    
        });
    
        setBoolEdit("");
        setIdEdit(0);
        get_Lista_personas();

    }
    

    //Información del Reporte 

    const [getPersonas , setPersonas] = useState([]);
    
    const get_Lista_personas = async ()=>{

        const result = await fetch(url);
        const resultData = await result.json();
        setPersonas(resultData);
        

    }

    useEffect(()=>{

        get_Lista_personas();

    }, [])

    // Create Task 

    const datos= async()=>{

        const result = await fetch(url, 
            {
                method : "POST", 
                body : JSON.stringify(dataForm),
                headers : {
                    'Content-Type': 'application/json'
                }
            });
    
        const resultJson = await result.json();
        console.log(resultJson);

    }

    //Delete Persona

    const deleteData = async(id = 0)=>{

        const result = await fetch(url+"/"+id, {

            method : "DELETE"

        });

        const resultData = await result.json();
        get_Lista_personas();
    }

    // Edit Persona

    const setDataFormEdit= (task)=>{

        setBoolEdit(true);
        setIdEdit(task.id);
        setDataForm({

            nombre : task.nombre, 
            apellido : task.apellido,
            direccion : task.direccion

        });

    }

    const editData =  async()=>{

        const result = await fetch(url+"/"+idEdit, 
            {
                method : "PUT", 
                body : JSON.stringify(dataForm),
                headers : {
                    'Content-Type': 'application/json'
                }
            });
    
        const resultJson = await result.json();
        
    }

    //Direccion
    const direccion_persona = async (id)=>{

        const result = await fetch(url+"/persona/"+id, 
            {
                method : "PUT", 
                body : JSON.stringify(dataForm),
                headers : {
                    'Content-Type': 'application/json'
                }
            });
    
        const resultJson = await result.json();

        get_Lista_personas();

    }

    return (
        <>
            <div className="container">
                <h1>Lista de tareas</h1>
                <form onSubmit={formSubmit}>
                    <div className="form-floating mb-3">
                        <input className="form-control" value={dataForm.nombre}  name="name" onChange={formChange} />
                        <label >Nombre de persona</label>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={dataForm.apellido} name="apellido" onChange={formChange}></textarea>
                        <label >apellido</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={dataForm.direccion} name="direccion" onChange={formChange}></textarea>
                        <label >apellido</label>
                    </div>

                    <button type="submit" className="btn btn-primary mb-3">{boolEdit ? 'Edit' : 'Create' }</button>
                </form>

                <h2>Tareas</h2>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>nombre</td>
                            <td>apellido</td>
                            <td>direccion</td>
                            <td colSpan={3} >Edit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            getPersonas.map( (x)=>(

                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.nombre}</td>
                                    <td>{x.apellido}</td>
                                    <td>{x.direccion}</td>
                                    <td><button className="btn btn-warning" onClick={()=>setDataFormEdit(x)  } >Editar</button></td>
                                    <td><button className="btn btn-success" onClick={()=>direccion_persona(x.id)  } >Direccion</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>  deleteData(x.id) }  >Borrar</button></td>
                                </tr>
                                
                            ))

                        }
                    </tbody>
                </table>


            </div>

            

        </>

    )
}
