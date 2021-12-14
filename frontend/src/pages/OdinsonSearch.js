
import React, { useEffect, useState } from 'react';

function OdinsonSearch() {

  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    let patternData = getPattern()
    // getPattern()
    //   .then(items => {
    //     console.log("I have items")
    //     if(mounted) {
    //       setList(items)
    //       console.log(items)
    //     }
    //   })
    //   .catch (error => {
    //    console.log(error) 
    //   })
    return () => mounted = false;
  }, [])

  async function getPattern() {
    console.log("getting data")
    let odindata = await fetch('http://localhost:80/odinson/?odinsonQuery=%5Bword%20%3D%20%2F.%2Ach.%2A%2F%5D',{mode:'cors'}).then((res) => res.json())
    .then((data) => {
      console.log(data)
    }).catch(error => console.log(error))
    console.log("got data")
    // console.log(odindata.status)
    // console.log(odindata.statusText)
    // console.log(odindata)
    return odindata
    // .catch (error => {
    //   console.log(error) 
    //  })
      // .then((data) => {
      //   // console.log("I have data")
      //   data.json() 
      //   console.log(data)
      // })
  }

    return(
      <div className="wrapper">
       <h1>Pattern return</h1>
       <div>{list}</div>
     </div>
    )

    //  <ul>
    //    {list.map(item => <li key={item.item}>{item.item}</li>)}
    //  </ul>

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
