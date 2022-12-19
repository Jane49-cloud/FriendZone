import {BrowserRouter,Routes, Route} from "react-router-dom"
import HomePage  from "./components/HomePage"
import LoginPage from "./components/LoginPage"
import ProfilePage  from "./components/ProfilePage"
import {useMemo } from "react"
import {CssBaseline, ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import {themeSettings} from "./theme.js"
import {useSelector} from "react-redux"

function App() {
const mode =useSelector((state)=>state.mode)
const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode])

  return (
    <div className="App">
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Routes>
        <Route path="/" element = {<LoginPage/>}/>
      </Routes>
      <Routes>
        <Route path="/home" element = {<HomePage/>}/>
      </Routes>
      <Routes>
        <Route path="/profile/:userid" element = {<ProfilePage/>}/>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
