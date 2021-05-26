import { handleErrors, broadCastSuccess } from './messages';
import { getUserToken } from "../queries/queries";
import { useAuth } from "../context/auth";

export async function postLogin(values, setSubmitting) {
    try {
      let tokenQuery = await authClient.query({
        query: getUserToken,
        variables: {
          email: values.email,
          password: values.password
        },
        errorPolicy: 'all'
      })
      if (!tokenQuery.data.loginUser_Q) {
        handleErrors(`Username or Password is incorrect`) 
        setIsError(true)
        setSubmitting(false)
      }
      else {
        const token = tokenQuery.data.loginUser_Q[0].password
        console.log('the token is ', token)
        //localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token)
        setSubmitting(false)
        setLoggedIn(true)
      }
    } 
    catch(e) {
      handleErrors(e)
    }