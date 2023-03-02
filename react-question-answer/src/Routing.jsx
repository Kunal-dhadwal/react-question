import React from 'react';
import { Route, Routes } from "react-router-dom";
import FormBuilder from './component/FormBuilder/FormBuilder';
import ReviewAnswer from './component/ReviewAnswer/ReviewAnswer';

export default function Routing() {
   const RouteFunction = ({ children }) => {
      return (window.location.pathname !== "/" ? children : window.location.pathname="/form/builder"
      )
   }
   return (
      <>
         <RouteFunction>
            <Routes>
               <Route exact path={'/form/builder'} element={<FormBuilder />} />
               <Route exact path={'/form/answer'} element={<ReviewAnswer />} />
            </Routes>
         </RouteFunction>
      </>
   )
}

