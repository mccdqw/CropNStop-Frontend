import React from 'react'
import '../styles/globals.css'
import App from "next/app";
import { Layout } from '../components'
import { StateContext} from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import Cookie from "js-cookie";
//import withData from "../lib/apollo";

class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount() {
    // grab token value from cookie
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StateContext
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    );
  }
}

export default MyApp;

// function MyApp({ Component, pageProps }) {

//   state = {
//     user: null,
//   };

//   componentDidMount() {
//     // grab token value from cookie
//     const token = Cookie.get('token');

//     if (token) {
//       // authenticate the token on the server and place set user object
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }).then(async (res) => {
//         // if res comes back invalid, token is not valid
//         // delete the token and log the user out on client
//         if (!res.ok) {
//           Cookie.remove("token");
//           this.setState({ user: null });
//           return null;
//         }
//         const user = await res.json();
//         this.setUser(user);
//       });
//     }
//   }

//   setUser = (user) = {
//     this.setState({ user });
//   };


//   return (
//     <StateContext>
//       <Layout >
//         <Toaster />
//         <Component {...pageProps} />
//       </Layout>
//     </StateContext>
//   ) 
// }

// export default MyApp
