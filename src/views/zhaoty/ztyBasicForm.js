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
    BasicFormShareState,
    ZtyBreadCrumb
}from './components/index'


export default props=>{
   
    return (
        <div className='zty-form'>
            <ZtyBreadCrumb />
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