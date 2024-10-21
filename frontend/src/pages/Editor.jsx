import React, {useState, useRef} from 'react'
import Tooltip from '@mui/material/Tooltip';

import { Header} from '../components';
import {useStateContext} from "../contexts/ContextProvider";

import { MdDeleteSweep, MdOutlineDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export const Editor = () => {
  const [editors, setEditors] = useState(() => JSON.parse(localStorage.getItem("editor")) || []); 
  const textAreaRef = useRef(null);
  const viewtextAreaRef = useRef(null);
  const {currentColor} = useStateContext();
  const [showEditWindow, setShowEditWindow] = useState(true);

  React.useEffect(() => {
    localStorage.setItem("editor", JSON.stringify(editors))
  }, [editors])
  function handleChange(event){
    textAreaRef.current = event.target.value;
  }

  const createEditor = () => {
    const textTitle = textAreaRef.current.split("\n")[0];
    // const convertedDateforID = dateFormat.replaceAll(',', '').replaceAll(' ', '_').split('GMT')[0].trim();
    const newEditor = {
      id: Math.floor(Math.random()*100),
      title: textTitle,
      body: textAreaRef.current
    }
    setEditors(prevEditor => [...prevEditor, newEditor]);
    // setTextArea('');
  };

  function updateEditor(){
      setEditors(oldEditors => {
        const newArray = [];
        for(let i = 0; i < oldEditors.length; i++) {
            const oldEditor = oldEditors[i]
            if(oldEditor.id === viewtextAreaRef.current.id) {
                newArray.unshift({ ...oldEditor, tiltle:viewtextAreaRef.current.tiltle, body: textAreaRef.current });
                viewtextAreaRef.current.body = textAreaRef.current;
            } else {
                newArray.push(oldEditor)
            }
        }
        return newArray
    })
  
  }

  function deleteEditor(event) {
    event.stopPropagation();
    setEditors(oldReminders=>{
        const newReminders = oldReminders.filter((oldReminder)=>
          oldReminder.id !== viewtextAreaRef.current.id
        )
        return newReminders
    })
    viewtextAreaRef.current="";
  }

  const EditorInputWindow=()=>{
      return(
        <div className="editorWindow w-full">
            <textarea className="border-2 rounded-md w-full min-h-60" style={{borderColor: currentColor}} placeholder="new editor"
                    onChange={(e)=>handleChange(e)}/>
            <button className="rounded-md w-10 h-9 m-3 self-end text-white text-center" style={{backgroundColor: currentColor}} 
                    onClick={createEditor}>
                        OK
            </button>
        </div>
      );
  }

  const ViewWindow=(event)=>{
      return(
          <div className="readEditor w-full">
            <textarea defaultValue={viewtextAreaRef.current.body} className="border-2 rounded-md w-full min-h-60"
                       style={{borderColor: currentColor}} onChange={(e)=>handleChange(e)}/>
            <div className="viewBtns flex justify-end">
              <Tooltip title="Delete" arrow>
                  <button className="h-10 w-10 ml-2 text-white text-2xl pl-2 bg-red-200 rounded-xl 
                                    hover:drop-shadow-xl hover:bg-red-300"
                          onClick={(e)=>deleteEditor(e)}>
                      <MdOutlineDeleteForever/>
                  </button>
              </Tooltip>
              <Tooltip title="Close" arrow>
                  <button className="h-10 w-10 ml-2 text-white text-2xl pl-2 bg-amber-200 rounded-xl 
                                      hover:drop-shadow-xl hover:bg-amber-400" 
                          onClick={()=>setShowEditWindow((prevShow)=>!prevShow)}>
                          <TiDelete />
                  </button>
              </Tooltip>
              <Tooltip title="Update" arrow>
                <button className="rounded-xl w-10 h-10 ml-2 p-2 text-center text-white font-semibold hover:opacity-80" 
                        style={{backgroundColor: currentColor}} 
                        onClick={updateEditor}>
                    OK
                </button>
              </Tooltip>
            </div>
          </div>
      )
  }

  function handleClick(editor){
      setShowEditWindow((prevShow)=>!prevShow);
      viewtextAreaRef.current = editor;
  }

  const cleanupLocalStorage =()=>{
    localStorage.clear()
    setEditors(() => JSON.parse(localStorage.getItem("editor")) || []);
    return;
  }

  return (
    <div className="h-10/12 flex flex-col m-2 md:m-10 mt-16 p-2 md:p-10">
        <div className="editorContainer m-3 h-10/12 flex flex-col-reverse items-center justify-evenly border-2 rounded-xl md:m-5 md:flex-row" 
            style={{borderColor: currentColor}}>
                <div className="editorStorage w-full max-w-full flex justify-start overflow-auto 
                                md:flex-col md:h-10/12 md:w-1/4 md:overflow-y-auto"
                      style={{maxHeight: "550px"}}>
                    <Tooltip title="CleanUp all" arrow>
                        <button className="h-12 w-20 m-2 p-2 text-white text-2xl bg-red-200 rounded-md
                                            hover:drop-shadow-xl hover:bg-red-300 md:m-4 md:w-10/12" 
                                onClick={cleanupLocalStorage}>
                                <MdDeleteSweep className="m-auto"/>
                        </button>
                    </Tooltip>
                    {editors.map((editor, index)=>(
                        <button className="p-1 m-2 md:m-4 w-20 h-12 rounded-md text-white text-center text-nowrap font-semibold md:w-10/12 " 
                            style={{backgroundColor: index%2===0? currentColor :'white',
                            color: index%2===0? 'white' : currentColor,
                            borderColor: index%2===0? "transparent": currentColor}}
                            onClick={()=>handleClick(editor)}
                            >{editor.title}
                        </button>
                    ))}
                </div>
        
            <div className="p-2 m-2 w-full md:w-10/12 md:m-none flex flex-col items-center">
                <Header category="Page" title="Editor" />
                {showEditWindow? <EditorInputWindow/> : <ViewWindow/>}
            </div>
      </div>
    </div>
  );
};
