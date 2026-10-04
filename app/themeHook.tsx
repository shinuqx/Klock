import React, { useState } from "react";

export default function useTheme(theme : string){

    let bgColor = '#000';
    let timeColor = '#e4e4e4';
    let dateColor = '#6f6f6f';

    switch(theme){
        case '1':
            bgColor = '#171717';
            timeColor ='#a7aeb1';
            dateColor = '#898085';
        break;
        case '2':
            bgColor = '#545653';
            timeColor ='#48d421';
            dateColor = '#e86d0e';
        break;
        case '3':
            bgColor = '#dee3dc';
            timeColor ='#21a1d4';
            dateColor = '#e80e62';
        break;        
    }

    return {
        bgColor,
        timeColor, 
        dateColor
    }
}