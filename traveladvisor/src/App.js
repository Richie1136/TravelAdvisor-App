import Header from './components/header/Header';

import { CssBaseline, Grid } from '@material-ui/core'
import List from './components/list/List';
import Map from './components/map/Map';

function App() {
  return (
    <>
      <h2>Hello</h2>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ backgroundColor: 'red', width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
