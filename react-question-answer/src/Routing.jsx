import React from 'react';
import {Route, Routes} from "react-router-dom";
import FormBuilder from './component/FormBuilder/FormBuilder';
import ReviewAnswer from './component/ReviewAnswer/ReviewAnswer';

export default function Routing() {
   return (
      <>
               <Routes>
                  <Route exact path={'/'} element={<FormBuilder/>}/>
                  <Route exact path={'/about'} element={<ReviewAnswer/>}/>
               </Routes>
           </>
   )
}

