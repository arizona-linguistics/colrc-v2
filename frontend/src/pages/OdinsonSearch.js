
import React, { useEffect, useState } from 'react';
import OdinsonTable from './OdinsonTable';

function OdinsonSearch(props) {

  const [list, setList] = useState([]);
  const [pattern, setPattern] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let res = await getPattern(pattern)
    console.log(res.scoreDocs)
    setList(res.scoreDocs)
  }

  // useEffect(() => {
  //   let mounted = true;
  //   let patternData = getPattern("horse")
  //   // getPattern()
  //   //   .then(items => {
  //   //     console.log("I have items")
  //   //     if(mounted) {
  //   //       setList(items)
  //   //       console.log(items)
  //   //     }
  //   //   })
  //   //   .catch (error => {
  //   //    console.log(error) 
  //   //   })
  //   return () => mounted = false;
  // }, [])

  // async function getPattern(pattern) {
  //   console.log("getting data")
  //   let odindata = await fetch('http://localhost:80/odinson/?' + new 
  //   URLSearchParams({
  //   odinsonQuery: `[word = /.*${pattern}.*/]`
  //   // "[word = /.*ch.*/]"
  //   }),{mode:'cors'}).then((res) => res.json())
  //   .then((data) => {
  //     return data
  //   }).catch(error => console.log(error))
  //   console.log("got data")
  //   // console.log(odindata.status)
  //   // console.log(odindata.statusText)
  //   // console.log(odindata)
  //   return odindata
  //   // .catch (error => {
  //   //   console.log(error) 
  //   //  })
  //     // .then((data) => {
  //     //   // console.log("I have data")
  //     //   data.json() 
  //     //   console.log(data)
  //     // })
  // }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Pattern:
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <OdinsonTable  = {odindata}/>
      <ul>
        {list.map(item => <li key={item.sentenceId}>{item.documentId}<p/>{item.words.join(" ")}</li>)}
      </ul>
    </div>
  )


    // axios.post("http://backend:4000/api", {
    //   userName,
    //   password
    // }).then(result => {
    //   if (result.status === 200) {
    //     setAuthTokens(result.data);
    //     setLoggedIn(true);
    //   } else {
    //     setIsError(true);
    //   }
    // }).catch(e => {
    //   setIsError(true);
    // });
  }

export default OdinsonSearch;
