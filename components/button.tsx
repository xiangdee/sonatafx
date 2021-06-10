import React from "react";
import { Button } from 'react-native-paper';
export const  ButtonComponent = ({onPressVal= '', loading = false ,disabled=false,children}) => {
    return (
                     <Button mode="contained" onPress={onPressVal} loading={loading} disabled={disabled} > 
                        {children}
                    </Button>
    )

}