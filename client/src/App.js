import React from 'react';
import { Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <div>
      <Header/>
      <Chat />
    </div>

    // <Grid container direction="column">
    //   <Grid item>
    //     <Header />
    //   </Grid>
    //   {/* <Chat /> */}
    //   <Grid item container>
    //     <Grid item xs={false} sm={2} />
    //     <Grid item xs={12} sm={8}>
    //       <Chat />
    //     </Grid>
    //     <Grid item xs={false} sm={2} />
    //   </Grid>
    // </Grid>
  );
}

export default App;
