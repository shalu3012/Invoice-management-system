import "flatpickr/dist/themes/material_blue.css";

import Flatpickr from "react-flatpickr";
import {  useState } from "react";

export default function DatePicker({style,name,value}){
    const [date, setDate]=useState(new Date(value))
        return (
          <Flatpickr name={name} style={style} value={date}  options={{dateFormat:'M d,Y',allowInput: true}} onChange={(date) => {setDate(date)}}/>
        )
      }
