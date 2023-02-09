import React,{useState} from "react";
import "../Stylesheets/Main.css";
import '../Stylesheets/Navbar.css'
import Loader from './Loader';

export default function MainPage() {
  const [prompt,setPrompt]=useState('')
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState([])

const url="https://lively-coveralls.cyclic.app"

  const handleQuery=async()=>{
    if(!prompt){
      return alert("Enter your query")
    }
    setData([])
    setLoading(true)
    const response=await fetch(`${url}/image/fetchimage`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        prompt
      })
    })
    const data_image=await response.json()
    if(data_image.message==="success"){
      setData(data_image.image.data)
    }
    else{
      let error= data_image.error || "something went wrong. Try again"
      alert(error)
      window.location.reload()
    }
    setLoading(false)
  }
  window.onkeydown=(e)=>{
    if(e.key==='Enter' || e.key==='enter'){
      handleQuery()
    }
  }

  return (
    <>
      <nav className="dis-flex">
        <div className="logo dis-flex">
          <a href="/" rel="noreferrer">AI Solution</a>
        </div>
        <div className="searchbar dis-flex">
          <input
            type="text"
            placeholder="Enter your detail of image to generate"
            onChange={e=>{
              setPrompt(e.target.value)
            }}
            value={prompt}
          />
          <button onClick={handleQuery}>
            <i className="fa-solid fa-magnifying-glass dis-flex"></i>
          </button>
        </div>
        <div className="contactus-link dis-flex">
          <a href="http://manishkulal.netlify.app" target={"_blank"} rel="noreferrer">ContactUs</a>
        </div>
      </nav>
      { loading===true?<Loader/>:
      <div className="mainContainer" style={{display:data.length===0?'none':'block'}}>
        <p>search result for : {prompt}</p>
        <div className="images">
          {
            data.map((data,indx)=>{
              return <div className="card" key={indx}>
              <a href={data.url} target={"_blank"} rel="noreferrer">
                <img src={data.url} alt="null" />
              </a>
              {/* <button className="downloadBtn">
                <i className="fa-solid fa-download"></i>
              </button> */}
            </div>
            })
          }
        </div>
      </div>
}


    </>
  );
}


