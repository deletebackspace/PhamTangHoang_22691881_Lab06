
import Header from "./component/Header"
import Siderbar from "./component/Siderbar"
import Content from "./component/Content"
import { BrowserRouter } from "react-router-dom";
import Footer from "./component/Footer";




function App() {

  return (
    <BrowserRouter>
      <div className="w-full">

        <div className="grid grid-cols-12 ">
          <div className="col-span-2 shadow-2xl">
            <Siderbar />
          </div>
          <div className="col-span-10 shadow-lg">
            <Header />
            <Content />
          </div>
        </div>
        <br />

        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Footer />
          </div>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App
