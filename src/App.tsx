import { useReducer } from "react"
import {motion} from "framer-motion"

type TodoTypes = {
  id : number,
  text : string  | undefined | number
  toggle : boolean
}

type StateTypes = {
  todo : {
    id : number,
    text : string  | undefined | number
    toggle : boolean
  }[],
  input : string | undefined | number
}

type ActionType = {
  type : string,
  payload? : string | undefined | number
}

const todoReducer = (state : StateTypes, action : ActionType) : StateTypes =>{
  switch(action.type){
    case "setInput" : return (
      {...state , input : action.payload}
    ) 
    case "add" : return (
      {...state ,
        todo : [...state.todo ,
        {id: Date.now(), text: state.input , toggle : false}
      ]
      }
    )
    case "delete" : return (
      {
        ...state ,
        todo : state.todo.filter((selectedTodo)=>selectedTodo.id !== action.payload)
      }
    )
    case "toggle" : return (
      {
        ...state , 
        todo : state.todo.map((selected)=> selected.id === action.payload ? {...selected , toggle : !selected.toggle} : selected)
      }
    )
    default : return state
  }
}


export default function App() {
  const [state , dispatch] = useReducer(todoReducer , {todo : [] , input : ""});
  return (
    <div className="bg-gradient-to-r from-orange-700 via-orange-300 to-orange-900 min-w-full min-h-dvh flex flex-col justify-start items-center gap-5">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 mt-15">
      <h1 className="animate-bounce font-sans text-5xl font-extrabold text-orange-800">Listifier</h1>

      <div className="w-[80%] flex gap-3 justify-center items-center">
      <input onChange={(e)=>dispatch({type : "setInput" , payload : e.target.value})} className="w-[100%] h-[50px] p-3 md:w-[80%] md:p-4 border-none focus:outline-0 focus:ring-2 focus:ring-orange-900 bg-white" type="text" placeholder="Enter your todos......"/>
      <button onClick={()=>dispatch({type : "add"})} className="cursor-pointer hover:bg-orange-900 bg-orange-700 text-white font-bold font-sans p-2">ADD</button>
      </div>
      </div>


      <div className="w-[80%] py-8 flex flex-col justify-start items-center gap-8">
        {state.todo.map((item : TodoTypes)=>(
          <div key={item.id} className="min-w-[100%]">
          <motion.div
          initial = {{opacity : 0}}
          animate = {{opacity : 1}}
          transition = {{duration : 1}}
          >
          <div className="min-w-full mx-auto transition ease-in-out duration-1000 flex py-2 px-3 justify-between items-center border-2 border-amber-600 bg-gradient-to-r from-orange-200 via-amber-600 to-orange-500 text-lg font-extrabold font-Caveat" key={item.id}>
            <p className="text:lg md:text-xl text-amber-950 min-h-auto p-3 break-words">{item.text}</p>
            <div className="flex justify-center items-center gap-2">
            <i onClick={()=>dispatch({type : "delete" , payload : item.id})} className="fa-solid fa-trash cursor-pointer hover:text-red-500"></i>
            <i onClick={()=>dispatch({type : "toggle" , payload : item.id})} className={`fa-solid fa-square-check cursor-pointer hover:text-green-400 ${item.toggle ? "text-green-400" : null}`}></i>
            </div>
          </div>
          </motion.div>
          </div>
        ))}
      </div>


    </div>
  )
}
