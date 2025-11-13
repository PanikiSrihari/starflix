import React from 'react';
import Navigationbar from "../../components/NavigateBar/Navigationbar";
import Footer from '../../components/Footer/Footer'; 
import { Outlet } from 'react-router-dom';
import Search from '../search/Search';
const Layout = ({ children }) => {
  return (
    
    <div className="main-content-wrapper">
      
     
      <Navigationbar />
      
      
           <Search />
      

      <main className="flex-grow-1">
        
        <Outlet/>
      </main>
      
     
      <Footer />
    </div>
  );
};

export default Layout;