import React from 'react'

import {
    BasicFormTitle,
    BasicFormDesc,
    BasicFormYardStick,
    BasicFormCustomComment,
    BasicFormInviterComment,
    BasicFormWeight,
    BasicFormSubmitOrSave,
    BasicFormDataPicker,
    BasicFormShareState
}from './components/index'


export default props=>{
   
    return (
        <div className='zty-form'>
            <BasicFormTitle />
            <BasicFormDataPicker />
            <BasicFormDesc />
            <BasicFormYardStick/>
            <BasicFormCustomComment/>
            <BasicFormInviterComment />
            <BasicFormWeight />
            <BasicFormShareState />
            <BasicFormSubmitOrSave />
        </div>
    )
}