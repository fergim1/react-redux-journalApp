import { useState } from 'react'

export const useForm = ( initialState = {} ) => {

    const [values , setValue] = useState(initialState)

    const handleInputChange = ( { target } ) => {
        
        setValue ( {
            ...values,
            [target.name]: target.value
        } )
    }

    const reset = ( newFormState = initialState) => {
        setValue( newFormState )
    }




    return [ values, handleInputChange, reset]
}